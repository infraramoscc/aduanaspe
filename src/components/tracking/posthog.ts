import type { PostHog } from 'posthog-js';
import { getAnalyticsPreference, posthogHost, posthogToken } from './analyticsConsent';

const measuredEvents = new Set([
    '$pageview',
    'click_cta_to_servicios',
    'service_selected',
    'click_cta_to_contacto',
    'click_cta_to_precotizacion',
    'whatsapp_clicked',
    'submit_form_contacto',
    'submit_form_precotizacion',
    'submit_form_diagnostico',
    'generate_lead',
]);

const allowedProperties = [
    'token', 'distinct_id',
    '$current_url', '$pathname', '$device_type', '$browser', '$os',
    '$referring_domain', '$session_id', '$device_id', '$process_person_profile',
    '$lib', '$lib_version',
    'location', 'service_slug', 'service_group', 'message_key', 'lead_source',
];

let client: PostHog | undefined;
let loading: Promise<PostHog | undefined> | undefined;
let generation = 0;
let lastPage: string | undefined;

function loadPostHog() {
    const token = posthogToken;
    const host = posthogHost;
    if (!token || !host) return;

    loading ??= import('posthog-js').then(({ default: sdk }) => {
        if (getAnalyticsPreference() !== 'accepted') return;

        sdk.init(token, {
            api_host: host,
            autocapture: false,
            capture_pageview: false,
            capture_pageleave: false,
            capture_dead_clicks: false,
            capture_exceptions: false,
            capture_heatmaps: false,
            capture_performance: false,
            disable_session_recording: true,
            advanced_disable_flags: true,
            disable_external_dependency_loading: true,
            save_campaign_params: false,
            save_referrer: false,
            get_current_url: () => window.location.origin + window.location.pathname,
            person_profiles: 'never',
            persistence: 'localStorage',
            opt_out_persistence_by_default: true,
            request_batching: false,
            before_send: (event) => {
                if (!event || !measuredEvents.has(event.event) || getAnalyticsPreference() !== 'accepted') return null;

                const properties = Object.fromEntries(
                    allowedProperties
                        .filter((key) => event.properties?.[key] !== undefined)
                        .map((key) => [key, event.properties?.[key]]),
                );
                return { uuid: event.uuid, event: event.event, timestamp: event.timestamp, properties };
            },
        });
        client = sdk;
        return sdk;
    }).catch(() => undefined).finally(() => {
        loading = undefined;
    });

    return loading;
}

export function revokePostHog() {
    generation++;
    lastPage = undefined;
    client?.opt_out_capturing();
}

export function capturePostHog(name: string, params?: Record<string, unknown>, pathname = window.location.pathname) {
    if (!measuredEvents.has(name) || getAnalyticsPreference() !== 'accepted') return;

    const capturedGeneration = generation;
    const properties = {
        $pathname: pathname,
        $current_url: window.location.origin + pathname,
        location: params?.location,
        service_slug: params?.service_slug ?? params?.service,
        service_group: params?.service_group,
        message_key: params?.message_key,
        lead_source: params?.lead_source,
    };
    const send = (sdk: PostHog) => {
        if (capturedGeneration !== generation || getAnalyticsPreference() !== 'accepted') return;
        if (sdk.has_opted_out_capturing()) sdk.opt_in_capturing({ captureEventName: false });
        sdk.capture(name, properties);
    };

    if (client) send(client);
    else void loadPostHog()?.then((sdk) => { if (sdk) send(sdk); });
}

export function capturePostHogPage(pathname: string) {
    if (lastPage === pathname) return;
    lastPage = pathname;
    capturePostHog('$pageview', undefined, pathname);
}
