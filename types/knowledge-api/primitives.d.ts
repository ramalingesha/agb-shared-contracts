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

/**
 * BCP-47 primary subtag. The set is configuration, not a product limit.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "LanguageCode".
 */
export type LanguageCode = 'en' | 'kn' | 'hi' | 'ta' | 'te';
/**
 * A derived text Explanation. Redefined per AGB-649 — four voice/register options (Simple, Favorite Teacher, Professional/Domain Expert, Friend), documented in gnanora-content's README. Applies to master content only (G4 Part 3).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StyleId".
 */
export type StyleId = 'simple' | 'favorite-teacher' | 'professional' | 'friend';
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
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'listItem'
  | 'quote'
  | 'image'
  | 'table'
  | 'divider'
  | 'reference'
  | 'example'
  | 'callout'
  | 'qa'
  | 'takeaways';
/**
 * What a `callout` block is (AGB-672). `did-you-know`: a surprising fact. `book-note`: the source book's words kept as they are, with what is more accurate (never a silent fix). `mix-up`: a common misunderstanding and the correction. `another-way`: an everyday comparison for a hard idea. `example`: a worked example. The app shows the label for the variant; the text itself is plain.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "CalloutVariant".
 */
export type CalloutVariant = 'did-you-know' | 'book-note' | 'mix-up' | 'another-way' | 'example';
/**
 * What a `qa` block asks for (AGB-672). `check`: a 'Before you start' question whose answer says where to read if unsure. `explain-back`: the learner explains it in their own words, with `listenFor` as the checklist. The rest follow the source book's question types. Absent: an in-section practice question.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "QaKind".
 */
export type QaKind =
  | 'check'
  | 'explain-back'
  | 'mcq'
  | 'odd-one-out'
  | 'fill-blank'
  | 'true-false'
  | 'short'
  | 'long'
  | 'activity'
  | 'personal';
/**
 * Who a block is for (AGB-672). `parent`: the parent guide, shown in the parent view. Absent means `learner`.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Audience".
 */
export type Audience = 'learner' | 'parent';
/**
 * Which device class a media rendition is made for (AGB-672), so a player can pick the right one.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "RenditionQuality".
 */
export type RenditionQuality = 'phone' | 'tablet' | 'desktop';
