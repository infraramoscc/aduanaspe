import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_THRESHOLDS, loadRuntimeConfig } from './config.mjs';

const validEnv = {
    GSC_CLIENT_EMAIL: 'seo-reader@example-project.iam.gserviceaccount.com',
    GSC_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\\nkey\\n-----END PRIVATE KEY-----\\n',
    SEARCH_CONSOLE_SITE_URL: 'sc-domain:aduanaspe.com',
};

test('loads required runtime configuration and defaults', () => {
    assert.deepEqual(loadRuntimeConfig(validEnv), {
        clientEmail: validEnv.GSC_CLIENT_EMAIL,
        privateKey: validEnv.GSC_PRIVATE_KEY,
        siteUrl: validEnv.SEARCH_CONSOLE_SITE_URL,
        reportPath: 'seo-report.md',
        thresholds: DEFAULT_THRESHOLDS,
    });
});

test('reports all missing required environment variables', () => {
    assert.throws(
        () => loadRuntimeConfig({}),
        /GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY, SEARCH_CONSOLE_SITE_URL/
    );
});

test('accepts a custom report path', () => {
    const config = loadRuntimeConfig({
        ...validEnv,
        SEO_REPORT_PATH: 'tmp/monthly-seo.md',
    });

    assert.equal(config.reportPath, 'tmp/monthly-seo.md');
});
