import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Importar desde China a Perú | AduanasPE',
    description: 'Guía para importar desde China a Perú con foco en proveedores, costos, tiempos, envío y trámites aduaneros.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion/importar-desde-china',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ImportarDesdeChinaPage() {
    return (
        <>
            <Hero
                badge="China"
                title="Lo esencial para importar desde China a Perú"
                highlightedWord="importar desde China a Perú"
                subtitle="Revisa proveedores, costos, tiempos y decisiones operativas antes de iniciar tu primera compra internacional."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Proveedor', description: 'Validación inicial' },
                            { icon: '02', title: 'Costos', description: 'Antes de comprar' },
                            { icon: '03', title: 'Envío', description: 'Según tipo de carga' },
                            { icon: '04', title: 'Aduanas', description: 'Paso siguiente' },
                        ]}
                    />
                }
            />

            <SplitFeature
                title="Por qué muchos importadores empiezan en China"
                description="China concentra una gran oferta de productos y proveedores, pero eso no elimina los riesgos. Elegir bien al proveedor y entender el costo total sigue siendo clave."
                imageSide="right"
            />

            <SplitFeature
                title="Qué debes ordenar antes de comprar"
                description="Antes de cerrar la compra conviene revisar documentación del proveedor, forma de pago, modalidad de envío, permisos aplicables y estructura de costos para evitar sorpresas posteriores."
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
                title="Empieza con una base más clara"
                subtitle="Te ayudamos a revisar tu operación antes de comprometer compra, envío y despacho."
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
