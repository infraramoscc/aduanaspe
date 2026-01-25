'use client';

import { type ButtonHTMLAttributes } from 'react';
import { Button } from '@/components/ui';
import { trackEvent } from './ga4';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    eventName: string;
    eventParams?: Record<string, string>;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

function CTAButton({
    eventName,
    eventParams,
    onClick,
    children,
    ...props
}: CTAButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
    };

    return (
        <Button onClick={handleClick} {...props}>
            {children}
        </Button>
    );
}

export { CTAButton, type CTAButtonProps };
