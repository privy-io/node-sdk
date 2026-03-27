# Node SDK

TypeScript SDK (`@privy-io/node`). This directory is a git submodule with its own remote.

## Generated Files — DO NOT MODIFY

All files under `src/resources/` are auto-generated from the OpenAPI spec via Stainless:

```
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
```

Add new behaviour in `src/public-api/services/` instead.

## Service Layer Pattern

`src/public-api/PrivyClient.ts` exposes services as methods (`wallets()`, `users()`, etc.).
Each service in `src/public-api/services/` extends its generated counterpart from `src/resources/`.

Callers use method access: `client.wallets().get(walletID)`.

To add a sub-service on an existing service class:
1. Create a new file in `src/public-api/services/` that extends the generated resource class.
2. Override the inherited property in the parent service using `override field: NewType`.
3. Initialize it in the constructor after `super()`.

## Integration Tests

Tests live in `tests/integration/services/`. Key helpers:
- `test-setup.ts` — `setupTestWalletResources()`, `createTestWallets()`, `WALLET_CASES`
- `test-config.ts` — app credentials backed by env vars

Use `setupTestWalletResources()` + `beforeAll` for shared state across a suite.
Use `createTestWallets()` + `describe.each(WALLET_CASES)` to cover all ownership types.

## Lint

```sh
just node::lint   # ESLint → TypeScript build → tsc type-check → attw → publint
```
