// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClientAuthAPI from '../client-auth';
import * as EmbeddedWalletsAPI from '../embedded-wallets';
import * as AllowlistAPI from './allowlist';
import { Allowlist, AllowlistCreateParams, AllowlistDeleteParams, AllowlistListResponse } from './allowlist';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to app settings and allowlist management
 */
export class Apps extends APIResource {
  allowlist: AllowlistAPI.Allowlist = new AllowlistAPI.Allowlist(this._client);

  /**
   * Get the settings and configuration for an app.
   *
   * @example
   * ```ts
   * const appResponse = await client.apps.get('app_id');
   * ```
   */
  get(appID: string, options?: RequestOptions): APIPromise<AppResponse> {
    if (appID === '') {
      throw new Error('appID must not be an empty string');
    }
    return this._client.get(path`/v1/apps/${appID}`, options);
  }

  /**
   * Get the test accounts and credentials for an app.
   *
   * @example
   * ```ts
   * const testAccountsResponse =
   *   await client.apps.getTestCredentials('app_id');
   * ```
   */
  getTestCredentials(appID: string, options?: RequestOptions): APIPromise<TestAccountsResponse> {
    return this._client.get(path`/v1/apps/${appID}/test_credentials`, options);
  }
}

/**
 * A valid CAIP-2 chain ID (e.g. 'eip155:1').
 */
export type Caip2 = string;

/**
 * A currency asset type.
 */
export type CurrencyAsset = 'native-currency' | 'USDC';

/**
 * A crypto currency identified by a CAIP-2 chain ID and optional asset.
 */
export interface Currency {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  chain: Caip2;

  /**
   * A currency asset type.
   */
  asset?: CurrencyAsset;
}

/**
 * Whether to create embedded wallets on login.
 */
export type EmbeddedWalletCreateOnLogin = 'users-without-wallets' | 'all-users' | 'off';

/**
 * Chain-specific configuration for embedded wallets.
 */
export interface EmbeddedWalletChainConfig {
  /**
   * Whether to create embedded wallets on login.
   */
  create_on_login: EmbeddedWalletCreateOnLogin;
}

/**
 * A user-owned recovery option for embedded wallets.
 */
export type UserOwnedRecoveryOption = 'user-passcode' | 'google-drive' | 'icloud';

/**
 * Input configuration for embedded wallets.
 */
export interface EmbeddedWalletInputSchema {
  /**
   * Whether to create embedded wallets on login.
   */
  create_on_login: EmbeddedWalletCreateOnLogin;

  /**
   * Chain-specific configuration for embedded wallets.
   */
  ethereum: EmbeddedWalletChainConfig;

  /**
   * Chain-specific configuration for embedded wallets.
   */
  solana: EmbeddedWalletChainConfig;

  user_owned_recovery_options: Array<UserOwnedRecoveryOption>;

  require_user_owned_recovery_on_create?: boolean;

  require_user_password_on_create?: boolean;
}

/**
 * The mode for embedded wallets.
 */
export type EmbeddedWalletMode = 'legacy-embedded-wallets-only' | 'user-controlled-server-wallets-only';

/**
 * Configuration for embedded wallets including the mode.
 */
export interface EmbeddedWalletConfigSchema extends EmbeddedWalletInputSchema {
  /**
   * The mode for embedded wallets.
   */
  mode: EmbeddedWalletMode;
}

/**
 * Configuration for Telegram authentication.
 */
export interface TelegramAuthConfigSchema {
  bot_id: string;

  bot_name: string;

  link_enabled: boolean;

  seamless_auth_enabled: boolean;
}

/**
 * A funding method for on-ramp.
 */
export type FundingMethodEnum = 'moonpay' | 'coinbase-onramp' | 'external';

/**
 * A funding option with method and provider.
 */
export interface FundingOption {
  method: string;

  provider: string;
}

/**
 * Configuration for funding and on-ramp options.
 */
export interface FundingConfigResponseSchema {
  cross_chain_bridging_enabled: boolean;

  default_recommended_amount: string;

  /**
   * A crypto currency identified by a CAIP-2 chain ID and optional asset.
   */
  default_recommended_currency: Currency;

  methods: Array<FundingMethodEnum>;

  options: Array<FundingOption>;

  prompt_funding_on_wallet_creation: boolean;
}

/**
 * The response for getting an app.
 */
export interface AppResponse {
  id: string;

  accent_color: string | null;

  allowed_domains: Array<string>;

  allowed_native_app_ids: Array<string>;

  allowed_native_app_url_schemes: Array<string>;

  allowlist_config: AppResponse.AllowlistConfig;

  allowlist_enabled: boolean;

  apple_oauth: boolean;

  captcha_enabled: boolean;

  custom_api_url: string | null;

  custom_jwt_auth: boolean;

  custom_oauth_providers: Array<AppResponse.CustomOAuthProvider>;

  disable_plus_emails: boolean;

  discord_oauth: boolean;

  email_auth: boolean;

  /**
   * Configuration for embedded wallets including the mode.
   */
  embedded_wallet_config: EmbeddedWalletConfigSchema;

  enabled_captcha_provider: 'turnstile' | 'hcaptcha' | null;

  enforce_wallet_uis: boolean;

  farcaster_auth: boolean;

  farcaster_link_wallets_enabled: boolean;

  fiat_on_ramp_enabled: boolean;

  github_oauth: boolean;

  google_oauth: boolean;

  guest_auth: boolean;

  icon_url: string | null;

  instagram_oauth: boolean;

  legacy_wallet_ui_config: boolean;

  line_oauth: boolean;

  linkedin_oauth: boolean;

  logo_url: string | null;

  max_linked_wallets_per_user: number | null;

  mfa_methods: Array<'sms' | 'totp' | 'passkey'>;

  name: string;

  passkey_auth: boolean;

  passkeys_for_signup_enabled: boolean;

  privacy_policy_url: string | null;

  require_users_accept_terms: boolean | null;

  show_wallet_login_first: boolean;

  /**
   * The configuration object for smart wallets.
   */
  smart_wallet_config: EmbeddedWalletsAPI.SmartWalletConfiguration;

  sms_auth: boolean;

  solana_wallet_auth: boolean;

  spotify_oauth: boolean;

  telegram_auth: boolean;

  terms_and_conditions_url: string | null;

  theme: string;

  tiktok_oauth: boolean;

  twitch_oauth: boolean;

  twitter_oauth: boolean;

  twitter_oauth_on_mobile_enabled: boolean;

  verification_key: string;

  wallet_auth: boolean;

  wallet_connect_cloud_project_id: string | null;

  whatsapp_enabled: boolean;

  captcha_site_key?: string;

  /**
   * Configuration for funding and on-ramp options.
   */
  funding_config?: FundingConfigResponseSchema;

  /**
   * Configuration for Telegram authentication.
   */
  telegram_auth_config?: TelegramAuthConfigSchema;
}

export namespace AppResponse {
  export interface AllowlistConfig {
    cta_link: string | null;

    cta_text: string | null;

    error_detail: string | null;

    error_title: string | null;
  }

  export interface CustomOAuthProvider {
    enabled: boolean;

    /**
     * The ID of a custom OAuth provider, set up for this app. Must start with
     * "custom:".
     */
    provider: ClientAuthAPI.CustomOAuthProviderID;

    provider_display_name: string;

    provider_icon_url: string;
  }
}

/**
 * Allowlist invite input for an email address.
 */
export interface EmailInviteInput {
  type: 'email';

  value: string;
}

/**
 * Allowlist invite input for a wallet address.
 */
export interface WalletInviteInput {
  type: 'wallet';

  value: string;
}

/**
 * Allowlist invite input for a phone number.
 */
export interface PhoneInviteInput {
  type: 'phone';

  value: string;
}

/**
 * Input for adding or removing an allowlist entry. Discriminated by type.
 */
export type UserInviteInput = EmailInviteInput | WalletInviteInput | PhoneInviteInput;

/**
 * An allowlist entry for an app.
 */
export interface AllowlistEntry {
  id: string;

  acceptedAt: number | null;

  appId: string;

  type: string;

  value: string;
}

/**
 * Confirmation response for deleting an allowlist entry.
 */
export interface AllowlistDeletionResponse {
  message: string;
}

/**
 * A test account for an app.
 */
export interface TestAccount {
  id: string;

  created_at: string;

  email: string;

  otp_code: string;

  phone_number: string;

  updated_at: string;
}

/**
 * Response for listing test accounts for an app.
 */
export interface TestAccountsResponse {
  data: Array<TestAccount>;
}

/**
 * Input for configuring gas sponsorship settings for an app.
 */
export interface GasSponsorshipConfigurationInput {
  configured_networks?: Array<Caip2>;

  require_app_secret?: boolean;

  sponsorship_enabled?: boolean;
}

/**
 * Gas sponsorship configuration for an app.
 */
export interface GasSponsorshipConfiguration {
  configured_networks: Array<Caip2>;

  require_app_secret: boolean;

  sponsorship_enabled: boolean;
}

Apps.Allowlist = Allowlist;

export declare namespace Apps {
  export {
    type Caip2 as Caip2,
    type CurrencyAsset as CurrencyAsset,
    type Currency as Currency,
    type EmbeddedWalletCreateOnLogin as EmbeddedWalletCreateOnLogin,
    type EmbeddedWalletChainConfig as EmbeddedWalletChainConfig,
    type UserOwnedRecoveryOption as UserOwnedRecoveryOption,
    type EmbeddedWalletInputSchema as EmbeddedWalletInputSchema,
    type EmbeddedWalletMode as EmbeddedWalletMode,
    type EmbeddedWalletConfigSchema as EmbeddedWalletConfigSchema,
    type TelegramAuthConfigSchema as TelegramAuthConfigSchema,
    type FundingMethodEnum as FundingMethodEnum,
    type FundingOption as FundingOption,
    type FundingConfigResponseSchema as FundingConfigResponseSchema,
    type AppResponse as AppResponse,
    type EmailInviteInput as EmailInviteInput,
    type WalletInviteInput as WalletInviteInput,
    type PhoneInviteInput as PhoneInviteInput,
    type UserInviteInput as UserInviteInput,
    type AllowlistEntry as AllowlistEntry,
    type AllowlistDeletionResponse as AllowlistDeletionResponse,
    type TestAccount as TestAccount,
    type TestAccountsResponse as TestAccountsResponse,
    type GasSponsorshipConfigurationInput as GasSponsorshipConfigurationInput,
    type GasSponsorshipConfiguration as GasSponsorshipConfiguration,
  };

  export {
    Allowlist as Allowlist,
    type AllowlistListResponse as AllowlistListResponse,
    type AllowlistCreateParams as AllowlistCreateParams,
    type AllowlistDeleteParams as AllowlistDeleteParams,
  };
}
