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

import type { MediaRef } from './media';

/**
 * Study Jam (2.6.0, AGB-855): the Friend style as a two-friend conversation with activities. Present only on `style: friend` content. The language is `ExplanationContent.language`; nothing here names a language.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJam".
 */
export interface StudyJam {
  /**
   * Payload format version, not the contract version.
   */
  schema: 1;
  chapter: {
    id: string;
    subject: string;
    grade?: number;
    audience?: 'professional';
  };
  /**
   * Build hint: compact phone navigation for chapters with more than four sections.
   */
  nav: 'tabs' | 'compact';
  /**
   * Optional per-chapter UI string overrides, in the language of the payload (a Tamil Study Jam carries Tamil labels). The keys are the names of the app's Study Jam labels; the app ignores any it does not know.
   */
  labels?: {
    [k: string]: string;
  };
  /**
   * @minItems 2
   * @maxItems 2
   */
  speakers: [StudyJamSpeaker, StudyJamSpeaker];
  /**
   * @minItems 1
   */
  sections: [StudyJamSection, ...StudyJamSection[]];
}
/**
 * Lowercase id, unique within one StudyJam payload (checked by the content build, not by the schema).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamId".
 */
export type StudyJamId = string;
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamSpeakerId".
 */
export type StudyJamSpeakerId = 'tara' | 'kavi';
/**
 * A conversation partner. Ids are stable so two-speaker narration can attach later.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamSpeaker".
 */
export interface StudyJamSpeaker {
  id: StudyJamSpeakerId;
  name: string;
}
/**
 * One spoken line. The id is explicit and stable: exchange lines `<exchange>-l<n>`, activity explanations `<activity>-e<n>`.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamLine".
 */
export interface StudyJamLine {
  id: StudyJamId;
  speaker: StudyJamSpeakerId;
  text: string;
  /**
   * Diagram regions this line talks about.
   *
   * @minItems 1
   */
  points?: [string, ...string[]];
  /**
   * A key explanation the learner can save.
   */
  save?: true;
  /**
   * A "Did you know?" line.
   */
  fact?: true;
  /**
   * The line asks the learner to look at the diagram (an inline "View diagram" on phones). With `points` it opens at those regions; without, at the whole picture.
   */
  look?: true;
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamOption".
 */
export interface StudyJamOption {
  id: StudyJamId;
  ok?: true;
  text: string;
  /**
   * Feedback; always states the correct idea.
   */
  fb: string;
  /**
   * Diagram regions shown for this option.
   *
   * @minItems 1
   */
  points?: [string, ...string[]];
}
/**
 * Options, exactly one marked `ok`.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamOptions".
 */
export type StudyJamOptions = StudyJamAtMostOneOk & StudyJamOptions1;
export type StudyJamOptions1 = StudyJamOption[];
/**
 * An array in which no two items are marked `ok` (checked for the first six positions).
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamAtMostOneOk".
 */
export interface StudyJamAtMostOneOk {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamFixOption".
 */
export interface StudyJamFixOption {
  ok?: true;
  text: string;
  fb: string;
  /**
   * @minItems 1
   */
  points?: [string, ...string[]];
}
/**
 * Replacement lines, exactly one marked `ok`.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamFixOptions".
 */
export type StudyJamFixOptions = StudyJamAtMostOneOk & StudyJamFixOptions1;
export type StudyJamFixOptions1 = StudyJamFixOption[];
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamPicture".
 */
export interface StudyJamPicture {
  id: StudyJamId;
  title: string;
  media: MediaRef;
  /**
   * min-x, min-y, width, height of the SVG.
   *
   * @minItems 4
   * @maxItems 4
   */
  viewBox: [number, number, number, number];
  /**
   * Region name to x, y, width, height in viewBox units, resolved at build time.
   */
  regions?: {
    /**
     * @minItems 4
     * @maxItems 4
     */
    [k: string]: [number, number, number, number];
  };
  /**
   * Region name to the label shown as "Looking at: ...".
   */
  regionLabels?: {
    [k: string]: string;
  };
}
/**
 * A note shown after an exchange's lines.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamNote".
 */
export type StudyJamNote =
  | {
      type: 'terms';
      items: [string, string][];
    }
  | {
      type: 'book';
      quote: string;
      exact: string;
      tell?: string;
    }
  | {
      type: 'table';
      caption?: string;
      /**
       * @minItems 1
       */
      rows: [string[], ...string[][]];
    }
  | {
      type: 'steps';
      caption?: string;
      /**
       * @minItems 1
       */
      items: [string, ...string[]];
    }
  | {
      type: 'code';
      lang: string;
      caption?: string;
      code: string;
    };
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamChoiceActivity".
 */
export interface StudyJamChoiceActivity {
  type: 'choice';
  id: StudyJamId;
  kind: 'predict' | 'evidence' | 'why' | 'connect';
  who: StudyJamSpeakerId;
  ask: string;
  options: StudyJamOptions;
  hint: string;
  idea: string;
  /**
   * @minItems 1
   */
  explain: [StudyJamLine, ...StudyJamLine[]];
  /**
   * Region hidden on the diagram until answered.
   */
  cover?: string;
  answerKind?: 'correct' | 'possible';
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamOrderActivity".
 */
export interface StudyJamOrderActivity {
  type: 'order';
  id: StudyJamId;
  who: StudyJamSpeakerId;
  ask: string;
  pick: string;
  start: string;
  slot: string;
  /**
   * @minItems 2
   */
  items: [
    {
      id: StudyJamId;
      text: string;
      /**
       * @minItems 1
       */
      points?: [string, ...string[]];
    },
    {
      id: StudyJamId;
      text: string;
      /**
       * @minItems 1
       */
      points?: [string, ...string[]];
    },
    ...{
      id: StudyJamId;
      text: string;
      /**
       * @minItems 1
       */
      points?: [string, ...string[]];
    }[]
  ];
  /**
   * Display order, as indices into `items`.
   *
   * @minItems 2
   */
  shuffle: [number, number, ...number[]];
  hint: string;
  /**
   * @minItems 1
   */
  explain: [StudyJamLine, ...StudyJamLine[]];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamFixActivity".
 */
export interface StudyJamFixActivity {
  type: 'fix';
  id: StudyJamId;
  who: StudyJamSpeakerId;
  owner: StudyJamSpeakerId;
  /**
   * @minItems 2
   */
  lines: [string, string, ...string[]];
  /**
   * Index into `lines` of the line to fix.
   */
  wrong: number;
  findHint: string;
  fixAsk: string;
  fixes: StudyJamFixOptions;
  /**
   * @minItems 1
   */
  explain: [StudyJamLine, ...StudyJamLine[]];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamTeachActivity".
 */
export interface StudyJamTeachActivity {
  type: 'teach';
  id: StudyJamId;
  who: StudyJamSpeakerId;
  to: 'tara' | 'kavi' | 'both';
  ask: string;
  say?: string;
  /**
   * @minItems 1
   */
  checks: [string, ...string[]];
  /**
   * Neutral lines; they never confirm the learner's explanation.
   *
   * @minItems 1
   */
  after: [StudyJamLine, ...StudyJamLine[]];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamPracticeActivity".
 */
export interface StudyJamPracticeActivity {
  type: 'practice';
  id: StudyJamId;
  /**
   * [question, answer] pairs from the source. Never blocks.
   *
   * @minItems 1
   */
  items: [[string, string], ...[string, string][]];
}
/**
 * An activity placed right after its exchange. Everything except `practice` blocks Study until answered or skipped.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamActivity".
 */
export type StudyJamActivity =
  | StudyJamChoiceActivity
  | StudyJamOrderActivity
  | StudyJamFixActivity
  | StudyJamTeachActivity
  | StudyJamPracticeActivity;
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamExchange".
 */
export interface StudyJamExchange {
  id: StudyJamId;
  /**
   * Source ids this exchange is based on.
   */
  src: string[];
  /**
   * Lowercase id, unique within one StudyJam payload (checked by the content build, not by the schema).
   */
  pic?: string;
  lines: StudyJamLine[];
  note?: StudyJamNote;
  act?: StudyJamActivity;
  /**
   * "Show the book": source text first cited here, resolved at build time.
   */
  book?: {
    id: string;
    text: string;
  }[];
}
/**
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamFollowUp".
 */
export interface StudyJamFollowUp {
  id: StudyJamId;
  demand: string;
  steps: number;
  given?: string;
  ask: string;
  options: StudyJamOptions;
  hint: string;
  idea: string;
  answerKind: 'correct' | 'possible';
  /**
   * @minItems 1
   */
  explain: [StudyJamLine, ...StudyJamLine[]];
}
/**
 * "Try it around you": practice, not book questions. Never blocks Study.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamChallenge".
 */
export interface StudyJamChallenge {
  id: StudyJamId;
  concept: {
    id: string;
    text: string;
  };
  demand: string;
  steps: number;
  answerKind: 'correct' | 'possible';
  given: string;
  thinkAbout?: string;
  ask: string;
  options: StudyJamOptions;
  hint: string;
  idea: string;
  /**
   * @minItems 1
   */
  explain: [StudyJamLine, ...StudyJamLine[]];
  followUp?: StudyJamFollowUp;
}
/**
 * One section. Its id equals a `sectionId` of the retained legacy blocks.
 *
 * This interface was referenced by `GnanoraKnowledgeAPIContract`'s JSON-Schema
 * via the `definition` "StudyJamSection".
 */
export interface StudyJamSection {
  id: StudyJamId;
  title: string;
  /**
   * The first is the default; a section may have none.
   */
  pictures: StudyJamPicture[];
  /**
   * @minItems 1
   */
  exchanges: [StudyJamExchange, ...StudyJamExchange[]];
  /**
   * "Key ideas".
   *
   * @minItems 1
   */
  summary: [string, ...string[]];
  challenges: StudyJamChallenge[];
}
