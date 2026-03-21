import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { PrecotizacionForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Importación Puerta a Puerta en Perú | AduanasPE',
    description: 'Conoce cómo funciona una importación puerta a puerta y cuándo conviene frente a otras modalidades de compra e internamiento.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion/importa-puerta-a-puerta/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ImportaPuertaAPuertaPage() {
    return (
        <>
            <Hero
                badge="Puerta a puerta"
                title="Importación integral desde origen hasta tu almacén"
                highlightedWord="desde origen hasta tu almacén"
                subtitle="Entiende cómo funciona esta modalidad y cuándo conviene delegar toda la cadena operativa en un solo equipo."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Recojo en origen', description: 'Desde proveedor o fábrica' },
                            { icon: '02', title: 'Tránsito internacional', description: 'Con coordinación central' },
                            { icon: '03', title: 'Despacho aduanero', description: 'Dentro del flujo' },
                            { icon: '04', title: 'Entrega final', description: 'Hasta tu almacén' },
                        ]}
                    />
                }
            />

            <SplitFeature
                title="Qué incluye esta modalidad"
                description="Una importación puerta a puerta integra recojo, consolidación, transporte internacional, despacho aduanero y entrega local dentro de una sola coordinación operativa."
                imageSide="right"
            />

            <SplitFeature
                title="Cuándo suele convenir"
                description="Suele ser una buena alternativa cuando quieres reducir fricción operativa, evitar coordinar varios proveedores y tener una sola línea de seguimiento durante la importación."
                imageSide="left"
            >
                <Link href={ROUTES.servicios.agenciaCargaInternacional}>
                    <Button>Ver agenciamiento de carga</Button>
                </Link>
            </SplitFeature>

            <Container>
                <PrecotizacionForm title="Cotiza tu importación puerta a puerta" serviceName="puerta-a-puerta" />
            </Container>

            <CTASection
                title="Importación más ordenada, menos fricción"
                subtitle="Cuéntanos tu carga y te decimos si esta modalidad encaja con tu operación."
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
