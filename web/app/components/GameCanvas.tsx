import { useState, useEffect } from "react";

// Add state hooks for inputs and leaderboard data
const [playerName, setPlayerName] = useState("");
const [email, setEmail] = useState("");
const [leaderboard, setLeaderboard] = useState<{ player: string; score: number }[]>([]);

// 1. Fetch top scores for sidebar
const fetchLeaderboard = async () => {
  try {
    const res = await fetch("/api/leaderboard");
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
        isHumanVerified: true, // Replace with dynamic telemetry flag if active
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