// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import * as AppsAPI from './apps/apps';

export class Cards extends APIResource {}

/**
 * Why a lost or stolen card is being canceled.
 */
export type CardIssuingCancellationReason = 'lost' | 'stolen';

/**
 * Stripe Issuing card state bound to a Privy user and wallet.
 */
export interface CardIssuingCardResponse {
  id: string;

  /**
   * USD balance of the card funding wallet on the configured chain, or null when
   * unavailable.
   */
  balance_formatted: string | null;

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
 * Lifecycle status of a card. Active unfreezes the card, inactive freezes it, and
 * canceled closes it.
 */
export type CardIssuingCardStatus = 'active' | 'inactive' | 'canceled';

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
 * Dispute associated with card activity.
 */
export interface CardIssuingDispute {
  /**
   * Status of a dispute for card activity.
   */
  status: CardIssuingDisputeStatus;
}

/**
 * Status of a dispute for card activity.
 */
export type CardIssuingDisputeStatus = 'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won';

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
 * Query parameters for listing activity for a Privy card.
 */
export interface CardIssuingListTransactionsInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Opaque cursor returned by the previous page.
   */
  cursor?: string;

  /**
   * Maximum number of records requested from each card activity source.
   */
  limit?: number;
}

/**
 * Merchant metadata for card activity.
 */
export interface CardIssuingMerchant {
  name: string | null;
}

/**
 * Query parameters for downloading a monthly card statement.
 */
export interface CardIssuingStatementQueryParams {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;
}

/**
 * Card activity
 */
export interface CardIssuingTransactionResponse {
  id: string;

  amount: number;

  created: number;

  currency: string;

  /**
   * Dispute associated with card activity.
   */
  dispute: CardIssuingDispute | null;

  /**
   * Merchant metadata for card activity.
   */
  merchant: CardIssuingMerchant;

  /**
   * Status for card activity.
   */
  status: CardIssuingTransactionStatus;
}

/**
 * Status for card activity.
 */
export type CardIssuingTransactionStatus = 'pending' | 'posted' | 'declined' | 'expired' | 'reversed';

/**
 * A chronological list of card activity.
 */
export interface CardIssuingTransactionsResponse {
  data: Array<CardIssuingTransactionResponse>;

  next_cursor: string | null;
}

/**
 * Input for updating the status of a card.
 */
export interface CardIssuingUpdateCardInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Lifecycle status of a card. Active unfreezes the card, inactive freezes it, and
   * canceled closes it.
   */
  status: CardIssuingCardStatus;

  /**
   * Why a lost or stolen card is being canceled.
   */
  cancellation_reason?: CardIssuingCancellationReason;
}

export declare namespace Cards {
  export {
    type CardIssuingCancellationReason as CardIssuingCancellationReason,
    type CardIssuingCardResponse as CardIssuingCardResponse,
    type CardIssuingCardStatus as CardIssuingCardStatus,
    type CardIssuingCardsResponse as CardIssuingCardsResponse,
    type CardIssuingCreateCardInput as CardIssuingCreateCardInput,
    type CardIssuingCustomerInput as CardIssuingCustomerInput,
    type CardIssuingCustomerKYCRequiredResponse as CardIssuingCustomerKYCRequiredResponse,
    type CardIssuingCustomerNotCreatedResponse as CardIssuingCustomerNotCreatedResponse,
    type CardIssuingCustomerPendingResponse as CardIssuingCustomerPendingResponse,
    type CardIssuingCustomerReadyResponse as CardIssuingCustomerReadyResponse,
    type CardIssuingCustomerResponse as CardIssuingCustomerResponse,
    type CardIssuingCustomerTermsRequiredResponse as CardIssuingCustomerTermsRequiredResponse,
    type CardIssuingDispute as CardIssuingDispute,
    type CardIssuingDisputeStatus as CardIssuingDisputeStatus,
    type CardIssuingListCardsInput as CardIssuingListCardsInput,
    type CardIssuingListTransactionsInput as CardIssuingListTransactionsInput,
    type CardIssuingMerchant as CardIssuingMerchant,
    type CardIssuingStatementQueryParams as CardIssuingStatementQueryParams,
    type CardIssuingTransactionResponse as CardIssuingTransactionResponse,
    type CardIssuingTransactionStatus as CardIssuingTransactionStatus,
    type CardIssuingTransactionsResponse as CardIssuingTransactionsResponse,
    type CardIssuingUpdateCardInput as CardIssuingUpdateCardInput,
  };
}
