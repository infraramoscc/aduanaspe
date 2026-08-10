import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const sourceDir = join(process.cwd(), 'tmp', 'main-pages-source');
const outputDir = join(process.cwd(), 'public', 'images', 'main-pages');
const supportedSource = /\.(png|jpe?g)$/i;
const expectedStems = [
  'home-hero',
  'home-middle',
  'home-lower',
  'services-hero',
  'services-middle',
  'services-lower',
  'trade-hero',
  'trade-middle',
  'trade-lower',
  'about-hero',
  'about-middle',
  'about-lower',
];
const expectedStemSet = new Set(expectedStems);
const expectedOutputs = expectedStems.map((stem) => `${stem}.webp`);
const expectedOutputSet = new Set(expectedOutputs);

const sourceEntries = await readdir(sourceDir, { withFileTypes: true });
const unsupportedEntries = sourceEntries.filter(
  (entry) => !entry.isFile() || !supportedSource.test(entry.name),
);

if (unsupportedEntries.length > 0) {
  throw new Error(
    `Unsupported source entries: ${unsupportedEntries.map((entry) => entry.name).join(', ')}`,
  );
}

const filesByStem = new Map();

for (const entry of sourceEntries) {
  const stem = basename(entry.name, extname(entry.name));

  if (!expectedStemSet.has(stem)) {
    throw new Error(`Unexpected source image: ${entry.name}`);
  }

  const files = filesByStem.get(stem) ?? [];
  files.push(entry.name);
  filesByStem.set(stem, files);
}

const duplicateStems = [...filesByStem].filter(([, files]) => files.length > 1);

if (duplicateStems.length > 0) {
  throw new Error(
    `Duplicate source stems: ${duplicateStems
      .map(([stem, files]) => `${stem} (${files.join(', ')})`)
      .join('; ')}`,
  );
}

const missingStems = expectedStems.filter((stem) => !filesByStem.has(stem));

if (missingStems.length > 0) {
  throw new Error(`Missing source images: ${missingStems.join(', ')}`);
}

await mkdir(outputDir, { recursive: true });

const existingOutputEntries = await readdir(outputDir, { withFileTypes: true });
const unexpectedWebps = existingOutputEntries.filter(
  (entry) => /\.webp$/i.test(entry.name) && (!entry.isFile() || !expectedOutputSet.has(entry.name)),
);

if (unexpectedWebps.length > 0) {
  throw new Error(
    `Unexpected WebP outputs: ${unexpectedWebps.map((entry) => entry.name).join(', ')}`,
  );
}

for (const stem of expectedStems) {
  const file = filesByStem.get(stem)[0];
  const output = `${stem}.webp`;

  await sharp(join(sourceDir, file))
    .rotate()
    .resize(1600, 1067, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6 })
    .toFile(join(outputDir, output));

  console.log(output);
}

const finalOutputs = (await readdir(outputDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.webp$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort();
const expectedFinalOutputs = [...expectedOutputs].sort();

if (
  finalOutputs.length !== expectedFinalOutputs.length ||
  finalOutputs.some((file, index) => file !== expectedFinalOutputs[index])
) {
  throw new Error(
    `Final WebP inventory mismatch: expected ${expectedFinalOutputs.join(', ')}, received ${finalOutputs.join(', ')}`,
  );
}
