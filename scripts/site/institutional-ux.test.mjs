import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = path => readFileSync(path, 'utf8');
test('home makes the service offer explicit before educational content', () => {
    const page = read('src/app/(site)/page.tsx');
    const styles = read('src/app/globals.css');
    assert.match(page, /Servicios de aduanas y carga internacional en Perú/);
    assert.match(page, /href="#servicios"/);
    assert.match(page, /id="servicios"/);
    for (const serviceGroup of ['Aduanas', 'Carga y transporte', 'Consultoría e incidencias']) {
        assert.match(page, new RegExp(`title: '${serviceGroup}'`));
    }
    for (const serviceSlug of [
        'agenciamiento-aduanas',
        'agencia-de-carga-internacional',
        'transporte-de-carga',
        'resguardo-aduanero',
        'consultoria-aduanera',
        'ajuste-de-valor-aduanero',
        'multas-aduaneras-sunat',
    ]) {
        assert.match(page, new RegExp(`'${serviceSlug}'`));
    }
    assert.match(page, /href=\{ROUTES.blog\}/);
    assert.doesNotMatch(page, /items=\{comercioExteriorCategories\}/);
    assert.match(page, /home-control-hero/);
    assert.doesNotMatch(page, /home-route-line|home-route-node/);
    assert.match(page, /home-service-route/);
    assert.match(page, /function HomeServiceIcon/);
    assert.doesNotMatch(page, /[👤⚡📍🧾]/u);
    assert.doesNotMatch(styles, /home-route-line|home-route-node|@keyframes routeTrace/);
    assert.match(styles, /\.home-control-grid/);
    assert.match(styles, /prefers-reduced-motion: reduce/);
    assert.ok(page.indexOf('id="servicios"') < page.indexOf('href={ROUTES.blog}'));
});
test('home adapts the control-tower composition for narrow touch screens', () => {
    const page = read('src/app/(site)/page.tsx');
    const header = read('src/components/layout/Header.tsx');
    const styles = read('src/app/globals.css');
    assert.match(page, /max-\[380px\]:text-\[2\.5rem\]/);
    assert.match(page, /aspect-\[5\/4\].*sm:aspect-\[4\/3\]/);
    assert.match(page, /grid-cols-2.*sm:grid-cols-2.*xl:grid-cols-4/);
    assert.match(page, /max-\[380px\]:hidden/);
    assert.match(header, /min-h-11 min-w-11/);
    assert.match(styles, /@media \(pointer: coarse\)/);
    assert.match(styles, /@media \(hover: none\)/);
});
test('shared navigation stays accessible, touch-friendly, and motion-specific', () => {
    const header = read('src/components/layout/Header.tsx');
    const footer = read('src/components/layout/Footer.tsx');
    const whatsapp = read('src/components/tracking/WhatsAppLink.tsx');
    assert.match(header, /inert=\{!mobileMenuOpen\}/);
    assert.match(header, /aria-hidden=\{!mobileMenuOpen\}/);
    assert.match(header, /event\.key === 'Escape'/);
    assert.match(header, /menuButtonRef\.current\?\.focus\(\)/);
    assert.match(header, /ref=\{menuButtonRef\}/);
    assert.doesNotMatch(header, /transition-all/);
    assert.doesNotMatch(whatsapp, /transition-all/);
    assert.match(header, /className="flex min-h-11 items-center gap-2"/);
    assert.match(footer, /inline-flex min-h-11 items-center/);
    assert.match(whatsapp, /min-h-11/);
});
test('home visual system uses semantic color tokens with AA-safe action colors', () => {
    const page = read('src/app/(site)/page.tsx');
    const styles = read('src/app/globals.css');
    const whatsapp = read('src/components/tracking/WhatsAppLink.tsx');
    for (const token of [
        '--home-canvas',
        '--home-surface',
        '--home-ink',
        '--home-copy',
        '--home-muted',
        '--home-brand',
        '--home-brand-hover',
        '--home-border',
        '--action-whatsapp',
        '--action-whatsapp-hover',
    ]) {
        assert.match(styles, new RegExp(`${token}:`));
    }
    assert.match(page, /var\(--home-muted\)/);
    assert.doesNotMatch(page, /#647083|#657084/i);
    assert.match(whatsapp, /bg-\[var\(--action-whatsapp\)\]/);
    assert.match(whatsapp, /text-\[var\(--action-whatsapp\)\]/);
    assert.doesNotMatch(whatsapp, /#0f9f6e|#0c8c61/i);
});
test('home restores brand energy through purposeful color regions', () => {
    const page = read('src/app/(site)/page.tsx');
    const styles = read('src/app/globals.css');
    for (const token of [
        '--home-brand-soft',
        '--home-cyan',
        '--home-cyan-soft',
        '--home-mint',
        '--home-warm',
    ]) {
        assert.match(styles, new RegExp(`${token}:`));
    }
    for (const visualRole of [
        'home-color-aurora',
        'home-trust-strip',
        'home-services-field',
        'home-team-field',
        'home-final-field',
    ]) {
        assert.match(page, new RegExp(visualRole));
        assert.match(styles, new RegExp(`\\.${visualRole}`));
    }
    for (const tone of ['indigo', 'cyan', 'emerald']) {
        assert.match(page, new RegExp(`tone: '${tone}'`));
        assert.match(styles, new RegExp(`data-tone="${tone}"`));
    }
});
test('home service directory uses the full container for fast service selection', () => {
    const page = read('src/app/(site)/page.tsx');
    const styles = read('src/app/globals.css');
    assert.match(page, /home-services-intro/);
    assert.match(page, /home-service-directory/);
    assert.match(page, /home-service-links/);
    assert.match(page, /md:grid-cols-\[240px_minmax\(0,1fr\)\]/);
    assert.match(page, /text-xl font-extrabold/);
    assert.match(page, /min-h-28/);
    assert.doesNotMatch(page, /lg:sticky lg:top-40/);
    assert.match(styles, /\.home-service-directory/);
    assert.match(styles, /\.home-service-link:hover/);
});
test('root metadata supports safe areas and browser chrome theming', () => {
    const layout = read('src/app/layout.tsx');
    assert.match(layout, /import type \{ Metadata, Viewport \} from 'next'/);
    assert.match(layout, /export const viewport: Viewport/);
    assert.match(layout, /viewportFit: 'cover'/);
    assert.match(layout, /themeColor: 'var\(--home-canvas\)'|themeColor: '#f3f0e7'/i);
});
test('about offers concrete next steps without nested link buttons or placeholder mission imagery', () => {
    const page = read('src/app/(site)/quienes-somos/page.tsx');
    assert.match(page, /id="como-trabajamos"/);
    assert.match(page, /href="#como-trabajamos"/);
    assert.doesNotMatch(page, /<Button/);
    assert.doesNotMatch(page, /<SplitFeature\s+title="Nuestra Misión"/);
});
test('contact explains the email reply and provides autocomplete and message help', () => {
    const form = read('src/components/forms/ContactoForm.tsx');
    assert.match(form, /autoComplete="name"/);
    assert.match(form, /autoComplete="email"/);
    assert.match(form, /aria-describedby="mensaje-ayuda"/);
    assert.match(form, /id="mensaje-ayuda"/);
    assert.match(form, /successMessage=.*correo/);
    const page = read('src/app/(site)/contacto/page.tsx');
    assert.match(page, /id="contacto-form" className="scroll-mt-/);
    assert.match(page, /faqs.map/);
});
test('institutional pages do not interrupt reading or form entry with a timed popup', async () => {
    const code = ts.transpile(read('src/components/layout/contactNudgeRules.ts'), {module: ts.ModuleKind.ESNext});
    const { shouldEnableContactNudge } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
    for (const path of ['/', '/contacto', '/contacto/', '/quienes-somos', '/quienes-somos/']) {
        assert.equal(shouldEnableContactNudge(path), false, path);
    }
    assert.equal(shouldEnableContactNudge('/servicios/'), false, 'Service pages keep the offer visible');
    assert.equal(shouldEnableContactNudge('/blog/'), true, 'Educational pages can keep the contextual nudge');
});
