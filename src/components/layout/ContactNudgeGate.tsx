'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { shouldEnableContactNudge } from './contactNudgeRules';

const DeferredContactNudge = dynamic(
    () => import('./ContactNudge').then((module) => module.ContactNudge),
    { ssr: false }
);

function ContactNudgeGate() {
    const pathname = usePathname();

    if (!shouldEnableContactNudge(pathname)) {
        return null;
    }

    return <DeferredContactNudge />;
}

export { ContactNudgeGate };
