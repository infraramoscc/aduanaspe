import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(path, 'utf8');

test('home leads with evaluation, proof, and buyer situations', () => {
    const page = read('src/app/(site)/page.tsx');

    assert.match(page, /Flete, aduanas y entrega local coordinados para tu operación en Perú/);
    assert.match(page, /href="#evaluar"/);
    assert.match(page, /Evaluar mi operación/);
    assert.match(page, /id="confianza"/);
    assert.match(page, /Transparencia operativa/);
    assert.match(page, /¿Qué necesitas resolver\?/);

    for (const situation of [
        'Estoy planificando',
        'Ya tengo proveedor',
        'Mi carga está en camino',
        'Tengo una observación de SUNAT',
    ]) {
        assert.match(page, new RegExp(situation));
    }

    assert.ok(page.indexOf('id="confianza"') < page.indexOf('id="servicios"'));
    assert.ok(page.indexOf('id="evaluar"') < page.indexOf('href={ROUTES.blog}'));
});

test('home qualification form captures commercial context without changing service forms', () => {
    const page = read('src/app/(site)/page.tsx');
    const form = read('src/components/forms/PrecotizacionForm.tsx');
    const schemas = read('src/lib/schemas.ts');
    const base = read('src/components/forms/FormBase.tsx');

    assert.match(page, /<PrecotizacionForm/);
    assert.match(page, /variant="home"/);
    assert.match(form, /variant\?: 'default' \| 'home'/);
    assert.match(form, /name="necesidad"/);
    assert.match(form, /name="etapa"/);
    assert.match(form, /name="mercancia"/);
    assert.match(form, /name="peso_volumen"/);
    assert.match(form, /name="fecha_estimada"/);
    assert.match(schemas, /necesidad: z\.enum/);
    assert.match(schemas, /etapa: z\.enum/);
    assert.match(base, /submitLabel\?: string/);
    assert.match(form, /submitLabel=\{variant === 'home' \? 'Enviar datos para evaluación'/);
});

test('mobile header keeps the commercial action without consuming the first viewport', () => {
    const header = read('src/components/layout/Header.tsx');
    const layout = read('src/app/(site)/layout.tsx');
    const ga4 = read('src/components/tracking/ga4.ts');

    assert.match(header, /hidden border-b[^\n]+sm:block/);
    assert.match(header, /Evaluar operación/);
    assert.match(header, /href="\/#evaluar"/);
    assert.match(layout, /pt-16 sm:pt-\[108px\]/);
    assert.match(ga4, /CLICK_CTA_TO_PRECOTIZACION/);
});
