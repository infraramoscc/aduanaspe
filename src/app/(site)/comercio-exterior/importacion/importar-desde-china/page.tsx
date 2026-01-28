import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Importar desde China',
    description: 'Guía paso a paso para importar productos desde China a Perú. Proveedores, costos, envío y trámites aduaneros.',
};

export default function ImportarDesdeChinaPage() {
    return (
        <>
            <Hero
                title="Importar desde China"
                subtitle="Guía completa para importar productos desde China a Perú. Todo lo que necesitas saber para tu primera importación."
                size="lg"
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '📚', title: 'Guías', description: 'Paso a paso' },
                            { icon: '⚖️', title: 'Normativa', description: 'Actualizada 2026' },
                            { icon: '💡', title: 'Tips', description: 'De expertos' },
                            { icon: '🛠️', title: 'Herramientas', description: 'Gratuitas' },
                        ]}
                    />
                }
            />

            <SplitFeature
                title="¿Por qué importar desde China?"
                description="China es el principal origen de importaciones a Perú, ofreciendo una amplia variedad de productos a precios competitivos. Con la estrategia correcta, puedes encontrar proveedores confiables y optimizar tus costos de importación."
                imageSide="right"
            />

            <SplitFeature
                title="Pasos para importar"
                description="El proceso de importación incluye: 1) Encontrar un proveedor confiable, 2) Negociar precios y condiciones, 3) Elegir el método de envío, 4) Gestionar los trámites aduaneros, 5) Recibir la mercancía en tu almacén. Te guiamos en cada paso."
                imageSide="left"
            >
                <Link href={ROUTES.servicios.agenciamientoAduanas}>
                    <Button>Ver servicio de agenciamiento</Button>
                </Link>
            </SplitFeature>

            <Container>
                <DiagnosticoForm title="¿Quieres importar desde China? Cuéntanos tu proyecto" />
            </Container>

            <CTASection
                title="¿Listo para empezar?"
                subtitle="Te ayudamos a importar tu primer contenedor desde China. Cotización sin compromiso."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Solicitar cotización
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
