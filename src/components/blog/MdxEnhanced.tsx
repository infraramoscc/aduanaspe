/**
 * Enhanced MDX Components — Premium Blog Visuals
 * DataCard, ComparisonTable, StepProcess, InfoBox, StatGrid, TopicIcon
 * Following the "Vibrante Claro Premium" design system
 */

import type { ReactNode } from 'react';

/* --------------------------------------------------
 * TopicIcon — SVG icon per blog topic (replaces hero images)
 * -------------------------------------------------- */

const topicIcons: Record<string, { icon: ReactNode; bg: string; color: string }> = {
    'clasificacion-arancelaria': {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
            </svg>
        ),
        bg: 'var(--purple-light)',
        color: 'var(--purple)',
    },
    'agenciamiento-aduanas': {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        bg: 'var(--blue-light)',
        color: 'var(--blue-dark)',
    },
    'agencia-carga': {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M2 20h20" />
                <path d="M5 20V8l7-5 7 5v12" />
                <path d="M2 20l3-12h14l3 12" />
                <rect x="9" y="12" width="6" height="8" rx="1" />
            </svg>
        ),
        bg: 'var(--green-light)',
        color: 'var(--green-dark)',
    },
    importacion: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                <path d="M12 8v8m-4-4h8" />
            </svg>
        ),
        bg: 'var(--coral-light)',
        color: 'var(--coral)',
    },
    exportacion: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                <path d="M12 16V8m-4 4l4-4 4 4" />
            </svg>
        ),
        bg: 'var(--yellow-light)',
        color: 'var(--yellow-dark)',
    },
    transporte: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h4l3 5v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
        bg: 'var(--orange-light)',
        color: 'var(--orange)',
    },
    consultoria: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                <path d="M12 7v2m0 4h.01" />
            </svg>
        ),
        bg: 'var(--pink-light)',
        color: 'var(--pink)',
    },
    default: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
        ),
        bg: 'var(--purple-light)',
        color: 'var(--purple)',
    },
};

export function TopicIcon({ topic }: { topic: string }) {
    const config = topicIcons[topic] || topicIcons.default;
    return (
        <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: config.bg, color: config.color }}
        >
            {config.icon}
        </div>
    );
}

/* --------------------------------------------------
 * DataCard — Highlight a key metric or datum
 * Usage in MDX: <DataCard label="Ad Valorem" value="0%" description="Exonerado" color="green" />
 * -------------------------------------------------- */

type DataColor = 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'coral';

const dataColorMap: Record<DataColor, { bg: string; accent: string; text: string }> = {
    purple: { bg: 'var(--purple-light)', accent: 'var(--purple)', text: 'var(--purple-dark)' },
    blue: { bg: 'var(--blue-light)', accent: 'var(--blue)', text: 'var(--blue-dark)' },
    green: { bg: 'var(--green-light)', accent: 'var(--green)', text: 'var(--green-dark)' },
    pink: { bg: 'var(--pink-light)', accent: 'var(--pink)', text: 'var(--pink-dark)' },
    orange: { bg: 'var(--orange-light)', accent: 'var(--orange)', text: 'var(--orange)' },
    coral: { bg: 'var(--coral-light)', accent: 'var(--coral)', text: 'var(--coral)' },
};

interface DataCardProps {
    label: string;
    value: string;
    description?: string;
    color?: DataColor;
}

export function DataCard({ label, value, description, color = 'purple' }: DataCardProps) {
    const c = dataColorMap[color];
    return (
        <div
            className="rounded-xl p-5 border not-prose"
            style={{
                background: c.bg,
                borderColor: `${c.accent}33`,
            }}
        >
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: c.accent }}>
                {label}
            </p>
            <p className="text-3xl font-bold mb-1" style={{ color: c.text }}>
                {value}
            </p>
            {description && (
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                    {description}
                </p>
            )}
        </div>
    );
}

/* --------------------------------------------------
 * StatGrid — Grid of DataCards
 * Usage: <StatGrid cols={3}><DataCard .../><DataCard .../></StatGrid>
 * -------------------------------------------------- */

interface StatGridProps {
    cols?: 2 | 3 | 4;
    children: ReactNode;
}

export function StatGrid({ cols = 3, children }: StatGridProps) {
    const gridClass = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
    };
    return (
        <div className={`grid ${gridClass[cols]} gap-4 my-6 not-prose`}>
            {children}
        </div>
    );
}

/* --------------------------------------------------
 * StepProcess — Numbered steps with visual indicator
 * Usage: <StepProcess><Step n={1} title="Identificar">...</Step></StepProcess>
 * -------------------------------------------------- */

interface StepProps {
    n: number;
    title: string;
    children: ReactNode;
}

export function Step({ n, title, children }: StepProps) {
    return (
        <div className="flex gap-4 not-prose">
            {/* Number circle */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'var(--gradient-primary)' }}
            >
                {n}
            </div>
            {/* Content */}
            <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--text-heading)' }}>
                    {title}
                </h4>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function StepProcess({ children }: { children: ReactNode }) {
    return (
        <div className="my-8 space-y-2 rounded-xl border border-gray-100 p-6 bg-white shadow-sm not-prose">
            {children}
        </div>
    );
}

/* --------------------------------------------------
 * InfoBox — Styled info/warning/formula box
 * Differs from Callout: larger, more visual, with icon circle
 * Usage: <InfoBox type="formula" title="Cálculo de Flete">...</InfoBox>
 * -------------------------------------------------- */

type InfoBoxType = 'info' | 'warning' | 'success' | 'formula' | 'important';

const infoBoxStyles: Record<InfoBoxType, { bg: string; border: string; iconBg: string; icon: string }> = {
    info: { bg: 'var(--blue-light)', border: 'var(--blue)', iconBg: 'var(--blue)', icon: '📋' },
    warning: { bg: 'var(--yellow-light)', border: 'var(--yellow-dark)', iconBg: 'var(--yellow-dark)', icon: '⚠️' },
    success: { bg: 'var(--green-light)', border: 'var(--green)', iconBg: 'var(--green-dark)', icon: '✅' },
    formula: { bg: 'var(--purple-light)', border: 'var(--purple)', iconBg: 'var(--purple)', icon: '📐' },
    important: { bg: 'var(--coral-light)', border: 'var(--coral)', iconBg: 'var(--coral)', icon: '🔑' },
};

interface InfoBoxProps {
    type?: InfoBoxType;
    title: string;
    children: ReactNode;
}

export function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
    const s = infoBoxStyles[type];
    return (
        <div
            className="rounded-xl p-6 my-6 not-prose"
            style={{
                background: s.bg,
                border: `1px solid ${s.border}33`,
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                    style={{ background: s.iconBg }}
                >
                    {s.icon}
                </span>
                <h4 className="font-bold text-base" style={{ color: 'var(--text-heading)' }}>
                    {title}
                </h4>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {children}
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * ProTip — Small inline tip with gradient left border
 * Usage: <ProTip>Si tu carga ocupa más del 40%...</ProTip>
 * -------------------------------------------------- */

export function ProTip({ children }: { children: ReactNode }) {
    return (
        <div
            className="rounded-r-xl p-4 my-4 flex gap-3 items-start not-prose"
            style={{
                background: 'var(--green-light)',
                borderLeft: '4px solid var(--green)',
            }}
        >
            <span className="text-lg flex-shrink-0">💡</span>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {children}
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * ComparisonRow — Visual comparison between two options
 * Usage: <ComparisonRow left="FCL" right="LCL" leftValue="$40/m³" rightValue="$65/m³" winner="left" />
 * -------------------------------------------------- */

interface ComparisonRowProps {
    label: string;
    left: string;
    right: string;
    winner?: 'left' | 'right' | 'none';
}

export function ComparisonRow({ label, left, right, winner = 'none' }: ComparisonRowProps) {
    return (
        <div className="grid grid-cols-3 gap-2 items-center py-3 border-b border-gray-100 last:border-0 text-sm not-prose">
            <span className="font-medium" style={{ color: 'var(--text-heading)' }}>{label}</span>
            <span
                className={`text-center px-3 py-1.5 rounded-lg ${winner === 'left' ? 'font-bold' : ''}`}
                style={{
                    background: winner === 'left' ? 'var(--green-light)' : 'transparent',
                    color: winner === 'left' ? 'var(--green-dark)' : 'var(--text-body)',
                }}
            >
                {left}
            </span>
            <span
                className={`text-center px-3 py-1.5 rounded-lg ${winner === 'right' ? 'font-bold' : ''}`}
                style={{
                    background: winner === 'right' ? 'var(--green-light)' : 'transparent',
                    color: winner === 'right' ? 'var(--green-dark)' : 'var(--text-body)',
                }}
            >
                {right}
            </span>
        </div>
    );
}

interface ComparisonTableProps {
    leftHeader: string;
    rightHeader: string;
    children: ReactNode;
}

export function ComparisonTable({ leftHeader, rightHeader, children }: ComparisonTableProps) {
    return (
        <div className="my-6 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm not-prose">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
            >
                <span>Factor</span>
                <span className="text-center">{leftHeader}</span>
                <span className="text-center">{rightHeader}</span>
            </div>
            {/* Rows */}
            <div className="px-5">
                {children}
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * Highlight — Inline text highlight with gradient background
 * Usage: <Highlight>texto importante</Highlight>
 * -------------------------------------------------- */

export function Highlight({ children }: { children: ReactNode }) {
    return (
        <span
            className="px-1.5 py-0.5 rounded-md font-semibold"
            style={{
                background: 'var(--purple-light)',
                color: 'var(--purple-dark)',
            }}
        >
            {children}
        </span>
    );
}
