'use client';

import Link from 'next/link';
import { type AnchorHTMLAttributes } from 'react';
import { trackEvent } from './ga4';
import { cn } from '@/lib/utils';

interface TrackedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    href: string;
    eventName: string;
    eventParams?: Record<string, string>;
    external?: boolean;
}

function TrackedLink({
    href,
    eventName,
    eventParams,
    external = false,
    onClick,
    children,
    className,
    ...props
}: TrackedLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        trackEvent(eventName, { ...eventParams, href });
        onClick?.(e);
    };

    if (external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className={cn(className)}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={handleClick} className={cn(className)} {...props}>
            {children}
        </Link>
    );
}

export { TrackedLink, type TrackedLinkProps };
