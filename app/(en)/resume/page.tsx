import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/data/profile";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Resume — Full-Stack Software Engineer",
  description:
    "Resume of Amin Asadi Vosta (AminVost), a full-stack software engineer in Tehran with 6+ years of professional development experience across web, mobile/PWA, PHP, Next.js, APIs, Linux and practical AI integrations.",
  canonicalPath: "/resume",
  enPath: "/resume",
  faPath: "/fa/resume",
});

export default function ResumePage() {
  const resumeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/resume")}#webpage`,
    url: absoluteUrl("/resume"),
    name: "Amin Asadi Vosta — Full-Stack Software Engineer Resume",
    inLanguage: "en",
    about: { "@id": personId },
  };

  return (
    <div className="shell">
      <JsonLd data={resumeJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/") },
          { name: "Resume", url: absoluteUrl("/resume") },
        ])}
      />
      <header className="page-hero">
        <div className="eyebrow">Resume · AminVost</div>
        <h1>Full-stack software engineering experience.</h1>
        <p>{profile.summary}</p>
        <div className="resume-downloads">
          <a className="button primary" href="/cv/Amin-Asadi-Vosta-FullStack.docx" download>Full-Stack CV ↓</a>
          <a className="button" href="/cv/Amin-Asadi-Vosta-FullStack-AI.docx" download>AI-focused CV ↓</a>
          <a className="button" href="/cv/Amin-Asadi-Vosta-FA.docx" download>Persian CV ↓</a>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="section-head"><div><div className="eyebrow">Experience</div><h2>Professional history</h2></div></div>
        <div className="timeline">
          {profile.experience.map((item) => <article className="timeline-item" key={item.company}>
            <div className="timeline-time">{item.period}</div>
            <div><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.text}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
          </article>)}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div><div className="eyebrow">Skills</div><h2>Technical range</h2></div></div>
        <div className="skills">
          {profile.skillGroups.map((group) => <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div><div className="eyebrow">Applied AI</div><h2>Useful, product-level AI work.</h2></div>
          <div className="stack">
            <div className="stack-card"><h3>Scope</h3><p>{profile.aiNote}</p></div>
            <div className="stack-card"><h3>Rust</h3><p>{profile.rustNote}</p></div>
            <div className="notice">I intentionally describe AI, Rust, Yii2, AngularJS, Flutter and agent tooling at the level I have actually used them. The site should make the experience clear without inflating it.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="timeline-item">
          <div className="timeline-time">{profile.education.period}</div>
          <div><h3>{profile.education.degree}</h3><h4>{profile.education.school}</h4><p>GPA: {profile.education.gpa}</p></div>
        </div>
        <div className="timeline-item">
          <div className="timeline-time">Languages</div>
          <div>{profile.languages.map((item) => <p key={item.language}><strong>{item.language}:</strong> {item.level}</p>)}</div>
        </div>
      </section>
    </div>
  );
}
