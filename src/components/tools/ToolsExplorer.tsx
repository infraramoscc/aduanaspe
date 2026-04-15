'use client';

import { useState } from 'react';
import { toolCategories, toolPreviews, type ToolCategory, type ToolCategorySlug } from '@/content/tools';
import { GA4_EVENTS, TrackedLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ToolGlyph } from './ToolGlyph';

type CategoryFilter = 'todos' | ToolCategorySlug;

const accentClasses: Record<
    ToolCategory['accent'],
    {
        pill: string;
        subtlePill: string;
        link: string;
        glow: string;
        orb: string;
        panel: string;
        border: string;
        topLine: string;
        title: string;
    }
> = {
    indigo: {
        pill: 'bg-[#ecebff] text-[#3c3794] ring-1 ring-[rgba(60,55,148,0.14)]',
        subtlePill: 'bg-[#f1f0ff] text-[#3c3794]',
        link: 'text-[#3c3794] hover:text-[#2f2b77]',
        glow: 'group-hover:shadow-[0_26px_56px_rgba(60,55,148,0.16)]',
        orb: 'bg-[radial-gradient(circle,rgba(60,55,148,0.3)_0%,rgba(60,55,148,0.08)_42%,transparent_76%)]',
        panel: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(245,244,255,0.86)_100%)]',
        border: 'border-[rgba(60,55,148,0.1)]',
        topLine: 'from-[#4d46b8] via-[#3c3794] to-[#736de0]',
        title: 'text-[#3c3794]',
    },
    cyan: {
        pill: 'bg-[rgba(224,249,255,0.96)] text-[#0b5f82] ring-1 ring-[rgba(0,212,255,0.18)]',
        subtlePill: 'bg-[rgba(232,250,255,0.92)] text-[#0b5f82]',
        link: 'text-[#0b5f82] hover:text-[#084d69]',
        glow: 'group-hover:shadow-[0_26px_56px_rgba(0,212,255,0.16)]',
        orb: 'bg-[radial-gradient(circle,rgba(0,212,255,0.34)_0%,rgba(0,212,255,0.1)_42%,transparent_76%)]',
        panel: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(234,250,255,0.86)_100%)]',
        border: 'border-[rgba(0,212,255,0.14)]',
        topLine: 'from-[#00D4FF] via-[#00B8E0] to-[#65e7ff]',
        title: 'text-[#0b5f82]',
    },
    coral: {
        pill: 'bg-[rgba(255,228,228,0.96)] text-[#cf5858] ring-1 ring-[rgba(255,107,107,0.18)]',
        subtlePill: 'bg-[rgba(255,239,239,0.92)] text-[#cf5858]',
        link: 'text-[#cf5858] hover:text-[#b54848]',
        glow: 'group-hover:shadow-[0_26px_56px_rgba(255,107,107,0.16)]',
        orb: 'bg-[radial-gradient(circle,rgba(255,107,107,0.34)_0%,rgba(255,159,140,0.1)_42%,transparent_76%)]',
        panel: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,241,241,0.86)_100%)]',
        border: 'border-[rgba(255,107,107,0.14)]',
        topLine: 'from-[#FF8B7A] via-[#FF6B6B] to-[#ffa89a]',
        title: 'text-[#cf5858]',
    },
};

const toolButtonClass =
    'inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#3c3794] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(60,55,148,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#2f2b77]';

const whatsAppButtonClass =
    'inline-flex items-center justify-center rounded-full bg-[#10aa6b] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,245,160,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0d8f5a]';

function getBadgeClass(badge?: string) {
    if (!badge) {
        return '';
    }

    if (/alta demanda/i.test(badge)) {
        return 'bg-[#fdecec] text-[#b42318] ring-1 ring-[rgba(180,35,24,0.14)]';
    }

    return 'bg-[rgba(255,228,228,0.96)] text-[#cf5858] ring-1 ring-[rgba(255,107,107,0.18)]';
}

function getStatusClass(status: string) {
    if (/curacion/i.test(status)) {
        return 'bg-[#fdecec] text-[#b42318] ring-1 ring-[rgba(180,35,24,0.14)]';
    }

    if (/diseno/i.test(status)) {
        return 'bg-[rgba(255,241,241,0.96)] text-[#cf5858] ring-1 ring-[rgba(255,107,107,0.14)]';
    }

    if (/release|listo/i.test(status)) {
        return 'bg-[rgba(224,249,255,0.96)] text-[#0b5f82] ring-1 ring-[rgba(0,212,255,0.16)]';
    }

    return 'bg-[#f7f7f9] text-slate-600 ring-1 ring-[rgba(23,32,51,0.06)]';
}

function ToolsExplorer() {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');

    const normalizedQuery = query.trim().toLowerCase();
    const activeCategoryConfig =
        activeCategory === 'todos' ? null : toolCategories.find((category) => category.slug === activeCategory) ?? null;

    const filteredTools = toolPreviews.filter((tool) => {
        const matchesCategory = activeCategory === 'todos' || tool.category === activeCategory;
        if (!matchesCategory) {
            return false;
        }

        if (!normalizedQuery) {
            return true;
        }

        const haystack = [
            tool.title,
            tool.summary,
            tool.tradeFlow,
            tool.idealFor,
            tool.whenToUse,
            tool.statusLabel,
            tool.badge || '',
            ...tool.outputs,
            ...tool.searchTerms,
        ]
            .join(' ')
            .toLowerCase();

        return haystack.includes(normalizedQuery);
    });

    const visibleFeatured = filteredTools.filter((tool) => tool.featured).slice(0, 3);

    return (
        <section id="catalogo-herramientas" className="bg-[#f8f6f1] py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="glass rounded-[30px] border border-[rgba(23,32,51,0.08)] bg-[rgba(255,255,255,0.76)] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:p-6">
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className="section-badge bg-white/82">Catalogo</span>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Busca, filtra y entra a la herramienta que mas te sirva.
                            </h2>
                        </div>

                        <label className="glass group flex items-center gap-3 rounded-[24px] border border-[rgba(23,32,51,0.08)] bg-white/86 px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.04)] transition-all focus-within:border-[rgba(60,55,148,0.22)] focus-within:shadow-[0_18px_34px_rgba(60,55,148,0.12)]">
                            <svg className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#3c3794]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="11" cy="11" r="6" />
                                <path d="m20 20-3.5-3.5" />
                            </svg>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Busca tributos, fletes, partidas o documentos"
                                className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                                aria-label="Buscar herramienta o necesidad operativa"
                            />
                        </label>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setActiveCategory('todos')}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                                    activeCategory === 'todos'
                                        ? 'bg-[#3c3794] text-white shadow-[0_14px_28px_rgba(60,55,148,0.22)]'
                                        : 'glass bg-white/78 text-slate-700 ring-1 ring-[rgba(23,32,51,0.08)] hover:border-[rgba(60,55,148,0.18)] hover:text-slate-950'
                                )}
                            >
                                Todos
                            </button>
                            {toolCategories.map((category) => {
                                const accent = accentClasses[category.accent];

                                return (
                                    <button
                                        key={category.slug}
                                        type="button"
                                        onClick={() => setActiveCategory(category.slug)}
                                        className={cn(
                                            'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                                            activeCategory === category.slug
                                                ? `${accent.pill} shadow-[0_12px_26px_rgba(15,23,42,0.08)]`
                                                : 'glass bg-white/78 text-slate-700 ring-1 ring-[rgba(23,32,51,0.08)] hover:text-slate-950'
                                        )}
                                    >
                                        {category.label}
                                    </button>
                                );
                            })}
                        </div>

                        {activeCategoryConfig && (
                            <div className={cn('glass rounded-[22px] border px-4 py-3 text-sm leading-7', accentClasses[activeCategoryConfig.accent].border, accentClasses[activeCategoryConfig.accent].panel)}>
                                <span className="font-semibold text-slate-950">{activeCategoryConfig.eyebrow}. </span>
                                <span className="text-slate-600">{activeCategoryConfig.description}</span>
                            </div>
                        )}
                    </div>
                </div>

                {visibleFeatured.length > 0 && (
                    <div className="mt-12">
                        <div className="mb-6">
                            <span className="section-badge bg-white/82">Destacadas</span>
                            <h3 className="text-2xl font-bold text-slate-950 md:text-3xl">Accesos rapidos</h3>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-3">
                            {visibleFeatured.map((tool) => {
                                const category = toolCategories.find((item) => item.slug === tool.category)!;
                                const accent = accentClasses[category.accent];

                                return (
                                    <article
                                        key={tool.slug}
                                        className={cn(
                                            'group relative overflow-hidden rounded-[28px] border bg-white/92 p-6 transition-all duration-300 hover:-translate-y-1',
                                            accent.border,
                                            accent.glow
                                        )}
                                    >
                                        <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', accent.topLine)} />
                                        <div className={cn('pointer-events-none absolute left-6 right-6 bottom-0 h-24 translate-y-10 blur-3xl opacity-0 transition-opacity duration-300', accent.orb, 'group-hover:opacity-100')} />

                                        <div className="relative z-10 flex items-start justify-between gap-4">
                                            <ToolGlyph icon={tool.icon} accent={category.accent} />
                                            <div className="flex flex-wrap justify-end gap-2">
                                                <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', accent.pill)}>
                                                    {tool.tradeFlow}
                                                </span>
                                                {tool.badge && (
                                                    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', getBadgeClass(tool.badge))}>
                                                        {tool.badge}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h4 className={cn('mt-5 text-xl font-semibold text-slate-950 transition-colors', tool.badge ? accent.title : '')}>{tool.title}</h4>
                                            <p className="mt-3 text-sm leading-7 text-slate-600">{tool.summary}</p>

                                            <div className="mt-5 space-y-3 rounded-[22px] bg-[#fcfcfd] p-4 ring-1 ring-[rgba(23,32,51,0.05)]">
                                                <div>
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Ideal para</p>
                                                    <p className="mt-1 text-sm leading-6 text-slate-700">{tool.idealFor}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Cuando usarla</p>
                                                    <p className="mt-1 text-sm leading-6 text-slate-700">{tool.whenToUse}</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                                <TrackedLink
                                                    href={`/herramientas/${tool.slug}`}
                                                    eventName={GA4_EVENTS.NAV_CLICK}
                                                    eventParams={{ location: 'tools_featured_card', label: tool.slug }}
                                                    className={toolButtonClass}
                                                >
                                                    Ver herramienta
                                                </TrackedLink>
                                                <TrackedLink
                                                    href={tool.relatedHref}
                                                    eventName={GA4_EVENTS.NAV_CLICK}
                                                    eventParams={{ location: 'tools_featured_related', label: tool.relatedHref }}
                                                    className={cn('text-sm font-semibold transition-colors', accent.link)}
                                                >
                                                    {tool.relatedLabel}
                                                </TrackedLink>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mt-14 space-y-12">
                    {toolCategories.map((category) => {
                        const categoryTools = filteredTools.filter((tool) => tool.category === category.slug);

                        if (!categoryTools.length) {
                            return null;
                        }

                        const accent = accentClasses[category.accent];

                        return (
                            <section key={category.slug} className="space-y-6">
                                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1', accent.pill)}>
                                            {category.label}
                                        </span>
                                        <p className="mt-3 text-sm font-semibold text-slate-950">{category.eyebrow}</p>
                                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                    {categoryTools.map((tool) => (
                                        <article
                                            key={tool.slug}
                                            className={cn(
                                                'group relative overflow-hidden rounded-[26px] border bg-white/92 p-6 transition-all duration-300 hover:-translate-y-1',
                                                accent.border,
                                                accent.glow
                                            )}
                                        >
                                            <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100', accent.topLine)} />
                                            <div className={cn('pointer-events-none absolute left-6 right-6 bottom-0 h-20 translate-y-8 blur-3xl opacity-0 transition-opacity duration-300', accent.orb, 'group-hover:opacity-100')} />

                                            <div className="relative z-10 flex items-start justify-between gap-4">
                                                <ToolGlyph icon={tool.icon} accent={category.accent} />
                                                <div className="flex flex-wrap justify-end gap-2">
                                                    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', accent.subtlePill)}>
                                                        {tool.tradeFlow}
                                                    </span>
                                                    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', getStatusClass(tool.statusLabel))}>
                                                        {tool.statusLabel}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="relative z-10">
                                                <h4 className="mt-5 text-xl font-semibold text-slate-950">{tool.title}</h4>
                                                <p className="mt-3 text-sm leading-7 text-slate-600">{tool.summary}</p>

                                                <div className="mt-5 space-y-3 border-t border-[rgba(23,32,51,0.08)] pt-4">
                                                    <div>
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Ideal para</p>
                                                        <p className="mt-1 text-sm leading-6 text-slate-700">{tool.idealFor}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Cuando usarla</p>
                                                        <p className="mt-1 text-sm leading-6 text-slate-700">{tool.whenToUse}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-wrap items-center gap-4">
                                                    <TrackedLink
                                                        href={`/herramientas/${tool.slug}`}
                                                        eventName={GA4_EVENTS.NAV_CLICK}
                                                        eventParams={{ location: 'tools_grid_card', label: tool.slug }}
                                                        className={toolButtonClass}
                                                    >
                                                        Ver herramienta
                                                    </TrackedLink>
                                                    <TrackedLink
                                                        href={tool.relatedHref}
                                                        eventName={GA4_EVENTS.NAV_CLICK}
                                                        eventParams={{ location: 'tools_grid_related', label: tool.relatedHref }}
                                                        className={cn('text-sm font-semibold transition-colors', accent.link)}
                                                    >
                                                        Relacionado
                                                    </TrackedLink>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {!filteredTools.length && (
                    <div className="glass mt-12 rounded-[28px] border border-dashed border-[rgba(60,55,148,0.18)] bg-white/82 px-6 py-12 text-center shadow-[0_16px_34px_rgba(15,23,42,0.04)]">
                        <p className="text-lg font-semibold text-slate-900">No encontramos una coincidencia exacta.</p>
                        <p className="mt-3 text-slate-600">
                            Si haces esta consulta con frecuencia, cuentanosla y la priorizamos dentro del centro.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <TrackedLink
                                href={ROUTES.contacto}
                                eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                                eventParams={{ location: 'tools_no_results' }}
                                className="inline-flex items-center justify-center rounded-full bg-[#FF6B6B] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(255,107,107,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-[#e85a5a]"
                            >
                                Solicitar una herramienta
                            </TrackedLink>
                            <TrackedLink
                                href={ROUTES.contacto}
                                eventName={GA4_EVENTS.CLICK_CTA_TO_CONTACTO}
                                eventParams={{ location: 'tools_no_results_human' }}
                                className={whatsAppButtonClass}
                            >
                                Hablar con un especialista
                            </TrackedLink>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export { ToolsExplorer };
