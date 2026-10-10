import { person, social } from "@/resources/content";
import { Ruler } from "./Studio";
export function Footer() {
  return <footer className="studioFooter"><div><a href="/" className="footerName">{person.name}</a><span>© {new Date().getFullYear()} · Built with curiosity.</span><div className="footerLinks">{social.filter(s => ["GitHub", "LinkedIn", "Medium"].includes(s.name)).map(s => <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">{s.name} ↗</a>)}<a href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a></div><a href="#main" aria-label="Back to top">↑ Top</a></div><Ruler bottom /></footer>;
}
