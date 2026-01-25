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
        title: 'Importa desde China en 2024',
        subtitle: 'Guía actualizada + cotización gratis para tu primera importación',
        ctaLabel: 'Obtener cotización gratis',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'agente-aduanas-lima',
        title: 'Agente de Aduanas en Lima',
        subtitle: 'Más de 15 años de experiencia. Cotización en 24 horas.',
        ctaLabel: 'Solicitar cotización',
        ctaLink: '#form',
        showForm: true,
        formType: 'precotizacion',
    },
    {
        slug: 'asesoria-comercio-exterior',
        title: 'Asesoría en Comercio Exterior',
        subtitle: 'Primera consulta gratis. Resolvemos todas tus dudas.',
        ctaLabel: 'Agendar consulta',
        ctaLink: '#form',
        showForm: true,
        formType: 'diagnostico',
    },
];

export function getLandingBySlug(slug: string): LandingPage | undefined {
    return landingPages.find((lp) => lp.slug === slug);
}
