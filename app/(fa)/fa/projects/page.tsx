import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";
import { JsonLd } from "@/components/json-ld";
import { projectsFa } from "@/data/projects-fa";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "fa",
  title: "پروژه‌ها — فول‌استک، وب، موبایل و هوش مصنوعی",
  description:
    "نمونه‌کارهای امین اسدی وسطی (AminVost) در توسعه وب و Next.js، React Native، PHP، اپلیکیشن موبایل و PWA، هوش مصنوعی و OCR، API، دسکتاپ و زیرساخت Production.",
  canonicalPath: "/fa/projects",
  enPath: "/projects",
  faPath: "/fa/projects",
});

export default function PersianProjectsPage() {
  return (
    <div className="shell">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "AminVost", url: absoluteUrl("/fa") },
          { name: "پروژه‌ها", url: absoluteUrl("/fa/projects") },
        ])}
      />
      <header className="page-hero">
        <div className="eyebrow">آرشیو پروژه‌ها</div>
        <h1>پروژه‌های فول‌استک، موبایل، AI و سیستم‌های Production</h1>
        <p>این آرشیو شامل پروژه‌های مشتری، ابزارهای داخلی و کارهای مستقل در توسعه وب، موبایل و PWA، هوش مصنوعی و OCR، API، نرم‌افزار دسکتاپ و زیرساخت است.</p>
      </header>
      <ProjectBrowser projects={projectsFa} locale="fa" />
      <div style={{ height: 80 }} />
    </div>
  );
}
