# Repository guidance

This is Saaim Abdullah's engineering portfolio: Next.js App Router, React, TypeScript, local MDX content, and studio-style CSS. Read `README.md` and `docs/search-visibility.md` for context. Preserve existing user edits and the established visual design.

## Setup and commands

- Use the Node range in `package.json` and the committed npm lockfile. Run `npm ci` when dependencies are missing or change.
- On Windows PowerShell, use `npm.cmd` when execution policy blocks `npm.ps1`.
- `npm run dev` starts local development. `npm run build` creates the normal production build; `npm start` serves it.
- `npm run build:pages` creates the GitHub Pages mirror in `out/`. Stop a running production server before switching build modes; both use `.next/`.
- Generated `.next/`, `out/`, `.audit/`, and `.indexnow-state/` files are not source. Do not hand-edit exported crawler files.

## Source map

- `src/app/`: routes and metadata endpoints; `src/components/`: shared UI.
- `src/app/projects/content/*.mdx`: project facts, dates, source links, covers and architecture diagrams.
- `src/resources/content.ts`: identity, contact details and main-page copy.
- `src/resources/specialties.ts` and `engineering-notes.ts`: engineering guides and project evidence.
- `src/resources/editorial.ts`: maintained guide update date and primary references.
- `src/resources/site-navigation.ts` and `once-ui.config.ts`: main page labels, enabled routes, canonical base and styling settings.
- `src/utils/siteCatalog.ts`: shared public catalog for HTML/XML sitemaps and the LLM reading index.
- `src/resources/indexing.ts`: shared production/preview indexing decision.

## Implementation rules

- Prefer Server Components and semantic HTML for content. Keep interactive client components small.
- Use `SiteAnchor` for native links/downloads, `SiteImage` for public images, and Next `Link` for internal navigation so repository-prefixed exports continue to work.
- Keep existing URLs, heading IDs and legacy redirects stable. Gallery learning entries and their case-study URLs serve different purposes; preserve both.
- Preserve readable mobile gutters, keyboard focus, reduced-motion behavior and no-JavaScript content. Do not fix overflow by hiding meaningful content.
- Avoid UI-library barrel imports in metadata or article rendering. Home and project startup scripts have a 750 KB decoded budget checked by `test:production`.
- Keep original PNG cover URLs available when regenerating WebP variants with `node scripts/optimize-covers.mjs`.

## Content and discovery

- Use documented experience and project evidence. Do not invent metrics, credentials, reviews, clients, business premises or delivery claims. Keep prototypes and proposed hardening distinct from implemented work.
- Structured data, direct answers and citations must match visible content. Keep authorship and real update dates consistent; do not replace content dates with build time.
- Update the shared catalog when routes change. XML sitemaps contain canonical HTML pages and their images, excluding redirects, missing pages and helper-file aliases.
- `/llms.txt` is the canonical public reading directory; `/llm.txt` is a compatible spelling generated from the same source. Keep the index concise and linked to public evidence.
- Preserve crawl access to scripts, styles, images and noindex previews. A robots disallow rule is not a replacement for noindex or access control. Keep preview/mirror sitemaps empty and omit their sitemap advertisement.
- This repository's `AGENTS.md` guides code changes. Do not copy it into `public/` or treat it as a search-engine directive.
- Source edits and local checks do not establish deployment, search-account verification, indexing or rankings. Carry out external changes only within the user's authorized scope and report their actual results.

## Validation

- For source changes, run `npm test`, `npm run typecheck`, and an appropriate build.
- For discovery changes, serve the production build and run `npm run test:discovery -- <origin>`, `npm run test:seo -- <origin>`, and `npm run test:production -- <origin>`.
- For UI changes, verify affected routes at relevant desktop/mobile widths and check the interactions that changed. `npm run test:browser -- <origin>` runs the full suite for shared layout or behavior changes. For MDX/project rendering, also run `npm run test:projects -- <origin>`.
- For changes affecting native URLs, public assets or crawler endpoints, run `npm run build:pages` followed by `npm run test:pages` to verify the repository-prefixed mirror.
- Documentation-only changes need link and diff review, not a full browser suite. There is no configured lint command; do not claim a lint pass.

## Code review rules

- Flag contradictory indexing directives, noncanonical sitemap URLs, invented freshness, and divergent HTML/XML/LLM route coverage.
- Flag client-bundle regressions caused by importing large UI modules into metadata or static article content.
- Flag broken base-path links, removed heading permalinks, unsupported project claims and content hidden solely to satisfy a crawler.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
