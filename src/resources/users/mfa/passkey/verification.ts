// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as MfaAPI from '../mfa';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * Operations related to user MFA
 */
export class Verification extends APIResource {
  /**
   * Returns WebAuthn authentication options for the enrolled MFA passkeys.
   *
   * @example
   * ```ts
   * const passkeyMfaVerificationInitResponse =
   *   await client.users.mfa.passkey.verification.init(
   *     'user_id',
   *     {
   *       relying_party: 'https://example.com',
   *       'privy-user-token': 'x',
   *     },
   *   );
   * ```
   */
  init(
    userID: string,
    params: VerificationInitParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.PasskeyMfaVerificationInitResponse> {
    const { 'privy-user-token': privyUserToken, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/passkey/verification/init`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': privyUserToken }, options?.headers]),
    });
  }

  /**
   * Verifies the WebAuthn authentication response from an MFA passkey.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.passkey.verification.verify(
   *     'user_id',
   *     {
   *       credential: {
   *         id: 'id',
   *         client_extension_results: {},
   *         raw_id: 'raw_id',
   *         response: {
   *           authenticator_data: 'authenticator_data',
   *           client_data_json: 'client_data_json',
   *           signature: 'signature',
   *         },
   *         type: 'public-key',
   *       },
   *       'privy-user-token': 'x',
   *     },
   *   );
   * ```
   */
  verify(
    userID: string,
    params: VerificationVerifyParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.MfaVerificationResponse> {
    const { 'privy-user-token': privyUserToken, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/passkey/verification/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': privyUserToken }, options?.headers]),
    });
  }
}

export interface VerificationInitParams {
  /**
   * Body param: Origin where the authenticator runs, such as
   * https://app.example.com.
   */
  relying_party: string;

  /**
   * Header param: Access token or custom authentication JWT for the user the request
   * acts on.
   */
  'privy-user-token': string;
}

export interface VerificationVerifyParams {
  /**
   * Body param: WebAuthn authentication response as defined by the Web
   * Authentication specification.
   */
  credential: MfaAPI.MfaPasskeyAuthenticatorVerifyResponse;

  /**
   * Header param: Access token or custom authentication JWT for the user the request
   * acts on.
   */
  'privy-user-token': string;
}

export declare namespace Verification {
  export {
    type VerificationInitParams as VerificationInitParams,
    type VerificationVerifyParams as VerificationVerifyParams,
  };
}
