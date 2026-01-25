import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

function Container({ className, children, size = 'lg', ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto px-4 sm:px-6 lg:px-8',
                {
                    'max-w-3xl': size === 'sm',
                    'max-w-5xl': size === 'md',
                    'max-w-6xl': size === 'lg',
                    'max-w-7xl': size === 'xl',
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export { Container, type ContainerProps };
