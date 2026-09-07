import { projects, type Project } from "@/data/projects";

type ProjectFaOverride = Pick<Project, "context" | "role" | "contribution" | "summary" | "highlights">;

const fa: Record<number, ProjectFaOverride> = {
  1: {
    context: "MyRapidTrack",
    role: "توسعه‌دهنده نرم‌افزار / توسعه Feature",
    contribution: "پروژه را به‌صورت Codebase موجود از تیم تحویل گرفتم و در ادامه مسئول توسعه Featureهای اصلی، نگهداری، Debug و پشتیبانی شدم. بعدتر برای تمرکز روی پروژه‌های پیچیده‌تر، نگهداری روزمره به نیروی جدیدتر منتقل شد.",
    summary: "اپلیکیشن چندسکویی عیب‌یابی لپ‌تاپ و PC برای Windows و Linux که در فرآیندهای پرتعداد بازسازی و تست دستگاه استفاده می‌شود.",
    highlights: [
      "کار روی جریان‌های Diagnostic مربوط به CPU، RAM، Battery، Keyboard، USB، GPU، Storage و سایر سخت‌افزارها.",
      "طراحی و اضافه‌کردن ماژول پاک‌سازی Disk با حالت‌های Quick، NIST و Purge.",
      "اضافه‌کردن Stepهای جدید، Redesign بخش‌های مختلف و اجرای موازی Wipe و Diagnostic.",
      "Integration با چند API برای Authentication، Verification، Keep-Alive و ارسال نتیجه.",
      "Build، Debug و تست نسخه‌های Windows و Linux در Workflowهای نزدیک به Production."
    ]
  },
  2: {
    context: "MyRapidTrack",
    role: "توسعه‌دهنده Desktop / توسعه‌دهنده اصلی",
    contribution: "نسخه اصلی اپلیکیشن را از ابتدا طراحی و پیاده‌سازی کردم. بعد از پایدارشدن محصول، نگهداری روزمره به نیروی جدیدتر منتقل شد و من روی پروژه‌های جدیدتر تمرکز کردم.",
    summary: "اپلیکیشن شناسایی چند Drive و پاک‌سازی امن اطلاعات برای HDD/SSDهای متصل به سیستم.",
    highlights: [
      "شناسایی Storage Deviceهای متصل و پشتیبانی از تعداد متغیر Drive بر اساس توان سیستم میزبان.",
      "پیاده‌سازی Quick، NIST و Purge Wipe به‌صورت همزمان یا Sequential.",
      "نمایش Progress مستقل هر Drive و تولید Log، Report و Certificate.",
      "Integration با Backend فعلی MyRapidTrack مبتنی بر PHP و REST API برای Authentication، Keep-Alive و هماهنگی Workflow.",
      "پیاده‌سازی رفتار چندسکویی Windows/Linux و ارتباط با Device از طریق Smartctl؛ محصول در ادامه الزامات Certification مرتبط با NIST کارفرما را پوشش داد."
    ]
  },
  3: {
    context: "MyRapidTrack",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "توسعه اصلی Web App با من بوده است. Gateway مبتنی بر Rust ابتدا توسط همکار دیگری نوشته شد و من در بخش Integration و اصلاحات موردنیاز با آن کار کرده‌ام.",
    summary: "نسخه Web-Based و جدید RapidDiag که از یک Local Gateway سبک برای دراختیارگذاشتن اطلاعات Diagnostic سخت‌افزار به Browser استفاده می‌کند.",
    highlights: [
      "طراحی ارتباط Browser و Local Gateway با WebSocket.",
      "توسعه Web App با Next.js/React و لایه‌های API Integration.",
      "پیاده‌سازی Login/Session با NextAuth و JWT در ارتباط با APIهای MyRapidTrack.",
      "انتقال تدریجی Workflowهای نسخه Desktop به معماری Web و هماهنگی قرارداد داده با Gateway محلی.",
      "Integration و اصلاح محدود کد Rust در صورت نیاز؛ Rust برای من تجربه کاری در سطح Integration است و زبان اصلی‌ام نیست."
    ]
  },
  4: {
    context: "MCI (همراه اول) از طریق Telc",
    role: "توسعه‌دهنده Front-End",
    contribution: "Front-End پروژه را از ابتدا طراحی و پیاده‌سازی کردم.",
    summary: "ویرایشگر Visual برای ساخت و مدیریت Flowهای IVR با هدف Integration در CRM.",
    highlights: [
      "پیاده‌سازی Drag & Drop، Custom Node، Connection، Conditional Branch و Validation.",
      "پشتیبانی از Save/Edit/Delete و تبدیل Flow نهایی به JSON ساختاریافته برای Backend/CRM.",
      "طراحی Stateها و Flowهای تعاملی برای کاربران سازمانی مدیریت‌کننده منوهای تلفنی."
    ]
  },
  5: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "فروشگاه و Template اختصاصی را با استفاده از Core فروشگاهی قابل‌استفاده مجدد شرکت پیاده کردم و Core را متناسب با نیاز مشتری توسعه و بهینه کردم.",
    summary: "فروشگاه اینترنتی پوشاک برند SIN برای محصولات زنانه و مردانه با Workflow کامل مدیریت فروشگاه.",
    highlights: [
      "توسعه Front-End و Back-End، UI/Template اختصاصی، مدیریت محصول و دسته‌بندی و صفحات مدیریتی.",
      "Integration سفارش، درگاه پرداخت، تخفیف/Coupon، Shipping و SMS.",
      "کار روی قابلیت‌های مرتبط با موجودی در پنل مدیریت و بهبود Codebase قابل‌استفاده مجدد."
    ]
  },
  6: {
    context: "پروژه شخصی",
    role: "ایده‌پرداز محصول / توسعه‌دهنده",
    contribution: "ایده، طراحی و پیاده‌سازی پروژه متعلق به خودم است.",
    summary: "Generator سمت کاربر برای Board بازی Catan با Validation قوانین و پیشنهاد موقعیت شروع متناسب با Strategyهای مختلف.",
    highlights: [
      "تولید Board تصادفی با رعایت Constraintهای بازی و Validation ساختار Board.",
      "تحلیل عددها، Resourceها، Portها و Geometry نقشه برای پیشنهاد موقعیت‌های شروع مختلف.",
      "رابط Responsive و Mobile-Friendly بدون وابستگی به Backend."
    ]
  },
  7: {
    context: "توسعه فول‌استک / هوش مصنوعی کاربردی",
    role: "توسعه‌دهنده فول‌استک و Applied AI",
    contribution: "طراحی و پیاده‌سازی End-to-End شامل آماده‌سازی Dataset، Fine-Tuning مدل، معماری Application و Deployment نسخه Production.",
    summary: "سیستم Production OCR فارسی و استخراج ساختاریافته لیست قیمت تأمین‌کنندگان با مدل‌های Local و Adapter اختصاصی برای هر فروشنده/برند.",
    highlights: [
      "ساخت پنل RTL با Next.js و Backend پردازش با Python/FastAPI و PaddleOCR PP-OCRv5، Bounding Box واقعی، انتخاب Region، Row Grouping و Crop Preview.",
      "ساخت Dataset اختصاصی حدود ۱٬۱۶۷ نمونه و Fine-Tuning مدل‌های Qwen با QLoRA.",
      "طراحی معماری Base Model + Adapter اختصاصی Seller/Brand با Adapterهای جدا برای Text، Price و SKU و مدیریت Metadata در MySQL.",
      "در ارزیابی فعلی، دقت بیش از ۸۷٪ برای Price و حدود ۹۸٪ برای SKU و Product Name روی Datasetهای ارزیابی‌شده به‌دست آمده است.",
      "تنظیم اجرای Local روی GPU متناسب با Hardware موجود و تحویل نسخه اولیه Production."
    ]
  },
  8: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "روی Codebase Production موجود کار کرده‌ام و Featureهای قابل‌توجهی را در Front-End و Backend اضافه یا مدرن کرده‌ام.",
    summary: "پلتفرم بزرگ Production برای جستجو، رزرو و مدیریت Flight، Hotel، Flight+Hotel و Tour.",
    highlights: [
      "کار روی Flow کامل Search تا Booking برای Flight، Hotel، Tour، Voucher، Ticketing، Cancellation و پرداخت آنلاین.",
      "اضافه‌کردن Group Tour و ساخت Tour Package با اطلاعات کامل سفر و قیمت‌گذاری.",
      "Migration APIها به نسخه‌های جدید و کار با Integrationهای مبتنی بر OpenTravel Alliance (OTA).",
      "اضافه‌کردن OTP/SMS Login، Redesignهای متعدد و React Component در کنار صفحات Legacy مبتنی بر AngularJS/jQuery.",
      "نگهداری و توسعه APIهای PHP/Yii2 و Flowهای MySQL؛ بستر فعلی حدود ۸۰٬۵۲۶ کاربر و ۵۰٬۰۰۰ سفارش دارد."
    ]
  },
  9: {
    context: "پروژه شخصی",
    role: "توسعه‌دهنده فول‌استک / سازنده محصول",
    contribution: "ایده، طراحی و پیاده‌سازی End-to-End محصول متعلق به خودم است.",
    summary: "بازی پانتومیم فارسی Mobile-First به‌صورت PWA با معماری Local-First، تحمل Offline و استقرار روی VPS.",
    highlights: [
      "مدیریت تیم، Round، Timer قابل تنظیم، امتیازدهی، Category/Difficulty، ذخیره State و مجموعه در حال رشد کلمات فارسی.",
      "استفاده ترکیبی از محتوای Local و Database و پشتیبانی Service Worker/PWA.",
      "پیاده‌سازی Technical SEO، اتصال Google Search Console و Deployment روی Linux/Nginx/systemd.",
      "محصول در مرحله MVP اولیه Live است و به‌صورت مستمر توسعه پیدا می‌کند."
    ]
  },
  10: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "پیاده‌سازی End-to-End؛ بخش مدیریت از یک رویکرد PHP موجود استفاده می‌کند که امکان نگهداری و ویرایش آن را دارم.",
    summary: "وب‌سایت Dynamic معرفی محصولات چوبی، Resin و محصولات دکوراتیو.",
    highlights: ["ساخت Product Catalog پویا، محتوای مبتنی بر MySQL و فرم‌های Inquiry/Contact.", "پیاده‌سازی رابط Responsive و Flowهای محتوایی متصل به Database."]
  },
  11: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "Front-End و Back-End پروژه را برای این مشتری طراحی و پیاده‌سازی کردم.",
    summary: "پلتفرم شرکتی Multi-Brand برای Export/Import که هر برند روی Subdomain اختصاصی با محتوای مستقل نمایش داده می‌شود.",
    highlights: ["ساخت Subdomainهای اختصاصی برند و مدیریت جداگانه Brand/Product Content.", "پیاده‌سازی چهار زبان فارسی، انگلیسی، روسی و ترکی.", "ساخت Admin، Product Management و Inquiry/Contact؛ پلتفرم ماهیت Catalog دارد و فروش مستقیم نیست."]
  },
  12: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "پروژه را End-to-End پیاده‌سازی کردم.",
    summary: "وب‌سایت شرکتی خدمات HVAC برای یک کسب‌وکار مستقر در آمریکا.",
    highlights: ["ساخت صفحات Dynamic خدمات و محتوا، Admin و فرم Contact/Quote.", "پیاده‌سازی ساختار مناسب موتور جستجو؛ فعالیت مستمر SEO توسط فرد دیگری انجام می‌شد."]
  },
  13: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "با استفاده از ساختارهای Reusable شرکت به‌عنوان نقطه شروع، نسخه اختصاصی مشتری را با Redesign و Optimization گسترده توسعه دادم.",
    summary: "پلتفرم نمایندگی خودروی Multi-Brand برای برندهایی مثل MVM، Fownix، Kerman Motor و Lamari/Mammut.",
    highlights: ["پیاده‌سازی معماری Multi-Brand/Subdomain، Vehicle Catalog، صفحه جزئیات فنی و Branch Management.", "ساخت فرم‌های Registration/Survey و Flowهای محتوایی متصل به Admin."]
  },
  14: {
    context: "توسعه فول‌استک / نگهداری و Feature Development",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "پشتیبانی مستمر، توسعه Feature و نگهداری Codebase.",
    summary: "کاتالوگ بزرگ آنلاین ابزار و تجهیزات روی یک Codebase Production موجود.",
    highlights: ["توسعه صفحات جدید و Featureهای درخواستی مشتری.", "بهبود Search/Filter، رفع Bug و نگهداری مستمر."]
  },
  15: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "پیاده‌سازی و سفارشی‌سازی مشتری روی Codebase قابل‌استفاده مجدد که ساختار آن را به‌طور کامل می‌شناسم و توسعه می‌دهم.",
    summary: "وب‌سایت خدمات Beauty با معماری Reusable مبتنی بر PHP.",
    highlights: ["توسعه صفحات Responsive، اتصال محتوای Dynamic و Integration با Backend/Database.", "سفارشی‌سازی و نگهداری معماری موجود."]
  },
  16: {
    context: "Front-End / UI",
    role: "توسعه‌دهنده Front-End / UI",
    contribution: "از ابتدای پروژه با یک همکار حضور داشتم و مسئولیت اصلی من Design، ایده UI و Dynamic کردن صفحات بود. پشتیبانی روزمره بعداً به همکار دیگری منتقل شد.",
    summary: "پلتفرم Mental Health فارسی برای اتصال کاربران به Therapistهای دارای مجوز با Booking، Calendar و Online Session.",
    highlights: ["طراحی کانسپت‌های اصلی UI/UX، User Flow و صفحات Dynamic/SSR.", "پیاده‌سازی Therapist Profile، Appointment Booking، Calendar، Questionnaire و UI پنل Client/Admin.", "پلتفرم شامل JWT/Session، PayPal و Wallet، Google Meet، Email/SMS، Backend با PHP/MySQL و زیرساخت Azure است."]
  },
  17: {
    context: "پروژه شخصی",
    role: "سازنده محصول / توسعه‌دهنده",
    contribution: "ایده اولیه و پیاده‌سازی پروژه متعلق به خودم است.",
    summary: "MVP عملی برای جمع‌آوری Review فیلم‌ها و تولید Satisfaction Score بدون نیاز به خواندن حجم زیادی از نظرها و با کاهش ریسک Spoiler.",
    highlights: ["Movie Search و Autocomplete با TMDB و Scraping نظرها با Playwright.", "Classification مثبت/خنثی/منفی با مدل Pretrained BERT از Hugging Face.", "تجمیع نتیجه‌ها در Net Satisfaction Score برای تصمیم‌گیری سریع‌تر کاربر."]
  },
  18: {
    context: "پروژه شخصی",
    role: "توسعه‌دهنده فول‌استک / سازنده محصول",
    contribution: "ایده، معماری و پیاده‌سازی End-to-End پروژه متعلق به خودم است.",
    summary: "سامانه عمومی مدیریت مسابقات برای بازی‌های دیجیتال، FC/PS5 و مسابقات حضوری Board Game.",
    highlights: ["OTP/JWT، ثبت‌نام، رزرو موقت ظرفیت، Waiting List، پرداخت دستی و پیگیری عمومی.", "Admin، حضور و غیاب، Match/Result، ثبت Score، اعتراض، اصلاح نتیجه، Ranking و تکمیل Tournament.", "پشتیبانی از Single/Double Elimination، Round Robin، Group+Knockout و ساختار Swiss.", "Template، CMS/News/Gallery، Player Dashboard، SMS Integration و Deployment روی VPS."]
  },
  19: {
    context: "راه‌حل برای مشتری",
    role: "توسعه‌دهنده / طراح راه‌حل",
    contribution: "مسئله مشتری را شناسایی کردم و راه‌حل را پیشنهاد و پیاده‌سازی کردم.",
    summary: "Gateway بسیار سبک برای حل مشکل لینک‌های Blank/Broken در In-App Browser شبکه‌های اجتماعی، مخصوصاً Instagram.",
    highlights: ["طراحی Gateway واسط با Redirect تقریباً فوری و Fallback/Error UI برندشده.", "بهینه‌سازی برای In-App Browserهای iOS/Android و Static/Edge Hosting.", "پیکربندی CNAME/DNS و نگه‌داشتن Payload کاملاً سبک و بدون Framework."]
  },
  20: {
    context: "ابزار داخلی / شخصی",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "ایده و پیاده‌سازی End-to-End متعلق به خودم است.",
    summary: "ابزار Local Web برای سریع‌ترکردن آماده‌سازی Dataset OCR در فرآیند Fine-Tuning پروژه Abzar Market.",
    highlights: ["Multi-Image Upload، Drag & Drop، Crop Region قابل Resize، Template ثابت و Batch Crop.", "Auto Naming، انتخاب Output Directory، Undo و حذف Image منتخب.", "برای حذف بخش بزرگی از کار تکراری و دستی آماده‌سازی Dataset ساخته شد."]
  },
  21: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "با معماری Reusable PHP شرکت توسعه و برای نیازهای مشتری سفارشی شد.",
    summary: "وب‌سایت خدمات Mental Health برای یک مرکز Counselling در British Columbia.",
    highlights: ["پیاده‌سازی Therapist Profile، صفحات Dynamic خدمات/محتوا و رابط Responsive.", "Integration محتوای Backend/Database و Flowهای معمول Contact/Appointment Request."]
  },
  22: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "روی معماری Reusable PHP شرکت توسعه داده شد و برای Workflowهای پیچیده فرم گسترش پیدا کرد.",
    summary: "پلتفرم خدمات مهاجرت با Dynamic Form Builder برای جمع‌آوری داده‌های پیچیده متقاضیان.",
    highlights: ["Dynamic/Multi-Field Form Builder، Save & Resume و Admin Review.", "Document Upload و Workflow چندمرحله‌ای مبتنی بر Database برای Applicantها."]
  },
  23: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "پروژه مشتری با استفاده از Codebase قابل‌استفاده مجدد شرکت پیاده شد.",
    summary: "وب‌سایت شرکتی و Product Catalog صنعتی برای مجموعه فعال در حوزه ساینده و محصولات مرتبط با کود.",
    highlights: ["ساخت Product Catalog، Dynamic Content و صفحات متصل به Admin.", "پیاده‌سازی رابط شرکتی Responsive و Integration با Backend/Database."]
  },
  24: {
    context: "Front-End / UI",
    role: "توسعه‌دهنده Front-End / UI",
    contribution: "نقش اصلی من در مرحله اول طراحی Front-End/UI، انتخاب و سفارشی‌سازی Theme و Flowهای اصلی کاربر بود.",
    summary: "پلتفرم Consultation میان Influencer و Follower برای Sessionهای زمان‌بندی‌شده و Monetized.",
    highlights: ["طراحی و پیاده‌سازی Screenها و User Flowهای اصلی Front-End.", "پلتفرم شامل Registration، Dashboardهای Influencer/Follower، Scheduling، Availability Calendar، Payment و Notification بود."]
  },
  25: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "ترکیبی از معماری Reusable شرکت و توسعه اختصاصی قابل‌توجه برای نیازهای مشتری.",
    summary: "پلتفرم حرفه‌ای مشاوره مدیریت برای GAMA، بازوی اجرایی انجمن مشاوران مدیریت ایران.",
    highlights: ["پیاده‌سازی Registration، Course Management، Workflowهای مرتبط با Certification و مدیریت محتوای Admin.", "توسعه Front-End، Backend و Database Integration برای نسخه اختصاصی مشتری."]
  },
  26: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "سایت مشتری را End-to-End با Stack و Patternهای PHP شرکت در بخش‌های مناسب پیاده کردم.",
    summary: "پلتفرم شرکتی فناوری برای شرکت فن‌آوران دادگر سیستم.",
    highlights: ["توسعه Front-End، Backend و Database Integration.", "پیاده‌سازی محتوای Dynamic شرکتی، معرفی Product/Service و مدیریت محتوا از Admin."]
  },
  27: {
    context: "توسعه فول‌استک",
    role: "توسعه‌دهنده فول‌استک",
    contribution: "مشابه پروژه Dadgar با معماری Reusable PHP شرکت و توسعه اختصاصی برای مشتری پیاده شد.",
    summary: "وب‌سایت شرکتی زیرساخت/مهندسی برای معرفی خدمات و پروژه‌های شرکت.",
    highlights: ["توسعه Front-End، Backend و صفحات Dynamic مبتنی بر MySQL.", "پیاده‌سازی محتوای Responsive شرکتی و Workflow معرفی پروژه/خدمات."]
  },
  28: {
    context: "WebNevisan / پروژه‌های Diagnostic مرتبط با MyRapidTrack",
    role: "توسعه‌دهنده Mobile / Cross-Platform",
    contribution: "تجربه عملی React Native، Debug و Integration در پروژه‌های Mobile Diagnostic مرتبط با WebNevisan/MyRapidTrack.",
    summary: "اپلیکیشن Diagnostic موبایل با React Native برای iOS و Android که Workflowهای تست Device و ارتباط با سرویس‌های جانبی را پوشش می‌دهد.",
    highlights: ["کار روی Flowهای Diagnostic در React Native برای iOS/Android و Featureهایی مثل BLE، NFC، Biometrics، Camera، Audio/Video، Geolocation، Sensor و Voice/TTS در Platformهای قابل پشتیبانی.", "کار با Device Communication و Status Flow، از جمله Integrationهای ADB/WebSocket در محیط‌های مرتبط؛ همچنین تجربه محدود Flutter در یک Context جانبی Desktop/Launcher."]
  },
  29: {
    context: "توسعه موبایل",
    role: "توسعه‌دهنده موبایل",
    contribution: "به‌عنوان پروژه تمرینی/Portfolio موبایل پیاده‌سازی شد.",
    summary: "اپلیکیشن ساده موبایل برای مدیریت کارهای شخصی که به‌عنوان یکی از پروژه‌های اولیه Mobile Development نگه داشته شده است.",
    highlights: ["Flow پایه ایجاد و مدیریت Taskها."]
  },
  30: {
    context: "مشارکت UI / Product",
    role: "مشارکت در UI / Product",
    contribution: "در طراحی اولیه، ایده‌پردازی و کانسپت رابط کاربری مشارکت داشتم.",
    summary: "کار اولیه روی کانسپت پنل/رابط CRM برای کارکنان MCI قبل یا هم‌زمان با پروژه‌های بعدی IVR.",
    highlights: ["تمرکز روی ساختار عملی پنل CRM و Workflowهای قابل‌استفاده برای کاربران داخلی."]
  },
  31: {
    context: "محصول شخصی / Prototype",
    role: "توسعه‌دهنده فول‌استک و AI Integration",
    contribution: "پیاده‌سازی End-to-End بر اساس ایده محصول و معماری Server-Side برای Gemini.",
    summary: "وب‌اپ فارسی Mobile-First برای تولید ایده با Gemini و معماری Server-Side با Structured Output و Validation.",
    highlights: ["ساخت Internal APIهای Next.js با Zod، فراخوانی Server-Side Gemini، Validation/Normalization خروجی JSON، Retry/Timeout محدود و Persistence در MySQL.", "پیاده‌سازی Session امن httpOnly JWT، Wizard پنج‌مرحله‌ای ایده، Image Analysis اختیاری، History/Saved Ideas، Feedback/Refinement و UI Responsive.", "نگه‌داشتن Gemini API Key و دسترسی MySQL کاملاً در Server."]
  },
  32: {
    context: "ابزار داخلی Technical SEO / Automation",
    role: "توسعه ابزار داخلی",
    contribution: "به‌عنوان ابزار پشتیبان Production و SEO برای پروژه Pantomin ساخته شد.",
    summary: "ابزار سبک Monitoring برای Pantomin که Crawl داخلی را با داده رسمی Google Search Console ترکیب می‌کند.",
    highlights: ["بررسی robots.txt، sitemap، HTTP status، title/description، canonical، noindex، H1، lang/RTL فارسی، JSON-LD، Internal Link و Response Time.", "خواندن Search Analytics، Sitemap Health و URL Inspection از API رسمی Search Console، تولید Reportهای HTML/JSON و امکان Telegram Alert.", "اجرای زمان‌بندی‌شده روی Linux/systemd با منابع کم و نگهداری OAuth Credential خارج از Source عمومی."]
  }
};

function localizePeriod(period: string) {
  return period.replaceAll("Present", "اکنون").replaceAll("Earlier project", "پروژه قدیمی‌تر");
}

export const projectsFa: Project[] = projects.map((project) => ({
  ...project,
  ...fa[project.id],
  period: localizePeriod(project.period),
}));

export const featuredProjectsFa = projectsFa.filter((project) => project.featured).sort((a, b) => a.featuredRank - b.featuredRank);
