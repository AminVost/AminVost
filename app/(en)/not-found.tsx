import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-hero not-found-page">
      <div className="eyebrow">404</div>
      <h1>Nothing here.</h1>
      <p>This page may have moved or never existed.</p>
      <Link className="button primary" href="/">Back home</Link>
    </div>
  );
}
