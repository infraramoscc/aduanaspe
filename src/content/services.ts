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
        summary: 'Gestión completa del despacho aduanero para importación y exportación.',
        description: 'Nos encargamos de los trámites aduaneros necesarios para que tu mercancía ingrese o salga del país sin contratiempos. Trabajamos con atención personalizada, revisión documentaria y seguimiento claro.',
        ctaLabel: 'Conocer servicio',
        icon: '📋',
    },
    {
        title: 'Agencia de Carga Internacional',
        slug: 'agencia-de-carga-internacional',
        summary: 'Coordinación de carga internacional marítima y aérea desde origen.',
        description: 'Gestionamos el transporte de tu carga desde origen hasta destino, con costeo claro, booking, coordinación operativa y seguimiento durante el tránsito.',
        ctaLabel: 'Conocer servicio',
        icon: '🚢',
    },
    {
        title: 'Transporte de Carga',
        slug: 'transporte-de-carga',
        summary: 'Transporte local y nacional desde puerto o aeropuerto hasta tu almacén.',
        description: 'Coordinamos el retiro y traslado terrestre de tu carga con monitoreo, comunicación permanente y soporte operativo hasta la entrega final.',
        ctaLabel: 'Conocer servicio',
        icon: '🚚',
    },
    {
        title: 'Resguardo Aduanero',
        slug: 'resguardo-aduanero',
        summary: 'Custodia y acompañamiento para traslados de carga con mayor riesgo.',
        description: 'Brindamos resguardo en cabina o vehículo de apoyo para reforzar la seguridad de tu operación durante el traslado de mercancías.',
        ctaLabel: 'Conocer servicio',
        icon: '🛡️',
    },
    {
        title: 'Consultoría Aduanera',
        slug: 'consultoria-aduanera',
        summary: 'Asesoría especializada en normativa, clasificación y optimización aduanera.',
        description: 'Te asesoramos en clasificación arancelaria, TLC, regímenes aduaneros y decisiones operativas para reducir riesgos y mejorar costos.',
        ctaLabel: 'Conocer servicio',
        icon: '💼',
    },
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}
