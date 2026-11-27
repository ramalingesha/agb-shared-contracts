# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.26.0] - 2026-11-27

### Changed (AGB-1074, local e2e finding F-1; strictly additive: every field is optional, nothing is removed, renamed or narrowed, so every 2.20.0 to 2.25.0 example and event still validates and no earlier example file is edited)
- **The contract adapts to the server for the notes responses.** The local end-to-end run of learner notes Phase A (ai_gnan_bandar PR #418, `FINDINGS.md` F-1) showed that `GET /learners/me/notes`, `GET /students/{id}/notes` and `POST /learners/me/notes/search` answer fields the 2.25.0 schemas (`additionalProperties: false`) did not list, so a strict client (ajv, generated types) failed. These fields predate the contract and the existing parent app relies on them, so they are now listed:
  - **`Note`**: optional `status` (`open` | `replied` | `resolved`), `statusKey` (`notes.status.<status>`), `tagKey` (`notes.tag.<slug>`: the tag lower-cased, apostrophes dropped, other runs of non-alphanumerics as `_`, for example `notes.tag.i_dont_get_this`), `edited` (boolean, true when `latestVersion` is above 1) and `updatedAt` (date-time).
  - **`NoteListResponse`**: optional `studentId` and `nextCursor` (string or null, the next page; null on the last page).
  - **`NoteSearchResponse`**: optional `studentId` and `nextCursor`.
- **`cursor` is DEPRECATED, not removed.** 2.23.0 added `cursor` to `NoteListResponse` and `NoteSearchResponse` (AGB-1148) but the server pages with `nextCursor`; it also sends `cursor` as an exact copy, so both are present in a real answer. New clients read `nextCursor` and fall back to `cursor` for a server that sends only that; the descriptions say so. `NoteListQuery.cursor` (the request side) is unchanged and takes the value of either.
- **Not changed (observations for the server, see the PR):** `NoteReply.guardianId` stays required in the contract although the service leaves it out of what a student caller receives; the list also accepts `status` and `knowledgeId` query parameters that `NoteListQuery` does not document. Neither was seen in the e2e run, so neither is touched here.
- **Deployment order**: publish contracts first; then the progress service tests against it and the app reads `nextCursor`. No service has to change for these fields (the server already sends them).
- New examples (`note-server-list-response`, `note-server-list-response-page`, `note-server-search-response`, `note-server-note-edited`) mirror the real captured answers; invalid examples (`note-server-status-unknown`, `note-server-tag-key-bad`, `note-server-edited-not-boolean`, `note-list-response-next-cursor-number`). Tests in `scripts/validate-dashboard-schemas.js`: the new shapes, a back-compat run of every 2.20.0 to 2.25.0 example, and a comparison of `progress-api.schema.json` against the `v2.25.0` tag (no definition removed, no property removed or changed, no `required` list changed, only the listed properties new, only the two `cursor` descriptions changed). Types regenerated.

## [2.25.0] - 2026-11-27

### Added (AGB-1074, learner notes step-up; strictly additive, nothing is removed or renamed, so every 2.20.0 to 2.24.0 example and event still validates and no example file is edited)
- **`StepUpStartResponse.required`** (`schemas/dashboard/guardian.schema.json`): optional array (`minItems` 1, `uniqueItems`) of `password` | `totp` | `code`, listing exactly which `StepUpCompleteRequest` fields (`password`, `totpCode`, `code`) the server will require for this step-up. `method` cannot say it all: a social-only account with MFA on needs both the mailed code and the authenticator code, which `method` reports as `email-code`, so it is `["code", "totp"]`. Absent means infer from `method` as before (an older server). Clients must collect every listed proof before submitting, because a missing factor costs one try. `StepUpMethod`, the `required` list and `additionalProperties: false` of `StepUpStartResponse` are unchanged.
- **Deployment order**: publish contracts first; then the user-management service returns `required` from step-up start; then the app uses it instead of the `GET /auth/mfa/status` workaround. Until then an app keeps inferring from `method`.
- New examples `step-up-start-response-required-password-totp`, `step-up-start-response-required-code-totp`, `step-up-start-response-required-code`; invalid examples `step-up-required-empty`, `step-up-required-unknown-value`, `step-up-required-duplicate`. Tests in `scripts/validate-dashboard-schemas.js`: the new shapes, a back-compat run of every 2.20.0 to 2.24.0 example, and a comparison of `guardian.schema.json` against the `v2.24.0` tag (only `StepUpStartResponse.required` is new). Types regenerated.

## [2.24.0] - 2026-11-27

### Added (Studio, epic AGB-888: the Runner's "Drawing the pictures" step)
- **`pictures` progress step** (`schemas/studio/stage.schema.json`, `progress.step`): the master stage now draws a lesson's pictures after the master text is written and before its checks, and the Runner reports that as its own step so the Studio can show "Drawing the pictures" in every language. The list stays closed; the new value sits between `generating-item` and `checks`. Nothing is removed or renamed.
- **Deployment order**: publish contracts first; then the Studio Worker, Runner and app can use the step (an older Worker that validates the step list would refuse a Runner report with `pictures`).

## [2.23.0] - 2026-11-26

### Added (AGB-1148, story A1 of the learner notes Phase A technical analysis AGB-1074 section 6, epic AGB-1066; every new field is optional and nothing is removed or renamed, so every 2.20.0, 2.21.0 and 2.22.0 example and event still validates; the 2.22 example files are not edited)
- **Deployment order (important)**: publish contracts, then the progress service (an older service rejects the new message types and `quoteOffset` with strict schemas), then user-management, then the app (TA D20). Sharing is Phase B (contracts 2.24.0); there are no sharing types, no share events and no `sys-` actor here.
- **`note` event detail** (`EventNote.detail`, still `additionalProperties: false`): optional `quoteOffset` (integer, 0 or more; create and edit only) and `redacted` (`const: true`, `readOnly`, SET BY THE SERVER ONLY). `redacted` is in the schema so that `/changes` and export events of a deleted note still validate against `LearningEvent`; because the schema allows it, intake refuses a client-sent `redacted` with an explicit check after validation on both `/events` and `/events/parent`. No new actions, no new actors. `CreateNoteRequest` and `EditNoteRequest` gain `quoteOffset` (new examples `create-note-request-quote-offset`, `edit-note-request-quote-offset`).
- **`Note` DTO**: optional `audience` (a plain `string`, documented values `only-me` and `guardian`; readers must tolerate unknown strings, so deliberately not a closed enum) and `guardianVisible` (boolean, computed at read time).
- **Search**: `NoteSearchRequest` (POST body `{ q (1 to 100 characters), sectionId?, cursor?, limit? }`, so note text never reaches a URL or an access log; there is no GET `q`) and `NoteSearchResponse`.
- **Versions**: `NoteVersionsResponse` (`{ noteId, versions[] }`; a deleted note answers 404 and never this shape).
- **Status**: `LearnerRelation` (`none` | `self` | `guarded`) and `LearnerStatusResponse` (`{ relation, recording, guardianVisible, guardianSince }`; no link row at all is `none`, `off`, `false`, `null`).
- **Self export**: `SelfExportResponse` (`{ learnerId, exportedAt, notes[] }`), `SelfExportNote` (a live note with its versions) and `DeletedNote` (`{ id, deletedAt }`, text and quote never exported). No other person's id or name.
- **Guardian export and "not ready"**: `ExportResponse` gains optional `derivedPending`, `reviews` and `reviewSnoozes`; `sectionStates` and `roundSummaries` are no longer required (they were required in 2.22.0; every 2.22 document still has them). When `derivedPending` is true exactly `sectionStates`, `roundSummaries`, `reviews` and `reviewSnoozes` are omitted and `summaries`, `positions` and `rounds` stay. `MapResponse`, `TopicResponse`, `HomeResponse`, `MyLearningResponse` and `ReviewListResponse` gain optional `ready` (a boolean; absent means true; `false` = "being prepared", data fields empty). 2.22 consumers must tolerate the absent sections and the extra field.
- **Own consent and step-up (user-management)**: `LearnerRecordConsentRequest`, `LearnerRecordConsent` (PUT and GET `/learners/me/record-consent`), `StepUpMethod`, `StepUpStartResponse`, `StepUpCompleteRequest`, `StepUpCompleteResponse` (`/learners/me/step-up/start` and `/complete`).
- **Gap fixes (owner decisions on the TA gaps)**: `redacted` (server-set, `readOnly`) is also on `EventCorrection.detail`, and `reason` is then required only when `redacted` is absent (a redacted correction has had its reason blanked; 2.22 corrections always carry it; the generated type has `reason` optional). `Note` gains `quoteOffset`. `NoteListResponse` gains `cursor` and `NoteListQuery` documents `chapter`, `tag`, `cursor`, `limit` (max 50). `ExportResponse` gains optional `notes` (live notes or `{ id, deletedAt }`) and `noteReplies`; the service applies the claim rule. `LearnerEraseRequest` `{ ticket }` types the erase body. A not-ready `TopicResponse` uses `ready: false` with placeholder values for the required keys (for example a non-empty `reasonKey`); there is no not-ready topic example.
- **Per-event refusal codes** (`dashboard-errors.json`): `EVENT_KIND_NOT_ALLOWED` (permanent), `LINK_ERASED` (permanent) and `SCHEMA_UNSUPPORTED` (version skew: keep the event, retry after an app update), next to `EVENT_INVALID`. Unknown codes must be treated like version skew. Step-up codes: `STEP_UP_REQUIRED` (401, ticket missing, expired or used), `STEP_UP_CODE_INVALID` (400), `STEP_UP_LOCKED` (429) and `STEP_UP_SEND_LIMITED` (429).
- **Internal signed messages are not schemas here.** The progress service owns the zod schemas of `POST /internal/guardianship` (story A2) and documents them in `SIGNED_REQUESTS.md`. For reference (TA D22): `StudentLinked { profileId, guardianId, version, claimedAt? }`, `StudentUnlinked { profileId, version, reason?: 'rollback' | 'deactivated' }`, `ConsentChanged { profileId, state, consentVersion, purposes?, version }`, `SelfLearnerEnabled { profileId, selfConsentVersion, purposes, version }`, `SelfLearnerDisabled { profileId, version, reason?: 'withdrawn' | 'ineligible' }`.
- Examples for every new shape in `examples/dashboard/`, invalid examples (schema-level only; service rules go to service tests) in `examples/dashboard/invalid/`, and tests in `scripts/validate-dashboard-schemas.js`: every new example validates, a 2.23.0 back-compat test runs every 2.20.0 to 2.22.0 example and event (the files are unedited) plus a `/changes` response carrying the new note fields, a check against the 2.22.0 commit that no `progress-api` definition lost a property or gained a required one, and a check that no sharing type exists. Types regenerated (`npm run generate:dashboard-types`).

## [2.22.0] - 2026-11-25

### Added (AGB-1099 dashboard content contracts, epic AGB-1066, from the approved TA AGB-1076 section 6; every new field is optional and nothing is removed or renamed, so every 2.20.0 and 2.21.0 document and event still validates)
- **Deployment order (important)**: publish contracts, then upgrade the progress service to 2.22 (it must accept the `activity-done` kind and the new `answer` detail fields), then ship an app and content that send them. The progress service's intake schema up to 2.21 rejects unknown event kinds and unknown detail fields (`additionalProperties: false`), so an app that sends `activity-done`, `mixUpId` or `newCase` to a service still on 2.21 gets `EVENT_INVALID`. The content fields below are not sent to the service, so they can ship earlier; the reader must ignore an unknown block type first (not yet verified, TA question Q8).
- **What the server enforces today versus planned**: nothing new is enforced yet. The progress service does not read `mixUpId`, `newCase`, `activity-done`, `tests`, `mixUpMatches`, `expectedSeconds` or `buildsOn`. Rules v1.1, the content gate, the Studio checks and the chapter context are PLANNED follow-up stories (AGB-1076 tasks 5 to 13); the descriptions in the schemas say so field by field.
- **`activity` block** (`knowledge-api.schema.json`): `BlockType` gains `activity`; `Block.activity` is an `Activity` (required when `type` is `activity`): `id`, `title`, `deepens` (section id), `minutes`, `materials` (at least 1), `steps` (at least 2), `observe`, `safety` (at least 1), `listenFor`, `source` (at least 1, each `{name, kind: book|teacher|own, ref?}`) and `verification` `{status: unverified|verified, verifiedAt, verifiedBy, triedWith, minutesActual}` (`verifiedAt` and `verifiedBy` both required when verified, so a named person tried it; `verifiedBy` is a display name or role label, max 120 characters, never an email or contact detail; editorial, stripped from served content; unverified needs neither). There is deliberately no image, photo or media field and nothing about the child. The rule that an unverified activity is never published is a content-gate and Studio rule (planned), not a schema rule.
- **Mix-up matching**: `Block.mixUpMatches` on `qa` blocks, `[{option, mixUpId}]`; `option` is a 0-based index into `options`, or `"true"` / `"false"` for a true-false question; `mixUpId` is the block id of the mix-up callout (no new id space). The schema checks the shape only; that the id names a mix-up callout of the chapter and that the index is in range are content-gate checks (planned).
- **`newCase`** (boolean) and **`tests`** (`gets-it` | `remembers` | `can-use`, new `QuestionTest`) on `qa` blocks.
- **`answer` event detail**: optional `mixUpId` and `newCase`; `correction.replacement` for an answer accepts them too.
- **`activity-done` event kind** (17th kind; `EventActivityDone`): PARENT actor only (`actor` is the constant `parent`; the service also refuses a student token), `detail` is `{activityId, languages?}` (languages from the five codes, no duplicates), no photo and no free text (`additionalProperties: false`), `sectionId` (the section the activity deepens) and `round` required, `blockId` is the activity block id, the date is the event's `at`, idempotent by `eventId`. `correction.replacement` accepts `targetKind: activity-done`.
- **`SectionSummary`** `{id, title?, expectedSeconds}` and optional `Knowledge.sections`; **`Knowledge.buildsOn`** (earlier chapter ids; `prerequisites` stays as it is). `expectedSeconds` is computed by the content pipeline; `unlocks` is computed, never stored.
- Examples for every new shape in `examples/knowledge-api/` (now in the package `files`) and `examples/dashboard/` (`event-activity-done`, `event-answer-mixup`), invalid examples in the `invalid/` folders (an activity without safety notes, without enough steps, without source or with a photo field; a `tests` value that does not exist; `mixUpMatches` pointing at a non-string; `activity-done` from a student, with extra fields, without a round), and tests: a back-compat test that every 2.20.0 and 2.21.0 example and event still validates, the older `qa`, `callout` and `check` shapes stay valid, and the real content samples in `scripts/contract-samples.json` still pass. Generated types regenerated for both schemas (`scripts/generate-knowledge-types.js` groups updated).

### Not in this release (the TA lists them, this story did not)
- `correctOption`, `level` and `listenForIds` on `qa` blocks. `level` would clash with the existing heading `level` (integer 1 to 6) on the same `Block`; the three need their own story and a name decision.
- `chapter-context.schema.json` (the `dashboard-context.json` feed), the `QuestionBank` file shape and `Block`-level validation of section ids: separate stories (AGB-1076 tasks 7 and 3).
- There is no `Section` definition in `knowledge-api.schema.json` (the spine's sections live in the content repository), so `expectedSeconds` is carried by a new `SectionSummary` listed in `Knowledge.sections`.

## [2.21.0] - 2026-11-25

### Added (AGB-1096 contracts follow-ups of the progress service, epic AGB-1066; every new field is optional and nothing is removed or renamed, so every 2.20.0 event, request and response still validates)
- **Deployment order (important)**: publish contracts, then upgrade the progress service to 2.21, then ship an app that sends `sectionIndex` or `practiceTotal`. The app must not send them to a service still on 2.20: its intake schema rejects them (EVENT_INVALID).
- **`read` / `listen` detail**: optional `sectionIndex` (integer >= 1, 1-based position of the section in its chapter). When absent the server derives it from a `sectionId` of exactly `s<number>`; when present it wins.
- **`round-complete` detail**: `practiceTotal` (integer >= 0, the chapter's practice question count) next to the existing `sectionsTotal` (the chapter's section count; descriptions corrected), and the rule for who may send it: the student actor only; the server verifies the claim and ignores and counts any other.
- **`correction` detail**: optional `replacement` = `{ targetKind, detail }`, where `detail` holds only fields the target kind's own detail allows (partial; any kind except `correction`); `targetKind` must equal the real kind of the corrected event (checked by the server, not the schema). `replacement` and a narrower per-actor rule are PLANNED: the progress service does not apply them yet (it only voids). Documented as the service works today: an earlier event only; a student may not correct read, listen, revisit, round-start or round-complete, anything else may be corrected by anyone with access; chains judged from the latest seq down (correcting a correction restores the original).
- **Response shapes** (new `schemas/dashboard/progress-reads.schema.json`): `MapResponse`, `TopicResponse`, `HomeResponse`, `MyLearningResponse` (`noteKeys`, `rememberedWithoutExplanation` and `stretchRight` are on Map and Topic only; MyLearning has the child-friendly `learning.state.*` keys; steps 0 to 6 as `UnderstandingStep`). State, step and kind keys are open strings (known values listed in the descriptions) so a newer server value never fails a strict client and `ExportResponse`. `ChangesResponse` (`{ changes, cursor, hasMore }`) already existed in `progress-api.schema.json` and is unchanged.
- **`dashboard-errors.json`**: `EXPORT_TOO_LARGE` (413) and `INVALID_PARAMETER` (400).
- **Guardians**: `GuardianAgeBand` (`under13` | `13to17`, what user-management stores), optional `ageBandGuardian` on `StudentProfile` and `CreateStudentProfileRequest` (drift: user-management sends and accepts the two-band value IN `ageBand` and does not use `ageBandGuardian` today; convergence is a tracked follow-up), `guardianAgeBandOf(ageBand)` in `dashboard/index.js` (5-7, 8-10, 11-13 -> under13; 14-17 -> 13to17), and the claim shapes `ClaimStudentRequest`, `ClaimableStudentsResponse`, `ClaimCodeResponse`, plus `ParentGateVerifyResult` (`{ ok, elevatedUntil }`, what user-management answers to gate/verify today; see also `ParentGateVerifyResponse`).
- Examples for every new field and shape in `examples/dashboard/`, invalid examples in `examples/dashboard/invalid/`, and tests (including a back-compat test that every 2.20.0 example still validates).

### Changed (documentation only)
- `teach-back.detail.keyWordsInEnglish` description now says what the plan and the server mean: true = the child said the key English words (understanding in the home language counts), false = the child did NOT say them (a language-barrier signal when explaining in a non-English language), absent = unknown (counts as understood). The field name and type are unchanged; the 2.20.0 text said the opposite.

## [2.20.0] - 2026-11-22

### Added (AGB-1084 dashboard contracts for AGB-904 guardian profiles and AGB-1067 progress service; all new or optional, nothing removed, so everything valid before still is)
- **Token claims** (`schemas/dashboard/token-claims.schema.json`): optional `profile` (`adult` | `student`), `guardian` (the parent's subject id) and `consent_v`. A token issued before the change has none of them and is an adult token; use `profileOf(claims)` / `isStudentToken(claims)` from `@ramalingesha/shared-contracts/dashboard`, which treat an absent `profile` as adult.
- **Guardian API** (`guardian.schema.json`): `StudentProfile`, `CreateStudentProfileRequest` / `Response`, `UpdateStudentProfileRequest`, `StudentProfileList`, `ProfileConsent`, `GiveConsentRequest`, `SetParentPinRequest`, `ParentGateVerifyRequest` / `Response`, `SwitchStudentResponse`, `SwitchToParentResponse`, `DataRequestResult`.
- **Learning events** (`learning-event.schema.json`): `LearningEvent`, a union discriminated by `kind` with a `detail` shape per kind (16 kinds: read, listen, revisit, answer, reveal, self-check, teach-back, revision, round-start, round-complete, note, buddy-question, switch, help-request, review-done, correction), plus `EventKind`, `LadderStep` (1..6, labels Met, Tried, Gets it, Can explain, Remembers, Can use it), `WeakSpotCause`, `NextStep` (an object `{kind, knowledgeId?, sectionId?, blockId?, to?}` with 13 kinds), `ReviewItemType`. `buddy-question` carries the child's `text` (1 to 500 characters); `teach-back` outcome is `understood` | `words-only` | `gap` | `misconception` with optional `keyWordsInEnglish`; `answer` has optional `openedFirst`; a note's tag is one of the 5 fixed tags.
- **Progress API** (`progress-api.schema.json`): event intake (`EventIntakeRequest` of 1 to 50 events, `EventIntakeResponse` with per-event `accepted` | `duplicate` | `error`), positions, changes (`?since`), notes (create, edit, list, reply) and reviews (list, done, rhythm, catch-up).
- **`schemas/dashboard/dashboard-errors.json`**: `PIN_LOCKED`, `CONSENT_REQUIRED`, `STUDENT_SCOPE_ONLY`, `CONSENT_NOT_ACTIVE`, `NOT_GUARDIAN`, `EVENT_INVALID`, `BATCH_TOO_LARGE`, `CURSOR_EXPIRED`, each with its HTTP status. A separate file, like `studio-errors.json`; the numbered registry in `error-codes.json` is unchanged.
- **`dashboard/index.js`** (runtime, no dependencies): `BATCH_MAX = 50`, Kong forwarded header names `HEADER_PROFILE_ID = 'x-profile-id'` and `HEADER_GUARDIAN_ID = 'x-guardian-id'`, `LADDER_LABELS`, `profileOf`, `isStudentToken`.
- Generated types in `types/dashboard/index.d.ts` (`npm run generate:dashboard-types`, checked by `scripts/check-types-fresh.sh` and CI); one example per contract and one valid fixture per event kind in `examples/dashboard/`; tests in `scripts/validate-dashboard-schemas.js` (part of `npm run validate`): unknown kind, detail of another kind, batch of 51 and of 0, ladder out of range and more are rejected.
- Publish order once this is released: contracts, then user-management (AGB-904), progress service (AGB-1067), Kong, then the app.

## [2.19.0] - 2026-11-21

### Added (AGB-1009 narration audio in several files; additive, everything valid before still is)
- **`Narration.parts`** (manifest v2): an array of `NarrationPart` `{url, durationSeconds, startOffsetSeconds, mimeType?, bytes?, sha256?}`, played in order as one continuous track. With `parts`, `media` must be absent (a v1-only player then finds no audio instead of playing one file against the whole timeline's marks) and every `marks[]` entry is in seconds on the WHOLE timeline, so highlighting is independent of the file playing. Without `parts` nothing changes: the v1 single-file manifest (`media`) stays valid, byte for byte.
- New `NarrationPart` definition and generated type. Samples: a real v1 manifest and a trimmed real v2 (two Favorite Teacher files) are accepted; parts with media, a part without `startOffsetSeconds` and an empty `parts` are rejected.
- Not in the schema (a producer checks it): part 0 starts at 0 and each `startOffsetSeconds` equals the earlier parts' durations added up. gnanora-narration-service `speech:publish-manifest` does.
- Publish order once this is released: contracts, then narration-service (consumes it), content-access, then the Reader library and the app.

## [2.18.0] - 2026-11-20

### Added (AGB-1020 change after publish, AGB-1035 import, AGB-1028 total sections; all new or optional, so everything valid before still is)
- **Change after publish** (Worker 0f38200): `facet-change-request` (body of `POST /lessons/:id/facets/:facet/change` and `.../discard`, optional `expectedVersion`), `take-down-request` (`.../take-down`, `expectedVersion` required), `change-open-result` (201 opened / 200 joined), `discard-result` (including the `noop` answer), `take-down-result` (202), `facet-history` (`GET .../facets/:facet/history`: live, draft with its changes so far, versions with before/after per line), `master-history` (`GET .../master/history`) and `add-section-request` (`POST .../master/sections`; the answer is a `review-comment` of kind `add-section`).
- **`comment-send`** gains optional `expectedVersion` (the live version the page showed; stale answers `text_changed_since_preview`).
- **`approve-result`** gains optional `version` and `draft` (not sent by the Worker yet; today approving a draft or a changed master answers the plain 2.17.0 result).
- **Import** (AGB-1035): `import-request` (`POST /lessons/:id/items/:item/import`, `language`, optional `expectedSha256`) and `import-result` (201 imported / 200 `noop`, with an ordinary `run`).
- **`run`**: `inputRef` and `outputRef` stay free-form objects but now document the keys of known runs (an import run: `source: "import"`, `from`, `branch`, `path`, `facet`, `language`, `sha256`; a change run: `source: "change"`, `facet`, `baseVersion`, `changes`). Description only: the keys are not validated, so any older `inputRef` stays valid.
- **`job-item`** gains optional `totalSections` (AGB-1028 item 11: the whole item's section count, for "1 of N sections" on a sample). Not sent by the Worker yet.
- No new error codes: every code those routes use is already in `studio-errors.json` (a test now checks the list).

## [2.17.0] - 2026-11-19

### Added (AGB-1024, review by comments; all new or optional, so everything valid before still is)
- **`review-comment`** schema and example: a reviewer's change request on a line or a section (key, anchor text and hash, body, optional typed text, state `open` / `sent` / `changed` / `accepted` / `withdrawn`, the run that handled it, the text it produced, the thread of earlier rounds).
- **`comment-list`**: `GET /lessons/:lessonId/items/:item/comments` (comments with their current text, `previewHash`, counts, `can`).
- **Requests and answers:** `comment-create`, `comment-edit`, `comment-send` and `comment-send-result`, `comment-again`, `comment-accept-result`, `approve-request` (`previewHash`) and `approve-result`.
- **`common` `PreviewHash`** (SHA-256 hex of the text the reviewer looked at).
- **`lesson-view`**: optional `comments` `{open, sent, changed}` and `canApprove` on `master` and on each card; optional `approvedHash` on a card's `facet`.
- **`studio-errors.json`** gains `comments_open`, `text_changed_since_preview`, `text_changed_since_approval` (the item is approved on other text than the one sent), `comment_state`, `comment_not_found`.
- Response-only strings of `review-comment` have a `maxLength` matching the Worker's clipping; `approve-request` says which older routes take it with every field optional; `comment-create` says typed text belongs to one line.

## [2.16.0] - 2026-11-19

### Added (AGB-1018, Studio lesson that stays open; all optional or new, so everything valid before still is)
- **`run`** schema and example: one piece of background work for one item (kind `generate`, `update-sections`, `edit`, `voice` reserved; executor `runner` or `external`; estimate, state, actual tokens).
- **`lesson-view`** schema and example: what `GET /lessons/:lessonId` returns (master, a card per item with label in five languages, run, facet, reserved `marks` and `draft`, recent runs, `can`).
- **`template-generate`** items gain optional `base` (the base style, made first), `style` (the key in facet names and block keys) and `names` (display name per language).
- **`studio-errors.json`** gains `after_not_met` and `run_not_found`.

### Changed
- **`review-transitions.json`**: `locked` may now move to `approved` or `changes-requested` (lessons no longer reach `locked`; a job already there must be able to leave). The one test that said `locked` is terminal now says it can leave.
- **`FacetKey`** accepts any style key (`[a-z][a-z-]{1,30}`), not only the four known ones, so a template can add a style with no contract change. Every key valid before is still valid.

## [2.15.1] - 2026-11-13

### Changed (AGB-990: documentation only, no schema change, so everything valid before still is)
- **`StudyJam.labels`** is described as being in the language of the payload, not "English only": the Study Jam now exists in five languages and each language's payload carries its own labels, which the app applies over that language's table (AGB-988). The keys are the names of the app's Study Jam labels; the app ignores any it does not know.

## [2.15.0] - 2026-11-12

### Added (AGB-888 Phase 6b Runner operations, AGB-943; optional field only, so everything valid before still is)
- **`runner-settings`** gains optional `claudeCommand` (full path of Claude Code on the machine). `studio-runner doctor` checks it; the Runner already reads it before this release.

## [2.14.0] - 2026-11-12

### Added (AGB-888 Studio fixes round 2: status check; new codes only, so everything valid before still is)
- **`studio-errors.json`** gains `status_check_too_soon` (a stage's status was asked for again before the minimum gap) and `nothing_running` (no part of the job is running, so there is nothing to check).

## [2.13.0] - 2026-11-12

### Added (AGB-888 Phase 6a: creator journey; all optional or new files, so everything valid before still is)
- **`job`** gains optional `kind` (`lesson`, `extension`), `lessonId`, `facet`, `knowledgeName`, `outputs` (`languages` and `narrationStyles`, at least one each, plus reserved `extras`), `audience` (`presets`, `text` up to 500 characters, `version`) and `review.mode` (`each-phase`; `auto` reserved). `template.source` (`standard`, `circle`, `mine`). `languages` stays as a mirror of `outputs.languages`.
- New schemas and examples: **`lesson`** and **`lesson-facet`** (facet grammar `narration:<style>:<lang>`, `slides:<lang>`, `audio:<style>:<lang>`, `buddy:<lang>`).
- **`TemplateKind`** gains `audience`. **`stage.wait.reason`** gains `paused` and `cancelled`.
- New data files: **`audience-presets.json`** (the closed list of presets, each with a short English brief and structured constraints) and **`studio-errors.json`** (every Studio Worker error code, with `internal` for codes people never see).

## [2.12.0] - 2026-11-11

### Added (AGB-888 Phase 5: job status, plan before start, leave and come back; all optional or new files, so everything valid before still is)
- **`stage`** gains optional `progress` (closed `step` list, `i`, `n`, `label`), `wait` (closed `reason` list: start, review, dependency, usage, runner, busy, capacity, claim), `startedAt`, `finishedAt`, `estimate` and `actual`.
- **`job.autoContinue`** (default false): pre-approves the next Claude-session stage after a gate is approved; never approves a gate.
- New schemas and examples: **`job-plan`** (per-stage plan and estimate in sessions and tokens of the person's own plan, ranges, confidence, approvals), **`runner-presence`**, **`notification`** (closed kind list plus params) and **`notification-prefs`** (per kind: inApp, email, browser).

## [2.11.0] - 2026-11-11

### Added (AGB-888 Phase 4: parallel generation and Gate 2; all optional or new files, so everything valid before still is)
- **`template-generate`** schema and `template.body.generate` (checked when present): items as data with `after`, producers per tier, `group`, `checks`, `review`, `required`, `when`, estimate hints and `maxParallelItems`.
- **`job.generation`** (`started`, `startedBy`, `startedAt`, `items`, `sample`), **`job-item`** (the items board view with twelve states), **`item-keys`** and **`practice`** (ids only; no question or answer text).
- **`gate-index`** gate enum gains `items` (Gate 2). **`stage`** gains optional `retryAfter`, `scope` and `targetItem`.
- **`runner-settings`**: `maxParallelSessions`, `pauseOnLimit`, `loadLimit`; `producers.<stage>` may be a per-item map with `default`.
- Block-key styles `bank`, `activity`, `glossary`, `objects`, `lab`, `practice` documented in the README (key grammar unchanged). No knowledge-schema change.

## [2.10.0] - 2026-11-10

### Added (AGB-888: Studio Runner session limit; one optional field, so everything valid before still is)
- **`runner-settings.sessionTimeoutMinutes`** (integer, 1 to 240, default 30): how long one Claude session may run before the Runner stops it. The Runner already honours it; the `STUDIO_CLAUDE_TIMEOUT_MS` environment value still wins when set.

## [2.9.0] - 2026-11-10

### Added (AGB-898/899/900: Content Studio Phase 3, upload to Gate 1; all optional or new files, so everything valid before still is)
- **`job.sources[].layout`** (`auto`, `single`, `spread`), **`job.sourceLanguage`** and **`job.asIsItems`** (inventory ids kept as in the book).
- New schemas and examples: **`inventory`** (items and page ledger), **`pages`** (intake manifest), **`coverage-report`**, **`gate-index`**, **`picture-requests`**.
- **`stage-io`**: `inventory` outputs `inventory`, `pages`, `source-text`; `master` outputs `master`, `coverage`, `picture-requests`, `page-map`, `gate-index`.
- **`producer.input.pagesDir`** and **`pageImages`**: the local page folder a session may read (never committed).
- **`runner-settings.intake`** (`renderer`, `dpi`, `maxEdge`, `imageDpi`, `mediaStore`), **`ocr`** (`engine`, `tessdataFolder`) and **`batchPages`**: adapters are chosen by name in settings, never by operating system, so moving a step to a cloud service is configuration.

## [2.8.0] - 2026-11-09

### Added (AGB-894/895/896: Studio review screens; all optional or new files, so everything valid before still is)
- **`job.catalog`** (`boardId`, `classId`, `subjectId`, `bookId`), an optional reference into the app catalog.
- **`stage.checks`** (`[{id, message}]`, plain-words failed checks) and **`stage.previousCommit`** (the branch commit before a regeneration, for the before/after view).
- **`page-map`** schema and example: `studio-jobs/<job>/page-map.json`, the book pages each block came from.

## [2.7.0] - 2026-11-09

### Added (AGB-889: Content Studio contracts; new files only, so nothing valid before changes)
- **`schemas/studio/`** (JSON Schema draft-07, source of truth) with generated `types/studio/index.d.ts` and one `examples/studio/<name>.json` per contract: `job`, `stage`, `review`, `review-record`, `producer`, `provider-profile`, `template`, `media-store`, `runner-settings`, `studio-config`, plus `common` building blocks.
- **Data tables**: `review-transitions.json` (legal review moves; `locked` is terminal) and `stage-io.json` (input and output artifacts per stage).
- **Store keys** are relative, forward-slash and checked by pattern; no schema holds an OS, drive letter or absolute path.
- **Providers and roles are configuration, not enums**: `api:<name>`, `voice:<name>`, `parse:<name>` producer kinds; review roles come from `studio-config`. Tests add a `fake` provider and a `circle-teacher` role with no schema change.
- **Templates**: one `template` schema with a `kind`; a published `id@version` is immutable, a changed pattern is a new version.
- `npm run generate:studio-types`, `scripts/validate-studio-schemas.js` (wired into `npm run validate`); `STUDIO_TEMPLATES_DIR=<folder>` also validates a templates folder.
- Producer kind `fake` (plain, for tests) and optional `runner-settings.contentRepoUrl` (the content repo the Runner clones).
- `package.json` `files` ships `schemas/studio`, `examples/studio` and `types/studio`.

## [2.6.0] - 2026-11-05

### Added (AGB-855: Study Jam, the Friend style as a two-friend conversation; all optional, so all content valid before still is)
- **`ExplanationContent.studyJam`** (`StudyJam`): present only with `style: "friend"` (schema `if/then`). `blocks` stay present so contents, the Buddy and older apps keep working. `StudyJam` holds `schema` (payload format, 1), `chapter`, `nav` (`tabs` or compact), optional English `labels`, two `speakers` (`tara`, `kavi`) and `sections`.
- **Sections** carry `pictures` (a `MediaRef`, `viewBox` and regions already resolved to rectangles in viewBox units), `exchanges` (lines, an optional note and activity, and the book text first cited there), `summary` ("Key ideas") and `challenges` ("Try it around you", each with an optional harder follow-up).
- **Activities**: `choice`, `order`, `fix`, `teach`, `practice`. Exactly one `ok` option per choice, challenge and find-and-fix (`StudyJamAtMostOneOk`, checked for the first six options, plus `contains`).
- **Stable ids**: every line has an explicit id and a speaker, so two-speaker narration can attach later. Ids match `^[a-z0-9][a-z0-9-]*$`; uniqueness within a payload is checked by the content build (JSON Schema cannot).
- **`ExplanationSummary.styleVariants`**: a style listed here is openable only in the listed languages and is labelled by `presentation` (`study-jam`). Keys must be styles listed in `styles` (not expressible in JSON Schema; the content build sets both).
- No `StudyJam` field names a language; the language of a payload is `ExplanationContent.language`. `validate` checks this.
- `look` lines may omit `points` (the picture has no regions): the inline link then opens the whole picture.
- `scripts/contract-samples.json`: trimmed real sections of the c4 Study Jam, a valid sample for each activity type, and 8 invalid samples.

## [2.5.0] - 2026-10-17

### Added (AGB-734: the Buddy reads every kind of content; optional, so all content valid before still is)
- **Explanations.** `image` and `table` blocks gain `explanation`: a teacher's explanation of the picture, graph, diagram or table (what it shows, how to read it, what to notice), plain text. Authoring checks it against the object's facts (every fact mentioned, nothing added). The reader shows it in "Explain this picture"; the Buddy retrieves it.
- **Captions.** `caption`, until now for `code` blocks only, also titles `image` and `table` blocks.
- `scripts/contract-samples.json`: a valid and an invalid sample.

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
