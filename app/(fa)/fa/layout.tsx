import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../../globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { profileFa } from "@/data/profile-fa";
import { siteName } from "@/lib/seo";
import { anta, manrope } from "../../fonts";

export const metadata: Metadata = {
  metadataBase: new URL(profileFa.domain),
  title: {
    default: "امین اسدی وسطی (AminVost) | برنامه‌نویس و مهندس نرم‌افزار فول‌استک",
    template: `%s | ${siteName}`,
  },
  description: profileFa.headline,
  applicationName: siteName,
  authors: [{ name: "Amin Asadi Vosta", url: profileFa.domain }],
  creator: "Amin Asadi Vosta",
  publisher: siteName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PersianLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={`${manrope.variable} ${anta.variable}`}>
      <body className="locale-fa">
        <SiteHeader locale="fa" />
        <main className="site-main">{children}</main>
        <Footer locale="fa" />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
