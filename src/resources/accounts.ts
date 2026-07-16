// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import * as WalletsAPI from './wallets/wallets';

export class Accounts extends APIResource {}

/**
 * Query parameters for the account balance endpoint.
 */
export interface AccountBalanceParams {
  /**
   * When set to true, returns balances from testnet chains instead of mainnets.
   */
  testnet_mode?: ChainTestnetMode;
}

/**
 * The balance of a digital asset account, aggregated across all wallets and
 * supported chains.
 */
export interface AccountBalanceResponse {
  /**
   * The individual asset balances, each computed across all supported chains.
   */
  assets: Array<BalanceAsset>;

  /**
   * A monetary value with its currency denomination.
   */
  total: SharedAPI.CurrencyAmount;

  /**
   * Individual asset balances per chain.
   */
  assets_by_chain?: Array<BalanceAssetByChain>;
}

/**
 * An optional display name for the account.
 */
export type AccountDisplayName = string;

/**
 * A digital asset account that groups wallets under a single entity.
 */
export interface AccountResponse {
  /**
   * The account ID.
   */
  id: string;

  /**
   * An optional display name for the account.
   */
  display_name: string | null;

  /**
   * The wallets belonging to this account.
   */
  wallets: Array<AccountWallet>;
}

/**
 * A wallet belonging to a digital asset account.
 */
export interface AccountWallet {
  /**
   * The wallet ID.
   */
  id: string;

  /**
   * The on-chain address of the wallet.
   */
  address: string;

  /**
   * The wallet chain types that offer first class support.
   */
  chain_type: WalletsAPI.FirstClassChainType;

  /**
   * Information about the custodian managing this wallet.
   */
  custody?: WalletsAPI.WalletCustodian;
}

/**
 * Configuration for a wallet to create within an account.
 */
export interface AccountWalletConfigurationItem {
  /**
   * The wallet chain types that offer first class support.
   */
  chain_type: WalletsAPI.FirstClassChainType;

  /**
   * Information about the custodian managing this wallet.
   */
  custody?: WalletsAPI.WalletCustodian;
}

/**
 * IDs for wallets to include in this account.
 */
export type AccountWalletIDs = Array<string>;

/**
 * Configuration for the wallets on this account.
 */
export type AccountWalletsConfiguration = Array<AccountWalletConfigurationItem>;

/**
 * Paginated list of digital asset accounts for the dashboard.
 */
export interface AccountsDashboardListResponse {
  /**
   * The list of accounts, with balances included for dashboard display.
   */
  data: Array<AssetAccountWithBalance>;

  /**
   * Cursor for fetching the next page of results, or null if no more results.
   */
  next_cursor: string | null;
}

/**
 * Paginated list of digital asset accounts.
 */
export interface AccountsListResponse {
  /**
   * The list of accounts.
   */
  data: Array<AccountResponse>;

  /**
   * Cursor for fetching the next page of results, or null if no more results.
   */
  next_cursor: string | null;
}

/**
 * A digital asset account with its aggregated balance across all wallets and
 * chains.
 */
export interface AssetAccountWithBalance {
  /**
   * The account ID.
   */
  id: string;

  /**
   * Balances for an asset account or wallet
   */
  balance: BalanceResponse;

  /**
   * An optional display name for the account.
   */
  display_name: string | null;

  /**
   * The wallets belonging to this account.
   */
  wallets: Array<AccountWallet>;
}

/**
 * A single asset entry in a balance, representing holdings across all supported
 * chains.
 */
export interface BalanceAsset {
  /**
   * The amount of the asset held, denominated in the unit of the asset itself, with
   * 1 decimal of precision.
   */
  amount: string;

  /**
   * A monetary value with its currency denomination.
   */
  price: SharedAPI.CurrencyAmount;

  /**
   * The symbol of the asset (e.g. USDC, ETH).
   */
  symbol: string;
}

/**
 * A single asset entry scoped to a specific chain.
 */
export interface BalanceAssetByChain {
  /**
   * The amount of the asset held on this chain, denominated in the unit of the asset
   * itself.
   */
  amount: string;

  /**
   * The CAIP-2 chain identifier (e.g. eip155:4217 for Tempo, eip155:8453 for Base).
   */
  chain_id: string;

  /**
   * A monetary value with its currency denomination.
   */
  price: SharedAPI.CurrencyAmount;

  /**
   * The symbol of the asset (e.g. USDC, ETH).
   */
  symbol: string;
}

/**
 * Balances for an asset account or wallet
 */
export interface BalanceResponse {
  /**
   * The individual asset balances, each computed across all supported chains.
   */
  assets: Array<BalanceAsset>;

  /**
   * A monetary value with its currency denomination.
   */
  total: SharedAPI.CurrencyAmount;

  /**
   * Individual asset balances per chain.
   */
  assets_by_chain?: Array<BalanceAssetByChain>;
}

/**
 * When set to true, returns balances from testnet chains instead of mainnets.
 */
export type ChainTestnetMode = 'true' | 'false';

/**
 * Input for creating a digital asset account from existing wallets with a
 * `wallet_ids` parameter.
 */
export interface CreateAccountFromWalletIDsInput {
  /**
   * IDs for wallets to include in this account.
   */
  wallet_ids: AccountWalletIDs;

  /**
   * An optional display name for the account.
   */
  display_name?: AccountDisplayName;
}

/**
 * Input for creating a digital asset account from new wallets with a
 * `wallets_configuration` specification.
 */
export interface CreateAccountFromWalletsConfigurationInput {
  /**
   * Configuration for the wallets on this account.
   */
  wallets_configuration: AccountWalletsConfiguration;

  /**
   * An optional display name for the account.
   */
  display_name?: AccountDisplayName;
}

/**
 * Input for creating a digital asset account.
 */
export type CreateAccountInput = CreateAccountFromWalletsConfigurationInput | CreateAccountFromWalletIDsInput;

/**
 * Input for updating a digital asset account by adding existing wallets with a
 * `wallet_ids` parameter.
 */
export interface UpdateAccountFromWalletIDsInput {
  /**
   * IDs for wallets to include in this account.
   */
  wallet_ids: AccountWalletIDs;

  /**
   * An optional display name for the account.
   */
  display_name?: AccountDisplayName;
}

/**
 * Input for updating a digital asset account with a `wallets_configuration`
 * specification.
 */
export interface UpdateAccountFromWalletsConfigurationInput {
  /**
   * An optional display name for the account.
   */
  display_name?: AccountDisplayName;

  /**
   * Configuration for the wallets on this account.
   */
  wallets_configuration?: AccountWalletsConfiguration;
}

/**
 * Input for updating a digital asset account.
 */
export type UpdateAccountInput = UpdateAccountFromWalletsConfigurationInput | UpdateAccountFromWalletIDsInput;

export declare namespace Accounts {
  export {
    type AccountBalanceParams as AccountBalanceParams,
    type AccountBalanceResponse as AccountBalanceResponse,
    type AccountDisplayName as AccountDisplayName,
    type AccountResponse as AccountResponse,
    type AccountWallet as AccountWallet,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type AccountWalletIDs as AccountWalletIDs,
    type AccountWalletsConfiguration as AccountWalletsConfiguration,
    type AccountsDashboardListResponse as AccountsDashboardListResponse,
    type AccountsListResponse as AccountsListResponse,
    type AssetAccountWithBalance as AssetAccountWithBalance,
    type BalanceAsset as BalanceAsset,
    type BalanceAssetByChain as BalanceAssetByChain,
    type BalanceResponse as BalanceResponse,
    type ChainTestnetMode as ChainTestnetMode,
    type CreateAccountFromWalletIDsInput as CreateAccountFromWalletIDsInput,
    type CreateAccountFromWalletsConfigurationInput as CreateAccountFromWalletsConfigurationInput,
    type CreateAccountInput as CreateAccountInput,
    type UpdateAccountFromWalletIDsInput as UpdateAccountFromWalletIDsInput,
    type UpdateAccountFromWalletsConfigurationInput as UpdateAccountFromWalletsConfigurationInput,
    type UpdateAccountInput as UpdateAccountInput,
  };
}
