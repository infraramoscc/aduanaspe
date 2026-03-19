export interface LandingPage {
    slug: string;
    title: string;
    subtitle: string;
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
        ctaLabel: 'Obtener cotización',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'agente-aduanas-lima',
        title: 'Agente de Aduanas en Lima',
        subtitle: 'Despacho aduanero con atención personalizada y seguimiento claro de la operación.',
        ctaLabel: 'Solicitar cotización',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'asesoria-comercio-exterior',
        title: 'Asesoría en Comercio Exterior',
        subtitle: 'Resolvemos dudas operativas, documentarias y estratégicas para importadores y exportadores.',
        ctaLabel: 'Agendar consulta',
        ctaLink: '#form',
        showForm: true,
        formType: 'diagnostico',
    },
];

export function getLandingBySlug(slug: string): LandingPage | undefined {
    return landingPages.find((lp) => lp.slug === slug);
}
