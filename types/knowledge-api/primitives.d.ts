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
  'heading' | 'paragraph' | 'list' | 'listItem' | 'quote' | 'image' | 'table' | 'divider' | 'reference' | 'example';
