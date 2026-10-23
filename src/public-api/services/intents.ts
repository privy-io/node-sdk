import { PrivyAPI } from '../../client';
import { APIPromise } from '../../core/api-promise';
import {
  ConditionSetDeleteIntentResponse,
  ConditionSetItemDeleteIntentResponse,
  ConditionSetItemMutateIntentResponse,
  Intents,
  IntentCreateConditionSetItemsParams,
  IntentCreatePolicyRuleParams,
  IntentDeleteConditionSetItemParams,
  IntentDeleteConditionSetParams,
  IntentDeleteKeyQuorumParams,
  IntentDeletePolicyParams,
  IntentDeletePolicyRuleParams,
  IntentRawSignParams,
  IntentRpcParams,
  IntentTransferParams,
  IntentUpdateConditionSetItemsParams,
  IntentUpdateKeyQuorumParams,
  IntentUpdatePolicyParams,
  IntentUpdatePolicyRuleParams,
  IntentUpdateWalletParams,
  KeyQuorumDeleteIntentResponse,
  KeyQuorumUpdateIntentResponse,
  PolicyDeleteIntentResponse,
  PolicyUpdateIntentResponse,
  RawSignIntentResponse,
  RuleDeleteIntentResponse,
  RpcIntentResponse,
  RuleIntentResponse,
  TransferIntentResponse,
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

  /**
   * Sets the `privy-request-expiry` header param from the per-call `request_expiry`, falling back
   * to the client's intent default.
   */
  private withRequestExpiry<Params extends object>(
    params: Params,
    requestExpiry: number | undefined,
  ): Params & { 'privy-request-expiry'?: string } {
    const expiry = requestExpiry ?? this.privyClient.getIntentRequestExpiry();
    return {
      ...params,
      ...(expiry != null && { 'privy-request-expiry': String(expiry) }),
    };
  }

  public override rpc(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.RpcInput,
  ): APIPromise<RpcIntentResponse> {
    return super.rpc(walletId, this.withRequestExpiry(params, requestExpiry) as IntentRpcParams);
  }

  public override rawSign(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.RawSignInput,
  ): APIPromise<RawSignIntentResponse> {
    return super.rawSign(walletId, this.withRequestExpiry(params, requestExpiry) as IntentRawSignParams);
  }

  public override transfer(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.TransferInput,
  ): APIPromise<TransferIntentResponse> {
    return super.transfer(walletId, this.withRequestExpiry(params, requestExpiry));
  }

  public override createPolicyRule(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.CreatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    return super.createPolicyRule(policyId, this.withRequestExpiry(params, requestExpiry));
  }

  public override deletePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.DeletePolicyRuleInput,
  ): APIPromise<RuleDeleteIntentResponse> {
    return super.deletePolicyRule(ruleId, this.withRequestExpiry(params, requestExpiry));
  }

  public override updatePolicy(
    policyId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyInput,
  ): APIPromise<PolicyUpdateIntentResponse> {
    return super.updatePolicy(policyId, this.withRequestExpiry(params, requestExpiry));
  }

  public override updatePolicyRule(
    ruleId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdatePolicyRuleInput,
  ): APIPromise<RuleIntentResponse> {
    return super.updatePolicyRule(ruleId, this.withRequestExpiry(params, requestExpiry));
  }

  public override updateWallet(
    walletId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateWalletInput,
  ): APIPromise<WalletIntentResponse> {
    return super.updateWallet(walletId, this.withRequestExpiry(params, requestExpiry));
  }

  public override updateKeyQuorum(
    keyQuorumId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateKeyQuorumInput,
  ): APIPromise<KeyQuorumUpdateIntentResponse> {
    return super.updateKeyQuorum(keyQuorumId, this.withRequestExpiry(params, requestExpiry));
  }

  public override createConditionSetItems(
    conditionSetId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.CreateConditionSetItemsInput,
  ): APIPromise<ConditionSetItemMutateIntentResponse> {
    return super.createConditionSetItems(conditionSetId, this.withRequestExpiry(params, requestExpiry));
  }

  public override updateConditionSetItems(
    conditionSetId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.UpdateConditionSetItemsInput,
  ): APIPromise<ConditionSetItemMutateIntentResponse> {
    return super.updateConditionSetItems(conditionSetId, this.withRequestExpiry(params, requestExpiry));
  }

  public override deleteConditionSet(
    conditionSetId: string,
    // Needed for the override to type-check: the base params share no property with
    // `{ request_expiry }`, so TypeScript rejects the override without the `never` field.
    input:
      | (PrivyIntentsService.DeleteConditionSetInput & { 'privy-request-expiry'?: never })
      | null
      | undefined = {},
  ): APIPromise<ConditionSetDeleteIntentResponse> {
    const { request_expiry: requestExpiry, ...params } = input ?? {};
    return super.deleteConditionSet(conditionSetId, this.withRequestExpiry(params, requestExpiry));
  }

  public override deletePolicy(
    policyId: string,
    // Same as `deleteConditionSet`: the base params share no property with `{ request_expiry }`.
    input:
      | (PrivyIntentsService.DeletePolicyInput & { 'privy-request-expiry'?: never })
      | null
      | undefined = {},
  ): APIPromise<PolicyDeleteIntentResponse> {
    const { request_expiry: requestExpiry, ...params } = input ?? {};
    return super.deletePolicy(policyId, this.withRequestExpiry(params, requestExpiry));
  }

  public override deleteKeyQuorum(
    keyQuorumId: string,
    // Same as `deleteConditionSet`: the base params share no property with `{ request_expiry }`.
    input:
      | (PrivyIntentsService.DeleteKeyQuorumInput & { 'privy-request-expiry'?: never })
      | null
      | undefined = {},
  ): APIPromise<KeyQuorumDeleteIntentResponse> {
    const { request_expiry: requestExpiry, ...params } = input ?? {};
    return super.deleteKeyQuorum(keyQuorumId, this.withRequestExpiry(params, requestExpiry));
  }

  public override deleteConditionSetItem(
    conditionSetItemId: string,
    { request_expiry: requestExpiry, ...params }: PrivyIntentsService.DeleteConditionSetItemInput,
  ): APIPromise<ConditionSetItemDeleteIntentResponse> {
    return super.deleteConditionSetItem(conditionSetItemId, this.withRequestExpiry(params, requestExpiry));
  }
}

export namespace PrivyIntentsService {
  /** The input type for the {@link PrivyIntentsService.rpc} method. */
  export type RpcInput = Prettify<WithExpiry<IntentRpcParams>>;
  /** The input type for the {@link PrivyIntentsService.rawSign} method. */
  export type RawSignInput = Prettify<WithExpiry<IntentRawSignParams>>;
  /** The input type for the {@link PrivyIntentsService.transfer} method. */
  export type TransferInput = Prettify<WithExpiry<IntentTransferParams>>;
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
  /** The input type for the {@link PrivyIntentsService.createConditionSetItems} method. */
  export type CreateConditionSetItemsInput = Prettify<WithExpiry<IntentCreateConditionSetItemsParams>>;
  /** The input type for the {@link PrivyIntentsService.updateConditionSetItems} method. */
  export type UpdateConditionSetItemsInput = Prettify<WithExpiry<IntentUpdateConditionSetItemsParams>>;
  /** The input type for the {@link PrivyIntentsService.deleteConditionSet} method. */
  export type DeleteConditionSetInput = Prettify<WithExpiry<IntentDeleteConditionSetParams>>;
  /** The input type for the {@link PrivyIntentsService.deleteConditionSetItem} method. */
  export type DeleteConditionSetItemInput = Prettify<WithExpiry<IntentDeleteConditionSetItemParams>>;
  /** The input type for the {@link PrivyIntentsService.deletePolicy} method. */
  export type DeletePolicyInput = Prettify<WithExpiry<IntentDeletePolicyParams>>;
  /** The input type for the {@link PrivyIntentsService.deleteKeyQuorum} method. */
  export type DeleteKeyQuorumInput = Prettify<WithExpiry<IntentDeleteKeyQuorumParams>>;
}
