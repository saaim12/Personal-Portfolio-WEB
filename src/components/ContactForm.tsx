"use client";
import { useRef, useState, type FormEvent } from "react";
import { person } from "@/resources/content";
import { sitePath } from "@/utils/sitePath";

// Static exports (GitHub Pages) have no server, so they keep the email-draft flow.
const canSendDirectly = process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true";
type Status = "idle" | "sending" | "sent" | "error";
const availability = "↳ Open to remote software engineering roles and contract work";

export function ContactForm(){
 const [message,setMessage]=useState("");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [company,setCompany]=useState("");
 const [status,setStatus]=useState<Status>("idle");
 const [error,setError]=useState("");
 const [opened,setOpened]=useState(false);
 const startedAt=useRef(0);
 const messageRef=useRef<HTMLTextAreaElement>(null);
 const markStarted=()=>{if(!startedAt.current)startedAt.current=Date.now();};
 const mailtoHref=()=>"mailto:"+person.email+"?subject="+encodeURIComponent("Software engineering opportunity"+(name.trim()?" from "+name.trim():""))+"&body="+encodeURIComponent(message.trim()+(name.trim()||email.trim()?"\n\nFrom: "+name.trim()+"\nReply to: "+email.trim():""));
 function openDraft(){window.location.href=mailtoHref();setOpened(true);}
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(status==="sending")return;
  if(!canSendDirectly){openDraft();return;}
  setStatus("sending");setError("");
  try{
   const response=await fetch(sitePath("/api/contact"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,message,company,startedAt:startedAt.current})});
   const result=await response.json().catch(()=>({}));
   if(response.ok&&result.ok){setStatus("sent");setMessage("");setName("");setEmail("");return;}
   setError(result.error||"The message could not be sent right now.");setStatus("error");
  }catch{setError("The message could not be sent. Check your connection and try again.");setStatus("error");}
 }
 if(status==="sent")return <div className="contactForm"><div className="formSheet" role="status"><p className="formSuccess">Thanks, your message has been delivered to my inbox. I’ll reply to your email soon.</p><div className="formActions"><span/><button type="button" onClick={()=>{setStatus("idle");startedAt.current=0;requestAnimationFrame(()=>messageRef.current?.focus());}}>Send another</button></div></div><p className="handwritten">{availability}</p></div>;
 return <form className="contactForm" onSubmit={submit} onFocus={markStarted} aria-busy={status==="sending"}>
  <div className="formSheet">
   <p className="formNotice formIntro">{canSendDirectly?"Send a note straight to my inbox, no email app needed.":"This form opens a draft in your email app so you can review it before sending."}</p>
   <label htmlFor="project-message">What’s on your mind?</label><textarea ref={messageRef} id="project-message" name="message" placeholder="Tell me about the role, team, or problem…" required minLength={10} maxLength={3000} value={message} onChange={e=>setMessage(e.target.value)}/>
   <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/>
   <label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/>
   {canSendDirectly&&<div className="formTrap" aria-hidden="true"><label htmlFor="contact-company">Company</label><input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)}/></div>}
   <div className="formActions"><span/><button type="submit" disabled={status==="sending"}>{canSendDirectly?(status==="sending"?"Sending…":"Send message"):"Open email draft"}</button></div>
  </div>{status==="error"&&<p className="formNotice formError" role="alert">{error} <button type="button" className="formFallback" onClick={openDraft}>Open an email draft instead</button> or email {person.email}.</p>}{opened&&<p className="formNotice" role="status">Your email draft is ready in your mail app. If it didn’t open, email {person.email} directly.</p>}<p className="handwritten">{availability}</p>
 </form>;
}
