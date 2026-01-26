import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection } from '@/components/sections';
import { Button } from '@/components/ui';
import { services } from '@/content/services';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Servicios',
    description: 'Servicios de agenciamiento de aduanas, logística internacional, transporte y asesoría aduanera en Perú. Soluciones completas para tu comercio exterior.',
};

export default function ServiciosPage() {
    return (
        <>
            <Hero
                badge="✨ Servicios"
                title="Soluciones que transforman tu negocio"
                highlightedWord="transforman"
                subtitle="Servicios integrales para cada etapa de tu operación de comercio exterior"
                size="md"
                showStats={false}
                showFloatingCards={false}
            />

            <HubCards
                badge="Nuestros Servicios"
                title="¿Qué podemos hacer por ti?"
                highlightedWord="hacer"
                items={services}
                basePath="/servicios"
                columns={3}
            />

            <CTASection
                title="¿No sabes qué servicio necesitas?"
                highlightedWord="necesitas"
                subtitle="Contáctanos y te asesoramos sin compromiso. Te ayudamos a identificar la mejor solución para tu operación."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg">
                        Recibir asesoría gratis
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
