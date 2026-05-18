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
        importarJuguetesUtilesEscritorio: '/comercio-exterior/importacion/importar-juguetes-utiles-escritorio',
    },
    contacto: '/contacto',
    blog: '/blog',
    blogPost: (slug: string) => `/blog/${slug}`,
    tools: '/herramientas',
    lp: (slug: string) => `/lp/${slug}`,
} as const;

export const NAV_ITEMS = [
    { label: 'Inicio', href: ROUTES.home },
    { label: 'Quiénes somos', href: ROUTES.quienesSomos },
    { label: 'Servicios', href: ROUTES.servicios.index },
    { label: 'Comercio Exterior', href: ROUTES.comercioExterior.index },
    { label: 'Contacto', href: ROUTES.contacto },
] as const;

export const HEADER_NAV_GROUPS = [
    {
        label: 'Servicios',
        href: ROUTES.servicios.index,
        eyebrow: 'Soluciones operativas',
        description: 'Encuentra el servicio segun la etapa de tu operacion.',
        columns: [
            {
                title: 'Gestion aduanera',
                links: [
                    {
                        label: 'Agenciamiento de Aduanas',
                        href: ROUTES.servicios.agenciamientoAduanas,
                        description: 'Despacho aduanero, revision documentaria y seguimiento.',
                    },
                    {
                        label: 'Consultoria Aduanera',
                        href: ROUTES.servicios.consultoriaAduanera,
                        description: 'Clasificacion, permisos, TLC y decisiones de riesgo.',
                    },
                    {
                        label: 'Resguardo Aduanero',
                        href: ROUTES.servicios.resguardoAduanero,
                        description: 'Acompanamiento para traslados de mayor exposicion.',
                    },
                ],
            },
            {
                title: 'Logistica y carga',
                links: [
                    {
                        label: 'Agencia de Carga Internacional',
                        href: ROUTES.servicios.agenciaCargaInternacional,
                        description: 'Flete maritimo o aereo desde origen hasta destino.',
                    },
                    {
                        label: 'Transporte de Carga',
                        href: ROUTES.servicios.transporteDeCarga,
                        description: 'Retiro y traslado local hasta almacen o punto final.',
                    },
                ],
            },
        ],
        featured: {
            label: 'Primera importacion',
            description: 'Si aun no sabes por donde empezar, te orientamos antes de pagar al proveedor.',
            href: '/oferta/primera-importacion',
        },
    },
    {
        label: 'Importar / Exportar',
        href: ROUTES.comercioExterior.index,
        eyebrow: 'Guias de comercio exterior',
        description: 'Rutas rapidas para resolver dudas frecuentes antes de mover carga.',
        columns: [
            {
                title: 'Importacion',
                links: [
                    {
                        label: 'Rutas de importacion',
                        href: ROUTES.comercioExterior.importacion,
                        description: 'Guia principal para elegir modalidad y siguiente paso.',
                    },
                    {
                        label: 'Importar desde China',
                        href: ROUTES.comercioExterior.importarDesdeChina,
                        description: 'Pasos clave antes de comprar a un proveedor chino.',
                    },
                    {
                        label: 'Importa Puerta a Puerta',
                        href: ROUTES.comercioExterior.importaPuertaAPuerta,
                        description: 'Servicio integral desde origen hasta tu almacen.',
                    },
                    {
                        label: 'Juguetes y utiles de escritorio',
                        href: ROUTES.comercioExterior.importarJuguetesUtilesEscritorio,
                        description: 'Rotulado, permisos, ensayos y revision sanitaria.',
                    },
                ],
            },
            {
                title: 'Comparar y documentar',
                links: [
                    {
                        label: 'Courier vs Carga',
                        href: ROUTES.comercioExterior.courierVsCarga,
                        description: 'Cuando conviene courier y cuando carga formal.',
                    },
                    {
                        label: 'Exportacion',
                        href: ROUTES.comercioExterior.exportacion,
                        description: 'Conceptos base para preparar una salida al exterior.',
                    },
                    {
                        label: 'Regimenes Aduaneros',
                        href: ROUTES.comercioExterior.regimenesAduaneros,
                        description: 'Opciones aduaneras segun finalidad y operacion.',
                    },
                    {
                        label: 'Documentos Aduaneros',
                        href: ROUTES.comercioExterior.documentosAduaneros,
                        description: 'Factura, packing list, BL/AWB y consistencia documental.',
                    },
                ],
            },
        ],
        featured: {
            label: 'Calcular antes de comprar',
            description: 'Usa herramientas para estimar tributos, costos y documentos antes de cerrar trato.',
            href: ROUTES.tools,
        },
    },
    {
        label: 'Recursos',
        href: ROUTES.blog,
        eyebrow: 'Aprende y calcula',
        description: 'Contenido y herramientas para decidir con mas contexto.',
        columns: [
            {
                title: 'Biblioteca',
                links: [
                    {
                        label: 'Blog AduanasPE',
                        href: ROUTES.blog,
                        description: 'Guias practicas para importadores y exportadores.',
                    },
                    {
                        label: 'Herramientas',
                        href: ROUTES.tools,
                        description: 'Calculadoras y validadores para preparar operaciones.',
                    },
                ],
            },
            {
                title: 'Herramientas destacadas',
                links: [
                    {
                        label: 'Calculadora de tributos',
                        href: '/herramientas/calculadora-tributos-importacion',
                        description: 'Proyecta impuestos y base imponible referencial.',
                    },
                    {
                        label: 'Simulador de costos',
                        href: '/herramientas/simulador-costos-importacion',
                        description: 'Estima costo total antes de importar.',
                    },
                    {
                        label: 'Buscador de partidas',
                        href: '/herramientas/buscador-partidas-arancelarias',
                        description: 'Aproxima la clasificacion arancelaria inicial.',
                    },
                ],
            },
        ],
        featured: {
            label: 'Contenido reciente',
            description: 'Lee articulos sobre permisos, costos, rotulado y documentacion.',
            href: ROUTES.blog,
        },
    },
] as const;
