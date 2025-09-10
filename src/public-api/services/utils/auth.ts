import { createRemoteJWKSet, importSPKI, errors as joseErrors, jwtVerify, JWTVerifyResult } from 'jose';
import { PrivyAPI } from '../../../client';
import { PrivyAPIError } from '../../../core/error';

const DEFAULT_JWKS_CACHE_MAX_AGE = 10 * 60 * 1000; // 10 minutes

const JWT_ALGORITHM = 'ES256';
const JWT_ISSUER = 'privy.io';

export class PrivyAuthUtils {
  private remoteJwks: ReturnType<typeof createRemoteJWKSet>;
  private privyAppID: string;

  constructor(privyApiClient: PrivyAPI) {
    this.remoteJwks = createRemoteJWKSet(
      new URL(`${privyApiClient.baseURL}/v1/apps/${privyApiClient.appID}/jwks.json`),
      { cacheMaxAge: DEFAULT_JWKS_CACHE_MAX_AGE },
    );
    this.privyAppID = privyApiClient.appID;
  }

  /**
   * Verifies the authentication token, and returns the payload if it is valid.
   *
   * @param authToken - The authentication token to verify.
   * @param verificationKeyOverride - The verification key to use instead of calling the JWKS endpoint.
   * @returns The payload of the token if it is valid.
   * @throws If the token is invalid.
   */
  public async verifyAuthToken(
    authToken: string,
    verificationKeyOverride?: string,
  ): Promise<PrivyUsersService.VerifyAuthTokenResponse> {
    // Because of a type difference, the calls cannot be merged into one.
    let verifiedToken: JWTVerifyResult;
    if (verificationKeyOverride !== undefined) {
      const verificationKey = await importSPKI(verificationKeyOverride, JWT_ALGORITHM);
      verifiedToken = await jwtVerify(authToken, verificationKey, {
        typ: 'JWT',
        algorithms: [JWT_ALGORITHM],
        issuer: JWT_ISSUER,
        audience: this.privyAppID,
      }).catch(mapAndThrowJoseErrors);
    } else {
      verifiedToken = await jwtVerify(authToken, this.remoteJwks, {
        typ: 'JWT',
        algorithms: [JWT_ALGORITHM],
        issuer: JWT_ISSUER,
        audience: this.privyAppID,
      }).catch(mapAndThrowJoseErrors);
    }

    return {
      appId: throwIfNotString(verifiedToken.payload.aud),
      issuer: throwIfNotString(verifiedToken.payload.iss),
      issuedAt: throwIfNotNumber(verifiedToken.payload.iat),
      expiration: throwIfNotNumber(verifiedToken.payload.exp),
      sessionId: throwIfNotString(verifiedToken.payload['sid']),
      userId: throwIfNotString(verifiedToken.payload.sub),
    };
  }
}

export namespace PrivyUsersService {
  export type VerifyAuthTokenResponse = {
    appId: string;
    issuer: string;
    issuedAt: number;
    expiration: number;
    sessionId: string;
    userId: string;
  };
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
