import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirecciones desde URLs antiguas de WordPress (páginas de servicios)
      {
        source: '/agencia-de-aduanas-peru',
        destination: '/servicios/agenciamiento-aduanas',
        permanent: true,
      },
      {
        source: '/agencia-de-carga',
        destination: '/servicios/agencia-de-carga-internacional',
        permanent: true,
      },
      {
        source: '/servicios-operador-logistico',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/transporte-de-carga-lima',
        destination: '/servicios/transporte-de-carga',
        permanent: true,
      },

      // Redirecciones de artículos del blog a blog.aduanaspe.com
      {
        source: '/importaciones-implementos-seguridad-peru-mayo-2025/:path*',
        destination: 'https://blog.aduanaspe.com/importaciones-implementos-seguridad-peru-mayo-2025/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-galaxy-buds3/:path*',
        destination: 'https://blog.aduanaspe.com/clasificacion-arancelaria-galaxy-buds3/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-cesto-ratan/:path*',
        destination: 'https://blog.aduanaspe.com/clasificacion-arancelaria-cesto-ratan/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-galaxy-buds-fe-sm-r400/:path*',
        destination: 'https://blog.aduanaspe.com/clasificacion-arancelaria-galaxy-buds-fe-sm-r400/',
        permanent: true,
      },
      {
        source: '/registrar-mandato-electronico-sunat/:path*',
        destination: 'https://blog.aduanaspe.com/registrar-mandato-electronico-sunat/',
        permanent: true,
      },
      {
        source: '/acreditacion-medios-de-pago-comercio-internacional/:path*',
        destination: 'https://blog.aduanaspe.com/acreditacion-medios-de-pago-comercio-internacional/',
        permanent: true,
      },
      {
        source: '/servicios-clave-agencia-de-cargas/:path*',
        destination: 'https://blog.aduanaspe.com/servicios-clave-agencia-de-cargas/',
        permanent: true,
      },
      {
        source: '/guia-inspeccion-no-intrusiva-puertos-2024/:path*',
        destination: 'https://blog.aduanaspe.com/guia-inspeccion-no-intrusiva-puertos-2024/',
        permanent: true,
      },
      {
        source: '/operador-logistico-cadena-suministro-post-covid/:path*',
        destination: 'https://blog.aduanaspe.com/operador-logistico-cadena-suministro-post-covid/',
        permanent: true,
      },
      {
        source: '/5-asombrosas-claves-importar-productos-digitales-sin-pagar-impuestos/:path*',
        destination: 'https://blog.aduanaspe.com/5-asombrosas-claves-importar-productos-digitales-sin-pagar-impuestos/',
        permanent: true,
      },
      {
        source: '/7-razones-agencias-aduanas-peru-socios-estrategicos/:path*',
        destination: 'https://blog.aduanaspe.com/7-razones-agencias-aduanas-peru-socios-estrategicos/',
        permanent: true,
      },
      {
        source: '/todo-sobre-agencias-de-aduanas/:path*',
        destination: 'https://blog.aduanaspe.com/todo-sobre-agencias-de-aduanas/',
        permanent: true,
      },
      {
        source: '/notificacion-de-salida-de-mercancias/:path*',
        destination: 'https://blog.aduanaspe.com/notificacion-de-salida-de-mercancias/',
        permanent: true,
      },
      {
        source: '/transporte-maritimo-internacional-cotizacion-fletes-gestion-contenedores/:path*',
        destination: 'https://blog.aduanaspe.com/transporte-maritimo-internacional-cotizacion-fletes-gestion-contenedores/',
        permanent: true,
      },
      {
        source: '/7-claves-flete-falso-flete-guia-esencial/:path*',
        destination: 'https://blog.aduanaspe.com/7-claves-flete-falso-flete-guia-esencial/',
        permanent: true,
      },
      {
        source: '/funcion-de-una-agencia-de-carga/:path*',
        destination: 'https://blog.aduanaspe.com/funcion-de-una-agencia-de-carga/',
        permanent: true,
      },
      {
        source: '/estado-actual-de-agentes-de-carga/:path*',
        destination: 'https://blog.aduanaspe.com/estado-actual-de-agentes-de-carga/',
        permanent: true,
      },
      {
        source: '/como-crear-una-agencia-de-carga/:path*',
        destination: 'https://blog.aduanaspe.com/como-crear-una-agencia-de-carga/',
        permanent: true,
      },
      {
        source: '/que-es-una-agencia-de-carga-internacional/:path*',
        destination: 'https://blog.aduanaspe.com/que-es-una-agencia-de-carga-internacional/',
        permanent: true,
      },
      {
        source: '/importar-de-china-a-peru/:path*',
        destination: 'https://blog.aduanaspe.com/importar-de-china-a-peru/',
        permanent: true,
      },
      {
        source: '/exportaciones-quinua-mayo-2025/:path*',
        destination: 'https://blog.aduanaspe.com/exportaciones-quinua-mayo-2025/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


