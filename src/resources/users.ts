// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Users extends APIResource {
  /**
   * Create a new user with linked accounts. Optionally pre-generate embedded wallets
   * for the user.
   *
   * @example
   * ```ts
   * const user = await client.users.create({
   *   linked_accounts: [
   *     { address: 'tom.bombadill@privy.io', type: 'email' },
   *   ],
   * });
   * ```
   */
  create(body: UserCreateParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users', { body, ...options });
  }

  /**
   * Get all users in your app.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const user of client.users.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UsersCursor, User> {
    return this._client.getAPIList('/v1/users', Cursor<User>, { query, ...options });
  }

  /**
   * Delete a user by user ID.
   *
   * @example
   * ```ts
   * await client.users.delete('user_id');
   * ```
   */
  delete(userID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/users/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Adds custom metadata to a user by user ID.
   *
   * @example
   * ```ts
   * const user = await client.users.createCustomMetadata(
   *   'user_id',
   *   { custom_metadata: { key: 'value' } },
   * );
   * ```
   */
  createCustomMetadata(
    userID: string,
    body: UserCreateCustomMetadataParams,
    options?: RequestOptions,
  ): APIPromise<User> {
    return this._client.post(path`/v1/users/${userID}/custom_metadata`, { body, ...options });
  }
}

export type UsersCursor = Cursor<User>;

export interface User {
  id: string;

  /**
   * Unix timestamp of when the user was created in milliseconds.
   */
  created_at: number;

  /**
   * Indicates if the user has accepted the terms of service.
   */
  has_accepted_terms: boolean;

  /**
   * Indicates if the user is a guest account user.
   */
  is_guest: boolean;

  linked_accounts: Array<
    | User.LinkedAccountEmail
    | User.LinkedAccountPhone
    | User.LinkedAccountCrossApp
    | User.LinkedAccountAuthorizationKey
    | User.LinkedAccountCustomJwt
    | User.LinkedAccountAppleOAuth
    | User.LinkedAccountDiscordOAuth
    | User.LinkedAccountGitHubOAuth
    | User.LinkedAccountGoogleOAuth
    | User.LinkedAccountInstagramOAuth
    | User.LinkedAccountLinkedInOAuth
    | User.LinkedAccountSpotifyOAuth
    | User.LinkedAccountTiktokOAuth
    | User.LinkedAccountLineOAuth
    | User.LinkedAccountTwitterOAuth
    | User.LinkedAccountSmartWallet
    | User.LinkedAccountPasskey
    | User.LinkedAccountFarcaster
    | User.LinkedAccountEthereum
    | User.LinkedAccountEthereumEmbeddedWallet
    | User.LinkedAccountSolana
    | User.LinkedAccountSolanaEmbeddedWallet
    | User.LinkedAccountBitcoinSegwitEmbeddedWallet
    | User.LinkedAccountBitcoinTaprootEmbeddedWallet
  >;

  mfa_methods: Array<User.PasskeyMfaMethod | User.SMSMfaMethod | User.TotpMfaMethod>;

  /**
   * Custom metadata associated with the user.
   */
  custom_metadata?: { [key: string]: string | number | boolean };
}

export namespace User {
  export interface LinkedAccountEmail {
    address: string;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    type: 'email';

    verified_at: number;
  }

  export interface LinkedAccountPhone {
    first_verified_at: number | null;

    latest_verified_at: number | null;

    phoneNumber: string;

    type: 'phone';

    verified_at: number;

    number?: string;
  }

  export interface LinkedAccountCrossApp {
    embedded_wallets: Array<LinkedAccountCrossApp.EmbeddedWallet>;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    provider_app_id: string;

    smart_wallets: Array<LinkedAccountCrossApp.SmartWallet>;

    subject: string;

    type: 'cross_app';

    verified_at: number;
  }

  export namespace LinkedAccountCrossApp {
    export interface EmbeddedWallet {
      address: string;
    }

    export interface SmartWallet {
      address: string;
    }
  }

  export interface LinkedAccountAuthorizationKey {
    first_verified_at: number | null;

    latest_verified_at: number | null;

    public_key: string;

    type: 'authorization_key';

    verified_at: number;
  }

  export interface LinkedAccountCustomJwt {
    custom_user_id: string;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    type: 'custom_auth';

    verified_at: number;
  }

  export interface LinkedAccountAppleOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    subject: string;

    type: 'apple_oauth';

    verified_at: number;
  }

  export interface LinkedAccountDiscordOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    subject: string;

    type: 'discord_oauth';

    username: string | null;

    verified_at: number;
  }

  export interface LinkedAccountGitHubOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    subject: string;

    type: 'github_oauth';

    username: string | null;

    verified_at: number;
  }

  export interface LinkedAccountGoogleOAuth {
    email: string;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    subject: string;

    type: 'google_oauth';

    verified_at: number;
  }

  export interface LinkedAccountInstagramOAuth {
    first_verified_at: number | null;

    latest_verified_at: number | null;

    subject: string;

    type: 'instagram_oauth';

    username: string | null;

    verified_at: number;
  }

  export interface LinkedAccountLinkedInOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    subject: string;

    type: 'linkedin_oauth';

    verified_at: number;

    name?: string;

    vanity_name?: string;
  }

  export interface LinkedAccountSpotifyOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    subject: string;

    type: 'spotify_oauth';

    verified_at: number;
  }

  export interface LinkedAccountTiktokOAuth {
    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    subject: string;

    type: 'tiktok_oauth';

    username: string | null;

    verified_at: number;
  }

  export interface LinkedAccountLineOAuth {
    email: string | null;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    profile_picture_url: string | null;

    subject: string;

    type: 'line_oauth';

    verified_at: number;
  }

  export interface LinkedAccountTwitterOAuth {
    first_verified_at: number | null;

    latest_verified_at: number | null;

    name: string | null;

    profile_picture_url: string | null;

    subject: string;

    type: 'twitter_oauth';

    username: string | null;

    verified_at: number;
  }

  export interface LinkedAccountSmartWallet {
    address: string;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    smart_wallet_type:
      | 'safe'
      | 'kernel'
      | 'biconomy'
      | 'light_account'
      | 'coinbase_smart_wallet'
      | 'thirdweb';

    type: 'smart_wallet';

    verified_at: number;

    smart_wallet_version?: string;
  }

  export interface LinkedAccountPasskey {
    credential_id: string;

    enrolled_in_mfa: boolean;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    type: 'passkey';

    verified_at: number;

    authenticator_name?: string;

    created_with_browser?: string;

    created_with_device?: string;

    created_with_os?: string;

    public_key?: string;
  }

  export interface LinkedAccountFarcaster {
    fid: number;

    first_verified_at: number | null;

    latest_verified_at: number | null;

    owner_address: string;

    type: 'farcaster';

    verified_at: number;

    bio?: string;

    display_name?: string;

    homepage_url?: string;

    profile_picture?: string;

    profile_picture_url?: string;

    signer_public_key?: string;

    username?: string;
  }

  export interface LinkedAccountEthereum {
    address: string;

    chain_type: 'ethereum';

    first_verified_at: number | null;

    latest_verified_at: number | null;

    type: 'wallet';

    verified_at: number;

    wallet_client: 'unknown';

    chain_id?: string;

    connector_type?: string;

    wallet_client_type?: string;
  }

  export interface LinkedAccountEthereumEmbeddedWallet {
    id: string | null;

    address: string;

    chain_id: string;

    chain_type: 'ethereum';

    connector_type: 'embedded';

    delegated: boolean;

    first_verified_at: number | null;

    imported: boolean;

    latest_verified_at: number | null;

    recovery_method:
      | 'privy'
      | 'user-passcode'
      | 'google-drive'
      | 'icloud'
      | 'recovery-encryption-key'
      | 'privy-v2';

    type: 'wallet';

    verified_at: number;

    wallet_client: 'privy';

    wallet_client_type: 'privy';

    wallet_index: number;
  }

  export interface LinkedAccountSolana {
    address: string;

    chain_type: 'solana';

    first_verified_at: number | null;

    latest_verified_at: number | null;

    type: 'wallet';

    verified_at: number;

    wallet_client: 'unknown';

    connector_type?: string;

    wallet_client_type?: string;
  }

  export interface LinkedAccountSolanaEmbeddedWallet {
    id: string | null;

    address: string;

    chain_id: string;

    chain_type: 'solana';

    connector_type: 'embedded';

    delegated: boolean;

    first_verified_at: number | null;

    imported: boolean;

    latest_verified_at: number | null;

    public_key: string;

    recovery_method:
      | 'privy'
      | 'user-passcode'
      | 'google-drive'
      | 'icloud'
      | 'recovery-encryption-key'
      | 'privy-v2';

    type: 'wallet';

    verified_at: number;

    wallet_client: 'privy';

    wallet_client_type: 'privy';

    wallet_index: number;
  }

  export interface LinkedAccountBitcoinSegwitEmbeddedWallet {
    id: string | null;

    address: string;

    chain_id: string;

    chain_type: 'bitcoin-segwit';

    connector_type: 'embedded';

    delegated: boolean;

    first_verified_at: number | null;

    imported: boolean;

    latest_verified_at: number | null;

    public_key: string;

    recovery_method:
      | 'privy'
      | 'user-passcode'
      | 'google-drive'
      | 'icloud'
      | 'recovery-encryption-key'
      | 'privy-v2';

    type: 'wallet';

    verified_at: number;

    wallet_client: 'privy';

    wallet_client_type: 'privy';

    wallet_index: number;
  }

  export interface LinkedAccountBitcoinTaprootEmbeddedWallet {
    id: string | null;

    address: string;

    chain_id: string;

    chain_type: 'bitcoin-taproot';

    connector_type: 'embedded';

    delegated: boolean;

    first_verified_at: number | null;

    imported: boolean;

    latest_verified_at: number | null;

    public_key: string;

    recovery_method:
      | 'privy'
      | 'user-passcode'
      | 'google-drive'
      | 'icloud'
      | 'recovery-encryption-key'
      | 'privy-v2';

    type: 'wallet';

    verified_at: number;

    wallet_client: 'privy';

    wallet_client_type: 'privy';

    wallet_index: number;
  }

  export interface PasskeyMfaMethod {
    type: 'passkey';

    verified_at: number;
  }

  export interface SMSMfaMethod {
    type: 'sms';

    verified_at: number;
  }

  export interface TotpMfaMethod {
    type: 'totp';

    verified_at: number;
  }
}

export interface UserCreateParams {
  linked_accounts: Array<
    | UserCreateParams.LinkedAccountWalletInput
    | UserCreateParams.LinkedAccountEmailInput
    | UserCreateParams.LinkedAccountPhoneInput
    | UserCreateParams.LinkedAccountGoogleInput
    | UserCreateParams.LinkedAccountTwitterInput
    | UserCreateParams.LinkedAccountDiscordInput
    | UserCreateParams.LinkedAccountGitHubInput
    | UserCreateParams.LinkedAccountSpotifyInput
    | UserCreateParams.LinkedAccountInstagramInput
    | UserCreateParams.LinkedAccountTiktokInput
    | UserCreateParams.LinkedAccountLineInput
    | UserCreateParams.LinkedAccountAppleInput
    | UserCreateParams.LinkedAccountLinkedInInput
    | UserCreateParams.LinkedAccountFarcasterInput
    | UserCreateParams.LinkedAccountTelegramInput
    | UserCreateParams.LinkedAccountCustomJwtInput
  >;

  /**
   * Custom metadata associated with the user.
   */
  custom_metadata?: { [key: string]: string | number | boolean };

  /**
   * Wallets to create for the user.
   */
  wallets?: Array<UserCreateParams.Wallet>;
}

export namespace UserCreateParams {
  export interface LinkedAccountWalletInput {
    address: string;

    chain_type: 'ethereum' | 'solana';

    type: 'wallet';
  }

  export interface LinkedAccountEmailInput {
    address: string;

    type: 'email';
  }

  export interface LinkedAccountPhoneInput {
    number: string;

    type: 'phone';
  }

  export interface LinkedAccountGoogleInput {
    email: string;

    name: string;

    subject: string;

    type: 'google_oauth';
  }

  export interface LinkedAccountTwitterInput {
    name: string;

    subject: string;

    type: 'twitter_oauth';

    username: string;

    profile_picture_url?: string;
  }

  export interface LinkedAccountDiscordInput {
    subject: string;

    type: 'discord_oauth';

    username: string;

    email?: string;
  }

  export interface LinkedAccountGitHubInput {
    subject: string;

    type: 'github_oauth';

    username: string;

    email?: string;

    name?: string;
  }

  export interface LinkedAccountSpotifyInput {
    subject: string;

    type: 'spotify_oauth';

    email?: string;

    name?: string;
  }

  export interface LinkedAccountInstagramInput {
    subject: string;

    type: 'instagram_oauth';

    username: string;
  }

  export interface LinkedAccountTiktokInput {
    name: string | null;

    subject: string;

    type: 'tiktok_oauth';

    username: string;
  }

  export interface LinkedAccountLineInput {
    subject: string;

    type: 'line_oauth';

    email?: string;

    name?: string;

    profile_picture_url?: string;
  }

  export interface LinkedAccountAppleInput {
    subject: string;

    type: 'apple_oauth';

    email?: string;
  }

  export interface LinkedAccountLinkedInInput {
    subject: string;

    type: 'linkedin_oauth';

    email?: string;

    name?: string;

    vanityName?: string;
  }

  export interface LinkedAccountFarcasterInput {
    fid: number;

    owner_address: string;

    type: 'farcaster';

    bio?: string;

    display_name?: string;

    homepage_url?: string;

    profile_picture_url?: string;

    username?: string;
  }

  export interface LinkedAccountTelegramInput {
    telegram_user_id: string;

    type: 'telegram';

    first_name?: string;

    last_name?: string;

    photo_url?: string;

    username?: string;
  }

  export interface LinkedAccountCustomJwtInput {
    custom_user_id: string;

    type: 'custom_auth';
  }

  export interface Wallet {
    /**
     * Chain type of the wallet
     */
    chain_type:
      | 'solana'
      | 'ethereum'
      | 'cosmos'
      | 'stellar'
      | 'sui'
      | 'tron'
      | 'bitcoin-segwit'
      | 'near'
      | 'spark'
      | 'ton';

    /**
     * Additional signers for the wallet.
     */
    additional_signers?: Array<Wallet.AdditionalSigner>;

    /**
     * Create a smart wallet with this wallet as the signer. Only supported for wallets
     * with `chain_type: "ethereum"`.
     */
    create_smart_wallet?: boolean;

    /**
     * Policy IDs to enforce on the wallet. Currently, only one policy is supported per
     * wallet.
     */
    policy_ids?: Array<string>;
  }

  export namespace Wallet {
    export interface AdditionalSigner {
      /**
       * The key quorum ID for the signer.
       */
      signer_id: string;

      /**
       * The array of policy IDs that will be applied to wallet requests. If specified,
       * this will override the base policy IDs set on the wallet. Currently, only one
       * policy is supported per signer.
       */
      override_policy_ids?: Array<string>;
    }
  }
}

export interface UserListParams extends CursorParams {}

export interface UserCreateCustomMetadataParams {
  /**
   * Custom metadata associated with the user.
   */
  custom_metadata: { [key: string]: string | number | boolean };
}

export declare namespace Users {
  export {
    type User as User,
    type UsersCursor as UsersCursor,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
    type UserCreateCustomMetadataParams as UserCreateCustomMetadataParams,
  };
}
