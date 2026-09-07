import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

async function loadSender() {
    assert.ok(existsSync('src/lib/cloudflare-contact.ts'), 'Cloudflare contact sender must exist');
    const code = ts.transpile(readFileSync('src/lib/cloudflare-contact.ts', 'utf8'), { module: ts.ModuleKind.ESNext });
    return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const data = { nombre: 'Prueba', email: 'visitor@example.com', asunto: 'Consulta', mensaje: '<script>texto</script>', to: 'attacker@example.com' };
const config = { accountId: 'a'.repeat(32), token: 'test-only', from: 'formularios@aduanaspe.com' };
test('Cloudflare uses a fixed internal recipient, plain text and visitor reply-to', async () => {
    const { sendCloudflareContact } = await loadSender();
    let request;
    const result = await sendCloudflareContact(data, config, async (url, init) => {
        request = { url, ...init, payload: JSON.parse(init.body) };
        return Response.json({ success: true, result: { delivered: ['jean.ramos@perkel.com.pe'], queued: [], permanent_bounces: [] } });
    });
    assert.equal(result.success, true);
    assert.equal(request.payload.to, 'jean.ramos@perkel.com.pe');
    assert.equal(request.payload.replyTo, data.email);
    assert.equal(request.payload.html, undefined);
    assert.match(request.payload.text, /<script>texto/);
    assert.equal(request.headers.Authorization, 'Bearer test-only');
    assert.match(request.url, /^https:\/\/api.cloudflare.com\/client\/v4\/accounts\/[a-f0-9]{32}\/email\/sending\/send$/);
});
test('Cloudflare fails closed without configuration and handles API errors, bounces and timeouts', async () => {
    const { sendCloudflareContact } = await loadSender();
    assert.equal((await sendCloudflareContact(data, {}, async () => { throw new Error('must not fetch'); })).success, false);
    for (const response of [
        { success: false, errors: [{ code: 10102 }] },
        { success: true, result: { permanent_bounces: ['jean.ramos@perkel.com.pe'] } },
        { success: true, result: {} },
    ]) {
        assert.equal((await sendCloudflareContact(data, config, async () => Response.json(response))).success, false);
    }
    assert.equal((await sendCloudflareContact(data, config, async () => { throw new Error('timeout'); })).success, false);
    assert.equal((await sendCloudflareContact(data, config, async () => Response.json({ success: true, result: { queued: ['jean.ramos@perkel.com.pe'] } }))).success, true);
});
test('only Contacto uses Cloudflare and does not send automatic confirmation mail', () => {
    const source = readFileSync('src/app/api/forms/route.ts', 'utf8');
    assert.match(source, /formType === 'contacto'\s*\? await sendCloudflareContact/);
    assert.match(source, /formType !== 'contacto' &&/);
    assert.match(source, /body\.data\?\.website/);
});
