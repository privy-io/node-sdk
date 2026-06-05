// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';
import * as KeyQuorumsAPI from './key-quorums';
import * as PoliciesAPI from './policies';
import * as SharedAPI from './shared';
import * as AppsAPI from './apps/apps';
import * as WalletsAPI from './wallets/wallets';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to authorization intents for wallet actions
 */
export class Intents extends APIResource {
  /**
   * List intents for an app. Returns a paginated list of intents with their current
   * status and details.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const intentResponse of client.intents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: IntentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<IntentResponsesCursor, IntentResponse> {
    return this._client.getAPIList('/v1/intents', Cursor<IntentResponse>, { query, ...options });
  }

  /**
   * Create an intent to add a rule to a policy. The intent must be authorized by the
   * policy owner before it can be executed.
   *
   * @example
   * ```ts
   * const ruleMutateIntentResponse =
   *   await client.intents.createPolicyRule('policy_id', {
   *     action: 'ALLOW',
   *     conditions: [
   *       {
   *         field: 'to',
   *         field_source: 'ethereum_transaction',
   *         operator: 'eq',
   *         value: 'string',
   *       },
   *     ],
   *     method: 'eth_sendTransaction',
   *     name: 'x',
   *   });
   * ```
   */
  createPolicyRule(
    policyID: string,
    params: IntentCreatePolicyRuleParams,
    options?: RequestOptions,
  ): APIPromise<RuleMutateIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.post(path`/v1/intents/policies/${policyID}/rules`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to delete a rule from a policy. The intent must be authorized
   * by the policy owner before it can be executed.
   *
   * @example
   * ```ts
   * const ruleDeleteIntentResponse =
   *   await client.intents.deletePolicyRule('rule_id', {
   *     policy_id: 'policy_id',
   *   });
   * ```
   */
  deletePolicyRule(
    ruleID: string,
    params: IntentDeletePolicyRuleParams,
    options?: RequestOptions,
  ): APIPromise<RuleDeleteIntentResponse> {
    const { policy_id, 'privy-request-expiry': privyRequestExpiry } = params;
    return this._client.delete(path`/v1/intents/policies/${policy_id}/rules/${ruleID}`, {
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve an intent by ID. Returns the intent details including its current
   * status, authorization details, and execution result if applicable.
   *
   * @example
   * ```ts
   * const intentResponse = await client.intents.get(
   *   'intent_id',
   * );
   * ```
   */
  get(intentID: string, options?: RequestOptions): APIPromise<IntentResponse> {
    if (intentID === '') {
      throw new Error('intentID must not be an empty string');
    }
    return this._client.get(path`/v1/intents/${intentID}`, options);
  }

  /**
   * Create an intent to execute an RPC method on a wallet. The intent must be
   * authorized by either the wallet owner or signers before it can be executed.
   *
   * @example
   * ```ts
   * const rpcIntentResponse = await client.intents.rpc(
   *   'wallet_id',
   *   {
   *     method: 'eth_signTransaction',
   *     params: { transaction: {} },
   *   },
   * );
   * ```
   */
  rpc(walletID: string, params: IntentRpcParams, options?: RequestOptions): APIPromise<RpcIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.post(path`/v1/intents/wallets/${walletID}/rpc`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to execute a token transfer via a wallet. The intent must be
   * authorized by either the wallet owner or signers before it can be executed.
   *
   * @example
   * ```ts
   * const transferIntentResponse =
   *   await client.intents.transfer('wallet_id', {
   *     destination: {
   *       address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2',
   *     },
   *     source: {
   *       amount: '10.5',
   *       asset: 'usdc',
   *       chain: 'base',
   *     },
   *   });
   * ```
   */
  transfer(
    walletID: string,
    params: IntentTransferParams,
    options?: RequestOptions,
  ): APIPromise<TransferIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.post(path`/v1/intents/wallets/${walletID}/transfer`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to update a key quorum. The intent must be authorized by the
   * key quorum members before it can be executed.
   *
   * @example
   * ```ts
   * const keyQuorumIntentResponse =
   *   await client.intents.updateKeyQuorum('key_quorum_id');
   * ```
   */
  updateKeyQuorum(
    keyQuorumID: string,
    params: IntentUpdateKeyQuorumParams,
    options?: RequestOptions,
  ): APIPromise<KeyQuorumIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.patch(path`/v1/intents/key_quorums/${keyQuorumID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to update a policy. The intent must be authorized by the policy
   * owner before it can be executed.
   *
   * @example
   * ```ts
   * const policyIntentResponse =
   *   await client.intents.updatePolicy('policy_id');
   * ```
   */
  updatePolicy(
    policyID: string,
    params: IntentUpdatePolicyParams,
    options?: RequestOptions,
  ): APIPromise<PolicyIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.patch(path`/v1/intents/policies/${policyID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to update a rule on a policy. The intent must be authorized by
   * the policy owner before it can be executed.
   *
   * @example
   * ```ts
   * const ruleMutateIntentResponse =
   *   await client.intents.updatePolicyRule('rule_id', {
   *     policy_id: 'policy_id',
   *     action: 'ALLOW',
   *     conditions: [
   *       {
   *         field: 'to',
   *         field_source: 'ethereum_transaction',
   *         operator: 'eq',
   *         value: 'string',
   *       },
   *     ],
   *     method: 'eth_sendTransaction',
   *     name: 'x',
   *   });
   * ```
   */
  updatePolicyRule(
    ruleID: string,
    params: IntentUpdatePolicyRuleParams,
    options?: RequestOptions,
  ): APIPromise<RuleMutateIntentResponse> {
    const { policy_id, 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.patch(path`/v1/intents/policies/${policy_id}/rules/${ruleID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create an intent to update a wallet. The intent must be authorized by the wallet
   * owner before it can be executed.
   *
   * @example
   * ```ts
   * const walletIntentResponse =
   *   await client.intents.updateWallet('wallet_id');
   * ```
   */
  updateWallet(
    walletID: string,
    params: IntentUpdateWalletParams,
    options?: RequestOptions,
  ): APIPromise<WalletIntentResponse> {
    const { 'privy-request-expiry': privyRequestExpiry, ...body } = params;
    return this._client.patch(path`/v1/intents/wallets/${walletID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export type IntentResponsesCursor = Cursor<IntentResponse>;

/**
 * Common fields for intent action execution results.
 */
export interface BaseActionResult {
  /**
   * Unix timestamp when the action was executed
   */
  executed_at: number;

  /**
   * HTTP status code from the action execution
   */
  status_code: number;

  /**
   * Display name of the key quorum that authorized execution
   */
  authorized_by_display_name?: string;

  /**
   * ID of the key quorum that authorized execution
   */
  authorized_by_id?: string;
}

/**
 * Common fields shared by all intent response types.
 */
export interface BaseIntentResponse {
  /**
   * Detailed authorization information including key quorum members, thresholds, and
   * signature status
   */
  authorization_details: Array<IntentAuthorization>;

  /**
   * Unix timestamp when the intent was created
   */
  created_at: number;

  /**
   * Display name of the user who created the intent
   */
  created_by_display_name: string;

  /**
   * Whether this intent has a custom expiry time set by the client. If false, the
   * intent expires after a default duration.
   */
  custom_expiry: boolean;

  /**
   * Unix timestamp when the intent expires
   */
  expires_at: number;

  /**
   * Unique ID for the intent
   */
  intent_id: string;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * Human-readable reason for dismissal, present when status is 'dismissed'
   */
  dismissal_reason?: string;

  /**
   * Unix timestamp when the intent was dismissed, present when status is 'dismissed'
   */
  dismissed_at?: number;

  /**
   * Unix timestamp when the intent was rejected, present when status is 'rejected'
   */
  rejected_at?: number;
}

/**
 * Authorization quorum for an intent
 */
export interface IntentAuthorization {
  /**
   * Members in this authorization quorum
   */
  members: Array<IntentAuthorizationMember>;

  /**
   * Number of signatures required to satisfy this quorum
   */
  threshold: number;

  /**
   * Display name of the key quorum
   */
  display_name?: string;
}

/**
 * A leaf member (user or key) of a nested key quorum in an intent authorization.
 */
export type IntentAuthorizationKeyQuorumMember =
  | IntentAuthorizationKeyQuorumMember.UserMember
  | IntentAuthorizationKeyQuorumMember.KeyMember;

export namespace IntentAuthorizationKeyQuorumMember {
  export interface UserMember {
    /**
     * Unix timestamp when this member signed, or null if not yet signed.
     */
    signed_at: number | null;

    type: 'user';

    /**
     * User ID of the key quorum member
     */
    user_id: string;
  }

  export interface KeyMember {
    /**
     * Public key of the key quorum member
     */
    public_key: string;

    /**
     * Unix timestamp when this member signed, or null if not yet signed.
     */
    signed_at: number | null;

    type: 'key';
  }
}

/**
 * A member of an intent authorization quorum. Can be a user, key, or nested key
 * quorum.
 */
export type IntentAuthorizationMember =
  | IntentAuthorizationMember.UserMember
  | IntentAuthorizationMember.KeyMember
  | IntentAuthorizationMember.KeyQuorumMember;

export namespace IntentAuthorizationMember {
  export interface UserMember {
    /**
     * Unix timestamp when this member signed, or null if not yet signed.
     */
    signed_at: number | null;

    type: 'user';

    /**
     * User ID of the key quorum member
     */
    user_id: string;
  }

  export interface KeyMember {
    /**
     * Public key of the key quorum member
     */
    public_key: string;

    /**
     * Unix timestamp when this member signed, or null if not yet signed.
     */
    signed_at: number | null;

    type: 'key';
  }

  export interface KeyQuorumMember {
    /**
     * ID of the child key quorum member
     */
    key_quorum_id: string;

    /**
     * Members of this child quorum
     */
    members: Array<IntentsAPI.IntentAuthorizationKeyQuorumMember>;

    /**
     * Number of signatures required from this child quorum
     */
    threshold: number;

    /**
     * Whether this child key quorum has met its signature threshold
     */
    threshold_met: boolean;

    type: 'key_quorum';

    /**
     * Display name for the child key quorum (if any)
     */
    display_name?: string;
  }
}

/**
 * Request body for authorizing an intent.
 */
export interface IntentAuthorizeInput {
  /**
   * Signature authorizing the intent.
   */
  signature: string;

  /**
   * Unix timestamp (in milliseconds) when the signature was created. Used to verify
   * the signature was created when the signing key was valid.
   */
  timestamp: number;
}

/**
 * Headers required to create an intent.
 */
export interface IntentCreationHeaders {
  /**
   * ID of your Privy app.
   */
  'privy-app-id': string;

  /**
   * Request expiry. Value is a Unix timestamp in milliseconds representing the
   * deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

/**
 * Response for an intent object
 */
export type IntentResponse =
  | RpcIntentResponse
  | TransferIntentResponse
  | WalletIntentResponse
  | PolicyIntentResponse
  | RuleIntentResponse
  | KeyQuorumIntentResponse;

/**
 * Current status of an intent.
 */
export type IntentStatus =
  | 'pending'
  | 'processing'
  | 'executed'
  | 'failed'
  | 'expired'
  | 'rejected'
  | 'dismissed';

/**
 * Type of intent.
 */
export type IntentType = 'KEY_QUORUM' | 'POLICY' | 'RULE' | 'RPC' | 'TRANSFER' | 'WALLET';

/**
 * Response for a key quorum intent
 */
export interface KeyQuorumIntentResponse extends BaseIntentResponse {
  intent_type: 'KEY_QUORUM';

  /**
   * The original key quorum update request that would be sent to the key quorum
   * endpoint
   */
  request_details: KeyQuorumIntentResponse.RequestDetails;

  /**
   * Result of key quorum update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A key quorum for authorizing wallet operations.
   */
  current_resource_data?: KeyQuorumsAPI.KeyQuorum;
}

export namespace KeyQuorumIntentResponse {
  /**
   * The original key quorum update request that would be sent to the key quorum
   * endpoint
   */
  export interface RequestDetails {
    /**
     * Request input for updating an existing key quorum. At least one field must be
     * provided.
     */
    body: KeyQuorumsAPI.KeyQuorumUpdateRequestBody;

    method: 'PATCH';

    url: string;
  }
}

/**
 * Request details for a policy intent.
 */
export interface PolicyIntentRequestDetails {
  body: PolicyIntentRequestDetails.Body;

  method: 'PATCH';

  url: string;
}

export namespace PolicyIntentRequestDetails {
  export interface Body {
    /**
     * Name to assign to policy.
     */
    name?: string;

    /**
     * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
     * null to remove the current owner.
     */
    owner?: SharedAPI.OwnerInput | null;

    /**
     * The key quorum ID to set as the owner of the resource. If you provide this, do
     * not specify an owner.
     */
    owner_id?: SharedAPI.OwnerIDInput | null;

    rules?: Array<PoliciesAPI.PolicyRuleRequestBody>;
  }
}

/**
 * Response for a policy intent
 */
export interface PolicyIntentResponse extends BaseIntentResponse {
  intent_type: 'POLICY';

  /**
   * The original policy update request that would be sent to the policy endpoint
   */
  request_details: PolicyIntentResponse.RequestDetails;

  /**
   * Result of policy update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A policy for controlling wallet operations.
   */
  current_resource_data?: PoliciesAPI.Policy;
}

export namespace PolicyIntentResponse {
  /**
   * The original policy update request that would be sent to the policy endpoint
   */
  export interface RequestDetails {
    body: RequestDetails.Body;

    method: 'PATCH';

    url: string;
  }

  export namespace RequestDetails {
    export interface Body {
      /**
       * Name to assign to policy.
       */
      name?: string;

      /**
       * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
       * null to remove the current owner.
       */
      owner?: SharedAPI.OwnerInput | null;

      /**
       * The key quorum ID to set as the owner of the resource. If you provide this, do
       * not specify an owner.
       */
      owner_id?: SharedAPI.OwnerIDInput | null;

      rules?: Array<PoliciesAPI.PolicyRuleRequestBody>;
    }
  }
}

/**
 * Request details for an RPC intent.
 */
export interface RpcIntentRequestDetails {
  /**
   * Request body for wallet RPC operations, discriminated by method.
   */
  body: WalletsAPI.WalletRpcRequestBody;

  method: 'POST';

  url: string;
}

/**
 * Response for an RPC intent
 */
export interface RpcIntentResponse extends BaseIntentResponse {
  intent_type: 'RPC';

  /**
   * The original RPC request that would be sent to the wallet endpoint
   */
  request_details: RpcIntentResponse.RequestDetails;

  /**
   * Result of RPC execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A wallet managed by Privy's wallet infrastructure.
   */
  current_resource_data?: WalletsAPI.Wallet;
}

export namespace RpcIntentResponse {
  /**
   * The original RPC request that would be sent to the wallet endpoint
   */
  export interface RequestDetails {
    /**
     * Request body for wallet RPC operations, discriminated by method.
     */
    body: WalletsAPI.WalletRpcRequestBody;

    method: 'POST';

    url: string;
  }
}

/**
 * Response for a delete rule intent
 */
export interface RuleDeleteIntentResponse extends BaseIntentResponse {
  intent_type: 'RULE';

  /**
   * Request details for deleting a rule via intent.
   */
  request_details: RuleIntentDeleteRequestDetails;

  /**
   * Result of rule execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A rule that defines the conditions and action to take if the conditions are
   * true.
   */
  current_resource_data?: PoliciesAPI.PolicyRuleResponse;

  /**
   * A policy for controlling wallet operations.
   */
  policy?: PoliciesAPI.Policy;
}

/**
 * Request details for creating a rule via intent.
 */
export interface RuleIntentCreateRequestDetails {
  /**
   * The rules that apply to each method the policy covers.
   */
  body: PoliciesAPI.PolicyRuleRequestBody;

  method: 'POST';

  url: string;
}

/**
 * Request details for deleting a rule via intent.
 */
export interface RuleIntentDeleteRequestDetails {
  method: 'DELETE';

  url: string;

  body?: RuleIntentDeleteRequestDetails.Body;
}

export namespace RuleIntentDeleteRequestDetails {
  export interface Body {}
}

/**
 * The original rule request. Method is POST (create), PATCH (update), or DELETE
 * (delete)
 */
export type RuleIntentRequestDetails =
  | RuleIntentCreateRequestDetails
  | RuleIntentUpdateRequestDetails
  | RuleIntentDeleteRequestDetails;

/**
 * Response for a rule intent
 */
export interface RuleIntentResponse extends BaseIntentResponse {
  intent_type: 'RULE';

  /**
   * The original rule request. Method is POST (create), PATCH (update), or DELETE
   * (delete)
   */
  request_details: RuleIntentRequestDetails;

  /**
   * Result of rule execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A rule that defines the conditions and action to take if the conditions are
   * true.
   */
  current_resource_data?: PoliciesAPI.PolicyRuleResponse;

  /**
   * A policy for controlling wallet operations.
   */
  policy?: PoliciesAPI.Policy;
}

/**
 * Request details for updating a rule via intent.
 */
export interface RuleIntentUpdateRequestDetails {
  /**
   * The rules that apply to each method the policy covers.
   */
  body: PoliciesAPI.PolicyRuleRequestBody;

  method: 'PATCH';

  url: string;
}

/**
 * Response for a create or update rule intent
 */
export interface RuleMutateIntentResponse extends BaseIntentResponse {
  intent_type: 'RULE';

  /**
   * The original rule request. Method is POST (create), PATCH (update), or DELETE
   * (delete)
   */
  request_details: RuleIntentRequestDetails;

  /**
   * Result of rule execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A rule that defines the conditions and action to take if the conditions are
   * true.
   */
  current_resource_data?: PoliciesAPI.PolicyRuleResponse;

  /**
   * A policy for controlling wallet operations.
   */
  policy?: PoliciesAPI.Policy;
}

/**
 * Request details for a transfer intent.
 */
export interface TransferIntentRequestDetails {
  /**
   * Request body for initiating a sponsored token transfer from an embedded wallet.
   */
  body: WalletsAPI.TransferRequestBody;

  method: 'POST';

  url: string;
}

/**
 * Response for a transfer intent
 */
export interface TransferIntentResponse extends BaseIntentResponse {
  intent_type: 'TRANSFER';

  /**
   * The original transfer request that would be sent to the wallet transfer endpoint
   */
  request_details: TransferIntentResponse.RequestDetails;

  /**
   * Result of transfer execution (only present if intent status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A wallet managed by Privy's wallet infrastructure.
   */
  current_resource_data?: WalletsAPI.Wallet;
}

export namespace TransferIntentResponse {
  /**
   * The original transfer request that would be sent to the wallet transfer endpoint
   */
  export interface RequestDetails {
    /**
     * Request body for initiating a sponsored token transfer from an embedded wallet.
     */
    body: WalletsAPI.TransferRequestBody;

    method: 'POST';

    url: string;
  }
}

/**
 * Response for a wallet intent
 */
export interface WalletIntentResponse extends BaseIntentResponse {
  intent_type: 'WALLET';

  /**
   * The original wallet update request that would be sent to the wallet endpoint
   */
  request_details: WalletIntentResponse.RequestDetails;

  /**
   * Result of wallet update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * A wallet managed by Privy's wallet infrastructure.
   */
  current_resource_data?: WalletsAPI.Wallet;
}

export namespace WalletIntentResponse {
  /**
   * The original wallet update request that would be sent to the wallet endpoint
   */
  export interface RequestDetails {
    body: RequestDetails.Body;

    method: 'PATCH';

    url: string;
  }

  export namespace RequestDetails {
    export interface Body {
      /**
       * Additional signers for the wallet.
       */
      additional_signers?: WalletsAPI.AdditionalSignerInput;

      authorization_key_ids?: Array<string>;

      authorization_threshold?: number;

      display_name?: string | null;

      /**
       * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
       * null to remove the current owner.
       */
      owner?: SharedAPI.OwnerInput | null;

      /**
       * The key quorum ID to set as the owner of the resource. If you provide this, do
       * not specify an owner.
       */
      owner_id?: SharedAPI.OwnerIDInput | null;

      /**
       * An optional list of up to one policy ID to enforce on the wallet.
       */
      policy_ids?: WalletsAPI.PolicyInput;
    }
  }
}

export interface IntentListParams extends CursorParams {
  created_by_id?: string;

  current_user_has_signed?: 'true' | 'false';

  /**
   * Type of intent.
   */
  intent_type?: IntentType;

  pending_member_id?: string;

  resource_id?: string;

  sort_by?: 'created_at_desc' | 'expires_at_asc' | 'updated_at_desc';

  /**
   * Current status of an intent.
   */
  status?: IntentStatus;
}

export interface IntentCreatePolicyRuleParams {
  /**
   * Body param: The action to take when a policy rule matches.
   */
  action: PoliciesAPI.PolicyAction;

  /**
   * Body param
   */
  conditions: Array<PoliciesAPI.PolicyCondition>;

  /**
   * Body param: Method the rule applies to.
   */
  method: PoliciesAPI.PolicyMethod;

  /**
   * Body param
   */
  name: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface IntentDeletePolicyRuleParams {
  /**
   * Path param: ID of the policy.
   */
  policy_id: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export type IntentRpcParams =
  | IntentRpcParams.EthereumSignTransactionRpcInput
  | IntentRpcParams.EthereumSendTransactionRpcInput
  | IntentRpcParams.EthereumPersonalSignRpcInput
  | IntentRpcParams.EthereumSignTypedDataRpcInput
  | IntentRpcParams.EthereumSecp256k1SignRpcInput
  | IntentRpcParams.EthereumSign7702AuthorizationRpcInput
  | IntentRpcParams.EthereumSignUserOperationRpcInput
  | IntentRpcParams.EthereumSendCallsRpcInput
  | IntentRpcParams.SolanaSignTransactionRpcInput
  | IntentRpcParams.SolanaSignAndSendTransactionRpcInput
  | IntentRpcParams.SolanaSignMessageRpcInput
  | IntentRpcParams.SparkTransferRpcInput
  | IntentRpcParams.SparkGetBalanceRpcInput
  | IntentRpcParams.SparkTransferTokensRpcInput
  | IntentRpcParams.SparkGetStaticDepositAddressRpcInput
  | IntentRpcParams.SparkGetClaimStaticDepositQuoteRpcInput
  | IntentRpcParams.SparkClaimStaticDepositRpcInput
  | IntentRpcParams.SparkCreateLightningInvoiceRpcInput
  | IntentRpcParams.SparkPayLightningInvoiceRpcInput
  | IntentRpcParams.SparkSignMessageWithIdentityKeyRpcInput
  | IntentRpcParams.ExportPrivateKeyRpcInput
  | IntentRpcParams.ExportSeedPhraseRpcInput;

export declare namespace IntentRpcParams {
  export interface EthereumSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTransaction';

    /**
     * Body param: Parameters for the EVM `eth_signTransaction` RPC.
     */
    params: WalletsAPI.EthereumSignTransactionRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSendTransactionRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'eth_sendTransaction';

    /**
     * Body param: Parameters for the EVM `eth_sendTransaction` RPC.
     */
    params: WalletsAPI.EthereumSendTransactionRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: A hex-encoded string prefixed with '0x', capped at 100002 characters
     * (50,000 bytes).
     */
    experimental_data_suffix?: WalletsAPI.Hex;

    /**
     * Body param
     */
    reference_id?: string;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumPersonalSignRpcInput {
    /**
     * Body param
     */
    method: 'personal_sign';

    /**
     * Body param: Parameters for the EVM `personal_sign` RPC.
     */
    params: WalletsAPI.EthereumPersonalSignRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSignTypedDataRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTypedData_v4';

    /**
     * Body param: Parameters for the EVM `eth_signTypedData_v4` RPC.
     */
    params: WalletsAPI.EthereumSignTypedDataRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSecp256k1SignRpcInput {
    /**
     * Body param
     */
    method: 'secp256k1_sign';

    /**
     * Body param: Parameters for the EVM `secp256k1_sign` RPC.
     */
    params: WalletsAPI.EthereumSecp256k1SignRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSign7702AuthorizationRpcInput {
    /**
     * Body param
     */
    method: 'eth_sign7702Authorization';

    /**
     * Body param: Parameters for the EVM `eth_sign7702Authorization` RPC.
     */
    params: WalletsAPI.EthereumSign7702AuthorizationRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSignUserOperationRpcInput {
    /**
     * Body param
     */
    method: 'eth_signUserOperation';

    /**
     * Body param: Parameters for the EVM `eth_signUserOperation` RPC.
     */
    params: WalletsAPI.EthereumSignUserOperationRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface EthereumSendCallsRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'wallet_sendCalls';

    /**
     * Body param: Parameters for the `wallet_sendCalls` RPC.
     */
    params: WalletsAPI.EthereumSendCallsRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: A hex-encoded string prefixed with '0x', capped at 100002 characters
     * (50,000 bytes).
     */
    experimental_data_suffix?: WalletsAPI.Hex;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SolanaSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'signTransaction';

    /**
     * Body param: Parameters for the SVM `signTransaction` RPC.
     */
    params: WalletsAPI.SolanaSignTransactionRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'solana';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SolanaSignAndSendTransactionRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'signAndSendTransaction';

    /**
     * Body param: Parameters for the SVM `signAndSendTransaction` RPC.
     */
    params: WalletsAPI.SolanaSignAndSendTransactionRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'solana';

    /**
     * Body param
     */
    optimistic_broadcast?: boolean;

    /**
     * Body param
     */
    reference_id?: string;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SolanaSignMessageRpcInput {
    /**
     * Body param
     */
    method: 'signMessage';

    /**
     * Body param: Parameters for the SVM `signMessage` RPC.
     */
    params: WalletsAPI.SolanaSignMessageRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'solana';

    /**
     * Body param
     */
    wallet_id?: string;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkTransferRpcInput {
    /**
     * Body param
     */
    method: 'transfer';

    /**
     * Body param: Parameters for the Spark `transfer` RPC.
     */
    params: WalletsAPI.SparkTransferRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkGetBalanceRpcInput {
    /**
     * Body param
     */
    method: 'getBalance';

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkTransferTokensRpcInput {
    /**
     * Body param
     */
    method: 'transferTokens';

    /**
     * Body param: Parameters for the Spark `transferTokens` RPC.
     */
    params: WalletsAPI.SparkTransferTokensRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkGetStaticDepositAddressRpcInput {
    /**
     * Body param
     */
    method: 'getStaticDepositAddress';

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkGetClaimStaticDepositQuoteRpcInput {
    /**
     * Body param
     */
    method: 'getClaimStaticDepositQuote';

    /**
     * Body param: Parameters for the Spark `getClaimStaticDepositQuote` RPC.
     */
    params: WalletsAPI.SparkGetClaimStaticDepositQuoteRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkClaimStaticDepositRpcInput {
    /**
     * Body param
     */
    method: 'claimStaticDeposit';

    /**
     * Body param: Parameters for the Spark `claimStaticDeposit` RPC.
     */
    params: WalletsAPI.SparkClaimStaticDepositRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkCreateLightningInvoiceRpcInput {
    /**
     * Body param
     */
    method: 'createLightningInvoice';

    /**
     * Body param: Parameters for the Spark `createLightningInvoice` RPC.
     */
    params: WalletsAPI.SparkCreateLightningInvoiceRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkPayLightningInvoiceRpcInput {
    /**
     * Body param
     */
    method: 'payLightningInvoice';

    /**
     * Body param: Parameters for the Spark `payLightningInvoice` RPC.
     */
    params: WalletsAPI.SparkPayLightningInvoiceRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface SparkSignMessageWithIdentityKeyRpcInput {
    /**
     * Body param
     */
    method: 'signMessageWithIdentityKey';

    /**
     * Body param: Parameters for the Spark `signMessageWithIdentityKey` RPC.
     */
    params: WalletsAPI.SparkSignMessageWithIdentityKeyRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: WalletsAPI.SparkNetwork;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface ExportPrivateKeyRpcInput {
    /**
     * Body param
     */
    address: string;

    /**
     * Body param
     */
    method: 'exportPrivateKey';

    /**
     * Body param: Input for exporting a wallet (private key or seed phrase) with HPKE
     * encryption.
     */
    params: WalletsAPI.PrivateKeyExportInput;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export interface ExportSeedPhraseRpcInput {
    /**
     * Body param
     */
    address: string;

    /**
     * Body param
     */
    method: 'exportSeedPhrase';

    /**
     * Body param: Input for exporting a wallet (private key or seed phrase) with HPKE
     * encryption.
     */
    params: WalletsAPI.SeedPhraseExportInput;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }
}

export interface IntentTransferParams {
  /**
   * Body param: The destination address for a token transfer. Optionally specify a
   * different asset or chain for cross-asset or cross-chain transfers.
   */
  destination: WalletsAPI.TokenTransferDestination;

  /**
   * Body param: The source asset, amount, and chain for a token transfer. Specify
   * either `asset` (named) or `asset_address` (custom), not both.
   */
  source: WalletsAPI.TokenTransferSource;

  /**
   * Body param: Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Body param: Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: WalletsAPI.FeeConfiguration;

  /**
   * Body param: Maximum allowed slippage in basis points (1 bps = 0.01%). Only
   * applicable for cross-chain or cross-asset transfers; omit to use the provider
   * default.
   */
  slippage_bps?: number;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface IntentUpdateKeyQuorumParams {
  /**
   * Body param: The number of keys that must sign for an action to be valid. Must be
   * less than or equal to total number of key quorum members.
   */
  authorization_threshold?: number;

  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param: List of key quorum IDs that should be members of this key quorum.
   * Key quorums can only be nested 1 level deep.
   */
  key_quorum_ids?: Array<string>;

  /**
   * Body param: List of P-256 public keys of the keys that should be authorized to
   * sign on the key quorum, in base64-encoded DER format.
   */
  public_keys?: Array<string>;

  /**
   * Body param: List of user IDs of the users that should be authorized to sign on
   * the key quorum.
   */
  user_ids?: Array<string>;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface IntentUpdatePolicyParams {
  /**
   * Body param: Name to assign to policy.
   */
  name?: string;

  /**
   * Body param: The owner of the resource, specified as a Privy user ID, a P-256
   * public key, or null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * Body param
   */
  rules?: Array<PoliciesAPI.PolicyRuleRequestBody>;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface IntentUpdatePolicyRuleParams {
  /**
   * Path param: ID of the policy.
   */
  policy_id: string;

  /**
   * Body param: The action to take when a policy rule matches.
   */
  action: PoliciesAPI.PolicyAction;

  /**
   * Body param
   */
  conditions: Array<PoliciesAPI.PolicyCondition>;

  /**
   * Body param: Method the rule applies to.
   */
  method: PoliciesAPI.PolicyMethod;

  /**
   * Body param
   */
  name: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface IntentUpdateWalletParams {
  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: WalletsAPI.AdditionalSignerInput;

  /**
   * Body param: A human-readable label for the wallet. Set to null to clear.
   */
  display_name?: string | null;

  /**
   * Body param: The owner of the resource, specified as a Privy user ID, a P-256
   * public key, or null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * Body param: New policy IDs to enforce on the wallet. Currently, only one policy
   * is supported per wallet.
   */
  policy_ids?: Array<string>;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export declare namespace Intents {
  export {
    type BaseActionResult as BaseActionResult,
    type BaseIntentResponse as BaseIntentResponse,
    type IntentAuthorization as IntentAuthorization,
    type IntentAuthorizationKeyQuorumMember as IntentAuthorizationKeyQuorumMember,
    type IntentAuthorizationMember as IntentAuthorizationMember,
    type IntentAuthorizeInput as IntentAuthorizeInput,
    type IntentCreationHeaders as IntentCreationHeaders,
    type IntentResponse as IntentResponse,
    type IntentStatus as IntentStatus,
    type IntentType as IntentType,
    type KeyQuorumIntentResponse as KeyQuorumIntentResponse,
    type PolicyIntentRequestDetails as PolicyIntentRequestDetails,
    type PolicyIntentResponse as PolicyIntentResponse,
    type RpcIntentRequestDetails as RpcIntentRequestDetails,
    type RpcIntentResponse as RpcIntentResponse,
    type RuleDeleteIntentResponse as RuleDeleteIntentResponse,
    type RuleIntentCreateRequestDetails as RuleIntentCreateRequestDetails,
    type RuleIntentDeleteRequestDetails as RuleIntentDeleteRequestDetails,
    type RuleIntentRequestDetails as RuleIntentRequestDetails,
    type RuleIntentResponse as RuleIntentResponse,
    type RuleIntentUpdateRequestDetails as RuleIntentUpdateRequestDetails,
    type RuleMutateIntentResponse as RuleMutateIntentResponse,
    type TransferIntentRequestDetails as TransferIntentRequestDetails,
    type TransferIntentResponse as TransferIntentResponse,
    type WalletIntentResponse as WalletIntentResponse,
    type IntentResponsesCursor as IntentResponsesCursor,
    type IntentListParams as IntentListParams,
    type IntentCreatePolicyRuleParams as IntentCreatePolicyRuleParams,
    type IntentDeletePolicyRuleParams as IntentDeletePolicyRuleParams,
    type IntentRpcParams as IntentRpcParams,
    type IntentTransferParams as IntentTransferParams,
    type IntentUpdateKeyQuorumParams as IntentUpdateKeyQuorumParams,
    type IntentUpdatePolicyParams as IntentUpdatePolicyParams,
    type IntentUpdatePolicyRuleParams as IntentUpdatePolicyRuleParams,
    type IntentUpdateWalletParams as IntentUpdateWalletParams,
  };
}
