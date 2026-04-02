// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import * as WalletsAPI from './wallets/wallets';

export class Accounts extends APIResource {}

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
   * The CAIP-2 chain identifier (e.g. eip155:8453).
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
 * An optional display name for the account.
 */
export type AccountDisplayName = string;

/**
 * Configuration for the wallets on this account.
 */
export type AccountWalletsConfiguration = Array<AccountWalletConfigurationItem>;

/**
 * Input for creating a digital asset account.
 */
export interface CreateAccountInput {
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
 * Input for updating a digital asset account.
 */
export interface UpdateAccountInput {
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
 * Query parameters for the account balance endpoint.
 */
export interface AccountBalanceParams {
  /**
   * When set to true, returns balances from testnet chains instead of mainnets.
   */
  testnet_mode?: 'true' | 'false';
}

export declare namespace Accounts {
  export {
    type BalanceAsset as BalanceAsset,
    type BalanceAssetByChain as BalanceAssetByChain,
    type BalanceResponse as BalanceResponse,
    type AccountWallet as AccountWallet,
    type AccountResponse as AccountResponse,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type AccountDisplayName as AccountDisplayName,
    type AccountWalletsConfiguration as AccountWalletsConfiguration,
    type CreateAccountInput as CreateAccountInput,
    type UpdateAccountInput as UpdateAccountInput,
    type AccountsListResponse as AccountsListResponse,
    type AssetAccountWithBalance as AssetAccountWithBalance,
    type AccountsDashboardListResponse as AccountsDashboardListResponse,
    type AccountBalanceResponse as AccountBalanceResponse,
    type AccountBalanceParams as AccountBalanceParams,
  };
}
