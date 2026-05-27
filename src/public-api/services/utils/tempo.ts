import { isTempoChainId } from '../../../internal/chains';
import { isObj } from '../../../internal/utils/values';

export const TEMPO_TRANSACTION_TYPE = 118 as const;

const TEMPO_TRANSACTION_FIELDS = [
  'aa_authorization_list',
  'fee_payer_signature',
  'fee_token',
  'nonce_key',
  'valid_after',
  'valid_before',
] as const;

type RpcParams = {
  caip2?: string;
  method: string;
  params?: unknown;
};

type TransactionRpcParams = RpcParams & {
  method: 'eth_signTransaction' | 'eth_sendTransaction';
  params: {
    transaction: Record<string, unknown>;
  };
};

declare const tempoTransactionRpcParamsBrand: unique symbol;

export type TempoTransactionRpcParams = TransactionRpcParams & {
  readonly [tempoTransactionRpcParamsBrand]: true;
};

export function isTempoTransactionRpcParams(input: RpcParams): input is TempoTransactionRpcParams {
  if (input.method !== 'eth_signTransaction' && input.method !== 'eth_sendTransaction') {
    return false;
  }

  if (!isObj(input.params)) return false;

  const transaction = input.params['transaction'];
  if (!isObj(transaction)) return false;

  const chainId = transaction['chain_id'] ?? input.caip2;
  return isTempoChainId(chainId as number | string | undefined);
}

export function defaultTempoTransactionTypeForRpcParams<Params extends TempoTransactionRpcParams>(
  input: Params,
): Params {
  const transaction = input.params.transaction;
  if (transaction['type'] !== undefined) {
    return input;
  }

  if (Array.isArray(transaction['calls'])) {
    return {
      ...input,
      params: {
        ...input.params,
        transaction: {
          ...transaction,
          type: TEMPO_TRANSACTION_TYPE,
        },
      },
    } as Params;
  }

  if (!hasTempoTransactionFields(transaction)) {
    return input;
  }

  const {
    to,
    data,
    value,
    gas_price: gasPrice,
    authorization_list: authorizationList,
    ...tempoTransaction
  } = transaction;
  if (to === undefined || gasPrice !== undefined || authorizationList !== undefined) {
    return input;
  }

  const call = {
    to,
    ...(data !== undefined ? { data } : {}),
    ...(value !== undefined ? { value } : {}),
  };

  return {
    ...input,
    params: {
      ...input.params,
      transaction: {
        ...tempoTransaction,
        type: TEMPO_TRANSACTION_TYPE,
        calls: [call],
      },
    },
  } as Params;
}

function hasTempoTransactionFields(transaction: Record<string, unknown>): boolean {
  return TEMPO_TRANSACTION_FIELDS.some((field) => transaction[field] !== undefined);
}
