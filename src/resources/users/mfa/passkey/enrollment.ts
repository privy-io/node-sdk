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
export class Enrollment extends APIResource {
  /**
   * Returns WebAuthn registration options for a new MFA passkey.
   *
   * @example
   * ```ts
   * const passkeyMfaEnrollmentInitResponse =
   *   await client.users.mfa.passkey.enrollment.init(
   *     'user_id',
   *     { relying_party: 'https://example.com', user_jwt: 'x' },
   *   );
   * ```
   */
  init(
    userID: string,
    params: EnrollmentInitParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.PasskeyMfaEnrollmentInitResponse> {
    const { user_jwt, mfa_token, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/passkey/enrollment/init`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          'privy-user-token': user_jwt,
          ...(mfa_token != null ? { 'privy-mfa-token': mfa_token } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Enrolls a passkey in MFA using the WebAuthn registration response.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.passkey.enrollment.verify(
   *     'user_id',
   *     {
   *       credential: {
   *         id: 'id',
   *         client_extension_results: {},
   *         raw_id: 'raw_id',
   *         response: {
   *           attestation_object: 'attestation_object',
   *           client_data_json: 'client_data_json',
   *         },
   *         type: 'public-key',
   *       },
   *       user_jwt: 'x',
   *     },
   *   );
   * ```
   */
  verify(
    userID: string,
    params: EnrollmentVerifyParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.MfaVerificationResponse> {
    const { user_jwt, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/passkey/enrollment/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': user_jwt }, options?.headers]),
    });
  }
}

export interface EnrollmentInitParams {
  /**
   * Body param: Origin where the authenticator runs, such as
   * https://app.example.com.
   */
  relying_party: string;

  /**
   * Header param: Access token or custom authentication JWT for the user the request
   * acts on.
   */
  user_jwt: string;

  /**
   * Header param: MFA token from a completed MFA verification, required on
   * MFA-protected requests for users with MFA enrolled.
   */
  mfa_token?: string;
}

export interface EnrollmentVerifyParams {
  /**
   * Body param: WebAuthn registration response as defined by the Web Authentication
   * specification.
   */
  credential: MfaAPI.MfaPasskeyAuthenticatorEnrollmentResponse;

  /**
   * Header param: Access token or custom authentication JWT for the user the request
   * acts on.
   */
  user_jwt: string;
}

export declare namespace Enrollment {
  export {
    type EnrollmentInitParams as EnrollmentInitParams,
    type EnrollmentVerifyParams as EnrollmentVerifyParams,
  };
}
