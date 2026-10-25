# Ahrefs audit follow-up — October 25, 2026

## Repository changes

- Removed the private Upwork profile from the homepage and Person `sameAs` data.
- Replaced the WhatsApp `wa.me` shortcut with the destination shown in the audit. WhatsApp may still redirect based on device or region; this removes the observed shortcut hop.
- Embedded the complete Person in ProfilePage `mainEntity`, including its required type and name. The screenshot did not expose the specific validation error, so Google's Rich Results Test must confirm the deployed result.
- Added Article markup for all ten engineering project write-ups, alongside their existing SoftwareSourceCode or CreativeWork entities.
- Added links from project detail pages to the Algorithms and ESP32 write-ups. The project selector now honors explicitly requested learning projects.
- Re-encoded all eleven large PNG diagrams with a 256-color palette at their original 1672 × 941 resolution and original URLs. Total reduction: 9,485,418 bytes; each is below 1 MB. This is palette quantization, not pixel-identical compression.
- Extended the SEO audit to check article/profile fields, removed URLs, diagram sizes, and links from distinct pages to the two underlinked projects.

## Warnings requiring interpretation or hosting work

- **Medium 403:** the profile and all four article destinations were readable through the web tool on October 25. These are valid links; the Ahrefs response may reflect bot filtering. Keep them and recheck the crawl rather than replacing working articles.
- **Organization missing:** this site represents Saaim Abdullah as a person. Person and WebSite markup are appropriate. Do not invent an organization to satisfy an automated classifier.
- **Product missing:** Fitter Health and the RAG engine pages describe engineering work, not products offered for sale here. They now have Article plus project markup. Do not invent prices, offers, or reviews.
- **Other Article suggestions:** the screenshot includes `/engineering-notes` and `/expertise/...`, which are absent from this checkout. Its professional-experience page is a profile, and an index is a collection, so Article markup is not automatically appropriate for either. Confirm that this checkout is the intended deployment before addressing URLs absent from it.
- **HTTP/HTTPS and www redirects:** preserve redirects to `https://saaim.site`; the two noncanonical variants are expected to redirect. The reported `http://www.saaim.site` → `https://www.saaim.site` → `https://saaim.site` chain begins at the hosting edge. In the hosting domain settings, configure `www.saaim.site` to redirect directly to `https://saaim.site`, then verify all four scheme/host variants. Existing Next.js host redirects already point to the canonical domain, but cannot override an earlier platform HTTPS redirect.

## Release verification

Deploy these changes, run Google's Rich Results Test on `/professional-experience` and a project page, then rerun Ahrefs. Audit counts will not change until the updated deployment is crawled. No deployment or hosting configuration was changed by this local fix.

Sources: [Google ProfilePage requirements](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Article markup](https://developers.google.com/search/docs/appearance/structured-data/article), [structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
