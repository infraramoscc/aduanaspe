import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Hero, TrustBar } from '@/components/sections';
import { ContactoForm } from '@/components/forms';
import { WhatsAppLink } from '@/components/tracking';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { Card, CardContent, Button } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Contacto - Escríbenos | AduanasPE',
    description: 'Contáctanos por WhatsApp al 963461006 o email info@aduanaspe.com. Cotizaciones en menos de 1 hora. Atención de Lunes a Sábado.',
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
    { question: '¿Las cotizaciones tienen costo?', answer: 'No, las cotizaciones son completamente gratuitas y sin compromiso.' },
];

export default function ContactoPage() {
    return (
        <>
            <FaqJsonLd faqs={faqs} />
            <Hero
                badge="✨ Contacto"
                title="Hablemos de tu próxima importación"
                highlightedWord="importación"
                subtitle="Escríbenos por WhatsApp y recibe respuesta en menos de 1 hora. Sin compromiso, sin formularios eternos."
                size="lg"
                showStats={false}
                showFloatingCards={true}
                centered={true}
                footer={<TrustBar variant="clean" />}
            >
                <Link href="#contacto-info">
                    <Button variant="secondary" size="lg">
                        Ver datos de contacto
                    </Button>
                </Link>
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
                                        La forma más rápida de contactarnos. Respuesta en menos de 1 hora durante horario de atención.
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 mb-4">
                                        {contactInfo.whatsapp}
                                    </p>
                                    <WhatsAppLink route="contacto" variant="button">
                                        Escribir por WhatsApp
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
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                ¿Prefieres que te <span className="gradient-text">contactemos</span>?
                            </h2>
                            <p className="text-slate-600">
                                Déjanos tus datos y un ejecutivo se comunicará contigo a la brevedad.
                            </p>
                        </div>
                        <ContactoForm title="" />
                    </div>
                </div>
            </Container>

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
                            <h4 className="font-semibold text-slate-900 mb-2">¿Las cotizaciones tienen costo?</h4>
                            <p className="text-slate-600">No, las cotizaciones son completamente gratuitas y sin compromiso.</p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
