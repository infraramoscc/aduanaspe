import type { Metadata } from 'next';
import { Header, Footer, Breadcrumbs, ContactNudge } from '@/components/layout';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
    title: {
        template: '%s',
        default: 'AduanasPE | Agencia de Aduanas y Carga Internacional en Perú',
    },
    description: 'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior para importadores y exportadores en Perú.',
};

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <StructuredData />
            <a
                href="#main-content"
                className="sr-only fixed left-4 top-4 z-[120] rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-4"
            >
                Saltar al contenido principal
            </a>
            <Header />
            <div className="pt-[120px] md:pt-[108px]">
                <Breadcrumbs />
                <main id="main-content" className="min-h-screen">{children}</main>
            </div>
            <Footer />
            <ContactNudge />
        </>
    );
}
