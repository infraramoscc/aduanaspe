import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection, TrustBar } from '@/components/sections';
import { Button } from '@/components/ui';
import { comercioExteriorCategories } from '@/content/comercioExterior';
import { ROUTES } from '@/lib/routes';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
    title: 'Recursos de Comercio Exterior | Guías y Herramientas',
    description: 'Domina la importación y exportación en Perú. Guías gratuitas, herramientas de cálculo y recursos sobre regímenes aduaneros y documentación.',
};

export default function ComercioExteriorPage() {
    return (
        <>
            <Hero
                badge="📚 Centro de Conocimiento"
                title="Recursos de Comercio Exterior"
                highlightedWord="Recursos"
                subtitle="Todo lo que necesitas saber para importar y exportar en Perú. Guías prácticas, consejos de expertos y herramientas gratuitas."
                size="md"
                showStats={false}
                showFloatingCards={true}
                image={undefined}
                floatingCards={[
                    { icon: '🌎', text: 'Importación', color: 'blue', position: { top: '15%', right: '10%' }, delay: '0s' },
                    { icon: '🚢', text: 'Exportación', color: 'green', position: { top: '45%', right: '5%' }, delay: '1s' },
                    { icon: '⚖️', text: 'Regulaciones', color: 'pink', position: { bottom: '25%', right: '15%' }, delay: '2s' },
                    { icon: '📄', text: 'Documentos', color: 'yellow', position: { bottom: '10%', right: '5%' }, delay: '3s' },
                ]}
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/comercio-exterior/importacion">
                        <Button size="lg" className="w-full sm:w-auto">
                            Empezar a Importar
                        </Button>
                    </Link>
                    <Link href="/comercio-exterior/exportacion">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                            Guías de Exportación
                        </Button>
                    </Link>
                </div>
            </Hero>

            <TrustBar
                points={[
                    { icon: '📚', title: 'Guías', description: 'Paso a paso' },
                    { icon: '⚖️', title: 'Normativa', description: 'Actualizada 2026' },
                    { icon: '💡', title: 'Tips', description: 'De expertos' },
                    { icon: '🛠️', title: 'Herramientas', description: 'Gratuitas' },
                ]}
            />

            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-16">
                        <span className="section-badge">Explora</span>
                        <h2 className="text-3xl font-bold text-slate-900">Categorías de <span className="gradient-text">Recursos</span></h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                            Navega por nuestras secciones especializadas para encontrar la información exacta que necesitas para tu operación.
                        </p>
                    </div>

                    <HubCards
                        items={comercioExteriorCategories}
                        basePath="/comercio-exterior"
                        columns={2} // 2 columnas para que se vean más grandes e importantes
                    />
                </Container>
            </section>

            {/* Sección de Herramientas Rápidas (Nuevo) */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Utilidades</span>
                        <h2 className="text-3xl font-bold text-slate-900">Herramientas <span className="gradient-text">Rápidas</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all group cursor-pointer">
                            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🔢</span>
                            <h3 className="text-xl font-bold text-slate-900">Calculadora de Impuestos</h3>
                            <p className="mt-2 text-slate-600 text-sm">Estima los tributos aduaneros (Ad Valorem, IGV, IPM) de tu importación.</p>
                            <span className="mt-4 inline-block text-blue-600 text-sm font-semibold group-hover:underline">Próximamente →</span>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 hover:shadow-lg transition-all group cursor-pointer">
                            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🔍</span>
                            <h3 className="text-xl font-bold text-slate-900">Buscador de Partidas</h3>
                            <p className="mt-2 text-slate-600 text-sm">Encuentra la subpartida nacional correcta para tu producto.</p>
                            <span className="mt-4 inline-block text-purple-600 text-sm font-semibold group-hover:underline">Próximamente →</span>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all group cursor-pointer">
                            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">📅</span>
                            <h3 className="text-xl font-bold text-slate-900">Tracking de Carga</h3>
                            <p className="mt-2 text-slate-600 text-sm">Rastrea el estado de tu contenedor o carga aérea en tiempo real.</p>
                            <span className="mt-4 inline-block text-green-600 text-sm font-semibold group-hover:underline">Próximamente →</span>
                        </div>
                    </div>
                </Container>
            </section>

            <CTASection
                title="¿Necesitas ayuda personalizada?"
                subtitle="La teoría es buena, pero la experiencia es mejor. Solicita un diagnóstico gratuito de tu operación."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                        Solicitar diagnóstico gratis
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
