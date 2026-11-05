// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ActionsAPI from '../../wallets/actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Tmmf extends APIResource {
  /**
   * Returns a user's registration with each tMMF provider and a page of the wallets
   * registered for it, with each status read live from the provider.
   *
   * @example
   * ```ts
   * const tmmfUserResponse = await client.users.earn.tmmf.get(
   *   'x',
   * );
   * ```
   */
  get(
    userID: string,
    query: TmmfGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TmmfUserResponse> {
    return this._client.get(path`/v1/users/${userID}/earn/tmmf`, { query, ...options });
  }
}

export interface TmmfGetParams {
  /**
   * The fund provider.
   */
  provider?: ActionsAPI.TmmfProvider;

  /**
   * Only return the registration of this wallet.
   */
  wallet_id?: string;

  /**
   * Cursor returned by the previous page.
   */
  wallets_cursor?: string;

  /**
   * Maximum number of wallet registrations to return.
   */
  wallets_limit?: number;
}

export declare namespace Tmmf {
  export { type TmmfGetParams as TmmfGetParams };
}
