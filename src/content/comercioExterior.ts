export interface ComercioExteriorCategory {
    title: string;
    slug: string;
    summary: string;
    description: string;
    ctaLabel: string;
    icon: string;
}

export interface ComercioExteriorSubLanding {
    title: string;
    slug: string;
    summary: string;
    description: string;
    ctaLabel: string;
    parentSlug: string;
}

export const comercioExteriorCategories: ComercioExteriorCategory[] = [
    {
        title: 'Importación',
        slug: 'importacion',
        summary: 'Todo lo que necesitas saber para importar productos a Perú.',
        description: 'Guías, consejos y servicios para tus operaciones de importación. Desde la búsqueda de proveedores hasta la entrega en tu almacén.',
        ctaLabel: 'Ver guías',
        icon: '📥',
    },
    {
        title: 'Exportación',
        slug: 'exportacion',
        summary: 'Expande tu negocio al mundo. Guías para exportar desde Perú.',
        description: 'Aprende a exportar tus productos, conoce los beneficios tributarios y los mercados más atractivos para productos peruanos.',
        ctaLabel: 'Ver guías',
        icon: '📤',
    },
    {
        title: 'Regímenes Aduaneros',
        slug: 'regimenes-aduaneros',
        summary: 'Conoce los diferentes regímenes aduaneros y cuál te conviene.',
        description: 'Importación para el consumo, admisión temporal, reimportación y más. Te explicamos cada régimen y sus beneficios.',
        ctaLabel: 'Ver guías',
        icon: '📑',
    },
    {
        title: 'Documentos Aduaneros',
        slug: 'documentos-aduaneros',
        summary: 'Guía completa de documentos necesarios para comercio exterior.',
        description: 'DAM, Bill of Lading, factura comercial, packing list y más. Aprende a gestionar la documentación correctamente.',
        ctaLabel: 'Ver guías',
        icon: '📄',
    },
];

export const importacionSubLandings: ComercioExteriorSubLanding[] = [
    {
        title: 'Importar desde China',
        slug: 'importar-desde-china',
        summary: 'Guía paso a paso para importar productos desde China a Perú.',
        description: 'China es el principal origen de importaciones a Perú. Aprende a encontrar proveedores confiables, negociar precios y gestionar el envío.',
        ctaLabel: 'Leer guía',
        parentSlug: 'importacion',
    },
    {
        title: 'Importa Puerta a Puerta',
        slug: 'importa-puerta-a-puerta',
        summary: 'Servicio integral de importación desde el proveedor hasta tu almacén.',
        description: 'No te preocupes por la logística. Nosotros nos encargamos de todo: desde recoger la mercancía en origen hasta entregarla en tu puerta.',
        ctaLabel: 'Conocer servicio',
        parentSlug: 'importacion',
    },
    {
        title: 'Courier vs Carga',
        slug: 'courier-vs-carga',
        summary: '¿Qué te conviene más? Comparativa entre courier y carga formal.',
        description: 'Dependiendo del valor y peso de tu mercancía, puede convenirte más importar por courier o como carga formal. Te explicamos las diferencias.',
        ctaLabel: 'Ver comparativa',
        parentSlug: 'importacion',
    },
];

export function getCategoryBySlug(slug: string): ComercioExteriorCategory | undefined {
    return comercioExteriorCategories.find((c) => c.slug === slug);
}

export function getSubLandingBySlug(slug: string): ComercioExteriorSubLanding | undefined {
    return importacionSubLandings.find((s) => s.slug === slug);
}
