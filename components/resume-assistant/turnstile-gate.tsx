"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme?: "auto" | "light" | "dark";
      size?: "normal" | "compact" | "flexible";
      appearance?: "always" | "execute" | "interaction-only";
      action?: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileGate({
  locale,
  onVerified,
}: {
  locale: "en" | "fa";
  onVerified: () => void;
}) {
  const isFa = locale === "fa";
  const turnstileEnabled = process.env.NEXT_PUBLIC_AI_TURNSTILE_ENABLED === "true";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [checkedExisting, setCheckedExisting] = useState(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "error">("idle");
  const [error, setError] = useState("");

  const createSession = useCallback(
    async (token: string) => {
      setStatus("verifying");
      setError("");
      try {
        const response = await fetch("/api/assistant/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ token }),
        });
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        if (!response.ok) throw new Error(data.error || "Verification failed");
        onVerified();
      } catch (sessionError) {
        setStatus("error");
        setError(
          sessionError instanceof Error
            ? sessionError.message
            : isFa
              ? "تأیید امنیتی انجام نشد."
              : "Security verification failed.",
        );
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      }
    },
    [isFa, onVerified],
  );

  useEffect(() => {
    let active = true;
    const bypassTurnstile =
      !turnstileEnabled || (process.env.NODE_ENV !== "production" && !siteKey);

    void fetch("/api/assistant/session", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    })
      .then(async (response) => {
        const data = (await response.json().catch(() => ({}))) as { verified?: boolean };
        if (!active) return;
        if (response.ok && data.verified) {
          onVerified();
          return;
        }

        setCheckedExisting(true);
        if (bypassTurnstile) void createSession("");
      })
      .catch(() => {
        if (!active) return;
        setCheckedExisting(true);
        if (bypassTurnstile) void createSession("");
      });

    return () => {
      active = false;
    };
  }, [createSession, onVerified, siteKey, turnstileEnabled]);

  useEffect(() => {
    if (!turnstileEnabled) return;
    if (!checkedExisting || !siteKey || !scriptReady || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      size: "flexible",
      appearance: "interaction-only",
      action: "resume_assistant",
      callback: (token) => void createSession(token),
      "error-callback": () => {
        setStatus("error");
        setError(
          isFa
            ? "بررسی امنیتی بارگذاری نشد. لطفاً دوباره تلاش کنید."
            : "Security check could not load. Please try again.",
        );
      },
      "expired-callback": () => {
        setStatus("idle");
        setError("");
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [checkedExisting, createSession, isFa, scriptReady, siteKey, turnstileEnabled]);

  if (!checkedExisting) {
    return (
      <div className="resume-assistant-gate" aria-live="polite">
        <GateIcon />
        <h3>{isFa ? "در حال بررسی نشست امن…" : "Checking secure session…"}</h3>
        <div className="resume-assistant-gate-status">
          <span className="resume-assistant-spinner" />
          {isFa ? "یک لحظه…" : "One moment…"}
        </div>
      </div>
    );
  }

  if (turnstileEnabled && !siteKey && process.env.NODE_ENV === "production") {
    return (
      <div className="resume-assistant-gate">
        <GateIcon />
        <h3>{isFa ? "دستیار هنوز فعال نشده" : "Assistant setup incomplete"}</h3>
        <p>
          {isFa
            ? "تنظیمات امنیتی Turnstile در سرور کامل نشده است. راه‌های تماس عادی سایت همچنان در دسترس هستند."
            : "Turnstile security is not configured on the server yet. The normal contact options are still available."}
        </p>
      </div>
    );
  }

  if (!turnstileEnabled) {
    return (
      <div className="resume-assistant-gate" aria-live="polite">
        <GateIcon />
        <h3>{isFa ? "در حال آماده‌سازی دستیار…" : "Preparing AI assistant…"}</h3>
        {status === "error" && error ? (
          <p className="resume-assistant-inline-error">{error}</p>
        ) : (
          <div className="resume-assistant-gate-status">
            <span className="resume-assistant-spinner" />
            {isFa ? "یک لحظه…" : "One moment…"}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="resume-assistant-gate">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      )}
      <GateIcon />
      <h3>{isFa ? "یک بررسی امنیتی کوتاه" : "One quick security check"}</h3>
      <p>
        {isFa
          ? "برای جلوگیری از سوءاستفاده از API، قبل از شروع گفتگو یک بررسی ضدربات انجام می‌شود."
          : "A lightweight anti-bot check protects the AI API from automated abuse before chat starts."}
      </p>
      <div ref={containerRef} className="resume-assistant-turnstile" />
      {status === "verifying" && (
        <div className="resume-assistant-gate-status">
          <span className="resume-assistant-spinner" />
          {isFa ? "در حال آماده‌سازی گفتگو…" : "Preparing secure chat…"}
        </div>
      )}
      {status === "error" && error && <p className="resume-assistant-inline-error">{error}</p>}
    </div>
  );
}

function GateIcon() {
  return (
    <span className="resume-assistant-gate-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 3.2 19 6v5.2c0 4.2-2.45 7.55-7 9.6-4.55-2.05-7-5.4-7-9.6V6l7-2.8Z" />
        <path d="m9 12 2 2 4.2-4.4" />
      </svg>
    </span>
  );
}
