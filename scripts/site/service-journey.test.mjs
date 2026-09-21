import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(path, 'utf8');

const serviceSlugs = [
    'agenciamiento-aduanas',
    'agencia-de-carga-internacional',
    'transporte-de-carga',
    'resguardo-aduanero',
    'consultoria-aduanera',
    'ajuste-de-valor-aduanero',
    'multas-aduaneras-sunat',
];

test('all service routes share one responsive journey shell', () => {
    const layoutPath = 'src/app/(site)/servicios/layout.tsx';
    assert.equal(existsSync(layoutPath), true);
    const layout = read(layoutPath);
    const subnav = read('src/components/services/ServiceSubnav.tsx');
    const styles = read('src/app/globals.css');

    assert.match(layout, /service-journey/);
    assert.match(layout, /<ServiceSubnav/);
    assert.match(subnav, /usePathname/);
    assert.match(subnav, /aria-current=\{isActive/);
    assert.match(subnav, /overflow-x-auto/);
    assert.match(subnav, /min-h-11/);
    assert.match(styles, /\.service-journey/);
    assert.match(styles, /\.service-subnav/);

    for (const slug of serviceSlugs) {
        assert.equal(existsSync(`src/app/(site)/servicios/${slug}/page.tsx`), true, slug);
        assert.match(subnav, new RegExp(slug));
    }
});

test('services hub offers a clear choice and tracks each service selection', () => {
    const page = read('src/app/(site)/servicios/page.tsx');
    const cards = read('src/components/sections/HubCards.tsx');

    assert.match(page, /Encuentra el servicio que necesita tu operación/);
    assert.match(page, /trackingLocation="services_hub"/);
    assert.match(page, /route="services-hero"/);
    assert.doesNotMatch(page, /<Link[^>]*>\s*<Button/s);
    assert.match(cards, /trackingLocation\?: string/);
    assert.match(cards, /GA4_EVENTS\.SERVICE_SELECTED/);
    assert.match(cards, /service_slug: item\.slug/);
});

test('home turns coordination and final contact into a confident three-step path', () => {
    const page = read('src/app/(site)/page.tsx');
    const styles = read('src/app/globals.css');

    assert.match(page, /home-team-steps/);
    for (const step of ['Revisamos tu caso', 'Definimos el alcance', 'Coordinamos y reportamos']) {
        assert.match(page, new RegExp(step));
    }
    assert.match(page, /home-final-proof/);
    assert.match(page, /Primera respuesta en 1 hora hábil/);
    assert.match(page, /Evaluación inicial sin costo/);
    assert.match(page, /Alcance antes de cotizar/);
    assert.match(page, /Hablar con un especialista/);
    assert.match(page, /Volver a la evaluación/);
    assert.match(styles, /\.home-team-steps/);
    assert.match(styles, /\.home-final-proof/);
});

test('homepage and WhatsApp expose stable, non-PII funnel events', () => {
    const page = read('src/app/(site)/page.tsx');
    const ga4 = read('src/components/tracking/ga4.ts');
    const whatsapp = read('src/components/tracking/WhatsAppLink.tsx');

    assert.match(ga4, /SERVICE_SELECTED: 'service_selected'/);
    assert.match(ga4, /WHATSAPP_CLICKED: 'whatsapp_clicked'/);
    assert.match(page, /eventName=\{GA4_EVENTS\.SERVICE_SELECTED\}/);
    assert.match(page, /service_slug: service\.slug/);
    assert.doesNotMatch(whatsapp, /void route/);
    assert.match(whatsapp, /GA4_EVENTS\.WHATSAPP_CLICKED/);
    assert.match(whatsapp, /location: route \|\| 'unspecified'/);
    assert.match(whatsapp, /service_slug: effectiveServiceSlug \|\| 'general'/);
});
