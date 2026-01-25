import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Hero, CTASection } from '@/components/sections';
import { DiagnosticoForm, PrecotizacionForm, ContactoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { landingPages, getLandingBySlug } from '@/content/lp';
import { generateAdsMetadata } from '@/lib/seo';

interface LPPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return landingPages.map((lp) => ({
        slug: lp.slug,
    }));
}

export async function generateMetadata({ params }: LPPageProps): Promise<Metadata> {
    const { slug } = await params;
    const lp = getLandingBySlug(slug);

    if (!lp) {
        return generateAdsMetadata('Landing no encontrada', 'Página no encontrada');
    }

    return generateAdsMetadata(lp.title, lp.subtitle);
}

function FormByType({ type, slug }: { type: string; slug: string }) {
    switch (type) {
        case 'diagnostico':
            return <DiagnosticoForm />;
        case 'precotizacion':
            return <PrecotizacionForm serviceName={slug} />;
        case 'contacto':
            return <ContactoForm />;
        default:
            return <ContactoForm />;
    }
}

export default async function LPPage({ params }: LPPageProps) {
    const { slug } = await params;
    const lp = getLandingBySlug(slug);

    if (!lp) {
        notFound();
    }

    return (
        <>
            {/* Hero sin navegación, enfocado en conversión */}
            <div className="bg-gradient-to-br from-indigo-950 via-violet-800 to-fuchsia-700 text-white py-16 md:py-24 relative overflow-hidden">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Logo simple */}
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-2xl font-bold text-white">AduanasPE</span>
                        </Link>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            {lp.title}
                        </h1>
                        <p className="mt-6 text-xl text-violet-100">
                            {lp.subtitle}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <a href={lp.ctaLink}>
                                <Button size="lg" variant="secondary">
                                    {lp.ctaLabel}
                                </Button>
                            </a>
                            <WhatsAppLink messageKey="general" variant="button">
                                WhatsApp
                            </WhatsAppLink>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Trust points rápidos */}
            <div className="py-8 bg-gray-50 border-b border-gray-200">
                <Container>
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <span className="text-2xl font-bold text-violet-600">+15</span>
                            <p className="text-sm text-gray-600">Años de experiencia</p>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-fuchsia-600">+500</span>
                            <p className="text-sm text-gray-600">Clientes satisfechos</p>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-cyan-600">24h</span>
                            <p className="text-sm text-gray-600">Respuesta garantizada</p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Form Section */}
            {lp.showForm && lp.formType && (
                <Container>
                    <div id="form">
                        <FormByType type={lp.formType} slug={slug} />
                    </div>
                </Container>
            )}

            {/* Final CTA */}
            <CTASection
                title="¿Prefieres que te llamemos?"
                subtitle="Déjanos tu número y te contactamos en minutos."
            >
                <WhatsAppLink messageKey="general" variant="button">
                    Contactar por WhatsApp
                </WhatsAppLink>
            </CTASection>
        </>
    );
}
