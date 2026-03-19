import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { GoogleAnalytics } from '@/components/tracking/GoogleAnalytics';
import './globals.css';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://aduanaspe.com'),
    title: {
        template: '%s',
        default: 'AduanasPE | Agencia de Aduanas y Carga Internacional en Perú',
    },
    description:
        'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior para importadores y exportadores en Perú.',
    keywords: [
        'agente de aduanas',
        'agenciamiento aduanero',
        'comercio exterior',
        'importación Perú',
        'exportación Perú',
        'logística internacional',
        'carga internacional',
    ],
    authors: [{ name: 'AduanasPE' }],
    openGraph: {
        type: 'website',
        locale: 'es_PE',
        siteName: 'AduanasPE',
        title: 'AduanasPE | Agencia de Aduanas y Carga Internacional en Perú',
        description:
            'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior para importadores y exportadores en Perú.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AduanasPE | Agencia de Aduanas y Carga Internacional en Perú',
        description:
            'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior para importadores y exportadores en Perú.',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${outfit.variable} antialiased font-sans`}>
                <GoogleAnalytics />
                {children}
            </body>
        </html>
    );
}
