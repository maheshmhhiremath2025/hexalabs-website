/**
 * Send email as a hexalabs.online mailbox through Microsoft Graph (Microsoft 365).
 * Mail sent this way is our own domain's mail, so it lands in the inbox instead of
 * Junk (a Gmail sender using the HexaLabs name looks like impersonation to Outlook).
 *
 * Env: MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET (Entra app "HexaLabs Store mailer"
 * with the Mail.Send application permission, limited to the sender mailbox by an
 * Exchange application access policy) and MAIL_SENDER (e.g. support@hexalabs.online).
 */

export const graphMailReady = () =>
  Boolean(process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET && process.env.MAIL_SENDER);

let token = { value: '', expires: 0 };

async function accessToken() {
  if (token.value && Date.now() < token.expires - 60_000) return token.value;
  const r = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(process.env.MS_TENANT_ID)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID,
      client_secret: process.env.MS_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }).toString(),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.access_token) throw new Error(`Microsoft sign-in failed: ${data.error_description || data.error || r.status}`);
  token = { value: data.access_token, expires: Date.now() + (Number(data.expires_in) || 3600) * 1000 };
  return token.value;
}

/** to / replyTo: { name?, address }. Sends HTML (Graph takes one body type). */
export async function sendGraphMail({ to, replyTo, subject, html }) {
  const message = {
    subject,
    body: { contentType: 'HTML', content: html },
    toRecipients: [{ emailAddress: to }],
    ...(replyTo ? { replyTo: [{ emailAddress: replyTo }] } : {}),
    internetMessageHeaders: [{ name: 'X-HexaLabs-Website', value: 'lead' }],
  };
  const r = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(process.env.MAIL_SENDER)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, saveToSentItems: true }),
  });
  if (r.status !== 202) {
    const data = await r.json().catch(() => ({}));
    throw new Error(`Microsoft Graph sendMail failed: ${data?.error?.code || ''} ${data?.error?.message || r.status}`);
  }
}
