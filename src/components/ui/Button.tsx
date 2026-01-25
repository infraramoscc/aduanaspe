import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-xl shadow-sm',
                    {
                        'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500 hover:shadow-lg hover:shadow-violet-500/25':
                            variant === 'primary',
                        'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-violet-300 focus-visible:ring-violet-500':
                            variant === 'secondary',
                        'text-violet-700 hover:bg-violet-50 focus-visible:ring-violet-500':
                            variant === 'ghost',
                    },
                    {
                        'px-3 py-1.5 text-sm': size === 'sm',
                        'px-4 py-2 text-base': size === 'md',
                        'px-6 py-3 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
