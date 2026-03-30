import { Prettify } from 'viem';
import { PrivyAPI } from '../../client';
import { APIPromise } from '../../core/api-promise';
import { prepareRequest } from '../../lib/authorization';
import {
  Policies,
  Policy,
  PolicyCreateParams,
  PolicyCreateRuleParams,
  PolicyCreateRuleResponse,
  PolicyDeleteParams,
  PolicyDeleteRuleParams,
  PolicyUpdateParams,
  PolicyUpdateRuleParams,
  PolicyUpdateRuleResponse,
  SuccessResponse,
} from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { WithAuthorization, WithExpiry, WithIdempotency } from './types';

export class PrivyPoliciesService extends Policies {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public override create({
    idempotency_key: idempotencyKey,
    ...params
  }: PrivyPoliciesService.CreateInput): APIPromise<Policy> {
    return super.create({
      ...params,
      ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
    });
  }

  public async update(
    policyId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      ...params
    }: PrivyPoliciesService.UpdateInput,
  ): Promise<Policy> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'PATCH',
      url: `${this._client.baseURL}/v1/policies/${policyId}`,
      body: params,
    });

    return await this._update(policyId, { ...params, ...headers });
  }

  public async delete(
    policyId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      ...params
    }: PrivyPoliciesService.DeleteInput,
  ): Promise<SuccessResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'DELETE',
      url: `${this._client.baseURL}/v1/policies/${policyId}`,
      body: params,
    });

    return await this._delete(policyId, { ...params, ...headers });
  }

  public async createRule(
    policyId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      ...params
    }: PrivyPoliciesService.CreateRuleInput,
  ): Promise<PolicyCreateRuleResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/policies/${policyId}/rules`,
      body: params,
    });

    return await this._createRule(policyId, { ...params, ...headers });
  }

  public async updateRule(
    ruleId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      policy_id: policyId,
      ...params
    }: PrivyPoliciesService.UpdateRuleInput,
  ): Promise<PolicyUpdateRuleResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'PATCH',
      url: `${this._client.baseURL}/v1/policies/${policyId}/rules/${ruleId}`,
      body: params,
    });

    return await this._updateRule(ruleId, { ...params, policy_id: policyId, ...headers });
  }

  public async deleteRule(
    ruleId: string,
    {
      authorization_context: authorizationContext = {},
      request_expiry: requestExpiry,
      policy_id: policyId,
      ...params
    }: PrivyPoliciesService.DeleteRuleInput,
  ): Promise<SuccessResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      requestExpiry: requestExpiry ?? this.privyClient.getRequestExpiry(),
      method: 'DELETE',
      url: `${this._client.baseURL}/v1/policies/${policyId}/rules/${ruleId}`,
      body: params,
    });

    return await this._deleteRule(ruleId, { ...params, policy_id: policyId, ...headers });
  }
}

export namespace PrivyPoliciesService {
  /** The input type for the {@link PrivyPoliciesService.create} method. */
  export type CreateInput = Prettify<WithIdempotency<PolicyCreateParams>>;
  /** The input type for the {@link PrivyPoliciesService.update} method. */
  export type UpdateInput = Prettify<WithExpiry<WithAuthorization<PolicyUpdateParams>>>;
  /** The input type for the {@link PrivyPoliciesService.delete} method. */
  export type DeleteInput = Prettify<WithExpiry<WithAuthorization<PolicyDeleteParams>>>;
  /** The input type for the {@link PrivyPoliciesService.createRule} method. */
  export type CreateRuleInput = Prettify<WithExpiry<WithAuthorization<PolicyCreateRuleParams>>>;
  /** The input type for the {@link PrivyPoliciesService.updateRule} method. */
  export type UpdateRuleInput = Prettify<WithExpiry<WithAuthorization<PolicyUpdateRuleParams>>>;
  /** The input type for the {@link PrivyPoliciesService.deleteRule} method. */
  export type DeleteRuleInput = Prettify<WithExpiry<WithAuthorization<PolicyDeleteRuleParams>>>;
}
