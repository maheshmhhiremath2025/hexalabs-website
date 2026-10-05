# Launch checklist

Every page is complete — there are no placeholders or TODOs left in the site.
This list records what was decided and what is worth a final look before going live.

## Done

- **Brand:** real HexaLabs logo (brain + wordmark) in header and footer, favicons from the brain mark, Hexa robot as the Ask Hexa avatar, social card with the real logo. Originals in `brand-source/`.
- **Contact:** support@hexalabs.online everywhere. No phone number.
- **Leads:** the Book-a-demo form and the Hexa chat post to `/api/lead` (Vercel function), which emails **kumar@hexalabs.online** via Gmail. Needs `GMAIL_USER` + `GMAIL_APP_PASSWORD` in Vercel. Hexa (`/api/hexa-chat`) needs `OPENAI_API_KEY`. Set a monthly budget limit on that OpenAI project, and optionally a Vercel Firewall rate-limit rule for `/api/*`.
- **No portal imagery:** the site shows no screenshots or mockups of the labsoncloud portal. Product ideas are shown with diagrams (fleet infographic, lab-day timeline, Ask Hexa flow, brand-kit cards, report documents).
- **Pages:** Official labs, Cloud sandboxes, Lab machines, Certifications (official exam vouchers for Microsoft, AWS, Google Cloud, Oracle, Red Hat, CNCF, Databricks), For training companies, Pricing, About, Contact, Privacy policy, Terms of service.
- **Exam and course lists:** checked against vendor sites on 4 October 2026. Retired exams removed or replaced (AZ-204 → AI-200, AZ-500 → SC-500, AZ-800/801 → AZ-802, AI-900 → AI-901, AI-102 → AI-103).
- **Pricing:** shows "Contact for pricing" by design. To publish a price, set `price` in `src/content/pricing.ts`.

## Worth a final look before launch

- **Oracle exam codes** on `/certifications` (`src/content/certifications.ts`): Oracle's own pages could not be opened during research, so the 2026 codes (e.g. 1Z0-1085-26) came from search results. Open Oracle's certification pages once to confirm.
- **Vendor exam changes:** Microsoft and AWS retire exams several times a year. Review the exam list and the official course list every quarter.
- **Legal text:** the Privacy policy and Terms are complete, plain-English documents written for an Indian SaaS business (DPDP Act 2023, IT Act 2000). Have a lawyer review them before relying on them.
- **Offer wording:** "Official Azure & AWS labs — up to 30% off" (`src/content/site.ts` → `offer`). Remove or change it when the offer ends.
- **Domain:** canonical URLs, sitemap and robots use `https://hexalabs.online` (`VITE_SITE_URL`). nginx config in `deploy/nginx.conf` assumes certbot certificates.

## Rules for future edits

- No portal screenshots or portal-like mockups on this site.
- "Certifications" means official vendor exam vouchers, not HexaLabs' own certificates (those are part of lab reports on the training page).
- No invented stats, customer logos or testimonials.
