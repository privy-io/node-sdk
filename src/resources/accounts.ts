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

  balance: AssetAccountWithBalance.Balance;

  /**
   * An optional display name for the account.
   */
  display_name: string | null;

  /**
   * The wallets belonging to this account.
   */
  wallets: Array<AccountWallet>;
}

export namespace AssetAccountWithBalance {
  export interface Balance {
    /**
     * The individual asset balances, each computed across all supported chains.
     */
    assets: Array<Balance.Asset>;

    /**
     * The total balance across all assets.
     */
    total: Balance.Total;
  }

  export namespace Balance {
    export interface Asset {
      /**
       * The amount of the asset held, denominated in the unit of the asset itself, with
       * 1 decimal of precision.
       */
      amount: string;

      /**
       * The price of the asset in the provided currency.
       */
      price: Asset.Price;

      /**
       * The symbol of the asset (e.g. USDC, ETH).
       */
      symbol: string;
    }

    export namespace Asset {
      /**
       * The price of the asset in the provided currency.
       */
      export interface Price {
        /**
         * The currency code.
         */
        currency: 'usd';

        /**
         * The monetary value as a string.
         */
        value: string;
      }
    }

    /**
     * The total balance across all assets.
     */
    export interface Total {
      /**
       * The currency code.
       */
      currency: 'usd';

      /**
       * The monetary value as a string.
       */
      value: string;
    }
  }
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
  assets: Array<AccountBalanceResponse.Asset>;

  /**
   * The total balance across all assets.
   */
  total: AccountBalanceResponse.Total;
}

export namespace AccountBalanceResponse {
  export interface Asset {
    /**
     * The amount of the asset held, denominated in the unit of the asset itself, with
     * 1 decimal of precision.
     */
    amount: string;

    /**
     * The price of the asset in the provided currency.
     */
    price: Asset.Price;

    /**
     * The symbol of the asset (e.g. USDC, ETH).
     */
    symbol: string;
  }

  export namespace Asset {
    /**
     * The price of the asset in the provided currency.
     */
    export interface Price {
      /**
       * The currency code.
       */
      currency: 'usd';

      /**
       * The monetary value as a string.
       */
      value: string;
    }
  }

  /**
   * The total balance across all assets.
   */
  export interface Total {
    /**
     * The currency code.
     */
    currency: 'usd';

    /**
     * The monetary value as a string.
     */
    value: string;
  }
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
