import Link from "next/link";
import { profile } from "@/data/profile";
import { profileFa } from "@/data/profile-fa";

export function Footer({ locale = "en" }: { locale?: "en" | "fa" }) {
  const isFa = locale === "fa";
  const p = isFa ? profileFa : profile;
  const prefix = isFa ? "/fa" : "";

  return (
    <footer className="footer">
      <div className="shell footer-seo-links">
        <Link href={isFa ? "/fa/full-stack-developer-tehran" : "/full-stack-developer-iran"}>
          {isFa ? "برنامه‌نویس فول‌استک در تهران" : "Full-stack developer in Iran"}
        </Link>
        <Link href={`${prefix}/react-native-developer`}>
          {isFa ? "برنامه‌نویس React Native" : "React Native developer"}
        </Link>
        <Link href={`${prefix}/projects`}>{isFa ? "نمونه پروژه‌ها" : "Project archive"}</Link>
        <Link href={`${prefix}/resume`}>{isFa ? "رزومه امین اسدی وسطی" : "Amin Asadi Vosta resume"}</Link>
      </div>
      <div className="shell footer-row">
        <span>© {new Date().getFullYear()} AminVost · {isFa ? "امین اسدی وسطی" : "Amin Asadi Vosta"}</span>
        <span>{p.location} · {isFa ? "مهندس نرم‌افزار فول‌استک" : "Full-Stack Software Engineer"}</span>
      </div>
    </footer>
  );
}
