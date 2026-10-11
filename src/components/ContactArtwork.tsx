export function ContactBackdrop() {
  return <svg className="contactBackdrop" viewBox="0 0 1670 800" preserveAspectRatio="none" aria-hidden="true">
    <rect width="1670" height="800" fill="var(--yellow)"/>
    <g fill="#522e29">
      <path d="M0 0H270L0 230Z"/>
      <path d="M0 800V754L630 228Q500 440 350 800Z"/>
      <path d="M1160 0H1640Q1370 280 760 800Q1120 200 1160 0Z"/>
      <path d="M1550 800H1670V680Z"/>
    </g>
  </svg>;
}

export function ContactBadge() {
  return <span className="contactBadge" aria-hidden="true"><svg viewBox="0 0 100 100">
    <rect className="contactBadgeDiamond" x="15" y="15" width="70" height="70" fill="var(--ink)"/>
    <g fill="var(--yellow)"><path d="m30 31 21 11v16L30 69V53l15-3-15-3Z"/><path d="m50 31 21 11v16L50 69V53l15-3-15-3Z"/></g>
  </svg></span>;
}
