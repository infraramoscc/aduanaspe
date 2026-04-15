import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { ToolGlyph } from '@/components/tools';
import { toolPreviews, getToolBySlug, getToolCategory } from '@/content/tools';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';

type ToolPageProps = {
    params: Promise<{ slug: string }>;
};

const accentClasses = {
    indigo: {
        pill: 'bg-[#ecebff] text-[#3c3794] ring-1 ring-[rgba(60,55,148,0.14)]',
        panel: 'border-[rgba(60,55,148,0.1)]',
        orb: 'bg-[radial-gradient(circle,rgba(60,55,148,0.28)_0%,transparent_72%)]',
        dot: 'bg-[#3c3794]',
        link: 'text-[#3c3794] hover:text-[#2f2b77]',
    },
    cyan: {
        pill: 'bg-[rgba(224,249,255,0.96)] text-[#0b5f82] ring-1 ring-[rgba(0,212,255,0.18)]',
        panel: 'border-[rgba(0,212,255,0.14)]',
        orb: 'bg-[radial-gradient(circle,rgba(0,212,255,0.3)_0%,transparent_72%)]',
        dot: 'bg-[#00B8E0]',
        link: 'text-[#0b5f82] hover:text-[#084d69]',
    },
    coral: {
        pill: 'bg-[rgba(255,228,228,0.96)] text-[#cf5858] ring-1 ring-[rgba(255,107,107,0.18)]',
        panel: 'border-[rgba(255,107,107,0.14)]',
        orb: 'bg-[radial-gradient(circle,rgba(255,107,107,0.3)_0%,transparent_72%)]',
        dot: 'bg-[#cf5858]',
        link: 'text-[#cf5858] hover:text-[#b54848]',
    },
} as const;

export async function generateStaticParams() {
    return toolPreviews.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        return {
            title: 'Herramienta no encontrada | AduanasPE',
        };
    }

    return {
        title: `${tool.title} | Proximamente | AduanasPE`,
        description: `${tool.summary} Ficha de herramienta de AduanasPE actualmente en preparacion.`,
        alternates: {
            canonical: `https://aduanaspe.com/herramientas/${tool.slug}/`,
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
}

export default async function HerramientaPreviewPage({ params }: ToolPageProps) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const category = getToolCategory(tool.category);
    const accent = category ? accentClasses[category.accent] : accentClasses.indigo;

    return (
        <>
            <section className="border-b border-[rgba(23,32,51,0.08)] bg-[radial-gradient(circle_at_top,rgba(60,55,148,0.16),transparent_30%),radial-gradient(circle_at_16%_30%,rgba(255,107,107,0.12),transparent_26%),linear-gradient(180deg,#faf8f3_0%,#f8f6f1_100%)]">
                <Container size="xl" className="py-16 md:py-20">
                    <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="section-badge bg-white/84">Proximamente</span>
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.pill}`}>{tool.tradeFlow}</span>
                            </div>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
                                {tool.title}
                            </h1>
                            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                                {tool.summary}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <TrackedLink
                                    href={ROUTES.tools}
                                    eventName={GA4_EVENTS.NAV_CLICK}
                                    eventParams={{ location: 'tool_preview_back', label: tool.slug }}
                                    className="glass inline-flex items-center justify-center rounded-full bg-white/84 px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[rgba(23,32,51,0.08)] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#3c3794]"
                                >
                                    Volver al centro
                                </TrackedLink>
                                <WhatsAppLink
                                    messageKey="asesoria_gratis"
                                    variant="button"
                                    className="bg-[#10aa6b] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,245,160,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0d8f5a]"
                                >
                                    Avisarme cuando este lista
                                </WhatsAppLink>
                            </div>
                        </div>

                        <div className={`glass relative overflow-hidden rounded-[30px] border bg-white/82 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)] ${accent.panel}`}>
                            <div className={`pointer-events-none absolute inset-x-10 bottom-0 h-28 blur-3xl ${accent.orb}`} />
                            <div className="relative z-10 flex items-start gap-4">
                                <ToolGlyph icon={tool.icon} accent={category?.accent || 'indigo'} />
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Estado actual</p>
                                    <p className="mt-2 text-xl font-semibold text-slate-950">{tool.statusLabel}</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Esta ficha ya existe para que el centro de herramientas tenga estructura clara mientras construimos el modulo real.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-[#f8f6f1] py-16 md:py-20">
                <Container size="xl">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <article className="glass rounded-[26px] border border-[rgba(23,32,51,0.08)] bg-white/84 p-6 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Ideal para</p>
                            <p className="mt-3 text-base leading-7 text-slate-700">{tool.idealFor}</p>
                        </article>
                        <article className="glass rounded-[26px] border border-[rgba(23,32,51,0.08)] bg-white/84 p-6 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Cuando usarla</p>
                            <p className="mt-3 text-base leading-7 text-slate-700">{tool.whenToUse}</p>
                        </article>
                        <article className="glass rounded-[26px] border border-[rgba(23,32,51,0.08)] bg-white/84 p-6 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Relacionada con</p>
                            <TrackedLink
                                href={tool.relatedHref}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'tool_preview_related', label: tool.relatedHref }}
                                className={`mt-3 inline-flex text-base font-semibold transition-colors ${accent.link}`}
                            >
                                {tool.relatedLabel}
                            </TrackedLink>
                        </article>
                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="glass rounded-[28px] border border-[rgba(23,32,51,0.08)] bg-white/82 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
                            <span className="section-badge bg-white/84">Que deberia entregar</span>
                            <div className="mt-4 space-y-4">
                                {tool.outputs.map((output) => (
                                    <div key={output} className="rounded-[20px] bg-[#fcfcfd] px-4 py-4 ring-1 ring-[rgba(23,32,51,0.08)]">
                                        <div className="flex items-start gap-3">
                                            <span className={`mt-2 h-2 w-2 rounded-full ${accent.dot}`} />
                                            <p className="text-sm leading-7 text-slate-700">{output}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`glass relative overflow-hidden rounded-[28px] border bg-white/84 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.05)] ${accent.panel}`}>
                            <div className={`pointer-events-none absolute inset-x-10 bottom-0 h-24 blur-3xl ${accent.orb}`} />
                            <div className="relative z-10">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="section-badge bg-white/84">Siguiente paso</span>
                                    <span className="rounded-full bg-[#fdecec] px-3 py-1 text-xs font-semibold text-[#b42318] ring-1 ring-[rgba(180,35,24,0.14)]">
                                        Aun no disponible
                                    </span>
                                </div>
                                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                                    Esta herramienta aun no esta publicada.
                                </h2>
                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    Estamos terminando su definicion para que cuando se libere sea realmente util para importadores y exportadores, no solo una pantalla bonita.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <WhatsAppLink
                                        messageKey="asesoria_gratis"
                                        variant="button"
                                        className="bg-[#10aa6b] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,245,160,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0d8f5a]"
                                    >
                                        Quiero enterarme
                                    </WhatsAppLink>
                                    <TrackedLink
                                        href={ROUTES.tools}
                                        eventName={GA4_EVENTS.NAV_CLICK}
                                        eventParams={{ location: 'tool_preview_return', label: tool.slug }}
                                        className="glass inline-flex items-center justify-center rounded-full bg-white/84 px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[rgba(23,32,51,0.08)] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#3c3794]"
                                    >
                                        Seguir explorando
                                    </TrackedLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
