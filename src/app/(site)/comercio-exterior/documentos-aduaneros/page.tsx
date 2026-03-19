import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Documentos Aduaneros para Importar y Exportar | AduanasPE',
    description: 'Guía de documentos aduaneros para comercio exterior: factura comercial, packing list, BL, DAM y certificados clave para tu operación.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/documentos-aduaneros',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const documentos = [
    {
        title: 'Factura comercial',
        importance: 'Crítico',
        desc: 'Documento base de la operación. Debe reflejar precios, incoterm, descripción del producto y datos correctos de comprador y vendedor.',
        icon: '01',
        tips: ['Debe ser legible', 'Sin diferencias con la compra', 'Con descripción precisa'],
    },
    {
        title: 'Bill of Lading o AWB',
        importance: 'Crítico',
        desc: 'Documento de transporte que acredita el embarque y permite continuar con el proceso logístico y aduanero.',
        icon: '02',
        tips: ['Verificar pesos y bultos', 'Consignatario correcto', 'Fechas consistentes'],
    },
    {
        title: 'Packing list',
        importance: 'Alto',
        desc: 'Lista detallada del contenido, pesos y dimensiones. Es clave para aforos, revisión física y control operativo.',
        icon: '03',
        tips: ['Detalle por bulto', 'Marcas claras', 'Coincidir con la factura'],
    },
    {
        title: 'Certificados y soportes',
        importance: 'Variable',
        desc: 'Dependiendo del producto, pueden requerirse certificados de origen, permisos o documentos técnicos complementarios.',
        icon: '04',
        tips: ['Validar antes del embarque', 'Revisar vigencia', 'Confirmar formato requerido'],
    },
];

export default function DocumentosAduanerosPage() {
    return (
        <>
            <Hero
                badge="Documentación"
                title="Los documentos correctos evitan gran parte de los problemas"
                highlightedWord="evitan gran parte de los problemas"
                subtitle="Revisa qué documentos son básicos, cuáles cambian según el producto y por qué conviene validarlos antes del embarque."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Menos observaciones', description: 'En el despacho' },
                            { icon: '02', title: 'Más orden', description: 'En la documentación' },
                            { icon: '03', title: 'Menos sobrecostos', description: 'Por errores evitables' },
                            { icon: '04', title: 'Más control', description: 'Antes del arribo' },
                        ]}
                    />
                }
            >
                <Link href="#lista">
                    <Button size="lg">Ver documentos clave</Button>
                </Link>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">Revisar mi documentación</Button>
                </Link>
            </Hero>

            <section id="lista" className="bg-white py-20">
                <Container>
                    <div className="mb-16 text-center">
                        <span className="section-badge">Requisitos</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Documentos <span className="gradient-text">esenciales</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Antes de la llegada de la carga, conviene tener este set documental claro y validado.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {documentos.map((doc) => (
                            <div key={doc.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                                <div className="mb-6 flex items-start justify-between">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700">
                                        {doc.icon}
                                    </span>
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                                        {doc.importance}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{doc.title}</h3>
                                <p className="mt-3 text-slate-600">{doc.desc}</p>
                                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                                    <h4 className="text-sm font-bold text-slate-700">Checklist rápido</h4>
                                    <ul className="mt-3 space-y-2">
                                        {doc.tips.map((tip) => (
                                            <li key={tip} className="flex items-center gap-2 text-sm text-slate-600">
                                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <SplitFeature
                title="Un error documental puede detener toda la operación"
                description="Una descripción ambigua, un dato mal consignado o un documento faltante puede generar observaciones, retrasos y costos adicionales que se pudieron evitar antes del embarque."
                imageSide="left"
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <h4 className="font-bold text-amber-900">Revisión previa</h4>
                    <p className="mt-2 text-sm text-amber-800">
                        Si revisas los documentos antes de la emisión final, reduces mucho más el riesgo de correcciones tardías.
                    </p>
                    <Link href={ROUTES.servicios.agenciamientoAduanas}>
                        <Button variant="secondary" size="sm" className="mt-4">
                            Ver servicio de agenciamiento
                        </Button>
                    </Link>
                </div>
            </SplitFeature>

            <Container>
                <div className="py-20">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center md:p-12">
                        <h2 className="text-2xl font-bold text-slate-900">Consulta sobre documentos</h2>
                        <p className="mt-4 text-slate-600">
                            Si tienes dudas sobre requisitos o soportes, cuéntanos tu operación y revisamos qué hace falta.
                        </p>
                        <DiagnosticoForm title="" className="mt-8 border border-slate-200 bg-white p-6 rounded-2xl" />
                    </div>
                </div>
            </Container>

            <CTASection
                title="Gestión documental más ordenada"
                subtitle="Te ayudamos a validar documentos y a reducir observaciones antes del despacho."
            >
                <Link href={ROUTES.servicios.agenciamientoAduanas}>
                    <Button size="lg" variant="secondary">
                        Contactar a un agente
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
