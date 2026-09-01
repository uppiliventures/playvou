"use client";

import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

interface TelemetryPoint {
  x: number;
  y: number;
  time: number;
  stage: number;
  type: "move" | "click";
}

interface LeaderboardEntry {
  name: string;
  email: string;
  score: number;
  logs: number;
  wallet: string;
}

// Telemetry sampling rate for mousemove events. 30Hz keeps a 6-minute
// session's array in the low thousands of points while retaining high signal.
const TELEMETRY_SAMPLE_INTERVAL_MS = 33;

export default function GameCanvas() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Player Registration
  const [playerName, setPlayerName] = useState<string>("");
  const [playerEmail, setPlayerEmail] = useState<string>("");

  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "ENDED">("IDLE");
  const [stage, setStage] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(360);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Clean Rolling Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const telemetryRef = useRef<TelemetryPoint[]>([]);
  const lastMoveSampleRef = useRef<number>(0);

  // 3-Form Boss State
  const bossRef = useRef({
    x: 200,
    y: 40,
    dx: 3.5,
    dy: 2.5,
    phase: 1,
    headHp: 20,
    headHits: [] as number[],
    bodyHp: 15,
    bodyHits: [] as number[],
    centipede: Array.from({ length: 8 }, (_, i) => ({ x: 200 - i * 25, y: 80, alive: true })),
    centipedeYOffset: 0,
    spinnerHp: 25,
    spinnerHits: [] as number[],
    spinAngle: 0,
  });

  const soundtrackSources = [
    "/sounds/emergence.mp3",
    "/sounds/throughlight.mp3",
    "/sounds/continuum.mp3",
    "/sounds/battlefire.mp3",
    "/sounds/ascendence.mp3",
    "/sounds/victory.mp3",
  ];

  const playStageTrack = (stageNum: number) => {
    if (audioRef.current) {
      const src = soundtrackSources[stageNum - 1] || soundtrackSources[0];
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch(() => {
        // Autoplay can be blocked by browser until user interaction — non-fatal.
      });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (audioRef.current) audioRef.current.muted = nextMuted;
      return nextMuted;
    });
  };

  const stopSoundtrack = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  // Toggle Wallet Connect / Disconnect cleanly
  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !playerEmail) {
      return alert("Please enter your Name and Email to start!");
    }

    setScore(0);
    setStage(1);
    setTimeLeft(360);
    telemetryRef.current = [];
    lastMoveSampleRef.current = 0;
    bossRef.current = {
      x: 200,
      y: 40,
      dx: 3.5,
      dy: 2.5,
      phase: 1,
      headHp: 20,
      headHits: [],
      bodyHp: 15,
      bodyHits: [],
      centipede: Array.from({ length: 8 }, (_, i) => ({ x: 200 - i * 25, y: 80, alive: true })),
      centipedeYOffset: 0,
      spinnerHp: 25,
      spinnerHits: [],
      spinAngle: 0,
    };
    setGameState("PLAYING");
    playStageTrack(1);
  };

  // State-guarded finishSession to prevent duplicate leaderboard additions
  const finishSession = () => {
    setGameState((currentGameState) => {
      if (currentGameState === "ENDED") return "ENDED";

      stopSoundtrack();

      const currentWallet = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Not Connected";

      setScore((currentScore) => {
        const newEntry: LeaderboardEntry = {
          name: playerName || "Anonymous",
          email: playerEmail || "none@sol.io",
          score: currentScore,
          logs: telemetryRef.current.length,
          wallet: currentWallet,
        };
        setLeaderboard((prev) => [...prev, newEntry].sort((a, b) => b.score - a.score));
        return currentScore;
      });

      return "ENDED";
    });
  };

  // Timer & Stage Transitions Effect
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishSession();
          return 0;
        }

        const nextTime = prev - 1;
        const elapsedSeconds = 360 - nextTime;
        const calculatedStage = Math.min(Math.floor(elapsedSeconds / 60) + 1, 6);

        setStage((prevStage) => {
          if (calculatedStage !== prevStage) {
            playStageTrack(calculatedStage);
            return calculatedStage;
          }
          return prevStage;
        });

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Main Canvas Render Engine
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let waveOffset = 0;
    let cloakTimer = 0;
    let wasCloaked = false;

    const invaderW = 33;
    const invaderH = 24;
    let dx = stage === 2 ? 4.0 : 2.2;

    let invaders: { x: number; y: number; alive: boolean; initialY: number }[] = [];

    const initInvaders = () => {
      invaders = [];

      if (stage === 1) {
        const rows = Math.floor(Math.random() * 3) + 2;
        const cols = Math.floor(Math.random() * 3) + 4;
        const startY = Math.floor(Math.random() * 90) + 30;
        dx = (Math.random() * 2 + 1.8) * (Math.random() > 0.5 ? 1 : -1);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const iy = r * (invaderH + 16) + startY;
            invaders.push({ x: c * (invaderW + 16) + 50, y: iy, initialY: iy, alive: true });
          }
        }
      } else if (stage === 2) {
        const pattern = Math.floor(Math.random() * 3);
        dx = 4.2 * (Math.random() > 0.5 ? 1 : -1);

        if (pattern === 0) {
          const coords = [[280, 40], [220, 90], [340, 90], [160, 140], [280, 140], [400, 140], [220, 190], [340, 190], [280, 240]];
          coords.forEach(([cx, cy]) => invaders.push({ x: cx, y: cy, initialY: cy, alive: true }));
        } else if (pattern === 1) {
          const centerX = 300, centerY = 130, radius = 90;
          for (let i = 0; i < 9; i++) {
            const angle = (i / 9) * Math.PI * 2;
            const cx = centerX + Math.cos(angle) * radius - invaderW / 2;
            const cy = centerY + Math.sin(angle) * radius - invaderH / 2;
            invaders.push({ x: cx, y: cy, initialY: cy, alive: true });
          }
        } else {
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 6; c++) {
              const iy = r * (invaderH + 14) + 30;
              invaders.push({ x: c * (invaderW + 18) + 60, y: iy, initialY: iy, alive: true });
            }
          }
        }
      } else if (stage === 3 || stage === 4) {
        const startY = Math.floor(Math.random() * 100) + 30;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 6; c++) {
            const iy = r * (invaderH + 18) + startY;
            invaders.push({ x: c * (invaderW + 18) + 60, y: iy, initialY: iy, alive: true });
          }
        }
      } else if (stage === 5) {
        for (let i = 0; i < 18; i++) {
          const rx = Math.floor(Math.random() * 480) + 40;
          const ry = Math.floor(Math.random() * 180) + 30;
          invaders.push({ x: rx, y: ry, initialY: ry, alive: true });
        }
      }
    };

    if (stage < 6) initInvaders();

    // Throttled mousemove telemetry sampling (~30Hz)
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveSampleRef.current < TELEMETRY_SAMPLE_INTERVAL_MS) return;
      lastMoveSampleRef.current = now;

      const rect = canvas.getBoundingClientRect();
      telemetryRef.current.push({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
        time: Date.now(),
        stage,
        type: "move",
      });
    };

    // Unthrottled mouse clicks
    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      telemetryRef.current.push({
        x: Math.round(clickX),
        y: Math.round(clickY),
        time: Date.now(),
        stage,
        type: "click",
      });

      if (stage < 6) {
        invaders.forEach((invader) => {
          if (
            invader.alive &&
            clickX >= invader.x &&
            clickX <= invader.x + invaderW &&
            clickY >= invader.y &&
            clickY <= invader.y + invaderH
          ) {
            invader.alive = false;
            setScore((prev) => prev + 100);
          }
        });

        if (invaders.length > 0 && invaders.every((inv) => !inv.alive)) {
          initInvaders();
        }
      } else {
        const b = bossRef.current;

        if (b.phase === 1) {
          if (
            b.bodyHp > 0 &&
            clickX >= b.x + 20 && clickX <= b.x + 100 &&
            clickY >= b.y + 80 && clickY <= b.y + 130
          ) {
            b.bodyHp -= 1;
            b.bodyHits.push(b.bodyHits.length);
            setScore((prev) => prev + 200);
          } else if (
            b.headHp > 0 &&
            clickX >= b.x && clickX <= b.x + 120 &&
            clickY >= b.y && clickY <= b.y + 80
          ) {
            b.headHp -= 1;
            b.headHits.push(b.headHits.length);
            setScore((prev) => prev + 300);

            if (b.headHp <= 0) {
              b.phase = 2;
              setScore((prev) => prev + 2500);
            }
          }
        } else if (b.phase === 2) {
          b.centipede.forEach((seg) => {
            if (
              seg.alive &&
              clickX >= seg.x && clickX <= seg.x + 24 &&
              clickY >= seg.y && clickY <= seg.y + 24
            ) {
              seg.alive = false;
              setScore((prev) => prev + 250);
            }
          });

          if (b.centipede.every((seg) => !seg.alive)) {
            b.phase = 3;
            setScore((prev) => prev + 3500);
          }
        } else if (b.phase === 3) {
          if (
            clickX >= b.x && clickX <= b.x + 100 &&
            clickY >= b.y && clickY <= b.y + 100
          ) {
            b.spinnerHp -= 1;
            b.spinnerHits.push(b.spinnerHits.length);
            setScore((prev) => prev + 400);

            if (b.spinnerHp <= 0) {
              setScore((prev) => prev + 5000);
              finishSession();
            }
          }
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);

    const drawInvader = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      const p = 3;
      const sprite = [
        [0,0,1,0,0,0,0,0,1,0,0],
        [0,0,0,1,0,0,0,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,0,0],
        [0,1,1,0,1,1,1,0,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,1,0,1],
        [0,0,0,1,1,0,1,1,0,0,0]
      ];
      sprite.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell === 1) ctx.fillRect(x + c * p, y + r * p, p, p);
        });
      });
    };

    const stageColors = ["#10B981", "#F43F5E", "#FBBF24", "#A855F7", "#EF4444"];

    const renderBossForms = () => {
      const b = bossRef.current;

      if (b.phase === 1) {
        b.x += b.dx;
        if (b.x < 30 || b.x > canvas.width - 150) b.dx *= -1;

        if (b.bodyHp > 0) {
          ctx.fillStyle = "#A855F7";
          ctx.fillRect(b.x + 20, b.y + 80, 80, 50);
          ctx.fillStyle = "#EF4444";
          ctx.fillRect(b.x + 50, b.y + 95, 20, 20);

          ctx.fillStyle = "#000000";
          b.bodyHits.forEach((hitIdx) => {
            const hx = b.x + 20 + (hitIdx % 4) * 20;
            const hy = b.y + 80 + Math.floor(hitIdx / 4) * 12;
            ctx.fillRect(hx, hy, 16, 10);
          });
        }

        if (b.headHp > 0) {
          ctx.fillStyle = "#00F0FF";
          ctx.fillRect(b.x, b.y, 120, 80);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(b.x + 25, b.y + 25, 25, 12);
          ctx.fillRect(b.x + 70, b.y + 25, 25, 12);

          ctx.fillStyle = "#000000";
          b.headHits.forEach((hitIdx) => {
            const hx = b.x + (hitIdx % 5) * 24;
            const hy = b.y + Math.floor(hitIdx / 5) * 20;
            ctx.fillRect(hx, hy, 20, 16);
          });
        }
      } else if (b.phase === 2) {
        waveOffset += 0.08;
        b.centipede.forEach((seg, i) => {
          if (!seg.alive) return;
          seg.x += 4.2;
          seg.y = 110 + Math.sin(waveOffset + i * 0.4) * 55 + Math.cos(waveOffset * 0.5) * 30;

          if (seg.x > canvas.width + 20) {
            seg.x = -20;
            b.centipedeYOffset = (Math.random() - 0.5) * 40;
          }

          ctx.fillStyle = i === 0 ? "#F59E0B" : "#10B981";
          ctx.fillRect(seg.x, seg.y + b.centipedeYOffset, 24, 24);
        });
      } else if (b.phase === 3) {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < 50 || b.x > canvas.width - 150) b.dx *= -1;
        if (b.y < 30 || b.y > 150) b.dy *= -1;

        b.spinAngle += 0.1;

        ctx.save();
        ctx.translate(b.x + 50, b.y + 50);
        ctx.rotate(b.spinAngle);
        ctx.fillStyle = "#EC4899";
        ctx.fillRect(-35, -35, 70, 70);

        ctx.fillStyle = "#000000";
        b.spinnerHits.forEach((hitIdx) => {
          const hx = -35 + (hitIdx % 4) * 18;
          const hy = -35 + Math.floor(hitIdx / 4) * 18;
          ctx.fillRect(hx, hy, 14, 14);
        });

        ctx.restore();

        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillRect(b.x - 20, b.y - 10, 80, 60);
        ctx.fillRect(b.x + 30, b.y + 40, 90, 60);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (stage < 6) {
        let shiftDown = false;
        const color = stageColors[stage - 1] || "#10B981";

        invaders.forEach((inv) => {
          if (!inv.alive) return;
          if (inv.x + dx > canvas.width - invaderW - 15 || inv.x + dx < 15) {
            shiftDown = true;
          }
        });

        if (shiftDown) dx *= -1;

        waveOffset += 0.05;
        cloakTimer += 1;

        const isCloaked = stage === 5 && cloakTimer % 180 > 120;

        if (stage === 5 && wasCloaked && !isCloaked) {
          invaders.forEach((inv) => {
            if (inv.alive) {
              inv.x = Math.floor(Math.random() * 480) + 40;
              inv.y = Math.floor(Math.random() * 200) + 30;
              inv.initialY = inv.y;
            }
          });
        }
        wasCloaked = isCloaked;

        invaders.forEach((inv) => {
          if (!inv.alive) return;

          inv.x += dx;

          if (stage === 3) {
            inv.x += Math.sin(waveOffset * 1.2) * 2.5;
            inv.y = inv.initialY + Math.cos(waveOffset + inv.x * 0.02) * 25;
          }

          if (stage === 4) {
            inv.y = inv.initialY + Math.sin(waveOffset * 2 + inv.x) * 18;
          }

          if (stage === 5 && isCloaked) return;

          inv.x = Math.max(15, Math.min(canvas.width - invaderW - 15, inv.x));
          inv.y = Math.max(20, Math.min(canvas.height - invaderH - 20, inv.y));

          drawInvader(inv.x, inv.y, color);
        });
      } else {
        renderBossForms();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, stage]);

  // Phase 2a: Real API Submission to /api/verify-telemetry
  const handleSubmitTelemetry = async () => {
    if (!publicKey) return alert("Please connect your wallet first!");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/verify-telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          playerEmail,
          wallet: publicKey.toBase58(),
          score,
          telemetry: telemetryRef.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Verification Error: ${data.error || "Failed to submit telemetry"}`);
        return;
      }

      if (data.verified) {
        alert(
          `✅ HUMAN VERIFIED!\n` +
          `Score: ${data.score}\n` +
          `Human Likelihood: ${data.humanScore}%\n` +
          `Telemetry Samples: ${data.telemetryPointCount}\n\n` +
          `Payout Status: ${data.payout.status}`
        );
      } else {
        alert(
          `❌ BOT DETECTED / UNVERIFIED\n` +
          `Human Likelihood: ${data.humanScore}%\n` +
          `Check breakdown in console.`
        );
        console.log("Failed Checks:", data.checks);
      }
    } catch (err) {
      alert("Network error submitting telemetry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-6 max-w-6xl mx-auto p-4 text-white font-mono">
      <audio ref={audioRef} loop preload="auto" />

      {/* Main Game Box */}
      <div className="flex flex-col items-center bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 w-full max-w-[650px]">
        {/* Header Bar */}
        <div className="w-full flex flex-wrap justify-between items-center mb-6 gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div>STAGE: <span className="text-purple-400 font-bold">{stage}/6</span></div>
            <div>TIME: <span className="text-amber-400 font-bold">{Math.floor(timeLeft / 60)}m {timeLeft % 60}s</span></div>
            <div>SCORE: <span className="text-cyan-400 font-bold">{score}</span></div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded border border-slate-700 font-mono cursor-pointer transition-colors"
            >
              {isMuted ? "🔇 MUTED" : "🔊 SOUND ON"}
            </button>
            <button
              onClick={handleWalletClick}
              className={`px-3 py-1.5 text-xs font-bold rounded font-mono cursor-pointer transition-all ${
                connected
                  ? "bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700"
                  : "bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md"
              }`}
            >
              {connected && publicKey
                ? `DISCONNECT (${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)})`
                : "CONNECT WALLET"}
            </button>
          </div>
        </div>

        {/* Game Canvas Screen */}
        <div className="relative w-[600px] h-[400px] bg-black border-2 border-emerald-500/30 rounded-lg flex flex-col items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          {gameState === "IDLE" && (
            <form onSubmit={handleStartGame} className="text-center space-y-4 px-6 w-full max-w-sm">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-mono tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  PLAYVOU TESTBENCH
                </h2>
                <p className="text-[11px] font-mono text-slate-400">
                  AI-POWERED TELEMETRY VERIFICATION
                </p>
              </div>

              {/* Form Input */}
              <div className="space-y-2 text-left">
                <input
                  type="text"
                  placeholder="Player Name / Handle"
                  required
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={playerEmail}
                  onChange={(e) => setPlayerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
                >
                  START 6-MIN PLAYTEST
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                  ⚠️ NOTICE
                </span>
                <p className="text-[10px] font-mono text-slate-400">
                  Photosensitive content (pulsing & cloaking).
                </p>
              </div>
            </form>
          )}

          {gameState === "PLAYING" && (
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-full block bg-black cursor-crosshair"
            />
          )}

          {gameState === "ENDED" && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold font-mono text-amber-400">SESSION COMPLETED</h3>
              <p className="text-slate-300 font-mono text-sm">
                PLAYER: <span className="text-purple-400 font-bold">{playerName}</span> | SCORE: <span className="text-cyan-400">{score}</span>
              </p>
              <p className="text-slate-400 text-xs">
                TELEMETRY LOGS: <span className="text-emerald-400">{telemetryRef.current.length}</span>
              </p>
              <div className="flex space-x-3 justify-center pt-2">
                <button
                  onClick={() => setGameState("IDLE")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm rounded border border-slate-600 cursor-pointer"
                >
                  RETRY
                </button>
                <button
                  onClick={handleSubmitTelemetry}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-black font-bold font-mono text-sm rounded shadow-md cursor-pointer"
                >
                  {isSubmitting ? "VERIFYING..." : "VERIFY & CLAIM PAYOUT"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clean Rolling Leaderboard Sidebar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 w-full lg:w-[320px] shadow-2xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h3 className="text-sm font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
            🏆 LIVE LEADERBOARD
          </h3>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
            PLAYTEST
          </span>
        </div>

        {/* Scrollable Leaderboard Container */}
        <div className="max-h-[290px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono space-y-1">
              <div>NO PLAYTEST RUNS YET.</div>
              <div className="text-[10px] text-slate-600">BE THE FIRST ON THE BOARD!</div>
            </div>
          ) : (
            leaderboard.map((entry, i) => {
              const rankColors = [
                "text-amber-400",
                "text-slate-300",
                "text-amber-600",
                "text-purple-400",
                "text-cyan-400",
              ];

              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-lg text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate max-w-[170px]">
                    <span className={`font-bold text-xs ${rankColors[i] || "text-slate-500"}`}>
                      #{i + 1}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-slate-200 truncate">{entry.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{entry.wallet}</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-cyan-400 font-bold">{entry.score.toLocaleString()}</div>
                    <div className="text-[9px] text-slate-500">{entry.logs} pts</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rolling High Scores Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-center space-y-1">
          <p className="text-[11px] font-bold text-slate-300 tracking-wide">
            ⚡ ROLLING HIGH SCORES
          </p>
          <p className="text-[9px] text-slate-500">
            Playtest telemetry verified live on Solana.
          </p>
        </div>
      </div>
    </div>
  );
}