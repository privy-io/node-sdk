import { PrivyAPI } from '../../client';
import { SwapActionResponse, SwapQuoteResponse } from '../../resources';
import { Swap, SwapExecuteParams, SwapQuoteParams } from '../../resources/wallets/swap';
import { prepareRequest } from '../../lib/authorization';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithAuthorization, WithIdempotency } from './types';

export class PrivySwapsService {
  private swapResource: Swap;
  private privyClient: PrivyClient;
  private appID: string;
  private baseURL: string;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    this.swapResource = new Swap(privyApiClient);
    this.privyClient = privyClient;
    this.appID = privyApiClient.appID;
    this.baseURL = privyApiClient.baseURL;
  }

  public async execute(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivySwapsService.ExecuteInput,
  ): Promise<SwapActionResponse> {
    const { headers } = await prepareRequest(this.privyClient, this.appID, {
      authorizationContext,
      idempotencyKey,
      method: 'POST',
      url: `${this.baseURL}/v1/wallets/${walletId}/swap`,
      body: params,
    });

    return await this.swapResource.execute(walletId, { ...params, ...headers });
  }

  public async quote(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      ...params
    }: PrivySwapsService.QuoteInput,
  ): Promise<SwapQuoteResponse> {
    const { headers } = await prepareRequest(this.privyClient, this.appID, {
      authorizationContext,
      method: 'POST',
      url: `${this.baseURL}/v1/wallets/${walletId}/swap/quote`,
      body: params,
    });

    return await this.swapResource.quote(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace PrivySwapsService {
  /** The input type for the {@link PrivySwapsService.execute} method. */
  export type ExecuteInput = Prettify<WithIdempotency<WithAuthorization<SwapExecuteParams>>>;
  /** The input type for the {@link PrivySwapsService.quote} method. */
  export type QuoteInput = Prettify<WithAuthorization<SwapQuoteParams>>;
}
