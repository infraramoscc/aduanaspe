import type { Metadata } from 'next';
import { Container } from '@/components/layout';
import { Hero, TrustBar } from '@/components/sections';
import { ContactoForm } from '@/components/forms';
import { TrackedLink, WhatsAppLink, GA4_EVENTS } from '@/components/tracking';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';

export const metadata: Metadata = {
    title: 'Contacto y Cotizaciones | AduanasPE',
    description: 'Escríbenos por WhatsApp o déjanos tus datos para cotizar servicios de aduanas, carga internacional y comercio exterior en Perú.',
    alternates: {
        canonical: 'https://aduanaspe.com/contacto',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Información de contacto
const contactInfo = {
    whatsapp: '+51 963 461 006',
    whatsappLink: 'https://wa.me/51963461006',
    email: 'info@aduanaspe.com',
    location: 'Callao, Perú',
    workMode: 'Atención 100% remota – Clientes de todo el Perú',
};

// Horarios
const schedules = [
    {
        area: 'Atención General',
        hours: 'Lunes a Viernes: 8:00 am - 6:00 pm',
        icon: '🏢',
    },
    {
        area: 'Cotizaciones',
        hours: 'Lunes a Viernes: 8:00 am - 10:00 pm',
        icon: '💼',
    },
    {
        area: 'Sábados',
        hours: '8:00 am - 12:00 pm',
        icon: '📅',
    },
];

const faqs = [
    { question: '¿Cuánto demoran en responder?', answer: 'Por WhatsApp respondemos en menos de 1 hora durante horario de atención. Por email, máximo 24 hours.' },
    { question: '¿Atienden los fines de semana?', answer: 'Sábados de 8am a 12pm para cotizaciones. Domingos no laboramos.' },
    { question: '¿Atienden a clientes de provincia?', answer: 'Sí, atendemos clientes de todo el Perú. Trabajamos 100% remoto.' },
    { question: '¿La asesoría tiene costo?', answer: 'No, la asesoría sin costo no tiene compromiso. Si luego tu caso requiere gestión especializada o un análisis más complejo, te presentamos la opción adecuada.' },
];

export default function ContactoPage() {
    return (
        <>
            <FaqJsonLd faqs={faqs} />
            <Hero
                badge="Contacto"
                title="Resuelve tus dudas antes de pagar por un servicio"
                highlightedWord="antes de pagar"
                subtitle="Si no sabes cuánto cuesta importar, qué documentos necesitas o si tu caso requiere ayuda completa, escríbenos. Te brindamos asesoría sin costo y sin compromiso."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { title: 'WhatsApp prioritario', description: 'Respuesta en horario de atención' },
                            { title: 'Atención remota', description: 'Clientes de todo el Perú' },
                            { title: 'Asesoría sin costo', description: 'Sin compromiso' },
                            { title: 'Callao, Perú', description: 'Base operativa' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="contacto" messageKey="asesoria_gratis" variant="button">
                    Resolver mis dudas por WhatsApp
                </WhatsAppLink>
                <TrackedLink
                    href="#contacto-form"
                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                    eventParams={{ location: 'contact_hero' }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600"
                >
                    Prefiero que me contacten
                </TrackedLink>
            </Hero>

            <Container id="contacto-info">
                <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Options - Left Side */}
                    <div className="space-y-8">
                        {/* WhatsApp - Principal */}
                        <div className="service-card service-green p-6 border-2 border-emerald-200 bg-emerald-50/50">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">💬</span>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        WhatsApp (Recomendado)
                                    </h3>
                                    <p className="text-slate-600 mb-4">
                                        La forma más rápida de contactarnos si aún tienes dudas. Primero te orientamos gratis y luego vemos si necesitas un servicio adicional.
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 mb-4">
                                        {contactInfo.whatsapp}
                                    </p>
                                    <WhatsAppLink route="contacto" messageKey="asesoria_gratis" variant="button">
                                        Resolver mis dudas por WhatsApp
                                    </WhatsAppLink>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="service-card service-blue p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">📧</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        Correo Electrónico
                                    </h3>
                                    <p className="text-slate-600 mb-2">
                                        Para documentos, consultas formales o si prefieres email.
                                    </p>
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="text-lg font-medium text-purple-600 hover:text-pink-600 transition-colors"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="service-card service-pink p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">📍</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        Ubicación
                                    </h3>
                                    <p className="text-lg font-medium text-slate-900">{contactInfo.location}</p>
                                    <p className="text-slate-600 mt-1">{contactInfo.workMode}</p>
                                </div>
                            </div>
                        </div>

                        {/* Horarios */}
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                Horarios de Atención
                            </h3>
                            <div className="space-y-3">
                                {schedules.map((schedule) => (
                                    <div key={schedule.area} className="flex items-center gap-3 text-slate-600">
                                        <span className="text-xl">{schedule.icon}</span>
                                        <div>
                                            <span className="font-medium text-slate-900">{schedule.area}:</span>{' '}
                                            {schedule.hours}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form - Right Side */}
                    <div id="contacto-form">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                ¿Prefieres que te <span className="gradient-text">contactemos</span>?
                            </h2>
                            <p className="text-slate-600">
                                Déjanos tus datos y un ejecutivo se comunicará contigo para resolver tus dudas sin costo.
                            </p>
                        </div>
                        <ContactoForm title="" />
                    </div>
                </div>
            </Container>

            <section className="bg-white py-6">
                <Container>
                    <div className="rounded-[28px] border border-emerald-200 bg-[linear-gradient(135deg,rgba(15,159,110,0.08),rgba(47,179,216,0.08))] px-6 py-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                            Antes de cotizar
                        </p>
                        <p className="mt-2 max-w-4xl text-lg leading-8 text-slate-700">
                            No todas las consultas requieren una asesoría pagada. Si tu caso puede resolverse con asesoría sin costo, te lo diremos con claridad. Solo cotizamos aparte cuando se necesita análisis técnico o gestión especializada.
                        </p>
                    </div>
                </Container>
            </section>

            {/* FAQ rápido */}
            <section className="py-16 bg-slate-50">
                <Container>
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
                        Preguntas <span className="gradient-text">Frecuentes</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="service-card service-blue p-6">
                            <h4 className="font-semibold text-slate-900 mb-2">¿Cuánto demoran en responder?</h4>
                            <p className="text-slate-600">Por WhatsApp respondemos en menos de 1 hora durante horario de atención. Por email, máximo 24 horas.</p>
                        </div>
                        <div className="service-card service-pink p-6">
                            <h4 className="font-semibold text-slate-900 mb-2">¿Atienden los fines de semana?</h4>
                            <p className="text-slate-600">Sábados de 8am a 12pm para cotizaciones. Domingos no laboramos.</p>
                        </div>
                        <div className="service-card service-green p-6">
                            <h4 className="font-semibold text-slate-900 mb-2">¿Atienden a clientes de provincia?</h4>
                            <p className="text-slate-600">Sí, atendemos clientes de todo el Perú. Trabajamos 100% remoto.</p>
                        </div>
                        <div className="service-card service-orange p-6">
                            <h4 className="font-semibold text-slate-900 mb-2">¿La asesoría tiene costo?</h4>
                            <p className="text-slate-600">No, la asesoría sin costo no tiene compromiso. Si tu caso requiere una gestión más amplia o especializada, te guiamos con la mejor opción.</p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
