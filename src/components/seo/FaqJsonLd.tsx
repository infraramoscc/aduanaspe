import React from 'react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FaqJsonLdProps {
    faqs: FAQItem[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
    if (!faqs || faqs.length === 0) return null;

    const normalizedFaqs = faqs
        .map((faq) => ({
            question: faq.question.trim().replace(/\s+/g, ' '),
            answer: faq.answer.trim().replace(/\s+/g, ' '),
        }))
        .filter((faq) => faq.question.length > 0 && faq.answer.length > 0);

    if (normalizedFaqs.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": normalizedFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
