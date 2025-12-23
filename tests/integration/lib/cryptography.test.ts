import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { generateP256KeyPair } from '@privy-io/node';
import { importPKCS8PrivateKey, setupHPKERecipient, setupHPKESender } from '@privy-io/node/lib/cryptography';
import crypto from 'node:crypto';

describe('cryptography library', () => {
  describe('generateP256KeyPair', () => {
    const someMessage = new TextEncoder().encode('Hello, world!');
    it('returns base64 DER keys that can be imported to node:crypto used for ECDSA sign/verify', async () => {
      const { publicKey, privateKey } = await generateP256KeyPair();

      const importedPrivateKey = crypto.createPrivateKey({
        key: Buffer.from(privateKey, 'base64'),
        format: 'der',
        type: 'pkcs8',
      });
      const importedPublicKey = crypto.createPublicKey({
        key: Buffer.from(publicKey, 'base64'),
        format: 'der',
        type: 'spki',
      });

      const signature = crypto.sign('sha256', someMessage, importedPrivateKey);
      expect(crypto.verify('sha256', someMessage, importedPublicKey, signature)).toBe(true);
    });

    it('produces a private key compatible with importPKCS8PrivateKey + noble p256 signing', async () => {
      const { privateKey } = await generateP256KeyPair();

      const noblePrivateKey = importPKCS8PrivateKey(privateKey);
      const noblePublicKey = p256.getPublicKey(noblePrivateKey);

      const signatureDer = p256.sign(sha256(someMessage), noblePrivateKey).toBytes('der');
      expect(p256.verify(signatureDer, sha256(someMessage), noblePublicKey)).toBe(true);
    });

    it('generates fresh key material on each call', async () => {
      const kp1 = await generateP256KeyPair();
      const kp2 = await generateP256KeyPair();

      expect(kp1.privateKey).not.toEqual(kp2.privateKey);
      expect(kp1.publicKey).not.toEqual(kp2.publicKey);
    });
  });

  describe('HPKE', () => {
    it('should be able to encrypt and decrypt a message', async () => {
      const sender = await setupHPKESender();
      const recipient = await setupHPKERecipient();
      const payload = new TextEncoder().encode('Hello, world!');

      const recipientPublicKey = new Uint8Array(
        await crypto.subtle.exportKey(
          'raw',
          await crypto.subtle.importKey(
            'spki',
            recipient.publicKeySpki,
            { name: 'ECDH', namedCurve: 'P-256' },
            true,
            [],
          ),
        ),
      );
      const { encapsulatedKey, ciphertext } = await sender.encryptPayload(recipientPublicKey, payload);
      const decryptedPayload = await recipient.decryptPayload(encapsulatedKey, ciphertext);

      expect(decryptedPayload).toEqual(payload);
    });
  });
});
