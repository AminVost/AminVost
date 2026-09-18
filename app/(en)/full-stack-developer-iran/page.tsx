import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProfilePhoto } from "@/components/profile-photo";
import { ExpertiseProjects } from "@/components/expertise-projects";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { absoluteUrl, breadcrumbJsonLd, expertisePageJsonLd, pageMetadata } from "@/lib/seo";

const description = "Amin Asadi Vosta (AminVost) is a full-stack developer in Tehran, Iran, building production web platforms, APIs, mobile products, PHP/Next.js systems and practical AI integrations.";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Full-Stack Developer in Iran & Tehran",
  description,
  canonicalPath: "/full-stack-developer-iran",
  enPath: "/full-stack-developer-iran",
  faPath: "/fa/full-stack-developer-tehran",
});

export default function FullStackDeveloperIranPage() {
  const url = absoluteUrl("/full-stack-developer-iran");

  return (
    <div className="shell expertise-page">
      <JsonLd data={expertisePageJsonLd({ locale: "en", url, name: "Full-Stack Developer in Iran & Tehran — Amin Asadi Vosta", description })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "AminVost", url: absoluteUrl("/") },
        { name: "Full-Stack Developer in Iran", url },
      ])} />

      <header className="expertise-hero">
        <div className="expertise-hero-copy">
          <div className="eyebrow">Full-stack development · Tehran, Iran</div>
          <h1>Full-Stack Developer in Tehran, Iran</h1>
          <p className="lead">I’m Amin Asadi Vosta (AminVost), a full-stack software engineer based in Tehran. I work across modern front-end applications, backend APIs, mobile products, databases, integrations and production deployment rather than treating each layer as a separate problem.</p>
          <div className="hero-actions hero-actions-start">
            <Link className="button primary" href="/projects">View project case studies</Link>
            <Link className="button" href="/resume">Read my resume</Link>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <section className="section expertise-copy-section">
        <div className="section-head">
          <div><div className="eyebrow">Production full-stack work</div><h2>From product interface to backend and deployment.</h2></div>
          <p>My work is strongest when a project needs someone who can understand the full system: UI, data flow, APIs, integration constraints, deployment and the behavior users see in production.</p>
        </div>
        <div className="expertise-copy-grid">
          <article className="stack-card"><h3>Web applications and platforms</h3><p>I build and maintain applications with Next.js, React, TypeScript, PHP, JavaScript and MySQL. That includes greenfield products as well as older production systems where changes have to be introduced carefully without disrupting existing users.</p></article>
          <article className="stack-card"><h3>Backend, APIs and integrations</h3><p>I work with REST APIs, authentication, WebSocket communication, payment gateways, SMS/email, calendars and third-party services. I’m comfortable tracing problems across the browser, server, database and external integrations rather than stopping at one layer.</p></article>
          <article className="stack-card"><h3>Mobile and cross-platform delivery</h3><p>React Native, PWA and Electron are part of my full-stack background. Several projects involve device-oriented workflows, offline-capable interfaces or desktop/mobile clients that communicate with existing backend systems.</p></article>
          <article className="stack-card"><h3>Practical AI inside products</h3><p>My AI work is application-focused: OCR, structured extraction, review summarization, sentiment and local/external model integrations. I use AI when it improves a product workflow, not as a replacement for clear software architecture.</p></article>
        </div>
      </section>

      <section className="section expertise-copy-section">
        <div className="split">
          <div><div className="eyebrow">Tehran & remote</div><h2>Based in Tehran, working beyond one location.</h2></div>
          <div className="stack">
            <article className="stack-card"><h3>Full-stack developer in Iran</h3><p>I’m based in Tehran, Iran and available for freelance projects, remote international work, on-site roles and relocation. For clients, the useful part is not the location keyword itself — it is having one engineer who can move between product, application and infrastructure concerns when the project needs it.</p></article>
            <article className="stack-card"><h3>Production responsibility</h3><p>My experience includes long-running systems, client projects and internal tools where debugging, release preparation and post-deployment support matter as much as feature implementation. I regularly work with Linux/VPS, Nginx, systemd, SSL and production troubleshooting alongside application code.</p></article>
          </div>
        </div>
      </section>

      <section className="section selected-work-section">
        <div className="selected-work-head">
          <div><div className="eyebrow">Relevant projects</div><h2>Full-stack case studies from real products.</h2></div>
          <div className="selected-work-side"><p>A selection of projects that show web architecture, backend/API work, production integration and applied AI.</p></div>
        </div>
        <ExpertiseProjects projects={projects} slugs={["abzar-market-ocr-ai-abzarmarket-net", "rapiddiag-web", "mci-ivr-visual-flow-editor", "sin-group-online-store-singroup-store"]} />
      </section>

      <section className="section expertise-copy-section">
        <div className="section-head"><div><div className="eyebrow">Technology</div><h2>Stack used in context.</h2></div></div>
        <div className="skills">
          {profile.skillGroups.slice(0, 6).map((group) => <div className="skill-row" key={group.label}><strong>{group.label}</strong><div className="tags">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}
        </div>
      </section>

      <section className="cta">
        <div><h2>Need a full-stack developer for a production project?</h2><p>Review the project archive or contact me with the product, system or integration problem you are trying to solve.</p></div>
        <div className="hero-actions"><a className="button primary" href={`mailto:${profile.email}`}>Email me</a><Link className="button" href="/react-native-developer">React Native work</Link></div>
      </section>
    </div>
  );
}
