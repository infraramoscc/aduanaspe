import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';

const canonical = 'https://aduanaspe.com/comercio-exterior/acuerdos-comerciales/';

export const metadata: Metadata = {
    title: 'Acuerdos comerciales del Perú: guías para aprender | AduanasPE',
    description: 'Aprende a revisar reglas de origen, preferencias arancelarias y certificados. Guías de China y Estados Unidos para importar a Perú y exportar desde Perú.',
    alternates: { canonical },
    robots: { index: true, follow: true },
};

const agreements = [
    {
        name: 'Perú – China',
        label: 'TLC',
        introduction: 'Empieza por el origen del producto; después revisa la operación y el certificado emitido por una entidad autorizada.',
        lessons: [
            { stage: '01 · Entender', title: 'Reglas de origen, sin confundir fabricación y procedencia', href: '/blog/reglas-origen-tlc-peru-china/', detail: 'Criterios WO, WP y PSR, insumos extranjeros y un cálculo explicado.' },
            { stage: '02 · Importar', title: 'Preparar la preferencia al importar de China a Perú', href: '/blog/importar-china-peru-preferencia-arancelaria/', detail: 'Qué pedir al proveedor, cómo revisar el tránsito y qué hacer si falta el certificado.' },
            { stage: '03 · Documentar', title: 'Llenar y revisar los 14 campos del certificado', href: '/blog/certificado-origen-china-peru/', detail: 'Ejemplos ficticios en ambas direcciones, errores y consultas de llenado.' },
            { stage: '04 · Exportar', title: 'Sustentar el origen de una exportación peruana a China', href: '/blog/exportar-china-certificado-origen/', detail: 'Expediente del producto, declaración jurada, entidad certificadora y seguimiento.' },
        ],
        source: 'https://acuerdoscomerciales.gob.pe/en_vigencia/China/Textos_Acuerdo.html',
    },
    {
        name: 'Perú – Estados Unidos',
        label: 'APC',
        introduction: 'Aprende a sustentar la certificación bajo este acuerdo. No traslades a Estados Unidos las reglas ni el formato de China.',
        lessons: [
            { stage: '01 · Entender', title: 'Reglas de origen del APC Perú – Estados Unidos', href: '/blog/reglas-origen-tlc-peru-estados-unidos/', detail: 'Criterios de origen, transformación, valor de contenido regional y casos.' },
            { stage: '02 · Importar', title: 'Importar de Estados Unidos a Perú con el APC', href: '/blog/importar-estados-unidos-peru-tlc-certificado-origen/', detail: 'Revisa el sustento antes de solicitar el beneficio en Perú.' },
            { stage: '03 · Documentar', title: 'Completar la certificación y resolver dudas de llenado', href: '/blog/llenar-certificado-origen-peru-estados-unidos/', detail: 'Uso del formato referencial y revisión de la información declarada.' },
            { stage: '04 · Exportar', title: 'Exportar desde Perú a Estados Unidos con sustento de origen', href: '/blog/exportar-estados-unidos-tlc-reglas-origen/', detail: 'Responsabilidades, evidencias y precauciones antes de certificar.' },
        ],
        source: 'https://www.acuerdoscomerciales.gob.pe/En_Vigencia/EEUU/inicio.html',
    },
];

const checks = [
    { title: 'Identifica el producto', text: 'Reúne su composición, uso, proceso de fabricación y clasificación arancelaria. Un nombre comercial no basta.' },
    { title: 'Consulta el beneficio', text: 'Comprueba que el acuerdo esté vigente y revisa la preferencia del producto en el país que lo importará.' },
    { title: 'Demuestra el origen', text: 'Lee la regla aplicable y reúne evidencia de producción e insumos. Comprar en un país no prueba el origen.' },
    { title: 'Prepara el expediente', text: 'Revisa la prueba de origen, el transporte y la solicitud ante la aduana de destino. Los permisos se revisan por separado.' },
];

const linkStyle = 'rounded-sm text-blue-800 underline decoration-blue-300 underline-offset-4 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700';

export default function AcuerdosComercialesPage() {
    return (
        <>
            <JsonLd json={generateBreadcrumbSchema([
                { name: 'Inicio', url: 'https://aduanaspe.com/' },
                { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
                { name: 'Acuerdos comerciales', url: canonical },
            ])} />

            <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-24">
                <Container>
                    <div className="max-w-3xl">
                        <p className="mb-5 text-sm font-bold uppercase tracking-widest text-blue-800">Biblioteca de aprendizaje</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">Entiende los acuerdos. Prepara mejor tu operación.</h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">Guías para aprender cómo funcionan las preferencias arancelarias, demostrar el origen de una mercancía y revisar sus documentos. Para quienes importan a Perú y quienes exportan desde Perú.</p>
                        <nav aria-label="Elige tu recorrido" className="mt-8 flex flex-wrap gap-x-6 gap-y-4 font-semibold">
                            <a href="#aprender" className={linkStyle}>Quiero aprender</a>
                            <a href="#guias" className={linkStyle}>Buscar por acuerdo</a>
                            <a href="#preparar" className={linkStyle}>Tengo una operación</a>
                        </nav>
                    </div>
                    <p className="mt-10 text-sm text-slate-500">Primera colección: China y Estados Unidos · Revisión editorial: 4 de septiembre de 2026</p>
                </Container>
            </section>

            <section id="aprender" className="scroll-mt-28 py-16 md:py-20">
                <Container>
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Empieza aquí</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950">Cuatro preguntas antes de pedir un beneficio</h2>
                        <p className="mt-4 leading-7 text-slate-600">Piensa en una mercancía concreta. El acuerdo es el punto de partida, no una garantía de ahorro: cada respuesta necesita información y documentos.</p>
                    </div>
                    <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {checks.map((check, index) => (
                            <li key={check.title} className="border-t-2 border-blue-800 pt-5">
                                <span className="text-sm font-bold text-blue-800">0{index + 1}</span>
                                <h3 className="mt-3 text-lg font-bold text-slate-900">{check.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{check.text}</p>
                            </li>
                        ))}
                    </ol>
                    <aside className="mt-10 border-l-4 border-amber-500 bg-amber-50 p-6">
                        <h3 className="font-bold text-slate-900">Un certificado no resuelve toda la operación</h3>
                        <p className="mt-2 max-w-4xl leading-7 text-slate-700">No sustituye la clasificación, los permisos ni la evidencia de origen. Tampoco significa que todos los tributos desaparezcan. Antes de usar una regla o un formato de otro país, revisa la guía del acuerdo correspondiente.</p>
                    </aside>
                </Container>
            </section>

            <section id="guias" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
                <Container>
                    <h2 className="text-3xl font-bold text-slate-950">Elige el acuerdo y tu siguiente paso</h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-600">Si es tu primer acercamiento, empieza por “Entender”. Si ya tienes una compra o venta, ve a “Importar” o “Exportar” y después revisa el documento.</p>
                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                        {agreements.map((agreement) => (
                            <article key={agreement.name} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-800">{agreement.label} · 4 guías</p>
                                <h3 className="mt-3 text-2xl font-bold text-slate-950">{agreement.name}</h3>
                                <p className="mt-3 leading-7 text-slate-600">{agreement.introduction}</p>
                                <ol className="mt-7 divide-y divide-slate-200">
                                    {agreement.lessons.map((lesson) => (
                                        <li key={lesson.href} className="py-5 first:pt-0">
                                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{lesson.stage}</p>
                                            <Link href={lesson.href} className={`${linkStyle} font-semibold leading-7`}>{lesson.title}</Link>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.detail}</p>
                                        </li>
                                    ))}
                                </ol>
                                <a href={agreement.source} className={`${linkStyle} mt-4 inline-block text-sm`}>Consultar el acuerdo en MINCETUR</a>
                            </article>
                        ))}
                    </div>
                    <p className="mt-8 max-w-4xl text-sm leading-6 text-slate-600">Sobre China: a la fecha de revisión, MINCETUR presenta el protocolo de optimización como firmado y pendiente de entrada en vigor. No tratamos sus nuevas disposiciones como aplicables por el solo hecho de estar publicadas. <a href="https://acuerdoscomerciales.gob.pe/en_vigencia/China/Textos_Acuerdo.html" className={linkStyle}>Comprobar el estado oficial</a>.</p>
                </Container>
            </section>

            <section id="preparar" className="scroll-mt-28 py-16 md:py-20">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-950">Convierte la lectura en un expediente</h2>
                            <p className="mt-4 leading-7 text-slate-600">Antes de escribir al proveedor o a la entidad certificadora, prepara esta ficha. Si falta un dato, esa es tu próxima consulta: no lo reemplaces por una suposición.</p>
                            <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-slate-700">
                                <li>Producto, modelo, materiales y uso.</li>
                                <li>País de fabricación, productor y proveedor que factura.</li>
                                <li>Clasificación propuesta y sustento técnico.</li>
                                <li>Regla de origen identificada y documentos que la respaldan.</li>
                                <li>Ruta, transbordos, factura y fechas del embarque.</li>
                                <li>Responsable de emitir, revisar y presentar la prueba de origen.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-7 md:p-8">
                            <h3 className="text-xl font-bold text-slate-950">¿Buscas otro acuerdo?</h3>
                            <p className="mt-4 leading-7 text-slate-600">Ampliaremos esta biblioteca a los demás acuerdos del Perú. Por ahora, las guías desarrolladas aquí cubren China y Estados Unidos; no son instrucciones universales para otros destinos.</p>
                            <p className="mt-4 leading-7 text-slate-600">Mientras incorporamos cada colección, consulta el directorio oficial para identificar el texto, anexos y estado del acuerdo que necesitas.</p>
                            <a href="https://www.acuerdoscomerciales.gob.pe/" className={`${linkStyle} mt-5 inline-block font-semibold`}>Ver los acuerdos comerciales en MINCETUR</a>
                            <p className="mt-7 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-600">Para ordenar el resto de tu operación: <Link href="/comercio-exterior/documentos-aduaneros/" className={linkStyle}>documentos aduaneros</Link> y <Link href="/blog/certificado-origen-exportacion-peru/" className={linkStyle}>introducción al certificado de origen</Link>.</p>
                        </div>
                    </div>
                    <p className="mt-12 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">Contenido educativo, no garantía de aceptación aduanera. Los casos son orientativos y cada operación requiere contrastar la norma vigente y su evidencia. Si necesitas revisar un expediente concreto, puedes solicitar <Link href="/servicios/consultoria-aduanera/" className={linkStyle}>consultoría aduanera</Link>.</p>
                </Container>
            </section>
        </>
    );
}
