import type { Metadata } from 'next';
import { Hero, HubCards, CTASection, TrustBar, EditorialMedia, SplitFeature } from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';
import { services } from '@/content/services';
import { mainPageImages } from '@/content/mainPageImages';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Servicios de Aduanas y Logística | AduanasPE',
    description: 'Servicios de agenciamiento de aduanas, carga internacional, transporte, resguardo y consultoría para operaciones de comercio exterior en Perú.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ServiciosPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <Hero
                badge="Servicios"
                title="Encuentra el servicio que necesita tu operación"
                highlightedWord="necesita tu operación"
                subtitle="Elige una etapa concreta o cuéntanos tu caso. Coordinamos aduanas, carga internacional, transporte y respuesta técnica ante SUNAT con un solo equipo."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                editorialImage={mainPageImages.services.hero}
                centered={false}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Flete internacional', description: 'Marítimo y aéreo' },
                            { icon: '02', title: 'Despacho aduanero', description: 'Con seguimiento claro' },
                            { icon: '03', title: 'Entrega local', description: 'Coordinación final' },
                            { icon: '04', title: 'Asesoría continua', description: 'Antes y después de operar' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="services-hero" messageKey="general" variant="button">
                    Orientarme por WhatsApp
                </WhatsAppLink>
                <TrackedLink
                    href="#servicios-disponibles"
                    eventName={GA4_EVENTS.CLICK_CTA_TO_SERVICIOS}
                    eventParams={{ location: 'services_hero' }}
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--home-border)] bg-white px-7 py-3.5 text-lg font-bold text-[var(--home-ink)] transition-colors hover:border-[var(--home-brand)] hover:text-[var(--home-brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                >
                    Ver servicios disponibles
                </TrackedLink>
            </Hero>

            <SplitFeature
                title="Una operación ordenada empieza antes del despacho"
                description="Revisamos la información comercial y aduanera para identificar requisitos, documentos y próximos pasos antes de coordinar la ejecución."
                imageSide="right"
                image={<EditorialMedia image={mainPageImages.services.middle} />}
            />

            <HubCards
                id="servicios-disponibles"
                badge="Mapa de servicios"
                title="Elige la etapa donde necesitas apoyo"
                highlightedWord="necesitas apoyo"
                items={services}
                basePath="/servicios"
                columns={3}
                trackingLocation="services_hub"
            />

            <SplitFeature
                title="Cada etapa conversa con la siguiente"
                description="Conectamos la coordinación internacional, el despacho y la entrega local para que tengas un punto de contacto y una secuencia operativa clara."
                imageSide="left"
                image={<EditorialMedia image={mainPageImages.services.lower} aspect="compact" />}
            />

            <CTASection
                title="Si aún no tienes claro qué contratar"
                highlightedWord="qué contratar"
                subtitle="Cuéntanos tu carga, origen y objetivo comercial. Te indicamos el servicio correcto sin hacerte pasar por varias áreas."
            >
                <TrackedLink
                    href={ROUTES.contacto}
                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                    eventParams={{ location: 'services_final_cta' }}
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--home-brand)] px-8 py-4 text-lg font-bold text-white shadow-[0_16px_35px_-18px_rgba(60,55,148,0.8)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[var(--home-brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                >
                    Recibir orientación
                </TrackedLink>
            </CTASection>
        </>
    );
}
