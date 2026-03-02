// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WalletsAPI from './wallets/wallets';

export class Accounts extends APIResource {}

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
 * Input for creating a digital asset account.
 */
export interface CreateAccountInput {
  /**
   * Configuration for wallets to create.
   */
  wallets_configuration: Array<AccountWalletConfigurationItem>;

  /**
   * An optional display name for the account.
   */
  display_name?: string;
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

export declare namespace Accounts {
  export {
    type AccountWallet as AccountWallet,
    type AccountResponse as AccountResponse,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type CreateAccountInput as CreateAccountInput,
    type AccountsListResponse as AccountsListResponse,
  };
}
