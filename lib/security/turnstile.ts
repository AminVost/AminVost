import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/security/request";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(
  request: NextRequest,
  token: string,
): Promise<boolean> {
  if (process.env.NODE_ENV !== "production" && !process.env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token || token.length > 2048) return false;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: getClientIp(request),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResponse;
  if (!result.success) return false;

  if (result.action && result.action !== "resume_assistant") return false;

  const requestHost = request.headers.get("host")?.split(":")[0];
  return !result.hostname || !requestHost || result.hostname === requestHost;
}
