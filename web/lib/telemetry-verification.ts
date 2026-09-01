/**
 * Anti-bot telemetry verification.
 *
 * Pure functions, no I/O — kept separate from the API route so the
 * scoring logic can be unit tested and tuned independently of the
 * request/response plumbing.
 *
 * This is a heuristic, not a proof. It's designed to catch the cheap,
 * common bot patterns (linear interpolation, uniform polling, teleporting
 * the cursor) rather than to be adversarially unbeatable. Treat the
 * thresholds below as a starting point — they should be tuned against
 * real playtest sessions before this gates real payouts.
 */

export interface TelemetryPoint {
  x: number;
  y: number;
  time: number; // ms since epoch (Date.now() on the client)
  stage: number;
  type: "move" | "click";
}

export interface VerificationCheck {
  name: string;
  passed: boolean;
  detail: string;
}

export interface VerificationResult {
  verified: boolean;
  humanScore: number; // 0-100
  checks: VerificationCheck[];
}

const MIN_MOVE_POINTS = 200;
const MIN_CLICKS = 5;

// Client throttles mousemove sampling to ~33ms (see GameCanvas.tsx). A
// human moving fast within one sample window rarely covers more than
// ~150-200px; treat bigger single-sample jumps as a "teleport" signal.
const TELEPORT_DISTANCE_PX = 250;
const MAX_TELEPORT_RATIO = 0.03; // >3% of segments teleporting is suspicious

// Below this angle-change stddev (degrees), movement looks too close to
// straight-line interpolation to be an organic human hand.
const MIN_ANGLE_STDDEV_DEG = 4;

// Below this dt stddev (ms), the polling interval looks scripted rather
// than subject to normal browser/event-loop jitter.
const MIN_DT_STDDEV_MS = 1.5;

const HUMAN_SCORE_PASS_THRESHOLD = 60;

function dist(a: TelemetryPoint, b: TelemetryPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angleBetween(v1x: number, v1y: number, v2x: number, v2y: number): number {
  const mag1 = Math.hypot(v1x, v1y);
  const mag2 = Math.hypot(v2x, v2y);
  if (mag1 === 0 || mag2 === 0) return 0;
  const dot = v1x * v2x + v1y * v2y;
  const cos = Math.min(1, Math.max(-1, dot / (mag1 * mag2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stddev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance = mean(values.map((v) => (v - m) ** 2));
  return Math.sqrt(variance);
}

export function verifyTelemetry(points: TelemetryPoint[]): VerificationResult {
  const checks: VerificationCheck[] = [];
  let humanScore = 100;

  const moves = points.filter((p) => p.type === "move").sort((a, b) => a.time - b.time);
  const clicks = points.filter((p) => p.type === "click");

  // --- Check 1: minimum data volume -------------------------------------
  const hasEnoughData = moves.length >= MIN_MOVE_POINTS && clicks.length >= MIN_CLICKS;
  checks.push({
    name: "sufficient_data",
    passed: hasEnoughData,
    detail: `${moves.length} move points (min ${MIN_MOVE_POINTS}), ${clicks.length} clicks (min ${MIN_CLICKS})`,
  });
  if (!hasEnoughData) humanScore -= 40;

  if (moves.length < 3) {
    // Not enough points to run the shape-based checks meaningfully.
    checks.push({
      name: "movement_shape",
      passed: false,
      detail: "Too few move points to analyze movement shape",
    });
    return {
      verified: false,
      humanScore: Math.max(0, humanScore - 40),
      checks,
    };
  }

  // --- Check 2: teleport / max-speed detection ---------------------------
  let teleportCount = 0;
  const dts: number[] = [];
  for (let i = 1; i < moves.length; i++) {
    const dt = moves[i].time - moves[i - 1].time;
    if (dt > 0) dts.push(dt);
    if (dist(moves[i], moves[i - 1]) > TELEPORT_DISTANCE_PX) teleportCount++;
  }
  const teleportRatio = teleportCount / moves.length;
  const teleportOk = teleportRatio <= MAX_TELEPORT_RATIO;
  checks.push({
    name: "no_teleporting",
    passed: teleportOk,
    detail: `${(teleportRatio * 100).toFixed(1)}% of segments exceeded ${TELEPORT_DISTANCE_PX}px jump (max allowed ${MAX_TELEPORT_RATIO * 100}%)`,
  });
  if (!teleportOk) humanScore -= 25;

  // --- Check 3: angle variance (straight-line / interpolation detection) -
  const angles: number[] = [];
  for (let i = 2; i < moves.length; i++) {
    const v1x = moves[i - 1].x - moves[i - 2].x;
    const v1y = moves[i - 1].y - moves[i - 2].y;
    const v2x = moves[i].x - moves[i - 1].x;
    const v2y = moves[i].y - moves[i - 1].y;
    angles.push(angleBetween(v1x, v1y, v2x, v2y));
  }
  const angleStd = stddev(angles);
  const angleOk = angleStd >= MIN_ANGLE_STDDEV_DEG;
  checks.push({
    name: "natural_curvature",
    passed: angleOk,
    detail: `direction-change stddev ${angleStd.toFixed(2)}\u00b0 (min ${MIN_ANGLE_STDDEV_DEG}\u00b0) — low values indicate linear/interpolated movement`,
  });
  if (!angleOk) humanScore -= 20;

  // --- Check 4: polling-interval uniformity -------------------------------
  const dtStd = stddev(dts);
  const dtOk = dtStd >= MIN_DT_STDDEV_MS;
  checks.push({
    name: "natural_timing_jitter",
    passed: dtOk,
    detail: `sample-interval stddev ${dtStd.toFixed(2)}ms (min ${MIN_DT_STDDEV_MS}ms) — low values indicate scripted/replayed input`,
  });
  if (!dtOk) humanScore -= 15;

  humanScore = Math.max(0, Math.min(100, humanScore));

  return {
    verified: humanScore >= HUMAN_SCORE_PASS_THRESHOLD,
    humanScore,
    checks,
  };
}
