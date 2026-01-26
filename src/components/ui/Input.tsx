import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-slate-700 mb-1"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        'w-full px-4 py-2 rounded-lg border bg-white text-slate-900 placeholder-slate-400',
                        'transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                        'disabled:bg-slate-100 disabled:cursor-not-allowed',
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-200',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input, type InputProps };
