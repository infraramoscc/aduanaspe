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
                    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full',
                    {
                        // Primary: Gradiente Rosa → Púrpura → Azul con glow
                        'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-lg hover:shadow-pink hover:-translate-y-1':
                            variant === 'primary',
                        // Secondary: Blanco con borde
                        'bg-white text-slate-900 border-2 border-slate-200 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50':
                            variant === 'secondary',
                        // Ghost: Sin fondo
                        'text-purple-600 hover:bg-purple-50 focus-visible:ring-purple-500':
                            variant === 'ghost',
                        // Accent: Verde neón para CTAs secundarios
                        'bg-gradient-to-r from-emerald-400 to-cyan-400 text-white shadow-lg hover:shadow-green hover:-translate-y-1':
                            variant === 'accent',
                    },
                    {
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
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
