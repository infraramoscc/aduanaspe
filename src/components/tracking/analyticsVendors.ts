import { clarityId, gaId, getAnalyticsPreference } from './analyticsConsent';

declare global {
    interface Window {
        clarity?: (method: string, ...args: unknown[]) => void;
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        [key: `ga-disable-${string}`]: boolean | undefined;
    }
}

let clarityScript: HTMLScriptElement | undefined;

export function startAnalyticsVendors() {
    if (getAnalyticsPreference() !== 'accepted') return;

    if (gaId) {
        window[`ga-disable-${gaId}`] = false;
        if (!window.gtag) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                // gtag.js uses the arguments object to distinguish commands from data layer events.
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer?.push(arguments);
            };
            window.gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
            });
            window.gtag('js', new Date());
            window.gtag('config', gaId, { allow_google_signals: false, allow_ad_personalization_signals: false });

            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
            document.head.append(script);
        } else {
            window.gtag('consent', 'update', { analytics_storage: 'granted' });
        }
    }

    if (!clarityId || clarityScript) return;

    const queue: Array<[string, ...unknown[]]> = [];
    window.clarity = Object.assign(
        (method: string, ...args: unknown[]) => { queue.push([method, ...args]); },
        { q: queue },
    );
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
    script.onerror = () => {
        script.remove();
        clarityScript = undefined;
        delete window.clarity;
    };
    clarityScript = script;
    document.head.append(script);
}

export function stopAnalyticsVendors() {
    if (gaId) {
        window[`ga-disable-${gaId}`] = true;
        window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
        const propertyCookie = `_ga_${gaId.replace(/^G-/, '').replaceAll('-', '_')}`;
        for (const cookie of ['_ga', propertyCookie]) {
            document.cookie = `${cookie}=; Max-Age=0; Path=/`;
            if (['aduanaspe.com', 'www.aduanaspe.com'].includes(window.location.hostname)) {
                document.cookie = `${cookie}=; Max-Age=0; Path=/; Domain=aduanaspe.com`;
            }
        }
    }
    if (clarityScript) {
        window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
        // ConsentV2 can restart Clarity in limited mode. Reload to remove its script from the document.
        window.location.reload();
    }
}
