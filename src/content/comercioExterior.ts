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
        summary: 'Guías y recursos para importar productos a Perú.',
        description: 'Aprende sobre proveedores, costos, documentos y decisiones clave para una operación de importación más ordenada.',
        ctaLabel: 'Ver guías',
        icon: '📥',
    },
    {
        title: 'Exportación',
        slug: 'exportacion',
        summary: 'Guías para exportar desde Perú y abrir nuevos mercados.',
        description: 'Conoce beneficios, requisitos y pasos para exportar con más claridad y menos fricción operativa.',
        ctaLabel: 'Ver guías',
        icon: '📤',
    },
    {
        title: 'Regímenes Aduaneros',
        slug: 'regimenes-aduaneros',
        summary: 'Conoce qué régimen aduanero conviene según tu operación.',
        description: 'Te explicamos los regímenes más usados y cómo elegir la destinación correcta para evitar contingencias.',
        ctaLabel: 'Ver guía',
        icon: '📑',
    },
    {
        title: 'Documentos Aduaneros',
        slug: 'documentos-aduaneros',
        summary: 'Documentos clave para importar y exportar correctamente.',
        description: 'Revisa qué documentos necesitas, para qué sirve cada uno y qué errores conviene evitar en tu operación.',
        ctaLabel: 'Ver guía',
        icon: '📄',
    },
];

export const importacionSubLandings: ComercioExteriorSubLanding[] = [
    {
        title: 'Importar desde China',
        slug: 'importar-desde-china',
        summary: 'Guía para importar desde China a Perú paso a paso.',
        description: 'Revisa proveedores, costos, tiempos y decisiones logísticas clave para tus compras desde China.',
        ctaLabel: 'Leer guía',
        parentSlug: 'importacion',
    },
    {
        title: 'Importa Puerta a Puerta',
        slug: 'importa-puerta-a-puerta',
        summary: 'Servicio integral desde origen hasta tu almacén.',
        description: 'Entiende cómo funciona una importación puerta a puerta y cuándo conviene frente a otras modalidades.',
        ctaLabel: 'Conocer servicio',
        parentSlug: 'importacion',
    },
    {
        title: 'Courier vs Carga',
        slug: 'courier-vs-carga',
        summary: 'Comparativa entre courier y carga formal para importar a Perú.',
        description: 'Descubre qué opción conviene más según peso, valor, urgencia y tipo de mercancía.',
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
