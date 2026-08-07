// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import * as AppsAPI from './apps/apps';

export class Cards extends APIResource {}

/**
 * Stripe Issuing card state bound to a Privy user and wallet.
 */
export interface CardIssuingCardResponse {
  id: string;

  balance: string | null;

  brand: string | null;

  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:4217' for Tempo, 'eip155:1' for Ethereum).
   */
  chain_id: AppsAPI.Caip2;

  last4: string | null;

  provider_id: string;

  status: string;

  wallet_id: string;
}

/**
 * Stripe Issuing cards bound to the authenticated Privy user.
 */
export interface CardIssuingCardsResponse {
  data: Array<CardIssuingCardResponse>;

  next_cursor: string | null;
}

/**
 * Input for creating a virtual Stripe Issuing card for a Privy wallet.
 */
export interface CardIssuingCreateCardInput {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:4217' for Tempo, 'eip155:1' for Ethereum).
   */
  chain_id: AppsAPI.Caip2;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  wallet_id: string;
}

/**
 * Input for getting or creating a cards customer.
 */
export interface CardIssuingCustomerInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;
}

/**
 * A Bridge cards customer exists and must complete KYC before card creation.
 */
export interface CardIssuingCustomerKYCRequiredResponse {
  kyc_url: string;

  status: 'kyc_required';
}

/**
 * No cards customer has been created for this Privy user.
 */
export interface CardIssuingCustomerNotCreatedResponse {
  status: 'not_created';
}

/**
 * A cards customer waiting for card issuing to become available.
 */
export interface CardIssuingCustomerPendingResponse {
  status: 'pending';
}

/**
 * A cards customer that has a Stripe cardholder external ID and can issue cards.
 */
export interface CardIssuingCustomerReadyResponse {
  external_id: string;

  status: 'ready';
}

/**
 * Cards customer state for a Privy user.
 */
export interface CardIssuingCustomerResponse {
  /**
   * No cards customer has been created for this Privy user.
   */
  data:
    | CardIssuingCustomerNotCreatedResponse
    | CardIssuingCustomerTermsRequiredResponse
    | CardIssuingCustomerKYCRequiredResponse
    | CardIssuingCustomerPendingResponse
    | CardIssuingCustomerReadyResponse;
}

/**
 * A Bridge cards customer exists and must accept terms before KYC.
 */
export interface CardIssuingCustomerTermsRequiredResponse {
  status: 'terms_required';

  tos_url: string;
}

/**
 * Query parameters for listing cards bound to the authenticated Privy user.
 */
export interface CardIssuingListCardsInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  limit?: number | null;

  starting_after?: string;
}

/**
 * Query parameters for listing Stripe Issuing transactions for a Privy card.
 */
export interface CardIssuingListTransactionsInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  ending_before?: string;

  limit?: number | null;

  starting_after?: string;
}

/**
 * Merchant metadata for a card issuing transaction.
 */
export interface CardIssuingMerchant {
  name: string | null;
}

/**
 * Stripe Issuing transaction state for a Privy card.
 */
export interface CardIssuingTransactionResponse {
  id: string;

  amount: number;

  created: number;

  currency: string;

  /**
   * Merchant metadata for a card issuing transaction.
   */
  merchant: CardIssuingMerchant;

  /**
   * Status for a card issuing transaction.
   */
  status: CardIssuingTransactionStatus;

  type: string;
}

/**
 * Status for a card issuing transaction.
 */
export type CardIssuingTransactionStatus = 'pending' | 'posted';

/**
 * A list of Stripe Issuing transactions for a Privy card.
 */
export interface CardIssuingTransactionsResponse {
  data: Array<CardIssuingTransactionResponse>;

  next_cursor: string | null;
}

export declare namespace Cards {
  export {
    type CardIssuingCardResponse as CardIssuingCardResponse,
    type CardIssuingCardsResponse as CardIssuingCardsResponse,
    type CardIssuingCreateCardInput as CardIssuingCreateCardInput,
    type CardIssuingCustomerInput as CardIssuingCustomerInput,
    type CardIssuingCustomerKYCRequiredResponse as CardIssuingCustomerKYCRequiredResponse,
    type CardIssuingCustomerNotCreatedResponse as CardIssuingCustomerNotCreatedResponse,
    type CardIssuingCustomerPendingResponse as CardIssuingCustomerPendingResponse,
    type CardIssuingCustomerReadyResponse as CardIssuingCustomerReadyResponse,
    type CardIssuingCustomerResponse as CardIssuingCustomerResponse,
    type CardIssuingCustomerTermsRequiredResponse as CardIssuingCustomerTermsRequiredResponse,
    type CardIssuingListCardsInput as CardIssuingListCardsInput,
    type CardIssuingListTransactionsInput as CardIssuingListTransactionsInput,
    type CardIssuingMerchant as CardIssuingMerchant,
    type CardIssuingTransactionResponse as CardIssuingTransactionResponse,
    type CardIssuingTransactionStatus as CardIssuingTransactionStatus,
    type CardIssuingTransactionsResponse as CardIssuingTransactionsResponse,
  };
}
