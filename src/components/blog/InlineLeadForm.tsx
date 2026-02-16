/**
 * Inline Lead Form Component
 * Captures leads directly from blog posts
 */

'use client';

import { useState } from 'react';
import { trackEvent, GA4_EVENTS } from '@/components/tracking/ga4';

interface InlineLeadFormProps {
    service: string;
    topic: string;
    headline?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function InlineLeadForm({
    service,
    topic,
    headline = '¿Necesitas ayuda con este tema?',
}: InlineLeadFormProps) {
    const [status, setStatus] = useState<FormStatus>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: (formData.get('phone') as string) || '',
            service,
            topic,
            source: 'blog_inline_form',
        };

        try {
            const response = await fetch('/api/blog-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                trackEvent('generate_lead', {
                    lead_source: 'blog_inline_form',
                    service,
                    topic,
                });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="border-2 border-[var(--green)] bg-[var(--green-light)] rounded-2xl p-8 text-center my-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">
                    ¡Gracias! Te contactaremos pronto
                </h3>
                <p className="text-[var(--text-body)]">
                    Un especialista revisará tu solicitud y se comunicará contigo en las
                    próximas 24 horas.
                </p>
            </div>
        );
    }

    return (
        <div className="service-card service-pink my-8">
            <div className="text-center mb-6">
                <span className="section-badge">💬 Consulta Gratuita</span>
                <h3 className="text-2xl font-bold text-[var(--text-heading)] mt-4">
                    {headline}
                </h3>
                <p className="text-[var(--text-body)] mt-2">
                    Déjanos tus datos y un especialista te contactará en menos de 24 horas
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[var(--purple-light)] outline-none transition-all"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[var(--purple-light)] outline-none transition-all"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono (opcional)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[var(--purple-light)] outline-none transition-all"
                />

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Enviando...' : 'Solicitar Consulta Gratuita →'}
                </button>

                {status === 'error' && (
                    <p className="text-sm text-[var(--coral)] text-center">
                        Hubo un error. Intenta nuevamente.
                    </p>
                )}
            </form>

            <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                🔒 Tus datos están protegidos. No compartimos información con terceros.
            </p>
        </div>
    );
}
