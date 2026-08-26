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

import type { BlockType, LanguageCode } from './primitives';
import type { MediaRef } from './media';

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
   * Per-block language override for mixed-script content, so screen readers switch pronunciation (DS10).
   */
  lang?: LanguageCode;
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
