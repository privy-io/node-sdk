// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SwapsAPI from '../swaps';
import * as ActionsAPI from './actions';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for swapping tokens within wallets
 */
export class Swap extends APIResource {
  /**
   * Execute a token swap within a wallet.
   *
   * @example
   * ```ts
   * const swapActionResponse =
   *   await client.wallets.swap.execute('wallet_id', {
   *     base_amount: '1000000000000000000',
   *     destination: {
   *       asset_address:
   *         '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
   *       caip2: 'eip155:1',
   *     },
   *     source: { asset_address: 'native', caip2: 'eip155:1' },
   *     amount_type: 'exact_input',
   *     slippage_bps: 50,
   *   });
   * ```
   */
  execute(
    walletID: string,
    params: SwapExecuteParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.SwapActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/swap`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a price quote for swapping tokens within a wallet.
   *
   * @example
   * ```ts
   * const swapQuoteResponse = await client.wallets.swap.quote(
   *   'wallet_id',
   *   {
   *     base_amount: '1000000000000000000',
   *     destination: {
   *       asset_address:
   *         '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
   *       caip2: 'eip155:1',
   *     },
   *     source: { asset_address: 'native', caip2: 'eip155:1' },
   *     amount_type: 'exact_input',
   *   },
   * );
   * ```
   */
  quote(
    walletID: string,
    params: SwapQuoteParams,
    options?: RequestOptions,
  ): APIPromise<SwapsAPI.SwapQuoteResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/swap/quote`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface SwapExecuteParams {
  /**
   * Body param: Amount in base units (e.g., wei for ETH). Must be a non-negative
   * integer string.
   */
  base_amount: string;

  /**
   * Body param: The output side of a swap execution request.
   */
  destination: SwapsAPI.SwapDestination;

  /**
   * Body param: The input side of a swap request, including token and chain.
   */
  source: SwapsAPI.SwapSource;

  /**
   * Body param: Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Body param: Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: WalletsAPI.FeeConfiguration;

  /**
   * Body param: Maximum slippage tolerance in basis points (e.g., 50 for 0.5%).
   */
  slippage_bps?: number;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface SwapQuoteParams {
  /**
   * Body param: Amount in base units (e.g., wei for ETH). Must be a non-negative
   * integer string.
   */
  base_amount: string;

  /**
   * Body param: The output side of a swap quote request.
   */
  destination: SwapsAPI.SwapQuoteDestination;

  /**
   * Body param: The input side of a swap request, including token and chain.
   */
  source: SwapsAPI.SwapSource;

  /**
   * Body param: Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Body param: Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: WalletsAPI.FeeConfiguration;

  /**
   * Body param: Maximum slippage tolerance in basis points (e.g., 50 for 0.5%). If
   * omitted, auto-slippage is used.
   */
  slippage_bps?: number;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export declare namespace Swap {
  export { type SwapExecuteParams as SwapExecuteParams, type SwapQuoteParams as SwapQuoteParams };
}
