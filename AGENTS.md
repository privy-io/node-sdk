# Node SDK

TypeScript SDK (`@privy-io/node`). Stainless generates the API core; Privy-owned files add the public `PrivyClient`, authorization utilities, and service behavior on top.

## Commands

```sh
./scripts/bootstrap                          # install dependencies
./scripts/format                             # ESLint fixes and Prettier
./scripts/lint                               # formatting, lint, build, types, package checks
./scripts/test --testPathIgnorePatterns=tests/integration # offline Jest tests
./scripts/test path/to/file.test.ts                     # focused test file
./scripts/test                                           # all tests, including live integration tests
yarn test:integration                                    # live staging tests
```

Run `./scripts/format`, `./scripts/lint`, and the smallest relevant test set before finishing. `./scripts/test` includes `tests/integration/`. Integration tests make live requests and require the environment described in `CONTRIBUTING.md`.

## Directory Structure

```
src/resources/                              # GENERATED API resources
src/internal/ src/core/ src/client.ts       # GENERATED transport and client core
src/lib/                                    # CUSTOM shared helpers and authorization logic
src/public-api/PrivyClient.ts               # CUSTOM public client
src/public-api/services/                    # CUSTOM service wrappers
tests/api-resources/                        # generated-resource/unit coverage
tests/integration/                          # live staging coverage
```

## Key Patterns

### Keep custom behavior in the custom trees

Generated files contain this notice:

```ts
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
```

Use `src/public-api/` for the public client and service wrappers. Use `src/lib/` for shared handwritten helpers. Avoid edits to `src/resources/`, `src/internal/`, `src/core/`, and `src/client.ts`; regeneration can conflict with them.

### Extend generated resources and delegate to them

`src/public-api/PrivyClient.ts` exposes services as methods such as `wallets()` and `users()`. Services under `src/public-api/services/` extend generated resources and override only behavior that needs Privy-specific handling.

```ts
export class PrivyWalletsService extends Wallets {
  public override depositAccounts: PrivyDepositAccountsService;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.depositAccounts = new PrivyDepositAccountsService(privyApiClient, privyClient);
  }
}
```

To add or replace a sub-service:

1. Add a service in `src/public-api/services/` that extends or composes the generated resource.
2. Override the inherited property with `override field: NewType`.
3. Initialize it after `super()`.

Callers use method access: `client.wallets().get(walletID)`. Do not duplicate generated request logic when `super` or the generated resource can perform the request.

### Centralize authorization behavior

Reuse the request signer, formatter, and authorization helpers under `src/public-api/services/utils/` and `src/lib/`. Authorized mutations must keep canonicalization, user-JWT exchange, expiry, and idempotency behavior consistent. Do not hand-roll authorization headers in individual services.

### Put tests at the correct layer

Use ordinary Jest tests for offline behavior. Use `tests/api-resources/` for generated resource request shapes and adjacent unit suites for custom utilities. Live service behavior belongs in `tests/integration/`.

Integration helpers in `tests/integration/` include:

- `test-setup.ts`: `setupTestWalletResources()`, `cleanupTestWalletResources()`, `createTestWallets()`, and `WALLET_CASES`.
- `test-config.ts`: staging credentials backed by environment variables.

Use `setupTestWalletResources()` once per suite in `beforeAll`, and pair it with `cleanupTestWalletResources()` in `afterAll`. Use `createTestWallets()` with `describe.each(WALLET_CASES)` for ownerless, key-owned, user-owned, and quorum-owned behavior. Create test resources instead of depending on pre-existing wallets or users. Never point integration tests at production.

## Pull Requests

Use a Conventional Commit title. Keep generated API updates separate from handwritten service changes when possible.
