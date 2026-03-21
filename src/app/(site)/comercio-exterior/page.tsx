import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection, TrustBar } from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui';
import { comercioExteriorCategories } from '@/content/comercioExterior';
import { ROUTES } from '@/lib/routes';
import { Container } from '@/components/layout';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Recursos de Comercio Exterior | AduanasPE',
    description: 'Domina la importación y exportación en Perú con guías prácticas, herramientas y recursos sobre regímenes aduaneros y documentación.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const quickTools = [
    {
        title: 'Calculadora de impuestos',
        description: 'Estimación referencial de Ad Valorem, IGV e IPM para importaciones.',
        status: 'Próximamente',
    },
    {
        title: 'Buscador de partidas',
        description: 'Apoyo inicial para ubicar la subpartida nacional correcta de tu producto.',
        status: 'Próximamente',
    },
    {
        title: 'Tracking de carga',
        description: 'Consulta rápida del estado de un embarque o carga aérea.',
        status: 'Próximamente',
    },
];

export default function ComercioExteriorPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <Hero
                badge="Comercio Exterior"
                title="Recursos para importar y exportar con más criterio"
                highlightedWord="más criterio"
                subtitle="Guías prácticas, conceptos clave y herramientas para entender tu operación antes de tomar decisiones."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Guías prácticas', description: 'Paso a paso' },
                            { icon: '02', title: 'Normativa base', description: 'Para entender tu operación' },
                            { icon: '03', title: 'Consejos útiles', description: 'Antes de cotizar o importar' },
                            { icon: '04', title: 'Herramientas', description: 'De apoyo comercial' },
                        ]}
                    />
                }
            >
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link href="/comercio-exterior/importacion">
                        <Button size="lg" className="w-full sm:w-auto">
                            Ver guías de importación
                        </Button>
                    </Link>
                    <Link href="/comercio-exterior/exportacion">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                            Ver guías de exportación
                        </Button>
                    </Link>
                </div>
            </Hero>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-16 text-center">
                        <span className="section-badge">Explora</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Categorías de <span className="gradient-text">recursos</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Navega por las áreas clave del comercio exterior para encontrar la información que necesitas.
                        </p>
                    </div>

                    <HubCards
                        items={comercioExteriorCategories}
                        basePath="/comercio-exterior"
                        columns={2}
                    />
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Utilidades</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Herramientas <span className="gradient-text">rápidas</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {quickTools.map((tool, index) => (
                            <div
                                key={tool.title}
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700">
                                    {`0${index + 1}`}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900">{tool.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
                                <span className="mt-4 inline-block text-sm font-semibold text-slate-500">
                                    {tool.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <CTASection
                title="¿Necesitas ayuda personalizada?"
                subtitle="La teoría ayuda, pero revisar tu caso concreto acelera mucho más. Solicita un diagnóstico inicial de tu operación."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Solicitar diagnóstico
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
