# Codebase Map — agb-shared-contracts

Where to look for what, in this repo. See `docs/ARCHITECTURE.md` for the "why."

| Concept | File(s) |
|---|---|
| Error code registry | `error-codes.json` |
| Standard API response envelope | `api-response-schema.json` |
| Knowledge Platform read-surface contract (K3) | `knowledge-api.schema.json` |
| Generated TypeScript types for the Knowledge contract | `types/knowledge-api.d.ts` (generated — do not hand-edit) |
| Type generator | `scripts/generate-knowledge-types.js` (`npm run generate:types`) |
| Error-codes validation | `scripts/validate-error-codes.js` |
| Knowledge-schema validation | `scripts/validate-knowledge-api-schema.js` |
| PR/push validation CI | `.github/workflows/validate.yml` |
| Tag-triggered publish CI | `.github/workflows/publish.yml` |
| Release history | `CHANGELOG.md` |

## Adding a new contract file

1. Add the JSON Schema file at the repo root.
2. Add it to `package.json`'s `"files"` allowlist (a missing entry here is a silent
   packaging bug — verified the hard way in AGB-586, see `CHANGELOG.md` 1.2.0).
3. Write a `scripts/validate-<name>.js` following the existing scripts' style
   (`✅`/`❌` console output, `process.exit(1)` on failure); wire it into the
   `"validate"` npm script.
4. If TypeScript types are needed, add a generator script alongside
   `generate-knowledge-types.js` and commit its output under `types/`.
5. Add the new files to `validate.yml`'s `pull_request.paths` trigger list — a file
   outside that list gets zero CI runs on a PR that only touches it.
6. Document the new contract in `README.md`'s "Contents" section and in `CHANGELOG.md`.
