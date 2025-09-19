import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { importPKCS8PrivateKey } from '@privy-io/node/lib/cryptography';
import { InvalidAuthTokenError, PrivyClient } from '@privy-io/node';
import { generateP256KeyPair } from '../../helpers/authorization-keys';
import { generateTestJWT, generatePrivyJWT } from '../../helpers/jwt-auth';
import { TEST_APP } from '../test-config';

describe('PrivyUtils', () => {
  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });
  describe('utils', () => {
    describe('formatRequestForAuthorizationSignature', () => {
      it('should be able to format a minimal request', async () => {
        const result = await privyClient
          .utils()
          .requestFormatter()
          .formatRequestForAuthorizationSignature({
            version: 1,
            method: 'POST',
            url: '/api/v1/wallets',
            body: undefined,
            headers: {
              'privy-app-id': TEST_APP.id,
            },
          });
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        const resultString = new TextDecoder().decode(result);
        expect(resultString).toBe(
          `{"headers":{"privy-app-id":"${TEST_APP.id}"},"method":"POST","url":"/api/v1/wallets","version":1}`,
        );
      });
      it('should be able to format a request with a body', async () => {
        const result = await privyClient
          .utils()
          .requestFormatter()
          .formatRequestForAuthorizationSignature({
            version: 1,
            method: 'POST',
            url: '/api/v1/wallets',
            body: {
              foo: 'bar',
              baz: 1,
              qux: true,
            },
            headers: {
              'privy-app-id': TEST_APP.id,
            },
          });
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        const resultString = new TextDecoder().decode(result);
        expect(resultString).toBe(
          `{"body":{"baz":1,"foo":"bar","qux":true},"headers":{"privy-app-id":"${TEST_APP.id}"},"method":"POST","url":"/api/v1/wallets","version":1}`,
        );
      });
      it('should format empty bodies as an empty string', async () => {
        const result = await privyClient
          .utils()
          .requestFormatter()
          .formatRequestForAuthorizationSignature({
            version: 1,
            method: 'POST',
            url: '/api/v1/wallets',
            body: {},
            headers: {
              'privy-app-id': TEST_APP.id,
            },
          });
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        const resultString = new TextDecoder().decode(result);
        expect(resultString).toBe(
          `{"body":"","headers":{"privy-app-id":"${TEST_APP.id}"},"method":"POST","url":"/api/v1/wallets","version":1}`,
        );
      });
    });
    describe('generateAuthorizationSignature', () => {
      it('generates p256 signatures over the request payload', async () => {
        const keypair = generateP256KeyPair();

        const input = {
          version: 1,
          method: 'POST',
          url: '/api/v1/wallets',
          body: { foo: 'bar' },
          headers: {
            'privy-app-id': TEST_APP.id,
          },
        } as const;
        const formattedInput = privyClient
          .utils()
          .requestFormatter()
          .formatRequestForAuthorizationSignature(input);
        const result = await privyClient.utils().requestSigner().generateAuthorizationSignature({
          authorizationPrivateKey: keypair.privateKey,
          input,
        });
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);

        const publicKey = p256.getPublicKey(importPKCS8PrivateKey(keypair.privateKey));
        expect(p256.verify(Buffer.from(result, 'base64'), sha256(formattedInput), publicKey)).toBe(true);
      });
    });
    describe('generateAuthorizationSignatures', () => {
      it('generates multiple p256 signatures over the request payload', async () => {
        const keypair = generateP256KeyPair();
        const keypair2 = generateP256KeyPair();
        const keypair3 = generateP256KeyPair();

        const privateKey = importPKCS8PrivateKey(keypair.privateKey);
        const privateKey2 = importPKCS8PrivateKey(keypair2.privateKey);
        const privateKey3 = importPKCS8PrivateKey(keypair3.privateKey);

        const publicKey = p256.getPublicKey(privateKey);
        const publicKey2 = p256.getPublicKey(privateKey2);
        const publicKey3 = p256.getPublicKey(privateKey3);

        const input = {
          version: 1,
          method: 'POST',
          url: '/api/v1/wallets',
          body: { foo: 'bar' },
          headers: {
            'privy-app-id': TEST_APP.id,
          },
        } as const;
        const formattedInput = privyClient
          .utils()
          .requestFormatter()
          .formatRequestForAuthorizationSignature(input);
        const result = await privyClient
          .utils()
          .requestSigner()
          .generateAuthorizationSignatures({
            authorizationContext: {
              authorization_private_keys: [keypair.privateKey, keypair2.privateKey, keypair3.privateKey],
            },
            input,
          });
        expect(result).toBeDefined();
        expect(result.length).toEqual(3);
        expect(p256.verify(Buffer.from(result[0]!, 'base64'), sha256(formattedInput), publicKey)).toBe(true);
        expect(p256.verify(Buffer.from(result[1]!, 'base64'), sha256(formattedInput), publicKey2)).toBe(true);
        expect(p256.verify(Buffer.from(result[2]!, 'base64'), sha256(formattedInput), publicKey3)).toBe(true);
      });
    });
  });
  describe('verifyAuthToken', () => {
    it('should throw an error if the access token passed is a custom JWT', async () => {
      const jwt = await generateTestJWT();
      await expect(privyClient.utils().auth().verifyAuthToken(jwt)).rejects.toThrow(InvalidAuthTokenError);
    });
    it('should validate a freshly authenticated email account', async () => {
      const privyToken = await generatePrivyJWT();

      const verifiedToken = await privyClient.utils().auth().verifyAuthToken(privyToken);
      expect(verifiedToken).toEqual({
        app_id: TEST_APP.id,
        issuer: 'privy.io',
        issued_at: expect.any(Number),
        expiration: expect.any(Number),
        session_id: expect.any(String),
        user_id: expect.any(String),
      });
    });
  });
});
