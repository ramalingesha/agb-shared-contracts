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

import type { LanguageCode, StyleId, VariantStatus } from './primitives';
import type { MediaRef } from './media';
import type { Block } from './content-blocks';

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
