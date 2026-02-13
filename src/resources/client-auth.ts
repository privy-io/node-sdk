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
export type PrivyOAuthProviderID = `privy:${string}`;

/**
 * The ID of a custom OAuth provider, set up for this app. Must start with
 * "custom:".
 */
export type CustomOAuthProviderID = `custom:${string}`;

/**
 * The ID of an OAuth provider.
 */
export type OAuthProviderID = ExternalOAuthProviderID | PrivyOAuthProviderID;

/**
 * Valid set of onramp providers
 */
export type OnrampProvider = 'bridge' | 'bridge-sandbox';

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
}

/**
 * The response for getting a native onramp provider customer.
 */
export type FiatCustomerResponse = BridgeFiatCustomerResponse | BridgeSandboxFiatCustomerResponse;

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

export declare namespace ClientAuth {
  export {
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type OAuthProviderID as OAuthProviderID,
    type OnrampProvider as OnrampProvider,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type FiatCustomerResponse as FiatCustomerResponse,
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
  };
}
