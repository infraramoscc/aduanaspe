import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';
import { services } from '@/content/services';
import { mainPageImages } from '@/content/mainPageImages';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Agencia de Aduanas y Carga Internacional en Perú | AduanasPE',
    description: 'Agenciamiento de aduanas, carga internacional y asesoría en comercio exterior con atención personalizada, seguimiento claro y respuesta rápida.',
    alternates: { canonical: 'https://aduanaspe.com/' },
    robots: { index: true, follow: true },
};

type HomeIconKind = 'customs' | 'cargo' | 'advice' | 'person' | 'clock' | 'location' | 'document';

const trustPoints: Array<{ icon: HomeIconKind; title: string; description: string }> = [
    { icon: 'person', title: 'Ejecutivo asignado', description: 'Un contacto para tu operación' },
    { icon: 'clock', title: 'Respuesta en 1 hora', description: 'En horario de atención' },
    { icon: 'location', title: 'Operación desde Callao', description: 'Cobertura nacional' },
    { icon: 'document', title: '+5 años', description: 'Despachos y asesoría' },
];

const serviceGroups = [
    {
        title: 'Aduanas',
        icon: 'customs' as const,
        description: 'Despacho, revisión documentaria y protección de la carga durante el traslado.',
        tone: 'indigo' as const,
        slugs: ['agenciamiento-aduanas', 'resguardo-aduanero'],
    },
    {
        title: 'Carga y transporte',
        icon: 'cargo' as const,
        description: 'Coordinación internacional y traslado nacional desde origen hasta tu almacén.',
        tone: 'cyan' as const,
        slugs: ['agencia-de-carga-internacional', 'transporte-de-carga'],
    },
    {
        title: 'Consultoría e incidencias',
        icon: 'advice' as const,
        description: 'Prevención de riesgos y respuesta técnica frente a observaciones de SUNAT.',
        tone: 'emerald' as const,
        slugs: ['consultoria-aduanera', 'ajuste-de-valor-aduanero', 'multas-aduaneras-sunat'],
    },
] as const;

function HomeServiceIcon({ kind, className = '' }: { kind: HomeIconKind; className?: string }) {
    const common = {
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        className,
        'aria-hidden': true,
    };

    if (kind === 'customs') {
        return <svg {...common}><path d="M4 20h16M5.5 9.5h13M7 9.5V20m5-10.5V20m5-10.5V20M4.5 7 12 3l7.5 4v2.5h-15Z" /></svg>;
    }
    if (kind === 'cargo') {
        return <svg {...common}><path d="M3 6.5h11v10H3zM14 10h3.5l3 3.5v3H14zM6.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10.5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>;
    }
    if (kind === 'advice') {
        return <svg {...common}><path d="M4 4h16v12H8l-4 4V4Zm4 4h8m-8 4h5" /></svg>;
    }
    if (kind === 'person') {
        return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.7-4 2.9-6 6.5-6s5.8 2 6.5 6" /></svg>;
    }
    if (kind === 'clock') {
        return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    }
    if (kind === 'location') {
        return <svg {...common}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.25" /></svg>;
    }
    return <svg {...common}><path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5m-5 4h5" /></svg>;
}

function ArrowIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 10h11m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function HomePage() {
    const homeImages = mainPageImages.home;

    return (
        <>
            <section className="home-control-hero relative overflow-hidden border-b border-[var(--home-border-soft)] bg-[var(--home-canvas)] text-[var(--home-ink)]">
                <div aria-hidden="true" className="home-color-aurora" />
                <div aria-hidden="true" className="home-control-grid absolute inset-0" />
                <Container size="xl" className="relative py-10 md:py-14 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:gap-16">
                        <div className="relative z-10 max-w-3xl">
                            <h1 className="max-w-[15ch] text-balance text-[clamp(2.75rem,5.4vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-[var(--home-ink)] max-[380px]:text-[2.5rem]">
                                Servicios de aduanas y carga internacional en Perú
                            </h1>
                            <p className="mt-7 max-w-[62ch] text-lg font-medium leading-8 text-[var(--home-copy)] md:text-xl md:leading-9">
                                Gestionamos despachos aduaneros, carga internacional, transporte y casos técnicos ante SUNAT. Un ejecutivo asignado coordina tu operación de principio a fin.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <TrackedLink
                                    href="#servicios"
                                    eventName={GA4_EVENTS.CLICK_CTA_TO_SERVICIOS}
                                    eventParams={{ location: 'home_hero' }}
                                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[var(--home-brand)] px-7 py-3.5 text-base font-bold text-white shadow-[0_16px_35px_-18px_rgba(60,55,148,0.8)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--home-brand-hover)] hover:shadow-[0_20px_38px_-18px_rgba(60,55,148,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                                >
                                    Ver nuestros servicios
                                    <ArrowIcon />
                                </TrackedLink>
                                <WhatsAppLink route="home" variant="button">Cuéntanos tu operación</WhatsAppLink>
                            </div>
                            <p className="mt-5 max-w-xl text-sm font-medium leading-6 text-[var(--home-muted)]">
                                ¿No sabes qué servicio necesitas? Te orientamos sin costo y sin compromiso.
                            </p>
                        </div>

                        <div className="home-control-visual relative mx-auto w-full max-w-[680px] lg:mx-0">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[var(--home-ink)] shadow-[0_32px_70px_-38px_rgba(23,32,51,0.7)] sm:aspect-[4/3] sm:rounded-[1.75rem]">
                                <Image
                                    src={homeImages.hero.src}
                                    alt={homeImages.hero.alt}
                                    fill
                                    priority
                                    sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, calc(100vw - 2rem)"
                                    className="object-cover"
                                    style={{ objectPosition: homeImages.hero.objectPosition ?? 'center' }}
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_36%,rgba(15,23,42,0.78)_100%)]" />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white sm:p-7">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Coordinación activa</p>
                                        <p className="mt-1 max-w-[24ch] text-lg font-bold leading-tight sm:text-xl">Un equipo conecta cada etapa</p>
                                    </div>
                                    <div className="hidden border-l border-white/30 pl-5 text-right sm:block">
                                        <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Base operativa</p>
                                        <p className="mt-1 font-bold">Callao, Perú</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 flex items-center gap-3 text-sm font-medium leading-6 text-[var(--home-muted)] max-[380px]:hidden">
                                <span aria-hidden="true" className="h-px w-10 bg-[#0e7490]" />{homeImages.hero.caption}
                            </p>
                        </div>
                    </div>

                    <div className="home-trust-strip mt-12 grid grid-cols-2 border-y border-[var(--home-border)] sm:grid-cols-2 xl:mt-14 xl:grid-cols-4">
                        {trustPoints.map((point) => (
                            <div key={point.title} className="flex min-h-36 flex-col items-start gap-3 border-[var(--home-border)] px-3 py-5 odd:border-r sm:min-h-28 sm:flex-row sm:items-center sm:gap-4 sm:px-5 xl:border-r xl:last:border-r-0">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--home-trust-icon)] text-[var(--home-brand)]">
                                    <HomeServiceIcon kind={point.icon} className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-bold leading-5 text-[var(--home-ink)]">{point.title}</p>
                                    <p className="mt-1 text-sm leading-5 text-[var(--home-muted)]">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="servicios" aria-labelledby="servicios-titulo" className="home-services-field scroll-mt-44 border-b border-[var(--home-border-soft)] bg-[var(--home-surface)] py-16 md:py-20 lg:py-28">
                <Container size="xl">
                    <div className="home-services-intro grid gap-7 border-b border-[var(--home-border)] pb-10 md:pb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:items-end lg:gap-20">
                        <h2 id="servicios-titulo" className="max-w-[16ch] text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--home-ink)] md:text-5xl lg:text-6xl">Qué podemos gestionar por ti</h2>
                        <div>
                            <p className="mt-6 max-w-[52ch] text-lg leading-8 text-[var(--home-muted)]">
                                Puedes contratar una gestión puntual o coordinar varias etapas con un solo equipo. Si tu caso no encaja claramente, primero lo revisamos contigo.
                            </p>
                            <TrackedLink
                                href={ROUTES.servicios.index}
                                eventName={GA4_EVENTS.CLICK_CTA_TO_SERVICIOS}
                                eventParams={{ location: 'home_services_intro' }}
                                className="group mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--home-brand)] underline decoration-2 underline-offset-4 transition-colors hover:text-[var(--home-brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                            >
                                Ver todos los servicios<ArrowIcon />
                            </TrackedLink>
                        </div>
                    </div>

                    <div className="home-service-directory home-service-route mt-10 overflow-hidden border-y border-[var(--home-border)] md:mt-12">
                        {serviceGroups.map((group) => (
                            <article key={group.title} data-tone={group.tone} className="home-service-group grid gap-8 border-b border-[var(--home-border)] px-5 py-9 last:border-b-0 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 md:px-8 md:py-10 lg:px-10">
                                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:block">
                                        <span className="home-service-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--home-brand)] text-white shadow-[0_12px_24px_-16px_rgba(60,55,148,0.75)]">
                                            <HomeServiceIcon kind={group.icon} />
                                        </span>
                                    <div>
                                        <h3 className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-[var(--home-ink)] md:mt-6 md:text-2xl">{group.title}</h3>
                                        <p className="mt-2 max-w-[30ch] text-sm leading-6 text-[var(--home-muted)] md:mt-3">{group.description}</p>
                                    </div>
                                </div>
                                <ul className="home-service-links grid border-t border-[var(--home-border)] sm:grid-cols-2 md:border-l md:border-t-0 md:pl-8 xl:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                                    {group.slugs.map((slug) => {
                                        const service = services.find((item) => item.slug === slug);
                                        if (!service) return null;
                                        return (
                                            <li key={service.slug} className="border-b border-[var(--home-border)] last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                                                <TrackedLink
                                                    href={`/servicios/${service.slug}`}
                                                    eventName={GA4_EVENTS.SERVICE_SELECTED}
                                                    eventParams={{ location: 'home_service_directory', service_slug: service.slug, service_group: group.tone }}
                                                    className="home-service-link group grid h-full min-h-28 grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-5 px-1 py-6 sm:px-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                                                >
                                                    <span>
                                                        <span className="block text-xl font-extrabold leading-tight text-[var(--home-ink)] transition-colors group-hover:text-[var(--home-brand)]">{service.title}</span>
                                                        <span className="mt-2 block max-w-[58ch] text-sm leading-6 text-[var(--home-muted)]">{service.summary}</span>
                                                    </span>
                                                    <span className="home-service-arrow flex h-11 w-11 items-center justify-center rounded-full border border-[var(--home-border)] text-[var(--home-brand)] transition-[color,background-color,border-color,transform] duration-200 group-hover:translate-x-1 group-hover:border-[var(--home-brand)] group-hover:bg-[var(--home-brand)] group-hover:text-white"><ArrowIcon /></span>
                                                </TrackedLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="home-team-field overflow-hidden bg-[var(--home-ink)] py-20 text-white md:py-28">
                <Container size="xl">
                    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20">
                        <div className="relative">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-800">
                                <Image src={homeImages.middle.src} alt={homeImages.middle.alt} fill sizes="(min-width: 1280px) 650px, (min-width: 1024px) 52vw, calc(100vw - 2rem)" className="object-cover" style={{ objectPosition: homeImages.middle.objectPosition ?? 'center' }} />
                                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,rgba(23,32,51,0.34))]" />
                            </div>
                            <div className="relative -mt-14 ml-5 max-w-sm rounded-2xl bg-[var(--home-canvas)] p-6 text-[var(--home-ink)] shadow-[0_24px_55px_-32px_rgba(0,0,0,0.75)] sm:ml-10">
                                <p className="text-lg font-extrabold leading-snug">Revisamos documentos y dudas antes de avanzar.</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--home-muted)]">Cada decisión tiene contexto, responsable y siguiente paso.</p>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <h2 className="text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] md:text-6xl">Un equipo que coordina y responde</h2>
                            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-slate-300">Desde el primer contacto te asignamos un ejecutivo que conoce tu operación, coordina las etapas involucradas y te informa qué está ocurriendo y qué sigue.</p>
                            <ol className="home-team-steps mt-9 border-t border-white/20">
                                {[
                                    ['Revisamos tu caso', 'Ordenamos la información y detectamos qué necesita atención.'],
                                    ['Coordinamos la operación', 'Un ejecutivo conecta responsables, documentos y tiempos.'],
                                    ['Te mantenemos al tanto', 'Recibes estado, contexto y siguiente paso.'],
                                ].map(([title, description], index) => (
                                    <li key={title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-white/20 py-5 sm:grid-cols-[3rem_190px_minmax(0,1fr)] sm:gap-6">
                                        <span aria-hidden="true" className="home-team-step-number">{String(index + 1).padStart(2, '0')}</span>
                                        <strong className="text-white">{title}</strong><span className="col-start-2 text-slate-300 sm:col-start-auto">{description}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="border-b border-[var(--home-border-soft)] bg-[var(--home-education)] py-12 text-[var(--home-ink)] md:py-14">
                <Container size="xl">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-extrabold tracking-[-0.02em] md:text-3xl">¿Todavía estás investigando?</h2>
                            <p className="mt-3 leading-7 text-[#4d625d]">El blog reúne guías sobre importación, exportación, costos, permisos y documentos para que avances con más contexto.</p>
                        </div>
                        <TrackedLink href={ROUTES.blog} eventName={GA4_EVENTS.BLOG_CTA_CLICK} eventParams={{ location: 'home_blog' }} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#799a90] px-6 py-3 font-bold text-[#172033] transition-[background-color,color,border-color] hover:border-[#172033] hover:bg-[#172033] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#172033]">
                            Ir al blog<ArrowIcon />
                        </TrackedLink>
                    </div>
                </Container>
            </section>

            <section className="home-final-field relative overflow-hidden bg-[var(--home-canvas)] py-20 md:py-28">
                <div aria-hidden="true" className="home-control-grid absolute inset-0 opacity-50" />
                <Container className="relative">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-balance text-4xl font-extrabold leading-[1.03] tracking-[-0.03em] text-[var(--home-ink)] md:text-6xl">Revisemos tu operación antes de que avance</h2>
                        <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-8 text-[var(--home-muted)]">Cuéntanos qué mercancía necesitas mover y en qué etapa estás. Revisamos tu caso y te indicamos el servicio adecuado antes de cotizar.</p>
                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <WhatsAppLink route="home-cta" messageKey="asesoria_gratis" variant="button">Revisar mi operación sin costo</WhatsAppLink>
                            <TrackedLink href={ROUTES.contacto} eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO} eventParams={{ location: 'home_final_cta' }} className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#b8b3a7] bg-transparent px-7 py-3.5 font-bold text-[#172033] transition-colors hover:border-[#3c3794] hover:bg-white hover:text-[#3c3794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c3794]">Prefiero que me contacten</TrackedLink>
                        </div>
                        <ul className="home-final-proof mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-[var(--home-muted)]" aria-label="Condiciones de la orientación">
                            <li>Respuesta en 1 hora</li>
                            <li>Sin costo</li>
                            <li>Sin compromiso</li>
                        </ul>
                    </div>
                </Container>
            </section>
        </>
    );
}
