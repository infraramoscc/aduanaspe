export const DEFAULT_THRESHOLDS = Object.freeze({
    minImpressions: 50,
    lowCtrMax: 0.025,
    lowCtrPositionMax: 10,
    strikingDistancePositionMin: 4,
    strikingDistancePositionMax: 15,
    trafficDropRatio: 0.25,
    winnerGrowthRatio: 0.25,
    newQueryMinImpressions: 20,
    cannibalizationMinImpressions: 20,
    quarantineDays: 28,
});

const REQUIRED_ENV = [
    'GSC_CLIENT_EMAIL',
    'GSC_PRIVATE_KEY',
    'SEARCH_CONSOLE_SITE_URL',
];

export function loadRuntimeConfig(env = process.env) {
    const missing = REQUIRED_ENV.filter((name) => !env[name]?.trim());

    if (missing.length > 0) {
        throw new Error(`Faltan variables requeridas: ${missing.join(', ')}`);
    }

    return {
        clientEmail: env.GSC_CLIENT_EMAIL,
        privateKey: env.GSC_PRIVATE_KEY,
        siteUrl: env.SEARCH_CONSOLE_SITE_URL,
        reportPath: env.SEO_REPORT_PATH || 'seo-report.md',
        thresholds: DEFAULT_THRESHOLDS,
    };
}
