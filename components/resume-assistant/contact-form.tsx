"use client";

import { FormEvent, useState } from "react";
import type { UIMessage } from "ai";
import { trackResumeAssistantEvent } from "@/lib/analytics";

function conversationText(messages: UIMessage[]) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-10)
    .map((message) => ({
      role: message.role as "user" | "assistant",
      text: message.parts
        .filter((part) => part.type === "text")
        .map((part) => (part.type === "text" ? part.text : ""))
        .join(" ")
        .slice(0, 700),
    }))
    .filter((item) => item.text.trim());
}

export function ContactForm({
  locale,
  messages,
  defaultMessage = "",
}: {
  locale: "en" | "fa";
  messages: UIMessage[];
  defaultMessage?: string;
}) {
  const isFa = locale === "fa";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      contactMethod: String(form.get("contactMethod") || "") || undefined,
      message: String(form.get("message") || ""),
      locale,
      conversation: conversationText(messages),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not send message");
      setStatus("success");
      trackResumeAssistantEvent("contact_request_submitted", { locale });
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : isFa
            ? "ارسال پیام انجام نشد."
            : "Message could not be sent.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="resume-contact-success" role="status">
        <span aria-hidden="true">✓</span>
        <div>
          <strong>{isFa ? "پیام ارسال شد" : "Message sent"}</strong>
          <p>
            {isFa
              ? "درخواست شما برای امین ارسال شد. در صورت نیاز از طریق اطلاعاتی که وارد کردید با شما تماس گرفته می‌شود."
              : "Your request was sent to Amin. He can follow up using the contact details you provided."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="resume-contact-form" onSubmit={handleSubmit}>
      <div className="resume-contact-form-head">
        <strong>{isFa ? "شروع گفتگو درباره همکاری" : "Start a work conversation"}</strong>
        <span>{isFa ? "فقط اطلاعات ضروری" : "Only the essentials"}</span>
      </div>
      <div className="resume-contact-grid">
        <label>
          <span>{isFa ? "نام" : "Name"}</span>
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>{isFa ? "ایمیل" : "Email"}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label>
          <span>{isFa ? "شرکت (اختیاری)" : "Company (optional)"}</span>
          <input name="company" maxLength={120} autoComplete="organization" />
        </label>
        <label>
          <span>{isFa ? "روش تماس ترجیحی" : "Preferred contact"}</span>
          <select name="contactMethod" defaultValue="email">
            <option value="email">Email</option>
            <option value="telegram">Telegram</option>
            <option value="phone">{isFa ? "تلفن" : "Phone"}</option>
          </select>
        </label>
      </div>
      <label className="resume-contact-message">
        <span>{isFa ? "خلاصه پروژه یا پیام" : "Short project / message"}</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          defaultValue={defaultMessage}
          placeholder={
            isFa
              ? "مثلاً درباره نوع پروژه، تکنولوژی یا چیزی که می‌خواهید درباره‌اش صحبت کنید…"
              : "A short note about the project, technology, or what you'd like to discuss…"
          }
        />
      </label>
      <p className="resume-contact-privacy">
        {isFa
          ? "با ارسال این فرم، اطلاعات تماس و پیام شما برای صاحب این وب‌سایت (امین اسدی وسطی) ارسال می‌شود و ممکن است دستیار AI فقط برای ساخت یک خلاصه کوتاه از پیام آن را پردازش کند."
          : "By submitting, your contact details and message will be shared with the website owner, Amin Asadi Vosta. The AI assistant may process the message only to create a short lead summary."}
      </p>
      {status === "error" && error && <p className="resume-assistant-inline-error">{error}</p>}
      <button className="resume-contact-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (isFa ? "در حال ارسال…" : "Sending…") : isFa ? "ارسال پیام" : "Send message"}
      </button>
    </form>
  );
}
