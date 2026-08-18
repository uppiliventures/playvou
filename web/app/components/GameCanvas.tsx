"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface TelemetryPoint {
  x: number;
  y: number;
  time: number;
}

interface Invader {
  id: number;
  x: number;
  y: number;
  alive: boolean;
}

export default function GameCanvas() {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize a grid of Space Invaders
  const spawnInvaders = () => {
    const list: Invader[] = [];
    let id = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        list.push({
          id: id++,
          x: 25 + col * 55,
          y: 20 + row * 45,
          alive: true,
        });
      }
    }
    setInvaders(list);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameActive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setTelemetry((prev) => [...prev, { x, y, time: Date.now() }]);
    }
  };

  const handleStartClick = () => {
    if (!connected || !publicKey) {
      setVerificationResult("⚠️ WALLET DISCONNECTED. INSERT COIN / CONNECT PHANTOM");
      setVisible(true);
      return;
    }

    setScore(0);
    setTimeLeft(15);
    setTelemetry([]);
    setVerificationResult(null);
    spawnInvaders();
    setGameActive(true);
  };

  const handleShootInvader = (id: number) => {
    if (!gameActive) return;

    setInvaders((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, alive: false } : inv))
    );
    setScore((s) => s + 100);

    // Respawn wave if all destroyed
    if (invaders.filter((i) => i.alive && i.id !== id).length === 0) {
      spawnInvaders();
    }
  };

  // Timer loop
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

  // Invader side-to-side drift movement
  useEffect(() => {
    if (!gameActive) return;
    const moveTimer = setInterval(() => {
      setInvaders((prev) =>
        prev.map((inv) => ({
          ...inv,
          x: inv.x > 260 ? 20 : inv.x + 8,
        }))
      );
    }, 400);
    return () => clearInterval(moveTimer);
  }, [gameActive]);

  const evaluateSession = async () => {
    setVerificationResult("ANALYZING HUMAN VECTORS...");

    if (!connected || !publicKey) {
      setVerificationResult("❌ ERROR: WALLET MISSING.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: telemetry }),
      });
      const data = await res.json();

      if (data.score >= 85) {
        const walletAddress = `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`;
        setVerificationResult(`👾 HUMAN VERIFIED! SCORE: ${data.score}/100 | PAYOUT TO: ${walletAddress}`);
      } else {
        setVerificationResult(`🤖 BOT PATTERN DETECTED! SCORE: ${data.score}/100 | ESCROW LOCKED`);
      }
    } catch {
      setVerificationResult(`TELEMETRY CAPTURED (${telemetry.length} PTS). VERIFIER NODE OFFLINE.`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black text-green-400 font-mono rounded-xl border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] max-w-md mx-auto my-8">
      <div className="mb-2">
        <WalletMultiButton />
      </div>

      <h1 className="text-2xl font-black tracking-widest text-center text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        SPACE INVADERS
      </h1>
      <p className="text-[10px] text-green-600 tracking-wider text-center">
        {connected
          ? `PILOT: ${publicKey?.toBase58().slice(0, 6)}...${publicKey?.toBase58().slice(-4)}`
          : "INSERT COIN (CONNECT PHANTOM) TO PLAY"}
      </p>

      <div className="flex justify-between w-full text-xs font-bold border-b-2 border-green-800 pb-2">
        <span>SCORE: {score.toString().padStart(5, "0")}</span>
        <span>TIME: {timeLeft}S</span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-[320px] h-[320px] bg-black border-2 border-green-600 overflow-hidden cursor-crosshair shadow-[inner_0_0_10px_rgba(34,197,94,0.3)]"
      >
        {gameActive &&
          invaders.map(
            (inv) =>
              inv.alive && (
                <button
                  key={inv.id}
                  onClick={() => handleShootInvader(inv.id)}
                  style={{ top: `${inv.y}px`, left: `${inv.x}px` }}
                  className="absolute text-xl leading-none select-none hover:scale-125 transition-transform duration-75 active:text-red-500"
                >
                  👾
                </button>
              )
          )}

        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3">
            <span className="text-4xl animate-bounce">👾</span>
            <button
              onClick={handleStartClick}
              className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-black tracking-widest text-sm rounded border-2 border-white shadow-[0_0_15px_rgba(34,197,94,0.8)]"
            >
              {connected ? "START MISSION" : "CONNECT WALLET"}
            </button>
          </div>
        )}
      </div>

      {verificationResult && (
        <div className="text-[11px] text-center p-3 bg-green-950/40 rounded border border-green-500 w-full text-green-300 font-mono tracking-wide">
          {verificationResult}
        </div>
      )}
    </div>
  );
}
