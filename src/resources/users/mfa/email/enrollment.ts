// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as SharedAPI from '../../../shared';
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
   * Sends an email MFA enrollment code to an email address.
   *
   * @example
   * ```ts
   * const successResponse =
   *   await client.users.mfa.email.enrollment.init('user_id', {
   *     email_address: 'dev@stainless.com',
   *     'privy-user-token': 'x',
   *   });
   * ```
   */
  init(
    userID: string,
    params: EnrollmentInitParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const { 'privy-user-token': privyUserToken, 'privy-mfa-token': privyMfaToken, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/email/enrollment/init`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          'privy-user-token': privyUserToken,
          ...(privyMfaToken != null ? { 'privy-mfa-token': privyMfaToken } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Enrolls the email address from init using the code sent to it.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.email.enrollment.verify(
   *     'user_id',
   *     { code: 'xxxxxx', 'privy-user-token': 'x' },
   *   );
   * ```
   */
  verify(
    userID: string,
    params: EnrollmentVerifyParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.MfaVerificationResponse> {
    const { 'privy-user-token': privyUserToken, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/email/enrollment/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': privyUserToken }, options?.headers]),
    });
  }
}

export interface EnrollmentInitParams {
  /**
   * Body param
   */
  email_address: string;

  /**
   * Header param: Access token or custom authentication JWT for the user the request
   * acts on.
   */
  'privy-user-token': string;

  /**
   * Header param: MFA token from a completed MFA verification, required on
   * MFA-protected requests for users with MFA enrolled.
   */
  'privy-mfa-token'?: string;
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
  'privy-user-token': string;
}

export declare namespace Enrollment {
  export {
    type EnrollmentInitParams as EnrollmentInitParams,
    type EnrollmentVerifyParams as EnrollmentVerifyParams,
  };
}
