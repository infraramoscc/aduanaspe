import React from 'react';
import { FaqJsonLd } from '../seo/FaqJsonLd';

interface FaqGroupProps {
    faqs: {
        question: string;
        answer: string;
    }[];
}

export function FaqGroup({ faqs }: FaqGroupProps) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="my-10">
            {/* 1. SEO Schema Oculto */}
            <FaqJsonLd faqs={faqs} />

            {/* 2. Visual UI para las notas del Blog */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm mt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="text-purple-600">❓</span> Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-50">
                            <h4 className="font-bold text-slate-800 text-lg mb-2">{faq.question}</h4>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
