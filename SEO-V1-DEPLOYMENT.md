# AminVost SEO v1 — Deployment Guide

## What this version changes

- Fixes broken Persian mojibake/encoding in SEO metadata and structured data.
- Strengthens the identity relationship between Amin Asadi Vosta, Amin Asadi, Amin Vost, AminVost, امین اسدی and امین اسدی وسطی.
- Reworks English and Persian home-page titles, descriptions, H1s and introductory copy.
- Adds the supplied portrait as `/public/profile/amin-asadi-vosta-profile.png` and references it from HTML, Person/ProfilePage structured data and an image sitemap.
- Adds four substantial specialist landing pages:
  - `/full-stack-developer-iran`
  - `/react-native-developer`
  - `/fa/full-stack-developer-tehran`
  - `/fa/react-native-developer`
- Adds internal links to the specialist pages from Home, Footer and relevant project pages.
- Expands project meta descriptions with author/entity context.
- Updates `sitemap.xml`, `robots.txt`, app manifest and adds `/image-sitemap.xml`.
- Makes `https://www.aminvost.ir` the canonical production host because it is the custom domain visible in the supplied Vercel Production Deployment screenshot.
- Redirects `aminvost.ir` and the stable `amin-vost.vercel.app` hostname to `https://www.aminvost.ir` when those hosts reach this Next.js deployment. Vercel branch preview domains are not matched by this rule.

## Recommended Git/Vercel deployment

From your real Git repository:

```bash
git checkout main
git pull origin main
git checkout -b seo-v1
```

Copy the contents of this package over the repository root, then run:

```bash
npm ci
npm run build
npm run lint
```

Commit and push:

```bash
git add .
git commit -m "SEO: entity optimization, specialist landing pages and profile image"
git push -u origin seo-v1
```

Vercel should create a Preview Deployment for `seo-v1`. Check the Preview before merging.

After approval:

```bash
git checkout main
git pull origin main
git merge seo-v1
git push origin main
```

## Preview checklist

Open all of these on the Vercel Preview URL:

- `/`
- `/fa`
- `/projects`
- `/resume`
- `/full-stack-developer-iran`
- `/react-native-developer`
- `/fa/full-stack-developer-tehran`
- `/fa/react-native-developer`
- `/robots.txt`
- `/sitemap.xml`
- `/image-sitemap.xml`
- `/profile/amin-asadi-vosta-profile.png`

Also inspect View Source on `/` and `/fa` and confirm canonical, hreflang, OpenGraph and JSON-LD are present.

## Production host checks

This package uses `https://www.aminvost.ir` as canonical. After deployment:

```bash
curl -I https://www.aminvost.ir/
curl -I https://aminvost.ir/
curl -I https://amin-vost.vercel.app/
```

Expected final destination: `https://www.aminvost.ir/`.

If you intentionally want the apex `https://aminvost.ir` to be canonical instead, change `domain` in both `data/profile.ts` and `data/profile-fa.ts` and reverse the host redirects in `next.config.ts` before production deployment.

## Google Search Console after production deploy

Submit/refresh these sitemaps:

- `https://www.aminvost.ir/sitemap.xml`
- `https://www.aminvost.ir/image-sitemap.xml`

Use URL Inspection and Request Indexing for:

- `https://www.aminvost.ir/`
- `https://www.aminvost.ir/fa`
- `https://www.aminvost.ir/full-stack-developer-iran`
- `https://www.aminvost.ir/react-native-developer`
- `https://www.aminvost.ir/fa/full-stack-developer-tehran`
- `https://www.aminvost.ir/fa/react-native-developer`

Do not request indexing for every project at once. Let the updated sitemap and internal links handle discovery, then inspect important project case studies individually if needed.

## Validation status of this package

- TypeScript/TSX syntax scan: passed across the project source (0 syntax diagnostics).
- Mojibake scan of app/components/data/lib: passed; the previously broken Persian SEO strings are removed.
- Route and target-keyword checks: passed.
- A full `npm run build` could not be completed in the packaging environment because its npm registry DNS lookup returned `EAI_AGAIN`. No build failure caused by project code was observed; run `npm ci && npm run build && npm run lint` in your local environment or let the Vercel Preview build validate dependency-level/type-level integration before merging to production.
