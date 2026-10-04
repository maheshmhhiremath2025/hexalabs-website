# HexaLabs marketing site

Static marketing site for HexaLabs (portal: [labsoncloud.online](https://labsoncloud.online)).
Vite + React 18 + TypeScript + React Router 7 + Tailwind CSS v4 + Motion.
Every page is **prerendered to static HTML** at build time, so it loads fast and
search engines and link previews see full content without running JavaScript.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/  (static files for nginx)
npm run preview    # serve dist/ locally on http://localhost:4173
npm run images     # convert screenshots/logos to .webp + .avif
```

Requires Node 20.19 or newer.

---

## 1. Editing text (no React knowledge needed)

All copy lives in `src/content/`. Change the text, save, and the page updates.

| File | What it controls |
| --- | --- |
| `site.ts` | Brand name, contact email/phone, offer banner, logo slots, header nav, footer links |
| `home.ts` | Every section of the home page |
| `officialLabs.ts` | Official Azure and AWS course lab lists (`/official-labs`) |
| `sandboxes.ts` | Cloud sandbox providers, guardrails, comparison (`/sandboxes`) |
| `labs.ts` | Lab machines catalogue and filters (`/labs`) |
| `certifications.ts` | Official exam vouchers by vendor, exam finder, how vouchers work (`/certifications`) |
| `requestTypes.ts` | "Lab type" options on the demo form; `requestLink()` builds pre-filled form links |
| `training.ts` | "For training companies" page, including the 8 FAQ items |
| `pricing.ts` | Plans, prices (`price: null` shows "Contact for pricing"), offer banner |
| `about.ts` | About page |
| `legal.ts` | Privacy policy and Terms of service text |
| `contact.ts` | Book-a-demo page copy, batch-size options, success/error messages |
| `screens.ts` | Screenshot slots (see section 2) |
| `seo.ts` | `<title>` and meta description for every page |

**Accent words.** Headlines written as `{ before, accent, after }` show the
`accent` part in Instrument Serif italic. Keep it to one or two words.

**Adding a lab.** Copy any entry in `labs.ts`, give it a unique `id`, and set
`categories` to one or more of `azure | aws | windows | linux | kubernetes | sandbox`.
It appears in the catalogue, the filter counts and the "Request this lab" link.

**Copy rules** (from the brief): plain English, short sentences, no hype words
("unlock", "seamless", "revolutionise"…), no exclamation marks, no invented
stats or testimonials.

## 2. Logo and product visuals

**Logo.** The official HexaLabs logo (brain mark, wordmark and "Innovate.
Create. Elevate.") is `public/brand/logo.{avif,webp,png}` at 477×132, served
by `src/components/ui/Logo.tsx` in the header (44px) and footer (56px). The
original file is `brand-source/hexalabs-logo-official.png`. The Ask Hexa
avatar is `public/brand/hexa-robot.png`. Favicons (`favicon.ico`,
`favicon-32.png`, `icon-192.png`, `apple-touch-icon.png`) use the brain mark.

**Product visuals — no portal imagery.** The site deliberately shows no
screenshots and no mockups of the labsoncloud.online portal. Ideas are shown
with diagrams in `src/components/graphics/` (fleet infographic, lab-day
timeline, Ask Hexa flow, brand-kit cards, report documents).

**Social card.** `public/og/og-default.png` (1200×630) is used for link
previews on every page. Replace it any time with the same size.

## 3. Connecting the demo form

The Book-a-demo form POSTs JSON to `VITE_DEMO_ENDPOINT`:

```json
{
  "name": "…", "email": "…", "company": "…",
  "batchSize": "11–30 learners",
  "labTypes": ["Microsoft Azure", "Linux desktops"],
  "preferredDate": "2026-10-20",
  "message": "…",
  "source": "hexalabs-website", "page": "https://…/contact", "submittedAt": "ISO-8601"
}
```

Set it at build time:

```bash
cp .env.example .env.production
# edit VITE_DEMO_ENDPOINT=https://your-form-handler.example/demo
npm run build
```

Any endpoint that accepts a JSON POST and returns 2xx works (your own API,
Formspree, Basin, an n8n/Make webhook…). If it's on another domain it must
allow CORS from the site's origin.

Until it is set, submitting opens the visitor's email app with the request
already written, addressed to support@hexalabs.online. Nothing is posted
anywhere. (In `npm run dev` a small note reminds you the endpoint is unset.)

Built in: client-side validation with inline errors (focus jumps to the first
invalid field), a hidden honeypot field (bots that fill it get a fake success),
and a success state. `?type=<request-type>&item=<name>` and `?plan=<plan>`
pre-fill the form — every "Request" link on the catalogue pages uses
`requestLink()` from `src/content/requestTypes.ts`.

Also set `VITE_SITE_URL` to the final domain: it is used for canonical links,
Open Graph URLs, `sitemap.xml` and `robots.txt`.

## 4. Deploying to nginx

```bash
npm ci
npm run build
rsync -av --delete dist/ user@server:/var/www/hexalabs-site/
```

`deploy/nginx.conf` is a ready server block: HTTPS redirect, gzip, a one-year
immutable cache for `/assets/` (file names are content-hashed), `no-cache` for
HTML, security headers, and the route lookup:

```nginx
root /var/www/hexalabs-site;
location / {
    try_files $uri $uri/index.html /index.html;   # SPA fallback to index.html
}
```

Each route is prerendered as `dist/<route>/index.html`, so `/labs` is served as
real HTML. Unknown URLs fall back to `index.html` and the app shows its "Page
not found" screen. If you prefer a real 404 status, the config includes a
commented alternative that uses the prerendered `dist/404.html`.

Edit `server_name` and the certificate paths, then
`sudo nginx -t && sudo systemctl reload nginx`.

## 5. How it's built

```
src/
  content/            ← all editable text and data
  styles/theme.css    ← design tokens: colours, type scale, radii (the only place they're defined)
  styles/index.css    ← Tailwind import, base styles, buttons, form fields
  components/
    layout/           ← Header (sticky, full-screen mobile menu), Footer, Seo, ScrollManager
    ui/               ← Button, Section, Reveal, BrowserFrame, Screenshot, Logo, TodoBlock…
    mocks/            ← coded product screens used until screenshots arrive
    sections/         ← page sections: home/, labs/, training/, contact/ …
  pages/              ← one file per route
  entry-server.tsx    ← used only by the prerender step
scripts/
  prerender.mjs       ← writes per-route HTML, sitemap.xml, robots.txt
  optimize-images.mjs ← npm run images
deploy/nginx.conf
```

- **Design tokens.** Brand colours are defined once as CSS variables
  (`--ink-950`, `--blue-600`, `--orange-500`…) and mapped into Tailwind.
  Tailwind's default palette is switched off, so off-brand colours (indigo,
  purple…) can't creep in. Sections set a *surface* (`dark`, `paper`, `white`)
  and components use semantic utilities (`text-heading`, `text-body`,
  `border-line`) that adapt to it.
- **Code splitting.** Each page is its own chunk (`src/loadable.tsx`). The
  current page loads before hydration, so prerendered HTML hydrates cleanly;
  the prerender step loads all pages first.
- **Motion.** Used only for a one-time fade/rise as sections enter the view,
  card hover lift, and the live status dot. Animation code loads after the page,
  and everything respects `prefers-reduced-motion`.
- **Accessibility.** Skip link, landmarks, visible focus rings, keyboard
  mobile menu (focus trap, Esc to close), `aria-pressed` filter buttons with a
  live result count, native `<details>` FAQ, labelled form fields with linked
  errors. Product mocks are hidden from screen readers and described by one
  label instead.
- **SEO.** Per-page title/description/canonical, Open Graph + Twitter cards,
  Organization JSON-LD on every page, FAQPage JSON-LD on the training page,
  `sitemap.xml`, `robots.txt`, `noindex` on the 404 page.

### Results at hand-off (local build, Lighthouse 13.5, Chrome)

Served with gzip, as nginx will serve it:

| Page | Mobile perf | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 97 | 100 | 100 | 100 |
| Official labs | 98 | 100 | 100 | 100 |
| Cloud sandboxes | 97 | 100 | 100 | 100 |
| Lab machines | 97 | 100 | 100 | 100 |
| Certifications | 99 | 100 | 100 | 100 |
| For training companies | 98 | 100 | 100 | 100 |
| Pricing | 98 | 100 | 100 | 100 |
| About | 98 | 100 | 100 | 100 |
| Contact | 97 | 100 | 100 | 100 |

Desktop performance is 100 on every page. CLS is 0 on every page. Checked for horizontal overflow at 360, 768, 1024 and 1440 px.

### A note on the Vite version

The project uses **Vite 7** (Rollup + esbuild). Vite 8 bundles with Rolldown,
whose native Windows binary was blocked by Windows Application Control on the
machine this was built on. Vite 7 is stable and fully supported. To move to
Vite 8 later, on a machine where Rolldown runs:
`npm i -D vite@8 @vitejs/plugin-react@latest` — no code changes needed.

React Router is pinned to v7 because v8 requires React 19, and the brief
specifies React 18.

See **LAUNCH-CHECKLIST.md** for what was decided and what to double-check before going live.
