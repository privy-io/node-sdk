// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Transactions extends APIResource {
  /**
   * Get a transaction by transaction ID.
   *
   * @example
   * ```ts
   * const transaction = await client.transactions.get(
   *   'transaction_id',
   * );
   * ```
   */
  get(transactionID: string, options?: RequestOptions): APIPromise<TransactionGetResponse> {
    return this._client.get(path`/v1/transactions/${transactionID}`, options);
  }
}

export interface TransactionGetResponse {
  id: string;

  caip2: string;

  created_at: number;

  status: 'broadcasted' | 'confirmed' | 'execution_reverted' | 'failed' | 'replaced';

  transaction_hash: string | null;

  wallet_id: string;

  sponsored?: boolean;
}

export declare namespace Transactions {
  export { type TransactionGetResponse as TransactionGetResponse };
}
