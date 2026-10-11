import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import { bookingLink, person } from "@/resources/content";
import { Handles, Mascot, RevealText } from "./Studio";
import { ContactBackdrop, ContactBadge } from "./ContactArtwork";
import "./contact-motion.css";
export function Contact({ animated = false }: { animated?: boolean }) {
  return <section id="contact" className="contactSection studioContainer" aria-labelledby="contact-heading">
    <div className="contactIntro"><Mascot /><div><h2 id="contact-heading" className="displayType">{animated ? <RevealText text="Let’s talk" /> : "Let’s talk"}</h2><p>I like working through complex problems with people who care about the details. Have a product to build, an engineering role, or an interesting challenge? Let’s start a conversation.</p></div></div>
    <div className={`contactBoard${animated ? " contactBoardAnimated" : ""}`}>
      <div className="commentNote"><span className="commentLabel">A little note</span><div><Image src={person.avatar} width={48} height={48} alt="" /><p><strong>{person.firstName}</strong>Open to full-time roles, contract work, and conversations about things worth building.</p></div><span className="reaction">ϟ 1</span></div>
      {animated ? <ContactBackdrop/> : <><div className="boardShape boardShapeOne" aria-hidden="true" /><div className="boardShape boardShapeTwo" aria-hidden="true" /></>}
      <SiteAnchor href="/contact" className={`contactSticker${animated ? " contactStickerAnimated" : ""}`}>{animated ? <ContactBadge/> : <span aria-hidden="true">↠</span>}Contact{animated ? <><ContactBadge/><Handles/></> : <span aria-hidden="true">↞</span>}</SiteAnchor>
      <div className="boardLinks"><SiteAnchor href={`mailto:${person.email}`}>Email me ↗</SiteAnchor><SiteAnchor href={bookingLink} target="_blank" rel="noopener noreferrer">Book a call ↗</SiteAnchor></div>
    </div>
  </section>;
}
