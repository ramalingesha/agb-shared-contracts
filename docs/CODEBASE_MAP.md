# Codebase Map — agb-shared-contracts

**Purpose:** "where do I look for X?" for `@ramalingesha/shared-contracts` (package version 2.12.0).
Read [ARCHITECTURE.md](ARCHITECTURE.md) for what the contracts mean. This repo has no runtime
code: it is JSON Schema, JSON data tables, generated `.d.ts` files, examples and validator scripts.
Default branch is `main`. There is no `CLAUDE.md` or `AGENTS.md` on `main`; `.github/instructions/shared/`
holds the shared coding-standards files.

| If you are working on... | Start here | Also look at | Notes |
|---|---|---|---|
| Error codes (22 codes: AUTH, VAL, DB, SYS, BIZ) | `error-codes.json` | `scripts/validate-error-codes.js` | `version` must equal the package version |
| Standard API response envelope | `api-response-schema.json` | `scripts/validate-error-codes.js` | `version` must equal the package version |
| Knowledge Platform read surface (Knowledge, Explanation, Block, MediaRef, Narration, Buddy, Study Jam) | `knowledge-api.schema.json` | `types/knowledge-api/*.d.ts` | Own `version` field, currently `0.1.0` (known gap, AGB-902) |
| Generated Knowledge types | `types/knowledge-api/index.d.ts` (barrel) | `primitives`, `media`, `content-blocks`, `explanation`, `knowledge`, `narration`, `buddy`, `study-jam` `.d.ts` | Generated, never hand-edit |
| Knowledge type generator | `scripts/generate-knowledge-types.js` | `npm run generate:types` | Compiles the schema, then splits by topic |
| Knowledge schema validation and samples | `scripts/validate-knowledge-api-schema.js` | `scripts/contract-samples.json` | Samples: real snippets that must pass, and invalid ones that must fail for a named field |
| Content Studio contracts (job, stage, review, producer, template, config; 2.12.0 adds job-plan, runner-presence, notification, notification-prefs and stage progress, wait and estimate; 2.11.0 adds the template `generate` block, `job-item`, `item-keys`, `practice` and `job.generation`; 2.10.0 adds `runner-settings.sessionTimeoutMinutes`; 2.9.0 adds inventory, pages, coverage-report, gate-index, picture-requests) | `schemas/studio/*.schema.json` | `schemas/studio/common.schema.json` | JSON Schema draft-07, source of truth |
| Legal review state moves | `schemas/studio/review-transitions.json` | `schemas/studio/review.schema.json` | `locked` has no exit |
| Stage inputs and outputs | `schemas/studio/stage-io.json` | `schemas/studio/stage.schema.json` | Artifacts are store keys under `jobs/<job>/` |
| Studio examples (one per contract) | `examples/studio/*.json` | `scripts/validate-studio-schemas.js` | Checked against the schemas |
| Generated Studio types | `types/studio/index.d.ts` | `scripts/generate-studio-types.js` | `npm run generate:studio-types` |
| Studio contract tests | `scripts/validate-studio-schemas.js` | `STUDIO_TEMPLATES_DIR=<folder>` | Also validates a folder of template files (used by gnanora-content, per README) |
| Version consistency (package, error codes, API envelope) | `scripts/check-versions.js` | `.husky/pre-commit` | Knowledge schema version is not in this check |
| "CHANGELOG updated" and "no error code removed" | `scripts/check-changes-vs-base.js` | `.husky/pre-push` | Runs against local `origin/main` |
| "Generated types are fresh" | `scripts/check-types-fresh.sh` | `.husky/pre-push`, `.github/workflows/validate.yml` | Regenerates both type folders and fails on any diff |
| CI on merge | `.github/workflows/validate.yml` | `.github/workflows/publish.yml` | Validate runs on push to `main` (path filtered) |
| Publishing | `.github/workflows/publish.yml` | `package.json` `files`, `.npmrc` | Triggered by a `v*.*.*` tag, publishes to GitHub Packages |
| What ships in the package | `package.json` `files` | | Allowlist; a missing entry is a silent packaging bug |
| Release history | `CHANGELOG.md` | | Keep a Changelog format |
| Consumer usage snippets | `README.md` | | Node `require`, Python raw JSON, TypeScript `import type` |

## Commands

- `npm run validate` (also `npm test`): runs the three validators (error codes, knowledge schema, studio schemas).
- `npm run generate:types` and `npm run generate:studio-types`: regenerate the committed `.d.ts` folders.
- `npm run build` only prints a notice; there is nothing to build.
- Local gates are in `.husky/pre-commit` (JSON syntax, validate, version consistency) and
  `.husky/pre-push` (adds types freshness and the changelog/error-code check).

## How consumers use it

- Node: `require('@ramalingesha/shared-contracts/knowledge-api.schema.json')` for runtime ajv checks;
  `import type { Knowledge } from '@ramalingesha/shared-contracts/types/knowledge-api'`;
  Studio: `.../schemas/studio/job.schema.json` and `.../types/studio` (README examples).
- Python: fetch the raw JSON over HTTPS (ARCHITECTURE.md).
- Fixtures and content builds validate against the schema; mocks must be able to return every `VariantStatus`.

## Adding a new contract file

1. Add the schema (root file, or under `schemas/<area>/`).
2. Add it to the `package.json` `files` allowlist.
3. Add a `scripts/validate-<name>.js` and wire it into the `validate` script.
4. If types are needed, add a generator and commit the output under `types/`.
5. Add its paths to `validate.yml` `push.paths`.
6. Document it in `README.md` and `CHANGELOG.md`, and bump the package version.

## Related

The parent repo `ramalingesha/ai_gnan_bandar` holds the Confluence-derived design in `docs/` and
the decision log in `docs/DECISIONS-AND-STATE.md` (see ARCHITECTURE.md "Related").

Last verified against main 38677fa on 2026-11-10
