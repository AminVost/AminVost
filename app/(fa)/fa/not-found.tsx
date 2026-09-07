import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-hero">
      <div className="eyebrow">404</div>
      <h1>این صفحه پیدا نشد.</h1>
      <p>ممکن است آدرس تغییر کرده باشد یا این صفحه دیگر وجود نداشته باشد.</p>
      <Link className="button primary" href="/fa">بازگشت به صفحه اصلی</Link>
    </div>
  );
}
