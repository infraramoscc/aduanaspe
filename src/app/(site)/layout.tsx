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
            <Header />
            <div className="pt-[120px] md:pt-[108px]">
                <Breadcrumbs />
                <main className="min-h-screen">{children}</main>
            </div>
            <Footer />
            <ContactNudge />
        </>
    );
}
