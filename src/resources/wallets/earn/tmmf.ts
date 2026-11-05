// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ActionsAPI from '../actions';
import * as WalletsAPI from '../wallets';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Tmmf extends APIResource {
  /**
   * Sends `deposit_asset` from the registered wallet to the fund provider and tracks
   * delivery of the shares as a wallet action. The wallet owner or signers authorize
   * the request.
   *
   * @example
   * ```ts
   * const tmmfDepositActionResponse =
   *   await client.wallets.earn.tmmf._deposit('wallet_id', {
   *     amount: '1000.00',
   *     chain: 'ethereum_sepolia',
   *     deposit_asset: 'USDC',
   *     fund: 'WTGXX',
   *     order_type: 'secondary',
   *   });
   * ```
   */
  _deposit(
    walletID: string,
    params: TmmfDepositParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TmmfDepositActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/tmmf/deposit`, {
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
   * Sends fund shares from the registered wallet to the fund provider and tracks
   * delivery of `withdraw_asset` as a wallet action. The wallet owner or signers
   * authorize the request.
   *
   * @example
   * ```ts
   * const tmmfWithdrawActionResponse =
   *   await client.wallets.earn.tmmf._withdraw('wallet_id', {
   *     chain: 'ethereum_sepolia',
   *     fund: 'WTGXX',
   *     order_type: 'primary',
   *     shares: '1000.000000',
   *     withdraw_asset: 'USDC',
   *   });
   * ```
   */
  _withdraw(
    walletID: string,
    params: TmmfWithdrawParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TmmfWithdrawActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/tmmf/withdraw`, {
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
   * Returns a page of the wallet's tMMF positions for all providers: shares, their
   * USD value at the latest NAV, pending dividends, and pending orders.
   *
   * @example
   * ```ts
   * const tmmfPositionResponse =
   *   await client.wallets.earn.tmmf.listPositions('wallet_id');
   * ```
   */
  listPositions(
    walletID: string,
    query: TmmfListPositionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TmmfPositionResponse> {
    return this._client.get(path`/v1/wallets/${walletID}/earn/tmmf/positions`, { query, ...options });
  }

  /**
   * Registers the wallet with a tMMF provider on one chain. The provider must have
   * approved the wallet's user, e.g. an organization; the response reports whether
   * it also approved the wallet.
   *
   * @example
   * ```ts
   * const tmmfWalletResponse =
   *   await client.wallets.earn.tmmf.register('wallet_id', {
   *     chain: 'ethereum_sepolia',
   *     provider: 'wisdomtree',
   *   });
   * ```
   */
  register(
    walletID: string,
    body: TmmfRegisterParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TmmfWalletResponse> {
    return this._client.post(path`/v1/wallets/${walletID}/earn/tmmf/register`, { body, ...options });
  }
}

export interface TmmfDepositParams {
  /**
   * Body param: A positive decimal amount in the asset's standard unit, e.g.
   * "1000.00".
   */
  amount: ActionsAPI.TmmfDecimalAmount;

  /**
   * Body param: Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: ActionsAPI.TmmfChain;

  /**
   * Body param: Currency symbol, e.g. "USDC". Case-insensitive.
   */
  deposit_asset: ActionsAPI.TmmfCurrency;

  /**
   * Body param: Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: ActionsAPI.TmmfFund;

  /**
   * Body param: How a tMMF order fills: `secondary` from the provider pool in
   * minutes, or `primary` at the next NAV strike.
   */
  order_type: ActionsAPI.TmmfOrderType;

  /**
   * Body param: Unique caller-generated nonce used to prevent replaying a signed
   * wallet action request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Body param: Developer-provided identifier for this request. Must be unique per
   * app.
   */
  reference_id?: string;

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

export interface TmmfWithdrawParams {
  /**
   * Body param: Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: ActionsAPI.TmmfChain;

  /**
   * Body param: Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: ActionsAPI.TmmfFund;

  /**
   * Body param: How a tMMF order fills: `secondary` from the provider pool in
   * minutes, or `primary` at the next NAV strike.
   */
  order_type: ActionsAPI.TmmfOrderType;

  /**
   * Body param: A positive decimal amount in the asset's standard unit, e.g.
   * "1000.00".
   */
  shares: ActionsAPI.TmmfDecimalAmount;

  /**
   * Body param: Currency symbol, e.g. "USDC". Case-insensitive.
   */
  withdraw_asset: ActionsAPI.TmmfCurrency;

  /**
   * Body param: Unique caller-generated nonce used to prevent replaying a signed
   * wallet action request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Body param: Developer-provided identifier for this request. Must be unique per
   * app.
   */
  reference_id?: string;

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

export interface TmmfListPositionsParams {
  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain?: ActionsAPI.TmmfChain;

  /**
   * Cursor returned by the previous page.
   */
  cursor?: string;

  /**
   * Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund?: ActionsAPI.TmmfFund;

  limit?: number;

  /**
   * The fund provider.
   */
  provider?: ActionsAPI.TmmfProvider;
}

export interface TmmfRegisterParams {
  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: ActionsAPI.TmmfChain;

  /**
   * The fund provider.
   */
  provider: ActionsAPI.TmmfProvider;
}

export declare namespace Tmmf {
  export {
    type TmmfDepositParams as TmmfDepositParams,
    type TmmfWithdrawParams as TmmfWithdrawParams,
    type TmmfListPositionsParams as TmmfListPositionsParams,
    type TmmfRegisterParams as TmmfRegisterParams,
  };
}
