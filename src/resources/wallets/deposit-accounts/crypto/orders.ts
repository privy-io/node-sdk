// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as WalletsAPI from '../../wallets';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * Operations related to wallets
 */
export class Orders extends APIResource {
  /**
   * Fetch a crypto deposit-account sweep by wallet action ID. Returns
   * `{id, status}`. The path wallet is the destination (same as create). Accepts an
   * app secret or a user / wallet-signer JWT (`privy-app-id`).
   *
   * @example
   * ```ts
   * const getCryptoDepositAccountOrderResponse =
   *   await client.wallets.depositAccounts.crypto.orders.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { wallet_id: 'wallet_id' },
   *   );
   * ```
   */
  get(
    orderID: string,
    params: OrderGetParams,
    options?: RequestOptions,
  ): APIPromise<WalletsAPI.GetCryptoDepositAccountOrderResponse> {
    const { wallet_id } = params;
    return this._client.get(
      path`/v1/wallets/${wallet_id}/deposit_accounts/crypto/orders/${orderID}`,
      options,
    );
  }
}

export interface OrderGetParams {
  /**
   * ID of the wallet.
   */
  wallet_id: string;
}

export declare namespace Orders {
  export { type OrderGetParams as OrderGetParams };
}
