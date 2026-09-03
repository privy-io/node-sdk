// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FiatAPI from '../../fiat';
import * as ActionsAPI from '../actions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Operations related to fiat onramping and offramping
 */
export class Fiat extends APIResource {
  /**
   * Initiates a payout (crypto to fiat offramp) from a wallet to a previously
   * registered external fiat account. Returns a pending wallet action; the crypto
   * transfer and fiat settlement are processed asynchronously.
   *
   * @example
   * ```ts
   * const payoutResponse =
   *   await client.wallets.payout.fiat._create('wallet_id', {
   *     destination: { fiat_account_id: 'fiat_account_id' },
   *     source: {
   *       amount: 'amount',
   *       asset: 'asset',
   *       chain: 'chain',
   *     },
   *   });
   * ```
   */
  _create(
    walletID: string,
    params: FiatCreateParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.PayoutResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/payout/fiat`, {
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

export interface FiatCreateParams {
  /**
   * Body param: The destination bank account for a payout.
   */
  destination: FiatAPI.PayoutDestination;

  /**
   * Body param: The source crypto asset, chain, and amount for a payout.
   */
  source: FiatAPI.PayoutSource;

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

export declare namespace Fiat {
  export { type FiatCreateParams as FiatCreateParams };
}
