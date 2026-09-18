import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/projects",
    "/resume",
    "/full-stack-developer-iran",
    "/react-native-developer",
    "/fa",
    "/fa/projects",
    "/fa/resume",
    "/fa/full-stack-developer-tehran",
    "/fa/react-native-developer",
  ];

  const projectRoutes = projects.flatMap((project) => [
    `/projects/${project.slug}`,
    `/fa/projects/${project.slug}`,
  ]);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: absoluteUrl(route),
  }));
}
