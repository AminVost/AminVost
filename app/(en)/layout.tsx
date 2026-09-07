import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { profile } from "@/data/profile";
import { siteName } from "@/lib/seo";
import { anta, manrope } from "../fonts";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: {
    default: "AminVost | Full-Stack Software Engineer",
    template: `%s | ${siteName}`,
  },
  description: profile.headline,
  applicationName: siteName,
  authors: [{ name: profile.name, url: profile.domain }],
  creator: profile.name,
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
};

export default function EnglishLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${manrope.variable} ${anta.variable}`}>
      <body className="locale-en">
        <SiteHeader locale="en" />
        <main className="site-main">{children}</main>
        <Footer locale="en" />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
