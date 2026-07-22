import styles from "./LiquidGradientHero.module.scss";

// Disable in one line: set to false to remove the gradient entirely.
const ENABLED = true;

// Pure-CSS animated liquid gradient (motion lives in the stylesheet — reliable
// everywhere, unlike WebGL which wasn't rendering in this environment). To tune:
// blob colours + speeds live in LiquidGradientHero.module.scss (the --b* vars
// and the flow* animation durations); scrim opacity is the .scrim rule there.
export function LiquidGradientHero() {
  if (!ENABLED) return null;
  return (
    <div className={styles.field} aria-hidden="true">
      <div className={`${styles.blob} ${styles.b1}`} />
      <div className={`${styles.blob} ${styles.b2}`} />
      <div className={`${styles.blob} ${styles.b3}`} />
      <div className={`${styles.blob} ${styles.b4}`} />
      <div className={styles.scrim} />
    </div>
  );
}
