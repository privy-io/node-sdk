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
export class Verification extends APIResource {
  /**
   * Sends an email MFA verification code to the enrolled email address.
   *
   * @example
   * ```ts
   * const successResponse =
   *   await client.users.mfa.email.verification.init(
   *     'user_id',
   *     { user_jwt: 'x' },
   *   );
   * ```
   */
  init(
    userID: string,
    params: VerificationInitParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const { user_jwt } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/email/verification/init`, {
      ...options,
      headers: buildHeaders([{ 'privy-user-token': user_jwt }, options?.headers]),
    });
  }

  /**
   * Verifies the code sent to the enrolled email address.
   *
   * @example
   * ```ts
   * const mfaVerificationResponse =
   *   await client.users.mfa.email.verification.verify(
   *     'user_id',
   *     { code: 'xxxxxx', user_jwt: 'x' },
   *   );
   * ```
   */
  verify(
    userID: string,
    params: VerificationVerifyParams,
    options?: RequestOptions,
  ): APIPromise<MfaAPI.MfaVerificationResponse> {
    const { user_jwt, ...body } = params;
    return this._client.post(path`/v1/users/${userID}/mfa/email/verification/verify`, {
      body,
      ...options,
      headers: buildHeaders([{ 'privy-user-token': user_jwt }, options?.headers]),
    });
  }
}

export interface VerificationInitParams {
  /**
   * Access token or custom authentication JWT for the user the request acts on.
   */
  user_jwt: string;
}

export interface VerificationVerifyParams {
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

export declare namespace Verification {
  export {
    type VerificationInitParams as VerificationInitParams,
    type VerificationVerifyParams as VerificationVerifyParams,
  };
}
