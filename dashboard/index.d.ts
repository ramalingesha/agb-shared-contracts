import type { GuardianAgeBand, ProfileKind, ProfileTokenClaims } from '../types/dashboard';

/** Largest number of events accepted in one POST /events request. */
export const BATCH_MAX: 50;
/** Header Kong forwards with the student profile id. */
export const HEADER_PROFILE_ID: 'x-profile-id';
/** Header Kong forwards with the guardian id. */
export const HEADER_GUARDIAN_ID: 'x-guardian-id';
/** Labels of ladder steps 1..6, in order. */
export const LADDER_LABELS: readonly ['Met', 'Tried', 'Gets it', 'Can explain', 'Remembers', 'Can use it'];
/** The token's profile; an absent claim means adult. */
export function profileOf(claims: ProfileTokenClaims | null | undefined): ProfileKind;
/** True only when the token carries profile = 'student'. */
export function isStudentToken(claims: ProfileTokenClaims | null | undefined): boolean;
/** The two-band age group (under13 | 13to17) for a four-band `ageBand`; 11-13 maps to under13. */
export function guardianAgeBandOf(ageBand: string | null | undefined): GuardianAgeBand | undefined;
