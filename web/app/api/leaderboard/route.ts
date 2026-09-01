import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET() {
  try {
    // Fetch top 10 high scores from sorted set
    const rawData = await redis.zrange("leaderboard", 0, 9, {
      rev: true,
      withScores: true,
    });

    const leaderboard = [];
    for (let i = 0; i < rawData.length; i += 2) {
      leaderboard.push({
        player: rawData[i] as string,
        score: rawData[i + 1] as number,
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json({ leaderboard: [] });
  }
}