type Locale = "en" | "fa";

export function ProfilePhoto({ locale = "en", priority = false }: { locale?: Locale; priority?: boolean }) {
  const isFa = locale === "fa";
  const alt = isFa
    ? "امین اسدی وسطی (AminVost)، برنامه‌نویس و مهندس نرم‌افزار فول‌استک در تهران"
    : "Amin Asadi Vosta (AminVost), full-stack software engineer in Tehran, Iran";
  const caption = isFa ? "امین اسدی وسطی · تهران، ایران" : "Amin Asadi Vosta · Tehran, Iran";

  return (
    <figure className="hero-photo-card">
      <img
        src="/profile/amin-asadi-vosta-profile.png"
        width="691"
        height="1280"
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
