"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { person } from "@/resources/content";
import { sitePath } from "@/utils/sitePath";

// Static exports (GitHub Pages) have no server, so they keep the email-draft flow.
const canSendDirectly = process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true";
type Status = "idle" | "sending" | "sent" | "error";
const availability = "↳ Open to remote full-time and contract software engineering roles";

export function ContactForm(){
 const [message,setMessage]=useState("");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [company,setCompany]=useState("");
 const [status,setStatus]=useState<Status>("idle");
 const [error,setError]=useState("");
 const [opened,setOpened]=useState(false);
 const [ready,setReady]=useState(false);
 const messageRef=useRef<HTMLTextAreaElement>(null);
 // Results of a no-JavaScript POST come back as ?contact=sent|error.
 useEffect(()=>{setReady(true);const result=new URLSearchParams(window.location.search).get("contact");if(result==="sent")setStatus("sent");else if(result==="error"){setStatus("error");setError("The message could not be sent right now.");}},[]);
 const mailtoHref=()=>"mailto:"+person.email+"?subject="+encodeURIComponent("Software engineering opportunity"+(name.trim()?" from "+name.trim():""))+"&body="+encodeURIComponent(message.trim()+(name.trim()||email.trim()?"\n\nFrom: "+name.trim()+"\nReply to: "+email.trim():""));
 function openDraft(){window.location.href=mailtoHref();setOpened(true);}
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(status==="sending")return;
  if(!canSendDirectly){openDraft();return;}
  setStatus("sending");setError("");
  try{
   const response=await fetch(sitePath("/api/contact"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,message,contact_reference:company})});
   const result=await response.json().catch(()=>({}));
   if(response.ok&&result.ok){setStatus("sent");setMessage("");setName("");setEmail("");return;}
   setError(result.error||"The message could not be sent right now.");setStatus("error");
  }catch{setError("The message could not be sent. Check your connection and try again.");setStatus("error");}
 }
 if(status==="sent")return <div className="contactForm"><div className="formSheet" role="status"><p className="formSuccess">Message submitted. I’ll reply by email.</p><div className="formActions"><span/><button type="button" onClick={()=>{setStatus("idle");requestAnimationFrame(()=>messageRef.current?.focus());}}>Send another</button></div></div><p className="handwritten">{availability}</p></div>;
 return <form className="contactForm" method="post" action={sitePath("/api/contact")} onSubmit={submit} aria-busy={status==="sending"}>
  <div className="formSheet">
   <p className="formNotice formIntro">{canSendDirectly?"Send a message from this page.":"This form opens a draft in your email app so you can review it before sending."}</p>
   <label htmlFor="project-message">Your message <span className="formHint" id="message-hint">10–3,000 characters</span></label><textarea ref={messageRef} id="project-message" name="message" placeholder="Share the role, team, or job link." aria-describedby="message-hint" required minLength={10} maxLength={3000} value={message} onChange={e=>setMessage(e.target.value)}/>
   <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/>
   <label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/>
   {canSendDirectly&&<div className="formTrap" aria-hidden="true"><label htmlFor="contact-company">Leave this empty</label><input id="contact-company" name="contact_reference" tabIndex={-1} autoComplete="off" value={company} onChange={e=>setCompany(e.target.value)}/></div>}
   <div className="formActions"><span/><button type="submit" disabled={status==="sending"} data-ready={ready||undefined}>{canSendDirectly?(status==="sending"?"Sending…":"Send message"):"Open email draft"}</button></div>
  </div>{status==="error"&&<p className="formNotice formError" role="alert">{error} <button type="button" className="formFallback" onClick={openDraft}>Open an email draft instead</button> or email {person.email}.</p>}{opened&&<p className="formNotice" role="status">Your email draft is ready in your mail app. If it didn’t open, email {person.email} directly.</p>}<p className="handwritten">{availability}</p>
 </form>;
}
