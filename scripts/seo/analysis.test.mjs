import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_THRESHOLDS } from './config.mjs';
import {
    analyzeSeoData,
    normalizePageUrl,
    ratioChange,
} from './analysis.mjs';

const row = (keys, clicks, impressions, ctr, position) => ({
    keys,
    clicks,
    impressions,
    ctr,
    position,
});

test('normalizes equivalent page URLs', () => {
    assert.equal(
        normalizePageUrl('https://aduanaspe.com/blog/ejemplo/'),
        'https://aduanaspe.com/blog/ejemplo'
    );
    assert.equal(normalizePageUrl('https://aduanaspe.com/'), 'https://aduanaspe.com/');
    assert.equal(
        normalizePageUrl('https://blog.aduanaspe.com/ejemplo/'),
        'https://aduanaspe.com/blog/ejemplo'
    );
});

test('returns null instead of an infinite change when the baseline is zero', () => {
    assert.equal(ratioChange(10, 0), null);
    assert.equal(ratioChange(75, 100), -0.25);
});

test('classifies the six supported SEO opportunity types', () => {
    const current = {
        pages: [
            row(['https://aduanaspe.com/blog/caida/'], 30, 800, 0.0375, 5),
            row(['https://aduanaspe.com/blog/ctr-bajo/'], 1, 200, 0.005, 6),
            row(['https://aduanaspe.com/blog/cerca/'], 3, 150, 0.02, 11),
            row(['https://aduanaspe.com/blog/nueva/'], 2, 80, 0.025, 8),
            row(['https://aduanaspe.com/blog/ganador/'], 40, 500, 0.08, 3),
        ],
        queries: [
            row(['consulta nueva'], 2, 40, 0.05, 8),
            row(['consulta compartida'], 4, 60, 0.067, 7),
        ],
        pageQueries: [
            row(['https://aduanaspe.com/blog/nueva/', 'consulta nueva'], 2, 40, 0.05, 8),
            row(['https://aduanaspe.com/blog/uno/', 'consulta compartida'], 2, 30, 0.067, 7),
            row(['https://aduanaspe.com/blog/dos/', 'consulta compartida'], 2, 30, 0.067, 7),
        ],
    };
    const previous = {
        pages: [
            row(['https://aduanaspe.com/blog/caida'], 60, 1_000, 0.06, 4),
            row(['https://aduanaspe.com/blog/ctr-bajo'], 1, 190, 0.005, 6),
            row(['https://aduanaspe.com/blog/cerca'], 2, 140, 0.014, 12),
            row(['https://aduanaspe.com/blog/ganador'], 20, 300, 0.067, 5),
        ],
        queries: [
            row(['consulta compartida'], 3, 50, 0.06, 8),
        ],
        pageQueries: [],
    };

    const result = analyzeSeoData({
        current,
        previous,
        seoLog: [],
        now: new Date('2026-06-13T12:00:00Z'),
        thresholds: DEFAULT_THRESHOLDS,
    });
    const types = new Set(result.opportunities.map(({ type }) => type));

    assert.deepEqual(types, new Set([
        'traffic_drop',
        'low_ctr',
        'striking_distance',
        'new_query',
        'cannibalization',
        'winner',
    ]));
    assert.equal(
        result.opportunities.find(({ type }) => type === 'new_query').url,
        'https://aduanaspe.com/blog/nueva'
    );
});

test('marks recently edited pages as watching and suppresses edit recommendations', () => {
    const url = 'https://aduanaspe.com/blog/actualizado/';
    const result = analyzeSeoData({
        current: {
            pages: [row([url], 1, 200, 0.005, 7)],
            queries: [],
            pageQueries: [],
        },
        previous: {
            pages: [row([url], 10, 250, 0.04, 5)],
            queries: [],
            pageQueries: [],
        },
        seoLog: [{
            date: '2026-05-20',
            url: '/blog/actualizado/',
            status: 'watching',
        }],
        now: new Date('2026-06-13T12:00:00Z'),
        thresholds: DEFAULT_THRESHOLDS,
    });

    assert.equal(result.opportunities.length, 0);
    assert.deepEqual(result.watching.map(({ url: watchedUrl }) => watchedUrl), [
        'https://aduanaspe.com/blog/actualizado',
    ]);
});

test('expires quarantine after 28 complete days', () => {
    const url = 'https://aduanaspe.com/blog/listo/';
    const result = analyzeSeoData({
        current: {
            pages: [row([url], 1, 200, 0.005, 7)],
            queries: [],
            pageQueries: [],
        },
        previous: {
            pages: [row([url], 1, 200, 0.005, 7)],
            queries: [],
            pageQueries: [],
        },
        seoLog: [{ date: '2026-05-15', url: '/blog/listo/' }],
        now: new Date('2026-06-13T12:00:00Z'),
        thresholds: DEFAULT_THRESHOLDS,
    });

    assert.ok(result.opportunities.some(({ type }) => type === 'low_ctr'));
    assert.equal(result.watching.length, 0);
});

test('does not recommend edits for a healthy winner', () => {
    const url = 'https://aduanaspe.com/blog/creciendo/';
    const result = analyzeSeoData({
        current: {
            pages: [row([url], 30, 260, 0.115, 7)],
            queries: [],
            pageQueries: [],
        },
        previous: {
            pages: [row([url], 20, 200, 0.1, 8)],
            queries: [],
            pageQueries: [],
        },
        seoLog: [],
        now: new Date('2026-06-13T12:00:00Z'),
        thresholds: DEFAULT_THRESHOLDS,
    });

    assert.deepEqual(
        result.opportunities.map(({ type }) => type),
        ['winner']
    );
});
