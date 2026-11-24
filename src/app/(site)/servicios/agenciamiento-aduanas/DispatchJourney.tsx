'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout';
import styles from './DispatchJourney.module.css';

const scenes = [
    {
        id: 'documentos',
        label: 'Documentos',
        title: 'Antes de declarar',
        description: 'Contrastamos la factura, la lista de empaque y el documento de transporte. Con los datos del producto revisamos su partida y si requiere permisos.',
        takeaway: 'Ten a mano la descripción de tu mercancía y los documentos que ya tengas.',
        image: '/images/despacho/documentos.webp',
        alt: 'Una coordinadora compara dos documentos en una oficina frente al terminal portuario.',
    },
    {
        id: 'control',
        label: 'Despacho',
        title: 'Durante el despacho',
        description: 'Preparamos la Declaración Aduanera de Mercancías (DAM), calculamos los tributos y coordinamos el control que corresponda según el canal asignado por SUNAT.',
        takeaway: 'El canal asignado orienta el tipo de revisión que puede requerir tu carga.',
        image: '/images/despacho/control.webp',
        alt: 'Dos trabajadores consultan una tableta junto a un contenedor abierto con carga embalada.',
    },
    {
        id: 'retiro',
        label: 'Retiro',
        title: 'Coordinación del retiro',
        description: 'Confirmamos el estado del despacho, coordinamos con el almacén y dejamos lista la documentación final para organizar el retiro de la carga.',
        takeaway: 'Antes de programar el transporte, confirma el estado del despacho y la disponibilidad de la carga.',
        image: '/images/despacho/retiro.webp',
        alt: 'Un camión transporta un contenedor azul por la salida de un terminal portuario.',
    },
];

export function DispatchJourney() {
    const steps = useRef<HTMLOListElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>();

    useEffect(() => {
        const chapters = Array.from(steps.current?.children ?? []);
        let frame = 0;

        function updateChapter() {
            frame = 0;
            const activationLine = window.innerHeight * 0.52;
            let current = 0;

            for (const [index, chapter] of chapters.entries()) {
                if (chapter.getBoundingClientRect().top > activationLine) break;
                current = index;
            }

            setActiveIndex(current);
        }

        function scheduleUpdate() {
            if (!frame) frame = window.requestAnimationFrame(updateChapter);
        }

        scheduleUpdate();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);

        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            window.cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <section id="proceso" aria-labelledby="proceso-title" className="scroll-mt-24 bg-[#10172c] py-12 text-white sm:scroll-mt-36 sm:py-18">
            <Container>
                <header className="mb-8 max-w-2xl sm:mb-12">
                    <h2 id="proceso-title" className="font-extrabold">Sigue el recorrido de una carga</h2>
                    <p className="mt-3 text-lg leading-relaxed text-slate-300">
                        Desde la revisión de documentos hasta el retiro. Baja para ver qué ocurre en cada etapa.
                    </p>
                </header>

                <div className={styles.journey} data-ready={activeIndex !== undefined}>
                    <div className={styles.viewer}>
                        <div className={styles.frame} aria-hidden="true">
                            {scenes.map((scene, index) => (
                                <div key={scene.id} className={styles.slide} data-active={activeIndex === index} data-scene={scene.id}>
                                    <Image src={scene.image} alt="" fill sizes="(min-width: 1280px) 620px, 55vw" className="object-cover" />
                                </div>
                            ))}
                            <div className={styles.frameLabel}>
                                {String((activeIndex ?? 0) + 1).padStart(2, '0')}
                                <span className="text-slate-300"> / 03</span>
                            </div>
                        </div>
                        <nav aria-label="Etapas del despacho" className={styles.navigation}>
                            {scenes.map((scene, index) => (
                                <a key={scene.id} href={`#despacho-${scene.id}`} aria-current={activeIndex === index ? 'step' : undefined}>
                                    {scene.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <ol ref={steps} className={styles.steps}>
                        {scenes.map((scene, index) => (
                            <li key={scene.id} id={`despacho-${scene.id}`} className={styles.chapter} data-active={activeIndex === index}>
                                <div className={styles.inlineImage}>
                                    <Image src={scene.image} alt={scene.alt} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
                                </div>
                                <div className={styles.chapterText}>
                                    <p className="text-sm font-semibold text-cyan-200">Etapa {index + 1} de {scenes.length}</p>
                                    <h3 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{scene.title}</h3>
                                    <p className="mt-4 leading-relaxed text-slate-200">{scene.description}</p>
                                    <p className="mt-5 border-l-2 border-cyan-300 pl-4 text-sm leading-relaxed text-cyan-100">{scene.takeaway}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-9 border-t border-white/15 pt-6 sm:mt-12">
                    <a href="#cotizacion" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-200 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100">
                        Cotizar mi despacho <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </Container>
        </section>
    );
}
