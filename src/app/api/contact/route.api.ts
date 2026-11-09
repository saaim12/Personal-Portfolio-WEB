// Contact form delivery through Resend (https://resend.com/docs/api-reference/emails/send-email).
// The ".api.ts" extension is registered only for server builds in next.config.mjs, so the
// static GitHub Pages export never sees this POST handler and keeps its email-draft fallback.
import { person } from "@/resources/content";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const LIMITS = { name: 100, email: 254, message: 3000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Shared limit through Upstash Redis REST when configured, so every serverless instance
// counts the same window; otherwise a best-effort per-instance map.
async function sharedThrottled(key: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const response = await fetch(`${url}/pipeline`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify([["INCR", `contact:${key}`], ["EXPIRE", `contact:${key}`, String(WINDOW_MS / 1000), "NX"]]), signal: AbortSignal.timeout(3000) });
    if (!response.ok) return null;
    const [count] = await response.json() as { result: number }[];
    return count.result > MAX_PER_WINDOW;
  } catch {
    return null;
  }
}
const recent = new Map<string, number[]>();
function throttled(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) || []).filter(time => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 1000) for (const [entry, times] of recent) if (times.every(time => now - time >= WINDOW_MS)) recent.delete(entry);
  return hits.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") || request.headers.get("host"));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json(403, { error: "Requests must come from the contact page." });
  const type = request.headers.get("content-type") || "";
  // Without JavaScript the browser posts the form natively; answer with a redirect back to the page.
  const native = type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data");
  const reply = native
    ? (_status: number, body: Record<string, unknown>) => Response.redirect(new URL(`/contact?contact=${body.ok ? "sent" : "error"}`, request.url), 303)
    : json;
  if (!native && !type.includes("application/json")) return json(415, { error: "Send the form as JSON." });

  let input: Record<string, unknown>;
  try {
    if (native) {
      input = Object.fromEntries(Array.from((await request.formData()).entries()).filter(([, value]) => typeof value === "string"));
    } else {
      const raw = await request.text();
      if (raw.length > 10_000) return json(413, { error: "That message is too long." });
      input = JSON.parse(raw);
    }
  } catch {
    return reply(400, { error: "The form could not be read." });
  }

  const field = (key: string) => (typeof input[key] === "string" ? (input[key] as string).trim() : "");
  const name = field("name").replace(/[\r\n]+/g, " ");
  const email = field("email");
  const message = field("message");

  // Hidden field that people never see: reject openly (the visitor keeps the draft and the email fallback).
  if (field("contact_reference")) return reply(400, { error: "The message could not be sent. Please email directly.", fallback: true });

  if (!name || name.length > LIMITS.name) return reply(400, { error: "Please add your name." });
  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) return reply(400, { error: "Please add a valid email address." });
  if (message.length < 10 || message.length > LIMITS.message) return reply(400, { error: "Your message should be 10 to 3,000 characters." });

  const client = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const limited = (await sharedThrottled(client)) ?? throttled(client);
  if (limited) return reply(429, { error: "Too many messages. Please try again later or email directly." });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return reply(503, { error: "Direct sending isn’t available right now.", fallback: true });

  const to = (process.env.CONTACT_TO_EMAIL || person.email).split(",").map(address => address.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL || "Saaim Portfolio <contact@saaim.site>";
  const subject = `Portfolio enquiry from ${name}`;
  const text = `${message}\n\nFrom: ${name}\nReply to: ${email}`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
<p style="white-space:pre-wrap;margin:0 0 20px">${escapeHtml(message)}</p>
<hr style="border:0;border-top:1px solid #ddd">
<p style="margin:12px 0 0;font-size:13px;color:#555">From <strong>${escapeHtml(name)}</strong> &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt; via saaim.site/contact. Reply to this email to answer them.</p>
</div>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, html, reply_to: email }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Resend rejected contact email", response.status, (await response.text()).slice(0, 500));
      return reply(502, { error: "The message could not be sent right now.", fallback: true });
    }
    return reply(200, { ok: true });
  } catch (error) {
    console.error("Resend request failed", error);
    return reply(502, { error: "The message could not be sent right now.", fallback: true });
  }
}
