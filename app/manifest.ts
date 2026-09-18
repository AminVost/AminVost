import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amin Asadi Vosta (AminVost) — Full-Stack Software Engineer",
    short_name: "AminVost",
    description: "Portfolio of Amin Asadi Vosta (AminVost), a full-stack software engineer in Tehran working across web, React Native, PWA, APIs and practical AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#15171b",
    lang: "en",
  };
}
