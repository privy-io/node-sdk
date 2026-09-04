import { PrivyAPI } from '../../client';
import { prepareRequest } from '../../lib/authorization';
import { PayoutResponse } from '../../resources/wallets/actions';
import { Fiat, FiatCreateParams } from '../../resources/wallets/payout/fiat';
import { Payout } from '../../resources/wallets/payout/payout';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithAuthorization, WithExpiry, WithIdempotency } from './types';

export class PrivyPayoutFiatService extends Fiat {
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
    }: PrivyPayoutFiatService.CreateInput,
  ): Promise<PayoutResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/payout/fiat`,
      body: params,
    });

    return await this._create(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace PrivyPayoutFiatService {
  /** The input type for the {@link PrivyPayoutFiatService.create} method. */
  export type CreateInput = Prettify<
    WithExpiry<WithIdempotency<WithAuthorization<FiatCreateParams>>>
  >;
}

export class PrivyPayoutService extends Payout {
  private fiatService: PrivyPayoutFiatService;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.fiatService = new PrivyPayoutFiatService(privyApiClient, privyClient);
  }

  public fiat(): PrivyPayoutFiatService {
    return this.fiatService;
  }
}
