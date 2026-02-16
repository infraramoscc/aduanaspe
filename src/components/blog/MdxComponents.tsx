/**
 * MDX Custom Components
 * Custom rendering for MDX elements with premium styling
 * These components are automatically mapped to HTML elements in MDX
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

/* --------------------------------------------------
 * Typography Components
 * -------------------------------------------------- */

function H1({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-heading)] leading-tight mb-6">
            {children}
        </h1>
    );
}

function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] mt-12 mb-4 scroll-mt-24">
            {children}
        </h2>
    );
}

function H3({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-heading)] mt-8 mb-3 scroll-mt-24">
            {children}
        </h3>
    );
}

function H4({ children }: { children: ReactNode }) {
    return (
        <h4 className="text-lg font-semibold text-[var(--text-heading)] mt-6 mb-2">
            {children}
        </h4>
    );
}

function P({ children }: { children: ReactNode }) {
    return (
        <p className="text-[var(--text-body)] leading-relaxed mb-4 text-base md:text-lg">
            {children}
        </p>
    );
}

/* --------------------------------------------------
 * Inline Elements
 * -------------------------------------------------- */

function A({ href, children }: { href?: string; children: ReactNode }) {
    const isInternal = href?.startsWith('/');

    if (isInternal && href) {
        return (
            <Link href={href} className="service-link">
                {children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--purple)] font-medium underline decoration-purple-200 underline-offset-2 hover:decoration-[var(--purple)] transition-colors"
        >
            {children}
        </a>
    );
}

function Strong({ children }: { children: ReactNode }) {
    return <strong className="font-bold text-[var(--text-heading)]">{children}</strong>;
}

/* --------------------------------------------------
 * Block Elements
 * -------------------------------------------------- */

function Blockquote({ children }: { children: ReactNode }) {
    return (
        <blockquote className="border-l-4 border-[var(--purple)] bg-[var(--purple-light)] pl-6 pr-4 py-4 my-6 rounded-r-xl text-[var(--text-body)] italic">
            {children}
        </blockquote>
    );
}

function UL({ children }: { children: ReactNode }) {
    return (
        <ul className="list-disc list-inside space-y-2 mb-6 text-[var(--text-body)] ml-4">
            {children}
        </ul>
    );
}

function OL({ children }: { children: ReactNode }) {
    return (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-[var(--text-body)] ml-4">
            {children}
        </ol>
    );
}

function LI({ children }: { children: ReactNode }) {
    return <li className="leading-relaxed">{children}</li>;
}

function HR() {
    return <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />;
}

/* --------------------------------------------------
 * Code
 * -------------------------------------------------- */

function Pre({ children }: { children: ReactNode }) {
    return (
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-6 overflow-x-auto my-6 text-sm leading-relaxed border border-slate-700">
            {children}
        </pre>
    );
}

function Code({ children }: { children: ReactNode }) {
    return (
        <code className="bg-[var(--purple-light)] text-[var(--purple)] px-1.5 py-0.5 rounded-md text-sm font-mono">
            {children}
        </code>
    );
}

/* --------------------------------------------------
 * Table
 * -------------------------------------------------- */

function Table({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">{children}</table>
        </div>
    );
}

function THead({ children }: { children: ReactNode }) {
    return <thead className="bg-[var(--purple-light)] text-[var(--purple)] uppercase text-xs font-semibold">{children}</thead>;
}

function TH({ children }: { children: ReactNode }) {
    return <th className="px-4 py-3">{children}</th>;
}

function TD({ children }: { children: ReactNode }) {
    return <td className="px-4 py-3 border-t border-gray-100">{children}</td>;
}

function TR({ children }: { children: ReactNode }) {
    return <tr className="hover:bg-gray-50 transition-colors">{children}</tr>;
}

/* --------------------------------------------------
 * Image
 * -------------------------------------------------- */

function Img({ src, alt }: { src?: string; alt?: string }) {
    return (
        <figure className="my-8">
            <img
                src={src}
                alt={alt ?? ''}
                className="w-full rounded-xl shadow-md"
                loading="lazy"
            />
            {alt && (
                <figcaption className="text-center text-sm text-[var(--text-muted)] mt-3 italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

/* --------------------------------------------------
 * Custom Components for MDX authors
 * -------------------------------------------------- */

interface CalloutProps {
    type?: 'info' | 'warning' | 'tip' | 'danger';
    title?: string;
    children: ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
    const styles = {
        info: { bg: 'bg-[var(--blue-light)]', border: 'border-[var(--blue)]', icon: 'ℹ️' },
        warning: { bg: 'bg-[var(--yellow-light)]', border: 'border-[var(--yellow-dark)]', icon: '⚠️' },
        tip: { bg: 'bg-[var(--green-light)]', border: 'border-[var(--green)]', icon: '💡' },
        danger: { bg: 'bg-[var(--coral-light)]', border: 'border-[var(--coral)]', icon: '🚨' },
    };

    const style = styles[type];

    return (
        <div className={`${style.bg} border-l-4 ${style.border} rounded-r-xl p-5 my-6`}>
            <div className="font-bold text-[var(--text-heading)] mb-1">
                {style.icon} {title ?? type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="text-[var(--text-body)] text-sm">{children}</div>
        </div>
    );
}

/* --------------------------------------------------
 * SmartLink - Internal linking with tracking
 * -------------------------------------------------- */

interface SmartLinkProps {
    to: 'servicio' | 'comercio-exterior' | 'blog';
    slug: string;
    children: ReactNode;
}

export function SmartLink({ to, slug, children }: SmartLinkProps) {
    const paths = {
        servicio: `/servicios/${slug}`,
        'comercio-exterior': `/comercio-exterior/${slug}`,
        blog: `/blog/${slug}`,
    };

    return (
        <Link href={paths[to]} className="service-link">
            {children}
        </Link>
    );
}

/* --------------------------------------------------
 * Re-export enhanced components
 * -------------------------------------------------- */

export {
    DataCard,
    StatGrid,
    Step,
    StepProcess,
    InfoBox,
    ProTip,
    ComparisonTable,
    ComparisonRow,
    Highlight,
    TopicIcon,
} from './MdxEnhanced';

import {
    DataCard,
    StatGrid,
    Step,
    StepProcess,
    InfoBox,
    ProTip,
    ComparisonTable,
    ComparisonRow,
    Highlight,
} from './MdxEnhanced';

/* --------------------------------------------------
 * Export mapping for MDX Provider
 * -------------------------------------------------- */

export const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    a: A,
    strong: Strong,
    blockquote: Blockquote,
    ul: UL,
    ol: OL,
    li: LI,
    hr: HR,
    pre: Pre,
    code: Code,
    table: Table,
    thead: THead,
    th: TH,
    td: TD,
    tr: TR,
    img: Img,
    // Custom components available in MDX files
    Callout,
    SmartLink,
    // Enhanced visual components
    DataCard,
    StatGrid,
    Step,
    StepProcess,
    InfoBox,
    ProTip,
    ComparisonTable,
    ComparisonRow,
    Highlight,
};

