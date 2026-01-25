import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection } from '@/components/sections';
import { PrecotizacionForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Importa Puerta a Puerta',
    description: 'Servicio integral de importación puerta a puerta. Nos encargamos de todo para que recibas tu mercancía en tu almacén.',
};

export default function ImportaPuertaAPuertaPage() {
    return (
        <>
            <Hero
                title="Importa Puerta a Puerta"
                subtitle="El servicio más completo. Recogemos tu mercancía en origen y la entregamos en tu almacén en Perú."
                size="md"
            />

            <SplitFeature
                title="¿Qué incluye el servicio?"
                description="Nos encargamos de todo: recojo en fábrica del proveedor, consolidación, transporte internacional, trámites aduaneros y entrega en tu almacén. Tú solo elige el producto, nosotros hacemos el resto."
                imageSide="right"
            />

            <SplitFeature
                title="Ventajas del servicio"
                description="Un solo interlocutor para toda la operación, precios todo incluido sin sorpresas, seguimiento en tiempo real, y la tranquilidad de saber que expertos manejan tu carga."
                imageSide="left"
            >
                <Link href={ROUTES.servicios.agenciaCargaInternacional}>
                    <Button>Ver agenciamiento de carga</Button>
                </Link>
            </SplitFeature>

            <Container>
                <PrecotizacionForm title="Cotiza tu importación Puerta a Puerta" serviceName="puerta-a-puerta" />
            </Container>

            <CTASection
                title="Importación sin complicaciones"
                subtitle="Déjanos el trabajo pesado. Enfócate en tu negocio."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Contactar ahora
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
