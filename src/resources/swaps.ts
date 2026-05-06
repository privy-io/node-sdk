// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WalletsAPI from './wallets/wallets';

export class Swaps extends APIResource {}

/**
 * The output side of a swap execution request.
 */
export interface SwapDestination {
  /**
   * Token contract address to buy, or "native" for the chain's native token.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier for the destination. Must match source chain —
   * cross-chain swaps are not yet supported. Defaults to source chain if omitted.
   */
  caip2?: string;
}

/**
 * The output side of a swap quote request.
 */
export interface SwapQuoteDestination {
  /**
   * Token contract address to buy, or "native" for the chain's native token.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier for the destination. Must match source chain —
   * cross-chain swaps are not yet supported. Defaults to source chain if omitted.
   */
  caip2?: string;
}

/**
 * Input for requesting a token swap quote.
 */
export interface SwapQuoteRequestBody {
  /**
   * Amount in base units (e.g., wei for ETH). Must be a non-negative integer string.
   */
  base_amount: string;

  /**
   * The output side of a swap quote request.
   */
  destination: SwapQuoteDestination;

  /**
   * The input side of a swap request, including token and chain.
   */
  source: SwapSource;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Maximum slippage tolerance in basis points (e.g., 50 for 0.5%). If omitted,
   * auto-slippage is used.
   */
  slippage_bps?: number;
}

/**
 * Pricing data for a token swap.
 */
export interface SwapQuoteResponse {
  /**
   * Chain identifier.
   */
  caip2: string;

  /**
   * Estimated amount of output token in base units.
   */
  est_output_amount: string;

  /**
   * Estimated gas cost in base units of the native token.
   */
  gas_estimate: string;

  /**
   * Amount of input token in base units.
   */
  input_amount: string;

  /**
   * Token address being sold.
   */
  input_token: string;

  /**
   * Minimum output amount accounting for slippage, in base units.
   */
  minimum_output_amount: string;

  /**
   * Token address being bought.
   */
  output_token: string;
}

/**
 * Input for executing a token swap.
 */
export interface SwapRequestBody {
  /**
   * Amount in base units (e.g., wei for ETH). Must be a non-negative integer string.
   */
  base_amount: string;

  /**
   * The output side of a swap execution request.
   */
  destination: SwapDestination;

  /**
   * The input side of a swap request, including token and chain.
   */
  source: SwapSource;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Maximum slippage tolerance in basis points (e.g., 50 for 0.5%).
   */
  slippage_bps?: number;
}

/**
 * The input side of a swap request, including token and chain.
 */
export interface SwapSource {
  /**
   * Token contract address to sell, or "native" for the chain's native token.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier (e.g., "eip155:1").
   */
  caip2: string;
}

export declare namespace Swaps {
  export {
    type SwapDestination as SwapDestination,
    type SwapQuoteDestination as SwapQuoteDestination,
    type SwapQuoteRequestBody as SwapQuoteRequestBody,
    type SwapQuoteResponse as SwapQuoteResponse,
    type SwapRequestBody as SwapRequestBody,
    type SwapSource as SwapSource,
  };
}
