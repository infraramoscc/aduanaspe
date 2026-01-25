/**
 * WhatsApp Business Configuration
 * Mensajes prellenados por servicio
 */

// Número de WhatsApp Business (sin el +)
export const WHATSAPP_NUMBER = '51963461006';

// Mensajes prellenados por servicio
export const WHATSAPP_MESSAGES: Record<string, string> = {
    // Servicios principales
    aduanas: `Hola, estoy interesado en el servicio de *Agenciamiento de Aduanas*.

Me gustaría recibir información sobre:
• Requisitos para nacionalizar mi carga
• Tiempos de despacho
• Documentación necesaria

¿Podrían orientarme?`,

    carga: `Hola, estoy interesado en el servicio de *Agencia de Carga Internacional*.

Necesito cotización para:
• Origen: 
• Destino: 
• Tipo de carga: 
• Peso/Volumen aproximado: 

¿Podrían ayudarme?`,

    transporte: `Hola, estoy interesado en el servicio de *Transporte de Carga*.

Necesito trasladar mercancía:
• Desde: Puerto/Aeropuerto
• Hasta: 
• Tipo de carga: 
• Fecha aproximada: 

¿Podrían cotizarme?`,

    resguardo: `Hola, estoy interesado en el servicio de *Resguardo Aduanero*.

Necesito custodia para:
• Tipo de mercancía: 
• Ruta: 
• Valor aproximado: 

¿Pueden brindarme información?`,

    consultoria: `Hola, estoy interesado en el servicio de *Consultoría Aduanera*.

Me gustaría asesoría sobre:
• Clasificación arancelaria
• Tratados de libre comercio
• Regímenes aduaneros
• Otro: 

¿Podemos agendar una consulta?`,

    // Mensaje general
    general: `Hola, me contacto desde su sitio web *AduanasPE*.

Me interesa recibir información sobre sus servicios de comercio exterior.

¿Podrían orientarme?`,

    // Mensaje de contacto rápido
    contacto: `Hola, me contacto desde su sitio web *AduanasPE*.

¿Podrían ayudarme con una consulta?`,
};

// Generar URL de WhatsApp
export function getWhatsAppUrl(messageKey: string = 'general'): string {
    const message = WHATSAPP_MESSAGES[messageKey] || WHATSAPP_MESSAGES.general;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Mapeo de slugs de servicios a keys de mensajes
export const SERVICE_TO_MESSAGE_KEY: Record<string, string> = {
    'agenciamiento-aduanas': 'aduanas',
    'agencia-de-carga-internacional': 'carga',
    'transporte-de-carga': 'transporte',
    'resguardo-aduanero': 'resguardo',
    'consultoria-aduanera': 'consultoria',
};
