import Link from "next/link";
import type { Project, ProjectCategory } from "@/data/projects";

const faCategories: Record<ProjectCategory, string> = {
  Web: "وب",
  Mobile: "موبایل",
  AI: "هوش مصنوعی",
  Desktop: "دسکتاپ",
  Infrastructure: "زیرساخت",
  Product: "محصول",
};

export function ProjectCard({
  project,
  large = false,
  locale = "en",
  index,
}: {
  project: Project;
  large?: boolean;
  locale?: "en" | "fa";
  index?: number;
}) {
  const isFa = locale === "fa";
  const prefix = isFa ? "/fa" : "";
  const projectNumber = index === undefined ? null : String(index + 1).padStart(2, "0");

  return (
    <Link className={`project-card ${large ? "featured" : ""}`} href={`${prefix}/projects/${project.slug}`}>
      <div className="project-card-top">
        {projectNumber && <span className="project-index" aria-hidden="true">{projectNumber}</span>}
        <div className="project-meta">
          {project.categories.slice(0, 3).map((category) => (
            <span className="pill" key={category}>{isFa ? faCategories[category] : category}</span>
          ))}
          <span className="pill">{project.period}</span>
        </div>
      </div>

      <div className="project-card-copy">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>

      <div className="project-footer">
        <div className="tech-preview">
          {project.technologies.slice(0, large ? 6 : 4).map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <span className="project-open">
          {isFa ? "مشاهده" : "View"}
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}
