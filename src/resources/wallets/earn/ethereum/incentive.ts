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
   *   await client.wallets.earn.ethereum.incentive.claim(
   *     'wallet_id',
   *     { chain: 'base' },
   *   );
   * ```
   */
  claim(
    walletID: string,
    params: IncentiveClaimParams,
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
}

export declare namespace Incentive {
  export { type IncentiveClaimParams as IncentiveClaimParams };
}
