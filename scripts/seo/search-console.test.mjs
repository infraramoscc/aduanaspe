import assert from 'node:assert/strict';
import { generateKeyPairSync, verify } from 'node:crypto';
import test from 'node:test';

import {
    createSearchConsoleClient,
    createServiceAccountJwt,
    normalizePrivateKey,
} from './search-console.mjs';

test('normalizes escaped newlines in a private key', () => {
    assert.equal(
        normalizePrivateKey('line-1\\nline-2\\n'),
        'line-1\nline-2\n'
    );
});

test('creates a signed readonly service-account JWT', () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        publicKeyEncoding: { type: 'spki', format: 'pem' },
    });
    const token = createServiceAccountJwt({
        clientEmail: 'reader@example.iam.gserviceaccount.com',
        privateKey,
        now: new Date('2026-06-13T12:00:00Z'),
    });
    const [header, payload, signature] = token.split('.');
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

    assert.equal(claims.iss, 'reader@example.iam.gserviceaccount.com');
    assert.equal(
        claims.scope,
        'https://www.googleapis.com/auth/webmasters.readonly'
    );
    assert.equal(claims.exp - claims.iat, 3600);
    assert.equal(
        verify(
            'RSA-SHA256',
            Buffer.from(`${header}.${payload}`),
            publicKey,
            Buffer.from(signature, 'base64url')
        ),
        true
    );
});

test('paginates Search Console results in blocks of 25,000', async () => {
    const requests = [];
    const firstPage = Array.from({ length: 25_000 }, (_, index) => ({
        keys: [`query-${index}`],
        clicks: 1,
        impressions: 2,
        ctr: 0.5,
        position: 3,
    }));
    const responses = [
        { rows: firstPage },
        {
            rows: [{
                keys: ['last-query'],
                clicks: 1,
                impressions: 4,
                ctr: 0.25,
                position: 5,
            }],
        },
    ];

    const client = createSearchConsoleClient({
        siteUrl: 'sc-domain:aduanaspe.com',
        accessTokenProvider: async () => 'token',
        fetchImpl: async (url, options) => {
            requests.push({ url, options });
            return Response.json(responses.shift());
        },
    });

    const rows = await client.query({
        startDate: '2026-05-01',
        endDate: '2026-05-28',
        dimensions: ['query'],
    });

    assert.equal(rows.length, 25_001);
    assert.equal(requests.length, 2);
    assert.equal(JSON.parse(requests[0].options.body).startRow, 0);
    assert.equal(JSON.parse(requests[1].options.body).startRow, 25_000);
    assert.equal(JSON.parse(requests[0].options.body).rowLimit, 25_000);
});

test('sends finalized web data with the requested dimensions', async () => {
    let captured;
    const client = createSearchConsoleClient({
        siteUrl: 'https://aduanaspe.com/',
        accessTokenProvider: async () => 'secret-token',
        fetchImpl: async (url, options) => {
            captured = { url, options };
            return Response.json({ rows: [] });
        },
    });

    await client.query({
        startDate: '2026-05-01',
        endDate: '2026-05-28',
        dimensions: ['page', 'query'],
    });

    const body = JSON.parse(captured.options.body);
    assert.match(captured.url, /sites\/https%3A%2F%2Faduanaspe\.com%2F\/searchAnalytics\/query/);
    assert.equal(captured.options.headers.Authorization, 'Bearer secret-token');
    assert.deepEqual(body.dimensions, ['page', 'query']);
    assert.equal(body.type, 'web');
    assert.equal(body.dataState, 'final');
});

test('throws a useful error when Google rejects a request', async () => {
    const client = createSearchConsoleClient({
        siteUrl: 'sc-domain:aduanaspe.com',
        accessTokenProvider: async () => 'token',
        fetchImpl: async () => new Response(
            JSON.stringify({ error: { message: 'User does not have sufficient permission' } }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        ),
    });

    await assert.rejects(
        () => client.query({
            startDate: '2026-05-01',
            endDate: '2026-05-28',
            dimensions: ['page'],
        }),
        /403.*sufficient permission/
    );
});
