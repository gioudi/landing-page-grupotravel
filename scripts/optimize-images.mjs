import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const INPUT_DIR = 'public/img';
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 75;

const pngFiles = readdirSync(INPUT_DIR).filter(
  (f) => extname(f).toLowerCase() === '.png'
);

if (pngFiles.length === 0) {
  console.log('No PNG images found in', INPUT_DIR);
  process.exit(0);
}

for (const file of pngFiles) {
  const src = join(INPUT_DIR, file);
  const outName = `${basename(file, extname(file))}.webp`;
  const out = join(INPUT_DIR, outName);

  const pngSize = statSync(src).size;

  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .flatten({ background: '#000000' })
    .webp({ quality: WEBP_QUALITY })
    .toFile(out);

  const webpSize = statSync(out).size;
  const { width, height } = await sharp(out).metadata();
  const pngKb = (pngSize / 1024).toFixed(0);
  const webpKb = (webpSize / 1024).toFixed(0);
  const reduction = ((1 - webpSize / pngSize) * 100).toFixed(1);

  console.log(
    `${file} (${width}x${height}) -> ${outName} | PNG ${pngKb} KB -> WebP ${webpKb} KB | -${reduction}%`
  );
}
