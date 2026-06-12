// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WalletActionsAPI from '../wallet-actions';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Actions extends APIResource {
  /**
   * Get the current status of a wallet action by its ID. Use `?include=steps` to
   * include step-level details.
   *
   * @example
   * ```ts
   * const walletActionResponse =
   *   await client.wallets.actions.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { wallet_id: 'wallet_id' },
   *   );
   * ```
   */
  get(
    actionID: string,
    params: ActionGetParams,
    options?: RequestOptions,
  ): APIPromise<WalletActionsAPI.WalletActionResponse> {
    const { wallet_id, 'privy-authorization-signature': privyAuthorizationSignature, ...query } = params;
    return this._client.get(path`/v1/wallets/${wallet_id}/actions/${actionID}`, {
      query,
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

export interface ActionGetParams {
  /**
   * Path param: ID of the wallet.
   */
  wallet_id: string;

  /**
   * Query param: Expandable relations to include on a wallet action response.
   */
  include?: WalletActionsAPI.WalletActionInclude;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace Actions {
  export { type ActionGetParams as ActionGetParams };
}
