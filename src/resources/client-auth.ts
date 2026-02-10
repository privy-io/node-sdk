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
  };
}
