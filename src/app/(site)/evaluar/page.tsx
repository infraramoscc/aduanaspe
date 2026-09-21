import type { Metadata } from 'next';
import { Container } from '@/components/layout';
import { Hero, TrustBar } from '@/components/sections';
import { PrecotizacionForm } from '@/components/forms';
import { WhatsAppLink, TrackedLink, GA4_EVENTS } from '@/components/tracking';

export const metadata: Metadata = {
    title: 'Evaluar Operación | AduanasPE',
    description: 'Envíanos los datos básicos de tu operación logística o aduanera. Confirmaremos viabilidad y alcance sin costo antes de cotizar.',
    alternates: {
        canonical: 'https://aduanaspe.com/evaluar/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function EvaluarPage() {
    return (
        <>
            <Hero
                badge="Evaluación inicial"
                title="Envíanos los datos de tu operación"
                highlightedWord="operación"
                subtitle="Primero confirmamos si el caso es viable, qué servicio corresponde y qué información falta. Si contamos con lo necesario, preparamos el alcance para cotizar."
                size="md"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { title: 'Evaluación sin costo', description: 'Sin compromiso' },
                            { title: 'Primera respuesta rápida', description: 'Dentro de 1 hora hábil' },
                            { title: 'Toda etapa', description: 'Planificando o carga lista' },
                            { title: 'Privacidad segura', description: 'Tus datos están protegidos' },
                        ]}
                    />
                }
            />

            <section className="bg-[var(--home-canvas)] py-16 md:py-24">
                <Container size="md">
                    <div className="rounded-[2rem] border border-[var(--home-border-soft)] bg-white p-6 shadow-sm sm:p-10">
                        <PrecotizacionForm variant="home" title="Datos para evaluar y cotizar" serviceName="evaluar-page" />
                        
                        <div className="mt-10 border-t border-[var(--home-border)] pt-8">
                            <ul className="space-y-4 text-sm font-semibold leading-6 text-[var(--home-ink)]">
                                {[
                                    'No necesitas conocer todos los términos técnicos.',
                                    'La evaluación inicial no te compromete a contratar.',
                                    'No envíes contraseñas, datos bancarios ni información sensible.',
                                ].map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--action-whatsapp)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm leading-6 text-[var(--home-muted)]">
                                La primera respuesta se realiza dentro de 1 hora durante el horario de atención. La cotización final puede requerir información o confirmaciones adicionales según el tipo de servicio.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-16 md:py-24 border-t border-[var(--home-border-soft)]">
                <Container size="lg" className="relative">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-balance text-3xl font-extrabold leading-[1.03] tracking-[-0.03em] text-[var(--home-ink)] md:text-5xl">
                            ¿Tu caso es muy urgente?
                        </h2>
                        <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-8 text-[var(--home-muted)]">
                            Si tienes carga retenida, multas de SUNAT o necesitas una respuesta inmediata, escríbenos directamente por WhatsApp.
                        </p>
                        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                            <WhatsAppLink route="evaluar-urgente" messageKey="asesoria_gratis" variant="button" className="text-base h-14 px-8">
                                Hablar por WhatsApp
                            </WhatsAppLink>
                            <TrackedLink
                                href="/contacto"
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'evaluar_footer', label: 'Contacto general' }}
                                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-base font-bold text-slate-700 transition-colors hover:border-[#3C3794] hover:bg-[#F5F3FF] hover:text-[#3C3794]"
                            >
                                Contacto general
                            </TrackedLink>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
