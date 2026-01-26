import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
                <textarea
                    ref={ref}
                    id={id}
                    className={cn(
                        'w-full px-4 py-2 rounded-lg border bg-white text-slate-900 placeholder-slate-400',
                        'transition-colors duration-200 resize-y min-h-[100px]',
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

Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };
