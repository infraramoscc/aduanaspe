export interface EditorialImageData {
    src: string;
    alt: string;
    caption: string;
    objectPosition?: string;
}

interface MainPageImageSet {
    hero: EditorialImageData;
    middle: EditorialImageData;
    lower: EditorialImageData;
}

export const mainPageImages: Record<'home' | 'services' | 'trade' | 'about', MainPageImageSet> = {
    home: {
        hero: {
            src: '/images/main-pages/home-hero.webp',
            alt: 'Equipo coordinando carga en una zona logística portuaria',
            caption: 'Coordinación clara desde el inicio de la operación.',
        },
        middle: {
            src: '/images/main-pages/home-middle.webp',
            alt: 'Asesor e importador revisando documentos sobre una mesa',
            caption: 'Revisamos documentos y dudas antes de avanzar.',
        },
        lower: {
            src: '/images/main-pages/home-lower.webp',
            alt: 'Revisión de mercancía embalada dentro de un almacén',
            caption: 'Acompañamiento práctico para quien importa por primera vez.',
        },
    },
    services: {
        hero: {
            src: '/images/main-pages/services-hero.webp',
            alt: 'Equipo logístico coordinando un embarque internacional',
            caption: 'Un solo equipo conecta cada etapa de la operación.',
        },
        middle: {
            src: '/images/main-pages/services-middle.webp',
            alt: 'Documentos de importación organizados para su revisión',
            caption: 'La operación comienza con documentación ordenada.',
        },
        lower: {
            src: '/images/main-pages/services-lower.webp',
            alt: 'Coordinación de carga entre contenedor, camión y almacén',
            caption: 'Coordinamos la continuidad hasta la entrega local.',
        },
    },
    trade: {
        hero: {
            src: '/images/main-pages/trade-hero.webp',
            alt: 'Importador planificando una compra internacional en su espacio de trabajo',
            caption: 'Información práctica para decidir antes de operar.',
        },
        middle: {
            src: '/images/main-pages/trade-middle.webp',
            alt: 'Asesor y empresario comparando información de producto y documentos',
            caption: 'Cada producto requiere revisar requisitos y clasificación.',
        },
        lower: {
            src: '/images/main-pages/trade-lower.webp',
            alt: 'Persona calculando costos de importación con una computadora',
            caption: 'Herramientas para convertir datos en decisiones.',
        },
    },
    about: {
        hero: {
            src: '/images/main-pages/about-hero.webp',
            alt: 'Equipo pequeño colaborando en una oficina de comercio exterior',
            caption: 'Un equipo cercano que conoce cada operación.',
        },
        middle: {
            src: '/images/main-pages/about-middle.webp',
            alt: 'Asesor escuchando a un cliente durante una revisión documentaria',
            caption: 'La atención comienza por entender el contexto.',
        },
        lower: {
            src: '/images/main-pages/about-lower.webp',
            alt: 'Equipo acompañando una revisión de carga en almacén',
            caption: 'Cercanía también durante la ejecución operativa.',
        },
    },
};
