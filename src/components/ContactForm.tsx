"use client";
import { useRef, useState, type FormEvent } from "react";
import { person } from "@/resources/content";
export function ContactForm(){
 const [step,setStep]=useState(1);
 const [message,setMessage]=useState("");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [opened,setOpened]=useState(false);
 const nameRef=useRef<HTMLInputElement>(null);
 const messageRef=useRef<HTMLTextAreaElement>(null);
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(step===1){setStep(2);requestAnimationFrame(()=>nameRef.current?.focus());return;}
 const subject=encodeURIComponent("Portfolio enquiry from "+name.trim());
 const body=encodeURIComponent(message.trim()+"\n\nFrom: "+name.trim()+"\nReply to: "+email.trim());
 window.location.href="mailto:"+person.email+"?subject="+subject+"&body="+body;setOpened(true);
 }
 return <form className="contactForm" onSubmit={submit}>
  <div className="formSheet">{step===1?<><label htmlFor="project-message">What’s on your mind?</label><textarea ref={messageRef} id="project-message" placeholder="Tell me about a role, a problem, or a product idea…" required minLength={10} maxLength={3000} value={message} onChange={e=>setMessage(e.target.value)}/></>:<><label htmlFor="contact-name">And who’s saying hello?</label><input ref={nameRef} id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/><p className="formNotice">This opens a draft in your email app. You can review it before sending.</p></>}
   <div className="formActions">{step===2&&<button type="button" onClick={()=>{setStep(1);requestAnimationFrame(()=>messageRef.current?.focus());}}>← Back</button>}<button type="submit">{step===1?"Next (1/2)":"Open email ↗"}</button></div>
  </div>{opened&&<p className="formNotice" role="status">Your email draft is ready in your mail app. If it didn’t open, use the email link below.</p>}<p className="handwritten">↳ I’m available for new projects!</p>
 </form>;
}
