import { PrivyAPI } from '../../client';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import { prepareRequest } from '../../lib/authorization';
import {
  CreateCryptoDepositAccountResponse,
  CryptoDepositAsset,
  GetCryptoDepositAccountNextOrderResponse,
} from '../../resources';
import { Crypto, CryptoCreateParams } from '../../resources/wallets/deposit-accounts/crypto';
import { DepositAccounts } from '../../resources/wallets/deposit-accounts/deposit-accounts';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithAuthorization, WithExpiry, WithIdempotency } from './types';

export class PrivyDepositAccountsCryptoService extends Crypto {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async create(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      request_expiry: requestExpiry,
      ...params
    }: PrivyDepositAccountsCryptoService.CreateInput,
  ): Promise<CreateCryptoDepositAccountResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/deposit_accounts/crypto`,
      body: params,
    });

    return await this._create(walletId, { ...params, ...headers });
  }

  /**
   * Returns an indicative route quote without creating a wallet.
   *
   * @example
   * ```ts
   * const quote = await client.wallets().depositAccounts.crypto.quote({
   *   source: {chain: 'base', asset: 'usdc'},
   *   destination: {chain: 'ethereum', asset: 'usdc'},
   *   input_amount: '1.5',
   *   slippage_bps: 50,
   * });
   * ```
   */
  public quote(
    body: PrivyDepositAccountsCryptoService.QuoteInput,
    options?: RequestOptions,
  ): APIPromise<PrivyDepositAccountsCryptoService.QuoteResponse> {
    return this._client.post('/v1/deposit_accounts/crypto/quote', { body, ...options });
  }

  /**
   * Fetches the earliest crypto deposit-account sweep into the path wallet after `after`.
   *
   * @example
   * ```ts
   * const {order} = await client.wallets().depositAccounts.crypto.getNextOrder(
   *   'wallet_id',
   *   {after: '2026-09-08T20:00:00.000Z'},
   * );
   * ```
   */
  public getNextOrder(
    walletID: string,
    query: PrivyDepositAccountsCryptoService.GetNextOrderParams,
    options?: RequestOptions,
  ): APIPromise<GetCryptoDepositAccountNextOrderResponse> {
    return this._client.get(path`/v1/wallets/${walletID}/deposit_accounts/crypto/next_order`, {
      query,
      ...options,
    });
  }
}

// prettier-ignore
export namespace PrivyDepositAccountsCryptoService {
  /** The input type for the {@link PrivyDepositAccountsCryptoService.create} method. */
  export type CreateInput = Prettify<
    WithExpiry<WithIdempotency<WithAuthorization<CryptoCreateParams>>>
  >;

  /**
   * Quote endpoints are not in the generated Stainless client yet (OpenAPI quote is
   * still landing). Drop these locals after the next schema / `@privy-io/api-types`
   * bump regenerates quote request/response types.
   */
  export type QuoteAsset = Required<Pick<CryptoDepositAsset, 'asset' | 'chain'>>;

  /** The input type for the {@link PrivyDepositAccountsCryptoService.quote} method. */
  export type QuoteInput = {
    source: QuoteAsset;
    destination: QuoteAsset;
    input_amount?: string;
    slippage_bps?: number;
  };

  export type QuoteResponse = {
    input_amount: string;
    estimated_output_amount: string;
    created_at: string;
  };

  /** Query params for getNextOrder. Replace with the generated query type after Stainless picks up next_order. */
  export type GetNextOrderParams = {
    after: string;
  };
}

export class PrivyDepositAccountsService extends DepositAccounts {
  public override crypto: PrivyDepositAccountsCryptoService;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.crypto = new PrivyDepositAccountsCryptoService(privyApiClient, privyClient);
  }
}
