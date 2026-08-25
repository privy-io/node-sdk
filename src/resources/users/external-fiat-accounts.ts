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
   * Creates an external fiat account linked to a user for use in offramp transfers.
   *
   * @example
   * ```ts
   * const externalFiatAccountResponse =
   *   await client.users.externalFiatAccounts.create(
   *     'user_id',
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
    userID: string,
    body: ExternalFiatAccountCreateParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.ExternalFiatAccountResponse> {
    return this._client.post(path`/v1/users/${userID}/external_fiat_accounts`, { body, ...options });
  }

  /**
   * Returns a list of external fiat accounts linked to a user.
   *
   * @example
   * ```ts
   * const listExternalFiatAccountsResponse =
   *   await client.users.externalFiatAccounts.list('user_id', {
   *     provider: 'bridge',
   *   });
   * ```
   */
  list(
    userID: string,
    query: ExternalFiatAccountListParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.ListExternalFiatAccountsResponse> {
    return this._client.get(path`/v1/users/${userID}/external_fiat_accounts`, { query, ...options });
  }

  /**
   * Deletes an external fiat account linked to a user.
   *
   * @example
   * ```ts
   * const successResponse =
   *   await client.users.externalFiatAccounts.delete(
   *     'account_id',
   *     { user_id: 'user_id' },
   *   );
   * ```
   */
  delete(
    accountID: string,
    params: ExternalFiatAccountDeleteParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const { user_id } = params;
    return this._client.delete(path`/v1/users/${user_id}/external_fiat_accounts/${accountID}`, options);
  }

  /**
   * Returns a single external fiat account linked to a user.
   *
   * @example
   * ```ts
   * const externalFiatAccountResponse =
   *   await client.users.externalFiatAccounts.get(
   *     'account_id',
   *     { user_id: 'user_id' },
   *   );
   * ```
   */
  get(
    accountID: string,
    params: ExternalFiatAccountGetParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.ExternalFiatAccountResponse> {
    const { user_id } = params;
    return this._client.get(path`/v1/users/${user_id}/external_fiat_accounts/${accountID}`, options);
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
   * The DID of the user.
   */
  user_id: string;
}

export interface ExternalFiatAccountGetParams {
  /**
   * The DID of the user.
   */
  user_id: string;
}

export declare namespace ExternalFiatAccounts {
  export {
    type ExternalFiatAccountCreateParams as ExternalFiatAccountCreateParams,
    type ExternalFiatAccountListParams as ExternalFiatAccountListParams,
    type ExternalFiatAccountDeleteParams as ExternalFiatAccountDeleteParams,
    type ExternalFiatAccountGetParams as ExternalFiatAccountGetParams,
  };
}
