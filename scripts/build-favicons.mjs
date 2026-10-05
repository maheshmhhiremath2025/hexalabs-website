/**
 * node scripts/build-favicons.mjs
 *
 * Builds the site icons from the brain mark in the official logo
 * (brand-source/hexalabs-logo-official.png, brain = the two halves at the left):
 *   public/favicon.ico (16/32/48, PNG-in-ICO), public/favicon-32.png,
 *   public/apple-touch-icon.png (180, white background), public/icon-192.png
 * Also saves the clean cut-out as brand-source/brain-mark.png.
 */
import fs from 'node:fs/promises';
import sharp from 'sharp';

const LOGO = 'brand-source/hexalabs-logo-official.png';
// Horizontal extent of the brain in the official logo (orange half + blue half).
const BRAIN_X = [22, 251];

// Cut the brain and trim it to its visible pixels.
const meta = await sharp(LOGO).metadata();
const strip = await sharp(LOGO)
  .extract({ left: BRAIN_X[0], top: 0, width: BRAIN_X[1] - BRAIN_X[0] + 1, height: meta.height })
  .png()
  .toBuffer();
const brain = await sharp(strip).trim({ threshold: 8 }).png().toBuffer();
await fs.writeFile('brand-source/brain-mark.png', brain);

/** Square icon: brain centred with `pad` (fraction of the side) on each edge. */
async function icon(size, pad, background = { r: 0, g: 0, b: 0, alpha: 0 }) {
  const inner = Math.round(size * (1 - 2 * pad));
  const mark = await sharp(brain)
    .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
}

/** ICO container holding PNG images (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
}

const small = [];
for (const size of [16, 32, 48]) small.push({ size, data: await icon(size, 0.02) });
await fs.writeFile('public/favicon.ico', ico(small));
await fs.writeFile('public/favicon-32.png', small[1].data);
await fs.writeFile('public/apple-touch-icon.png', await icon(180, 0.12, { r: 255, g: 255, b: 255, alpha: 1 }));
await fs.writeFile('public/icon-192.png', await icon(192, 0.08));
console.log('Favicons built from the official brain mark.');
