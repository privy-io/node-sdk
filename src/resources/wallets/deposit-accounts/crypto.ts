// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as WalletsAPI from '../wallets';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to wallets
 */
export class Crypto extends APIResource {
  /**
   * Creates deposit source wallets and attaches them to a sweep into the path
   * wallet. Requires a dest-owner privy-authorization-signature. Accepts a
   * dest-owner user JWT or an app secret (app-secret callers use the dest owner).
   * JWT-only requests 401 when the app requires an app secret for wallet actions.
   *
   * @example
   * ```ts
   * const createCryptoDepositAccountResponse =
   *   await client.wallets.depositAccounts.crypto._create(
   *     'wallet_id',
   *     { deposit_config_id: 'clg2rvssg025ny5fmul5m95fn' },
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
}

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
     * Body param: An asset on a chain. Uses a human-readable alias (usdc, base) when
     * one is on file, otherwise the raw asset address and CAIP-2.
     */
    destination: WalletsAPI.CryptoDepositAsset;

    /**
     * Body param: Which assets a deposit address accepts. Asset and chain use
     * human-readable aliases when known.
     */
    source: WalletsAPI.CryptoDepositAssetFilter;

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

export declare namespace Crypto {
  export { type CryptoCreateParams as CryptoCreateParams };
}
