import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/data/projects";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId, websiteId } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return pageMetadata({
    locale: "en",
    title: project.title,
    description: `${project.summary} Case study by Amin Asadi Vosta (AminVost).`,
    canonicalPath: `/projects/${project.slug}`,
    enPath: `/projects/${project.slug}`,
    faPath: `/fa/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectUrl = absoluteUrl(`/projects/${project.slug}`);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    description: `${project.summary} Case study by Amin Asadi Vosta (AminVost).`,
    inLanguage: "en",
    creator: {
      "@type": "Person",
      "@id": personId,
      name: "Amin Asadi Vosta",
    },
    isPartOf: { "@id": websiteId },
    keywords: [...project.categories, ...project.technologies].join(", "),
    ...(project.url ? { sameAs: project.url } : {}),
  };

  return (
    <article className="project-detail shell">
      <JsonLd data={projectJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/") },
          { name: "Projects", url: absoluteUrl("/projects") },
          { name: project.title, url: projectUrl },
        ])}
      />
      <div className="project-detail-grid">
        <div>
          <Link className="text-link" href="/projects">← Back to projects</Link>
          <div className="project-meta" style={{ marginTop: 28, marginBottom: 16 }}>
            {project.categories.map((item) => <span className="pill" key={item}>{item}</span>)}
          </div>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>

          <section className="detail-block">
            <h2>What I did</h2>
            <p style={{ color: "var(--muted)", marginTop: 0 }}>{project.contribution || "Project development and implementation work across the listed scope."}</p>
          </section>

          <section className="detail-block">
            <h2>Highlights</h2>
            <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="detail-block">
            <h2>Technology</h2>
            <div className="tags">{project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
          </section>
        </div>

        <aside className="detail-side">
          <dl className="detail-panel">
            <dt>Period</dt><dd>{project.period || "—"}</dd>
            <dt>Role</dt><dd>{project.role || "Software Developer"}</dd>
            {project.context && <><dt>Context</dt><dd>{project.context}</dd></>}
          </dl>
          {project.url && <a className="button primary" href={project.url} target="_blank" rel="noreferrer">Visit live project ↗</a>}
          <Link className="button" href="/resume">See full resume</Link>
          <Link className="button" href="/full-stack-developer-iran">Full-stack developer profile</Link>
          {project.categories.includes("Mobile") && <Link className="button" href="/react-native-developer">React Native experience</Link>}
        </aside>
      </div>
    </article>
  );
}
