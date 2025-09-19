import * as jose from 'jose';
import {
  createPrivyAppJWKS,
  PrivyAppJWKS,
  verifyAuthToken,
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

  describe('verifyAuthToken', () => {
    it('should verify an authentication token with a fixed verification key', async () => {
      const sessionId = `session:${randomUUID()}`;
      const userId = `user:${randomUUID()}`;

      const authToken = await new jose.SignJWT({ sid: sessionId })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(userId)
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      const verifiedAuthToken = await verifyAuthToken({
        app_id: TEST_APP.id,
        verification_key: keypair.publicKey,
        auth_token: authToken,
      });

      expect(verifiedAuthToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: sessionId,
        user_id: userId,
      });
    });
    it('should verify an authentication token with an override', async () => {
      const sessionId = `session:${randomUUID()}`;
      const userId = `user:${randomUUID()}`;

      const authToken = await new jose.SignJWT({ sid: sessionId })
        .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
        .setIssuer('privy.io')
        .setIssuedAt()
        .setAudience(TEST_APP.id)
        .setSubject(userId)
        .setExpirationTime('1h')
        .sign(keypair.privateKey);

      const verifiedAuthToken = await verifyAuthToken({
        app_id: TEST_APP.id,
        verification_key: appJwks,
        auth_token: authToken,
      });

      expect(verifiedAuthToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: sessionId,
        user_id: userId,
      });
    });
    it('should verify an authentication token against a JWKS endpoint', async () => {
      const authToken = await generatePrivyJWT();

      const verifiedAuthToken = await verifyAuthToken({
        app_id: TEST_APP.id,
        verification_key: jose.createRemoteJWKSet(
          new URL(`${TEST_APP.apiUrl}/v1/apps/${TEST_APP.id}/jwks.json`),
        ),
        auth_token: authToken,
      });

      expect(verifiedAuthToken).toEqual({
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
  });
});
