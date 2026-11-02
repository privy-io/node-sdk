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
   * Creates a TOTP secret for the user to add to an authenticator app.
   *
   * @example
   * ```ts
   * const totpMfaEnrollmentInitResponse =
   *   await client.users.mfa.totp.enrollment.init('user_id', {
   *     user_jwt: 'x',
   *   });
   * ```
   */
  init(
    userID: string,
    params: EnrollmentInitParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.TotpMfaEnrollmentInitResponse> {
    const { user_jwt, mfa_token } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/totp/enrollment/init`, {
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
   * Enrolls the authenticator from init using a code it generated.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.totp.enrollment.verify('user_id', {
   *     code: 'xxxxxx',
   *     user_jwt: 'x',
   *   });
   * ```
   */
  verify(
    userID: string,
    params: EnrollmentVerifyParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.MfaVerificationResponse> {
    const { user_jwt, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/totp/enrollment/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': user_jwt }, options?.headers]),
    });
  }
}

export interface EnrollmentInitParams {
  /**
   * Access token or custom authentication JWT for the user the request acts on.
   */
  user_jwt: string;

  /**
   * MFA token from a completed MFA verification, required on MFA-protected requests
   * for users with MFA enrolled.
   */
  mfa_token?: string;
}

export interface EnrollmentVerifyParams {
  /**
   * Body param
   */
  code: string;

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
