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
  get(transactionID: string, options?: RequestOptions): APIPromise<TransactionGetResponse> {
    if (transactionID === '') {
      throw new Error('transactionID must not be an empty string');
    }
    return this._client.get(path`/v1/transactions/${transactionID}`, options);
  }
}

/**
 * Additional information for Blockaid to validate against.
 */
export interface TransactionScanningMetadata {
  domain: string;
}

/**
 * Raw RPC request to execute with the wallet.
 */
export interface TransactionScanningRpcRequest {
  method: string;

  params: Array<unknown>;
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
 * A failed validation result from a transaction scan.
 */
export interface TransactionScanningValidationErrorResult {
  error: string;

  status: 'Error';
}

/**
 * A successful validation result from a transaction scan.
 */
export interface TransactionScanningValidationSuccessResult {
  result_type: string;

  status: 'Success';
}

/**
 * The validation result from a transaction scan.
 */
export type TransactionScanningValidationResult =
  | TransactionScanningValidationErrorResult
  | TransactionScanningValidationSuccessResult;

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
 * Decoded calldata from a scanned transaction.
 */
export interface TransactionScanningCalldata {
  function_selector: string;

  function_declaration?: string;

  function_signature?: string;
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
 * A failed simulation result from a transaction scan.
 */
export interface TransactionScanningSimulationErrorResult {
  error: string;

  status: 'Error';
}

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
 * The simulation result from a transaction scan.
 */
export type TransactionScanningSimulationResult =
  | TransactionScanningSimulationErrorResult
  | TransactionScanningSimulationSuccessResult;

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

export interface TransactionGetResponse {
  id: string;

  caip2: string;

  created_at: number;

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
}

export declare namespace Transactions {
  export {
    type TransactionScanningMetadata as TransactionScanningMetadata,
    type TransactionScanningRpcRequest as TransactionScanningRpcRequest,
    type TransactionScanningRequestBody as TransactionScanningRequestBody,
    type TransactionScanningValidationErrorResult as TransactionScanningValidationErrorResult,
    type TransactionScanningValidationSuccessResult as TransactionScanningValidationSuccessResult,
    type TransactionScanningValidationResult as TransactionScanningValidationResult,
    type TransactionScanningAssetInfo as TransactionScanningAssetInfo,
    type TransactionScanningAssetValue as TransactionScanningAssetValue,
    type TransactionScanningAssetDiff as TransactionScanningAssetDiff,
    type TransactionScanningExposure as TransactionScanningExposure,
    type TransactionScanningCalldata as TransactionScanningCalldata,
    type TransactionScanningParams as TransactionScanningParams,
    type TransactionScanningSimulationErrorResult as TransactionScanningSimulationErrorResult,
    type TransactionScanningSimulationSuccessResult as TransactionScanningSimulationSuccessResult,
    type TransactionScanningSimulationResult as TransactionScanningSimulationResult,
    type TransactionScanningResponseBody as TransactionScanningResponseBody,
    type TransactionGetResponse as TransactionGetResponse,
  };
}
