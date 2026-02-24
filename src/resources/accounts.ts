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
   * The custodian responsible for the wallet. Undefined for self-custodial wallets.
   */
  custodian?: string;
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
export type AccountWalletConfigurationItem =
  | AccountWalletConfigurationItem.ChainType
  | AccountWalletConfigurationItem.UnionMember1;

export namespace AccountWalletConfigurationItem {
  export interface ChainType {
    /**
     * The wallet chain types that offer first class support.
     */
    chain_type: WalletsAPI.FirstClassChainType;
  }

  export interface UnionMember1 {
    /**
     * The wallet chain types that offer first class support.
     */
    chain_type: WalletsAPI.FirstClassChainType;

    /**
     * The custodian for the wallet. Must match a configured licensing provider.
     */
    custodian: string;

    /**
     * The resource ID of the beneficiary of the custodial wallet, given by the
     * licensing provider.
     */
    provider_user_id: string;
  }
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

export declare namespace Accounts {
  export {
    type AccountWallet as AccountWallet,
    type AccountResponse as AccountResponse,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type CreateAccountInput as CreateAccountInput,
  };
}
