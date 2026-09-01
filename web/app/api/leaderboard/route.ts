import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET() {
  try {
    // Fetch top 10 scores in descending order with member values
    const data = await redis.zrange("leaderboard", 0, 9, {
      rev: true,
      withScores: true,
    });

    // Format Redis output [wallet1, score1, wallet2, score2...] into array of objects
    const leaderboard = [];
    for (let i = 0; i < data.length; i += 2) {
      leaderboard.push({
        wallet: data[i] as string,
        score: data[i + 1] as number,
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Redis fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}