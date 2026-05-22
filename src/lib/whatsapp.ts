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

// Mensajes prellenados por servicio
export const WHATSAPP_MESSAGES: Record<string, string> = {
    // Servicios principales
    aduanas: 'Hola, tengo una consulta sobre despacho aduanero:',

    carga: 'Hola, quisiera consultar sobre una carga internacional:',

    transporte: 'Hola, tengo una consulta sobre transporte de carga:',

    resguardo: 'Hola, quisiera consultar sobre resguardo para una operación:',

    consultoria: 'Hola, tengo una consulta aduanera:',

    // Mensaje general
    general: 'Hola, tengo la siguiente consulta:',

    // Mensaje de contacto rápido
    contacto: 'Hola, quisiera hacer una consulta:',

    asesoria_gratis: 'Hola, quisiera recibir orientación sobre mi caso:',

    // Mensaje para Campañas Ads
    ads_primera_importacion: 'Hola, quiero consultar sobre mi primera importación:',
};

// Generar URL de WhatsApp
// Cuando USE_WA_SUBDOMAIN sea true, usará wa.aduanaspe.com/[key]
// Mientras tanto, usa wa.me con mensaje prellenado
export function getWhatsAppUrl(messageKey: string = 'general', customNumber?: string): string {
    // Si el subdominio está activo y no hay número personalizado, usar URLs cortas
    if (USE_WA_SUBDOMAIN && !customNumber) {
        return `${WA_SUBDOMAIN_URL}/${messageKey}`;
    }

    // Usar wa.me con mensaje prellenado
    const message = WHATSAPP_MESSAGES[messageKey] || WHATSAPP_MESSAGES.general;
    const encodedMessage = encodeURIComponent(message);
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
