# saaim.site — Personal Portfolio

Portfolio of **Saaim Abdullah** — web developer, backend & data engineer.

Built with Next.js 16 + [Once UI](https://once-ui.com) (Magic Portfolio base, heavily customized).

## Develop

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
```

Deployed on Vercel, domain: [saaim.site](https://saaim.site).

## Content

- Identity, services, experience, skills: `src/resources/content.tsx`
- Site config (domain, routes, theme, fonts): `src/resources/once-ui.config.ts`
- Project case studies: `src/app/work/projects/*.mdx`

## Validation

```bash
npm run lint
npm run typecheck
npm run build
node scripts/seo-audit.mjs http://localhost:3000
node scripts/audit.mjs http://localhost:3000
```

Project MDX is read by `gray-matter` and rendered on the server with
`next-mdx-remote/rsc`; it does not use the Next MDX loader.
