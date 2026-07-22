// ─────────────────────────────────────────────────────────────
// Shared motion constants. Tune the whole site's feel from here.
// One easing family for entrances, one spring family for interaction.
// ─────────────────────────────────────────────────────────────

// Custom ease-out cubic-bezier used for every entrance.
export const EASE_OUT = [0.16, 1, 0.3, 1];

// Master intensity dial. 0 = motion effectively off, 1 = full.
// Scale drift/parallax/magnetic amplitudes by this in one place.
export const INTENSITY = 1;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
};

// Interactive springs (magnetic buttons, pointer parallax, cursor).
export const SPRING = {
  soft: { type: "spring", stiffness: 150, damping: 20, mass: 0.6 },
  snappy: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  magnetic: { type: "spring", stiffness: 200, damping: 15, mass: 0.4 },
};

// Cursor follow lerp factor (0..1 per frame). Higher = tighter.
export const CURSOR_LERP = 0.18;

// Magnetic pull: max px a control travels toward the pointer.
export const MAGNETIC_MAX = 8 * INTENSITY;

// Floating-object tuning defaults (amplitudes scaled by INTENSITY).
export const FLOAT = {
  driftY: 22 * INTENSITY,     // px vertical ambient drift
  driftRotate: 8 * INTENSITY, // deg ambient rotation
  parallax: 90 * INTENSITY,   // px scroll parallax at depth 1
  pointerLean: 26 * INTENSITY, // px lean toward/away from pointer
};

// Standard reveal used by sections (whileInView, once).
export const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

// Reduced-motion reveal: opacity only, no transform.
export const revealReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast } },
};

// Stagger container for grouped reveals (hero words, work rows, tags).
export const stagger = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
