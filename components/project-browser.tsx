"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/data/projects";

const categories: Array<"All" | ProjectCategory> = ["All", "Web", "Mobile", "AI", "Desktop", "Infrastructure", "Product"];
const faLabels: Record<(typeof categories)[number], string> = {
  All: "همه",
  Web: "وب",
  Mobile: "موبایل",
  AI: "هوش مصنوعی",
  Desktop: "دسکتاپ",
  Infrastructure: "زیرساخت",
  Product: "محصول",
};

export function ProjectBrowser({ projects, locale = "en" }: { projects: Project[]; locale?: "en" | "fa" }) {
  const isFa = locale === "fa";
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatch = category === "All" || project.categories.includes(category);
      const searchMatch = !q || [project.title, project.summary, project.context, project.role, project.technologies.join(" ")]
        .join(" ").toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [projects, category, query]);

  return (
    <>
      <div className="project-browser-controls">
        <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isFa ? "جستجو بین پروژه‌ها، تکنولوژی‌ها و حوزه‌ها…" : "Search projects, technologies, clients…"} aria-label={isFa ? "جستجوی پروژه‌ها" : "Search projects"} />
        <div className="filters" aria-label={isFa ? "فیلتر پروژه‌ها" : "Project filters"}>
          {categories.map((item) => (
            <button key={item} type="button" className={`filter ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{isFa ? faLabels[item] : item}</button>
          ))}
        </div>
      </div>
      <div className="project-grid project-browser-grid">
        {filtered.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}
      </div>
      {filtered.length === 0 && <p style={{ color: "var(--muted)", padding: "24px 0" }}>{isFa ? "پروژه‌ای با این فیلتر پیدا نشد." : "No projects match that filter yet."}</p>}
    </>
  );
}
