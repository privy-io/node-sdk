import { setupHPKERecipient, setupHPKESender } from '@privy-io/node/lib/cryptography';

describe('cryptography library', () => {
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
