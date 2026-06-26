// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as ActionsAPI from '../../actions';
import * as IncentiveAPI from './incentive';
import { Incentive, IncentiveClaimParams } from './incentive';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Ethereum extends APIResource {
  incentive: IncentiveAPI.Incentive = new IncentiveAPI.Incentive(this._client);

  /**
   * Deposit assets into an ERC-4626 vault.
   *
   * @example
   * ```ts
   * const earnDepositActionResponse =
   *   await client.wallets.earn.ethereum._deposit('wallet_id', {
   *     vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
   *     amount: '1.5',
   *   });
   * ```
   */
  _deposit(
    walletID: string,
    params: EthereumDepositParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.EarnDepositActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/deposit`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
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
   *   await client.wallets.earn.ethereum._withdraw(
   *     'wallet_id',
   *     {
   *       vault_id: 'cm7oxq1el000e11o8iwp7d0d0',
   *       amount: '1.5',
   *     },
   *   );
   * ```
   */
  _withdraw(
    walletID: string,
    params: EthereumWithdrawParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.EarnWithdrawActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/withdraw`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }
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

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
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

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

Ethereum.Incentive = Incentive;

export declare namespace Ethereum {
  export {
    type EthereumDepositParams as EthereumDepositParams,
    type EthereumWithdrawParams as EthereumWithdrawParams,
  };

  export { Incentive as Incentive, type IncentiveClaimParams as IncentiveClaimParams };
}
