const fs = require('fs');
const path = require('path');
const readline = require('readline');

const baseDir = __dirname;
const seoLogPath = path.join(baseDir, 'seo_log.json');
const EXCLUSION_PERIOD_DAYS = 21;

// Get pages currently in quarantine (modified within the last 21 days)
function getQuarantinedPages() {
    if (!fs.existsSync(seoLogPath)) return new Set();

    try {
        const logData = JSON.parse(fs.readFileSync(seoLogPath, 'utf8'));
        const quarantined = new Set();
        const now = new Date();

        logData.forEach(entry => {
            if (entry.date && entry.url) {
                const modDate = new Date(entry.date);
                const diffTime = Math.abs(now - modDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays <= EXCLUSION_PERIOD_DAYS) {
                    // Match exact URL or URL with domain if needed
                    quarantined.add(entry.url);
                    // Also add without trailing slash just in case
                    quarantined.add(entry.url.replace(/\/$/, ""));
                }
            }
        });

        return quarantined;
    } catch (e) {
        console.error("Error reading seo_log.json:", e);
        return new Set();
    }
}

async function parseCSV(filePath) {
    if (!fs.existsSync(filePath)) return [];

    const rl = readline.createInterface({ input: fs.createReadStream(filePath, { encoding: 'utf8' }), crlfDelay: Infinity });

    const results = [];
    let isHeader = true;
    for await (const line of rl) {
        if (isHeader) { isHeader = false; continue; }
        if (!line.trim()) continue;

        const parts = line.split(',');
        if (parts.length >= 5) {
            const keyParts = parts.slice(0, parts.length - 4);
            let key = keyParts.join(',');
            if (key.startsWith('"') && key.endsWith('"')) {
                key = key.substring(1, key.length - 1);
            }

            const clicks = parseFloat(parts[parts.length - 4]) || 0;
            const impressions = parseFloat(parts[parts.length - 3]) || 0;
            const positionStr = parts[parts.length - 1];
            const position = parseFloat(positionStr) || 0;

            results.push({ key, clicks, impressions, position });
        }
    }
    return results;
}

// Helper to check if a URL from GSC matches our quarantined relative paths
function isQuarantined(gscUrl, quarantinedSet) {
    try {
        const urlObj = new URL(gscUrl);
        const relativePath = urlObj.pathname;
        return quarantinedSet.has(relativePath) || quarantinedSet.has(relativePath.replace(/\/$/, ""));
    } catch (e) {
        // If it's not a valid absolute URL (like a search query), just return false
        return false;
    }
}

async function run() {
    const quarantinedPages = getQuarantinedPages();

    if (quarantinedPages.size > 0) {
        console.log(`\n[ℹ️] INFO: Excluyendo ${quarantinedPages.size} URL(s) actualizadas en los últimos ${EXCLUSION_PERIOD_DAYS} días.\n`);
    }

    const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(dirent.name))
        .map(dirent => dirent.name);

    const aggregate = { pages: {}, queries: {} };

    for (const dir of dirs) {
        const pagesPath = path.join(baseDir, dir, 'Pages.csv');
        const queriesPath = path.join(baseDir, dir, 'Queries.csv');

        // Process Pages
        const pagesData = await parseCSV(pagesPath);
        for (const row of pagesData) {
            // Skip this page if it's in the quarantine list
            if (isQuarantined(row.key, quarantinedPages)) continue;

            if (!aggregate.pages[row.key]) {
                aggregate.pages[row.key] = { clicks: 0, impressions: 0, sumPositionImp: 0 };
            }
            aggregate.pages[row.key].clicks += row.clicks;
            aggregate.pages[row.key].impressions += row.impressions;
            aggregate.pages[row.key].sumPositionImp += row.position * row.impressions;
        }

        // Process Queries
        const queriesData = await parseCSV(queriesPath);
        for (const row of queriesData) {
            if (!aggregate.queries[row.key]) {
                aggregate.queries[row.key] = { clicks: 0, impressions: 0, sumPositionImp: 0 };
            }
            aggregate.queries[row.key].clicks += row.clicks;
            aggregate.queries[row.key].impressions += row.impressions;
            aggregate.queries[row.key].sumPositionImp += row.position * row.impressions;
        }
    }

    function getTop(type) {
        return Object.entries(aggregate[type])
            .map(([key, data]) => ({
                key,
                clicks: data.clicks,
                impressions: data.impressions,
                avgPosition: data.impressions > 0 ? (data.sumPositionImp / data.impressions).toFixed(2) : '0.00',
                ctr: data.impressions > 0 ? ((data.clicks / data.impressions) * 100).toFixed(2) + '%' : '0%'
            }))
            .sort((a, b) => b.impressions - a.impressions)
            .slice(0, 30);
    }

    console.log('=== TOP QUERIES (Aggregated) ===');
    console.table(getTop('queries'));

    console.log('\n=== TOP PAGES (Aggregated) ===');
    console.table(getTop('pages'));
}

run().catch(console.error);
