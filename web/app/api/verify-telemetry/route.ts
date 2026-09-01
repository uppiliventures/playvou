import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Automatically uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from .env.local
const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const { walletAddress, score, isHumanVerified } = await req.json();

    // Verify anti-cheat flag & required payload data
    if (!isHumanVerified || !walletAddress || score === undefined) {
      return NextResponse.json(
        { error: "Invalid telemetry or cheat detected" },
        { status: 400 }
      );
    }

    // Save/update score in Upstash Redis sorted set 'leaderboard'
    await redis.zadd("leaderboard", {
      score: Number(score),
      member: walletAddress,
    });

    return NextResponse.json({ success: true, message: "Score recorded!" });
  } catch (error) {
    console.error("Redis submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}