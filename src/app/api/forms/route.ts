import { NextRequest, NextResponse } from 'next/server';
import { formRequestSchema } from '@/lib/schemas';
import { sendNotificationEmail, sendConfirmationEmail } from '@/lib/email';
import { sendCloudflareContact } from '@/lib/cloudflare-contact';

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text();
        if (rawBody.length > 16000) {
            return NextResponse.json({ success: false, error: 'La consulta es demasiado extensa.' }, { status: 413 });
        }
        const body = JSON.parse(rawBody);
        if (body?.formType === 'contacto') {
            const origin = request.headers.get('origin');
            if (origin && origin !== request.nextUrl.origin && origin !== 'https://aduanaspe.com' && origin !== 'https://www.aduanaspe.com') {
                return NextResponse.json({ success: false, error: 'Origen no permitido.' }, { status: 403 });
            }
            // Honeypot: reject bot submissions without sending any email.
            if (body.data?.website) {
                return NextResponse.json({ success: false, error: 'No pudimos procesar la consulta.' }, { status: 400 });
            }
        }

        // Validar request con Zod
        const parseResult = formRequestSchema.safeParse(body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map((e: { message: string }) => e.message);
            return NextResponse.json(
                { success: false, error: 'Datos inválidos', details: errors },
                { status: 400 }
            );
        }

        const { formType, data } = parseResult.data;

        // Enviar email de notificación al equipo
        const notificationResult = formType === 'contacto'
            ? await sendCloudflareContact(data)
            : await sendNotificationEmail(formType, data);

        if (!notificationResult.success) {
            console.error('Error en notificación:', notificationResult.error);
            return NextResponse.json(
                { success: false, error: 'No pudimos enviar tu consulta. Intenta de nuevo o contáctanos por WhatsApp.' },
                { status: 502 }
            );
        }

        // Enviar email de confirmación al usuario
        if (formType !== 'contacto' && 'email' in data && 'nombre' in data) {
            await sendConfirmationEmail(formType, data.email, data.nombre);
        }

        return NextResponse.json({
            success: true,
            message: 'Formulario enviado correctamente',
        });

    } catch (error) {
        console.error('Error procesando formulario:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
