# Search and answer visibility

The canonical portfolio is `https://saaim.site`. The GitHub Pages export remains a noindex mirror. Search optimization targets software engineering recruitment and project enquiries, with deeper guides answering specific engineering questions.

## Implementation

- Main pages use distinct titles and descriptions, self-referencing canonicals, social previews, and permissive snippet/image-preview settings on indexable deployments.
- `isSearchIndexable()` supplies the same production/preview decision to metadata, robots and XML sitemaps. Preview builds cannot become indexable through an indexing override.
- All 30 public pages appear in the HTML sitemap and production XML sitemap. Project entries also list their cover and architecture images. Rendering assets remain crawlable.
- Collection markup lists the same pages visitors can open. Detail breadcrumbs include Home, the relevant parent directory, and the current page.
- Engineering guides identify their author, show a maintained update date, lead with a direct answer, and link to project evidence. Technical notes cite primary documentation. Article abstracts and citations match visible content.
- Project case studies link back to relevant expertise and architecture guides. Person identity links identify actual profiles; WhatsApp remains a contact action.
- Seven project covers use WebP for page rendering. Original PNG URLs remain available for sharing and existing links. Regenerate with `node scripts/optimize-covers.mjs` after changing a cover.
- Metadata uses Next.js directly. Case-study text uses native server-rendered HTML with a small heading-copy component. This avoids loading the UI library's chart/navigation bundle on every page. Production tests cap decoded startup JavaScript at 750 KB for Home and project details.
- `/llms.txt` is the canonical optional reading directory; `/llm.txt` serves identical content for the alternative spelling. Both are generated from `src/utils/siteCatalog.ts`, also used by the HTML and XML sitemaps. No special AI-only content or hidden instructions are used.
- HTML advertises the directory with `rel="describedby"`. On the Next.js runtime, both text endpoints include a canonical `Link` header and `X-Robots-Tag: noindex, follow`, keeping the directory separate from the HTML pages intended for search. GitHub Pages serves the exported text files without custom response headers; mirror HTML pages retain their noindex metadata.
- `robots.txt` uses one wildcard allow rule, plus the production sitemap URL. It has no nonstandard host, noindex, or crawl-delay directive. Preview builds remain crawlable so their noindex metadata can be read, and do not advertise a sitemap.
- `AGENTS.md` contains repository-specific engineering guidance, content and discovery rules, validation commands, and the managed Next.js documentation block. It is not a public website endpoint.

Google says its AI features use the same core SEO requirements and do not require special AI files or schema. This implementation focuses on accessible text, clear answers, reliable evidence and internal discovery. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

Structured data describes the actual person, services, collections, software projects and articles. It does not invent organizations, local business premises, reviews, prices, or credentials. [Google structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Maintaining evidence

1. Keep the page's answer concise and specific, then explain implementation, limitations, and recovery paths.
2. Link numerical claims to an actual case study; distinguish delivered work from prototypes and proposed improvements.
3. Change `EDITORIAL_UPDATED_AT` only after a substantive revision to the guides, evidence, or references. Use existing project publication/update dates for project write-ups. Do not manufacture publication dates for older guides.
4. Keep visible citations, Article `citation`, collection indexes, and sitemap routes in agreement. The production checks enforce this relationship.
5. Keep each guide's parent and at least one relevant case study linked. Avoid creating near-duplicate pages for keyword variants or locations.

## Release and account work

The repository cannot establish ownership of external search accounts. After deploying the checked source to the canonical host:

1. Verify the canonical domain in Google Search Console and Bing Webmaster Tools. Existing `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` settings accept issued meta-token content; DNS verification is also supported. See `.env.example`.
2. Submit `https://saaim.site/sitemap.xml` in both accounts. Inspect Home, one case study and one engineering note using Google's URL Inspection and Rich Results Test. Check the live host/CDN does not challenge legitimate crawlers.
3. The existing IndexNow workflow verifies live production and notifies changed published URLs. Local build results are not proof of a deployed or indexed update.
4. Review Search Console queries, indexed pages and field Core Web Vitals. In Bing, inspect AI Performance citations and grounding queries alongside regular search performance. [Bing AI Performance documentation announcement](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

Measure qualified enquiries and relevant recruitment traffic along with impressions and clicks. Lab checks and file-size savings do not establish real-user Core Web Vitals. Crawl, indexing, ranking, rich-result display and AI citation remain decisions of the external search services.

## Reproducible checks

```sh
npm test
npm run typecheck
npm run build
npm start
# In a second terminal:
npm run test:seo -- http://localhost:3000
npm run test:discovery -- http://localhost:3000
npm run test:production -- http://localhost:3000
npm run test:browser -- http://localhost:3000
npm run test:projects -- http://localhost:3000
npm run test:performance -- http://localhost:3000
# Stop the production server before the static-export check:
npm run build:pages
npm run test:pages
```

Generated reports live under ignored `.audit/`. The browser audit checks every route at 1440, 1024, 768, 390 and 320 pixels by default. Static-export tests also check the mirror's noindex directives and repository-prefixed links.

The local optimization reduced seven cover assets from 8,578,202 to 1,023,892 bytes (88.1%). Home's measured decoded startup scripts fell from 1,555,513 to 508,420 bytes (67.3%); decoded size is not compressed network transfer size. `.audit/performance.json` records representative mobile lab observations with explicit throttling settings and limitations.
