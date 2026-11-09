import { SiteAnchor } from "@/components/SiteAnchor";
import { person, social } from "@/resources/content";
export function Footer() {
  const profiles = social.filter(s => ["GitHub", "LinkedIn", "Medium", "WhatsApp"].includes(s.name));
  return <footer className="studioFooter"><div className="footerInner">
    <div className="footerColumns">
      <div className="footerLinks">{profiles.map(s => <SiteAnchor key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">{s.name} <span aria-hidden="true">↗</span></SiteAnchor>)}<SiteAnchor href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></SiteAnchor></div>
      <div className="footerLinks"><SiteAnchor href="/expertise">Expertise</SiteAnchor><SiteAnchor href="/engineering-notes">Technical notes</SiteAnchor><SiteAnchor href="/sitemap">Sitemap</SiteAnchor><SiteAnchor href="https://www.google.com/preferences/source?q=saaim.site" target="_blank" rel="noopener noreferrer" title="Choose saaim.site as a preferred source in Google Search">Add to Preferred Sources <span aria-hidden="true">↗</span></SiteAnchor></div>
    </div>
    <div className="footerMeta"><p><span>Design &amp; engineering_</span><SiteAnchor href="/" className="footerName">{person.name}</SiteAnchor></p><p><span>Based in_</span>Lahore, Pakistan</p></div>
    <div className="footerBottom"><span>©{new Date().getFullYear()}_All rights reserved</span><SiteAnchor href="#main" aria-label="Back to top">[Back to top]</SiteAnchor></div>
  </div></footer>;
}
