import type { Metadata } from "next";
import { profile } from "@/data/profile";

export type SeoLocale = "en" | "fa";

export const siteName = "AminVost";
export const siteUrl = profile.domain.replace(/\/$/, "");
export const ogImageUrl = `${siteUrl}/og-image.png`;
export const profileImageUrl = `${siteUrl}/profile/amin-asadi-vosta-profile.png`;
export const profileImageId = `${siteUrl}/#profile-image`;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${siteUrl}/` : `${siteUrl}${normalized}`;
}

export function localizedAlternates(enPath: string, faPath: string) {
  return {
    en: absoluteUrl(enPath),
    fa: absoluteUrl(faPath),
    "x-default": absoluteUrl(enPath),
  };
}

export function pageMetadata({
  locale,
  title,
  description,
  canonicalPath,
  enPath,
  faPath,
}: {
  locale: SeoLocale;
  title?: string;
  description: string;
  canonicalPath: string;
  enPath: string;
  faPath: string;
}): Metadata {
  const canonical = absoluteUrl(canonicalPath);
  const fullTitle = title
    ? `${title} | ${siteName}`
    : locale === "fa"
      ? "امین اسدی وسطی (AminVost) | برنامه‌نویس و مهندس نرم‌افزار فول‌استک"
      : "Amin Asadi Vosta (AminVost) | Full-Stack Software Engineer";

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: localizedAlternates(enPath, faPath),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: fullTitle,
      description,
      siteName,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Amin Asadi Vosta (AminVost) — Full-Stack Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function profileImageJsonLd(locale: SeoLocale = "en") {
  const isFa = locale === "fa";
  return {
    "@type": "ImageObject",
    "@id": profileImageId,
    contentUrl: profileImageUrl,
    url: profileImageUrl,
    width: 691,
    height: 1280,
    name: isFa
      ? "عکس امین اسدی وسطی (AminVost)"
      : "Amin Asadi Vosta (AminVost) portrait",
    caption: isFa
      ? "امین اسدی وسطی، مهندس نرم‌افزار و برنامه‌نویس فول‌استک در تهران"
      : "Amin Asadi Vosta, full-stack software engineer in Tehran, Iran",
    creator: { "@id": personId },
  };
}

export function personJsonLd(locale: SeoLocale = "en") {
  const isFa = locale === "fa";
  return {
    "@type": "Person",
    "@id": personId,
    name: "Amin Asadi Vosta",
    alternateName: [
      "AminVost",
      "Amin Vost",
      "Amin Asadi",
      "Amin Asadi Vosta",
      "امین اسدی",
      "امین اسدی وسطی",
      "امین اسدی‌ وسطی",
    ],
    url: siteUrl,
    image: profileImageJsonLd(locale),
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: isFa ? "مهندس نرم‌افزار فول‌استک" : "Full-Stack Software Engineer",
    description: isFa
      ? "امین اسدی وسطی (AminVost)، برنامه‌نویس و مهندس نرم‌افزار فول‌استک در تهران با تمرکز بر توسعه وب، React Native، موبایل، API و هوش مصنوعی کاربردی."
      : "Amin Asadi Vosta (AminVost) is a full-stack software engineer in Tehran focused on production web, React Native, mobile, API integration and practical AI features.",
    homeLocation: {
      "@type": "Place",
      name: "Tehran, Iran",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tehran",
        addressCountry: "IR",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "WebNevisan",
    },
    sameAs: [profile.github, profile.telegram],
    knowsLanguage: ["Persian", "English"],
    knowsAbout: [
      "Full-stack development",
      "Software engineering",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "PHP",
      "Python",
      "MySQL",
      "PWA",
      "API integration",
      "Applied AI",
      "OCR",
      "Local AI models",
      "Qwen",
      "Linux",
      "Nginx",
    ],
  };
}

export function profilePageJsonLd(locale: SeoLocale, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile-page`,
    url: pageUrl,
    inLanguage: locale === "fa" ? "fa-IR" : "en",
    mainEntity: personJsonLd(locale),
    primaryImageOfPage: profileImageJsonLd(locale),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    alternateName: [
      "Amin Vost",
      "Amin Asadi",
      "Amin Asadi Vosta",
      "امین اسدی",
      "امین اسدی وسطی",
      "aminvost.ir",
    ],
    url: `${siteUrl}/`,
    inLanguage: ["en", "fa"],
    publisher: { "@id": personId },
  };
}

export function expertisePageJsonLd({
  locale,
  url,
  name,
  description,
}: {
  locale: SeoLocale;
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === "fa" ? "fa-IR" : "en",
    about: { "@id": personId },
    primaryImageOfPage: profileImageJsonLd(locale),
    isPartOf: { "@id": websiteId },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
