import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/data/projects";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Projects — Full-Stack, AI, Web & Mobile",
  description:
    "Explore AminVost projects across Next.js and React web apps, PHP systems, React Native and PWA products, AI/OCR, API integrations, desktop tools and production infrastructure.",
  canonicalPath: "/projects",
  enPath: "/projects",
  faPath: "/fa/projects",
});

export default function ProjectsPage() {
  return (
    <div className="shell">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/") },
          { name: "Projects", url: absoluteUrl("/projects") },
        ])}
      />
      <header className="page-hero">
        <div className="eyebrow">Project archive</div>
        <h1>Full-stack, mobile, AI and production projects.</h1>
        <p>This archive covers client products, internal tools and independent work across web development, mobile and PWA, applied AI/OCR, APIs, desktop software and infrastructure.</p>
      </header>
      <ProjectBrowser projects={projects} />
      <div style={{ height: 80 }} />
    </div>
  );
}
