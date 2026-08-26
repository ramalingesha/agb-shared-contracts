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

import type { Anchoring, ExplanationForm, ExplanationOrigin, LanguageCode, StyleId, VariantStatus, Visibility } from './primitives';
import type { Author, MediaRef } from './media';
import type { Block, Slide } from './content-blocks';

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
  /**
   * Video or audio form only — the primary media for this Explanation.
   */
  media?: MediaRef;
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
