import Link from "next/link";

export default function NotFound() {
  return <div className="shell" style={{ padding: "130px 0" }}><div className="eyebrow">404</div><h1 style={{ fontSize: "clamp(50px,8vw,90px)", margin: "12px 0", letterSpacing: "-.06em" }}>Nothing here.</h1><p style={{ color: "var(--muted)" }}>This page may have moved or never existed.</p><Link className="button primary" href="/">Back home</Link></div>;
}
