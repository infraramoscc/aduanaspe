/**
 * Schema.org Structured Data
 * For SEO and rich search results
 */

export interface LocalBusinessSchema {
    name: string;
    description: string;
    url: string;
    telephone: string;
    email: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    openingHours?: string[];
    priceRange?: string;
    image?: string;
    sameAs?: string[];
}

// Datos de la empresa
export const businessData: LocalBusinessSchema = {
    name: 'AduanasPE',
    description: 'Agencia de Aduanas y Comercio Exterior en Perú. Servicios de agenciamiento aduanero, carga internacional, transporte y consultoría.',
    url: 'https://aduanaspe.com',
    telephone: '+51963461006',
    email: 'contacto@aduanaspe.com',
    address: {
        streetAddress: '', // TODO: Agregar dirección real
        addressLocality: 'Lima',
        addressRegion: 'Lima',
        postalCode: '',
        addressCountry: 'PE',
    },
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: '$$',
    sameAs: [
        // TODO: Agregar redes sociales
        // 'https://www.facebook.com/aduanaspe',
        // 'https://www.linkedin.com/company/aduanaspe',
    ],
};

// Generar JSON-LD para LocalBusiness
export function generateLocalBusinessSchema(): string {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': businessData.url,
        name: businessData.name,
        description: businessData.description,
        url: businessData.url,
        telephone: businessData.telephone,
        email: businessData.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: businessData.address.streetAddress,
            addressLocality: businessData.address.addressLocality,
            addressRegion: businessData.address.addressRegion,
            postalCode: businessData.address.postalCode,
            addressCountry: businessData.address.addressCountry,
        },
        openingHoursSpecification: businessData.openingHours?.map((hours) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hours.split(' ')[0],
            opens: hours.split(' ')[1]?.split('-')[0],
            closes: hours.split(' ')[1]?.split('-')[1],
        })),
        priceRange: businessData.priceRange,
        sameAs: businessData.sameAs,
    };

    return JSON.stringify(schema);
}

// Generar JSON-LD para servicio específico
export function generateServiceSchema(service: {
    name: string;
    description: string;
    url: string;
}): string {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
            '@type': 'LocalBusiness',
            name: businessData.name,
            url: businessData.url,
        },
        areaServed: {
            '@type': 'Country',
            name: 'Peru',
        },
    };

    return JSON.stringify(schema);
}

// Generar JSON-LD para BreadcrumbList
export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
): string {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return JSON.stringify(schema);
}
