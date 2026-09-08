'use client';

import { type KeyboardEvent, useRef, useState } from 'react';
import { HEADER_NAV_GROUPS, ROUTES } from '@/lib/routes';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { TrackedLink, WhatsAppLink, GA4_EVENTS } from '@/components/tracking';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileNavId = 'mobile-navigation';

    const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setMobileMenuOpen(false);
            menuButtonRef.current?.focus();
        }
    };

    return (
        <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-slate-100">
            <div className="border-b border-white/10 bg-[#3C3794] text-white">
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
                        <span className="text-2xl font-bold text-slate-900">AduanasPE</span>
                    </TrackedLink>

                    <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
                        <TrackedLink
                            href={ROUTES.home}
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'header', label: 'Inicio' }}
                            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794]"
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
                            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                        >
                            Quiénes somos
                        </TrackedLink>
                        <TrackedLink
                            href="/contacto"
                            eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                            eventParams={{ location: 'header' }}
                            className="inline-flex min-h-11 items-center rounded-full bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_62%,#38BDF8_100%)] px-5 py-2 font-semibold text-white transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-pink"
                        >
                            Contactar
                        </TrackedLink>
                    </nav>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C3794] focus-visible:ring-offset-2 lg:hidden"
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
                        mobileMenuOpen ? 'max-h-[calc(100vh-150px)] overflow-y-auto overscroll-contain pb-4 shadow-[0_22px_38px_-28px_rgba(15,23,42,0.65)]' : 'max-h-0 shadow-none'
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
                            href="/contacto"
                            eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                            eventParams={{ location: 'mobile_header' }}
                            className="mx-4 mt-2 flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_62%,#38BDF8_100%)] px-5 py-2 text-center font-semibold text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contactar
                        </TrackedLink>
                    </nav>
                </div>
            </Container>
        </header>
    );
}

type HeaderNavGroup = (typeof HEADER_NAV_GROUPS)[number];
type HeaderNavLink = HeaderNavGroup['columns'][number]['links'][number];

function DesktopNavGroup({ group }: { group: HeaderNavGroup }) {
    return (
        <div className="group relative">
            <TrackedLink
                href={group.href}
                eventName={GA4_EVENTS.NAV_CLICK}
                eventParams={{ location: 'header', label: group.label }}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#ECEBFF] hover:text-[#3C3794] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-haspopup="true"
            >
                {group.label}
                <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </TrackedLink>

            <div className="site-mega-menu invisible absolute left-1/2 top-full z-50 w-[min(800px,calc(100vw-3rem))] -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.14)]">
                    <div className="p-5">
                            <div className="mb-4 flex items-end justify-between gap-5 border-b border-slate-200 pb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-950">
                                        {group.label}
                                    </h3>
                                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                                        {group.description}
                                    </p>
                                </div>
                                <TrackedLink
                                    href={group.href}
                                    eventName={GA4_EVENTS.NAV_CLICK}
                                    eventParams={{ location: 'header_mega', label: `Ver ${group.label}` }}
                                    className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#D8D5FF] hover:bg-[#ECEBFF] hover:text-[#3C3794]"
                                >
                                    Ver todo
                                </TrackedLink>
                            </div>

                            <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                                {group.columns.map((column) => (
                                    <div key={column.title}>
                                        <p className="mb-2 text-xs font-semibold text-slate-500">
                                            {column.title}
                                        </p>
                                        <div className="divide-y divide-slate-100">
                                            {column.links.map((item) => (
                                                <MegaMenuLink key={item.href} item={item} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <TrackedLink
                        href={group.featured.href}
                        eventName={GA4_EVENTS.NAV_CLICK}
                        eventParams={{ location: 'header_mega_featured', label: group.featured.label }}
                        className="flex min-h-14 items-center justify-between gap-5 border-t border-slate-200 bg-[#F5F3EA] px-5 py-3 transition-colors hover:bg-[#ECEBFF]"
                    >
                        <span>
                            <strong className="block text-sm text-slate-950">{group.featured.label}</strong>
                            <span className="mt-0.5 block text-xs text-slate-600">{group.featured.description}</span>
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-[#3C3794]">Ver ruta →</span>
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
            className="site-mega-link block min-h-11 px-2 py-3 transition-colors hover:bg-[#ECEBFF]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-300"
        >
            <span className="block text-sm font-bold text-slate-950">
                {item.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">
                {item.description}
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
