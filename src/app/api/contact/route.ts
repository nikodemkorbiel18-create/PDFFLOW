import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.REPLY_TO_EMAIL || "hello@pdfflow.space";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle so the form can't be used to flood the inbox
const recentByIp = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  recentByIp.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 320);
  const subject = String(body.subject ?? "").trim().slice(0, 200) || "Website message";
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!message || (email && !EMAIL_PATTERN.test(email))) {
    return NextResponse.json({ error: "Please include a message and a valid email." }, { status: 400 });
  }

  const result = await sendEmail({
    to: CONTACT_EMAIL,
    subject: `[PDFflow contact] ${subject}`,
    replyTo: email || undefined,
    html: `<p><strong>From:</strong> ${escapeHtml(name || "Anonymous")} &lt;${escapeHtml(email || "no email given")}&gt;</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    text: `From: ${name || "Anonymous"} <${email || "no email given"}>\nSubject: ${subject}\n\n${message}`,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: `We couldn't send your message. Please email ${CONTACT_EMAIL} directly.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
