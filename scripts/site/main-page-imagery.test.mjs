import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const pages = ['home', 'services', 'trade', 'about'];
const slots = ['hero', 'middle', 'lower'];
const assets = pages.flatMap((page) =>
  slots.map((slot) => `public/images/main-pages/${page}-${slot}.webp`),
);

const read = (path) => readFileSync(join(root, path), 'utf8');

test('all twelve main-page images exist and stay lightweight', () => {
  assert.equal(assets.length, 12);
  for (const asset of assets) {
    const absolute = join(root, asset);
    assert.ok(existsSync(absolute), `${asset} must exist`);
    assert.ok(statSync(absolute).size > 20_000, `${asset} is unexpectedly small`);
    assert.ok(statSync(absolute).size < 280_000, `${asset} exceeds 280 KB`);
  }
});

test('image registry defines hero, middle, and lower metadata per page', () => {
  const registry = read('src/content/mainPageImages.ts');
  for (const page of pages) {
    assert.match(registry, new RegExp(`${page}:\\s*{`));
    for (const slot of slots) {
      assert.match(registry, new RegExp(`${slot}:\\s*{`));
      assert.match(registry, new RegExp(`${page}-${slot}\\.webp`));
    }
  }
  assert.doesNotMatch(registry, /cliente real|caso real|operaci[o\u00f3]n real/i);
});

test('EditorialMedia uses next/image with lazy body-image defaults', () => {
  const component = read('src/components/sections/EditorialMedia.tsx');
  assert.match(component, /from 'next\/image'/);
  assert.match(component, /priority = false/);
  assert.match(component, /<figure/);
  assert.match(component, /<figcaption/);
  assert.match(component, /sizes=/);
});

test('Hero supports an opt-in editorial image without removing its default path', () => {
  const hero = read('src/components/sections/Hero.tsx');
  assert.match(hero, /editorialImage\?:/);
  assert.match(hero, /<EditorialMedia/);
  assert.match(hero, /editorialImage \?/);
  assert.match(hero, /centered \?/);
});

test('each principal page consumes exactly three registered images', () => {
  const routes = {
    home: 'src/app/(site)/page.tsx',
    services: 'src/app/(site)/servicios/page.tsx',
    trade: 'src/app/(site)/comercio-exterior/page.tsx',
    about: 'src/app/(site)/quienes-somos/page.tsx',
  };

  for (const [page, route] of Object.entries(routes)) {
    const source = read(route);
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.hero`));
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.middle`));
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.lower`));
  }
});
