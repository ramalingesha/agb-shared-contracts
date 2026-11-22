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

module.exports = { BATCH_MAX, HEADER_PROFILE_ID, HEADER_GUARDIAN_ID, LADDER_LABELS, profileOf, isStudentToken };
