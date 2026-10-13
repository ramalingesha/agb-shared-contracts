# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-10-13

### Added (AGB-691: listening; both optional, so all content valid before still is)
- **Voice samples.** `VoiceSummary.sample` (`MediaRef`): a few seconds of the voice, played in the voice picker before choosing.
- **Answer marks.** A narration mark may carry `part: "answer"`: a second mark for the same `qa` block, where its answer is read after the question and its think pause. The app reveals the answer on screen when narration reaches it. A mark without `part` is the block itself (for a `qa`, its question).
- `scripts/contract-samples.json`: a valid and an invalid sample for each.

## [2.3.0] - 2026-10-12

### Added (AGB-720: technical lessons; all optional, so all content valid before still is)
- **Code.** `BlockType` gains `code`: `text` is the code verbatim (whitespace and newlines kept), with optional `codeLanguage` (`ts`, `html`, `css`, `bash`, `diff`, …) and `caption` (e.g. a file path). Narration never reads a code block.
- **Inline code (decision).** Inline code is a backtick span inside plain text (paragraph, listItem, callout, qa), e.g. `` `standalone: true` ``, shown in a monospace style. The alternative, inline marks, was not chosen: spans keep the text readable as it is and need no new structure. Everything else stays plain text (2.2.0).
- **Slide points.** `Slide.points?: string[]` (one to five short lines). When present, the app draws `title` and `points` as text and `image` is the picture only. A slide without `points` behaves as before.
- **Trainer notes.** `Audience` gains `trainer` for lecturer-only notes (a slide's "Watch for", a trainer guide), hidden from learners like `parent`.
- **Depth.** `Block.depth` (`Depth`): `core` (default when absent) or `deep` (Deep-dive track only). `CalloutVariant` gains `summary` (a section's Quick-track "In one breath").
- **Pattern cards.** `CalloutVariant` gains `pattern` (intent, use when, smell, avoid when, as text; its template code is the `code` block that follows).
- **Tables.** `table` blocks gain `rows: string[][]` (the first row is the header).
- **MCQ reasons.** `qa` gains `optionNotes: string[]`, one reason per option, in the order of `options`.
- `scripts/contract-samples.json`: a valid sample per new field from the reference lesson How Angular Components Work, and an invalid sample per field.

## [2.2.0] - 2026-10-12

### Added (AGB-672: the MVP demo modules; all optional, so all content valid before still is)
- **Section extras.** `BlockType` gains `callout`, `qa` and `takeaways`.
  - `callout`: `Block.variant` (`CalloutVariant`): `did-you-know`, `book-note` (the book's words kept, with what is more accurate), `mix-up`, `another-way`, `example`.
  - `qa`: the question in `text` and the answer in `answer`. Optional fields:
    - `kind` (`QaKind`): `check`, `explain-back`, `mcq`, `odd-one-out`, `fill-blank`, `true-false`, `short`, `long`, `activity`, `personal`. Absent means a practice question.
    - `ref`: the book's question number.
    - `options`: the choices.
    - `answerKind`: `model` or `guidance`.
    - `listenFor`: the teach-back checklist.
    - `sectionRefs`: where the topic is taught.
  - `takeaways`: key points as `items`.
  - Text stays plain; the app shows each variant's label.
- `Block.audience` (`Audience`): `parent` for the parent guide; absent means `learner`.
- `Knowledge.catalogRefs: CatalogRef[]` (user-management BookChapter ids).
- `Knowledge.availability` and `ExplanationSummary.availability` (`Availability`): the owner's allowed `languages` and `styles`; absent or empty means all.
- `Knowledge.prerequisites: string[]`.
- `ExplanationSummary.sectionId` (video explanations): where the clip plays inline.
- `MediaRef.quality` (`RenditionQuality`): `phone`, `tablet` or `desktop`.
- `BuddyBank`, `BuddyTerm`, `BuddyQuestion`: the Curious Buddy's glossary and prepared questions, served only by the Buddy service. A term's optional `bookNote` keeps the book's wording with what is more accurate.
- `scripts/contract-samples.json`: real pilot-chapter snippets the schema must accept, and samples it must reject for a named field; checked by `npm test`.

## [2.1.0] - 2026-09-06

### Changed
- `MediaRef.url` and `MediaRef.captions[].url` widened from `format: "uri"` to
  `format: "uri-reference"` (AGB-607). Non-breaking: every value valid before is still
  valid. `uri` required an absolute URL with a scheme, which the K3 static-adapter
  layout cannot satisfy — that corpus is a relocatable file tree served from whatever
  base a consumer points at, so a fixture genuinely cannot know its own host and must
  express media relative to the corpus root. The constraint only went unnoticed because
  no fixture carried media until the seed narration corpus existed; every one of the
  first 60 narration fixtures failed validation against it. A live/CDN-served asset
  still returns an absolute URL, and consumers resolve a relative one against the same
  base they fetched the JSON from.

## [2.0.0] - 2026-09-03

### Changed (BREAKING)
- `StyleId` redefined from `["plain", "simple", "with-examples"]` to
  `["simple", "favorite-teacher", "professional", "friend"]` — four voice/register
  options (Simple, Favorite Teacher, Professional/Domain Expert, Friend), documented
  in `gnanora-content`'s `README.md` (AGB-649). Any consumer matching on the old enum
  values must update to the new set; there is no backward-compatible overlap beyond
  `"simple"`.

### Added
- `Knowledge.discoverable?: boolean` — controls whether a `Knowledge` appears in the
  Discover listing (`GET /knowledge`). Defaults to `true` when absent; a `Knowledge`
  with `discoverable: false` is still directly fetchable by id. Purely additive
  (AGB-649).

## [1.2.0] - 2026-08-26

### Added
- `knowledge-api.schema.json` — the Gnanora Knowledge Platform read-surface contract
  (Confluence UPDS → Knowledge Platform → K3), covering `DiscoverIndex`, `Knowledge`,
  `ExplanationSummary`, `ExplanationContent`, `Block`, `Slide`, `Narration`, `MediaRef`,
  and supporting types. `VariantStatus` (`ready`/`generating`/`unavailable`) is part of
  the contract so every adapter (mock, static, live) can represent all three states.
- `types/knowledge-api/` — generated TypeScript types for the schema, split into
  small topic-grouped files (`primitives.d.ts`, `media.d.ts`, `content-blocks.d.ts`,
  `explanation.d.ts`, `knowledge.d.ts`, `narration.d.ts`, each well under ~200
  lines) plus a barrel `index.d.ts`, generated by `scripts/generate-knowledge-types.js`
  (`npm run generate:types`) and committed so TS/Node consumers get compile-time
  types with no build step of their own. The public import path
  (`@ramalingesha/shared-contracts/types/knowledge-api`) is unchanged from a
  single-file layout — TypeScript resolves it to the barrel automatically.
- `scripts/validate-knowledge-api-schema.js` — extends `npm run validate` to check the
  new schema's structure, required definitions, the `VariantStatus` enum, and that it
  compiles cleanly under `ajv` with no dangling `$ref`s.
- New `devDependencies`: `ajv@^8.20.0`, `json-schema-to-typescript@^15.0.4`,
  `typescript@^5.9.3` (build-time only, used by `generate-knowledge-types.js` to
  parse and split the compiled output — not part of the published package).

### Fixed
- `package.json`'s `"files"` allowlist was missing `knowledge-api.schema.json` (added
  to the repo ahead of this release, PR #3) — the published npm tarball silently
  omitted it even though it was committed to `main`. Existing `^1.1.0` consumers (e.g.
  `gnanora-content`) that expected `node_modules/@ramalingesha/shared-contracts/knowledge-api.schema.json`
  to exist would not have found it until this fix.

### Changed
- `validate.yml`: added path triggers, JSON-syntax check, and a generated-types
  freshness check for the new schema/types files; added an `npm ci` install step
  (this package now has real `devDependencies` for the first time).
- `publish.yml`: validation step now runs `npm run validate` (covers both
  `error-codes.json` and `knowledge-api.schema.json`); added an `npm ci` install step.
- `knowledge-api.schema.json`: `Block.lang` and `ExplanationContent.media` now wrap
  their `$ref` in `allOf` instead of pairing it with a sibling `description` —
  functionally identical, but avoids a `json-schema-to-typescript` quirk where a
  `$ref` + sibling keyword gets treated as a distinct schema (it was silently
  duplicating `MediaRef` as a second `MediaRef1` interface, and inlining
  `Block.lang` as a literal union instead of the named `LanguageCode` type). Found
  while restructuring `types/knowledge-api.d.ts` into the split above.

## [1.1.0] - 2026-01-21

### Added
- GitHub Actions CI/CD pipeline for automated validation and publishing
- `validate.yml` workflow for PR validation
- `publish.yml` workflow for automated publishing to GitHub Packages
- Error code validation script (`scripts/validate-error-codes.js`)
- Comprehensive validation checks:
  - JSON syntax validation
  - Error code uniqueness verification
  - Required fields presence validation
  - HTTP status code validation
  - Severity level validation
  - Category consistency validation
  - Version consistency checks across all JSON files
  - Breaking changes detection
  - CHANGELOG update enforcement

### Changed
- Package name changed from `@agb/shared-contracts` to `@ramalingesha/shared-contracts`
- Version bumped from 1.0.0 to 1.1.0
- Repository structure updated for standalone GitHub repository
- License changed from UNLICENSED to MIT
- Added `publishConfig` for GitHub Packages registry
- Enhanced README with installation instructions and usage examples
- Added npm scripts: `validate` and `test`

### Infrastructure
- Repository URL: https://github.com/ramalingesha/agb-shared-contracts
- Registry: https://npm.pkg.github.com/@ramalingesha
- Branch protection enabled on main branch
- Automated releases with CHANGELOG extraction

## [1.0.0] - 2026-01-15

### Added
- Initial error code registry with 22 error codes across 5 categories:
  - AUTH (5 codes): Authentication and authorization errors
  - VAL (4 codes): Validation and input errors
  - DB (5 codes): Database and data persistence errors
  - SYS (5 codes): System and infrastructure errors
  - BIZ (3 codes): Business logic and rule violations
- Standard API response schema for success and error responses
- Versioning strategy for error codes (semantic versioning)
- Deprecation policy (never remove, only deprecate)
- Severity levels: info, warning, error, critical
- HTTP status code mappings
- Comprehensive documentation

### Structure
- `error-codes.json`: Centralized error code registry
- `api-response-schema.json`: Standard API response envelope
- `README.md`: Usage documentation
- `package.json`: Package configuration

[2.0.0]: https://github.com/ramalingesha/agb-shared-contracts/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/ramalingesha/agb-shared-contracts/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ramalingesha/agb-shared-contracts/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ramalingesha/agb-shared-contracts/releases/tag/v1.0.0
