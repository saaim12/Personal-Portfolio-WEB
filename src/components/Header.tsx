"use client";
import { SiteAnchor } from "@/components/SiteAnchor";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { person, social } from "@/resources/content";
import { StudioClock } from "./StudioClock";
import { RollText } from "./effects/RollText";
import { Scramble } from "./effects/Scramble";
import { PixelBlocks } from "./effects/PixelBlocks";
const links = [
  { href: "/", label: "Home" },
  { href: "/professional-experience", label: "Professional Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/expertise", label: "Expertise" },
  { href: "/journal", label: "Journal / My Blog" },
  { href: "/contact", label: "Contact" },
];
const profiles = social.filter(item => ["GitHub", "LinkedIn", "Medium"].includes(item.name));
export function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", open);
    if (!open) return;
    setRound(r => r + 1);
    header.current?.querySelector<HTMLAnchorElement>(".navLinks a")?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.querySelector(".navLinks")?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false); };
    const leave = (event: FocusEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", leave);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); document.removeEventListener("focusin", leave); };
  }, [open]);
  return <header className="studioHeader" ref={header}>
    <div className="navBar">
      <Link prefetch={false} href="/" className="brandMark" aria-label={`${name}, home`}><span>{name.replace(" ", "")}_LHR</span> <StudioClock className="brandClock" /></Link>
      <div className="navActions">
        <Link prefetch={false} className="navUtility" href="/contact"><RollText>Email</RollText></Link>
        <SiteAnchor className="navUtility" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer"><RollText>Resume</RollText></SiteAnchor>
        <Link prefetch={false} href="/contact" className="navContact"><RollText>Let’s talk</RollText></Link>
      </div>
      <button ref={toggle} className="menuToggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    </div>
    <div className="menuBackdrop" aria-hidden="true" />
    <nav id="main-navigation" className={`navLinks ${open ? "isOpen" : ""}`} aria-label="Main navigation">
      {open && <PixelBlocks key={round} columns={6} rows={10} />}
      <p className="menuName">{name}</p>
      <div className="menuList">
        {links.map((item, index) => <Link prefetch={false} href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={(item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)) ? "page" : undefined}>
          <span className="menuIndex" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Scramble text={item.label} play={open && round} hover />
        </Link>)}
      </div>
      <div className="menuFooter">
        <Link prefetch={false} className="mobileContact menuEmail" href="/contact" onClick={() => setOpen(false)}>Email</Link>
        <SiteAnchor className="mobileContact" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">Resume</SiteAnchor>
        {profiles.map(item => <SiteAnchor key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</SiteAnchor>)}
        <p className="menuMail">{person.email}</p>
      </div>
    </nav>
  </header>;
}
