import { SiteAnchor } from "@/components/SiteAnchor";
import { person, social } from "@/resources/content";
import { Ruler } from "./Studio";
export function Footer() {
  return <footer className="studioFooter"><div><SiteAnchor href="/" className="footerName">{person.name}</SiteAnchor><span>© {new Date().getFullYear()} · Built with curiosity.</span><div className="footerLinks">{social.filter(s => ["GitHub", "LinkedIn", "Medium"].includes(s.name)).map(s => <SiteAnchor className="outlineButton" key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">{s.name} ↗</SiteAnchor>)}<SiteAnchor className="outlineButton" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</SiteAnchor></div><SiteAnchor className="outlineButton" href="#main" aria-label="Back to top">↑ Back to top</SiteAnchor></div><Ruler bottom /></footer>;
}
