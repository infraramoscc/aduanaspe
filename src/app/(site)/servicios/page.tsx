import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection, TrustBar } from '@/components/sections';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
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
                size="lg"
                showStats={false}
                showFloatingCards={true}
                centered={true}
                footer={<TrustBar variant="clean" />}
            >
                <WhatsAppLink messageKey="general" variant="button">
                    Contratar servicio integral
                </WhatsAppLink>
                <Link href="#servicios-disponibles">
                    <Button variant="secondary" size="lg">
                        Mostrar servicios disponibles
                    </Button>
                </Link>
            </Hero>

            <HubCards
                id="servicios-disponibles"
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
