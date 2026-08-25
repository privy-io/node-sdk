// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FiatAPI from '../../fiat';
import * as SharedAPI from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to fiat onramping and offramping
 */
export class Fiat extends APIResource {
  /**
   * Creates a Bridge Virtual Account linked to a wallet. Fiat sent to the returned
   * deposit instructions will be converted to the specified crypto asset and
   * delivered to the wallet.
   *
   * @example
   * ```ts
   * const fiatDepositAccountResponse =
   *   await client.wallets.depositAccounts.fiat.create(
   *     'wallet_id',
   *     {
   *       destination: { asset: 'asset', chain: 'chain' },
   *       provider: 'bridge',
   *       source: { currency: 'currency' },
   *     },
   *   );
   * ```
   */
  create(
    walletID: string,
    body: FiatCreateParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.FiatDepositAccountResponse> {
    return this._client.post(path`/v1/wallets/${walletID}/deposit_accounts/fiat`, { body, ...options });
  }

  /**
   * Returns a list of fiat deposit accounts linked to a wallet.
   *
   * @example
   * ```ts
   * const listFiatDepositAccountsResponse =
   *   await client.wallets.depositAccounts.fiat.list(
   *     'wallet_id',
   *     { provider: 'bridge' },
   *   );
   * ```
   */
  list(
    walletID: string,
    query: FiatListParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.ListFiatDepositAccountsResponse> {
    return this._client.get(path`/v1/wallets/${walletID}/deposit_accounts/fiat`, { query, ...options });
  }

  /**
   * Returns a single fiat deposit account linked to a wallet.
   *
   * @example
   * ```ts
   * const fiatDepositAccountResponse =
   *   await client.wallets.depositAccounts.fiat.get(
   *     'deposit_account_id',
   *     { wallet_id: 'wallet_id' },
   *   );
   * ```
   */
  get(
    depositAccountID: string,
    params: FiatGetParams,
    options?: RequestOptions,
  ): APIPromise<FiatAPI.FiatDepositAccountResponse> {
    const { wallet_id } = params;
    return this._client.get(
      path`/v1/wallets/${wallet_id}/deposit_accounts/fiat/${depositAccountID}`,
      options,
    );
  }
}

export interface FiatCreateParams {
  /**
   * The destination crypto asset and chain for a fiat deposit account.
   */
  destination: FiatAPI.FiatDepositAccountDestination;

  /**
   * Discriminator: the fiat deposit account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * The source fiat currency for a fiat deposit account.
   */
  source: FiatAPI.CreateFiatDepositAccountSource;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

export interface FiatListParams {
  /**
   * Supported fiat orchestration providers.
   */
  provider: SharedAPI.OrchestrationProvider;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

export interface FiatGetParams {
  /**
   * The ID of the wallet.
   */
  wallet_id: string;
}

export declare namespace Fiat {
  export {
    type FiatCreateParams as FiatCreateParams,
    type FiatListParams as FiatListParams,
    type FiatGetParams as FiatGetParams,
  };
}
