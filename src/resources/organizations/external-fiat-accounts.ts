// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FiatAPI from '../fiat';
import * as SharedAPI from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to fiat onramping and offramping
 */
export class ExternalFiatAccounts extends APIResource {
  /**
   * Creates an external fiat account linked to an organization for use in offramp
   * transfers.
   *
   * @example
   * ```ts
   * const organizationExternalFiatAccountResponse =
   *   await client.organizations.externalFiatAccounts.create(
   *     'organization_id',
   *     {
   *       account: {
   *         account_number: 'x',
   *         routing_number: 'xxxxxxxxx',
   *         type: 'us',
   *       },
   *       account_owner_name: 'xxx',
   *       currency: 'currency',
   *       provider: 'bridge',
   *     },
   *   );
   * ```
   */
  create(
    organizationID: string,
    body: ExternalFiatAccountCreateParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.OrganizationExternalFiatAccountResponse> {
    return this._client.post(path`/v1/organizations/${organizationID}/external_fiat_accounts`, {
      body,
      ...options,
    });
  }

  /**
   * Returns a list of external fiat accounts linked to an organization.
   *
   * @example
   * ```ts
   * const listOrganizationExternalFiatAccountsResponse =
   *   await client.organizations.externalFiatAccounts.list(
   *     'organization_id',
   *     { provider: 'bridge' },
   *   );
   * ```
   */
  list(
    organizationID: string,
    query: ExternalFiatAccountListParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.ListOrganizationExternalFiatAccountsResponse> {
    return this._client.get(path`/v1/organizations/${organizationID}/external_fiat_accounts`, {
      query,
      ...options,
    });
  }

  /**
   * Deletes an external fiat account linked to an organization.
   *
   * @example
   * ```ts
   * const successResponse =
   *   await client.organizations.externalFiatAccounts.delete(
   *     'account_id',
   *     { organization_id: 'organization_id' },
   *   );
   * ```
   */
  delete(
    accountID: string,
    params: ExternalFiatAccountDeleteParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const { organization_id } = params;
    return this._client.delete(
      path`/v1/organizations/${organization_id}/external_fiat_accounts/${accountID}`,
      options,
    );
  }

  /**
   * Returns a single external fiat account linked to an organization.
   *
   * @example
   * ```ts
   * const organizationExternalFiatAccountResponse =
   *   await client.organizations.externalFiatAccounts.get(
   *     'account_id',
   *     { organization_id: 'organization_id' },
   *   );
   * ```
   */
  get(
    accountID: string,
    params: ExternalFiatAccountGetParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.OrganizationExternalFiatAccountResponse> {
    const { organization_id } = params;
    return this._client.get(
      path`/v1/organizations/${organization_id}/external_fiat_accounts/${accountID}`,
      options,
    );
  }
}

export interface ExternalFiatAccountCreateParams {
  /**
   * Bank account details. The `type` field discriminates which shape applies.
   */
  account: FiatAPI.ExternalFiatAccountData;

  account_owner_name: string;

  currency: string;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * Physical address associated with an external fiat account.
   */
  address?: FiatAPI.ExternalFiatAccountAddress;

  bank_name?: string;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

export interface ExternalFiatAccountListParams {
  /**
   * Supported fiat orchestration providers.
   */
  provider: SharedAPI.OrchestrationProvider;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

export interface ExternalFiatAccountDeleteParams {
  /**
   * The ID of the organization.
   */
  organization_id: string;
}

export interface ExternalFiatAccountGetParams {
  /**
   * The ID of the organization.
   */
  organization_id: string;
}

export declare namespace ExternalFiatAccounts {
  export {
    type ExternalFiatAccountCreateParams as ExternalFiatAccountCreateParams,
    type ExternalFiatAccountListParams as ExternalFiatAccountListParams,
    type ExternalFiatAccountDeleteParams as ExternalFiatAccountDeleteParams,
    type ExternalFiatAccountGetParams as ExternalFiatAccountGetParams,
  };
}
