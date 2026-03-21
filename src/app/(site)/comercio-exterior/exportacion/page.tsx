import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Guía de Exportación desde Perú | AduanasPE',
    description: 'Aprende cómo exportar desde Perú, revisar beneficios tributarios y entender los pasos clave para abrir mercados internacionales.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/exportacion/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ExportacionPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
        { name: 'Exportacion', url: 'https://aduanaspe.com/comercio-exterior/exportacion/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <Hero
                badge="Exportación"
                title="Guía para exportar desde Perú con más claridad"
                highlightedWord="más claridad"
                subtitle="Revisa beneficios, requisitos y pasos operativos para empezar a exportar con una base más sólida."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Mercados objetivo', description: 'Evaluación inicial' },
                            { icon: '02', title: 'Documentación', description: 'Base para exportar' },
                            { icon: '03', title: 'Beneficios', description: 'Tributarios y operativos' },
                            { icon: '04', title: 'Ruta exportadora', description: 'Paso a paso' },
                        ]}
                    />
                }
            />

            <SplitFeature
                title="Qué debes revisar antes de exportar"
                description="Exportar no consiste solo en vender afuera. También implica validar mercado, preparar documentos, revisar costos logísticos y entender el régimen aplicable para tu producto."
                imageSide="right"
            />

            <Container>
                <DiagnosticoForm title="¿Quieres exportar? Cuéntanos tu proyecto" />
            </Container>

            <CTASection
                title="Inicia tu proyecto de exportación"
                subtitle="Te ayudamos a ordenar la parte operativa antes de dar el siguiente paso."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Solicitar asesoría
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
