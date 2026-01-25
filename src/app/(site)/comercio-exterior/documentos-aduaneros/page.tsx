import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Documentos Aduaneros',
    description: 'Guía completa de documentos para comercio exterior: DAM, Bill of Lading, factura comercial, packing list y más.',
};

export default function DocumentosAduanerosPage() {
    return (
        <>
            <Hero
                title="Documentos Aduaneros"
                subtitle="Aprende a gestionar correctamente la documentación de tus operaciones de comercio exterior."
                size="md"
            />

            <SplitFeature
                title="Documentos de Transporte"
                description="Bill of Lading (BL) para transporte marítimo, Airway Bill (AWB) para aéreo, y Carta Porte para terrestre. Son el contrato de transporte y prueba del embarque."
                imageSide="right"
            />

            <SplitFeature
                title="Documentos Comerciales"
                description="Factura comercial, packing list, certificado de origen y otros documentos requeridos según el tipo de mercancía. Esenciales para el despacho aduanero."
                imageSide="left"
            />

            <Container>
                <DiagnosticoForm title="¿Necesitas ayuda con la documentación?" />
            </Container>

            <CTASection
                title="Gestión documental sin errores"
                subtitle="Nuestro equipo se encarga de preparar y revisar toda la documentación de tu operación."
            >
                <Link href={ROUTES.servicios.agenciamientoAduanas}>
                    <Button size="lg" variant="secondary">
                        Ver agenciamiento de aduanas
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
