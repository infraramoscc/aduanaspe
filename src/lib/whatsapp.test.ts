import assert from 'node:assert/strict';

import { getWhatsAppUrl } from './whatsapp.ts';

function getPrefilledMessage(messageKey: string): string {
    const url = new URL(getWhatsAppUrl(messageKey));
    return url.searchParams.get('text') || '';
}

assert.equal(getPrefilledMessage('general'), 'Hola, Jean Ramos. Tengo la siguiente consulta:');
assert.equal(
    getPrefilledMessage('aduanas'),
    'Hola, Jean Ramos. Tengo una consulta sobre despacho aduanero:'
);
assert.equal(
    getPrefilledMessage('carga'),
    'Hola, Jean Ramos. Quisiera consultar sobre una carga internacional:'
);
assert.equal(
    getPrefilledMessage('transporte'),
    'Hola, Jean Ramos. Tengo una consulta sobre transporte de carga:'
);
assert.equal(
    getPrefilledMessage('resguardo'),
    'Hola, Jean Ramos. Quisiera consultar sobre resguardo para una operación:'
);
assert.equal(getPrefilledMessage('consultoria'), 'Hola, Jean Ramos. Tengo una consulta aduanera:');
assert.equal(getPrefilledMessage('contacto'), 'Hola, Jean Ramos. Quisiera hacer una consulta:');
assert.equal(
    getPrefilledMessage('asesoria_gratis'),
    'Hola, Jean Ramos. Quisiera recibir orientación sobre mi caso:'
);
assert.equal(
    getPrefilledMessage('ads_primera_importacion'),
    'Hola, Jean Ramos. Quiero consultar sobre mi primera importación:'
);

const customMessageBody = 'Quisiera cotizar un envío aéreo.\n\nMercancía:\nOrigen y destino:';
const customUrl = new URL(getWhatsAppUrl('aereo', '51912345678', customMessageBody));
assert.equal(customUrl.pathname, '/51912345678');
assert.equal(customUrl.searchParams.get('text'), `Hola, Jean Ramos. ${customMessageBody}`);
