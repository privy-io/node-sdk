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

/** This prefix is no longer used, but we need to support existing keys */
const WALLET_API_PRIVATE_KEY_PREFIX = 'wallet-api:';
const AUTHORIZATION_PRIVATE_KEY_PREFIX = 'wallet-auth:';
