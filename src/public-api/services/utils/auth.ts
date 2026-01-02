import { PrivyAPI } from '../../../client';
import {
  PrivyAppJWKS,
  verifyAccessToken,
  VerifyAccessTokenResponse,
  VerifyAuthTokenResponse,
  verifyIdentityToken,
} from '../../../lib/auth';
import { User } from '../../../resources';

export class PrivyAuthUtils {
  private appJwks: PrivyAppJWKS;
  private privyAppID: string;

  constructor(privyApiClient: PrivyAPI, appJwks: PrivyAppJWKS) {
    this.appJwks = appJwks;
    this.privyAppID = privyApiClient.appID;
  }

  /**
   * Verifies the access token, and returns the payload if it is valid.
   *
   * @param accessToken - The access token to verify.
   * @returns The payload of the token if it is valid.
   * @throws If the token is invalid.
   */
  public async verifyAccessToken(accessToken: string): Promise<VerifyAccessTokenResponse> {
    return verifyAccessToken({
      access_token: accessToken,
      app_id: this.privyAppID,
      verification_key: this.appJwks,
    });
  }

  /**
   * Verifies the authentication token, and returns the payload if it is valid.
   *
   * @param authToken - The authentication token to verify.
   * @returns The payload of the token if it is valid.
   * @throws If the token is invalid.
   * @deprecated Use `verifyAccessToken` instead.
   */
  public async verifyAuthToken(authToken: string): Promise<VerifyAuthTokenResponse> {
    return this.verifyAccessToken(authToken);
  }

  public async verifyIdentityToken(identityToken: string): Promise<User> {
    return verifyIdentityToken({
      identity_token: identityToken,
      app_id: this.privyAppID,
      verification_key: this.appJwks,
    });
  }
}
