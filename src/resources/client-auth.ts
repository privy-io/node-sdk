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

export declare namespace ClientAuth {
  export {
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type OAuthProviderID as OAuthProviderID,
  };
}
