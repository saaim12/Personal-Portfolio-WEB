import { SiteAnchor } from "@/components/SiteAnchor";
import type { ReactNode } from "react";
import { RollText } from "@/components/effects/RollText";
export function Action({ href, children, external = false, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  return <SiteAnchor href={href} className={`studioButton ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{typeof children === "string" ? <RollText>{children}</RollText> : <span>{children}</span>}<span className="buttonIcon" aria-hidden="true">↗</span></SiteAnchor>;
}
/** Mono section marker, e.g. (SELECTED WORK). */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`monoLabel ${className}`}>({children})</p>;
}
export function PageHeading({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  return <div className="pageHeading">{note && <p className="monoLabel">({note})</p>}<h1 className="displayType">{title}</h1>{children && <div className="pageHeadingIntro">{children}</div>}</div>;
}
