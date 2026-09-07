import type { ReactNode } from 'react';
import { ServiceSubnav } from '@/components/services';

export default function ServicesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="service-journey">
            <ServiceSubnav />
            {children}
        </div>
    );
}
