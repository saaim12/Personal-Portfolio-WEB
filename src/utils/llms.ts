import type { CatalogPage, CatalogSection } from "@/utils/siteCatalog";

type DirectoryIdentity = { name: string; description: string; canonicalBase: string; profiles: { name: string; link: string }[] };
const text = (value: string) => value.replace(/\s+/g, " ").trim().replace(/([\[\]])/g, "\\$1");

/** A compact reading directory, generated from the same public content as the site. */
export function renderLlmsIndex(pages: readonly CatalogPage[], identity: DirectoryIdentity): string {
  const sections: CatalogSection[] = ["Portfolio", "Project evidence", "Engineering expertise", "Engineering notes"];
  const lines = [
    `# ${text(identity.name)}`,
    "",
    `> ${text(identity.description)}`,
    "",
    `Canonical site: ${identity.canonicalBase}`,
    "",
    "Personal engineering portfolio. Case studies identify client delivery, prototypes, and learning work. Engineering guides distinguish implementation evidence, design recommendations, and documented limitations. Follow the linked pages for complete context and supporting sources.",
  ];
  for (const section of sections) {
    const entries = pages.filter(page => page.section === section);
    if (!entries.length) continue;
    lines.push("", `## ${section}`, "", ...entries.map(page => `- [${text(page.title)}](${page.url}): ${text(page.description)}`));
  }
  lines.push("", "## Optional", "",
    ...identity.profiles.map(profile => `- [${text(profile.name)} profile](${profile.link}): Public identity and additional work.`),
    `- [XML sitemap](${identity.canonicalBase}/sitemap.xml): Canonical pages and project images for search discovery.`,
    `- [Robots policy](${identity.canonicalBase}/robots.txt): Crawl rules and sitemap location.`,
    "",
  );
  return lines.join("\n");
}
