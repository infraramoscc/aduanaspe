import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('contact fields declare the same minimum lengths as the server', () => {
    const source = readFileSync('src/components/forms/ContactoForm.tsx', 'utf8');
    for (const [field, min] of [['nombre', 2], ['asunto', 3], ['mensaje', 10]]) {
        assert.match(source, new RegExp(`id="${field}"[^>]*minLength=\\{${min}\\}`));
    }
    assert.match(source, /Mínimo 10 caracteres/);
});

test('contact validates before fetch and displays the validation reason', () => {
    const source = readFileSync('src/components/forms/ContactoForm.tsx', 'utf8');
    assert.match(source, /contactoSchema.safeParse\(data\)/);
    assert.ok(source.indexOf('contactoSchema.safeParse(data)') < source.indexOf('await fetch('));
    assert.match(source, /errorMessage=\{submitError\}/);
    assert.match(source, /response.status === 400/);
    const base = readFileSync('src/components/forms/FormBase.tsx', 'utf8');
    assert.match(base, /role="alert"/);
});
