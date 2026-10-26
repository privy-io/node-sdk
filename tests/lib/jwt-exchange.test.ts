import { generateP256KeyPair, type PrivyClient } from '@privy-io/node';
import { generateAuthorizationSignatures } from '@privy-io/node/lib/authorization';
import { setupHPKESender } from '@privy-io/node/lib/cryptography';
import { JwtExchangeService } from '@privy-io/node/lib/jwt-exchange';
import type { Wallets } from '@privy-io/node/resources';
import crypto from 'node:crypto';

type AuthenticateWithJwt = Wallets['authenticateWithJwt'];

/** Stands in for `POST /v1/wallets/authenticate`, encrypting a fresh authorization key per call. */
function fakeAuthenticate() {
  return jest.fn(async (body: Parameters<AuthenticateWithJwt>[0]) => {
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
      expires_at: Date.now() + 60_000,
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

  it('caches authorization keys per JWT and MFA token', async () => {
    const authenticate = fakeAuthenticate();
    const service = exchangeService(authenticate);

    const withoutMfa = await service.exchangeJwtForAuthorizationKey(jwt);
    const withMfa = await service.exchangeJwtForAuthorizationKey(jwt, mfaToken);

    expect(withMfa).not.toBe(withoutMfa);
    expect(await service.exchangeJwtForAuthorizationKey(jwt)).toBe(withoutMfa);
    expect(await service.exchangeJwtForAuthorizationKey(jwt, mfaToken)).toBe(withMfa);
    expect(authenticate).toHaveBeenCalledTimes(2);
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

  it('exchanges user_auth with its MFA token alongside user_jwts', async () => {
    const authenticate = fakeAuthenticate();
    const exchange = exchangeService(authenticate);
    const client = { _jwtExchange: () => exchange } as unknown as PrivyClient;
    const userAuth = { user_jwt: `jwt-${crypto.randomUUID()}`, mfa_token: `mfa-${crypto.randomUUID()}` };
    const userJwt = `jwt-${crypto.randomUUID()}`;

    const signatures = await generateAuthorizationSignatures(client, {
      authorizationContext: { user_jwts: [userJwt], user_auth: userAuth },
      input,
    });

    expect(signatures).toHaveLength(2);
    const calls = authenticate.mock.calls.map((call) => ({
      user_jwt: call[0].user_jwt,
      mfa_token: mfaHeader(call),
    }));
    expect(calls).toEqual(
      expect.arrayContaining([
        { user_jwt: userJwt, mfa_token: undefined },
        { user_jwt: userAuth.user_jwt, mfa_token: userAuth.mfa_token },
      ]),
    );
  });
});
