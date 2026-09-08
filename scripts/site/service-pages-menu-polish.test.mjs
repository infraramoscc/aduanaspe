import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(path, 'utf8');

const detailPages = [
    'agenciamiento-aduanas',
    'agencia-de-carga-internacional',
    'transporte-de-carga',
    'resguardo-aduanero',
    'consultoria-aduanera',
    'ajuste-de-valor-aduanero',
    'multas-aduaneras-sunat',
].map(slug => read(`src/app/(site)/servicios/${slug}/page.tsx`));

test('service pages use a quieter shared visual system', () => {
    const styles = read('src/app/globals.css');
    const hero = read('src/components/sections/Hero.tsx');
    const trustBar = read('src/components/sections/TrustBar.tsx');

    assert.match(styles, /\.service-journey \.section-badge\s*{[^}]*display:\s*none/s);
    assert.match(styles, /\.service-journey \.service-card\s*{[^}]*border-radius:\s*1rem/s);
    assert.match(styles, /\.service-journey \.service-card::before/);
    assert.match(styles, /\.service-journey \.trust-point-icon\s*{[^}]*display:\s*none/s);
    assert.match(hero, /hero-footer-shell/);
    assert.doesNotMatch(hero, /service-card service-card-compact service-cyan mx-auto max-w-5xl/);
    assert.match(trustBar, /trust-point-icon/);
});

test('service explanations use operational panels instead of decorative emoji scenes', () => {
    const resguardo = read('src/app/(site)/servicios/resguardo-aduanero/page.tsx');
    const consultoria = read('src/app/(site)/servicios/consultoria-aduanera/page.tsx');

    assert.match(resguardo, /service-operations-panel/);
    assert.doesNotMatch(resguardo, /text-9xl[^>]*>🛡️/);
    assert.doesNotMatch(resguardo, /SISTEMA ACTIVO/);
    assert.match(consultoria, /service-advisory-panel/);
    assert.doesNotMatch(consultoria, /text-8xl[^>]*>💡/);
    assert.doesNotMatch(consultoria, /Estrategia \+ Ahorro/);
});

test('the main navigation is compact, readable and keeps a clear mobile structure', () => {
    const header = read('src/components/layout/Header.tsx');

    assert.match(header, /aria-label="Navegación principal"/);
    assert.match(header, /site-mega-menu/);
    assert.match(header, /site-mega-link/);
    assert.match(header, /site-mobile-nav-group/);
    assert.match(header, /mobile-menu-panel/);
    assert.doesNotMatch(header, /Ruta rápida/);
    assert.doesNotMatch(header, /rounded-\[28px\]/);
    assert.match(header, /w-\[min\(800px,calc\(100vw-3rem\)\)\]/);
});

test('service pages keep their first view free from timed contact overlays', () => {
    const rules = read('src/components/layout/contactNudgeRules.ts');

    assert.match(rules, /normalized\.startsWith\('\/servicios'\)/);
});

test('each service detail removes noisy motion, fake ratings and oversized emoji artwork', () => {
    for (const page of detailPages) {
        assert.doesNotMatch(page, /animate-(?:bounce|pulse|ping)/);
        assert.doesNotMatch(page, /★★★★★/);
        assert.doesNotMatch(page, /text-(?:8xl|9xl)/);
        assert.doesNotMatch(page, /\{(?:item|mode|service|vehicle)\.icon\}/);
    }
});

test('distinct service explanations use informative visual panels', () => {
    const transport = detailPages[2];
    const resguardo = detailPages[3];
    const consulting = detailPages[4];

    assert.match(transport, /service-transport-panel/);
    assert.match(resguardo, /service-route-panel/);
    assert.match(consulting, /service-risk-panel/);
    assert.doesNotMatch(consulting, /certificaciones|Ahorro comprobado/i);
    assert.doesNotMatch(resguardo, /24\/7/);
});

test('customs brokerage copy sounds direct, human and specific', () => {
    const page = detailPages[0];

    assert.match(page, /Nos encargamos de tu despacho aduanero de principio a fin/);
    assert.match(page, /Cuéntanos qué estás importando o exportando/);
    assert.match(page, /Un ejecutivo sigue tu operación y te explica qué viene después/);
    assert.match(page, /¿Revisamos tu próxima operación\?/);
    assert.doesNotMatch(page, /precisión milimétrica|expertise|sin estrés|te lo garantizamos|como si fuera nuestra propia carga/i);
});
