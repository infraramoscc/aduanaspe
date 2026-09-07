import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = path => readFileSync(path, 'utf8');
test('public contact surfaces do not publish an email address', () => {
    for (const path of ['src/app/(site)/contacto/page.tsx', 'src/components/layout/Footer.tsx', 'src/components/forms/ContactoForm.tsx', 'src/lib/schema.ts']) {
        assert.doesNotMatch(read(path), /info@aduanaspe\.com|perkel\.com\.pe|mailto:/, path);
    }
});

test('contact notifications reach the internal inbox and report delivery errors', async () => {
    const source = read('src/lib/email.ts').replace("import { Resend } from 'resend';", `class Resend { emails = { send: async (payload) => { globalThis.__contactPayload = payload; return { error: globalThis.__contactError }; } }; }`);
    const previous = process.env.RESEND_API_KEY;
    process.env.RESEND_API_KEY = 'test-only';
    try {
        const code = ts.transpile(source, { module: ts.ModuleKind.ESNext });
        const { sendNotificationEmail } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
        const data = { nombre: 'Prueba', email: 'visitor@example.com', asunto: 'Consulta', mensaje: 'Prueba sin envío real' };
        assert.equal((await sendNotificationEmail('contacto', data)).success, true);
        assert.equal(globalThis.__contactPayload.to, 'jean.ramos@perkel.com.pe');
        assert.equal(globalThis.__contactPayload.replyTo, data.email);
        globalThis.__contactError = { message: 'Rejected' };
        assert.equal((await sendNotificationEmail('contacto', data)).success, false);
    } finally {
        if (previous === undefined) delete process.env.RESEND_API_KEY;
        else process.env.RESEND_API_KEY = previous;
        delete globalThis.__contactPayload;
        delete globalThis.__contactError;
    }
});

test('the endpoint stops before confirmation when notification fails', () => {
    const source = read('src/app/api/forms/route.ts');
    assert.match(source, /if \(!notificationResult.success\) \{[\s\S]*?return NextResponse.json\([\s\S]*?status: 502/);
});
