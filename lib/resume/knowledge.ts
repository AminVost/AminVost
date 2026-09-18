import { profile } from "@/data/profile";
import { profileFa } from "@/data/profile-fa";
import { projects } from "@/data/projects";
import { projectsFa } from "@/data/projects-fa";

export type ResumeLocale = "en" | "fa";

const normaliseText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\u200c\u200d]/g, " ")
    .replace(/[^\p{L}\p{N}+#.]+/gu, " ")
    .trim();

const toTokens = (value: string) =>
  normaliseText(value)
    .split(/\s+/)
    .filter((token) => token.length >= 2);

export function getPublicResumeKnowledge(locale: ResumeLocale = "en") {
  const source = locale === "fa" ? profileFa : profile;
  const sourceProjects = locale === "fa" ? projectsFa : projects;

  return {
    profile: {
      name: source.name,
      shortName: source.shortName,
      brandName: source.brandName,
      aliases: [...source.aliases],
      title: source.title,
      headline: source.headline,
      location: source.location,
      availability: source.availability,
      summary: source.summary,
      focusAreas: source.focusAreas.map((item) => ({ ...item })),
      education: { ...source.education },
      languages: source.languages.map((item) => ({ ...item })),
      aiNote: source.aiNote,
      rustNote: source.rustNote,
    },
    skills: source.skillGroups.map((group) => ({
      group: group.label,
      items: [...group.items],
    })),
    experience: source.experience.map((item) => ({
      company: item.company,
      role: item.role,
      period: item.period,
      text: item.text,
      bullets: [...item.bullets],
    })),
    projects: sourceProjects.map((project) => ({
      slug: project.slug,
      title: project.title,
      period: project.period,
      context: project.context,
      role: project.role,
      contribution: project.contribution,
      summary: project.summary,
      highlights: [...project.highlights],
      technologies: [...project.technologies],
      categories: [...project.categories],
      projectUrl: `${locale === "fa" ? "/fa" : ""}/projects/${project.slug}`,
      externalUrl: project.url ?? null,
      featured: project.featured,
      featuredRank: project.featuredRank,
    })),
    contact: {
      email: source.email,
      telegram: source.telegram,
      github: source.github,
      phone: source.phone,
    },
  };
}

export type ProjectSearchResult = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  technologies: string[];
  categories: string[];
  projectUrl: string;
  externalUrl: string | null;
  relevance: number;
};

export function searchResumeProjects(
  query: string,
  locale: ResumeLocale = "en",
  limit = 3,
): ProjectSearchResult[] {
  const knowledge = getPublicResumeKnowledge(locale);
  const normalizedQuery = normaliseText(query);
  const queryTokens = new Set(toTokens(query));

  const scored = knowledge.projects.map((project) => {
    const title = normaliseText(project.title);
    const technologyText = normaliseText(project.technologies.join(" "));
    const categoryText = normaliseText(project.categories.join(" "));
    const body = normaliseText(
      [project.summary, project.contribution, ...project.highlights].join(" "),
    );
    const titleTokens = new Set(toTokens(title));
    const technologyTokens = new Set(toTokens(technologyText));
    const categoryTokens = new Set(toTokens(categoryText));
    const bodyTokens = new Set(toTokens(body));

    let score = 0;
    if (normalizedQuery && title.includes(normalizedQuery)) score += 18;
    if (normalizedQuery && technologyText.includes(normalizedQuery)) score += 14;
    if (normalizedQuery && body.includes(normalizedQuery)) score += 9;

    for (const token of queryTokens) {
      if (titleTokens.has(token)) score += 7;
      if (technologyTokens.has(token)) score += 6;
      if (categoryTokens.has(token)) score += 4;
      if (bodyTokens.has(token)) score += 2;
    }

    return {
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      role: project.role,
      period: project.period,
      technologies: project.technologies.slice(0, 7),
      categories: project.categories,
      projectUrl: project.projectUrl,
      externalUrl: project.externalUrl,
      relevance: score,
    } satisfies ProjectSearchResult;
  });

  const results = scored
    .filter((project) => project.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, Math.max(1, Math.min(limit, 5)));

  return results;
}


export function getFeaturedResumeProjects(
  locale: ResumeLocale = "en",
  limit = 3,
): ProjectSearchResult[] {
  const knowledge = getPublicResumeKnowledge(locale);
  return knowledge.projects
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredRank - b.featuredRank)
    .slice(0, Math.max(1, Math.min(limit, 4)))
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      role: project.role,
      period: project.period,
      technologies: project.technologies.slice(0, 7),
      categories: project.categories,
      projectUrl: project.projectUrl,
      externalUrl: project.externalUrl,
      relevance: 100 - Math.min(project.featuredRank, 99),
    }));
}

export function getScopeVocabulary() {
  const knowledge = getPublicResumeKnowledge("en");
  const faKnowledge = getPublicResumeKnowledge("fa");
  const values = [
    knowledge.profile.name,
    knowledge.profile.shortName,
    knowledge.profile.brandName,
    ...knowledge.profile.aliases,
    ...faKnowledge.profile.aliases,
    ...knowledge.skills.flatMap((group) => group.items),
    ...knowledge.projects.flatMap((project) => [
      project.title,
      ...project.technologies,
      ...project.categories,
    ]),
  ];

  return new Set(values.flatMap(toTokens));
}
