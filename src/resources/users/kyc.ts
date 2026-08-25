// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FiatAPI from '../fiat';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to fiat onramping and offramping
 */
export class KYC extends APIResource {
  /**
   * Returns KYC status for all providers the user has initiated KYC with.
   *
   * @example
   * ```ts
   * const kycStatusListResponse = await client.users.kyc.list(
   *   'user_id',
   * );
   * ```
   */
  list(userID: string, options?: RequestOptions): APIPromise<FiatAPI.KYCStatusListResponse> {
    return this._client.get(path`/v1/users/${userID}/kyc`, options);
  }

  /**
   * Generates a hosted KYC link for the user and returns the current KYC status
   * snapshot.
   *
   * @example
   * ```ts
   * const kycStatusResponse =
   *   await client.users.kyc.initiateLinks('user_id', {
   *     provider: 'bridge',
   *   });
   * ```
   */
  initiateLinks(
    userID: string,
    body: KYCInitiateLinksParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.KYCStatusResponse> {
    return this._client.post(path`/v1/users/${userID}/kyc/links`, { body, ...options });
  }

  /**
   * Generates a Bridge terms-of-service acceptance link for the user.
   *
   * @example
   * ```ts
   * const kyxTosResponse = await client.users.kyc.initiateTos(
   *   'user_id',
   *   { provider: 'bridge' },
   * );
   * ```
   */
  initiateTos(
    userID: string,
    body: KYCInitiateTosParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.KyxTosResponse> {
    return this._client.post(path`/v1/users/${userID}/kyc/tos`, { body, ...options });
  }
}

export interface KYCInitiateLinksParams {
  /**
   * KYC/KYB provider identifier.
   */
  provider: FiatAPI.KyxProvider;

  /**
   * Client-side agreement ID for ToS acceptance.
   */
  client_agreement_id?: string;

  /**
   * Email address for the KYC session.
   */
  email?: string;

  /**
   * Endorsements to request during KYC.
   */
  endorsements?: Array<FiatAPI.KyxEndorsementName>;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: FiatAPI.KyxEnvironment;

  /**
   * URI to redirect the user after completing KYC.
   */
  redirect_uri?: string;
}

export interface KYCInitiateTosParams {
  /**
   * KYC/KYB provider identifier.
   */
  provider: FiatAPI.KyxProvider;

  /**
   * Email for the user. If not provided, falls back to the user's linked email.
   */
  email?: string;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: FiatAPI.KyxEnvironment;
}

export declare namespace KYC {
  export {
    type KYCInitiateLinksParams as KYCInitiateLinksParams,
    type KYCInitiateTosParams as KYCInitiateTosParams,
  };
}
