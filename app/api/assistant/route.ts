import { NextRequest } from "next/server";
import {
  createAgentUIStreamResponse,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { createResumeAssistant } from "@/lib/ai/agent";
import {
  isPromptInjectionAttempt,
  isResumeScopedQuestion,
  scopedRefusal,
} from "@/lib/ai/scope";
import { enforceAssistantRateLimit } from "@/lib/security/rate-limit";
import { isSameOriginRequest } from "@/lib/security/request";
import { getAssistantSession } from "@/lib/security/session";

export const runtime = "nodejs";
export const maxDuration = 30;

function getTextFromMessage(message: unknown) {
  if (!message || typeof message !== "object") return "";
  const value = message as { role?: string; parts?: unknown[] };
  if (value.role !== "user" || !Array.isArray(value.parts)) return "";

  return value.parts
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const typed = part as { type?: string; text?: unknown };
      return typed.type === "text" && typeof typed.text === "string"
        ? typed.text
        : "";
    })
    .join(" ")
    .trim();
}

function sanitizeConversation(input: unknown): UIMessage[] | null {
  if (!Array.isArray(input)) return [];

  let totalTextLength = 0;
  const messages: UIMessage[] = [];

  for (const rawMessage of input.slice(-10)) {
    if (!rawMessage || typeof rawMessage !== "object") continue;
    const candidate = rawMessage as {
      id?: unknown;
      role?: unknown;
      parts?: unknown;
    };
    if (candidate.role !== "user" && candidate.role !== "assistant") continue;
    if (!Array.isArray(candidate.parts)) continue;

    // Never trust client-supplied tool results, metadata, files or hidden parts.
    // Previous text is enough for conversational continuity; factual data is
    // retrieved again through trusted server-side tools on every new turn.
    const textParts = candidate.parts
      .filter((part) => {
        if (!part || typeof part !== "object") return false;
        const typed = part as { type?: unknown; text?: unknown };
        return typed.type === "text" && typeof typed.text === "string";
      })
      .map((part) => {
        const typed = part as { text: string };
        return typed.text.slice(0, candidate.role === "user" ? 1_200 : 2_400);
      })
      .filter((text) => text.trim())
      .map((text) => ({ type: "text" as const, text }));

    if (textParts.length === 0) continue;
    totalTextLength += textParts.reduce((sum, part) => sum + part.text.length, 0);
    if (totalTextLength > 8_000) return null;

    messages.push({
      id:
        typeof candidate.id === "string" && candidate.id.length <= 120
          ? candidate.id
          : `msg-${messages.length}`,
      role: candidate.role,
      parts: textParts,
    });
  }

  return messages;
}

function staticMessage(messages: UIMessage[], text: string) {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: ({ writer }) => {
      const id = `guard-${Date.now()}`;
      writer.write({ type: "text-start", id });
      writer.write({ type: "text-delta", id, delta: text });
      writer.write({ type: "text-end", id });
    },
  });
  return createUIMessageStreamResponse({
    stream,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = getAssistantSession(request);
  if (!session) {
    return Response.json(
      { error: "Assistant session expired. Reopen the assistant to verify again." },
      { status: 401 },
    );
  }

  if (
    await enforceAssistantRateLimit({
      request,
      sessionId: session.sid,
      kind: "chat",
    })
  ) {
    return Response.json(
      { error: "Message limit reached. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 36_000) {
    return Response.json({ error: "Conversation is too large." }, { status: 413 });
  }

  const body = (await request.json().catch(() => null)) as
    | { messages?: unknown; locale?: string }
    | null;
  const messages = sanitizeConversation(body?.messages);
  if (!messages) {
    return Response.json({ error: "Conversation is too large." }, { status: 413 });
  }

  const locale = body?.locale === "fa" ? "fa" : "en";
  const lastUserMessage = [...messages]
    .reverse()
    .map(getTextFromMessage)
    .find(Boolean);

  if (!lastUserMessage || lastUserMessage.length > 1_200) {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }

  if (isPromptInjectionAttempt(lastUserMessage)) {
    return staticMessage(
      messages,
      locale === "fa"
        ? "نمی‌توانم دستورهای داخلی، کلیدها یا اطلاعات امنیتی سیستم را ارائه کنم. می‌توانم درباره رزومه، مهارت‌ها، پروژه‌ها و همکاری با امین کمک کنم."
        : "I can’t provide internal instructions, keys or security details. I can help with Amin’s resume, skills, projects and work opportunities.",
    );
  }

  // This deterministic gate runs before Gemini, so obvious general-purpose use
  // is rejected without spending Gemini tokens.
  if (!isResumeScopedQuestion(lastUserMessage)) {
    return staticMessage(messages, scopedRefusal(locale));
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "AI assistant is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    return createAgentUIStreamResponse({
      agent: createResumeAssistant(locale),
      uiMessages: messages,
      abortSignal: request.signal,
      timeout: { totalMs: 27_000 },
      headers: { "Cache-Control": "no-store" },
      onError: () =>
        locale === "fa"
          ? "دستیار هوشمند موقتاً در دسترس نیست. لطفاً دوباره تلاش کنید یا از راه‌های تماس سایت استفاده کنید."
          : "The AI assistant is temporarily unavailable. Please try again or use the contact options on the site.",
    });
  } catch (error) {
    console.error("Resume assistant failed", error);
    return Response.json(
      { error: "AI assistant is temporarily unavailable." },
      { status: 503 },
    );
  }
}
