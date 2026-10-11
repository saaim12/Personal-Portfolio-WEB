"use client";
import { useId, useState, type ReactNode } from "react";
import "./learnings.css";
type Item = { slug: string; category: string; card: ReactNode };
const categories = ["All projects", "Product & web", "AI & data", "Learnings"];
export function ProjectGallery({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState("All projects");
  const id = useId();
  const visible = items.filter(item => selected === "All projects" || item.category === selected);
  const projects = visible.filter(item => item.category !== "Learnings");
  const learnings = visible.filter(item => item.category === "Learnings");
  return <div className="projectGallery">
    <div className="galleryToolbar"><div className="galleryFilters" role="group" aria-label="Filter projects by category">{categories.map(category => <button type="button" key={category} aria-pressed={selected === category} aria-controls={id} onClick={() => setSelected(category)}>{category}<span>{category === "All projects" ? items.length : items.filter(i => i.category === category).length}</span></button>)}</div><p role="status">{visible.length} projects to explore</p></div>
    <div id={id}>
      {projects.length > 0 && <div className="galleryGrid">{projects.map(item => <div key={item.slug}>{item.card}</div>)}</div>}
      {learnings.length > 0 && <section className="projectLearnings" aria-labelledby={`${id}-learnings`}><h2 id={`${id}-learnings`} className="displayType">Learnings</h2><p>Experiments and learning repositories where I explore algorithms, machine learning, data foundations, and embedded systems.</p><div className="learningList">{learnings.map(item => <div key={item.slug}>{item.card}</div>)}</div></section>}
    </div>
  </div>;
}
