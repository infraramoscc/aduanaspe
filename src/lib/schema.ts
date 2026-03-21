/**
 * Schema.org structured data helpers
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

export const businessData: LocalBusinessSchema = {
    name: 'AduanasPE',
    description: 'Agencia de Aduanas y Comercio Exterior en Peru. Servicios de agenciamiento aduanero, carga internacional, transporte y consultoria.',
    url: 'https://aduanaspe.com',
    telephone: '+51963461006',
    email: 'info@aduanaspe.com',
    address: {
        streetAddress: '',
        addressLocality: 'Callao',
        addressRegion: 'Callao',
        postalCode: '',
        addressCountry: 'PE',
    },
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: '$$',
    sameAs: [],
};

// Keep Organization until exact street address, postal code, and social profiles are available.
export function generateOrganizationSchema(): string {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': businessData.url,
        name: businessData.name,
        description: businessData.description,
        url: businessData.url,
        telephone: businessData.telephone,
        email: businessData.email,
        logo: `${businessData.url}/logo.png`,
        priceRange: businessData.priceRange,
        areaServed: {
            '@type': 'Country',
            name: 'Peru',
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: businessData.telephone,
                email: businessData.email,
                contactType: 'customer support',
                areaServed: 'PE',
                availableLanguage: ['es'],
            },
        ],
        sameAs: businessData.sameAs,
    };

    return JSON.stringify(schema);
}

export function generateWebSiteSchema(): string {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${businessData.url}/#website`,
        url: `${businessData.url}/`,
        name: businessData.name,
        inLanguage: 'es-PE',
        publisher: {
            '@id': businessData.url,
        },
    };

    return JSON.stringify(schema);
}

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
            '@type': 'Organization',
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
