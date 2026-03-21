import type { Metadata } from 'next';
import { RecommendedReading } from '@/components/blog';
import { Hero, HubCards, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { importacionSubLandings } from '@/content/comercioExterior';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Guía de Importación a Perú | AduanasPE',
    description: 'Guía para importar a Perú con información sobre proveedores, costos, documentos, modalidades de compra y decisiones logísticas clave.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ImportacionPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
        { name: 'Importacion', url: 'https://aduanaspe.com/comercio-exterior/importacion/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <Hero
                badge="Importación"
                title="Todo lo básico para importar a Perú con mejor criterio"
                highlightedWord="mejor criterio"
                subtitle="Desde proveedores y costos hasta documentos y modalidades de ingreso: aquí tienes el mapa inicial para ordenar tu operación."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Proveedores', description: 'Evaluación inicial' },
                            { icon: '02', title: 'Costos', description: 'Antes de comprar' },
                            { icon: '03', title: 'Documentos', description: 'Para importar bien' },
                            { icon: '04', title: 'Modalidades', description: 'Según tu carga' },
                        ]}
                    />
                }
            />

            <HubCards
                title="Rutas de importación"
                subtitle="Elige la guía o modalidad que mejor encaje con tu tipo de operación."
                items={importacionSubLandings}
                basePath="/comercio-exterior/importacion"
                columns={3}
            />

            <RecommendedReading
                title="Empieza por las dudas que mas afectan una primera importacion"
                subtitle="Estas guias resuelven las preguntas que suelen definir si una compra internacional conviene o no."
                slugs={[
                    'como-importar-por-primera-vez-en-peru',
                    'como-calcular-costos-de-importacion-en-peru',
                    'como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru',
                ]}
            />
            <Container>
                <DiagnosticoForm title="¿Quieres importar? Cuéntanos tu proyecto" />
            </Container>
        </>
    );
}
