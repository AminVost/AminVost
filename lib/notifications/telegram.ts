type LeadNotification = {
  name: string;
  email: string;
  company?: string;
  contactMethod?: string;
  message: string;
  summary: string;
  conversationId: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendTelegramLead(lead: LeadNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { sent: false, reason: "not-configured" } as const;

  const lines = [
    "🔥 <b>New Resume Lead</b>",
    "",
    `<b>Name:</b> ${escapeHtml(lead.name)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    lead.company ? `<b>Company:</b> ${escapeHtml(lead.company)}` : "",
    lead.contactMethod
      ? `<b>Preferred contact:</b> ${escapeHtml(lead.contactMethod)}`
      : "",
    "",
    "<b>Message:</b>",
    escapeHtml(lead.message),
    "",
    "<b>AI Summary:</b>",
    escapeHtml(lead.summary),
    "",
    `<b>Conversation ID:</b> <code>${escapeHtml(lead.conversationId)}</code>`,
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Telegram notification failed: ${response.status} ${body.slice(0, 160)}`);
  }

  return { sent: true } as const;
}
