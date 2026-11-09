import { resolveTech } from "@/resources/tech";

export function TechList({ items, label }: { items: readonly string[]; label?: string }) {
  if (!items.length) return null;
  return <ul className="techList" aria-label={label}>{items.map(tech => <li key={tech}><span className="techChip">{resolveTech(tech).label}</span></li>)}</ul>;
}
