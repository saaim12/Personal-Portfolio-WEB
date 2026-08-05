import { Column, Heading } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { home } from "@/resources";
import { Reveal } from "./Reveal";

// Replaces the eight-question FAQ.
//
// Those questions were about pricing, project size, timelines and who owns the
// code, which are buyer questions. Answering them on a candidate's site tells a
// hiring manager they are reading a contractor's landing page, whatever the
// rest of the site says. This states what he wants next instead, which is the
// question a recruiter actually arrives with.
export function LookingFor({ icon }: { icon?: ReactNode }) {
  const l = home.looking;
  if (!l?.display) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--narrow section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">
            {icon}
            {l.label}
          </span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {l.title}
          </Heading>
        </div>
      </Reveal>

      <Reveal>
        {/* Plain div, not Column: Column is display:flex, which turns every
            inline element inside a paragraph into its own stacked row. */}
        <div className="prose prose--center">{l.body}</div>
      </Reveal>
    </Column>
  );
}
