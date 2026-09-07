import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';
import test from 'node:test';

test('server calls the Worker with private credentials when configured', async () => {
    const code = ts.transpile(readFileSync('src/lib/cloudflare-contact.ts', 'utf8'), { module: ts.ModuleKind.ESNext });
    const { sendCloudflareContact } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
    const secret = 'test-secret-'.repeat(4);
    let sent;
    const result = await sendCloudflareContact({ nombre: 'Prueba', email: 'visitor@example.com', asunto: 'Consulta', mensaje: 'Consulta de prueba' }, { secret }, async (url, init) => {
        sent = { url, ...init };
        return Response.json({ success: true });
    });
    assert.equal(result.success, true);
    assert.equal(sent.url, 'https://aduanaspe-contacto.infra-ramoscc.workers.dev/');
    assert.equal(sent.headers.Authorization, `Bearer ${secret}`);
});

test('Worker requires a secret, validates input and fixes the recipient', async () => {
    assert.ok(existsSync('workers/contacto/worker.mjs'), 'Worker implementation required');
    const { default: worker } = await import('../../workers/contacto/worker.mjs');
    const secret = 'test-only-'.repeat(5);
    const data = { nombre: 'Prueba', email: 'visitor@example.com', asunto: 'Consulta', mensaje: 'Consulta de prueba', to: 'attacker@example.com' };
    const req = (payload = data, key = secret) => new Request('https://worker.test/', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    let sent;
    const env = { CONTACT_SECRET: secret, SEND_EMAIL: { send: async payload => { sent = payload; } } };
    assert.equal((await worker.fetch(req(), {})).status, 503);
    assert.equal((await worker.fetch(req(data, 'wrong'), env)).status, 401);
    assert.equal((await worker.fetch(new Request('https://worker.test/'), env)).status, 405);
    assert.equal((await worker.fetch(req({ ...data, mensaje: 'short' }), env)).status, 400);
    assert.equal(sent, undefined);
    assert.equal((await worker.fetch(req(), env)).status, 200);
    assert.equal(sent.to, 'jean.ramos@perkel.com.pe');
    assert.equal(sent.replyTo, data.email);
    assert.equal(sent.html, undefined);
    env.SEND_EMAIL.send = async () => { throw new Error('private detail'); };
    const failed = await worker.fetch(req(), env);
    assert.equal(failed.status, 502);
    assert.doesNotMatch(await failed.text(), /private detail/);
});
