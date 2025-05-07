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
   * const transaction = await client.transactions.retrieve(
   *   'transaction_id',
   * );
   * ```
   */
  retrieve(transactionID: string, options?: RequestOptions): APIPromise<TransactionRetrieveResponse> {
    return this._client.get(path`/v1/transactions/${transactionID}`, options);
  }
}

export interface TransactionRetrieveResponse {
  id: string;

  caip2: string;

  created_at: number;

  status: 'broadcasted' | 'confirmed' | 'execution_reverted' | 'failed';

  transaction_hash: string | null;

  wallet_id: string;
}

export declare namespace Transactions {
  export { type TransactionRetrieveResponse as TransactionRetrieveResponse };
}
