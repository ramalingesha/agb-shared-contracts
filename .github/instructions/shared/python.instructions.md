---
applyTo: "**/*.py"
description: "Python 3.12+ best practices for AGB Platform services (lipi-tts-server, agb-shared-utils)"
---

# Python — Best Practices

---

## Code Style

- Follow PEP 8 strictly — enforced by `ruff` (CI will fail on violations)
- Max line length: 100 characters
- Type hints required on ALL function signatures — parameters and return types:
  ```python
  # ✅ Good
  def get_user(user_id: str) -> UserSchema:
      ...

  # ❌ Bad — missing type hints
  def get_user(user_id):
      ...
  ```
- Use `from __future__ import annotations` in Python 3.12 for forward references
- Docstrings: required for public functions, classes, and modules. Use Google style:
  ```python
  def create_user(email: str, name: str) -> UserSchema:
      """Create a new user record.

      Args:
          email: The user's email address.
          name: The user's display name.

      Returns:
          The created user as a UserSchema instance.

      Raises:
          ConflictError: If email already exists.
      """
  ```

---

## Data Models

- Use Pydantic v2 models for all external data (API input/output, config, events):
  ```python
  from pydantic import BaseModel, EmailStr, field_validator

  class CreateUserRequest(BaseModel):
      email: EmailStr
      name: str

      @field_validator('name')
      @classmethod
      def name_not_empty(cls, v: str) -> str:
          if not v.strip():
              raise ValueError('name cannot be blank')
          return v.strip()
  ```
- Use `dataclasses` for internal domain objects with no validation requirement
- Prefer `TypedDict` over plain `dict` for typed dictionary shapes

---

## Async Patterns

- Use `async`/`await` for ALL I/O operations (network, file, database)
- NEVER mix sync and async — `asyncio.run()` only at entry points
- `asyncio.gather()` for parallel independent async operations:
  ```python
  # ✅ Good — parallel
  results = await asyncio.gather(fetch_user(id), fetch_permissions(id))

  # ❌ Bad — sequential when parallel is safe
  user = await fetch_user(id)
  perms = await fetch_permissions(id)
  ```
- Always handle `asyncio.CancelledError` in long-running tasks — clean up resources in `finally`

---

## Error Handling

- **All custom exception classes must be imported from `agb_shared_utils`** — do NOT define service-level exception classes:
  ```python
  # ✅ Good — import from shared library
  from agb_shared_utils.exceptions import ValidationError, NotFoundError, ConflictError

  # ❌ Bad — service-specific exception class
  class UserNotFoundError(Exception): ...
  ```
- Available exceptions in `agb_shared_utils.exceptions`:
  - `ValidationError(message: str)` — HTTP 422
  - `NotFoundError(message: str)` — HTTP 404
  - `UnauthorizedError(message: str)` — HTTP 401
  - `ForbiddenError(message: str)` — HTTP 403
  - `ConflictError(message: str)` — HTTP 409
  - `AppError(message: str, status_code: int)` — base class for unexpected cases only
- NEVER use bare `except:` — always catch specific exception types
- Use `logger.exception()` to capture full stack traces in error handlers:
  ```python
  try:
      result = await risky_operation()
  except SomeSpecificError as e:
      logger.exception('operation failed', extra={'context': context})
      raise NotFoundError('errors.resource.not_found') from e
  ```
- Error `message` values passed to exception constructors must be **i18n keys**, not English prose:
  ```python
  # ✅ Good — i18n key
  raise ValidationError('users.validation.email_invalid')

  # ❌ Bad — hardcoded English string
  raise ValidationError('Email address is not valid')
  ```
- NEVER expose raw exception messages in API responses

---

## Imports

- Standard library → third-party → internal (blank line between groups)
- Use absolute imports — avoid relative imports beyond one level (`from . import` is ok, `from ... import` is not)
- NEVER use wildcard imports: `from module import *`

---

## Testing

- Use `pytest` with `pytest-asyncio` for async tests
- Mark async tests with `@pytest.mark.asyncio`
- Use `pytest-cov` with a minimum 85% threshold — build fails below this
- All tests must use a separate test database (`TEST_DATABASE_URL` env var) — NEVER run tests against the dev or production database

---

## Input Sanitization

- Strip or escape HTML/script characters from all free-text string inputs using `bleach.clean()` or `html.escape()` before storing:
  ```python
  import html

  # ✅ Good — escape before storing
  safe_name = html.escape(request.name)

  # ❌ Bad — raw user input stored directly
  await db.execute('INSERT INTO users (name) VALUES (:name)', {'name': request.name})
  ```
- Apply sanitization at the Pydantic validator level using `@field_validator` so it is enforced for every consumer automatically
- Use `pytest` fixtures for setup/teardown — no `setUp`/`tearDown`
- 85% coverage minimum enforced by `pytest-cov` — build fails below threshold

---

## Dependency Management

- Use `pyproject.toml` with `[project.dependencies]` — no `requirements.txt` for new services
- Pin transitive dependencies in `uv.lock` or `poetry.lock`
- Separate runtime and development dependencies: `[project.optional-dependencies] dev = [...]`
