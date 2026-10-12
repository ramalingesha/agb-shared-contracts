/**
 * AUTO-GENERATED — do not edit by hand.
 * Generated from knowledge-api.schema.json by scripts/generate-knowledge-types.js.
 * Run `npm run generate:types` after changing the schema, then commit the result.
 * Source of truth: Confluence UPDS -> Knowledge Platform -> K3.
 *
 * One file of the types/knowledge-api/ split — import from the package root
 * (`@ramalingesha/shared-contracts/types/knowledge-api`, i.e. this directory's
 * index.d.ts barrel) rather than from an individual file.
 */

import type { LanguageCode, StyleId } from './primitives';
import type { MediaRef, VoiceSummary } from './media';
import type { ExplanationSummary } from './explanation';

/**
 * Read surface for the Gnanora Knowledge Platform. Implemented by the mock adapter, the static file adapter, and the live service — all three MUST satisfy this schema. Responses are wrapped in the AGB standard envelope (api-response-schema.json); the definitions here describe the `data` payload only. Source of truth: Confluence UPDS → Knowledge Platform → K3. Domain model: Gnanora Product → G3.
 */
export interface GnanoraKnowledgeAPIContract {
  [k: string]: unknown;
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
   * Whether this Knowledge appears in the Discover listing (GET /knowledge). Defaults to true when absent. A Knowledge with discoverable: false is still directly fetchable by id — this only controls listing/aggregation, matching the distinction between the Discover index and a direct knowledge fetch (AGB-649).
   */
  discoverable?: boolean;
  /**
   * Ordered editorially: user's last choice, Circle default, master, then by author (G19).
   *
   * @minItems 1
   */
  explanations: [ExplanationSummary, ...ExplanationSummary[]];
  voices?: VoiceSummary[];
  related?: KnowledgeSummary[];
  /**
   * Catalog chapters this Knowledge teaches (AGB-672).
   */
  catalogRefs?: CatalogRef[];
  availability?: Availability;
  /**
   * What this Knowledge builds on, in plain words (AGB-672), e.g. 'Living and non-living things'. Its 'Before you start' check questions test these.
   */
  prerequisites?: string[];
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
/**
 * The owner's on/off control for a Knowledge or one of its explanations (AGB-672). Languages and styles not listed are turned off: hidden in the app and skipped by the pipeline. An absent (or empty) list (or an absent `availability`) means every supported one is on.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Availability".
 */
export interface Availability {
  languages?: LanguageCode[];
  styles?: StyleId[];
}
/**
 * A link from a Knowledge to a catalog chapter in user management (AGB-672), so a Circle's catalog can point at the content that teaches it.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "CatalogRef".
 */
export interface CatalogRef {
  /**
   * The user-management BookChapter id.
   */
  chapterId: string;
}
