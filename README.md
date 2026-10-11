# Saaim Abdullah's portfolio

Next.js 16, React 19, TypeScript, and Once UI. Deployed on Vercel at [saaim.site](https://saaim.site).

## Development

Use Node.js 22.13 or newer for the application and test commands.

```sh
npm ci
npm run dev
```

## Content and source

- `src/app`: active pages, metadata routes, and the Open Graph image endpoint.
- `src/app/work/projects`: 13 Markdown project documents and their frontmatter.
- `src/components`: shared navigation, project cards, contact form, and MDX rendering.
- `src/resources/content.ts`: identity and page metadata.
- `src/resources/experience.ts`: employment, education, and skills.
- `src/resources/articles.ts`: external article links.
- `src/resources/project-art.ts`: thumbnail and category mapping.
- `src/resources/custom.css`: studio design and responsive styles.
- `src/resources/once-ui.config.ts`: domain, active routes, and theme settings.
- `public`: local fonts, photos, final covers and diagrams, and document downloads.

About, Experience, Services, Journal, Playground, and Contact are active pages.
Project Markdown is read with gray-matter and rendered using next-mdx-remote/rsc.
Once UI supplies shared layout, typography, heading permalink copying, and toast feedback; it requires Sass.

## Validation

```sh
npm run typecheck
npm test
npm run build
npm start
# In another terminal:
npm run test:browser -- http://localhost:3000
npm run test:seo -- http://localhost:3000
```

Browser checks cover every page at 1440, 1024, 768, 390, and 320 pixels, plus navigation, keyboard dismissal, project filters, contact validation, downloads, and reduced motion. Reports go in the ignored .audit folder. The repository has no ESLint configuration.

The Open Graph endpoint downloads its Geist font from Google Fonts at request time, so its image check needs network access. Vercel analytics also requires network access.

## Content evidence

Employment and delivery claims were checked against supplied resumes and the signed Fitter Health recommendation on September 30, 2026. Source PDFs remain unchanged. Preserve the documented dates, Expertflow usage and response-time figures, and Fitter Health delivery details. Unverified RAG, recommender, pipeline, and compression benchmarks were removed; do not reintroduce them without supporting evidence. This was not an independent audit of external project repositories.
