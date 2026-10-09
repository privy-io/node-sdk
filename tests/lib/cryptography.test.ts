import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { PrivyAPIError, PrivyClient, generateP256KeyPair } from '@privy-io/node';
import { generateAuthorizationSignature } from '@privy-io/node/lib/authorization';
import { importPKCS8PrivateKey } from '@privy-io/node/lib/cryptography';
import { base64 } from '@scure/base';
import crypto from 'node:crypto';

const message = new TextEncoder().encode('Hello, world!');

function nodeKeyPair(namedCurve: string): { privateKeyDer: Uint8Array; publicKey: crypto.KeyObject } {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve });
  return { privateKeyDer: privateKey.export({ format: 'der', type: 'pkcs8' }), publicKey };
}

function expectInvalidKey(privateKey: string, reason?: string | RegExp) {
  expect(() => importPKCS8PrivateKey(privateKey)).toThrow(PrivyAPIError);
  expect(() => importPKCS8PrivateKey(privateKey)).toThrow(
    reason ?? /Invalid wallet authorization private key/,
  );
}

describe('importPKCS8PrivateKey', () => {
  describe('valid P-256 PKCS#8 keys', () => {
    it.each(['', 'wallet-auth:', 'wallet-api:'])(
      'accepts a node:crypto P-256 key with prefix %p and produces verifiable signatures',
      (prefix) => {
        const { privateKeyDer, publicKey } = nodeKeyPair('prime256v1');
        const signature = generateAuthorizationSignature({
          authorizationPrivateKey: prefix + base64.encode(privateKeyDer),
          input: message,
        });

        expect(
          crypto.verify('sha256', message, { key: publicKey, dsaEncoding: 'der' }, base64.decode(signature)),
        ).toBe(true);
      },
    );

    it.each([
      ['wrapped at 64 characters', (key: string) => key.replace(/.{64}/g, '$&\n')],
      ['wrapped at 76 characters with CRLF', (key: string) => key.replace(/.{76}/g, '$&\r\n')],
      ['surrounded by whitespace', (key: string) => ` \t${key}\n`],
      ['prefixed and with a trailing newline', (key: string) => `wallet-auth:${key}\n`],
    ])('ignores whitespace in a key %s', (_, format) => {
      const { privateKeyDer, publicKey } = nodeKeyPair('prime256v1');
      const scalar = importPKCS8PrivateKey(format(base64.encode(privateKeyDer)));
      const signature = p256.sign(sha256(message), scalar).toBytes('der');
      expect(crypto.verify('sha256', message, { key: publicKey, dsaEncoding: 'der' }, signature)).toBe(true);
    });

    it('accepts a key from generateP256KeyPair', async () => {
      const { privateKey, publicKey } = await generateP256KeyPair();
      const scalar = importPKCS8PrivateKey(privateKey);
      const signature = p256.sign(sha256(message), scalar).toBytes('compact');

      const webPublicKey = await crypto.subtle.importKey(
        'spki',
        base64.decode(publicKey),
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify'],
      );
      expect(
        await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, webPublicKey, signature, message),
      ).toBe(true);
    });
  });

  describe('invalid keys', () => {
    // Exhaustive validation cases live in tests/lib/pkcs8.test.ts; these check the wiring.
    it.each(['', 'wallet-auth:', 'wallet-api:'])('rejects a secp256k1 key with prefix %p', (prefix) => {
      const { privateKeyDer } = nodeKeyPair('secp256k1');
      expectInvalidKey(prefix + base64.encode(privateKeyDer), /curve must be P-256/);
    });

    it('rejects a key that is not valid base64', () => {
      expectInvalidKey('not a key!', /not valid base64/);
    });
  });
});

describe('PrivyClient with an invalid authorization private key', () => {
  it('throws before sending the request', async () => {
    const fetch = jest.fn();
    const client = new PrivyClient({
      appId: 'app-id',
      appSecret: 'app-secret',
      apiUrl: 'http://localhost:5000',
      fetch,
    });
    const { privateKeyDer } = nodeKeyPair('secp256k1');

    await expect(
      client.wallets().rawSign('wallet-id', {
        params: { hash: '0x' + '00'.repeat(32) },
        authorization_context: { authorization_private_keys: [base64.encode(privateKeyDer)] },
      }),
    ).rejects.toThrow(/Invalid wallet authorization private key/);
    expect(fetch).not.toHaveBeenCalled();
  });
});
