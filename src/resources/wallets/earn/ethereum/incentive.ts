// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as WalletActionsAPI from '../../../wallet-actions';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Incentive extends APIResource {
  /**
   * Claim incentive rewards for a wallet.
   *
   * @example
   * ```ts
   * const earnIncentiveClaimActionResponse =
   *   await client.wallets.earn.ethereum.incentive._claim(
   *     'wallet_id',
   *     { chain: 'base' },
   *   );
   * ```
   */
  _claim(
    walletID: string,
    params: IncentiveClaimParams,
    options?: RequestOptions,
  ): APIPromise<WalletActionsAPI.EarnIncentiveClaimActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/earn/ethereum/incentive/claim`, {
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

export interface IncentiveClaimParams {
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

export declare namespace Incentive {
  export { type IncentiveClaimParams as IncentiveClaimParams };
}
