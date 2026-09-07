import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, TrustBar, CTASection, SplitFeature, EditorialMedia } from '@/components/sections';
import { Container } from '@/components/layout';
import { TrackedLink, WhatsAppLink, GA4_EVENTS } from '@/components/tracking';
import { services } from '@/content/services';
import { comercioExteriorCategories } from '@/content/comercioExterior';
import { mainPageImages } from '@/content/mainPageImages';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Agencia de Aduanas y Carga Internacional en Perú | AduanasPE',
    description: 'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior con atención personalizada, seguimiento claro y respuesta rápida.',
    alternates: {
        canonical: 'https://aduanaspe.com/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Trust points con datos reales
const trustPoints = [
    {
        icon: '👤',
        title: 'Ejecutivo Asignado',
        description: 'Atención personalizada',
    },
    {
        icon: '⚡',
        title: 'Respuesta en 1 hora',
        description: 'En horario de atención',
    },
    {
        icon: '📍',
        title: 'Operación desde Callao',
        description: 'Cobertura nacional',
    },
    {
        icon: '🧾',
        title: '+5 Años',
        description: 'Despachos y asesoría',
    },
];

export default function HomePage() {
    return (
        <>
            {/* Hero Section - Premium con stats y floating cards */}
            <Hero
                badge="Importadores y exportadores en Perú"
                title="Tu próximo paso en comercio exterior, con claridad"
                highlightedWord="con claridad"
                subtitle="Entiende qué necesitas para importar o exportar. Te orientamos sobre documentos, costos y trámites; si necesitas apoyo, coordinamos aduanas y carga internacional."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={false}
                editorialImage={mainPageImages.home.hero}
                footer={<TrustBar points={trustPoints} variant="clean" />}
            >
                <WhatsAppLink route="home" variant="button">
                    Escríbenos por WhatsApp
                </WhatsAppLink>
                <TrackedLink
                    href="#empieza-aqui"
                    eventName={GA4_EVENTS.CLICK_CTA_TO_COMERCIO}
                    eventParams={{ location: 'home_hero' }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-[#3C3794] hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                >
                    Quiero aprender primero
                </TrackedLink>
                <p className="basis-full text-sm text-slate-500 md:text-base">
                    Asesoría sin costo por WhatsApp. Te ayudamos con requisitos, costos y documentación antes de proponerte cualquier servicio.
                </p>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            <section id="empieza-aqui" aria-labelledby="empieza-titulo" className="scroll-mt-44 border-b border-slate-200 bg-slate-50 py-12 md:py-16">
                <Container>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#3C3794]">Empieza por tu necesidad</p>
                    <h2 id="empieza-titulo" className="mt-3 text-balance text-3xl font-bold text-slate-950 md:text-4xl">¿Qué quieres hacer?</h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">No necesitas conocer los términos aduaneros. Elige una ruta y avanza a tu ritmo.</p>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Link href={ROUTES.comercioExterior.importacion} className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#3C3794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]">
                            <h3 className="text-xl font-bold text-slate-900">Quiero importar</h3>
                            <p className="mt-3 leading-7 text-slate-600">Requisitos, documentos y decisiones que conviene revisar antes de comprar.</p>
                            <span className="mt-5 block font-semibold text-[#3C3794]">Ver guías de importación <span aria-hidden="true">→</span></span>
                        </Link>
                        <Link href={ROUTES.comercioExterior.exportacion} className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#3C3794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]">
                            <h3 className="text-xl font-bold text-slate-900">Quiero exportar</h3>
                            <p className="mt-3 leading-7 text-slate-600">Conoce los pasos para preparar una venta y enviar mercancías al exterior.</p>
                            <span className="mt-5 block font-semibold text-[#3C3794]">Ver guías de exportación <span aria-hidden="true">→</span></span>
                        </Link>
                        <Link href={ROUTES.comercioExterior.acuerdosComerciales} className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#3C3794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]">
                            <h3 className="text-xl font-bold text-slate-900">Quiero entender un acuerdo comercial</h3>
                            <p className="mt-3 leading-7 text-slate-600">Explora reglas de origen, certificados y casos de China, Estados Unidos y Unión Europea.</p>
                            <span className="mt-5 block font-semibold text-[#3C3794]">Explorar acuerdos <span aria-hidden="true">→</span></span>
                        </Link>
                    </div>
                    <p className="mt-6 text-slate-600">¿Ya tienes una operación en marcha? <Link href={ROUTES.contacto} className="font-semibold text-[#3C3794] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Cuéntanos en qué etapa estás.</Link></p>
                </Container>
            </section>

            <section className="border-b border-slate-200/70 bg-white">
                <Container>
                    <div className="grid gap-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                        <div>
                            <span className="section-badge">Sin compromiso</span>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Primero te escuchamos. Después, decides.
                            </h2>
                            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                                Cuéntanos qué producto quieres mover y qué te preocupa. Te orientamos sin costo; si hace falta una gestión especializada, te explicamos su alcance antes de cotizar.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <WhatsAppLink messageKey="asesoria_gratis" variant="button">
                                    Quiero resolver mis dudas
                                </WhatsAppLink>
                                <TrackedLink
                                    href={ROUTES.contacto}
                                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                                    eventParams={{ location: 'home_risk_free' }}
                                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:border-[#3C3794] hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                                >
                                    Prefiero que me contacten
                                </TrackedLink>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="service-card service-green p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">01</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Asesoría sin costo</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">Te escuchamos y resolvemos tus dudas sin cobrar por esa asesoría.</p>
                            </div>
                            <div className="service-card service-blue p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">02</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Sin compromiso</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">Si tu caso es simple, te orientamos. Si requiere más, recién te proponemos el servicio adecuado.</p>
                            </div>
                            <div className="service-card service-pink p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fuchsia-700">03</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Te damos claridad</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">Resolvemos dudas sobre requisitos, costos, documentos y próximos pasos.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Value Proposition */}
            <SplitFeature
                title="¿Por qué trabajar con nosotros?"
                description="Sabemos que importar puede ser complejo y estresante. Por eso, no te tratamos como un cliente más. Desde el primer contacto, te asignamos un ejecutivo que se encargará personalmente de tus operaciones, te mantendrá informado en cada paso y resolverá tus dudas en tiempo real."
                imageSide="right"
                image={<EditorialMedia image={mainPageImages.home.middle} />}
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span><strong>Ejecutivo personal:</strong> Un solo punto de contacto que conoce tu negocio</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span><strong>Seguimiento constante:</strong> Te informamos el estatus de tu carga sin que tengas que preguntar</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span><strong>Facturación inmediata:</strong> Documentos listos cuando los necesitas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span><strong>Capacitación incluida:</strong> Te enseñamos el proceso para que tomes mejores decisiones</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Services Hub */}
            <HubCards
                badge="Nuestros Servicios"
                title="Apoyo para cada etapa de tu operación"
                highlightedWord="cada etapa"
                subtitle="Conoce qué hace cada servicio y cuándo puede ayudarte. Si no sabes cuál elegir, podemos orientarte."
                items={services}
                basePath="/servicios"
                columns={3}
            />

            {/* For First-time importers */}
            <SplitFeature
                title="¿Primera vez importando?"
                description="Puedes empezar por lo básico: qué producto traerás, qué requisitos tiene y qué costos debes considerar. Nuestras guías te ayudan a ordenar esas preguntas antes de comprar al proveedor."
                imageSide="left"
                image={<EditorialMedia image={mainPageImages.home.lower} aspect="compact" />}
            >
                <TrackedLink
                    href={ROUTES.comercioExterior.importacion}
                    eventName={GA4_EVENTS.CLICK_CTA_TO_COMERCIO}
                    eventParams={{ location: 'home_first_import' }}
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_62%,#38BDF8_100%)] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-pink"
                >
                    Ver guías de importación
                </TrackedLink>
            </SplitFeature>

            {/* Comercio Exterior Hub */}
            <HubCards
                title="Aprende sobre Comercio Exterior"
                subtitle="Recursos gratuitos para que tomes decisiones informadas en tus operaciones"
                items={comercioExteriorCategories}
                basePath="/comercio-exterior"
                columns={4}
            />

            {/* CTA Section */}
            <CTASection
                title="¿Tienes dudas antes de importar?"
                highlightedWord="dudas"
                subtitle="Escríbenos hoy y recibe asesoría sin costo. Primero resolvemos tu caso; si hace falta, luego cotizamos el servicio correcto."
            >
                <WhatsAppLink route="home-cta" messageKey="asesoria_gratis" variant="button">
                    Resolver mis dudas por WhatsApp
                </WhatsAppLink>
                <TrackedLink
                    href={ROUTES.contacto}
                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                    eventParams={{ location: 'home_final_cta' }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-[#3C3794] hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                >
                    Solicitar cotización
                </TrackedLink>
            </CTASection>
        </>
    );
}
