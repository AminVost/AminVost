import { profileImageUrl, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const pages = [
    `${siteUrl}/`,
    `${siteUrl}/fa`,
    `${siteUrl}/full-stack-developer-iran`,
    `${siteUrl}/react-native-developer`,
    `${siteUrl}/fa/full-stack-developer-tehran`,
    `${siteUrl}/fa/react-native-developer`,
  ];

  const urls = pages
    .map((page) => `  <url>\n    <loc>${page}</loc>\n    <image:image>\n      <image:loc>${profileImageUrl}</image:loc>\n    </image:image>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
