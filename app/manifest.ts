import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AminVost — Full-Stack Software Engineer",
    short_name: "AminVost",
    description: "Portfolio of Amin Asadi Vosta, a full-stack software engineer working across web, mobile, PWA, APIs and practical AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#15171b",
    lang: "en",
  };
}
