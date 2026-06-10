// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ClientAuthAPI from './client-auth';

export class Onramps extends APIResource {}

/**
 * The response for getting a native onramp provider customer.
 */
export interface BridgeFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge';

  /**
   * Status of the KYC verification process.
   */
  status:
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

  kyc_url?: string;

  rejection_reasons?: Array<BridgeFiatRejectionReason>;
}

/**
 * A rejection reason for a customer KYC verification.
 */
export interface BridgeFiatRejectionReason {
  reason: string;
}

/**
 * The response for getting a native onramp provider customer.
 */
export interface BridgeSandboxFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge-sandbox';

  /**
   * Status of the KYC verification process.
   */
  status:
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

  kyc_url?: string;

  rejection_reasons?: Array<BridgeFiatRejectionReason>;
}

/**
 * A CAIP-2 chain identifier in namespace:reference format (e.g. "eip155:1" for
 * Ethereum mainnet, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" for Solana mainnet).
 */
export type Caip2ChainID = string;

/**
 * Input for creating a Link auth intent to initiate Stripe onramp authentication.
 */
export interface CreateLinkAuthIntentInput {
  email?: string;

  /**
   * Whether to use the sandbox or production environment for fiat onramp.
   */
  environment?: FiatOnrampEnvironment;
}

/**
 * The created Link auth intent.
 */
export interface CreateLinkAuthIntentResponse {
  /**
   * Auth intent created. Pass id to authenticate().
   */
  data: LinkAuthIntentCreated | LinkAuthIntentNoAccount;
}

/**
 * The request input for creating (or updating) a native onramp provider customer.
 */
export interface CreateOrUpdateFiatCustomerRequestInput {
  has_accepted_terms: boolean;

  /**
   * Valid set of onramp providers
   */
  provider: ClientAuthAPI.OnrampProvider;

  kyc_redirect_url?: string;
}

/**
 * Input for creating a Stripe onramp session.
 */
export interface CreateStripeOnrampSessionInput {
  /**
   * Whether to use the sandbox or production environment for fiat onramp.
   */
  environment: FiatOnrampEnvironment;

  /**
   * Parameters for creating a Stripe onramp session.
   */
  session: OnrampSessionParams;

  session_id: string;
}

/**
 * The created onramp session.
 */
export interface CreateStripeOnrampSessionResponse {
  id: string;

  session_id: string;

  /**
   * Transaction details returned from a Stripe onramp session.
   */
  transaction_details?: OnrampSessionTransactionDetails | null;
}

/**
 * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
 */
export type CryptoCurrencyCode = string;

/**
 * Input for exchanging a Link auth intent for OAuth tokens.
 */
export interface ExchangeStripeTokensInput {
  auth_intent_id: string;

  crypto_customer_id: string;

  /**
   * Whether to use the sandbox or production environment for fiat onramp.
   */
  environment?: FiatOnrampEnvironment;
}

/**
 * Confirmation that tokens were exchanged and stored.
 */
export interface ExchangeStripeTokensResponse {
  crypto_customer_id: string;
}

/**
 * A positive decimal amount as a string (e.g. "100", "50.25", "0.001").
 */
export type FiatAmount = string;

/**
 * ISO 4217 fiat currency code. Three uppercase ASCII letters.
 */
export type FiatCurrencyCode = string;

/**
 * The response for getting a native onramp provider customer.
 */
export type FiatCustomerResponse = BridgeFiatCustomerResponse | BridgeSandboxFiatCustomerResponse;

/**
 * Destination cryptocurrency details for a fiat onramp quote request.
 */
export interface FiatOnrampDestination {
  address: string;

  /**
   * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
   */
  asset: CryptoCurrencyCode;

  /**
   * A CAIP-2 chain identifier in namespace:reference format (e.g. "eip155:1" for
   * Ethereum mainnet, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" for Solana mainnet).
   */
  chain: Caip2ChainID;
}

/**
 * Whether to use the sandbox or production environment for fiat onramp.
 */
export type FiatOnrampEnvironment = 'sandbox' | 'production';

/**
 * The fiat onramp provider to use.
 */
export type FiatOnrampProvider =
  | 'meld'
  | 'meld-sandbox'
  | 'moonpay'
  | 'moonpay-sandbox'
  | 'coinbase'
  | 'coinbase-sandbox'
  | 'stripe'
  | 'stripe-sandbox';

/**
 * An error from a specific fiat onramp provider when fetching quotes.
 */
export interface FiatOnrampProviderError {
  error: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;
}

/**
 * A single fiat onramp quote from a provider.
 */
export interface FiatOnrampQuote {
  payment_method: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  destination_currency_code?: string | null;

  source_amount?: number | null;

  source_currency_code?: string | null;

  sub_provider?: string | null;
}

/**
 * Source currency details for a fiat onramp quote request.
 */
export interface FiatOnrampSource {
  /**
   * A positive decimal amount as a string (e.g. "100", "50.25", "0.001").
   */
  amount: FiatAmount;

  /**
   * ISO 4217 fiat currency code. Three uppercase ASCII letters.
   */
  asset: FiatCurrencyCode;
}

/**
 * Provider session initialization for embedded SDK providers (Stripe).
 */
export interface FiatOnrampStripeSDKSessionResponse {
  network: string;

  publishable_key: string;

  session_id: string;

  type: 'stripe-sdk';
}

/**
 * Normalized fiat onramp transaction status.
 */
export type FiatOnrampTransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'unknown';

/**
 * Provider session initialization for popup-based providers.
 */
export interface FiatOnrampURLSessionResponse {
  session_id: string;

  type: 'url';

  url: string;
}

/**
 * The request input for getting a native onramp provider customer.
 */
export interface GetFiatCustomerRequestInput {
  /**
   * Valid set of onramp providers
   */
  provider: ClientAuthAPI.OnrampProvider;

  kyc_redirect_url?: string;
}

/**
 * The request input for getting fiat onramp quotes.
 */
export interface GetFiatOnrampQuotesInput {
  /**
   * Destination cryptocurrency details for a fiat onramp quote request.
   */
  destination: FiatOnrampDestination;

  /**
   * Whether to use the sandbox or production environment for fiat onramp.
   */
  environment: FiatOnrampEnvironment;

  /**
   * Source currency details for a fiat onramp quote request.
   */
  source: FiatOnrampSource;
}

/**
 * The response containing fiat onramp quotes.
 */
export interface GetFiatOnrampQuotesResponse {
  quotes: Array<FiatOnrampQuote>;

  provider_errors?: Array<FiatOnrampProviderError>;
}

/**
 * The request input for checking a fiat onramp session status.
 */
export interface GetFiatOnrampTransactionStatusInput {
  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  session_id: string;
}

/**
 * The response containing the fiat onramp session status.
 */
export interface GetFiatOnrampTransactionStatusResponse {
  raw_status: string;

  session_id: string;

  /**
   * Normalized fiat onramp transaction status.
   */
  status: FiatOnrampTransactionStatus;

  transaction_id?: string;
}

/**
 * The request input for getting a fiat onramp provider session URL.
 */
export interface GetFiatOnrampURLInput {
  /**
   * Destination cryptocurrency details for a fiat onramp quote request.
   */
  destination: FiatOnrampDestination;

  payment_method: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  /**
   * Source currency details for a fiat onramp quote request.
   */
  source: FiatOnrampSource;

  redirect_url?: string;

  sub_provider?: string;
}

/**
 * Provider session initialization — either a hosted URL or embedded SDK config.
 */
export type GetFiatOnrampURLResponse = FiatOnrampURLSessionResponse | FiatOnrampStripeSDKSessionResponse;

/**
 * Stripe onramp session status and customer verification info.
 */
export interface GetStripeCryptoCustomerResponse {
  /**
   * Active onramp session with customer verifications.
   */
  data: StripeCryptoCustomerActive | StripeCryptoCustomerExpired | StripeCryptoCustomerNone;
}

/**
 * Auth intent created. Pass id to authenticate().
 */
export interface LinkAuthIntentCreated {
  /**
   * The Link auth intent ID.
   */
  id: string;

  status: 'created';
}

/**
 * No Link account for this email. Call registerLinkUser() then retry.
 */
export interface LinkAuthIntentNoAccount {
  status: 'no_account';
}

/**
 * List of registered wallets for a crypto customer.
 */
export interface ListStripeConsumerWalletsResponse {
  data: Array<StripeConsumerWallet>;
}

/**
 * List of payment tokens for a crypto customer.
 */
export interface ListStripePaymentTokensResponse {
  data: Array<StripePaymentToken>;
}

/**
 * Parameters for creating a Stripe onramp session.
 */
export interface OnrampSessionParams {
  crypto_customer_id: string;

  /**
   * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
   */
  destination_currency: CryptoCurrencyCode;

  destination_network: string;

  payment_token: string;

  source_amount: string;

  /**
   * ISO 4217 fiat currency code. Three uppercase ASCII letters.
   */
  source_currency: FiatCurrencyCode;

  wallet_address: string;
}

/**
 * Transaction details returned from a Stripe onramp session.
 */
export interface OnrampSessionTransactionDetails {
  destination_amount: string | null;

  destination_currency: string | null;

  destination_network: string | null;

  fee: string | null;

  source_currency: string | null;

  source_total_amount: string | null;

  quote_expiration?: number | null;
}

/**
 * Refreshed quote with amounts, fee, and expiry.
 */
export interface RefreshStripeQuoteResponse {
  destination_amount: string | null;

  fee: string | null;

  quote_expiration: number | null;

  source_total_amount: string | null;
}

/**
 * A registered consumer wallet.
 */
export interface StripeConsumerWallet {
  id: string;

  network: string;

  wallet_address: string;
}

/**
 * Active onramp session with customer verifications.
 */
export interface StripeCryptoCustomerActive {
  crypto_customer_id: string;

  kyc_tiers: Array<StripeKYCTier>;

  provided_fields: Array<string>;

  status: 'active';

  verifications: Array<StripeVerification>;
}

/**
 * Expired onramp session. Token refresh failed, re-authentication required.
 */
export interface StripeCryptoCustomerExpired {
  crypto_customer_id: string;

  status: 'expired';
}

/**
 * No onramp session. User must authenticate via Link.
 */
export interface StripeCryptoCustomerNone {
  status: 'none';
}

/**
 * A KYC tier with its verification status.
 */
export interface StripeKYCTier {
  tier: string;

  verification_status: string;
}

/**
 * Checkout confirmation with client secret.
 */
export interface StripeOnrampCheckoutResponse {
  client_secret: string;

  /**
   * Transaction details from checkout.
   */
  transaction_details?: StripeTransactionDetails;
}

/**
 * The state of the user's Stripe onramp session.
 */
export type StripeOnrampSessionStatus = 'active' | 'expired' | 'none';

/**
 * A saved payment token.
 */
export interface StripePaymentToken {
  id: string;

  type: string;
}

/**
 * Transaction details from checkout.
 */
export interface StripeTransactionDetails {
  last_error?: string | null;
}

/**
 * A verification entry on a CryptoCustomer.
 */
export interface StripeVerification {
  name: string;

  status: string;
}

export declare namespace Onramps {
  export {
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeFiatRejectionReason as BridgeFiatRejectionReason,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type Caip2ChainID as Caip2ChainID,
    type CreateLinkAuthIntentInput as CreateLinkAuthIntentInput,
    type CreateLinkAuthIntentResponse as CreateLinkAuthIntentResponse,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type CreateStripeOnrampSessionInput as CreateStripeOnrampSessionInput,
    type CreateStripeOnrampSessionResponse as CreateStripeOnrampSessionResponse,
    type CryptoCurrencyCode as CryptoCurrencyCode,
    type ExchangeStripeTokensInput as ExchangeStripeTokensInput,
    type ExchangeStripeTokensResponse as ExchangeStripeTokensResponse,
    type FiatAmount as FiatAmount,
    type FiatCurrencyCode as FiatCurrencyCode,
    type FiatCustomerResponse as FiatCustomerResponse,
    type FiatOnrampDestination as FiatOnrampDestination,
    type FiatOnrampEnvironment as FiatOnrampEnvironment,
    type FiatOnrampProvider as FiatOnrampProvider,
    type FiatOnrampProviderError as FiatOnrampProviderError,
    type FiatOnrampQuote as FiatOnrampQuote,
    type FiatOnrampSource as FiatOnrampSource,
    type FiatOnrampStripeSDKSessionResponse as FiatOnrampStripeSDKSessionResponse,
    type FiatOnrampTransactionStatus as FiatOnrampTransactionStatus,
    type FiatOnrampURLSessionResponse as FiatOnrampURLSessionResponse,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type GetFiatOnrampQuotesInput as GetFiatOnrampQuotesInput,
    type GetFiatOnrampQuotesResponse as GetFiatOnrampQuotesResponse,
    type GetFiatOnrampTransactionStatusInput as GetFiatOnrampTransactionStatusInput,
    type GetFiatOnrampTransactionStatusResponse as GetFiatOnrampTransactionStatusResponse,
    type GetFiatOnrampURLInput as GetFiatOnrampURLInput,
    type GetFiatOnrampURLResponse as GetFiatOnrampURLResponse,
    type GetStripeCryptoCustomerResponse as GetStripeCryptoCustomerResponse,
    type LinkAuthIntentCreated as LinkAuthIntentCreated,
    type LinkAuthIntentNoAccount as LinkAuthIntentNoAccount,
    type ListStripeConsumerWalletsResponse as ListStripeConsumerWalletsResponse,
    type ListStripePaymentTokensResponse as ListStripePaymentTokensResponse,
    type OnrampSessionParams as OnrampSessionParams,
    type OnrampSessionTransactionDetails as OnrampSessionTransactionDetails,
    type RefreshStripeQuoteResponse as RefreshStripeQuoteResponse,
    type StripeConsumerWallet as StripeConsumerWallet,
    type StripeCryptoCustomerActive as StripeCryptoCustomerActive,
    type StripeCryptoCustomerExpired as StripeCryptoCustomerExpired,
    type StripeCryptoCustomerNone as StripeCryptoCustomerNone,
    type StripeKYCTier as StripeKYCTier,
    type StripeOnrampCheckoutResponse as StripeOnrampCheckoutResponse,
    type StripeOnrampSessionStatus as StripeOnrampSessionStatus,
    type StripePaymentToken as StripePaymentToken,
    type StripeTransactionDetails as StripeTransactionDetails,
    type StripeVerification as StripeVerification,
  };
}
