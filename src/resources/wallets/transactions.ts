// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   *   { asset: 'usdc', chain: 'ethereum' },
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

    status:
      | 'broadcasted'
      | 'confirmed'
      | 'execution_reverted'
      | 'failed'
      | 'replaced'
      | 'finalized'
      | 'provider_error'
      | 'pending';

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
  asset:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'pol'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'sol'
    | Array<'usdc' | 'usdc.e' | 'eth' | 'pol' | 'usdt' | 'eurc' | 'usdb' | 'sol'>;

  chain: 'ethereum' | 'arbitrum' | 'base' | 'tempo' | 'linea' | 'optimism' | 'polygon' | 'solana' | 'sepolia';

  cursor?: string;

  limit?: number | null;

  tx_hash?: string;
}

export declare namespace Transactions {
  export {
    type TransactionGetResponse as TransactionGetResponse,
    type TransactionGetParams as TransactionGetParams,
  };
}
