/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { WhatsAppHero } from '@/components/sections/WhatsAppHero';
import { WhatsAppLink } from '@/components/tracking';

export const metadata: Metadata = {
    title: 'Primera Importación desde China | AduanasPE',
    description: 'Landing para nuevos importadores que buscan apoyo por WhatsApp para traer carga desde China con guía operativa y despacho aduanero.',
    robots: {
        index: false,
        follow: false,
    }
};

export default function PrimeraImportacionLanding() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Banner de Urgencia */}
            <div className="bg-amber-400 text-amber-950 px-4 py-2 text-center text-sm md:text-base font-bold flex items-center justify-center gap-2">
                <span className="animate-pulse">🔥</span> ÚLTIMO DÍA: Aprovecha uno de los 3 cupos de asesoría gratuita restantes esta semana.
            </div>

            {/* Header minimalista - Sin navegación */}
            <header className="bg-white border-b border-slate-200 py-4 top-0 z-50">
                <Container>
                    <div className="flex justify-between items-center">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-black text-indigo-900 tracking-tight">
                                AduanasPE<span className="text-green-500">.</span>
                            </span>
                        </Link>
                        {/* Pequeño CTA en el header por si hacen scroll */}
                        <WhatsAppLink
                            messageKey="ads_primera_importacion"
                            customNumber="51944785974"
                            variant="button"
                            className="text-sm px-4 py-2 hidden sm:flex"
                        >
                            Cotizar Ahora
                        </WhatsAppLink>
                    </div>
                </Container>
            </header>

            {/* Hero Principal 100% WhatsApp */}
            <WhatsAppHero
                title="Tu Primera Importación desde China, Sin Sorpresas en Aduanas."
                subtitle="Te acompañamos desde que compras en China hasta que la carga llega a la puerta de tu local. Asesoría GRATIS por WhatsApp."
                ctaText="👉 Cotizar mi importación por WhatsApp"
                messageKey="ads_primera_importacion"
                customNumber="51944785974"
                badges={['✨ Especialistas en PYMES', '🔒 Agentes Autorizados SUNAT']}
                features={[
                    { icon: '🚀', title: 'Cotización Rápida', desc: 'Respuesta en menos de 30 minutos vía WhatsApp.' },
                    { icon: '🛡️', title: 'Cero Multas', desc: 'Revisamos tu documentación antes de embarcar.' },
                    { icon: '📱', title: 'Tracking 24/7', desc: 'Te informamos el estado de tu carga en todo momento.' },
                ]}
            />

            {/* Cómo Funciona - 3 Pasos Simples */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Importar de China es fácil si vas de la mano de expertos
                        </h2>
                        <p className="text-lg text-slate-600">
                            Desde buscar el flete más económico en Asia hasta el papeleo de nacionalización. Nosotros nos encargamos de todo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Línea conectora (solo desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-indigo-100 -z-10" />

                        {[
                            { step: '01', title: 'Escríbenos', desc: 'Cuéntanos qué quieres importar de China y te asesoramos por WhatsApp.' },
                            { step: '02', title: 'Coordinamos', desc: 'Consolidamos tu carga (flete) y preparamos los trámites de aduana.' },
                            { step: '03', title: 'Recibes', desc: 'Tu mercancía llega segura a Perú y la entregamos en tu local.' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-indigo-50 shadow-xl mb-6 text-2xl font-black text-indigo-600">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Nueva Sección: Servicios Específicos */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Todo lo que necesitas en un solo Operador Logístico
                        </h2>
                        <p className="text-lg text-slate-600">
                            Ya sea que quieras importar marítimo o aéreo, te ofrecemos una solución integral para que no tengas que contratar múltiples agencias.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Agente de Carga */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-6">
                                🚢
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Agencia de Carga (Fletes)</h3>
                            <p className="text-slate-600 mb-6">
                                Trabajamos con las principales navieras para conseguirte las mejores tarifas. Fletes exclusivos (FCL) y compartidos (LCL) desde Ningbo, Shenzhen, Shanghai y más.
                            </p>
                            <WhatsAppLink
                                messageKey="ads_primera_importacion"
                                customNumber="51944785974"
                                variant="link"
                                className="font-semibold text-indigo-600"
                            >
                                Cotizar Flete →
                            </WhatsAppLink>
                        </div>

                        {/* Agencia de Aduanas */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-3xl mb-6">
                                🏢
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Agencia de Aduanas</h3>
                            <p className="text-slate-600 mb-6">
                                Nacionalizamos tu carga de forma rápida y evitamos retenciones en SUNAT. Revisamos permisos, subpartidas arancelarias y liquidación de impuestos.
                            </p>
                            <WhatsAppLink
                                messageKey="ads_primera_importacion"
                                customNumber="51944785974"
                                variant="link"
                                className="font-semibold text-indigo-600"
                            >
                                Cotizar Aduanas →
                            </WhatsAppLink>
                        </div>

                        {/* Asesoría y Consultoría */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-3xl mb-6">
                                💡
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Asesoría de Importación</h3>
                            <p className="text-slate-600 mb-6">
                                ¿Es tu primera vez importando de China? Te enseñamos cómo verificar proveedores, evaluar rentabilidad y cumplir con las regulaciones peruanas.
                            </p>
                            <WhatsAppLink
                                messageKey="ads_primera_importacion"
                                customNumber="51944785974"
                                variant="link"
                                className="font-semibold text-indigo-600"
                            >
                                Agendar Asesoría →
                            </WhatsAppLink>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Por qué elegirnos / Trust Section Ampliada */}
            <section className="py-20 bg-indigo-900 text-white">
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                ¿Por qué centralizar tus importaciones de China con nosotros?
                            </h2>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <div>
                                        <strong className="block text-lg mb-1">Cero Costos Ocultos</strong>
                                        <p className="text-indigo-200">Te cotizamos el flete y los gastos aduaneros desde el principio para que sepas tu costo real.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <div>
                                        <strong className="block text-lg mb-1">Agentes en Asia</strong>
                                        <p className="text-indigo-200">Nuestra red de agentes logísticos recolecta la mercadería directo de la fábrica de tu proveedor en China.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <div>
                                        <strong className="block text-lg mb-1">Evita Retenciones</strong>
                                        <p className="text-indigo-200">Analizamos los certificados (CE, FDA, DIGESA, etc.) requeridos ANTES de que embarques tu compra.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-10">
                                <WhatsAppLink
                                    messageKey="ads_primera_importacion"
                                    customNumber="51944785974"
                                    variant="button"
                                    className="text-lg px-8 py-4 shadow-lg hover:shadow-indigo-500/50"
                                >
                                    WhatsApp: Quiero empezar a importar
                                </WhatsAppLink>
                            </div>
                        </div>
                        <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-indigo-950 flex flex-col justify-center items-center border border-indigo-800 p-8 text-center">
                            {/* Gráfico Visual Simple de Beneficio */}
                            <div className="text-6xl mb-6">🤝</div>
                            <h3 className="text-2xl font-bold mb-4">Un Solo Responsable</h3>
                            <p className="text-indigo-200 text-lg">
                                En lugar de pelear con la naviera por un lado y con el agente de aduanas por el otro, consolida toda tu importación con AduanasPE. Nosotros nos hacemos cargo de que llegue seguro.
                            </p>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full opacity-20 blur-xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500 rounded-tr-full opacity-20 blur-xl"></div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Testimonios / Casos de Éxito */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Importadores que ya confiaron en nosotros
                        </h2>
                        <p className="text-lg text-slate-600">
                            No te arriesgues en tu primera importación. Mira lo que dicen quienes ya trabajan de la mano con AduanasPE.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
                            <div className="text-6xl absolute top-4 right-8 text-indigo-100 font-serif">"</div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-black text-indigo-700">
                                    CM
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Carlos Mendoza</h4>
                                    <p className="text-sm text-slate-500 font-medium">Importador de Tecnología</p>
                                </div>
                            </div>
                            <p className="text-slate-700 italic text-lg relative z-10">
                                "Tenía mucho miedo de que mi mercadería de China se quedara en aduanas porque no sabía qué permisos necesitaba. AduanasPE me revisó todo ANTES de pagarle al proveedor en China y la carga llegó impecable. 100% recomendados."
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
                            <div className="text-6xl absolute top-4 right-8 text-indigo-100 font-serif">"</div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-xl font-black text-green-700">
                                    AR
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Ana Ramírez</h4>
                                    <p className="text-sm text-slate-500 font-medium">Emprendedora Textil</p>
                                </div>
                            </div>
                            <p className="text-slate-700 italic text-lg relative z-10">
                                "Me cobraron exactamente lo que cotizaron al principio. Cero costos ocultos. Antes trabajaba con otra agencia que me sacaba recargos de almacén de la nada. Me quedo con AduanasPE definitivo, hacen todo fácil."
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Preguntas Frecuentes
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Necesito RUC 10 o 20 para empezar a importar?</h3>
                            <p className="text-slate-600">Puedes importar con DNI hasta 3 veces al año u optar por el RUC 10 con negocio / RUC 20 sin límite. Nosotros te asesoramos sobre qué opción te conviene más según el perfil de tu carga y tu negocio.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Ustedes me ayudan a verificar a mi proveedor en China?</h3>
                            <p className="text-slate-600">Sí. Como parte de nuestra asesoría para nuevos importadores, te guiamos validando los documentos y perfil de tu proveedor en plataformas como Alibaba, reduciendo significativamente los riesgos de estafa antes de que pagues.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Existe un monto o volumen mínimo para que me ayuden?</h3>
                            <p className="text-slate-600">Atendemos desde importadores PYME con cargas consolidadas o compartidas (LCL) hasta contenedores exclusivos (FCL). No hay un monto mínimo prohibitivo; nos adaptamos para crecer contigo.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Cuáles son los tiempos promedio desde China a Perú?</h3>
                            <p className="text-slate-600">Por vía aérea, una carga puede demorar de 7 a 10 días laborables. Por vía marítima, el tránsito es de aproximadamente 30 a 45 días. Evaluaremos juntos qué medio se ajusta mejor a tu presupuesto de flete.</p>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-slate-600 mb-4 font-medium">¿Tienes otra consulta en mente?</p>
                        <WhatsAppLink
                            messageKey="ads_primera_importacion"
                            customNumber="51944785974"
                            variant="button"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                        >
                            Pregúntanos por WhatsApp
                        </WhatsAppLink>
                    </div>
                </Container>
            </section>

            {/* Trust Section Simple */}
            <section className="py-12 bg-white border-t border-b border-slate-200">
                <Container>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Logos simulados de confianza */}
                        <div className="text-xl font-black text-slate-400">SUNAT</div>
                        <div className="text-xl font-black text-slate-400">BASC</div>
                        <div className="text-xl font-black text-slate-400">OEA</div>
                        <div className="text-xl font-black text-slate-400">Cámara de Comercio</div>
                    </div>
                </Container>
            </section>

            {/* Footer Minimalista */}
            <footer className="bg-white py-8 mt-auto">
                <Container>
                    <div className="text-center text-sm text-slate-500">
                        <p>© {new Date().getFullYear()} AduanasPE. Todos los derechos reservados.</p>
                        <p className="mt-2 text-xs">Agencia de Aduanas y Carga Internacional</p>
                    </div>
                </Container>
            </footer>
        </main>
    );
}
