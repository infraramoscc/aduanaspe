'use client';

import { useState } from 'react';

interface ArticleShareActionsProps {
    articleUrl: string;
    title: string;
}

export function ArticleShareActions({ articleUrl, title }: ArticleShareActionsProps) {
    const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(articleUrl);
            setCopyState('success');
            window.setTimeout(() => setCopyState('idle'), 2500);
        } catch {
            setCopyState('error');
            window.setTimeout(() => setCopyState('idle'), 2500);
        }
    }

    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Compartir o guardar
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Comparte este articulo o copia el enlace para volver mas tarde.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        LinkedIn
                    </a>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${articleUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition-[border-color,background-color,color] hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4"
                    >
                        WhatsApp
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        X
                    </a>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        {copyState === 'success' ? 'Enlace copiado' : copyState === 'error' ? 'No se pudo copiar' : 'Copiar enlace'}
                    </button>
                </div>
            </div>
            <p className="mt-3 text-xs text-slate-500" aria-live="polite">
                {copyState === 'error' ? 'No pudimos copiar el enlace. Puedes usar una de las opciones de compartir.' : ' '}
            </p>
        </div>
    );
}
