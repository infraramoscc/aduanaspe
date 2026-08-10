import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CampaignHero } from '@/components/ads';
import { CTASection } from '@/components/sections';
import { DiagnosticoForm, PrecotizacionForm, ContactoForm } from '@/components/forms';
import { Container } from '@/components/layout';
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
            <CampaignHero
                eyebrow={lp.eyebrow}
                title={lp.title}
                subtitle={lp.subtitle}
                imageSrc={lp.heroImage}
                imageAlt={lp.heroImageAlt}
                benefits={lp.benefits}
                trustNote={lp.trustNote}
                actions={
                    <>
                        <a
                            href={lp.ctaLink}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-white px-7 py-3 font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                            {lp.ctaLabel}
                        </a>
                        <WhatsAppLink messageKey="general" variant="button">
                            Escribir por WhatsApp
                        </WhatsAppLink>
                    </>
                }
            />

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
