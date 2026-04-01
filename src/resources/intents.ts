// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';
import * as KeyQuorumsAPI from './key-quorums';
import * as PoliciesAPI from './policies';
import * as WalletsAPI from './wallets/wallets';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
   * const ruleIntentResponse =
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
  ): APIPromise<RuleIntentResponse> {
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
   * const ruleIntentResponse =
   *   await client.intents.deletePolicyRule('rule_id', {
   *     policy_id: 'policy_id',
   *   });
   * ```
   */
  deletePolicyRule(
    ruleID: string,
    params: IntentDeletePolicyRuleParams,
    options?: RequestOptions,
  ): APIPromise<RuleIntentResponse> {
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
   * const ruleIntentResponse =
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
  ): APIPromise<RuleIntentResponse> {
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
 * Type of intent.
 */
export type IntentType = 'KEY_QUORUM' | 'POLICY' | 'RULE' | 'RPC' | 'WALLET';

/**
 * Current status of an intent.
 */
export type IntentStatus = 'pending' | 'executed' | 'failed' | 'expired' | 'rejected' | 'dismissed';

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
 * Request details for a policy intent.
 */
export interface PolicyIntentRequestDetails {
  body: PolicyIntentRequestDetails.Body;

  method: 'PATCH';

  url: string;
}

export namespace PolicyIntentRequestDetails {
  export interface Body {
    name?: string;

    owner?: Body.UserID | Body.PublicKey | null;

    owner_id?: string | null;

    rules?: Array<Body.Rule>;
  }

  export namespace Body {
    export interface UserID {
      user_id: string;
    }

    export interface PublicKey {
      public_key: string;
    }

    export interface Rule {
      action: 'ALLOW' | 'DENY';

      conditions: Array<
        | Rule.UnionMember0
        | Rule.UnionMember1
        | Rule.UnionMember2
        | Rule.UnionMember3
        | Rule.UnionMember4
        | Rule.UnionMember5
        | Rule.UnionMember6
        | Rule.UnionMember7
        | Rule.UnionMember8
        | Rule.UnionMember9
        | Rule.UnionMember10
        | Rule.UnionMember11
        | Rule.UnionMember12
        | Rule.UnionMember13
      >;

      method:
        | 'eth_sendTransaction'
        | 'eth_signTransaction'
        | 'eth_signTypedData_v4'
        | 'eth_signUserOperation'
        | 'eth_sign7702Authorization'
        | 'signTransaction'
        | 'signAndSendTransaction'
        | 'signTransactionBytes'
        | 'exportPrivateKey'
        | '*';

      name: string;
    }

    export namespace Rule {
      export interface UnionMember0 {
        field: 'to' | 'value' | 'chain_id';

        field_source: 'ethereum_transaction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember1 {
        abi: Array<UnionMember1.Abi>;

        field: string;

        field_source: 'ethereum_calldata';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember1 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember2 {
        field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

        field_source: 'ethereum_typed_data_domain';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember3 {
        field: string;

        field_source: 'ethereum_typed_data_message';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        typed_data: UnionMember3.TypedData;

        value: string | Array<string>;
      }

      export namespace UnionMember3 {
        export interface TypedData {
          primary_type: string;

          types: { [key: string]: Array<TypedData.Type> };
        }

        export namespace TypedData {
          export interface Type {
            name: string;

            type: string;
          }
        }
      }

      export interface UnionMember4 {
        field: 'contract';

        field_source: 'ethereum_7702_authorization';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember5 {
        field: 'programId';

        field_source: 'solana_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember6 {
        field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

        field_source: 'solana_system_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember7 {
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

      export interface UnionMember8 {
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

      export interface UnionMember9 {
        field: 'current_unix_timestamp';

        field_source: 'system';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember10 {
        field: string;

        field_source: 'reference';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember11 {
        abi: Array<UnionMember11.Abi>;

        field: string;

        field_source: 'tron_trigger_smart_contract_data';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember11 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember12 {
        field: 'commandName';

        field_source: 'sui_transaction_command';

        operator: 'eq' | 'in';

        /**
         * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
         */
        value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
      }

      export interface UnionMember13 {
        field: 'recipient' | 'amount';

        field_source: 'sui_transfer_objects_command';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }
    }
  }
}

/**
 * Request details for creating a rule via intent.
 */
export interface RuleIntentCreateRequestDetails {
  body: RuleIntentCreateRequestDetails.Body;

  method: 'POST';

  url: string;
}

export namespace RuleIntentCreateRequestDetails {
  export interface Body {
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Body.UnionMember0
      | Body.UnionMember1
      | Body.UnionMember2
      | Body.UnionMember3
      | Body.UnionMember4
      | Body.UnionMember5
      | Body.UnionMember6
      | Body.UnionMember7
      | Body.UnionMember8
      | Body.UnionMember9
      | Body.UnionMember10
      | Body.UnionMember11
      | Body.UnionMember12
      | Body.UnionMember13
    >;

    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_signUserOperation'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'signTransactionBytes'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace Body {
    export interface UnionMember0 {
      field: 'to' | 'value' | 'chain_id';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember1 {
      abi: Array<UnionMember1.Abi>;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember1 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember2 {
      field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember3 {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: UnionMember3.TypedData;

      value: string | Array<string>;
    }

    export namespace UnionMember3 {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    export interface UnionMember4 {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember5 {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember6 {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember7 {
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

    export interface UnionMember8 {
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

    export interface UnionMember9 {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember10 {
      field: string;

      field_source: 'reference';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember11 {
      abi: Array<UnionMember11.Abi>;

      field: string;

      field_source: 'tron_trigger_smart_contract_data';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember11 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember12 {
      field: 'commandName';

      field_source: 'sui_transaction_command';

      operator: 'eq' | 'in';

      /**
       * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
       */
      value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
    }

    export interface UnionMember13 {
      field: 'recipient' | 'amount';

      field_source: 'sui_transfer_objects_command';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }
}

/**
 * Request details for updating a rule via intent.
 */
export interface RuleIntentUpdateRequestDetails {
  body: RuleIntentUpdateRequestDetails.Body;

  method: 'PATCH';

  url: string;
}

export namespace RuleIntentUpdateRequestDetails {
  export interface Body {
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Body.UnionMember0
      | Body.UnionMember1
      | Body.UnionMember2
      | Body.UnionMember3
      | Body.UnionMember4
      | Body.UnionMember5
      | Body.UnionMember6
      | Body.UnionMember7
      | Body.UnionMember8
      | Body.UnionMember9
      | Body.UnionMember10
      | Body.UnionMember11
      | Body.UnionMember12
      | Body.UnionMember13
    >;

    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_signUserOperation'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'signTransactionBytes'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace Body {
    export interface UnionMember0 {
      field: 'to' | 'value' | 'chain_id';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember1 {
      abi: Array<UnionMember1.Abi>;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember1 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember2 {
      field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember3 {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: UnionMember3.TypedData;

      value: string | Array<string>;
    }

    export namespace UnionMember3 {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    export interface UnionMember4 {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember5 {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember6 {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember7 {
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

    export interface UnionMember8 {
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

    export interface UnionMember9 {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember10 {
      field: string;

      field_source: 'reference';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember11 {
      abi: Array<UnionMember11.Abi>;

      field: string;

      field_source: 'tron_trigger_smart_contract_data';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember11 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember12 {
      field: 'commandName';

      field_source: 'sui_transaction_command';

      operator: 'eq' | 'in';

      /**
       * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
       */
      value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
    }

    export interface UnionMember13 {
      field: 'recipient' | 'amount';

      field_source: 'sui_transfer_objects_command';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }
}

/**
 * Request details for deleting a rule via intent.
 */
export interface RuleIntentDeleteRequestDetails {
  method: 'DELETE';

  url: string;

  body?: unknown;
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
 * Response for an RPC intent
 */
export interface RpcIntentResponse {
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

  intent_type: 'RPC';

  /**
   * The original RPC request that would be sent to the wallet endpoint
   */
  request_details: RpcIntentResponse.RequestDetails;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * Result of RPC execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * A wallet managed by Privy's wallet infrastructure.
   */
  current_resource_data?: WalletsAPI.Wallet;

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
 * Response for a wallet intent
 */
export interface WalletIntentResponse {
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

  intent_type: 'WALLET';

  /**
   * The original wallet update request that would be sent to the wallet endpoint
   */
  request_details: WalletIntentResponse.RequestDetails;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * Result of wallet update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * A wallet managed by Privy's wallet infrastructure.
   */
  current_resource_data?: WalletsAPI.Wallet;

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
      additional_signers?: Array<Body.AdditionalSigner>;

      authorization_key_ids?: Array<string>;

      authorization_threshold?: number;

      owner?: Body.UserID | Body.PublicKey | null;

      owner_id?: string | null;

      policy_ids?: Array<string>;
    }

    export namespace Body {
      export interface AdditionalSigner {
        signer_id: string;

        override_policy_ids?: Array<string>;
      }

      export interface UserID {
        user_id: string;
      }

      export interface PublicKey {
        public_key: string;
      }
    }
  }
}

/**
 * Response for a policy intent
 */
export interface PolicyIntentResponse {
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

  intent_type: 'POLICY';

  /**
   * The original policy update request that would be sent to the policy endpoint
   */
  request_details: PolicyIntentResponse.RequestDetails;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * Result of policy update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * Current state of the policy before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  current_resource_data?: PolicyIntentResponse.CurrentResourceData;

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
      name?: string;

      owner?: Body.UserID | Body.PublicKey | null;

      owner_id?: string | null;

      rules?: Array<Body.Rule>;
    }

    export namespace Body {
      export interface UserID {
        user_id: string;
      }

      export interface PublicKey {
        public_key: string;
      }

      export interface Rule {
        action: 'ALLOW' | 'DENY';

        conditions: Array<
          | Rule.UnionMember0
          | Rule.UnionMember1
          | Rule.UnionMember2
          | Rule.UnionMember3
          | Rule.UnionMember4
          | Rule.UnionMember5
          | Rule.UnionMember6
          | Rule.UnionMember7
          | Rule.UnionMember8
          | Rule.UnionMember9
          | Rule.UnionMember10
          | Rule.UnionMember11
          | Rule.UnionMember12
          | Rule.UnionMember13
        >;

        method:
          | 'eth_sendTransaction'
          | 'eth_signTransaction'
          | 'eth_signTypedData_v4'
          | 'eth_signUserOperation'
          | 'eth_sign7702Authorization'
          | 'signTransaction'
          | 'signAndSendTransaction'
          | 'signTransactionBytes'
          | 'exportPrivateKey'
          | '*';

        name: string;
      }

      export namespace Rule {
        export interface UnionMember0 {
          field: 'to' | 'value' | 'chain_id';

          field_source: 'ethereum_transaction';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember1 {
          abi: Array<UnionMember1.Abi>;

          field: string;

          field_source: 'ethereum_calldata';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export namespace UnionMember1 {
          export interface Abi {
            type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

            anonymous?: boolean;

            inputs?: Array<Abi.Input>;

            name?: string;

            outputs?: Array<Abi.Output>;

            stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
          }

          export namespace Abi {
            export interface Input {
              type: string;

              components?: Array<unknown>;

              indexed?: boolean;

              internalType?: string;

              name?: string;
            }

            export interface Output {
              type: string;

              components?: Array<unknown>;

              indexed?: boolean;

              internalType?: string;

              name?: string;
            }
          }
        }

        export interface UnionMember2 {
          field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

          field_source: 'ethereum_typed_data_domain';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember3 {
          field: string;

          field_source: 'ethereum_typed_data_message';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          typed_data: UnionMember3.TypedData;

          value: string | Array<string>;
        }

        export namespace UnionMember3 {
          export interface TypedData {
            primary_type: string;

            types: { [key: string]: Array<TypedData.Type> };
          }

          export namespace TypedData {
            export interface Type {
              name: string;

              type: string;
            }
          }
        }

        export interface UnionMember4 {
          field: 'contract';

          field_source: 'ethereum_7702_authorization';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember5 {
          field: 'programId';

          field_source: 'solana_program_instruction';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember6 {
          field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

          field_source: 'solana_system_program_instruction';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember7 {
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

        export interface UnionMember8 {
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

        export interface UnionMember9 {
          field: 'current_unix_timestamp';

          field_source: 'system';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember10 {
          field: string;

          field_source: 'reference';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export interface UnionMember11 {
          abi: Array<UnionMember11.Abi>;

          field: string;

          field_source: 'tron_trigger_smart_contract_data';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }

        export namespace UnionMember11 {
          export interface Abi {
            type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

            anonymous?: boolean;

            inputs?: Array<Abi.Input>;

            name?: string;

            outputs?: Array<Abi.Output>;

            stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
          }

          export namespace Abi {
            export interface Input {
              type: string;

              components?: Array<unknown>;

              indexed?: boolean;

              internalType?: string;

              name?: string;
            }

            export interface Output {
              type: string;

              components?: Array<unknown>;

              indexed?: boolean;

              internalType?: string;

              name?: string;
            }
          }
        }

        export interface UnionMember12 {
          field: 'commandName';

          field_source: 'sui_transaction_command';

          operator: 'eq' | 'in';

          /**
           * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
           */
          value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
        }

        export interface UnionMember13 {
          field: 'recipient' | 'amount';

          field_source: 'sui_transfer_objects_command';

          operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

          value: string | Array<string>;
        }
      }
    }
  }

  /**
   * Current state of the policy before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  export interface CurrentResourceData {
    id: string;

    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    created_at: number;

    name: string;

    owner_id: string | null;

    rules: Array<CurrentResourceData.Rule>;

    version: '1.0';
  }

  export namespace CurrentResourceData {
    export interface Rule {
      id: string;

      action: 'ALLOW' | 'DENY';

      conditions: Array<
        | Rule.UnionMember0
        | Rule.UnionMember1
        | Rule.UnionMember2
        | Rule.UnionMember3
        | Rule.UnionMember4
        | Rule.UnionMember5
        | Rule.UnionMember6
        | Rule.UnionMember7
        | Rule.UnionMember8
        | Rule.UnionMember9
        | Rule.UnionMember10
        | Rule.UnionMember11
        | Rule.UnionMember12
        | Rule.UnionMember13
      >;

      method:
        | 'eth_sendTransaction'
        | 'eth_signTransaction'
        | 'eth_signTypedData_v4'
        | 'eth_signUserOperation'
        | 'eth_sign7702Authorization'
        | 'signTransaction'
        | 'signAndSendTransaction'
        | 'signTransactionBytes'
        | 'exportPrivateKey'
        | '*';

      name: string;
    }

    export namespace Rule {
      export interface UnionMember0 {
        field: 'to' | 'value' | 'chain_id';

        field_source: 'ethereum_transaction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember1 {
        abi: Array<UnionMember1.Abi>;

        field: string;

        field_source: 'ethereum_calldata';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember1 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember2 {
        field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

        field_source: 'ethereum_typed_data_domain';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember3 {
        field: string;

        field_source: 'ethereum_typed_data_message';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        typed_data: UnionMember3.TypedData;

        value: string | Array<string>;
      }

      export namespace UnionMember3 {
        export interface TypedData {
          primary_type: string;

          types: { [key: string]: Array<TypedData.Type> };
        }

        export namespace TypedData {
          export interface Type {
            name: string;

            type: string;
          }
        }
      }

      export interface UnionMember4 {
        field: 'contract';

        field_source: 'ethereum_7702_authorization';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember5 {
        field: 'programId';

        field_source: 'solana_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember6 {
        field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

        field_source: 'solana_system_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember7 {
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

      export interface UnionMember8 {
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

      export interface UnionMember9 {
        field: 'current_unix_timestamp';

        field_source: 'system';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember10 {
        field: string;

        field_source: 'reference';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember11 {
        abi: Array<UnionMember11.Abi>;

        field: string;

        field_source: 'tron_trigger_smart_contract_data';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember11 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember12 {
        field: 'commandName';

        field_source: 'sui_transaction_command';

        operator: 'eq' | 'in';

        /**
         * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
         */
        value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
      }

      export interface UnionMember13 {
        field: 'recipient' | 'amount';

        field_source: 'sui_transfer_objects_command';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }
    }
  }
}

/**
 * Response for a key quorum intent
 */
export interface KeyQuorumIntentResponse {
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

  intent_type: 'KEY_QUORUM';

  /**
   * The original key quorum update request that would be sent to the key quorum
   * endpoint
   */
  request_details: KeyQuorumIntentResponse.RequestDetails;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * Result of key quorum update execution (only present if status is 'executed' or
   * 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * A key quorum for authorizing wallet operations.
   */
  current_resource_data?: KeyQuorumsAPI.KeyQuorum;

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

export namespace KeyQuorumIntentResponse {
  /**
   * The original key quorum update request that would be sent to the key quorum
   * endpoint
   */
  export interface RequestDetails {
    /**
     * Request input for updating an existing key quorum.
     */
    body: KeyQuorumsAPI.KeyQuorumUpdateParams;

    method: 'PATCH';

    url: string;
  }
}

/**
 * Response for a rule intent
 */
export interface RuleIntentResponse {
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

  intent_type: 'RULE';

  /**
   * The original rule request. Method is POST (create), PATCH (update), or DELETE
   * (delete)
   */
  request_details: RuleIntentRequestDetails;

  /**
   * ID of the resource being modified (wallet_id, policy_id, etc)
   */
  resource_id: string;

  /**
   * Current status of an intent.
   */
  status: IntentStatus;

  /**
   * Result of rule execution (only present if status is 'executed' or 'failed')
   */
  action_result?: BaseActionResult;

  /**
   * ID of the user who created the intent. If undefined, the intent was created
   * using the app secret
   */
  created_by_id?: string;

  /**
   * Current state of the rule before any changes. Undefined for create intents or if
   * the rule was deleted
   */
  current_resource_data?: RuleIntentResponse.CurrentResourceData;

  /**
   * Human-readable reason for dismissal, present when status is 'dismissed'
   */
  dismissal_reason?: string;

  /**
   * Unix timestamp when the intent was dismissed, present when status is 'dismissed'
   */
  dismissed_at?: number;

  /**
   * Parent policy containing this rule, including sibling rules for contextual
   * display
   */
  policy?: RuleIntentResponse.Policy;

  /**
   * Unix timestamp when the intent was rejected, present when status is 'rejected'
   */
  rejected_at?: number;
}

export namespace RuleIntentResponse {
  /**
   * Current state of the rule before any changes. Undefined for create intents or if
   * the rule was deleted
   */
  export interface CurrentResourceData {
    id: string;

    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | CurrentResourceData.UnionMember0
      | CurrentResourceData.UnionMember1
      | CurrentResourceData.UnionMember2
      | CurrentResourceData.UnionMember3
      | CurrentResourceData.UnionMember4
      | CurrentResourceData.UnionMember5
      | CurrentResourceData.UnionMember6
      | CurrentResourceData.UnionMember7
      | CurrentResourceData.UnionMember8
      | CurrentResourceData.UnionMember9
      | CurrentResourceData.UnionMember10
      | CurrentResourceData.UnionMember11
      | CurrentResourceData.UnionMember12
      | CurrentResourceData.UnionMember13
    >;

    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_signUserOperation'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'signTransactionBytes'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace CurrentResourceData {
    export interface UnionMember0 {
      field: 'to' | 'value' | 'chain_id';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember1 {
      abi: Array<UnionMember1.Abi>;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember1 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember2 {
      field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember3 {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: UnionMember3.TypedData;

      value: string | Array<string>;
    }

    export namespace UnionMember3 {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    export interface UnionMember4 {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember5 {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember6 {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember7 {
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

    export interface UnionMember8 {
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

    export interface UnionMember9 {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember10 {
      field: string;

      field_source: 'reference';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export interface UnionMember11 {
      abi: Array<UnionMember11.Abi>;

      field: string;

      field_source: 'tron_trigger_smart_contract_data';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    export namespace UnionMember11 {
      export interface Abi {
        type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

        anonymous?: boolean;

        inputs?: Array<Abi.Input>;

        name?: string;

        outputs?: Array<Abi.Output>;

        stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
      }

      export namespace Abi {
        export interface Input {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }

        export interface Output {
          type: string;

          components?: Array<unknown>;

          indexed?: boolean;

          internalType?: string;

          name?: string;
        }
      }
    }

    export interface UnionMember12 {
      field: 'commandName';

      field_source: 'sui_transaction_command';

      operator: 'eq' | 'in';

      /**
       * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
       */
      value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
    }

    export interface UnionMember13 {
      field: 'recipient' | 'amount';

      field_source: 'sui_transfer_objects_command';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }

  /**
   * Parent policy containing this rule, including sibling rules for contextual
   * display
   */
  export interface Policy {
    id: string;

    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    created_at: number;

    name: string;

    owner_id: string | null;

    rules: Array<Policy.Rule>;

    version: '1.0';
  }

  export namespace Policy {
    export interface Rule {
      id: string;

      action: 'ALLOW' | 'DENY';

      conditions: Array<
        | Rule.UnionMember0
        | Rule.UnionMember1
        | Rule.UnionMember2
        | Rule.UnionMember3
        | Rule.UnionMember4
        | Rule.UnionMember5
        | Rule.UnionMember6
        | Rule.UnionMember7
        | Rule.UnionMember8
        | Rule.UnionMember9
        | Rule.UnionMember10
        | Rule.UnionMember11
        | Rule.UnionMember12
        | Rule.UnionMember13
      >;

      method:
        | 'eth_sendTransaction'
        | 'eth_signTransaction'
        | 'eth_signTypedData_v4'
        | 'eth_signUserOperation'
        | 'eth_sign7702Authorization'
        | 'signTransaction'
        | 'signAndSendTransaction'
        | 'signTransactionBytes'
        | 'exportPrivateKey'
        | '*';

      name: string;
    }

    export namespace Rule {
      export interface UnionMember0 {
        field: 'to' | 'value' | 'chain_id';

        field_source: 'ethereum_transaction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember1 {
        abi: Array<UnionMember1.Abi>;

        field: string;

        field_source: 'ethereum_calldata';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember1 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember2 {
        field: 'chainId' | 'verifyingContract' | 'chain_id' | 'verifying_contract';

        field_source: 'ethereum_typed_data_domain';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember3 {
        field: string;

        field_source: 'ethereum_typed_data_message';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        typed_data: UnionMember3.TypedData;

        value: string | Array<string>;
      }

      export namespace UnionMember3 {
        export interface TypedData {
          primary_type: string;

          types: { [key: string]: Array<TypedData.Type> };
        }

        export namespace TypedData {
          export interface Type {
            name: string;

            type: string;
          }
        }
      }

      export interface UnionMember4 {
        field: 'contract';

        field_source: 'ethereum_7702_authorization';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember5 {
        field: 'programId';

        field_source: 'solana_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember6 {
        field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

        field_source: 'solana_system_program_instruction';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember7 {
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

      export interface UnionMember8 {
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

      export interface UnionMember9 {
        field: 'current_unix_timestamp';

        field_source: 'system';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember10 {
        field: string;

        field_source: 'reference';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export interface UnionMember11 {
        abi: Array<UnionMember11.Abi>;

        field: string;

        field_source: 'tron_trigger_smart_contract_data';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }

      export namespace UnionMember11 {
        export interface Abi {
          type: 'function' | 'constructor' | 'event' | 'fallback' | 'receive';

          anonymous?: boolean;

          inputs?: Array<Abi.Input>;

          name?: string;

          outputs?: Array<Abi.Output>;

          stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
        }

        export namespace Abi {
          export interface Input {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }

          export interface Output {
            type: string;

            components?: Array<unknown>;

            indexed?: boolean;

            internalType?: string;

            name?: string;
          }
        }
      }

      export interface UnionMember12 {
        field: 'commandName';

        field_source: 'sui_transaction_command';

        operator: 'eq' | 'in';

        /**
         * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
         */
        value: WalletsAPI.SuiCommandName | Array<WalletsAPI.SuiCommandName>;
      }

      export interface UnionMember13 {
        field: 'recipient' | 'amount';

        field_source: 'sui_transfer_objects_command';

        operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

        value: string | Array<string>;
      }
    }
  }
}

/**
 * Response for an intent object
 */
export type IntentResponse =
  | RpcIntentResponse
  | WalletIntentResponse
  | PolicyIntentResponse
  | RuleIntentResponse
  | KeyQuorumIntentResponse;

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
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param
   */
  conditions: Array<
    | IntentCreatePolicyRuleParams.EthereumTransactionCondition
    | IntentCreatePolicyRuleParams.EthereumCalldataCondition
    | IntentCreatePolicyRuleParams.EthereumTypedDataDomainCondition
    | IntentCreatePolicyRuleParams.EthereumTypedDataMessageCondition
    | IntentCreatePolicyRuleParams.Ethereum7702AuthorizationCondition
    | IntentCreatePolicyRuleParams.SolanaProgramInstructionCondition
    | IntentCreatePolicyRuleParams.SolanaSystemProgramInstructionCondition
    | IntentCreatePolicyRuleParams.SolanaTokenProgramInstructionCondition
    | IntentCreatePolicyRuleParams.SystemCondition
    | PoliciesAPI.TronTransactionCondition
    | PoliciesAPI.SuiTransactionCommandCondition
    | PoliciesAPI.SuiTransferObjectsCommandCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signUserOperation'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | 'signTransactionBytes'
    | '*';

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

export namespace IntentCreatePolicyRuleParams {
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
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

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

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
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
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

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
  | IntentRpcParams.ExportPrivateKeyRpcInput;

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
     * Body param
     */
    caip2: string;

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
     * Body param
     */
    caip2: string;

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
     * Body param: Input for exporting a wallet private key with HPKE encryption.
     */
    params: WalletsAPI.PrivateKeyExportInput;

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }
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
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: IntentUpdatePolicyParams.PublicKeyOwner | IntentUpdatePolicyParams.UserOwner | null;

  /**
   * Body param
   */
  owner_id?: string | null;

  /**
   * Body param
   */
  rules?: Array<IntentUpdatePolicyParams.Rule>;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export namespace IntentUpdatePolicyParams {
  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
   */
  export interface PublicKeyOwner {
    public_key: string;
  }

  /**
   * The user ID of the owner of the resource. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserOwner {
    user_id: string;
  }

  /**
   * The rules that apply to each method the policy covers.
   */
  export interface Rule {
    /**
     * Action to take if the conditions are true.
     */
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Rule.EthereumTransactionCondition
      | Rule.EthereumCalldataCondition
      | Rule.EthereumTypedDataDomainCondition
      | Rule.EthereumTypedDataMessageCondition
      | Rule.Ethereum7702AuthorizationCondition
      | Rule.SolanaProgramInstructionCondition
      | Rule.SolanaSystemProgramInstructionCondition
      | Rule.SolanaTokenProgramInstructionCondition
      | Rule.SystemCondition
      | PoliciesAPI.TronTransactionCondition
      | PoliciesAPI.SuiTransactionCommandCondition
      | PoliciesAPI.SuiTransferObjectsCommandCondition
    >;

    /**
     * Method the rule applies to.
     */
    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signUserOperation'
      | 'eth_signTypedData_v4'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'exportPrivateKey'
      | 'signTransactionBytes'
      | '*';

    name: string;
  }

  export namespace Rule {
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
      abi: unknown;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Attributes from the signing domain that will verify the signature.
     */
    export interface EthereumTypedDataDomainCondition {
      field: 'chainId' | 'verifyingContract';

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

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
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
        | 'TransferChecked.source'
        | 'TransferChecked.destination'
        | 'TransferChecked.authority'
        | 'TransferChecked.amount'
        | 'TransferChecked.mint';

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
}

export interface IntentUpdatePolicyRuleParams {
  /**
   * Path param: ID of the policy.
   */
  policy_id: string;

  /**
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param
   */
  conditions: Array<
    | IntentUpdatePolicyRuleParams.EthereumTransactionCondition
    | IntentUpdatePolicyRuleParams.EthereumCalldataCondition
    | IntentUpdatePolicyRuleParams.EthereumTypedDataDomainCondition
    | IntentUpdatePolicyRuleParams.EthereumTypedDataMessageCondition
    | IntentUpdatePolicyRuleParams.Ethereum7702AuthorizationCondition
    | IntentUpdatePolicyRuleParams.SolanaProgramInstructionCondition
    | IntentUpdatePolicyRuleParams.SolanaSystemProgramInstructionCondition
    | IntentUpdatePolicyRuleParams.SolanaTokenProgramInstructionCondition
    | IntentUpdatePolicyRuleParams.SystemCondition
    | PoliciesAPI.TronTransactionCondition
    | PoliciesAPI.SuiTransactionCommandCondition
    | PoliciesAPI.SuiTransferObjectsCommandCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signUserOperation'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | 'signTransactionBytes'
    | '*';

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

export namespace IntentUpdatePolicyRuleParams {
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
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

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

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
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
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

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

export interface IntentUpdateWalletParams {
  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: Array<IntentUpdateWalletParams.AdditionalSigner>;

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: IntentUpdateWalletParams.PublicKeyOwner | IntentUpdateWalletParams.UserOwner | null;

  /**
   * Body param
   */
  owner_id?: string | null;

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

export namespace IntentUpdateWalletParams {
  export interface AdditionalSigner {
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }

  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
   */
  export interface PublicKeyOwner {
    public_key: string;
  }

  /**
   * The user ID of the owner of the resource. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserOwner {
    user_id: string;
  }
}

export declare namespace Intents {
  export {
    type IntentType as IntentType,
    type IntentStatus as IntentStatus,
    type RpcIntentRequestDetails as RpcIntentRequestDetails,
    type PolicyIntentRequestDetails as PolicyIntentRequestDetails,
    type RuleIntentCreateRequestDetails as RuleIntentCreateRequestDetails,
    type RuleIntentUpdateRequestDetails as RuleIntentUpdateRequestDetails,
    type RuleIntentDeleteRequestDetails as RuleIntentDeleteRequestDetails,
    type RuleIntentRequestDetails as RuleIntentRequestDetails,
    type IntentAuthorizationKeyQuorumMember as IntentAuthorizationKeyQuorumMember,
    type IntentAuthorizationMember as IntentAuthorizationMember,
    type IntentAuthorization as IntentAuthorization,
    type BaseActionResult as BaseActionResult,
    type RpcIntentResponse as RpcIntentResponse,
    type WalletIntentResponse as WalletIntentResponse,
    type PolicyIntentResponse as PolicyIntentResponse,
    type KeyQuorumIntentResponse as KeyQuorumIntentResponse,
    type RuleIntentResponse as RuleIntentResponse,
    type IntentResponse as IntentResponse,
    type IntentCreationHeaders as IntentCreationHeaders,
    type IntentResponsesCursor as IntentResponsesCursor,
    type IntentListParams as IntentListParams,
    type IntentCreatePolicyRuleParams as IntentCreatePolicyRuleParams,
    type IntentDeletePolicyRuleParams as IntentDeletePolicyRuleParams,
    type IntentRpcParams as IntentRpcParams,
    type IntentUpdateKeyQuorumParams as IntentUpdateKeyQuorumParams,
    type IntentUpdatePolicyParams as IntentUpdatePolicyParams,
    type IntentUpdatePolicyRuleParams as IntentUpdatePolicyRuleParams,
    type IntentUpdateWalletParams as IntentUpdateWalletParams,
  };
}
