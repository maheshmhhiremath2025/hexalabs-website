/**
 * POST /api/lead — a visitor's details from the Hexa chat or the Book-a-demo form,
 * emailed to the HexaLabs sales inbox (and nowhere else).
 *
 * Body: { source: 'hexa-chat' | 'demo-form', name, email, company, phone?, interest?,
 *         labTypes?: string[], batchSize?, preferredDate?, message?,
 *         transcript?: [{ role, content }], page?, website? (honeypot) }
 * Reply: { ok: true } or { error }
 *
 * Env: GMAIL_USER, GMAIL_APP_PASSWORD (a Gmail account with 2-step verification
 * and an app password).
 */
import nodemailer from 'nodemailer';
import { EMAIL_RE, clientIp, escapeHtml, line, originAllowed, rateLimited, readJson, send, text } from './_lib/http.js';

/** Every lead goes to this one address only. */
const LEAD_TO = 'kumar@hexalabs.online';

const SOURCES = { 'hexa-chat': 'Hexa chat', 'demo-form': 'Book a demo form' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  if (!originAllowed(req)) return send(res, 403, { error: 'Forbidden' });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: 'Bad request' });
  }

  // Honeypot filled: pretend it worked, send nothing.
  if (line(body.website)) return send(res, 200, { ok: true });

  const lead = {
    source: SOURCES[body.source] ? body.source : 'demo-form',
    name: line(body.name, 120),
    email: line(body.email, 160),
    company: line(body.company, 160),
    phone: line(body.phone, 40),
    interest: line(body.interest, 300) || (Array.isArray(body.labTypes) ? body.labTypes.map((t) => line(t, 80)).filter(Boolean).slice(0, 20).join(', ') : ''),
    batchSize: line(body.batchSize, 60),
    preferredDate: line(body.preferredDate, 40),
    message: text(body.message, 2000),
    page: line(body.page, 300),
  };
  const transcript = (Array.isArray(body.transcript) ? body.transcript : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .slice(-12)
    .map((m) => ({ role: m.role, content: text(m.content, 800) }))
    .filter((m) => m.content);

  if (lead.name.length < 2 || !EMAIL_RE.test(lead.email) || !lead.company) {
    return send(res, 400, { error: 'Please give your name, a valid work email and your company.' });
  }
  if (lead.phone && !/^[+\d][\d\s().-]{5,}$/.test(lead.phone)) {
    return send(res, 400, { error: 'Please check the phone number.' });
  }

  const ip = clientIp(req);
  if (rateLimited(`lead:${ip}`, 5, 60 * 60 * 1000)) {
    return send(res, 429, { error: 'Too many requests. Please email support@hexalabs.online.' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('[lead] GMAIL_USER / GMAIL_APP_PASSWORD not set');
    return send(res, 503, { error: 'Not configured' });
  }

  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const rows = [
    ['Name', lead.name],
    ['Work email', lead.email],
    ['Company', lead.company],
    ['Phone', lead.phone],
    ['Interested in', lead.interest],
    ['Batch size', lead.batchSize],
    ['Preferred date', lead.preferredDate],
    ['Message', lead.message],
    ['Source', SOURCES[lead.source]],
    ['Page', lead.page],
    ['Received', `${when} IST`],
  ].filter(([, v]) => v);

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0b1f3a">
  <p style="margin:0 0 12px"><b>New lead from the HexaLabs website</b> (${escapeHtml(SOURCES[lead.source])})</p>
  <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;border:1px solid #d7dee8">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="border:1px solid #d7dee8;background:#f3f6fb;font-weight:bold;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="border:1px solid #d7dee8;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join('')}
  </table>
  ${
    transcript.length
      ? `<p style="margin:18px 0 6px"><b>Chat transcript</b> <span style="color:#64748b;font-weight:normal">(sent by the visitor's browser, not verified; Hexa's replies are not commitments)</span></p>
  <div style="border:1px solid #d7dee8;border-radius:8px;padding:10px 12px;background:#fafbfd">
    ${transcript
      .map(
        (m) =>
          `<p style="margin:0 0 8px"><b style="color:${m.role === 'user' ? '#0a66c2' : '#475569'}">${m.role === 'user' ? 'Visitor' : 'Hexa (unverified)'}:</b> <span style="white-space:pre-wrap">${escapeHtml(m.content)}</span></p>`,
      )
      .join('')}
  </div>`
      : ''
  }
  <p style="margin:16px 0 0;color:#64748b;font-size:12px">Reply to this email to answer ${escapeHtml(lead.name)} directly.</p>
</div>`;

  const plain = [
    `New lead from the HexaLabs website (${SOURCES[lead.source]})`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(transcript.length ? ['', "Chat transcript (sent by the visitor's browser, not verified):", ...transcript.map((m) => `${m.role === 'user' ? 'Visitor' : 'Hexa (unverified)'}: ${m.content}`)] : []),
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: { name: 'HexaLabs website', address: process.env.GMAIL_USER },
      to: LEAD_TO,
      replyTo: { name: lead.name, address: lead.email },
      subject: `New lead: ${lead.name} — ${lead.company}${lead.batchSize ? ` (${lead.batchSize})` : ''}`,
      text: plain,
      html,
    });
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[lead] send failed', err?.code || err?.message || err);
    return send(res, 502, { error: 'Could not send' });
  }
}
