// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to wallets
 */
export class Balance extends APIResource {
  /**
   * Get the balance of a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const balance = await client.wallets.balance.get(
   *   'wallet_id',
   * );
   * ```
   */
  get(
    walletID: string,
    query: BalanceGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BalanceGetResponse> {
    if (walletID === '') {
      throw new Error('walletID must not be an empty string');
    }
    return this._client.get(path`/v1/wallets/${walletID}/balance`, { query, ...options });
  }
}

export interface BalanceGetResponse {
  balances: Array<BalanceGetResponse.Balance>;
}

export namespace BalanceGetResponse {
  export interface Balance {
    asset: 'usdc' | 'usdc.e' | 'eth' | 'avax' | 'pol' | 'usdt' | 'eurc' | 'usdb' | 'sol' | (string & {});

    chain:
      | 'ethereum'
      | 'arbitrum'
      | 'avalanche'
      | 'base'
      | 'tempo'
      | 'linea'
      | 'optimism'
      | 'polygon'
      | 'solana'
      | 'zksync_era'
      | 'sepolia'
      | 'arbitrum_sepolia'
      | 'avalanche_fuji'
      | 'base_sepolia'
      | 'linea_testnet'
      | 'optimism_sepolia'
      | 'polygon_amoy'
      | 'solana_devnet'
      | 'solana_testnet';

    display_values: { [key: string]: string };

    raw_value: string;

    raw_value_decimals: number;
  }
}

export interface BalanceGetParams {
  /**
   * The token contract address(es) to query in format "chain:address" (e.g.,
   * "base:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" or
   * "solana:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"). Cannot be used together
   * with `asset`/`chain` or with `include_currency`.
   */
  token?: string | Array<string>;

  /**
   * Named asset(s) to query (e.g. `eth`, `usdc`). Use together with `chain` to scope
   * the query. Cannot be used with `token`.
   */
  asset?:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'avax'
    | 'pol'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'sol'
    | Array<WalletsAPI.WalletAsset>;

  /**
   * Chain(s) to query named assets on (e.g. `base`, `ethereum`). Use together with
   * `asset`. Cannot be used with `token`.
   */
  chain?:
    | 'ethereum'
    | 'arbitrum'
    | 'avalanche'
    | 'base'
    | 'tempo'
    | 'linea'
    | 'optimism'
    | 'polygon'
    | 'solana'
    | 'zksync_era'
    | 'sepolia'
    | 'arbitrum_sepolia'
    | 'avalanche_fuji'
    | 'base_sepolia'
    | 'linea_testnet'
    | 'optimism_sepolia'
    | 'polygon_amoy'
    | 'solana_devnet'
    | 'solana_testnet'
    | Array<
        | 'ethereum'
        | 'arbitrum'
        | 'avalanche'
        | 'base'
        | 'tempo'
        | 'linea'
        | 'optimism'
        | 'polygon'
        | 'solana'
        | 'zksync_era'
        | 'sepolia'
        | 'arbitrum_sepolia'
        | 'avalanche_fuji'
        | 'base_sepolia'
        | 'linea_testnet'
        | 'optimism_sepolia'
        | 'polygon_amoy'
        | 'solana_devnet'
        | 'solana_testnet'
      >;

  /**
   * Include archived wallets in lookup. Defaults to false.
   */
  include_archived?: boolean;

  /**
   * If set, balances are converted to the specified fiat currency. Not supported
   * when `token` is provided.
   */
  include_currency?: 'usd' | 'eur';
}

export declare namespace Balance {
  export { type BalanceGetResponse as BalanceGetResponse, type BalanceGetParams as BalanceGetParams };
}
