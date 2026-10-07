/**
 * Forward a website enquiry to HexaLabs Mailer (POST /api/inbound), so it becomes a
 * contact and a deal there and any cold emails to that person stop.
 *
 * Env:
 *   MAILER_INBOUND_SECRET  shared secret (same value as INBOUND_SECRET in the mailer).
 *                          When unset, nothing is forwarded and nothing is logged.
 *   MAILER_INBOUND_URL     optional, defaults to https://emailer.hexalabs.online/api/inbound
 *
 * Best effort by design: waits at most `timeoutMs` (3 s), never throws, and the
 * visitor's response is the same whether or not the mailer answered.
 */

const DEFAULT_URL = 'https://emailer.hexalabs.online/api/inbound';

/** Only https (or plain http to this machine), so the secret never travels in clear text. */
function inboundUrl() {
  const raw = (process.env.MAILER_INBOUND_URL || '').trim() || DEFAULT_URL;
  try {
    const u = new URL(raw);
    const local = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    return u.protocol === 'https:' || (u.protocol === 'http:' && local) ? u.toString() : '';
  } catch {
    return '';
  }
}

/** Returns { ok, status?, skipped?, error? }. */
export async function forwardToMailer(enquiry, { timeoutMs = 3000, fetchImpl = globalThis.fetch } = {}) {
  const secret = (process.env.MAILER_INBOUND_SECRET || '').trim();
  if (!secret) return { ok: false, skipped: true };
  const url = inboundUrl();
  if (!url) {
    console.error('[mailer] MAILER_INBOUND_URL must be an https URL');
    return { ok: false, error: 'bad url' };
  }
  const ctrl = new AbortController();
  let timer;
  // The race guards against a fetch that ignores the abort signal.
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => {
      ctrl.abort();
      resolve({ ok: false, error: 'timeout' });
    }, timeoutMs);
  });
  const call = (async () => {
    const r = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify(enquiry),
      signal: ctrl.signal,
    });
    return { ok: Boolean(r.ok), status: r.status };
  })().catch((err) => ({ ok: false, error: err?.name === 'AbortError' ? 'timeout' : String(err?.message || err).slice(0, 200) }));
  try {
    const result = await Promise.race([call, timeout]);
    if (!result.ok) console.error('[mailer] forward failed', result.status || result.error);
    return result;
  } finally {
    clearTimeout(timer);
  }
}
