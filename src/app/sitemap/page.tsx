import Link from "next/link";
import { SiteAnchor } from "@/components/SiteAnchor";
import { PageHeading } from "@/components/Studio";
import { PageSchema } from "@/components/PageSchema";
import { pageMeta } from "@/resources/seo";
import { articles } from "@/resources/articles";
import { bookingLink, social } from "@/resources/content";
import { getSiteCatalog, type CatalogSection } from "@/utils/siteCatalog";
import "../expertise/editorial.css";

const description = "Every page, document, profile and article on Saaim Abdullah's portfolio: experience, case studies, engineering expertise, notes and contact.";

export function generateMetadata() {
  return pageMeta({ title: "Sitemap", description, path: "/sitemap" });
}

const sections = [
  { title: "Home: hero", path: "/#hero-name" },
  { title: "Home: selected work", path: "/#work" },
  { title: "Home: about and evidence", path: "/#about-intro" },
  { title: "Experience: my story", path: "/professional-experience#bio" },
  { title: "Experience: work history", path: "/professional-experience#career" },
  { title: "Contact: send a message", path: "/contact" },
];
const documents = [
  { title: "Resume (PDF)", href: "/SaaimCV.pdf" },
  { title: "Fitter Health recommendation letter (PDF)", href: "/Fitter-Recommendation-Letter.pdf" },
];
const machine = [
  { title: "XML sitemap", href: "/sitemap.xml" },
  { title: "AI reading index (llms.txt)", href: "/llms.txt" },
  { title: "Robots rules", href: "/robots.txt" },
];

export default function SitemapPage() {
  const catalog = getSiteCatalog();
  const groups: { title: string; section: CatalogSection }[] = [
    { title: "Main pages", section: "Portfolio" },
    { title: "Project case studies", section: "Project evidence" },
    { title: "Engineering expertise", section: "Engineering expertise" },
    { title: "Engineering notes", section: "Engineering notes" },
  ];
  const pages = groups.map(group => ({ ...group, pages: catalog.filter(page => page.section === group.section) })).filter(group => group.pages.length);
  const external = { target: "_blank", rel: "noopener noreferrer" };
  return <div className="studioPage sitemapPage">
    <PageSchema title="Sitemap" description={description} path="/sitemap" items={catalog.map(({ path, title }) => ({ path, title }))} />
    <div className="studioContainer engineeringHub">
      <div className="engineeringIntro"><PageHeading title="Sitemap" note="every page / one place">
        <p>{catalog.length} pages, plus page sections, documents, profiles and articles. Machines can use the <SiteAnchor href="/sitemap.xml">XML sitemap</SiteAnchor> or the <SiteAnchor href="/llms.txt">AI reading index</SiteAnchor>.</p>
      </PageHeading></div>
      {pages.map(group => <section className="sitemapGroup siteMapGroup" key={group.title} aria-labelledby={`map-${group.section.replace(/\W+/g, "-")}`}>
        <h2 id={`map-${group.section.replace(/\W+/g, "-")}`}>{group.title} <span className="sitemapCount">({group.pages.length})</span></h2>
        <ul className="sitemapList">{group.pages.map(page => <li key={page.path}><Link href={page.path}>{page.title}</Link><p>{page.description}</p></li>)}</ul>
      </section>)}
      <div className="sitemapColumns">
        <section className="sitemapGroup" aria-labelledby="map-sections"><h2 id="map-sections">Page sections</h2><ul className="sitemapLinks">{sections.map(item => <li key={item.path}><Link href={item.path}>{item.title}</Link></li>)}</ul></section>
        <section className="sitemapGroup" aria-labelledby="map-documents"><h2 id="map-documents">Documents</h2><ul className="sitemapLinks">{documents.map(item => <li key={item.href}><SiteAnchor href={item.href} {...external}>{item.title}</SiteAnchor></li>)}</ul></section>
        <section className="sitemapGroup" aria-labelledby="map-profiles"><h2 id="map-profiles">Profiles and contact</h2><ul className="sitemapLinks">{social.filter(item => !item.link.startsWith("mailto:")).map(item => <li key={item.name}><SiteAnchor href={item.link} {...external}>{item.name}</SiteAnchor></li>)}<li><SiteAnchor href={bookingLink} {...external}>Book a call</SiteAnchor></li></ul></section>
        <section className="sitemapGroup" aria-labelledby="map-machine"><h2 id="map-machine">For search and AI</h2><ul className="sitemapLinks">{machine.map(item => <li key={item.href}><SiteAnchor href={item.href}>{item.title}</SiteAnchor></li>)}</ul></section>
      </div>
      <section className="sitemapGroup" aria-labelledby="map-articles"><h2 id="map-articles">Articles on Medium <span className="sitemapCount">({articles.length})</span></h2>
        <ul className="sitemapList">{articles.map(article => <li key={article.slug}><SiteAnchor href={`https://medium.com/@saymmalik08/${article.slug}`} {...external}>{article.title}</SiteAnchor><p>{article.description}</p></li>)}</ul>
      </section>
    </div>
  </div>;
}
