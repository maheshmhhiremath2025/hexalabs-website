/**
 * npm run art
 *
 * Turns the abstract artwork in brand-source/art/*.png (generated originals,
 * 1536×1024) into web images in public/art/:
 *   <name>-800.avif / .webp, <name>-1600.avif / .webp, <name>.jpg (fallback)
 * The <Art> component (src/components/ui/Art.tsx) serves them responsively.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'brand-source/art';
const OUT = 'public/art';
await fs.mkdir(OUT, { recursive: true });

const files = (await fs.readdir(SRC)).filter((f) => f.endsWith('.png'));
for (const f of files) {
  const name = f.replace(/\.png$/, '');
  const src = path.join(SRC, f);
  for (const w of [800, 1600]) {
    const img = sharp(src).resize({ width: w, withoutEnlargement: false });
    await img.clone().avif({ quality: 52 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  await sharp(src).resize({ width: 1200 }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
  console.log(`  ${name}`);
}
console.log(`Done: ${files.length} artworks → ${OUT}`);

// Transparent illustrations (brand-source/illustrations/*.png) → public/illustrations/:
// <name>-640 / -1280 .avif + .webp (alpha kept) and <name>.png (640w fallback).
// Served by IllustrationMedia (src/components/ui/Cards.tsx).
const ISRC = 'brand-source/illustrations';
const IOUT = 'public/illustrations';
await fs.mkdir(IOUT, { recursive: true });
const ifiles = (await fs.readdir(ISRC).catch(() => [])).filter((f) => f.endsWith('.png'));
for (const f of ifiles) {
  const name = f.replace(/\.png$/, '');
  const src = path.join(ISRC, f);
  for (const w of [640, 1280]) {
    const img = sharp(src).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 60 }).toFile(path.join(IOUT, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(IOUT, `${name}-${w}.webp`));
  }
  await sharp(src).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(path.join(IOUT, `${name}.png`));
  console.log(`  ${name} (illustration)`);
}
console.log(`Done: ${ifiles.length} illustrations → ${IOUT}`);
