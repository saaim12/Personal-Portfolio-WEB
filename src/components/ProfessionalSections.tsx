"use client";
import { SiteAnchor } from "@/components/SiteAnchor";

import { useEffect, useState } from "react";
import { Mark } from "./Studio";

const sections = [
  { id: "bio", label: "Story / Bio", icon: "flower" },
  { id: "career", label: "My Work", icon: "pinwheel" },
];

export function ProfessionalSections() {
  const [active, setActive] = useState("bio");
  useEffect(() => {
    const update = () => {
      const current = sections.filter(section => (document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.4).at(-1);
      setActive(current?.id ?? "bio");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <nav className="professionalSections" aria-label="Professional Experience and Story sections">{sections.map(section => <SiteAnchor key={section.id} href={"#" + section.id} aria-current={active === section.id ? "location" : undefined}><Mark kind={section.icon} />{section.label}</SiteAnchor>)}</nav>;
}
