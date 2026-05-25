export const TEMPO_TRANSACTION_TYPE = 118 as const;
export const TEMPO_CHAIN_IDS = new Set([4217, 42431]);

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

function evmChainIdFromCaip2(caip2: string | undefined): number | undefined {
  const match = caip2?.match(/^eip155:(\d+)$/);
  if (!match) return undefined;

  return Number(match[1]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isTempoChainId(chainId: number | string | undefined): boolean {
  const evmChainId =
    typeof chainId === 'string' && chainId.startsWith('eip155:') ?
      evmChainIdFromCaip2(chainId)
    : Number(chainId);

  return evmChainId !== undefined && TEMPO_CHAIN_IDS.has(evmChainId);
}

export function isTempoTransactionRpcParams(input: RpcParams): input is TempoTransactionRpcParams {
  if (input.method !== 'eth_signTransaction' && input.method !== 'eth_sendTransaction') {
    return false;
  }

  if (!isRecord(input.params)) return false;

  const transaction = input.params['transaction'];
  if (!isRecord(transaction)) return false;

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
