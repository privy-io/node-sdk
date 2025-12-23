import { Chacha20Poly1305 } from '@hpke/chacha20poly1305';
import { CipherSuite, DhkemP256HkdfSha256, HkdfSha256 } from '@hpke/core';
import { p256 } from '@noble/curves/nist';
import type { PrivKey } from '@noble/curves/utils';
import { toBase64 } from '../internal/utils/base64';

/**
 * Returns the runtime's `SubtleCrypto` implementation.
 *
 * We rely on `globalThis.crypto.subtle` for broad runtime support (Node.js 20+, Deno, Bun, Workers/Edge).
 *
 * @internal
 */
function getSubtleCrypto(): typeof globalThis.crypto.subtle {
  const subtle = (globalThis as any).crypto?.subtle;
  if (!subtle) {
    throw new Error(
      '`crypto.subtle` is not defined as a global; Either run in a runtime that provides WebCrypto, or polyfill `globalThis.crypto`',
    );
  }
  return subtle;
}

export interface P256KeyPair {
  /**
   * The base64-encoded SPKI-formatted public key, with no PEM headers.
   *
   * This is the format accepted by Privy when specifying a P-256 public key owner.
   */
  publicKey: string;
  /**
   * The base64-encoded PKCS8-formatted private key, with no PEM headers.
   *
   * This is the format accepted by {@link AuthorizationContext.authorization_private_keys} and
   * {@link generateAuthorizationSignature}.
   */
  privateKey: string;
}

/**
 * Generates a P-256 key pair suitable for Privy resource ownership and request
 * authorization signing.
 *
 * @returns A P-256 key pair, in base64-encoded DER format.
 *
 * @example
 * const keypair = await generateP256KeyPair();
 * const wallet = await privy.wallets().create({
 *   chain_type: '...',
 *   owner: { public_key: keypair.publicKey },
 * });
 * const response = await privy.wallets().rawSign(wallet.id, {
 *   params: { hash: '...' },
 *   authorization_context: {
 *     authorization_private_keys: [keypair.privateKey]
 *   },
 * });
 */
export async function generateP256KeyPair(): Promise<P256KeyPair> {
  const subtle = getSubtleCrypto();
  const keyPair = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);

  const [publicKeyDer, privateKeyDer] = await Promise.all([
    subtle.exportKey('spki', keyPair.publicKey),
    subtle.exportKey('pkcs8', keyPair.privateKey),
  ]);

  return {
    publicKey: toBase64(new Uint8Array(publicKeyDer)),
    privateKey: toBase64(new Uint8Array(privateKeyDer)),
  };
}

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

/** This prefix is no longer used, but we need to support existing keys */
const WALLET_API_PRIVATE_KEY_PREFIX = 'wallet-api:';
const AUTHORIZATION_PRIVATE_KEY_PREFIX = 'wallet-auth:';
