import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { importacionSubLandings } from '@/content/comercioExterior';

export const metadata: Metadata = {
    title: 'Importación',
    description: 'Guía completa para importar productos a Perú. Aprende sobre proveedores, costos, documentos y más.',
};

export default function ImportacionPage() {
    return (
        <>
            <Hero
                title="Importación a Perú"
                subtitle="Todo lo que necesitas saber para importar productos. Desde encontrar proveedores hasta recibir la mercancía en tu almacén."
                size="md"
            />

            <HubCards
                title="Guías de Importación"
                subtitle="Recursos detallados para cada tipo de operación"
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
