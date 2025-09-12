import {
  createRemoteJWKSet,
  CryptoKey,
  importSPKI,
  errors as joseErrors,
  jwtVerify,
  JWTVerifyGetKey,
  JWTVerifyResult,
} from 'jose';
import { PrivyAPIError } from '../core/error';
import { parseUserFromIdentityTokenPayload } from './identity-token';
import { User } from '../resources';

const JWT_ALGORITHM = 'ES256';
const JWT_ISSUER = 'privy.io';

export type VerifyAuthTokenInput = {
  /** The authentication token to verify. */
  auth_token: string;
  /** The Privy app ID to verify the token against. */
  app_id: string;
  /**
   * The verification key to use to verify the token, or a mechanism to get the it such as via JWKS.
   * You can find this verification key (or a JWKS endpoint) in the Privy dashboard.
   * @see {@link createRemoteJWKSet}
   * @see {@link importSPKI}
   */
  verification_key: CryptoKey | JWTVerifyGetKey | string;
};

export type VerifyAuthTokenResponse = {
  /** The Privy app ID for which the token was issued. */
  app_id: string;
  /** The issuer of the token. */
  issuer: string;
  /** The issued at unix timestamp of the token. */
  issued_at: number;
  /** The expiration unix timestamp of the token. */
  expiration: number;
  /** The ID of the session for which the token was issued. */
  session_id: string;
  /** The ID of the user for which the token was issued. */
  user_id: string;
};

/**
 * Verifies a JWT issued by privy.io for the given app ID.
 * This serves both auth tokens and identity tokens.
 * @returns The verify result along with the token's payload.
 * @throws If the token is invalid.
 */
async function verifyPrivyIssuedJwt(
  jwt: string,
  appId: string,
  verificationKey: CryptoKey | JWTVerifyGetKey,
): Promise<JWTVerifyResult> {
  // Because of a type difference, the calls cannot be merged into one.
  let verifiedToken: JWTVerifyResult;
  if (typeof verificationKey !== 'function') {
    verifiedToken = await jwtVerify(jwt, verificationKey, {
      typ: 'JWT',
      algorithms: [JWT_ALGORITHM],
      issuer: JWT_ISSUER,
      audience: appId,
    }).catch(mapAndThrowJoseErrors);
  } else {
    verifiedToken = await jwtVerify(jwt, verificationKey, {
      typ: 'JWT',
      algorithms: [JWT_ALGORITHM],
      issuer: JWT_ISSUER,
      audience: appId,
    }).catch(mapAndThrowJoseErrors);
  }

  return verifiedToken;
}

/**
 * Verifies a Privy-issued authentication token.
 *
 * @returns The payload of the token if it is valid.
 * @throws If the token is invalid.
 */
export async function verifyAuthToken({
  auth_token: authToken,
  app_id: appId,
  verification_key: verificationKeyOrString,
}: VerifyAuthTokenInput): Promise<VerifyAuthTokenResponse> {
  const verificationKey =
    typeof verificationKeyOrString === 'string' ?
      await importSPKI(verificationKeyOrString, JWT_ALGORITHM)
    : verificationKeyOrString;
  const verifiedToken = await verifyPrivyIssuedJwt(authToken, appId, verificationKey);
  return {
    app_id: throwIfNotString(verifiedToken.payload.aud),
    issuer: throwIfNotString(verifiedToken.payload.iss),
    issued_at: throwIfNotNumber(verifiedToken.payload.iat),
    expiration: throwIfNotNumber(verifiedToken.payload.exp),
    session_id: throwIfNotString(verifiedToken.payload['sid']),
    user_id: throwIfNotString(verifiedToken.payload.sub),
  };
}

export type VerifyIdentityTokenInput = {
  /** The identity token to verify. */
  identity_token: string;
  /** The Privy app ID to verify the token against. */
  app_id: string;
  /**
   * The verification key to use to verify the token, or a mechanism to get the it such as via JWKS.
   * You can find this verification key (or a JWKS endpoint) in the Privy dashboard.
   * @see {@link createRemoteJWKSet}
   * @see {@link importSPKI}
   */
  verification_key: CryptoKey | JWTVerifyGetKey | string;
};

/**
 * Verifies an identity token, parsing it into a `User` object if it is valid.
 *
 * @returns The user object parsed from the identity token.
 * @throws If the token or its payload is invalid.
 */
export async function verifyIdentityToken({
  identity_token: identityToken,
  app_id: appId,
  verification_key: verificationKeyOrString,
}: VerifyIdentityTokenInput): Promise<User> {
  const verificationKey =
    typeof verificationKeyOrString === 'string' ?
      await importSPKI(verificationKeyOrString, JWT_ALGORITHM)
    : verificationKeyOrString;
  const verifiedToken = await verifyPrivyIssuedJwt(identityToken, appId, verificationKey);

  if (!verifiedToken.payload) {
    throw new InvalidAuthTokenError('Unable to parse identity token');
  }

  return parseUserFromIdentityTokenPayload(verifiedToken.payload);
}

export class InvalidAuthTokenError extends PrivyAPIError {}

/** Used for asserting the values in the token payload are strings. */
function throwIfNotString(value: unknown): string {
  if (!value || typeof value !== 'string') {
    throw new InvalidAuthTokenError("Token's payload is invalid");
  }
  return value;
}

/** Used for asserting the values in the token payload are numbers. */
function throwIfNotNumber(value: unknown): number {
  if (!value || typeof value !== 'number') {
    throw new InvalidAuthTokenError("Token's payload is invalid");
  }
  return value;
}

/**
 * Used to catch errors thrown by async `jose` functions and map to our own error types.
 * This method will **always** throw an error, so it's return type is `never`.
 */
function mapAndThrowJoseErrors(error: unknown): never {
  if (error instanceof joseErrors.JWTExpired) {
    throw new InvalidAuthTokenError('Authentication token expired');
  } else if (error instanceof joseErrors.JWTClaimValidationFailed || error instanceof joseErrors.JWTInvalid) {
    throw new InvalidAuthTokenError('Authentication token is invalid');
  } else {
    throw new InvalidAuthTokenError('Failed to verify authentication token');
  }
}

export interface CreatePrivyAppJWKSInput {
  appId: string;
  apiUrl: string;
  headers: Record<string, string>;
  verificationKeyOverride?: string | undefined;
}

export type PrivyAppJWKS = JWTVerifyGetKey;

export function createPrivyAppJWKS({
  appId,
  apiUrl,
  headers,
  verificationKeyOverride,
}: CreatePrivyAppJWKSInput): PrivyAppJWKS {
  if (verificationKeyOverride !== undefined) {
    // Use a closure to cache the verification key once imported
    let verificationKey: CryptoKey;
    return async () => {
      if (verificationKey === undefined) {
        try {
          verificationKey = await importSPKI(verificationKeyOverride, JWT_ALGORITHM);
        } catch (error) {
          throw new InvalidAuthTokenError('Failed to import the provided verification key override');
        }
      }
      return verificationKey;
    };
  }

  const url = new URL(`${apiUrl}/v1/apps/${appId}/jwks.json`);
  return createRemoteJWKSet(url, {
    cacheMaxAge: 60 * 60 * 1000, // 60 minutes
    cooldownDuration: 10 * 60 * 1000, // 10 minutes
    headers,
  });
}
