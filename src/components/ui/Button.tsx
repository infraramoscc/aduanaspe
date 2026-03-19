import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    showArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, showArrow = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.22)] focus-visible:ring-slate-300':
                            variant === 'primary',
                        'border border-slate-300 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-slate-300':
                            variant === 'secondary',
                        'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300':
                            variant === 'ghost',
                        'bg-[#0f9f6e] text-white shadow-[0_12px_30px_rgba(15,159,110,0.22)] hover:-translate-y-0.5 hover:bg-[#0c8c61] hover:shadow-[0_16px_34px_rgba(15,159,110,0.28)] focus-visible:ring-emerald-200':
                            variant === 'accent',
                    },
                    {
                        'px-4 py-2.5 text-sm': size === 'sm',
                        'px-6 py-3.5 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                <span>{children}</span>
                {showArrow && (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform group-hover:translate-x-1"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
