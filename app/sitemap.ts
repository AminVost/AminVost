import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects", "/resume", "/fa", "/fa/projects", "/fa/resume"];
  const projectRoutes = projects.flatMap((project) => [
    `/projects/${project.slug}`,
    `/fa/projects/${project.slug}`,
  ]);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: absoluteUrl(route),
  }));
}
