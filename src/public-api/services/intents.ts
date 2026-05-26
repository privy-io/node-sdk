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
import { defaultTempoTransactionTypeForRpcParams, isTempoTransactionRpcParams } from './utils/tempo';

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
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    const rpcParams =
      isTempoTransactionRpcParams(params) ? defaultTempoTransactionTypeForRpcParams(params) : params;
    return super.rpc(walletId, {
      ...rpcParams,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    } as IntentRpcParams);
  }

  public override createPolicyRule(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.CreatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.createPolicyRule(policyId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    });
  }

  public override deletePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.DeletePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.deletePolicyRule(ruleId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    });
  }

  public override updatePolicy(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyInput,
  ): APIPromise<PolicyIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.updatePolicy(policyId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    });
  }

  public override updatePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.updatePolicyRule(ruleId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    });
  }

  public override updateWallet(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateWalletInput,
  ): APIPromise<WalletIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.updateWallet(walletId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    });
  }

  public override updateKeyQuorum(
    keyQuorumId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateKeyQuorumInput,
  ): APIPromise<KeyQuorumIntentResponse> {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return super.updateKeyQuorum(keyQuorumId, {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
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
