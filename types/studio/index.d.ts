/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from schemas/studio/*.schema.json by scripts/generate-studio-types.js.
 * Run `npm run generate:studio-types` after changing a schema, then commit the result.
 */

export type StudioId = string;
/**
 * manual, claude-session, rules, fake (tests), or api:<provider>, voice:<provider>, parse:<provider>. A provider is a name, not an enum entry, so adding one never changes a schema.
 */
export type ProducerKind = string;
export type Timestamp = string;
export type StageId =
  'inventory' | 'master' | 'generate' | 'slides' | 'narration-script' | 'audio' | 'translation' | 'publish';
/**
 * A relative, forward-slash key such as jobs/<id>/inventory.json. No leading slash, no drive letter, no backslash, no '.' or '..' segment.
 */
export type StoreKey = string;
export type LanguageTag = string;
export type ReviewState = 'draft' | 'in-review' | 'changes-requested' | 'approved' | 'locked';
/**
 * narration:<style>:<lang>, audio:<style>:<lang>, slides:<lang>, buddy:<lang> (2.13.0).
 */
export type FacetKey = string;
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
  'coverage-report'?: StudioCoverageReport;
  'gate-index'?: StudioGateIndex;
  inventory?: StudioInventory;
  'item-keys'?: StudioItemKeys;
  'job-item'?: StudioJobItem;
  'job-plan'?: StudioJobPlan;
  job?: StudioJob;
  'lesson-facet'?: StudioLessonFacet;
  lesson?: StudioLesson;
  'media-store'?: StudioMediaStoreConfig;
  'notification-prefs'?: StudioNotificationPrefs;
  notification?: StudioNotification;
  'page-map'?: StudioPageMap;
  pages?: StudioPages;
  'picture-requests'?: StudioPictureRequests;
  practice?: StudioPractice;
  producer?: StudioProducer;
  'provider-profile'?: StudioProviderProfile;
  'review-record'?: StudioReviewRecord;
  review?: StudioReview;
  'runner-presence'?: StudioRunnerPresence;
  'runner-settings'?: StudioRunnerSettings;
  stage?: StudioStage;
  'studio-config'?: StudioConfig;
  'template-generate'?: StudioTemplateGenerate;
  template?: StudioTemplate;
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
}
