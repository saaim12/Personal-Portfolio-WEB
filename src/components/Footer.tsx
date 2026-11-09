import Link from "next/link";
import { SiteAnchor } from "@/components/SiteAnchor";
import { Action } from "@/components/Studio";
import { person, social } from "@/resources/content";
import { sitePages } from "@/resources/site-navigation";

const external = { target: "_blank", rel: "noopener noreferrer" };
const profiles = social.filter(item => !item.link.startsWith("mailto:"));

/** Compact footer: every destination appears exactly once. */
export function Footer() {
  return <footer className="studioFooter"><div className="footerInner">
    <div className="footerLead">
      <p className="footerName"><Link href="/">{person.name}</Link></p>
      <p className="footerTagline">Software engineer in Lahore, Pakistan. Open to remote roles and contracts.</p>
      <Action href="/contact" className="footerCta">Let’s connect</Action>
    </div>
    <nav className="footerNav" aria-label="Footer">
      <div><p className="footerHeading">Pages</p><ul>{sitePages.filter(page => page.path !== "/" && page.path !== "/sitemap").map(page => <li key={page.path}><Link href={page.path}>{page.title}</Link></li>)}</ul></div>
      <div><p className="footerHeading">Profiles</p><ul>{profiles.map(item => <li key={item.name}><SiteAnchor href={item.link} {...external}>{item.name} <span aria-hidden="true">↗</span></SiteAnchor></li>)}</ul></div>
      <div><p className="footerHeading">Documents</p><ul><li><SiteAnchor href="/SaaimCV.pdf" {...external}>Resume <span aria-hidden="true">↗</span></SiteAnchor></li><li><SiteAnchor href="/Fitter-Recommendation-Letter.pdf" {...external}>Recommendation <span aria-hidden="true">↗</span></SiteAnchor></li></ul></div>
    </nav>
    <div className="footerBottom"><span>© {new Date().getFullYear()} {person.name}</span><SiteAnchor href="#main" aria-label="Back to top">Back to top ↑</SiteAnchor></div>
  </div></footer>;
}
