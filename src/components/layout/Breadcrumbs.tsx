'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';

interface BreadcrumbItem {
    label: string;
    href: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Inicio', href: '/' },
    ];

    let currentPath = '';

    const labels: Record<string, string> = {
        'quienes-somos': 'Quiénes somos',
        'servicios': 'Servicios',
        'comercio-exterior': 'Comercio Exterior',
        'contacto': 'Contacto',
        'agenciamiento-aduanas': 'Agenciamiento de Aduanas',
        'agencia-de-carga-internacional': 'Agencia de Carga Internacional',
        'transporte-de-carga': 'Transporte de Carga',
        'resguardo-aduanero': 'Resguardo Aduanero',
        'consultoria-aduanera': 'Consultoría Aduanera',
        'importacion': 'Importación',
        'exportacion': 'Exportación',
        'regimenes-aduaneros': 'Regímenes Aduaneros',
        'documentos-aduaneros': 'Documentos Aduaneros',
        'importar-desde-china': 'Importar desde China',
        'importa-puerta-a-puerta': 'Importa Puerta a Puerta',
        'courier-vs-carga': 'Courier vs Carga',
    };

    segments.forEach((segment) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({
            label: labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
            href: currentPath,
        });
    });

    return breadcrumbs;
}

function Breadcrumbs() {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    if (pathname === '/') return null;

    return (
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
            <Container>
                <ol className="flex items-center gap-2 py-3 text-sm overflow-x-auto">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <li key={crumb.href} className="flex items-center gap-2 whitespace-nowrap">
                                {index > 0 && (
                                    <svg
                                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                                {isLast ? (
                                    <span className="text-gray-600 font-medium">{crumb.label}</span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="text-gray-500 hover:text-violet-600 transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </nav>
    );
}

export { Breadcrumbs };
