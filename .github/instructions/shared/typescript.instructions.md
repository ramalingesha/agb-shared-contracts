---
applyTo: "**/*.ts, **/*.tsx"
description: "TypeScript 5.x best practices for all AGB Platform services and UI repos"
---

# TypeScript — Best Practices

---

## Compiler Settings (non-negotiable)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}
```

- NEVER set `"strict": false` or disable individual strict flags
- NEVER use `// @ts-ignore` or `// @ts-nocheck` — fix the type error properly
- `// @ts-expect-error` is allowed only in test files with a comment explaining why

---

## Type Safety

- NEVER use `any` — use `unknown` and narrow with type guards
- Prefer `unknown` over `any` for external data (API responses, JSON.parse output)
- Use `satisfies` operator for type assertions instead of `as`:
  ```ts
  // ✅ Good
  const config = { port: 3000 } satisfies AppConfig;
  // ❌ Bad
  const config = { port: 3000 } as AppConfig;
  ```
- Use `as` only when TypeScript cannot infer the type and you have no alternative

---

## Interfaces and Types

- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and aliases
- Export all types used across module boundaries
- Name interfaces with descriptive nouns: `UserProfile`, `CreateUserRequest`, not `IUser` or `UserInterface`
- Avoid `Partial<T>` on function parameters — define explicit optional fields with `?`

---

## Generics

- Use descriptive type parameter names beyond single letters for complex generics: `TEntity`, `TResponse`
- Single-letter names (`T`, `K`, `V`) are fine for short, focused generics
- Constrain type parameters when possible: `<T extends Record<string, unknown>>`

---

## Utility Types

Use built-in utility types rather than re-implementing:
- `Readonly<T>` for immutable data
- `Pick<T, K>` / `Omit<T, K>` for DTO shapes
- `ReturnType<typeof fn>` to derive types from functions
- `Parameters<typeof fn>` to derive parameter types

---

## Imports

- Use named exports — avoid default exports (they complicate refactoring)
- Group imports: external packages → internal modules → relative files (blank line between groups)
- Use path aliases configured in `tsconfig.json` — avoid `../../../` chains beyond 2 levels

---

## Null Handling

- Prefer `undefined` over `null` for optional values in application code
- Handle both in external data (APIs may return either)
- Use optional chaining `?.` and nullish coalescing `??` — avoid explicit `=== null` checks where possible
- Avoid non-null assertion `!` — prefer proper narrowing
