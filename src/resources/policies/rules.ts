// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Rules extends APIResource {
  /**
   * Create a new rule for a policy.
   *
   * @example
   * ```ts
   * const response = await client.policies.rules._create(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   {
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
   *     name: 'name',
   *   },
   * );
   * ```
   */
  _create(
    policyID: string,
    params: RuleCreateParams,
    options?: RequestOptions,
  ): APIPromise<RuleCreateResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post(path`/v1/policies/${policyID}/rules`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
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
   * const response = await client.policies.rules._delete(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  _delete(
    ruleID: string,
    params: RuleDeleteParams,
    options?: RequestOptions,
  ): APIPromise<RuleDeleteResponse> {
    const { policy_id, 'privy-authorization-signature': privyAuthorizationSignature } = params;
    return this._client.delete(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
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
   * const response = await client.policies.rules._update(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   {
   *     policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
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
   *     name: 'name',
   *   },
   * );
   * ```
   */
  _update(
    ruleID: string,
    params: RuleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<RuleUpdateResponse> {
    const { policy_id, 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const rule = await client.policies.rules.get(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  get(ruleID: string, params: RuleGetParams, options?: RequestOptions): APIPromise<RuleGetResponse> {
    const { policy_id } = params;
    return this._client.get(path`/v1/policies/${policy_id}/rules/${ruleID}`, options);
  }
}

/**
 * A rule that defines the conditions and action to take if the conditions are
 * true.
 */
export interface RuleCreateResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | RuleCreateResponse.EthereumTransactionCondition
    | RuleCreateResponse.EthereumCalldataCondition
    | RuleCreateResponse.EthereumTypedDataDomainCondition
    | RuleCreateResponse.EthereumTypedDataMessageCondition
    | RuleCreateResponse.Ethereum7702AuthorizationCondition
    | RuleCreateResponse.SolanaProgramInstructionCondition
    | RuleCreateResponse.SolanaSystemProgramInstructionCondition
    | RuleCreateResponse.SolanaTokenProgramInstructionCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace RuleCreateResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }
}

export interface RuleDeleteResponse {
  /**
   * Whether the rule was deleted successfully.
   */
  success: boolean;
}

export interface RuleUpdateResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | RuleUpdateResponse.EthereumTransactionCondition
    | RuleUpdateResponse.EthereumCalldataCondition
    | RuleUpdateResponse.EthereumTypedDataDomainCondition
    | RuleUpdateResponse.EthereumTypedDataMessageCondition
    | RuleUpdateResponse.Ethereum7702AuthorizationCondition
    | RuleUpdateResponse.SolanaProgramInstructionCondition
    | RuleUpdateResponse.SolanaSystemProgramInstructionCondition
    | RuleUpdateResponse.SolanaTokenProgramInstructionCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace RuleUpdateResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }
}

/**
 * A rule that defines the conditions and action to take if the conditions are
 * true.
 */
export interface RuleGetResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | RuleGetResponse.EthereumTransactionCondition
    | RuleGetResponse.EthereumCalldataCondition
    | RuleGetResponse.EthereumTypedDataDomainCondition
    | RuleGetResponse.EthereumTypedDataMessageCondition
    | RuleGetResponse.Ethereum7702AuthorizationCondition
    | RuleGetResponse.SolanaProgramInstructionCondition
    | RuleGetResponse.SolanaSystemProgramInstructionCondition
    | RuleGetResponse.SolanaTokenProgramInstructionCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace RuleGetResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }
}

export interface RuleCreateParams {
  /**
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param:
   */
  conditions: Array<
    | RuleCreateParams.EthereumTransactionCondition
    | RuleCreateParams.EthereumCalldataCondition
    | RuleCreateParams.EthereumTypedDataDomainCondition
    | RuleCreateParams.EthereumTypedDataMessageCondition
    | RuleCreateParams.Ethereum7702AuthorizationCondition
    | RuleCreateParams.SolanaProgramInstructionCondition
    | RuleCreateParams.SolanaSystemProgramInstructionCondition
    | RuleCreateParams.SolanaTokenProgramInstructionCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  /**
   * Body param:
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace RuleCreateParams {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }
}

export interface RuleDeleteParams {
  /**
   * Path param:
   */
  policy_id: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface RuleUpdateParams {
  /**
   * Path param:
   */
  policy_id: string;

  /**
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param:
   */
  conditions: Array<
    | RuleUpdateParams.EthereumTransactionCondition
    | RuleUpdateParams.EthereumCalldataCondition
    | RuleUpdateParams.EthereumTypedDataDomainCondition
    | RuleUpdateParams.EthereumTypedDataMessageCondition
    | RuleUpdateParams.Ethereum7702AuthorizationCondition
    | RuleUpdateParams.SolanaProgramInstructionCondition
    | RuleUpdateParams.SolanaSystemProgramInstructionCondition
    | RuleUpdateParams.SolanaTokenProgramInstructionCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  /**
   * Body param:
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace RuleUpdateParams {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

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

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in';

    value: string | Array<string>;
  }
}

export interface RuleGetParams {
  policy_id: string;
}

export declare namespace Rules {
  export {
    type RuleCreateResponse as RuleCreateResponse,
    type RuleDeleteResponse as RuleDeleteResponse,
    type RuleUpdateResponse as RuleUpdateResponse,
    type RuleGetResponse as RuleGetResponse,
    type RuleCreateParams as RuleCreateParams,
    type RuleDeleteParams as RuleDeleteParams,
    type RuleUpdateParams as RuleUpdateParams,
    type RuleGetParams as RuleGetParams,
  };
}
