import assert from 'node:assert/strict';
import test from 'node:test';

import { renderSeoReport } from './report.mjs';

test('renders a monthly report with evidence and watching pages', () => {
    const report = renderSeoReport({
        windows: {
            current: { startDate: '2026-05-14', endDate: '2026-06-10' },
            previous: { startDate: '2026-04-16', endDate: '2026-05-13' },
        },
        analysis: {
            summary: {
                current: { clicks: 80, impressions: 2_000, ctr: 0.04 },
                previous: { clicks: 100, impressions: 2_200, ctr: 0.04545 },
            },
            opportunities: [{
                type: 'low_ctr',
                url: 'https://aduanaspe.com/blog/ejemplo',
                score: 92,
                reason: 'Tiene visibilidad, pero pocos clics.',
                action: 'Evaluar titulo SEO.',
                current: { clicks: 2, impressions: 200, ctr: 0.01, position: 6 },
                previous: { clicks: 3, impressions: 180, ctr: 0.0167, position: 7 },
                relatedQueries: [{
                    query: 'ejemplo aduanas',
                    impressions: 80,
                    clicks: 1,
                    position: 5,
                }],
            }],
            watching: [{
                url: 'https://aduanaspe.com/blog/actualizado',
                current: { clicks: 5, impressions: 100, ctr: 0.05, position: 4 },
            }],
        },
    });

    assert.match(report, /# SEO mensual: 2026-06/);
    assert.match(report, /2026-05-14 a 2026-06-10/);
    assert.match(report, /2026-04-16 a 2026-05-13/);
    assert.match(report, /CTR bajo/);
    assert.match(report, /ejemplo aduanas/);
    assert.match(report, /Paginas en observacion/);
    assert.match(report, /actualizado/);
});

test('renders an explicit message when there are no opportunities', () => {
    const report = renderSeoReport({
        windows: {
            current: { startDate: '2026-05-14', endDate: '2026-06-10' },
            previous: { startDate: '2026-04-16', endDate: '2026-05-13' },
        },
        analysis: {
            summary: {
                current: { clicks: 0, impressions: 0, ctr: 0 },
                previous: { clicks: 0, impressions: 0, ctr: 0 },
            },
            opportunities: [],
            watching: [],
        },
    });

    assert.match(report, /No se detectaron oportunidades/);
});
