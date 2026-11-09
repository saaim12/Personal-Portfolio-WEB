"use client";
import { SiteAnchor } from "@/components/SiteAnchor";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { person } from "@/resources/content";
import { StudioClock } from "./StudioClock";
import { RollText } from "./effects/RollText";
const links = [
  { href: "/", label: "Home" },
  { href: "/professional-experience", label: "Professional Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/expertise", label: "Expertise" },
  { href: "/journal", label: "Journal / My Blog" },
];
export function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    header.current?.querySelector<HTMLAnchorElement>(".navLinks a")?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const leave = (event: FocusEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", leave);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); document.removeEventListener("focusin", leave); };
  }, [open]);
  return <header className="studioHeader" ref={header}>
    <div className="navBar">
      <Link prefetch={false} href="/" className="brandMark" aria-label={`${name}, home`}><span>{name.replace(" ", "")}_LHR</span> <StudioClock className="brandClock" /></Link>
      <nav id="main-navigation" className={`navLinks ${open ? "isOpen" : ""}`} aria-label="Main navigation">
        {links.map(item => <Link prefetch={false} href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={(item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)) ? "page" : undefined}><RollText>{item.label}</RollText></Link>)}
        <Link prefetch={false} href="/contact" className="mobileContact" onClick={() => setOpen(false)}>Contact</Link>
        <SiteAnchor className="mobileContact" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume</SiteAnchor>
        <SiteAnchor className="mobileContact" href={`mailto:${person.email}`}>Email</SiteAnchor>
      </nav>
      <div className="navActions">
        <SiteAnchor className="navUtility" href={`mailto:${person.email}`}>Email</SiteAnchor>
        <SiteAnchor className="navUtility" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume</SiteAnchor>
        <Link prefetch={false} href="/contact" className="navContact"><RollText>Let’s talk</RollText></Link>
      </div>
      <button ref={toggle} className="menuToggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    </div>
  </header>;
}
