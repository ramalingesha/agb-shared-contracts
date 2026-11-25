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

import type { Audience, BlockType, CalloutVariant, Depth, LanguageCode, QaKind, QuestionTest } from './primitives';
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
   * `code` blocks (AGB-720): what the code is, e.g. its file path (`walkthrough/step-3-bug/tanker-dashboard.ts`). `image` and `table` blocks (AGB-734): a short title, e.g. `Meera's steps each day`.
   */
  caption?: string;
  /**
   * `image` and `table` blocks only (AGB-734): a teacher's explanation of the picture, graph, diagram or table, plain text: what it shows, how to read it, what to notice. Checked at authoring against the object's facts (complete, nothing added). Shown by the reader's "Explain this picture" and used by the Buddy; `alt` stays the short accessible description.
   */
  explanation?: string;
  /**
   * `table` blocks only (AGB-720): the cells, row by row; the first row is the header.
   */
  rows?: string[][];
  /**
   * `qa` blocks only (AGB-720): one reason per option, right or wrong, in the same order as `options`.
   */
  optionNotes?: string[];
  depth?: Depth;
  /**
   * `activity` blocks only (2.22.0, AGB-1099): the activity card. Required when `type` is `activity`.
   */
  activity?: Activity;
  /**
   * `qa` blocks only (2.22.0, AGB-1099): which wrong options are a known mix-up (see `MixUpMatch`). Optional; content tag only, the progress service does not read it yet.
   */
  mixUpMatches?: MixUpMatch[];
  /**
   * `qa` blocks only (2.22.0, AGB-1099): true marks a new-case question (ladder step 6): the idea applied to a case not in the chapter. The stem states every new fact it needs. The block keeps its `kind` (mcq, true-false, explain-back), so older readers render it as before. Absent means false.
   */
  newCase?: boolean;
  /**
   * `qa` blocks only (2.22.0, AGB-1099): what the question tests (`gets-it`, `remembers` or `can-use`). Optional; content tag only, the progress service does not read it yet.
   */
  tests?: QuestionTest;
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
/**
 * 2.22.0 (AGB-1099): says that one wrong option of a `qa` block is a known mix-up. `mixUpId` is the block id of the `callout` with `variant: mix-up` that explains it, so no new id space exists. Content tag only: the progress service does not read it yet; the content gate (planned) checks that the id names a mix-up callout of the same chapter.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "MixUpMatch".
 */
export interface MixUpMatch {
  /**
   * The 0-based index into `options` (for `mcq` and `odd-one-out`), or the string `true` or `false` for a `true-false` question that has no options.
   */
  option: number | ('true' | 'false');
  /**
   * The block id of the mix-up callout, e.g. `s1-mix1`.
   */
  mixUpId: string;
}
/**
 * 2.22.0 (AGB-1099): a hands-on home activity, carried by a `type: activity` block. Everyday items only, complete steps, a safety line, and credits. Children stay out of photos: there is deliberately no image, photo or media field anywhere in an activity, and no field about the child. Copied verbatim in every style; ids, `deepens`, `minutes` and `verification` are not translated. A parent confirming the activity is done is the `activity-done` learning event, which carries ids only.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Activity".
 */
export interface Activity {
  /**
   * Stable activity id, e.g. `act-s2-incubator`. The `activity-done` event's `activityId`.
   */
  id: string;
  title: string;
  /**
   * The id of the section this activity deepens.
   */
  deepens: string;
  /**
   * How long it takes the family, in minutes.
   */
  minutes?: number;
  /**
   * Everyday items from a typical home.
   *
   * @minItems 1
   */
  materials: [string, ...string[]];
  /**
   * Complete steps, in order.
   *
   * @minItems 2
   */
  steps: [string, string, ...string[]];
  /**
   * What to notice, 1 to 3 sentences.
   */
  observe: string;
  /**
   * Safety notes. At least one.
   *
   * @minItems 1
   */
  safety: [string, ...string[]];
  /**
   * What the parent can listen for when the child explains it.
   */
  listenFor?: string[];
  /**
   * Credits. At least one.
   *
   * @minItems 1
   */
  source: [ActivitySource, ...ActivitySource[]];
  verification?: ActivityVerification;
}
/**
 * 2.22.0 (AGB-1099): where an activity comes from, credited.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ActivitySource".
 */
export interface ActivitySource {
  name: string;
  kind: 'book' | 'teacher' | 'own';
  /**
   * Page, unit or other pointer into the source.
   */
  ref?: string;
}
/**
 * 2.22.0 (AGB-1099): editorial record that a person did the activity for real. `verifiedBy` is a Studio person id and is removed from what the app is served (the app sees only `status`). With `status: verified`, `verifiedAt` is required. The plan is that an unverified activity is never published or shown; that gate belongs to the content gate and the Studio (planned), not to this schema.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "ActivityVerification".
 */
export interface ActivityVerification {
  status: 'unverified' | 'verified';
  /**
   * Date (YYYY-MM-DD).
   */
  verifiedAt?: string;
  /**
   * Studio person id. Editorial only; stripped from served content.
   */
  verifiedBy?: string;
  /**
   * The items actually used when it was tried.
   */
  triedWith?: string[];
  minutesActual?: number;
}
