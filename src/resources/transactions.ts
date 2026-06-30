// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to transactions
 */
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
  get(transactionID: string, options?: RequestOptions): APIPromise<Transaction> {
    if (transactionID === '') {
      throw new Error('transactionID must not be an empty string');
    }
    return this._client.get(path`/v1/transactions/${transactionID}`, options);
  }
}

/**
 * Status of a blockchain transaction submitted by Privy.
 */
export type BlockchainTransactionStatus =
  | 'broadcasted'
  | 'confirmed'
  | 'execution_reverted'
  | 'failed'
  | 'replaced'
  | 'finalized'
  | 'provider_error'
  | 'pending';

/**
 * A transaction from a Privy wallet.
 */
export interface Transaction {
  id: string;

  caip2: string;

  created_at: number;

  /**
   * Status of a blockchain transaction submitted by Privy.
   */
  status: BlockchainTransactionStatus;

  transaction_hash: string | null;

  wallet_id: string;

  reference_id?: string | null;

  sponsored?: boolean;

  user_operation_hash?: string;
}

/**
 * A list of transactions.
 */
export interface TransactionList {
  transactions: Array<Transaction>;
}

/**
 * An asset diff representing assets entering/leaving a wallet.
 */
export interface TransactionScanningAssetDiff {
  /**
   * Information about the moving asset in a transaction scan.
   */
  asset: TransactionScanningAssetInfo;

  in: Array<TransactionScanningAssetValue>;

  out: Array<TransactionScanningAssetValue>;
}

/**
 * Information about the moving asset in a transaction scan.
 */
export interface TransactionScanningAssetInfo {
  decimals?: number;

  logo_url?: string;

  name?: string;

  symbol?: string;

  type?: string;
}

/**
 * The value of an asset in a transaction scan result.
 */
export interface TransactionScanningAssetValue {
  usd_price?: string;

  value?: string;
}

/**
 * Decoded calldata from a scanned transaction.
 */
export interface TransactionScanningCalldata {
  function_selector: string;

  function_declaration?: string;

  function_signature?: string;
}

/**
 * An exposure representing assets approved to spend.
 */
export interface TransactionScanningExposure {
  /**
   * Information about the moving asset in a transaction scan.
   */
  asset: TransactionScanningAssetInfo;

  spenders: { [key: string]: TransactionScanningAssetValue };
}

/**
 * Additional information for Blockaid to validate against.
 */
export interface TransactionScanningMetadata {
  domain: string;
}

/**
 * The parameters of the scanned transaction.
 */
export interface TransactionScanningParams {
  block_tag?: string;

  /**
   * Decoded calldata from a scanned transaction.
   */
  calldata?: TransactionScanningCalldata;

  chain?: string;

  data?: string;

  from?: string;

  gas?: string;

  gas_price?: string;

  to?: string;

  value?: string;
}

/**
 * The request body for scanning a transaction.
 */
export interface TransactionScanningRequestBody {
  chain_id: string;

  /**
   * Additional information for Blockaid to validate against.
   */
  metadata: TransactionScanningMetadata;

  /**
   * Raw RPC request to execute with the wallet.
   */
  request: TransactionScanningRpcRequest;
}

/**
 * The response from scanning a transaction.
 */
export interface TransactionScanningResponseBody {
  /**
   * The simulation result from a transaction scan.
   */
  simulation: TransactionScanningSimulationResult;

  /**
   * The validation result from a transaction scan.
   */
  validation: TransactionScanningValidationResult;
}

/**
 * Raw RPC request to execute with the wallet.
 */
export interface TransactionScanningRpcRequest {
  method: string;

  params: Array<unknown>;
}

/**
 * A failed simulation result from a transaction scan.
 */
export interface TransactionScanningSimulationErrorResult {
  error: string;

  status: 'Error';
}

/**
 * The simulation result from a transaction scan.
 */
export type TransactionScanningSimulationResult =
  | TransactionScanningSimulationErrorResult
  | TransactionScanningSimulationSuccessResult;

/**
 * A successful simulation result from a transaction scan.
 */
export interface TransactionScanningSimulationSuccessResult {
  assets_diffs: Array<TransactionScanningAssetDiff>;

  exposures: Array<TransactionScanningExposure>;

  status: 'Success';

  /**
   * The parameters of the scanned transaction.
   */
  params?: TransactionScanningParams;
}

/**
 * A failed validation result from a transaction scan.
 */
export interface TransactionScanningValidationErrorResult {
  error: string;

  status: 'Error';
}

/**
 * The validation result from a transaction scan.
 */
export type TransactionScanningValidationResult =
  | TransactionScanningValidationErrorResult
  | TransactionScanningValidationSuccessResult;

/**
 * A successful validation result from a transaction scan.
 */
export interface TransactionScanningValidationSuccessResult {
  result_type: string;

  status: 'Success';
}

export declare namespace Transactions {
  export {
    type BlockchainTransactionStatus as BlockchainTransactionStatus,
    type Transaction as Transaction,
    type TransactionList as TransactionList,
    type TransactionScanningAssetDiff as TransactionScanningAssetDiff,
    type TransactionScanningAssetInfo as TransactionScanningAssetInfo,
    type TransactionScanningAssetValue as TransactionScanningAssetValue,
    type TransactionScanningCalldata as TransactionScanningCalldata,
    type TransactionScanningExposure as TransactionScanningExposure,
    type TransactionScanningMetadata as TransactionScanningMetadata,
    type TransactionScanningParams as TransactionScanningParams,
    type TransactionScanningRequestBody as TransactionScanningRequestBody,
    type TransactionScanningResponseBody as TransactionScanningResponseBody,
    type TransactionScanningRpcRequest as TransactionScanningRpcRequest,
    type TransactionScanningSimulationErrorResult as TransactionScanningSimulationErrorResult,
    type TransactionScanningSimulationResult as TransactionScanningSimulationResult,
    type TransactionScanningSimulationSuccessResult as TransactionScanningSimulationSuccessResult,
    type TransactionScanningValidationErrorResult as TransactionScanningValidationErrorResult,
    type TransactionScanningValidationResult as TransactionScanningValidationResult,
    type TransactionScanningValidationSuccessResult as TransactionScanningValidationSuccessResult,
  };
}
