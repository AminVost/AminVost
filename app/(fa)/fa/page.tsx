import type { Metadata } from "next";
import Link from "next/link";
import { profileFa } from "@/data/profile-fa";
import { featuredProjectsFa, projectsFa } from "@/data/projects-fa";
import { ProjectCard } from "@/components/project-card";
import { JsonLd } from "@/components/json-ld";
import { InteractivePortrait } from "@/components/interactive-portrait";
import { absoluteUrl, pageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "fa",
  description:
    "رزومه و نمونه‌کارهای امین اسدی وسطٰی (AminVost)، مهندس نرم‌افزار و برنامه‌نویس فول‌استک در تهران با تجربه Next.js، React، PHP، موبایل و PWA، API و پیاده‌سازی هوش مصنوعی کاربردی. آماده همکاری فریلنس و ریموت.",
  canonicalPath: "/fa",
  enPath: "/",
  faPath: "/fa",
});

export default function PersianHomePage() {
  const selected = featuredProjectsFa.slice(0, 7);

  return (
    <>
      <JsonLd data={profilePageJsonLd("fa", absoluteUrl("/fa"))} />

      <section className="hero shell">
        <div className="eyebrow"><span className="dot" /> AminVost · مهندس نرم‌افزار فول‌استک</div>
        <h1>مهندس نرم‌افزار فول‌استک برای <span>وب، موبایل و هوش مصنوعی کاربردی.</span></h1>
        {/* <div className="hero-copy">
          <p>من {profileFa.name} هستم و با برند AminVost فعالیت می‌کنم. {profileFa.headline} برای من تصمیم درست محصول، رابط تمیز و نرم‌افزاری که در Production قابل اتکا باشد مهم است.</p>
          <div className="hero-side">
            <InteractivePortrait locale="fa" />
            <div className="hero-actions">
              <Link className="button primary" href="/fa/projects">مشاهده پروژه‌ها <span aria-hidden="true">↗</span></Link>
              <Link className="button" href="/fa/resume">مشاهده رزومه</Link>
            </div>
          </div>
        </div> */}
        <div className="stats">
          <div className="stat"><strong>+۶ سال</strong><span>تجربه حرفه‌ای توسعه</span></div>
          <div className="stat"><strong>{projectsFa.length}</strong><span>پروژه مستندشده</span></div>
          <div className="stat"><strong>iOS / Android</strong><span>React Native + PWA</span></div>
          <div className="stat"><strong>AI + Local</strong><span>API، OCR و مدل‌های Local</span></div>
        </div>
      </section>

      <section className="section shell selected-work-section">
        <div className="selected-work-head">
          <div>
            <div className="eyebrow">پروژه‌های منتخب</div>
            <h2>نمونه‌هایی از فول‌استک، موبایل و هوش مصنوعی در محصول واقعی</h2>
          </div>
          <div className="selected-work-side">
            <p>وب‌اپ، اپلیکیشن موبایل، PWA، سیستم‌های AI/OCR و نرم‌افزارهای Production که بخش‌های مختلف تجربه‌ام را نشان می‌دهند.</p>
            <Link className="text-link" href="/fa/projects">مشاهده همه {projectsFa.length} پروژه <span aria-hidden="true">←</span></Link>
          </div>
        </div>
        <div className="project-grid">
          {selected.map((project, index) => <ProjectCard key={project.slug} project={project} large={index === 0} locale="fa" index={index} />)}
        </div>
      </section>

      <section className="section shell" id="focus">
        <div className="section-head">
          <div><div className="eyebrow">تمرکز</div><h2>بیشتر روی چه چیزهایی کار می‌کنم؟</h2></div>
          <p>هسته کارم توسعه فول‌استک است و بسته به نیاز محصول از طراحی تجربه کاربر، موبایل، API و هوش مصنوعی کاربردی استفاده می‌کنم.</p>
        </div>
        <div className="focus-grid">
          {profileFa.focusAreas.map((area) => (
            <article className="focus-card" key={area.title}>
              <div className="eyebrow">{area.eyebrow}</div>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="split">
          <div>
            <div className="eyebrow">روش کار</div>
            <h2>ایده ساده، اجرای دقیق.</h2>
          </div>
          <div className="stack">
            {profileFa.principles.map((item) => <article className="stack-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
            <article className="stack-card"><h3>Rust، در حد تجربه واقعی</h3><p>{profileFa.rustNote}</p></article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head"><div><div className="eyebrow">تجربه کاری</div><h2>کار روی سیستم‌های واقعی و در حال استفاده.</h2></div></div>
        <div className="timeline">
          {profileFa.experience.map((item) => (
            <article className="timeline-item" key={item.company}>
              <div className="timeline-time">{item.period}</div>
              <div>
                <h3>{item.company}</h3><h4>{item.role}</h4><p>{item.text}</p>
                <ul>{item.bullets.slice(0, 4).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div><div className="eyebrow">تکنولوژی‌ها</div><h2>ابزارهایی که در پروژه‌های واقعی استفاده می‌کنم.</h2></div>
          <p>Next.js، React، PHP، Python، MySQL، موبایل، Linux و ابزارهای AI بر اساس نوع استفاده واقعی دسته‌بندی شده‌اند.</p>
        </div>
        <div className="skills">
          {profileFa.skillGroups.map((group) => (
            <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section className="shell cta" id="contact">
        <div>
          <h2>برای یک محصول واقعی به برنامه‌نویس فول‌استک نیاز دارید؟</h2>
          <p>{profileFa.availability}. به‌خصوص به وب و موبایل، سیستم‌های API محور و استفاده درست از AI در کسب‌وکار علاقه دارم.</p>
        </div>
        <div className="hero-actions">
          <a className="button primary" href={`mailto:${profileFa.email}`}>ارسال ایمیل</a>
          <a className="button" href={profileFa.telegram} target="_blank" rel="me noreferrer">Telegram</a>
          <a className="button" href={profileFa.github} target="_blank" rel="me noreferrer">GitHub</a>
        </div>
      </section>
    </>
  );
}
