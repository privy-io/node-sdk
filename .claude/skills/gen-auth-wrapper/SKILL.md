---
name: gen-auth-wrapper
description: Generate a custom authorization wrapper service for a generated resource method that requires the privy-authorization-signature header. Use when adding a new wallet endpoint that needs request signing, or when asked to "gen-auth-wrapper", "generate auth wrapper", or "add convenience wrapper for <endpoint>".
allowed-tools: Bash, Read, Edit, Write, Agent
---

# Generate Authorization Wrapper Service

Generate a custom wrapper service in `src/public-api/services/` for a generated resource method that accepts the `privy-authorization-signature` header.

## Input

The user provides freeform input describing which generated method needs a wrapper. Examples:

- `src/resources/wallets/deposit-accounts/crypto.ts`
- `Crypto._create`
- `the new crypto deposit account endpoint`
- `_create method on the deposit-accounts/crypto resource`

If the input is ambiguous, search `src/resources/` and ask the user to clarify which class/method they mean.

## Steps

### 1. Locate the generated resource

From the user's input, find the relevant file under `src/resources/`. Read it and extract:

- **Class name** (e.g., `Crypto`)
- **`_`-prefixed methods** that have a `'privy-authorization-signature'` in their params type
- **Params type** for each method (e.g., `CryptoCreateParams`)
- **Return type** for each method (e.g., `CreateCryptoDepositAccountResponse`)
- **HTTP method** and **URL path** — look for the `this._client.post(...)` / `this._client.patch(...)` / etc. call inside the method body

### 2. Determine convenience features

Inspect the params type definition (in the same file or its imports) to check which header fields are present:

| Header in params                  | Utility type to apply | Exposed as              |
| --------------------------------- | --------------------- | ----------------------- |
| `'privy-authorization-signature'` | `WithAuthorization`   | `authorization_context` |
| `'privy-idempotency-key'`         | `WithIdempotency`     | `idempotency_key`       |
| `'privy-request-expiry'`          | `WithExpiry`          | `request_expiry`        |

`WithAuthorization` is always present (that's the trigger for needing a wrapper). The others are conditional.

### 3. Check if a wrapper already exists

Search `src/public-api/services/` for an existing wrapper that extends this class or its parent. If one exists, add the new method there instead of creating a new file.

### 4. Read reference files for patterns

Before generating code, read these files to match the existing style exactly:

```bash
cat src/public-api/services/types.ts
cat src/public-api/services/earn/ethereum.ts
cat src/public-api/services/wallets.ts
```

- `types.ts` — the `WithAuthorization`, `WithIdempotency`, `WithExpiry`, `Prettify` utility types
- `earn/ethereum.ts` — canonical example of the "extends generated class" wrapper pattern
- `wallets.ts` — how sub-services are wired (import, override/field, constructor init)

### 5. Generate the wrapper service

Create a new file in `src/public-api/services/` (or add to an existing one). Follow this template:

```typescript
import { PrivyAPI } from '../../client';
import { prepareRequest } from '../../lib/authorization';
import { <ReturnType> } from '../../resources';
import { <GeneratedClass>, <ParamsType> } from '../../resources/<path>';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithAuthorization, WithIdempotency, WithExpiry } from './types';

export class Privy<Name>Service extends <GeneratedClass> {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async <methodName>(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,        // include only if WithIdempotency applies
      request_expiry: requestExpiry,           // include only if WithExpiry applies
      ...params
    }: Privy<Name>Service.<MethodName>Input,
  ): Promise<<ReturnType>> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,                          // include only if WithIdempotency applies
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),  // include only if WithExpiry applies
      method: '<HTTP_METHOD>',
      url: `${this._client.baseURL}<url_path_with_interpolation>`,
      body: params,
    });

    return await this._<methodName>(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace Privy<Name>Service {
  export type <MethodName>Input = Prettify<
    With...<With...<With...<ParamsType>>>
  >;
}
```

Key rules:

- Type composition order is always outermost → innermost: `WithExpiry<WithIdempotency<WithAuthorization<Params>>>` (only include the ones that apply)
- If `WithExpiry` applies, always fall back to `this.privyClient.getRequestExpiry()` when not provided
- The URL must match the generated method's URL exactly (check the `this._client.post/patch/put/delete` call)
- If the method doesn't take a `walletId` path param, adjust the signature accordingly

### 6. Wire into the parent service

If the generated class is a sub-resource (e.g., `Crypto` under `DepositAccounts` under `Wallets`), you may need to create intermediate wrapper classes too. Check if parent wrappers exist:

- If a parent wrapper exists (e.g., `PrivyDepositAccountsService`), add the new sub-service as an `override` field
- If no parent wrapper exists, create one that extends the generated parent and overrides the relevant sub-resource field
- Wire the top-most new wrapper into `wallets.ts` (or whichever service is the entry point)

Wiring pattern in the parent:

```typescript
import { Privy<Name>Service } from './<file>';

// In the class:
public override <fieldName>: Privy<Name>Service;

// In the constructor (after super()):
this.<fieldName> = new Privy<Name>Service(privyApiClient, privyClient);
```

### 7. Verify

Run lint to confirm the code compiles and passes all checks:

```bash
yarn lint
```

If lint fails, fix the issues and re-run until it passes.

## Output

Report to the user:

1. Which file(s) were created or modified
2. Which method(s) are now available (e.g., `client.wallets().depositAccounts.crypto.create(...)`)
3. Lint result (pass/fail)
