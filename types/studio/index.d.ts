/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from schemas/studio/*.schema.json by scripts/generate-studio-types.js.
 * Run `npm run generate:studio-types` after changing a schema, then commit the result.
 */

export type StudioId = string;
/**
 * A relative, forward-slash key such as jobs/<id>/inventory.json. No leading slash, no drive letter, no backslash, no '.' or '..' segment.
 */
export type StoreKey = string;
export type LanguageTag = string;
export type ReviewState = 'draft' | 'in-review' | 'changes-requested' | 'approved' | 'locked';
/**
 * Describes a media store. The interface every store implements: put(key, bytes), get(key), exists(key), url(key). Keys are StoreKeys. Only local-disk exists now.
 */
export type StudioMediaStoreConfig = {
  [k: string]: unknown;
};
/**
 * manual, claude-session, rules, fake (tests), or api:<provider>, voice:<provider>, parse:<provider>. A provider is a name, not an enum entry, so adding one never changes a schema.
 */
export type ProducerKind = string;
export type Timestamp = string;
export type Tier = 'Free' | 'Standard' | 'Premium' | 'Enterprise';
export type StudioReviewRecord = {
  [k: string]: unknown;
};
export type StageId =
  'inventory' | 'master' | 'generate' | 'slides' | 'narration-script' | 'audio' | 'translation' | 'publish';
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
  job?: StudioJob;
  'media-store'?: StudioMediaStoreConfig;
  'page-map'?: StudioPageMap;
  pages?: StudioPages;
  'picture-requests'?: StudioPictureRequests;
  producer?: StudioProducer;
  'provider-profile'?: StudioProviderProfile;
  'review-record'?: StudioReviewRecord;
  review?: StudioReview;
  'runner-settings'?: StudioRunnerSettings;
  stage?: StudioStage;
  'studio-config'?: StudioConfig;
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
    gate: 'inventory' | 'master';
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
}
export interface TemplateRef {
  id: StudioId;
  version: number;
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
    [k: string]: ProducerKind;
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
