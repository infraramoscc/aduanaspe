import type { Metadata } from 'next';
import { Hero, HubCards, TrustBar, CTASection, SplitFeature } from '@/components/sections';
import { Container } from '@/components/layout';
import { TrackedLink, WhatsAppLink, GA4_EVENTS } from '@/components/tracking';
import { services } from '@/content/services';
import { comercioExteriorCategories } from '@/content/comercioExterior';
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
                badge="Comercio exterior para importadores"
                title="Despacha tu carga con un equipo que sí te responde"
                highlightedWord="sí te responde"
                subtitle="Agenciamiento de aduanas, carga internacional y asesoría con seguimiento claro, respuesta rápida y un ejecutivo asignado para tu operación."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={<TrustBar points={trustPoints} variant="clean" />}
            >
                <WhatsAppLink route="home" variant="button">
                    Escríbenos por WhatsApp
                </WhatsAppLink>
                <TrackedLink
                    href={ROUTES.contacto}
                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                    eventParams={{ location: 'home_hero' }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600"
                >
                    Solicitar cotización
                </TrackedLink>
                <p className="basis-full text-sm text-slate-500 md:text-base">
                    Asesoría sin costo por WhatsApp. Te ayudamos con requisitos, costos y documentación antes de proponerte cualquier servicio.
                </p>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            <section className="border-b border-slate-200/70 bg-white">
                <Container>
                    <div className="grid gap-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                        <div>
                            <span className="section-badge">Sin Riesgo</span>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Primero resolvemos tus dudas. Luego te cotizamos solo si realmente lo necesitas.
                            </h2>
                            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                                Muchas empresas no escriben por miedo al costo o porque no saben si su caso requiere un servicio completo. Por eso, ofrecemos asesoría sin costo: conversamos, revisamos tu operación y te orientamos sin compromiso.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <WhatsAppLink messageKey="asesoria_gratis" variant="button">
                                    Quiero resolver mis dudas
                                </WhatsAppLink>
                                <TrackedLink
                                    href={ROUTES.contacto}
                                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                                    eventParams={{ location: 'home_risk_free' }}
                                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600"
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
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Ejecutivo personal:</strong> Un solo punto de contacto que conoce tu negocio</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Seguimiento constante:</strong> Te informamos el estatus de tu carga sin que tengas que preguntar</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Facturación inmediata:</strong> Documentos listos cuando los necesitas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Capacitación incluida:</strong> Te enseñamos el proceso para que tomes mejores decisiones</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Services Hub */}
            <HubCards
                badge="Nuestros Servicios"
                title="Soluciones que transforman"
                highlightedWord="transforman"
                subtitle="Soluciones integrales para importadores que buscan un socio estratégico, no solo un proveedor"
                items={services}
                basePath="/servicios"
                columns={3}
            />

            {/* For First-time importers */}
            <SplitFeature
                title="¿Primera vez importando?"
                description="No te preocupes, estás en el lugar correcto. Más del 60% de nuestros clientes empezaron sin experiencia en importaciones. Te guiamos paso a paso, te explicamos cada documento y te acompañamos hasta que tu mercancía llegue a tu almacén."
                imageSide="left"
            >
                <TrackedLink
                    href={ROUTES.comercioExterior.importacion}
                    eventName={GA4_EVENTS.CLICK_CTA_TO_COMERCIO}
                    eventParams={{ location: 'home_first_import' }}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-pink"
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
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600"
                >
                    Solicitar cotización
                </TrackedLink>
            </CTASection>
        </>
    );
}
