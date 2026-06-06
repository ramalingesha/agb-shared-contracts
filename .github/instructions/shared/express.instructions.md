---
applyTo: "**/routes/**/*.ts, **/controllers/**/*.ts, **/middleware/**/*.ts"
description: "Express 4.x routing, middleware, and error-handling best practices"
---

# Express — Best Practices

---

## Route Structure

- Organise routes by resource: one Router per resource (e.g., `userRouter`, `authRouter`)
- Mount routers in `app.ts` — never define routes directly on the `app` object outside of `app.ts`
- Use HTTP verbs correctly:
  - `GET` — read, no side effects
  - `POST` — create
  - `PUT` — full replace
  - `PATCH` — partial update
  - `DELETE` — remove
- Route paths: lowercase, kebab-case, plural nouns: `/users`, `/auth/refresh-token`

---

## Controllers

- Controllers must be thin — no business logic, only: parse request → call service → format response
- ALL route handlers MUST be wrapped in `asyncHandler()` from `@ramalingesha/agb-shared-utils-js`:
  ```ts
  // ✅ Good
  router.get('/:id', asyncHandler(async (req, res) => {
    const user = await userService.findById(req.params.id);
    res.json(user);
  }));

  // ❌ Bad — uncaught async errors crash the server
  router.get('/:id', async (req, res) => {
    const user = await userService.findById(req.params.id);
    res.json(user);
  });
  ```
- NEVER call `next(err)` manually — throw typed errors and let `asyncHandler` propagate them
- Set the HTTP status code explicitly — never rely on Express defaults

---

## Middleware Order (must follow this sequence in `app.ts`)

```
1. Security headers        (helmet or manual headers)
2. CORS
3. Request parsing         (express.json, express.urlencoded)
4. Request ID injection    (assign unique request ID for tracing)
5. Request logging         (log method, path, request ID)
6. Rate limiting           (per-route or global)
7. Authentication          (JWT verification — apply to protected routes only)
8. Route handlers
9. 404 handler             (catch-all for unknown routes)
10. Global error handler   (must be last, 4-argument signature)
```

---

## Input Validation & Sanitization

- Validate ALL incoming request data (body, params, query) with Zod schemas at the route level:
  ```ts
  const createUserSchema = z.object({
    body: z.object({ email: z.string().email(), name: z.string().min(1).max(255) }),
  });

  router.post('/', validateRequest(createUserSchema), asyncHandler(createUserHandler));
  ```
- Use the `validateRequest` middleware from `@ramalingesha/agb-shared-utils-js`
- NEVER pass raw `req.body` directly to a service or database call without validation

**XSS Prevention**:
- Strip HTML tags from all free-text string fields using the shared `sanitizeString` helper from `@ramalingesha/agb-shared-utils-js` — apply at the Zod schema level with `.transform()`:
  ```ts
  // ✅ Good — sanitize inside the schema
  body: z.object({
    bio: z.string().max(500).transform(sanitizeString),
  })

  // ❌ Bad — raw user string stored/returned directly
  body: z.object({ bio: z.string() })
  ```
- Set `Content-Security-Policy` header to block inline script execution (handled by helmet default config)
- NEVER use `res.send(userInput)` with HTML content type — always use `res.json()` for API responses

**Query Parameter Bloat**:
- Reject requests with more than 20 distinct query parameter keys — return 400 `QUERY_PARAMS_LIMIT_EXCEEDED`:
  ```ts
  if (Object.keys(req.query).length > MAX_QUERY_PARAMS) {
    throw new ValidationError('Too many query parameters');
  }
  ```
- Define explicit Zod schemas for allowed query params — unknown keys must be stripped or rejected (use `.strict()` on the query schema)
- Apply query param validation via `validateRequest` middleware

---

## Error Handling

- The global error handler must be defined last in `app.ts` with exactly 4 parameters: `(err, req, res, next)`
- Error handler must:
  - Log the error with request context
  - Return a safe, structured error response — no stack traces in production
  - Map typed domain errors to correct HTTP status codes:

  | Error class | HTTP status |
  |---|---|
  | `ValidationError` | 422 |
  | `NotFoundError` | 404 |
  | `UnauthorizedError` | 401 |
  | `ForbiddenError` | 403 |
  | `ConflictError` | 409 |
  | Unknown | 500 |

---

## Response Conventions

- Success responses with data: `res.status(200).json({ data: result })`
- Created resources: `res.status(201).json({ data: result })`
- No-content operations: `res.status(204).send()`
- NEVER send the full Prisma model — always select and shape the response explicitly
- Error message values in `{ error: { code, message } }` must be i18n keys, not English prose

---

## Request & Payload Size Enforcement

- Configure `express.json` with an explicit size limit — do not rely on defaults:
  ```ts
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  ```
- File upload routes: enforce `multer` limits (`fileSize`, `files`, `fields`) — reject at the middleware level before touching the file buffer
- Return 413 with `{ error: { code: 'PAYLOAD_TOO_LARGE', message: 'request.payload_too_large' } }` for oversized bodies
- Log a WARN (not ERROR) when a payload limit is hit — it is a client violation, not a server error
