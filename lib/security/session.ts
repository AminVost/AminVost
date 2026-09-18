import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "amin_ai_session";
const SESSION_TTL_SECONDS = 30 * 60;

type SessionPayload = {
  sid: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.AI_CHAT_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV !== "production") {
    return "dev-only-resume-assistant-session-secret-please-replace";
  }
  return null;
}

function encode(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createAssistantSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("AI_CHAT_SESSION_SECRET is not configured");

  const payload: SessionPayload = {
    sid: randomUUID(),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = encode(payload);
  return {
    token: `${encoded}.${sign(encoded, secret)}`,
    payload,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function verifyAssistantSessionToken(token?: string | null) {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;

  const [encoded, suppliedSignature] = token.split(".");
  if (!encoded || !suppliedSignature) return null;

  const expected = sign(encoded, secret);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expected);
  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (!payload.sid || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function getAssistantSession(request: NextRequest) {
  return verifyAssistantSessionToken(request.cookies.get(COOKIE_NAME)?.value);
}

export const assistantSessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};
