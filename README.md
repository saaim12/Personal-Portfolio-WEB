# Saaim Abdullah's portfolio

Next.js 16, React 19, TypeScript, and Once UI. Supports Vercel and GitHub Pages from the same source.

## Development

Use Node.js 22.13 or newer for the application and test commands.

```sh
npm ci
npm run dev
```

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
Once UI supplies shared layout, typography, heading permalink copying, and toast feedback; it requires Sass.

## Validation

```sh
npm run typecheck
npm test
npm run build
npm start
# In another terminal:
npm run test:browser -- http://localhost:3000
npm run test:projects -- http://localhost:3000
npm run test:seo -- http://localhost:3000
```

Browser checks cover all 16 pages at 1440, 1024, 768, 390, and 320 pixels, plus legacy redirects, removed pages, keyboard navigation, project filters, contact validation, downloads, image proportions, button contrast, and reduced motion. Reports go in the ignored .audit folder. The repository has no ESLint configuration.

Social previews use a local PNG, so neither build needs a server-only image endpoint or a remote font download. Vercel monitoring runs only on production Vercel deployments; local development, previews, and GitHub Pages do not send telemetry. The contact form opens an email draft and works on both hosts without a backend.

## Vercel deployment

1. Import `saaim12/Personal-Portfolio-WEB` into Vercel.
2. Use the **Next.js** preset and the repository root. `vercel.json` sets `npm ci` and `npm run build`; keep the output directory at its framework default.
3. Use Node.js 22. Keep `NEXT_PUBLIC_BASE_PATH` empty and `NEXT_PUBLIC_STATIC_EXPORT` unset or `false`.
4. The canonical URL defaults to `https://saaim.site`. Set `NEXT_PUBLIC_SITE_URL` to your production origin if you use another domain, then add that domain in Vercel.

Vercel builds retain image optimization, analytics, and permanent redirects. Preview deployments are excluded from indexing.

### Free monitoring and platform features

The code includes **Vercel Web Analytics** for traffic and **Speed Insights** for real visitor performance, on every page. No extra packages, API keys, paid add-ons, or custom events are needed. URLs sent to both tools exclude query parameters and fragments; contact form values are not tracked.

After importing the project, finish these dashboard steps and redeploy:

1. Open the project's **Analytics** tab and enable Web Analytics.
2. Open **Speed Insights** and enable the standard free tier, not Speed Insights Plus.
3. Use **Observability** and **Logs** to inspect requests, errors, and deployments. Stay with the included features; Observability Plus is unnecessary for this site.
4. Check **Usage** periodically to see the remaining free allowances.

On Hobby, Web Analytics includes **50,000 events per month** with a one-month reporting window. Custom click events require Pro, so this portfolio collects page views only. Standard Speed Insights includes **10,000 events over a rolling 30 days**, shared across the team. Free collection pauses at its limits; it does not silently purchase extra events. These integrations do not change your Vercel plan. Web Analytics on Pro has different, usage-based billing.

Vercel already provides its CDN, automatic HTTPS certificates, and platform DDoS protection; these do not require application packages. `vercel.json` also adds MIME sniffing protection, a referrer policy, and disables unused camera, microphone, and location permissions. GitHub Pages does not apply Vercel response headers or provide its analytics endpoints.

Setup and current limits: [Web Analytics setup](https://vercel.com/docs/analytics/quickstart), [Web Analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing), [Speed Insights pricing](https://vercel.com/docs/speed-insights/limits-and-pricing), [Observability](https://vercel.com/docs/observability), [Vercel Firewall](https://vercel.com/docs/vercel-firewall).

## GitHub Pages deployment

1. In the GitHub repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Push the changes to `main`, or run **Deploy GitHub Pages** manually from the Actions tab.
3. The workflow installs dependencies, checks content and types, exports the site, tests the actual static output with Chromium, and deploys `out/`.

The default repository URL is `https://saaim12.github.io/Personal-Portfolio-WEB/`. GitHub supplies the URL and path automatically, including when a custom Pages domain is configured. Use a separate domain from Vercel if both sites stay live.

```sh
npm run build:pages
npm run test:pages
```

For a domain-root static export, set `NEXT_PUBLIC_BASE_PATH` to an empty string and `NEXT_PUBLIC_SITE_URL` to that origin before running `build:pages`. Static hosting serves local images directly and uses small redirect pages for legacy URLs. `out/.nojekyll` preserves Next.js assets, and `out/404.html` supplies the missing-page screen. The Pages settings change must be made in GitHub; adding a workflow does not enable Pages by itself.

`out/`, `.next/`, dependency folders, caches, test reports, and local environment files are ignored by Git. Upload or publish `out/` for static hosting; commit the source and lockfile for automated builds.

## Content evidence

Employment and delivery claims were checked against supplied resumes and the signed Fitter Health recommendation on September 30, 2026. Source PDFs remain unchanged. Preserve the documented dates, Expertflow usage and response-time figures, and Fitter Health delivery details. Unverified RAG, recommender, pipeline, and compression benchmarks were removed; do not reintroduce them without supporting evidence. This was not an independent audit of external project repositories.
