import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirecciones de sitemap
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
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

      // Redirecciones de artículos del blog a /blog/
      {
        source: '/importaciones-implementos-seguridad-peru-mayo-2025/:path*',
        destination: '/blog/importaciones-implementos-seguridad-peru-mayo-2025/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-galaxy-buds3/:path*',
        destination: '/blog/clasificacion-arancelaria-galaxy-buds3/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-cesto-ratan/:path*',
        destination: '/blog/clasificacion-arancelaria-cesto-ratan/',
        permanent: true,
      },
      {
        source: '/clasificacion-arancelaria-galaxy-buds-fe-sm-r400/:path*',
        destination: '/blog/clasificacion-arancelaria-galaxy-buds-fe-sm-r400/',
        permanent: true,
      },
      {
        source: '/registrar-mandato-electronico-sunat/:path*',
        destination: '/blog/registrar-mandato-electronico-sunat/',
        permanent: true,
      },
      {
        source: '/acreditacion-medios-de-pago-comercio-internacional/:path*',
        destination: '/blog/acreditacion-medios-de-pago-comercio-internacional/',
        permanent: true,
      },
      {
        source: '/servicios-clave-agencia-de-cargas/:path*',
        destination: '/blog/servicios-clave-agencia-de-cargas/',
        permanent: true,
      },
      {
        source: '/guia-inspeccion-no-intrusiva-puertos-2024/:path*',
        destination: '/blog/guia-inspeccion-no-intrusiva-puertos-2024/',
        permanent: true,
      },
      {
        source: '/operador-logistico-cadena-suministro-post-covid/:path*',
        destination: '/blog/operador-logistico-cadena-suministro-post-covid/',
        permanent: true,
      },
      {
        source: '/5-asombrosas-claves-importar-productos-digitales-sin-pagar-impuestos/:path*',
        destination: '/blog/5-asombrosas-claves-importar-productos-digitales-sin-pagar-impuestos/',
        permanent: true,
      },
      {
        source: '/7-razones-agencias-aduanas-peru-socios-estrategicos/:path*',
        destination: '/blog/7-razones-agencias-aduanas-peru-socios-estrategicos/',
        permanent: true,
      },
      {
        source: '/todo-sobre-agencias-de-aduanas/:path*',
        destination: '/blog/todo-sobre-agencias-de-aduanas/',
        permanent: true,
      },
      {
        source: '/notificacion-de-salida-de-mercancias/:path*',
        destination: '/blog/notificacion-de-salida-de-mercancias/',
        permanent: true,
      },
      {
        source: '/transporte-maritimo-internacional-cotizacion-fletes-gestion-contenedores/:path*',
        destination: '/blog/transporte-maritimo-internacional-cotizacion-fletes-gestion-contenedores/',
        permanent: true,
      },
      {
        source: '/7-claves-flete-falso-flete-guia-esencial/:path*',
        destination: '/blog/7-claves-flete-falso-flete-guia-esencial/',
        permanent: true,
      },
      {
        source: '/funcion-de-una-agencia-de-carga/:path*',
        destination: '/blog/funcion-de-una-agencia-de-carga/',
        permanent: true,
      },
      {
        source: '/estado-actual-de-agentes-de-carga/:path*',
        destination: '/blog/estado-actual-de-agentes-de-carga/',
        permanent: true,
      },
      {
        source: '/como-crear-una-agencia-de-carga/:path*',
        destination: '/blog/como-crear-una-agencia-de-carga/',
        permanent: true,
      },
      {
        source: '/que-es-una-agencia-de-carga-internacional/:path*',
        destination: '/blog/que-es-una-agencia-de-carga-internacional/',
        permanent: true,
      },
      {
        source: '/importar-de-china-a-peru/:path*',
        destination: '/blog/importar-de-china-a-peru/',
        permanent: true,
      },
      {
        source: '/exportaciones-quinua-mayo-2025/:path*',
        destination: '/blog/exportaciones-quinua-mayo-2025/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


