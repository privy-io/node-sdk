import { p256 } from '@noble/curves/nist';
import { sha256 } from '@noble/hashes/sha2';
import canonicalize from 'canonicalize';
import { PrivyAPIError } from '../core/error';
import { importPKCS8PrivateKey } from './cryptography';
import { PrivyClient } from '../public-api/PrivyClient';

/**
 * The authorization context should contain:
 * - Any authorization private keys that must sign the request
 * - The JWTs for any users that must sign the request
 * - Any additional signatures you have computed for the request
 *
 * The Privy client will accept the authorization context, sign the request given the parameters,
 * and include all signatures in the privy-authorization-signature header to the API.
 */
export interface AuthorizationContext {
  /**
   * The private keys to use for authorization.
   * These should be base64-encoded PKCS8-formatted private keys, with no PEM headers.
   */
  authorization_private_keys?: string[];
  /**
   * The JWTs for the users that should sign the request authorization.
   * These should be valid JWTs for the user.
   */
  user_jwts?: string[];
  /**
   * The signatures that should be used for authorization.
   * These should be base64-encoded signatures.
   */
  signatures?: string[];
  /**
   * Sign functions can be used to sign requests directly, by managing the private keys and signing
   * logic externally.
   *
   * Sign functions should perform an ECDSA P-256 signature on the payload received, and return the
   * base64-encoded signature.
   */
  sign_fns?: AuthorizationContext.SignFn[];
}

export namespace AuthorizationContext {
  export type SignFn = (payload: Uint8Array) => Promise<string>;
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
  const body: unknown = input.body;
  if (typeof body === 'object' && body !== null && Object.keys(body).length === 0) {
    // This is a special case, where if the body is empty, we want to serialize it
    // as an empty string.
    input.body = '';
  }
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
export async function generateAuthorizationSignatures(
  client: PrivyClient,
  {
    authorizationContext,
    input,
  }: {
    authorizationContext: AuthorizationContext;
    input: WalletApiRequestSignatureInput;
  },
): Promise<string[]> {
  const payload = formatRequestForAuthorizationSignature(input);

  const userJwts = authorizationContext.user_jwts ?? [];
  let userKeys: string[] = [];
  if (userJwts.length > 0) {
    userKeys = await Promise.all(
      userJwts.map((jwt) => client._jwtExchange().exchangeJwtForAuthorizationKey(jwt)),
    );
  }

  /** These are the private keys provided by the caller, either directly or via JWT exchange */
  const privateKeys = [...(authorizationContext.authorization_private_keys ?? []), ...userKeys];

  /** These are the signatures calculated from the private keys */
  const calculatedSignatures = privateKeys.map((sk) =>
    generateAuthorizationSignature({ authorizationPrivateKey: sk, input: payload }),
  );

  /** These are the signatures calculated externally from the given sign functions */
  const signFnSignatures = await Promise.all(
    (authorizationContext.sign_fns ?? []).map((signFn) => signFn(payload)),
  );

  /** These are the signatures provided directly by the caller */
  const providedRawSignatures = authorizationContext.signatures ?? [];

  return [...providedRawSignatures, ...calculatedSignatures, ...signFnSignatures];
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
