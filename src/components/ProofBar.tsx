import { home } from "@/resources";
import { Reveal } from "./Reveal";

// Trust stage of the homepage flow, directly under the hero so the first thing
// after the claim is evidence for it.
export function ProofBar() {
  if (!home.proof?.length) return null;

  return (
    <Reveal>
      <div className="proofBar">
        {home.proof.map((item) => (
          <div key={item.label} className="proofItem">
            <span className="proofValue">{item.value}</span>
            <span className="proofLabel">{item.label}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
