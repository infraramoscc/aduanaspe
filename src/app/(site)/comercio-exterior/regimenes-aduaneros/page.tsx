import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Regímenes Aduaneros',
    description: 'Conoce los diferentes regímenes aduaneros en Perú: importación para el consumo, admisión temporal, reimportación y más.',
};

export default function RegimenesAduanerosPage() {
    return (
        <>
            <Hero
                title="Regímenes Aduaneros"
                subtitle="Conoce los diferentes regímenes y elige el más conveniente para tu operación."
                size="md"
            />

            <SplitFeature
                title="Importación para el Consumo"
                description="El régimen más común. Permite el ingreso definitivo de mercancías extranjeras al territorio nacional para su libre disposición, previo pago de tributos."
                imageSide="right"
            />

            <SplitFeature
                title="Admisión Temporal"
                description="Permite el ingreso de mercancías sin pagar tributos, con la obligación de reexportarlas en un plazo determinado. Ideal para maquinaria, equipos de exhibición o reparación."
                imageSide="left"
            />

            <Container>
                <DiagnosticoForm title="¿Dudas sobre qué régimen te conviene?" />
            </Container>

            <CTASection
                title="Asesoría en regímenes aduaneros"
                subtitle="Te ayudamos a elegir el régimen que optimice tus costos y operaciones."
            >
                <Link href={ROUTES.servicios.consultoriaAduanera}>
                    <Button size="lg" variant="secondary">
                        Ver asesoría aduanera
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
