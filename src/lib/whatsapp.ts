/**
 * WhatsApp Business Configuration
 * Mensajes prellenados por servicio
 */

// Número de WhatsApp Business (sin el +)
export const WHATSAPP_NUMBER = '51944785974';

// Configuración del router de WhatsApp (futuro: wa.aduanaspe.com)
// Cambiar a true cuando el subdominio esté configurado
export const USE_WA_SUBDOMAIN = false;
export const WA_SUBDOMAIN_URL = 'https://wa.aduanaspe.com';

const WHATSAPP_MESSAGE_BODIES: Record<string, string> = {
    aduanas: 'Tengo una consulta sobre despacho aduanero:',
    carga: 'Quisiera consultar sobre una carga internacional:',
    transporte: 'Tengo una consulta sobre transporte de carga:',
    resguardo: 'Quisiera consultar sobre resguardo para una operación:',
    consultoria: 'Tengo una consulta aduanera:',
    general: 'Tengo la siguiente consulta:',
    contacto: 'Quisiera hacer una consulta:',
    asesoria_gratis: 'Quisiera recibir orientación sobre mi caso:',
    ads_primera_importacion: 'Quiero consultar sobre mi primera importación:',
};

// Generar URL de WhatsApp
// Cuando USE_WA_SUBDOMAIN sea true, usará wa.aduanaspe.com/[key]
// Mientras tanto, usa wa.me con mensaje prellenado
export function getWhatsAppUrl(messageKey: string = 'general', customNumber?: string, customMessageBody?: string): string {
    // Si el subdominio está activo y no hay número personalizado, usar URLs cortas
    if (USE_WA_SUBDOMAIN && !customNumber && !customMessageBody) {
        return `${WA_SUBDOMAIN_URL}/${messageKey}`;
    }

    // Usar wa.me con mensaje prellenado
    const body = customMessageBody || WHATSAPP_MESSAGE_BODIES[messageKey] || WHATSAPP_MESSAGE_BODIES.general;
    const encodedMessage = encodeURIComponent(`Hola, Jean Ramos. ${body}`);
    const targetNumber = customNumber || WHATSAPP_NUMBER;
    return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}

// Mapeo de slugs de servicios a keys de mensajes
export const SERVICE_TO_MESSAGE_KEY: Record<string, string> = {
    'agenciamiento-aduanas': 'aduanas',
    'agencia-de-carga-internacional': 'carga',
    'transporte-de-carga': 'transporte',
    'resguardo-aduanero': 'resguardo',
    'consultoria-aduanera': 'consultoria',
};
