import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success: rateLimitPassed } = await ratelimit.limit(ip);

    if (!rateLimitPassed) {
      return NextResponse.json(
        { error: "Too many submissions. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { playerName, email, walletAddress, score, isHumanVerified } = body;

    if (isHumanVerified === false) {
      return NextResponse.json(
        { error: "Anti-cheat telemetry validation failed." },
        { status: 400 }
      );
    }

    if (score === undefined || score === null || isNaN(Number(score))) {
      return NextResponse.json(
        { error: "Valid numeric score is required." },
        { status: 400 }
      );
    }

    const numericScore = Number(score);
    if (numericScore < 0 || numericScore > 10000000) {
      return NextResponse.json(
        { error: "Score value out of accepted bounds." },
        { status: 400 }
      );
    }

    // 1. Clean base name (e.g., "james" -> "James")
    const rawInput =
      playerName?.trim() ||
      (email ? email.trim().split("@")[0] : null) ||
      (walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : null) ||
      "Anonymous Pilot";

    const baseName =
      rawInput.charAt(0).toUpperCase() + rawInput.slice(1);

    // 2. Identify user by unique email or wallet key
    const userKey = email ? email.trim().toLowerCase() : (walletAddress || ip);

    // 3. Check if this exact user already has a tagged display handle (e.g., "James#1042")
    let displayHandle = await redis.hget<string>("user_handles", userKey);

    if (!displayHandle) {
      // Check if the base name "James" is already taken by someone else
      const nameOwner = await redis.hget<string>("name_claims", baseName.toLowerCase());

      if (!nameOwner) {
        // Name is free! First James gets "James"
        displayHandle = baseName;
        await redis.hset("name_claims", { [baseName.toLowerCase()]: userKey });
      } else if (nameOwner === userKey) {
        // It's the original James returning
        displayHandle = baseName;
      } else {
        // Second James! Generate a unique 4-digit tag: "James#4829"
        const tag = Math.floor(1000 + Math.random() * 9000);
        displayHandle = `${baseName}#${tag}`;
      }

      // Lock this assigned handle to this user's email/wallet
      await redis.hset("user_handles", { [userKey]: displayHandle });
    }

    // 4. Save/Update Score in Redis
    await redis.zadd("leaderboard", {
      score: numericScore,
      member: displayHandle,
    });

    // 5. Store email privately for playtest rewards
    if (email && typeof email === "string" && email.includes("@")) {
      await redis.sadd("playtester_emails", email.trim().toLowerCase());
    }

    return NextResponse.json({
      success: true,
      message: "Score verified and saved!",
      assignedHandle: displayHandle,
    });
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json(
      { error: "Failed to persist score." },
      { status: 500 }
    );
  }
}