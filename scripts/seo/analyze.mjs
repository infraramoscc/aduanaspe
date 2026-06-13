import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { analyzeSeoData } from './analysis.mjs';
import { loadRuntimeConfig } from './config.mjs';
import { buildComparisonWindows } from './dates.mjs';
import { renderSeoReport } from './report.mjs';
import {
    createAccessTokenProvider,
    createSearchConsoleClient,
} from './search-console.mjs';

const SEO_LOG_PATH = path.resolve('docs/seo_tracking/seo_log.json');

async function readSeoLog() {
    try {
        return JSON.parse(await readFile(SEO_LOG_PATH, 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw new Error(`No se pudo leer ${SEO_LOG_PATH}: ${error.message}`);
    }
}

async function collectPeriod(client, period) {
    const [pages, queries, pageQueries] = await Promise.all([
        client.query({ ...period, dimensions: ['page'] }),
        client.query({ ...period, dimensions: ['query'] }),
        client.query({ ...period, dimensions: ['page', 'query'] }),
    ]);

    return { pages, queries, pageQueries };
}

async function main() {
    const config = loadRuntimeConfig();
    const now = process.env.SEO_NOW
        ? new Date(`${process.env.SEO_NOW}T12:00:00Z`)
        : new Date();
    const windows = buildComparisonWindows(now);
    const accessTokenProvider = createAccessTokenProvider({
        clientEmail: config.clientEmail,
        privateKey: config.privateKey,
    });
    const client = createSearchConsoleClient({
        siteUrl: config.siteUrl,
        accessTokenProvider,
    });

    const [current, previous, seoLog] = await Promise.all([
        collectPeriod(client, windows.current),
        collectPeriod(client, windows.previous),
        readSeoLog(),
    ]);
    const analysis = analyzeSeoData({
        current,
        previous,
        seoLog,
        now,
        thresholds: config.thresholds,
    });
    const report = renderSeoReport({
        windows,
        analysis,
        reportMonth: now.toISOString().slice(0, 7),
    });
    const reportPath = path.resolve(config.reportPath);

    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, report, 'utf8');
    console.log(`Reporte SEO generado: ${reportPath}`);
    console.log(`Oportunidades: ${analysis.opportunities.length}`);
}

main().catch((error) => {
    console.error(`Error de analisis SEO: ${error.message}`);
    process.exitCode = 1;
});
