"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Projects.module.css";

type Item = { slug: string; category: string; card: ReactNode };
const categories = ["All projects", "Product & web", "AI & data", "Experiments and Learning"];

export function ProjectGallery({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState("All projects");
  const id = useId();
  const visible = items.filter(item => selected === "All projects" || item.category === selected);
  return <div className={styles.wrapper}>
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {categories.map(category => <button type="button" key={category} aria-pressed={selected === category} aria-controls={id} onClick={() => setSelected(category)}>{category}<span>{category === "All projects" ? items.length : items.filter(item => item.category === category).length}</span></button>)}
      </div>
      <p className={styles.count} role="status">{visible.length} projects to explore</p>
    </div>
    <div className={styles.gallery} id={id}>
      {[0, 1, 2].map(column => <div className={styles.column} key={column}>
        {column === 0 && selected === "All projects" && <div className={styles.highlight}><strong>{items.length}<span> projects</span></strong><h3>Built with curiosity. Explained with care.</h3><p>Client work, personal prototypes and learning experiments. Explore what went into each one.</p><a href="https://github.com/saaim12" target="_blank" rel="noopener noreferrer">Visit my GitHub ↗</a></div>}
        {visible.map((item, index) => index % 3 === column ? <div key={item.slug}>{item.card}</div> : null)}
      </div>)}
    </div>
  </div>;
}
