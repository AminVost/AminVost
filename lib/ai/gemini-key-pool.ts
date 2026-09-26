import "server-only";

import { createHash } from "node:crypto";

const MINUTE_MS = 60_000;
const DEFAULT_RETRY_MS = 60_000;

type PoolKey = {
  id: string;
  apiKey: string;
  projectId: string;
  priority: number;
  limits: {
    rpm: number | null;
    tpm: number | null;
    rpd: number | null;
  };
};

type MinuteEntry = {
  id: string;
  at: number;
  estimatedInputTokens: number;
};

type ProjectState = {
  day: string;
  dayUsed: number;
  minute: MinuteEntry[];
  blockedUntil: number;
};

type PoolState = {
  projects: Map<string, ProjectState>;
  disabledKeys: Set<string>;
};

type PoolEnvItem = {
  key?: unknown;
  apiKey?: unknown;
  projectId?: unknown;
  project?: unknown;
  priority?: unknown;
  rpm?: unknown;
  tpm?: unknown;
  rpd?: unknown;
  enabled?: unknown;
};

declare global {
  // Reused by warm Vercel instances. It is intentionally not persisted: each
  // instance still treats Google's 429 response as the source of truth.
  var aminVostGeminiPoolState: PoolState | undefined;
}

function poolState(): PoolState {
  if (!globalThis.aminVostGeminiPoolState) {
    globalThis.aminVostGeminiPoolState = {
      projects: new Map(),
      disabledKeys: new Set(),
    };
  }
  return globalThis.aminVostGeminiPoolState;
}

function positiveLimit(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

function priority(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function keyId(key: string) {
  return createHash("sha256").update(key).digest("hex").slice(0, 12);
}

function readJsonPool(): PoolEnvItem[] {
  const raw = process.env.GEMINI_API_KEY_POOL?.trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) throw new Error("must be a JSON array");
    return parsed.filter((item): item is PoolEnvItem => Boolean(item) && typeof item === "object");
  } catch (error) {
    console.error("GEMINI_API_KEY_POOL is invalid JSON", error instanceof Error ? error.message : "parse error");
    return [];
  }
}

function readSimpleKeys(): PoolEnvItem[] {
  const multiple = process.env.GOOGLE_GENERATIVE_AI_API_KEYS
    ?.split(/[\r\n,;]+/)
    .map((key) => key.trim())
    .filter(Boolean) ?? [];
  const legacy = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
  const keys = multiple.length ? multiple : legacy ? [legacy] : [];
  return keys.map((key, index) => ({ key, projectId: `gemini-project-${index + 1}` }));
}

function readPoolKeys(): PoolKey[] {
  const globalLimits = {
    rpm: positiveLimit(process.env.GEMINI_RPM_LIMIT),
    tpm: positiveLimit(process.env.GEMINI_TPM_LIMIT),
    rpd: positiveLimit(process.env.GEMINI_RPD_LIMIT),
  };
  const source = readJsonPool();
  const items = source.length ? source : readSimpleKeys();
  const seen = new Set<string>();

  return items.flatMap((item, index): PoolKey[] => {
    if (item.enabled === false) return [];
    const apiKey = typeof item.key === "string"
      ? item.key.trim()
      : typeof item.apiKey === "string"
        ? item.apiKey.trim()
        : "";
    if (!apiKey || seen.has(apiKey)) return [];
    seen.add(apiKey);

    const id = keyId(apiKey);
    const configuredProject = typeof item.projectId === "string"
      ? item.projectId.trim()
      : typeof item.project === "string"
        ? item.project.trim()
        : "";
    return [{
      id,
      apiKey,
      projectId: configuredProject || `gemini-project-${index + 1}`,
      priority: priority(item.priority, index + 1),
      limits: {
        rpm: positiveLimit(item.rpm) ?? globalLimits.rpm,
        tpm: positiveLimit(item.tpm) ?? globalLimits.tpm,
        rpd: positiveLimit(item.rpd) ?? globalLimits.rpd,
      },
    }];
  });
}

function pacificDay(now: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function zonedParts(date: Date, timeZone: string) {
  const values = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).map((part) => [part.type, part.value]));
  return {
    year: Number(values.year), month: Number(values.month), day: Number(values.day),
    hour: Number(values.hour), minute: Number(values.minute), second: Number(values.second),
  };
}

function pacificMidnightUtc(date: Date) {
  const local = zonedParts(date, "America/Los_Angeles");
  const target = Date.UTC(local.year, local.month - 1, local.day, 0, 0, 0);
  let guess = target;
  for (let index = 0; index < 4; index += 1) {
    const represented = zonedParts(new Date(guess), "America/Los_Angeles");
    const wall = Date.UTC(
      represented.year, represented.month - 1, represented.day,
      represented.hour, represented.minute, represented.second,
    );
    const difference = target - wall;
    guess += difference;
    if (difference === 0) break;
  }
  return guess;
}

function nextPacificMidnight(now = new Date()) {
  const current = pacificMidnightUtc(now);
  return pacificMidnightUtc(new Date(current + 30 * 60 * 60 * 1000));
}

function getProjectState(projectId: string, now: number) {
  const state = poolState();
  const today = pacificDay(new Date(now));
  let project = state.projects.get(projectId);
  if (!project || project.day !== today) {
    project = { day: today, dayUsed: 0, minute: [], blockedUntil: 0 };
    state.projects.set(projectId, project);
  }
  project.minute = project.minute.filter((entry) => now - entry.at < MINUTE_MS);
  if (project.blockedUntil <= now) project.blockedUntil = 0;
  return project;
}

function bodySize(body: BodyInit | null | undefined) {
  if (typeof body === "string") return Buffer.byteLength(body);
  if (body instanceof URLSearchParams) return Buffer.byteLength(body.toString());
  if (body instanceof ArrayBuffer) return body.byteLength;
  if (ArrayBuffer.isView(body)) return body.byteLength;
  return 0;
}

function estimateInputTokens(init?: RequestInit) {
  return Math.max(1, Math.ceil(bodySize(init?.body) / 4));
}

function waitForCapacity(key: PoolKey, project: ProjectState, estimatedTokens: number, now: number) {
  if (project.blockedUntil > now) return project.blockedUntil - now;
  if (key.limits.rpd !== null && project.dayUsed >= key.limits.rpd) return Infinity;

  let wait = 0;
  if (key.limits.rpm !== null && project.minute.length >= key.limits.rpm) {
    wait = Math.max(wait, project.minute[project.minute.length - key.limits.rpm].at + MINUTE_MS - now);
  }
  if (key.limits.tpm !== null) {
    let tokens = project.minute.reduce((sum, entry) => sum + entry.estimatedInputTokens, 0) + estimatedTokens;
    for (const entry of project.minute) {
      if (tokens <= key.limits.tpm) break;
      tokens -= entry.estimatedInputTokens;
      wait = Math.max(wait, entry.at + MINUTE_MS - now);
    }
  }
  return Math.max(0, wait);
}

function acquireKey(keys: PoolKey[], excluded: Set<string>, estimatedTokens: number) {
  const now = Date.now();
  const state = poolState();
  const eligible = keys
    .filter((key) => !excluded.has(key.id) && !state.disabledKeys.has(key.id))
    .map((key) => {
      const project = getProjectState(key.projectId, now);
      return { key, project, wait: waitForCapacity(key, project, estimatedTokens, now) };
    })
    .filter((candidate) => candidate.wait === 0)
    .sort((first, second) =>
      first.key.priority - second.key.priority ||
      first.project.dayUsed - second.project.dayUsed ||
      first.project.minute.length - second.project.minute.length ||
      first.key.id.localeCompare(second.key.id)
    );

  const selected = eligible[0];
  if (!selected) return null;
  selected.project.dayUsed += 1;
  const entry = {
    id: `${now}-${Math.random().toString(36).slice(2, 10)}`,
    at: now,
    estimatedInputTokens: estimatedTokens,
  };
  selected.project.minute.push(entry);
  return { ...selected, entry };
}

function releaseReservation(project: ProjectState, reservationId: string) {
  const index = project.minute.findIndex((entry) => entry.id === reservationId);
  if (index >= 0) {
    project.minute.splice(index, 1);
    project.dayUsed = Math.max(0, project.dayUsed - 1);
  }
}

function retryAfterMs(response: Response) {
  const raw = response.headers.get("retry-after");
  if (!raw) return DEFAULT_RETRY_MS;
  const seconds = Number(raw);
  if (Number.isFinite(seconds) && seconds > 0) return Math.ceil(seconds * 1000);
  const date = Date.parse(raw);
  return Number.isFinite(date) ? Math.max(1_000, date - Date.now()) : DEFAULT_RETRY_MS;
}

async function errorText(response: Response) {
  return response.clone().text().catch(() => "");
}

function isDailyQuota(text: string) {
  return /per.?day|daily|requests?[_ -]?per[_ -]?day|generate_requests_per_model_per_day/i.test(text);
}

function isInvalidKey(response: Response, text: string) {
  return response.status === 401 || response.status === 403 ||
    (response.status === 400 && /API_KEY_INVALID|API key not valid/i.test(text));
}

function headersWithKey(input: RequestInfo | URL, init: RequestInit | undefined, apiKey: string) {
  const headers = new Headers(input instanceof Request ? input.headers : undefined);
  new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
  headers.set("x-goog-api-key", apiKey);
  return headers;
}

export function hasGeminiApiKeys() {
  return readPoolKeys().length > 0;
}

/**
 * Fetch middleware for @ai-sdk/google. Every Gemini model step obtains a key,
 * so tool-loop calls are counted individually. On a key-specific quota/auth
 * error it retries with another eligible key before returning to the AI SDK.
 */
export const geminiKeyPoolFetch: typeof fetch = async (input, init) => {
  const keys = readPoolKeys();
  if (!keys.length) throw new Error("GEMINI_API_KEY_POOL_EMPTY");

  const estimatedTokens = estimateInputTokens(init);
  const excluded = new Set<string>();
  let lastResponse: Response | null = null;

  while (excluded.size < keys.length) {
    const selected = acquireKey(keys, excluded, estimatedTokens);
    if (!selected) break;
    const { key, project, entry } = selected;
    excluded.add(key.id);

    let response: Response;
    try {
      response = await fetch(input, {
        ...init,
        headers: headersWithKey(input, init, key.apiKey),
      });
    } catch (error) {
      releaseReservation(project, entry.id);
      throw error;
    }
    lastResponse = response;

    if (response.status !== 429 && response.status !== 400 && response.status !== 401 && response.status !== 403) {
      return response;
    }

    const text = await errorText(response);
    if (response.status === 429) {
      releaseReservation(project, entry.id);
      if (isDailyQuota(text)) {
        project.dayUsed = key.limits.rpd ?? project.dayUsed;
        project.blockedUntil = nextPacificMidnight();
      } else {
        project.blockedUntil = Date.now() + retryAfterMs(response);
      }
      continue;
    }

    if (isInvalidKey(response, text)) {
      releaseReservation(project, entry.id);
      poolState().disabledKeys.add(key.id);
      continue;
    }

    return response;
  }

  if (lastResponse) return lastResponse;
  throw new Error("GEMINI_API_KEY_POOL_EXHAUSTED");
};
