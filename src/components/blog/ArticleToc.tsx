'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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

        const getReadingOffset = () => {
            const siteHeader = document.querySelector('header');
            const headerHeight = siteHeader instanceof HTMLElement ? siteHeader.offsetHeight : 108;
            return headerHeight + 24;
        };

        let ticking = false;

        const updateActiveHeading = () => {
            const readingPosition = window.scrollY + getReadingOffset();
            let currentId = elements[0]?.id ?? '';

            for (const element of elements) {
                const elementTop = element.offsetTop;

                if (elementTop <= readingPosition) {
                    currentId = element.id;
                    continue;
                }

                break;
            }

            setActiveId((previous) => (previous === currentId ? previous : currentId));
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateActiveHeading);
        };

        updateActiveHeading();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [headingIds]);

    return [activeId, setActiveId] as const;
}

export function ArticleToc({ headings, compact = false }: ArticleTocProps) {
    const [activeId, setActiveId] = useActiveHeading(headings);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

    if (headings.length <= 1) return null;

    useEffect(() => {
        if (compact) return;
        if (!scrollContainerRef.current || !activeLinkRef.current) return;

        const container = scrollContainerRef.current;
        const activeLink = activeLinkRef.current;
        const targetScrollTop = activeLink.offsetTop - (container.clientHeight / 2) + (activeLink.clientHeight / 2);

        container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth',
        });
    }, [activeId, compact]);

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
        <nav className="rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-6 shadow-none backdrop-blur-[2px]" aria-label="En este articulo">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                En este articulo
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
                Sigue la estructura y vuelve a la seccion que necesitas sin perder el hilo.
            </p>
            <div className="relative mt-4">
                <div
                    ref={scrollContainerRef}
                    className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    <TocLinks
                        headings={headings}
                        activeId={activeId}
                        onNavigate={setActiveId}
                        activeLinkRef={activeLinkRef}
                    />
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-[24px] bg-gradient-to-b from-slate-50 via-slate-50/90 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-[24px] bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent" />
            </div>
        </nav>
    );
}

function TocLinks({
    headings,
    activeId,
    onNavigate,
    activeLinkRef,
}: {
    headings: ArticleHeading[];
    activeId: string;
    onNavigate?: (id: string) => void;
    activeLinkRef?: React.RefObject<HTMLAnchorElement | null>;
}) {
    return (
        <div className="space-y-1.5">
            {headings.map((heading) => {
                const isActive = activeId === heading.id;

                return (
                    <a
                        key={`${heading.id}-${heading.label}`}
                        ref={isActive ? activeLinkRef : null}
                        href={`#${heading.id}`}
                        onClick={() => onNavigate?.(heading.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`block rounded-2xl border px-3 py-2.5 text-sm leading-6 transition-[border-color,background-color,color,padding,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 ${heading.level === 3 ? 'ml-3' : ''} ${isActive
                            ? 'border-amber-200 bg-amber-50 text-slate-950 shadow-[inset_3px_0_0_0_rgb(180,83,9)]'
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
