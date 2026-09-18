type LeadEmail = {
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
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendEmailLead(lead: LeadEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !to || !from) return { sent: false, reason: "not-configured" } as const;

  const html = `
    <h2>New Resume Lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    ${lead.company ? `<p><strong>Company:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    ${lead.contactMethod ? `<p><strong>Preferred contact:</strong> ${escapeHtml(lead.contactMethod)}</p>` : ""}
    <p><strong>Message:</strong><br>${escapeHtml(lead.message).replaceAll("\n", "<br>")}</p>
    <p><strong>AI summary:</strong><br>${escapeHtml(lead.summary)}</p>
    <p><strong>Conversation ID:</strong> ${escapeHtml(lead.conversationId)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New AminVost resume lead — ${lead.name}`,
      html,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Email notification failed: ${response.status} ${body.slice(0, 160)}`);
  }

  return { sent: true } as const;
}
