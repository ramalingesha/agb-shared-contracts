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
   * Manifest v2 (AGB-1009): the narration as several audio files played one after the other as one continuous track. Present: `media` is absent, and every mark is in seconds on the WHOLE timeline (part 0 starts at 0; part n starts at `startOffsetSeconds`), so highlighting does not care which file is playing. Absent: the single-file manifest (v1), `media` plays alone and marks are seconds in that file. A player reads `parts` when it has it and falls back to `media`.
   *
   * @minItems 1
   */
  parts?: [NarrationPart, ...NarrationPart[]];
  /**
   * Block-level time markers. Drives highlight-and-follow and shared read/listen position (G3, G7). With `parts` (v2) the seconds are on the whole timeline across all files.
   */
  marks?: {
    blockId: string;
    startSeconds: number;
    endSeconds?: number;
    /**
     * A second mark for the same `qa` block (AGB-691): where its answer is read, after the question and its think pause. The app reveals the answer on screen when narration reaches it. Absent: the mark is the block itself (for a `qa`, its question).
     */
    part?: 'answer';
  }[];
  retryAfterSeconds?: number;
}
/**
 * One signed audio file of a v2 narration (AGB-1009). Files are played in array order; `startOffsetSeconds` is where the file starts on the whole timeline (the sum of the earlier files' `durationSeconds`, which a producer checks; the schema cannot).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "NarrationPart".
 */
export interface NarrationPart {
  /**
   * Like `MediaRef.url`: absolute, or a key relative to the corpus base. content-access answers it with a signed link.
   */
  url: string;
  mimeType?: string;
  durationSeconds: number;
  startOffsetSeconds: number;
  bytes?: number;
  /**
   * SHA-256 of the file's bytes (lowercase hex): lets a player or a publisher check the file is the one signed.
   */
  sha256?: string;
}
