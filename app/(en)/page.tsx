import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { featuredProjects, projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { JsonLd } from "@/components/json-ld";
import { InteractivePortrait } from "@/components/interactive-portrait";
import { absoluteUrl, pageMetadata, profilePageJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  description:
    "AminVost is the portfolio of Amin Asadi Vosta, a full-stack software engineer in Tehran working across Next.js, React, PHP, mobile/PWA, APIs, production systems and practical AI integrations. Available for freelance and remote international work.",
  canonicalPath: "/",
  enPath: "/",
  faPath: "/fa",
});

export default function HomePage() {
  const selected = featuredProjects.slice(0, 7);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={profilePageJsonLd("en", absoluteUrl("/"))} />

      <section className="hero shell">
        <div className="eyebrow"><span className="dot" /> AminVost · Full-stack software engineer</div>
        <h1>Full-stack software engineer for <span>web, mobile & practical AI.</span></h1>
        <div className="hero-copy">
          <p>I’m {profile.name}, the developer behind AminVost. {profile.headline} I care about useful product decisions, clean interfaces and software that holds up in production.</p>
          <div className="hero-side">
            <InteractivePortrait locale="en" />
            <div className="hero-actions">
              <Link className="button primary" href="/projects">Explore projects <span aria-hidden="true">↗</span></Link>
              <Link className="button" href="/resume">View resume</Link>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat"><strong>6+ yrs</strong><span>professional development</span></div>
          <div className="stat"><strong>{projects.length}</strong><span>documented projects</span></div>
          <div className="stat"><strong>iOS / Android</strong><span>React Native + PWA</span></div>
          <div className="stat"><strong>AI + Local</strong><span>APIs, OCR & local models</span></div>
        </div>
      </section>

      <section className="section shell selected-work-section">
        <div className="selected-work-head">
          <div>
            <div className="eyebrow">Selected projects</div>
            <h2>Full-stack, mobile and AI work in real products.</h2>
          </div>
          <div className="selected-work-side">
            <p>Web platforms, mobile apps, PWAs, AI/OCR systems and production software — selected to show the range of problems I’ve worked on.</p>
            <Link className="text-link" href="/projects">See all {projects.length} projects <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="project-grid">
          {selected.map((project, index) => <ProjectCard key={project.slug} project={project} large={index === 0} index={index} />)}
        </div>
      </section>

      <section className="section shell" id="focus">
        <div className="section-head">
          <div><div className="eyebrow">Focus</div><h2>What I actually work on.</h2></div>
          <p>Full-stack development is the core, with product design, mobile delivery, API integration and applied AI used where they make the product better.</p>
        </div>
        <div className="focus-grid">
          {profile.focusAreas.map((area) => (
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
            <div className="eyebrow">How I work</div>
            <h2>Simple ideas. Careful execution.</h2>
          </div>
          <div className="stack">
            {profile.principles.map((item) => <article className="stack-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
            <article className="stack-card"><h3>Rust, without pretending it is my main stack</h3><p>{profile.rustNote}</p></article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div><div className="eyebrow">Experience</div><h2>Long-running production work.</h2></div>
        </div>
        <div className="timeline">
          {profile.experience.map((item) => (
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
          <div><div className="eyebrow">Stack</div><h2>Tools I use in context.</h2></div>
          <p>Next.js, React, PHP, Python, MySQL, mobile, Linux and AI tooling are grouped by how they are used in production work.</p>
        </div>
        <div className="skills">
          {profile.skillGroups.map((group) => (
            <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section className="shell cta" id="contact">
        <div>
          <h2>Need a full-stack developer for a real product?</h2>
          <p>{profile.availability}. I’m especially interested in web/mobile products, API-heavy systems and practical AI integrations.</p>
        </div>
        <div className="hero-actions">
          <a className="button primary" href={`mailto:${profile.email}`}>Email me</a>
          <a className="button" href={profile.telegram} target="_blank" rel="me noreferrer">Telegram</a>
          <a className="button" href={profile.github} target="_blank" rel="me noreferrer">GitHub</a>
        </div>
      </section>
    </>
  );
}
