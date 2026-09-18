// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as WalletsAPI from '../../wallets';
import { CryptoDepositAddressRoutesCursor } from '../../wallets';
import * as OrdersAPI from './orders';
import { OrderGetParams, Orders } from './orders';
import { APIPromise } from '../../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../../core/pagination';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * Operations related to wallets
 */
export class Crypto extends APIResource {
  orders: OrdersAPI.Orders = new OrdersAPI.Orders(this._client);

  /**
   * Returns active crypto deposit accounts that sweep into the path wallet. Requires
   * an app secret or a JWT for a wallet signer, plus `privy-app-id`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cryptoDepositAddressRoute of client.wallets.depositAccounts.crypto.list(
   *   'wallet_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    walletID: string,
    query: CryptoListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CryptoDepositAddressRoutesCursor, WalletsAPI.CryptoDepositAddressRoute> {
    return this._client.getAPIList(
      path`/v1/wallets/${walletID}/deposit_accounts/crypto`,
      Cursor<WalletsAPI.CryptoDepositAddressRoute>,
      { query, ...options },
    );
  }

  /**
   * Creates deposit source wallets that sweep into the path wallet.
   *
   * @example
   * ```ts
   * const createCryptoDepositAccountResponse =
   *   await client.wallets.depositAccounts.crypto._create(
   *     'wallet_id',
   *     {
   *       deposit_config_id: 'clg2rvssg025ny5fmul5m95fn',
   *       type: 'deposit_config',
   *       deposit_address_strategy: 'dedicated',
   *     },
   *   );
   * ```
   */
  _create(
    walletID: string,
    params: CryptoCreateParams,
    options?: RequestOptions,
  ): APIPromise<WalletsAPI.CreateCryptoDepositAccountResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/deposit_accounts/crypto`, {
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
   * Returns the tokens and chains a user can send from when creating a crypto
   * deposit account.
   *
   * @example
   * ```ts
   * const cryptoDepositAccountConfigResponse =
   *   await client.wallets.depositAccounts.crypto.getConfig();
   * ```
   */
  getConfig(options?: RequestOptions): APIPromise<WalletsAPI.CryptoDepositAccountConfigResponse> {
    return this._client.get('/v1/deposit_accounts/crypto/config', options);
  }
}

export interface CryptoListParams extends CursorParams {}

export type CryptoCreateParams =
  | CryptoCreateParams.CreateCryptoDepositAccountWithConfigRequestBody
  | CryptoCreateParams.CreateCryptoDepositAccountWithRouteRequestBody;

export declare namespace CryptoCreateParams {
  export interface CreateCryptoDepositAccountWithConfigRequestBody {
    /**
     * Body param
     */
    deposit_config_id: string;

    /**
     * Body param
     */
    type: 'deposit_config';

    /**
     * Body param: How deposit source wallets are chosen. Omission uses `dedicated`.
     * Destination reuse applies only to the destination's own chain type.
     */
    deposit_address_strategy?: WalletsAPI.CryptoDepositAddressStrategy;

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

  export interface CreateCryptoDepositAccountWithRouteRequestBody {
    /**
     * Body param: An asset on a chain. Uses a human-readable alias (usdc, tempo) when
     * one is on file, otherwise the raw asset address and CAIP-2.
     */
    destination: WalletsAPI.CryptoDepositAsset;

    /**
     * Body param: Which assets a deposit address accepts. Asset and chain use
     * human-readable aliases when known.
     */
    source: WalletsAPI.CryptoDepositAssetFilter;

    /**
     * Body param
     */
    type: 'inline_route';

    /**
     * Body param: How deposit source wallets are chosen. Omission uses `dedicated`.
     * Destination reuse applies only to the destination's own chain type.
     */
    deposit_address_strategy?: WalletsAPI.CryptoDepositAddressStrategy;

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
}

Crypto.Orders = Orders;

export declare namespace Crypto {
  export { type CryptoListParams as CryptoListParams, type CryptoCreateParams as CryptoCreateParams };

  export { Orders as Orders, type OrderGetParams as OrderGetParams };
}

export { type CryptoDepositAddressRoutesCursor };
