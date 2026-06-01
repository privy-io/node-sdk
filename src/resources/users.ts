// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UsersAPI from './users';
import * as ClientAuthAPI from './client-auth';
import * as EmbeddedWalletsAPI from './embedded-wallets';
import * as SharedAPI from './shared';
import * as WalletsAPI from './wallets/wallets';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to users
 */
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
   * Get a user by user ID.
   *
   * @example
   * ```ts
   * const user = await client.users._get('user_id');
   * ```
   */
  _get(userID: string, options?: RequestOptions): APIPromise<User> {
    if (userID === '') {
      throw new Error('userID must not be an empty string');
    }
    return this._client.get(path`/v1/users/${userID}`, options);
  }

  /**
   * Looks up a user by their custom auth ID.
   *
   * @example
   * ```ts
   * const user = await client.users.getByCustomAuthID({
   *   custom_user_id: 'custom_user_id',
   * });
   * ```
   */
  getByCustomAuthID(body: UserGetByCustomAuthIDParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/custom_auth/id', { body, ...options });
  }

  /**
   * Looks up a user by their Discord username.
   *
   * @example
   * ```ts
   * const user = await client.users.getByDiscordUsername({
   *   username: 'username',
   * });
   * ```
   */
  getByDiscordUsername(body: UserGetByDiscordUsernameParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/discord/username', { body, ...options });
  }

  /**
   * Looks up a user by their email address.
   *
   * @example
   * ```ts
   * const user = await client.users.getByEmailAddress({
   *   address: 'dev@stainless.com',
   * });
   * ```
   */
  getByEmailAddress(body: UserGetByEmailAddressParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/email/address', { body, ...options });
  }

  /**
   * Looks up a user by their Farcaster ID.
   *
   * @example
   * ```ts
   * const user = await client.users.getByFarcasterID({
   *   fid: 0,
   * });
   * ```
   */
  getByFarcasterID(body: UserGetByFarcasterIDParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/farcaster/fid', { body, ...options });
  }

  /**
   * Looks up a user by their Github username.
   *
   * @example
   * ```ts
   * const user = await client.users.getByGitHubUsername({
   *   username: 'username',
   * });
   * ```
   */
  getByGitHubUsername(body: UserGetByGitHubUsernameParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/github/username', { body, ...options });
  }

  /**
   * Looks up a user by their phone number.
   *
   * @example
   * ```ts
   * const user = await client.users.getByPhoneNumber({
   *   number: 'number',
   * });
   * ```
   */
  getByPhoneNumber(body: UserGetByPhoneNumberParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/phone/number', { body, ...options });
  }

  /**
   * Looks up a user by their smart wallet address.
   *
   * @example
   * ```ts
   * const user = await client.users.getBySmartWalletAddress({
   *   address: 'address',
   * });
   * ```
   */
  getBySmartWalletAddress(
    body: UserGetBySmartWalletAddressParams,
    options?: RequestOptions,
  ): APIPromise<User> {
    return this._client.post('/v1/users/smart_wallet/address', { body, ...options });
  }

  /**
   * Looks up a user by their Telegram user ID.
   *
   * @example
   * ```ts
   * const user = await client.users.getByTelegramUserID({
   *   telegram_user_id: 'telegram_user_id',
   * });
   * ```
   */
  getByTelegramUserID(body: UserGetByTelegramUserIDParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/telegram/telegram_user_id', { body, ...options });
  }

  /**
   * Looks up a user by their Telegram username.
   *
   * @example
   * ```ts
   * const user = await client.users.getByTelegramUsername({
   *   username: 'username',
   * });
   * ```
   */
  getByTelegramUsername(body: UserGetByTelegramUsernameParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/telegram/username', { body, ...options });
  }

  /**
   * Looks up a user by their Twitter subject.
   *
   * @example
   * ```ts
   * const user = await client.users.getByTwitterSubject({
   *   subject: 'subject',
   * });
   * ```
   */
  getByTwitterSubject(body: UserGetByTwitterSubjectParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/twitter/subject', { body, ...options });
  }

  /**
   * Looks up a user by their Twitter username.
   *
   * @example
   * ```ts
   * const user = await client.users.getByTwitterUsername({
   *   username: 'username',
   * });
   * ```
   */
  getByTwitterUsername(body: UserGetByTwitterUsernameParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/twitter/username', { body, ...options });
  }

  /**
   * Looks up a user by their wallet address.
   *
   * @example
   * ```ts
   * const user = await client.users.getByWalletAddress({
   *   address: 'address',
   * });
   * ```
   */
  getByWalletAddress(body: UserGetByWalletAddressParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/wallet/address', { body, ...options });
  }

  /**
   * Creates an embedded wallet for an existing user.
   *
   * @example
   * ```ts
   * const user = await client.users.pregenerateWallets(
   *   'user_id',
   *   { wallets: [{ chain_type: 'ethereum' }] },
   * );
   * ```
   */
  pregenerateWallets(
    userID: string,
    body: UserPregenerateWalletsParams,
    options?: RequestOptions,
  ): APIPromise<User> {
    return this._client.post(path`/v1/users/${userID}/wallets`, { body, ...options });
  }

  /**
   * Search users by search term, emails, phone numbers, or wallet addresses.
   *
   * @example
   * ```ts
   * const user = await client.users.search({
   *   searchTerm: 'searchTerm',
   * });
   * ```
   */
  search(body: UserSearchParams, options?: RequestOptions): APIPromise<User> {
    return this._client.post('/v1/users/search', { body, ...options });
  }

  /**
   * Adds custom metadata to a user by user ID.
   *
   * @example
   * ```ts
   * const user = await client.users.setCustomMetadata(
   *   'user_id',
   *   { custom_metadata: { key: 'value' } },
   * );
   * ```
   */
  setCustomMetadata(
    userID: string,
    body: UserSetCustomMetadataParams,
    options?: RequestOptions,
  ): APIPromise<User> {
    return this._client.post(path`/v1/users/${userID}/custom_metadata`, { body, ...options });
  }

  /**
   * Unlinks a user linked account.
   *
   * @example
   * ```ts
   * const user = await client.users.unlinkLinkedAccount(
   *   'user_id',
   *   { handle: 'test@test.com', type: 'email' },
   * );
   * ```
   */
  unlinkLinkedAccount(
    userID: string,
    body: UserUnlinkLinkedAccountParams,
    options?: RequestOptions,
  ): APIPromise<User> {
    return this._client.post(path`/v1/users/${userID}/accounts/unlink`, { body, ...options });
  }
}

export type UsersCursor = Cursor<User>;

/**
 * The authenticated user.
 */
export interface AuthenticatedUser {
  token: string | null;

  privy_access_token: string | null;

  refresh_token: string | null;

  /**
   * Instructs the client on how to handle tokens received
   */
  session_update_action: 'set' | 'ignore' | 'clear';

  /**
   * A Privy user object.
   */
  user: User;

  identity_token?: string;

  is_new_user?: boolean;

  /**
   * OAuth tokens associated with the user.
   */
  oauth_tokens?: OAuthTokens;
}

/**
 * An embedded wallet associated with a cross-app account.
 */
export interface CrossAppEmbeddedWallet {
  address: string;
}

/**
 * A smart wallet associated with a cross-app account.
 */
export interface CrossAppSmartWallet {
  address: string;
}

/**
 * Custom metadata associated with the user.
 */
export type CustomMetadata = { [key: string]: string | number | boolean };

/**
 * The method used to recover an embedded wallet account.
 */
export type EmbeddedWalletRecoveryMethod =
  | 'privy'
  | 'user-passcode'
  | 'google-drive'
  | 'icloud'
  | 'recovery-encryption-key'
  | 'privy-v2';

/**
 * A linked account for the user.
 */
export type LinkedAccount =
  | LinkedAccountEmail
  | LinkedAccountPhone
  | LinkedAccountEthereum
  | LinkedAccountSolana
  | LinkedAccountSmartWallet
  | LinkedAccountEthereumEmbeddedWallet
  | LinkedAccountSolanaEmbeddedWallet
  | LinkedAccountBitcoinSegwitEmbeddedWallet
  | LinkedAccountBitcoinTaprootEmbeddedWallet
  | LinkedAccountCurveSigningEmbeddedWallet
  | LinkedAccountGoogleOAuth
  | LinkedAccountTwitterOAuth
  | LinkedAccountDiscordOAuth
  | LinkedAccountGitHubOAuth
  | LinkedAccountSpotifyOAuth
  | LinkedAccountInstagramOAuth
  | LinkedAccountTiktokOAuth
  | LinkedAccountLineOAuth
  | LinkedAccountTwitchOAuth
  | LinkedAccountLinkedInOAuth
  | LinkedAccountAppleOAuth
  | LinkedAccountCustomOAuth
  | LinkedAccountCustomJwt
  | LinkedAccountFarcaster
  | LinkedAccountPasskey
  | LinkedAccountTelegram
  | LinkedAccountCrossApp
  | LinkedAccountAuthorizationKey;

/**
 * The payload for importing an Apple account.
 */
export interface LinkedAccountAppleInput {
  subject: string;

  type: 'apple_oauth';

  email?: string;
}

/**
 * An Apple OAuth account linked to the user.
 */
export interface LinkedAccountAppleOAuth {
  email: string | null;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  subject: string;

  type: 'apple_oauth';

  verified_at: number;
}

/**
 * An authorization key linked to the user.
 */
export interface LinkedAccountAuthorizationKey {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  public_key: string;

  type: 'authorization_key';

  verified_at: number;
}

/**
 * Base schema for wallet accounts linked to the user.
 */
export interface LinkedAccountBaseWallet {
  address: string;

  chain_type: 'solana' | 'ethereum';

  type: 'wallet' | 'smart_wallet';
}

/**
 * A Bitcoin SegWit embedded wallet account linked to the user.
 */
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

  /**
   * The method used to recover an embedded wallet account.
   */
  recovery_method: EmbeddedWalletRecoveryMethod;

  type: 'wallet';

  verified_at: number;

  wallet_client: 'privy';

  wallet_client_type: 'privy';

  wallet_index: number;
}

/**
 * A Bitcoin Taproot embedded wallet account linked to the user.
 */
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

  /**
   * The method used to recover an embedded wallet account.
   */
  recovery_method: EmbeddedWalletRecoveryMethod;

  type: 'wallet';

  verified_at: number;

  wallet_client: 'privy';

  wallet_client_type: 'privy';

  wallet_index: number;
}

/**
 * A cross-app account linked to the user.
 */
export interface LinkedAccountCrossApp {
  embedded_wallets: Array<CrossAppEmbeddedWallet>;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  provider_app_id: string;

  smart_wallets: Array<CrossAppSmartWallet>;

  subject: string;

  type: 'cross_app';

  verified_at: number;
}

/**
 * A curve signing embedded wallet account linked to the user.
 */
export interface LinkedAccountCurveSigningEmbeddedWallet {
  id: string | null;

  address: string;

  chain_id: string;

  /**
   * The wallet chain types that support curve-based signing.
   */
  chain_type: WalletsAPI.CurveSigningChainType;

  connector_type: 'embedded';

  delegated: boolean;

  first_verified_at: number | null;

  imported: boolean;

  latest_verified_at: number | null;

  public_key: string;

  /**
   * The method used to recover an embedded wallet account.
   */
  recovery_method: EmbeddedWalletRecoveryMethod;

  type: 'wallet';

  verified_at: number;

  wallet_client: 'privy';

  wallet_client_type: 'privy';

  wallet_index: number;
}

/**
 * The payload for importing a Custom JWT account.
 */
export interface LinkedAccountCustomJwtInput {
  custom_user_id: string;

  type: 'custom_auth';
}

/**
 * A custom JWT account linked to the user.
 */
export interface LinkedAccountCustomJwt {
  custom_user_id: string;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  type: 'custom_auth';

  verified_at: number;
}

/**
 * A custom OAuth account linked to the user.
 */
export interface LinkedAccountCustomOAuth {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  subject: string;

  /**
   * The ID of a custom OAuth provider, set up for this app. Must start with
   * "custom:".
   */
  type: ClientAuthAPI.CustomOAuthProviderID;

  verified_at: number;

  email?: string;

  name?: string;

  profile_picture_url?: string;

  username?: string;
}

/**
 * The payload for importing a Discord account.
 */
export interface LinkedAccountDiscordInput {
  subject: string;

  type: 'discord_oauth';

  username: string;

  email?: string;
}

/**
 * A Discord OAuth account linked to the user.
 */
export interface LinkedAccountDiscordOAuth {
  email: string | null;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  subject: string;

  type: 'discord_oauth';

  username: string | null;

  verified_at: number;
}

/**
 * An email account linked to the user.
 */
export interface LinkedAccountEmail {
  address: string;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  type: 'email';

  verified_at: number;
}

/**
 * The payload for importing an email account.
 */
export interface LinkedAccountEmailInput {
  address: string;

  type: 'email';
}

/**
 * A linked embedded wallet account across all supported chain types.
 */
export type LinkedAccountEmbeddedWallet =
  | LinkedAccountEthereumEmbeddedWallet
  | LinkedAccountSolanaEmbeddedWallet
  | LinkedAccountBitcoinSegwitEmbeddedWallet
  | LinkedAccountBitcoinTaprootEmbeddedWallet
  | LinkedAccountCurveSigningEmbeddedWallet;

/**
 * An embedded wallet account with an ID.
 */
export type LinkedAccountEmbeddedWalletWithID =
  | LinkedAccountEmbeddedWalletWithID.LinkedAccountEthereumEmbeddedWallet
  | LinkedAccountEmbeddedWalletWithID.LinkedAccountSolanaEmbeddedWallet
  | LinkedAccountEmbeddedWalletWithID.LinkedAccountBitcoinSegwitEmbeddedWallet
  | LinkedAccountEmbeddedWalletWithID.LinkedAccountBitcoinTaprootEmbeddedWallet
  | LinkedAccountEmbeddedWalletWithID.LinkedAccountCurveSigningEmbeddedWallet;

export namespace LinkedAccountEmbeddedWalletWithID {
  /**
   * An Ethereum embedded wallet account linked to the user.
   */
  export interface LinkedAccountEthereumEmbeddedWallet
    extends Omit<UsersAPI.LinkedAccountEthereumEmbeddedWallet, 'id' | 'recovery_method'> {
    id: string;

    recovery_method: 'privy-v2';
  }

  /**
   * A Solana embedded wallet account linked to the user.
   */
  export interface LinkedAccountSolanaEmbeddedWallet
    extends Omit<UsersAPI.LinkedAccountSolanaEmbeddedWallet, 'id' | 'recovery_method'> {
    id: string;

    recovery_method: 'privy-v2';
  }

  /**
   * A Bitcoin SegWit embedded wallet account linked to the user.
   */
  export interface LinkedAccountBitcoinSegwitEmbeddedWallet
    extends Omit<UsersAPI.LinkedAccountBitcoinSegwitEmbeddedWallet, 'id' | 'recovery_method'> {
    id: string;

    recovery_method: 'privy-v2';
  }

  /**
   * A Bitcoin Taproot embedded wallet account linked to the user.
   */
  export interface LinkedAccountBitcoinTaprootEmbeddedWallet
    extends Omit<UsersAPI.LinkedAccountBitcoinTaprootEmbeddedWallet, 'id' | 'recovery_method'> {
    id: string;

    recovery_method: 'privy-v2';
  }

  /**
   * A curve signing embedded wallet account linked to the user.
   */
  export interface LinkedAccountCurveSigningEmbeddedWallet
    extends Omit<UsersAPI.LinkedAccountCurveSigningEmbeddedWallet, 'id' | 'recovery_method'> {
    id: string;

    recovery_method: 'privy-v2';
  }
}

/**
 * An Ethereum wallet account linked to the user.
 */
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

/**
 * An Ethereum embedded wallet account linked to the user.
 */
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

  /**
   * The method used to recover an embedded wallet account.
   */
  recovery_method: EmbeddedWalletRecoveryMethod;

  type: 'wallet';

  verified_at: number;

  wallet_client: 'privy';

  wallet_client_type: 'privy';

  wallet_index: number;
}

/**
 * A Farcaster account linked to the user.
 */
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

/**
 * The payload for importing a Farcaster account.
 */
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

/**
 * The payload for importing a Github account.
 */
export interface LinkedAccountGitHubInput {
  subject: string;

  type: 'github_oauth';

  username: string;

  email?: string;

  name?: string;
}

/**
 * A GitHub OAuth account linked to the user.
 */
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

/**
 * The payload for importing a Google account.
 */
export interface LinkedAccountGoogleInput {
  email: string;

  name: string;

  subject: string;

  type: 'google_oauth';
}

/**
 * A Google OAuth account linked to the user.
 */
export interface LinkedAccountGoogleOAuth {
  email: string;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  name: string | null;

  subject: string;

  type: 'google_oauth';

  verified_at: number;
}

/**
 * The input for adding a linked account to a user.
 */
export type LinkedAccountInput =
  | LinkedAccountWalletInput
  | LinkedAccountEmailInput
  | LinkedAccountPhoneInput
  | LinkedAccountGoogleInput
  | LinkedAccountTwitterInput
  | LinkedAccountDiscordInput
  | LinkedAccountGitHubInput
  | LinkedAccountSpotifyInput
  | LinkedAccountInstagramInput
  | LinkedAccountTiktokInput
  | LinkedAccountLineInput
  | LinkedAccountTwitchInput
  | LinkedAccountAppleInput
  | LinkedAccountLinkedInInput
  | LinkedAccountFarcasterInput
  | LinkedAccountTelegramInput
  | LinkedAccountCustomJwtInput
  | LinkedAccountPasskeyInput;

/**
 * The payload for importing an Instagram account.
 */
export interface LinkedAccountInstagramInput {
  subject: string;

  type: 'instagram_oauth';

  username: string;
}

/**
 * An Instagram OAuth account linked to the user.
 */
export interface LinkedAccountInstagramOAuth {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  subject: string;

  type: 'instagram_oauth';

  username: string | null;

  verified_at: number;
}

/**
 * The payload for importing a LINE account.
 */
export interface LinkedAccountLineInput {
  subject: string;

  type: 'line_oauth';

  email?: string;

  name?: string;

  profile_picture_url?: string;
}

/**
 * A LINE OAuth account linked to the user.
 */
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

/**
 * The payload for importing a LinkedIn account.
 */
export interface LinkedAccountLinkedInInput {
  subject: string;

  type: 'linkedin_oauth';

  email?: string;

  name?: string;

  vanityName?: string;
}

/**
 * A LinkedIn OAuth account linked to the user.
 */
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

/**
 * A passkey account linked to the user.
 */
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

/**
 * The payload for importing a passkey account.
 */
export interface LinkedAccountPasskeyInput {
  credential_device_type: 'singleDevice' | 'multiDevice';

  credential_id: string;

  credential_public_key: string;

  credential_username: string;

  type: 'passkey';
}

/**
 * A phone number account linked to the user.
 */
export interface LinkedAccountPhone {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  phoneNumber: string;

  type: 'phone';

  verified_at: number;

  number?: string;
}

/**
 * The payload for importing a phone account.
 */
export interface LinkedAccountPhoneInput {
  number: string;

  type: 'phone';
}

/**
 * A smart wallet account linked to the user.
 */
export interface LinkedAccountSmartWallet {
  address: string;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  /**
   * The supported smart wallet providers.
   */
  smart_wallet_type: EmbeddedWalletsAPI.SmartWalletType;

  type: 'smart_wallet';

  verified_at: number;

  smart_wallet_version?: string;
}

/**
 * A Solana wallet account linked to the user.
 */
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

/**
 * A Solana embedded wallet account linked to the user.
 */
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

  /**
   * The method used to recover an embedded wallet account.
   */
  recovery_method: EmbeddedWalletRecoveryMethod;

  type: 'wallet';

  verified_at: number;

  wallet_client: 'privy';

  wallet_client_type: 'privy';

  wallet_index: number;
}

/**
 * The payload for importing a Spotify account.
 */
export interface LinkedAccountSpotifyInput {
  subject: string;

  type: 'spotify_oauth';

  email?: string;

  name?: string;
}

/**
 * A Spotify OAuth account linked to the user.
 */
export interface LinkedAccountSpotifyOAuth {
  email: string | null;

  first_verified_at: number | null;

  latest_verified_at: number | null;

  name: string | null;

  subject: string;

  type: 'spotify_oauth';

  verified_at: number;
}

/**
 * A Telegram account linked to the user.
 */
export interface LinkedAccountTelegram {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  telegram_user_id: string;

  type: 'telegram';

  verified_at: number;

  first_name?: string | null;

  last_name?: string | null;

  photo_url?: string | null;

  username?: string | null;
}

/**
 * The payload for importing a Telegram account.
 */
export interface LinkedAccountTelegramInput {
  telegram_user_id: string;

  type: 'telegram';

  first_name?: string;

  last_name?: string;

  photo_url?: string;

  username?: string;
}

/**
 * The payload for importing a Tiktok account.
 */
export interface LinkedAccountTiktokInput {
  name: string | null;

  subject: string;

  type: 'tiktok_oauth';

  username: string;
}

/**
 * A TikTok OAuth account linked to the user.
 */
export interface LinkedAccountTiktokOAuth {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  name: string | null;

  subject: string;

  type: 'tiktok_oauth';

  username: string | null;

  verified_at: number;
}

/**
 * The payload for importing a Twitch account.
 */
export interface LinkedAccountTwitchInput {
  subject: string;

  type: 'twitch_oauth';

  username?: string;
}

/**
 * A Twitch OAuth account linked to the user.
 */
export interface LinkedAccountTwitchOAuth {
  first_verified_at: number | null;

  latest_verified_at: number | null;

  subject: string;

  type: 'twitch_oauth';

  username: string | null;

  verified_at: number;
}

/**
 * The payload for importing a Twitter account.
 */
export interface LinkedAccountTwitterInput {
  name: string;

  subject: string;

  type: 'twitter_oauth';

  username: string;

  profile_picture_url?: string;
}

/**
 * A Twitter OAuth account linked to the user.
 */
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

/**
 * The possible types of linked accounts.
 */
export type LinkedAccountType =
  | 'email'
  | 'phone'
  | 'wallet'
  | 'smart_wallet'
  | 'google_oauth'
  | 'twitter_oauth'
  | 'discord_oauth'
  | 'github_oauth'
  | 'spotify_oauth'
  | 'instagram_oauth'
  | 'tiktok_oauth'
  | 'line_oauth'
  | 'twitch_oauth'
  | 'linkedin_oauth'
  | 'apple_oauth'
  | 'custom_auth'
  | 'farcaster'
  | 'passkey'
  | 'telegram'
  | 'cross_app'
  | 'authorization_key'
  | ClientAuthAPI.CustomOAuthProviderID;

/**
 * The payload for importing a wallet account.
 */
export interface LinkedAccountWalletInput {
  address: string;

  chain_type: 'ethereum' | 'solana';

  type: 'wallet';
}

/**
 * A multi-factor authentication method linked to the user.
 */
export type LinkedMfaMethod = SMSMfaMethod | TotpMfaMethod | PasskeyMfaMethod;

/**
 * OAuth tokens associated with the user.
 */
export interface OAuthTokens {
  access_token: string;

  provider: string;

  access_token_expires_in_seconds?: number;

  refresh_token?: string;

  refresh_token_expires_in_seconds?: number;

  scopes?: Array<string>;
}

/**
 * A Passkey MFA method.
 */
export interface PasskeyMfaMethod {
  type: 'passkey';

  verified_at: number;
}

/**
 * The payload for partially updating custom metadata on a user.
 */
export interface PatchUsersCustomMetadata {
  /**
   * Custom metadata associated with the user.
   */
  custom_metadata: CustomMetadata;
}

/**
 * A SMS MFA method.
 */
export interface SMSMfaMethod {
  type: 'sms';

  verified_at: number;
}

/**
 * A TOTP MFA method.
 */
export interface TotpMfaMethod {
  type: 'totp';

  verified_at: number;
}

/**
 * A Privy user object.
 */
export interface User {
  id: string;

  /**
   * Unix timestamp of when the user was created in seconds.
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

  linked_accounts: Array<LinkedAccount>;

  mfa_methods: Array<LinkedMfaMethod>;

  /**
   * Custom metadata associated with the user.
   */
  custom_metadata?: CustomMetadata;
}

/**
 * The payload for batch creating users.
 */
export interface UserBatchCreateInput {
  users: Array<UserBatchCreateInput.User>;
}

export namespace UserBatchCreateInput {
  export interface User {
    linked_accounts: Array<UsersAPI.LinkedAccountInput>;

    create_embedded_wallet?: boolean;

    create_ethereum_smart_wallet?: boolean;

    create_ethereum_wallet?: boolean;

    create_n_embedded_wallets?: number;

    create_n_ethereum_wallets?: number;

    create_solana_wallet?: boolean;

    /**
     * Custom metadata associated with the user.
     */
    custom_metadata?: UsersAPI.CustomMetadata;

    /**
     * Wallets to create.
     */
    wallets?: Array<EmbeddedWalletsAPI.WalletCreationInput>;
  }
}

/**
 * The user object along their identity token.
 */
export interface UserWithIdentityToken {
  identity_token: string | null;

  /**
   * A Privy user object.
   */
  user: User;
}

export interface UserCreateParams {
  linked_accounts: Array<LinkedAccountInput>;

  /**
   * Custom metadata associated with the user.
   */
  custom_metadata?: CustomMetadata;

  /**
   * Wallets to create for the user.
   */
  wallets?: Array<UserCreateParams.Wallet>;
}

export namespace UserCreateParams {
  export interface Wallet {
    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

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
       * A unique identifier for a key quorum.
       */
      signer_id: SharedAPI.KeyQuorumID;

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

export interface UserGetByCustomAuthIDParams {
  custom_user_id: string;
}

export interface UserGetByDiscordUsernameParams {
  username: string;
}

export interface UserGetByEmailAddressParams {
  address: string;
}

export interface UserGetByFarcasterIDParams {
  fid: number;
}

export interface UserGetByGitHubUsernameParams {
  username: string;
}

export interface UserGetByPhoneNumberParams {
  number: string;
}

export interface UserGetBySmartWalletAddressParams {
  address: string;
}

export interface UserGetByTelegramUserIDParams {
  telegram_user_id: string;
}

export interface UserGetByTelegramUsernameParams {
  username: string;
}

export interface UserGetByTwitterSubjectParams {
  subject: string;
}

export interface UserGetByTwitterUsernameParams {
  username: string;
}

export interface UserGetByWalletAddressParams {
  address: string;
}

export interface UserPregenerateWalletsParams {
  wallets: Array<EmbeddedWalletsAPI.WalletCreationInput>;
}

export type UserSearchParams = UserSearchParams.Variant0 | UserSearchParams.Variant1;

export declare namespace UserSearchParams {
  export interface Variant0 {
    searchTerm: string;
  }

  export interface Variant1 {
    emails: Array<string>;

    phoneNumbers: Array<string>;

    walletAddresses: Array<string>;
  }
}

export interface UserSetCustomMetadataParams {
  /**
   * Custom metadata associated with the user.
   */
  custom_metadata: CustomMetadata;
}

export interface UserUnlinkLinkedAccountParams {
  handle: string;

  /**
   * The possible types of linked accounts.
   */
  type: LinkedAccountType;

  provider?: string;
}

export declare namespace Users {
  export {
    type AuthenticatedUser as AuthenticatedUser,
    type CrossAppEmbeddedWallet as CrossAppEmbeddedWallet,
    type CrossAppSmartWallet as CrossAppSmartWallet,
    type CustomMetadata as CustomMetadata,
    type EmbeddedWalletRecoveryMethod as EmbeddedWalletRecoveryMethod,
    type LinkedAccount as LinkedAccount,
    type LinkedAccountAppleInput as LinkedAccountAppleInput,
    type LinkedAccountAppleOAuth as LinkedAccountAppleOAuth,
    type LinkedAccountAuthorizationKey as LinkedAccountAuthorizationKey,
    type LinkedAccountBaseWallet as LinkedAccountBaseWallet,
    type LinkedAccountBitcoinSegwitEmbeddedWallet as LinkedAccountBitcoinSegwitEmbeddedWallet,
    type LinkedAccountBitcoinTaprootEmbeddedWallet as LinkedAccountBitcoinTaprootEmbeddedWallet,
    type LinkedAccountCrossApp as LinkedAccountCrossApp,
    type LinkedAccountCurveSigningEmbeddedWallet as LinkedAccountCurveSigningEmbeddedWallet,
    type LinkedAccountCustomJwtInput as LinkedAccountCustomJwtInput,
    type LinkedAccountCustomJwt as LinkedAccountCustomJwt,
    type LinkedAccountCustomOAuth as LinkedAccountCustomOAuth,
    type LinkedAccountDiscordInput as LinkedAccountDiscordInput,
    type LinkedAccountDiscordOAuth as LinkedAccountDiscordOAuth,
    type LinkedAccountEmail as LinkedAccountEmail,
    type LinkedAccountEmailInput as LinkedAccountEmailInput,
    type LinkedAccountEmbeddedWallet as LinkedAccountEmbeddedWallet,
    type LinkedAccountEmbeddedWalletWithID as LinkedAccountEmbeddedWalletWithID,
    type LinkedAccountEthereum as LinkedAccountEthereum,
    type LinkedAccountEthereumEmbeddedWallet as LinkedAccountEthereumEmbeddedWallet,
    type LinkedAccountFarcaster as LinkedAccountFarcaster,
    type LinkedAccountFarcasterInput as LinkedAccountFarcasterInput,
    type LinkedAccountGitHubInput as LinkedAccountGitHubInput,
    type LinkedAccountGitHubOAuth as LinkedAccountGitHubOAuth,
    type LinkedAccountGoogleInput as LinkedAccountGoogleInput,
    type LinkedAccountGoogleOAuth as LinkedAccountGoogleOAuth,
    type LinkedAccountInput as LinkedAccountInput,
    type LinkedAccountInstagramInput as LinkedAccountInstagramInput,
    type LinkedAccountInstagramOAuth as LinkedAccountInstagramOAuth,
    type LinkedAccountLineInput as LinkedAccountLineInput,
    type LinkedAccountLineOAuth as LinkedAccountLineOAuth,
    type LinkedAccountLinkedInInput as LinkedAccountLinkedInInput,
    type LinkedAccountLinkedInOAuth as LinkedAccountLinkedInOAuth,
    type LinkedAccountPasskey as LinkedAccountPasskey,
    type LinkedAccountPasskeyInput as LinkedAccountPasskeyInput,
    type LinkedAccountPhone as LinkedAccountPhone,
    type LinkedAccountPhoneInput as LinkedAccountPhoneInput,
    type LinkedAccountSmartWallet as LinkedAccountSmartWallet,
    type LinkedAccountSolana as LinkedAccountSolana,
    type LinkedAccountSolanaEmbeddedWallet as LinkedAccountSolanaEmbeddedWallet,
    type LinkedAccountSpotifyInput as LinkedAccountSpotifyInput,
    type LinkedAccountSpotifyOAuth as LinkedAccountSpotifyOAuth,
    type LinkedAccountTelegram as LinkedAccountTelegram,
    type LinkedAccountTelegramInput as LinkedAccountTelegramInput,
    type LinkedAccountTiktokInput as LinkedAccountTiktokInput,
    type LinkedAccountTiktokOAuth as LinkedAccountTiktokOAuth,
    type LinkedAccountTwitchInput as LinkedAccountTwitchInput,
    type LinkedAccountTwitchOAuth as LinkedAccountTwitchOAuth,
    type LinkedAccountTwitterInput as LinkedAccountTwitterInput,
    type LinkedAccountTwitterOAuth as LinkedAccountTwitterOAuth,
    type LinkedAccountType as LinkedAccountType,
    type LinkedAccountWalletInput as LinkedAccountWalletInput,
    type LinkedMfaMethod as LinkedMfaMethod,
    type OAuthTokens as OAuthTokens,
    type PasskeyMfaMethod as PasskeyMfaMethod,
    type PatchUsersCustomMetadata as PatchUsersCustomMetadata,
    type SMSMfaMethod as SMSMfaMethod,
    type TotpMfaMethod as TotpMfaMethod,
    type User as User,
    type UserBatchCreateInput as UserBatchCreateInput,
    type UserWithIdentityToken as UserWithIdentityToken,
    type UsersCursor as UsersCursor,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
    type UserGetByCustomAuthIDParams as UserGetByCustomAuthIDParams,
    type UserGetByDiscordUsernameParams as UserGetByDiscordUsernameParams,
    type UserGetByEmailAddressParams as UserGetByEmailAddressParams,
    type UserGetByFarcasterIDParams as UserGetByFarcasterIDParams,
    type UserGetByGitHubUsernameParams as UserGetByGitHubUsernameParams,
    type UserGetByPhoneNumberParams as UserGetByPhoneNumberParams,
    type UserGetBySmartWalletAddressParams as UserGetBySmartWalletAddressParams,
    type UserGetByTelegramUserIDParams as UserGetByTelegramUserIDParams,
    type UserGetByTelegramUsernameParams as UserGetByTelegramUsernameParams,
    type UserGetByTwitterSubjectParams as UserGetByTwitterSubjectParams,
    type UserGetByTwitterUsernameParams as UserGetByTwitterUsernameParams,
    type UserGetByWalletAddressParams as UserGetByWalletAddressParams,
    type UserPregenerateWalletsParams as UserPregenerateWalletsParams,
    type UserSearchParams as UserSearchParams,
    type UserSetCustomMetadataParams as UserSetCustomMetadataParams,
    type UserUnlinkLinkedAccountParams as UserUnlinkLinkedAccountParams,
  };
}
