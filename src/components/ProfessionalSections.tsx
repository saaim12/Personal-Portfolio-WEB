"use client";
import { SiteAnchor } from "@/components/SiteAnchor";

import { useEffect, useState } from "react";

const sections = [
  { id: "career", label: "My Work Experience" },
  { id: "bio", label: "My Story / My Bio" },
];

export function ProfessionalSections() {
  const [active, setActive] = useState("career");
  useEffect(() => {
    const update = () => {
      const current = sections.filter(section => (document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.4).at(-1);
      setActive(current?.id ?? "career");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <nav className="professionalSections" aria-label="Professional Experience and Story sections">{sections.map(section => <SiteAnchor key={section.id} href={"#" + section.id} aria-current={active === section.id ? "location" : undefined}>{section.label}</SiteAnchor>)}</nav>;
}
