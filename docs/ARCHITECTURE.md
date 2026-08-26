# Architecture — agb-shared-contracts

## What this is

A static, versioned, git-committed set of language-agnostic contracts (JSON Schema +
a plain JSON error registry), published as a single npm package
(`@ramalingesha/shared-contracts`) to GitHub Packages. There is no runtime service,
no database, no API of its own — consuming services `npm install` the package (or, for
Python, fetch the raw JSON files over HTTPS) and validate against the schemas
themselves.

## Why contracts live here, not in each service

Multiple services (Python and Node.js) need to agree on the same error codes,
response envelope shape, and — as of AGB-586 — the Gnanora Knowledge Platform's read
surface, without one service's schema silently drifting from another's. A single
source of truth, versioned with semver, makes "did the contract change?" a diffable
git/CHANGELOG question instead of a cross-repo archaeology exercise.

## Versioning model

- The **package version** (`package.json`) is the release train for the whole
  package. A MINOR bump means something was added (new error codes, a new contract
  file, new optional fields); MAJOR means an existing field/type/enum member changed
  or was removed.
- `error-codes.json` and `api-response-schema.json` each carry their own `"version"`
  field, and CI (`validate.yml`/`publish.yml`) hard-enforces that both equal the
  package version — a single, unified version line for those two files.
- `knowledge-api.schema.json` carries its **own, independent** `"version"` field
  (currently `0.1.0`) per its Confluence source of truth (K3: "the schema carries a
  semantic version... adding optional fields is minor, removing/changing one is
  major"). This is deliberately **not** wired into the package-wide version-equality
  check — the schema evolves on its own contract-versioning cadence, separate from the
  package's own release train. See `docs/CODEBASE_MAP.md`'s "Adding a new contract
  file" for the pattern a future contract should follow.

## Publishing

`publish.yml` triggers on a `v*.*.*` git tag push (not automatically on merge to
`main`) — bump `package.json` (and any file with its own version tied to it), update
`CHANGELOG.md`, merge, then tag. `npm publish` runs in CI using the repo's
`GITHUB_TOKEN`; no separate publish credential is needed.

## Generated artifacts

`types/knowledge-api/` is generated from `knowledge-api.schema.json` via
`json-schema-to-typescript` (`npm run generate:types`) and committed — not built at
consumer install time. It's a topic-grouped split rather than one large file
(`primitives.d.ts`, `media.d.ts`, `content-blocks.d.ts`, `explanation.d.ts`,
`knowledge.d.ts`, `narration.d.ts`, each kept well under ~200 lines) plus a barrel
`index.d.ts` that re-exports everything, so the public import path
(`@ramalingesha/shared-contracts/types/knowledge-api`) is unchanged. The split is
computed automatically every run — `scripts/generate-knowledge-types.js` compiles
the whole schema in one pass with `json-schema-to-typescript`, then uses the
TypeScript compiler API to distribute each generated type into its group file per a
manifest in that script, inserting cross-file `import type` statements as needed.
Nothing under `types/knowledge-api/` is hand-written or hand-split; regenerating
always fully overwrites the directory. CI's "types are up to date" check in
`validate.yml` fails the build if the committed directory drifts from what the
schema currently generates (including a newly-generated file that wasn't committed).
