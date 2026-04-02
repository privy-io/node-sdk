// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

/**
 * A simple success response.
 */
export interface SuccessResponse {
  success: boolean;
}

/**
 * A monetary value with its currency denomination.
 */
export interface CurrencyAmount {
  /**
   * Currency code
   */
  currency: 'usd';

  /**
   * The monetary value as a string.
   */
  value: string;
}

export declare namespace Shared {
  export { type SuccessResponse as SuccessResponse, type CurrencyAmount as CurrencyAmount };
}
