import Link from 'next/link';
import { Container } from './Container';
import { NAV_ITEMS } from '@/lib/routes';
import { WhatsAppLink } from '@/components/tracking';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            <Container>
                <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold gradient-text">◆</span>
                            <span className="text-2xl font-bold text-white">AduanasPE</span>
                        </Link>
                        <p className="mt-4 text-slate-400 max-w-md">
                            Soluciones integrales en comercio exterior, agenciamiento de aduanas y logística internacional para tu negocio.
                        </p>
                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all"
                                aria-label="Instagram"
                            >
                                📷
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-3">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>Lima, Perú</li>
                            <li>
                                <a
                                    href="mailto:info@aduanaspe.com"
                                    className="hover:text-purple-400 transition-colors"
                                >
                                    info@aduanaspe.com
                                </a>
                            </li>
                            <li>
                                <WhatsAppLink
                                    messageKey="contacto"
                                    variant="link"
                                    className="text-slate-400 hover:text-green-400"
                                >
                                    WhatsApp
                                </WhatsAppLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                    <p>© {currentYear} AduanasPE. Todos los derechos reservados.</p>
                </div>
            </Container>
        </footer>
    );
}

export { Footer };
