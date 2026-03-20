'use client';

import { useEffect, useState } from 'react';
import { WhatsAppLink } from '@/components/tracking';

const STORAGE_KEY = 'aduanaspe-contact-nudge-dismissed';

function ContactNudge() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const dismissed = window.localStorage.getItem(STORAGE_KEY);
        if (dismissed === 'true') return;

        const timer = window.setTimeout(() => {
            setIsVisible(true);
        }, 1800);

        return () => window.clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, 'true');
        }
    };

    if (!isVisible) return null;

    return (
        <aside className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:right-5 md:bottom-5 md:w-[380px]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/96 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                <div className="bg-[linear-gradient(135deg,#172033_0%,#22314a_100%)] px-5 py-3 text-white">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                Riesgo Cero
                            </p>
                            <h3 className="mt-1 text-lg font-bold leading-tight">
                                Resuelve tus dudas antes de pagar
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={handleDismiss}
                            aria-label="Cerrar mensaje"
                            className="rounded-full border border-white/15 px-2.5 py-1 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="space-y-4 px-5 py-5">
                    <p className="text-sm leading-6 text-slate-600">
                        Te orientamos sobre requisitos, costos y documentos por WhatsApp, sin costo y sin compromiso.
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Asesoría sin costo</span>
                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">Sin compromiso</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">Respuesta rápida</span>
                    </div>

                    <WhatsAppLink
                        messageKey="asesoria_gratis"
                        variant="button"
                        className="w-full justify-center text-base"
                    >
                        Resolver mis dudas por WhatsApp
                    </WhatsAppLink>
                </div>
            </div>
        </aside>
    );
}

export { ContactNudge };
