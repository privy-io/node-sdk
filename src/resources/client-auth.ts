// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class ClientAuth extends APIResource {}

/**
 * The ID of an external OAuth provider.
 */
export type ExternalOAuthProviderID =
  | 'google'
  | 'discord'
  | 'twitter'
  | 'github'
  | 'spotify'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'apple'
  | 'line'
  | 'twitch';

/**
 * The ID of a Privy app as an OAuth provider. Must start with "privy:".
 */
export type PrivyOAuthProviderID = string;

/**
 * The ID of a custom OAuth provider, set up for this app. Must start with
 * "custom:".
 */
export type CustomOAuthProviderID = string;

/**
 * The ID of an OAuth provider.
 */
export type OAuthProviderID = ExternalOAuthProviderID | PrivyOAuthProviderID;

/**
 * Bridge provider variant — production or sandbox.
 */
export type BridgeOnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * Valid set of onramp providers
 */
export type OnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * The request body for linking a passwordless account.
 */
export interface PasswordlessLinkRequestBody {
  code: string;

  email: string;
}

/**
 * The request body for initiating a passwordless ceremony.
 */
export interface PasswordlessInitRequestBody {
  email: string;

  token?: string;
}

/**
 * The request body for unlinking a passwordless account.
 */
export interface PasswordlessUnlinkRequestBody {
  address: string;
}

/**
 * The request body for updating a passwordless account.
 */
export interface PasswordlessUpdateRequestBody {
  code: string;

  newAddress: string;

  oldAddress: string;
}

/**
 * The request body for authenticating a passwordless account.
 */
export interface PasswordlessAuthenticateRequestBody {
  code: string;

  email: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for transferring a passwordless account.
 */
export interface PasswordlessTransferRequestBody {
  email: string;

  nonce: string;
}

/**
 * The request input for getting a native onramp provider customer.
 */
export interface GetFiatCustomerRequestInput {
  /**
   * Valid set of onramp providers
   */
  provider: OnrampProvider;

  kyc_redirect_url?: string;
}

/**
 * The request input for creating (or updating) a native onramp provider customer.
 */
export interface CreateOrUpdateFiatCustomerRequestInput {
  has_accepted_terms: boolean;

  /**
   * Valid set of onramp providers
   */
  provider: OnrampProvider;

  kyc_redirect_url?: string;
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
export interface BridgeFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge';

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
 * The response for getting a native onramp provider customer.
 */
export interface BridgeSandboxFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge-sandbox';

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
 * The response for getting a native onramp provider customer.
 */
export type FiatCustomerResponse = BridgeFiatCustomerResponse | BridgeSandboxFiatCustomerResponse;

/**
 * ISO 4217 fiat currency code. Three uppercase ASCII letters.
 */
export type FiatCurrencyCode = string;

/**
 * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
 */
export type CryptoCurrencyCode = string;

/**
 * A CAIP-2 chain identifier in namespace:reference format (e.g. "eip155:1" for
 * Ethereum mainnet, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" for Solana mainnet).
 */
export type Caip2ChainID = string;

/**
 * A positive decimal amount as a string (e.g. "100", "50.25", "0.001").
 */
export type FiatAmount = string;

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
export type FiatOnrampProvider = 'meld' | 'meld-sandbox' | 'moonpay' | 'moonpay-sandbox';

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
 * The response containing fiat onramp quotes.
 */
export interface GetFiatOnrampQuotesResponse {
  quotes: Array<FiatOnrampQuote>;

  provider_errors?: Array<FiatOnrampProviderError>;
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
 * The response containing a fiat onramp provider session URL.
 */
export interface GetFiatOnrampURLResponse {
  session_id: string;

  url: string;
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

export type BridgeDestinationAsset = 'usdb' | 'usdc' | 'usdt' | 'dai' | 'pyusd' | 'eurc';

export type BridgeSourceAsset = 'usd' | 'eur' | 'mxn' | 'brl' | 'gbp';

export interface BridgeFiatVirtualAccountSource {
  asset: BridgeSourceAsset;
}

export interface BridgeFiatVirtualAccountDestination {
  address: string;

  asset: BridgeDestinationAsset;

  chain: string;
}

/**
 * The request input for creating virtual account.
 */
export interface BridgeFiatVirtualAccountRequest {
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  source: BridgeFiatVirtualAccountSource;
}

/**
 * The request input for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountRequest {
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  source: BridgeFiatVirtualAccountSource;
}

/**
 * The request input for creating virtual account.
 */
export type FiatVirtualAccountRequest =
  | BridgeFiatVirtualAccountRequest
  | BridgeSandboxFiatVirtualAccountRequest;

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeUsdFiatVirtualAccountDepositInstructions {
  asset: 'usd';

  bank_account_number: string;

  bank_address: string;

  bank_beneficiary_address: string;

  bank_beneficiary_name: string;

  bank_name: string;

  bank_routing_number: string;

  payment_rails: Array<'ach_push' | 'wire'>;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeEurFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'eur';

  bank_address: string;

  bank_name: string;

  bic: string;

  iban: string;

  payment_rails: Array<'sepa'>;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeMxnFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'mxn';

  bank_address: string;

  bank_name: string;

  clabe: string;

  payment_rails: Array<'spei'>;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeBrlFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'brl';

  bank_address: string;

  bank_name: string;

  br_code: string;

  payment_rails: Array<'pix'>;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeGbpFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  account_number: string;

  asset: 'gbp';

  bank_address: string;

  bank_name: string;

  payment_rails: Array<'faster_payments'>;

  sort_code: string;
}

/**
 * The deposit instructions for a virtual account.
 */
export type BridgeFiatVirtualAccountDepositInstructions =
  | BridgeUsdFiatVirtualAccountDepositInstructions
  | BridgeEurFiatVirtualAccountDepositInstructions
  | BridgeMxnFiatVirtualAccountDepositInstructions
  | BridgeBrlFiatVirtualAccountDepositInstructions
  | BridgeGbpFiatVirtualAccountDepositInstructions;

/**
 * The response for creating virtual account.
 */
export interface BridgeFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  status: string;
}

/**
 * The response for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  status: string;
}

/**
 * The response for creating virtual account.
 */
export type FiatVirtualAccountResponse =
  | BridgeFiatVirtualAccountResponse
  | BridgeSandboxFiatVirtualAccountResponse;

/**
 * The request body for authenticating a guest.
 */
export interface GuestAuthenticateRequestBody {
  guest_credential: string;
}

/**
 * The request body for getting an OAuth authorization code.
 */
export interface OAuthAuthorizationCodeRequestBody {
  code_challenge: string;

  redirect_to: string;

  state: string;
}

/**
 * The input for refreshing a session or logging out.
 */
export interface OptionalRefreshTokenInput {
  refresh_token?: string;
}

export declare namespace ClientAuth {
  export {
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type OAuthProviderID as OAuthProviderID,
    type BridgeOnrampProvider as BridgeOnrampProvider,
    type OnrampProvider as OnrampProvider,
    type PasswordlessLinkRequestBody as PasswordlessLinkRequestBody,
    type PasswordlessInitRequestBody as PasswordlessInitRequestBody,
    type PasswordlessUnlinkRequestBody as PasswordlessUnlinkRequestBody,
    type PasswordlessUpdateRequestBody as PasswordlessUpdateRequestBody,
    type PasswordlessAuthenticateRequestBody as PasswordlessAuthenticateRequestBody,
    type PasswordlessTransferRequestBody as PasswordlessTransferRequestBody,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type BridgeFiatRejectionReason as BridgeFiatRejectionReason,
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type FiatCustomerResponse as FiatCustomerResponse,
    type FiatCurrencyCode as FiatCurrencyCode,
    type CryptoCurrencyCode as CryptoCurrencyCode,
    type Caip2ChainID as Caip2ChainID,
    type FiatAmount as FiatAmount,
    type FiatOnrampSource as FiatOnrampSource,
    type FiatOnrampDestination as FiatOnrampDestination,
    type FiatOnrampEnvironment as FiatOnrampEnvironment,
    type FiatOnrampProvider as FiatOnrampProvider,
    type GetFiatOnrampQuotesInput as GetFiatOnrampQuotesInput,
    type FiatOnrampQuote as FiatOnrampQuote,
    type FiatOnrampProviderError as FiatOnrampProviderError,
    type GetFiatOnrampQuotesResponse as GetFiatOnrampQuotesResponse,
    type GetFiatOnrampURLInput as GetFiatOnrampURLInput,
    type GetFiatOnrampURLResponse as GetFiatOnrampURLResponse,
    type FiatOnrampTransactionStatus as FiatOnrampTransactionStatus,
    type GetFiatOnrampTransactionStatusInput as GetFiatOnrampTransactionStatusInput,
    type GetFiatOnrampTransactionStatusResponse as GetFiatOnrampTransactionStatusResponse,
    type BridgeDestinationAsset as BridgeDestinationAsset,
    type BridgeSourceAsset as BridgeSourceAsset,
    type BridgeFiatVirtualAccountSource as BridgeFiatVirtualAccountSource,
    type BridgeFiatVirtualAccountDestination as BridgeFiatVirtualAccountDestination,
    type BridgeFiatVirtualAccountRequest as BridgeFiatVirtualAccountRequest,
    type BridgeSandboxFiatVirtualAccountRequest as BridgeSandboxFiatVirtualAccountRequest,
    type FiatVirtualAccountRequest as FiatVirtualAccountRequest,
    type BridgeUsdFiatVirtualAccountDepositInstructions as BridgeUsdFiatVirtualAccountDepositInstructions,
    type BridgeEurFiatVirtualAccountDepositInstructions as BridgeEurFiatVirtualAccountDepositInstructions,
    type BridgeMxnFiatVirtualAccountDepositInstructions as BridgeMxnFiatVirtualAccountDepositInstructions,
    type BridgeBrlFiatVirtualAccountDepositInstructions as BridgeBrlFiatVirtualAccountDepositInstructions,
    type BridgeGbpFiatVirtualAccountDepositInstructions as BridgeGbpFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDepositInstructions as BridgeFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountResponse as BridgeFiatVirtualAccountResponse,
    type BridgeSandboxFiatVirtualAccountResponse as BridgeSandboxFiatVirtualAccountResponse,
    type FiatVirtualAccountResponse as FiatVirtualAccountResponse,
    type GuestAuthenticateRequestBody as GuestAuthenticateRequestBody,
    type OAuthAuthorizationCodeRequestBody as OAuthAuthorizationCodeRequestBody,
    type OptionalRefreshTokenInput as OptionalRefreshTokenInput,
  };
}
