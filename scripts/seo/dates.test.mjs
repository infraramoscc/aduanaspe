import assert from 'node:assert/strict';
import test from 'node:test';

import { buildComparisonWindows } from './dates.mjs';

test('builds two closed 28-day windows with a three-day data lag', () => {
    const windows = buildComparisonWindows(new Date('2026-06-13T12:00:00Z'));

    assert.deepEqual(windows, {
        current: {
            startDate: '2026-05-14',
            endDate: '2026-06-10',
        },
        previous: {
            startDate: '2026-04-16',
            endDate: '2026-05-13',
        },
    });
});

test('calculates windows from the UTC calendar date', () => {
    const windows = buildComparisonWindows(new Date('2026-03-03T00:30:00Z'));

    assert.deepEqual(windows.current, {
        startDate: '2026-02-01',
        endDate: '2026-02-28',
    });
});
