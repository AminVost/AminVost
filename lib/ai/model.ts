import { google, type GoogleLanguageModelOptions } from "@ai-sdk/google";

export const RESUME_ASSISTANT_MODEL_ID = "gemini-3.8-flash";

export const resumeAssistantModel = google(RESUME_ASSISTANT_MODEL_ID);

export const lowThinkingProviderOptions = {
  google: {
    thinkingConfig: { thinkingLevel: "low" },
  } satisfies GoogleLanguageModelOptions,
};
