import { Chacha20Poly1305 } from '@hpke/chacha20poly1305';
import { CipherSuite, DhkemP256HkdfSha256, HkdfSha256 } from '@hpke/core';
import { p256 } from '@noble/curves/nist';
import type { PrivKey } from '@noble/curves/utils';

/**
 * Imports a P-256 private key for use with the `@noble/curves` library.
 *
 * @param privateKey - A base64-encoded PKCS8-formatted private key, with no PEM headers.
 * @returns A private key object for the P-256 curve.
 * @internal
 */
export function importPKCS8PrivateKey(privateKey: string): PrivKey {
  // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
  const pkcs8Bytes = Buffer.from(privateKey, 'base64');
  const privateKeyStart = pkcs8Bytes.indexOf(Buffer.from([0x04, 0x20]));

  if (privateKeyStart === -1) {
    throw new Error('Invalid wallet authorization private key');
  }
  const privateKeyBytes = pkcs8Bytes.subarray(privateKeyStart + 2, privateKeyStart + 34);
  return p256.Point.Fn.fromBytes(privateKeyBytes);
}

/** @internal */
export interface HPKERecipient {
  /** The recipient's public key. */
  publicKeySpki: Uint8Array;
  /**
   * Decrypts an HPKE-encrypted message received from the sender.
   * @param encapsulatedKey - The encapsulated key to use for decryption.
   * @param ciphertext - The ciphertext to decrypt.
   * @returns The decrypted message.
   */
  decryptPayload: (encapsulatedKey: Uint8Array, ciphertext: Uint8Array) => Promise<Uint8Array>;
}

/**
 * Sets up HPKE for securely requesting a payload (as the recipient)
 * from a sender (e.g. the Privy API).
 * @returns The HPKE receiver object.
 * @internal
 */
export async function setupHPKE(): Promise<HPKERecipient> {
  const suite = new CipherSuite({
    kem: new DhkemP256HkdfSha256(),
    kdf: new HkdfSha256(),
    aead: new Chacha20Poly1305(),
  });

  const keypair = await suite.kem.generateKeyPair();
  const publicKeySpki = await crypto.subtle.exportKey('spki', keypair.publicKey);

  return {
    publicKeySpki: new Uint8Array(publicKeySpki),
    decryptPayload: async (encapsulatedKey: Uint8Array, ciphertext: Uint8Array) => {
      const recipient = await suite.createRecipientContext({
        recipientKey: keypair.privateKey,
        enc: encapsulatedKey,
      });

      const decodedBytes = await recipient.open(ciphertext);

      return new Uint8Array(decodedBytes);
    },
  };
}
