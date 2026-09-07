import type { ContactoData } from './schemas';

// Server-side only: never import this module into a client component.
const RECIPIENT = 'jean.ramos@perkel.com.pe';
type Config = { accountId?: string; token?: string; from?: string; secret?: string };
type Result = { success: boolean; error?: string };

export async function sendCloudflareContact(
    data: ContactoData,
    config: Config = {
        secret: process.env.CLOUDFLARE_CONTACT_SECRET,
    },
    transport: typeof fetch = fetch,
): Promise<Result> {
    if (config.secret && config.secret.length >= 32) {
        try {
            const response = await transport('https://aduanaspe-contacto.infra-ramoscc.workers.dev/', {
                method: 'POST',
                headers: { Authorization: `Bearer ${config.secret}`, 'Content-Type': 'application/json' },
                signal: AbortSignal.timeout(15000),
                body: JSON.stringify({ nombre: data.nombre, email: data.email, asunto: data.asunto, mensaje: data.mensaje }),
            });
            const body = await response.json();
            return response.ok && body.success === true
                ? { success: true }
                : { success: false, error: `Cloudflare Worker: HTTP ${response.status}` };
        } catch {
            return { success: false, error: 'Cloudflare Worker: fallo de conexión o tiempo de espera agotado' };
        }
    }
    if (!config.accountId || !/^[a-f0-9]{32}$/i.test(config.accountId) || !config.token ||
        !config.from || !/^[^\s@<>]+@aduanaspe\.com$/.test(config.from)) {
        return { success: false, error: 'Cloudflare: falta configurar cuenta, token o remitente de AduanasPE' };
    }
    try {
        const response = await transport(
            `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/email/sending/send`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
                signal: AbortSignal.timeout(15000),
                body: JSON.stringify({
                    from: config.from,
                    to: RECIPIENT,
                    replyTo: data.email,
                    subject: '[AduanasPE] Nueva consulta del formulario',
                    text: `Nombre: ${data.nombre}\nCorreo: ${data.email}\nAsunto: ${data.asunto}\n\n${data.mensaje}`,
                }),
            },
        );
        const body = await response.json();
        if (!response.ok || body.success !== true) {
            const codes = Array.isArray(body.errors)
                ? body.errors.map((e: { code?: unknown }) => typeof e.code === 'number' ? e.code : 'unknown').join(',')
                : 'unknown';
            return { success: false, error: `Cloudflare: HTTP ${response.status}; códigos ${codes}` };
        }
        if (body.result?.permanent_bounces?.includes(RECIPIENT)) {
            return { success: false, error: 'Cloudflare: el destinatario rechazó el correo' };
        }
        if (body.result?.delivered?.includes(RECIPIENT) || body.result?.queued?.includes(RECIPIENT)) {
            return { success: true };
        }
        return { success: false, error: 'Cloudflare: no confirmó la aceptación del correo' };
    } catch {
        // Do not log credentials, visitor data or provider responses containing personal data.
        return { success: false, error: 'Cloudflare: fallo de conexión o tiempo de espera agotado' };
    }
}
