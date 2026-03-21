import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Courier vs Carga Formal en Perú | AduanasPE',
    description: 'Comparativa entre courier y carga formal para importar a Perú según peso, valor, urgencia y tipo de mercancía.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion/courier-vs-carga/',
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
                badge="Comparativa"
                title="Courier o carga formal: cuál conviene según tu operación"
                highlightedWord="cuál conviene"
                subtitle="Compara ambas alternativas según valor, peso, urgencia y objetivo comercial antes de importar."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Peso y volumen', description: 'Definen la ruta' },
                            { icon: '02', title: 'Valor de la carga', description: 'Impacta el esquema' },
                            { icon: '03', title: 'Urgencia', description: 'Cambia la decisión' },
                            { icon: '04', title: 'Formalidad', description: 'Según tu operación' },
                        ]}
                    />
                }
            />

            <SplitFeature
                title="Cuándo usar courier"
                description="El courier suele ser útil para envíos pequeños, de bajo valor o con necesidad de rapidez. Es una vía más simple, pero no siempre conviene cuando el volumen empieza a crecer."
                imageSide="right"
            />

            <SplitFeature
                title="Cuándo usar carga formal"
                description="La carga formal suele tener más sentido cuando manejas mayor volumen, necesitas importar de forma recurrente o quieres operar con una estructura más escalable y controlada."
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
                title="Te orientamos sin compromiso"
                subtitle="Analizamos tu caso y te decimos qué alternativa tiene más sentido para tu mercadería."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Recibir asesoría
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
