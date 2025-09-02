import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import canonicalize from 'canonicalize';
import { PrivyAPIError } from '../core/error';
import { importPKCS8PrivateKey } from './cryptography';

export interface AuthorizationContext {
  /**
   * The private keys to use for authorization.
   * These should be base64-encoded PKCS8-formatted private keys, with no PEM headers.
   */
  authorizationPrivateKeys?: string[];
  // TODO: userJwts?: readonly string[];
  // TODO: signatures?: readonly string[];
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

/**
 * Formats the request payload into the expected authorization payload, canconicalizes it,
 * and encodes the JSON string into bytes.
 *
 * @param request The request to be formatted.
 * @return The raw bytes representing the authorization payload.
 */
export function formatRequestForAuthorizationSignature(input: WalletApiRequestSignatureInput): Uint8Array {
  const serializedInput = canonicalize(input);
  if (!serializedInput) {
    throw new PrivyAPIError('Failed to serialize request for authorization signature');
  }
  return new TextEncoder().encode(serializedInput);
}

/**
 * Generates authorization signatures from the given authorization context and signable request.
 * This method handles JWT exchange and private key signing.
 *
 * Manual signing of requests is intended for advanced use cases.
 *
 * @param authorizationContext The authorization context containing JWTs, private keys, and signatures.
 * @param input The request payload to sign.
 * @returns An array of authorization signatures.
 */
export function generateAuthorizationSignatures({
  authorizationContext,
  input,
}: {
  authorizationContext: AuthorizationContext;
  input: WalletApiRequestSignatureInput;
}): string[] {
  const payload = formatRequestForAuthorizationSignature(input);

  // TODO: add support for user JWTs
  // TODO: add support for passed in signatures
  const privateKeys = authorizationContext.authorizationPrivateKeys ?? [];

  return privateKeys.map((sk) =>
    generateAuthorizationSignature({ authorizationPrivateKey: sk, input: payload }),
  );
}

/**
 * Signs the given request with the provided private key.
 *
 * @param authorizationPrivateKey The base64-encoded PKCS8-formatted private key, with no PEM headers.
 * @param input The request payload to sign, or one serialized using {@link formatRequestForAuthorizationSignature}.
 * @return The authorization signature.
 */
export function generateAuthorizationSignature({
  authorizationPrivateKey,
  input,
}: {
  authorizationPrivateKey: string;
  input: WalletApiRequestSignatureInput | Uint8Array;
}): string {
  const payload = input instanceof Uint8Array ? input : formatRequestForAuthorizationSignature(input);
  const privateKey = importPKCS8PrivateKey(authorizationPrivateKey);

  const signature = p256.sign(sha256(payload), privateKey).toBytes('der');
  // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
  return Buffer.from(signature).toString('base64');
}
