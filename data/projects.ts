export type ProjectCategory = 'Web' | 'Mobile' | 'AI' | 'Desktop' | 'Infrastructure' | 'Product';

export type Project = {
  id: number;
  slug: string;
  title: string;
  url?: string | null;
  period: string;
  context: string;
  role: string;
  contribution: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  categories: ProjectCategory[];
  featured: boolean;
  featuredRank: number;
};

export const projects: Project[] = [
  {
    "id": 1,
    "slug": "rapiddiag",
    "title": "RapidDiag",
    "url": null,
    "period": "2021 - Present",
    "context": "MyRapidTrack",
    "role": "Software Developer / Feature Developer",
    "contribution": "Inherited an existing WebNevisan codebase; later became responsible for major feature development, maintenance, debugging and support. Routine ownership was eventually transitioned to a newer team member as Amin moved to more complex projects.",
    "summary": "Cross-platform laptop and PC diagnostic application for Windows and Linux, used in high-volume device refurbishment workflows.",
    "highlights": [
      "Worked across CPU, RAM, battery, keyboard, USB, GPU, storage and other hardware diagnostic flows.",
      "Designed and added the disk-wipe module with Quick, NIST and Purge modes.",
      "Added new diagnostic steps, extensive UI/UX redesigns and parallel wipe/diagnostic execution paths.",
      "Integrated with multiple backend APIs for authentication, verification, keep-alive and result submission.",
      "Built, debugged and tested both Windows and Linux releases in production-oriented workflows."
    ],
    "technologies": [
      "Electron.js",
      "JavaScript",
      "Smartctl",
      "REST APIs",
      "Windows",
      "Linux"
    ],
    "categories": [
      "Web",
      "Desktop",
      "Infrastructure"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 2,
    "slug": "rapiddrive",
    "title": "RapidDrive",
    "url": null,
    "period": "2022 - Present",
    "context": "MyRapidTrack",
    "role": "Desktop Software Developer / Original Developer",
    "contribution": "Designed and developed the original application end-to-end; routine maintenance was later transitioned to a newer team member while the product continued evolving.",
    "summary": "Secure multi-drive detection and data-wiping application for connected HDD/SSD devices.",
    "highlights": [
      "Detects attached storage devices and supports wiping as many drives as the host system can connect and manage.",
      "Implements Quick, NIST and Purge wipe workflows with both concurrent and sequential execution models.",
      "Tracks independent progress for each drive and produces wipe logs, reports and certificates.",
      "Integrates with the existing MyRapidTrack PHP backend through REST APIs for authentication, keep-alive and workflow coordination.",
      "Implemented cross-platform Windows/Linux behavior and Smartctl-based device interaction; the product later met the client's NIST-related certification requirements."
    ],
    "technologies": [
      "Electron.js",
      "JavaScript",
      "Smartctl",
      "REST API",
      "PHP APIs",
      "Windows",
      "Linux"
    ],
    "categories": [
      "Web",
      "Desktop",
      "Infrastructure"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 3,
    "slug": "rapiddiag-web",
    "title": "RapidDiag Web",
    "url": null,
    "period": "2025 - Present",
    "context": "MyRapidTrack",
    "role": "Full-Stack Developer",
    "contribution": "Primary web application developer; Rust gateway was initially developed by another engineer, with Amin integrating and modifying it as needed.",
    "summary": "Modern web-based successor to RapidDiag, using a lightweight local gateway to expose hardware diagnostics to a browser application.",
    "highlights": [
      "Designed the browser-to-local-gateway architecture using WebSocket communication.",
      "Developed the Next.js/React web application and API integration layers.",
      "Implemented login/session flow with NextAuth and JWT against MyRapidTrack APIs.",
      "Migrated desktop diagnostic workflows toward the web architecture and coordinated hardware-data contracts with the local gateway.",
      "Integrated with and modified the Rust local-gateway code when needed. Rust is working/integration-level experience rather than a primary language specialization."
    ],
    "technologies": [
      "Next.js",
      "React",
      "JavaScript",
      "WebSocket",
      "NextAuth",
      "JWT",
      "REST APIs",
      "Rust integration"
    ],
    "categories": [
      "Web",
      "Infrastructure"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 4,
    "slug": "mci-ivr-visual-flow-editor",
    "title": "MCI IVR Visual Flow Editor",
    "url": null,
    "period": "2024",
    "context": "MCI (Hamrah Aval), via Telc",
    "role": "Front-End Developer",
    "contribution": "Front-end designed and built from scratch.",
    "summary": "Visual workflow editor for creating and managing IVR call flows for CRM integration.",
    "highlights": [
      "Implemented drag-and-drop node editing with custom nodes, connections, conditional branching and validation.",
      "Supported save, edit and delete workflows and serialized completed flows to structured JSON for backend/CRM consumption.",
      "Designed interactive states and user flows for business users managing telephone menus."
    ],
    "technologies": [
      "React",
      "JavaScript",
      "React Flow"
    ],
    "categories": [
      "Web"
    ],
    "featured": true,
    "featuredRank": 6
  },
  {
    "id": 5,
    "slug": "sin-group-online-store-singroup-store",
    "title": "SIN Group Online Store singroup.store/",
    "url": "https://singroup.store/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented the new store and custom template using a reusable company e-commerce core, then extended and optimized that core for the client.",
    "summary": "Fashion e-commerce platform for the SIN brand, covering women's and men's products and a full administrative workflow.",
    "highlights": [
      "Developed front-end and back-end features, custom UI/template, product/category management and administration pages.",
      "Integrated ordering, payment gateway, discounts/coupons, shipping and SMS workflows.",
      "Worked with inventory-related admin capabilities and continued to improve the reusable codebase."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 6,
    "slug": "catan-gameboard-map-generator",
    "title": "Catan Gameboard Map Generator",
    "url": null,
    "period": "2025",
    "context": "Personal Project",
    "role": "Product Creator / Developer",
    "contribution": "Original idea, design and implementation.",
    "summary": "Client-side Catan board generator with rule-aware validation and strategy-oriented starting-position recommendations.",
    "highlights": [
      "Generates randomized boards under game constraints and validates board composition.",
      "Analyzes numbers, resource hexes, ports and board geometry to suggest starting positions for different play styles and strategies.",
      "Designed responsive/mobile-friendly UI with no backend dependency."
    ],
    "technologies": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript"
    ],
    "categories": [
      "Web",
      "Product"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 7,
    "slug": "abzar-market-ocr-ai-abzarmarket-net",
    "title": "Abzar Market OCR ai.abzarmarket.net",
    "url": "http://ai.abzarmarket.net",
    "period": "2026 - Present",
    "context": "Full-Stack / Applied AI Developer",
    "role": "Full-Stack / Applied AI Developer",
    "contribution": "Designed and implemented end-to-end, including dataset preparation, model fine-tuning, application architecture and production deployment.",
    "summary": "Production Persian OCR and price-list extraction platform for supplier documents, built around local vision-language/OCR models and seller-specific adapters.",
    "highlights": [
      "Built an RTL Next.js panel and Python/FastAPI processing backend with PaddleOCR PP-OCRv5 detection, real bounding boxes, assisted region selection, automatic row grouping and crop preview.",
      "Created a custom dataset of about 1,167 samples and performed QLoRA fine-tuning for Qwen-based OCR/vision-language workflows.",
      "Designed a base-model plus per-seller/per-brand adapter architecture, with separate text, price and SKU adapters managed through MySQL metadata.",
      "Current internal evaluation reached more than 87% accuracy for price extraction and about 98% for SKU/product-name fields in the evaluated datasets.",
      "Configured local GPU execution based on available hardware and delivered an initial production version."
    ],
    "technologies": [
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "PaddleOCR",
      "Qwen/Qwen-VL",
      "QLoRA",
      "MySQL",
      "Tailwind CSS",
      "Local AI Models",
      "GPU runtime"
    ],
    "categories": [
      "AI",
      "Web",
      "Infrastructure"
    ],
    "featured": true,
    "featuredRank": 1
  },
  {
    "id": 8,
    "slug": "tahagasht-travel-platform-tahagasht-com",
    "title": "Tahagasht Travel Platform tahagasht.com/",
    "url": "https://tahagasht.com/",
    "period": "2023 - Present",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Extended and modernized an existing production codebase; responsible for substantial new features across front-end and backend flows.",
    "summary": "Large production travel platform for flight, hotel, flight+hotel and tour search, reservation, payment and booking management.",
    "highlights": [
      "Worked across search-to-booking flows for flights, hotels, tours, vouchers, ticketing, cancellation and online payment.",
      "Added group tours and built tour-package creation flows with detailed trip/pricing data.",
      "Migrated project APIs to newer versions and worked with travel integrations based on OpenTravel Alliance (OTA) structures.",
      "Added OTP/SMS login, many UI redesigns and React components alongside legacy AngularJS/jQuery screens.",
      "Maintained and extended PHP/Yii2 APIs and MySQL flows; current platform context includes roughly 80,526 users and about 50,000 orders."
    ],
    "technologies": [
      "PHP",
      "Yii2",
      "MySQL",
      "JavaScript",
      "React",
      "AngularJS",
      "REST APIs",
      "OpenTravel Alliance (OTA)",
      "Payment APIs",
      "SMS APIs"
    ],
    "categories": [
      "Web"
    ],
    "featured": true,
    "featuredRank": 2
  },
  {
    "id": 9,
    "slug": "pantomin-pantomim-aminvost-ir",
    "title": "Pantomin pantomim.aminvost.ir/",
    "url": "https://pantomim.aminvost.ir/",
    "period": "2026 - Present",
    "context": "Personal Project",
    "role": "Full-Stack Developer / Product Creator",
    "contribution": "Original product idea, design and end-to-end implementation.",
    "summary": "Persian mobile-first charades game delivered as a PWA with local-first behavior, offline tolerance and production VPS deployment.",
    "highlights": [
      "Implements teams, rounds, configurable timers, scoring, category/difficulty logic, game-state persistence and a growing Persian word catalog.",
      "Uses both local and database-driven content, with Service Worker/PWA support and local-first resume behavior.",
      "Implemented technical SEO, Google Search Console integration and production deployment on Linux/Nginx/systemd.",
      "Current product is an early/MVP-stage live release and continues to evolve."
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "MySQL",
      "PWA",
      "Service Worker",
      "REST API",
      "Nginx",
      "Linux",
      "systemd",
      "SEO"
    ],
    "categories": [
      "Mobile",
      "Web",
      "Desktop",
      "Infrastructure",
      "Product"
    ],
    "featured": true,
    "featuredRank": 9
  },
  {
    "id": 10,
    "slug": "wood-kazemi-woodkazemi-com",
    "title": "Wood Kazemi woodkazemi.com/",
    "url": "https://woodkazemi.com/",
    "period": "2022",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented end-to-end; administration uses an existing PHP-based management approach that Amin can maintain/edit.",
    "summary": "Dynamic product-showcase website for wood, resin and decorative products.",
    "highlights": [
      "Built dynamic product catalog, MySQL-backed content and inquiry/contact forms.",
      "Implemented responsive front-end and database-backed content workflows."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 11,
    "slug": "export-department-kalber-exportdepartment-ir",
    "title": "Export Department / Kalber exportdepartment.ir/",
    "url": "https://exportdepartment.ir/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Designed and implemented the project backend/front-end for this client.",
    "summary": "Multi-brand export/import corporate platform where each represented brand is exposed through its own subdomain and content set.",
    "highlights": [
      "Built brand-specific subdomains and separate brand/product content management.",
      "Implemented four-language support: Persian, English, Russian and Turkish.",
      "Built admin, product management and inquiry/contact flows; the platform is catalog/information oriented rather than direct e-commerce."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 12,
    "slug": "air-dmv-airdmv-com",
    "title": "Air DMV airdmv.com/",
    "url": "https://airdmv.com/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented end-to-end.",
    "summary": "Corporate HVAC services website for a US-based business.",
    "highlights": [
      "Built dynamic service/content pages, admin management and contact/quote forms.",
      "Implemented a search-engine-friendly site structure; ongoing SEO work itself was handled separately."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 13,
    "slug": "sotoodeh-auto-group-sotoodeh-ir",
    "title": "Sotoodeh Auto Group sotoodeh.ir/",
    "url": "https://sotoodeh.ir/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Built the client-specific platform using reusable company structures as a starting point, with substantial redesign and optimization.",
    "summary": "Multi-brand automotive dealership platform covering brands such as MVM, Fownix, Kerman Motor and Lamari/Mammut.",
    "highlights": [
      "Implemented multi-brand/subdomain architecture, vehicle catalog, detailed specification pages and branch management.",
      "Built registration/survey forms and admin-backed content flows."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 14,
    "slug": "airpower-airpower-ir",
    "title": "AirPower airpower.ir/",
    "url": "https://airpower.ir/",
    "period": "2023 - Present",
    "context": "Full-Stack Developer / Maintenance & Feature Development",
    "role": "Full-Stack Developer / Maintenance & Feature Development",
    "contribution": "Ongoing support, feature development and code maintenance.",
    "summary": "Large online tools/equipment catalog maintained on an existing production codebase.",
    "highlights": [
      "Developed new pages and client-requested features.",
      "Improved search/filter behavior and handled bug fixes and ongoing maintenance."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 15,
    "slug": "elena-beauty-elenabeauty-ca",
    "title": "Elena Beauty elenabeauty.ca/",
    "url": "https://elenabeauty.ca/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Client-specific implementation and customization on a reusable codebase that Amin fully understands and can extend.",
    "summary": "Beauty-services website implemented using a reusable PHP-based company architecture.",
    "highlights": [
      "Developed responsive front-end pages, dynamic content integration and backend/database integration.",
      "Handled customization and maintenance of the existing architecture."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 16,
    "slug": "aram-space-aramspace-com",
    "title": "Aram Space aramspace.com/",
    "url": "https://aramspace.com/",
    "period": "2025",
    "context": "Front-End / UI Developer",
    "role": "Front-End / UI Developer",
    "contribution": "Worked from the beginning of the project with a teammate; primary responsibility was design, UI concept and dynamic page implementation. Day-to-day support later moved to another teammate.",
    "summary": "Farsi-focused mental-health platform connecting users with licensed therapists through booking, calendar and online-session workflows.",
    "highlights": [
      "Designed core UI/UX concepts, user flows and dynamic/SSR pages.",
      "Implemented therapist profiles, appointment-booking interfaces, calendar flows, questionnaires and client/admin-facing UI.",
      "Platform includes JWT/session auth, PayPal and wallet payments, Google Meet, email/SMS notifications, PHP backend, MySQL and Azure hosting/infrastructure."
    ],
    "technologies": [
      "Next.js",
      "React",
      "SSR",
      "JWT",
      "PHP",
      "MySQL",
      "Azure",
      "PayPal API",
      "Google Meet",
      "Calendar",
      "Email/SMS integrations"
    ],
    "categories": [
      "Web"
    ],
    "featured": true,
    "featuredRank": 5
  },
  {
    "id": 17,
    "slug": "cinesense",
    "title": "CineSense",
    "url": null,
    "period": "2025",
    "context": "Personal Project",
    "role": "Product Creator / Developer",
    "contribution": "Original product idea and implementation.",
    "summary": "Working MVP that aggregates movie reviews and produces a spoiler-resistant user satisfaction score with NLP sentiment analysis.",
    "highlights": [
      "Uses TMDB-powered movie search/autocomplete and Playwright-based review scraping.",
      "Classifies reviews as positive/neutral/negative using a pretrained BERT sentiment model from Hugging Face.",
      "Aggregates results into a Net Satisfaction Score so users do not need to read large volumes of reviews."
    ],
    "technologies": [
      "React",
      "JavaScript",
      "Playwright",
      "BERT",
      "Hugging Face",
      "TMDB API",
      "NLP"
    ],
    "categories": [
      "AI",
      "Web",
      "Product"
    ],
    "featured": true,
    "featuredRank": 7
  },
  {
    "id": 18,
    "slug": "competition-management-platform-game-aminvost-ir",
    "title": "Competition Management Platform game.aminvost.ir/",
    "url": "https://game.aminvost.ir/",
    "period": "2026 - Present",
    "context": "Personal Project",
    "role": "Full-Stack Developer / Product Creator",
    "contribution": "Original product idea, architecture and end-to-end implementation.",
    "summary": "General-purpose tournament and competition management platform for digital games, FC/PS5 events and in-person board-game competitions.",
    "highlights": [
      "Implements OTP/JWT authentication, participant registration, temporary capacity reservation, waiting-list logic, manual payment workflows and public tracking.",
      "Includes admin panel, attendance, games/results, live score entry, objections, correction workflows, ranking and tournament completion logic.",
      "Supports multiple competition formats including single elimination, double elimination, round robin, group+knockout and Swiss-style structures.",
      "Supports templates, CMS/news/gallery content, player dashboards, SMS integration and production VPS deployment."
    ],
    "technologies": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "MySQL",
      "mysql2",
      "Tailwind CSS 4",
      "Radix UI",
      "Motion",
      "Zod",
      "JWT/jose",
      "bcryptjs",
      "REST APIs",
      "PWA",
      "SMS.ir",
      "Nginx",
      "Ubuntu",
      "systemd",
      "Let's Encrypt",
      "UFW"
    ],
    "categories": [
      "Web",
      "Infrastructure",
      "Product"
    ],
    "featured": true,
    "featuredRank": 4
  },
  {
    "id": 19,
    "slug": "smart-social-gateway",
    "title": "Smart Social Gateway",
    "url": null,
    "period": "2026",
    "context": "Client Solution",
    "role": "Developer / Solution Designer",
    "contribution": "Amin identified the client problem and proposed/implemented the solution.",
    "summary": "Lightweight static routing layer created to solve broken/blank external links from social-media in-app browsers, especially Instagram.",
    "highlights": [
      "Designed a minimal intermediate gateway with near-instant redirect behavior and branded fallback/error states.",
      "Optimized for cross-browser reliability in iOS/Android in-app browsers and static/edge hosting.",
      "Configured custom-domain CNAME/DNS mapping and kept the payload intentionally framework-free."
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Static Hosting",
      "DNS/CNAME"
    ],
    "categories": [
      "Infrastructure",
      "Product"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 20,
    "slug": "ocr-dataset-cropper",
    "title": "OCR Dataset Cropper",
    "url": null,
    "period": "2026",
    "context": "Internal/Personal Productivity Tool",
    "role": "Full-Stack Developer",
    "contribution": "Original idea and end-to-end implementation.",
    "summary": "Local web tool created to accelerate OCR dataset preparation during the Abzar Market fine-tuning workflow.",
    "highlights": [
      "Supports multi-image upload, drag/drop, resizable crop regions, fixed crop templates and batch cropping.",
      "Includes automatic file naming, output-directory selection, undo and selected-image deletion.",
      "Created specifically to remove repetitive manual work while preparing OCR training datasets."
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "Pillow",
      "React",
      "Vite",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "categories": [
      "AI",
      "Web",
      "Product"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 21,
    "slug": "avida-counselling-avidacounselling-com",
    "title": "Avida Counselling avidacounselling.com/",
    "url": "https://avidacounselling.com/",
    "period": "2024",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Developed using the company's reusable PHP architecture and customized it for the client.",
    "summary": "Mental-health services website for a counselling practice in British Columbia.",
    "highlights": [
      "Implemented therapist profiles, dynamic service/content pages and responsive UI.",
      "Integrated backend/database-backed content and standard contact/appointment-request style flows."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 22,
    "slug": "evisa-immigration-evisaimmigration-org",
    "title": "eVisa Immigration evisaimmigration.org/",
    "url": "https://evisaimmigration.org/",
    "period": "2023",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Developed on the company's reusable PHP architecture and extended it for complex form workflows.",
    "summary": "Immigration-services platform with a dynamic form-builder workflow for collecting complex applicant data.",
    "highlights": [
      "Implemented dynamic/multi-field form building, save-and-resume progress and admin review.",
      "Supported document upload and multi-step database-driven applicant workflows."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": true,
    "featuredRank": 8
  },
  {
    "id": 23,
    "slug": "taksasayesh-taksasayesh-com",
    "title": "Taksasayesh taksasayesh.com/",
    "url": "https://taksasayesh.com/",
    "period": "2024",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented the client project using an existing reusable company codebase.",
    "summary": "Industrial corporate website and product catalog for a company active in abrasives and fertilizer-related products.",
    "highlights": [
      "Built product catalog, dynamic content and admin-backed pages.",
      "Implemented responsive corporate UI and backend/database integration."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 24,
    "slug": "ask-your-gurus-askyourgurus-com",
    "title": "Ask Your Gurus askyourgurus.com/",
    "url": "https://askyourgurus.com/",
    "period": "2022",
    "context": "Front-End / UI Developer",
    "role": "Front-End / UI Developer",
    "contribution": "Primary early contribution was front-end/UI design, theme selection/customization and the initial user-facing product flows.",
    "summary": "Influencer/follower consultation platform for monetized, scheduled sessions.",
    "highlights": [
      "Designed and implemented core front-end screens and user flows.",
      "Platform included user registration, influencer/follower dashboards, appointment scheduling, availability calendar, payments and notifications."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 25,
    "slug": "imca-gama-imca-gama-com",
    "title": "IMCA GAMA imca-gama.com/",
    "url": "https://imca-gama.com/",
    "period": "2022",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Combination of reusable company architecture and substantial client-specific development.",
    "summary": "Professional management-consulting platform for GAMA, the executive arm of the Iranian Management Consultants Association.",
    "highlights": [
      "Implemented registration, course-management, certification-related workflows and admin content management.",
      "Handled front-end, backend and database integration for the client-specific platform."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 26,
    "slug": "dadgar-system-dadgarsystem-ir",
    "title": "Dadgar System dadgarsystem.ir/",
    "url": "https://dadgarsystem.ir/",
    "period": "2021",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented the client website end-to-end using the company's PHP stack/reusable patterns where appropriate.",
    "summary": "Corporate technology platform for Fanavaran Dadgar System.",
    "highlights": [
      "Developed front-end, backend and database integration.",
      "Implemented dynamic corporate content, product/service presentation and admin-managed content."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 27,
    "slug": "agrinpay-agrinpay-com",
    "title": "AgrinPay agrinpay.com/",
    "url": "https://agrinpay.com/",
    "period": "2021",
    "context": "Full-Stack Developer",
    "role": "Full-Stack Developer",
    "contribution": "Implemented similarly to the Dadgar project using the company's reusable PHP architecture and client-specific development.",
    "summary": "Corporate infrastructure/engineering website for presenting services and company projects.",
    "highlights": [
      "Developed front-end, backend and MySQL-backed dynamic pages.",
      "Implemented responsive corporate content and project/service presentation workflows."
    ],
    "technologies": [
      "PHP",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AngularJS",
      "Bootstrap",
      "HTML",
      "CSS"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 28,
    "slug": "rapidmobilediag",
    "title": "RapidMobileDiag",
    "url": null,
    "period": "2025 context",
    "context": "WebNevisan / MyRapidTrack-related diagnostic work",
    "role": "Mobile/Cross-Platform Developer",
    "contribution": "Hands-on React Native/mobile development, debugging and integration as part of WebNevisan/MyRapidTrack-related work.",
    "summary": "Mobile-device diagnostic application built with React Native for iOS and Android, covering device-test workflows and communication with companion services/tooling.",
    "highlights": [
      "Worked with React Native diagnostic flows for iOS/Android and device-oriented features such as BLE, NFC, biometrics, camera, audio/video, geolocation, sensors and voice/TTS where supported by the target platform.",
      "Worked with device communication/status flows, including ADB/WebSocket-style integration in relevant environments; also had limited Flutter exposure in a companion desktop/launcher context."
    ],
    "technologies": [
      "React Native",
      "iOS/Android",
      "JavaScript",
      "ADB/WebSocket integrations",
      "BLE/NFC/sensors",
      "Flutter exposure"
    ],
    "categories": [
      "Mobile",
      "Product"
    ],
    "featured": true,
    "featuredRank": 3
  },
  {
    "id": 29,
    "slug": "todolist-mobile-app",
    "title": "TodoList Mobile App",
    "url": null,
    "period": "Earlier project",
    "context": "Mobile Developer",
    "role": "Mobile Developer",
    "contribution": "Implemented as a learning/portfolio mobile application.",
    "summary": "Simple mobile application for personal to-do management, preserved as an early mobile-development project.",
    "highlights": [
      "Basic task creation and management flow."
    ],
    "technologies": [
      "React Native / mobile application development"
    ],
    "categories": [
      "Mobile",
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 30,
    "slug": "initial-mci-crm-design-ideation",
    "title": "Initial MCI CRM Design & Ideation",
    "url": null,
    "period": "Telc / MCI",
    "context": "UI/Product Contribution",
    "role": "UI/Product Contribution",
    "contribution": "Contributed initial design, ideation and user-facing interface concepts.",
    "summary": "Early CRM panel/interface concept work for MCI employees before/alongside later IVR-related work.",
    "highlights": [
      "Focused on practical CRM panel structure and usable workflows for internal users."
    ],
    "technologies": [
      "UI/UX concept",
      "CRM workflow design"
    ],
    "categories": [
      "Web"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 31,
    "slug": "ideara-ai-idea-generation-webapp",
    "title": "Ideara - AI Idea Generation WebApp",
    "url": null,
    "period": "2026",
    "context": "Personal/Prototype Product",
    "role": "Full-Stack & AI Integration Developer",
    "contribution": "End-to-end implementation based on the product concept and server-side Gemini integration pattern.",
    "summary": "Mobile-first Persian idea-generation application using Gemini through a server-side, validated structured-output architecture.",
    "highlights": [
      "Built Next.js internal APIs with Zod validation, server-side Gemini calls, structured JSON schema validation/normalization, limited retry/timeout handling and MySQL persistence.",
      "Implemented secure httpOnly JWT sessions, a five-step idea wizard, optional image analysis, saved ideas/history, feedback/refinement flows and mobile/desktop responsive UI.",
      "Kept Gemini API keys and MySQL access strictly server-side."
    ],
    "technologies": [
      "Next.js",
      "React",
      "MySQL",
      "Gemini API (@google/genai)",
      "Zod",
      "JWT",
      "Structured JSON",
      "Server-side AI integration"
    ],
    "categories": [
      "AI",
      "Web",
      "Product"
    ],
    "featured": false,
    "featuredRank": 999
  },
  {
    "id": 32,
    "slug": "pantomin-seo-monitor",
    "title": "Pantomin SEO Monitor",
    "url": null,
    "period": "2026",
    "context": "Internal Technical SEO / Automation Tool",
    "role": "Internal Technical SEO / Automation Tool",
    "contribution": "Created as supporting production/SEO tooling for the Pantomin project.",
    "summary": "Lightweight monitoring utility for Pantomin that combines first-party crawling with official Google Search Console data.",
    "highlights": [
      "Checks robots.txt, sitemap, HTTP status, title/description, canonical, noindex, H1, Persian lang/RTL, JSON-LD, internal links and response time.",
      "Reads Search Analytics, sitemap health and URL Inspection through the official Google Search Console API, generates HTML/JSON reports and can send Telegram alerts.",
      "Runs on a low-resource Linux/systemd schedule and preserves OAuth credentials outside public source control."
    ],
    "technologies": [
      "Node.js",
      "Google Search Console API",
      "OAuth",
      "HTTP crawling",
      "systemd",
      "Linux",
      "JSON/HTML reporting"
    ],
    "categories": [
      "Desktop",
      "Infrastructure",
      "Product"
    ],
    "featured": false,
    "featuredRank": 999
  }
] as Project[];

export const featuredProjects = projects.filter((project) => project.featured).sort((a,b) => a.featuredRank - b.featuredRank);
