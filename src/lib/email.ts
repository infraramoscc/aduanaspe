import { Resend } from 'resend';
import type { DiagnosticoData, PrecotizacionData, ContactoData } from './schemas';

// Inicializar Resend (usa API key de env o modo mock)
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const EMAIL_TO = process.env.EMAIL_TO || 'contacto@aduanaspe.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

type FormType = 'diagnostico' | 'precotizacion' | 'contacto';
type FormData = DiagnosticoData | PrecotizacionData | ContactoData;

interface EmailResult {
    success: boolean;
    error?: string;
}

// Mapeo de tipos de formulario a nombres legibles
const formTypeLabels: Record<FormType, string> = {
    diagnostico: 'Diagnóstico de Comercio Exterior',
    precotizacion: 'Solicitud de Pre-cotización',
    contacto: 'Mensaje de Contacto',
};

// Generar HTML para el email de notificación interna
function generateNotificationHtml(formType: FormType, data: FormData): string {
    const fields = Object.entries(data)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${key}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`)
        .join('');

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7C3AED, #D946EF); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">AduanasPE</h1>
            </div>
            <div style="padding: 20px; background: #f9f9f9;">
                <h2 style="color: #1F2937;">Nuevo ${formTypeLabels[formType]}</h2>
                <p style="color: #666;">Se ha recibido un nuevo formulario desde el sitio web.</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    ${fields}
                </table>
            </div>
            <div style="padding: 15px; background: #1F2937; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">Este email fue enviado automáticamente desde aduanaspe.com</p>
            </div>
        </div>
    `;
}

// Generar HTML para el email de confirmación al usuario
function generateConfirmationHtml(formType: FormType, nombre: string): string {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7C3AED, #D946EF); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">AduanasPE</h1>
            </div>
            <div style="padding: 30px; background: white;">
                <h2 style="color: #1F2937;">¡Hola ${nombre}!</h2>
                <p style="color: #666; line-height: 1.6;">
                    Hemos recibido tu ${formTypeLabels[formType].toLowerCase()}. 
                    Nuestro equipo lo revisará y te contactaremos en las próximas 24 horas hábiles.
                </p>
                <p style="color: #666; line-height: 1.6;">
                    Si tienes alguna consulta urgente, puedes contactarnos por WhatsApp.
                </p>
                <div style="margin-top: 30px; text-align: center;">
                    <a href="https://wa.me/51999999999" style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                        Escribir por WhatsApp
                    </a>
                </div>
            </div>
            <div style="padding: 15px; background: #1F2937; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">© 2026 AduanasPE - Comercio Exterior</p>
            </div>
        </div>
    `;
}

// Enviar email de notificación al equipo
export async function sendNotificationEmail(
    formType: FormType,
    data: FormData
): Promise<EmailResult> {
    const subject = `[Web] Nuevo ${formTypeLabels[formType]}`;
    const html = generateNotificationHtml(formType, data);

    // Modo desarrollo sin API key
    if (!resend) {
        console.log('📧 [DEV] Email de notificación:');
        console.log('   To:', EMAIL_TO);
        console.log('   Subject:', subject);
        console.log('   Data:', data);
        return { success: true };
    }

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error('Error enviando email de notificación:', error);
        return { success: false, error: 'Error al enviar notificación' };
    }
}

// Enviar email de confirmación al usuario
export async function sendConfirmationEmail(
    formType: FormType,
    email: string,
    nombre: string
): Promise<EmailResult> {
    const subject = 'Hemos recibido tu mensaje - AduanasPE';
    const html = generateConfirmationHtml(formType, nombre);

    // Modo desarrollo sin API key
    if (!resend) {
        console.log('📧 [DEV] Email de confirmación:');
        console.log('   To:', email);
        console.log('   Subject:', subject);
        return { success: true };
    }

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: email,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error('Error enviando email de confirmación:', error);
        // No fallamos si el email de confirmación falla
        return { success: false, error: 'Error al enviar confirmación' };
    }
}
