import type { Metadata } from "next";
import { profile } from "@/data/profile";

export type SeoLocale = "en" | "fa";

export const siteName = "AminVost";
export const siteUrl = profile.domain.replace(/\/$/, "");
export const ogImageUrl = `${siteUrl}/og-image.png`;
export const profileImageUrl = `${siteUrl}/profile/amin-vost-portrait.webp`;

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
      ? "Ø§Ù…ÛŒÙ† Ø§Ø³Ø¯ÛŒ ÙˆØ³Ø·Ù°ÛŒ | Ù…Ù‡Ù†Ø¯Ø³ Ù†Ø±Ù…â€ŒØ§ÙØ²Ø§Ø± ÙÙˆÙ„â€ŒØ§Ø³ØªÚ©"
      : "AminVost | Full-Stack Software Engineer";

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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${siteName} â€” Full-Stack Software Engineer` }],
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

export function personJsonLd(locale: SeoLocale = "en") {
  const isFa = locale === "fa";
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: [
      "AminVost",
      "Amin Vost",
      "Amin Asadi",
      "Ø§Ù…ÛŒÙ† Ø§Ø³Ø¯ÛŒ ÙˆØ³Ø·Ù°ÛŒ",
      "Ø§Ù…ÛŒÙ† Ø§Ø³Ø¯ÛŒ",
    ],
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      url: profileImageUrl,
      width: 480,
      height: 600,
    },
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: "Full-Stack Software Engineer",
    description: isFa
      ? "Ù…Ù‡Ù†Ø¯Ø³ Ù†Ø±Ù…â€ŒØ§ÙØ²Ø§Ø± ÙÙˆÙ„â€ŒØ§Ø³ØªÚ© Ø¯Ø± ØªÙ‡Ø±Ø§Ù† Ø¨Ø§ ØªÙ…Ø±Ú©Ø² Ø¨Ø± ØªÙˆØ³Ø¹Ù‡ ÙˆØ¨ØŒ Ù…ÙˆØ¨Ø§ÛŒÙ„ØŒ PWAØŒ ÛŒÚ©Ù¾Ø§Ø±Ú†Ù‡â€ŒØ³Ø§Ø²ÛŒ API Ùˆ Ù‚Ø§Ø¨Ù„ÛŒØªâ€ŒÙ‡Ø§ÛŒ Ú©Ø§Ø±Ø¨Ø±Ø¯ÛŒ Ù‡ÙˆØ´ Ù…ØµÙ†ÙˆØ¹ÛŒ."
      : "Full-stack software engineer in Tehran focused on production web, mobile, PWA, API integration and practical AI features.",
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
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    alternateName: ["Amin Vost", "Amin Asadi Vosta", "aminvost.ir"],
    url: `${siteUrl}/`,
    inLanguage: ["en", "fa"],
    publisher: { "@id": personId },
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

