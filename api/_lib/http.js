/**
 * Small helpers shared by the API functions (Vercel Node runtime and the Vite dev
 * server both call handlers with plain Node req/res).
 */

/** Sites allowed to call the API (browser Origin header). */
const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?hexalabs\.online$/,
  /^https:\/\/hexalabs-website\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
];

export function originAllowed(req) {
  const origin = req.headers.origin;
  // Same-origin requests from some browsers omit Origin on POST; fall back to Referer.
  let source = origin || '';
  if (!source && req.headers.referer) {
    try {
      source = new URL(req.headers.referer).origin;
    } catch {
      source = '';
    }
  }
  return ALLOWED_ORIGINS.some((re) => re.test(source));
}

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

/**
 * Parsed JSON body (Vercel pre-parses it; the dev server does not). Max 64 KB.
 * Only application/json is accepted: that forces a CORS preflight for any
 * cross-site browser request, which these endpoints never answer.
 */
export async function readJson(req) {
  const type = String(req.headers['content-type'] || '').toLowerCase();
  if (!type.startsWith('application/json')) throw new Error('Unsupported content type');
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 64 * 1024) throw new Error('Body too large');
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

const hits = new Map();
/**
 * Best-effort sliding-window rate limit, per function instance (serverless
 * instances are short-lived, so this only stops bursts from one visitor).
 */
export function rateLimited(key, limit, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > limit;
}

/** Trimmed single-line string, cut to `max` characters. */
export function line(value, max = 200) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max);
}

/** Trimmed multi-line string, cut to `max` characters. */
export function text(value, max = 2000) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, max);
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
