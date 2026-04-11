import assert from 'node:assert/strict';

import {
    CONTACT_NUDGE_DELAY_MS,
    shouldEnableContactNudge,
} from './contactNudgeRules.ts';

assert.equal(shouldEnableContactNudge('/'), false);
assert.equal(shouldEnableContactNudge('/servicios/agenciamiento-aduanas/'), true);
assert.equal(CONTACT_NUDGE_DELAY_MS, 6000);
