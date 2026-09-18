import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { enforceAssistantRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, isSameOriginRequest } from "@/lib/security/request";
import {
  assistantSessionCookie,
  createAssistantSessionToken,
  getAssistantSession,
} from "@/lib/security/session";
import { verifyTurnstile } from "@/lib/security/turnstile";

export const runtime = "nodejs";

const bodySchema = z.object({
  token: z.string().max(2048).default(""),
});

export function GET(request: NextRequest) {
  return NextResponse.json(
    { verified: Boolean(getAssistantSession(request)) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (
    await enforceAssistantRateLimit({
      request,
      sessionId: ip,
      kind: "session",
    })
  ) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please try again later." },
      { status: 429 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!(await verifyTurnstile(request, parsed.data.token))) {
    return NextResponse.json(
      { error: "Security verification failed. Please try again." },
      { status: 403 },
    );
  }

  try {
    const session = createAssistantSessionToken();
    const response = NextResponse.json({ ok: true, expiresIn: session.maxAge });
    response.cookies.set(assistantSessionCookie.name, session.token, {
      ...assistantSessionCookie.options,
      maxAge: session.maxAge,
    });
    return response;
  } catch (error) {
    console.error("Assistant session setup failed", error);
    return NextResponse.json(
      { error: "AI assistant is not configured yet." },
      { status: 503 },
    );
  }
}
