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
