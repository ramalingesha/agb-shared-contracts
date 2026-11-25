'use strict';
/**
 * Runtime constants and helpers of the dashboard contracts (AGB-1084). Plain CommonJS, no
 * dependencies, so the user-management service, Kong plugins, the progress service and the app
 * share one definition.
 */

/** Largest number of events accepted in one POST /events request. */
const BATCH_MAX = 50;

/** Headers Kong forwards after it verifies the token. Nothing is trusted from a request body. */
const HEADER_PROFILE_ID = 'x-profile-id';
const HEADER_GUARDIAN_ID = 'x-guardian-id';

/** Labels of the ladder steps 1..6, in order. */
const LADDER_LABELS = Object.freeze(['Met', 'Tried', 'Gets it', 'Can explain', 'Remembers', 'Can use it']);

/**
 * The profile of a token's claims. A token issued before AGB-904 has no `profile` claim and is an
 * adult token; so is anything that is not exactly 'student'.
 */
function profileOf(claims) {
  return claims && claims.profile === 'student' ? 'student' : 'adult';
}

/** True only for a token that explicitly carries profile = 'student'. */
function isStudentToken(claims) {
  return profileOf(claims) === 'student';
}

/**
 * The two-band age group user-management stores for a four-band contract `ageBand`
 * (`5-7`, `8-10`, `11-13` -> `under13`; `14-17` -> `13to17`). `11-13` maps to `under13`
 * because the band can hold a 13-year-old and consent is the stricter path. Unknown or absent
 * input gives `undefined`.
 */
function guardianAgeBandOf(ageBand) {
  if (ageBand === '5-7' || ageBand === '8-10' || ageBand === '11-13') return 'under13';
  if (ageBand === '14-17') return '13to17';
  return undefined;
}

module.exports = { BATCH_MAX, HEADER_PROFILE_ID, HEADER_GUARDIAN_ID, LADDER_LABELS, profileOf, isStudentToken, guardianAgeBandOf };
