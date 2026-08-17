import { createElement, type CSSProperties } from "react";
import { resolveTech, techColors } from "@/resources/tech";
import { skills as defaultSkills, type Skill } from "@/resources/skills";
import styles from "./SkillsMarquee.module.scss";

/**
 * Skills and tools, scrolling under the hero.
 *
 * A server component: no state, no effects, no `window`, no measuring. The
 * seamless loop is a CSS identity rather than a computation, the track holds
 * the list twice and translates by exactly -50%, so the second copy lands
 * where the first began and nothing has to be measured at runtime.
 *
 * Accessibility. The motion is decoration and the items are not links, so
 * there is nothing here to tab into and nothing to get trapped in. The first
 * copy of the list is the real one and carries the accessible name; the
 * second is `aria-hidden`, so each skill is announced once.
 */

type Direction = "left" | "right";

type SkillsMarqueeProps = {
  /** Seconds for one full cycle. Larger is slower. */
  speed?: number;
  /** Travel direction of the first row. */
  direction?: Direction;
  /** Horizontal space between items, in pixels. */
  gap?: number;
  /**
   * Freeze the scroll while the pointer is inside. Off: the row is supposed to
   * keep moving under the cursor, and hover only reveals the brand colour.
   * Keyboard focus pauses either way.
   */
  pauseOnHover?: boolean;
  /**
   * Two rows split the list in half and travel in opposite directions. One
   * row is the default: it keeps the hero owning the viewport.
   */
  rows?: 1 | 2;
  /** Overrides the list in `resources/skills.ts`. */
  items?: Skill[];
  /** Names the list for screen readers. */
  label?: string;
};

function Item({ skill }: { skill: Skill }) {
  const { label: fallbackLabel, icon, color } = resolveTech(skill.tech);
  const { dark, light } = techColors(color);

  // Two resolved colours, one per ground, exactly as the tech chips do it:
  // a brand hex that would fail contrast arrives as `currentColor` instead of
  // disappearing into the page on hover.
  const style = { "--tech-dark": dark, "--tech-light": light } as CSSProperties;

  return (
    <li className={styles.item} style={style}>
      <span className={styles.icon}>{createElement(icon, { "aria-hidden": true })}</span>
      {skill.label || fallbackLabel}
    </li>
  );
}

function Row({
  items,
  reverse,
  label,
}: {
  items: Skill[];
  reverse: boolean;
  /** Only the first row of the pair is named; both are read once between them. */
  label?: string;
}) {
  const copy = (duplicate: boolean) => (
    <ul
      className={duplicate ? `${styles.group} ${styles.duplicate}` : styles.group}
      role="list"
      {...(duplicate ? { "aria-hidden": true as const } : { "aria-label": label })}
    >
      {items.map((skill) => (
        <Item key={`${skill.tech}-${duplicate ? "dup" : "real"}`} skill={skill} />
      ))}
    </ul>
  );

  return (
    <div className={styles.viewport}>
      <div className={reverse ? `${styles.track} ${styles.reverse}` : styles.track}>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

export function SkillsMarquee({
  speed = 40,
  direction = "left",
  gap = 56,
  pauseOnHover = false,
  rows = 1,
  items = defaultSkills,
  label = "Skills and tools",
}: SkillsMarqueeProps) {
  if (!items.length) return null;

  const reverse = direction === "right";

  // Two rows split the list rather than repeating it, so the second row is not
  // a mirror of the first and no skill is on screen twice.
  const split = Math.ceil(items.length / 2);
  const rowItems = rows === 2 ? [items.slice(0, split), items.slice(split)] : [items];

  return (
    <div
      className={pauseOnHover ? `${styles.marquee} ${styles.pausable}` : styles.marquee}
      style={
        {
          "--marquee-speed": `${speed}s`,
          "--marquee-gap": `${gap}px`,
        } as CSSProperties
      }
    >
      {rowItems.map((group, i) => (
        <Row
          key={group[0]?.tech ?? i}
          items={group}
          // The second row runs against the first.
          reverse={i === 0 ? reverse : !reverse}
          label={i === 0 ? label : undefined}
        />
      ))}
    </div>
  );
}
