export interface LandingPage {
    slug: string;
    title: string;
    subtitle: string;
    eyebrow: string;
    heroImage: string;
    heroImageAlt: string;
    benefits: { title: string; description: string }[];
    trustNote: string;
    ctaLabel: string;
    ctaLink: string;
    showForm: boolean;
    formType?: 'diagnostico' | 'precotizacion' | 'contacto';
}

export const landingPages: LandingPage[] = [
    {
        slug: 'importar-china-2024',
        title: 'Importa desde China con apoyo experto',
        subtitle: 'Guía inicial y cotización para tu primera importación con acompañamiento por WhatsApp.',
        eyebrow: 'Importación internacional para pymes',
        heroImage: '/images/landings/importar-china.webp',
        heroImageAlt: 'Terminal de contenedores durante una operación de carga internacional',
        benefits: [
            { title: 'Costos con contexto', description: 'Revisamos flete, gastos locales y tributos según los datos de tu carga.' },
            { title: 'Documentos antes del embarque', description: 'Identificamos la información necesaria para preparar la importación.' },
            { title: 'Modalidad adecuada', description: 'Comparamos alternativas marítimas o aéreas según volumen y urgencia.' },
        ],
        trustNote: 'Orientación inicial por WhatsApp en horario de atención.',
        ctaLabel: 'Obtener cotización',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'agente-aduanas-lima',
        title: 'Agente de Aduanas en Lima',
        subtitle: 'Despacho aduanero con atención personalizada y seguimiento claro de la operación.',
        eyebrow: 'Despacho aduanero en Lima y Callao',
        heroImage: '/images/landings/agente-aduanas-lima.webp',
        heroImageAlt: 'Profesionales revisando carga y documentación en una zona portuaria',
        benefits: [
            { title: 'Revisión documentaria', description: 'Validamos la información necesaria antes de numerar el despacho.' },
            { title: 'Seguimiento operativo', description: 'Mantenemos claridad sobre hitos, observaciones y próximos pasos.' },
            { title: 'Coordinación integral', description: 'Articulamos el despacho con carga, almacén y transporte cuando corresponde.' },
        ],
        trustNote: 'Evaluamos cada operación según régimen, mercancía y documentación disponible.',
        ctaLabel: 'Solicitar cotización',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'asesoria-comercio-exterior',
        title: 'Asesoría en Comercio Exterior',
        subtitle: 'Resolvemos dudas operativas, documentarias y estratégicas para importadores y exportadores.',
        eyebrow: 'Decisiones de comercio exterior con criterio',
        heroImage: '/images/landings/asesoria-comercio-exterior.webp',
        heroImageAlt: 'Especialista analizando documentos y costos de una operación de importación',
        benefits: [
            { title: 'Diagnóstico del caso', description: 'Ordenamos el problema y distinguimos riesgos operativos, documentarios y tributarios.' },
            { title: 'Ruta de acción', description: 'Definimos pasos concretos y prioridades para avanzar con mayor claridad.' },
            { title: 'Explicación comprensible', description: 'Traducimos requisitos técnicos a decisiones prácticas para tu empresa.' },
        ],
        trustNote: 'La recomendación se basa en los datos y documentos disponibles de tu caso.',
        ctaLabel: 'Agendar consulta',
        ctaLink: '#form',
        showForm: true,
        formType: 'diagnostico',
    },
];

export function getLandingBySlug(slug: string): LandingPage | undefined {
    return landingPages.find((lp) => lp.slug === slug);
}
