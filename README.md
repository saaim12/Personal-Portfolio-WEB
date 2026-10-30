# Saaim Abdullah's portfolio

Personal engineering portfolio for **Saaim Abdullah**, a software engineer in Lahore working on backend systems, cloud infrastructure, data pipelines, and AI applications.

**Primary website:** [saaim.site](https://saaim.site) · **Contact:** [saaim.abdullah.work@gmail.com](mailto:saaim.abdullah.work@gmail.com)

Built with Next.js 16, React 19, TypeScript, and Once UI. The same source supports Vercel production hosting and a GitHub Pages static mirror.

## Features

- Animated Home and Services pages, project folder stacking, interactive rulers, and reduced-motion support.
- Six main project case studies, plus four learning repositories presented separately.
- Professional Experience and Story, personal media, and a looping bio reel with playback controls.
- Journal links to original Medium articles and their chapter headings.
- Email-based contact form, professional profiles, and document downloads.
- Route metadata, JSON-LD, sitemap, robots, static social previews, and optional ownership verification.
- Production-only Vercel Web Analytics and Speed Insights.

## Development

Use Node.js 22.13 or newer, below version 25. Node 22 is used by deployment workflows.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. See [.env.example](.env.example) for optional configuration. Defaults work locally without API keys. Keep real local environment files out of Git.

## Content and source

- `src/app`: active pages, sitemap, robots file, and site icon.
- `src/app/projects/content`: 10 Markdown project documents and their frontmatter.
- `src/components`: shared navigation, project cards, contact form, and MDX rendering.
- `src/resources/content.ts`: identity and page metadata.
- `src/resources/experience.ts`: employment history and achievements; education, projects, and skills are on the Professional Experience page.
- `src/resources/articles.ts`: Medium titles, summaries, original chapter headings, and links.
- `src/resources/project-art.ts`: thumbnail and category mapping.
- `src/resources/custom.css`: studio design and responsive styles.
- `src/resources/once-ui.config.ts`: domain, active routes, and theme settings.
- `public`: local fonts, photos, final covers and diagrams, and document downloads.

Professional Experience and Story, Projects, Services, Journal / My Blog, and Contact are active pages.
The Projects gallery shows six main projects, followed by four Learnings entries with descriptions and repository links. Learning documents remain available at their existing URLs.
Project frontmatter selects covers through thumbnail and detail diagrams through images. Put new media in public/images/projects/covers or diagrams, using the project slug as the filename. Diagram links open the full-resolution originals.

Project Markdown is read with gray-matter and rendered using next-mdx-remote/rsc and remark-gfm. Detailed tables scroll within the content column on small screens; second- and third-level headings have permalink links.
Once UI supplies shared CSS and design tokens. Case-study paragraphs, lists, and tables use server-rendered HTML; a small client component handles accessible heading permalink copying and feedback.

## Validation

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm start
# In another terminal:
npm run test:browser -- http://localhost:3000
npm run test:projects -- http://localhost:3000
npm run test:seo -- http://localhost:3000
npm run test:production -- http://localhost:3000
```

Browser checks cover all 30 pages at 1440, 1024, 768, 390, and 320 pixels by default (use `AUDIT_WIDTHS` for additional widths), plus legacy redirects, removed pages, keyboard navigation, project filters, contact validation, downloads, image proportions, button contrast, and reduced motion. Editorial checks enforce page gutters, working section links, and matching HTML/XML sitemap coverage. Reports go in the ignored .audit folder. The repository has no ESLint configuration. The Production checks workflow runs the build and route, content, SEO, and interaction checks on main pushes and pull requests.

The footer links to `/sitemap`, a browsable directory of every public page. `/sitemap.xml` includes all main pages, all 10 project case studies, all 7 expertise pages, and all 4 engineering notes; `/robots.txt` advertises its canonical URL. Preview and non-indexable mirror deployments continue to omit XML entries.

The HTML sitemap, XML sitemap, and `/llms.txt` reading directory share `src/utils/siteCatalog.ts`. `/llm.txt` serves the same reading directory as a compatibility spelling. HTML pages link to it with `rel="describedby"`. `AGENTS.md` holds repository guidance and stays out of the public export. Run `npm run test:discovery -- http://localhost:3000` against a production server to verify route coverage, URLs, crawler responses, and the alias; static mirror checks are included in `test:pages`.

See [search and answer visibility](docs/search-visibility.md) for the SEO/AEO/GEO implementation, evidence maintenance, image optimization, deployment checks, and Search Console/Bing account steps.

For optional Lighthouse and axe audits, install tools outside application dependencies and run against a production server:

```sh
npm install --prefix tmp/audit-tools --no-save --package-lock=false lighthouse @axe-core/playwright
node scripts/quality-audit.mjs http://localhost:3000 --tools=tmp/audit-tools --phase=after
```

See [the measured production readiness report](docs/production-readiness.md) and [route metadata audit](docs/seo-metadata.csv). Shared page wrappers render on the server; Once UI contexts are scoped to MDX pages that need permalink copying and toast feedback.

Social previews use a local PNG, so neither build needs a server-only image endpoint or a remote font download. Vercel monitoring runs only on production Vercel deployments; local development, previews, and GitHub Pages do not send telemetry. The contact form opens an email draft and works on both hosts without a backend.

## Vercel deployment

1. Import `saaim12/Personal-Portfolio-WEB` into Vercel.
2. Use the **Next.js** preset and the repository root. `vercel.json` sets `npm ci` and `npm run build`; keep the output directory at its framework default.
3. Use Node.js 22. Keep `NEXT_PUBLIC_BASE_PATH` empty and `NEXT_PUBLIC_STATIC_EXPORT` unset or `false`.
4. The canonical URL defaults to `https://saaim.site`. Set `NEXT_PUBLIC_SITE_URL` to your production origin if you use another domain, then add that domain in Vercel.

Vercel builds retain image optimization, analytics, and permanent redirects. Preview deployments are excluded from indexing.

Add saaim.site and www.saaim.site under project Settings > Domains. Use the project-specific A and CNAME values shown there. Framework redirects already normalize www and legacy paths; keep www assigned to this project so those rules handle both together. HTTPS enforcement and certificate provisioning are platform settings to verify after DNS propagation.

Optional ownership meta tags use GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION from .env.example. Set the tokens issued by your accounts in Vercel and redeploy. Google Domain-property verification uses a DNS TXT record instead. Do not set NEXT_PUBLIC_SEARCH_INDEXING=false on the primary production site. Ownership and sitemap submission require your Google/Bing accounts; see the report for steps.

### Free monitoring and platform features

The code includes **Vercel Web Analytics** for traffic and **Speed Insights** for real visitor performance, on every page. No extra packages, API keys, paid add-ons, or custom events are needed. URLs sent to both tools exclude query parameters and fragments; contact form values are not tracked.

After importing the project, finish these dashboard steps and redeploy:

1. Open the project's **Analytics** tab and enable Web Analytics.
2. Open **Speed Insights** and enable the standard free tier, not Speed Insights Plus.
3. Use **Observability** and **Logs** to inspect requests, errors, and deployments. Stay with the included features; Observability Plus is unnecessary for this site.
4. Check **Usage** periodically to see the remaining free allowances.

This portfolio collects page views and performance measurements, without custom click events. Included allowances and billing depend on your Vercel plan; check the linked pricing pages and your dashboard before enabling additional features. Installing these integrations does not change your Vercel plan.

Vercel already provides its CDN, automatic HTTPS certificates, and platform DDoS protection; these do not require application packages. `vercel.json` also adds MIME sniffing protection, a referrer policy, and disables unused camera, microphone, and location permissions. GitHub Pages does not apply Vercel response headers or provide its analytics endpoints.

Setup and current limits: [Web Analytics setup](https://vercel.com/docs/analytics/quickstart), [Web Analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing), [Speed Insights pricing](https://vercel.com/docs/speed-insights/limits-and-pricing), [Observability](https://vercel.com/docs/observability), [Vercel Firewall](https://vercel.com/docs/vercel-firewall).

## GitHub Pages deployment

1. In the GitHub repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Push the changes to `main`, or run **Deploy GitHub Pages** manually from the Actions tab.
3. The workflow installs dependencies, checks content and types, exports the site, tests the actual static output with Chromium, and deploys `out/`.

The default repository URL is `https://saaim12.github.io/Personal-Portfolio-WEB/`. GitHub supplies the URL and path automatically, including when a custom Pages domain is configured. Use a separate domain from Vercel if both sites stay live.

Pages is a **noindex mirror by default**, with no indexable sitemap entries, to keep saaim.site as the primary search destination. If Pages becomes the primary host instead, explicitly set NEXT_PUBLIC_SEARCH_INDEXING=true and configure its correct production origin before export. Vercel production remains indexable by default.

```sh
npm run build:pages
npm run test:pages
```

For a domain-root static export, set `NEXT_PUBLIC_BASE_PATH` to an empty string and `NEXT_PUBLIC_SITE_URL` to that origin before running `build:pages`. Static hosting serves local images directly and uses small redirect pages for legacy URLs. `out/.nojekyll` preserves Next.js assets, and `out/404.html` supplies the missing-page screen. The Pages settings change must be made in GitHub; adding a workflow does not enable Pages by itself.

`out/`, `.next/`, dependency folders, caches, test reports, and local environment files are ignored by Git. Upload or publish `out/` for static hosting; commit the source and lockfile for automated builds.

## Content evidence

Employment and delivery claims were checked against supplied resumes and the signed Fitter Health recommendation on September 30, 2026. Source PDFs remain unchanged. Preserve the documented dates, Expertflow usage and response-time figures, and Fitter Health delivery details. Unverified RAG, recommender, pipeline, and compression benchmarks were removed; do not reintroduce them without supporting evidence. This was not an independent audit of external project repositories.

## License and attribution

The repository retains its existing **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license. [LICENSE](LICENSE) contains the full official terms, including attribution, noncommercial use, and modification notices.

When sharing permitted adaptations, credit Saaim Abdullah for his original contributions, link to this repository and the license, identify your changes, and retain any existing attribution notices. Suggested credit: "Adapted from Saaim Abdullah's portfolio: https://github.com/saaim12/Personal-Portfolio-WEB (CC BY-NC 4.0); modifications by [your name]."

Dependencies, fonts, brand icons, third-party media, and any upstream material retain their respective licenses and ownership. The repository license does not replace those licenses or grant rights its contributors do not hold. For permission requests, contact [Saaim Abdullah](mailto:saaim.abdullah.work@gmail.com).
