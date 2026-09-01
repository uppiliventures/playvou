import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Prevents Next.js/Vercel from caching the leaderboard on page refresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

const redis = Redis.fromEnv();

export async function GET() {
  try {
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