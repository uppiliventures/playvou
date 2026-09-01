import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const { playerName, email, walletAddress, score, isHumanVerified } = await req.json();

    // Verify anti-cheat flag
    if (isHumanVerified === false) {
      return NextResponse.json(
        { error: "Telemetry validation failed" },
        { status: 400 }
      );
    }

    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: "Score is required" },
        { status: 400 }
      );
    }

    // Determine the player's display name (Handle -> Email -> Wallet -> Anonymous)
    const identifier =
      playerName?.trim() ||
      (email ? email.trim().split("@")[0] : null) ||
      (walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : null) ||
      "Anonymous Pilot";

    // 1. Save score to Upstash Redis sorted set 'leaderboard'
    await redis.zadd("leaderboard", {
      score: Number(score),
      member: identifier,
    });

    // 2. Save email to a private set for playtest rewards
    if (email && email.includes("@")) {
      await redis.sadd("playtester_emails", email.trim().toLowerCase());
    }

    return NextResponse.json({ success: true, message: "Score saved to Redis!" });
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json(
      { error: "Failed to persist score" },
      { status: 500 }
    );
  }
}