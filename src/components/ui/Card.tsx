import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
}

function Card({ className, children, hover = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden',
                hover && 'transition-all duration-200 hover:shadow-md hover:border-gray-300',
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
        <div className={cn('px-6 py-4 border-b border-gray-100', className)} {...props}>
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
        <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)} {...props}>
            {children}
        </div>
    );
}

export { Card, CardHeader, CardContent, CardFooter };
