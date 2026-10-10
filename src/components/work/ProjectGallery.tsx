"use client";
import { useId, useState, type ReactNode } from "react";
type Item = { slug: string; category: string; card: ReactNode };
const categories = ["All projects", "Product & web", "AI & data", "Experiments"];
export function ProjectGallery({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState("All projects");
  const id = useId();
  const visible = items.filter(item => selected === "All projects" || item.category === selected);
  return <div className="projectGallery">
    <div className="galleryToolbar"><div className="galleryFilters" role="group" aria-label="Filter projects by category">{categories.map(category => <button type="button" key={category} aria-pressed={selected === category} aria-controls={id} onClick={() => setSelected(category)}>{category}<span>{category === "All projects" ? items.length : items.filter(i => i.category === category).length}</span></button>)}</div><p role="status">{visible.length} projects to explore</p></div>
    <div id={id} className="galleryGrid">{visible.map(item => <div key={item.slug}>{item.card}</div>)}</div>
  </div>;
}
