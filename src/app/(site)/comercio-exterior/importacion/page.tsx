import type { Metadata } from 'next';
import { Hero, HubCards, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { importacionSubLandings } from '@/content/comercioExterior';

export const metadata: Metadata = {
    title: 'Guía de Importación a Perú | AduanasPE',
    description: 'Guía para importar a Perú con información sobre proveedores, costos, documentos, modalidades de compra y decisiones logísticas clave.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/importacion',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ImportacionPage() {
    return (
        <>
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

            <Container>
                <DiagnosticoForm title="¿Quieres importar? Cuéntanos tu proyecto" />
            </Container>
        </>
    );
}
