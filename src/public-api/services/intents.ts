import { PrivyAPI } from '../../client';
import { APIPromise } from '../../core/api-promise';
import {
  Intents,
  IntentCreatePolicyRuleParams,
  IntentDeletePolicyRuleParams,
  IntentRpcParams,
  IntentUpdateKeyQuorumParams,
  IntentUpdatePolicyParams,
  IntentUpdatePolicyRuleParams,
  IntentUpdateWalletParams,
  KeyQuorumIntentResponse,
  PolicyIntentResponse,
  RpcIntentResponse,
  RuleIntentResponse,
  WalletIntentResponse,
} from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithExpiry } from './types';

export class PrivyIntentsService extends Intents {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public override rpc(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.RpcInput,
  ): APIPromise<RpcIntentResponse> {
    return super.rpc(walletId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    } as IntentRpcParams);
  }

  public override createPolicyRule(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.CreatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    return super.createPolicyRule(policyId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }

  public override deletePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.DeletePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    return super.deletePolicyRule(ruleId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }

  public override updatePolicy(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyInput,
  ): APIPromise<PolicyIntentResponse> {
    return super.updatePolicy(policyId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }

  public override updatePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    return super.updatePolicyRule(ruleId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }

  public override updateWallet(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateWalletInput,
  ): APIPromise<WalletIntentResponse> {
    return super.updateWallet(walletId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }

  public override updateKeyQuorum(
    keyQuorumId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateKeyQuorumInput,
  ): APIPromise<KeyQuorumIntentResponse> {
    return super.updateKeyQuorum(keyQuorumId, {
      ...params,
      'privy-request-expiry': String(requestExpiry ?? this.privyClient.getRequestExpiry()),
    });
  }
}

export namespace PrivyIntentsService {
  /** The input type for the {@link PrivyIntentsService.rpc} method. */
  export type RpcInput = Prettify<WithExpiry<IntentRpcParams>>;
  /** The input type for the {@link PrivyIntentsService.createPolicyRule} method. */
  export type CreatePolicyRuleInput = Prettify<WithExpiry<IntentCreatePolicyRuleParams>>;
  /** The input type for the {@link PrivyIntentsService.deletePolicyRule} method. */
  export type DeletePolicyRuleInput = Prettify<WithExpiry<IntentDeletePolicyRuleParams>>;
  /** The input type for the {@link PrivyIntentsService.updatePolicy} method. */
  export type UpdatePolicyInput = Prettify<WithExpiry<IntentUpdatePolicyParams>>;
  /** The input type for the {@link PrivyIntentsService.updatePolicyRule} method. */
  export type UpdatePolicyRuleInput = Prettify<WithExpiry<IntentUpdatePolicyRuleParams>>;
  /** The input type for the {@link PrivyIntentsService.updateWallet} method. */
  export type UpdateWalletInput = Prettify<WithExpiry<IntentUpdateWalletParams>>;
  /** The input type for the {@link PrivyIntentsService.updateKeyQuorum} method. */
  export type UpdateKeyQuorumInput = Prettify<WithExpiry<IntentUpdateKeyQuorumParams>>;
}
