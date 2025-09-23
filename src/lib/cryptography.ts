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
  const strippedPrivateKey = privateKey
    .replace(AUTHORIZATION_PRIVATE_KEY_PREFIX, '')
    .replace(WALLET_API_PRIVATE_KEY_PREFIX, '');

  // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
  const pkcs8Bytes = Buffer.from(strippedPrivateKey, 'base64');
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
export async function setupHPKERecipient(): Promise<HPKERecipient> {
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

/** This prefix is no longer used, but we need to support existing keys */
export const WALLET_API_PRIVATE_KEY_PREFIX = 'wallet-api:';
export const AUTHORIZATION_PRIVATE_KEY_PREFIX = 'wallet-auth:';
