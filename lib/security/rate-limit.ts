import { checkRateLimit } from "@vercel/firewall";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/security/request";

type RateLimitKind = "chat" | "contact" | "session";
type Bucket = { count: number; resetAt: number };

const globalBuckets = globalThis as typeof globalThis & {
  __aminAiRateBuckets?: Map<string, Bucket>;
};

const buckets = globalBuckets.__aminAiRateBuckets ?? new Map<string, Bucket>();
globalBuckets.__aminAiRateBuckets = buckets;

function localLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  // Avoid unbounded memory growth on a warm serverless instance under abusive traffic.
  if (buckets.size > 2_000) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

function firewallIdFor(kind: RateLimitKind) {
  const ids: Record<RateLimitKind, string | undefined> = {
    chat: process.env.VERCEL_FIREWALL_CHAT_RATE_LIMIT_ID,
    contact: process.env.VERCEL_FIREWALL_CONTACT_RATE_LIMIT_ID,
    session: process.env.VERCEL_FIREWALL_SESSION_RATE_LIMIT_ID,
  };
  return ids[kind] || process.env.VERCEL_FIREWALL_RATE_LIMIT_ID;
}

export async function enforceAssistantRateLimit({
  request,
  sessionId,
  kind,
}: {
  request: NextRequest;
  sessionId: string;
  kind: RateLimitKind;
}) {
  const config = {
    chat: { limit: 6, windowMs: 60_000 },
    contact: { limit: 3, windowMs: 60 * 60_000 },
    session: { limit: 6, windowMs: 10 * 60_000 },
  }[kind];

  // Fast per-instance defense keyed by the verified session (or IP for bootstrap).
  if (localLimit(`${kind}:${sessionId}`, config.limit, config.windowMs)) {
    return true;
  }

  const firewallId = firewallIdFor(kind);
  if (!firewallId || process.env.NODE_ENV !== "production") return false;

  try {
    // Distributed Vercel WAF defense is deliberately keyed by IP, so minting a
    // new signed chat session cannot reset the production-wide quota.
    const { rateLimited } = await checkRateLimit(firewallId, {
      request,
      rateLimitKey: `${kind}:${getClientIp(request)}`,
    });
    return rateLimited;
  } catch (error) {
    console.error("Vercel firewall rate-limit check failed", error);
    // The local limiter and Turnstile still apply if the WAF check itself fails.
    return false;
  }
}
