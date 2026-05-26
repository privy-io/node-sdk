import { PrivyClient, type PrivyClientOptions } from '@privy-io/node';
import {
  defaultTempoTransactionTypeForRpcParams,
  isTempoTransactionRpcParams,
  TEMPO_TRANSACTION_TYPE,
} from '@privy-io/node/public-api/services/utils/tempo';
import { createViemAccount, formatViemTransactionType } from '@privy-io/node/viem';
import type { Hex } from 'viem';

const ADDRESS = '0x742D35Cc6634C0532925A3b844BC9e7095F49e22';

type CapturedRpcBody = {
  caip2?: string;
  chain_type?: string;
  method?: string;
  params: { transaction: Record<string, unknown> };
};

function makeClient(
  responseBody: object = {
    method: 'eth_signTransaction',
    data: { encoding: 'rlp', signed_transaction: '0x1234' },
  },
  overrides: Partial<PrivyClientOptions> = {},
): {
  client: PrivyClient;
  captured: { request: Request | null };
} {
  const captured: { request: Request | null } = { request: null };
  const fetchSpy: typeof fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    captured.request = request;
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };

  const client = new PrivyClient({
    appId: 'test-app-id',
    appSecret: 'test-app-secret',
    fetch: fetchSpy,
    ...overrides,
  });

  return { client, captured };
}

async function getRequestBody(captured: { request: Request | null }): Promise<CapturedRpcBody> {
  expect(captured.request).not.toBeNull();
  return (await captured.request!.clone().json()) as CapturedRpcBody;
}

function defaultTempoTransactionType(input: Parameters<typeof isTempoTransactionRpcParams>[0]) {
  if (!isTempoTransactionRpcParams(input)) {
    throw new Error('Expected Tempo transaction RPC params');
  }

  return defaultTempoTransactionTypeForRpcParams(input);
}

describe('Tempo transaction defaulting', () => {
  it('defaults plain transactions on Tempo chains to type 118 calls', () => {
    const result = defaultTempoTransactionType({
      method: 'eth_sendTransaction',
      caip2: 'eip155:4217',
      params: {
        transaction: {
          to: ADDRESS,
          data: '0x1234',
          value: '0x1',
          gas_limit: '0x5208',
          max_fee_per_gas: '0x2',
        },
      },
    });

    expect(result.params.transaction).toEqual({
      type: TEMPO_TRANSACTION_TYPE,
      calls: [{ to: ADDRESS, data: '0x1234', value: '0x1' }],
      gas_limit: '0x5208',
      max_fee_per_gas: '0x2',
    });
  });

  it('adds type 118 when calls are present without a type on Tempo chains', () => {
    const result = defaultTempoTransactionType({
      method: 'eth_signTransaction',
      params: {
        transaction: {
          chain_id: '0x1079',
          calls: [{ to: ADDRESS, value: '0x1' }],
        },
      },
    });

    expect(result.params.transaction).toEqual({
      type: TEMPO_TRANSACTION_TYPE,
      chain_id: '0x1079',
      calls: [{ to: ADDRESS, value: '0x1' }],
    });
  });

  it('does not default transactions outside Tempo chains', () => {
    const input = {
      method: 'eth_signTransaction' as const,
      params: { transaction: { chain_id: 1, to: ADDRESS, value: '0x1' } },
    };
    const result =
      isTempoTransactionRpcParams(input) ? defaultTempoTransactionTypeForRpcParams(input) : input;

    expect(isTempoTransactionRpcParams(input)).toBe(false);
    expect(result).toBe(input);
  });

  it('prefers transaction chain ID over caip2 when determining Tempo defaulting', () => {
    const input = {
      method: 'eth_sendTransaction' as const,
      caip2: 'eip155:4217',
      params: { transaction: { chain_id: 1, to: ADDRESS, value: '0x1' } },
    };
    const result =
      isTempoTransactionRpcParams(input) ? defaultTempoTransactionTypeForRpcParams(input) : input;

    expect(isTempoTransactionRpcParams(input)).toBe(false);
    expect(result).toBe(input);
  });

  it('does not override an explicit standard transaction type on Tempo chains', () => {
    const input = {
      method: 'eth_signTransaction' as const,
      params: { transaction: { chain_id: 4217, type: 2 as const, to: ADDRESS, value: '0x1' } },
    };

    expect(defaultTempoTransactionType(input)).toBe(input);
  });

  it('does not synthesize calls when standard-only fields would be dropped', () => {
    const input = {
      method: 'eth_signTransaction' as const,
      params: { transaction: { chain_id: 4217, to: ADDRESS, gas_price: '0x1' } },
    };

    expect(defaultTempoTransactionType(input)).toBe(input);
  });

  it('normalizes Wallet RPC bodies before sending requests', async () => {
    const { client, captured } = makeClient({
      method: 'eth_sendTransaction',
      data: { caip2: 'eip155:4217', hash: '0x1234' },
    });

    await client
      .wallets()
      .ethereum()
      .sendTransaction('wallet-id', {
        caip2: 'eip155:4217',
        params: { transaction: { to: ADDRESS, data: '0x1234', value: '0x1' } },
      });

    const body = await getRequestBody(captured);
    expect(body).toMatchObject({
      method: 'eth_sendTransaction',
      chain_type: 'ethereum',
      caip2: 'eip155:4217',
      params: {
        transaction: {
          type: TEMPO_TRANSACTION_TYPE,
          calls: [{ to: ADDRESS, data: '0x1234', value: '0x1' }],
        },
      },
    });
    expect(body.params.transaction).not.toHaveProperty('to');
  });

  it('normalizes Intent RPC bodies before sending requests', async () => {
    const { client, captured } = makeClient({});

    await client.intents().rpc('wallet-id', {
      method: 'eth_signTransaction',
      params: {
        transaction: {
          chain_id: 4217,
          to: ADDRESS,
          value: '0x1',
        },
      },
    });

    const body = await getRequestBody(captured);
    expect(body).toMatchObject({
      method: 'eth_signTransaction',
      params: {
        transaction: {
          type: TEMPO_TRANSACTION_TYPE,
          chain_id: 4217,
          calls: [{ to: ADDRESS, value: '0x1' }],
        },
      },
    });
  });

  it('leaves omitted viem transaction type unset on Tempo chains', () => {
    expect(formatViemTransactionType(undefined, 4217)).toBeUndefined();
  });

  it('defaults omitted viem transaction type to EIP-1559 outside Tempo chains', () => {
    expect(formatViemTransactionType(undefined, 1)).toBe(2);
  });

  it('leaves viem transaction type defaultable on Tempo chains', async () => {
    const { client, captured } = makeClient();
    const account = createViemAccount(client, {
      walletId: 'wallet-id',
      address: ADDRESS as Hex,
    });

    await account.signTransaction({
      chainId: 4217,
      to: ADDRESS as Hex,
      value: 1n,
      data: '0x',
    });

    const body = await getRequestBody(captured);
    expect(body.params.transaction).toEqual({
      type: TEMPO_TRANSACTION_TYPE,
      chain_id: 4217,
      calls: [{ to: ADDRESS, data: '0x', value: '0x1' }],
    });
  });

  it('keeps viem EIP-1559 defaulting on non-Tempo chains', async () => {
    const { client, captured } = makeClient();
    const account = createViemAccount(client, {
      walletId: 'wallet-id',
      address: ADDRESS as Hex,
    });

    await account.signTransaction({
      chainId: 1,
      to: ADDRESS as Hex,
      value: 1n,
    });

    const body = await getRequestBody(captured);
    expect(body.params.transaction).toEqual({
      type: 2,
      chain_id: 1,
      to: ADDRESS,
      value: '0x1',
    });
  });
});
