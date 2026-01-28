import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Exportación',
    description: 'Guía para exportar desde Perú. Aprende sobre mercados, beneficios tributarios y cómo expandir tu negocio internacionalmente.',
};

export default function ExportacionPage() {
    return (
        <>
            <Hero
                title="Exportación desde Perú"
                subtitle="Expande tu negocio al mundo. Te guiamos en todo el proceso de exportación."
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
                title="Beneficios de exportar"
                description="Exportar te permite acceder a nuevos mercados, diversificar tus ingresos y aprovechar beneficios tributarios como el drawback y la devolución del IGV."
                imageSide="right"
            />

            <Container>
                <DiagnosticoForm title="¿Quieres exportar? Cuéntanos tu proyecto" />
            </Container>

            <CTASection
                title="Inicia tu proyecto de exportación"
                subtitle="Te asesoramos sobre los mejores mercados para tus productos."
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
