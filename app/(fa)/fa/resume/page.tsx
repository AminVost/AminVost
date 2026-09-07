import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { profileFa } from "@/data/profile-fa";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "fa",
  title: "رزومه — مهندس نرم‌افزار و برنامه‌نویس فول‌استک",
  description:
    "رزومه امین اسدی وسطٰی (AminVost)، مهندس نرم‌افزار و برنامه‌نویس فول‌استک در تهران با بیش از ۶ سال تجربه حرفه‌ای در وب، موبایل و PWA، PHP، Next.js، API، Linux و هوش مصنوعی کاربردی.",
  canonicalPath: "/fa/resume",
  enPath: "/resume",
  faPath: "/fa/resume",
});

export default function PersianResumePage() {
  const resumeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/fa/resume")}#webpage`,
    url: absoluteUrl("/fa/resume"),
    name: "رزومه امین اسدی وسطٰی — مهندس نرم‌افزار فول‌استک",
    inLanguage: "fa-IR",
    about: { "@id": personId },
  };

  return (
    <div className="shell">
      <JsonLd data={resumeJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/fa") },
          { name: "رزومه", url: absoluteUrl("/fa/resume") },
        ])}
      />
      <header className="page-hero">
        <div className="eyebrow">رزومه · AminVost</div>
        <h1>تجربه حرفه‌ای مهندسی نرم‌افزار فول‌استک</h1>
        <p>{profileFa.summary}</p>
        <div className="resume-downloads">
          <a className="button primary" href="/cv/Amin-Asadi-Vosta-FA.docx" download>دانلود رزومه فارسی ↓</a>
          <a className="button" href="/cv/Amin-Asadi-Vosta-FullStack.docx" download>رزومه انگلیسی Full-Stack ↓</a>
          <a className="button" href="/cv/Amin-Asadi-Vosta-FullStack-AI.docx" download>رزومه انگلیسی AI ↓</a>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="section-head"><div><div className="eyebrow">تجربه</div><h2>سابقه حرفه‌ای</h2></div></div>
        <div className="timeline">
          {profileFa.experience.map((item) => <article className="timeline-item" key={item.company}>
            <div className="timeline-time">{item.period}</div>
            <div><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.text}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
          </article>)}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div><div className="eyebrow">مهارت‌ها</div><h2>دامنه فنی</h2></div></div>
        <div className="skills">
          {profileFa.skillGroups.map((group) => <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div><div className="eyebrow">Applied AI</div><h2>هوش مصنوعی در سطح محصول واقعی.</h2></div>
          <div className="stack">
            <div className="stack-card"><h3>دامنه تجربه</h3><p>{profileFa.aiNote}</p></div>
            <div className="stack-card"><h3>Rust</h3><p>{profileFa.rustNote}</p></div>
            <div className="notice">سطح تجربه AI، Rust، Yii2، AngularJS، Flutter و ابزارهای Agent در این سایت عمداً همان‌طور بیان شده که واقعاً از آن‌ها استفاده کرده‌ام؛ نه کمتر و نه بیشتر.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="timeline-item">
          <div className="timeline-time">{profileFa.education.period}</div>
          <div><h3>{profileFa.education.degree}</h3><h4>{profileFa.education.school}</h4><p>معدل: {profileFa.education.gpa}</p></div>
        </div>
        <div className="timeline-item">
          <div className="timeline-time">زبان‌ها</div>
          <div>{profileFa.languages.map((item) => <p key={item.language}><strong>{item.language}:</strong> {item.level}</p>)}</div>
        </div>
      </section>
    </div>
  );
}
