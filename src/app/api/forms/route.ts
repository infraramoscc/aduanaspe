import { NextRequest, NextResponse } from 'next/server';
import { formRequestSchema } from '@/lib/schemas';
import { sendNotificationEmail, sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

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
        const notificationResult = await sendNotificationEmail(formType, data);

        if (!notificationResult.success) {
            console.error('Error en notificación:', notificationResult.error);
            // Continuamos aunque falle la notificación interna
        }

        // Enviar email de confirmación al usuario
        if ('email' in data && 'nombre' in data) {
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
