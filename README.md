# Amin Vosta — Personal Portfolio

A data-driven personal engineering portfolio built with Next.js App Router and TypeScript.

## What is included
- Minimal, modern home page with fast first-glance positioning
- Full project archive with search and category filters
- Dedicated detail page for every documented project
- Resume page with skills, experience, education and downloadable CV files
- Dark/light theme
- SEO metadata, sitemap and robots routes
- Production-oriented standalone output
- Example Nginx and systemd deployment files for `aminvost.ir`

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Production build
```bash
npm install
npm run build
npm run start
```

`next.config.ts` uses `output: "standalone"`, so a VPS deployment can run the generated standalone server behind Nginx.

## Main content files
- `data/profile.ts` — biography, experience, skills, contact data
- `data/projects.ts` — complete project archive generated from the master career profile

## Design direction
The site intentionally avoids the common portfolio patterns of giant animations, skill-logo walls and overlong landing pages. The homepage is meant to explain Amin's profile quickly, while the project archive and resume keep the detailed information available one level deeper.

## Bilingual routes

- English: `/`, `/projects`, `/resume`
- Persian / RTL: `/fa`, `/fa/projects`, `/fa/resume`
- The header includes an EN/FA switch.
- English typography uses Manrope and Persian typography uses Vazirmatn via `next/font`.
