import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const sourceDir = join(process.cwd(), 'tmp', 'main-pages-source');
const outputDir = join(process.cwd(), 'public', 'images', 'main-pages');

await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((file) => /\.(png|jpe?g)$/i.test(file));

if (files.length !== 12) {
  throw new Error(`Expected 12 source images, received ${files.length}`);
}

for (const file of files) {
  const output = `${basename(file, extname(file))}.webp`;

  await sharp(join(sourceDir, file))
    .rotate()
    .resize(1600, 1067, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6 })
    .toFile(join(outputDir, output));

  console.log(output);
}
