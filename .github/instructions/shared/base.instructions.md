---
applyTo: "**/*"
description: "AGB Platform universal standards — security, logging, error handling, code quality"
---

# AGB Platform — Base Standards

These rules apply to every file in every service. They are non-negotiable and cannot be overridden by service-level instructions.

---

## Security (OWASP Top 10 baseline)

- NEVER hardcode secrets, tokens, API keys, or passwords — use environment variables
- ALWAYS validate and sanitize user inputs at the service boundary (controller/route/handler level)
- NEVER expose internal error messages, stack traces, or DB error codes in HTTP response bodies
- ALWAYS use parameterized queries — never interpolate user input into SQL or NoSQL strings
- Set security headers on all HTTP responses: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`
- NEVER store passwords in plaintext — use bcrypt (cost factor ≥ 12) or argon2id
- NEVER log sensitive data: passwords, tokens, PII, card numbers
- **XSS prevention**: sanitize all user-supplied string inputs before storing or returning; NEVER render raw user content as HTML; use the shared sanitizer from `@ramalingesha/agb-shared-utils-js`
- **SQL/NoSQL injection**: use ORM/query-builder safe methods exclusively — never concatenate user data into raw query strings, filter keys, or aggregation pipelines
- **HTTP Parameter Pollution**: reject requests with >20 query parameters (return 400); configure query string parser in strict mode (`qs` with `allowPrototypes: false`)
- **Request size limits**: enforce maximum request body size at middleware level — 10 KB for JSON, 5 MB for file uploads; return 413 for oversized payloads
- **Path traversal**: NEVER interpolate user input into file system paths; resolve and validate paths against an allowed base directory

---

## Logging

- NEVER use `console.log`, `console.error`, `print()`, or `sys.stdout` — CI lint rule will fail the build
- ALWAYS use the project logger:
  - TypeScript/Node.js: `import { createLogger } from '@ramalingesha/agb-shared-utils-js'`
  - Python: `from agb_shared_utils.logger import get_logger`
- Structured JSON log format: `{ message, context, level, timestamp }`
- Log levels:
  - `ERROR` — unhandled exceptions, system failures
  - `WARN` — recoverable issues, degraded state
  - `INFO` — request milestones, state transitions
  - `DEBUG` — internal traces (disabled in production)
- NEVER log inside loops — aggregate and log once

---

## Error Handling

- NEVER swallow exceptions silently — empty `catch {}` blocks are forbidden
- ALWAYS throw typed domain errors — import from `@ramalingesha/agb-shared-utils-js`:
  - `ValidationError` — invalid input
  - `NotFoundError` — resource does not exist
  - `UnauthorizedError` — missing or invalid auth
  - `ForbiddenError` — insufficient permissions
  - `ConflictError` — duplicate resource
- Error responses must be user-safe: no stack traces, internal paths, or DB error codes
- Response shape: `{ error: { code: string, message: string } }`

---

## Code Quality

- Functions: single responsibility, max 30 lines — extract if longer
- Files: max 300 lines — split into modules if larger
- No magic numbers — use named constants
- Dead code and commented-out code must be removed before commit
- No `TODO` comments in committed code — create a Jira story instead
- Variable names: descriptive, avoid abbreviations except well-known ones (`id`, `url`, `req`, `res`)

---

## SOLID Principles

Apply SOLID in every module, service, and component:

- **S — Single Responsibility**: one class/function/component does one thing. The 30-line function and 300-line file limits structurally enforce this.
- **O — Open/Closed**: extend behaviour by adding new modules or strategy implementations — never by modifying stable code paths.
- **L — Liskov Substitution**: subtypes and interface implementations must be substitutable without breaking callers — use typed interfaces, not `any`.
- **I — Interface Segregation**: define narrow interfaces per consumer — do not force modules to depend on methods they do not use.
- **D — Dependency Inversion**: depend on abstractions (interfaces, DI tokens) — inject dependencies rather than instantiating them inside business logic functions.

**Separation of Concerns (SoC)**:
- HTTP layer (routes/controllers): parse request → call service → format response — no business logic
- Business logic (services): orchestrate domain rules — no HTTP types (`req`/`res`) allowed
- Data layer (repositories/models): database access only — no business rules

---

## SonarLint / Static Analysis

- Cognitive complexity per function: max 10 — extract logic into named helpers when exceeded
- Duplicated blocks: ≤ 3% per file — extract shared logic into utilities
- Security hotspots (OWASP categories): must be reviewed and resolved — never mark as `Won't Fix` without written justification in the TA
- All code branches must be reachable — no dead code paths
- No unused variables, imports, or parameters
- No string concatenation to build SQL queries, file paths, or shell commands (SonarLint S2077, S2083, S2076)
- Cyclomatic complexity per function: max 10

---

## Internationalization (i18n)

- NEVER hardcode user-facing strings, labels, button text, or error messages — use i18n translation keys
- TypeScript/React: use `react-i18next` (`useTranslation()` hook) — no inline string literals in JSX
- Python/FastAPI: error `message` fields in API responses must be i18n keys (e.g. `users.validation.email_invalid`), not English prose — the client resolves the key
- i18n key format: `<namespace>.<entity>.<descriptor>` — e.g. `users.validation.email_invalid`, `auth.error.token_expired`
- All new keys must be added to the base locale file (`locales/en.json` or equivalent) in the same commit as the feature
- Locale files must be flat JSON — no nested objects beyond 2 levels

---

## Git Hygiene

- Commit message format: `AGB-XXX: <type>: <short description>` (imperative mood, max 72 chars)
- One logical change per commit — do not mix feature work and formatting fixes
- NEVER commit generated files: `dist/`, `build/`, `__pycache__/`, `.venv/`, `node_modules/`
- NEVER commit `.env` files — only `.env.example` with placeholder values
