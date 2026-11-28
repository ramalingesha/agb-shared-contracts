/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from schemas/dashboard/*.schema.json by scripts/generate-dashboard-types.js.
 * Run `npm run generate:dashboard-types` after changing a schema, then commit the result.
 */

/**
 * An ISO 8601 date-time with an offset.
 */
export type DashboardTime = string;
/**
 * POST /guardians/me/students/claim: a guardian turns a Circle student into a guarded profile, by `studentId` (from claimable-students, the parent-email way) or by `claimCode` (from the Circle's admin or a teacher). Send exactly one of the two. Consent is recorded in the same step. `ageBand` is the two-band form user-management stores.
 */
export type ClaimStudentRequest = {
  [k: string]: unknown;
};
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId = string;
/**
 * The five platform languages, in presentation order.
 */
export type DashboardLanguage = 'en' | 'kn' | 'ta' | 'te' | 'hi';
/**
 * The two age bands the user-management service stores and the guardian API uses today. Mapping from the four contract bands (`ageBand`): 5-7 -> under13, 8-10 -> under13, 11-13 -> under13 (the band can hold 13-year-olds; the consent flow treats it as under 13), 14-17 -> 13to17. The mapping is one way: a two-band value does not say which four-band value it came from. `guardianAgeBandOf` in dashboard/index.js applies it. user-management puts this value in its `ageBand` field (not in `ageBandGuardian`).
 */
export type GuardianAgeBand = 'under13' | '13to17';
/**
 * How a fresh sign-in is proved before an own erase (2.23.0): password for password accounts, TOTP when MFA is on, both when both exist, a one-time code mailed to the verified address for social-only accounts with neither.
 */
export type StepUpMethod = 'password' | 'totp' | 'password+totp' | 'email-code';
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId1 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId2 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId3 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId4 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId5 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId6 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId7 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId8 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId9 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId10 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId11 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId12 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId13 = string;
export type ReviewItemType =
  | 'help-request'
  | 'teach-back-request'
  | 'question-note'
  | 'new-weak-spot'
  | 'round-finished'
  | 'weekly-plan-check'
  | 'new-notes';
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId14 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId15 = string;
export type EventKind =
  | 'read'
  | 'listen'
  | 'revisit'
  | 'answer'
  | 'reveal'
  | 'self-check'
  | 'teach-back'
  | 'revision'
  | 'round-start'
  | 'round-complete'
  | 'note'
  | 'buddy-question'
  | 'switch'
  | 'help-request'
  | 'review-done'
  | 'activity-done'
  | 'correction';
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId16 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId17 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId18 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId19 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId20 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId21 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId22 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId23 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId24 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId25 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId26 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId27 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId28 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId29 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId30 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId31 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId32 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId33 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId34 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId35 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId36 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId37 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId38 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId39 = string;
export type LadderLabel = 'Met' | 'Tried' | 'Gets it' | 'Can explain' | 'Remembers' | 'Can use it';
/**
 * 1 Met, 2 Tried, 3 Gets it, 4 Can explain, 5 Remembers, 6 Can use it (labels: LADDER_LABELS in dashboard/index.js).
 */
export type LadderStep = number;
/**
 * Discriminated by `kind`.
 */
export type LearningEvent =
  | EventRead
  | EventListen
  | EventRevisit
  | EventAnswer
  | EventReveal
  | EventSelfCheck
  | EventTeachBack
  | EventRevision
  | EventRoundStart
  | EventRoundComplete
  | EventNote
  | EventBuddyQuestion
  | EventSwitch
  | EventHelpRequest
  | EventReviewDone
  | EventActivityDone
  | EventCorrection;
export type WeakSpotCause =
  | 'missing-foundation'
  | 'misconception'
  | 'gap'
  | 'words-without-meaning'
  | 'language-barrier'
  | 'forgot'
  | 'rushed-or-peeked';
/**
 * How a learner's notes are held (2.23.0). `none`: nothing is recorded (no link, or after a rollback). `self`: an adult learner with their own consent and no guardian; notes are private. `guarded`: a child with a guardian; the guardian reads notes saved after the claim.
 */
export type LearnerRelation = 'none' | 'self' | 'guarded';
/**
 * An ISO 8601 date-time with an offset.
 */
export type DashboardTime1 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId40 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId41 = string;
/**
 * Added in 2.23.0. Absent or true: the answer is built. `false`: a guardian's derived state is "being prepared" (the claim rule needs a re-projection that has not run yet), so the data fields are empty and the app shows a "being prepared" state instead of an empty dashboard that would read as "no progress". A 2.22 client that ignores it sees empty data.
 */
export type Ready = boolean;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId42 = string;
/**
 * 0 = not started, 1 to 6 = the ladder (LadderStep). Rules understanding-v1.
 */
export type UnderstandingStep = number;
export type ProfileKind = 'adult' | 'student';

export interface DashboardContracts {
  ClaimCodeResponse?: ClaimCodeResponse;
  ClaimStudentRequest?: ClaimStudentRequest;
  ClaimableStudentsResponse?: ClaimableStudentsResponse;
  CreateStudentProfileRequest?: CreateStudentProfileRequest;
  CreateStudentProfileResponse?: CreateStudentProfileResponse;
  DataRequestResult?: DataRequestResult;
  GiveConsentRequest?: GiveConsentRequest;
  GuardianAgeBand?: GuardianAgeBand;
  LearnerRecordConsent?: LearnerRecordConsent;
  LearnerRecordConsentRequest?: LearnerRecordConsentRequest;
  ParentGateVerifyRequest?: ParentGateVerifyRequest;
  ParentGateVerifyResponse?: ParentGateVerifyResponse;
  ParentGateVerifyResult?: ParentGateVerifyResult;
  ProfileConsent?: ProfileConsent;
  SetParentPinRequest?: SetParentPinRequest;
  StepUpCompleteRequest?: StepUpCompleteRequest;
  StepUpCompleteResponse?: StepUpCompleteResponse;
  StepUpMethod?: StepUpMethod;
  StepUpStartResponse?: StepUpStartResponse;
  StudentProfile?: StudentProfile;
  StudentProfileList?: StudentProfileList;
  SwitchStudentResponse?: SwitchStudentResponse;
  SwitchToParentResponse?: SwitchToParentResponse;
  UpdateStudentProfileRequest?: UpdateStudentProfileRequest;
  EventActivityDone?: EventActivityDone;
  EventAnswer?: EventAnswer;
  EventBuddyQuestion?: EventBuddyQuestion;
  EventCorrection?: EventCorrection;
  EventHelpRequest?: EventHelpRequest;
  EventKind?: EventKind;
  EventListen?: EventListen;
  EventNote?: EventNote;
  EventRead?: EventRead;
  EventReveal?: EventReveal;
  EventReviewDone?: EventReviewDone;
  EventRevision?: EventRevision;
  EventRevisit?: EventRevisit;
  EventRoundComplete?: EventRoundComplete;
  EventRoundStart?: EventRoundStart;
  EventSelfCheck?: EventSelfCheck;
  EventSwitch?: EventSwitch;
  EventTeachBack?: EventTeachBack;
  LadderLabel?: LadderLabel;
  LadderStep?: LadderStep;
  LearningEvent?: LearningEvent;
  NextStep?: NextStep;
  ReviewItemType?: ReviewItemType;
  WeakSpotCause?: WeakSpotCause;
  CatchUpResponse?: CatchUpResponse;
  ChangeEntry?: ChangeEntry;
  ChangesResponse?: ChangesResponse;
  CreateNoteRequest?: CreateNoteRequest;
  DeletedNote?: DeletedNote;
  EditNoteRequest?: EditNoteRequest;
  EventIntakeRequest?: EventIntakeRequest;
  EventIntakeResponse?: EventIntakeResponse;
  EventResult?: EventResult;
  LearnerEraseRequest?: LearnerEraseRequest;
  LearnerRelation?: LearnerRelation;
  LearnerStatusResponse?: LearnerStatusResponse;
  Note?: Note;
  NoteListQuery?: NoteListQuery;
  NoteListResponse?: NoteListResponse;
  NoteReply?: NoteReply;
  NoteReplyRequest?: NoteReplyRequest;
  NoteSearchRequest?: NoteSearchRequest;
  NoteSearchResponse?: NoteSearchResponse;
  NoteVersion?: NoteVersion;
  NoteVersionsResponse?: NoteVersionsResponse;
  PositionEntry?: PositionEntry;
  PositionsResponse?: PositionsResponse;
  ReviewDoneRequest?: ReviewDoneRequest;
  ReviewDoneResponse?: ReviewDoneResponse;
  ReviewItem?: ReviewItem;
  ReviewListResponse?: ReviewListResponse;
  ReviewRhythm?: ReviewRhythm;
  SelfExportNote?: SelfExportNote;
  SelfExportResponse?: SelfExportResponse;
  ChildRoundSummary?: ChildRoundSummary;
  Evidence?: Evidence;
  ExportResponse?: ExportResponse;
  Habits?: Habits;
  HomeCard?: HomeCard;
  HomeResponse?: HomeResponse;
  MapChapter?: MapChapter;
  MapResponse?: MapResponse;
  MapSection?: MapSection;
  MyLearningChapter?: MyLearningChapter;
  MyLearningResponse?: MyLearningResponse;
  MyLearningSection?: MyLearningSection;
  PendingReviews?: PendingReviews;
  PlanItem?: PlanItem;
  Ready?: Ready;
  RoundSummary?: RoundSummary;
  TopicResponse?: TopicResponse;
  UnderstandingStep?: UnderstandingStep;
  ProfileKind?: ProfileKind;
  ProfileTokenClaims?: ProfileTokenClaims;
}
/**
 * A one-time claim code, shown once; the Circle admin or a teacher hands it to the parent.
 */
export interface ClaimCodeResponse {
  code: string;
  expiresAt: DashboardTime;
}
/**
 * GET /guardians/me/claimable-students: students whose parent email matches the guardian's.
 */
export interface ClaimableStudentsResponse {
  students: {
    id: DashboardId;
    name: string;
  }[];
}
/**
 * POST /guardians/me/students: the profile and the consent in one call. `ageBandGuardian` is the same age in the two-band form user-management stores (under13 or 13to17), an optional alias next to the unchanged `ageBand`. Drift today: user-management sends and accepts the two-band value (under13 or 13to17) IN `ageBand` and does not use `ageBandGuardian`; this four-band `ageBand` and the alias are the contract's side. Convergence is tracked as a follow-up.
 */
export interface CreateStudentProfileRequest {
  name: string;
  ageBand: '5-7' | '8-10' | '11-13' | '14-17';
  language: DashboardLanguage;
  avatar?: string;
  consent: {
    version: number;
    /**
     * @minItems 1
     */
    purposes: [string, ...string[]];
  };
  ageBandGuardian?: GuardianAgeBand;
}
export interface CreateStudentProfileResponse {
  profile: StudentProfile;
  consentId: DashboardId;
}
/**
 * A student profile (a User row with kind = student). `ageBandGuardian` is the same age in the two-band form user-management stores (under13 or 13to17), an optional alias next to the unchanged `ageBand`. Drift today: user-management sends and accepts the two-band value (under13 or 13to17) IN `ageBand` and does not use `ageBandGuardian`; this four-band `ageBand` and the alias are the contract's side. Convergence is tracked as a follow-up.
 */
export interface StudentProfile {
  id: DashboardId;
  name: string;
  ageBand?: '5-7' | '8-10' | '11-13' | '14-17';
  language: DashboardLanguage;
  avatar?: string;
  guardianId: DashboardId;
  consent?: ProfileConsent;
  createdAt?: DashboardTime;
  ageBandGuardian?: GuardianAgeBand;
}
/**
 * Current consent for one profile (GET /guardians/me/students/{studentId}/consent).
 */
export interface ProfileConsent {
  version: number;
  /**
   * @minItems 1
   */
  purposes: [string, ...string[]];
  givenAt?: DashboardTime | null;
  status: 'active' | 'withdrawn' | 'none';
}
/**
 * Answer of POST .../export and .../erase.
 */
export interface DataRequestResult {
  requestId: DashboardId;
  status: 'accepted' | 'completed';
}
/**
 * POST /guardians/me/students/{studentId}/consent.
 */
export interface GiveConsentRequest {
  version: number;
  /**
   * @minItems 1
   */
  purposes: [string, ...string[]];
}
/**
 * GET and PUT answer of /learners/me/record-consent (2.23.0): the learner's current own consent.
 */
export interface LearnerRecordConsent {
  status: 'active' | 'withdrawn' | 'none';
  version?: number;
  purposes: string[];
  over18Declared: boolean;
  givenAt?: DashboardTime | null;
}
/**
 * PUT /learners/me/record-consent (2.23.0, adult token): a learner turns saving of their own notes on or off. The learner's own consent has its own text versions, separate from a guardian's. Refused for an account that may be a minor (a member of a minor Circle without an exempt role, an enrolment-consent holder, a student profile) and after an own erase (terminal).
 */
export interface LearnerRecordConsentRequest {
  state: 'active' | 'withdrawn';
  /**
   * The 18 or over declaration. Required (true) when `state` is `active`; the declaration alone is not trusted, the service also checks eligibility.
   */
  over18Declared?: boolean;
  /**
   * The own-consent text version shown to the learner. Required when `state` is `active`.
   */
  version?: number;
  /**
   * @minItems 1
   */
  purposes?: [string, ...string[]];
}
/**
 * POST /guardians/me/gate/verify and /gate/switch-to-parent. 5 wrong tries lock the account and the device for 15 minutes (PIN_LOCKED).
 */
export interface ParentGateVerifyRequest {
  pin: string;
  deviceId: string;
}
/**
 * A short-lived (at most 5 minutes) parent-elevation token. See also `ParentGateVerifyResult`, what user-management answers today.
 */
export interface ParentGateVerifyResponse {
  elevationToken: string;
  expiresInSeconds: number;
}
/**
 * What user-management answers to POST /guardians/me/gate/verify today: `ok` and the time until which the guardian acts as the parent (5 minutes). The 2.20.0 `ParentGateVerifyResponse` (elevationToken, expiresInSeconds) is kept unchanged; apps accept either until the two are merged. See also `ParentGateVerifyResponse`.
 */
export interface ParentGateVerifyResult {
  ok: true;
  elevatedUntil: DashboardTime;
}
/**
 * PUT /guardians/me/gate/pin. 4 to 6 digits. `currentPin` is required when changing an existing PIN.
 */
export interface SetParentPinRequest {
  pin: string;
  currentPin?: string;
}
/**
 * POST /learners/me/step-up/complete (2.23.0). Send exactly what `method` asks: `password`, `totpCode` or `code` (both `password` and `totpCode` for password+totp).
 */
export interface StepUpCompleteRequest {
  stepUpId: DashboardId;
  password?: string;
  totpCode?: string;
  /**
   * The 6-digit one-time code mailed for method `email-code`.
   */
  code?: string;
}
/**
 * Answer of step-up/complete (2.23.0): a single-use ticket valid for 5 minutes, bound to the step-up record and the session, that the erase call needs. A refresh grant cannot mint one.
 */
export interface StepUpCompleteResponse {
  ticket: string;
  expiresAt: DashboardTime;
}
/**
 * POST /learners/me/step-up/start (2.23.0, no body): the proof the learner must give. Limits are per user on the server (5 tries per code, one live code, 3 sends per hour and 10 per day, 15 minutes lockout after 5 failures in an hour).
 */
export interface StepUpStartResponse {
  stepUpId: DashboardId;
  method: StepUpMethod;
  expiresAt: DashboardTime;
  /**
   * Optional (2.25.0). Exactly which StepUpCompleteRequest fields the server will require for this step-up: `password` is the `password` field, `totp` is `totpCode`, `code` is the mailed `code`. Needed because `method` cannot say it all: a social-only account with MFA on needs BOTH the mailed code and the authenticator code, which `method` reports as `email-code`, so it is `["code", "totp"]`. Absent means infer from `method` as before (an older server). Clients must collect every listed proof before submitting, because a missing factor costs one try.
   *
   * @minItems 1
   */
  required?: ['password' | 'totp' | 'code', ...('password' | 'totp' | 'code')[]];
}
/**
 * GET /guardians/me/students.
 */
export interface StudentProfileList {
  students: StudentProfile[];
}
/**
 * POST /guardians/me/students/{studentId}/switch: a student-scoped token set.
 */
export interface SwitchStudentResponse {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
  profile: StudentProfile;
}
/**
 * POST /guardians/me/gate/switch-to-parent: an adult-scoped token set.
 */
export interface SwitchToParentResponse {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}
/**
 * PATCH /guardians/me/students/{studentId}: name, language, avatar only.
 */
export interface UpdateStudentProfileRequest {
  name?: string;
  language?: DashboardLanguage;
  avatar?: string;
}
/**
 * An `activity-done` event (2.22.0, AGB-1099): the parent confirms the family did a home activity ("We did it", behind the parent gate). Rules: PARENT actor only (`actor` is the constant `parent`; the server also refuses a student token); ids only, no photo, no free text and no field about the child (additionalProperties is false); idempotent by `eventId`; `sectionId` and `round` are required. The date is the event's `at`. A mistaken tap is fixed with a `correction` event. PLANNED: the progress service up to 2.21 rejects this kind (EVENT_INVALID); rules v1.1 will count it as step 6 evidence once the child is at step 4 or more, and the server will check `activityId` against the chapter context. Deployment order: publish contracts, then upgrade the progress service to 2.22, then ship an app that sends it. The progress service up to 2.21 rejects an unknown detail field (EVENT_INVALID). From 2.22 the schema accepts it; whether the service reads it is stated per field.
 */
export interface EventActivityDone {
  eventId: DashboardId1;
  profileId: DashboardId2;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  /**
   * Required for this kind: the learning round the parent confirmed it in.
   */
  round: number;
  sectionId: DashboardId3;
  blockId?: DashboardId4;
  kind: 'activity-done';
  language?: DashboardLanguage;
  style?: string;
  /**
   * Parent actor only. The progress service refuses this kind from a student actor or a student token (the same rule it applies to teach-back and review-done). The child cannot confirm.
   */
  actor: 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    activityId: DashboardId5;
    /**
     * Optional: the language(s) the family used for the activity. Never free text.
     *
     * @minItems 1
     * @maxItems 5
     */
    languages?:
      | [DashboardLanguage]
      | [DashboardLanguage, DashboardLanguage]
      | [DashboardLanguage, DashboardLanguage, DashboardLanguage]
      | [DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage]
      | [DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage];
  };
}
/**
 * A `answer` event.
 */
export interface EventAnswer {
  eventId: DashboardId6;
  profileId: DashboardId7;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'answer';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    questionId: DashboardId;
    questionType?: 'mcq' | 'text' | 'match' | 'order' | 'true-false';
    response?: string | string[];
    correct?: boolean;
    attempt: number;
    seconds?: number;
    /**
     * The answer was opened before the child tried.
     */
    openedFirst?: boolean;
    mixUpId?: DashboardId8;
    /**
     * The question is a new-case question (ladder step 6), copied from the question block's `newCase`. Optional and redundant with the chapter context; it never decides alone. PLANNED: the progress service does not read it yet. Deployment order: publish contracts, then upgrade the progress service to 2.22, then ship an app that sends it. The progress service up to 2.21 rejects an unknown detail field (EVENT_INVALID). From 2.22 the schema accepts it; whether the service reads it is stated per field.
     */
    newCase?: boolean;
  };
}
/**
 * A `buddy-question` event.
 */
export interface EventBuddyQuestion {
  eventId: DashboardId9;
  profileId: DashboardId10;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'buddy-question';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    threadId?: DashboardId;
    /**
     * The child's own question words, shown to the parent; repeats of the same question show confusion.
     */
    text: string;
    characters?: number;
  };
}
/**
 * A `correction` event. Rules the progress service applies today: (1) it may only name an earlier event of the same profile (lower seq). (2) A student may not correct a read, listen, revisit, round-start or round-complete event (the correction is ignored and counted: a child cannot lower their own furthest point or round progress); any other kind may be corrected by anyone with access. (3) Chains: corrections are judged from the latest seq down. A correction is active unless a later active correction names it, so correcting a correction restores the original and correcting that voids it again. Arrival order never matters. An active correction voids the named event for derived state (the original stays in the log). PLANNED, not applied by the service yet (it only voids): a narrower per-actor rule (a student may correct only answer, reveal, self-check, note and buddy-question; teach-back, revision and review-done only by a parent), and `replacement` (below); when applied, the active correction with the highest seq naming an event decides its detail, with no merging of several corrections.
 */
export interface EventCorrection {
  eventId: DashboardId11;
  profileId: DashboardId12;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'correction';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    correctsEventId: DashboardId;
    reason?: string;
    /**
     * PLANNED: not applied by the service yet (it only voids events), but accepted at intake. Optional corrected detail values for the event named by correctsEventId. `targetKind` is the kind of that event (any kind except `correction`) and must equal the real kind of the corrected event (checked by the server, not by this schema); `detail` holds only fields that the kind's own `detail` allows, and only the fields to change (the others keep their value). A field the target kind does not allow is rejected. Without `replacement` the correction voids the event.
     */
    replacement?:
      | {
          targetKind: 'read';
          detail: {
            imported?: boolean;
            seconds?: number;
            /**
             * 1-based position of the section in its chapter (section 1 is the first). Optional: when absent the server derives it from a sectionId of exactly s<number> (s7 is index 7). When present it wins. Only a read or listen with an index moves the chapter's furthest point. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends sectionIndex. The app must not send sectionIndex to a service still on 2.20 (it rejects the event, EVENT_INVALID).
             */
            sectionIndex?: number;
          };
        }
      | {
          targetKind: 'listen';
          detail: {
            fromSeconds?: number;
            toSeconds?: number;
            speed?: number;
            /**
             * 1-based position of the section in its chapter (section 1 is the first). Optional: when absent the server derives it from a sectionId of exactly s<number> (s7 is index 7). When present it wins. Only a read or listen with an index moves the chapter's furthest point. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends sectionIndex. The app must not send sectionIndex to a service still on 2.20 (it rejects the event, EVENT_INVALID).
             */
            sectionIndex?: number;
          };
        }
      | {
          targetKind: 'revisit';
          detail: {
            via?: 'revision' | 'map' | 'link' | 'search';
          };
        }
      | {
          targetKind: 'answer';
          detail: {
            questionId?: DashboardId;
            questionType?: 'mcq' | 'text' | 'match' | 'order' | 'true-false';
            response?: string | string[];
            correct?: boolean;
            attempt?: number;
            seconds?: number;
            /**
             * The answer was opened before the child tried.
             */
            openedFirst?: boolean;
            mixUpId?: DashboardId13;
            /**
             * The question is a new-case question (ladder step 6), copied from the question block's `newCase`. Optional and redundant with the chapter context; it never decides alone. PLANNED: the progress service does not read it yet. Deployment order: publish contracts, then upgrade the progress service to 2.22, then ship an app that sends it. The progress service up to 2.21 rejects an unknown detail field (EVENT_INVALID). From 2.22 the schema accepts it; whether the service reads it is stated per field.
             */
            newCase?: boolean;
          };
        }
      | {
          targetKind: 'reveal';
          detail: {
            what?: 'answer' | 'hint' | 'explanation';
            questionId?: DashboardId;
            /**
             * True when the answer was shown before the child tried.
             */
            beforeAttempt?: boolean;
          };
        }
      | {
          targetKind: 'self-check';
          detail: {
            rating?: 'got-it' | 'not-sure' | 'not-yet';
          };
        }
      | {
          targetKind: 'teach-back';
          detail: {
            mode?: 'requested' | 'done';
            /**
             * @maxItems 20
             */
            checklist?:
              | []
              | [
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ]
              | [
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  },
                  {
                    itemId: string;
                    met: boolean;
                  }
                ];
            outcome?: 'understood' | 'words-only' | 'gap' | 'misconception';
            /**
             * Whether the child said the key English words while explaining. true: the child said the key English words (understanding shown in the home language counts as understood). false: the child did NOT say the key English words (a language-barrier signal when the explanation was in a non-English language: right idea, key words missing). Absent: unknown, counts as understood. Field name kept from 2.20.0; only the description is corrected.
             */
            keyWordsInEnglish?: boolean;
          };
        }
      | {
          targetKind: 'revision';
          detail: {
            outcome?: 'remembered' | 'partly' | 'forgot';
            dueAt?: DashboardTime;
          };
        }
      | {
          targetKind: 'round-start';
          detail: {};
        }
      | {
          targetKind: 'round-complete';
          detail: {
            sectionsRead?: number;
            /**
             * Total number of sections in the chapter (sectionsRead is the number read this round). The server checks the reading half itself: the round counts as complete only when at least this many distinct sections were read, otherwise the event is ignored and counted.
             */
            sectionsTotal?: number;
            /**
             * Total number of practice questions in the chapter (0 when none). Recorded; the practice half is verified by the server once the chapter's practice count is known. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends practiceTotal. The app must not send practiceTotal to a service still on 2.20 (it rejects the event, EVENT_INVALID).
             */
            practiceTotal?: number;
          };
        }
      | {
          targetKind: 'note';
          detail: {
            noteId?: DashboardId;
            action?: 'create' | 'edit' | 'delete';
            version?: number;
            tag?: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
            text?: string;
            quote?: string;
          };
        }
      | {
          targetKind: 'buddy-question';
          detail: {
            threadId?: DashboardId;
            /**
             * The child's own question words, shown to the parent; repeats of the same question show confusion.
             */
            text?: string;
            characters?: number;
          };
        }
      | {
          targetKind: 'switch';
          detail: {
            what?: 'language' | 'style';
            from?: string;
            to?: string;
          };
        }
      | {
          targetKind: 'help-request';
          detail: {
            message?: string;
          };
        }
      | {
          targetKind: 'review-done';
          detail: {
            reviewItemId?: DashboardId;
            reviewType?: ReviewItemType;
          };
        }
      | {
          targetKind: 'activity-done';
          detail: {
            activityId?: DashboardId;
            /**
             * @minItems 1
             * @maxItems 5
             */
            languages?:
              | [DashboardLanguage]
              | [DashboardLanguage, DashboardLanguage]
              | [DashboardLanguage, DashboardLanguage, DashboardLanguage]
              | [DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage]
              | [DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage, DashboardLanguage];
          };
        };
    /**
     * Added in 2.23.0. SET BY THE SERVER ONLY: this correction targets a note that was deleted, so its `reason` and `replacement.detail.text` / `quote` were blanked (redaction, TA D18). Intake refuses it from a client, like `redacted` on a note event. Because `reason` is removed, `reason` is required only when `redacted` is absent (a 2.22 correction always has it).
     */
    redacted?: true;
  };
}
/**
 * A `help-request` event.
 */
export interface EventHelpRequest {
  eventId: DashboardId14;
  profileId: DashboardId15;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'help-request';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    message?: string;
  };
}
/**
 * A `listen` event.
 */
export interface EventListen {
  eventId: DashboardId16;
  profileId: DashboardId17;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'listen';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    fromSeconds: number;
    toSeconds: number;
    speed?: number;
    /**
     * 1-based position of the section in its chapter (section 1 is the first). Optional: when absent the server derives it from a sectionId of exactly s<number> (s7 is index 7). When present it wins. Only a read or listen with an index moves the chapter's furthest point. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends sectionIndex. The app must not send sectionIndex to a service still on 2.20 (it rejects the event, EVENT_INVALID).
     */
    sectionIndex?: number;
  };
}
/**
 * A `note` event. 2.23.0 adds the optional `quoteOffset` (create and edit) and the server-set, read-only `redacted: true`; no new actions and no new actors.
 */
export interface EventNote {
  eventId: DashboardId18;
  profileId: DashboardId19;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'note';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    noteId: DashboardId;
    action: 'create' | 'edit' | 'delete';
    version?: number;
    tag?: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
    text?: string;
    quote?: string;
    /**
     * Added in 2.23.0. Character offset of `quote` inside the block text (0 or more), so the pin survives a style or language switch and the editor can reopen at the exact place. Sent on `create` and `edit` only; the service ignores it on `delete`. Optional: a 2.22 event without it is unchanged. If the block is missing, the app falls to the nearest block with a notice.
     */
    quoteOffset?: number;
    /**
     * Added in 2.23.0. SET BY THE SERVER ONLY: a deleted note's `text` and `quote` were blanked (redaction) and this marks the event. It appears on events read back through `/changes` and export so they still validate against `LearningEvent`. A client must never send it: intake refuses it with an explicit check after schema validation, on both `/events` and `/events/parent` (the schema allows the field only because server-written events carry it). A create carrying it is a blank shell of a deleted note (tombstone).
     */
    redacted?: true;
  };
}
/**
 * A `read` event.
 */
export interface EventRead {
  eventId: DashboardId20;
  profileId: DashboardId21;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'read';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    imported?: boolean;
    seconds?: number;
    /**
     * 1-based position of the section in its chapter (section 1 is the first). Optional: when absent the server derives it from a sectionId of exactly s<number> (s7 is index 7). When present it wins. Only a read or listen with an index moves the chapter's furthest point. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends sectionIndex. The app must not send sectionIndex to a service still on 2.20 (it rejects the event, EVENT_INVALID).
     */
    sectionIndex?: number;
  };
}
/**
 * A `reveal` event.
 */
export interface EventReveal {
  eventId: DashboardId22;
  profileId: DashboardId23;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'reveal';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    what: 'answer' | 'hint' | 'explanation';
    questionId?: DashboardId;
    /**
     * True when the answer was shown before the child tried.
     */
    beforeAttempt?: boolean;
  };
}
/**
 * A `review-done` event.
 */
export interface EventReviewDone {
  eventId: DashboardId24;
  profileId: DashboardId25;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'review-done';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    reviewItemId: DashboardId;
    reviewType?: ReviewItemType;
  };
}
/**
 * A `revision` event.
 */
export interface EventRevision {
  eventId: DashboardId26;
  profileId: DashboardId27;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'revision';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    outcome: 'remembered' | 'partly' | 'forgot';
    dueAt?: DashboardTime;
  };
}
/**
 * A `revisit` event.
 */
export interface EventRevisit {
  eventId: DashboardId28;
  profileId: DashboardId29;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'revisit';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    via?: 'revision' | 'map' | 'link' | 'search';
  };
}
/**
 * A `round-complete` event. Who may send it: the student actor only (`actor` = student, with the student's own token). The server verifies the claim (sections read, and practice when known) and ignores and counts a round-complete from any other actor or that fails the check; a parent or the system never completes a round for the child.
 */
export interface EventRoundComplete {
  eventId: DashboardId30;
  profileId: DashboardId31;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'round-complete';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    sectionsRead: number;
    /**
     * Total number of sections in the chapter (sectionsRead is the number read this round). The server checks the reading half itself: the round counts as complete only when at least this many distinct sections were read, otherwise the event is ignored and counted.
     */
    sectionsTotal?: number;
    /**
     * Total number of practice questions in the chapter (0 when none). Recorded; the practice half is verified by the server once the chapter's practice count is known. Deployment order: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends practiceTotal. The app must not send practiceTotal to a service still on 2.20 (it rejects the event, EVENT_INVALID).
     */
    practiceTotal?: number;
  };
}
/**
 * A `round-start` event.
 */
export interface EventRoundStart {
  eventId: DashboardId32;
  profileId: DashboardId33;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'round-start';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {};
}
/**
 * A `self-check` event.
 */
export interface EventSelfCheck {
  eventId: DashboardId34;
  profileId: DashboardId35;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'self-check';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    rating: 'got-it' | 'not-sure' | 'not-yet';
  };
}
/**
 * A `switch` event.
 */
export interface EventSwitch {
  eventId: DashboardId36;
  profileId: DashboardId37;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'switch';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    what: 'language' | 'style';
    from?: string;
    to: string;
  };
}
/**
 * A `teach-back` event.
 */
export interface EventTeachBack {
  eventId: DashboardId38;
  profileId: DashboardId39;
  knowledgeId?: DashboardId;
  contentVersion?: string;
  round?: number;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  kind: 'teach-back';
  language?: DashboardLanguage;
  style?: string;
  actor: 'student' | 'parent';
  actorId: DashboardId;
  at: DashboardTime;
  detail: {
    mode: 'requested' | 'done';
    /**
     * @maxItems 20
     */
    checklist?:
      | []
      | [
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ]
      | [
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          },
          {
            itemId: string;
            met: boolean;
          }
        ];
    outcome?: 'understood' | 'words-only' | 'gap' | 'misconception';
    /**
     * Whether the child said the key English words while explaining. true: the child said the key English words (understanding shown in the home language counts as understood). false: the child did NOT say the key English words (a language-barrier signal when the explanation was in a non-English language: right idea, key words missing). Absent: unknown, counts as understood. Field name kept from 2.20.0; only the description is corrected.
     */
    keyWordsInEnglish?: boolean;
  };
}
/**
 * What the dashboard suggests doing next.
 */
export interface NextStep {
  kind:
    | 'read-section'
    | 'mix-up-card'
    | 'another-way'
    | 'clip'
    | 'switch-style'
    | 'switch-language'
    | 'teach-back'
    | 'revision'
    | 'stretch-question'
    | 'activity'
    | 'next-chapter'
    | 'try-question'
    | 'ask-help';
  knowledgeId?: DashboardId;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  /**
   * Target style or language code for switch-style and switch-language.
   */
  to?: string;
}
/**
 * GET /guardians/me/catch-up: the three that matter most.
 */
export interface CatchUpResponse {
  /**
   * @maxItems 3
   */
  items: [] | [ReviewItem] | [ReviewItem, ReviewItem] | [ReviewItem, ReviewItem, ReviewItem];
}
export interface ReviewItem {
  id: DashboardId;
  guardianId: DashboardId;
  profileId: DashboardId;
  type: ReviewItemType;
  refKey: string;
  createdAt: DashboardTime;
  dueAt: DashboardTime;
  doneAt?: DashboardTime | null;
  priority: number;
}
export interface ChangeEntry {
  seq: number;
  event: LearningEvent;
}
/**
 * GET /students/{studentId}/changes?since={cursor}. An old cursor answers CURSOR_EXPIRED.
 */
export interface ChangesResponse {
  changes: ChangeEntry[];
  /**
   * Pass as ?since= next time.
   */
  cursor: string;
  hasMore: boolean;
}
/**
 * POST /students/{id}/notes.
 */
export interface CreateNoteRequest {
  knowledgeId: DashboardId;
  sectionId: DashboardId;
  blockId?: DashboardId;
  quote?: string;
  tag: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  text: string;
  /**
   * Added in 2.23.0. Character offset of `quote` inside the block text (0 or more), so the pin survives a style or language switch and the editor can reopen at the exact place. Sent on `create` and `edit` only; the service ignores it on `delete`. Optional: a 2.22 event without it is unchanged. If the block is missing, the app falls to the nearest block with a notice.
   */
  quoteOffset?: number;
}
/**
 * A deleted note in an export (2.23.0): its id and deletion time only; the text and quote are redacted and never exported.
 */
export interface DeletedNote {
  id: DashboardId;
  deletedAt: DashboardTime;
}
/**
 * PATCH /students/{id}/notes/{noteId}: makes a new version. DELETE has no body.
 */
export interface EditNoteRequest {
  tag?: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  text?: string;
  /**
   * Added in 2.23.0. Character offset of `quote` inside the block text (0 or more), so the pin survives a style or language switch and the editor can reopen at the exact place. Sent on `create` and `edit` only; the service ignores it on `delete`. Optional: a 2.22 event without it is unchanged. If the block is missing, the app falls to the nearest block with a notice.
   */
  quoteOffset?: number;
}
/**
 * POST /events (student token) and POST /events/parent (parent token). At most BATCH_MAX = 50 events; more is BATCH_TOO_LARGE.
 */
export interface EventIntakeRequest {
  /**
   * @minItems 1
   * @maxItems 50
   */
  events: [LearningEvent, ...LearningEvent[]];
}
/**
 * One result per event, in request order.
 */
export interface EventIntakeResponse {
  /**
   * @minItems 1
   * @maxItems 50
   */
  results: [EventResult, ...EventResult[]];
}
/**
 * Per-event outcome. `error` is present only when result is error (for example EVENT_INVALID). From 2.23.0 an error is one of EVENT_INVALID (permanent), EVENT_KIND_NOT_ALLOWED (permanent: a self learner sent a kind other than note), LINK_ERASED (permanent) or SCHEMA_UNSUPPORTED (version skew: keep the event and retry after an app update). Unknown codes must be treated like SCHEMA_UNSUPPORTED.
 */
export interface EventResult {
  eventId: DashboardId;
  result: 'accepted' | 'duplicate' | 'error';
  error?: DashboardApiError;
}
/**
 * Error body. `code` is one of dashboard-errors.json or a shared registry code. No child data and no PIN ever appears in `message` or `details`.
 */
export interface DashboardApiError {
  code: string;
  message: string;
  details?: {};
}
/**
 * POST /learners/me/learning-record/erase (2.23.0, adult token): permanent and terminal for the account. The body carries the single-use step-up ticket from step-up/complete; the answer is DataRequestResult. A missing, expired or used ticket is STEP_UP_REQUIRED.
 */
export interface LearnerEraseRequest {
  ticket: string;
}
/**
 * GET /learners/me/status (2.23.0). With no link row at all the service answers 200 `{ relation: "none", recording: "off", guardianVisible: false, guardianSince: null }`.
 */
export interface LearnerStatusResponse {
  relation: LearnerRelation;
  /**
   * Whether the service accepts note events now. Documented values: `active` (accepted) and `off` (not accepted). A string so a newer server value never fails a strict client; treat anything but `active` as off.
   */
  recording: string;
  /**
   * True when a guardian can read notes saved from now on.
   */
  guardianVisible: boolean;
  /**
   * The server sequence watermark of the claim: the guardian sees only notes created after it. A new value tells the app to show the one-time claim sheet before it flushes the outbox. 0 for a guarded profile with nothing older; null for `none` and `self`.
   */
  guardianSince: number | null;
}
export interface Note {
  id: DashboardId;
  knowledgeId: DashboardId;
  sectionId: DashboardId;
  blockId?: DashboardId;
  quote?: string;
  tag: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  text: string;
  createdAt: DashboardTime;
  latestVersion: number;
  replies?: NoteReply[];
  /**
   * Added in 2.23.0. Who can read this note, computed at read time. Documented values: `only-me` (a learner without a guardian) and `guardian` (a guarded learner: the guardian sees notes saved after the claim). A later release may add values, so readers must tolerate an unknown string; deliberately not a closed enum.
   */
  audience?: string;
  /**
   * Added in 2.23.0. True when the learner's guardian can read this note under the claim rule (a note written before the claim stays private). Computed at read time.
   */
  guardianVisible?: boolean;
  /**
   * Added in 2.23.0. Character offset of `quote` inside the block text, read back so the app can reopen at the pin. Absent when the note has none.
   */
  quoteOffset?: number;
  /**
   * Added in 2.26.0 (what the server has always sent). The note thread state: `open` (no reply yet), `replied` (a guardian replied), `resolved`. Optional: a client must not require it.
   */
  status?: 'open' | 'replied' | 'resolved';
  /**
   * Added in 2.26.0. The i18n key of `status`, always `notes.status.<status>`.
   */
  statusKey?: string;
  /**
   * Added in 2.26.0. The i18n key of `tag`: the tag lower-cased, apostrophes dropped, other runs of non-alphanumerics as `_` (`Rough note` is `notes.tag.rough_note`, `I don't get this` is `notes.tag.i_dont_get_this`).
   */
  tagKey?: string;
  /**
   * Added in 2.26.0. True when the note has more than one version (`latestVersion` above 1).
   */
  edited?: boolean;
  updatedAt?: DashboardTime1;
}
export interface NoteReply {
  id: DashboardId;
  noteId: DashboardId;
  guardianId: DashboardId;
  text?: string;
  reaction?: string;
  at: DashboardTime;
}
/**
 * Query parameters of the notes list (2.23.0), shown as an object. There is no `q`: search is a POST (NoteSearchRequest), so note text never reaches a URL.
 */
export interface NoteListQuery {
  chapter?: DashboardId;
  tag?: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  cursor?: string;
  limit?: number;
  /**
   * Added in 2.27.0. Only notes created on or after this day (ISO date YYYY-MM-DD, inclusive, UTC day start 00:00:00.000Z). Optional. A real calendar date; an invalid date, or createdFrom after createdTo, is a 400 VALIDATION_ERROR. It only narrows the result: a guardian still sees only notes created after the claim.
   */
  createdFrom?: string;
  /**
   * Added in 2.27.0. Only notes created on or before this day (ISO date YYYY-MM-DD, inclusive, UTC day end 23:59:59.999Z). Optional. Same rules as createdFrom.
   */
  createdTo?: string;
}
/**
 * GET /students/{id}/notes and GET /learners/me/notes (filters: chapter, tag, and from 2.23.0 `cursor` and `limit`, see NoteListQuery). Newest first; no repeats or skips between pages.
 */
export interface NoteListResponse {
  notes: Note[];
  /**
   * Added in 2.23.0. The documented paging field: pass as `cursor` for the next (older) page; null or absent on the last page. The progress service returns both `cursor` and `nextCursor` with the same value; clients should read `cursor`. Absent means a 2.22 server (everything in one answer).
   */
  cursor?: string | null;
  studentId?: DashboardId40;
  /**
   * Added in 2.26.0. An alias of `cursor` that the progress service also sends (always the same value). Optional; clients should read `cursor`.
   */
  nextCursor?: string | null;
}
/**
 * POST /students/{id}/notes/{noteId}/replies: text, a reaction, or both.
 */
export interface NoteReplyRequest {
  text?: string;
  reaction?: string;
}
/**
 * POST /learners/me/notes/search (2.23.0). A POST so that note-derived text never reaches a URL, Kong or access logs; there is no GET `q`. The service never logs this body. `q` is NFC-normalised and matched as a case-insensitive substring over `text` and `quote` of the caller's own notes.
 */
export interface NoteSearchRequest {
  q: string;
  sectionId?: DashboardId;
  /**
   * The `cursor` of the previous page.
   */
  cursor?: string;
  limit?: number;
  /**
   * Added in 2.27.0. Only notes created on or after this day (ISO date YYYY-MM-DD, inclusive, UTC day start 00:00:00.000Z). Optional. A real calendar date; an invalid date, or createdFrom after createdTo, is a 400 VALIDATION_ERROR. It only narrows the result: a guardian still sees only notes created after the claim.
   */
  createdFrom?: string;
  /**
   * Added in 2.27.0. Only notes created on or before this day (ISO date YYYY-MM-DD, inclusive, UTC day end 23:59:59.999Z). Optional. Same rules as createdFrom.
   */
  createdTo?: string;
}
/**
 * Answer of POST /learners/me/notes/search (2.23.0): newest first; no repeats or skips between pages. A learner with no link row gets an empty list (200).
 */
export interface NoteSearchResponse {
  notes: Note[];
  /**
   * The documented paging field: pass as `cursor` for the next page; null or absent on the last page. The progress service returns both `cursor` and `nextCursor` with the same value; clients should read `cursor`.
   */
  cursor?: string | null;
  studentId?: DashboardId41;
  /**
   * Added in 2.26.0. An alias of `cursor` that the progress service also sends (always the same value). Optional; clients should read `cursor`.
   */
  nextCursor?: string | null;
}
export interface NoteVersion {
  version: number;
  text: string;
  tag: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  at: DashboardTime;
}
/**
 * GET /learners/me/notes/{noteId}/versions and GET /students/{id}/notes/{noteId}/versions (2.23.0): the versions of one note, oldest first, replayed from its events. A deleted note is a tombstone and answers 404, never this shape.
 */
export interface NoteVersionsResponse {
  noteId: DashboardId;
  /**
   * @minItems 1
   */
  versions: [NoteVersion, ...NoteVersion[]];
}
export interface PositionEntry {
  knowledgeId: DashboardId;
  round: number;
  furthestIndex: number;
  furthestSectionId: DashboardId;
  lastSectionId?: DashboardId;
  readSections: DashboardId[];
  total?: number;
  lastOpenedAt: DashboardTime;
}
/**
 * GET /students/{studentId}/positions.
 */
export interface PositionsResponse {
  studentId: DashboardId;
  positions: PositionEntry[];
}
/**
 * POST /guardians/me/reviews/{itemId}/done.
 */
export interface ReviewDoneRequest {
  note?: string;
}
/**
 * Marks done and writes a review-done event.
 */
export interface ReviewDoneResponse {
  item: ReviewItem;
  eventId: DashboardId;
}
/**
 * GET /guardians/me/reviews?student=: oldest first.
 */
export interface ReviewListResponse {
  items: ReviewItem[];
  counts?: {
    [k: string]: number;
  };
  lastReviewAt?: DashboardTime | null;
  ready?: Ready;
}
/**
 * PUT /guardians/me/review-rhythm (days 0 = Sunday).
 */
export interface ReviewRhythm {
  /**
   * @maxItems 7
   */
  days:
    | []
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number]
    | [number, number, number, number, number, number]
    | [number, number, number, number, number, number, number];
  minuteOfDay: number;
  channel: 'push' | 'email' | 'none';
  timezone: string;
}
/**
 * A live note in a learner's own export (2.23.0), with all its versions. No other person's id or name appears: guardian replies are not part of the self export.
 */
export interface SelfExportNote {
  id: DashboardId;
  knowledgeId: DashboardId;
  sectionId: DashboardId;
  blockId?: DashboardId;
  quote?: string;
  /**
   * Added in 2.23.0. Character offset of `quote` inside the block text (0 or more), so the pin survives a style or language switch and the editor can reopen at the exact place. Sent on `create` and `edit` only; the service ignores it on `delete`. Optional: a 2.22 event without it is unchanged. If the block is missing, the app falls to the nearest block with a notice.
   */
  quoteOffset?: number;
  tag: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  text: string;
  createdAt: DashboardTime;
  latestVersion: number;
  /**
   * @minItems 1
   */
  versions: [NoteVersion, ...NoteVersion[]];
}
/**
 * POST /students/{id}/export when `id` is the caller's own id (2.23.0; self learners only: a guarded child cannot export their own notes, the guardian does). Restricted shape: the learner's own notes with versions, deleted notes as `{ id, deletedAt }`, no other person's id or name. With no link row the export is an empty document (`notes: []`). Own export stays open for a withdrawn or `none` link.
 */
export interface SelfExportResponse {
  learnerId: DashboardId42;
  exportedAt: DashboardTime;
  notes: (SelfExportNote | DeletedNote)[];
}
/**
 * RoundSummary without the parent-judged teach-back count (my-learning shows the child's own numbers only).
 */
export interface ChildRoundSummary {
  round: number;
  sectionsRead: number;
  sectionsTotal: number | null;
  questionsAnswered: number;
  rightFirstTime: number;
}
/**
 * One event behind a topic's state, resolved to its kind, actor, date, the server's round and a label key; never the content.
 */
export interface Evidence {
  eventId: DashboardId;
  /**
   * The kind of the event (an EventKind such as `answer`, `teach-back`, `revision`). A string: a newer server may send a kind not listed in EventKind.
   */
  kind: string;
  /**
   * `student` or `parent` today. A string: a newer server may send another actor.
   */
  actor: string;
  at: DashboardTime;
  /**
   * The server's round (the last round that started at or before the event), not the event's own tag.
   */
  round: number;
  /**
   * e.g. `evidence.answer.right_first_time`.
   */
  labelKey: string;
}
/**
 * POST /students/{studentId}/export (parent only): everything held about the child as one JSON document, sent as an attachment `progress-export.json`. Refused with EXPORT_TOO_LARGE (413) above 20,000 events.
 */
export interface ExportResponse {
  studentId: DashboardId;
  exportedAt: DashboardTime;
  events: ExportEvent[];
  /**
   * Derived rows as stored (rebuildable from the events); their columns follow the service's tables and may grow, so only the container is typed.
   */
  positions: {}[];
  /**
   * Derived rows as stored (rebuildable from the events); their columns follow the service's tables and may grow, so only the container is typed.
   */
  rounds: {}[];
  /**
   * Derived rows as stored (rebuildable from the events); their columns follow the service's tables and may grow, so only the container is typed. Omitted when `derivedPending` is true (2.23.0).
   */
  sectionStates?: {}[];
  /**
   * Derived rows as stored (rebuildable from the events); their columns follow the service's tables and may grow, so only the container is typed. Omitted when `derivedPending` is true (2.23.0); note-derived, because a note adds a chapter and a round summary.
   */
  roundSummaries?: {}[];
  /**
   * Retention summaries (reading evidence kept after the 2-year detail window).
   */
  summaries: {}[];
  /**
   * Added in 2.23.0. True when the guardian's derived state is not ready: exactly `sectionStates`, `roundSummaries`, `reviews` and `reviewSnoozes` are then omitted. `summaries`, `positions` and `rounds` stay. 2.22 consumers must tolerate the absent sections.
   */
  derivedPending?: boolean;
  /**
   * Added in 2.23.0 to the schema. Derived review rows as stored; omitted when `derivedPending` is true.
   */
  reviews?: {}[];
  /**
   * Added in 2.23.0 to the schema. Derived review snooze rows as stored; omitted when `derivedPending` is true.
   */
  reviewSnoozes?: {}[];
  /**
   * Added in 2.23.0. The learner's notes as the service holds them; a deleted note is `{ id, deletedAt }`. For a guardian the claim rule applies (notes before the claim are left out); the service decides, so this stays optional like the derived parts.
   */
  notes?: (Note | DeletedNote)[];
  /**
   * Added in 2.23.0. Guardian replies to the exported notes (claim rule applied); replies of a deleted note are redacted and left out.
   */
  noteReplies?: NoteReply[];
}
/**
 * An event with its server sequence number.
 */
export interface ExportEvent {
  seq: number;
  event: LearningEvent;
}
/**
 * Effort signals. `peeks` and `repeatedBuddyQuestions` are parent-only diagnostics (signs of difficulty, not effort): never show them as habits.
 */
export interface Habits {
  retriesEndedRight: number;
  revisits: number;
  revisionsKept: number;
  revisionsOnTime: number;
  buddyQuestions: number;
  repeatedBuddyQuestions: number;
  helpRequests: number;
  switches: number;
  notes: number;
  selfChecks: number;
  peeks: number;
}
/**
 * One card on the parent home: a win or something to help with.
 */
export interface HomeCard {
  knowledgeId: DashboardId;
  sectionId: DashboardId;
  step: UnderstandingStep;
  reasonKey: string;
  cause: WeakSpotCause | null;
  causeReasonKey: string | null;
  nextStep: NextStep | null;
  evidenceCount: number;
}
/**
 * GET /students/{studentId}/home?tz= (parent). `tz` is an IANA-style name of at most 64 characters (an unknown zone falls back to UTC).
 */
export interface HomeResponse {
  studentId: DashboardId;
  rulesVersion: string;
  win: HomeCard | null;
  helpWith: HomeCard | null;
  next: NextStep | null;
  revisionDueToday: number;
  /**
   * @maxItems 3
   */
  tonightPlan: [] | [PlanItem] | [PlanItem, PlanItem] | [PlanItem, PlanItem, PlanItem];
  pendingReviews: PendingReviews;
  ready?: Ready;
}
/**
 * A next step with the minutes it takes (tonight's plan).
 */
export interface PlanItem {
  /**
   * A NextStep kind (read-section, mix-up-card, another-way, clip, switch-style, switch-language, teach-back, revision, stretch-question, activity, next-chapter, try-question, ask-help today). A string: a newer server may send another.
   */
  kind: string;
  knowledgeId?: DashboardId;
  sectionId?: DashboardId;
  blockId?: DashboardId;
  /**
   * Target style or language code for switch-style and switch-language.
   */
  to?: string;
  /**
   * Minutes the step takes.
   */
  minutes: number;
}
/**
 * A typed placeholder until the review queue ships (AGB-1075): show it only when `available` is true.
 */
export interface PendingReviews {
  available: boolean;
  count: number;
  oldestDueAt: DashboardTime | null;
}
/**
 * One chapter on the map.
 */
export interface MapChapter {
  knowledgeId: DashboardId;
  rounds: RoundSummary[];
  sections: MapSection[];
}
/**
 * Numbers of one round of one chapter. A child is compared only with their own earlier rounds.
 */
export interface RoundSummary {
  round: number;
  sectionsRead: number;
  sectionsTotal: number | null;
  questionsAnswered: number;
  rightFirstTime: number;
  teachBacksUnderstood: number;
}
/**
 * One section on the parent's map.
 */
export interface MapSection {
  sectionId: DashboardId;
  step: UnderstandingStep;
  /**
   * `ladder.step.<n>`: the name of the step. A string; known today: ladder.step.0 to ladder.step.6.
   */
  stepKey: string;
  /**
   * Why the step, an i18n key such as `ladder.gets_answers_not_explained.reason`.
   */
  reasonKey: string;
  /**
   * i18n key of the section's state (parent view). A string: a newer server may send a value not listed. Known today: state.not_started, state.in_progress, state.needs_help, state.strength.
   */
  stateKey: string;
  strength: boolean;
  needsHelp: boolean;
  /**
   * i18n keys for progress the ladder does not count yet. Known: `progress.remembered_not_explained` (right at a revision after a gap, no parent-judged explanation yet) and `progress.stretch_right_not_counted_yet` (a stretch or new-case answer was right, below step 6). Never in the child's view.
   */
  noteKeys: string[];
  due: boolean;
  revisionDueAt: DashboardTime | null;
}
/**
 * GET /students/{studentId}/map (parent). All texts are i18n keys, never sentences. ETag with 304; Cache-Control private, no-cache.
 */
export interface MapResponse {
  studentId: DashboardId;
  /**
   * The understanding rules that produced this answer, e.g. `understanding-v1`.
   */
  rulesVersion: string;
  chapters: MapChapter[];
  ready?: Ready;
}
/**
 * One chapter in the child's own view.
 */
export interface MyLearningChapter {
  knowledgeId: DashboardId;
  rounds: ChildRoundSummary[];
  sections: MyLearningSection[];
}
/**
 * One section in the child's own view. No cause, no evidence, no parent judgement.
 */
export interface MyLearningSection {
  sectionId: DashboardId;
  step: UnderstandingStep;
  /**
   * `learning.step.<n>`: "I've met it" to "I can use it", in the child's words. A string; known today: learning.step.0 to learning.step.6.
   */
  stepKey: string;
  /**
   * Child-friendly state. `not_yet` is the strongest negative and is used only where the child's own self-check said not-yet or a wrong answer came after a retry; every other reason is the gentler `look_again`. A string: a newer server may send a value not listed. Known today: learning.state.not_started, learning.state.climbing, learning.state.look_again, learning.state.not_yet, learning.state.going_well.
   */
  stateKey: string;
  /**
   * @maxItems 3
   */
  nextSteps: [] | [NextStep] | [NextStep, NextStep] | [NextStep, NextStep, NextStep];
}
/**
 * GET /students/{studentId}/my-learning: the only read a student token may call. Teachers read nothing; another parent or child gets 403.
 */
export interface MyLearningResponse {
  studentId: DashboardId;
  rulesVersion: string;
  chapters: MyLearningChapter[];
  ready?: Ready;
}
/**
 * GET /students/{studentId}/topics/{knowledgeId}/{sectionId} (parent). An unopened section is step 0, not started.
 */
export interface TopicResponse {
  studentId: DashboardId;
  knowledgeId: DashboardId;
  sectionId: DashboardId;
  rulesVersion: string;
  step: UnderstandingStep;
  /**
   * `ladder.step.<n>`: the name of the step. A string; known today: ladder.step.0 to ladder.step.6.
   */
  stepKey: string;
  /**
   * Why the step, an i18n key such as `ladder.gets_answers_not_explained.reason`.
   */
  reasonKey: string;
  /**
   * i18n key of the section's state (parent view). A string: a newer server may send a value not listed. Known today: state.not_started, state.in_progress, state.needs_help, state.strength.
   */
  stateKey: string;
  cause: WeakSpotCause | null;
  causeReasonKey: string | null;
  strength: boolean;
  /**
   * A difficulty sign with no single cause (help request, "I don't get this" note, not-yet, repeated Buddy question, repeated unclassified wrong answers).
   */
  difficulty: boolean;
  /**
   * Right at a revision after a gap, but no parent-judged explanation yet. Shown as `progress.remembered_not_explained` in noteKeys.
   */
  rememberedWithoutExplanation: boolean;
  /**
   * A stretch or new-case answer or teach-back was right, below step 6. Shown as `progress.stretch_right_not_counted_yet` in noteKeys.
   */
  stretchRight: boolean;
  /**
   * i18n keys for progress the ladder does not count yet. Known: `progress.remembered_not_explained` (right at a revision after a gap, no parent-judged explanation yet) and `progress.stretch_right_not_counted_yet` (a stretch or new-case answer was right, below step 6). Never in the child's view.
   */
  noteKeys: string[];
  /**
   * Oldest first, the newest 12 kept.
   *
   * @maxItems 12
   */
  evidence:
    | []
    | [Evidence]
    | [Evidence, Evidence]
    | [Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence, Evidence]
    | [
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence,
        Evidence
      ];
  /**
   * @maxItems 3
   */
  nextSteps: [] | [NextStep] | [NextStep, NextStep] | [NextStep, NextStep, NextStep];
  nextCheckAt: DashboardTime | null;
  intervalDays: number | null;
  understoodAt: DashboardTime | null;
  habits: Habits;
  rounds: RoundSummary[];
  ready?: Ready;
}
/**
 * The additional claims only; the token carries its other claims (sub, scope, exp, ...) unchanged. For a student token `sub` is the student's own subject id, `guardian` the parent's subject id.
 */
export interface ProfileTokenClaims {
  profile?: ProfileKind;
  /**
   * The parent's subject id. Present on student tokens.
   */
  guardian?: string;
  /**
   * The consent version the profile was switched in under.
   */
  consent_v?: number;
  [k: string]: unknown;
}
