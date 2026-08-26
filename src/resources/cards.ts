// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import * as AppsAPI from './apps/apps';

export class Cards extends APIResource {}

/**
 * A single agreement the user must accept for the issuing bank.
 */
export interface CardIssuingBankAgreement {
  /**
   * Stable identifier for this agreement, e.g. "cardholder_agreement". Match on this
   * rather than on `name`, which is display copy and can be reworded.
   */
  id: string;

  /**
   * Display name, e.g. "Cardholder Agreement".
   */
  name: string;

  /**
   * Link to the agreement. Empty when the document has not been published yet.
   */
  url: (string & {}) | '';
}

/**
 * The bank issuing the card and the agreements the user must accept for it. Served
 * from the backend so the agreements can change without an SDK release, and so
 * swapping banks does not require a client change.
 */
export interface CardIssuingBankInfo {
  /**
   * Agreements the user must accept for this bank, in the order they should be
   * presented. Render every entry — the set and size vary by bank.
   */
  agreements: Array<CardIssuingBankAgreement>;

  /**
   * Display name of the issuing bank, e.g. "Lead Bank".
   */
  name: string;
}

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
   * Cardholder metadata for a card.
   */
  cardholder: CardIssuingCardholder;

  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:4217' for Tempo, 'eip155:1' for Ethereum).
   */
  chain_id: AppsAPI.Caip2;

  /**
   * Card expiration month from 1 to 12, or null when unavailable.
   */
  exp_month: number | null;

  /**
   * Four-digit card expiration year, or null when unavailable.
   */
  exp_year: number | null;

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
 * Cardholder metadata for a card.
 */
export interface CardIssuingCardholder {
  /**
   * Cardholder name printed on the card, or null when unavailable.
   */
  name: string | null;
}

/**
 * Stripe Issuing cards bound to the authenticated Privy user.
 */
export interface CardIssuingCardsResponse {
  data: Array<CardIssuingCardResponse>;

  next_cursor: string | null;
}

/**
 * Browser-safe configuration for rendering Stripe Issuing card details.
 */
export interface CardIssuingConfig {
  /**
   * Stripe publishable key for initializing Stripe.js in the browser.
   */
  publishable_key: string;
}

/**
 * Query parameters for reading an app's card-issuing client configuration.
 */
export interface CardIssuingConfigQueryParams {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;
}

/**
 * Browser-safe card-issuing configuration for the authenticated user's app.
 */
export interface CardIssuingConfigResponse {
  /**
   * Browser-safe configuration for rendering Stripe Issuing card details.
   */
  data: CardIssuingConfig;
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
 * A cards customer exists and must accept the bank agreements. Privy records these
 * rather than the provider, so this step is reached even when the provider already
 * has its own terms — for example a customer onboarded through another product.
 */
export interface CardIssuingCustomerBankTermsRequiredResponse {
  /**
   * The bank issuing the card and the agreements the user must accept for it. Served
   * from the backend so the agreements can change without an SDK release, and so
   * swapping banks does not require a client change.
   */
  bank_info: CardIssuingBankInfo;

  status: 'bank_terms_required';
}

/**
 * A cards customer exists and must accept the provider terms hosted at `tos_url`
 * before KYC. Reached only once the bank agreements are recorded.
 */
export interface CardIssuingCustomerBridgeTermsRequiredResponse {
  status: 'bridge_terms_required';

  tos_url: string;
}

/**
 * Request body for recording that the user accepted the agreements Privy tracks.
 * Send one field per screen the user accepted. Acceptances are recorded once —
 * re-sending a field that is already recorded leaves the original timestamp
 * unchanged.
 */
export interface CardIssuingCustomerConsentsRequestBody {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Set to true when the user accepted the bank agreements. Requires the electronic
   * disclosure to be accepted first, in this request or a previous one.
   */
  accept_bank_terms?: boolean;

  /**
   * Set to true when the user accepted the electronic disclosure (E-Sign consent).
   */
  accept_electronic_disclosure?: boolean;
}

/**
 * A cards customer exists and the user must accept the electronic disclosure
 * (E-Sign consent) before any other agreement can be accepted electronically.
 */
export interface CardIssuingCustomerElectronicDisclosureRequiredResponse {
  /**
   * The disclosure the user must accept, rendered by the client.
   */
  disclosure_url: string;

  status: 'electronic_disclosure_required';
}

/**
 * The cards customer cannot continue onboarding or issue cards.
 */
export interface CardIssuingCustomerErrorResponse {
  status: 'error';
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
 * Bridge rejected the cards customer during verification.
 */
export interface CardIssuingCustomerRejectedResponse {
  status: 'rejected';
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
    | CardIssuingCustomerElectronicDisclosureRequiredResponse
    | CardIssuingCustomerBankTermsRequiredResponse
    | CardIssuingCustomerBridgeTermsRequiredResponse
    | CardIssuingCustomerKYCRequiredResponse
    | CardIssuingCustomerPendingResponse
    | CardIssuingCustomerRejectedResponse
    | CardIssuingCustomerErrorResponse
    | CardIssuingCustomerReadyResponse;
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
 * Short-lived Stripe authorization for displaying card details.
 */
export interface CardIssuingEphemeralKey {
  /**
   * Secret used only by Stripe Issuing Elements in the authenticated browser.
   */
  ephemeral_key_secret: string;
}

/**
 * Request body for authorizing Stripe Issuing Elements to display card details.
 */
export interface CardIssuingEphemeralKeyRequestBody {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Browser nonce returned by Stripe.js for the card provider ID.
   */
  nonce: string;
}

/**
 * Short-lived Stripe authorization for displaying an authenticated card.
 */
export interface CardIssuingEphemeralKeyResponse {
  /**
   * Short-lived Stripe authorization for displaying card details.
   */
  data: CardIssuingEphemeralKey;
}

/**
 * Query parameters for listing cards bound to the authenticated Privy user.
 */
export interface CardIssuingListCardsInput {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Cursor returned by the previous page.
   */
  cursor?: string;

  /**
   * Maximum number of cards to return.
   */
  limit?: number;
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
 * Input for replacing a lost, stolen, or expired card.
 */
export interface CardIssuingReplaceCardRequestBody {
  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Why a card is being replaced.
   */
  replacement_reason: CardIssuingReplacementReason;
}

/**
 * Why a card is being replaced.
 */
export type CardIssuingReplacementReason = 'lost' | 'stolen' | 'expired';

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
    type CardIssuingBankAgreement as CardIssuingBankAgreement,
    type CardIssuingBankInfo as CardIssuingBankInfo,
    type CardIssuingCancellationReason as CardIssuingCancellationReason,
    type CardIssuingCardResponse as CardIssuingCardResponse,
    type CardIssuingCardStatus as CardIssuingCardStatus,
    type CardIssuingCardholder as CardIssuingCardholder,
    type CardIssuingCardsResponse as CardIssuingCardsResponse,
    type CardIssuingConfig as CardIssuingConfig,
    type CardIssuingConfigQueryParams as CardIssuingConfigQueryParams,
    type CardIssuingConfigResponse as CardIssuingConfigResponse,
    type CardIssuingCreateCardInput as CardIssuingCreateCardInput,
    type CardIssuingCustomerBankTermsRequiredResponse as CardIssuingCustomerBankTermsRequiredResponse,
    type CardIssuingCustomerBridgeTermsRequiredResponse as CardIssuingCustomerBridgeTermsRequiredResponse,
    type CardIssuingCustomerConsentsRequestBody as CardIssuingCustomerConsentsRequestBody,
    type CardIssuingCustomerElectronicDisclosureRequiredResponse as CardIssuingCustomerElectronicDisclosureRequiredResponse,
    type CardIssuingCustomerErrorResponse as CardIssuingCustomerErrorResponse,
    type CardIssuingCustomerInput as CardIssuingCustomerInput,
    type CardIssuingCustomerKYCRequiredResponse as CardIssuingCustomerKYCRequiredResponse,
    type CardIssuingCustomerNotCreatedResponse as CardIssuingCustomerNotCreatedResponse,
    type CardIssuingCustomerPendingResponse as CardIssuingCustomerPendingResponse,
    type CardIssuingCustomerReadyResponse as CardIssuingCustomerReadyResponse,
    type CardIssuingCustomerRejectedResponse as CardIssuingCustomerRejectedResponse,
    type CardIssuingCustomerResponse as CardIssuingCustomerResponse,
    type CardIssuingDispute as CardIssuingDispute,
    type CardIssuingDisputeStatus as CardIssuingDisputeStatus,
    type CardIssuingEphemeralKey as CardIssuingEphemeralKey,
    type CardIssuingEphemeralKeyRequestBody as CardIssuingEphemeralKeyRequestBody,
    type CardIssuingEphemeralKeyResponse as CardIssuingEphemeralKeyResponse,
    type CardIssuingListCardsInput as CardIssuingListCardsInput,
    type CardIssuingListTransactionsInput as CardIssuingListTransactionsInput,
    type CardIssuingMerchant as CardIssuingMerchant,
    type CardIssuingReplaceCardRequestBody as CardIssuingReplaceCardRequestBody,
    type CardIssuingReplacementReason as CardIssuingReplacementReason,
    type CardIssuingStatementQueryParams as CardIssuingStatementQueryParams,
    type CardIssuingTransactionResponse as CardIssuingTransactionResponse,
    type CardIssuingTransactionStatus as CardIssuingTransactionStatus,
    type CardIssuingTransactionsResponse as CardIssuingTransactionsResponse,
    type CardIssuingUpdateCardInput as CardIssuingUpdateCardInput,
  };
}
