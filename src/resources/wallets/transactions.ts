// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TransactionsAPI from '../transactions';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to wallets
 */
export class Transactions extends APIResource {
  /**
   * Get incoming and outgoing transactions of a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const transaction = await client.wallets.transactions.get(
   *   'wallet_id',
   *   { chain: 'ethereum' },
   * );
   * ```
   */
  get(
    walletID: string,
    query: TransactionGetParams,
    options?: RequestOptions,
  ): APIPromise<TransactionGetResponse> {
    if (walletID === '') {
      throw new Error('walletID must not be an empty string');
    }
    return this._client.get(path`/v1/wallets/${walletID}/transactions`, { query, ...options });
  }
}

export interface TransactionGetResponse {
  next_cursor: string | null;

  transactions: Array<TransactionGetResponse.Transaction>;
}

export namespace TransactionGetResponse {
  export interface Transaction {
    caip2: string;

    created_at: number;

    /**
     * Details of a wallet transaction, varying by transaction type.
     */
    details: Transaction.Details;

    privy_transaction_id: string;

    /**
     * Status of a blockchain transaction submitted by Privy.
     */
    status: TransactionsAPI.BlockchainTransactionStatus;

    transaction_hash: string | null;

    wallet_id: string;

    sponsored?: boolean;

    user_operation_hash?: string;
  }

  export namespace Transaction {
    /**
     * Details of a wallet transaction, varying by transaction type.
     */
    export type Details = WalletsAPI.TransactionDetail & {};
  }
}

export interface TransactionGetParams {
  /**
   * Chains supported for transaction history queries.
   */
  chain: WalletsAPI.TransactionChainNameInput;

  /**
   * Exactly one of `token` or `asset` is required. Cannot be used together with
   * `asset`.
   */
  token?: WalletsAPI.TransactionTokenAddressInput | Array<WalletsAPI.TransactionTokenAddressInput>;

  /**
   * Exactly one of `asset` or `token` is required. Cannot be used together with
   * `token`.
   */
  asset?:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'avax'
    | 'pol'
    | 'bnb'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'pathusd'
    | 'sol'
    | 'trx'
    | Array<WalletsAPI.WalletAsset>;

  cursor?: string;

  /**
   * Include archived wallets in lookup. Defaults to false.
   */
  include_archived?: boolean;

  limit?: number | null;

  tx_hash?: string;
}

export declare namespace Transactions {
  export {
    type TransactionGetResponse as TransactionGetResponse,
    type TransactionGetParams as TransactionGetParams,
  };
}
