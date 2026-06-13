import { createSign } from 'node:crypto';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEARCH_CONSOLE_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const PAGE_SIZE = 25_000;

function base64Url(value) {
    return Buffer.from(value)
        .toString('base64')
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');
}

export function normalizePrivateKey(privateKey) {
    return privateKey.replaceAll('\\n', '\n');
}

export function createServiceAccountJwt({
    clientEmail,
    privateKey,
    now = new Date(),
}) {
    const issuedAt = Math.floor(now.getTime() / 1000);
    const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = base64Url(JSON.stringify({
        iss: clientEmail,
        scope: SEARCH_CONSOLE_SCOPE,
        aud: GOOGLE_TOKEN_URL,
        iat: issuedAt,
        exp: issuedAt + 3600,
    }));
    const unsignedToken = `${header}.${payload}`;
    const signer = createSign('RSA-SHA256');
    signer.update(unsignedToken);
    signer.end();
    const signature = signer
        .sign(normalizePrivateKey(privateKey), 'base64')
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');

    return `${unsignedToken}.${signature}`;
}

async function parseGoogleError(response) {
    let detail = response.statusText;

    try {
        const data = await response.json();
        detail = data.error?.message || data.error_description || detail;
    } catch {
        // Keep the HTTP status text when Google does not return JSON.
    }

    return new Error(`Google API ${response.status}: ${detail}`);
}

export function createAccessTokenProvider({
    clientEmail,
    privateKey,
    fetchImpl = fetch,
}) {
    let cachedToken;
    let expiresAt = 0;

    return async () => {
        const now = Date.now();
        if (cachedToken && now < expiresAt - 60_000) {
            return cachedToken;
        }

        const assertion = createServiceAccountJwt({
            clientEmail,
            privateKey,
            now: new Date(now),
        });
        const body = new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion,
        });
        const response = await fetchImpl(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        if (!response.ok) {
            throw await parseGoogleError(response);
        }

        const data = await response.json();
        cachedToken = data.access_token;
        expiresAt = now + (data.expires_in || 3600) * 1000;
        return cachedToken;
    };
}

export function createSearchConsoleClient({
    siteUrl,
    accessTokenProvider,
    fetchImpl = fetch,
}) {
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

    return {
        async query({ startDate, endDate, dimensions }) {
            const rows = [];
            let startRow = 0;

            while (true) {
                const accessToken = await accessTokenProvider();
                const response = await fetchImpl(endpoint, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        startDate,
                        endDate,
                        dimensions,
                        type: 'web',
                        dataState: 'final',
                        rowLimit: PAGE_SIZE,
                        startRow,
                    }),
                });

                if (!response.ok) {
                    throw await parseGoogleError(response);
                }

                const data = await response.json();
                const pageRows = data.rows || [];
                rows.push(...pageRows);

                if (pageRows.length < PAGE_SIZE) {
                    return rows;
                }

                startRow += PAGE_SIZE;
            }
        },
    };
}
