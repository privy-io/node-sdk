// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Fiat extends APIResource {}

/**
 * Supported fiat currencies.
 */
export type FiatCurrency = 'usd' | 'eur';

/**
 * Supported fiat payment rails.
 */
export type FiatPaymentRail = 'sepa' | 'ach_push' | 'wire';

/**
 * Deposit instructions for an offramp transfer.
 */
export interface OfframpDepositInstructions {
  amount: string;

  /**
   * Supported blockchain chains for onramp and offramp.
   */
  chain: OnrampChain;

  /**
   * Supported crypto assets for onramp and offramp.
   */
  currency: OnrampAsset;

  from_address: string;

  to_address: string;
}

/**
 * Response for an offramp transfer initiation.
 */
export interface OfframpResponse {
  id: string;

  /**
   * Deposit instructions for an offramp transfer.
   */
  deposit_instructions: OfframpDepositInstructions;

  /**
   * Status of an onramp or offramp transfer.
   */
  status: OnrampTransferStatus;
}

/**
 * Supported crypto assets for onramp and offramp.
 */
export type OnrampAsset = 'usdc';

/**
 * Supported blockchain chains for onramp and offramp.
 */
export type OnrampChain = 'ethereum' | 'base' | 'arbitrum' | 'polygon' | 'optimism';

/**
 * Bank deposit instructions for an onramp transfer.
 */
export interface OnrampDepositInstructions {
  amount: string;

  /**
   * Supported fiat currencies.
   */
  currency: FiatCurrency;

  /**
   * Supported fiat payment rails.
   */
  payment_rail: FiatPaymentRail;

  account_holder_name?: string;

  bank_account_number?: string;

  bank_address?: string;

  bank_beneficiary_address?: string;

  bank_beneficiary_name?: string;

  bank_name?: string;

  bank_routing_number?: string;

  bic?: string;

  deposit_message?: string;

  iban?: string;
}

/**
 * Response for an onramp KYC verification.
 */
export interface OnrampKYCResponse {
  /**
   * Status of the KYC verification process.
   */
  status: OnrampKYCStatus;

  user_id: string;

  provider_user_id?: string;
}

/**
 * Status of the KYC verification process.
 */
export type OnrampKYCStatus =
  | 'not_found'
  | 'active'
  | 'awaiting_questionnaire'
  | 'awaiting_ubo'
  | 'incomplete'
  | 'not_started'
  | 'offboarded'
  | 'paused'
  | 'rejected'
  | 'under_review';

/**
 * Response for an onramp transfer initiation.
 */
export interface OnrampResponse {
  id: string;

  /**
   * Bank deposit instructions for an onramp transfer.
   */
  deposit_instructions: OnrampDepositInstructions;

  /**
   * Status of an onramp or offramp transfer.
   */
  status: OnrampTransferStatus;
}

/**
 * Status of an onramp or offramp transfer.
 */
export type OnrampTransferStatus =
  | 'awaiting_funds'
  | 'in_review'
  | 'funds_received'
  | 'payment_submitted'
  | 'payment_processed'
  | 'canceled'
  | 'error'
  | 'undeliverable'
  | 'returned'
  | 'refunded';

export declare namespace Fiat {
  export {
    type FiatCurrency as FiatCurrency,
    type FiatPaymentRail as FiatPaymentRail,
    type OfframpDepositInstructions as OfframpDepositInstructions,
    type OfframpResponse as OfframpResponse,
    type OnrampAsset as OnrampAsset,
    type OnrampChain as OnrampChain,
    type OnrampDepositInstructions as OnrampDepositInstructions,
    type OnrampKYCResponse as OnrampKYCResponse,
    type OnrampKYCStatus as OnrampKYCStatus,
    type OnrampResponse as OnrampResponse,
    type OnrampTransferStatus as OnrampTransferStatus,
  };
}
