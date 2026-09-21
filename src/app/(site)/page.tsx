import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';

import { mainPageImages } from '@/content/mainPageImages';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Agencia de Aduanas y Carga Internacional en Perú | AduanasPE',
    description: 'Evalúa y coordina flete internacional, despacho aduanero y transporte local en Perú con orientación previa y un ejecutivo asignado.',
    alternates: { canonical: 'https://aduanaspe.com/' },
    robots: { index: true, follow: true },
};

type HomeIconKind = 'customs' | 'cargo' | 'advice' | 'person' | 'clock' | 'location' | 'document';

const trustPoints: Array<{ icon: HomeIconKind; title: string; description: string }> = [
    { icon: 'advice', title: 'Orientación antes de cotizar', description: 'Primero confirmamos qué necesita tu operación' },
    { icon: 'person', title: 'Ejecutivo asignado', description: 'Un contacto centraliza la coordinación' },
    { icon: 'clock', title: 'Primera respuesta en 1 hora', description: 'Durante el horario de atención' },
    { icon: 'location', title: 'Base operativa en Callao', description: 'Atención y seguimiento a nivel nacional' },
];

const buyerSituations = [
    { eyebrow: 'Antes de comprar', title: 'Estoy planificando', description: 'Quiero validar modalidad, requisitos y costos antes de comprometerme con un proveedor.', href: ROUTES.comercioExterior.importacion, action: 'Empezar con orientación' },
    { eyebrow: 'Proveedor definido', title: 'Ya tengo proveedor', description: 'Tengo una proforma o datos de carga y necesito revisar alcance, ruta y servicio.', href: ROUTES.evaluar, action: 'Evaluar mi operación' },
    { eyebrow: 'Operación en curso', title: 'Mi carga está en camino', description: 'Necesito preparar el despacho, ordenar documentos o coordinar la entrega local.', href: ROUTES.servicios.agenciamientoAduanas, action: 'Preparar el despacho' },
    { eyebrow: 'Incidencia aduanera', title: 'Tengo una observación de SUNAT', description: 'Recibí una notificación, duda razonable, requerimiento o posible multa.', href: ROUTES.servicios.multasAduanerasSunat, action: 'Revisar la incidencia' },
] as const;

const serviceGroups = [
    { title: 'Aduanas', icon: 'customs' as const, description: 'Despacho, revisión documentaria y protección de la carga durante el traslado.', tone: 'indigo' as const, slugs: ['agenciamiento-aduanas', 'resguardo-aduanero'], image: mainPageImages.services.middle },
    { title: 'Carga y transporte', icon: 'cargo' as const, description: 'Coordinación internacional y traslado nacional desde origen hasta tu almacén.', tone: 'cyan' as const, slugs: ['agencia-de-carga-internacional', 'transporte-de-carga'], image: mainPageImages.services.lower },
    { title: 'Consultoría e incidencias', icon: 'advice' as const, description: 'Prevención de riesgos y respuesta técnica frente a observaciones de SUNAT.', tone: 'emerald' as const, slugs: ['consultoria-aduanera', 'ajuste-de-valor-aduanero', 'multas-aduaneras-sunat'], image: mainPageImages.trade.middle },
] as const;

const faqs = [
    { question: '¿Qué información necesitan para evaluar una operación?', answer: 'Como punto de partida necesitamos saber qué mercancía moverás, origen y destino, modalidad si la conoces, peso o volumen aproximado y fecha estimada. Si aún no tienes todo, indica la etapa en la que estás.' },
    { question: '¿Puedo contratar solo flete, aduanas o transporte local?', answer: 'Sí. Primero delimitamos qué parte necesitas resolver y qué responsables u operadores intervienen. También podemos evaluar una coordinación integral cuando el caso lo requiera.' },
    { question: '¿La respuesta en una hora incluye la cotización final?', answer: 'No necesariamente. El compromiso es una primera respuesta dentro del horario de atención. El tiempo de cotización depende de contar con información suficiente y de las tarifas que deban confirmarse.' },
    { question: '¿Qué ocurre después de enviar mis datos?', answer: 'Revisamos el contexto, confirmamos alcance y viabilidad, pedimos solo la información faltante y te indicamos el siguiente paso. Antes de avanzar se aclaran responsabilidades, terceros involucrados y condiciones del servicio.' },
] as const;

function HomeServiceIcon({ kind, className = '' }: { kind: HomeIconKind; className?: string }) {
    const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className, 'aria-hidden': true };
    if (kind === 'customs') return <svg {...common}><path d="M4 20h16M5.5 9.5h13M7 9.5V20m5-10.5V20m5-10.5V20M4.5 7 12 3l7.5 4v2.5h-15Z" /></svg>;
    if (kind === 'cargo') return <svg {...common}><path d="M3 6.5h11v10H3zM14 10h3.5l3 3.5v3H14zM6.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10.5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>;
    if (kind === 'advice') return <svg {...common}><path d="M4 4h16v12H8l-4 4V4Zm4 4h8m-8 4h5" /></svg>;
    if (kind === 'person') return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.7-4 2.9-6 6.5-6s5.8 2 6.5 6" /></svg>;
    if (kind === 'clock') return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    if (kind === 'location') return <svg {...common}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.25" /></svg>;
    return <svg {...common}><path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5m-5 4h5" /></svg>;
}

function ArrowIcon() {
    return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 10h11m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function IllusPlanificando() {
    return (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
            {/* Desk */}
            <rect x="30" y="110" width="140" height="8" rx="4" fill="#3C3794" opacity="0.15" />
            {/* Laptop base */}
            <rect x="60" y="85" width="80" height="52" rx="6" fill="#3C3794" />
            <rect x="65" y="90" width="70" height="40" rx="4" fill="#EEF0FF" />
            {/* Screen content lines */}
            <rect x="70" y="96" width="40" height="3" rx="1.5" fill="#3C3794" opacity="0.4" />
            <rect x="70" y="103" width="55" height="2" rx="1" fill="#34D399" opacity="0.7" />
            <rect x="70" y="108" width="48" height="2" rx="1" fill="#3C3794" opacity="0.25" />
            <rect x="70" y="113" width="35" height="2" rx="1" fill="#3C3794" opacity="0.25" />
            {/* Laptop hinge */}
            <rect x="55" y="135" width="90" height="5" rx="2.5" fill="#3C3794" opacity="0.3" />
            {/* Person body */}
            <ellipse cx="52" cy="95" rx="14" ry="18" fill="#3C3794" opacity="0.12" />
            <circle cx="52" cy="72" r="10" fill="#3C3794" opacity="0.2" />
            {/* Person arm reaching to laptop */}
            <path d="M58 90 Q72 95 78 100" stroke="#3C3794" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
            {/* Documents floating */}
            <rect x="22" y="68" width="24" height="30" rx="3" fill="white" stroke="#3C3794" strokeWidth="1.5" opacity="0.8" />
            <rect x="26" y="74" width="14" height="2" rx="1" fill="#34D399" />
            <rect x="26" y="79" width="16" height="1.5" rx="0.75" fill="#3C3794" opacity="0.3" />
            <rect x="26" y="83" width="12" height="1.5" rx="0.75" fill="#3C3794" opacity="0.3" />
            {/* Checkmark badge */}
            <circle cx="160" cy="75" r="14" fill="#34D399" opacity="0.2" />
            <path d="M154 75l4 4 8-8" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IllusProveedor() {
    return (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
            {/* Shipping container */}
            <rect x="60" y="70" width="80" height="55" rx="5" fill="#3C3794" opacity="0.15" />
            <rect x="60" y="70" width="80" height="55" rx="5" stroke="#3C3794" strokeWidth="2" />
            <line x1="100" y1="70" x2="100" y2="125" stroke="#3C3794" strokeWidth="1.5" opacity="0.4" />
            <line x1="80" y1="70" x2="80" y2="125" stroke="#3C3794" strokeWidth="1" opacity="0.25" />
            <line x1="120" y1="70" x2="120" y2="125" stroke="#3C3794" strokeWidth="1" opacity="0.25" />
            {/* Container label */}
            <rect x="68" y="88" width="28" height="18" rx="2" fill="#3C3794" opacity="0.7" />
            <rect x="70" y="91" width="16" height="2" rx="1" fill="white" />
            <rect x="70" y="96" width="20" height="2" rx="1" fill="white" opacity="0.6" />
            {/* Left person */}
            <circle cx="42" cy="62" r="9" fill="#3C3794" opacity="0.25" />
            <ellipse cx="42" cy="82" rx="11" ry="14" fill="#3C3794" opacity="0.15" />
            {/* Right person */}
            <circle cx="158" cy="62" r="9" fill="#3C3794" opacity="0.25" />
            <ellipse cx="158" cy="82" rx="11" ry="14" fill="#3C3794" opacity="0.15" />
            {/* Handshake area */}
            <path d="M53 85 Q70 88 80 88" stroke="#3C3794" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
            <path d="M147 85 Q130 88 120 88" stroke="#3C3794" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
            {/* Emerald handshake circle */}
            <circle cx="100" cy="88" r="10" fill="#34D399" opacity="0.25" />
            <path d="M95 88l3 3 7-7" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Wheels */}
            <circle cx="75" cy="128" r="5" fill="#3C3794" opacity="0.3" />
            <circle cx="125" cy="128" r="5" fill="#3C3794" opacity="0.3" />
        </svg>
    );
}

function IllusCargaCamino() {
    return (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
            {/* Ocean waves */}
            <path d="M10 120 Q35 110 60 120 Q85 130 110 120 Q135 110 160 120 Q185 130 200 120" stroke="#3C3794" strokeWidth="2" opacity="0.15" fill="none" />
            <path d="M10 130 Q35 120 60 130 Q85 140 110 130 Q135 120 160 130 Q185 140 200 130" stroke="#3C3794" strokeWidth="2" opacity="0.1" fill="none" />
            {/* Ship hull */}
            <path d="M30 105 Q35 115 50 118 L150 118 Q165 115 170 105 L160 95 L40 95 Z" fill="#3C3794" opacity="0.2" />
            <path d="M30 105 Q35 115 50 118 L150 118 Q165 115 170 105 L160 95 L40 95 Z" stroke="#3C3794" strokeWidth="1.5" />
            {/* Containers on ship */}
            <rect x="50" y="72" width="28" height="24" rx="2" fill="#3C3794" opacity="0.5" />
            <rect x="82" y="72" width="28" height="24" rx="2" fill="#3C3794" opacity="0.35" />
            <rect x="114" y="72" width="28" height="24" rx="2" fill="#3C3794" opacity="0.5" />
            <rect x="66" y="52" width="28" height="22" rx="2" fill="#34D399" opacity="0.4" />
            <rect x="98" y="52" width="28" height="22" rx="2" fill="#3C3794" opacity="0.3" />
            {/* Crane / mast */}
            <line x1="100" y1="95" x2="100" y2="40" stroke="#3C3794" strokeWidth="2" opacity="0.4" />
            <line x1="100" y1="40" x2="140" y2="50" stroke="#3C3794" strokeWidth="1.5" opacity="0.3" />
            {/* Route dotted line */}
            <path d="M170 108 Q185 90 180 60" stroke="#34D399" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" fill="none" />
            {/* Destination flag */}
            <line x1="178" y1="40" x2="178" y2="60" stroke="#34D399" strokeWidth="2" />
            <path d="M178 40 L192 46 L178 52 Z" fill="#34D399" opacity="0.8" />
        </svg>
    );
}

function IllusSunatAlerta() {
    return (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
            {/* Document envelope */}
            <rect x="45" y="45" width="100" height="80" rx="6" fill="white" stroke="#3C3794" strokeWidth="2" />
            <path d="M45 60 L95 85 L145 60" stroke="#3C3794" strokeWidth="1.5" fill="none" opacity="0.4" />
            {/* Document lines */}
            <rect x="60" y="72" width="50" height="3" rx="1.5" fill="#3C3794" opacity="0.2" />
            <rect x="60" y="80" width="65" height="2.5" rx="1.25" fill="#3C3794" opacity="0.15" />
            <rect x="60" y="87" width="55" height="2.5" rx="1.25" fill="#3C3794" opacity="0.15" />
            <rect x="60" y="94" width="40" height="2.5" rx="1.25" fill="#3C3794" opacity="0.15" />
            {/* Warning badge */}
            <circle cx="148" cy="48" r="22" fill="#FEF3C7" />
            <path d="M148 34 L162 57 L134 57 Z" fill="#F59E0B" opacity="0.8" />
            <rect x="146.5" y="42" width="3" height="9" rx="1.5" fill="white" />
            <circle cx="148" cy="54" r="1.8" fill="white" />
            {/* Seal stamp */}
            <circle cx="95" cy="110" r="16" fill="#3C3794" opacity="0.1" stroke="#3C3794" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="95" cy="110" r="10" fill="#3C3794" opacity="0.15" />
            <path d="M90 110l3 3 7-7" stroke="#3C3794" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
    );
}

import { HeroHome } from '@/components/sections';

export default function HomePage() {
    const homeImages = mainPageImages.home;
    return (
        <>
            <HeroHome />


            <section id="confianza" className="scroll-mt-32 border-b border-[var(--home-border-soft)] bg-white py-8 text-[var(--home-ink)]">
                <Container size="xl">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:gap-8">
                        <div className="mb-6 xl:mb-0 xl:max-w-[280px] xl:shrink-0"><p className="text-lg font-bold text-[var(--home-ink)] leading-snug"><span className="text-[#3C3794]">Transparencia operativa:</span><br/>Antes de avanzar, confirmamos por escrito el alcance y responsables.</p></div>
                        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 xl:flex-1 xl:grid-cols-4 xl:gap-x-8">
                            {trustPoints.map((point) => <div key={point.title} className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ECEBFF] text-[#3C3794]"><HomeServiceIcon kind={point.icon} className="h-6 w-6" /></span><div><p className="font-bold leading-5 text-[var(--home-ink)]">{point.title}</p><p className="mt-1 text-sm leading-5 text-[var(--home-muted)]">{point.description}</p></div></div>)}
                        </div>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="situacion-titulo" className="border-b border-[var(--home-border-soft)] bg-[#F5F3EA] py-16 md:py-20">
                <Container size="xl">
                    {/* Header */}
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
                        <div>
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--home-brand)]">Empieza por tu situación</p>
                            <h2 id="situacion-titulo" className="mt-3 max-w-[15ch] text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--home-ink)] md:text-5xl">¿Qué necesitas resolver?</h2>
                        </div>
                        <p className="max-w-[62ch] text-lg leading-8 text-[var(--home-muted)]">No necesitas conocer el nombre técnico del servicio. Elige la situación más cercana y te llevaremos al siguiente paso adecuado.</p>
                    </div>

                    {/* 2x2 illustrated cards */}
                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        {[
                            { situation: buyerSituations[0], Illus: IllusPlanificando, accent: '#3C3794' },
                            { situation: buyerSituations[1], Illus: IllusProveedor, accent: '#3C3794' },
                            { situation: buyerSituations[2], Illus: IllusCargaCamino, accent: '#34D399' },
                            { situation: buyerSituations[3], Illus: IllusSunatAlerta, accent: '#F59E0B' },
                        ].map(({ situation, Illus }, index) => (
                            <TrackedLink
                                key={situation.title}
                                href={situation.href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'home_situation', label: situation.eyebrow }}
                                className="group flex flex-col sm:flex-row items-stretch overflow-hidden rounded-[1.5rem] border border-[var(--home-border-soft)] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#3C3794] hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]"
                            >
                                {/* Text side */}
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ECEBFF] text-xs font-black text-[#3C3794]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--home-brand)]">{situation.eyebrow}</span>
                                    </div>
                                    <strong className="mt-5 text-xl leading-tight text-[var(--home-ink)] sm:text-2xl">{situation.title}</strong>
                                    <span className="mt-3 text-sm leading-6 text-[var(--home-muted)]">{situation.description}</span>
                                    <span className="mt-auto flex items-center gap-3 pt-6 font-bold text-[#3C3794]">
                                        {situation.action}
                                        <span className="transition-transform duration-300 group-hover:translate-x-2"><ArrowIcon /></span>
                                    </span>
                                </div>
                                {/* Illustration side */}
                                <div className="flex w-full items-center justify-center bg-[#F5F3EA] p-4 sm:w-44 sm:shrink-0 sm:p-5">
                                    <div className="h-32 w-full sm:h-36">
                                        <Illus />
                                    </div>
                                </div>
                            </TrackedLink>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="servicios" aria-labelledby="servicios-titulo" className="home-services-field scroll-mt-32 border-b border-[var(--home-border-soft)] bg-[var(--home-surface)] py-16 md:py-20 lg:py-24">
                <Container size="xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 id="servicios-titulo" className="text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--home-ink)] md:text-5xl">Servicios claros, sin letras pequeñas</h2>
                        <p className="mt-6 text-lg leading-8 text-[var(--home-muted)]">Elige la especialidad que necesitas. Nuestro equipo evalúa tu caso antes de cotizar para asegurarnos de ofrecerte exactamente lo que requieres.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {serviceGroups.map((group) => (
                            <div key={group.title} className="group relative flex flex-col rounded-[2rem] border border-[var(--home-border-soft)] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#3C3794] hover:shadow-2xl overflow-hidden">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                    <Image src={group.image.src} alt={group.image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--home-ink)]/60 to-transparent" />
                                </div>
                                <div className="relative flex flex-1 flex-col p-6 sm:p-8 pt-10">
                                    <span className="absolute -top-10 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3C3794] text-white shadow-[0_8px_16px_-6px_rgba(60,55,148,0.4)] transition-transform duration-300 group-hover:scale-110">
                                        <HomeServiceIcon kind={group.icon} />
                                    </span>
                                    <h3 className="text-2xl font-extrabold tracking-tight text-[var(--home-ink)]">{group.title}</h3>
                                    <p className="mt-4 flex-1 text-base leading-relaxed text-[var(--home-muted)]">{group.description}</p>
                                    <div className="mt-8 pt-6 border-t border-[var(--home-border-soft)]">
                                        <TrackedLink href={ROUTES.servicios.index} eventName={GA4_EVENTS.CLICK_CTA_TO_SERVICIOS} eventParams={{ location: 'home_service_card', service_group: group.tone }} className="flex items-center justify-between gap-4 font-bold text-[#3C3794] transition-colors hover:text-[#2F2B77] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]">
                                            Explorar especialidad <span className="transition-transform duration-300 group-hover:translate-x-2"><ArrowIcon /></span>
                                        </TrackedLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="relative isolate overflow-hidden bg-gradient-to-br from-[var(--brand-panel)] to-[var(--brand-deep)] py-20 text-white md:py-24">
                <div aria-hidden="true" className="home-control-grid absolute inset-0 opacity-15" />
                <Container size="xl" className="relative"><div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20"><div className="relative"><div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#1E1B4B] shadow-[0_24px_55px_-32px_rgba(0,0,0,0.75)]"><Image src={homeImages.middle.src} alt={homeImages.middle.alt} fill sizes="(min-width: 1280px) 650px, (min-width: 1024px) 52vw, calc(100vw - 2rem)" className="object-cover opacity-90 transition-opacity duration-700 hover:opacity-100" style={{ objectPosition: homeImages.middle.objectPosition ?? 'center' }} /><div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,rgba(23,32,51,0.34))]" /></div><div className="relative -mt-14 ml-5 max-w-sm rounded-2xl bg-white p-6 text-[var(--home-ink)] shadow-2xl sm:ml-10"><p className="text-lg font-extrabold leading-snug">No cotizamos a ciegas.</p><p className="mt-2 text-sm leading-6 text-[var(--home-muted)]">Primero ordenamos los datos, responsables y riesgos que pueden cambiar la operación.</p></div></div><div className="max-w-xl"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-emerald-300">Qué recibes</p><h2 className="mt-3 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] md:text-6xl">Coordinación con responsables y siguiente paso</h2><p className="mt-6 max-w-[58ch] text-lg leading-8 text-slate-300">Un ejecutivo centraliza la conversación y te explica qué se revisará, qué información falta y qué parte corresponde a cada operador.</p><ol className="home-team-steps mt-9 border-t border-white/20">{[['Revisamos tu caso', 'Mercancía, ruta, etapa, documentos y riesgos que cambian la decisión.'], ['Definimos el alcance', 'Aclaramos servicio, responsables, terceros, inclusiones y datos pendientes.'], ['Coordinamos y reportamos', 'Te informamos estado, contexto, incidencias y siguiente paso.']].map(([title, description], index) => <li key={title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-white/20 py-5 sm:grid-cols-[3rem_190px_minmax(0,1fr)] sm:gap-6"><span aria-hidden="true" className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-white/10 text-xs font-bold tracking-[0.08em] text-emerald-300 ring-1 ring-inset ring-white/20">{String(index + 1).padStart(2, '0')}</span><strong className="text-white">{title}</strong><span className="col-start-2 text-slate-300 sm:col-start-auto">{description}</span></li>)}</ol></div></div></Container>
            </section>

            <section className="border-b border-[var(--home-border-soft)] bg-[var(--home-canvas)] py-16 md:py-24">
                <Container size="md">
                    <div className="flex flex-col items-center text-center rounded-[2rem] border border-[var(--home-border-soft)] bg-white p-8 shadow-sm sm:p-12">
                        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--home-brand)]">Evaluación inicial</p>
                        <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--home-ink)] md:text-4xl">¿Listo para revisar tu caso?</h2>
                        <p className="mt-4 text-lg leading-8 text-[var(--home-muted)] max-w-2xl">Confirmamos si el caso es viable, qué servicio corresponde y qué información falta para poder cotizar adecuadamente.</p>
                        <div className="mt-8 flex justify-center">
                            <TrackedLink
                                href={ROUTES.evaluar}
                                eventName={GA4_EVENTS.CLICK_CTA_TO_PRECOTIZACION}
                                eventParams={{ location: 'home_evaluacion_banner' }}
                                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#3C3794] px-8 font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2F2B77] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C3794]"
                            >
                                Ir a la evaluación de operación
                            </TrackedLink>
                        </div>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="faq-titulo" className="bg-white py-16 md:py-20">
                <Container size="lg"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--home-brand)]">Antes de enviar tus datos</p><h2 id="faq-titulo" className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.03em] text-[var(--home-ink)] md:text-5xl">Preguntas frecuentes sobre la evaluación</h2></div><div className="mt-10 divide-y divide-[var(--home-border)] border-y border-[var(--home-border)]">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-lg font-extrabold text-[var(--home-ink)]">{faq.question}<span aria-hidden="true" className="text-2xl font-medium text-[var(--home-brand)] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-2 pr-12 pt-3 leading-7 text-[var(--home-muted)]">{faq.answer}</p></details>)}</div></div></Container>
            </section>

            <section className="home-final-field relative overflow-hidden border-y border-[var(--home-border-soft)] bg-[var(--home-canvas)] py-16 md:py-20">
                <div aria-hidden="true" className="home-control-grid absolute inset-0 opacity-50" />
                <Container size="lg" className="relative"><div className="mx-auto max-w-4xl text-center"><h2 className="text-balance text-4xl font-extrabold leading-[1.03] tracking-[-0.03em] text-[var(--home-ink)] md:text-6xl">Si tu caso es urgente, hablemos directamente</h2><p className="mx-auto mt-6 max-w-[62ch] text-lg leading-8 text-[var(--home-muted)]">Cuéntanos qué mercancía necesitas mover y en qué etapa estás. WhatsApp es una alternativa inmediata; para una evaluación ordenada, usa la página de evaluación.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><WhatsAppLink route="home-cta" messageKey="asesoria_gratis" variant="button">Hablar con un especialista</WhatsAppLink><TrackedLink href={ROUTES.evaluar} eventName={GA4_EVENTS.CLICK_CTA_TO_PRECOTIZACION} eventParams={{ location: 'home_final_cta' }} className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#b8b3a7] bg-transparent px-7 py-3.5 font-bold text-[#172033] transition-colors hover:border-[#3c3794] hover:bg-white hover:text-[#3c3794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c3794]">Ir a evaluar operación</TrackedLink></div><ul className="home-final-proof mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-[var(--home-muted)]" aria-label="Condiciones de la orientación"><li>Primera respuesta en 1 hora hábil</li><li>Evaluación inicial sin costo</li><li>Alcance antes de cotizar</li></ul></div></Container>
            </section>

            <section className="bg-[var(--home-education)] py-10 text-[var(--home-ink)] md:py-12">
                <Container size="xl"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><h2 className="text-2xl font-extrabold tracking-[-0.02em] md:text-3xl">¿Aún estás investigando?</h2><p className="mt-3 leading-7 text-[var(--home-muted)]">Consulta guías sobre importación, costos, permisos y documentos antes de enviar una operación a evaluación.</p></div><TrackedLink href={ROUTES.blog} eventName={GA4_EVENTS.BLOG_CTA_CLICK} eventParams={{ location: 'home_blog' }} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#799a90] px-6 py-3 font-bold text-[#172033] transition-[background-color,color,border-color] hover:border-[#172033] hover:bg-[#172033] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#172033]">Ir a recursos y guías <ArrowIcon /></TrackedLink></div></Container>
            </section>
        </>
    );
}
