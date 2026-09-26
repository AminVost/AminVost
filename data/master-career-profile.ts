export type MasterCareerLocale = "en" | "fa";

const masterCareerProfileEn = {
  positioning: {
    mainPositioning: "Full-Stack Software Engineer",
    aiFocusedPositioning: "Full-Stack Software Engineer | Applied AI / LLM Integration",
    currentEmploymentStatus: "Full-time at WebNevisan",
    experienceContext: "About seven years at WebNevisan, with roughly six years of professional software-development responsibility.",
    productStrength: "Coming up with practical product ideas, shaping user flows and UI concepts, and taking an idea through implementation when the project needs it.",
    aiPositioning: "Application-focused rather than research-focused: adding practical AI capabilities to real products through external APIs or local models.",
    linkedInStatus: "The previous LinkedIn account is no longer active.",
    portfolioStatus: "The Master document originally predated the current portfolio. The current portfolio is available at https://www.aminvost.ir, with GitHub and live projects also serving as technical references.",
    yearOfBirth: 1996,
  },
  completeTechnicalInventory: [
    { group: "Primary languages", items: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML", "CSS"] },
    { group: "Web / full-stack", items: ["React", "Next.js", "Node.js", "REST APIs", "SSR", "PWA", "Service Worker"] },
    { group: "Mobile / cross-platform", items: ["React Native (iOS/Android)", "PWA", "Electron.js", "Windows/Linux", "Mobile-first UI"] },
    { group: "Databases / data", items: ["MySQL", "Prisma ORM", "Relational modeling", "JSON", "Excel-to-JSON/MySQL"] },
    { group: "Legacy / maintenance", items: ["Legacy PHP", "PHP 8 migration", "Yii2", "AngularJS", "jQuery", "Incremental modernization"] },
    { group: "Applied AI / OCR", items: ["Qwen/Qwen-VL", "QLoRA", "PaddleOCR", "Local models", "Dataset preparation", "GPU runtime"] },
    { group: "AI features / NLP", items: ["Gemini API", "OpenAI API", "Review summarization", "Sentiment analysis", "BERT", "Hugging Face", "Prompt engineering"] },
    { group: "Authentication / security", items: ["JWT", "NextAuth", "OTP", "Server-side secrets and environment variables", "SSL", "PHP security hardening"] },
    { group: "Integrations", items: ["OpenTravel Alliance (OTA)", "Payment gateways", "PayPal", "SMS", "Email", "Google Meet", "Google Calendar", "Google Search Console", "TMDB"] },
    { group: "Infrastructure / systems", items: ["Linux", "VPS", "Nginx", "Reverse proxy", "systemd", "SSL", "UFW", "DNS/CNAME", "Rust (working familiarity)"] },
    { group: "Architecture / product", items: ["API design", "WebSocket", "Local-first architecture", "Performance optimization", "UI/UX concepts", "Product ideation"] },
    { group: "Tooling", items: ["Git", "Postman", "npm/Node", "PowerShell", "Bash", "AI-assisted development", "Hermes Agent (limited hands-on use)"] },
  ],
  appliedAiExperience: [
    "Built a production OCR pipeline using local Qwen-based models and PaddleOCR, including custom dataset creation and QLoRA adapter training.",
    "Designed a base-model plus seller/brand-specific adapter architecture for text, price and SKU extraction, with metadata managed in MySQL.",
    "Built server-side Gemini integrations where browsers call internal APIs, keys remain in server environment variables, structured JSON is validated and normalized before storage or use, and retry/timeout behavior is bounded.",
    "Used pretrained BERT/Hugging Face models for a movie-review sentiment MVP; the BERT model was not trained from scratch.",
    "Used OpenAI APIs and prompt engineering for application-level workflows.",
    "Has limited hands-on Hermes Agent experience for experimentation and AI-assisted development; this is tooling experience, not deep agent-framework specialization.",
  ],
  additionalTechnicalExperience: [
    "Mobile and cross-platform delivery with React Native for iOS/Android, PWA and Service Worker patterns, mobile-first interfaces and offline/local-first behavior; experience ranges from small utility apps to device-oriented product workflows.",
    "Performance optimization across front-end and API behavior and local AI runtime, plus production hosting with Nginx/reverse proxy, Linux services, SSL, DNS/CNAME and basic firewall controls.",
    "Payment gateway, PayPal, wallet-style payment, SMS/OTP, transactional email and calendar/meeting integrations.",
    "Email and PHPMailer integration and legacy PHP security hardening, including Object Injection-related awareness and fixes in existing systems.",
    "PHP 8 and legacy-code migration/compatibility work, including incremental replacement of older front-end patterns with React where appropriate.",
    "Excel and other structured-data conversion into JSON/MySQL workflows for operational and administrative use cases.",
    "Experience inheriting unfamiliar codebases and becoming productive without overstating framework specialization, notably in Yii2, AngularJS and Rust integration contexts.",
  ],
  professionalPreferences: {
    workModes: ["Remote", "On-site", "Relocation"],
    countryRestriction: "No single-country restriction.",
    preferredTitles: ["Full-Stack Software Engineer", "Software Engineer", "Full-Stack Software Engineer | AI & Automation", "Full-Stack Software Engineer | AI Integration"],
    titleGuidance: "Do not use AI Engineer as a standalone title unless a specific role closely matches the practical applied-AI background.",
    proficiencyGuardrail: "Do not present Yii2, AngularJS, Rust, Flutter or Hermes Agent as primary expert-level skills; they represent working-familiarity, integration or tooling experience.",
    internationalResumeGuidance: "International resumes should omit date of birth, the inactive LinkedIn account and a photo unless a specific local convention requires them.",
  },
} as const;

const masterCareerProfileFa = {
  positioning: {
    mainPositioning: "مهندس نرم‌افزار فول‌استک",
    aiFocusedPositioning: "مهندس نرم‌افزار فول‌استک | هوش مصنوعی کاربردی و LLM Integration",
    currentEmploymentStatus: "همکاری تمام‌وقت با WebNevisan",
    experienceContext: "حدود هفت سال سابقه همکاری با WebNevisan و نزدیک به شش سال مسئولیت حرفه‌ای توسعه نرم‌افزار.",
    productStrength: "ارائه ایده‌های عملی محصول، شکل‌دادن User Flow و کانسپت UI و رساندن ایده تا مرحله پیاده‌سازی در صورت نیاز پروژه.",
    aiPositioning: "تجربه AI بیشتر کاربردی و محصول‌محور است تا پژوهشی؛ با تمرکز بر افزودن قابلیت واقعی به محصول از طریق API خارجی یا مدل Local.",
    linkedInStatus: "حساب قبلی LinkedIn دیگر فعال نیست.",
    portfolioStatus: "یادداشت Master پیش از ایجاد Portfolio فعلی نوشته شده بود. اکنون Portfolio در https://www.aminvost.ir فعال است و GitHub و پروژه‌های Live نیز مراجع فنی هستند.",
    yearOfBirth: 1996,
  },
  completeTechnicalInventory: [
    { group: "زبان‌های اصلی", items: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML", "CSS"] },
    { group: "وب و فول‌استک", items: ["React", "Next.js", "Node.js", "REST APIs", "SSR", "PWA", "Service Worker"] },
    { group: "موبایل و چندسکویی", items: ["React Native (iOS/Android)", "PWA", "Electron.js", "Windows/Linux", "Mobile-first UI"] },
    { group: "دیتابیس و داده", items: ["MySQL", "Prisma ORM", "Relational modeling", "JSON", "Excel-to-JSON/MySQL"] },
    { group: "سیستم‌های قدیمی و نگهداری", items: ["Legacy PHP", "PHP 8 migration", "Yii2", "AngularJS", "jQuery", "Incremental modernization"] },
    { group: "هوش مصنوعی کاربردی و OCR", items: ["Qwen/Qwen-VL", "QLoRA", "PaddleOCR", "Local models", "Dataset preparation", "GPU runtime"] },
    { group: "قابلیت‌های AI و NLP", items: ["Gemini API", "OpenAI API", "خلاصه‌سازی Review", "Sentiment analysis", "BERT", "Hugging Face", "Prompt engineering"] },
    { group: "احراز هویت و امنیت", items: ["JWT", "NextAuth", "OTP", "Secret و ENV سمت سرور", "SSL", "PHP security hardening"] },
    { group: "Integration", items: ["OpenTravel Alliance (OTA)", "درگاه پرداخت", "PayPal", "SMS", "Email", "Google Meet", "Google Calendar", "Google Search Console", "TMDB"] },
    { group: "زیرساخت و سیستم", items: ["Linux", "VPS", "Nginx", "Reverse proxy", "systemd", "SSL", "UFW", "DNS/CNAME", "Rust (آشنایی کاری)"] },
    { group: "معماری و محصول", items: ["API design", "WebSocket", "Local-first architecture", "Performance optimization", "کانسپت UI/UX", "ایده‌پردازی محصول"] },
    { group: "ابزارها", items: ["Git", "Postman", "npm/Node", "PowerShell", "Bash", "AI-assisted development", "Hermes Agent (تجربه عملی محدود)"] },
  ],
  appliedAiExperience: [
    "ساخت Pipeline عملیاتی OCR با مدل‌های Local مبتنی بر Qwen و PaddleOCR، شامل ساخت Dataset اختصاصی و آموزش QLoRA Adapter.",
    "طراحی معماری Base Model به‌همراه Adapter اختصاصی فروشنده یا برند برای استخراج متن، قیمت و SKU با Metadata ذخیره‌شده در MySQL.",
    "ساخت Integrationهای Server-Side با Gemini که در آن Browser فقط Internal API را فراخوانی می‌کند، کلیدها در ENV سرور می‌مانند، JSON ساختاریافته پیش از ذخیره یا استفاده Validation و Normalize می‌شود و Retry/Timeout محدود است.",
    "استفاده از مدل Pretrained مبتنی بر BERT/Hugging Face برای MVP تحلیل احساس Review فیلم؛ مدل BERT از ابتدا آموزش داده نشده است.",
    "استفاده از OpenAI API و Prompt Engineering در Workflowهای سطح Application.",
    "تجربه عملی محدود با Hermes Agent برای آزمایش و توسعه AI-Assisted؛ این مورد تجربه Tooling است، نه تخصص عمیق Agent Framework.",
  ],
  additionalTechnicalExperience: [
    "توسعه Mobile و Cross-Platform با React Native برای iOS/Android، الگوهای PWA و Service Worker، رابط Mobile-First و رفتار Offline/Local-First؛ از اپ‌های Utility ساده تا Workflowهای وابسته به Device.",
    "بهینه‌سازی Performance در Front-end، رفتار API و Runtime مدل Local AI و همچنین میزبانی Production با Nginx/Reverse Proxy، سرویس Linux، SSL، DNS/CNAME و کنترل‌های پایه Firewall.",
    "Integration درگاه پرداخت، PayPal، پرداخت Wallet، SMS/OTP، ایمیل تراکنشی و Calendar/Meeting.",
    "Integration ایمیل و PHPMailer و Security Hardening در PHP قدیمی، شامل آگاهی و اصلاحات مرتبط با Object Injection در سیستم‌های موجود.",
    "Migration و سازگارسازی PHP 8 و Legacy Code و جایگزینی مرحله‌ای الگوهای قدیمی Front-end با React در صورت مناسب‌بودن.",
    "تبدیل Excel و داده‌های ساختاریافته به JSON/MySQL برای کاربردهای عملیاتی و مدیریتی.",
    "تحویل‌گرفتن Codebase ناآشنا و رسیدن به بهره‌وری بدون بزرگ‌نمایی تخصص Framework، به‌خصوص در Contextهای Yii2، AngularJS و Rust Integration.",
  ],
  professionalPreferences: {
    workModes: ["Remote", "حضوری", "Relocation"],
    countryRestriction: "محدودیت به کشور خاصی وجود ندارد.",
    preferredTitles: ["Full-Stack Software Engineer", "Software Engineer", "Full-Stack Software Engineer | AI & Automation", "Full-Stack Software Engineer | AI Integration"],
    titleGuidance: "عنوان AI Engineer به‌تنهایی استفاده نشود، مگر اینکه یک موقعیت مشخص با سابقه عملی Applied AI هم‌خوانی نزدیک داشته باشد.",
    proficiencyGuardrail: "Yii2، AngularJS، Rust، Flutter و Hermes Agent نباید مهارت‌های اصلی در سطح Expert معرفی شوند؛ سطح آن‌ها آشنایی کاری، Integration یا Tooling است.",
    internationalResumeGuidance: "در رزومه بین‌المللی، تاریخ تولد، حساب غیرفعال LinkedIn و عکس حذف شوند؛ مگر اینکه عرف محلی مشخصی آن‌ها را لازم بداند.",
  },
} as const;

export function getMasterCareerProfile(locale: MasterCareerLocale = "en") {
  return locale === "fa" ? masterCareerProfileFa : masterCareerProfileEn;
}

