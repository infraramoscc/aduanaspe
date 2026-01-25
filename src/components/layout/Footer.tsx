import Link from 'next/link';
import { Container } from './Container';
import { NAV_ITEMS } from '@/lib/routes';
import { WhatsAppLink } from '@/components/tracking';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <Container>
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white">
                            AduanasPE
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-md">
                            Soluciones integrales en comercio exterior, agenciamiento de aduanas y logística internacional para tu negocio.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-white transition-colors"
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
                        <ul className="space-y-2 text-gray-400">
                            <li>Lima, Perú</li>
                            <li>
                                <a
                                    href="mailto:info@aduanaspe.com"
                                    className="hover:text-white transition-colors"
                                >
                                    info@aduanaspe.com
                                </a>
                            </li>
                            <li>
                                <WhatsAppLink
                                    messageKey="contacto"
                                    variant="link"
                                    className="text-gray-400 hover:text-white"
                                >
                                    WhatsApp
                                </WhatsAppLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                    <p>© {currentYear} AduanasPE. Todos los derechos reservados.</p>
                </div>
            </Container>
        </footer>
    );
}

export { Footer };
