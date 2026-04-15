import type { Metadata } from 'next';
import { Container } from '@/components/layout';
import { ToolsExplorer } from '@/components/tools';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Herramientas de Comercio Exterior | AduanasPE',
    description: 'Centro de herramientas de AduanasPE para calculos, cotizadores, tarifarios y validaciones operativas orientadas al mercado peruano.',
    alternates: {
        canonical: 'https://aduanaspe.com/herramientas/',
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

const quickLinks = [
    { label: 'Importacion', href: ROUTES.comercioExterior.importacion, color: 'text-[#3c3794] bg-[#ecebff] ring-[rgba(60,55,148,0.14)]' },
    { label: 'Cotizadores', href: ROUTES.servicios.agenciaCargaInternacional, color: 'text-[#0b5f82] bg-[rgba(224,249,255,0.96)] ring-[rgba(0,212,255,0.18)]' },
    { label: 'Normativa', href: ROUTES.comercioExterior.documentosAduaneros, color: 'text-[#cf5858] bg-[rgba(255,228,228,0.96)] ring-[rgba(255,107,107,0.18)]' },
];

export default function HerramientasPage() {
    return (
        <>
            <section className="border-b border-[rgba(23,32,51,0.08)] bg-[radial-gradient(circle_at_top,rgba(60,55,148,0.16),transparent_30%),radial-gradient(circle_at_18%_35%,rgba(0,212,255,0.12),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(255,107,107,0.14),transparent_24%),linear-gradient(180deg,#faf8f3_0%,#f8f6f1_100%)]">
                <Container size="xl" className="py-16 md:py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                            <div className="pt-4">
                                <span className="section-badge bg-white/84">Centro de herramientas</span>
                                <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
                                    Herramientas para calcular, cotizar y validar
                                    <span className="block text-[#3c3794]">con mas claridad.</span>
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                                    Un espacio vivo y funcional para encontrar rapido utilidades de comercio exterior y entrar directo a la que necesitas usar.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <a
                                        href="#catalogo-herramientas"
                                        className="inline-flex items-center justify-center rounded-full bg-[#3c3794] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(60,55,148,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-[#2f2b77]"
                                    >
                                        Ver herramientas
                                    </a>
                                    <WhatsAppLink
                                        messageKey="asesoria_gratis"
                                        variant="button"
                                        className="bg-[#10aa6b] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,245,160,0.18)] hover:bg-[#0d8f5a]"
                                    >
                                        Hablar con un ejecutivo
                                    </WhatsAppLink>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="glass relative overflow-hidden rounded-[30px] border border-[rgba(23,32,51,0.08)] bg-white/76 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)]">
                                    <div className="pointer-events-none absolute -right-8 top-4 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(60,55,148,0.34)_0%,transparent_68%)] blur-2xl" />
                                    <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.22)_0%,transparent_70%)] blur-2xl" />
                                    <p className="relative z-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#3c3794]">Uso recurrente</p>
                                    <h2 className="relative z-10 mt-5 text-2xl font-bold tracking-tight text-slate-950">Entra, identifica y usa.</h2>
                                    <p className="relative z-10 mt-4 text-base leading-7 text-slate-600">
                                        Este centro esta pensado para importadores y exportadores que quieren resolver consultas operativas sin perder tiempo.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {quickLinks.map((item, index) => (
                                        <TrackedLink
                                            key={item.href}
                                            href={item.href}
                                            eventName={GA4_EVENTS.NAV_CLICK}
                                            eventParams={{ location: 'tools_hero_quick_links', label: item.label }}
                                            className="glass rounded-[24px] border border-[rgba(23,32,51,0.08)] bg-white/76 px-5 py-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                                        >
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ${item.color}`}>
                                                0{index + 1}
                                            </span>
                                            <p className="mt-4 text-base font-semibold text-slate-950">{item.label}</p>
                                        </TrackedLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <ToolsExplorer />

            <section className="border-t border-[rgba(23,32,51,0.08)] bg-[#f8f6f1] py-16 md:py-20">
                <Container size="xl">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <div>
                            <span className="section-badge bg-white/84">SEO</span>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Herramientas de comercio exterior en Peru para consultas operativas frecuentes.
                            </h2>
                            <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                                <p>
                                    Esta seccion de AduanasPE concentra calculadoras, cotizadores, tarifarios y validadores pensados para importadores,
                                    exportadores y operadores que necesitan tomar decisiones con mas claridad.
                                </p>
                                <p>
                                    Con el tiempo, este centro ira creciendo con herramientas orientadas al mercado peruano: estimacion de tributos,
                                    simulacion de costos de importacion, referencias logisticas, clasificacion arancelaria y revision documentaria.
                                </p>
                            </div>
                        </div>

                        <div className="glass relative overflow-hidden rounded-[28px] border border-[rgba(23,32,51,0.08)] bg-white/78 p-6 shadow-[0_16px_36px_rgba(15,23,42,0.05)]">
                            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-24 bg-[radial-gradient(circle,rgba(255,107,107,0.24)_0%,transparent_72%)] blur-3xl" />
                            <p className="relative z-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#cf5858]">
                                No encuentras la herramienta que buscas?
                            </p>
                            <p className="relative z-10 mt-4 text-base leading-7 text-slate-600">
                                Si haces una consulta recurrente y todavia no aparece en el centro, cuentanosla para priorizarla.
                            </p>
                            <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                                <TrackedLink
                                    href={ROUTES.contacto}
                                    eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                                    eventParams={{ location: 'tools_bottom_cta' }}
                                    className="inline-flex items-center justify-center rounded-full bg-[#FF6B6B] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(255,107,107,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-[#e85a5a]"
                                >
                                    Solicitar una herramienta
                                </TrackedLink>
                                <WhatsAppLink
                                    messageKey="asesoria_gratis"
                                    variant="button"
                                    className="bg-[#10aa6b] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,245,160,0.18)] hover:bg-[#0d8f5a]"
                                >
                                    Consultarlo por WhatsApp
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
