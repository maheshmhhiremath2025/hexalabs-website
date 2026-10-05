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
