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
  job?: StudioJob;
  'media-store'?: StudioMediaStoreConfig;
  producer?: StudioProducer;
  'provider-profile'?: StudioProviderProfile;
  'review-record'?: StudioReviewRecord;
  review?: StudioReview;
  'runner-settings'?: StudioRunnerSettings;
  stage?: StudioStage;
  'studio-config'?: StudioConfig;
  template?: StudioTemplate;
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
    },
    ...{
      key: StoreKey;
      label?: string;
      rebuildMode?: 'rebuild' | 'as-is';
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
}
export interface TemplateRef {
  id: StudioId;
  version: number;
}
export interface StudioProducer {
  kind: ProducerKind;
  input: {
    template: TemplateRef;
    stageInstructions: StoreKey;
    upstreamArtifacts: StoreKey[];
    notes?: string;
    reviewComments?: StoreKey[];
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
