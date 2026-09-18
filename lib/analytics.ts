export type ResumeAssistantEvent =
  | "agent_opened"
  | "agent_message_sent"
  | "project_recommended"
  | "contact_intent_detected"
  | "contact_form_opened"
  | "contact_request_submitted";

type AnalyticsWindow = Window & {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
};

export function trackResumeAssistantEvent(
  event: ResumeAssistantEvent,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  const gtag = (window as AnalyticsWindow).gtag;
  gtag?.("event", event, {
    component: "resume_assistant",
    ...params,
  });
}
