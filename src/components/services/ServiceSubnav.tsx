'use client';

import { usePathname } from 'next/navigation';
import { GA4_EVENTS, TrackedLink } from '@/components/tracking';

const serviceLinks = [
    { label: 'Todos', href: '/servicios' },
    { label: 'Aduanas', href: '/servicios/agenciamiento-aduanas' },
    { label: 'Carga internacional', href: '/servicios/agencia-de-carga-internacional' },
    { label: 'Transporte', href: '/servicios/transporte-de-carga' },
    { label: 'Resguardo', href: '/servicios/resguardo-aduanero' },
    { label: 'Consultoría', href: '/servicios/consultoria-aduanera' },
    { label: 'Ajuste de valor', href: '/servicios/ajuste-de-valor-aduanero' },
    { label: 'Multas SUNAT', href: '/servicios/multas-aduaneras-sunat' },
] as const;

function ServiceSubnav() {
    const pathname = usePathname().replace(/\/$/, '') || '/';

    return (
        <nav aria-label="Navegación de servicios" className="service-subnav border-b border-[var(--home-border-soft)] bg-white/95">
            <div className="mx-auto max-w-7xl overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
                <ul className="flex min-w-max items-center gap-1 py-3">
                    {serviceLinks.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <TrackedLink
                                    href={item.href}
                                    eventName={GA4_EVENTS.NAV_CLICK}
                                    eventParams={{ location: 'service_subnav', label: item.label }}
                                    aria-current={isActive ? 'page' : undefined}
                                    className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-bold text-[var(--home-muted)] transition-colors hover:bg-[var(--home-brand-soft)] hover:text-[var(--home-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-brand)] aria-[current=page]:bg-[var(--home-brand)] aria-[current=page]:text-white"
                                >
                                    {item.label}
                                </TrackedLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export { ServiceSubnav };
