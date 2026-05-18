import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Container } from '@/components/layout';
import { CTASection, Hero, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { WhatsAppLink } from '@/components/tracking';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

const pageUrl = 'https://aduanaspe.com/comercio-exterior/importacion/importar-juguetes-utiles-escritorio/';
const checklistPdfUrl = '/recursos/checklist-importar-juguetes-utiles-escritorio.pdf';

export const metadata: Metadata = {
    title: 'Importar juguetes y útiles de escritorio a Perú | Guía DIGESA',
    description: 'Guía completa para importar juguetes y útiles de escritorio a Perú: DIGESA, autorización sanitaria, rotulado, documentos, riesgos, checklist y fuentes oficiales.',
    alternates: {
        canonical: pageUrl,
    },
    robots: {
        index: true,
        follow: true,
    },
};

const tableOfContents = [
    { href: '#resumen', label: 'Resumen para importadores' },
    { href: '#productos', label: 'Productos alcanzados' },
    { href: '#decision', label: 'Matriz de decisión' },
    { href: '#documentos', label: 'Documentos del proveedor' },
    { href: '#digesa', label: 'Autorización sanitaria DIGESA' },
    { href: '#rotulado', label: 'Rotulado y advertencias' },
    { href: '#escenarios', label: 'Escenarios reales' },
    { href: '#checklist', label: 'Checklist descargable' },
    { href: '#fuentes', label: 'Fuentes oficiales' },
];

const productGroups = [
    {
        label: 'Juguetes',
        title: 'Juguetes para menores',
        examples: 'Muñecas, carritos, bloques, juegos didácticos, juguetes con pintura, plástico, metal, piezas pequeñas o componentes mixtos.',
        importerQuestion: '¿El producto está pensado para juego infantil o será usado por niños?',
        risk: 'Puede requerir control por seguridad física, sustancias, edad recomendada y advertencias.',
        tone: 'border-sky-200 bg-sky-50',
        pill: 'bg-sky-100 text-sky-800',
    },
    {
        label: 'Escolar',
        title: 'Útiles escolares',
        examples: 'Crayones, plumones, lápices de color, témperas, plastilinas, gomas, tintas, sets escolares y materiales para niños.',
        importerQuestion: '¿Tiene contacto frecuente con manos, boca, piel o se ofrece para campaña escolar?',
        risk: 'El riesgo suele estar en pigmentos, tintas, solventes, materiales y rotulado.',
        tone: 'border-emerald-200 bg-emerald-50',
        pill: 'bg-emerald-100 text-emerald-800',
    },
    {
        label: 'Escritorio',
        title: 'Útiles de escritorio',
        examples: 'Marcadores, correctores, adhesivos, accesorios de escritorio, estuches o artículos de uso escolar/oficina.',
        importerQuestion: '¿Se vende para uso escolar, infantil o como material educativo?',
        risk: 'No todo artículo de oficina es sensible, pero los dirigidos a niños deben revisarse con cuidado.',
        tone: 'border-amber-200 bg-amber-50',
        pill: 'bg-amber-100 text-amber-800',
    },
    {
        label: 'Mixto',
        title: 'Kits y productos mixtos',
        examples: 'Kits promocionales, maletines escolares, combos de juguetes con útiles, productos con accesorios o regalos para niños.',
        importerQuestion: '¿Un solo producto combina juguete, accesorio, pintura, tinta o material escolar?',
        risk: 'El importador debe sustentar cada componente, no solo el producto principal.',
        tone: 'border-rose-200 bg-rose-50',
        pill: 'bg-rose-100 text-rose-800',
    },
];

const decisionMatrix = [
    {
        signal: 'Dirigido a niños o escolares',
        whatToReview: 'Edad recomendada, advertencias, composición, instrucciones y responsable del producto.',
        action: 'Trátalo como categoría sensible antes de comprar.',
        tone: 'border-sky-200 bg-sky-50 text-sky-950',
    },
    {
        signal: 'Tiene pintura, tinta, plastilina, goma o pigmentos',
        whatToReview: 'Sustancias, ensayos, metales pesados, toxicidad, inflamabilidad y restricciones del fabricante.',
        action: 'Pide informe técnico específico del lote o modelo.',
        tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    },
    {
        signal: 'Incluye piezas pequeñas, imanes, pilas o partes desmontables',
        whatToReview: 'Riesgo de asfixia, advertencias, edad mínima, instrucciones y seguridad del empaque.',
        action: 'Valida rotulado y sustento antes del embarque.',
        tone: 'border-amber-200 bg-amber-50 text-amber-950',
    },
    {
        signal: 'Proveedor entrega certificado genérico',
        whatToReview: 'Modelo, lote, fabricante, alcance del ensayo, fecha, laboratorio y producto evaluado.',
        action: 'No asumas que cubre tu importación sin compararlo con la carga real.',
        tone: 'border-orange-200 bg-orange-50 text-orange-950',
    },
    {
        signal: 'El producto será vendido en campaña escolar',
        whatToReview: 'Tiempos de permiso, nacionalización, rotulado, reposición de observaciones y fecha de venta.',
        action: 'Calcula el cronograma regulatorio antes de cerrar compra.',
        tone: 'border-rose-200 bg-rose-50 text-rose-950',
    },
];

const documentChecklist = [
    'Ficha técnica completa del producto.',
    'Composición de materiales, tintas, pinturas, pigmentos o sustancias relevantes.',
    'Fotos reales del producto, envase, empaque individual y empaque máster.',
    'Rotulado propuesto en castellano, incluyendo advertencias e instrucciones.',
    'Informe o certificado de ensayo aplicable al producto, modelo o lote.',
    'Datos del fabricante, país de origen, proveedor, marca, modelo, lote y cantidad.',
    'Edad recomendada, instrucciones de uso, armado, conservación y descarte.',
    'Declaración del proveedor sobre normas técnicas usadas para fabricar o evaluar el producto.',
];

const digesaFlow = [
    {
        step: '01',
        title: 'Clasifica el producto por uso real',
        text: 'No basta el nombre comercial. Define si es juguete, útil escolar, útil de escritorio, kit mixto o producto promocional dirigido a niños.',
        tone: 'from-sky-100 to-white text-sky-700',
    },
    {
        step: '02',
        title: 'Arma expediente técnico antes de pagar',
        text: 'Ficha técnica, composición, fotos, certificado de ensayo, fabricante, lote y rotulado deben pedirse antes de cerrar la orden.',
        tone: 'from-emerald-100 to-white text-emerald-700',
    },
    {
        step: '03',
        title: 'Valida autorización sanitaria',
        text: 'Revisa si corresponde gestionar autorización sanitaria o el procedimiento aplicable ante DIGESA antes del embarque.',
        tone: 'from-amber-100 to-white text-amber-700',
    },
    {
        step: '04',
        title: 'Cruza permiso, partida y aduanas',
        text: 'La clasificación arancelaria, el permiso sanitario y los documentos comerciales deben contar la misma historia del producto.',
        tone: 'from-orange-100 to-white text-orange-700',
    },
    {
        step: '05',
        title: 'Controla rotulado y comercialización',
        text: 'El ingreso no es el único riesgo. También debes poder vender el producto con advertencias, instrucciones y datos exigibles.',
        tone: 'from-rose-100 to-white text-rose-700',
    },
];

const labelingItems = [
    {
        title: 'Identificación del producto',
        text: 'Nombre, marca, modelo, lote, país de origen, fabricante o importador responsable deben ser consistentes con los documentos.',
        tone: 'border-sky-200 bg-sky-50',
    },
    {
        title: 'Edad recomendada',
        text: 'La edad no debe colocarse al azar. Debe relacionarse con el riesgo real de uso, piezas, sustancias, instrucciones y advertencias.',
        tone: 'border-emerald-200 bg-emerald-50',
    },
    {
        title: 'Advertencias visibles',
        text: 'Riesgos por piezas pequeñas, uso bajo supervisión, inflamabilidad, sustancias, contacto con boca o piel deben revisarse cuando corresponda.',
        tone: 'border-amber-200 bg-amber-50',
    },
    {
        title: 'Instrucciones en castellano',
        text: 'El usuario final debe entender cómo usar, armar, conservar o desechar el producto sin depender del idioma del fabricante.',
        tone: 'border-rose-200 bg-rose-50',
    },
];

const importerScenarios = [
    {
        label: 'Temporada',
        title: 'Campaña escolar con fecha fija',
        situation: 'El importador compra en volumen para vender antes del inicio de clases.',
        recommendation: 'No embarques sin cronograma de permiso, revisión de rotulado y margen para subsanar observaciones.',
        tone: 'bg-sky-50 border-sky-200 text-sky-950',
    },
    {
        label: 'Prueba',
        title: 'Primera importación pequeña',
        situation: 'El proveedor ofrece un lote bajo para probar mercado.',
        recommendation: 'Valida igual. Una carga pequeña con documentos incompletos puede generar costos mayores que el margen esperado.',
        tone: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
    {
        label: 'Promo',
        title: 'Producto promocional para niños',
        situation: 'Una empresa trae juguetes o sets como regalo de campaña.',
        recommendation: 'Revisa si el artículo se comporta como juguete ante la norma aunque no se venda de forma independiente.',
        tone: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
        label: 'Combo',
        title: 'Set mixto de útiles y juguete',
        situation: 'El empaque incluye plumones, goma, accesorios y una figura o juego didáctico.',
        recommendation: 'Analiza componente por componente. El riesgo puede estar en una pieza secundaria.',
        tone: 'bg-rose-50 border-rose-200 text-rose-950',
    },
];

const errors = [
    'Comprar solo porque el proveedor dice que el producto "ya exporta a otros países".',
    'Aceptar certificados que no mencionan el modelo o composición exacta.',
    'Traducir el rotulado al final, cuando la carga ya está por llegar.',
    'No revisar si el producto será usado por niños aunque el proveedor lo venda como artículo de oficina.',
    'Separar permiso sanitario, partida arancelaria y factura como si fueran trámites aislados.',
    'Esperar a que Aduanas o DIGESA observe para recién pedir información al proveedor.',
];

const downloadableChecklist = [
    'Ficha técnica y composición recibidas.',
    'Fotos de producto, empaque y rotulado verificadas.',
    'Certificado o informe de ensayo asociado al modelo/lote.',
    'Edad recomendada y advertencias revisadas.',
    'Fabricante, proveedor, país de origen y lote identificados.',
    'Permiso o autorización sanitaria evaluada antes de embarcar.',
    'Partida arancelaria revisada con información técnica completa.',
    'Cronograma de compra, permiso, embarque y venta calculado.',
];

const sources = [
    {
        label: 'Ley N.° 28376',
        detail: 'Ley que prohíbe y sanciona la fabricación, importación, distribución y comercialización de juguetes y útiles de escritorio tóxicos o peligrosos.',
        status: 'Marco legal base',
        tone: 'bg-sky-50 text-sky-800',
    },
    {
        label: 'D.S. N.° 008-2007-SA y modificatorias',
        detail: 'Reglamento de la Ley N.° 28376 sobre requisitos, autoridades, autorizaciones, control sanitario y sanciones.',
        status: 'Reglamento a revisar',
        tone: 'bg-emerald-50 text-emerald-800',
    },
    {
        label: 'DIGESA - Juguetes y útiles de escritorio',
        detail: 'Orientación oficial sobre autorización sanitaria, registro, sustancias, rotulado y control sanitario aplicable.',
        status: 'Fuente operativa',
        tone: 'bg-amber-50 text-amber-800',
    },
    {
        label: 'R.M. N.° 457-2026/MINSA',
        detail: 'Publica un proyecto de Decreto Supremo que modifica el reglamento para recibir sugerencias, comentarios o recomendaciones.',
        status: 'Proyecto en consulta',
        tone: 'bg-rose-50 text-rose-800',
    },
];

const faqs = [
    {
        question: '¿Todo juguete importado necesita autorización sanitaria?',
        answer: 'Debe revisarse caso por caso. Los juguetes y útiles de escritorio pueden estar sujetos a autorización sanitaria y controles sobre composición, rotulado, seguridad y sustancias tóxicas o peligrosas.',
    },
    {
        question: '¿La R.M. 457-2026/MINSA ya cambió las reglas vigentes?',
        answer: 'No debe tratarse como reglamento final. La resolución publica un proyecto de Decreto Supremo para recibir comentarios, sugerencias o recomendaciones durante noventa días calendario desde su publicación.',
    },
    {
        question: '¿Qué documentos conviene pedir antes de comprar al proveedor?',
        answer: 'Ficha técnica, composición, fotos del producto y empaque, certificado o informe de ensayo, datos del fabricante, país de origen, lote, edad recomendada, advertencias e instrucciones.',
    },
    {
        question: '¿Puedo importar primero y regularizar después?',
        answer: 'Es riesgoso. Si el producto requiere autorización o soporte técnico, esperar a que la carga llegue puede generar observaciones, sobrecostos, demoras, restricciones de venta o medidas correctivas.',
    },
    {
        question: '¿El certificado del proveedor siempre sirve en Perú?',
        answer: 'No necesariamente. Debe verificarse el alcance del certificado, laboratorio, producto evaluado, modelo, lote, fecha, normas aplicadas y correspondencia con la carga real.',
    },
];

function generateFaqSchema() {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    });
}

function generateWebPageSchema() {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Importar juguetes y útiles de escritorio a Perú',
        description: metadata.description,
        url: pageUrl,
        inLanguage: 'es-PE',
        about: [
            'importación de juguetes',
            'útiles de escritorio',
            'autorización sanitaria DIGESA',
            'rotulado de juguetes',
            'juguetes tóxicos o peligrosos',
        ],
        isPartOf: {
            '@type': 'WebSite',
            name: 'AduanasPE',
            url: 'https://aduanaspe.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'AduanasPE',
            url: 'https://aduanaspe.com',
        },
    });
}

function generateChecklistSchema() {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'Checklist para importar juguetes y útiles de escritorio a Perú',
        description: 'PDF descargable con puntos de revisión antes de comprar, embarcar y nacionalizar juguetes o útiles de escritorio.',
        url: `https://aduanaspe.com${checklistPdfUrl}`,
        learningResourceType: 'Checklist',
        inLanguage: 'es-PE',
        provider: {
            '@type': 'Organization',
            name: 'AduanasPE',
            url: 'https://aduanaspe.com',
        },
    });
}

export default function ImportarJuguetesUtilesPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
        { name: 'Importación', url: 'https://aduanaspe.com/comercio-exterior/importacion/' },
        { name: 'Juguetes y útiles de escritorio', url: pageUrl },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <JsonLd json={generateWebPageSchema()} />
            <JsonLd json={generateChecklistSchema()} />
            <JsonLd json={generateFaqSchema()} />

            <Hero
                badge="Guía práctica para importadores"
                title="Importar juguetes y útiles de escritorio a Perú sin improvisar permisos, rotulado ni documentos"
                highlightedWord="sin improvisar"
                subtitle="Una guía clara para validar si tu producto requiere revisión sanitaria, qué documentos pedir al proveedor, cómo preparar el rotulado y qué riesgos evitar antes de embarcar."
                size="lg"
                centered
                showStats={false}
                showFloatingCards={false}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Categoría sensible', description: 'Juguetes y útiles' },
                            { icon: '02', title: 'Entidad clave', description: 'DIGESA / MINSA' },
                            { icon: '03', title: 'Momento crítico', description: 'Antes de comprar' },
                            { icon: '04', title: 'Incluye PDF', description: 'Checklist operativo' },
                        ]}
                    />
                }
            >
                <a
                    href={checklistPdfUrl}
                    className="inline-flex items-center justify-center rounded-full bg-[#3C3794] px-8 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(60,55,148,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F2B77] hover:shadow-[0_18px_36px_rgba(60,55,148,0.24)]"
                    download
                >
                    Descargar checklist PDF
                </a>
                <Link href="#resumen">
                    <Button size="lg" variant="secondary">Leer la guía</Button>
                </Link>
            </Hero>

            <section className="bg-white py-16">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div className="service-card service-card-spacious service-blue md:sticky md:top-24">
                            <span className="section-badge">Índice de la guía</span>
                            <nav className="mt-6 grid gap-3" aria-label="Índice de contenido">
                                {tableOfContents.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="service-card service-card-compact service-cyan group flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-950"
                                    >
                                        <span>{item.label}</span>
                                        <span className="text-slate-300 transition-colors group-hover:text-slate-500">→</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div id="resumen" className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_60%,#0E7490_100%)] text-white shadow-xl">
                            <div className="bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.22),transparent_30%)] p-7 md:p-10">
                                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                    Resumen para decidir
                                </span>
                                <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                                    La pregunta no es solo cuánto cuesta traerlo, sino si podrás nacionalizarlo y venderlo.
                                </h2>
                                <p className="mt-5 text-lg leading-8 text-slate-300">
                                    En juguetes y útiles de escritorio, el riesgo no está solo en Aduanas. También está en la composición del producto, el rotulado, la edad recomendada, el sustento técnico y la autorización sanitaria que pueda corresponder ante DIGESA.
                                </p>
                                <div className="mt-8 grid gap-4 md:grid-cols-3">
                                    {[
                                        { stat: '01', label: 'Antes de pagar al proveedor', color: 'border-sky-300/30 bg-sky-300/10' },
                                        { stat: '02', label: 'Antes de embarcar la carga', color: 'border-emerald-300/30 bg-emerald-300/10' },
                                        { stat: '03', label: 'Antes de vender al público', color: 'border-amber-300/30 bg-amber-300/10' },
                                    ].map((item) => (
                                        <div key={item.label} className={`rounded-3xl border p-5 ${item.color}`}>
                                            <strong className="block text-2xl">{item.stat}</strong>
                                            <span className="mt-1 block text-sm text-slate-200">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section id="productos" className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-12 max-w-3xl">
                        <span className="section-badge">Alcance</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                            Qué productos deberías revisar con más cuidado
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            El nombre comercial del proveedor puede ser engañoso. Un artículo vendido como regalo, set, accesorio o útil de oficina puede ser sensible si está dirigido a niños o si incorpora sustancias, pinturas, piezas pequeñas o materiales que requieren control.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {productGroups.map((group, index) => (
                            <article key={group.title} className={`service-card ${['service-blue', 'service-green', 'service-amber', 'service-pink'][index % 4]} p-6`}>
                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${group.pill}`}>
                                    {group.label}
                                </span>
                                <h3 className="mt-4 text-2xl font-bold text-slate-950">{group.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-slate-700">{group.examples}</p>
                                <div className="mt-5 rounded-2xl bg-white/80 p-4 shadow-sm">
                                    <p className="text-sm font-bold text-slate-950">{group.importerQuestion}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{group.risk}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="decision" className="bg-white py-20">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <span className="section-badge">Matriz de decisión</span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                                Señales que activan una revisión sanitaria y documental más estricta
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Usa esta matriz como filtro inicial. No reemplaza una evaluación técnica, pero ayuda a detectar cuándo una importación no debería tratarse como una compra simple de mercadería.
                            </p>
                            <div className="service-card service-amber mt-8 p-6">
                                <h3 className="font-bold text-amber-950">Regla práctica</h3>
                                <p className="mt-3 text-sm leading-7 text-amber-900">
                                    Si el producto será usado por niños, tiene sustancias o pinturas, o se comercializa en campaña escolar, valida requisitos antes de enviar dinero al proveedor.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {decisionMatrix.map((row, index) => (
                                <article key={row.signal} className={`service-card ${['service-blue', 'service-green', 'service-amber', 'service-orange', 'service-pink'][index % 5]} p-5`}>
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black shadow-sm">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-950">{row.signal}</h3>
                                            <p className="mt-2 text-sm leading-7 text-slate-700">{row.whatToReview}</p>
                                            <p className="mt-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900">{row.action}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section id="documentos" className="bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_58%,#0E7490_100%)] py-20 text-white">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                Antes de comprar
                            </span>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                                Documentos mínimos que deberías pedir al proveedor
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Si el proveedor no puede entregar soporte técnico antes de la compra, el importador queda sin base para estimar permisos, partida arancelaria, rotulado, tiempos, costos y riesgos de nacionalización.
                            </p>
                            <a
                                href={checklistPdfUrl}
                                download
                                className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                            >
                                Descargar checklist completo
                            </a>
                        </div>

                        <div className="grid gap-3">
                            {documentChecklist.map((item, index) => (
                                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section id="digesa" className="bg-white py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="section-badge">DIGESA y operación</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                            Ruta recomendada antes de embarcar
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            La autorización sanitaria no debe verse como un trámite separado. Debe conversar con el proveedor, la factura, la partida arancelaria, la descripción comercial y el rotulado.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5">
                        {digesaFlow.map((item, index) => (
                            <article key={item.step} className={`service-card grid gap-5 p-6 md:grid-cols-[100px_1fr] md:items-start ${['service-blue', 'service-green', 'service-amber', 'service-orange', 'service-pink'][index % 5]}`}>
                                <span className="text-4xl font-black tracking-tight">{item.step}</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-950">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="rotulado" className="bg-slate-50 py-20">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <span className="section-badge">Rotulado</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                                El rotulado no se arregla al final: se diseña con la importación
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                En juguetes y útiles, el rotulado conecta seguridad, consumidor, vigilancia sanitaria y comercialización. Si se revisa recién cuando la carga llega, puedes perder tiempo valioso o descubrir que el empaque no soporta la venta.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {labelingItems.map((item, index) => (
                                <article key={item.title} className={`service-card p-6 ${['service-blue', 'service-green', 'service-amber', 'service-pink'][index % 4]}`}>
                                    <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section id="escenarios" className="bg-white py-20">
                <Container>
                    <div className="mb-12 max-w-3xl">
                        <span className="section-badge">Casos reales</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                            Escenarios donde una guía evita errores caros
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            Estos casos aparecen con frecuencia en importaciones de temporada, pruebas de mercado y compras promocionales.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {importerScenarios.map((scenario, index) => (
                            <article key={scenario.title} className={`service-card p-6 ${['service-blue', 'service-green', 'service-amber', 'service-pink'][index % 4]}`}>
                                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] shadow-sm">
                                    {scenario.label}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-slate-950">{scenario.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-slate-700">{scenario.situation}</p>
                                <div className="mt-5 rounded-2xl bg-white/80 p-4 shadow-sm">
                                    <p className="text-sm font-semibold text-slate-950">{scenario.recommendation}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_58%,#0E7490_100%)] py-20 text-white">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                Errores frecuentes
                            </span>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                                Lo barato se encarece cuando el expediente nace incompleto
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Esta categoría premia la preparación. La diferencia entre una compra ordenada y una carga observada suele estar en las preguntas que se hicieron antes de pagar.
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {errors.map((error, index) => (
                                <div key={error} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-300 text-xs font-black text-slate-950">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm leading-7 text-slate-200">{error}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section id="checklist" className="bg-white py-20">
                <Container>
                    <div className="service-card service-green grid gap-10 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                            <span className="section-badge">Recurso descargable</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                                Descarga el checklist para revisar tu compra antes del embarque
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                El PDF resume los puntos críticos que un importador debe validar con su proveedor, su agente de aduanas o su asesor regulatorio antes de cerrar la compra.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={checklistPdfUrl}
                                    download
                                    className="inline-flex items-center justify-center rounded-full bg-[#3C3794] px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(60,55,148,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2F2B77]"
                                >
                                    Descargar PDF
                                </a>
                                <WhatsAppLink route="importar-juguetes-utiles" messageKey="asesoria_gratis" variant="button">
                                    Revisar mi producto por WhatsApp
                                </WhatsAppLink>
                            </div>
                        </div>

                        <div className="service-card service-card-compact service-blue p-6">
                            <h3 className="text-xl font-bold text-slate-950">Qué incluye el checklist</h3>
                            <ul className="mt-6 grid gap-3">
                                {downloadableChecklist.map((item) => (
                                    <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <span className="section-badge">Actualización normativa</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                                Qué significa la R.M. 457-2026/MINSA para esta guía
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                La Resolución Ministerial N.° 457-2026/MINSA dispone la publicación de un proyecto de Decreto Supremo que modifica el reglamento de la Ley N.° 28376 para recibir comentarios, sugerencias o recomendaciones. Por eso, en esta página se usa como señal de actualización regulatoria, no como norma final aprobada.
                            </p>
                        </div>

                        <div className="service-card service-pink p-6 md:p-8">
                            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-rose-800">
                                Proyecto en consulta
                            </span>
                            <h3 className="mt-4 text-xl font-bold text-slate-950">Cómo afecta al importador</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Aunque sea un proyecto, muestra hacia dónde apunta la regulación: mayor trazabilidad, mejor identificación del producto, vigilancia sanitaria, rotulado, controles sobre seguridad y procedimientos más ordenados para autorización.
                            </p>
                            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
                                <p className="text-sm font-semibold text-rose-950">
                                    No conviene esperar a que la norma final se apruebe para ordenar expedientes. La validación técnica antes de comprar sigue siendo el mejor filtro.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section id="fuentes" className="bg-white py-20">
                <Container>
                    <div className="mb-12 max-w-3xl">
                        <span className="section-badge">Fuentes</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
                            Fuentes oficiales revisadas
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            Esta guía debe actualizarse cuando el proyecto MINSA avance, cuando DIGESA publique nuevos criterios o cuando se identifiquen cambios en procedimientos aplicables a importadores.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {sources.map((source) => (
                            <article key={source.label} className="service-card service-blue p-6">
                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${source.tone}`}>
                                    {source.status}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-slate-950">{source.label}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{source.detail}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm">
                        <a className="font-semibold text-slate-700 underline-offset-4 hover:underline" href="https://www.gob.pe/institucion/minsa/normas-legales/8116237-457-2026-minsa" target="_blank" rel="noreferrer">
                            Ver R.M. 457-2026/MINSA
                        </a>
                        <a className="font-semibold text-slate-700 underline-offset-4 hover:underline" href="https://www.digesa.minsa.gob.pe/DEPA/juguetes_utiles/disposiciones_generales.asp" target="_blank" rel="noreferrer">
                            Ver orientación DIGESA
                        </a>
                        <a className="font-semibold text-slate-700 underline-offset-4 hover:underline" href="https://www.digesa.minsa.gob.pe/Expedientes/detalles.aspx?id=41" target="_blank" rel="noreferrer">
                            Ver TUPA DIGESA
                        </a>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <span className="section-badge">Preguntas frecuentes</span>
                        <div className="mt-8 grid gap-4">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="service-card service-card-compact service-blue p-6">
                                    <h3 className="text-xl font-bold text-slate-950">{faq.question}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="py-20">
                    <div className="service-card service-orange mx-auto max-w-3xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-slate-950">Revisa tu producto antes de comprar</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Si ya tienes proveedor, ficha técnica, certificado, fotos o cotización, podemos ayudarte a ordenar la revisión antes de embarcar.
                        </p>
                        <DiagnosticoForm title="" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6" />
                    </div>
                </div>
            </Container>

            <CTASection
                title="Evita comprar un lote que no puedas nacionalizar o vender"
                subtitle="Antes de pagar al proveedor, revisa si el producto exige autorización sanitaria, rotulado especial o soporte técnico adicional."
            >
                <Link href={ROUTES.servicios.consultoriaAduanera}>
                    <Button size="lg" variant="secondary">
                        Ver consultoría aduanera
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
