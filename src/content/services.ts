export interface Service {
    title: string;
    slug: string;
    summary: string;
    description: string;
    ctaLabel: string;
    icon: string;
}

export const services: Service[] = [
    {
        title: 'Agenciamiento de Aduanas',
        slug: 'agenciamiento-aduanas',
        summary: 'Gestión completa de trámites aduaneros para importación y exportación.',
        description: 'Nos encargamos de todos los trámites aduaneros necesarios para que tu mercancía ingrese o salga del país sin contratiempos. Contamos con agentes de aduana certificados y experiencia en todo tipo de operaciones.',
        ctaLabel: 'Conoce más',
        icon: '📋',
    },
    {
        title: 'Agencia de Carga Internacional',
        slug: 'agencia-de-carga-internacional',
        summary: 'Coordinación de transporte internacional marítimo, aéreo y terrestre.',
        description: 'Gestionamos el transporte de tu carga desde origen hasta destino, negociando las mejores tarifas con navieras y aerolíneas. Ofrecemos consolidación de carga y seguimiento en tiempo real.',
        ctaLabel: 'Conoce más',
        icon: '🚢',
    },
    {
        title: 'Transporte de Carga',
        slug: 'transporte-de-carga',
        summary: 'Logística de transporte local y nacional para tu mercancía.',
        description: 'Servicio de transporte terrestre para movilizar tu carga desde el puerto o aeropuerto hasta tu almacén, o viceversa. Contamos con flota propia y aliados estratégicos.',
        ctaLabel: 'Conoce más',
        icon: '🚛',
    },
    {
        title: 'Resguardo Aduanero',
        slug: 'resguardo-aduanero',
        summary: 'Almacenamiento temporal y resguardo seguro de mercancías.',
        description: 'Ofrecemos almacenes temporales y definitivos para tu mercancía, con seguridad las 24 horas y control de inventario. Ideales para operaciones que requieren consolidación o desconsolidación.',
        ctaLabel: 'Conoce más',
        icon: '🏭',
    },
    {
        title: 'Consultoría Aduanera',
        slug: 'consultoria-aduanera',
        summary: 'Consultoría especializada en normativa y operaciones aduaneras.',
        description: 'Te asesoramos en clasificación arancelaria, tratados de libre comercio, regímenes aduaneros y optimización de costos. Ideal para empresas que quieren iniciar en comercio exterior.',
        ctaLabel: 'Conoce más',
        icon: '💼',
    },
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}
