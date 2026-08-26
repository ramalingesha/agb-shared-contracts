/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from knowledge-api.schema.json by scripts/generate-knowledge-types.js.
 * Run `npm run generate:types` after changing the schema, then commit the result.
 * Source of truth: Confluence UPDS -> Knowledge Platform -> K3.
 */

/**
 * BCP-47 primary subtag. The set is configuration, not a product limit.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "LanguageCode".
 */
export type LanguageCode = 'en' | 'kn' | 'hi' | 'ta' | 'te';
/**
 * A derived text Explanation. Launch set per G2/D13. Applies to master content only (G4 Part 3).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StyleId".
 */
export type StyleId = 'plain' | 'simple' | 'with-examples';
/**
 * G2. Every form carries a text spine (G3/D35).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ExplanationForm".
 */
export type ExplanationForm = 'text' | 'presentation' | 'video' | 'audio';
/**
 * G2. Only `master` may be style-derived (G4 Part 3).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ExplanationOrigin".
 */
export type ExplanationOrigin = 'master' | 'derived' | 'contributed';
/**
 * How this Explanation maps onto the master structure, and therefore how reading position survives a switch (G3/D36).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Anchoring".
 */
export type Anchoring = 'full' | 'sectioned' | 'whole';
/**
 * Drives the calm inline generating state in G7. Adapters MUST be able to return every value — a mock that only returns `ready` hides a required UI state.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "VariantStatus".
 */
export type VariantStatus = 'ready' | 'generating' | 'unavailable';
/**
 * Set per Explanation, not per Knowledge (G5/D40).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Visibility".
 */
export type Visibility = 'private' | 'circle' | 'public';
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "BlockType".
 */
export type BlockType =
  'heading' | 'paragraph' | 'list' | 'listItem' | 'quote' | 'image' | 'table' | 'divider' | 'reference' | 'example';

/**
 * Read surface for the Gnanora Knowledge Platform. Implemented by the mock adapter, the static file adapter, and the live service — all three MUST satisfy this schema. Responses are wrapped in the AGB standard envelope (api-response-schema.json); the definitions here describe the `data` payload only. Source of truth: Confluence UPDS → Knowledge Platform → K3. Domain model: Gnanora Product → G3.
 */
export interface GnanoraKnowledgeAPIContract {
  [k: string]: unknown;
}
/**
 * A unit of the text spine. Block IDs are stable across every full-anchored variant — this is what makes position-preserving axis switching possible (G3).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Block".
 */
export interface Block {
  /**
   * Stable across styles and languages. A split block emits sub-blocks inheriting this id with a `-1`, `-2` suffix.
   */
  id: string;
  type: BlockType;
  /**
   * Plain text content. Absent for divider and image blocks.
   */
  text?: string;
  /**
   * Heading level. Required when type is `heading` — drives the semantic HTML outline gate (DS9).
   */
  level?: number;
  /**
   * List blocks only.
   */
  ordered?: boolean;
  /**
   * listItem children of a list block.
   */
  items?: Block[];
  media?: MediaRef;
  /**
   * Accessible description. Required for image blocks (DS10).
   */
  alt?: string;
  /**
   * The section this block belongs to. Used for `sectioned` anchoring.
   */
  sectionId?: string;
  /**
   * BCP-47 primary subtag. The set is configuration, not a product limit.
   */
  lang?: 'en' | 'kn' | 'hi' | 'ta' | 'te';
}
/**
 * Indirection over the media layer. Resolves to a managed provider or an in-house pipeline without the client knowing (G18/D28).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "MediaRef".
 */
export interface MediaRef {
  kind: 'image' | 'audio' | 'video' | 'slide';
  url: string;
  mimeType?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  bytes?: number;
  /**
   * Video only. One entry per published language (G18 — captions are mandatory).
   */
  captions?: {
    lang: LanguageCode;
    url: string;
    [k: string]: unknown;
  }[];
}
/**
 * A presentation slide. The speaker notes are the text spine (G19).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Slide".
 */
export interface Slide {
  index: number;
  sectionId: string;
  title?: string;
  image: MediaRef;
  /**
   * Blocks of the spine that narrate this slide.
   */
  notesBlockIds?: string[];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Author".
 */
export interface Author {
  id: string;
  name: string;
  kind: 'platform' | 'person';
  /**
   * Free-text affiliation shown under the name in the picker, e.g. "Class 8B".
   */
  context?: string;
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "VoiceSummary".
 */
export interface VoiceSummary {
  id: string;
  name: string;
  languages: LanguageCode[];
  /**
   * e.g. "calm, medium pace"
   */
  description?: string;
}
/**
 * Entry in the Explanation picker (G7).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ExplanationSummary".
 */
export interface ExplanationSummary {
  id: string;
  title?: string;
  form: ExplanationForm;
  origin: ExplanationOrigin;
  author: Author;
  anchoring: Anchoring;
  visibility?: Visibility;
  /**
   * @minItems 1
   */
  languages: [LanguageCode, ...LanguageCode[]];
  /**
   * Derived styles available. Master content only — empty for contributed (G4 Part 3).
   */
  styles?: StyleId[];
  /**
   * Voice ids with narration available or generatable.
   */
  voices?: string[];
  estimatedMinutes?: number;
  slideCount?: number;
  /**
   * The Circle's designated default, or the master when none is set (G19/D41).
   */
  isDefault?: boolean;
}
/**
 * Card payload for Discover and search results. Deliberately excludes view counts and popularity (G1 principle 6).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "KnowledgeSummary".
 */
export interface KnowledgeSummary {
  id: string;
  title: string;
  summary?: string;
  collectionId?: string;
  collectionTitle?: string;
  cover?: MediaRef;
  languages: LanguageCode[];
  explanationCount?: number;
  estimatedMinutes?: number;
  hasAudio?: boolean;
  hasVideo?: boolean;
}
/**
 * Knowledge detail with its Explanation index. Master content always exists (G3/D31).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Knowledge".
 */
export interface Knowledge {
  id: string;
  title: string;
  summary?: string;
  /**
   * Master version. All variant cache keys include it (G13 Law 1).
   */
  version: number;
  sourceLanguage: LanguageCode;
  /**
   * The declared scope a contribution is checked against (G4 Part 2).
   */
  keyConcepts?: string[];
  collectionId?: string;
  collectionTitle?: string;
  cover?: MediaRef;
  /**
   * Ordered editorially: user's last choice, Circle default, master, then by author (G19).
   *
   * @minItems 1
   */
  explanations: [ExplanationSummary, ...ExplanationSummary[]];
  voices?: VoiceSummary[];
  related?: KnowledgeSummary[];
}
/**
 * The readable content of one Explanation at one style and language.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ExplanationContent".
 */
export interface ExplanationContent {
  knowledgeId: string;
  explanationId: string;
  language: LanguageCode;
  style?: StyleId;
  version?: number;
  status: VariantStatus;
  form?: ExplanationForm;
  anchoring?: Anchoring;
  /**
   * Present when status is `ready`. Block ids match the master for full-anchored variants.
   */
  blocks?: Block[];
  /**
   * Presentation form only.
   */
  slides?: Slide[];
  media?: MediaRef1;
  /**
   * Present when status is `generating`. Client polls after this interval.
   */
  retryAfterSeconds?: number;
  /**
   * Present when status is `unavailable` — the nearest available combination to offer (G7 rule 4).
   */
  fallback?: {
    language?: LanguageCode;
    style?: StyleId;
    explanationId?: string;
    [k: string]: unknown;
  };
}
/**
 * Indirection over the media layer. Resolves to a managed provider or an in-house pipeline without the client knowing (G18/D28).
 */
export interface MediaRef1 {
  kind: 'image' | 'audio' | 'video' | 'slide';
  url: string;
  mimeType?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  bytes?: number;
  /**
   * Video only. One entry per published language (G18 — captions are mandatory).
   */
  captions?: {
    lang: LanguageCode;
    url: string;
    [k: string]: unknown;
  }[];
}
/**
 * Generated audio for one (Explanation, Style, Language, Voice) tuple.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Narration".
 */
export interface Narration {
  knowledgeId: string;
  explanationId: string;
  language: LanguageCode;
  style?: StyleId;
  voiceId: string;
  version?: number;
  status: VariantStatus;
  media?: MediaRef;
  /**
   * Block-level time markers. Drives highlight-and-follow and shared read/listen position (G3, G7).
   */
  marks?: {
    blockId: string;
    startSeconds: number;
    endSeconds?: number;
  }[];
  retryAfterSeconds?: number;
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "CollectionSummary".
 */
export interface CollectionSummary {
  id: string;
  title: string;
  summary?: string;
  cover?: MediaRef;
  knowledgeCount?: number;
}
/**
 * Payload for the Discover surface. Editorial ordering only — no trending, no counts (G1 principle 6).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "DiscoverIndex".
 */
export interface DiscoverIndex {
  /**
   * @maxItems 2
   */
  featured?: [] | [KnowledgeSummary] | [KnowledgeSummary, KnowledgeSummary];
  collections?: CollectionSummary[];
  knowledge: KnowledgeSummary[];
}
