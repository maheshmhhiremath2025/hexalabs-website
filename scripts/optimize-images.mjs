/**
 * npm run images
 *
 * For every PNG/JPG in public/screens and public/brand, writes a .webp and
 * .avif next to it (skipped when they are already newer than the source).
 * Screenshots wider than 800px also get <name>-800.webp/.avif for phones.
 * The <Screenshot> component serves AVIF → WebP → original automatically.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dirs = ['public/brand'];
const MAX_WIDTH = 2400;
const SMALL = 800;

async function newer(target, than) {
  try {
    const [t, s] = await Promise.all([fs.stat(target), fs.stat(than)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

let count = 0;
for (const dir of dirs) {
  let files = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    continue;
  }
  for (const f of files.filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const src = path.join(dir, f);
    const base = src.replace(/\.(png|jpe?g)$/i, '');
    const meta = await sharp(src).metadata();
    const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : undefined;

    if (!(await newer(`${base}.webp`, src))) {
      await sharp(src).resize(resize).webp({ quality: 82 }).toFile(`${base}.webp`);
      count++;
    }
    if (!(await newer(`${base}.avif`, src))) {
      await sharp(src).resize(resize).avif({ quality: 55 }).toFile(`${base}.avif`);
      count++;
    }
    let small = '';
    if (dir.endsWith('screens') && meta.width && meta.width > SMALL) {
      for (const [ext, enc] of [['webp', (i) => i.webp({ quality: 82 })], ['avif', (i) => i.avif({ quality: 55 })]]) {
        const out = `${base}-${SMALL}.${ext}`;
        if (!(await newer(out, src))) {
          await enc(sharp(src).resize({ width: SMALL })).toFile(out);
          count++;
        }
      }
      small = ` + ${SMALL}w`;
    }
    console.log(`  ${src}  ${meta.width}×${meta.height}  → .webp .avif${small}`);
  }
}
console.log(count ? `Wrote ${count} file(s).` : 'Nothing to do.');
