/**
 * Inline Lead Form Component
 * Captures leads directly from blog posts
 */

'use client';

import { useRef, useState } from 'react';
import { trackEvent } from '@/components/tracking/ga4';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface InlineLeadFormProps {
    service: string;
    topic: string;
    headline?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type FormErrors = {
    name?: string;
    email?: string;
    phone?: string;
};

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function InlineLeadForm({
    service,
    topic,
    headline = 'Quieres asesoria sin costo sobre este tema?',
}: InlineLeadFormProps) {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errors, setErrors] = useState<FormErrors>({});
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    function focusFirstError(nextErrors: FormErrors) {
        if (nextErrors.name) {
            nameRef.current?.focus();
            return;
        }

        if (nextErrors.email) {
            emailRef.current?.focus();
            return;
        }

        if (nextErrors.phone) {
            phoneRef.current?.focus();
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const phone = String(formData.get('phone') ?? '').trim();

        const nextErrors: FormErrors = {};

        if (!name) nextErrors.name = 'Ingresa tu nombre completo.';
        if (!email) {
            nextErrors.email = 'Ingresa tu correo electronico.';
        } else if (!isValidEmail(email)) {
            nextErrors.email = 'Usa un correo valido.';
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatus('error');
            focusFirstError(nextErrors);
            return;
        }

        setErrors({});
        setStatus('loading');

        const data = {
            name,
            email,
            phone,
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
        <div className="my-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 max-w-2xl">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Asesoria sin costo
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-950">
                    {headline}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                    Dejanos tus datos y te responderemos con una orientacion inicial sin costo y sin compromiso, segun tu operacion.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4" noValidate>
                <Input
                    ref={nameRef}
                    id="blog-inline-name"
                    type="text"
                    name="name"
                    label="Nombre completo"
                    placeholder="Ingresa tu nombre..."
                    autoComplete="name"
                    error={errors.name}
                    required
                />
                <Input
                    ref={emailRef}
                    id="blog-inline-email"
                    type="email"
                    name="email"
                    label="Correo electronico"
                    placeholder="tu@email.com..."
                    autoComplete="email"
                    spellCheck={false}
                    error={errors.email}
                    required
                />
                <Input
                    ref={phoneRef}
                    id="blog-inline-phone"
                    type="tel"
                    name="phone"
                    label="Telefono"
                    placeholder="Opcional..."
                    autoComplete="tel"
                    error={errors.phone}
                />

                <Button type="submit" disabled={status === 'loading'} className="w-full md:w-auto" showArrow>
                    {status === 'loading' ? 'Enviando...' : 'Solicitar asesoria sin costo'}
                </Button>

                {status === 'error' && !errors.name && !errors.email && !errors.phone && (
                    <p className="text-sm text-red-600" aria-live="polite">
                        Hubo un error al enviar tus datos. Intenta nuevamente en unos minutos o escribenos por WhatsApp.
                    </p>
                )}
            </form>

            <p className="mt-4 text-xs text-slate-500">
                Tus datos se usan solo para responder tu consulta. No compartimos informacion con terceros.
            </p>
        </div>
    );
}
