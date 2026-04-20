---
applyTo: "**/routes/**/*.py, **/api/**/*.py, **/routers/**/*.py, **/endpoints/**/*.py"
description: "FastAPI best practices for AGB Platform Python services"
---

# FastAPI — Best Practices

---

## Application Structure

```
src/
├── main.py               ← app factory, lifespan, middleware registration
├── config.py             ← Pydantic Settings, validated at startup
├── dependencies.py       ← shared FastAPI dependencies (auth, db session, etc.)
├── routers/
│   ├── users.py          ← one router per resource
│   └── auth.py
├── services/
│   └── user_service.py   ← business logic — no FastAPI types here
├── schemas/
│   └── user.py           ← Pydantic request/response models
├── models/
│   └── user.py           ← SQLAlchemy / database models
└── exceptions.py         ← custom exception classes + exception handlers
```

---

## App Factory and Lifespan

- Use the `lifespan` context manager (not deprecated `startup`/`shutdown` events):
  ```python
  from contextlib import asynccontextmanager
  from fastapi import FastAPI

  @asynccontextmanager
  async def lifespan(app: FastAPI):
      # startup: initialise DB pool, load ML models, etc.
      await db.connect()
      yield
      # shutdown: clean up resources
      await db.disconnect()

  app = FastAPI(lifespan=lifespan)
  ```
- Register all routers and middleware in the app factory, not at module level

---

## Configuration

- Use Pydantic `BaseSettings` for all configuration — validate at startup, fail fast:
  ```python
  from pydantic_settings import BaseSettings

  class Settings(BaseSettings):
      database_url: str
      jwt_secret: str
      debug: bool = False

      model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

  settings = Settings()  # raises ValidationError immediately if env vars missing
  ```
- NEVER access `os.environ` directly in route handlers or services

---

## Route Handlers

- Keep route handlers thin — delegate to services for all business logic
- Use dependency injection for shared concerns (auth, DB session, rate limiting):
  ```python
  @router.get('/users/{user_id}', response_model=UserResponse)
  async def get_user(
      user_id: str,
      current_user: User = Depends(get_current_user),
      user_service: UserService = Depends(get_user_service),
  ) -> UserResponse:
      return await user_service.get_by_id(user_id)
  ```
- Always declare `response_model` — it enforces output shape and strips extra fields
- Use `status_code` parameter: `@router.post('/users', status_code=201)`

---

## Request Validation

- Define separate Pydantic schemas for request body, path params, and query params
- Use `Annotated` with `Query`, `Path`, `Body` for field-level constraints:
  ```python
  from typing import Annotated
  from fastapi import Query

  @router.get('/users')
  async def list_users(
      page: Annotated[int, Query(ge=1, description='Page number')] = 1,
      limit: Annotated[int, Query(ge=1, le=100)] = 20,
  ) -> list[UserResponse]:
      ...
  ```

---

## Exception Handling

- **NEVER define service-level exception classes** — import from `agb_shared_utils.exceptions`:
  ```python
  from agb_shared_utils.exceptions import ValidationError, NotFoundError, ConflictError
  ```
- Register exception handlers in the app factory — never handle exceptions in route handlers:
  ```python
  from fastapi import Request
  from fastapi.responses import JSONResponse
  from agb_shared_utils.exceptions import AppError

  @app.exception_handler(AppError)
  async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
      logger.warning('app error', extra={'status': exc.status_code})
      return JSONResponse(status_code=exc.status_code, content={'error': {'code': exc.code, 'message': str(exc)}})

  @app.exception_handler(Exception)
  async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
      logger.exception('unhandled error')
      return JSONResponse(status_code=500, content={'error': {'code': 'INTERNAL_ERROR', 'message': 'errors.internal'}})
  ```
- Exception `message` values must be **i18n keys**, not English prose
- Map `ValidationError` (Pydantic) to 422 automatically — FastAPI does this by default
- NEVER return stack traces in responses

---

## Dependency Injection Patterns

- Yield dependencies for resource cleanup (DB sessions, locks):
  ```python
  async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
      async with async_session_factory() as session:
          try:
              yield session
              await session.commit()
          except Exception:
              await session.rollback()
              raise
  ```
- Scope dependencies correctly: request-scoped vs app-scoped vs session-scoped

---

## Security

- Use `HTTPBearer` or `OAuth2PasswordBearer` for auth — never parse Authorization header manually
- Enable CORS only for known origins — never `allow_origins=['*']` in production
- Use `SecretStr` from Pydantic for sensitive config values to prevent accidental logging

**Request & Payload Size Limits**:
- Enforce body size limits at the middleware level:
  ```python
  from starlette.middleware.base import BaseHTTPMiddleware

  class MaxBodySizeMiddleware(BaseHTTPMiddleware):
      MAX_BODY_SIZE = 10 * 1024  # 10 KB for JSON

      async def dispatch(self, request: Request, call_next):
          if request.headers.get('content-length'):
              if int(request.headers['content-length']) > self.MAX_BODY_SIZE:
                  return JSONResponse(status_code=413, content={'error': {'code': 'PAYLOAD_TOO_LARGE', 'message': 'request.payload_too_large'}})
          return await call_next(request)
  ```
- Query parameter count: reject requests with more than 20 query params—return 400
- Use `Annotated` constraints (`le`, `ge`, `max_length`) to reject out-of-range inputs at the Pydantic level

**XSS & Input Sanitization**:
- Strip HTML from all free-text fields using `html.escape()` or `bleach.clean()` in a Pydantic `@field_validator`:
  ```python
  from pydantic import field_validator
  import html

  class CreatePostRequest(BaseModel):
      title: str
      body: str

      @field_validator('title', 'body', mode='before')
      @classmethod
      def strip_html(cls, v: str) -> str:
          return html.escape(v.strip())
  ```
- NEVER return raw user-provided strings in JSON responses without sanitization
