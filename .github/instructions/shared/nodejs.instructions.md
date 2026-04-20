---
applyTo: "src/**/*.ts, src/**/*.js"
description: "Node.js 20.x backend development best practices for AGB Platform services"
---

# Node.js — Best Practices

---

## Module System

- Use ES Modules (`import`/`export`) — do not use `require()` in new code
- Set `"type": "module"` in `package.json` for all new services
- File extensions in imports: include `.js` even for TypeScript source (TypeScript resolves to `.ts`):
  ```ts
  import { UserService } from './user.service.js';
  ```

---

## Async Patterns

- Use `async`/`await` for all I/O — no raw Promise chains or callbacks
- NEVER use `new Promise()` wrapper around already-async APIs
- Handle promise rejections — unhandled rejections crash Node.js 20+:
  ```ts
  // ✅ Good — always await or catch
  await doSomethingAsync();
  doSomethingAsync().catch(err => logger.error('failed', { err }));

  // ❌ Bad — fire and forget with no error handling
  doSomethingAsync();
  ```
- Use `Promise.all()` for independent parallel async operations
- Use `Promise.allSettled()` when some failures are acceptable

---

## Environment Configuration

- NEVER access `process.env` directly in business logic — create a validated config module:
  ```ts
  // config/env.ts — validate at startup, fail fast if required vars missing
  import { z } from 'zod';
  const schema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
  });
  export const env = schema.parse(process.env);
  ```
- All required env vars must be documented in `.env.example`
- Application must fail fast on startup if required env vars are missing — never fail silently later

---

## Process Lifecycle

- Handle `SIGTERM` and `SIGINT` for graceful shutdown:
  - Stop accepting new requests
  - Wait for in-flight requests to complete (timeout: 10s)
  - Close DB connections and external clients
- Use `process.exitCode` instead of `process.exit()` where possible

---

## Security

- Never trust `req.ip` directly in load-balanced environments — use `trust proxy` setting
- Rate limit all public endpoints — use the shared rate-limiter from `@ramalingesha/agb-shared-utils-js`
- Set request size limits on all routes (default: 10kb for JSON, 5mb for file uploads)
- CORS: explicitly whitelist allowed origins — never use `origin: '*'` in production

---

## Performance

- Use Node.js `cluster` module or run multiple instances behind a load balancer — do not block the event loop
- Avoid synchronous file system operations (`fs.readFileSync`) in request handlers
- Stream large files — do not buffer entire file contents into memory
- Use `Buffer.from()` over `new Buffer()` (deprecated and removed)

---

## Dependencies

- Audit dependencies monthly: `npm audit`
- Pin exact versions in `package.json` for production dependencies
- Separate `dependencies` (runtime) from `devDependencies` (build/test) strictly
- NEVER install packages globally in CI — use `npx` or local `node_modules/.bin`

**`package-lock.json` vs `npm-shrinkwrap.json`**:

| | `package-lock.json` | `npm-shrinkwrap.json` |
|---|---|---|
| Use case | Applications and non-published packages | Packages published to npm registry |
| npm install behaviour | Respected by `npm install`, ignored by consumers | Travels with the package; respected by consumers |
| AGB Platform rule | **Use this** for all services and UI apps | Only use if service is published as an npm package |

- All AGB services and UI apps (user-management-service, agb-ui-*) are **applications, not published packages** — use `package-lock.json`, never convert to `npm-shrinkwrap.json`
- Commit `package-lock.json` to version control — it is not optional

---

## Memory Leak Prevention

- Always remove event listeners when the context is destroyed:
  ```ts
  // ✅ Good — remove listener on cleanup
  const handler = (data: Buffer) => processChunk(data);
  stream.on('data', handler);
  // later:
  stream.off('data', handler);

  // ❌ Bad — listener accumulates on every request
  stream.on('data', (data) => processChunk(data));
  ```
- Set `maxListeners` on long-lived `EventEmitter` instances to catch accidental leaks:
  ```ts
  emitter.setMaxListeners(10); // default 10; Node warns at 11+
  ```
- Use `AbortController` to cancel in-flight fetch/DB requests on timeout or client disconnect:
  ```ts
  const controller = new AbortController();
  req.on('close', () => controller.abort());
  await fetch(url, { signal: controller.signal });
  ```
- Clean up timers in shutdown handlers — `clearInterval` / `clearTimeout` before process exit
- Prefer `WeakMap` / `WeakSet` for caches keyed by objects — avoids retaining object references
- Never store per-request data in module-level variables or singleton state
