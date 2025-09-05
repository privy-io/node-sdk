import { Prettify } from 'viem';
import { PrivyAPI } from '../../client';
import { generateAuthorizationSignatures } from '../../lib/authorization';
import {
  Policies,
  Policy,
  PolicyCreateRuleParams,
  PolicyCreateRuleResponse,
  PolicyDeleteParams,
  PolicyDeleteResponse,
  PolicyDeleteRuleParams,
  PolicyDeleteRuleResponse,
  PolicyUpdateParams,
  PolicyUpdateRuleParams,
  PolicyUpdateRuleResponse,
} from '../../resources';
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

  public async delete(
    policyId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyPoliciesService.DeleteInput,
  ): Promise<PolicyDeleteResponse> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'DELETE',
        url: `${this._client.baseURL}/v1/policies/${policyId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._delete(policyId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }

  public async createRule(
    policyId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyPoliciesService.CreateRuleInput,
  ): Promise<PolicyCreateRuleResponse> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'POST',
        url: `${this._client.baseURL}/v1/policies/${policyId}/rules`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._createRule(policyId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }

  public async updateRule(
    ruleId: string,
    {
      authorization_context: authorizationContext = {},
      policy_id: policyId,
      ...params
    }: PrivyPoliciesService.UpdateRuleInput,
  ): Promise<PolicyUpdateRuleResponse> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'PATCH',
        url: `${this._client.baseURL}/v1/policies/${policyId}/rules/${ruleId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._updateRule(ruleId, {
      ...params,
      policy_id: policyId,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }

  public async deleteRule(
    ruleId: string,
    {
      authorization_context: authorizationContext = {},
      policy_id: policyId,
      ...params
    }: PrivyPoliciesService.DeleteRuleInput,
  ): Promise<PolicyDeleteRuleResponse> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'DELETE',
        url: `${this._client.baseURL}/v1/policies/${policyId}/rules/${ruleId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._deleteRule(ruleId, {
      ...params,
      policy_id: policyId,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }
}

export namespace PrivyPoliciesService {
  /** The input type for the {@link PrivyPoliciesService.update} method. */
  export type UpdateInput = Prettify<WithAuthorization<PolicyUpdateParams>>;
  /** The input type for the {@link PrivyPoliciesService.delete} method. */
  export type DeleteInput = Prettify<WithAuthorization<PolicyDeleteParams>>;
  /** The input type for the {@link PrivyPoliciesService.createRule} method. */
  export type CreateRuleInput = Prettify<WithAuthorization<PolicyCreateRuleParams>>;
  /** The input type for the {@link PrivyPoliciesService.updateRule} method. */
  export type UpdateRuleInput = Prettify<WithAuthorization<PolicyUpdateRuleParams>>;
  /** The input type for the {@link PrivyPoliciesService.deleteRule} method. */
  export type DeleteRuleInput = Prettify<WithAuthorization<PolicyDeleteRuleParams>>;
}
