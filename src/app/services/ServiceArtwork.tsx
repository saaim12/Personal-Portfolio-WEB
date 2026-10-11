/** The illustrated process symbols and oversized chapter motifs in the recording. */
export function ProcessArtwork({ step }: { step: number }) {
  return <svg className="processArtwork" viewBox="-5 0 130 100" aria-hidden="true">
    <g fill="white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="62" cy="48" r="38" />
      <g fill="currentColor" stroke="none"><circle cx="53" cy="42" r="2.8"/><circle cx="65" cy="42" r="2.8"/></g>
      {step === 0 && <><path d="m38 61 12 13m-16-9 14 13"/><circle cx="25" cy="38" r="27"/></>}
      {step === 1 && <><path d="M84 32v52l12-26Z"/><path fill="none" d="M62 60h57m-12-11 12 11-12 11"/></>}
      {step === 2 && <><path d="m56 73-4 18 18-5 39-39q7-7 0-13t-13 0Z"/><path fill="none" d="m94 36 13 13M56 73l14 13"/></>}
      {step === 3 && <><path d="m79 62 27-16 12 8v30l-26 15-13-8Z"/><path fill="none" d="m79 62 13 8 26-16M92 70v29"/></>}
    </g>
  </svg>;
}

export function StepPointer() {
  return <svg className="stepPointer" viewBox="0 0 36 36" aria-hidden="true"><path d="m3 3 29 9-15 5-5 15Z" fill="currentColor" stroke="var(--ink)" strokeWidth="2"/></svg>;
}

export function ProcessArrow() {
  return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M7 18h23M19 7l11 11-11 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ChapterArtwork({ chapter }: { chapter: number }) {
  return <svg className="chapterArtwork" viewBox="0 0 1000 1000" aria-hidden="true" fill="currentColor">
    {chapter < 2 ? Array.from({ length: chapter === 0 ? 8 : 10 }, (_, i) => <path key={i} d={chapter === 0 ? "M500 500 420 40 540 30 600 400Z" : "M500 500 460 25 535 25 540 500Z"} transform={`rotate(${i * (chapter === 0 ? 45 : 36)} 500 500)`}/>) : chapter === 2 ? <path d="M100 50h800c0 230-175 280-320 450 145 170 320 220 320 450H100c0-230 175-280 320-450C275 330 100 280 100 50Z"/> : Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx="500" cy="265" rx="160" ry="250" transform={`rotate(${i * 60} 500 500)`}/>)}
  </svg>;
}

export function ChapterBoundary({ last = false }: { last?: boolean }) {
  return <svg className={`serviceBoundary${last ? " serviceBoundaryLast" : ""}`} viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 59 140 12 330 52 580 22 780 54 1000 10V60H0Z"/>
    <path className="boundaryStroke" d="M0 59 140 12 330 52 580 22 780 54 1000 10"/>
    {[[0,59],[140,12],[330,52],[580,22],[780,54],[1000,10]].map(([x,y]) => <rect key={x} x={x-2.5} y={y-2.5} width="5" height="5"/>)}
  </svg>;
}
