import canonicalize from 'canonicalize';
import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import { PrivKey } from '@noble/curves/utils';

export interface AuthorizationContextOptions {
  userJwts?: readonly string[];
  /**
   * The private keys to use for authorization.
   * These should be base64-encoded PKCS8-formatted private keys, with no PEM headers.
   */
  authorizationPrivateKeys?: readonly string[];
  signatures?: readonly string[];
}

export class AuthorizationContext {
  private readonly userJwts: readonly string[];
  private readonly authorizationPrivateKeys: readonly string[];
  private readonly signatures: readonly string[];

  public constructor({
    userJwts = [],
    authorizationPrivateKeys = [],
    signatures = [],
  }: AuthorizationContextOptions) {
    this.userJwts = userJwts;
    this.authorizationPrivateKeys = authorizationPrivateKeys;
    this.signatures = signatures;
  }

  /** @internal */
  public generateAuthorizationSignatures(input: WalletApiRequestSignatureInput): string[] {
    const payload = new TextEncoder().encode(canonicalize(input) ?? '');

    // TODO: add support for user JWTs
    // TODO: add support for passed in signatures

    return this.authorizationPrivateKeys.map((privateKeyPKCS8) => {
      const privateKey = importPKCS8PrivateKey(privateKeyPKCS8);
      const signature = signWithP256(payload, privateKey);
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      return Buffer.from(signature).toString('base64');
    });
  }
}

/**
 * @internal
 *
 * Imports a P-256 private key for use with the `@noble/curves` library.
 *
 * @param privateKey - A base64-encoded PKCS8-formatted private key, with no PEM headers.
 * @returns A private key object for the P-256 curve.
 */
function importPKCS8PrivateKey(privateKey: string): PrivKey {
  // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
  const pkcs8Bytes = Buffer.from(privateKey, 'base64');
  const privateKeyStart = pkcs8Bytes.indexOf(Buffer.from([0x04, 0x20]));
  if (privateKeyStart === -1) {
    throw new Error('Invalid wallet authorization private key');
  }
  const privateKeyBytes = pkcs8Bytes.subarray(privateKeyStart + 2, privateKeyStart + 34);
  return p256.Point.Fn.fromBytes(privateKeyBytes);
}

/**
 * @internal
 *
 * Signs a message with a P-256 private key using the `@noble/curves` library.
 *
 * @param message - The bytes to sign over.
 * @param privateKey - A private key object for the P-256 curve.
 * @returns The bytes of the resulting signature.
 */
function signWithP256(message: Uint8Array, privateKey: PrivKey): Uint8Array {
  return p256.sign(sha256(message), privateKey).toBytes('der');
}

export type WalletApiRequestSignatureInput = {
  /** Signature version. 1 is currently the only valid version. */
  version: 1;
  /** Request method. Signatures are not required on 'GET' requests. */
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** URL for the request. Should not contain a trailing slash. */
  url: string;
  /** Request body. */
  body: any;
  /** Privy-specific headers. */
  headers: {
    'privy-app-id': string;
    'privy-idempotency-key'?: string;
  };
};
