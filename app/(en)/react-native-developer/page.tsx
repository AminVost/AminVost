import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProfilePhoto } from "@/components/profile-photo";
import { ExpertiseProjects } from "@/components/expertise-projects";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { absoluteUrl, breadcrumbJsonLd, expertisePageJsonLd, pageMetadata } from "@/lib/seo";

const description = "React Native developer portfolio of Amin Asadi Vosta (AminVost), covering production mobile apps, Android/iOS device workflows, sensors, NFC, biometrics, camera, WebSocket and backend integration.";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "React Native Developer — Mobile & Device Integrations",
  description,
  canonicalPath: "/react-native-developer",
  enPath: "/react-native-developer",
  faPath: "/fa/react-native-developer",
});

export default function ReactNativeDeveloperPage() {
  const url = absoluteUrl("/react-native-developer");

  return (
    <div className="shell expertise-page">
      <JsonLd data={expertisePageJsonLd({ locale: "en", url, name: "React Native Developer — Amin Asadi Vosta", description })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "AminVost", url: absoluteUrl("/") },
        { name: "React Native Developer", url },
      ])} />

      <header className="expertise-hero">
        <div className="expertise-hero-copy">
          <div className="eyebrow">React Native · Mobile engineering</div>
          <h1>React Native Developer for Production Mobile Apps</h1>
          <p className="lead">I’m Amin Asadi Vosta (AminVost). My React Native work includes mobile diagnostic flows, hardware- and sensor-oriented features, backend communication and the practical debugging needed when an application depends on real devices rather than only standard UI screens.</p>
          <div className="hero-actions hero-actions-start">
            <Link className="button primary" href="/projects/rapidmobilediag">View RapidMobileDiag</Link>
            <Link className="button" href="/projects">All projects</Link>
          </div>
        </div>
        <ProfilePhoto />
      </header>

      <section className="section expertise-copy-section">
        <div className="section-head">
          <div><div className="eyebrow">Mobile engineering</div><h2>React Native beyond basic screens.</h2></div>
          <p>I work on the application layer as well as the integrations that make mobile products useful: device APIs, native behavior, communication, permissions and production debugging.</p>
        </div>
        <div className="expertise-copy-grid">
          <article className="stack-card"><h3>Device-oriented workflows</h3><p>My mobile diagnostic work has involved features such as camera, audio/video, geolocation, NFC, BLE, biometrics, sensors and voice/TTS where supported by the target device and project requirements.</p></article>
          <article className="stack-card"><h3>React Native + native integration</h3><p>When a React Native library is not enough, I’m comfortable working around native Android/iOS behavior, diagnosing compatibility problems and connecting JavaScript flows to device capabilities or companion tooling.</p></article>
          <article className="stack-card"><h3>WebSocket and backend communication</h3><p>Mobile applications often need more than local UI state. I’ve worked with WebSocket-style status/command flows, REST APIs, authentication and companion desktop/server services as part of diagnostic and cross-platform systems.</p></article>
          <article className="stack-card"><h3>Production debugging</h3><p>Real-device development means handling hardware differences, unsupported capabilities, permissions and edge cases. I treat those behaviors as part of the product, with explicit supported/not-supported flows and careful fallback handling.</p></article>
        </div>
      </section>

      <section className="section selected-work-section">
        <div className="selected-work-head">
          <div><div className="eyebrow">Mobile projects</div><h2>React Native and mobile case studies.</h2></div>
          <div className="selected-work-side"><p>Projects that show hands-on mobile development rather than generic technology keywords.</p></div>
        </div>
        <ExpertiseProjects projects={projects} slugs={["rapidmobilediag", "todolist-mobile-app"]} />
      </section>

      <section className="section expertise-copy-section">
        <div className="split">
          <div><div className="eyebrow">Related stack</div><h2>Mobile work connected to the rest of the system.</h2></div>
          <div className="stack">
            <article className="stack-card"><h3>Full-stack context</h3><p>I also work across Next.js, React, PHP, APIs, WebSocket, Linux and production infrastructure. That matters when the mobile app is only one client inside a larger product workflow.</p></article>
            <article className="stack-card"><h3>Cross-platform perspective</h3><p>My broader experience includes PWAs and Electron applications, so I’m used to deciding which logic belongs in the client, what should be shared with backend services and where platform-specific behavior is unavoidable.</p></article>
          </div>
        </div>
      </section>

      <section className="cta">
        <div><h2>Need React Native work connected to a real backend or device workflow?</h2><p>Send the project requirements, target devices and integrations and I can review the technical scope.</p></div>
        <div className="hero-actions"><a className="button primary" href={`mailto:${profile.email}`}>Email me</a><Link className="button" href="/full-stack-developer-iran">Full-stack experience</Link></div>
      </section>
    </div>
  );
}
