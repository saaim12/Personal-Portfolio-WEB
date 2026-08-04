import { resolveTech, techColors } from "@/resources/tech";
import { createElement } from "react";

/**
 * One technology, one treatment. Every tech mention on the site renders
 * through this, so sizing, spacing and colour are identical on the home page,
 * the project cards, the case studies, the skills section and the footer.
 *
 * Two variants and no more:
 *   "icon"  — icon only, for dense surfaces (project cards, service cards)
 *   "chip"  — icon plus label, for detail pages and the skills section
 *
 * Accessibility: in "icon" mode the name exists only in the logo, so each one
 * carries its own `aria-label` and a `title` for pointer users. In "chip" mode
 * the label is already text, so the icon is `aria-hidden` to stop screen
 * readers announcing the same word twice.
 */

type Variant = "icon" | "chip";

function TechItem({ tech, variant }: { tech: string; variant: Variant }) {
  const { label, icon, color } = resolveTech(tech);
  const { dark, light } = techColors(color);

  // Two resolved colours, one per ground; the stylesheet picks. A single value
  // would be invisible in whichever theme it loses contrast against.
  const style = { "--tech-dark": dark, "--tech-light": light } as React.CSSProperties;

  if (variant === "icon") {
    return (
      <span className="techIcon" style={style} role="img" aria-label={label} title={label}>
        {createElement(icon, { "aria-hidden": true })}
      </span>
    );
  }

  return (
    <span className="techChip" style={style}>
      <span className="techChipIcon">{createElement(icon, { "aria-hidden": true })}</span>
      {label}
    </span>
  );
}

export function TechList({
  items,
  variant = "chip",
  label,
}: {
  items: readonly string[];
  variant?: Variant;
  /** Names the row for screen readers, e.g. "Technologies used". */
  label?: string;
}) {
  if (!items.length) return null;

  return (
    <ul className={variant === "icon" ? "techList techList--icons" : "techList"} aria-label={label}>
      {items.map((tech) => (
        <li key={tech}>
          <TechItem tech={tech} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
