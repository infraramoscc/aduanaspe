import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Courier vs Carga',
    description: 'Comparativa entre importar por courier y carga formal. Descubre qué opción te conviene más según tu mercancía.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion/courier-vs-carga',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CourierVsCargaPage() {
    return (
        <>
            <Hero
                title="Courier vs Carga Formal"
                subtitle="¿No sabes qué te conviene más? Te explicamos las diferencias para que tomes la mejor decisión."
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
                title="¿Cuándo usar Courier?"
                description="El courier es ideal para envíos pequeños (menos de 200 USD o 20 kg). Es rápido, sencillo y no requiere agente de aduanas. Perfecto para muestras, compras personales o negocios que están iniciando."
                imageSide="right"
            />

            <SplitFeature
                title="¿Cuándo usar Carga Formal?"
                description="La carga formal (marítima o aérea) es más económica para volúmenes grandes. Requiere agente de aduanas pero te permite importar sin límites de valor. Ideal para negocios establecidos o importaciones regulares."
                imageSide="left"
            >
                <Link href={ROUTES.servicios.agenciamientoAduanas}>
                    <Button>Ver servicio de agenciamiento</Button>
                </Link>
            </SplitFeature>

            <Container>
                <DiagnosticoForm title="¿No estás seguro? Cuéntanos tu caso" />
            </Container>

            <CTASection
                title="Te asesoramos sin compromiso"
                subtitle="Analizamos tu caso y te recomendamos la mejor opción para tu importación."
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
