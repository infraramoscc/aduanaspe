import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Documentos Aduaneros | Guía de Requisitos para Importar',
    description: 'Guía de documentos para comercio exterior: Factura Comercial, Packing List, Bill of Lading, DAM y Certificados de Origen. Aprende a gestionarlos.',
};

const documentos = [
    {
        title: 'Factura Comercial',
        importance: 'Crítico',
        desc: 'Documento base de la transacción. Debe detallar precios, Incoterm, descripción de mercancía y datos de comprador/vendedor.',
        icon: '🧾',
        tips: ['Debe ser legible', 'Sin borrones', 'Coincidir con orden de compra']
    },
    {
        title: 'Bill of Lading (BL)',
        importance: 'Crítico',
        desc: 'Contrato de transporte marítimo y título de propiedad de la carga. Sin el BL original (o release) no puedes retirar la carga.',
        icon: '🚢',
        tips: ['Verificar pesos y bultos', 'Consignatario correcto', 'Fecha de embarque']
    },
    {
        title: 'Packing List',
        importance: 'Alto',
        desc: 'Lista de empaque detallada. Indica contenido de cada caja, pesos brutos/netos y dimensiones. Vital para aforos físicos.',
        icon: '📦',
        tips: ['Detalle por bulto', 'Marcas y números', 'Coincidir con factura']
    },
    {
        title: 'Certificado de Origen',
        importance: 'Opcional (TLC)',
        desc: 'Documento que acredita el país de fabricación. Indispensable para acogerse a beneficios arancelarios (TLC) y pagar menos impuestos.',
        icon: '📜',
        tips: ['Formato oficial vigente', 'Firmas autorizadas', 'Criterio de origen']
    }
];

export default function DocumentosAduanerosPage() {
    return (
        <>
            <Hero
                badge="📂 Documentación"
                title="Documentos de Importación"
                highlightedWord="Documentos"
                subtitle="La clave de un despacho exitoso es una documentación perfecta. Conoce los requisitos para evitar multas."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '❌', title: 'Sin Errores', description: 'Evita multas' },
                            { icon: '⚡', title: 'Agilidad', description: 'Despacho rápido' },
                            { icon: '🔐', title: 'Seguridad', description: 'Legal' },
                            { icon: '💰', title: 'Ahorro', description: 'Sin sobrecostos' },
                        ]}
                    />
                }
            >
                <Link href="#lista">
                    <Button size="lg">Ver lista de documentos</Button>
                </Link>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">Revisión documentaria</Button>
                </Link>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            <section id="lista" className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-16">
                        <span className="section-badge">Requisitos</span>
                        <h2 className="text-3xl font-bold text-slate-900">Documentos <span className="gradient-text">Esenciales</span></h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                            Toda importación formal requiere este set de documentos. Asegúrate de tenerlos antes de la llegada de la carga.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {documentos.map((doc, index) => {
                            const colorClass = ['service-blue', 'service-purple', 'service-green', 'service-orange'][index % 4];
                            return (
                                <div key={doc.title} className={`service-card ${colorClass} p-8 h-full flex flex-col`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-5xl filter drop-shadow-sm">{doc.icon}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${doc.importance === 'Crítico' ? 'bg-red-100 text-red-700' :
                                            doc.importance === 'Alto' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {doc.importance}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{doc.title}</h3>
                                    <p className="text-slate-600 mb-6 flex-grow">{doc.desc}</p>

                                    <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                                        <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <span className="text-yellow-500">💡</span> Tips de experto:
                                        </h4>
                                        <ul className="space-y-1">
                                            {doc.tips.map(tip => (
                                                <li key={tip} className="text-xs text-slate-500 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            <SplitFeature
                title="¿Errores en tus documentos?"
                description="Un error de una letra en el BL o una descripción vaga en la factura puede costarte miles de dólares en multas y almacenaje."
                imageSide="left"
            >
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-2">Servicio de Revisión Previa</h4>
                    <p className="text-sm text-orange-800 mb-4">
                        En AduanasPE revisamos tus borradores antes de que tu proveedor emita los originales. Detectamos errores y te decimos cómo corregirlos.
                    </p>
                    <Link href={ROUTES.servicios.agenciamientoAduanas}>
                        <Button variant="secondary" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-100">
                            Ver servicio de agenciamiento
                        </Button>
                    </Link>
                </div>
            </SplitFeature>

            <Container>
                <div className="py-20">
                    <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 text-center border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Descarga checklist gratuito</h2>
                        <p className="text-slate-600 mb-8">
                            ¿Quieres estar seguro de no olvidar nada? Déjanos tu correo y te asesoramos.
                        </p>
                        <DiagnosticoForm title="Consulta sobre documentos" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100" />
                    </div>
                </div>
            </Container>

            <CTASection
                title="Gestión documental integral"
                subtitle="Deja el papeleo en nuestras manos. Nos encargamos de validar, numerar y archivar."
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
