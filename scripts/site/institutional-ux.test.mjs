import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = path => readFileSync(path, 'utf8');
test('home offers a learning path before the services catalogue', () => {
    const page = read('src/app/(site)/page.tsx');
    assert.match(page, /href="#empieza-aqui"/);
    assert.match(page, /id="empieza-aqui"/);
    for (const destination of ['importacion', 'exportacion', 'acuerdosComerciales']) {
        assert.match(page, new RegExp(`href=\\{ROUTES.comercioExterior.${destination}\\}`));
    }
    assert.ok(page.indexOf('id="empieza-aqui"') < page.indexOf('items={services}'));
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
    assert.equal(shouldEnableContactNudge('/servicios/'), true, 'Other groups stay unchanged');
});
