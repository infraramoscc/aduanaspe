const DAY_MS = 24 * 60 * 60 * 1000;

export function normalizePageUrl(value) {
    const url = new URL(value, 'https://aduanaspe.com');
    const isLegacyBlog = url.hostname === 'blog.aduanaspe.com';
    const hostname = url.hostname === 'www.aduanaspe.com' || isLegacyBlog
        ? 'aduanaspe.com'
        : url.hostname;
    const sourcePath = isLegacyBlog ? `/blog${url.pathname}` : url.pathname;
    const normalizedPath = sourcePath === '/'
        ? '/'
        : sourcePath.replace(/\/+$/, '');
    const protocol = hostname === 'aduanaspe.com' ? 'https:' : url.protocol;
    return `${protocol}//${hostname}${normalizedPath}${url.search}`;
}

export function ratioChange(current, previous) {
    if (previous === 0) return null;
    return (current - previous) / previous;
}

function aggregateRows(rows, keyBuilder) {
    const aggregate = new Map();

    for (const row of rows || []) {
        const key = keyBuilder(row);
        const existing = aggregate.get(key) || {
            key,
            clicks: 0,
            impressions: 0,
            weightedPosition: 0,
        };
        existing.clicks += row.clicks || 0;
        existing.impressions += row.impressions || 0;
        existing.weightedPosition += (row.position || 0) * (row.impressions || 0);
        aggregate.set(key, existing);
    }

    return new Map([...aggregate].map(([key, item]) => [key, {
        key,
        clicks: item.clicks,
        impressions: item.impressions,
        ctr: item.impressions > 0 ? item.clicks / item.impressions : 0,
        position: item.impressions > 0
            ? item.weightedPosition / item.impressions
            : 0,
    }]));
}

function pageMetrics(rows) {
    return aggregateRows(rows, (row) => normalizePageUrl(row.keys[0]));
}

function queryMetrics(rows) {
    return aggregateRows(rows, (row) => row.keys[0].trim().toLowerCase());
}

function buildPageQueries(rows) {
    const byPage = new Map();
    const byQuery = new Map();

    for (const row of rows || []) {
        const page = normalizePageUrl(row.keys[0]);
        const query = row.keys[1].trim().toLowerCase();
        const metric = {
            query,
            url: page,
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: row.ctr || 0,
            position: row.position || 0,
        };

        if (!byPage.has(page)) byPage.set(page, []);
        if (!byQuery.has(query)) byQuery.set(query, []);
        byPage.get(page).push(metric);
        byQuery.get(query).push(metric);
    }

    for (const metrics of byPage.values()) {
        metrics.sort((a, b) => b.impressions - a.impressions);
    }

    return { byPage, byQuery };
}

function normalizeLogUrl(value) {
    return normalizePageUrl(value.startsWith('http')
        ? value
        : `https://aduanaspe.com${value.startsWith('/') ? '' : '/'}${value}`);
}

function getQuarantinedUrls(seoLog, now, quarantineDays) {
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const urls = new Set();

    for (const entry of seoLog || []) {
        if (!entry.date || !entry.url) continue;
        const changed = new Date(`${entry.date}T00:00:00Z`).getTime();
        const elapsedDays = Math.floor((today - changed) / DAY_MS);
        if (elapsedDays >= 0 && elapsedDays <= quarantineDays) {
            urls.add(normalizeLogUrl(entry.url));
        }
    }

    return urls;
}

function totalMetrics(metrics) {
    const result = { clicks: 0, impressions: 0, ctr: 0 };
    for (const item of metrics.values()) {
        result.clicks += item.clicks;
        result.impressions += item.impressions;
    }
    result.ctr = result.impressions > 0 ? result.clicks / result.impressions : 0;
    return result;
}

function opportunity({
    type,
    url,
    query,
    urls,
    score,
    reason,
    action,
    current,
    previous,
    relatedQueries = [],
}) {
    return {
        type,
        url,
        query,
        urls,
        score,
        reason,
        action,
        current,
        previous,
        relatedQueries: relatedQueries.slice(0, 5),
    };
}

export function analyzeSeoData({
    current,
    previous,
    seoLog,
    now = new Date(),
    thresholds,
}) {
    const currentPages = pageMetrics(current.pages);
    const previousPages = pageMetrics(previous.pages);
    const currentQueries = queryMetrics(current.queries);
    const previousQueries = queryMetrics(previous.queries);
    const currentPageQueries = buildPageQueries(current.pageQueries);
    const quarantined = getQuarantinedUrls(
        seoLog,
        now,
        thresholds.quarantineDays
    );
    const opportunities = [];

    for (const [url, metric] of currentPages) {
        const baseline = previousPages.get(url) || {
            clicks: 0,
            impressions: 0,
            ctr: 0,
            position: 0,
        };
        if (quarantined.has(url)) continue;

        const relatedQueries = currentPageQueries.byPage.get(url) || [];
        const clicksChange = ratioChange(metric.clicks, baseline.clicks);
        const impressionsChange = ratioChange(metric.impressions, baseline.impressions);
        const hasTrafficDrop = baseline.impressions >= thresholds.minImpressions
            && (
                (clicksChange !== null && clicksChange <= -thresholds.trafficDropRatio)
                || (
                    impressionsChange !== null
                    && impressionsChange <= -thresholds.trafficDropRatio
                )
            );
        const isWinner = baseline.impressions >= thresholds.minImpressions
            && !hasTrafficDrop
            && (
                (clicksChange !== null && clicksChange >= thresholds.winnerGrowthRatio)
                || (
                    impressionsChange !== null
                    && impressionsChange >= thresholds.winnerGrowthRatio
                )
            );

        if (isWinner) {
            opportunities.push(opportunity({
                type: 'winner',
                url,
                score: 20 + metric.clicks,
                reason: 'Mejoro de forma relevante frente al periodo anterior.',
                action: 'Conservar estable y observar; evitar cambios editoriales innecesarios.',
                current: metric,
                previous: baseline,
                relatedQueries,
            }));
            continue;
        }

        if (hasTrafficDrop) {
            opportunities.push(opportunity({
                type: 'traffic_drop',
                url,
                score: 100 + baseline.impressions - metric.impressions,
                reason: 'Perdio clics o impresiones frente al periodo anterior.',
                action: 'Revisar vigencia, intencion de busqueda y competencia antes de actualizar.',
                current: metric,
                previous: baseline,
                relatedQueries,
            }));
        }

        if (
            metric.impressions >= thresholds.minImpressions
            && metric.position <= thresholds.lowCtrPositionMax
            && metric.ctr <= thresholds.lowCtrMax
        ) {
            opportunities.push(opportunity({
                type: 'low_ctr',
                url,
                score: 80 + metric.impressions * (thresholds.lowCtrMax - metric.ctr),
                reason: 'Tiene visibilidad competitiva, pero pocos clics para sus impresiones.',
                action: 'Evaluar titulo SEO y descripcion contra la intencion dominante.',
                current: metric,
                previous: baseline,
                relatedQueries,
            }));
        }

        if (
            metric.impressions >= thresholds.minImpressions
            && metric.position >= thresholds.strikingDistancePositionMin
            && metric.position <= thresholds.strikingDistancePositionMax
        ) {
            opportunities.push(opportunity({
                type: 'striking_distance',
                url,
                score: 60 + metric.impressions / Math.max(metric.position, 1),
                reason: 'Esta cerca de las primeras posiciones y ya tiene demanda.',
                action: 'Fortalecer cobertura, enlaces internos y respuesta a consultas relacionadas.',
                current: metric,
                previous: baseline,
                relatedQueries,
            }));
        }

    }

    for (const [query, metric] of currentQueries) {
        const baseline = previousQueries.get(query);
        if (!baseline && metric.impressions >= thresholds.newQueryMinImpressions) {
            const bestPage = (currentPageQueries.byQuery.get(query) || [])
                .sort((a, b) => b.impressions - a.impressions)[0];
            if (bestPage && !quarantined.has(bestPage.url)) {
                opportunities.push(opportunity({
                    type: 'new_query',
                    url: bestPage.url,
                    query,
                    score: 70 + metric.impressions,
                    reason: 'La consulta aparece con demanda y no estaba en el periodo anterior.',
                    action: 'Confirmar si la pagina responde claramente o necesita una seccion dedicada.',
                    current: metric,
                    previous: null,
                    relatedQueries: [bestPage],
                }));
            }
        }

        const pages = currentPageQueries.byQuery.get(query) || [];
        const uniquePages = [...new Set(pages.map(({ url }) => url))];
        const totalImpressions = pages.reduce(
            (sum, page) => sum + page.impressions,
            0
        );
        if (
            uniquePages.length > 1
            && totalImpressions >= thresholds.cannibalizationMinImpressions
        ) {
            opportunities.push(opportunity({
                type: 'cannibalization',
                query,
                urls: uniquePages,
                score: 90 + totalImpressions,
                reason: 'Varias URLs reciben impresiones para la misma consulta.',
                action: 'Revisar solapamiento de intencion y decidir si diferenciar o consolidar.',
                current: metric,
                previous: baseline || null,
                relatedQueries: pages,
            }));
        }
    }

    const watching = [...quarantined]
        .filter((url) => currentPages.has(url))
        .map((url) => ({
            url,
            current: currentPages.get(url),
            previous: previousPages.get(url) || null,
        }));

    return {
        summary: {
            current: totalMetrics(currentPages),
            previous: totalMetrics(previousPages),
        },
        opportunities: opportunities.sort((a, b) => b.score - a.score),
        watching,
    };
}
