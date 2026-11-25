import Image from 'next/image';
import Link from 'next/link';
import { RecommendedReading } from '@/components/blog';
import { Container } from '@/components/layout';
import { FaqJsonLd, type FAQItem } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

interface ServiceDetail {
    title: string;
    description: string;
}

export interface ServiceProfileContent {
    slug: string;
    name: string;
    description: string;
    heading: string;
    introduction: string;
    image: { src: string; alt: string };
    scope: ServiceDetail[];
    processTitle: string;
    process: (ServiceDetail & { update: string })[];
    options: { id: string; label: string; title: string; items: ServiceDetail[] };
    example: ServiceDetail & { panelClassName: string; steps: ServiceDetail[] };
    experience: ServiceDetail & { panel: ServiceDetail; panelClassName: string };
    faqs: FAQItem[];
    contact: { title: string; checklist: string[]; label: string; message: string; messageKey?: string };
    related: { href: string; label: string }[];
    reading?: string[];
}

const anchorClass = 'inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4';
const sectionClass = 'scroll-mt-24 py-12 sm:scroll-mt-36 sm:py-16';

export function ServiceProfile({ service }: { service: ServiceProfileContent }) {
    const url = `https://aduanaspe.com/servicios/${service.slug}/`;
    const breadcrumb = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: service.name, url },
    ]);

    return (
        <>
            <JsonLd json={generateServiceSchema({ name: service.name, description: service.description, url })} />
            <JsonLd json={breadcrumb} />
            <FaqJsonLd faqs={service.faqs} />

            <section aria-labelledby="servicio-title" className="bg-[#111a2e] text-white">
                <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_1.06fr] lg:gap-12">
                    <div>
                        <p className="mb-3 text-sm font-bold text-cyan-200">{service.name}</p>
                        <h1 id="servicio-title" className="text-[clamp(2.15rem,4.25vw,3.55rem)] leading-[1.05] font-extrabold tracking-tight text-balance">{service.heading}</h1>
                        <p className="mt-4 max-w-lg leading-relaxed text-slate-200 sm:text-lg">{service.introduction}</p>
                        <a href="#proceso" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-200 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100">
                            Ver cómo trabajamos <span aria-hidden="true">↓</span>
                        </a>
                        <nav aria-label="Contenido de la página" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cyan-100">
                            <a href="#alcance" className={anchorClass}>Qué incluye</a>
                            <a href={`#${service.options.id}`} className={anchorClass}>{service.options.label}</a>
                            <a href="#experiencia" className={anchorClass}>Experiencia</a>
                            <a href="#preguntas" className={anchorClass}>Preguntas</a>
                        </nav>
                    </div>
                    <figure>
                        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-800">
                            <Image
                                src={service.image.src}
                                alt={service.image.alt}
                                fill
                                preload
                                sizes="(min-width: 1280px) 550px, (min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-2 text-sm text-slate-300">Imagen ilustrativa.</figcaption>
                    </figure>
                </Container>
            </section>

            <section id="alcance" aria-labelledby="alcance-title" className={`${sectionClass} bg-white`}>
                <Container>
                    <h2 id="alcance-title" className="font-extrabold text-slate-950">Qué incluye el servicio</h2>
                    <dl className="mt-6 grid gap-4 md:grid-cols-3">
                        {service.scope.map((item) => (
                            <div key={item.title} className="rounded-xl border border-slate-200 bg-[#f8f7f3] p-5 sm:p-6">
                                <dt className="text-lg font-bold text-indigo-950">{item.title}</dt>
                                <dd className="mt-2 leading-relaxed text-slate-700">{item.description}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            <section id="proceso" aria-labelledby="proceso-title" className={`${sectionClass} bg-[#f8f7f3]`}>
                <Container className="grid items-start gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
                    <h2 id="proceso-title" className="font-extrabold text-slate-950 lg:sticky lg:top-36">{service.processTitle}</h2>
                    <ol className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                        {service.process.map((step, index) => (
                            <li key={step.title} className="grid gap-3 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
                                <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-950">{index + 1}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                                    <p className="mt-2 leading-relaxed text-slate-700">{step.description}</p>
                                    <p className="mt-3 border-l-2 border-indigo-300 pl-3 text-sm leading-relaxed text-slate-700">
                                        <strong className="text-indigo-950">Qué te informamos.</strong>{' '}{step.update}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <section id={service.options.id} aria-labelledby="opciones-title" className={`${sectionClass} bg-white`}>
                <Container>
                    <h2 id="opciones-title" className="font-extrabold text-slate-950">{service.options.title}</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {service.options.items.map((option) => (
                            <div key={option.title} className="rounded-xl border border-slate-200 bg-[#f8f7f3] p-5 sm:p-6">
                                <h3 className="text-lg font-bold text-slate-950">{option.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-700">{option.description}</p>
                            </div>
                        ))}
                    </div>
                    <aside aria-labelledby="ejemplo-title" className={`mt-7 overflow-hidden rounded-2xl ${service.example.panelClassName}`}>
                        <h3 id="ejemplo-title" className="text-xl font-bold text-cyan-100">{service.example.title}</h3>
                        <p className="mt-3 max-w-3xl leading-relaxed text-slate-100">{service.example.description}</p>
                        <dl className="mt-5 grid gap-5 md:grid-cols-3">
                            {service.example.steps.map((step) => (
                                <div key={step.title} className="border-t border-white/25 pt-3">
                                    <dt className="font-bold text-white">{step.title}</dt>
                                    <dd className="mt-1 text-sm leading-relaxed text-slate-200">{step.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </Container>
            </section>

            <section id="experiencia" aria-labelledby="experiencia-title" className={`${sectionClass} bg-[#f8f7f3]`}>
                <Container className="grid items-start gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                    <div>
                        <h2 id="experiencia-title" className="font-extrabold text-slate-950">{service.experience.title}</h2>
                        <p className="mt-4 leading-relaxed text-slate-700">{service.experience.description}</p>
                        <Link href={ROUTES.quienesSomos} className={`mt-3 ${anchorClass} text-indigo-900`}>
                            Conoce al equipo de AduanasPE <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                    <aside className={`overflow-hidden rounded-2xl ${service.experience.panelClassName}`}>
                        <h3 className="text-lg font-bold text-cyan-100">{service.experience.panel.title}</h3>
                        <p className="mt-2 leading-relaxed text-slate-100">{service.experience.panel.description}</p>
                    </aside>
                </Container>
            </section>

            <section id="preguntas" aria-labelledby="preguntas-title" className={`${sectionClass} bg-white`}>
                <Container className="grid gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
                    <h2 id="preguntas-title" className="font-extrabold text-slate-950">Preguntas frecuentes</h2>
                    <div className="grid gap-3">
                        {service.faqs.map((faq) => (
                            <details key={faq.question} className="group rounded-xl border border-slate-200 bg-[#f8f7f3]">
                                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:px-5 [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <span aria-hidden="true" className="shrink-0 text-xl text-indigo-800 group-open:rotate-45">+</span>
                                </summary>
                                <p className="px-4 pb-4 leading-relaxed text-slate-700 sm:px-5">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="cotizacion" aria-labelledby="consulta-title" className={`${sectionClass} bg-[#111a2e] text-white`}>
                <Container className="flex flex-wrap items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 id="consulta-title" className="font-extrabold">{service.contact.title}</h2>
                        <p className="mt-3 text-slate-200">Para empezar, cuéntanos lo que ya sabes de tu operación.</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-200 marker:text-cyan-200">
                            {service.contact.checklist.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <WhatsAppLink
                            route={`${service.slug}-cta`}
                            serviceName={service.slug}
                            messageKey={service.contact.messageKey}
                            customMessageBody={service.contact.message}
                            className="min-h-12 max-w-full hover:translate-y-0 focus-visible:outline-cyan-100 motion-reduce:transition-none [&>svg]:shrink-0"
                        >
                            {service.contact.label}
                        </WhatsAppLink>
                        <Link href={ROUTES.contacto} className={`${anchorClass} text-cyan-100`}>
                            Consultar por formulario <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </Container>
            </section>

            <nav aria-label="Servicios relacionados" className="border-b border-slate-200 bg-white">
                <Container className="flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm text-indigo-900">
                    {service.related.map((item) => (
                        <Link key={item.href} href={item.href} className={anchorClass}>{item.label} <span aria-hidden="true">↗</span></Link>
                    ))}
                </Container>
            </nav>

            {service.reading && (
                <RecommendedReading
                    title="Guías de AduanasPE para revisar tu caso"
                    subtitle="Consulta criterios, documentos y preguntas para preparar tu operación."
                    slugs={service.reading}
                />
            )}
        </>
    );
}
