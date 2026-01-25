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
                title="Nuestros Servicios"
                subtitle="Soluciones integrales para cada etapa de tu operación de comercio exterior"
                size="md"
            />

            <HubCards
                items={services}
                basePath="/servicios"
                columns={3}
            />

            <CTASection
                title="¿No sabes qué servicio necesitas?"
                subtitle="Contáctanos y te asesoramos sin compromiso. Te ayudamos a identificar la mejor solución para tu operación."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Recibir asesoría gratis
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
