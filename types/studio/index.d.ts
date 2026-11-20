/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from schemas/studio/*.schema.json by scripts/generate-studio-types.js.
 * Run `npm run generate:studio-types` after changing a schema, then commit the result.
 */

/**
 * Body of POST /lessons/:lessonId/master/sections (2.18.0): asks for a new section of the master. It is stored as a review-comment of kind `add-section` (201 the new comment, 200 the same request already saved; the answer is a `review-comment`) and counts as an open change request. Sending it answers 409 cannot_start until the engine has the add-section mode. At least one of `notes` and `text` is required.
 */
export type StudioAddSectionRequest = {
  [k: string]: unknown;
};
/**
 * SHA-256 (lower-case hex) of the text a reviewer was looking at (2.17.0). For a style version it is the hash of the version's file, the same value the Worker keeps as the approval hash; for the master and for study material it is the hash of the item's lines (id and words) in id order.
 */
export type PreviewHash = string;
/**
 * narration:<style>:<lang>, audio:<style>:<lang>, slides:<lang>, buddy:<lang> (2.13.0). From 2.16.0 the style is any key a template names (a fifth style needs no contract change).
 */
export type FacetKey = string;
export type StudioId = string;
/**
 * `master`, or the item id such as `style-simple`, `activities`.
 */
export type StudioId1 = string;
/**
 * narration:<style>:<lang>, audio:<style>:<lang>, slides:<lang>, buddy:<lang> (2.13.0). From 2.16.0 the style is any key a template names (a fifth style needs no contract change).
 */
export type FacetKey1 = string;
export type Timestamp = string;
/**
 * POST /lessons/:lessonId/items/:item/comments (2.17.0). Saving a comment is not a state change. The Worker stores the text it reads now as the anchor. `proposedText` belongs to one line: the Worker refuses it on a section comment (400 bad_request).
 */
export type StudioCommentCreate =
  | {
      body: {
        [k: string]: unknown;
      };
    }
  | {
      proposedText: {
        [k: string]: unknown;
      };
    };
export type LanguageTag = string;
/**
 * SHA-256 (lower-case hex) of the text a reviewer was looking at (2.17.0). For a style version it is the hash of the version's file, the same value the Worker keeps as the approval hash; for the master and for study material it is the hash of the item's lines (id and words) in id order.
 */
export type PreviewHash1 = string;
/**
 * manual, claude-session, rules, fake (tests), or api:<provider>, voice:<provider>, parse:<provider>. A provider is a name, not an enum entry, so adding one never changes a schema.
 */
export type ProducerKind = string;
export type StageId =
  'inventory' | 'master' | 'generate' | 'slides' | 'narration-script' | 'audio' | 'translation' | 'publish';
/**
 * A relative, forward-slash key such as jobs/<id>/inventory.json. No leading slash, no drive letter, no backslash, no '.' or '..' segment.
 */
export type StoreKey = string;
export type ReviewState = 'draft' | 'in-review' | 'changes-requested' | 'approved' | 'locked';
export type NarrationStyle = 'simple' | 'favorite-teacher' | 'professional' | 'friend';
/**
 * Describes a media store. The interface every store implements: put(key, bytes), get(key), exists(key), url(key). Keys are StoreKeys. Only local-disk exists now.
 */
export type StudioMediaStoreConfig = {
  [k: string]: unknown;
};
export type Tier = 'Free' | 'Standard' | 'Premium' | 'Enterprise';
export type StudioReviewRecord = {
  [k: string]: unknown;
};
export type StudioStage = {
  [k: string]: unknown;
};
/**
 * A published template version is immutable; a changed pattern becomes a new version.
 */
export type StudioTemplate = {
  [k: string]: unknown;
};

export interface StudioContracts {
  'add-section-request'?: StudioAddSectionRequest;
  'approve-request'?: StudioApproveRequest;
  'approve-result'?: StudioApproveResult;
  'change-open-result'?: StudioChangeOpenResult;
  'comment-accept-result'?: StudioCommentAcceptResult;
  'comment-again'?: StudioCommentAgain;
  'comment-create'?: StudioCommentCreate;
  'comment-edit'?: StudioCommentEdit;
  'comment-list'?: StudioCommentList;
  'comment-send-result'?: StudioCommentSendResult;
  'comment-send'?: StudioCommentSend;
  'coverage-report'?: StudioCoverageReport;
  'discard-result'?: StudioDiscardResult;
  'facet-change-request'?: StudioFacetChangeRequest;
  'facet-history'?: StudioFacetHistory;
  'gate-index'?: StudioGateIndex;
  'import-request'?: StudioImportRequest;
  'import-result'?: StudioImportResult;
  inventory?: StudioInventory;
  'item-keys'?: StudioItemKeys;
  'job-item'?: StudioJobItem;
  'job-plan'?: StudioJobPlan;
  job?: StudioJob;
  'lesson-facet'?: StudioLessonFacet;
  'lesson-view'?: StudioLessonView;
  lesson?: StudioLesson;
  'master-history'?: StudioMasterHistory;
  'media-store'?: StudioMediaStoreConfig;
  'notification-prefs'?: StudioNotificationPrefs;
  notification?: StudioNotification;
  'page-map'?: StudioPageMap;
  pages?: StudioPages;
  'picture-requests'?: StudioPictureRequests;
  practice?: StudioPractice;
  producer?: StudioProducer;
  'provider-profile'?: StudioProviderProfile;
  'review-comment'?: StudioReviewComment;
  'review-record'?: StudioReviewRecord;
  review?: StudioReview;
  run?: StudioRun;
  'runner-presence'?: StudioRunnerPresence;
  'runner-settings'?: StudioRunnerSettings;
  stage?: StudioStage;
  'studio-config'?: StudioConfig;
  'take-down-request'?: StudioTakeDownRequest;
  'take-down-result'?: StudioTakeDownResult;
  'template-generate'?: StudioTemplateGenerate;
  template?: StudioTemplate;
}
/**
 * POST /lessons/:lessonId/items/:item/approve (2.17.0): previewHash is required. The older routes POST /jobs/:id/lesson/facets/:facet/approve and POST /jobs/:id/items/:item/approve accept the same body with every field optional (without previewHash they only check that no change request is open). `previewHash` is the hash of the text the reviewer looked at (from the comment list). The Worker refuses with comments_open while a change request is open, with text_changed_since_preview when the text differs from what was looked at (also when it changes while the approval is being written), and with text_changed_since_approval when the item is already approved on other text; the hash it stores is this one.
 */
export interface StudioApproveRequest {
  previewHash: PreviewHash;
  facet?: FacetKey;
  /**
   * Master only: confirm that blocks flagged by the checks are approved with the rest.
   */
  confirmFlagged?: boolean;
}
/**
 * The answer to Approve (2.17.0). Since 2.18.0 it may say which version is meant: approving a draft of a published version or a changed master. The Worker (0f38200) does not send these two yet.
 */
export interface StudioApproveResult {
  item: StudioId;
  facet?: FacetKey;
  state: 'approved';
  previewHash: PreviewHash;
  /**
   * True when it was already approved with the same hash.
   */
  noop?: boolean;
  /**
   * Optional (2.18.0): the version the approval is for; for a draft, the version Publish will make live.
   */
  version?: number;
  /**
   * Optional (2.18.0): true when what was approved is a draft beside a published version.
   */
  draft?: boolean;
}
/**
 * The answer to POST /lessons/:lessonId/facets/:facet/change (2.18.0): 201 when this call opened the draft, 200 when a draft was already open (the caller joins it).
 */
export interface StudioChangeOpenResult {
  facet: FacetKey;
  item: StudioId;
  opened: boolean;
  /**
   * The live (published) version the draft starts from.
   */
  baseVersion: number;
  /**
   * The version number Publish will give the draft (baseVersion + 1).
   */
  draftVersion: number;
  draftState?: 'working' | 'in-review' | 'approved' | null;
  /**
   * The `edit` run that stands for the change.
   */
  run?: string | null;
}
/**
 * The answer to Accept all (2.17.0).
 */
export interface StudioCommentAcceptResult {
  accepted: StudioReviewComment[];
}
/**
 * A reviewer's change request on one line or one section of the preview (2.17.0). Saving, editing or withdrawing a comment changes no lesson state; Send for changes and Approve do. The comment is anchored to the review key of the block (block ids do not change when text is rewritten) and to the text it was written against.
 */
export interface StudioReviewComment {
  id: string;
  lessonId: StudioId;
  jobId?: StudioId;
  item: StudioId1;
  facet?: FacetKey1;
  /**
   * add-section is reserved for AGB-1020 (the Worker does not accept it yet).
   */
  kind: 'line' | 'section' | 'add-section';
  /**
   * The review key: <style>:<lang>:<blockId> for a line, <style>:<lang>:section:<sectionId> for a section.
   */
  key: string;
  /**
   * The text the reviewer was looking at, as it read when the comment was written (capped at 2 KB). Empty for a comment migrated from an old change request.
   */
  anchorText: string;
  /**
   * SHA-256 of anchorText; empty when no snapshot was kept (migrated comment).
   */
  anchorHash: PreviewHash;
  /**
   * What is wrong and what should change, in the reviewer's words. Data, never an instruction to the Studio.
   */
  body: string;
  /**
   * Optional: the corrected text the reviewer typed.
   */
  proposedText?: string;
  /**
   * open, sent for change, changed (awaiting acceptance), accepted, withdrawn. open + sent + changed count as open change requests.
   */
  state: 'open' | 'sent' | 'changed' | 'accepted' | 'withdrawn';
  /**
   * True when the block's text no longer matches anchorHash and no run of ours produced the change. The comment stays open; the reviewer chooses Keep open, Accept or Withdraw.
   */
  textChanged?: boolean;
  /**
   * True when the block no longer exists; the comment can only be withdrawn.
   */
  blockRemoved?: boolean;
  /**
   * The block's text now (only in a list response).
   */
  currentText?: string;
  /**
   * The text the run produced (state changed or accepted).
   */
  afterText?: string;
  afterHash?: PreviewHash;
  /**
   * The background job that handles the comment (state sent, changed).
   */
  sentJob?: string;
  /**
   * A plain sentence when the run for this comment failed; the comment is back to open.
   */
  failure?: string;
  /**
   * Earlier rounds of a comment that was commented on again, oldest first.
   *
   * @maxItems 100
   */
  thread?: {
    by: string;
    at: Timestamp;
    body: string;
    afterText?: string;
  }[];
  /**
   * The version the comment is against (the live version for a published style); reserved for AGB-1020.
   */
  targetVersion?: number;
  origin?: 'reviewer' | 'migrated';
  createdBy: string;
  createdAt: Timestamp;
  editedAt?: Timestamp;
  sentBy?: string;
  sentAt?: Timestamp;
  acceptedBy?: string;
  acceptedAt?: Timestamp;
  withdrawnBy?: string;
  withdrawnAt?: Timestamp;
}
/**
 * POST …/comments/:cid/again (2.17.0): comment again on a changed comment. The state goes back to open, the anchor becomes the changed text and the earlier body stays in the thread.
 */
export interface StudioCommentAgain {
  body: string;
  proposedText?: string;
}
/**
 * PATCH (or POST) /lessons/:lessonId/items/:item/comments/:cid (2.17.0): edit your own comment while it is open.
 */
export interface StudioCommentEdit {
  body?: string;
  proposedText?: string;
}
/**
 * GET /lessons/:lessonId/items/:item/comments (2.17.0): the comments with their current text, the hash of the text being previewed, and what the caller may do.
 */
export interface StudioCommentList {
  lessonId: StudioId;
  item: StudioId;
  facet?: FacetKey;
  /**
   * Hash of the text the reviewer is looking at; sent back with Approve. Null when the text cannot be read now.
   */
  previewHash: PreviewHash | null;
  /**
   * Open change requests by state; open + sent + changed is the number the top bar shows and Approve waits on.
   */
  counts: {
    open: number;
    sent: number;
    changed: number;
  };
  /**
   * The item (and facet) is approved now.
   */
  approved: boolean;
  /**
   * The preview hash that was approved, when approved.
   */
  approvedHash?: PreviewHash | null;
  can: {
    comment: boolean;
    /**
     * There is an open comment and the caller may send it.
     */
    send: boolean;
    /**
     * There is a changed comment to accept.
     */
    accept: boolean;
    /**
     * No change request is open, the caller may approve and the item is ready to be approved.
     */
    approve: boolean;
  };
  comments: StudioReviewComment[];
}
/**
 * The answer to Send for changes (2.17.0).
 */
export interface StudioCommentSendResult {
  /**
   * Comments sent by this call.
   */
  sent: StudioReviewComment[];
  /**
   * Ids that were not open any more (a second Confirm changes nothing).
   */
  already: string[];
  /**
   * Background jobs queued by this call.
   */
  jobs: number;
}
/**
 * POST /lessons/:lessonId/items/:item/comments/send (2.17.0; `expectedVersion` 2.18.0): Send for changes. Without `ids` every open comment of the item (and facet) is sent. Confirmed in the app; the route is idempotent. `expectedVersion` is for a comment on a published version or an approved master: the live version the page showed.
 */
export interface StudioCommentSend {
  /**
   * @maxItems 500
   */
  ids?: string[];
  facet?: FacetKey;
  /**
   * The live version number the page showed. Another number means the page is out of date (409 text_changed_since_preview, detail.version is the live one).
   */
  expectedVersion?: number;
}
/**
 * studio-jobs/<job>/coverage.json: what the inventory or the master covers.
 */
export interface StudioCoverageReport {
  job: StudioId;
  stage: 'inventory' | 'master';
  items: {
    id: string;
    kind: 'T' | 'D' | 'F' | 'E' | 'Q' | 'A' | 'B' | 'P';
    text?: string;
    pages?: string[];
    covered: boolean;
    blocks?: {
      id: string;
      section: string;
    }[];
  }[];
  pages?: {
    page: number;
    status: 'covered' | 'skipped';
    listed?: number;
    counted?: number;
    hinted?: number;
    note?: string;
  }[];
  warnings?: {
    id: string;
    message: string;
    severity?: 'fail' | 'warn';
  }[];
  failures?: {
    id: string;
    message: string;
    severity?: 'fail' | 'warn';
  }[];
  summary: {
    items: number;
    covered: number;
    gaps: number;
  };
}
/**
 * The answer to POST /lessons/:lessonId/facets/:facet/discard (2.18.0). 200 either way: `discarded: false, noop: true` when there was no draft (a second Confirm).
 */
export interface StudioDiscardResult {
  facet: FacetKey;
  discarded: boolean;
  noop?: boolean;
  /**
   * Only with noop: the state of the version that has no draft.
   */
  state?: string;
  /**
   * The live version the lesson stays on (only when discarded).
   */
  version?: number;
  /**
   * Comments of the draft that were withdrawn (only when discarded).
   */
  withdrawn?: number;
}
/**
 * Body of POST /lessons/:lessonId/facets/:facet/change and POST /lessons/:lessonId/facets/:facet/discard (2.18.0). Both are confirmed in the app and idempotent; every field is optional.
 */
export interface StudioFacetChangeRequest {
  /**
   * The live version number the page showed. Another number means the page is out of date (409 text_changed_since_preview, detail.version is the live one).
   */
  expectedVersion?: number;
}
/**
 * GET /lessons/:lessonId/facets/:facet/history (2.18.0): the published versions of one style version (newest first, who, when, each changed line before and after) and, while a change is open, what the draft has changed so far. For the Studio only; learners never read it.
 */
export interface StudioFacetHistory {
  lessonId: StudioId;
  facet: FacetKey;
  item: StudioId;
  /**
   * The published version, or null when the version is not published.
   */
  live: {
    version: number;
    by?: string;
    at?: Timestamp;
  } | null;
  /**
   * Present only while a change is open.
   */
  draft?: {
    state: 'working' | 'in-review' | 'approved';
    version: number;
    baseVersion: number;
    by: string | null;
    at: Timestamp | null;
    run?: string;
    /**
     * The lines the draft has changed so far; absent when the text could not be read or compared.
     */
    changes?: {
      key: string;
      /**
       * The line before; null for a new line.
       */
      before: string | null;
      /**
       * The line after; null for a removed line.
       */
      after: string | null;
    }[];
    /**
     * True when the draft text could not be read just now (try again).
     */
    unread?: boolean;
  };
  versions: {
    version: number;
    by: string | null;
    at: Timestamp | null;
    run?: string;
    /**
     * The first published version: it has no before.
     */
    first: boolean;
    changes: {
      key: string;
      /**
       * The line before; null for a new line.
       */
      before: string | null;
      /**
       * The line after; null for a removed line.
       */
      after: string | null;
    }[];
    /**
     * The version learners read now.
     */
    current: boolean;
  }[];
}
/**
 * studio-jobs/<job>/gate-index.json: the block keys each gate needs approved, grouped by section.
 */
export interface StudioGateIndex {
  job: StudioId;
  gates: {
    gate: 'inventory' | 'master' | 'items';
    sections: {
      id: string;
      title: string;
      keys: string[];
    }[];
  }[];
}
/**
 * Body of POST /lessons/:lessonId/items/:item/import (2.18.0, AGB-1035; studio:admin only). The text is not sent: the Worker reads the version file already on the job branch and registers it as a style version in review.
 */
export interface StudioImportRequest {
  language: LanguageTag;
  expectedSha256?: PreviewHash1;
}
/**
 * The answer to the import route (2.18.0, AGB-1035): 201 when imported (`replaced: true` when it replaced other imported text of a version in review), 200 `{imported: false, noop: true}` when the same file was imported already. The run is an ordinary `run`: kind `edit`, executor `external`, `inputRef.source` `import`.
 */
export interface StudioImportResult {
  imported: boolean;
  noop?: boolean;
  replaced?: boolean;
  lessonId: StudioId;
  item: StudioId;
  facet: FacetKey;
  state: 'in-review';
  previewHash: PreviewHash;
  /**
   * Number of blocks imported (absent on a noop).
   */
  blocks?: number;
  run: StudioRun;
}
/**
 * One piece of background work for one item (2.16.0). The run has the estimate, the progress and the result. Review, approval and publish belong to the facet, not the run.
 */
export interface StudioRun {
  id: string;
  lessonId: StudioId;
  jobId: StudioId;
  /**
   * voice is reserved (not built).
   */
  kind: 'generate' | 'update-sections' | 'edit' | 'voice';
  executor: 'runner' | 'external';
  item: StudioId;
  /**
   * Section ids, or null for the whole item.
   */
  scope?: StudioId[] | null;
  options?: {
    sample?: boolean;
    sampleFirst?: boolean;
  };
  estimate?: {
    sessions: number;
    tokensLow: number;
    tokensHigh: number;
    minutesLow: number;
    minutesHigh: number;
  } | null;
  budgetTokens?: number | null;
  actualTokens?: number | null;
  state: 'queued' | 'running' | 'paused' | 'succeeded' | 'failed' | 'cancelled';
  startedBy?: string | null;
  createdAt: Timestamp;
  startedAt?: Timestamp | null;
  finishedAt?: Timestamp | null;
  /**
   * What the run was made from. Optional keys of known runs (other keys may appear): an import run (executor `external`) has `source: "import"`, `from`, `branch`, `path`, `facet`, `language`, `sha256`; a change run has `source: "change"`, `facet`, `baseVersion`, `changes` (the comments it carries: `{id, key, kind}`); a voice run (reserved) has `facet` and `version`. None of these keys is validated: the object stays free-form, as in 2.17.0.
   */
  inputRef?: {} | null;
  /**
   * What the run produced. An import run has `{facet, sha256, blocks}`; a failed run has `{failure: {code, message, at, checks?}}`; voice is reserved.
   */
  outputRef?: {} | null;
}
/**
 * studio-jobs/<job>/inventory.json: the source inventory parsed from inventory.md.
 */
export interface StudioInventory {
  job: StudioId;
  /**
   * Store key of the source file.
   */
  source?: string;
  items: {
    id: string;
    kind: 'T' | 'D' | 'F' | 'E' | 'Q' | 'A' | 'B' | 'P';
    text: string;
    section: string;
    /**
     * @minItems 1
     */
    pages: [string, ...string[]];
    mode?: 'rebuild' | 'as-is';
    seePage?: boolean;
    unreadable?: boolean;
  }[];
  /**
   * The page ledger: every scan page is accounted for.
   */
  pages: {
    page: number;
    printed?: string;
    status: 'covered' | 'skipped';
    questions: number;
    note?: string;
  }[];
}
/**
 * studio-jobs/<job>/items/<item>/keys.json: the review keys of one item grouped by section. Written by the engine, read by the Worker for Gate 2.
 */
export interface StudioItemKeys {
  job: StudioId;
  item: StudioId;
  sections: {
    id: string;
    title: string;
    keys: string[];
  }[];
}
/**
 * One planned generation item as the Worker shows it on the items board (GET /jobs/:id, `items`). State is derived from stages and review records.
 */
export interface StudioJobItem {
  id: StudioId;
  label?: string;
  family: string;
  required: boolean;
  state:
    | 'waiting'
    | 'queued'
    | 'working'
    | 'produced'
    | 'in-review'
    | 'changes-asked'
    | 'approved'
    | 'locked'
    | 'failed'
    | 'blocked'
    | 'stale'
    | 'paused';
  attempt: number;
  person?: string;
  machine?: string;
  producer?: ProducerKind;
  checks?: {
    id: string;
    message: string;
  }[];
  error?: string;
  approved?: number;
  total?: number;
  stale?: boolean;
  blockedBy?: StudioId[];
  retryAfter?: Timestamp;
  /**
   * Optional (2.18.0, AGB-1028): the number of sections of the whole item. For a sample (only the first section is written) the app shows "1 of N sections"; `total` counts keys, not sections.
   */
  totalSections?: number;
}
export interface StudioJobPlan {
  job: StudioId;
  stages: StageEstimate[];
  basis: {
    template: string;
    ratesVersion?: string;
    calibratedFrom?: number;
  };
  limits?: {
    personMaxActive?: number;
    maxParallelItems?: number;
    maxParallelSessions?: number;
    loadLimit?: number;
  };
  autoContinue?: boolean;
  /**
   * Stages whose plan the person has started.
   */
  approved?: {
    stage: StageId;
    approvedBy: string;
    approvedAt: Timestamp;
  }[];
}
/**
 * Plan and estimate for one Claude-session stage (2.12.0). Sessions and tokens of the person's own Claude plan; no money.
 */
export interface StageEstimate {
  stage: StageId;
  pages?: number;
  items?: number;
  batches?: number;
  sessions: number;
  minutes: {
    low: number;
    high: number;
  };
  tokens: {
    low: number;
    high: number;
  };
  confidence: 'exact' | 'typical' | 'rough' | 'calibrated';
  canStart?: boolean;
  blockedBy?: string;
}
export interface StudioJob {
  id: StudioId;
  /**
   * @minItems 1
   */
  sources: [
    {
      key: StoreKey;
      label?: string;
      rebuildMode?: 'rebuild' | 'as-is';
      /**
       * Scan layout: auto detects two-page spreads, single is one book page per scan page, spread is always two.
       */
      layout?: 'auto' | 'single' | 'spread';
    },
    ...{
      key: StoreKey;
      label?: string;
      rebuildMode?: 'rebuild' | 'as-is';
      /**
       * Scan layout: auto detects two-page spreads, single is one book page per scan page, spread is always two.
       */
      layout?: 'auto' | 'single' | 'spread';
    }[]
  ];
  circle: StudioId;
  class: string;
  subject: string;
  book: string;
  template: TemplateRef;
  rebuildMode: 'rebuild' | 'as-is';
  /**
   * @minItems 1
   */
  languages: [LanguageTag, ...LanguageTag[]];
  notes?: string;
  state?: ReviewState;
  /**
   * Set on an item-level job created by a request-change on one item.
   */
  parentJob?: StudioId;
  /**
   * Block or output id an item-level job is about.
   */
  item?: string;
  /**
   * Optional reference into the app catalog; class, subject and book stay human names.
   */
  catalog?: {
    boardId: string;
    classId: string;
    subjectId: string;
    bookId: string;
  };
  /**
   * Language of the source book, used for OCR.
   */
  sourceLanguage?: LanguageTag;
  /**
   * Inventory item ids whose text is kept as in the book. Only effective where the job settings allow as-is.
   */
  asIsItems?: string[];
  /**
   * Per-job start of generation (2.11.0).
   */
  generation?: {
    started: boolean;
    startedBy?: string;
    startedAt?: Timestamp;
    /**
     * Optional subset of items to run.
     */
    items?: StudioId[];
    /**
     * Run each item on these sections first (pattern sample).
     */
    sample?: {
      /**
       * @minItems 1
       */
      sections: [string, ...string[]];
    };
  };
  /**
   * Pre-approve the next Claude-session stage after each gate is approved (2.12.0). Never approves a gate.
   */
  autoContinue?: boolean;
  /**
   * A lesson job reads the book; an extension job adds one facet to a published lesson (2.13.0).
   */
  kind?: 'lesson' | 'extension';
  /**
   * Extension jobs: the lesson (knowledge id) being extended.
   */
  lessonId?: StudioId;
  /**
   * Extension jobs: the facet to add.
   */
  facet?: FacetKey;
  /**
   * The name the creator gave the knowledge (2.13.0). `book` equals it unless a catalog book was chosen.
   */
  knowledgeName?: string;
  /**
   * What to make (2.13.0). At least one language and one narration type; `languages` at the job level mirrors outputs.languages for old readers.
   */
  outputs?: {
    /**
     * @minItems 1
     */
    languages: [LanguageTag, ...LanguageTag[]];
    /**
     * @minItems 1
     */
    narrationStyles: [NarrationStyle, ...NarrationStyle[]];
    /**
     * Reserved: added later from the published lesson.
     */
    extras?: {
      slides?: boolean;
      voice?: boolean;
      buddy?: boolean;
    };
  };
  /**
   * The audience brief (2.13.0): data for the Runner, never instructions. Preset ids come from audience-presets.json.
   */
  audience?: {
    /**
     * @maxItems 4
     */
    presets: [] | [string] | [string, string] | [string, string, string] | [string, string, string, string];
    text: string;
    version: number;
  };
  /**
   * Review rhythm stored per job (2.13.0). Only `each-phase` can be chosen now; `auto` is reserved.
   */
  review?: {
    mode: 'each-phase' | 'auto';
  };
}
export interface TemplateRef {
  id: StudioId;
  version: number;
  /**
   * Where the template comes from (2.13.0). Custom ones are pinned per job. Absent means standard.
   */
  source?: 'standard' | 'circle' | 'mine';
}
/**
 * One publishable piece of a lesson: a narration type in a language, slides, audio or the Buddy bank (2.13.0).
 */
export interface StudioLessonFacet {
  lessonId: StudioId;
  facet: FacetKey;
  state: 'planned' | 'working' | 'in-review' | 'approved' | 'published' | 'stale' | 'failed' | 'dropped';
  version: number;
  jobId?: StudioId;
  publishedAt?: Timestamp;
  baseRelease?: number;
}
/**
 * What GET /lessons/:lessonId returns (2.16.0): everything the lesson page shows. Only what exists is present.
 */
export interface StudioLessonView {
  lessonId: StudioId;
  jobId: StudioId;
  title: string;
  circle: StudioId;
  template: string;
  master: {
    state: string;
    version: number;
    canChange: boolean;
    /**
     * Open change requests by state (2.17.0); open + sent + changed is the number Approve waits on.
     */
    comments?: {
      open: number;
      sent: number;
      changed: number;
    };
    /**
     * No change request is open, the master can be approved and the caller may approve it (2.17.0).
     */
    canApprove?: boolean;
  };
  cards: {
    item: StudioId;
    family: string;
    /**
     * The style key in facet names, when the item is a narration style.
     */
    style?: string;
    label: {
      en: string;
      kn?: string;
      ta?: string;
      te?: string;
      hi?: string;
    };
    /**
     * True when Generate may be shown: the item is not generated and every `after` edge is met.
     */
    offered: boolean;
    /**
     * Why not offered, for example the label of the item it waits for.
     */
    offeredReason?: string;
    run?: StudioRun;
    facet?: {
      facet: FacetKey;
      state: 'planned' | 'working' | 'in-review' | 'approved' | 'published' | 'stale' | 'failed' | 'dropped';
      version: number;
      approvedHash?: PreviewHash;
    };
    /**
     * Reserved for 2.17.0.
     */
    marks?: {
      section: string;
      state: 'out-of-date' | 'missing';
      reason?: string;
    }[];
    /**
     * Reserved for 2.17.0.
     */
    draft?: {
      state: 'working' | 'in-review' | 'approved';
      version?: number;
      changedSections?: number;
    };
    approved?: boolean;
    /**
     * Open change requests by state (2.17.0); open + sent + changed is the number Approve waits on.
     */
    comments?: {
      open: number;
      sent: number;
      changed: number;
    };
    /**
     * No change request is open, the style version is in review and the caller may approve it (2.17.0).
     */
    canApprove?: boolean;
  }[];
  recentRuns: StudioRun[];
  can: {
    generate: boolean;
    publish: boolean;
    change: boolean;
  };
}
/**
 * A lesson (knowledge id) owns the approved master and its facets (2.13.0). Stored by Worker in a later phase; the shape is fixed here.
 */
export interface StudioLesson {
  id: StudioId;
  circle: StudioId;
  baseJob: StudioId;
  masterCommit?: string;
  release: number;
  createdBy?: string;
  createdAt?: Timestamp;
}
/**
 * GET /lessons/:lessonId/master/history (2.18.0): the versions of the master (the build, each rewrite and each change after Gate 1; newest first) and an open change, if any.
 */
export interface StudioMasterHistory {
  lessonId: StudioId;
  item: 'master';
  /**
   * Present only while a change to the approved master is open.
   */
  change?: {
    /**
     * `working` today.
     */
    state: string;
    by: string | null;
    at: Timestamp | null;
    run?: string;
  };
  versions: {
    version: number;
    kind: 'build' | 'rewrite' | 'change';
    by: string;
    at: Timestamp;
    /**
     * The block keys the version touched.
     */
    blocks: string[];
  }[];
}
/**
 * Per person, per event kind, which channels are on (2.12.0). Missing means the default: in-app on; email on for needs-review, failed and stage-finished.
 */
export interface StudioNotificationPrefs {
  kinds?: {
    [k: string]: {
      inApp?: boolean;
      email?: boolean;
      browser?: boolean;
    };
  };
  digestMinutes?: number;
}
/**
 * One in-app notification (2.12.0). Title is a closed key plus params so every language can render it; no free text from users.
 */
export interface StudioNotification {
  id: string;
  kind: 'stage-finished' | 'needs-review' | 'failed' | 'paused' | 'runner-offline' | 'ready-to-start';
  job: StudioId;
  stage?: StageId;
  params?: {
    [k: string]: string | number;
  };
  createdAt: Timestamp;
  readAt?: Timestamp;
}
/**
 * studio-jobs/<job>/page-map.json: for each block id, the book pages it came from (from the source inventory page ranges).
 */
export interface StudioPageMap {
  job: StudioId;
  /**
   * Store key of the source file the pages refer to.
   */
  source?: string;
  blocks: {
    /**
     * @minItems 1
     */
    [k: string]: [number, ...number[]];
  };
}
/**
 * studio-jobs/<job>/pages.json: the intake manifest. Facts about each page or half; no pixels.
 */
export interface StudioPages {
  job: StudioId;
  source?: string;
  sourceHash?: string;
  layout?: 'auto' | 'single' | 'spread';
  pages: {
    id: string;
    scanPage: number;
    side: 'single' | 'l' | 'r';
    source?: string;
    width: number;
    height: number;
    words: number;
    confidence?: number;
    printed?: string;
    imageHash?: string;
    questionHint?: number;
  }[];
}
/**
 * studio-jobs/<job>/picture-requests.json: pictures to draw in our own kit. A scan page is only a place to look, never a copy.
 */
export interface StudioPictureRequests {
  job: StudioId;
  requests: {
    slug: string;
    alt: string;
    describe: string;
    kitParts?: string[];
    page?: string;
    block?: string;
  }[];
}
/**
 * studio-jobs/<job>/items/practice/out/practice.json: ids only. The question and its answer live once, in the lesson block; this file holds no question text and no answer text.
 */
export interface StudioPractice {
  job: StudioId;
  questions: {
    questionId: string;
    order: number;
    kind: 'mcq' | 'true-false' | 'odd-one-out' | 'short' | 'long' | 'fill-blank' | 'activity' | 'personal';
    /**
     * The book's question number, when it is a book question.
     */
    ref?: string;
    /**
     * Section ids that answer the question.
     *
     * @minItems 1
     */
    readAgain: [string, ...string[]];
    linkSource: 'master' | 'own-section' | 'session';
  }[];
}
export interface StudioProducer {
  kind: ProducerKind;
  input: {
    template: TemplateRef;
    stageInstructions: StoreKey;
    upstreamArtifacts: StoreKey[];
    notes?: string;
    reviewComments?: StoreKey[];
    /**
     * Optional hint: the local folder of page images a session may read. A working-copy path on the Runner; never committed and never stored in a job.
     */
    pagesDir?: string;
    /**
     * Ids of the page images in pagesDir that this run should read.
     */
    pageImages?: string[];
  };
  output: {
    artifact: StoreKey;
    provenance: Provenance;
  };
}
export interface Provenance {
  producer: ProducerKind;
  version: string;
  machine: string;
  person: string;
  at: Timestamp;
}
export interface StudioProviderProfile {
  tier: Tier;
  stages: {
    [k: string]: {
      producer: ProducerKind;
      settings?: {};
    };
  };
}
/**
 * Review status of a job or output. Legal moves are the data in review-transitions.json; 'locked' is terminal.
 */
export interface StudioReview {
  state: ReviewState;
  history?: {
    from: ReviewState;
    to: ReviewState;
    by: string;
    at: Timestamp;
  }[];
}
/**
 * A Runner as the Worker last saw it (2.12.0). Informational: never used for authorisation. Machine and version are shown to admins only.
 */
export interface StudioRunnerPresence {
  runnerId: string;
  /**
   * Person label, e.g. Ram's Mac.
   */
  label?: string;
  machine?: string;
  version?: string;
  state: 'idle' | 'working' | 'paused' | 'busy-load';
  stateDetail?: string;
  allowedStages?: StageId[];
  maxSessions?: number;
  firstSeen?: Timestamp;
  lastSeen: Timestamp;
  online?: boolean;
}
export interface StudioRunnerSettings {
  workerUrl: string;
  /**
   * Folder for job worktrees. A relative value is resolved by the Runner against the person's home folder (os.homedir()); never a hard-coded drive.
   */
  workFolder: string;
  allowedStages: StageId[];
  maxParallelJobs: number;
  mediaStore: StudioMediaStoreConfig;
  mediaPort?: number;
  /**
   * The one origin the local media server answers with CORS.
   */
  studioOrigin?: string;
  producers: {
    [k: string]:
      | ProducerKind
      | {
          [k: string]: ProducerKind;
        };
  };
  person?: string;
  machine?: string;
  /**
   * Git remote the Runner clones for job worktrees (the content repo). Any git URL or a local path.
   */
  contentRepoUrl?: string;
  /**
   * Source intake adapters, chosen by name. Never chosen by operating system.
   */
  intake?: {
    /**
     * Page renderer adapter: pdfjs (default), pdftoppm, or api:<provider> later.
     */
    renderer?: string;
    dpi?: number;
    maxEdge?: number;
    /**
     * Resolution of the JPEG working copies a session reads.
     */
    imageDpi?: number;
    /**
     * Where page images are kept: local-disk now, a remote store later.
     */
    mediaStore?: string;
  };
  ocr?: {
    /**
     * OCR adapter: wasm (default, bundled), native, auto, or api:<provider> later.
     */
    engine?: string;
    /**
     * Folder with extra traineddata files for other source languages.
     */
    tessdataFolder?: string;
  };
  /**
   * Override of the template batch size (scan pages per session).
   */
  batchPages?: number;
  /**
   * How long one Claude session may run, in minutes, before the Runner stops it. Leave out for 30 minutes. The STUDIO_CLAUDE_TIMEOUT_MS environment value, when set, wins over this.
   */
  sessionTimeoutMinutes?: number;
  /**
   * Full path (or command name) of Claude Code on this machine. The stable choice: a copy inside a VS Code extension folder changes folder with every extension version. Leave out to look in STUDIO_CLAUDE_BIN, PATH and the usual install folders. `studio-runner doctor` checks it.
   */
  claudeCommand?: string;
  /**
   * Most simultaneous Claude sessions on this machine.
   */
  maxParallelSessions?: number;
  /**
   * Pause and resume when the person's Claude usage limit is reached.
   */
  pauseOnLimit?: boolean;
  /**
   * No new work is claimed while the one-minute load per core is above this.
   */
  loadLimit?: number;
}
/**
 * Configuration held outside the schemas (Worker env or a data file). Enabling a Circle teacher is adding a role here.
 */
export interface StudioConfig {
  /**
   * @minItems 1
   */
  reviewRoles: [string, ...string[]];
  permissions?: {
    [k: string]: string[];
  };
}
/**
 * Body of POST /lessons/:lessonId/facets/:facet/take-down (2.18.0). Confirmed in the app; the version being taken down must be named.
 */
export interface StudioTakeDownRequest {
  /**
   * The live version number the page showed. Another number means the page is out of date (409 text_changed_since_preview, detail.version is the live one).
   */
  expectedVersion: number;
}
/**
 * The answer to POST /lessons/:lessonId/facets/:facet/take-down (2.18.0): 202, the unpublish workflow has started.
 */
export interface StudioTakeDownResult {
  started: true;
  /**
   * The workflow instance, not a `run`.
   */
  runId: string;
  facet: FacetKey;
  action: 'unpublish';
}
/**
 * The `generate` block of a lesson template body (2.11.0): the item plan for Phase 4, as data. No item name is hard-coded in the Worker; a template with a different list plans a different job.
 */
export interface StudioTemplateGenerate {
  /**
   * Items of one job that may run at once.
   */
  maxParallelItems?: number;
  /**
   * @minItems 1
   */
  languages?: [LanguageTag, ...LanguageTag[]];
  /**
   * @minItems 1
   */
  items: [GenerateItem, ...GenerateItem[]];
  minItems?: 0;
}
export interface GenerateItem {
  id: StudioId;
  label?: string;
  family: 'style' | 'study-jam' | 'bank' | 'activities' | 'glossary' | 'objects' | 'lab' | 'practice';
  /**
   * Gate 2 asks for this item when true.
   */
  required: boolean;
  after?: {
    item: StudioId;
    when: 'produced' | 'approved';
  }[];
  /**
   * Producer kinds allowed per tier (for example free: claude-session, manual).
   */
  producers?: {
    /**
     * @minItems 1
     */
    [k: string]: [ProducerKind, ...ProducerKind[]];
  };
  /**
   * How the Runner splits the work into sessions (checkpoint per group).
   */
  group?: {
    by: 'section' | 'terms' | 'missing-links' | 'whole';
    maxLeaves?: number;
  };
  checks?: string[];
  review?: 'block' | 'line' | 'card';
  /**
   * A small data expression over the job spec and template, for example `template.lab == true`. False means the item is not planned, shown or required.
   */
  when?: string;
  estimate?: {
    tokensPerLeaf?: number;
    tokensPerExchange?: number;
    tokensPerCard?: number;
    sessions?: number;
  };
  /**
   * 2.16.0. At most one style item of a template is the base style, made first. Every other style item names it in `after` with `when: approved`. The Worker never says which style that is.
   */
  base?: boolean;
  /**
   * 2.16.0. The key of the style in facet names and block keys (for example `friend` for Study Jam). When absent: `style-<x>` means `<x>`.
   */
  style?: string;
  /**
   * 2.16.0. The display name of the item in each language. `label` is the fallback.
   */
  names?: {
    en: string;
    kn?: string;
    ta?: string;
    te?: string;
    hi?: string;
  };
}
