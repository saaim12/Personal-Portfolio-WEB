# Verified codebase cleanup

Baseline: `115bce2` on `feat/work-section-engineering-content`.
Cleanup branch: `chore/verified-codebase-cleanup`.
The baseline working tree was clean, with no unmerged paths.

## Removal inventory and evidence

An import graph was traced from every Next.js page, layout, API route, metadata
route, and error page, including type imports and CSS imports. All 13 MDX files
were inspected separately for custom JSX and asset references. Their current
content uses headings, paragraphs, unordered lists, links, and bold text.

| Group | Candidates | Evidence |
| --- | --- | --- |
| Previous homepage | HeroHeadline, PortraitTransition, ProofBar, StatusLine, Testimonial, Stack, SkillsMarquee, ScrollCue | No active route imports these implementations. |
| Previous navigation and animations | Header.module.scss, ScreenCrawler and its stylesheet, ScrollToHash, Reveal, breakpoints.scss | The current header has global studio styles; the current pages do not mount these effects. |
| Previous project/article UI | ProjectCard and its stylesheet, Articles and its stylesheet, RepositoryArchive, work/Projects.module.css | Current cards and filters are implemented in work/Projects and ProjectGallery; Journal reads resources/articles. |
| Obsolete diagram implementation | ArchitectureDiagram and its stylesheet | Registered in the old MDX component map but never invoked by any current MDX document. Final diagrams are referenced in MDX frontmatter and rendered by the project route. |
| Old content configuration | resources/skills and unused content/type fields | Only obsolete marquee, proof, and testimonial components read these fields. |
| Raster experiments | autoencoder-edge-compression-architecture.png, etl-diagram.png, movie-recommender-system-architecture.png, multilingual-rag-engine-architecture.png, realtime-data-platform-aws-architecture.png | No active source, MDX, metadata, CSS, or dynamically constructed asset path references them. |
| Old automation | scripts/diagrams.mjs | Generates only superseded raster diagrams. |
| Duplicate browser audit | scripts/audit.mjs | Consolidate its useful route/viewport checks into the current studio audit rather than keeping two diverging harnesses. |

## Protected active functionality

- About, Experience, Playground, Services, Journal, Contact, and every project
  route remain active and linked. Their names are not evidence of obsolescence.
- All final project covers and detailed SVG diagrams, decorative photos, local
  fonts, avatar, resume, recommendation PDF, favicon, metadata routes, and
  Open Graph API remain protected.
- Preserve domain redirects, Vercel integrations, Next/TypeScript configuration,
  package lockfile, and content evidence documentation.
- Once UI remains in use for layout, MDX typography, heading-copy interactions,
  and toast notifications. Its Sass peer dependency is required for those
  components. Keep both unless the current renderer is replaced in a separate
  task with explicit behavioral equivalence.

## Validation

Before/after full-page captures cover 21 routes at 1440, 1024, 768, and 390 pixels.
Results, final counts, and commits will be recorded after validation.
