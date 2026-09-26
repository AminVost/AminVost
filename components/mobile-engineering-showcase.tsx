import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";

const mobileProjectSlugs = [
  "rapidmobilediag",
  "pantomin-pantomim-aminvost-ir",
  "shab-persian-mafia-game",
];

export function MobileEngineeringShowcase({
  projects,
  locale = "en",
}: {
  projects: Project[];
  locale?: "en" | "fa";
}) {
  const isFa = locale === "fa";
  const prefix = isFa ? "/fa" : "";
  const selected = mobileProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  const capabilities = isFa
    ? ["React Native", "iOS / Android", "BLE و NFC", "Biometrics", "Camera و Sensors", "PWA و Offline"]
    : ["React Native", "iOS / Android", "BLE & NFC", "Biometrics", "Camera & sensors", "PWA & offline"];

  return (
    <section className="section shell selected-work-section mobile-engineering-section" id="mobile">
      <div className="mobile-engineering-intro">
        <div className="mobile-engineering-copy">
          <div className="eyebrow">{isFa ? "مهندسی موبایل" : "Mobile engineering"}</div>
          <h2>
            {isFa
              ? "از React Native و Device API تا PWAهای قابل نصب."
              : "From React Native device APIs to installable PWAs."}
          </h2>
          <p>
            {isFa
              ? "تجربه موبایل من شامل اپلیکیشن React Native برای iOS و Android، جریان‌های Diagnostic وابسته به سخت‌افزار، ارتباط با Backend و WebSocket و محصولات Mobile-First با رفتار Local-First و Offline است."
              : "My mobile work spans React Native applications for iOS and Android, hardware-dependent diagnostic flows, backend and WebSocket communication, and mobile-first products with local-first and offline behavior."}
          </p>
          <div className="mobile-capability-tags" aria-label={isFa ? "قابلیت‌های موبایل" : "Mobile capabilities"}>
            {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
          <div className="hero-actions hero-actions-start">
            <Link className="button primary" href={`${prefix}/react-native-developer`}>
              {isFa ? "مشاهده تجربه کامل موبایل" : "Explore mobile experience"}
            </Link>
            <Link className="button" href={`${prefix}/projects/rapidmobilediag`}>
              {isFa ? "پروژه RapidMobileDiag" : "RapidMobileDiag case study"}
            </Link>
          </div>
        </div>

        <aside className="mobile-scope-panel" aria-label={isFa ? "دامنه اثبات‌شده تجربه موبایل" : "Verified mobile engineering scope"}>
          <div className="mobile-scope-topline">
            <span>{isFa ? "دامنه تجربه واقعی" : "Verified delivery scope"}</span>
            <i aria-hidden="true" />
          </div>
          <div className="mobile-scope-platforms">
            <strong>iOS</strong>
            <strong>Android</strong>
            <strong>PWA</strong>
          </div>
          <div className="mobile-scope-list">
            <div><span>01</span><p><strong>{isFa ? "Native-focused" : "Native-focused"}</strong>{isFa ? "React Native و قابلیت‌های Device در RapidMobileDiag" : "React Native and device capabilities in RapidMobileDiag"}</p></div>
            <div><span>02</span><p><strong>{isFa ? "Connected" : "Connected"}</strong>{isFa ? "REST، WebSocket و سرویس‌های Companion" : "REST, WebSocket and companion-service workflows"}</p></div>
            <div><span>03</span><p><strong>{isFa ? "Installable web" : "Installable web"}</strong>{isFa ? "PWA، Service Worker، Offline و Safe Area" : "PWA, service workers, offline behavior and safe areas"}</p></div>
          </div>
          <p className="mobile-scope-note">
            {isFa
              ? "تجربه React Native از نمونه‌های PWA و Mobile-First جدا و شفاف ارائه شده است."
              : "React Native experience is presented separately from PWA and mobile-first web delivery."}
          </p>
        </aside>
      </div>

      <div className="selected-work-head mobile-projects-head">
        <div>
          <div className="eyebrow">{isFa ? "نمونه‌های موبایل" : "Mobile proof"}</div>
          <h2>{isFa ? "Native، PWA و تجربه‌های Mobile-First." : "Native, PWA and mobile-first delivery."}</h2>
        </div>
        <div className="selected-work-side">
          <p>
            {isFa
              ? "پروژه‌ها براساس نوع خروجی معرفی شده‌اند تا تفاوت اپلیکیشن Native با PWA مشخص بماند."
              : "Each project is described by its actual delivery model so native application work stays distinct from PWA work."}
          </p>
          <Link className="text-link" href={`${prefix}/projects`}>
            {isFa ? "مشاهده آرشیو پروژه‌ها ←" : "Browse the project archive →"}
          </Link>
        </div>
      </div>
      <div className="project-grid mobile-project-grid">
        {selected.map((project, index) => (
          <ProjectCard key={project.slug} project={project} locale={locale} large={index === 0} index={index} />
        ))}
      </div>
    </section>
  );
}
