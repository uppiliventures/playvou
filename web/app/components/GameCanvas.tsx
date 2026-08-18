"use client";

import React, { useState, useEffect, useRef } from "react";

interface TelemetryPoint {
  x: number;
  y: number;
  time: number;
}

export default function GameCanvas() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 150, y: 150 });
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameActive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setTelemetry((prev) => [...prev, { x, y, time: Date.now() }]);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setTelemetry([]);
    setVerificationResult(null);
    setGameActive(true);
    moveTarget();
  };

  const moveTarget = () => {
    const nextX = Math.floor(Math.random() * 280) + 10;
    const nextY = Math.floor(Math.random() * 280) + 10;
    setTargetPos({ x: nextX, y: nextY });
  };

  const handleTargetClick = () => {
    if (!gameActive) return;
    setScore((prev) => prev + 1);
    moveTarget();
  };

  useEffect(() => {
    if (!gameActive) return;
    if (timeLeft === 0) {
      setGameActive(false);
      evaluateSession();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const evaluateSession = async () => {
    setVerificationResult("Analyzing Telemetry Vectors...");
    try {
      const res = await fetch("http://localhost:8000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: telemetry }),
      });
      const data = await res.json();
      if (data.score >= 85) {
        setVerificationResult(`Verified Human! Score: ${data.score}/100. Triggering Devnet Payout...`);
      } else {
        setVerificationResult(`Bot Pattern Detected! Score: ${data.score}/100. Escrow Locked.`);
      }
    } catch {
      setVerificationResult(`Telemetry captured (${telemetry.length} points). Ready for FastAPI Node.`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-900 text-white rounded-xl border border-slate-800 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold">PlayVou Telemetry Sandbox</h2>
      <p className="text-xs text-slate-400 text-center">
        Click targets to generate real-time spatial vectors & jitter data.
      </p>

      <div className="flex justify-between w-full text-sm font-semibold px-2">
        <span>Score: {score}</span>
        <span>Time Left: {timeLeft}s</span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-[320px] h-[320px] bg-slate-950 rounded-lg border border-slate-700 overflow-hidden cursor-crosshair"
      >
        {gameActive && (
          <button
            onClick={handleTargetClick}
            style={{ top: `${targetPos.y}px`, left: `${targetPos.x}px` }}
            className="absolute w-8 h-8 bg-emerald-500 rounded-full border-2 border-white transition-all duration-75 hover:scale-110 active:scale-95"
          />
        )}
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg shadow-lg"
            >
              Start Telemetry Test
            </button>
          </div>
        )}
      </div>

      {verificationResult && (
        <div className="text-xs text-center p-3 bg-slate-800 rounded border border-slate-700 w-full text-emerald-400 font-mono">
          {verificationResult}
        </div>
      )}
    </div>
  );
}
