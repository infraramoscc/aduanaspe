/**
 * Inline Lead Form Component
 * Captures leads directly from blog posts
 */

'use client';

import { useState } from 'react';
import { trackEvent } from '@/components/tracking/ga4';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface InlineLeadFormProps {
    service: string;
    topic: string;
    headline?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function InlineLeadForm({
    service,
    topic,
    headline = 'Quieres asesoria sin costo sobre este tema?',
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
            <div className="my-8 rounded-[28px] border border-emerald-200 bg-emerald-50 p-8 text-center" aria-live="polite">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Gracias. Te contactaremos pronto
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                    Un especialista revisara tu solicitud y se comunicara contigo dentro de las proximas 24 horas para darte una orientacion inicial sin costo.
                </p>
            </div>
        );
    }

    return (
        <div className="my-8 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-6 shadow-sm md:p-8">
            <div className="mb-6 text-center">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Asesoria sin costo
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-950">
                    {headline}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                    Dejanos tus datos y te responderemos con una orientacion inicial sin costo y sin compromiso segun tu operacion.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
                <Input
                    id="blog-inline-name"
                    type="text"
                    name="name"
                    label="Nombre completo"
                    placeholder="Ingresa tu nombre..."
                    autoComplete="name"
                    required
                />
                <Input
                    id="blog-inline-email"
                    type="email"
                    name="email"
                    label="Correo electronico"
                    placeholder="tu@email.com..."
                    autoComplete="email"
                    spellCheck={false}
                    required
                />
                <Input
                    id="blog-inline-phone"
                    type="tel"
                    name="phone"
                    label="Telefono"
                    placeholder="Opcional..."
                    autoComplete="tel"
                />

                <Button type="submit" disabled={status === 'loading'} className="w-full" showArrow>
                    {status === 'loading' ? 'Enviando...' : 'Solicitar asesoria sin costo'}
                </Button>

                {status === 'error' && (
                    <p className="text-center text-sm text-red-600" aria-live="polite">
                        Hubo un error. Intenta nuevamente.
                    </p>
                )}
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
                Tus datos se usan solo para responder tu consulta. No compartimos informacion con terceros.
            </p>
        </div>
    );
}
