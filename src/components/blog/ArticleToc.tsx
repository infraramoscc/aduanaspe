'use client';

import { useEffect, useMemo, useState } from 'react';

interface ArticleHeading {
    id: string;
    label: string;
    level: 2 | 3;
}

interface ArticleTocProps {
    headings: ArticleHeading[];
    compact?: boolean;
}

function useActiveHeading(headings: ArticleHeading[]) {
    const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

    const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

    useEffect(() => {
        if (headingIds.length === 0) return;

        const elements = headingIds
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visibleEntries[0]?.target.id) {
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-25% 0px -60% 0px',
                threshold: [0, 1],
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [headingIds]);

    return [activeId, setActiveId] as const;
}

function TocLinks({
    headings,
    activeId,
    onNavigate,
}: {
    headings: ArticleHeading[];
    activeId: string;
    onNavigate?: (id: string) => void;
}) {
    return (
        <div className="space-y-1.5">
            {headings.map((heading) => {
                const isActive = activeId === heading.id;

                return (
                    <a
                        key={`${heading.id}-${heading.label}`}
                        href={`#${heading.id}`}
                        onClick={() => onNavigate?.(heading.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`block rounded-2xl border px-3 py-2.5 text-sm leading-6 transition-[border-color,background-color,color,padding] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 ${heading.level === 3 ? 'ml-3' : ''} ${isActive
                            ? 'border-slate-300 bg-slate-950 text-white'
                            : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950'
                            }`}
                    >
                        {heading.label}
                    </a>
                );
            })}
        </div>
    );
}

export function ArticleToc({ headings, compact = false }: ArticleTocProps) {
    const [activeId, setActiveId] = useActiveHeading(headings);

    if (headings.length <= 1) return null;

    if (compact) {
        return (
            <details className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                    Ir a una seccion
                </summary>
                <p className="mt-2 text-sm text-slate-500">
                    Usa este indice rapido para moverte por el articulo.
                </p>
                <div className="mt-4">
                    <TocLinks headings={headings} activeId={activeId} onNavigate={setActiveId} />
                </div>
            </details>
        );
    }

    return (
        <nav className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm" aria-label="En este articulo">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                En este articulo
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
                Sigue la estructura y vuelve a la seccion que necesitas sin perder el hilo.
            </p>
            <div className="mt-4">
                <TocLinks headings={headings} activeId={activeId} onNavigate={setActiveId} />
            </div>
        </nav>
    );
}
