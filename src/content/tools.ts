export type ToolCategorySlug = 'costos-tributos' | 'logistica-tarifarios' | 'normativa-cumplimiento';

export interface ToolCategory {
    slug: ToolCategorySlug;
    label: string;
    eyebrow: string;
    description: string;
    accent: 'indigo' | 'cyan' | 'coral';
}

export interface ToolPreview {
    slug: string;
    title: string;
    summary: string;
    category: ToolCategorySlug;
    tradeFlow: 'Importacion' | 'Exportacion' | 'Mixto';
    idealFor: string;
    whenToUse: string;
    icon: 'taxes' | 'simulation' | 'freight' | 'tariff' | 'classification' | 'documents';
    statusLabel: string;
    badge?: string;
    featured?: boolean;
    outputs: string[];
    relatedLabel: string;
    relatedHref: string;
    searchTerms: string[];
}

export const toolCategories: ToolCategory[] = [
    {
        slug: 'costos-tributos',
        label: 'Costos y tributos',
        eyebrow: 'Calcular antes de importar',
        description: 'Estimaciones referenciales para validar rentabilidad, tributos y costos totales antes de mover tu carga.',
        accent: 'indigo',
    },
    {
        slug: 'logistica-tarifarios',
        label: 'Logistica y tarifarios',
        eyebrow: 'Comparar antes de coordinar',
        description: 'Tarifarios y cotizadores pensados para estimar fletes, almacenaje y coordinacion operativa en Peru.',
        accent: 'cyan',
    },
    {
        slug: 'normativa-cumplimiento',
        label: 'Normativa y cumplimiento',
        eyebrow: 'Validar antes de declarar',
        description: 'Buscadores y validadores enfocados en clasificacion, requisitos documentarios y control operativo.',
        accent: 'coral',
    },
];

export const toolPreviews: ToolPreview[] = [
    {
        slug: 'calculadora-tributos-importacion',
        title: 'Calculadora de tributos e impuestos',
        summary: 'Proyecta Ad Valorem, IGV e IPM con un flujo pensado para operaciones de importacion en Peru.',
        category: 'costos-tributos',
        tradeFlow: 'Importacion',
        idealFor: 'Importadores que necesitan validar margen antes de comprar o nacionalizar.',
        whenToUse: 'Cuando quieres estimar tributos antes de cerrar una orden o revisar una liquidacion.',
        icon: 'taxes',
        statusLabel: 'Modulo prioritario',
        badge: 'Alta demanda',
        featured: true,
        outputs: ['Tributos referenciales', 'Base imponible estimada', 'Resumen para evaluar margen'],
        relatedLabel: 'Ver consultoria aduanera',
        relatedHref: '/servicios/consultoria-aduanera',
        searchTerms: ['igv', 'ipm', 'ad valorem', 'impuestos', 'tributos', 'liquidacion'],
    },
    {
        slug: 'simulador-costos-importacion',
        title: 'Simulador de costos de importacion',
        summary: 'Integra origen, tributos y gastos locales para proyectar el costo total de una importacion.',
        category: 'costos-tributos',
        tradeFlow: 'Importacion',
        idealFor: 'Importadores que comparan proveedores, volumenes o escenarios de rentabilidad.',
        whenToUse: 'Antes de cotizar formalmente, para aterrizar el costo total por operacion.',
        icon: 'simulation',
        statusLabel: 'En diseno funcional',
        featured: true,
        outputs: ['Costo aterrizado', 'Escenario por tramo', 'Base para pre-cotizacion'],
        relatedLabel: 'Ver guia de importacion',
        relatedHref: '/comercio-exterior/importacion',
        searchTerms: ['costo importacion', 'margen', 'simulador', 'gastos locales', 'rentabilidad'],
    },
    {
        slug: 'cotizador-fletes-maritimos',
        title: 'Cotizador de fletes maritimos',
        summary: 'Ayuda a comparar rangos de flete para carga FCL o LCL antes de pedir una cotizacion formal.',
        category: 'logistica-tarifarios',
        tradeFlow: 'Mixto',
        idealFor: 'Importadores y exportadores que necesitan una referencia inicial de flete maritimo.',
        whenToUse: 'Cuando evaluas rutas, volumen o modalidad antes de pasar a una cotizacion comercial.',
        icon: 'freight',
        statusLabel: 'Primer release del hub',
        badge: 'Ruta clave',
        featured: true,
        outputs: ['Rango de flete', 'Variables criticas', 'Siguiente paso comercial'],
        relatedLabel: 'Ver agencia de carga',
        relatedHref: '/servicios/agencia-de-carga-internacional',
        searchTerms: ['flete', 'maritimo', 'lcl', 'fcl', 'contenedor', 'naviera'],
    },
    {
        slug: 'tarifario-depositos-temporales',
        title: 'Tarifario de depositos temporales',
        summary: 'Consolida precios referenciales de almacenaje y servicios logisticos para decisiones mas informadas.',
        category: 'logistica-tarifarios',
        tradeFlow: 'Mixto',
        idealFor: 'Operadores, importadores y exportadores que necesitan estimar costos de almacenaje y retiro.',
        whenToUse: 'Cuando tu carga pasa por deposito temporal y quieres prever cargos frecuentes.',
        icon: 'tariff',
        statusLabel: 'Base de datos en curacion',
        outputs: ['Tarifas referenciales', 'Cargos frecuentes', 'Variables que alteran el costo'],
        relatedLabel: 'Ver transporte de carga',
        relatedHref: '/servicios/transporte-de-carga',
        searchTerms: ['deposito temporal', 'almacenaje', 'tarifario', 'costos logisticos', 'puerto'],
    },
    {
        slug: 'buscador-partidas-arancelarias',
        title: 'Buscador de partidas arancelarias',
        summary: 'Un apoyo inicial para aproximar la subpartida nacional correcta y revisar si el producto exige validacion adicional.',
        category: 'normativa-cumplimiento',
        tradeFlow: 'Mixto',
        idealFor: 'Importadores y exportadores que necesitan una primera aproximacion de clasificacion.',
        whenToUse: 'Antes de cotizar, declarar o validar si un producto exige permisos o tratamiento especial.',
        icon: 'classification',
        statusLabel: 'Motor conceptual listo',
        badge: 'Herramienta estrella',
        featured: true,
        outputs: ['Coincidencias probables', 'Alertas normativas', 'Siguientes validaciones sugeridas'],
        relatedLabel: 'Ver documentos aduaneros',
        relatedHref: '/comercio-exterior/documentos-aduaneros',
        searchTerms: ['partida', 'subpartida', 'hs code', 'arancel', 'clasificacion', 'aduanas'],
    },
    {
        slug: 'validador-documentos-aduaneros',
        title: 'Validador de documentos aduaneros',
        summary: 'Checklist inteligente para revisar que tu set documental tenga coherencia antes del despacho.',
        category: 'normativa-cumplimiento',
        tradeFlow: 'Mixto',
        idealFor: 'Importadores y exportadores que quieren revisar coherencia documental antes del despacho.',
        whenToUse: 'Cuando ya tienes factura, packing list o documentos de transporte y quieres detectar vacios.',
        icon: 'documents',
        statusLabel: 'Diseno operativo',
        outputs: ['Checklist de consistencia', 'Hallazgos comunes', 'Escalamiento a revision humana'],
        relatedLabel: 'Ver agenciamiento de aduanas',
        relatedHref: '/servicios/agenciamiento-aduanas',
        searchTerms: ['factura', 'packing list', 'documentos', 'bl', 'awb', 'revision documental'],
    },
];

export function getToolBySlug(slug: string) {
    return toolPreviews.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategorySlug) {
    return toolPreviews.filter((tool) => tool.category === category);
}

export function getToolCategory(slug: ToolCategorySlug) {
    return toolCategories.find((category) => category.slug === slug);
}
