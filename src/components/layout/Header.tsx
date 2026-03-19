'use client';

import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/routes';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { TrackedLink, GA4_EVENTS } from '@/components/tracking';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="glass border-b border-slate-100 fixed top-0 left-0 right-0 z-50">
            <Container>
                <div className="flex items-center justify-between h-16">
                    {/* Logo con gradiente */}
                    <TrackedLink
                        href="/"
                        eventName={GA4_EVENTS.NAV_CLICK}
                        eventParams={{ location: 'header', label: 'logo' }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-xl font-bold gradient-text">◆</span>
                        <span className="text-2xl font-bold text-slate-900">AduanasPE</span>
                    </TrackedLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_ITEMS.map((item) => (
                            <TrackedLink
                                key={item.href}
                                href={item.href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'header', label: item.label }}
                                className="text-slate-600 hover:text-purple-600 transition-colors font-medium"
                            >
                                {item.label}
                            </TrackedLink>
                        ))}
                        {/* CTA en navbar con gradiente */}
                        <TrackedLink
                            href="/contacto"
                            eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                            eventParams={{ location: 'header' }}
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-5 py-2 rounded-full font-semibold hover:shadow-pink transition-all hover:-translate-y-0.5"
                        >
                            Contactar
                        </TrackedLink>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-600 hover:text-slate-900"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
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

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        'md:hidden overflow-hidden transition-all duration-300',
                        mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
                    )}
                >
                    <nav className="flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => (
                            <TrackedLink
                                key={item.href}
                                href={item.href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'mobile_header', label: item.label }}
                                className="px-4 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </TrackedLink>
                        ))}
                        <TrackedLink
                            href="/contacto"
                            eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                            eventParams={{ location: 'mobile_header' }}
                            className="mx-4 mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-5 py-2 rounded-full font-semibold text-center"
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

export { Header };
