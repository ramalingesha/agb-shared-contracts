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

/**
 * Indirection over the media layer. Resolves to a managed provider or an in-house pipeline without the client knowing (G18/D28).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "MediaRef".
 */
export interface MediaRef {
  kind: 'image' | 'audio' | 'video' | 'slide';
  url: string;
  mimeType?: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  bytes?: number;
  /**
   * Video only. One entry per published language (G18 — captions are mandatory).
   */
  captions?: {
    lang: LanguageCode;
    url: string;
    [k: string]: unknown;
  }[];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "Author".
 */
export interface Author {
  id: string;
  name: string;
  kind: 'platform' | 'person';
  /**
   * Free-text affiliation shown under the name in the picker, e.g. "Class 8B".
   */
  context?: string;
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "VoiceSummary".
 */
export interface VoiceSummary {
  id: string;
  name: string;
  languages: LanguageCode[];
  /**
   * e.g. "calm, medium pace"
   */
  description?: string;
}
