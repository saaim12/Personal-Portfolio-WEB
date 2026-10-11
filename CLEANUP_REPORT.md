# Cleanup and project-image integration report

Baseline: `115bce2`. Branch: `chore/verified-codebase-cleanup`.
The working tree was clean at the start. No merge or deployment was performed.

## Results

- **54 tracked file paths removed**, excluding the browser-audit rename. This includes obsolete components, styles, type/configuration wrappers, scripts, historical documentation, and replaced assets.
- **22 previously tracked media assets removed**: five superseded raster diagrams, fourteen SVGs replaced by supplied images, and three unused stock photos. Five additional duplicate copies from the newly supplied files were removed after SHA-256 equality checks.
- **One direct dependency removed** (transliteration), together with 18 transitive packages. The existing Once UI version is pinned to 1.5.6.
- Approximately **2,568 net source/tooling lines removed**: 2,866 removed and 298 added across src and scripts, excluding project prose, lockfile, assets, and documentation. Minified CSS means line counts understate style removal.
- No unreferenced source modules or project assets remained in the final import/reference scan. Two new user files, public/images/avatar_2.jpeg and avatar_3.jpeg, appeared afterward; they are intentionally left untouched and uncommitted because they belong to the user's concurrent edits. Their intended placement is not yet specified.

## What was removed and why

The import graph was traced from Next pages, layout, API and metadata routes, including type and stylesheet imports. All 13 MDX documents and dynamically selected images were checked separately.

Old hero, portrait transition, proof, testimonial, marquee, crawler, reveal, project-card, repository archive, and article components had no active import paths. Their companion styles, obsolete diagram renderer, raster generator, unused icon registry, and unused content/configuration types were removed. Current float/blink animations and reduced-motion behavior remain.

The project reader now has a specific name and a fixed content directory. MDX rendering supports the elements actually used by the documents; all 78 heading permalinks were checked against their former IDs. The technology registry contains the 42 active entries. Unused analytics click delegation, redundant async declarations, old comments, and dead configuration fields were removed.

Two overlapping browser audits were consolidated into scripts/browser-audit.mjs. The historical content-review document was replaced by a short evidence note in README.md. Temporary transformation scripts, comparison screenshots, test output, the empty src/types directory, and a corrupt/stale Next development cache were removed after verification. node_modules and the current production .next output remain ignored, reproducible runtime/build artifacts.

## Supplied project images

The later image-integration request intentionally changes the pictures while retaining the current page layout. The 23 supplied PNGs contained 18 unique images, now organized under public/images/projects/covers and diagrams with consistent project-slug filenames. Original image bytes were preserved.

| Project | Covers | Architecture diagrams |
| --- | ---: | ---: |
| Fitter Health | 1 | 3 |
| Realtime ecommerce ETL | 1 | 2 |
| Multilingual RAG | 1 | 2 |
| Movie recommender | 1 | 1 |
| Edge autoencoder | 1 | 1 |
| Document Q&A | 1 | 1 |
| Temporary URL service | 1 | 1 |

Covers now drive cards, detail headers, and project sharing metadata. Images fit inside their frames without cropping. Each architecture diagram links to its original full-size image. The six projects without new imagery retain their existing SVG cover/diagram pairs; these were restored after their folders were removed during the user's asset replacement. Every project's body text remains unchanged after normalizing line endings.

## Validation

- Fresh npm ci completed successfully with the updated lockfile.
- Production build passed, generating all 27 static outputs and retaining the dynamic Open Graph endpoint.
- TypeScript passed, including noUnusedLocals and noUnusedParameters.
- Three content tests passed: stable permalink forms, required project content/assets, and supported Markdown/image formats.
- Final Playwright audit passed **105 route/viewport checks**: 21 pages at 1440, 1024, 768, 390, and 320 pixels. No broken images or page runtime errors. It also checks one main heading/landmark, image alt attributes, internal links, menu/Escape behavior, category filters, contact validation/back navigation, heading-copy clipboard behavior, PDF downloads, sitemap, robots, 404, and reduced motion.
- All seven supplied covers and eleven full-size diagram links were verified. Desktop and mobile cover rendering and desktop diagram rendering were visually inspected.
- Baseline captures covered all 21 pages at the four requested widths. Comparison work exposed stale optimized-image cache contents, which were cleared. A strict pixel-equality claim is not made: the user subsequently requested replacing project imagery. The final browser checks verify the current images and layout.
- The SEO audit returned HTTP 200 for all 21 pages and their Open Graph images when run with network access. It still exits nonzero for five pre-existing editorial findings listed below.
- Git diff whitespace checks passed. ESLint is not configured; no lint result is claimed. The browser accessibility checks above are basic checks, not a full WCAG audit.

## Preserved functionality and remaining debt

All active routes remain, including About, Experience, Services, Journal, Playground, Contact, and all 13 projects. Resume/recommendation downloads, external article links, contact actions, Vercel analytics, metadata, redirects, local fonts, and current animations remain. Once UI and its Sass peer dependency are required by the active layout/MDX/permalink/toast implementation.

Known baseline issues were not disguised as cleanup regressions:

- Decorative polaroids extend the viewport to 1039px on Home and 1037px on Contact at a 1024px viewport. The browser audit explicitly records these two baseline exceptions while rejecting new overflows.
- About shares the homepage description. Services, Journal, Playground, and Contact descriptions are below the audit's 120-character recommendation. Existing copy is preserved.
- Open Graph generation downloads Geist from Google Fonts at request time. Sandboxed network denial caused local failures; the network-enabled verification passed. A future offline-font change would remove that dependency.
- The supplied originals are high-resolution PNGs. Next optimizes displayed images; full-size diagram links intentionally serve the original files.

## Commits

- `409e866` Remove obsolete portfolio components and diagram generator.
- `6a0d69b` Remove five superseded raster architecture assets.
- `81e508d` Consolidate active project content and remove dead metadata and icon registries.
- `f6e0efa` Remove dead reveal styles and unused theme variables.
- `25d8b77` Remove unused dependency and consolidate portfolio validation.
- `117504d` Remove obsolete configuration types and simplify active setup.
- `5c857a3` Use supplied project covers and architecture diagrams.

The report and final documentation update are committed separately after validation.
