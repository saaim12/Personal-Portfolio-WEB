import Image from "next/image";
import { bookingLink, person } from "@/resources/content";
import { Mascot } from "./Studio";
export function Contact() {
  return <section id="contact" className="contactSection studioContainer" aria-labelledby="contact-heading">
    <div className="contactIntro"><Mascot /><div><h2 id="contact-heading" className="displayType">Let’s talk</h2><p>I like working through complex problems with people who care about the details. Have a product to build, an engineering role, or an interesting challenge? Let’s start a conversation.</p></div></div>
    <div className="contactBoard">
      <div className="commentNote"><span className="commentLabel">A little note</span><div><Image src={person.avatar} width={48} height={48} alt="" /><p><strong>{person.firstName}</strong>Open to full-time roles, contract work, and conversations about things worth building.</p></div><span className="reaction">ϟ 1</span></div>
      <div className="boardShape boardShapeOne" aria-hidden="true" /><div className="boardShape boardShapeTwo" aria-hidden="true" />
      <a href="/contact" className="contactSticker"><span aria-hidden="true">↠</span>Contact<span aria-hidden="true">↞</span></a>
      <div className="boardLinks"><a href={`mailto:${person.email}`}>Email me ↗</a><a href={bookingLink} target="_blank" rel="noopener noreferrer">Book a call ↗</a></div>
    </div>
  </section>;
}
