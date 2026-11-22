import { getAnalyticsPreference } from './analyticsConsent';
import { capturePostHog } from './posthog';

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams): void {
    if (getAnalyticsPreference() === 'accepted') {
        window.gtag?.('event', name, params);
        capturePostHog(name, params);
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
        console.log(`[GA4] ${name}`, params || {});
    }
}

// Predefined event names for consistency
export const GA4_EVENTS = {
    // CTA Events
    CLICK_CTA_TO_SERVICIOS: 'click_cta_to_servicios',
    CLICK_CTA_TO_CONTACTO: 'click_cta_to_contacto',
    CLICK_CTA_TO_PRECOTIZACION: 'click_cta_to_precotizacion',
    CLICK_CTA_TO_COMERCIO: 'click_cta_to_comercio',
    SERVICE_SELECTED: 'service_selected',

    // WhatsApp Events
    CLICK_WHATSAPP_GENERAL: 'click_whatsapp_general',
    CLICK_WHATSAPP_SERVICIO: (servicio: string) => `click_whatsapp_${servicio}`,
    WHATSAPP_CLICKED: 'whatsapp_clicked',

    // Form Events
    SUBMIT_FORM_DIAGNOSTICO: 'submit_form_diagnostico',
    SUBMIT_FORM_PRECOTIZACION: 'submit_form_precotizacion',
    SUBMIT_FORM_CONTACTO: 'submit_form_contacto',

    // Navigation Events
    PAGE_VIEW: 'page_view',
    NAV_CLICK: 'nav_click',

    // Blog Events
    BLOG_POST_VIEW: 'blog_post_view',
    BLOG_CTA_CLICK: 'blog_cta_click',
    BLOG_SHARE: 'blog_share',
    BLOG_LEAD_SUBMIT: 'generate_lead',
} as const;
