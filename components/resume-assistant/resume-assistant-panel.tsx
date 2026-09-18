"use client";

import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContactForm } from "./contact-form";
import { TurnstileGate } from "./turnstile-gate";
import { trackResumeAssistantEvent } from "@/lib/analytics";

const STORAGE_PREFIX = "aminvost-resume-chat-v1";

export function ResumeAssistantPanel({
  locale,
  onClose,
}: {
  locale: "en" | "fa";
  onClose: () => void;
}) {
  const [verified, setVerified] = useState(false);
  const isFa = locale === "fa";

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      id="resume-assistant-dialog"
      className="resume-assistant-panel"
      role="dialog"
      aria-modal="true"
      aria-label={isFa ? "دستیار هوشمند رزومه" : "AI resume assistant"}
    >
      <header className="resume-assistant-header">
        <div className="resume-assistant-identity">
          <span className="resume-assistant-avatar" aria-hidden="true">AI</span>
          <div>
            <strong>AminVost AI</strong>
            <span><i />{isFa ? "دستیار هوشمند امین اسدی وسطی" : "AI assistant for Amin Asadi Vosta"}</span>
          </div>
        </div>
        <button type="button" className="resume-assistant-close" onClick={onClose} aria-label={isFa ? "بستن" : "Close"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </header>

      {!verified ? (
        <TurnstileGate locale={locale} onVerified={() => setVerified(true)} />
      ) : (
        <AssistantChat locale={locale} onSessionExpired={() => setVerified(false)} />
      )}
    </section>
  );
}

function AssistantChat({
  locale,
  onSessionExpired,
}: {
  locale: "en" | "fa";
  onSessionExpired: () => void;
}) {
  const isFa = locale === "fa";
  const [input, setInput] = useState("");
  const [directContact, setDirectContact] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const storageKey = `${STORAGE_PREFIX}:${locale}`;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/assistant",
        credentials: "same-origin",
        prepareSendMessagesRequest: ({ messages }) => ({
          body: {
            messages: messages.slice(-10),
            locale,
          },
        }),
      }),
    [locale],
  );

  const { messages, sendMessage, status, error, setMessages, stop } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as UIMessage[];
      if (Array.isArray(parsed)) setMessages(parsed.slice(-12));
    } catch {
      window.sessionStorage.removeItem(storageKey);
    }
  }, [setMessages, storageKey]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-12)));
    } catch {
      // Session persistence is optional; ignore private-mode storage failures.
    }
  }, [messages, storageKey]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  }, [messages, status, directContact]);

  const submitText = async (text: string) => {
    const value = text.trim();
    if (!value || busy || value.length > 1200) return;
    setInput("");
    trackResumeAssistantEvent("agent_message_sent", { locale });
    await sendMessage({ text: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitText(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitText(input);
    }
  };

  const quickActions = isFa
    ? [
        ["تجربه کاری", "درباره تجربه کاری و سابقه حرفه‌ای امین توضیح بده."],
        ["مهارت‌ها", "مهارت‌های اصلی امین چیست؟"],
        ["تجربه AI", "امین در هوش مصنوعی و OCR چه تجربه‌ای دارد؟"],
        ["پروژه‌های مرتبط", "چند پروژه مهم و متنوع امین را معرفی کن."],
      ]
    : [
        ["Experience", "Tell me about Amin's professional experience."],
        ["Skills", "What are Amin's main technical skills?"],
        ["AI experience", "What experience does Amin have with AI and OCR?"],
        ["Relevant projects", "Show me a few important and varied projects Amin has worked on."],
      ];

  return (
    <>
      <div className="resume-assistant-messages" ref={scrollRef} aria-live="polite">
        <div className="resume-assistant-welcome">
          <span className="resume-assistant-welcome-mark" aria-hidden="true">✦</span>
          <h3>{isFa ? "درباره امین چه می‌خواهید بدانید؟" : "What would you like to know about Amin?"}</h3>
          <p>
            {isFa
              ? "می‌توانم بر اساس اطلاعات واقعی این رزومه درباره مهارت‌ها، پروژه‌ها، سابقه و امکان همکاری پاسخ بدهم."
              : "I can answer from the real portfolio data about skills, projects, experience and working with Amin."}
          </p>
        </div>

        {messages.length === 0 && !directContact && (
          <div className="resume-assistant-quick-actions">
            {quickActions.map(([label, message]) => (
              <button key={label} type="button" onClick={() => void submitText(message)} disabled={busy}>
                {label}<span aria-hidden="true">→</span>
              </button>
            ))}
            <button
              type="button"
              className="is-primary"
              onClick={() => {
                setDirectContact(true);
                trackResumeAssistantEvent("contact_form_opened", { locale, source: "quick_action" });
              }}
            >
              {isFa ? "همکاری با امین" : "Work with Amin"}<span aria-hidden="true">↗</span>
            </button>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} locale={locale} allMessages={messages} />
        ))}

        {directContact && <ContactForm locale={locale} messages={messages} />}

        {status === "submitted" && (
          <div className="resume-assistant-thinking">
            <span className="resume-assistant-spinner" />
            {isFa ? "در حال بررسی رزومه…" : "Checking the portfolio…"}
          </div>
        )}

        {error && (
          <div className="resume-assistant-error-card" role="alert">
            <strong>{isFa ? "ارتباط با دستیار قطع شد" : "Assistant connection issue"}</strong>
            <p>
              {isFa
                ? "دوباره تلاش کنید. اگر نشست امنیتی منقضی شده باشد، اتصال را تازه کنید."
                : "Try again. If the secure session expired, reconnect first."}
            </p>
            <div>
              <button type="button" onClick={onSessionExpired}>{isFa ? "اتصال مجدد" : "Reconnect"}</button>
              <a href="mailto:aminvost@gmail.com">Email</a>
              <a href="https://t.me/aminvost" target="_blank" rel="noreferrer">Telegram</a>
            </div>
          </div>
        )}
      </div>

      <footer className="resume-assistant-composer-wrap">
        <form className="resume-assistant-composer" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, 1200))}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={1200}
            disabled={busy}
            placeholder={isFa ? "مثلاً: تجربه React Native دارد؟" : "e.g. Has he built React Native apps?"}
            aria-label={isFa ? "پیام به دستیار" : "Message the assistant"}
          />
          {busy ? (
            <button type="button" className="resume-assistant-send is-stop" onClick={() => void stop()} aria-label={isFa ? "توقف" : "Stop"}>
              <span />
            </button>
          ) : (
            <button type="submit" className="resume-assistant-send" disabled={!input.trim()} aria-label={isFa ? "ارسال" : "Send"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 15-7-5.6 14-2.1-5.3L4 12Z" /><path d="m11.3 13.7 7.7-8.7" /></svg>
            </button>
          )}
        </form>
        <div className="resume-assistant-disclaimer">
          <span>{isFa ? "بر اساس داده‌های همین رزومه" : "Grounded in this portfolio's data"}</span>
          <button type="button" onClick={() => setMessages([])}>{isFa ? "پاک کردن گفتگو" : "Clear chat"}</button>
        </div>
      </footer>
    </>
  );
}

function ChatMessage({
  message,
  locale,
  allMessages,
}: {
  message: UIMessage;
  locale: "en" | "fa";
  allMessages: UIMessage[];
}) {
  const isUser = message.role === "user";

  return (
    <div className={`resume-assistant-message ${isUser ? "is-user" : "is-assistant"}`}>
      {message.parts.map((part, index) => {
        if (part.type === "text") {
          return <div className="resume-assistant-bubble" key={`${message.id}-text-${index}`}>{part.text}</div>;
        }

        const partType = (part as { type: string }).type;
        if (partType === "tool-searchProjects" || partType === "tool-getFeaturedProjects") {
          const toolPart = part as unknown as ProjectToolPartValue;
          return <ProjectToolPart key={toolPart.toolCallId} part={toolPart} locale={locale} />;
        }

        if (partType === "tool-startContactFlow") {
          const toolPart = part as unknown as ContactToolPartValue;
          return (
            <ContactToolPart
              key={toolPart.toolCallId}
              part={toolPart}
              locale={locale}
              messages={allMessages}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

type ProjectResult = {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  projectUrl: string;
  relevance: number;
};

type ProjectToolPartValue = {
  toolCallId: string;
  state: string;
  output?: ProjectResult[];
};

function ProjectToolPart({ part, locale }: { part: ProjectToolPartValue; locale: "en" | "fa" }) {
  const tracked = useRef(false);
  const projects = part.state === "output-available" && Array.isArray(part.output) ? part.output : [];

  useEffect(() => {
    if (!projects.length || tracked.current) return;
    tracked.current = true;
    trackResumeAssistantEvent("project_recommended", { locale, count: projects.length });
  }, [locale, projects.length]);

  if (!projects.length) return null;

  return (
    <div className="resume-assistant-projects">
      {projects.map((project) => (
        <Link href={project.projectUrl} className="resume-assistant-project-card" key={project.slug}>
          <div>
            <strong>{project.title}</strong>
            <p>{project.summary}</p>
          </div>
          <div className="resume-assistant-project-meta">
            <span>{project.technologies.slice(0, 3).join(" · ")}</span>
            <i aria-hidden="true">↗</i>
          </div>
        </Link>
      ))}
    </div>
  );
}

type ContactToolPartValue = {
  toolCallId: string;
  state: string;
  output?: { showContactForm?: boolean; reason?: string };
};

function ContactToolPart({
  part,
  locale,
  messages,
}: {
  part: ContactToolPartValue;
  locale: "en" | "fa";
  messages: UIMessage[];
}) {
  const tracked = useRef(false);
  const show = part.state === "output-available" && part.output?.showContactForm;

  useEffect(() => {
    if (!show || tracked.current) return;
    tracked.current = true;
    trackResumeAssistantEvent("contact_intent_detected", { locale });
    trackResumeAssistantEvent("contact_form_opened", { locale, source: "agent" });
  }, [locale, show]);

  if (!show) return null;
  return <ContactForm locale={locale} messages={messages} defaultMessage={part.output?.reason ?? ""} />;
}
