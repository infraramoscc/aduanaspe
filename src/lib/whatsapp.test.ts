import assert from 'node:assert/strict';

import { getWhatsAppUrl } from './whatsapp.ts';

function getPrefilledMessage(messageKey: string): string {
    const url = new URL(getWhatsAppUrl(messageKey));
    return url.searchParams.get('text') || '';
}

assert.equal(getPrefilledMessage('general'), 'Hola, tengo la siguiente consulta:');
assert.equal(
    getPrefilledMessage('aduanas'),
    'Hola, tengo una consulta sobre despacho aduanero:'
);
assert.equal(
    getPrefilledMessage('carga'),
    'Hola, quisiera consultar sobre una carga internacional:'
);
assert.equal(
    getPrefilledMessage('transporte'),
    'Hola, tengo una consulta sobre transporte de carga:'
);
assert.equal(
    getPrefilledMessage('resguardo'),
    'Hola, quisiera consultar sobre resguardo para una operación:'
);
assert.equal(getPrefilledMessage('consultoria'), 'Hola, tengo una consulta aduanera:');
assert.equal(getPrefilledMessage('contacto'), 'Hola, quisiera hacer una consulta:');
assert.equal(
    getPrefilledMessage('asesoria_gratis'),
    'Hola, quisiera recibir orientación sobre mi caso:'
);
assert.equal(
    getPrefilledMessage('ads_primera_importacion'),
    'Hola, quiero consultar sobre mi primera importación:'
);
