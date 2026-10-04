/**
 * Build step 3 of 3: render every route to static HTML.
 *
 *   dist/index.html            ← /
 *   dist/labs/index.html       ← /labs   (served by nginx try_files $uri/index.html)
 *   dist/404.html              ← unknown routes
 *   dist/sitemap.xml, dist/robots.txt
 *
 * Each page gets its own <title>, description, canonical, Open Graph,
 * Twitter card and JSON-LD, so crawlers and link previews work without JS.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const ssrEntry = (await fs.readdir(ssrDir)).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!ssrEntry) throw new Error('dist-ssr/entry-server.js not found — did the SSR build run?');
const { render, preloadAllPages, pages, notFoundMeta, defaultOgImage, jsonLdFor, site } = await import(
  pathToFileURL(path.join(ssrDir, ssrEntry)).href
);

// Page components are code-split; load them all so renderToString is synchronous.
await preloadAllPages();

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Preload the two fonts used above the fold (UI sans + headline serif).
const assets = await fs.readdir(path.join(dist, 'assets'));
const preloadFonts = [/^geist-latin-wght-normal.*\.woff2$/, /^instrument-serif-latin-400-italic.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

function head(meta, { noindex = false } = {}) {
  const url = `${site.url}${meta.path === '/' ? '/' : meta.path}`;
  const image = `${site.url}${meta.ogImage ?? defaultOgImage}`;
  const ld = jsonLdFor(meta.path)
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${esc(url)}" />`,
    ...preloadFonts,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="${esc(site.locale)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    ld,
  ].join('\n    ');
}

function page(meta, routePath, opts) {
  const html = render(routePath);
  return template
    .replace('<!--app-head-->', head(meta, opts))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered="${esc(routePath)}">${html}</div>`);
}

async function write(file, contents) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, contents);
}

for (const meta of pages) {
  const out = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path.slice(1), 'index.html');
  await write(out, page(meta, meta.path));
  console.log(`  prerendered ${meta.path.padEnd(26)} → ${path.relative(root, out)}`);
}

await write(path.join(dist, '404.html'), page(notFoundMeta, '/404', { noindex: true }));
console.log(`  prerendered ${'(not found)'.padEnd(26)} → dist/404.html`);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.sitemap)
  .map(
    (p) =>
      `  <url><loc>${site.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod><priority>${(p.priority ?? 0.5).toFixed(1)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
await write(path.join(dist, 'sitemap.xml'), sitemap);
await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log('  wrote sitemap.xml and robots.txt');

// Helper notes in public/ are for editors, not visitors.
for (const note of ['brand/README.txt']) await fs.rm(path.join(dist, note), { force: true });

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Done. Site URL used for canonical/OG/sitemap: ${site.url}`);
