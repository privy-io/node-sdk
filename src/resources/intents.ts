// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntentsAPI from './intents';
import * as WalletsAPI from './wallets/wallets';

export class Intents extends APIResource {}

/**
 * Type of intent.
 */
export type IntentType = 'KEY_QUORUM' | 'POLICY' | 'RULE' | 'RPC' | 'WALLET';

/**
 * Current status of an intent.
 */
export type IntentStatus = 'pending' | 'executed' | 'failed' | 'expired' | 'rejected' | 'dismissed';

/**
 * The original rule request. Method is POST (create), PATCH (update), or DELETE
 * (delete)
 */
export type RuleIntentRequestDetails =
  | RuleIntentRequestDetails.UnionMember0
  | RuleIntentRequestDetails.UnionMember1
  | RuleIntentRequestDetails.UnionMember2;

export namespace RuleIntentRequestDetails {
  export interface UnionMember0 {
    body: UnionMember0.Body;

    method: 'POST';

    url: string;
  }

  export namespace UnionMember0 {
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

  export interface UnionMember1 {
    body: UnionMember1.Body;

    method: 'PATCH';

    url: string;
  }

  export namespace UnionMember1 {
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

  export interface UnionMember2 {
    method: 'DELETE';

    url: string;

    body?: unknown;
  }
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
   * Current state of the wallet before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  current_resource_data?: RpcIntentResponse.CurrentResourceData;

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
    body:
      | RequestDetails.UnionMember0
      | RequestDetails.UnionMember1
      | RequestDetails.UnionMember2
      | RequestDetails.UnionMember3
      | RequestDetails.UnionMember4
      | RequestDetails.UnionMember5
      | RequestDetails.UnionMember6
      | RequestDetails.UnionMember7
      | RequestDetails.UnionMember8
      | RequestDetails.UnionMember9
      | RequestDetails.UnionMember10
      | RequestDetails.UnionMember11
      | RequestDetails.UnionMember12
      | RequestDetails.UnionMember13
      | RequestDetails.UnionMember14
      | RequestDetails.UnionMember15
      | RequestDetails.UnionMember16
      | RequestDetails.UnionMember17
      | RequestDetails.UnionMember18
      | RequestDetails.UnionMember19;

    method: 'POST';

    url: string;
  }

  export namespace RequestDetails {
    export interface UnionMember0 {
      method: 'eth_signTransaction';

      params: UnionMember0.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember0 {
      export interface Params {
        transaction: Params.Transaction;
      }

      export namespace Params {
        export interface Transaction {
          authorization_list?: Array<Transaction.AuthorizationList>;

          chain_id?: string | number;

          data?: string;

          from?: string;

          gas_limit?: string | number;

          gas_price?: string | number;

          max_fee_per_gas?: string | number;

          max_priority_fee_per_gas?: string | number;

          nonce?: string | number;

          to?: string;

          type?: 0 | 1 | 2 | 4;

          value?: string | number;
        }

        export namespace Transaction {
          export interface AuthorizationList {
            chain_id: string | number;

            contract: string;

            nonce: string | number;

            r: string;

            s: string;

            y_parity: number;
          }
        }
      }
    }

    export interface UnionMember1 {
      caip2: string;

      method: 'eth_sendTransaction';

      params: UnionMember1.Params;

      address?: string;

      chain_type?: 'ethereum';

      sponsor?: boolean;

      wallet_id?: string;
    }

    export namespace UnionMember1 {
      export interface Params {
        transaction: Params.Transaction;
      }

      export namespace Params {
        export interface Transaction {
          authorization_list?: Array<Transaction.AuthorizationList>;

          chain_id?: string | number;

          data?: string;

          from?: string;

          gas_limit?: string | number;

          gas_price?: string | number;

          max_fee_per_gas?: string | number;

          max_priority_fee_per_gas?: string | number;

          nonce?: string | number;

          to?: string;

          type?: 0 | 1 | 2 | 4;

          value?: string | number;
        }

        export namespace Transaction {
          export interface AuthorizationList {
            chain_id: string | number;

            contract: string;

            nonce: string | number;

            r: string;

            s: string;

            y_parity: number;
          }
        }
      }
    }

    export interface UnionMember2 {
      method: 'personal_sign';

      params: UnionMember2.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember2 {
      export interface Params {
        encoding: 'utf-8' | 'hex';

        message: string;
      }
    }

    export interface UnionMember3 {
      method: 'eth_signTypedData_v4';

      params: UnionMember3.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember3 {
      export interface Params {
        typed_data: Params.TypedData;
      }

      export namespace Params {
        export interface TypedData {
          domain: { [key: string]: unknown };

          message: { [key: string]: unknown };

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
    }

    export interface UnionMember4 {
      method: 'secp256k1_sign';

      params: UnionMember4.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember4 {
      export interface Params {
        hash: string;
      }
    }

    export interface UnionMember5 {
      method: 'eth_sign7702Authorization';

      params: UnionMember5.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember5 {
      export interface Params {
        chain_id: string | number;

        contract: string;

        nonce?: string | number;
      }
    }

    export interface UnionMember6 {
      method: 'eth_signUserOperation';

      params: UnionMember6.Params;

      address?: string;

      chain_type?: 'ethereum';

      wallet_id?: string;
    }

    export namespace UnionMember6 {
      export interface Params {
        chain_id: string | number;

        contract: string;

        user_operation: Params.UserOperation;
      }

      export namespace Params {
        export interface UserOperation {
          call_data: string;

          call_gas_limit: string;

          max_fee_per_gas: string;

          max_priority_fee_per_gas: string;

          nonce: string;

          paymaster: string;

          paymaster_data: string;

          paymaster_post_op_gas_limit: string;

          paymaster_verification_gas_limit: string;

          pre_verification_gas: string;

          sender: string;

          verification_gas_limit: string;
        }
      }
    }

    export interface UnionMember7 {
      method: 'signTransaction';

      params: UnionMember7.Params;

      address?: string;

      chain_type?: 'solana';

      wallet_id?: string;
    }

    export namespace UnionMember7 {
      export interface Params {
        encoding: 'base64';

        transaction: string;
      }
    }

    export interface UnionMember8 {
      caip2: string;

      method: 'signAndSendTransaction';

      params: UnionMember8.Params;

      address?: string;

      chain_type?: 'solana';

      sponsor?: boolean;

      wallet_id?: string;
    }

    export namespace UnionMember8 {
      export interface Params {
        encoding: 'base64';

        transaction: string;
      }
    }

    export interface UnionMember9 {
      method: 'signMessage';

      params: UnionMember9.Params;

      address?: string;

      chain_type?: 'solana';

      wallet_id?: string;
    }

    export namespace UnionMember9 {
      export interface Params {
        encoding: 'base64';

        message: string;
      }
    }

    export interface UnionMember10 {
      address: string;

      method: 'exportPrivateKey';

      params: UnionMember10.Params;
    }

    export namespace UnionMember10 {
      export interface Params {
        encryption_type: 'HPKE';

        recipient_public_key: string;

        export_type?: 'display' | 'client';
      }
    }

    export interface UnionMember11 {
      method: 'transfer';

      params: UnionMember11.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember11 {
      export interface Params {
        amount_sats: number;

        receiver_spark_address: string;
      }
    }

    export interface UnionMember12 {
      method: 'getBalance';

      network?: 'MAINNET' | 'REGTEST';
    }

    export interface UnionMember13 {
      method: 'transferTokens';

      params: UnionMember13.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember13 {
      export interface Params {
        receiver_spark_address: string;

        token_amount: number;

        token_identifier: string;

        output_selection_strategy?: 'SMALL_FIRST' | 'LARGE_FIRST';

        selected_outputs?: Array<Params.SelectedOutput>;
      }

      export namespace Params {
        export interface SelectedOutput {
          previous_transaction_hash: string;

          previous_transaction_vout: number;

          output?: SelectedOutput.Output;
        }

        export namespace SelectedOutput {
          export interface Output {
            owner_public_key: string;

            token_amount: string;

            id?: string;

            revocation_commitment?: string;

            token_identifier?: string;

            token_public_key?: string;

            withdraw_bond_sats?: number;

            withdraw_relative_block_locktime?: number;
          }
        }
      }
    }

    export interface UnionMember14 {
      method: 'getStaticDepositAddress';

      network?: 'MAINNET' | 'REGTEST';
    }

    export interface UnionMember15 {
      method: 'getClaimStaticDepositQuote';

      params: UnionMember15.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember15 {
      export interface Params {
        transaction_id: string;

        output_index?: number;
      }
    }

    export interface UnionMember16 {
      method: 'claimStaticDeposit';

      params: UnionMember16.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember16 {
      export interface Params {
        credit_amount_sats: number;

        signature: string;

        transaction_id: string;

        output_index?: number;
      }
    }

    export interface UnionMember17 {
      method: 'createLightningInvoice';

      params: UnionMember17.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember17 {
      export interface Params {
        amount_sats: number;

        description_hash?: string;

        expiry_seconds?: number;

        include_spark_address?: boolean;

        memo?: string;

        receiver_identity_pubkey?: string;
      }
    }

    export interface UnionMember18 {
      method: 'payLightningInvoice';

      params: UnionMember18.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember18 {
      export interface Params {
        invoice: string;

        max_fee_sats: number;

        amount_sats_to_send?: number;

        prefer_spark?: boolean;
      }
    }

    export interface UnionMember19 {
      method: 'signMessageWithIdentityKey';

      params: UnionMember19.Params;

      network?: 'MAINNET' | 'REGTEST';
    }

    export namespace UnionMember19 {
      export interface Params {
        message: string;

        compact?: boolean;
      }
    }
  }

  /**
   * Current state of the wallet before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  export interface CurrentResourceData {
    id: string;

    additional_signers: Array<CurrentResourceData.AdditionalSigner>;

    address: string;

    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    created_at: number;

    exported_at: number | null;

    imported_at: number | null;

    owner_id: string | null;

    policy_ids: Array<string>;

    authorization_threshold?: number;

    custodian?: CurrentResourceData.Custodian;

    /**
     * Information about the custodian managing this wallet.
     */
    custody?: WalletsAPI.WalletCustodian;

    public_key?: string;
  }

  export namespace CurrentResourceData {
    export interface AdditionalSigner {
      signer_id: string;

      override_policy_ids?: Array<string>;
    }

    export interface Custodian {
      name: string;
    }
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
   * Current state of the wallet before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  current_resource_data?: WalletIntentResponse.CurrentResourceData;

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

  /**
   * Current state of the wallet before any changes. If undefined, the resource was
   * deleted and no longer exists
   */
  export interface CurrentResourceData {
    id: string;

    additional_signers: Array<CurrentResourceData.AdditionalSigner>;

    address: string;

    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    created_at: number;

    exported_at: number | null;

    imported_at: number | null;

    owner_id: string | null;

    policy_ids: Array<string>;

    authorization_threshold?: number;

    custodian?: CurrentResourceData.Custodian;

    /**
     * Information about the custodian managing this wallet.
     */
    custody?: WalletsAPI.WalletCustodian;

    public_key?: string;
  }

  export namespace CurrentResourceData {
    export interface AdditionalSigner {
      signer_id: string;

      override_policy_ids?: Array<string>;
    }

    export interface Custodian {
      name: string;
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
   * Current state of the key quorum before any changes. If undefined, the resource
   * was deleted and no longer exists
   */
  current_resource_data?: KeyQuorumIntentResponse.CurrentResourceData;

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
    body: RequestDetails.Body;

    method: 'PATCH';

    url: string;
  }

  export namespace RequestDetails {
    export interface Body {
      authorization_threshold?: number;

      display_name?: string;

      key_quorum_ids?: Array<string>;

      public_keys?: Array<string>;

      user_ids?: Array<string>;
    }
  }

  /**
   * Current state of the key quorum before any changes. If undefined, the resource
   * was deleted and no longer exists
   */
  export interface CurrentResourceData {
    id: string;

    authorization_keys: Array<CurrentResourceData.AuthorizationKey>;

    authorization_threshold: number | null;

    display_name: string | null;

    user_ids: Array<string> | null;

    key_quorum_ids?: Array<string>;
  }

  export namespace CurrentResourceData {
    export interface AuthorizationKey {
      display_name: string | null;

      public_key: string;
    }
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

export declare namespace Intents {
  export {
    type IntentType as IntentType,
    type IntentStatus as IntentStatus,
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
  };
}
