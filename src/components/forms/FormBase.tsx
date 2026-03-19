'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormBaseProps {
    children: ReactNode;
    onSubmit: (data: FormData) => Promise<void>;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}

function FormBase({
    children,
    onSubmit,
    successMessage = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
    errorMessage = 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.',
    className,
}: FormBaseProps) {
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const formData = new FormData(e.currentTarget);
            await onSubmit(formData);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <Card className={cn('max-w-xl mx-auto', className)}>
                <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <svg
                            className="h-8 w-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-slate-900">¡Enviado!</h3>
                    <p className="text-slate-600">{successMessage}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn('max-w-xl mx-auto', className)}>
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {children}

                    {status === 'error' && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        variant="primary"
                        size="lg"
                        className="w-full"
                    >
                        {status === 'loading' ? (
                            <span className="inline-flex items-center gap-2">
                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Enviando...
                            </span>
                        ) : (
                            'Enviar solicitud'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export { FormBase, type FormBaseProps };
