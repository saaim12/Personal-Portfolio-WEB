import type { CSSProperties } from "react";
import styles from "./GradientButton.module.scss";

type GradientButtonProps = {
  label: string;
  href: string;
  external?: boolean;
  /** Outline + fill color for this button. */
  color?: string;
};

// Outline button that fills with a skewed sweep on hover (Uiverse by vikiWayne).
// The whole thing is the link.
export function GradientButton({ label, href, external, color = "#dc2626" }: GradientButtonProps) {
  return (
    <a
      className={styles.button}
      href={href}
      aria-label={label}
      style={{ "--btn-color": color } as CSSProperties}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}
