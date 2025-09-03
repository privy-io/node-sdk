import { Prettify } from 'viem';
import { PrivyAPI } from '../../client';
import { generateAuthorizationSignatures } from '../../lib/authorization';
import {
  KeyQuorum,
  KeyQuorumDeleteParams,
  KeyQuorumDeleteResponse,
  KeyQuorums,
  KeyQuorumUpdateParams,
} from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { WithAuthorization } from './types';

export class PrivyKeyQuorumsService extends KeyQuorums {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async update(
    keyQuorumId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyKeyQuorumsService.UpdateInput,
  ): Promise<KeyQuorum> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'PATCH',
        url: `${this._client.baseURL}/v1/key_quorums/${keyQuorumId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._update(keyQuorumId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }

  public async delete(
    keyQuorumId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyKeyQuorumsService.DeleteInput,
  ): Promise<KeyQuorumDeleteResponse> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'DELETE',
        url: `${this._client.baseURL}/v1/key_quorums/${keyQuorumId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._delete(keyQuorumId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }
}
export namespace PrivyKeyQuorumsService {
  /** The input type for the {@link PrivyKeyQuorumsService.update} method. */
  export type UpdateInput = Prettify<WithAuthorization<KeyQuorumUpdateParams>>;
  /** The input type for the {@link PrivyKeyQuorumsService.delete} method. */
  export type DeleteInput = Prettify<WithAuthorization<KeyQuorumDeleteParams>>;
}
