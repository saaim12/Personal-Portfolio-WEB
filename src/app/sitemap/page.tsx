import Link from "next/link";
import { SiteAnchor } from "@/components/SiteAnchor";
import { PageHeading } from "@/components/Studio";
import { PageSchema } from "@/components/PageSchema";
import { pageMeta } from "@/resources/seo";
import { getSiteCatalog, type CatalogSection } from "@/utils/siteCatalog";
import "../expertise/editorial.css";

const description = "Find every page on Saaim Abdullah's portfolio: engineering expertise, project case studies, technical notes, experience, services, and contact details.";

export function generateMetadata() {
  return pageMeta({ title: "Sitemap", description, path: "/sitemap" });
}

export default function SitemapPage() {
  const catalog = getSiteCatalog();
  const sections: { title: string; section: CatalogSection }[] = [
    { title: "Explore the site", section: "Portfolio" },
    { title: "Engineering expertise", section: "Engineering expertise" },
    { title: "Project case studies", section: "Project evidence" },
    { title: "Engineering notes", section: "Engineering notes" },
  ];
  const groups = sections.map(group => ({ ...group, pages: catalog.filter(page => page.section === group.section) })).filter(group => group.pages.length);

  return <div className="studioPage">
    <PageSchema title="Sitemap" description={description} path="/sitemap" items={catalog.map(({ path, title }) => ({ path, title }))} />
    <div className="studioContainer engineeringHub">
      <div className="engineeringIntro"><PageHeading title="Sitemap" note="every page / one place">
        <p>Explore my work, engineering approaches, and technical notes. Looking for the machine-readable version? Open the <SiteAnchor href="/sitemap.xml">XML sitemap</SiteAnchor> or the <SiteAnchor href="/llms.txt">AI reading index</SiteAnchor>.</p>
      </PageHeading></div>
      <div className="engineeringCardGrid">{groups.map(group => <section className="engineeringCard siteMapGroup" key={group.title}>
        <h2>{group.title}</h2>
        <ul>{group.pages.map(page => <li key={page.path}><Link href={page.path}>{page.title} <span aria-hidden="true">↗</span></Link></li>)}</ul>
      </section>)}</div>
    </div>
  </div>;
}
