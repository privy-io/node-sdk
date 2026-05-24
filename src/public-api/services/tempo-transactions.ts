export const TEMPO_TRANSACTION_TYPE = 118 as const;
export const TEMPO_CHAIN_IDS = new Set([4217, 42431]);

type RpcParams = {
  caip2?: string;
  method: string;
  params?: unknown;
};

function evmChainIdFromCaip2(caip2: string | undefined): number | undefined {
  const match = caip2?.match(/^eip155:(\d+)$/);
  if (!match) return undefined;

  return Number(match[1]);
}

export function isTempoChainId(chainId: number | string | undefined): boolean {
  const evmChainId =
    typeof chainId === 'string' && chainId.startsWith('eip155:') ?
      evmChainIdFromCaip2(chainId)
    : Number(chainId);

  return evmChainId !== undefined && TEMPO_CHAIN_IDS.has(evmChainId);
}

export function defaultTempoTransactionTypeForRpcParams<Params extends RpcParams>(input: Params): Params {
  if (input.method !== 'eth_signTransaction' && input.method !== 'eth_sendTransaction') {
    return input;
  }

  const params = input.params as { transaction?: Record<string, unknown> } | undefined;
  const transaction = params?.transaction;
  if (!transaction || transaction['type'] !== undefined) {
    return input;
  }

  const chainId = transaction['chain_id'] ?? input.caip2;
  if (!isTempoChainId(chainId as number | string | undefined)) {
    return input;
  }

  if (Array.isArray(transaction['calls'])) {
    return {
      ...input,
      params: {
        ...params,
        transaction: {
          ...transaction,
          type: TEMPO_TRANSACTION_TYPE,
        },
      },
    };
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
      ...params,
      transaction: {
        ...tempoTransaction,
        type: TEMPO_TRANSACTION_TYPE,
        calls: [call],
      },
    },
  };
}
