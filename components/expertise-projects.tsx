import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";

export function ExpertiseProjects({
  projects,
  slugs,
  locale = "en",
}: {
  projects: Project[];
  slugs: string[];
  locale?: "en" | "fa";
}) {
  const selected = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <div className="project-grid expertise-project-grid">
      {selected.map((project, index) => (
        <ProjectCard key={project.slug} project={project} locale={locale} index={index} large={index === 0} />
      ))}
    </div>
  );
}
