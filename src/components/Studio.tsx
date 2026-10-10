import type { ReactNode } from "react";
export function Mark({ kind = "flower", className = "" }: { kind?: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    rainbow: <g fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M2 23a14 14 0 0 1 28 0M6 23a10 10 0 0 1 20 0M10 23a6 6 0 0 1 12 0M14 23a2 2 0 0 1 4 0" /></g>,
    flower: <g fill="currentColor">{Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx="16" cy="7" rx="3.8" ry="6.5" transform={`rotate(${i * 60} 16 16)`} />)}<circle cx="16" cy="16" r="4" /></g>,
    spool: <path d="M3 2h26c0 7-6 8-9 10 13 2 13 9 0 11 5 2 9 4 9 7H3c0-3 4-5 9-7-13-2-13-9 0-11C8 10 3 9 3 2Z" fill="currentColor" />,
    stack: <g fill="currentColor"><ellipse cx="16" cy="9" rx="13" ry="7" /><ellipse cx="16" cy="23" rx="13" ry="7" /></g>,
    tree: <path d="M14 31V13L3 5l3-4 8 6V0h4v7l8-6 3 4-11 8v18Z" fill="currentColor" />,
    steps: <path d="M2 30V20h10V10h10V0h10v30Z" fill="currentColor" />,
    pinwheel: <path d="M16 16V1H1c0 9 5 15 15 15Zm0 0h15V1c-9 0-15 5-15 15Zm0 0v15h15c0-9-5-15-15-15Zm0 0H1v15c9 0 15-5 15-15Z" fill="currentColor" />,
    target: <g fill="none" stroke="currentColor" strokeWidth="2.8"><circle cx="16" cy="16" r="13" /><circle cx="16" cy="16" r="8" /><circle cx="16" cy="16" r="3" /></g>,
  };
  return <svg className={`mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">{paths[kind] || paths.flower}</svg>;
}
export function Handles() { return <span className="handles" aria-hidden="true"><i /><i /><i /><i /></span>; }
export function Ruler({ bottom = false }: { bottom?: boolean }) { return <div className={`ruler ${bottom ? "rulerBottom" : ""}`} aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span key={i}>{i * 100}</span>)}</div>; }
export function Action({ href, children, external = false, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  return <a href={href} className={`studioButton ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}><span className="buttonIcon" aria-hidden="true">↠</span><span>{children}</span></a>;
}
export function PageHeading({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  return <div className="pageHeading">{note && <p className="handwritten">{note}</p>}<h1 className="displayType">{title}</h1>{children && <div className="pageHeadingIntro">{children}</div>}</div>;
}
export function Mascot() { return <svg className="mascot" viewBox="0 0 360 360" aria-hidden="true"><path d="M180 62C70-30-28 24 65 180-40 310 54 392 180 300c128 93 220 5 116-120C393 26 287-35 180 62Z" fill="var(--green)" stroke="var(--ink)" strokeWidth="2"/><g className="mascotEyes" fill="var(--ink)"><rect x="145" y="112" width="26" height="58" rx="13"/><rect x="189" y="112" width="26" height="58" rx="13"/></g></svg>; }
