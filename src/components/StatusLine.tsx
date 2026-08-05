import { home } from "@/resources";
import { Reveal } from "./Reveal";

// The four facts a technical recruiter is scanning for in the first thirty
// seconds: whether he is available, where he is and when he works, what
// discipline he is in, and how soon. All four existed on the site before, split
// across the About page, the FAQ and the contact block, which meant a recruiter
// had to read three sections to answer questions that decide whether they read
// anything at all.
//
// Separate strings joined by layout, not by a character wedged into the copy.
export function StatusLine() {
  if (!home.status?.length) return null;

  return (
    <Reveal delay={0.42}>
      <p className="statusLine">
        {home.status.map((fact) => (
          <span key={fact} className="statusItem">
            {fact}
          </span>
        ))}
      </p>
    </Reveal>
  );
}
