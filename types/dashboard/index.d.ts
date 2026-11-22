/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from schemas/dashboard/*.schema.json by scripts/generate-dashboard-types.js.
 * Run `npm run generate:dashboard-types` after changing a schema, then commit the result.
 */

/**
 * The five platform languages, in presentation order.
 */
export type DashboardLanguage = 'en' | 'kn' | 'ta' | 'te' | 'hi';
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId = string;
/**
 * An ISO 8601 date-time with an offset.
 */
export type DashboardTime = string;
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
  | 'correction';
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
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId14 = string;
/**
 * An opaque id: a user subject (usr_...), a client-made event id, a note id.
 */
export type DashboardId15 = string;
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
  | EventCorrection;
export type WeakSpotCause =
  | 'missing-foundation'
  | 'misconception'
  | 'gap'
  | 'words-without-meaning'
  | 'language-barrier'
  | 'forgot'
  | 'rushed-or-peeked';
export type ProfileKind = 'adult' | 'student';

export interface DashboardContracts {
  CreateStudentProfileRequest?: CreateStudentProfileRequest;
  CreateStudentProfileResponse?: CreateStudentProfileResponse;
  DataRequestResult?: DataRequestResult;
  GiveConsentRequest?: GiveConsentRequest;
  ParentGateVerifyRequest?: ParentGateVerifyRequest;
  ParentGateVerifyResponse?: ParentGateVerifyResponse;
  ProfileConsent?: ProfileConsent;
  SetParentPinRequest?: SetParentPinRequest;
  StudentProfile?: StudentProfile;
  StudentProfileList?: StudentProfileList;
  SwitchStudentResponse?: SwitchStudentResponse;
  SwitchToParentResponse?: SwitchToParentResponse;
  UpdateStudentProfileRequest?: UpdateStudentProfileRequest;
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
  EditNoteRequest?: EditNoteRequest;
  EventIntakeRequest?: EventIntakeRequest;
  EventIntakeResponse?: EventIntakeResponse;
  EventResult?: EventResult;
  Note?: Note;
  NoteListResponse?: NoteListResponse;
  NoteReply?: NoteReply;
  NoteReplyRequest?: NoteReplyRequest;
  NoteVersion?: NoteVersion;
  PositionEntry?: PositionEntry;
  PositionsResponse?: PositionsResponse;
  ReviewDoneRequest?: ReviewDoneRequest;
  ReviewDoneResponse?: ReviewDoneResponse;
  ReviewItem?: ReviewItem;
  ReviewListResponse?: ReviewListResponse;
  ReviewRhythm?: ReviewRhythm;
  ProfileKind?: ProfileKind;
  ProfileTokenClaims?: ProfileTokenClaims;
}
/**
 * POST /guardians/me/students: the profile and the consent in one call.
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
}
export interface CreateStudentProfileResponse {
  profile: StudentProfile;
  consentId: DashboardId;
}
/**
 * A student profile (a User row with kind = student).
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
 * POST /guardians/me/gate/verify and /gate/switch-to-parent. 5 wrong tries lock the account and the device for 15 minutes (PIN_LOCKED).
 */
export interface ParentGateVerifyRequest {
  pin: string;
  deviceId: string;
}
/**
 * A short-lived (at most 5 minutes) parent-elevation token.
 */
export interface ParentGateVerifyResponse {
  elevationToken: string;
  expiresInSeconds: number;
}
/**
 * PUT /guardians/me/gate/pin. 4 to 6 digits. `currentPin` is required when changing an existing PIN.
 */
export interface SetParentPinRequest {
  pin: string;
  currentPin?: string;
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
 * A `answer` event.
 */
export interface EventAnswer {
  eventId: DashboardId1;
  profileId: DashboardId2;
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
  };
}
/**
 * A `buddy-question` event.
 */
export interface EventBuddyQuestion {
  eventId: DashboardId3;
  profileId: DashboardId4;
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
 * A `correction` event.
 */
export interface EventCorrection {
  eventId: DashboardId5;
  profileId: DashboardId6;
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
    reason: string;
  };
}
/**
 * A `help-request` event.
 */
export interface EventHelpRequest {
  eventId: DashboardId7;
  profileId: DashboardId8;
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
  eventId: DashboardId9;
  profileId: DashboardId10;
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
  };
}
/**
 * A `note` event.
 */
export interface EventNote {
  eventId: DashboardId11;
  profileId: DashboardId12;
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
  };
}
/**
 * A `read` event.
 */
export interface EventRead {
  eventId: DashboardId13;
  profileId: DashboardId14;
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
  };
}
/**
 * A `reveal` event.
 */
export interface EventReveal {
  eventId: DashboardId15;
  profileId: DashboardId16;
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
  eventId: DashboardId17;
  profileId: DashboardId18;
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
  eventId: DashboardId19;
  profileId: DashboardId20;
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
  eventId: DashboardId21;
  profileId: DashboardId22;
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
 * A `round-complete` event.
 */
export interface EventRoundComplete {
  eventId: DashboardId23;
  profileId: DashboardId24;
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
    sectionsTotal?: number;
  };
}
/**
 * A `round-start` event.
 */
export interface EventRoundStart {
  eventId: DashboardId25;
  profileId: DashboardId26;
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
  eventId: DashboardId27;
  profileId: DashboardId28;
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
  eventId: DashboardId29;
  profileId: DashboardId30;
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
  eventId: DashboardId31;
  profileId: DashboardId32;
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
     * The child used the key words in English only (language-barrier signal).
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
}
/**
 * PATCH /students/{id}/notes/{noteId}: makes a new version. DELETE has no body.
 */
export interface EditNoteRequest {
  tag?: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  text?: string;
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
 * Per-event outcome. `error` is present only when result is error (for example EVENT_INVALID).
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
 * GET /students/{id}/notes (filters: chapter, tag).
 */
export interface NoteListResponse {
  notes: Note[];
}
/**
 * POST /students/{id}/notes/{noteId}/replies: text, a reaction, or both.
 */
export interface NoteReplyRequest {
  text?: string;
  reaction?: string;
}
export interface NoteVersion {
  version: number;
  text: string;
  tag: 'Rough note' | 'Remember this' | 'My example' | 'I have a question' | "I don't get this";
  at: DashboardTime;
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
