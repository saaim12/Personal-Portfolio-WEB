import { resolveTech } from "@/resources/tech";

export function TechList({ items, label }: { items: readonly string[]; label?: string }) {
  if (!items.length) return null;
  return <ul className="techList" aria-label={label}>
    {items.map(tech => {
      const { label, icon: Icon } = resolveTech(tech);
      return <li key={tech}><span className="techChip"><span className="techChipIcon"><Icon aria-hidden="true" /></span>{label}</span></li>;
    })}
  </ul>;
}
