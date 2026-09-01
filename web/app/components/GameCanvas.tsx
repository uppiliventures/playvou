"use client";

import { useState, useEffect } from "react";

export default function GameCanvas() {
  // State hooks for inputs and leaderboard data
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [leaderboard, setLeaderboard] = useState<{ player: string; score: number }[]>([]);

  // 1. Fetch top scores for sidebar
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      const data = await res.json();
      if (data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
    }
  };

  // Load leaderboard on initial render
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // 2. Call this function when a playtest round completes
  const handleGameOver = async (finalScore: number) => {
    try {
      const response = await fetch("/api/verify-telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName,
          email: email,
          score: finalScore,
          isHumanVerified: true,
        }),
      });

      if (response.ok) {
        // Instantly update the leaderboard display
        await fetchLeaderboard();
      }
    } catch (err) {
      console.error("Error submitting score:", err);
    }
  };

  return (
    <div className="p-4 text-white">
      {/* Insert your canvas rendering & sidebar markup here */}
      <h2>Game Canvas Sandbox</h2>
    </div>
  );
}