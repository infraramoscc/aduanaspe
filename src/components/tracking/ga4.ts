/**
 * GA4 Event Tracking System
 * Integrated with Google Analytics 4
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams): void {
    // Send to GA4 if available
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', name, params);
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
    CLICK_CTA_TO_COMERCIO: 'click_cta_to_comercio',

    // WhatsApp Events
    CLICK_WHATSAPP_GENERAL: 'click_whatsapp_general',
    CLICK_WHATSAPP_SERVICIO: (servicio: string) => `click_whatsapp_${servicio}`,

    // Form Events
    SUBMIT_FORM_DIAGNOSTICO: 'submit_form_diagnostico',
    SUBMIT_FORM_PRECOTIZACION: 'submit_form_precotizacion',
    SUBMIT_FORM_CONTACTO: 'submit_form_contacto',

    // Navigation Events
    PAGE_VIEW: 'page_view',
    NAV_CLICK: 'nav_click',
} as const;
