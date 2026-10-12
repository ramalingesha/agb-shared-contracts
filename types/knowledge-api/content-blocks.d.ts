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

import type { Audience, BlockType, CalloutVariant, Depth, LanguageCode, QaKind } from './primitives';
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
   * Plain text content. Absent for divider and image blocks. For a `qa` block, the question. For a `code` block, the code verbatim, whitespace and newlines kept. In other text (paragraph, listItem, callout, qa) an API name may be marked as an inline code span with backticks, e.g. `standalone: true`, shown in a monospace style (AGB-720); everything else is plain.
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
   * Children of a `list` block, or the key points of a `takeaways` block (each a `listItem`).
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
  /**
   * `callout` blocks only.
   */
  variant?: CalloutVariant;
  /**
   * `qa` blocks only: the answer, shown when the learner asks for it. For `answerKind: guidance`, how to approach it rather than one right answer.
   */
  answer?: string;
  /**
   * `qa` blocks only.
   */
  kind?: QaKind;
  /**
   * `qa` blocks only: the source book's own number for the question (e.g. `QT-II.3`, `3.4`), so a learner can match it to their book.
   */
  ref?: string;
  /**
   * `qa` blocks only: the choices (two or more), for `mcq` and `odd-one-out`.
   */
  options?: string[];
  /**
   * `qa` blocks only. `model`: a model answer. `guidance`: how to approach a question with no single right answer (personal questions, activities). Absent means `model`.
   */
  answerKind?: 'model' | 'guidance';
  /**
   * `qa` blocks with `kind: explain-back` only: what a good explanation includes, as a checklist for the listener (a parent, later the parent dashboard). The same in every style.
   */
  listenFor?: string[];
  /**
   * `qa` blocks only: the sections that teach this, so a learner who is unsure knows where to read.
   */
  sectionRefs?: string[];
  audience?: Audience;
  /**
   * `code` blocks only (AGB-720): the language, for highlighting, e.g. `ts`, `html`, `css`, `bash`, `diff`.
   */
  codeLanguage?: string;
  /**
   * `code` blocks only (AGB-720): what the code is, e.g. its file path (`walkthrough/step-3-bug/tanker-dashboard.ts`).
   */
  caption?: string;
  /**
   * `table` blocks only (AGB-720): the cells, row by row; the first row is the header.
   */
  rows?: string[][];
  /**
   * `qa` blocks only (AGB-720): one reason per option, right or wrong, in the same order as `options`.
   */
  optionNotes?: string[];
  depth?: Depth;
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
  /**
   * One to five short lines (AGB-720). When present, the app draws `title` and `points` as text, readable on any screen, and `image` is the picture only, full size. A slide without `points` behaves as before: everything is in the image.
   *
   * @minItems 1
   * @maxItems 5
   */
  points?: string[];
  image: MediaRef;
  /**
   * Blocks of the spine that narrate this slide.
   */
  notesBlockIds?: string[];
}
