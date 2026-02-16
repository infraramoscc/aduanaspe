/**
 * Blog System - Topic to Service Mapping
 * Maps blog topics to services for lead generation
 */

import type { BlogTopic, LeadTemperature } from './types';

export interface TopicServiceMapping {
    topic: BlogTopic;
    label: string;
    primaryService: string;
    secondaryServices: string[];
    temperature: LeadTemperature;
    ctaStrategy: 'soft' | 'medium' | 'aggressive';
    keywords: string[];
}

export const topicMappings: TopicServiceMapping[] = [
    {
        topic: 'agenciamiento-aduanas',
        label: 'Agenciamiento de Aduanas',
        primaryService: 'agenciamiento-aduanas',
        secondaryServices: ['consultoria-aduanera'],
        temperature: 'tibio',
        ctaStrategy: 'medium',
        keywords: [
            'aduana', 'aduanas', 'agente de aduanas', 'despachador',
            'declaración aduanera', 'trámite aduanero', 'levante',
            'canal rojo', 'canal verde', 'canal naranja', 'DUA',
        ],
    },
    {
        topic: 'clasificacion-arancelaria',
        label: 'Clasificación Arancelaria',
        primaryService: 'consultoria-aduanera',
        secondaryServices: ['agenciamiento-aduanas'],
        temperature: 'caliente',
        ctaStrategy: 'aggressive',
        keywords: [
            'clasificación arancelaria', 'partida arancelaria', 'subpartida',
            'NANDINA', 'arancel', 'código arancelario', 'tributos',
            'impuestos importación', 'IGV', 'ad valorem',
        ],
    },
    {
        topic: 'agencia-carga',
        label: 'Agencia de Carga',
        primaryService: 'agencia-de-carga-internacional',
        secondaryServices: ['transporte-de-carga', 'agenciamiento-aduanas'],
        temperature: 'tibio',
        ctaStrategy: 'medium',
        keywords: [
            'agencia de carga', 'freight forwarder', 'IATA', 'FIATA',
            'consolidación', 'flete marítimo', 'flete aéreo',
            'booking', 'bill of lading', 'B/L', 'AWB',
        ],
    },
    {
        topic: 'transporte',
        label: 'Transporte de Carga',
        primaryService: 'transporte-de-carga',
        secondaryServices: ['resguardo-aduanero', 'agenciamiento-aduanas'],
        temperature: 'tibio',
        ctaStrategy: 'medium',
        keywords: [
            'transporte de carga', 'transporte terrestre', 'camión',
            'furgón', 'contenedor', 'inland', 'delivery',
            'almacén', 'puerto', 'aeropuerto',
        ],
    },
    {
        topic: 'resguardo',
        label: 'Resguardo Aduanero',
        primaryService: 'resguardo-aduanero',
        secondaryServices: ['transporte-de-carga'],
        temperature: 'tibio',
        ctaStrategy: 'medium',
        keywords: [
            'almacén', 'resguardo', 'almacenamiento', 'deposito',
            'warehousing', 'inventario', 'custodia',
        ],
    },
    {
        topic: 'consultoria',
        label: 'Consultoría Aduanera',
        primaryService: 'consultoria-aduanera',
        secondaryServices: ['agenciamiento-aduanas'],
        temperature: 'caliente',
        ctaStrategy: 'aggressive',
        keywords: [
            'fiscalización', 'multa', 'sanción', 'observación SUNAT',
            'carga detenida', 'incautación', 'régimen aduanero',
            'drawback', 'reposición', 'admisión temporal',
            'mandato electrónico', 'acreditación',
        ],
    },
    {
        topic: 'importacion',
        label: 'Importación',
        primaryService: 'agenciamiento-aduanas',
        secondaryServices: ['agencia-de-carga-internacional', 'consultoria-aduanera'],
        temperature: 'frio',
        ctaStrategy: 'soft',
        keywords: [
            'importar', 'importación', 'compra internacional',
            'china', 'usa', 'europa', 'proveedor extranjero',
        ],
    },
    {
        topic: 'exportacion',
        label: 'Exportación',
        primaryService: 'agenciamiento-aduanas',
        secondaryServices: ['agencia-de-carga-internacional'],
        temperature: 'frio',
        ctaStrategy: 'soft',
        keywords: [
            'exportar', 'exportación', 'venta internacional',
            'notificación de salida', 'FOB', 'CIF',
        ],
    },
    {
        topic: 'courier-vs-carga',
        label: 'Courier vs Carga',
        primaryService: 'agencia-de-carga-internacional',
        secondaryServices: ['consultoria-aduanera'],
        temperature: 'tibio',
        ctaStrategy: 'medium',
        keywords: [
            'courier', 'DHL', 'FedEx', 'UPS', 'mensajería internacional',
            'envío rápido', 'paquete', 'carga consolidada',
        ],
    },
    {
        topic: 'fiscalizacion',
        label: 'Fiscalización',
        primaryService: 'consultoria-aduanera',
        secondaryServices: ['agenciamiento-aduanas'],
        temperature: 'caliente',
        ctaStrategy: 'aggressive',
        keywords: [
            'fiscalización', 'SUNAT', 'auditoría', 'multa',
            'infracción', 'sanción', 'apelación', 'reclamación',
        ],
    },
    {
        topic: 'comercio-exterior',
        label: 'Comercio Exterior',
        primaryService: 'agenciamiento-aduanas',
        secondaryServices: ['agencia-de-carga-internacional', 'consultoria-aduanera'],
        temperature: 'frio',
        ctaStrategy: 'soft',
        keywords: [
            'comercio exterior', 'comercio internacional', 'cadena de suministro',
            'supply chain', 'logística', 'operador logístico',
        ],
    },
];

/**
 * Detect topic from text content and tags using keyword matching.
 */
export function detectTopicFromContent(
    title: string,
    body: string,
    tags: string[],
): BlogTopic | null {
    const fullText = `${title} ${body} ${tags.join(' ')}`.toLowerCase();

    let bestMatch: { topic: BlogTopic; score: number } | null = null;

    for (const mapping of topicMappings) {
        const matchCount = mapping.keywords.filter((kw) =>
            fullText.includes(kw.toLowerCase()),
        ).length;

        if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.score)) {
            bestMatch = { topic: mapping.topic, score: matchCount };
        }
    }

    return bestMatch?.topic ?? null;
}

/**
 * Get the mapping configuration for a given topic.
 */
export function getTopicMapping(topic: BlogTopic): TopicServiceMapping | undefined {
    return topicMappings.find((m) => m.topic === topic);
}

/**
 * Get all available topic labels for filtering UI.
 */
export function getAllTopicLabels(): { value: BlogTopic; label: string }[] {
    return topicMappings.map((m) => ({ value: m.topic, label: m.label }));
}
