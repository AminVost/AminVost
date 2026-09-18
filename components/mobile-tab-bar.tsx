"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Locale = "en" | "fa";
type TabKey = "home" | "projects" | "resume" | "focus" | "contact";

type Tab = {
  key: TabKey;
  href: string;
  label: string;
  icon: ReactNode;
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.8 10.4 12 3.6l8.2 6.8v9a1 1 0 0 1-1 1h-4.5v-6h-5.4v6H4.8a1 1 0 0 1-1-1v-9Z" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.2 3.5h8.4l3.2 3.2v13.8H6.2V3.5Z" />
      <path d="M14.3 3.8v3.4h3.4M9 11h6M9 14.4h6M9 17.8h4.2" />
    </svg>
  );
}

function FocusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3.8H5.8a2 2 0 0 0-2 2V8M16 3.8h2.2a2 2 0 0 1 2 2V8M20.2 16v2.2a2 2 0 0 1-2 2H16M8 20.2H5.8a2 2 0 0 1-2-2V16" />
      <circle cx="12" cy="12" r="3.1" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.2" width="17" height="13.6" rx="3" />
      <path d="m5.6 7.7 6.4 5 6.4-5" />
    </svg>
  );
}

export function MobileTabBar({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const isFa = locale === "fa";
  const homeHref = isFa ? "/fa" : "/";
  const prefix = isFa ? "/fa" : "";
  const isHome = pathname === homeHref;
  const [visibleSection, setVisibleSection] = useState<TabKey | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const handleHashChange = () => {
      if (window.location.hash === "#contact") setVisibleSection("contact");
      else if (window.location.hash === "#focus") setVisibleSection("focus");
      else setVisibleSection(null);
    };

    window.addEventListener("hashchange", handleHashChange);

    const targets = ["focus", "contact"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id === "focus" || visible?.target.id === "contact") {
          setVisibleSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [isHome]);

  const activeSection = isHome ? visibleSection : null;
  const active: TabKey = activeSection
    ?? (pathname.includes("/projects")
      ? "projects"
      : pathname.includes("/resume")
        ? "resume"
        : pathname.includes("full-stack-developer") || pathname.includes("react-native-developer")
          ? "focus"
          : "home");

  const tabs: Tab[] = [
    { key: "home", href: homeHref, label: isFa ? "خانه" : "Home", icon: <HomeIcon /> },
    { key: "projects", href: `${prefix}/projects`, label: isFa ? "پروژه‌ها" : "Projects", icon: <ProjectsIcon /> },
    { key: "resume", href: `${prefix}/resume`, label: isFa ? "رزومه" : "Resume", icon: <ResumeIcon /> },
    { key: "focus", href: `${homeHref}#focus`, label: isFa ? "تخصص‌ها" : "Focus", icon: <FocusIcon /> },
    { key: "contact", href: `${homeHref}#contact`, label: isFa ? "تماس" : "Contact", icon: <ContactIcon /> },
  ];

  return (
    <nav className="mobile-tab-bar" aria-label={isFa ? "منوی اصلی موبایل" : "Mobile primary navigation"}>
      <div className="mobile-tab-bar-surface">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <Link
              key={tab.key}
              className={`mobile-tab ${isActive ? "is-active" : ""}`}
              href={tab.href}
              aria-current={isActive ? (tab.key === "focus" || tab.key === "contact" ? "location" : "page") : undefined}
            >
              <span className="mobile-tab-icon">{tab.icon}</span>
              <span className="mobile-tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
