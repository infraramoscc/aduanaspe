import type { Metadata } from 'next';
import { Header, Footer, Breadcrumbs } from '@/components/layout';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
    title: {
        template: '%s | AduanasPE',
        default: 'AduanasPE - Agenciamiento de Aduanas en Perú',
    },
    description: 'Soluciones integrales en comercio exterior, agenciamiento de aduanas y logística internacional. Más de 15 años de experiencia en Perú.',
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
            <Breadcrumbs />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
