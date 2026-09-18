import { getScopeVocabulary } from "@/lib/resume/knowledge";

const resumeVocabulary = getScopeVocabulary();

const strongCandidatePatterns = [
  /\b(amin|aminvost|vosta|hire him|hire amin|work with amin|contact amin|contact him|available for work|can he|does he|has he|is he|what has he|what did he|is amin|good fit|fit for)\b/i,
  /(امین|همکاری با امین|استخدام امین|تماس با امین|آیا (او|ایشان)|او .*?(تجربه|مهارت|پروژه|بلد|کار|ساخته|مناسب|آماده)|ایشان .*?(تجربه|مهارت|پروژه|بلد|کار|ساخته|مناسب|آماده))/i,
];

const resumeTopicPatterns = [
  /\b(resume|cv|portfolio|skill|skills|experience|experienced|work history|project|projects|developer|engineer|background|education|degree|freelance|remote|stack|frontend|backend|mobile|devops|ocr|availability)\b/i,
  /\b(how many years|worked on|built|developed|familiar with|experienced with|know(s)?|used|uses|similar project|need a developer)\b/i,
  /(مهارت|مهارت‌ها|تجربه|سابقه|پروژه|پروژه‌ها|برنامه.?نویس|توسعه.?دهنده|مهندس نرم.?افزار|فول.?استک|فرانت|بک.?اند|موبایل|وب|هوش مصنوعی|دورکاری|فریلنس|چند سال|کار کرده|ساخته|بلد است|بلده|تجربه دارد|تجربه داره)/i,
];

// General-purpose tasks that are deliberately outside the resume assistant scope.
// They are evaluated before technology vocabulary so a visitor cannot use a skill
// name (for example "React") as a gateway to a general coding assistant.
const generalTaskPatterns = [
  /\b(write|draft|compose|generate|create|build me|code|debug|fix my|solve|calculate|translate|rewrite|paraphrase|summarize this|research|browse|latest news|weather|stock price|bitcoin|recipe|essay|homework|story|cover letter for me)\b/i,
  /(برایم|برام).*(بنویس|بساز|تولید کن|کدنویسی|طراحی کن|حل کن|ترجمه کن|خلاصه کن)/i,
  /(کد بنویس|دیباگ کن|اشکال.*رفع|مسئله.*حل|قیمت.*بیت.?کوین|قیمت.*ارز|خبر.*امروز|آب.?و.?هوا|مقاله.*بنویس|داستان.*بنویس|تکلیف)/i,
];

const capabilityQuestionPatterns = [
  /\b(experience with|experienced in|worked with|worked on|built with|built using|familiar with|knowledge of|expertise in|can he|does he know|has he used|has he built|uses?|i need|we need|looking for|want to build|planning to build)\b/i,
  /(تجربه.*(دارد|داره)|کار.*کرده|بلد.*است|بلده|آشنا.*است|استفاده.*کرده|ساخته|پیاده.*کرده|می.?خوام|می.?خواهیم|نیاز دارم|نیاز داریم|دنبال.*(برنامه.?نویس|توسعه.?دهنده|کسی|فرد))/i,
];

const abusePatterns = [
  /ignore (all|any|the) previous instructions/i,
  /reveal (the )?(system|developer) prompt/i,
  /show (me )?(your )?(api|secret|environment|env|token|key)/i,
  /print (the )?(system|developer) (message|prompt)/i,
  /jailbreak/i,
  /(دستور|پرامپت).*(سیستم|مخفی)/i,
  /(api|کلید|توکن|secret|env).*(نشان|نمایش|بگو|لو)/i,
];

function tokensFor(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}+#.]+/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

export function isPromptInjectionAttempt(text: string) {
  return abusePatterns.some((pattern) => pattern.test(text));
}

export function isResumeScopedQuestion(text: string) {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 1200) return false;

  const hasStrongCandidateContext = strongCandidatePatterns.some((pattern) => pattern.test(trimmed));
  const hasResumeTopic = resumeTopicPatterns.some((pattern) => pattern.test(trimmed));
  const asksGeneralTask = generalTaskPatterns.some((pattern) => pattern.test(trimmed));

  // A generic word such as "project" must not turn this into a free coding API.
  // General-purpose tasks are only allowed through this gate when the visitor is
  // explicitly asking about Amin; the agent's own strict scope still applies.
  if (asksGeneralTask && !hasStrongCandidateContext) return false;
  if (hasStrongCandidateContext || hasResumeTopic) return true;

  const tokens = tokensFor(trimmed);
  const technologyMatches = tokens.filter((token) => resumeVocabulary.has(token));
  if (technologyMatches.length === 0) return false;

  // Short inputs such as "React Native?" are useful follow-ups inside a resume chat.
  if (tokens.length <= 4 && technologyMatches.length >= 1) return true;

  // Longer technology questions must look like capability/experience questions.
  return capabilityQuestionPatterns.some((pattern) => pattern.test(trimmed));
}

export function scopedRefusal(locale: "en" | "fa") {
  return locale === "fa"
    ? "من فقط درباره امین اسدی وسطی، رزومه، مهارت‌ها، پروژه‌ها، سوابق و همکاری با او پاسخ می‌دهم. اگر درباره یکی از این موارد سؤال داری، با کمال میل کمک می‌کنم."
    : "I’m focused only on Amin Asadi Vosta’s resume, skills, projects, experience and work opportunities. Ask me anything in that scope and I’ll help.";
}
