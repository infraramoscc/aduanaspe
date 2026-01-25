import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection } from '@/components/sections';
import { Button } from '@/components/ui';
import { comercioExteriorCategories } from '@/content/comercioExterior';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Comercio Exterior',
    description: 'Guías y recursos para importación, exportación, regímenes aduaneros y documentos. Aprende todo sobre comercio exterior en Perú.',
};

export default function ComercioExteriorPage() {
    return (
        <>
            <Hero
                title="Comercio Exterior"
                subtitle="Todo lo que necesitas saber para importar y exportar en Perú. Guías, consejos y recursos gratuitos."
                size="md"
            />

            <HubCards
                items={comercioExteriorCategories}
                basePath="/comercio-exterior"
                columns={4}
            />

            <CTASection
                title="¿Necesitas ayuda personalizada?"
                subtitle="Solicita un diagnóstico gratuito y te asesoramos sobre la mejor estrategia para tu operación."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Solicitar diagnóstico gratis
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
