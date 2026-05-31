import * as jose from 'jose';
import {
  createPrivyAppJWKS,
  PrivyAppJWKS,
  verifyAccessToken,
  verifyIdentityToken,
} from '@privy-io/node/lib/auth';
import { randomInt, randomUUID } from 'node:crypto';
import { User } from '@privy-io/node/resources';
import { generatePrivyJWT } from '../../helpers/jwt-auth';
import { TEST_APP } from '../test-config';

describe('auth library', () => {
  let keypair: jose.GenerateKeyPairResult;
  let appJwks: PrivyAppJWKS;
  beforeAll(async () => {
    keypair = await jose.generateKeyPair('ES256');
    const publicKey = await jose.exportSPKI(keypair.publicKey);
    appJwks = createPrivyAppJWKS({
      appId: TEST_APP.id,
      apiUrl: TEST_APP.apiUrl,
      headers: {},
      verificationKeyOverride: publicKey,
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify an access token with a fixed verification key', async () => {
      const sessionId = `session:${randomUUID()}`;
      const userId = `user:${randomUUID()}`;

      const accessToken = await new jose.SignJWT({ sid: sessionId })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(userId)
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      const verifiedAccessToken = await verifyAccessToken({
        app_id: TEST_APP.id,
        verification_key: keypair.publicKey,
        access_token: accessToken,
      });

      expect(verifiedAccessToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: sessionId,
        user_id: userId,
      });
    });
    it('should verify an access token with an override', async () => {
      const sessionId = `session:${randomUUID()}`;
      const userId = `user:${randomUUID()}`;

      const accessToken = await new jose.SignJWT({ sid: sessionId })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(userId)
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      const verifiedAccessToken = await verifyAccessToken({
        app_id: TEST_APP.id,
        verification_key: appJwks,
        access_token: accessToken,
      });

      expect(verifiedAccessToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: sessionId,
        user_id: userId,
      });
    });
    it('should verify an access token against a JWKS endpoint', async () => {
      const accessToken = await generatePrivyJWT();

      const verifiedAccessToken = await verifyAccessToken({
        app_id: TEST_APP.id,
        verification_key: jose.createRemoteJWKSet(
          new URL(`${TEST_APP.apiUrl}/v1/apps/${TEST_APP.id}/jwks.json`),
        ),
        access_token: accessToken,
      });

      expect(verifiedAccessToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: expect.any(String),
        user_id: expect.any(String),
      });
    });
  });
  describe('verifyIdentityToken', () => {
    it('should verify a minimal identity token', async () => {
      const userId = `user:${randomUUID()}`;

      const linkedAccounts: unknown[] = [
        { type: 'email', address: 'test@test.com', lv: randomInt(10e10) },
        {
          type: 'wallet',
          address: '0x1234567890',
          chain_type: 'ethereum',
          wallet_client_type: 'privy',
          lv: randomInt(10e10),
        },
        {
          type: 'github_oauth',
          subject: '1234567890',
          username: 'test',
          lv: randomInt(10e10),
        },
      ];

      const identityToken = await new jose.SignJWT({ linked_accounts: JSON.stringify(linkedAccounts) })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(userId)
        .setClaim('cr', String(randomInt(10e10)))
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      const user = await verifyIdentityToken({
        app_id: TEST_APP.id,
        verification_key: appJwks,
        identity_token: identityToken,
      });

      expect(user).toMatchObject({
        id: userId,
        created_at: expect.any(Number),
        is_guest: false,
        linked_accounts: [
          expect.objectContaining({
            type: 'email',
            address: 'test@test.com',
            latest_verified_at: expect.any(Number),
          }),
          expect.objectContaining({
            type: 'wallet',
            address: '0x1234567890',
            chain_type: 'ethereum',
            wallet_client_type: 'privy',
            latest_verified_at: expect.any(Number),
          }),
          expect.objectContaining({
            type: 'github_oauth',
            subject: '1234567890',
            username: 'test',
            latest_verified_at: expect.any(Number),
          }),
        ],
        has_accepted_terms: false,
        mfa_methods: [],
      } satisfies User);
    });

    it('should reject malformed created_at claims', async () => {
      const identityToken = await new jose.SignJWT({ linked_accounts: JSON.stringify([]) })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(`user:${randomUUID()}`)
        .setClaim('cr', '123abc')
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      await expect(
        verifyIdentityToken({
          app_id: TEST_APP.id,
          verification_key: appJwks,
          identity_token: identityToken,
        }),
      ).rejects.toThrow('Unable to parse identity token');
    });
  });
});
