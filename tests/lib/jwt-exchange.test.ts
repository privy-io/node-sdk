import { generateP256KeyPair, type PrivyClient } from '@privy-io/node';
import { generateAuthorizationSignatures } from '@privy-io/node/lib/authorization';
import { setupHPKESender } from '@privy-io/node/lib/cryptography';
import { JwtExchangeService } from '@privy-io/node/lib/jwt-exchange';
import type { Wallets } from '@privy-io/node/resources';
import crypto from 'node:crypto';

type AuthenticateWithJwt = Wallets['authenticateWithJwt'];

/** Stands in for `POST /v1/wallets/authenticate`, encrypting a fresh signing key per call. */
function fakeAuthenticate(expiresInMs = 60_000) {
  return jest.fn(async (body: Parameters<AuthenticateWithJwt>[0], _options?: unknown) => {
    const { privateKey } = await generateP256KeyPair();
    const recipientPublicKey = new Uint8Array(
      await crypto.subtle.exportKey(
        'raw',
        await crypto.subtle.importKey(
          'spki',
          Buffer.from(body.recipient_public_key, 'base64'),
          { name: 'ECDH', namedCurve: 'P-256' },
          true,
          [],
        ),
      ),
    );
    const sender = await setupHPKESender();
    const { encapsulatedKey, ciphertext } = await sender.encryptPayload(
      recipientPublicKey,
      new TextEncoder().encode(privateKey),
    );
    return {
      encrypted_authorization_key: {
        encryption_type: 'HPKE',
        encapsulated_key: Buffer.from(encapsulatedKey).toString('base64'),
        ciphertext: Buffer.from(ciphertext).toString('base64'),
      },
      expires_at: Date.now() + expiresInMs,
      wallets: [],
    };
  });
}

function exchangeService(authenticate: ReturnType<typeof fakeAuthenticate>) {
  return new JwtExchangeService({ authenticateWithJwt: authenticate } as unknown as Wallets, 10);
}

function mfaHeader(call: unknown[]) {
  const options = call[1] as { headers?: Record<string, string> } | undefined;
  return options?.headers?.['privy-mfa-token'];
}

describe('JwtExchangeService', () => {
  const jwt = `jwt-${crypto.randomUUID()}`;
  const mfaToken = `mfa-${crypto.randomUUID()}`;

  it('sends the MFA token as the privy-mfa-token header', async () => {
    const authenticate = fakeAuthenticate();

    await exchangeService(authenticate).exchangeJwtForAuthorizationKey(jwt, mfaToken);

    expect(authenticate).toHaveBeenCalledTimes(1);
    expect(authenticate.mock.calls[0]![0]).toMatchObject({ user_jwt: jwt, encryption_type: 'HPKE' });
    expect(mfaHeader(authenticate.mock.calls[0]!)).toBe(mfaToken);
  });

  it('sends no MFA header without an MFA token', async () => {
    const authenticate = fakeAuthenticate();

    await exchangeService(authenticate).exchangeJwtForAuthorizationKey(jwt);

    expect(mfaHeader(authenticate.mock.calls[0]!)).toBeUndefined();
  });

  it('reuses the cached key for the same JWT', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const key = await service.exchangeJwtForAuthorizationKey(jwt);

    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(key);
    expect(authenticate).toHaveBeenCalledTimes(1);
  });

  it('caches keys separately per JWT', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);
    const otherJwt = `jwt-${crypto.randomUUID()}`;

    const key = await service.exchangeJwtForAuthorizationKey(jwt);
    const otherKey = await service.exchangeJwtForAuthorizationKey(otherJwt);

    expect(otherKey).not.toBe(key);
    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(key);
    expect(await service.exchangeJwtForAuthorizationKey(otherJwt)).toBe(otherKey);
    expect(authenticate).toHaveBeenCalledTimes(2);
  });

  it('exchanges again once the cached key expires', async () => {
    const authenticate = fakeAuthenticate(-1_000);
    const service = exchangeService(authenticate);

    const expiredKey = await service.exchangeJwtForAuthorizationKey(jwt);

    expect(await service.exchangeJwtForAuthorizationKey(jwt)).not.toBe(expiredKey);
    expect(authenticate).toHaveBeenCalledTimes(2);
  });

  it('reuses a key issued with an MFA token for the same MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);

    expect(await service.exchangeJwtForAuthorizationKey(jwt, mfaToken)).toBe(withMfa);
    expect(authenticate).toHaveBeenCalledTimes(1);
  });

  it('reuses a key issued with an MFA token for requests without one', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);

    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(withMfa);
    expect(await service.exchangeJwtForAuthorizationKey(jwt, null)).toBe(withMfa);
    expect(authenticate).toHaveBeenCalledTimes(1);
  });

  it('replaces a key issued without an MFA token when given one', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const withoutMfa = await service.exchangeJwtForAuthorizationKey(jwt);
    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);

    expect(withMfa).not.toBe(withoutMfa);
    expect(mfaHeader(authenticate.mock.calls[1]!)).toBe(mfaToken);
    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(withMfa);
    expect(authenticate).toHaveBeenCalledTimes(2);
  });

  it('replaces the cached key when given a different MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);
    const otherMfaToken = `mfa-${crypto.randomUUID()}`;

    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);
    const withOtherMfa = await service.exchangeJwtForAuthorizationKey(jwt, otherMfaToken);

    expect(withOtherMfa).not.toBe(withMfa);
    expect(mfaHeader(authenticate.mock.calls[1]!)).toBe(otherMfaToken);
    expect(await service.exchangeJwtForAuthorizationKey(jwt, otherMfaToken)).toBe(withOtherMfa);
    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(withOtherMfa);
    expect(authenticate).toHaveBeenCalledTimes(2);
  });

  it('does not let a key issued without an MFA token replace one issued with one', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);
    const exchange = authenticate.getMockImplementation()!;
    let releaseExchangeWithoutMfa!: () => void;
    const exchangeWithoutMfaReleased = new Promise<void>((resolve) => (releaseExchangeWithoutMfa = resolve));
    authenticate.mockImplementation(async (body, options) => {
      if (!mfaHeader([body, options])) {
        await exchangeWithoutMfaReleased;
      }
      return exchange(body, options);
    });

    const withoutMfa = service.exchangeJwtForAuthorizationKey(jwt);
    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);
    releaseExchangeWithoutMfa();
    await withoutMfa;

    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(withMfa);
    expect(authenticate).toHaveBeenCalledTimes(2);
  });

  it('does not keep the raw JWT or MFA token in the cache', async () => {
    const service = exchangeService(fakeAuthenticate());

    await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);

    const cacheEntries = JSON.stringify([...service['jwtCache'].entries()]);
    expect(service['jwtCache'].size).toBe(1);
    expect(cacheEntries).not.toContain(jwt);
    expect(cacheEntries).not.toContain(mfaToken);
  });

  it('treats a null MFA token as no MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const withoutMfa = await service.exchangeJwtForAuthorizationKey(jwt);

    expect(await service.exchangeJwtForAuthorizationKey(jwt, null)).toBe(withoutMfa);
    expect(authenticate).toHaveBeenCalledTimes(1);
    expect(mfaHeader(authenticate.mock.calls[0]!)).toBeUndefined();
  });
});

describe('generateAuthorizationSignatures', () => {
  const input = {
    version: 1 as const,
    method: 'POST' as const,
    url: 'https://api.privy.io/v1/wallets/wallet-id/rpc',
    body: { method: 'personal_sign' },
    headers: { 'privy-app-id': 'app-id' },
  };

  function clientFor(authenticate: ReturnType<typeof fakeAuthenticate>) {
    const exchange = exchangeService(authenticate);
    return { _jwtExchange: () => exchange } as unknown as PrivyClient;
  }

  function exchanges(authenticate: ReturnType<typeof fakeAuthenticate>) {
    return authenticate.mock.calls.map((call) => ({
      user_jwt: call[0].user_jwt,
      mfa_token: mfaHeader(call),
    }));
  }

  it('exchanges user_auth with its MFA token alongside user_jwts', async () => {
    const authenticate = fakeAuthenticate();
    const client = clientFor(authenticate);
    const userAuth = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };
    const userJwt = `jwt-${crypto.randomUUID()}`;

    const signatures = await generateAuthorizationSignatures(client, {
      authorizationContext: { user_jwts: [userJwt], user_auth: [userAuth] },
      input,
    });

    expect(signatures).toHaveLength(2);
    expect(exchanges(authenticate)).toEqual(
      expect.arrayContaining([
        { user_jwt: userJwt, mfa_token: undefined },
        { user_jwt: userAuth.user_jwt, mfa_token: userAuth.mfa_token },
      ]),
    );
  });

  it('exchanges a JWT in both user_jwts and user_auth once, with the MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const userAuth = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };

    const signatures = await generateAuthorizationSignatures(clientFor(authenticate), {
      authorizationContext: { user_jwts: [userAuth.user_jwt], user_auth: [userAuth] },
      input,
    });

    expect(signatures).toHaveLength(1);
    expect(exchanges(authenticate)).toEqual([userAuth]);
  });

  it('exchanges each user_auth entry with its own MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const first = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };
    const second = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };
    const third = { user_jwt: `jwt-${crypto.randomUUID()}` };

    const signatures = await generateAuthorizationSignatures(clientFor(authenticate), {
      authorizationContext: { user_auth: [first, second, third] },
      input,
    });

    expect(signatures).toHaveLength(3);
    expect(exchanges(authenticate)).toEqual(
      expect.arrayContaining([first, second, { ...third, mfa_token: undefined }]),
    );
  });

  it('keeps the MFA token for a JWT repeated in user_auth without one', async () => {
    const authenticate = fakeAuthenticate();
    const userAuth = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };

    const signatures = await generateAuthorizationSignatures(clientFor(authenticate), {
      authorizationContext: { user_auth: [userAuth, { user_jwt: userAuth.user_jwt }] },
      input,
    });

    expect(signatures).toHaveLength(1);
    expect(exchanges(authenticate)).toEqual([userAuth]);
  });

  it('exchanges a JWT repeated in user_jwts once', async () => {
    const authenticate = fakeAuthenticate();
    const userJwt = `jwt-${crypto.randomUUID()}`;

    const signatures = await generateAuthorizationSignatures(clientFor(authenticate), {
      authorizationContext: { user_jwts: [userJwt, userJwt] },
      input,
    });

    expect(signatures).toHaveLength(1);
    expect(exchanges(authenticate)).toEqual([{ user_jwt: userJwt, mfa_token: undefined }]);
  });
});
