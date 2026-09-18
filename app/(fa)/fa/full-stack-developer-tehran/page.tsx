import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProfilePhoto } from "@/components/profile-photo";
import { ExpertiseProjects } from "@/components/expertise-projects";
import { projectsFa } from "@/data/projects-fa";
import { profileFa } from "@/data/profile-fa";
import { absoluteUrl, breadcrumbJsonLd, expertisePageJsonLd, pageMetadata } from "@/lib/seo";

const description = "امین اسدی وسطی (AminVost)، برنامه‌نویس فول‌استک در تهران با تجربه توسعه وب، Next.js، React، PHP، API، موبایل، زیرساخت Production و هوش مصنوعی کاربردی.";

export const metadata: Metadata = pageMetadata({
  locale: "fa",
  title: "برنامه‌نویس فول‌استک در تهران",
  description,
  canonicalPath: "/fa/full-stack-developer-tehran",
  enPath: "/full-stack-developer-iran",
  faPath: "/fa/full-stack-developer-tehran",
});

export default function PersianFullStackDeveloperPage() {
  const url = absoluteUrl("/fa/full-stack-developer-tehran");

  return (
    <div className="shell expertise-page">
      <JsonLd data={expertisePageJsonLd({ locale: "fa", url, name: "برنامه‌نویس فول‌استک در تهران — امین اسدی وسطی", description })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "AminVost", url: absoluteUrl("/fa") },
        { name: "برنامه‌نویس فول‌استک در تهران", url },
      ])} />

      <header className="expertise-hero">
        <div className="expertise-hero-copy">
          <div className="eyebrow">توسعه فول‌استک · تهران، ایران</div>
          <h1>برنامه‌نویس فول‌استک در تهران</h1>
          <p className="lead">من امین اسدی وسطی (AminVost) هستم؛ مهندس نرم‌افزار و برنامه‌نویس فول‌استک در تهران. در پروژه‌ها فقط روی یک لایه کار نمی‌کنم و بسته به نیاز محصول، Front-end، Backend، API، دیتابیس، موبایل، Integration و Deployment را کنار هم پیش می‌برم.</p>
          <div className="hero-actions hero-actions-start">
            <Link className="button primary" href="/fa/projects">مشاهده نمونه پروژه‌ها</Link>
            <Link className="button" href="/fa/resume">مشاهده رزومه</Link>
          </div>
        </div>
        <ProfilePhoto locale="fa" />
      </header>

      <section className="section expertise-copy-section">
        <div className="section-head">
          <div><div className="eyebrow">توسعه فول‌استک واقعی</div><h2>از رابط کاربری تا Backend و Production.</h2></div>
          <p>بخش مهمی از تجربه من مربوط به محصولاتی است که هم‌زمان به UI مناسب، API پایدار، دیتابیس، Integration و استقرار قابل اتکا نیاز دارند.</p>
        </div>
        <div className="expertise-copy-grid">
          <article className="stack-card"><h3>وب‌اپلیکیشن و پلتفرم</h3><p>با Next.js، React، TypeScript، PHP، JavaScript و MySQL روی پروژه‌های جدید و همچنین سیستم‌های قدیمی Production کار کرده‌ام. در پروژه‌های قدیمی، تغییرات باید مرحله‌ای و بدون آسیب به سرویس فعلی انجام شوند.</p></article>
          <article className="stack-card"><h3>Backend، API و Integration</h3><p>REST API، احراز هویت، WebSocket، درگاه پرداخت، SMS/Email، Calendar و سرویس‌های ثالث بخشی از کارهای روزمره من بوده‌اند. هنگام Debug معمولاً کل مسیر Browser تا Server، Database و سرویس بیرونی را بررسی می‌کنم.</p></article>
          <article className="stack-card"><h3>موبایل و چندسکویی</h3><p>React Native، PWA و Electron بخشی از تجربه فول‌استک من هستند. برخی پروژه‌ها به Device API، قابلیت Offline یا ارتباط با سرویس‌های دسکتاپ و Backend نیاز داشته‌اند.</p></article>
          <article className="stack-card"><h3>هوش مصنوعی کاربردی</h3><p>تجربه AI من بیشتر Product-Oriented است؛ از OCR و استخراج ساختاریافته گرفته تا خلاصه‌سازی، Sentiment و استفاده از مدل‌های Local یا APIهای هوش مصنوعی در Workflow واقعی محصول.</p></article>
        </div>
      </section>

      <section className="section expertise-copy-section">
        <div className="split">
          <div><div className="eyebrow">تهران و همکاری ریموت</div><h2>مستقر در تهران، آماده همکاری فراتر از موقعیت جغرافیایی.</h2></div>
          <div className="stack">
            <article className="stack-card"><h3>برنامه‌نویس فول‌استک در ایران</h3><p>در تهران مستقر هستم و برای پروژه‌های فریلنس، همکاری ریموت بین‌المللی، موقعیت حضوری و Relocation آماده‌ام. برای من مهم‌تر از عبارت جستجو، توانایی دیدن کل محصول و حل مسئله بین چند لایه مختلف سیستم است.</p></article>
            <article className="stack-card"><h3>تجربه Production</h3><p>در کنار توسعه Feature، با Release، عیب‌یابی و پشتیبانی سرویس‌های واقعی نیز درگیر بوده‌ام. Linux/VPS، Nginx، systemd، SSL و Production Troubleshooting بخشی از همین تجربه هستند.</p></article>
          </div>
        </div>
      </section>

      <section className="section expertise-copy-section">
        <div className="split">
          <div><div className="eyebrow">انتخاب توسعه‌دهنده</div><h2>برای انتخاب برنامه‌نویس مناسب در تهران چه چیزهایی مهم است؟</h2></div>
          <div className="stack">
            <article className="stack-card"><h3>«برنامه‌نویس برتر تهران» یک عنوان رسمی نیست</h3><p>اگر با عبارتی مثل «برنامه نویس برتر تهران» به این صفحه رسیده‌اید، بهتر است به‌جای تکیه بر یک عنوان تبلیغاتی، نمونه‌کار واقعی، سابقه Production، توانایی حل مسئله، کیفیت ارتباط و تناسب Stack با پروژه را بررسی کنید. این سایت پروژه‌ها و سطح تجربه من را شفاف نمایش می‌دهد تا تصمیم بر اساس شواهد واقعی باشد.</p></article>
          </div>
        </div>
      </section>

      <section className="section selected-work-section">
        <div className="selected-work-head">
          <div><div className="eyebrow">پروژه‌های مرتبط</div><h2>نمونه‌های واقعی از توسعه فول‌استک.</h2></div>
          <div className="selected-work-side"><p>چند پروژه که معماری وب، API، Integration، Backend و AI کاربردی را بهتر نشان می‌دهند.</p></div>
        </div>
        <ExpertiseProjects projects={projectsFa} locale="fa" slugs={["abzar-market-ocr-ai-abzarmarket-net", "rapiddiag-web", "mci-ivr-visual-flow-editor", "sin-group-online-store-singroup-store"]} />
      </section>

      <section className="section expertise-copy-section">
        <div className="section-head"><div><div className="eyebrow">تکنولوژی‌ها</div><h2>Stack مورد استفاده در پروژه‌های واقعی.</h2></div></div>
        <div className="skills">
          {profileFa.skillGroups.slice(0, 6).map((group) => <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}
        </div>
      </section>

      <section className="cta">
        <div><h2>برای پروژه واقعی به برنامه‌نویس فول‌استک نیاز دارید؟</h2><p>می‌توانید نمونه‌کارها را بررسی کنید یا مسئله فنی و نیاز پروژه را مستقیم برای من ارسال کنید.</p></div>
        <div className="hero-actions"><a className="button primary" href={`mailto:${profileFa.email}`}>ارسال ایمیل</a><Link className="button" href="/fa/react-native-developer">React Native</Link></div>
      </section>
    </div>
  );
}
