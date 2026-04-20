---
applyTo: "**/*.test.ts, **/*.spec.ts, **/*.test.tsx, **/*.spec.tsx, **/tests/**/*.py, **/*_test.py"
description: "AGB Platform test writing standards — structure, isolation, mocking, and coverage requirements"
---

# Testing — Best Practices

---

## Structure: Arrange-Act-Assert (AAA)

Every test must follow AAA with blank lines separating the phases:

```ts
it('should return 404 when user does not exist', async () => {
  // Arrange
  const userId = 'non-existent-id';
  mockUserRepository.findById.mockResolvedValue(null);

  // Act
  const response = await request(app).get(`/users/${userId}`);

  // Assert
  expect(response.status).toBe(404);
  expect(response.body).toEqual({ error: { code: 'NOT_FOUND', message: expect.any(String) } });
});
```

- One assertion focus per test — test ONE behaviour per `it`/`test` block
- Test names: `'should [expected behaviour] when [condition]'`
- `describe` blocks: group by unit under test, then by scenario
- NEVER use `.only` or `.skip` in committed test files

---

## Test Isolation

- Each test must be fully independent — no shared mutable state between tests
- Reset all mocks and spies in `afterEach`/`after_each`:
  ```ts
  afterEach(() => {
    jest.resetAllMocks();  // clears mock state but keeps implementation
  });
  ```
- Use `beforeEach` for setup, `afterEach` for teardown — never `beforeAll`/`afterAll` for mutable state
- NEVER rely on test execution order — any test must pass in isolation

---

## Test Data

- Use factory functions for test data — no hardcoded fixture objects scattered across test files:
  ```ts
  // test/factories/user.factory.ts
  export const buildUser = (overrides: Partial<User> = {}): User => ({
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date('2024-01-01'),
    ...overrides,
  });
  ```
- Use realistic but obviously fake data (no real emails, no real names)
- For edge case tests, use explicit boundary values — do not use random data

---

## Mocking

- Mock at the **infrastructure boundary** — HTTP clients, DB drivers, file system, message queues
- NEVER mock the code-under-test itself — only its dependencies
- Prefer dependency injection over module mocking where possible
- For HTTP: use MSW (Mock Service Worker) in frontend tests, `nock` or `msw/node` in Node.js tests
- For databases: use a real test database in integration tests, mock the repository in unit tests

```ts
// ✅ Good — mock the repository (infrastructure boundary)
const mockUserRepo = { findById: jest.fn(), save: jest.fn() };
const service = new UserService(mockUserRepo);

// ❌ Bad — mocking internal service methods
jest.spyOn(userService, 'validateEmail');
```

---

## What to Test — Test Pyramid

Follow the test pyramid: more unit tests, fewer E2E tests. Each layer tests at the right level of abstraction.

| Layer | What to test | Tool | Run in CI? |
|---|---|---|---|
| **Unit** | Pure functions, service methods, validators, hooks, utilities | Jest / pytest | Always |
| **Integration** | Route → service → DB round trip | Supertest + test DB | Always |
| **Component** | User interactions, rendered output, states (loading/error/empty) | React Testing Library | Always |
| **Accessibility (a11y)** | No ARIA violations on every component | jest-axe / axe-playwright | Always |
| **E2E** | Critical user journeys (happy path + primary failure path) | Playwright | Always (blocking on master) |

**Coverage targets**: 85% branches/functions/lines/statements minimum; 100% for utilities, validators, error handlers.

---

## Coverage Requirements

- **Minimum**: 85% branches, functions, lines, statements — build fails below threshold
- **100% required for**: utility functions, validation logic, error handlers
- Coverage gaps must be documented in the TA with justification
- NEVER use `/* istanbul ignore */` or `# pragma: no cover` without a documented reason in the TA

---

## Scenario-Based Tests

Every test file must systematically cover the following axes:

- **Happy path**: the primary success scenario
- **Each branch**: every `if`, `else`, `switch case`, ternary, and `catch` block must have at least one test
- **Boundary values**: min/max lengths, 0, empty array, null, undefined, max integer
- **Positive cases**: valid data, expected state
- **Negative cases**: invalid data, forbidden actions, missing fields
- **Edge cases**: empty strings, special characters, very long inputs, concurrent operations

```ts
// Example: testing a password-change service
describe('UserService.changePassword', () => {
  // Happy path
  it('should update password hash when current password matches');

  // Negative cases
  it('should throw UnauthorizedError when current password is incorrect');
  it('should throw ValidationError when new password is less than 8 characters');
  it('should throw ValidationError when new password has no uppercase letter');

  // Edge cases
  it('should throw ValidationError when new password equals current password');
  it('should throw NotFoundError when user does not exist');
});
```

- Group tests by feature/scenario in `describe` blocks — not by function name alone
- Test names must communicate the **scenario**, not just the method: `'should return 404 when user is deleted'` not `'findById test'`

---

## Forbidden Patterns

- No `setTimeout` or `sleep()` in tests — use `jest.useFakeTimers()` or `freezegun`
- No real network calls — all external HTTP must be mocked
- No real filesystem writes — use `tmp` directories or mock `fs`
- No `console.log` inside tests — use `jest.spyOn(console, 'log').mockImplementation()`
- No test logic in `beforeAll`/`afterAll` that modifies shared state

---

## Test Database Isolation

- Tests MUST use a **dedicated test database** — never run tests against dev or production databases
- Configure via a separate env var: `TEST_DATABASE_URL` (required in `.env.test`; CI must set it)
- In Jest/Vitest setup: apply all migrations before the suite, then truncate tables between tests (not drop/recreate — too slow):
  ```ts
  // jest.setup.ts
  beforeAll(async () => {
    await runMigrations(testDb); // run once before all tests
  });

  afterEach(async () => {
    await truncateAllTables(testDb); // clean state, not full reset
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  ```
- For Python: use a separate `TEST_DATABASE_URL`, apply Alembic migrations in `conftest.py`, and use transaction rollback fixtures to isolate tests:
  ```python
  @pytest.fixture
  async def db_session(test_engine):
      async with test_engine.begin() as conn:
          await conn.run_sync(Base.metadata.create_all)
          async with AsyncSession(conn) as session:
              yield session
              await session.rollback()  # never commits to DB
  ```
- NEVER use `pytest-randomly` or test-order-dependent DB state — each test must leave the DB clean

---

## React Component Testing

- Test user behaviour, not implementation details (React Testing Library philosophy)
- Prefer `screen.getByRole()` > `getByLabelText()` > `getByText()` > `getByTestId()`
- NEVER test internal state or call component methods directly
- Use `userEvent` (not `fireEvent`) for user interactions — it simulates real browser behaviour:
  ```tsx
  import userEvent from '@testing-library/user-event';

  it('should show error when email is invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });
  ```
- Test all component states: loading, error, empty, and populated — never test only the happy-path render
- Test i18n keys, not translated strings — mock `react-i18next` to return the key itself:
  ```ts
  jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
  // Now assertions use keys: expect(screen.getByText('users.actions.save')).toBeInTheDocument();
  ```

---

## Accessibility (a11y) Testing

- Run `jest-axe` in at least one test per component to catch ARIA violations:
  ```tsx
  import { axe, toHaveNoViolations } from 'jest-axe';
  expect.extend(toHaveNoViolations);

  it('should have no accessibility violations', async () => {
    const { container } = render(<UserCard user={buildUser()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  ```
- For E2E: use `@axe-core/playwright` on each critical page in the Playwright suite
- Test keyboard navigation for interactive components: Tab order, Enter/Space to activate, Escape to dismiss
- Verify focus is managed correctly after modals open/close (focus returns to trigger)

---

## E2E Testing (Playwright)

- Cover the critical user journeys for each feature: at minimum the happy path and one failure path
- Use the Page Object Model (POM) pattern — never duplicate selectors across test files:
  ```ts
  // pages/login.page.ts
  export class LoginPage {
    constructor(private page: Page) {}
    async fillEmail(email: string) { await this.page.getByLabel('Email').fill(email); }
    async submit() { await this.page.getByRole('button', { name: 'Sign in' }).click(); }
  }
  ```
- Use `data-testid` attributes for elements only reachable by test code — not for styling
- E2E tests must run against a deployed test environment, never localhost with mocked APIs
- NEVER share state between E2E tests — each test creates its own data via API setup calls

---

## Suppressing Test Noise

Tests must run cleanly — no warnings, no unhandled rejections, no unexpected console output.

**Unhandled promise rejections**:
```ts
// Always await async operations; if testing rejection, assert it explicitly:
await expect(service.doSomething()).rejects.toThrow(ValidationError);
// NOT: service.doSomething(); // fire-and-forget causes unhandled rejection
```

**Console warnings from React**:
```tsx
// Suppress known act() warnings from async component tests:
beforeAll(() => { jest.spyOn(console, 'error').mockImplementation(() => {}); });
afterAll(() => { (console.error as jest.Mock).mockRestore(); });
```

**Component mock warnings**:
- When mocking child components, provide minimal valid props that satisfy PropTypes/TS types
- Use `jest.mock()` at the module level, not inside `beforeEach`, to avoid stale mock references
- For `react-i18next`, always set up the i18n mock in a shared test setup file, not per-test file

**Python async test warnings**:
```python
# Always use pytest-asyncio in "auto" mode to avoid missing decorator warnings:
# pyproject.toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
```
