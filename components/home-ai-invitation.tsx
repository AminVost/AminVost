"use client";

const OPEN_ASSISTANT_EVENT = "aminvost:open-assistant";

export function HomeAiInvitation({ locale = "en" }: { locale?: "en" | "fa" }) {
  const isFa = locale === "fa";

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT, {
      detail: { source: "home_ai_invitation" },
    }));
  };

  const suggestions = isFa
    ? ["تجربه موبایل امین", "پروژه‌های مرتبط", "شروع همکاری"]
    : ["Amin's mobile work", "Relevant projects", "Start a conversation"];

  return (
    <section className="shell home-ai-invitation" aria-labelledby="home-ai-title">
      <div className="home-ai-copy">
        <div className="home-ai-kicker">
          <span className="home-ai-live-dot" aria-hidden="true" />
          {isFa ? "دستیار هوشمند رزومه · آنلاین" : "AI portfolio guide · Online"}
        </div>

        <h2 id="home-ai-title">
          {isFa ? (
            <>لازم نیست همه‌چیز را بگردید؛ <span>از هوش مصنوعی درباره امین بپرسید.</span></>
          ) : (
            <>Don&apos;t search through everything. <span>Ask AI about Amin.</span></>
          )}
        </h2>

        <p>
          {isFa
            ? "درباره تجربه کاری، مهارت‌ها، پروژه‌های مرتبط یا امکان همکاری سؤال کنید و بر اساس اطلاعات واقعی همین رزومه پاسخ بگیرید."
            : "Ask about experience, skills, relevant projects or working together and get answers grounded in this portfolio's real data."}
        </p>

        <div className="home-ai-suggestions" aria-label={isFa ? "پیشنهادهای گفتگو" : "Conversation suggestions"}>
          {suggestions.map((suggestion) => (
            <button type="button" onClick={openAssistant} key={suggestion}>
              <span>{suggestion}</span>
              <ArrowIcon />
            </button>
          ))}
        </div>

        <button className="home-ai-primary" type="button" onClick={openAssistant}>
          <SparkIcon />
          <span>{isFa ? "شروع گفتگو با AminVost AI" : "Start a conversation with AminVost AI"}</span>
          <ArrowIcon />
        </button>
      </div>

      <div className="home-ai-stage" aria-hidden="true">
        <div className="home-ai-orbit home-ai-orbit-one" />
        <div className="home-ai-orbit home-ai-orbit-two" />
        <span className="home-ai-orbit-node home-ai-node-one">RN</span>
        <span className="home-ai-orbit-node home-ai-node-two">API</span>
        <span className="home-ai-orbit-node home-ai-node-three">AI</span>

        <div className="home-ai-window">
          <div className="home-ai-window-head">
            <span className="home-ai-avatar">AI</span>
            <div>
              <strong>AminVost AI</strong>
              <small><i />{isFa ? "آماده پاسخ‌گویی" : "Ready to help"}</small>
            </div>
            <span className="home-ai-spark"><SparkIcon /></span>
          </div>

          <div className="home-ai-conversation">
            <div className="home-ai-message is-question">
              {isFa ? "امین برای یک محصول موبایل چه تجربه‌ای دارد؟" : "What mobile product experience does Amin have?"}
            </div>
            <div className="home-ai-message is-answer">
              <span className="home-ai-mini-avatar"><SparkIcon /></span>
              <p>
                {isFa
                  ? "تجربه React Native برای iOS و Android، اتصال به Device API، BLE، NFC و ساخت PWAهای آفلاین."
                  : "React Native delivery for iOS and Android, device APIs, BLE, NFC and offline-capable PWAs."}
              </p>
            </div>
            <div className="home-ai-thinking"><i /><i /><i /></div>
          </div>

          <div className="home-ai-composer-preview">
            <span>{isFa ? "هر سؤالی درباره امین دارید بپرسید…" : "Ask anything about Amin…"}</span>
            <b><ArrowIcon /></b>
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8c.65 4.4 2.8 6.55 7.2 7.2-4.4.65-6.55 2.8-7.2 7.2-.65-4.4-2.8-6.55-7.2-7.2 4.4-.65 6.55-2.8 7.2-7.2Z" />
      <path d="M18.4 15.2c.27 1.82 1.16 2.72 2.98 2.98-1.82.27-2.71 1.16-2.98 2.98-.27-1.82-1.16-2.71-2.98-2.98 1.82-.26 2.71-1.16 2.98-2.98Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
