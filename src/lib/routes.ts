export const ROUTES = {
    home: '/',
    quienesSomos: '/quienes-somos',
    servicios: {
        index: '/servicios',
        agenciamientoAduanas: '/servicios/agenciamiento-aduanas',
        agenciaCargaInternacional: '/servicios/agencia-de-carga-internacional',
        transporteDeCarga: '/servicios/transporte-de-carga',
        resguardoAduanero: '/servicios/resguardo-aduanero',
        consultoriaAduanera: '/servicios/consultoria-aduanera',
    },
    comercioExterior: {
        index: '/comercio-exterior',
        importacion: '/comercio-exterior/importacion',
        exportacion: '/comercio-exterior/exportacion',
        regimenesAduaneros: '/comercio-exterior/regimenes-aduaneros',
        documentosAduaneros: '/comercio-exterior/documentos-aduaneros',
        importarDesdeChina: '/comercio-exterior/importacion/importar-desde-china',
        importaPuertaAPuerta: '/comercio-exterior/importacion/importa-puerta-a-puerta',
        courierVsCarga: '/comercio-exterior/importacion/courier-vs-carga',
    },
    contacto: '/contacto',
    blog: 'https://aduanaspe.com/blog/',
    tools: 'https://tools.aduanaspe.com',
    lp: (slug: string) => `/lp/${slug}`,
} as const;

export const NAV_ITEMS = [
    { label: 'Inicio', href: ROUTES.home },
    { label: 'Quiénes somos', href: ROUTES.quienesSomos },
    { label: 'Servicios', href: ROUTES.servicios.index },
    { label: 'Comercio Exterior', href: ROUTES.comercioExterior.index },
    { label: 'Blog', href: ROUTES.blog },
    { label: 'Herramientas', href: ROUTES.tools },
    { label: 'Contacto', href: ROUTES.contacto },
] as const;
