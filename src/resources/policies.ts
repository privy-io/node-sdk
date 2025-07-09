// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Policies extends APIResource {
  /**
   * Create a new policy.
   *
   * @example
   * ```ts
   * const policy = await client.policies.create({
   *   chain_type: 'ethereum',
   *   name: 'name',
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
   *       name: 'name',
   *     },
   *   ],
   *   version: '1.0',
   * });
   * ```
   */
  create(params: PolicyCreateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post('/v1/policies', {
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
   * Update a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies.update(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  update(policyID: string, params: PolicyUpdateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/policies/${policyID}`, {
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
   * Delete a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies.delete(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(
    policyID: string,
    params: PolicyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicyDeleteResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature } = params ?? {};
    return this._client.delete(path`/v1/policies/${policyID}`, {
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
}

export interface Policy {
  /**
   * Unique ID of the created policy. This will be the primary identifier when using
   * the policy in the future.
   */
  id: string;

  /**
   * The chain type the policy applies to.
   */
  chain_type: 'ethereum' | 'solana';

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

  rules: Array<Policy.Rule>;

  /**
   * Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';
}

export namespace Policy {
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

  export namespace Rule {
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
}

export interface PolicyDeleteResponse {
  /**
   * Whether the policy was deleted successfully.
   */
  success: boolean;
}

export interface PolicyCreateParams {
  /**
   * Body param: The chain type the policy applies to.
   */
  chain_type: 'ethereum' | 'solana';

  /**
   * Body param: Name to assign to policy.
   */
  name: string;

  /**
   * Body param:
   */
  rules: Array<PolicyCreateParams.Rule>;

  /**
   * Body param: Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: PolicyCreateParams.PublicKeyOwner | PolicyCreateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string | null;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace PolicyCreateParams {
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

  export namespace Rule {
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
   * The P-256 public key of the owner of the resource. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
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

export interface PolicyUpdateParams {
  /**
   * Body param: Name to assign to policy.
   */
  name?: string;

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: PolicyUpdateParams.PublicKeyOwner | PolicyUpdateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string | null;

  /**
   * Body param:
   */
  rules?: Array<PolicyUpdateParams.Rule>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace PolicyUpdateParams {
  /**
   * The P-256 public key of the owner of the resource. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
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

  export namespace Rule {
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
}

export interface PolicyDeleteParams {
  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace Policies {
  export {
    type Policy as Policy,
    type PolicyDeleteResponse as PolicyDeleteResponse,
    type PolicyCreateParams as PolicyCreateParams,
    type PolicyUpdateParams as PolicyUpdateParams,
    type PolicyDeleteParams as PolicyDeleteParams,
  };
}
