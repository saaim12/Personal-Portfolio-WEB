import { SiteAnchor } from "@/components/SiteAnchor";
import { Action } from "@/components/Studio";
import { BlurLetters } from "@/components/effects/BlurLetters";
export function Contact(_props: { animated?: boolean }) {
  return <section id="contact" className="contactSection" aria-labelledby="contact-heading">
    <div className="contactInner">
      <p className="monoLabel">(Contact)</p>
      <div className="contactIntro"><p>I like working through complex problems with people who care about the details. Have a product to build, an engineering role, or an interesting challenge? Let’s start a conversation.</p><p className="contactNote">Open to full-time roles, contract work, and conversations about things worth building.</p></div>
      <h2 id="contact-heading" className="contactHeadline"><SiteAnchor href="/contact"><BlurLetters text="Let’s talk" strength={9} /></SiteAnchor></h2>
      <div className="contactActions"><Action href="/contact">Send a message</Action></div>
    </div>
  </section>;
}
