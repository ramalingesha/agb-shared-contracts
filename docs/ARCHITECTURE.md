# Architecture — agb-shared-contracts

## What this is

A static, versioned set of language-agnostic contracts published as one npm package,
`@ramalingesha/shared-contracts` (version 2.9.0), to GitHub Packages. It holds JSON Schema files,
two JSON data tables, an error-code registry, generated TypeScript `.d.ts` files and examples. There
is no runtime service, database or API. Node consumers `npm install` it; Python consumers fetch the
raw JSON over HTTPS. Services validate against the schemas themselves.

The point is one source of truth: several Python and Node services and apps agree on the same error
codes, response envelope, Knowledge read surface and Studio job model, and "did the contract change?"
is a diffable CHANGELOG question.

## What the package contains

| Area | Files | Own version field |
|---|---|---|
| Error registry | `error-codes.json` (22 codes in AUTH, VAL, DB, SYS, BIZ) | yes, equals package version |
| Response envelope | `api-response-schema.json` | yes, equals package version |
| Knowledge Platform read surface | `knowledge-api.schema.json`, `types/knowledge-api/` | yes, `0.1.0` today |
| Content Studio | `schemas/studio/`, `examples/studio/`, `types/studio/` | no (package version) |

## Knowledge contract (`knowledge-api.schema.json`)

Top-level types: `DiscoverIndex` (featured, collections, knowledge), `CollectionSummary`,
`KnowledgeSummary`, `Knowledge`, `ExplanationSummary`, `ExplanationContent`, `Narration`, `BuddyBank`.
The schema descriptions cite Confluence design items (G and D numbers, for example D31, D28, D35, D36,
D40, D41); they are not the D61 to D69 decisions in the parent repo.

Core enums (all verified in the schema):

- **LanguageCode:** `en`, `kn`, `hi`, `ta`, `te`.
- **StyleId:** `simple`, `favorite-teacher`, `professional`, `friend`. Redefined in 2.0.0 (AGB-649,
  breaking); applies to master content only. The `friend` style may carry a Study Jam payload.
- **ExplanationForm:** `text`, `presentation`, `video`, `audio`.
- **ExplanationOrigin:** `master`, `derived`, `contributed`. Only `master` may be style-derived. Set per
  Explanation, not per Knowledge. Master content always exists for a Knowledge.
- **Anchoring:** `full`, `sectioned`, `whole`: how an Explanation maps onto the master structure, so
  reading position survives a switch. `Block.sectionId` supports `sectioned`.
- **Visibility:** `private`, `circle`, `public`.
- **VariantStatus:** `ready`, `generating`, `unavailable`. `ExplanationContent` and `Narration` carry
  `status`; `generating` comes with `retryAfterSeconds` (client polls), `unavailable` with `fallback`
  (nearest available combination). Adapters and mocks must be able to return all three.
- **MediaRef:** `kind` is `image`, `audio`, `video` or `slide`; plus `url`, `mimeType`, `durationSeconds`,
  `width`, `height`, `bytes`, `captions`, `quality` (`RenditionQuality`: `phone`, `tablet`, `desktop`).
  It is an indirection over the media layer so a client never knows the provider. `url` is a
  `uri-reference` since 2.1.0, so a static corpus can use relative paths.
- **BlockType:** `heading`, `paragraph`, `list`, `listItem`, `quote`, `image`, `table`, `divider`,
  `reference`, `example`, `callout`, `qa`, `takeaways`, `code`.
- Block modifiers: `CalloutVariant` (`did-you-know`, `book-note`, `mix-up`, `another-way`, `example`,
  `summary`, `pattern`), `QaKind` (`check`, `explain-back`, `mcq`, `odd-one-out`, `fill-blank`,
  `true-false`, `short`, `long`, `activity`, `personal`), `Audience` (`learner`, `parent`, `trainer`),
  `Depth` (`core`, `deep`). Text is plain; inline code is a backtick span (2.3.0).
- **Availability:** owner-allowed `languages` and `styles` on `Knowledge` and `ExplanationSummary`; absent
  or empty means all. `CatalogRef` links a Knowledge to a user-management BookChapter id (`chapterId`).
- **Narration:** per (Explanation, style, language, voice); block-level `marks` drive highlight-and-follow
  (a mark with `part: "answer"` is the answer of a `qa` block). `VoiceSummary.sample` is a MediaRef.
- **Buddy:** `BuddyBank` with `BuddyTerm` and `BuddyQuestion`, served only by the Buddy service.
- **Study Jam (2.6.0):** `ExplanationContent.studyJam` (`StudyJam`) only with `style: "friend"`. Two
  speakers (`tara`, `kavi`), sections with pictures, exchanges, summary and challenges; five activity
  types (choice, order, fix, teach, practice). `ExplanationSummary.styleVariants` limits a style to listed
  languages. Id uniqueness is checked by the content build, not by JSON Schema.

## Content Studio contracts (`schemas/studio/`)

Added in 2.7.0 (AGB-889) and extended in 2.8.0 (AGB-894/895/896) and 2.9.0 (AGB-898/899/900). JSON Schema draft-07 is the source.

- **Job and stage:** `job` (sources, circle, class, subject, book, template, rebuildMode, languages,
  state, parentJob, item, and the optional `catalog` reference); `stage` (status, producer, attempt,
  inputs, outputs, error, provenance, optional `checks` and `previousCommit`).
- **StageId:** `inventory`, `master`, `generate`, `slides`, `narration-script`, `audio`, `translation`,
  `publish`. `stage-io.json` lists inputs and outputs per stage; `generate` runs once per item
  (`lesson`, `study-jam`, `buddy-bank`, `glossary`, `objects`, `pictures`).
- **Review:** `review` (state and history), `review-record`, and `review-transitions.json`. States are
  `draft`, `in-review`, `changes-requested`, `approved`, `locked`; `locked` is terminal.
- **Producer:** kinds are `manual`, `claude-session`, `rules`, `fake` (tests), or `api:`, `voice:`,
  `parse:` plus a provider name. Providers and review roles are configuration (`studio-config`), not
  enums, so adding one needs no schema change.
- **Templates:** one `template` schema with a `kind` (`lesson`, `narration-style`, `slide`,
  `voice-emotion`, `picture-kit`); a published `id@version` is immutable.
- **Config and runner:** `provider-profile` (tier `Free`, `Standard`, `Premium`, `Enterprise`),
  `media-store`, `runner-settings`, `studio-config`.
- **page-map (2.8.0):** the book pages each block came from.
- **inventory, pages, coverage-report, gate-index, picture-requests (2.9.0):** the source inventory, the page ledger, the inventory-to-master coverage report, the Gate 1 index and the picture requests for the drawn kits. The job also gains `sources[].layout`, `sourceLanguage` and `asIsItems`, and the Runner settings gain `intake` and `ocr`.
- **Store keys** are relative, forward-slash, pattern-checked; no schema holds an OS path.

## Versioning policy

- Package version is the release train: MINOR for additions (new optional fields, new files), MAJOR for
  changing or removing a field, type or enum member (2.0.0 was the one breaking release, the StyleId set).
- `error-codes.json` and `api-response-schema.json` must equal the package version (`scripts/check-versions.js`,
  also enforced in CI).
- `knowledge-api.schema.json` has an independent `version`, currently `0.1.0`, while the package is
  2.8.x. This is a known gap tracked in AGB-902; the parent decision log records "align the K3 schema
  version with the package version" as D67. It is not covered by the equality check.
- Every schema change needs a `CHANGELOG.md` entry (checked in the pre-push hook), and no error code may
  be removed.
- Release history: 2.8.0 Studio review screens, 2.7.0 Studio contracts, 2.6.0 Study Jam, 2.5.0 picture and
  table explanations, 2.4.0 voice samples and answer marks, 2.3.0 technical lessons, 2.2.0 MVP modules,
  2.1.0 `uri-reference`, 2.0.0 StyleId, 1.2.0 Knowledge schema, 1.1.0 CI pipeline, 1.0.0 error registry.

## Generation, validation, publishing

- `types/knowledge-api/` and `types/studio/` are generated by `json-schema-to-typescript` (plus the
  TypeScript compiler API for the topic split) and committed, never hand-edited. The freshness check
  fails on any diff or untracked generated file.
- `npm run validate` runs the three validators; the Knowledge validator also checks
  `scripts/contract-samples.json`.
- CI runs only on push to `main` (path filtered); PR-only checks moved into the husky hooks (AGB-837).
- `publish.yml` runs on a `v*.*.*` tag: bump `package.json`, update `CHANGELOG.md`, merge, then tag.

## Consumers

Named in this repo: gnanora-content (templates folder validation, content build), user-management
(BookChapter ids in `CatalogRef`), and the Buddy service (`BuddyBank`). Per the AGB-907 brief, also
consumed by gnanora-app, gnanora-studio, user-management-service, gnanora-content-access and the
content generators; those names do not appear in this repo's files (unverified here). The package is
mounted in the parent repo as `services/shared-contracts` and `UI/agb-shared-contracts`.

## Related

Parent repo `ramalingesha/ai_gnan_bandar`: Confluence-derived design in `docs/`, and decisions in
`docs/DECISIONS-AND-STATE.md`. Relevant entries: D66 (styles: Simple, Favourite teacher, Professional,
Friend leading to Study Jam), D67 (align the schema version with the package version), D61 (two content
modes: pre-generated library and Studio), and section 5 (Content Studio, epic AGB-888).

Last verified against main 567eabf on 2026-11-10
