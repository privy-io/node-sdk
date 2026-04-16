// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as WalletActionsAPI from '../../wallet-actions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Ethereum extends APIResource {
  /**
   * Claim incentive rewards for a wallet.
   *
   * @example
   * ```ts
   * const earnIncentiveClaimActionResponse =
   *   await client.wallets.earn.ethereum.claimIncentive(
   *     'wallet_id',
   *     { chain: 'base' },
   *   );
   * ```
   */
  claimIncentive(
    walletID: string,
    params: EthereumClaimIncentiveParams,
    options?: RequestOptions,
  ): APIPromise<WalletActionsAPI.EarnIncentiveClaimActionResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/incentive/claim`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Deposit assets into an ERC-4626 vault.
   *
   * @example
   * ```ts
   * const earnDepositActionResponse =
   *   await client.wallets.earn.ethereum.deposit('wallet_id', {
   *     vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
   *     amount: '1.5',
   *   });
   * ```
   */
  deposit(
    walletID: string,
    params: EthereumDepositParams,
    options?: RequestOptions,
  ): APIPromise<WalletActionsAPI.EarnDepositActionResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/deposit`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Withdraw assets from an ERC-4626 vault.
   *
   * @example
   * ```ts
   * const earnWithdrawActionResponse =
   *   await client.wallets.earn.ethereum.withdraw('wallet_id', {
   *     vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
   *     amount: '1.5',
   *   });
   * ```
   */
  withdraw(
    walletID: string,
    params: EthereumWithdrawParams,
    options?: RequestOptions,
  ): APIPromise<WalletActionsAPI.EarnWithdrawActionResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/withdraw`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface EthereumClaimIncentiveParams {
  /**
   * Body param: The blockchain network on which to perform the incentive claim.
   * Supported chains include: 'ethereum', 'base', 'arbitrum', 'polygon', 'solana',
   * and more, along with their respective testnets.
   */
  chain: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface EthereumDepositParams {
  /**
   * Body param: The ID of the vault to deposit into.
   */
  vault_id: string;

  /**
   * Body param: Human-readable decimal amount to deposit (e.g. "1.5" for 1.5 USDC).
   * Exactly one of `amount` or `raw_amount` must be provided.
   */
  amount?: string;

  /**
   * Body param: Amount in smallest unit to deposit (e.g. "1500000" for 1.5 USDC with
   * 6 decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface EthereumWithdrawParams {
  /**
   * Body param: The ID of the vault to withdraw from.
   */
  vault_id: string;

  /**
   * Body param: Human-readable decimal amount to withdraw (e.g. "1.5" for 1.5 USDC).
   * Exactly one of `amount` or `raw_amount` must be provided.
   */
  amount?: string;

  /**
   * Body param: Amount in smallest unit to withdraw (e.g. "1500000" for 1.5 USDC
   * with 6 decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace Ethereum {
  export {
    type EthereumClaimIncentiveParams as EthereumClaimIncentiveParams,
    type EthereumDepositParams as EthereumDepositParams,
    type EthereumWithdrawParams as EthereumWithdrawParams,
  };
}
