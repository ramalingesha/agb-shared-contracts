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

import type { LanguageCode } from './primitives';
import type { MediaRef } from './media';

/**
 * The Curious Buddy's prepared content for one Knowledge in one language (AGB-672): its glossary and likely questions. Served only by the Buddy service, never shipped in the app (`buddy/{knowledgeId}/{lang}.json`).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "BuddyBank".
 */
export interface BuddyBank {
  knowledgeId: string;
  language: LanguageCode;
  version?: string;
  terms: BuddyTerm[];
  questions: BuddyQuestion[];
}
/**
 * A key word of the chapter, with its meaning (AGB-672). Shown as a word card when the word is tapped or asked about.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "BuddyTerm".
 */
export interface BuddyTerm {
  term: string;
  /**
   * Other forms of the word used in the chapter (plurals, verb forms), so they find the same card.
   */
  forms?: string[];
  meaning: string;
  /**
   * An everyday example.
   */
  example?: string;
  /**
   * Where the source book says it differently: the book's words kept as they are, with what is more accurate (as a `book-note` callout does in the text). Never a silent fix.
   */
  bookNote?: string;
  /**
   * The blocks that explain it; the first is where "Read more" goes, and the reader does not mark the word in their sections.
   */
  blockIds?: string[];
  audio?: MediaRef;
}
/**
 * A question learners are likely to ask, answered from the chapter (AGB-672).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "BuddyQuestion".
 */
export interface BuddyQuestion {
  id: string;
  question: string;
  /**
   * Other ways learners ask the same thing.
   */
  rephrasings?: string[];
  answer: string;
  /**
   * Where in the chapter the answer comes from ("See this in the chapter").
   */
  blockIds: string[];
  audio?: MediaRef;
}
