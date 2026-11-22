'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import {
    clarityId, getAnalyticsPreference, setAnalyticsPreference, subscribeToAnalyticsPreference,
} from './analyticsConsent';
import { startAnalyticsVendors, stopAnalyticsVendors } from './analyticsVendors';
import { capturePostHogPage, revokePostHog } from './posthog';

const getServerPreference = () => undefined;

export function AnalyticsPreferences() {
    const preference = useSyncExternalStore(subscribeToAnalyticsPreference, getAnalyticsPreference, getServerPreference);
    const pathname = usePathname();
    const [editing, setEditing] = useState(false);
    const preferencesButton = useRef<HTMLButtonElement>(null);
    const wasAccepted = useRef(false);

    useEffect(() => {
        if (preference === 'accepted') startAnalyticsVendors();
        else if (wasAccepted.current || preference === 'rejected') {
            revokePostHog();
            stopAnalyticsVendors();
        }
        wasAccepted.current = preference === 'accepted';
    }, [preference]);

    useEffect(() => {
        if (preference === 'accepted' && pathname) capturePostHogPage(pathname);
    }, [preference, pathname]);

    if (preference === undefined) return null;

    function save(value: 'accepted' | 'rejected') {
        setAnalyticsPreference(value);
        if (editing) preferencesButton.current?.focus();
        setEditing(false);
    }

    const showPanel = editing || preference === null;

    return (
        <div className="bg-slate-950 px-4 py-3 text-center text-slate-300">
            <button
                ref={preferencesButton}
                type="button"
                aria-expanded={showPanel}
                onClick={() => setEditing(true)}
                className="min-h-11 rounded-lg px-3 text-sm underline underline-offset-4 hover:text-white"
            >
                Preferencias de analítica
            </button>
            {showPanel && (
                <section
                    aria-label="Preferencias de analítica"
                    className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-slate-200 bg-white p-5 text-left text-slate-900 shadow-xl sm:right-auto sm:w-[25rem]"
                >
                    <h2 className="font-semibold">Preferencias de analítica</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                        {clarityId
                            ? 'Con tu permiso, medimos visitas y clics y grabamos cómo se usa el sitio para detectar dificultades de navegación.'
                            : 'Con tu permiso, medimos visitas y clics para detectar dificultades de navegación.'}
                        {' Puedes cambiar tu decisión desde el pie de página.'}
                    </p>
                    {clarityId && preference === 'accepted' && (
                        <p className="mt-2 text-sm text-slate-700">
                            Si retiras el permiso, la página se recargará para detener la grabación.
                        </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <button type="button" onClick={() => save('accepted')} className="min-h-11 rounded-lg border border-slate-700 px-4 text-sm font-semibold hover:bg-slate-100">
                            Aceptar
                        </button>
                        <button type="button" onClick={() => save('rejected')} className="min-h-11 rounded-lg border border-slate-700 px-4 text-sm font-semibold hover:bg-slate-100">
                            Rechazar
                        </button>
                        {editing && preference !== null && (
                            <button type="button" onClick={() => { setEditing(false); preferencesButton.current?.focus(); }} className="min-h-11 px-3 text-sm underline">
                                Cerrar
                            </button>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
