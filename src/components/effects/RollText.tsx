/** Hover text roll: a hidden duplicate slides in from below. The duplicate is aria-hidden. */
export function RollText({ children }: { children: string }) {
  return <span className="roll"><span className="rollTrack"><span>{children}</span><span aria-hidden="true">{children}</span></span></span>;
}
