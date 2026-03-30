import { Prettify } from 'viem';
import { PrivyAPI } from '../../client';
import { prepareRequest } from '../../lib/authorization';
import {
  KeyQuorum,
  KeyQuorumDeleteParams,
  KeyQuorums,
  KeyQuorumUpdateParams,
  SuccessResponse,
} from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { WithAuthorization, WithExpiry } from './types';

export class PrivyKeyQuorumsService extends KeyQuorums {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async update(
    keyQuorumId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      ...params
    }: PrivyKeyQuorumsService.UpdateInput,
  ): Promise<KeyQuorum> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'PATCH',
      url: `${this._client.baseURL}/v1/key_quorums/${keyQuorumId}`,
      body: params,
    });

    return await this._update(keyQuorumId, { ...params, ...headers });
  }

  public async delete(
    keyQuorumId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      ...params
    }: PrivyKeyQuorumsService.DeleteInput,
  ): Promise<SuccessResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'DELETE',
      url: `${this._client.baseURL}/v1/key_quorums/${keyQuorumId}`,
      body: params,
    });

    return await this._delete(keyQuorumId, { ...params, ...headers });
  }
}
export namespace PrivyKeyQuorumsService {
  /** The input type for the {@link PrivyKeyQuorumsService.update} method. */
  export type UpdateInput = Prettify<WithExpiry<WithAuthorization<KeyQuorumUpdateParams>>>;
  /** The input type for the {@link PrivyKeyQuorumsService.delete} method. */
  export type DeleteInput = Prettify<WithExpiry<WithAuthorization<KeyQuorumDeleteParams>>>;
}
