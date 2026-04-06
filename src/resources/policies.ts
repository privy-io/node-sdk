// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PoliciesAPI from './policies';
import * as SharedAPI from './shared';
import * as WalletsAPI from './wallets/wallets';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to policies
 */
export class Policies extends APIResource {
  /**
   * Create a new policy.
   *
   * @example
   * ```ts
   * const policy = await client.policies.create({
   *   chain_type: 'ethereum',
   *   name: 'x',
   *   rules: [
   *     {
   *       action: 'ALLOW',
   *       conditions: [
   *         {
   *           field: 'to',
   *           field_source: 'ethereum_transaction',
   *           operator: 'eq',
   *           value: 'string',
   *         },
   *       ],
   *       method: 'eth_sendTransaction',
   *       name: 'x',
   *     },
   *   ],
   *   version: '1.0',
   * });
   * ```
   */
  create(params: PolicyCreateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'privy-idempotency-key': privyIdempotencyKey, ...body } = params;
    return this._client.post('/v1/policies', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create a new rule for a policy.
   *
   * @example
   * ```ts
   * const policyRuleResponse =
   *   await client.policies._createRule(
   *     'xxxxxxxxxxxxxxxxxxxxxxxx',
   *     {
   *       action: 'ALLOW',
   *       conditions: [
   *         {
   *           field: 'to',
   *           field_source: 'ethereum_transaction',
   *           operator: 'eq',
   *           value: 'string',
   *         },
   *       ],
   *       method: 'eth_sendTransaction',
   *       name: 'x',
   *     },
   *   );
   * ```
   */
  _createRule(
    policyID: string,
    params: PolicyCreateRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyRuleResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/policies/${policyID}/rules`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a policy by policy ID.
   *
   * @example
   * ```ts
   * const successResponse = await client.policies._delete(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  _delete(
    policyID: string,
    params: PolicyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
    } = params ?? {};
    return this._client.delete(path`/v1/policies/${policyID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const successResponse = await client.policies._deleteRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  _deleteRule(
    ruleID: string,
    params: PolicyDeleteRuleParams,
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const {
      policy_id,
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
    } = params;
    return this._client.delete(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies._update(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  _update(policyID: string, params: PolicyUpdateParams, options?: RequestOptions): APIPromise<Policy> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.patch(path`/v1/policies/${policyID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const policyRuleResponse =
   *   await client.policies._updateRule(
   *     'xxxxxxxxxxxxxxxxxxxxxxxx',
   *     {
   *       policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
   *       action: 'ALLOW',
   *       conditions: [
   *         {
   *           field: 'to',
   *           field_source: 'ethereum_transaction',
   *           operator: 'eq',
   *           value: 'string',
   *         },
   *       ],
   *       method: 'eth_sendTransaction',
   *       name: 'x',
   *     },
   *   );
   * ```
   */
  _updateRule(
    ruleID: string,
    params: PolicyUpdateRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyRuleResponse> {
    const {
      policy_id,
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.patch(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies.get(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  get(policyID: string, options?: RequestOptions): APIPromise<Policy> {
    return this._client.get(path`/v1/policies/${policyID}`, options);
  }

  /**
   * Get a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const policyRuleResponse = await client.policies.getRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  getRule(
    ruleID: string,
    params: PolicyGetRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyRuleResponse> {
    const { policy_id } = params;
    return this._client.get(path`/v1/policies/${policy_id}/rules/${ruleID}`, options);
  }
}

/**
 * Unique ID of the condition set to take actions on.
 */
export interface ConditionSetRequestParams {
  condition_set_id: string;
}

/**
 * Unique IDs of the condition set and the condition set item within the condition
 * set to take actions on.
 */
export interface ConditionSetItemRequestParams {
  condition_set_id: string;

  condition_set_item_id: string;
}

/**
 * Request body for creating a condition set.
 */
export interface ConditionSetRequestBody {
  /**
   * Name to assign to condition set.
   */
  name: string;

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
}

/**
 * A condition set for grouping related condition values.
 */
export interface ConditionSet {
  /**
   * Unique ID of the created condition set. This will be the primary identifier when
   * using the condition set in the future.
   */
  id: string;

  /**
   * Unix timestamp of when the condition set was created in milliseconds.
   */
  created_at: number;

  /**
   * Name of the condition set.
   */
  name: string;

  /**
   * A unique identifier for a key quorum.
   */
  owner_id: SharedAPI.KeyQuorumID;
}

/**
 * Request body for updating a condition set.
 */
export interface UpdateConditionSetRequestBody {
  /**
   * Name to assign to condition set.
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
}

/**
 * A single value to add to a condition set.
 */
export interface ConditionSetItemValueInput {
  value: string;
}

/**
 * Array of values to add to the condition set. Maximum 100 items per request.
 */
export type ConditionSetItemsRequestBody = Array<ConditionSetItemValueInput>;

/**
 * A single item in a condition set.
 */
export interface ConditionSetItem {
  /**
   * Unique ID of the created condition set item.
   */
  id: string;

  /**
   * Unique ID of the condition set this item belongs to.
   */
  condition_set_id: string;

  /**
   * Unix timestamp of when the condition set item was created in milliseconds.
   */
  created_at: number;

  /**
   * The value stored in this condition set item.
   */
  value: string;
}

/**
 * Array of condition set items.
 */
export type ConditionSetItems = Array<ConditionSetItem>;

/**
 * Paginated list of condition set items.
 */
export interface ConditionSetItemsResponse {
  /**
   * List of condition set items.
   */
  items: Array<ConditionSetItem>;

  /**
   * Cursor for pagination. Null if there are no more items.
   */
  next_cursor: string | null;
}

/**
 * The action to take when a policy rule matches.
 */
export type PolicyAction = 'ALLOW' | 'DENY';

/**
 * A parameter in a Solidity ABI function or event definition.
 */
export interface AbiParameter {
  type: string;

  components?: Array<unknown>;

  indexed?: boolean;

  internalType?: string;

  name?: string;
}

/**
 * A Solidity ABI definition for decoding smart contract calldata.
 */
export type AbiSchema = Array<AbiSchema.AbiSchemaItem>;

export namespace AbiSchema {
  export interface AbiSchemaItem {
    type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

    anonymous?: boolean;

    inputs?: Array<PoliciesAPI.AbiParameter>;

    name?: string;

    outputs?: Array<PoliciesAPI.AbiParameter>;

    stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
  }
}

/**
 * Operator to use for SUI transaction command conditions. Only 'eq' and 'in' are
 * supported for command names.
 */
export type SuiTransactionCommandOperator = 'eq' | 'in';

/**
 * Supported fields for SUI TransferObjects command conditions. Only 'recipient'
 * and 'amount' are supported.
 */
export type SuiTransferObjectsCommandField = 'recipient' | 'amount';

/**
 * TRON transaction fields for TransferContract and TriggerSmartContract
 * transaction types.
 */
export interface TronTransactionCondition {
  /**
   * Supported TRON transaction fields in format "TransactionType.field_name"
   */
  field:
    | 'TransferContract.to_address'
    | 'TransferContract.amount'
    | 'TriggerSmartContract.contract_address'
    | 'TriggerSmartContract.call_value'
    | 'TriggerSmartContract.token_id'
    | 'TriggerSmartContract.call_token_value';

  field_source: 'tron_transaction';

  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

  value: string | Array<string>;
}

/**
 * Decoded calldata from a TRON TriggerSmartContract interaction.
 */
export interface TronCalldataCondition {
  /**
   * A Solidity ABI definition for decoding smart contract calldata.
   */
  abi: AbiSchema;

  field: string;

  field_source: 'tron_trigger_smart_contract_data';

  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

  value: string | Array<string>;
}

/**
 * SUI transaction command attributes, enables allowlisting specific command types.
 * Allowed commands: 'TransferObjects', 'SplitCoins', 'MergeCoins'. Only 'eq' and
 * 'in' operators are supported.
 */
export interface SuiTransactionCommandCondition {
  field: 'commandName';

  field_source: 'sui_transaction_command';

  /**
   * Operator to use for SUI transaction command conditions. Only 'eq' and 'in' are
   * supported for command names.
   */
  operator: SuiTransactionCommandOperator;

  /**
   * Command name(s) to match. Must be one of: 'TransferObjects', 'SplitCoins',
   * 'MergeCoins'
   */
  value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
}

/**
 * SUI TransferObjects command attributes, including recipient and amount fields.
 */
export interface SuiTransferObjectsCommandCondition {
  /**
   * Supported fields for SUI TransferObjects command conditions. Only 'recipient'
   * and 'amount' are supported.
   */
  field: SuiTransferObjectsCommandField;

  field_source: 'sui_transfer_objects_command';

  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

  value: string | Array<string>;
}

/**
 * Condition referencing an aggregation value. The field must start with
 * "aggregation." followed by the aggregation ID.
 */
export interface AggregationCondition {
  field: string;

  field_source: 'reference';

  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

  value: string | Array<string>;
}

/**
 * A condition that must be true for the rule action to be applied.
 */
export type PolicyCondition =
  | PolicyCondition.EthereumTransactionCondition
  | PolicyCondition.EthereumCalldataCondition
  | PolicyCondition.EthereumTypedDataDomainCondition
  | PolicyCondition.EthereumTypedDataMessageCondition
  | PolicyCondition.Ethereum7702AuthorizationCondition
  | PolicyCondition.SolanaProgramInstructionCondition
  | PolicyCondition.SolanaSystemProgramInstructionCondition
  | PolicyCondition.SolanaTokenProgramInstructionCondition
  | PolicyCondition.SystemCondition
  | TronTransactionCondition
  | TronCalldataCondition
  | SuiTransactionCommandCondition
  | SuiTransferObjectsCommandCondition
  | AggregationCondition;

export namespace PolicyCondition {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value' | 'chain_id';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    /**
     * A Solidity ABI definition for decoding smart contract calldata.
     */
    abi: PoliciesAPI.AbiSchema;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      /**
       * The type definitions for EIP-712 typed data signing.
       */
      types: WalletsAPI.TypedDataTypesInputParams;
    }
  }

  /**
   * Allowed contract addresses for eth_sign7702Authorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'Transfer.source'
      | 'Transfer.destination'
      | 'Transfer.authority'
      | 'Transfer.amount'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint'
      | 'Burn.account'
      | 'Burn.mint'
      | 'Burn.authority'
      | 'Burn.amount'
      | 'MintTo.mint'
      | 'MintTo.account'
      | 'MintTo.authority'
      | 'MintTo.amount'
      | 'CloseAccount.account'
      | 'CloseAccount.destination'
      | 'CloseAccount.authority'
      | 'InitializeAccount3.account'
      | 'InitializeAccount3.mint'
      | 'InitializeAccount3.owner';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

/**
 * Method the rule applies to.
 */
export type PolicyMethod =
  | 'eth_sendTransaction'
  | 'eth_signTransaction'
  | 'eth_signUserOperation'
  | 'eth_signTypedData_v4'
  | 'eth_sign7702Authorization'
  | 'wallet_sendCalls'
  | 'signTransaction'
  | 'signAndSendTransaction'
  | 'exportPrivateKey'
  | 'exportSeedPhrase'
  | 'signTransactionBytes'
  | '*';

/**
 * The rules that apply to each method the policy covers.
 */
export interface PolicyRuleRequestBody {
  /**
   * The action to take when a policy rule matches.
   */
  action: PolicyAction;

  conditions: Array<PolicyCondition>;

  /**
   * Method the rule applies to.
   */
  method: PolicyMethod;

  name: string;
}

/**
 * A rule that defines the conditions and action to take if the conditions are
 * true.
 */
export interface PolicyRuleResponse {
  id: string;

  /**
   * The action to take when a policy rule matches.
   */
  action: PolicyAction;

  conditions: Array<PolicyCondition>;

  /**
   * Method the rule applies to.
   */
  method: PolicyMethod;

  name: string;
}

/**
 * A policy for controlling wallet operations.
 */
export interface Policy {
  /**
   * Unique ID of the created policy. This will be the primary identifier when using
   * the policy in the future.
   */
  id: string;

  /**
   * The wallet chain types.
   */
  chain_type: WalletsAPI.WalletChainType;

  /**
   * Unix timestamp of when the policy was created in milliseconds.
   */
  created_at: number;

  /**
   * Name to assign to policy.
   */
  name: string;

  /**
   * The key quorum ID of the owner of the policy.
   */
  owner_id: string | null;

  rules: Array<PolicyRuleResponse>;

  /**
   * Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';
}

/**
 * Headers required to authorize modifications to policies.
 */
export interface PolicyAuthorizationHeaders {
  /**
   * ID of your Privy app.
   */
  'privy-app-id': string;

  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Request expiry. Value is a Unix timestamp in milliseconds representing the
   * deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

/**
 * Headers required to authorize modifications to condition sets.
 */
export interface ConditionSetAuthorizationHeaders {
  /**
   * ID of your Privy app.
   */
  'privy-app-id': string;

  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Request expiry. Value is a Unix timestamp in milliseconds representing the
   * deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyCreateParams {
  /**
   * Body param: The wallet chain types.
   */
  chain_type: WalletsAPI.WalletChainType;

  /**
   * Body param: Name to assign to policy.
   */
  name: string;

  /**
   * Body param
   */
  rules: Array<PolicyCreateParams.Rule>;

  /**
   * Body param: Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';

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
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;
}

export namespace PolicyCreateParams {
  export interface Rule {
    /**
     * The action to take when a policy rule matches.
     */
    action: PoliciesAPI.PolicyAction;

    conditions: Array<PoliciesAPI.PolicyCondition>;

    /**
     * Method the rule applies to.
     */
    method: PoliciesAPI.PolicyMethod;

    name: string;

    id?: string;
  }
}

export interface PolicyCreateRuleParams {
  /**
   * Body param: The action to take when a policy rule matches.
   */
  action: PolicyAction;

  /**
   * Body param
   */
  conditions: Array<PolicyCondition>;

  /**
   * Body param: Method the rule applies to.
   */
  method: PolicyMethod;

  /**
   * Body param
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyDeleteParams {
  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Request expiry. Value is a Unix timestamp in milliseconds representing the
   * deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyDeleteRuleParams {
  /**
   * Path param
   */
  policy_id: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyUpdateParams {
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
  rules?: Array<PolicyRuleRequestBody>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyUpdateRuleParams {
  /**
   * Path param
   */
  policy_id: string;

  /**
   * Body param: The action to take when a policy rule matches.
   */
  action: PolicyAction;

  /**
   * Body param
   */
  conditions: Array<PolicyCondition>;

  /**
   * Body param: Method the rule applies to.
   */
  method: PolicyMethod;

  /**
   * Body param
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface PolicyGetRuleParams {
  policy_id: string;
}

export declare namespace Policies {
  export {
    type ConditionSetRequestParams as ConditionSetRequestParams,
    type ConditionSetItemRequestParams as ConditionSetItemRequestParams,
    type ConditionSetRequestBody as ConditionSetRequestBody,
    type ConditionSet as ConditionSet,
    type UpdateConditionSetRequestBody as UpdateConditionSetRequestBody,
    type ConditionSetItemValueInput as ConditionSetItemValueInput,
    type ConditionSetItemsRequestBody as ConditionSetItemsRequestBody,
    type ConditionSetItem as ConditionSetItem,
    type ConditionSetItems as ConditionSetItems,
    type ConditionSetItemsResponse as ConditionSetItemsResponse,
    type PolicyAction as PolicyAction,
    type AbiParameter as AbiParameter,
    type AbiSchema as AbiSchema,
    type SuiTransactionCommandOperator as SuiTransactionCommandOperator,
    type SuiTransferObjectsCommandField as SuiTransferObjectsCommandField,
    type TronTransactionCondition as TronTransactionCondition,
    type TronCalldataCondition as TronCalldataCondition,
    type SuiTransactionCommandCondition as SuiTransactionCommandCondition,
    type SuiTransferObjectsCommandCondition as SuiTransferObjectsCommandCondition,
    type AggregationCondition as AggregationCondition,
    type PolicyCondition as PolicyCondition,
    type PolicyMethod as PolicyMethod,
    type PolicyRuleRequestBody as PolicyRuleRequestBody,
    type PolicyRuleResponse as PolicyRuleResponse,
    type Policy as Policy,
    type PolicyAuthorizationHeaders as PolicyAuthorizationHeaders,
    type ConditionSetAuthorizationHeaders as ConditionSetAuthorizationHeaders,
    type PolicyCreateParams as PolicyCreateParams,
    type PolicyCreateRuleParams as PolicyCreateRuleParams,
    type PolicyDeleteParams as PolicyDeleteParams,
    type PolicyDeleteRuleParams as PolicyDeleteRuleParams,
    type PolicyUpdateParams as PolicyUpdateParams,
    type PolicyUpdateRuleParams as PolicyUpdateRuleParams,
    type PolicyGetRuleParams as PolicyGetRuleParams,
  };
}
