'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HEADER_NAV_GROUPS, ROUTES } from '@/lib/routes';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { TrackedLink, WhatsAppLink, GA4_EVENTS } from '@/components/tracking';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileNavId = 'mobile-navigation';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setMobileMenuOpen(false);
            menuButtonRef.current?.focus();
        }
    };

    // Transparent only on home page before scroll; always solid on inner pages
    const isSolid = scrolled || !isHome;

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
            isSolid
                ? 'bg-[#1E1B4B]/95 backdrop-blur-md border-white/20 shadow-[0_4px_32px_rgba(0,0,0,0.3)]'
                : 'bg-transparent border-white/10'
        )}>
            <div className="hidden border-b border-white/10 bg-[#3C3794] text-white sm:block">
                <Container>
                    <div className="flex min-h-11 flex-col items-center justify-center gap-2 py-2 text-center md:flex-row md:justify-between md:text-left">
                        <p className="w-full max-w-full text-sm font-medium leading-5 text-slate-100 md:w-auto">
                            ¿Tienes dudas sobre comercio exterior? Recibe una asesoría sin costo.
                            <span className="hidden text-slate-300 sm:inline"> Sin compromiso y antes de cotizar cualquier servicio.</span>
                        </p>
                        <WhatsAppLink
                            messageKey="asesoria_gratis"
                            variant="link"
                            className="min-h-11 shrink-0 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                        >
                            Resolver mis dudas
                        </WhatsAppLink>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="flex h-16 items-center justify-between">
                    <TrackedLink
                        href="/"
                        eventName={GA4_EVENTS.NAV_CLICK}
                        eventParams={{ location: 'header', label: 'logo' }}
                        className="flex min-h-11 items-center gap-2"
                    >
                        <span className="text-xl font-bold gradient-text">◆</span>
                        <span className="text-2xl font-bold text-white">AduanasPE</span>
                    </TrackedLink>

                    <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
                        <TrackedLink
                            href={ROUTES.home}
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'header', label: 'Inicio' }}
                            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Inicio
                        </TrackedLink>
                        {HEADER_NAV_GROUPS.map((group) => (
                            <DesktopNavGroup key={group.label} group={group} />
                        ))}
                        <TrackedLink
                            href={ROUTES.quienesSomos}
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'header', label: 'Quiénes somos' }}
                            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Quiénes somos
                        </TrackedLink>
                        <TrackedLink
                            href={ROUTES.evaluar}
                            eventName={GA4_EVENTS.CLICK_CTA_TO_PRECOTIZACION}
                            eventParams={{ location: 'header' }}
                            className={cn(
                                'inline-flex min-h-11 items-center rounded-full px-5 py-2 font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2',
                                scrolled
                                    ? 'bg-[#3C3794] text-white shadow-sm hover:bg-[#2F2B77] focus-visible:outline-[#3C3794]'
                                    : 'border border-white/50 text-white hover:bg-white/10 focus-visible:outline-white'
                            )}
                        >
                            Evaluar operación
                        </TrackedLink>
                    </nav>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 lg:hidden"
                        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
                        aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-controls={mobileNavId}
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                <div
                    id={mobileNavId}
                    aria-hidden={!mobileMenuOpen}
                    inert={!mobileMenuOpen}
                    onKeyDown={handleMobileMenuKeyDown}
                    className={cn(
                        'mobile-menu-panel overflow-hidden bg-white transition-[max-height,box-shadow] duration-300 lg:hidden',
                        mobileMenuOpen ? 'max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain pb-4 shadow-[0_22px_38px_-28px_rgba(15,23,42,0.65)] sm:max-h-[calc(100vh-108px)]' : 'max-h-0 shadow-none'
                    )}
                >
                    <nav aria-label="Navegación principal móvil" className="flex flex-col border-t border-slate-200 pt-2">
                        <TrackedLink
                            href={ROUTES.home}
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'mobile_header', label: 'Inicio' }}
                            className="flex min-h-11 items-center rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Inicio
                        </TrackedLink>
                        {HEADER_NAV_GROUPS.map((group) => (
                            <MobileNavGroup
                                key={group.label}
                                group={group}
                                onNavigate={() => setMobileMenuOpen(false)}
                            />
                        ))}
                        <TrackedLink
                            href={ROUTES.quienesSomos}
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'mobile_header', label: 'Quiénes somos' }}
                            className="flex min-h-11 items-center rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Quiénes somos
                        </TrackedLink>
                        <TrackedLink
                            href="/#evaluar"
                            eventName={GA4_EVENTS.CLICK_CTA_TO_PRECOTIZACION}
                            eventParams={{ location: 'mobile_header' }}
                            className="mx-4 mt-2 flex min-h-11 items-center justify-center rounded-full bg-[#3C3794] px-5 py-2 text-center font-semibold text-white shadow-sm transition-colors hover:bg-[#2F2B77]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Evaluar operación
                        </TrackedLink>
                    </nav>
                </div>
            </Container>
        </header>
    );
}

type HeaderNavGroup = (typeof HEADER_NAV_GROUPS)[number];
type HeaderNavLink = HeaderNavGroup['columns'][number]['links'][number];

function NavLinkIcon({ href }: { href: string }) {
    const s = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
    if (href.includes('agenciamiento')) return <svg {...s}><path d="M4 20h16M5.5 9.5h13M7 9.5V20m5-10.5V20m5-10.5V20M4.5 7 12 3l7.5 4v2.5h-15Z" /></svg>;
    if (href.includes('consultoria')) return <svg {...s}><path d="M4 4h16v12H8l-4 4V4Zm4 4h8m-8 4h5" /></svg>;
    if (href.includes('ajuste')) return <svg {...s}><path d="M12 3v18M3 9h18M5 15h14" /><circle cx="12" cy="9" r="2" /></svg>;
    if (href.includes('multas')) return <svg {...s}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    if (href.includes('resguardo')) return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    if (href.includes('carga-internacional')) return <svg {...s}><path d="M3 6.5h11v10H3zM14 10h3.5l3 3.5v3H14zM6.5 20a2 2 0 100-4 2 2 0 000 4Zm10.5 0a2 2 0 100-4 2 2 0 000 4Z" /></svg>;
    if (href.includes('transporte')) return <svg {...s}><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 4v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
    if (href.includes('importacion') && !href.includes('china') && !href.includes('puerta') && !href.includes('juguetes')) return <svg {...s}><path d="M12 3v13m0 0l-4-4m4 4l4-4M3 21h18" /></svg>;
    if (href.includes('china')) return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>;
    if (href.includes('puerta')) return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    if (href.includes('juguetes')) return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>;
    if (href.includes('courier')) return <svg {...s}><path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-3" /><path d="M18.4 2.6a2.17 2.17 0 013.1 3l-9 9L9 16l1.4-3.5 8-9.9z" /></svg>;
    if (href.includes('exportacion')) return <svg {...s}><path d="M12 21V8m0 0l-4 4m4-4l4 4M3 3h18" /></svg>;
    if (href.includes('regimenes')) return <svg {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8m8 4H8m2-8H8" /></svg>;
    if (href.includes('documentos')) return <svg {...s}><path d="M7 3h10l4 4v14H3V3z" /><path d="M14 3v5h5M9 12h6m-6 4h4" /></svg>;
    if (href.includes('acuerdos')) return <svg {...s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>;
    if (href.includes('blog')) return <svg {...s}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="12" y2="15" /></svg>;
    if (href.includes('calculadora')) return <svg {...s}><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /></svg>;
    if (href.includes('simulador')) return <svg {...s}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
    if (href.includes('buscador') || href.includes('partidas')) return <svg {...s}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" /></svg>;
}

function DesktopNavGroup({ group }: { group: HeaderNavGroup }) {
    return (
        <div className="group relative">
            <TrackedLink
                href={group.href}
                eventName={GA4_EVENTS.NAV_CLICK}
                eventParams={{ location: 'header', label: group.label }}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-haspopup="true"
            >
                {group.label}
                <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </TrackedLink>

            <div className="site-mega-menu invisible absolute left-1/2 top-full z-50 w-[min(820px,calc(100vw-3rem))] -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)] ring-1 ring-black/5">
                    {/* Purple top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#3C3794] via-[#5B57C9] to-[#34D399]" />

                    <div className="p-6">
                        {/* Header row */}
                        <div className="mb-5 flex items-start justify-between gap-5">
                            <div>
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#3C3794]">{group.eyebrow}</p>
                                <p className="mt-1 max-w-md text-sm leading-5 text-slate-500">{group.description}</p>
                            </div>
                            <TrackedLink
                                href={group.href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'header_mega', label: `Ver ${group.label}` }}
                                className="shrink-0 rounded-full border border-[#D8D5FF] bg-[#ECEBFF] px-4 py-1.5 text-xs font-bold text-[#3C3794] transition-colors hover:bg-[#3C3794] hover:text-white"
                            >
                                Ver todo
                            </TrackedLink>
                        </div>

                        {/* Columns */}
                        <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
                            {group.columns.map((column) => (
                                <div key={column.title}>
                                    <p className="mb-2 border-b border-slate-100 pb-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#3C3794]">
                                        {column.title}
                                    </p>
                                    <div className="space-y-0.5">
                                        {column.links.map((item) => (
                                            <MegaMenuLink key={item.href} item={item} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured footer — dark purple */}
                    <TrackedLink
                        href={group.featured.href}
                        eventName={GA4_EVENTS.NAV_CLICK}
                        eventParams={{ location: 'header_mega_featured', label: group.featured.label }}
                        className="group/feat flex min-h-14 items-center justify-between gap-5 bg-[#1E1B4B] px-6 py-4 transition-colors hover:bg-[#2F2B77]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </span>
                            <span>
                                <strong className="block text-sm font-bold text-white">{group.featured.label}</strong>
                                <span className="mt-0.5 block text-xs text-slate-300">{group.featured.description}</span>
                            </span>
                        </span>
                        <span className="shrink-0 rounded-full bg-emerald-400 px-3 py-1 text-xs font-extrabold text-slate-900 transition-transform group-hover/feat:translate-x-0.5">
                            Empezar →
                        </span>
                    </TrackedLink>
                </div>
            </div>
        </div>
    );
}

function MegaMenuLink({ item }: { item: HeaderNavLink }) {
    return (
        <TrackedLink
            href={item.href}
            eventName={GA4_EVENTS.NAV_CLICK}
            eventParams={{ location: 'header_mega', label: item.label }}
            className="group/link flex items-start gap-3 rounded-xl border-l-2 border-transparent px-2 py-2.5 transition-all duration-150 hover:border-[#3C3794] hover:bg-[#F5F3FF] hover:pl-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3C3794]/30"
        >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ECEBFF] text-[#3C3794] transition-colors group-hover/link:bg-[#3C3794] group-hover/link:text-white">
                <NavLinkIcon href={item.href} />
            </span>
            <span>
                <span className="block text-sm font-bold text-slate-900">
                    {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-4 text-slate-500">
                    {item.description}
                </span>
            </span>
        </TrackedLink>
    );
}

function MobileNavGroup({ group, onNavigate }: { group: HeaderNavGroup; onNavigate: () => void }) {
    return (
        <details className="site-mobile-nav-group border-b border-slate-200 bg-white">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-slate-900">
                {group.label}
                <span className="text-xs font-semibold text-[#3C3794]">Ver opciones</span>
            </summary>
            <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                <p className="text-xs leading-5 text-slate-600">
                    {group.description}
                </p>
                {group.columns.map((column) => (
                    <div key={column.title} className="mt-4">
                        <p className="mb-2 text-xs font-semibold text-slate-500">
                            {column.title}
                        </p>
                        <div className="space-y-1">
                            {column.links.map((item) => (
                                <TrackedLink
                                    key={item.href}
                                    href={item.href}
                                    eventName={GA4_EVENTS.NAV_CLICK}
                                    eventParams={{ location: 'mobile_header_group', label: item.label }}
                                    className="flex min-h-11 items-center rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                                    onClick={onNavigate}
                                >
                                    {item.label}
                                </TrackedLink>
                            ))}
                        </div>
                    </div>
                ))}
                <TrackedLink
                    href={group.featured.href}
                    eventName={GA4_EVENTS.NAV_CLICK}
                    eventParams={{ location: 'mobile_header_featured', label: group.featured.label }}
                    className="mt-4 flex min-h-11 items-center rounded-2xl bg-[#3C3794] px-4 py-3 text-sm font-semibold text-white"
                    onClick={onNavigate}
                >
                    {group.featured.label}
                </TrackedLink>
            </div>
        </details>
    );
}

export { Header };
