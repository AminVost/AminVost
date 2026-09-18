import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { projectsFa } from "@/data/projects-fa";
import type { ProjectCategory } from "@/data/projects";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId, websiteId } from "@/lib/seo";

const faCategories: Record<ProjectCategory, string> = {
  Web: "وب", Mobile: "موبایل", AI: "هوش مصنوعی", Desktop: "دسکتاپ", Infrastructure: "زیرساخت", Product: "محصول",
};

export function generateStaticParams() {
  return projectsFa.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsFa.find((item) => item.slug === slug);
  if (!project) return {};

  return pageMetadata({
    locale: "fa",
    title: project.title,
    description: `${project.summary} مطالعه موردی پروژه توسط امین اسدی وسطی (AminVost).`,
    canonicalPath: `/fa/projects/${project.slug}`,
    enPath: `/projects/${project.slug}`,
    faPath: `/fa/projects/${project.slug}`,
  });
}

export default async function PersianProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsFa.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectUrl = absoluteUrl(`/fa/projects/${project.slug}`);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    description: `${project.summary} مطالعه موردی پروژه توسط امین اسدی وسطی (AminVost).`,
    inLanguage: "fa-IR",
    creator: {
      "@type": "Person",
      "@id": personId,
      name: "Amin Asadi Vosta",
      alternateName: ["امین اسدی وسطی", "امین اسدی", "Amin Vost", "AminVost"],
    },
    isPartOf: { "@id": websiteId },
    keywords: [...project.categories.map((item) => faCategories[item]), ...project.technologies].join(", "),
    ...(project.url ? { sameAs: project.url } : {}),
  };

  return (
    <article className="project-detail shell">
      <JsonLd data={projectJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/fa") },
          { name: "پروژه‌ها", url: absoluteUrl("/fa/projects") },
          { name: project.title, url: projectUrl },
        ])}
      />
      <div className="project-detail-grid">
        <div>
          <Link className="text-link" href="/fa/projects">بازگشت به پروژه‌ها ←</Link>
          <div className="project-meta" style={{ marginTop: 28, marginBottom: 16 }}>
            {project.categories.map((item) => <span className="pill" key={item}>{faCategories[item]}</span>)}
          </div>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>

          <section className="detail-block">
            <h2>نقش و کاری که انجام دادم</h2>
            <p style={{ color: "var(--muted)", marginTop: 0 }}>{project.contribution}</p>
          </section>

          <section className="detail-block">
            <h2>نکات مهم</h2>
            <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="detail-block">
            <h2>تکنولوژی‌ها</h2>
            <div className="tags">{project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
          </section>
        </div>

        <aside className="detail-side">
          <dl className="detail-panel">
            <dt>بازه</dt><dd>{project.period || "—"}</dd>
            <dt>نقش</dt><dd>{project.role || "توسعه‌دهنده نرم‌افزار"}</dd>
            {project.context && <><dt>Context</dt><dd>{project.context}</dd></>}
          </dl>
          {project.url && <a className="button primary" href={project.url} target="_blank" rel="noreferrer">مشاهده پروژه زنده ↗</a>}
          <Link className="button" href="/fa/resume">مشاهده رزومه کامل</Link>
          <Link className="button" href="/fa/full-stack-developer-tehran">پروفایل برنامه‌نویس فول‌استک</Link>
          {project.categories.includes("Mobile") && <Link className="button" href="/fa/react-native-developer">تجربه React Native</Link>}
        </aside>
      </div>
    </article>
  );
}
