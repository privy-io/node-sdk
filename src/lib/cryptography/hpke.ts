import { Chacha20Poly1305 } from '@hpke/chacha20poly1305';
import { CipherSuite, DhkemP256HkdfSha256, HkdfSha256 } from '@hpke/core';
import { getSubtleCrypto } from './webcrypto';

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
export async function setupHPKERecipient(): Promise<HPKERecipient> {
  const suite = new CipherSuite({
    kem: new DhkemP256HkdfSha256(),
    kdf: new HkdfSha256(),
    aead: new Chacha20Poly1305(),
  });

  const keypair = await suite.kem.generateKeyPair();
  const subtle = getSubtleCrypto();
  const publicKeySpki = await subtle.exportKey('spki', keypair.publicKey);

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

/** @internal */
export interface HPKESender {
  /**
   * Encrypts a payload for the recipient in an HPKE flow.
   * @param publicKey - The public key of the recipient to use for encryption.
   * @param payload - The payload to encrypt.
   * @returns The encapsulated key and ciphertext to send out.
   */
  encryptPayload: (publicKey: Uint8Array, payload: Uint8Array) => Promise<HPKESender.EncryptPayloadOutput>;
}

export namespace HPKESender {
  export interface EncryptPayloadOutput {
    ciphertext: Uint8Array;
    encapsulatedKey: Uint8Array;
  }
}

export async function setupHPKESender(): Promise<HPKESender> {
  const suite = new CipherSuite({
    kem: new DhkemP256HkdfSha256(),
    kdf: new HkdfSha256(),
    aead: new Chacha20Poly1305(),
  });

  return {
    encryptPayload: async (publicKey: Uint8Array, payload: Uint8Array) => {
      const recipientPublicKey = await suite.kem.deserializePublicKey(publicKey);
      const sender = await suite.createSenderContext({
        recipientPublicKey,
      });

      const ciphertext = await sender.seal(payload);

      return {
        ciphertext: new Uint8Array(ciphertext),
        encapsulatedKey: new Uint8Array(sender.enc),
      };
    },
  };
}
