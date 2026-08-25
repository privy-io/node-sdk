// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FiatAPI from '../fiat';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to fiat onramping and offramping
 */
export class KYB extends APIResource {
  /**
   * Returns KYB status for all providers the organization has initiated KYB with.
   *
   * @example
   * ```ts
   * const kybStatusListResponse =
   *   await client.organizations.kyb.list('organization_id');
   * ```
   */
  list(organizationID: string, options?: RequestOptions): APIPromise<FiatAPI.KYBStatusListResponse> {
    return this._client.get(path`/v1/organizations/${organizationID}/kyb`, options);
  }

  /**
   * Generates a hosted KYB link for the organization and returns the current KYB
   * status snapshot.
   *
   * @example
   * ```ts
   * const kybStatusResponse =
   *   await client.organizations.kyb.initiateLinks(
   *     'organization_id',
   *     { email: 'dev@stainless.com', provider: 'bridge' },
   *   );
   * ```
   */
  initiateLinks(
    organizationID: string,
    body: KYBInitiateLinksParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.KYBStatusResponse> {
    return this._client.post(path`/v1/organizations/${organizationID}/kyb/links`, { body, ...options });
  }

  /**
   * Generates a Bridge terms-of-service acceptance link for the organization.
   *
   * @example
   * ```ts
   * const kyxTosResponse =
   *   await client.organizations.kyb.initiateTos(
   *     'organization_id',
   *     { email: 'dev@stainless.com', provider: 'bridge' },
   *   );
   * ```
   */
  initiateTos(
    organizationID: string,
    body: KYBInitiateTosParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.KyxTosResponse> {
    return this._client.post(path`/v1/organizations/${organizationID}/kyb/tos`, { body, ...options });
  }
}

export interface KYBInitiateLinksParams {
  /**
   * Email address for the organization.
   */
  email: string;

  /**
   * KYC/KYB provider identifier.
   */
  provider: FiatAPI.KyxProvider;

  /**
   * Legal name of the business.
   */
  business_name?: string;

  /**
   * Client-side agreement ID for ToS acceptance.
   */
  client_agreement_id?: string;

  /**
   * Endorsements to request during KYB.
   */
  endorsements?: Array<FiatAPI.KyxEndorsementName>;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: FiatAPI.KyxEnvironment;

  /**
   * URI to redirect after completing KYB.
   */
  redirect_uri?: string;
}

export interface KYBInitiateTosParams {
  /**
   * Email address for the organization.
   */
  email: string;

  /**
   * KYC/KYB provider identifier.
   */
  provider: FiatAPI.KyxProvider;

  /**
   * Legal name of the business.
   */
  business_name?: string;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: FiatAPI.KyxEnvironment;
}

export declare namespace KYB {
  export {
    type KYBInitiateLinksParams as KYBInitiateLinksParams,
    type KYBInitiateTosParams as KYBInitiateTosParams,
  };
}
