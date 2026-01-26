'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/routes';
import { Container } from './Container';
import { cn } from '@/lib/utils';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="glass border-b border-slate-100 fixed top-0 left-0 right-0 z-50">
            <Container>
                <div className="flex items-center justify-between h-16">
                    {/* Logo con gradiente */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold gradient-text">◆</span>
                        <span className="text-2xl font-bold text-slate-900">AduanasPE</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-slate-600 hover:text-purple-600 transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* CTA en navbar con gradiente */}
                        <Link
                            href="/contacto"
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-5 py-2 rounded-full font-semibold hover:shadow-pink transition-all hover:-translate-y-0.5"
                        >
                            Contactar
                        </Link>
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
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contacto"
                            className="mx-4 mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-5 py-2 rounded-full font-semibold text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contactar
                        </Link>
                    </nav>
                </div>
            </Container>
        </header>
    );
}

export { Header };
