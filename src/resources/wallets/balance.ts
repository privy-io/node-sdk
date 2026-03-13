// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
    return this._client.get(path`/v1/wallets/${walletID}/balance`, { query, ...options });
  }
}

export interface BalanceGetResponse {
  balances: Array<BalanceGetResponse.Balance>;
}

export namespace BalanceGetResponse {
  export interface Balance {
    asset: 'usdc' | 'usdc.e' | 'eth' | 'pol' | 'usdt' | 'eurc' | 'usdb' | 'sol' | (string & {});

    chain:
      | 'ethereum'
      | 'arbitrum'
      | 'base'
      | 'tempo'
      | 'linea'
      | 'optimism'
      | 'polygon'
      | 'solana'
      | 'zksync_era'
      | 'sepolia'
      | 'arbitrum_sepolia'
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
   * "solana:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").
   */
  token?: string | Array<string>;

  asset?:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'pol'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'sol'
    | Array<'usdc' | 'usdc.e' | 'eth' | 'pol' | 'usdt' | 'eurc' | 'usdb' | 'sol'>;

  chain?:
    | 'ethereum'
    | 'arbitrum'
    | 'base'
    | 'tempo'
    | 'linea'
    | 'optimism'
    | 'polygon'
    | 'solana'
    | 'zksync_era'
    | 'sepolia'
    | 'arbitrum_sepolia'
    | 'base_sepolia'
    | 'linea_testnet'
    | 'optimism_sepolia'
    | 'polygon_amoy'
    | 'solana_devnet'
    | 'solana_testnet'
    | Array<
        | 'ethereum'
        | 'arbitrum'
        | 'base'
        | 'tempo'
        | 'linea'
        | 'optimism'
        | 'polygon'
        | 'solana'
        | 'zksync_era'
        | 'sepolia'
        | 'arbitrum_sepolia'
        | 'base_sepolia'
        | 'linea_testnet'
        | 'optimism_sepolia'
        | 'polygon_amoy'
        | 'solana_devnet'
        | 'solana_testnet'
      >;

  include_currency?: 'usd' | 'eur';
}

export declare namespace Balance {
  export { type BalanceGetResponse as BalanceGetResponse, type BalanceGetParams as BalanceGetParams };
}
