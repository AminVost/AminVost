import { profile } from "@/data/profile";
import { profileFa } from "@/data/profile-fa";

export function Footer({ locale = "en" }: { locale?: "en" | "fa" }) {
  const isFa = locale === "fa";
  const p = isFa ? profileFa : profile;
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <span>© {new Date().getFullYear()} AminVost · {isFa ? "امین اسدی وسطٰی" : "Amin Asadi Vosta"}</span>
        <span>{p.location} · {isFa ? "مهندس نرم‌افزار فول‌استک" : "Full-Stack Software Engineer"}</span>
      </div>
    </footer>
  );
}
