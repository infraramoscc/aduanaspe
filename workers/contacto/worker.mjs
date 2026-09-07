// Paste this entire file into Cloudflare's worker.js editor.
// Binding: SEND_EMAIL. Secret: CONTACT_SECRET (at least 32 random characters).
const reply = (status, success) => Response.json({ success }, { status, headers: { 'Cache-Control': 'no-store' } });

export default {
    async fetch(request, env) {
        if (request.method !== 'POST') return reply(405, false);
        if (!env.CONTACT_SECRET || env.CONTACT_SECRET.length < 32 || !env.SEND_EMAIL) return reply(503, false);
        if (request.headers.get('Authorization') !== `Bearer ${env.CONTACT_SECRET}`) return reply(401, false);
        if (!request.headers.get('Content-Type')?.includes('application/json')) return reply(415, false);

        // Bound the body while reading, including requests without Content-Length.
        let data;
        try {
            const reader = request.body?.getReader();
            if (!reader) return reply(400, false);
            const decoder = new TextDecoder();
            let text = '';
            let bytes = 0;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                bytes += value.byteLength;
                if (bytes > 16000) {
                    await reader.cancel();
                    return reply(413, false);
                }
                text += decoder.decode(value, { stream: true });
            }
            data = JSON.parse(text + decoder.decode());
        } catch {
            return reply(400, false);
        }
        if (!data || typeof data !== 'object' || data.website) return reply(400, false);
        for (const [field, min, max] of [['nombre', 2, 200], ['asunto', 3, 300], ['mensaje', 10, 10000]]) {
            if (typeof data[field] !== 'string' || data[field].length < min || data[field].length > max) return reply(400, false);
        }
        if (typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) return reply(400, false);

        try {
            await env.SEND_EMAIL.send({
                from: 'formularios@aduanaspe.com',
                to: 'jean.ramos@perkel.com.pe',
                replyTo: data.email,
                subject: '[AduanasPE] Nueva consulta del formulario',
                text: `Nombre: ${data.nombre}\nCorreo: ${data.email}\nAsunto: ${data.asunto}\n\n${data.mensaje}`,
            });
            return reply(200, true);
        } catch (error) {
            // Log only a short provider code, never the message or submitted data.
            const code = typeof error?.code === 'string' && /^E_[A-Z_]+$/.test(error.code) ? error.code : 'EMAIL_FAILED';
            console.error('Contact delivery failed:', code);
            return reply(502, false);
        }
    },
};
