'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import { Card, CardContent } from '@/components/ui';
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
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Enviado!</h3>
                    <p className="text-gray-600">{successMessage}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn('max-w-xl mx-auto', className)}>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {children}

                    {status === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={cn(
                            'w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-200',
                            'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700',
                            'disabled:from-violet-400 disabled:to-fuchsia-400 disabled:cursor-not-allowed',
                            'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                            'shadow-md hover:shadow-lg hover:shadow-violet-500/25'
                        )}
                    >
                        {status === 'loading' ? (
                            <span className="inline-flex items-center gap-2">
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
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
                            'Enviar'
                        )}
                    </button>
                </form>
            </CardContent>
        </Card>
    );
}

export { FormBase, type FormBaseProps };
