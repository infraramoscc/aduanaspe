import { cn } from '@/lib/utils';

type ToolGlyphProps = {
    icon: 'taxes' | 'simulation' | 'freight' | 'tariff' | 'classification' | 'documents';
    accent: 'indigo' | 'cyan' | 'coral';
    className?: string;
};

const accentClasses = {
    indigo: 'bg-[#ecebff] text-[#3c3794] ring-[rgba(60,55,148,0.14)] shadow-[0_10px_22px_rgba(60,55,148,0.16)]',
    cyan: 'bg-[rgba(224,249,255,0.96)] text-[#0b5f82] ring-[rgba(0,212,255,0.18)] shadow-[0_10px_22px_rgba(0,212,255,0.16)]',
    coral: 'bg-[rgba(255,228,228,0.96)] text-[#cf5858] ring-[rgba(255,107,107,0.2)] shadow-[0_10px_22px_rgba(255,107,107,0.14)]',
} as const;

function ToolGlyph({ icon, accent, className }: ToolGlyphProps) {
    return (
        <span
            className={cn(
                'glass inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 shadow-sm',
                accentClasses[accent],
                className
            )}
            aria-hidden="true"
        >
            {icon === 'taxes' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 7.5h14M7 4.5h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
                    <path d="M9 11h6M9 15h3" />
                </svg>
            )}
            {icon === 'simulation' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 19.5h14" />
                    <path d="M7.5 16V11M12 16V7M16.5 16V13" />
                    <path d="M6 4.5h12" />
                </svg>
            )}
            {icon === 'freight' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 17.5h14V8.5L14 6H9L6 8.5H3v9Z" />
                    <path d="M17 10.5h2.5l1.5 2v5h-4" />
                    <circle cx="7.5" cy="17.5" r="1.5" />
                    <circle cx="17.5" cy="17.5" r="1.5" />
                </svg>
            )}
            {icon === 'tariff' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 5.5h12v13H6z" />
                    <path d="M9 9.5h6M9 13.5h6M9 17.5h4" />
                </svg>
            )}
            {icon === 'classification' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="5.5" />
                    <path d="m15.2 15.2 4.3 4.3" />
                    <path d="M9.5 11h3M11 9.5v3" />
                </svg>
            )}
            {icon === 'documents' && (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M8 4.5h6l4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
                    <path d="M14 4.5v4h4M9 13l2 2 4-4" />
                </svg>
            )}
        </span>
    );
}

export { ToolGlyph, type ToolGlyphProps };
