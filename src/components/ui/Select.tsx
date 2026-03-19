import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
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
                <select
                    ref={ref}
                    id={id}
                    className={cn(
                        'w-full appearance-none rounded-2xl border bg-white px-4 py-3 text-slate-900 shadow-sm',
                        'transition duration-200',
                        'focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200/70',
                        'disabled:cursor-not-allowed disabled:bg-slate-100',
                        error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                            : 'border-slate-300',
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select, type SelectProps, type SelectOption };
