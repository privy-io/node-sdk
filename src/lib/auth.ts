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
import { mapIdentityTokenPayloadToUser } from './identity-token';
import { User } from '../resources';

const JWT_ALGORITHM = 'ES256';
const JWT_ISSUER = 'privy.io';

export type VerifyAuthTokenInput = {
  /** The authentication token to verify. */
  authToken: string;
  /** The Privy app ID to verify the token against. */
  appId: string;
  /**
   * The verification key to use to verify the token, or a mechanism to get the it such as via JWKS.
   * You can find this verification key (or a JWKS endpoint) in the Privy dashboard.
   * @see {@link createRemoteJWKSet}
   * @see {@link importSPKI}
   */
  verificationKey: CryptoKey | JWTVerifyGetKey;
};

export type VerifyAuthTokenResponse = {
  /** The Privy app ID for which the token was issued. */
  appId: string;
  /** The issuer of the token. */
  issuer: string;
  /** The issued at unix timestamp of the token. */
  issuedAt: number;
  /** The expiration unix timestamp of the token. */
  expiration: number;
  /** The ID of the session for which the token was issued. */
  sessionId: string;
  /** The ID of the user for which the token was issued. */
  userId: string;
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
  authToken,
  appId,
  verificationKey,
}: VerifyAuthTokenInput): Promise<VerifyAuthTokenResponse> {
  const verifiedToken = await verifyPrivyIssuedJwt(authToken, appId, verificationKey);
  return {
    appId: throwIfNotString(verifiedToken.payload.aud),
    issuer: throwIfNotString(verifiedToken.payload.iss),
    issuedAt: throwIfNotNumber(verifiedToken.payload.iat),
    expiration: throwIfNotNumber(verifiedToken.payload.exp),
    sessionId: throwIfNotString(verifiedToken.payload['sid']),
    userId: throwIfNotString(verifiedToken.payload.sub),
  };
}

export type VerifyIdentityTokenInput = {
  /** The identity token to verify. */
  identityToken: string;
  /** The Privy app ID to verify the token against. */
  appId: string;
  /**
   * The verification key to use to verify the token, or a mechanism to get the it such as via JWKS.
   * You can find this verification key (or a JWKS endpoint) in the Privy dashboard.
   * @see {@link createRemoteJWKSet}
   * @see {@link importSPKI}
   */
  verificationKey: CryptoKey | JWTVerifyGetKey;
};

export async function verifyIdentityToken({
  identityToken,
  appId,
  verificationKey,
}: VerifyIdentityTokenInput): Promise<User> {
  const verifiedToken = await verifyPrivyIssuedJwt(identityToken, appId, verificationKey);

  if (!verifiedToken.payload) {
    throw new InvalidAuthTokenError('Unable to parse identity token');
  }

  return mapIdentityTokenPayloadToUser(verifiedToken.payload);
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
