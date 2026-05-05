import { PrivyAPI } from '../../../client';
import { EarnIncentiveClaimActionResponse } from '../../../resources';
import { Incentive, IncentiveClaimParams } from '../../../resources/wallets/earn/ethereum/incentive';
import { prepareRequest } from '../../../lib/authorization';
import { PrivyClient } from '../../PrivyClient';
import { Prettify, WithAuthorization, WithIdempotency } from '../types';

export class PrivyEarnEthereumIncentiveService extends Incentive {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async claim(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivyEarnEthereumIncentiveService.ClaimInput,
  ): Promise<EarnIncentiveClaimActionResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/earn/ethereum/incentive/claim`,
      body: params,
    });

    return await this._claim(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace PrivyEarnEthereumIncentiveService {
  /** The input type for the {@link PrivyEarnEthereumIncentiveService.claim} method. */
  export type ClaimInput = Prettify<WithIdempotency<WithAuthorization<IncentiveClaimParams>>>;
}
