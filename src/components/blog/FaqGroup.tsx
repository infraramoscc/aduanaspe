import React from 'react';
import { FaqJsonLd } from '../seo/FaqJsonLd';

interface FaqGroupProps {
    faqs?: {
        question: string;
        answer: string;
    }[];
    json?: string;
}

export function FaqGroup({ faqs, json }: FaqGroupProps) {
    let parsedFaqs = faqs;

    if (json) {
        try {
            parsedFaqs = JSON.parse(json);
        } catch (e) {
            console.error('Error parsing FaqGroup json prop:', e);
        }
    }

    if (!parsedFaqs || parsedFaqs.length === 0) {
        return null;
    }

    return (
        <section className="my-10" aria-label="Preguntas frecuentes">
            <FaqJsonLd faqs={parsedFaqs} />

            <div className="service-card service-card-roomy service-cyan mt-8">
                <div className="space-y-3">
                    {parsedFaqs.map((faq, index) => (
                        <details
                            key={index}
                            className="service-card service-card-compact service-blue group"
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                                <span className="text-base font-bold leading-7 text-slate-900">
                                    {faq.question}
                                </span>
                                <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="pt-4 text-sm leading-7 text-slate-600">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
