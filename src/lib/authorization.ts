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
   * The users that should sign the request authorization, each with an optional MFA token from a
   * completed MFA verification. Each JWT is exchanged for the user's signing key like
   * `user_jwts`, and its MFA token is sent with that exchange.
   */
  user_auth?: AuthorizationContext.UserAuth[];
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

  export interface UserAuth {
    /** A valid JWT for the user. */
    user_jwt: string;
    /**
     * An MFA token from the user's completed MFA verification, sent as the `privy-mfa-token` header
     * on the JWT exchange. The exchange requires it when the user has MFA enrolled. `null` is the
     * same as omitting it.
     */
    mfa_token?: string | null;
  }
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
  /** Unix timestamp (in milliseconds) of the signature. Set only when authorizing an intent. */
  timestamp?: number;
  /** ID of the intent being authorized. Set only when authorizing an intent. */
  intent_id?: string;
  /** Privy-specific headers. */
  headers: {
    'privy-app-id': string;
    'privy-idempotency-key'?: string;
    'privy-request-expiry'?: string;
  };
};

/**
 * Formats the request payload into the expected authorization payload, canconicalizes it,
 * and encodes the JSON string into bytes. An empty body is serialized as an empty string,
 * except in an intent authorization payload, which signs the body exactly as the intent's
 * `request_details` has it.
 *
 * @param request The request to be formatted.
 * @return The raw bytes representing the authorization payload.
 */
export function formatRequestForAuthorizationSignature(input: WalletApiRequestSignatureInput): Uint8Array {
  const body: unknown = input.body;
  if (
    input.intent_id === undefined &&
    typeof body === 'object' &&
    body !== null &&
    Object.keys(body).length === 0
  ) {
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

/** Maps each user JWT to its MFA token. A JWT given with and without an MFA token keeps the MFA token. */
function mfaTokenByUserJwt(
  authorizationContext: AuthorizationContext,
): Map<string, string | null | undefined> {
  const mfaTokenByJwt = new Map<string, string | null | undefined>(
    (authorizationContext.user_jwts ?? []).map((jwt) => [jwt, undefined]),
  );
  for (const { user_jwt, mfa_token } of authorizationContext.user_auth ?? []) {
    mfaTokenByJwt.set(user_jwt, mfa_token || mfaTokenByJwt.get(user_jwt));
  }
  return mfaTokenByJwt;
}

/**
 * Counts the signatures {@link generateAuthorizationSignatures} produces for the given
 * authorization context, without exchanging JWTs or calling sign functions.
 *
 * @param authorizationContext The authorization context containing JWTs, private keys, and signatures.
 * @returns The number of authorization signatures.
 */
export function countAuthorizationSignatures(authorizationContext: AuthorizationContext): number {
  return (
    (authorizationContext.signatures?.length ?? 0) +
    (authorizationContext.authorization_private_keys?.length ?? 0) +
    mfaTokenByUserJwt(authorizationContext).size +
    (authorizationContext.sign_fns?.length ?? 0)
  );
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

  const userKeys = await Promise.all(
    [...mfaTokenByUserJwt(authorizationContext)].map(([jwt, mfaToken]) =>
      client._jwtExchange().exchangeJwtForAuthorizationKey(jwt, mfaToken),
    ),
  );

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
 * The result of authorizing a request. Contains the headers that should be
 * spread into the underlying API call.
 */
export interface PreparedRequest {
  headers: Record<string, string>;
}

/**
 * Generates authorization signatures for an authorized API request.
 * Returns an {@link PreparedRequest} containing all headers that should be forwarded to the
 * underlying generated API method.
 *
 * If `requestExpiry` is provided (including `0`), it is included in both the authorization
 * signature and the returned headers. If omitted, no expiry header is included — callers that
 * require expiry should compute a default before calling this function.
 *
 * @param client The Privy client instance, used for JWT exchange.
 * @param appId The Privy app ID for the request.
 * @param options The request details including authorization context, HTTP method, URL, body,
 *   and optional idempotency key and request expiry.
 * @returns An {@link PreparedRequest} with the computed headers.
 */
export async function prepareRequest(
  client: PrivyClient,
  appId: string,
  {
    authorizationContext = {},
    idempotencyKey,
    requestExpiry,
    method,
    url,
    body,
  }: {
    authorizationContext?: AuthorizationContext | undefined;
    idempotencyKey?: string | undefined;
    requestExpiry?: number | undefined;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    body: any;
  },
): Promise<PreparedRequest> {
  const privyRequestExpirtyHeader = String(requestExpiry);

  const signatures = await generateAuthorizationSignatures(client, {
    authorizationContext,
    input: {
      version: 1,
      method,
      url,
      body,
      headers: {
        'privy-app-id': appId,
        ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
        ...(requestExpiry != null && { 'privy-request-expiry': privyRequestExpirtyHeader }),
      },
    },
  });

  return {
    headers: {
      'privy-authorization-signature': signatures.join(','),
      ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
      ...(requestExpiry != null && { 'privy-request-expiry': privyRequestExpirtyHeader }),
    },
  };
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
