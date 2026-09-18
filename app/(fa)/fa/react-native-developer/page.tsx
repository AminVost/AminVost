import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProfilePhoto } from "@/components/profile-photo";
import { ExpertiseProjects } from "@/components/expertise-projects";
import { projectsFa } from "@/data/projects-fa";
import { profileFa } from "@/data/profile-fa";
import { absoluteUrl, breadcrumbJsonLd, expertisePageJsonLd, pageMetadata } from "@/lib/seo";

const description = "نمونه‌کارهای React Native امین اسدی وسطی (AminVost) شامل اپلیکیشن موبایل، Diagnostic، سنسورها، NFC، Biometrics، Camera، WebSocket و Integration با Backend و Device API.";

export const metadata: Metadata = pageMetadata({
  locale: "fa",
  title: "برنامه‌نویس React Native — اپلیکیشن موبایل و Device Integration",
  description,
  canonicalPath: "/fa/react-native-developer",
  enPath: "/react-native-developer",
  faPath: "/fa/react-native-developer",
});

export default function PersianReactNativeDeveloperPage() {
  const url = absoluteUrl("/fa/react-native-developer");

  return (
    <div className="shell expertise-page">
      <JsonLd data={expertisePageJsonLd({ locale: "fa", url, name: "برنامه‌نویس React Native — امین اسدی وسطی", description })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "AminVost", url: absoluteUrl("/fa") },
        { name: "برنامه‌نویس React Native", url },
      ])} />

      <header className="expertise-hero">
        <div className="expertise-hero-copy">
          <div className="eyebrow">React Native · توسعه موبایل</div>
          <h1>برنامه‌نویس React Native برای اپلیکیشن‌های واقعی</h1>
          <p className="lead">من امین اسدی وسطی (AminVost) هستم. بخشی از تجربه React Native من روی اپلیکیشن‌های Diagnostic و قابلیت‌هایی بوده که به سخت‌افزار، Sensor، Device API، ارتباط با Backend و Debug روی دستگاه واقعی وابسته‌اند؛ نه فقط ساخت Screenهای معمولی.</p>
          <div className="hero-actions hero-actions-start">
            <Link className="button primary" href="/fa/projects/rapidmobilediag">مشاهده RapidMobileDiag</Link>
            <Link className="button" href="/fa/projects">همه پروژه‌ها</Link>
          </div>
        </div>
        <ProfilePhoto locale="fa" />
      </header>

      <section className="section expertise-copy-section">
        <div className="section-head">
          <div><div className="eyebrow">مهندسی موبایل</div><h2>React Native فراتر از رابط کاربری.</h2></div>
          <p>در پروژه‌های موبایل با Device API، Permission، Communication، محدودیت‌های سخت‌افزاری و تفاوت رفتار دستگاه‌های واقعی نیز درگیر بوده‌ام.</p>
        </div>
        <div className="expertise-copy-grid">
          <article className="stack-card"><h3>Workflowهای وابسته به Device</h3><p>در پروژه‌های Diagnostic با قابلیت‌هایی مثل Camera، Audio/Video، Geolocation، NFC، BLE، Biometrics، Sensorها و Voice/TTS در دستگاه‌هایی که پشتیبانی می‌کنند کار کرده‌ام.</p></article>
          <article className="stack-card"><h3>React Native و Native Integration</h3><p>وقتی Library آماده کافی نباشد، بررسی رفتار Native، رفع ناسازگاری و اتصال Flowهای JavaScript به قابلیت‌های دستگاه یا ابزارهای Companion بخشی از کار می‌شود.</p></article>
          <article className="stack-card"><h3>WebSocket و Backend</h3><p>اپلیکیشن موبایل معمولاً بخشی از یک سیستم بزرگ‌تر است. در پروژه‌های مرتبط با Status/Command Flow، REST API، Authentication، WebSocket و سرویس‌های Companion کار کرده‌ام.</p></article>
          <article className="stack-card"><h3>Debug روی دستگاه واقعی</h3><p>تفاوت Hardware، قابلیت‌های Unsupported، Permission و Edge Caseها باید بخشی از UX محصول در نظر گرفته شوند. برای این موارد مسیرهای مشخص Supported/Not Supported و Fallback طراحی می‌کنم.</p></article>
        </div>
      </section>

      <section className="section selected-work-section">
        <div className="selected-work-head">
          <div><div className="eyebrow">پروژه‌های موبایل</div><h2>نمونه پروژه‌های React Native و موبایل.</h2></div>
          <div className="selected-work-side"><p>نمونه‌هایی که تجربه عملی Mobile Development را نشان می‌دهند.</p></div>
        </div>
        <ExpertiseProjects projects={projectsFa} locale="fa" slugs={["rapidmobilediag", "todolist-mobile-app"]} />
      </section>

      <section className="section expertise-copy-section">
        <div className="split">
          <div><div className="eyebrow">Stack مرتبط</div><h2>موبایل در کنار کل سیستم.</h2></div>
          <div className="stack">
            <article className="stack-card"><h3>نگاه فول‌استک</h3><p>در کنار React Native با Next.js، React، PHP، API، WebSocket، Linux و زیرساخت Production هم کار می‌کنم. این موضوع زمانی مهم است که اپلیکیشن موبایل فقط یکی از Clientهای یک Workflow بزرگ‌تر باشد.</p></article>
            <article className="stack-card"><h3>Cross-platform</h3><p>تجربه PWA و Electron باعث شده در طراحی معماری بین منطق Client، Backend و رفتار Platform-specific تفکیک واضح‌تری داشته باشم و تصمیم بگیرم هر بخش بهتر است کجا اجرا شود.</p></article>
          </div>
        </div>
      </section>

      <section className="cta">
        <div><h2>برای پروژه React Native به توسعه Device یا Backend Integration نیاز دارید؟</h2><p>نیازمندی‌ها، دستگاه‌های هدف و Integrationهای پروژه را بفرستید تا Scope فنی مشخص شود.</p></div>
        <div className="hero-actions"><a className="button primary" href={`mailto:${profileFa.email}`}>ارسال ایمیل</a><Link className="button" href="/fa/full-stack-developer-tehran">تجربه فول‌استک</Link></div>
      </section>
    </div>
  );
}
