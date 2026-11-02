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
   * Sends an SMS MFA enrollment code to a phone number.
   *
   * @example
   * ```ts
   * const successResponse =
   *   await client.users.mfa.sms.enrollment.init('user_id', {
   *     phone_number: 'phone_number',
   *     user_jwt: 'x',
   *   });
   * ```
   */
  init(
    userID: string,
    params: EnrollmentInitParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const { user_jwt, mfa_token, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/sms/enrollment/init`, {
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
   * Enrolls the phone number from init using the code sent to it.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.sms.enrollment.verify('user_id', {
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
    return this._client.post(path`/v1/users/${userID}/mfa/sms/enrollment/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': user_jwt }, options?.headers]),
    });
  }
}

export interface EnrollmentInitParams {
  /**
   * Body param
   */
  phone_number: string;

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
