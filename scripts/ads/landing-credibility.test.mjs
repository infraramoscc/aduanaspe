import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const landingSource = 'src/content/lp.ts';
const sharedPage = 'src/app/(ads)/lp/[slug]/page.tsx';
const offerPage = 'src/app/(ads)/oferta/primera-importacion/page.tsx';

const assets = [
    'public/images/landings/importar-china.webp',
    'public/images/landings/agente-aduanas-lima.webp',
    'public/images/landings/asesoria-comercio-exterior.webp',
    'public/images/landings/primera-importacion.webp',
];

test('every Ads landing has a local optimized hero asset', async () => {
    for (const asset of assets) {
        await access(asset);
        const file = await stat(asset);
        assert.ok(file.size > 20_000, `${asset} is unexpectedly small`);
        assert.ok(file.size < 700_000, `${asset} should stay below 700 KB`);
    }
});

test('landing content exposes the visual credibility contract', async () => {
    const source = await readFile(landingSource, 'utf8');
    for (const field of ['eyebrow', 'heroImage', 'heroImageAlt', 'benefits', 'trustNote']) {
        assert.match(source, new RegExp(`${field}:`));
    }
    for (const image of [
        '/images/landings/importar-china.webp',
        '/images/landings/agente-aduanas-lima.webp',
        '/images/landings/asesoria-comercio-exterior.webp',
    ]) {
        assert.match(source, new RegExp(image.replaceAll('/', '\\/')));
    }
});

test('both Ads experiences use the reusable campaign hero', async () => {
    const [shared, offer] = await Promise.all([
        readFile(sharedPage, 'utf8'),
        readFile(offerPage, 'utf8'),
    ]);
    assert.match(shared, /<CampaignHero/);
    assert.match(offer, /<CampaignHero/);
    assert.match(shared, /lp\.heroImage/);
    assert.match(offer, /\/images\/landings\/primera-importacion\.webp/);
});

test('first-import offer avoids unsupported urgency and trust claims', async () => {
    const offer = await readFile(offerPage, 'utf8');
    for (const unsupported of [
        /ÚLTIMO DÍA/i,
        /3 cupos/i,
        /Cero Multas/i,
        /Tracking 24\/7/i,
        /menos de 30 minutos/i,
        /Carlos Mendoza/i,
        /Ana Ramírez/i,
        />SUNAT</,
        />BASC</,
        />OEA</,
        /Cámara de Comercio/,
    ]) {
        assert.doesNotMatch(offer, unsupported);
    }
});
