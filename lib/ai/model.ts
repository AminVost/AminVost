import { createGoogleGenerativeAI, type GoogleLanguageModelOptions } from "@ai-sdk/google";
import { geminiKeyPoolFetch } from "@/lib/ai/gemini-key-pool";

export const RESUME_ASSISTANT_MODEL_ID = "gemini-2.5-flash";

const pooledGoogle = createGoogleGenerativeAI({
  // The real key is selected server-side by geminiKeyPoolFetch for every call.
  apiKey: "managed-by-gemini-key-pool",
  fetch: geminiKeyPoolFetch,
});

export const resumeAssistantModel = pooledGoogle(RESUME_ASSISTANT_MODEL_ID);

export const lowThinkingProviderOptions = {
  google: {
    thinkingConfig: {
      thinkingBudget: 1024,
    },
  } satisfies GoogleLanguageModelOptions,
};
