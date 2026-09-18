import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

type Locale = "en" | "fa";

export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const isFa = locale === "fa";
  const prefix = isFa ? "/fa" : "";

  return (
    <div className="header-wrap">
      <header className="header shell-header">
        <Link
          className="brand"
          href={prefix || "/"}
          aria-label={isFa ? "صفحه اصلی AminVost، امین اسدی وسطی" : "AminVost — Amin Asadi Vosta home"}
        >
          <span className="brand-mark">AV</span>
          <span className="brand-name">
            {"AminVost"}
          </span>
        </Link>

        <nav className="nav" aria-label={isFa ? "ناوبری اصلی" : "Primary navigation"}>
          <Link href={`${prefix}/projects`}>{isFa ? "پروژه‌ها" : "Projects"}</Link>
          <Link href={`${prefix}/resume`}>{isFa ? "رزومه" : "Resume"}</Link>
          <Link href={`${prefix}/#focus`}>{isFa ? "حوزه‌های کاری" : "Focus"}</Link>
          <Link href={`${prefix}/#contact`}>{isFa ? "تماس" : "Contact"}</Link>
        </nav>

        <div className="header-actions">
          <Link
            className="language-switch"
            href={isFa ? "/" : "/fa"}
            aria-label={isFa ? "English version" : "نسخه فارسی"}
          >
            {isFa ? "EN" : "FA"}
          </Link>

          <a
            className="icon-button header-github"
            href="https://github.com/AminVost"
            target="_blank"
            rel="me noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2.8a9.2 9.2 0 0 0-2.9 17.93c.46.08.63-.2.63-.45v-1.77c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.78.08-.6.32-1.01.59-1.24-2.05-.23-4.2-1.03-4.2-4.57 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.53.95A8.8 8.8 0 0 1 12 7.16c.78 0 1.55.1 2.28.3 1.75-1.2 2.52-.95 2.52-.95.5 1.27.19 2.21.1 2.44.59.65.95 1.47.95 2.48 0 3.55-2.16 4.33-4.22 4.56.33.29.63.86.63 1.74v2.55c0 .25.17.54.64.45A9.2 9.2 0 0 0 12 2.8Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
