/** Grid of blocks used for the pixel wipe; delays are deterministic so server and client markup match. */
export function PixelBlocks({ columns = 8, rows = 10, spread = 0.32, className = "pixelBlocks" }: { columns?: number; rows?: number; spread?: number; className?: string }) {
  const cells = Array.from({ length: columns * rows }, (_, i) => {
    const hash = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    return (hash - Math.floor(hash)) * spread;
  });
  return <span className={className} aria-hidden="true" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
    {cells.map((delay, i) => <i key={i} style={{ animationDelay: `${delay.toFixed(3)}s` }} />)}
  </span>;
}
