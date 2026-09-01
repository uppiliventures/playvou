import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Redis from Environment Variables
const redis = Redis.fromEnv();

// Configure Rate Limiter: Max 5 submissions per 1 minute per IP address
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Guardrail
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success: rateLimitPassed } = await ratelimit.limit(ip);

    if (!rateLimitPassed) {
      return NextResponse.json(
        { error: "Too many score submissions. Please slow down." },
        { status: 429 }
      );
    }

    // 2. Parse Payload
    const body = await req.json();
    const { playerName, email, walletAddress, score, isHumanVerified } = body;

    // 3. Anti-Cheat / Telemetry Check
    if (isHumanVerified === false) {
      return NextResponse.json(
        { error: "Anti-cheat telemetry validation failed." },
        { status: 400 }
      );
    }

    // 4. Validate Score
    if (score === undefined || score === null || isNaN(Number(score))) {
      return NextResponse.json(
        { error: "Valid numeric score is required." },
        { status: 400 }
      );
    }

    // Cap unreasonable scores to prevent integer overflow/hacked values
    const numericScore = Number(score);
    if (numericScore < 0 || numericScore > 10000000) {
      return NextResponse.json(
        { error: "Score value out of accepted bounds." },
        { status: 400 }
      );
    }

    // 5. Determine Player Display Handle
    const identifier =
      playerName?.trim() ||
      (email ? email.trim().split("@")[0] : null) ||
      (walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : null) ||
      "Anonymous Pilot";

    // 6. Save Score to Redis Sorted Set
    await redis.zadd("leaderboard", {
      score: numericScore,
      member: identifier,
    });

    // 7. Store Unique Playtester Email Privately
    if (email && typeof email === "string" && email.includes("@")) {
      await redis.sadd("playtester_emails", email.trim().toLowerCase());
    }

    return NextResponse.json({
      success: true,
      message: "Score verified and saved to Redis!",
    });
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json(
      { error: "Failed to persist score to database." },
      { status: 500 }
    );
  }
}