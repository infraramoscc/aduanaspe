export const gaId = process.env.NEXT_PUBLIC_GA_ID;
export const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
export const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
export const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const storageKey = 'aduanaspe.analytics.v1';
const changeEvent = 'aduanaspe:analytics-preference';
const configuredHost = process.env.NEXT_PUBLIC_ANALYTICS_HOSTNAME?.trim().toLowerCase();
let temporaryPreference: AnalyticsPreference | undefined;

type AnalyticsPreference = 'accepted' | 'rejected';

export function getAnalyticsPreference(): AnalyticsPreference | null | undefined {
    if (typeof window === 'undefined') return undefined;

    const { hostname } = window.location;
    const allowedHost = configuredHost
        ? hostname === configuredHost
        : hostname === 'aduanaspe.com' || hostname === 'www.aduanaspe.com';
    if (!allowedHost || !(gaId || clarityId || (posthogToken && posthogHost))) return undefined;

    if (temporaryPreference) return temporaryPreference;
    try {
        const value = window.localStorage.getItem(storageKey);
        return value === 'accepted' || value === 'rejected' ? value : null;
    } catch {
        return null;
    }
}

export function setAnalyticsPreference(preference: AnalyticsPreference) {
    try {
        window.localStorage.setItem(storageKey, preference);
        temporaryPreference = undefined;
    } catch {
        temporaryPreference = preference;
    }
    window.dispatchEvent(new Event(changeEvent));
}

export function subscribeToAnalyticsPreference(onChange: () => void) {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey || event.key === null) onChange();
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener(changeEvent, onChange);
    return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener(changeEvent, onChange);
    };
}
