// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WalletsAPI from './wallets/wallets';

export class Aggregations extends APIResource {}

/**
 * The RPC method this aggregation applies to.
 */
export type AggregationMethod =
  | 'eth_signTransaction'
  | 'eth_signUserOperation'
  | 'signTransaction'
  | 'signTransactionBytes';

/**
 * The metric configuration for an aggregation, defining what field/field_source to
 * measure and the aggregation function to apply.
 */
export interface AggregationMetric {
  field: string;

  field_source: string;

  /**
   * The aggregation function to apply.
   */
  function: 'sum';

  abi?: Array<AggregationMetric.Abi>;
}

export namespace AggregationMetric {
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

/**
 * The time window configuration for an aggregation.
 */
export interface AggregationWindow {
  /**
   * Duration of the rolling window in seconds (1-72 hours).
   */
  seconds: number;

  type: 'rolling';
}

/**
 * A grouping configuration for an aggregation. Maximum of 2 group_by fields
 * allowed.
 */
export interface AggregationGroupBy {
  field: string;

  field_source: string;

  abi?: Array<AggregationGroupBy.Abi>;
}

export namespace AggregationGroupBy {
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

/**
 * An aggregation that measures and tracks metrics over a period of time.
 */
export interface Aggregation {
  /**
   * Unique ID of the aggregation.
   */
  id: string;

  /**
   * Unix timestamp of when the aggregation was created in milliseconds.
   */
  created_at: number;

  /**
   * The RPC method this aggregation applies to.
   */
  method: AggregationMethod;

  /**
   * The metric configuration for an aggregation, defining what field/field_source to
   * measure and the aggregation function to apply.
   */
  metric: AggregationMetric;

  /**
   * The name of the aggregation.
   */
  name: string;

  /**
   * The key quorum ID of the owner of the aggregation.
   */
  owner_id: string | null;

  /**
   * The time window configuration for an aggregation.
   */
  window: AggregationWindow;

  /**
   * Optional conditions to filter events before aggregation.
   */
  conditions?: Array<
    | Aggregation.UnionMember0
    | Aggregation.UnionMember1
    | Aggregation.UnionMember2
    | Aggregation.UnionMember3
    | Aggregation.UnionMember4
    | Aggregation.UnionMember5
    | Aggregation.UnionMember6
    | Aggregation.UnionMember7
    | Aggregation.UnionMember8
    | Aggregation.UnionMember9
    | Aggregation.UnionMember10
    | Aggregation.UnionMember11
    | Aggregation.UnionMember12
    | Aggregation.UnionMember13
  >;

  /**
   * Optional grouping configuration for bucketing metrics.
   */
  group_by?: Array<AggregationGroupBy>;
}

export namespace Aggregation {
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

export declare namespace Aggregations {
  export {
    type AggregationMethod as AggregationMethod,
    type AggregationMetric as AggregationMetric,
    type AggregationWindow as AggregationWindow,
    type AggregationGroupBy as AggregationGroupBy,
    type Aggregation as Aggregation,
  };
}
