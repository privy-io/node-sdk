// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Swaps extends APIResource {}

/**
 * Whether the swap amount refers to the input token or output token.
 */
export type SwapAmountType = 'exact_input' | 'exact_output';

/**
 * Input for requesting a token swap quote.
 */
export interface SwapQuoteRequest {
  /**
   * Amount in base units (e.g., wei for ETH).
   */
  amount: string;

  /**
   * Chain identifier (e.g., "eip155:1" for Ethereum mainnet).
   */
  caip2: string;

  /**
   * Token address to sell, or "native" for the chain's native token.
   */
  input_token: string;

  /**
   * Token address to buy, or "native" for the chain's native token.
   */
  output_token: string;

  /**
   * Whether the swap amount refers to the input token or output token.
   */
  amount_type?: SwapAmountType;

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
export interface SwapRequest {
  /**
   * Amount in base units (e.g., wei for ETH).
   */
  amount: string;

  /**
   * Chain identifier (e.g., "eip155:1" for Ethereum mainnet).
   */
  caip2: string;

  /**
   * Token address to sell, or "native" for the chain's native token.
   */
  input_token: string;

  /**
   * Token address to buy, or "native" for the chain's native token.
   */
  output_token: string;

  /**
   * Whether the swap amount refers to the input token or output token.
   */
  amount_type?: SwapAmountType;

  /**
   * Address to receive the output tokens. Defaults to the wallet address if not
   * specified.
   */
  recipient?: string;

  /**
   * Maximum slippage tolerance in basis points (e.g., 50 for 0.5%).
   */
  slippage_bps?: number;
}

export declare namespace Swaps {
  export {
    type SwapAmountType as SwapAmountType,
    type SwapQuoteRequest as SwapQuoteRequest,
    type SwapQuoteResponse as SwapQuoteResponse,
    type SwapRequest as SwapRequest,
  };
}
