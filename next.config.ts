import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirecciones desde URLs antiguas de WordPress
      {
        source: '/agencia-de-aduanas-peru',
        destination: '/servicios/agenciamiento-aduanas',
        permanent: true, // 301 redirect
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
    ];
  },
};

export default nextConfig;

