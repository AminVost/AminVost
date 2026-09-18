# AminVost AI Resume Assistant — Setup

This feature runs inside the existing Next.js/Vercel project. It uses the site's existing `data/profile*.ts` and `data/projects*.ts` files as its source of truth; there is no separate resume database or copied resume prompt.

## 1. Install dependencies

After applying the patch:

```bash
npm install
npm run build
npm run lint
```

`npm install` must be run once because this patch changes `package.json`; commit the resulting `package-lock.json` together with the feature.

## 2. Local environment

Copy the relevant values from `.env.example` into `.env.local`.

Required for AI:

```env
GOOGLE_GENERATIVE_AI_API_KEY=
AI_CHAT_SESSION_SECRET=
```

Generate the session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

The assistant uses `gemini-3.8-flash` through the server-only `@ai-sdk/google` provider. The Gemini key is never sent to the browser.

## 3. Cloudflare Turnstile (required in production)

Create a Managed Turnstile widget and authorize the production hostnames you use, normally:

- `www.aminvost.ir`
- `aminvost.ir`

Then set:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

The browser receives only the public site key. The secret is used only by `/api/assistant/session` to validate the token with Cloudflare Siteverify. After validation, the server creates a short-lived signed HttpOnly session cookie.

For a Vercel Preview deployment, either add that exact preview hostname to a test Turnstile widget or use Cloudflare's official test keys for local/preview testing. Do not use test keys in Production.

## 4. Telegram lead notifications (recommended)

1. Create a bot with `@BotFather` and copy the bot token.
2. Open the bot from your Telegram account and send it one message.
3. Read the bot's `getUpdates` response and copy your `chat.id`.
4. Set:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

No Telegram secret is exposed to client-side code.

## 5. Optional email notification

The implementation can also send the same lead through Resend without adding another npm package. Configure:

```env
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=
```

`CONTACT_EMAIL_FROM` must be a sender/domain accepted by your Resend account. If these values are empty, Telegram can be used alone.

## 6. Vercel distributed rate limiting (strongly recommended)

The app already has a small in-process limiter, but serverless instances do not share memory. For production abuse protection, create three Vercel Firewall rules whose first condition is `@vercel/firewall` and assign distinct Rate Limit IDs, for example:

- `amin-ai-chat` — suggested starting point: 20 requests / 10 minutes / IP
- `amin-ai-session` — suggested starting point: 6 requests / 10 minutes / IP
- `amin-ai-contact` — suggested starting point: 3 requests / 10 minutes / IP

Then set:

```env
VERCEL_FIREWALL_CHAT_RATE_LIMIT_ID=amin-ai-chat
VERCEL_FIREWALL_SESSION_RATE_LIMIT_ID=amin-ai-session
VERCEL_FIREWALL_CONTACT_RATE_LIMIT_ID=amin-ai-contact
```

The code uses the signed chat session for the local limiter and the visitor IP for the distributed Vercel limiter, so creating a new chat session does not reset the production-wide IP quota.

Vercel Hobby currently allows only one WAF rate-limit rule per project. On Hobby, create one `@vercel/firewall` rule (for example `amin-ai`) and set only:

```env
VERCEL_FIREWALL_RATE_LIMIT_ID=amin-ai
```

The code prefixes its custom key with `chat`, `session` or `contact`, so the single rule still gets separate per-flow buckets for each IP. Use a conservative shared dashboard threshold such as 20 requests / 10 minutes / bucket; the built-in local guards and Turnstile remain additional layers. On Pro/Enterprise, separate IDs are preferred because each flow can have its own distributed threshold.

## 7. Google API cost protection

In the Google project that owns the Gemini key:

- restrict the key to the Gemini / Generative Language API where available;
- configure API quotas appropriate for a personal portfolio;
- configure billing/usage alerts;
- never add the key to `NEXT_PUBLIC_*` variables.

The application also limits cost before the model is called:

- Turnstile verification is required in Production;
- off-topic/general-purpose requests are rejected before Gemini;
- obvious prompt-injection requests are rejected before Gemini;
- only the last 10 text messages are accepted;
- client-supplied tool results/files/metadata are discarded;
- total conversation text is capped;
- output tokens and agent steps are capped;
- only relevant project records are returned to the model.

## 8. Vercel Environment Variables

In **Vercel → Project → Settings → Environment Variables**, add at least:

```text
GOOGLE_GENERATIVE_AI_API_KEY
AI_CHAT_SESSION_SECRET
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
VERCEL_FIREWALL_CHAT_RATE_LIMIT_ID
VERCEL_FIREWALL_SESSION_RATE_LIMIT_ID
VERCEL_FIREWALL_CONTACT_RATE_LIMIT_ID
```

Add the Resend variables only if email notifications are wanted.

Set the variables for Production. Add them to Preview too if you want to test the complete flow on a Vercel Preview URL.

## 9. Verify before Production

Test these cases on the Vercel Preview deployment:

1. Open AI assistant → Turnstile → chat opens.
2. Ask about Next.js, React Native, AI/OCR, work history and availability.
3. Ask for relevant projects → project cards link to the correct portfolio pages.
4. Ask an unrelated question such as current Bitcoin price → it is rejected without becoming a general-purpose assistant.
5. Try a prompt-injection request asking for API keys/system prompt → it is rejected.
6. Use **Work with Amin** → submit the contact form → Telegram arrives.
7. Refresh the page → chat history is kept only for the browser session.
8. Confirm `/api/ai/profile` reflects the current site data.
9. Test both English and Persian pages on desktop and mobile.

## 10. Data updates later

Do not edit an AI-specific resume prompt. Continue updating the normal site data files:

```text
data/profile.ts
data/profile-fa.ts
data/projects.ts
data/projects-fa.ts
```

The website, `/api/ai/profile`, Agent tools, project recommendations and contact answers all read from those same files in each deployment.
