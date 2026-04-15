import { Container } from './Container';
import { ROUTES } from '@/lib/routes';
import { services } from '@/content/services';
import { WhatsAppLink, TrackedLink, GA4_EVENTS } from '@/components/tracking';

const resourceLinks = [
    { label: 'Blog', href: ROUTES.blog },
    { label: 'Importacion', href: ROUTES.comercioExterior.importacion },
    { label: 'Documentos aduaneros', href: ROUTES.comercioExterior.documentosAduaneros },
];

const companyLinks: Array<{ label: string; href: string; external?: boolean }> = [
    { label: 'Quienes somos', href: ROUTES.quienesSomos },
    { label: 'Contacto', href: ROUTES.contacto },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            <Container>
                <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-4">
                    <div>
                        <TrackedLink
                            href="/"
                            eventName={GA4_EVENTS.NAV_CLICK}
                            eventParams={{ location: 'footer', label: 'logo' }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-xl font-bold gradient-text">◆</span>
                            <span className="text-2xl font-bold text-white">AduanasPE</span>
                        </TrackedLink>
                        <p className="mt-4 max-w-md text-slate-400">
                            Agencia de aduanas y logistica internacional para importadores que necesitan claridad, seguimiento y respuesta rapida.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Servicios</h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.slug}>
                                    <TrackedLink
                                        href={`/servicios/${service.slug}`}
                                        eventName={GA4_EVENTS.NAV_CLICK}
                                        eventParams={{ location: 'footer', label: service.slug }}
                                        className="text-slate-400 transition-colors hover:text-purple-400"
                                    >
                                        {service.title}
                                    </TrackedLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Recursos</h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((item) => (
                                <li key={item.href}>
                                    <TrackedLink
                                        href={item.href}
                                        eventName={GA4_EVENTS.NAV_CLICK}
                                        eventParams={{ location: 'footer', label: item.label }}
                                        className="text-slate-400 transition-colors hover:text-purple-400"
                                    >
                                        {item.label}
                                    </TrackedLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">Empresa</h3>
                        <ul className="space-y-3 text-slate-400">
                            {companyLinks.map((item) => (
                                <li key={item.href}>
                                    <TrackedLink
                                        href={item.href}
                                        external={item.external}
                                        eventName={GA4_EVENTS.NAV_CLICK}
                                        eventParams={{ location: 'footer', label: item.label }}
                                        className="transition-colors hover:text-purple-400"
                                    >
                                        {item.label}
                                    </TrackedLink>
                                </li>
                            ))}
                            <li>Callao, Peru</li>
                            <li>
                                <a href="mailto:info@aduanaspe.com" className="transition-colors hover:text-purple-400">
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

                <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                    <p>© {currentYear} AduanasPE. Comercio exterior con atencion personalizada.</p>
                </div>
            </Container>
        </footer>
    );
}

export { Footer };
