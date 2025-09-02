import { Prettify } from 'viem';
import { PrivyAPI } from '../../client';
import { generateAuthorizationSignatures } from '../../lib/authorization';
import { Policies, Policy, PolicyUpdateParams } from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { WithAuthorization } from './types';

export class PrivyPoliciesService extends Policies {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async update(
    policyId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyPoliciesService.UpdateInput,
  ): Promise<Policy> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'PATCH',
        url: `${this._client.baseURL}/v1/policies/${policyId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._update(policyId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }
}

export namespace PrivyPoliciesService {
  /** The input type for the {@link PrivyPoliciesService.update} method. */
  export type UpdateInput = Prettify<WithAuthorization<PolicyUpdateParams>>;
}
