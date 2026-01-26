import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    colorAccent?: 'cyan' | 'coral' | 'teal' | 'amber' | 'default';
}

function Card({ className, children, hover = false, colorAccent = 'default', ...props }: CardProps) {
    const accentStyles = {
        cyan: 'service-cyan',
        coral: 'service-coral',
        teal: 'service-teal',
        amber: 'service-amber',
        default: 'service-cyan',
    };

    return (
        <div
            className={cn(
                'service-card',
                hover && accentStyles[colorAccent],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('px-6 py-4 border-b border-slate-100', className)} {...props}>
            {children}
        </div>
    );
}

function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('px-6 py-4', className)} {...props}>
            {children}
        </div>
    );
}

function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('px-6 py-4 border-t border-slate-100 bg-slate-50/50', className)} {...props}>
            {children}
        </div>
    );
}

export { Card, CardHeader, CardContent, CardFooter };
