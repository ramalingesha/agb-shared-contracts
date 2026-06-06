---
applyTo: "**/*.tsx, **/*.jsx, src/components/**, src/pages/**, src/features/**"
description: "React 19 component development best practices for agb-ui-components, agb-ui-demo, and agb-theme"
---

# React — Best Practices

---

## Component Design

- Functional components only — no class components
- Max 150 lines per component file — extract sub-components if larger
- Co-locate component, styles, and tests in the same directory:
  ```
  UserCard/
  ├── UserCard.tsx
  ├── UserCard.module.css
  ├── UserCard.test.tsx
  └── index.ts          ← re-export only
  ```
- Define TypeScript interfaces for all props — no `any`, no implicit `{}` type
- Use `React.FC<Props>` sparingly — prefer plain function with typed props argument

### Container / Presentational Split

Every feature must separate **logic from presentation**:

| Component type | Responsibility | Has state? | Knows about API/store? |
|---|---|---|---|
| **Presentational** (dumb) | Render UI from props only | No (or minimal local UI state) | Never |
| **Container** (smart) | Fetch data, hold state, pass to children | Yes | Yes |

```tsx
// ✅ Good — presentational: pure props in, JSX out
type UserCardProps = { name: string; avatarUrl: string; onSelect: () => void };
export const UserCard = ({ name, avatarUrl, onSelect }: UserCardProps) => (
  <Card onClick={onSelect}>
    <Avatar src={avatarUrl} alt={name} />
    <Text>{name}</Text>
  </Card>
);

// ✅ Good — container: fetches data, renders presentational component
export const UserCardContainer = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useUser(userId);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage messageKey="users.error.load_failed" />;
  return <UserCard name={data.name} avatarUrl={data.avatar} onSelect={handleSelect} />;
};

// ❌ Bad — mixed: fetching + rendering in one component
export const UserCard = ({ userId }: { userId: string }) => {
  const { data } = useQuery(['user', userId], () => fetchUser(userId));
  return <div style={{ color: 'blue' }}>{data?.name}</div>;
};
```

### Component Composition (Single Responsibility)

- Each component does exactly one thing — if you need an `and` to describe it, split it
- Build complex UIs by **composing** single-responsibility components — not by adding more logic to one component
- Prefer composition over prop switches: instead of `<Modal type="confirm" />` and `<Modal type="alert" />`, create `<ConfirmModal>` and `<AlertModal>` that compose a shared `<ModalBase>`
- NEVER use render props or HOCs for new code — use custom hooks for logic sharing

```tsx
// ❌ Bad — one component doing too much
export const UserPage = ({ userId }: { userId: string }) => {
  // fetches user, handles form submit, formats date, manages tab state...
};

// ✅ Good — composed from single-responsibility parts
export const UserPage = ({ userId }: { userId: string }) => (
  <PageLayout>
    <UserProfileContainer userId={userId} />
    <UserActivityContainer userId={userId} />
  </PageLayout>
);
```

---

## Hooks

- Call hooks only at the top level — never inside conditionals, loops, or callbacks
- Custom hooks: prefix with `use`, keep focused on a single concern, return stable references
- `useEffect` rules:
  - Every dependency must be in the dependency array — ESLint `exhaustive-deps` enforced
  - **Always return a cleanup function** to prevent memory leaks — cancel subscriptions, timers, and AbortControllers:
    ```tsx
    // ✅ Good — always clean up
    useEffect(() => {
      const controller = new AbortController();
      fetchData(controller.signal).then(setData);
      return () => controller.abort(); // cancel on unmount / dep change
    }, [id]);

    // ✅ Good — clean up event listener
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ❌ Bad — no cleanup; leaks on unmount
    useEffect(() => {
      fetchData().then(setData);
    }, [id]);
    ```
  - NEVER fetch data directly in `useEffect` — use TanStack Query instead
- `useLayoutEffect` only when you need synchronous DOM measurement — use `useEffect` otherwise
- Set intervals/timeouts via `useEffect` and always clear them in the cleanup return

---

## State Management

| State type | Solution | When to use |
|---|---|---|
| Component-local UI state | `useState` | Toggle, input, transient UI |
| Derived/computed state | `useMemo` (no separate state) | Computed from existing state/props |
| Async server data | TanStack Query (`useQuery`, `useMutation`) | Any API call, caching, background sync |
| Cross-component shared state | React Context + `useReducer` | Auth, theme, locale, feature-level state shared by a subtree |
| Global app state | Zustand | Only when Context causes performance issues (large, frequently-updating state) |

**Context rules**:
- Split Contexts by concern — one Context per domain (auth, theme, notifications) — never one giant app context
- Memoize context values to prevent unnecessary re-renders:
  ```tsx
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  ```
- Do NOT put frequently-changing values (e.g. mouse position, scroll offset) in Context — use Zustand for those

**Zustand rules**:
- Create one store per domain (not one global store for everything)
- Keep actions inside the store definition, not scattered in components
- Use selectors to subscribe to the smallest slice needed — prevents unnecessary re-renders:
  ```ts
  // ✅ Good — subscribe only to what's needed
  const count = useCartStore((s) => s.count);

  // ❌ Bad — re-renders on any store change
  const store = useCartStore();
  ```
- NEVER use Zustand for server data — that belongs in TanStack Query
- NEVER duplicate TanStack Query cache data into Zustand store

- NEVER duplicate server state into local state — TanStack Query is the cache
- NEVER use `useEffect` + `useState` to derive state from props — use `useMemo`

---

## Performance

- Wrap expensive computations in `useMemo` — profile first, don't premature-optimise
- Wrap callbacks passed as props to memoised child components in `useCallback`
- Use `React.memo()` on components that receive stable props and re-render frequently
- Use `React.lazy()` + `Suspense` for route-level and large widget code splitting
- Avoid creating anonymous functions or objects in JSX attributes:
  ```tsx
  // ✅ Good — stable reference
  const handleClick = useCallback(() => { ... }, [dep]);
  <Button onClick={handleClick} />

  // ❌ Bad — new function every render
  <Button onClick={() => doSomething()} />
  ```

---

## Accessibility (a11y)

### `agb-ui-components` library (components that are BUILDING the design system)

- Use semantic HTML elements as the DOM foundation: `<button>`, `<nav>`, `<main>`, `<aside>`, `<article>`, `<section>`, `<header>`, `<footer>`
- Use React headless libraries (Radix UI, React Aria, Headless UI) for complex interactive patterns (dialog, combobox, tooltip, tabs) to get correct ARIA roles, keyboard interactions, and focus management for free
- All interactive elements must be keyboard-accessible (Tab, Enter, Space, Escape, Arrow keys)
- All images require meaningful `alt` text — decorative images use `alt=""`
- Use ARIA attributes to supplement semantics where native HTML is insufficient
- Colour contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text (WCAG 2.1 AA)
- Form fields must have associated `<label>` elements — never use `placeholder` as a label substitute
- Components must be ARIA-composable — expose `aria-label`, `aria-describedby`, `id`, and `role` as props

### All other React apps (`agb-ui-demo`, app shells, etc.)

- **ONLY use `agb-ui-components` library components** — do NOT use raw HTML elements (`<button>`, `<input>`, `<select>`, etc.), React headless libraries, MUI, Chakra, shadcn, or any other external component library
- a11y is handled by `agb-ui-components` — apps do NOT need to add ARIA attributes manually to those components; use the exposed `aria-*` props/slots instead:
  ```tsx
  // ✅ Good — use agb-ui-components; a11y built in
  <Button onClick={handleSubmit} aria-label={t('form.submit')}>
    {t('form.submit')}
  </Button>

  // ❌ Bad — raw HTML in an app that should use agb-ui-components
  <button onClick={handleSubmit}>Submit</button>

  // ❌ Bad — external component library
  import { Button } from '@mui/material';
  ```
- When a required component does not exist in `agb-ui-components`, create a ticket to add it to the library — do not work around it with raw HTML

---

## Styling

- Use CSS Modules (`.module.css`) exclusively — no inline styles, no `style` attribute except dynamic values that cannot be expressed as classes
- Use **only** design tokens from `@ramalingesha/agb-theme` — no hardcoded colour, spacing, font, border-radius, shadow, or z-index values:
  ```tsx
  // ✅ Good
  className={styles.container}  // CSS Module that uses var(--color-primary) from agb-theme

  // ❌ Bad — hardcoded value
  style={{ color: '#3b82f6', padding: '16px' }}

  // ❌ Bad — Tailwind class
  className="bg-blue-500 p-4 rounded-lg"
  ```
- **FORBIDDEN styling tools and libraries**: Tailwind CSS, Bootstrap, Material UI, Chakra UI, shadcn/ui, Ant Design, styled-components, Emotion, Stitches, or any other CSS-in-JS library. Enforcement: ESLint rule will flag `import` from any of these packages.
- Class names: camelCase in CSS Modules, kebab-case in plain CSS files
- Do not override agb-theme token values inside a service/app — if the token is wrong, raise a PR against `agb-theme`

---

## Error Handling

- Wrap page-level and feature-level components in `ErrorBoundary`
- Use TanStack Query's `onError` or `error` state for async errors — do not catch inside render
- NEVER render raw error objects — show user-friendly messages only

---

## Loading & Feedback States

Every async operation visible to the user **must** have a loading indicator. Never leave the user with a blank or stale view.

| Scenario | Component to use |
|---|---|
| Page-level data load | `<PageSpinner />` from agb-ui-components, centred full-height |
| Inline list / card data load | `<Skeleton />` matching the expected content shape |
| Button action (submit, save) | Disable button + show `<ButtonSpinner />` while pending |
| Background refresh | Subtle `<LoadingBar />` at page top — do not block the UI |

```tsx
// ✅ Good — loading, error, and empty states all handled
const UserList = () => {
  const { data, isLoading, isError, isEmpty } = useUsers();

  if (isLoading) return <Skeleton count={5} />;
  if (isError)   return <ErrorMessage messageKey="users.error.load_failed" onRetry={refetch} />;
  if (!data?.length) return <EmptyState messageKey="users.empty" />;

  return <UserGrid users={data} />;
};

// ❌ Bad — renders stale/undefined data while loading
const UserList = () => {
  const { data } = useUsers();
  return <UserGrid users={data} />; // crashes on undefined, shows stale data
};
```

- NEVER present stale or undefined data for further user interaction — disable or hide interactive elements until data is ready
- Use `isLoading` (first load) vs `isFetching` (background refetch) from TanStack Query correctly
- Provide a retry mechanism on error states where applicable

---

## Component Patterns to Avoid

- Avoid prop drilling beyond 2 levels — use Context or component composition instead
- Avoid boolean prop names that invert meaning: prefer `isDisabled` over `notEnabled`
- Avoid `forwardRef` unless the component is a primitive library element (input, button, etc.)
- Avoid index as `key` in lists — use stable, unique IDs from data
- Avoid `as any` type assertions — fix the type instead
- Avoid mutating state directly — always return a new reference from state updaters
- Avoid putting the same data in multiple `useState` calls when one `useReducer` expresses the relationship clearly
- Avoid components with more than one reason to change — this is a Single Responsibility violation; split them

---

## i18n — Internationalization

- NEVER hardcode user-visible strings, labels, placeholders, button text, or error messages in JSX
- Use the `useTranslation()` hook from `react-i18next` for all text:
  ```tsx
  // ✅ Good
  const { t } = useTranslation();
  return <Button>{t('users.actions.save')}</Button>;

  // ❌ Bad — hardcoded string
  return <Button>Save</Button>;
  ```
- i18n key format: `<namespace>.<entity>.<descriptor>` e.g. `users.validation.email_required`
- All new keys must be added to `locales/en.json` (or the project base locale file) in the same commit as the feature
- Pass dynamic values as interpolation parameters — do not concatenate strings:
  ```tsx
  // ✅ Good
  t('users.greeting', { name: user.name }) // "Hello, {{name}}!"

  // ❌ Bad
  'Hello, ' + user.name
  ```

---

## SonarLint Rules (React-specific)

- Cognitive complexity per component render: max 10 — extract child components or custom hooks when exceeded
- No unused state variables or props
- No direct DOM manipulation (`document.querySelector`, `innerHTML`) — use refs or state
- No duplicate JSX structure — extract repeated JSX into a component
- `useEffect` with empty deps `[]` must be documented if intentional — add a comment explaining why
- React hooks must be called in the same order every render — ESLint `react-hooks/rules-of-hooks` enforced
