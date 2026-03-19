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
                        className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    className={cn(
                        'min-h-[120px] w-full resize-y rounded-2xl border bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400',
                        'transition duration-200',
                        'focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200/70',
                        'disabled:cursor-not-allowed disabled:bg-slate-100',
                        error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                            : 'border-slate-300',
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
