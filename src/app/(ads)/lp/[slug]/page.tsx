import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/sections';
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
            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#172033_0%,#22314a_100%)] py-16 text-white md:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_left,rgba(15,159,110,0.12),transparent_22%)]" />
                <Container>
                    <div className="relative mx-auto max-w-3xl text-center">
                        <Link href="/" className="mb-8 inline-block">
                            <span className="text-2xl font-bold text-white">AduanasPE</span>
                        </Link>

                        <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                            {lp.title}
                        </h1>
                        <p className="mt-6 text-xl text-slate-200">{lp.subtitle}</p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a href={lp.ctaLink}>
                                <Button size="lg" variant="secondary">
                                    {lp.ctaLabel}
                                </Button>
                            </a>
                            <WhatsAppLink messageKey="general" variant="button">
                                Escribir por WhatsApp
                            </WhatsAppLink>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="border-b border-slate-200 bg-slate-50 py-8">
                <Container>
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <span className="text-2xl font-bold text-slate-900">Atención directa</span>
                            <p className="text-sm text-slate-600">Sin desvíos innecesarios</p>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-slate-900">Seguimiento claro</span>
                            <p className="text-sm text-slate-600">Durante el proceso</p>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-slate-900">Respuesta rápida</span>
                            <p className="text-sm text-slate-600">En horario de atención</p>
                        </div>
                    </div>
                </Container>
            </div>

            {lp.showForm && lp.formType && (
                <Container>
                    <div id="form">
                        <FormByType type={lp.formType} slug={slug} />
                    </div>
                </Container>
            )}

            <CTASection
                title="¿Prefieres que te llamemos?"
                subtitle="Déjanos tus datos o escríbenos por WhatsApp y revisamos tu caso."
            >
                <WhatsAppLink messageKey="general" variant="button">
                    Contactar por WhatsApp
                </WhatsAppLink>
            </CTASection>
        </>
    );
}
