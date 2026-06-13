const DAY_MS = 24 * 60 * 60 * 1000;
const WINDOW_DAYS = 28;
const DATA_LAG_DAYS = 3;

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

function addUtcDays(date, days) {
    return new Date(date.getTime() + days * DAY_MS);
}

export function buildComparisonWindows(now = new Date()) {
    const todayUtc = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ));
    const currentEnd = addUtcDays(todayUtc, -DATA_LAG_DAYS);
    const currentStart = addUtcDays(currentEnd, -(WINDOW_DAYS - 1));
    const previousEnd = addUtcDays(currentStart, -1);
    const previousStart = addUtcDays(previousEnd, -(WINDOW_DAYS - 1));

    return {
        current: {
            startDate: formatDate(currentStart),
            endDate: formatDate(currentEnd),
        },
        previous: {
            startDate: formatDate(previousStart),
            endDate: formatDate(previousEnd),
        },
    };
}
