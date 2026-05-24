import type { Hex } from 'viem';
import type { PrivyClient } from '../src/public-api/PrivyClient';
import {
  createViemAccount,
  formatViemTransaction,
  formatViemTransactionType,
  isTempoTransaction,
} from '../src/viem';

const ADDRESS = '0x0000000000000000000000000000000000000001' as const;
const RECIPIENT = '0x0000000000000000000000000000000000000002' as const;
const FEE_TOKEN = '0x20c000000000000000000000b9537d11c60e8b50' as const;
const TEMPO_CHAIN_ID = 4217;

function createMockClient(signedTransaction: Hex = '0x76abc') {
  const signTransaction = jest.fn().mockResolvedValue({
    encoding: 'rlp',
    signed_transaction: signedTransaction,
  });

  const client = {
    wallets: () => ({
      ethereum: () => ({
        signTransaction,
      }),
    }),
  } as unknown as PrivyClient;

  return { client, signTransaction };
}

function tempoAccountSignTransactionTypeCheck() {
  const privy = {} as PrivyClient;
  const account = createViemAccount(privy, {
    walletId: 'wallet-id',
    address: ADDRESS,
  });

  void account.signTransaction({
    type: 'tempo',
    chainId: TEMPO_CHAIN_ID,
    calls: [{ to: RECIPIENT, data: '0x' }],
    feeToken: FEE_TOKEN,
  });

  void account.signTransaction({
    chainId: TEMPO_CHAIN_ID,
    calls: [{ to: RECIPIENT, data: '0x' }],
    feeToken: FEE_TOKEN,
  });
}
void tempoAccountSignTransactionTypeCheck;

describe('viem Tempo support', () => {
  describe('formatViemTransactionType', () => {
    it('maps tempo to type 118', () => {
      expect(formatViemTransactionType('tempo')).toBe(118);
    });

    it('reports the unsupported transaction type', () => {
      expect(() => formatViemTransactionType('eip4844')).toThrow(
        'EIP4844 and EIP7702 transaction types are not yet supported.',
      );
    });
  });

  describe('formatViemTransaction', () => {
    it('formats Tempo fields into the Privy wire shape', () => {
      expect(
        formatViemTransaction({
          type: 'tempo',
          chainId: TEMPO_CHAIN_ID,
          nonce: 0,
          nonceKey: 0n,
          validAfter: 0,
          validBefore: 123,
          feeToken: FEE_TOKEN,
          from: ADDRESS,
          gas: 21_000n,
          maxFeePerGas: 2n,
          maxPriorityFeePerGas: 1n,
          calls: [
            { to: RECIPIENT, data: '0x1234', value: 0n },
            { to: ADDRESS, value: 2n },
          ],
          accessList: [
            {
              address: RECIPIENT,
              storageKeys: ['0x0000000000000000000000000000000000000000000000000000000000000000'],
            },
          ],
          feePayerSignature: {
            r: `0x${'11'.repeat(32)}` as Hex,
            s: `0x${'22'.repeat(32)}` as Hex,
            yParity: 1,
          },
        } as never),
      ).toEqual({
        type: 118,
        chain_id: TEMPO_CHAIN_ID,
        nonce: 0,
        nonce_key: '0x0',
        valid_after: 0,
        valid_before: 123,
        fee_token: FEE_TOKEN,
        from: ADDRESS,
        gas_limit: '0x5208',
        max_fee_per_gas: '0x2',
        max_priority_fee_per_gas: '0x1',
        calls: [
          { to: RECIPIENT, data: '0x1234', value: '0x0' },
          { to: ADDRESS, value: '0x2' },
        ],
        access_list: [
          {
            address: RECIPIENT,
            storage_keys: ['0x0000000000000000000000000000000000000000000000000000000000000000'],
          },
        ],
        fee_payer_signature: {
          r: `0x${'11'.repeat(32)}`,
          s: `0x${'22'.repeat(32)}`,
          y_parity: 1,
        },
      });
    });

    it('formats implicit Tempo transactions based on viem Tempo detection', () => {
      expect(
        formatViemTransaction({
          chainId: TEMPO_CHAIN_ID,
          calls: [{ to: RECIPIENT, data: '0x' }],
          feeToken: FEE_TOKEN,
        } as never),
      ).toEqual({
        type: 118,
        chain_id: TEMPO_CHAIN_ID,
        calls: [{ to: RECIPIENT, data: '0x' }],
        fee_token: FEE_TOKEN,
      });
    });

    it('keeps standard EIP-1559 formatting unchanged', () => {
      expect(
        formatViemTransaction({
          type: 'eip1559',
          chainId: 1,
          to: RECIPIENT,
          value: 1n,
          gas: 21_000n,
          data: '0x',
          maxFeePerGas: 2n,
          maxPriorityFeePerGas: 1n,
        }),
      ).toEqual({
        type: 2,
        to: RECIPIENT,
        chain_id: 1,
        data: '0x',
        value: '0x1',
        gas_limit: '0x5208',
        max_fee_per_gas: '0x2',
        max_priority_fee_per_gas: '0x1',
      });
    });
  });

  describe('Tempo type inference', () => {
    it.each([
      ['calls', { calls: [{ to: RECIPIENT }] }],
      ['feeToken', { feeToken: FEE_TOKEN }],
      ['nonceKey', { nonceKey: 1n }],
      ['validBefore', { validBefore: 123 }],
      ['validAfter', { validAfter: 0 }],
      ['feePayer', { feePayer: true }],
      ['keyAuthorization', { keyAuthorization: { address: ADDRESS } }],
      ['signature', { signature: { type: 'secp256k1' } }],
    ])('detects Tempo transactions from %s', (_, transaction) => {
      expect(isTempoTransaction(transaction as never)).toBe(true);
    });

    it('detects access-key and non-secp256k1 accounts as Tempo', () => {
      expect(isTempoTransaction({ to: RECIPIENT, data: '0x' }, { source: 'accessKey' })).toBe(true);
      expect(isTempoTransaction({ to: RECIPIENT, data: '0x' }, { keyType: 'p256' })).toBe(true);
    });

    it('does not detect plain EIP-1559 fields as Tempo for a secp256k1 account', () => {
      expect(
        isTempoTransaction(
          {
            to: RECIPIENT,
            data: '0x',
            value: 1n,
          },
          { keyType: 'secp256k1' },
        ),
      ).toBe(false);
    });

    it('formats explicit standard types through the standard transaction path', () => {
      expect(
        formatViemTransaction({
          type: 'eip1559',
          chainId: 1,
          to: RECIPIENT,
          data: '0x',
        }),
      ).toEqual({
        type: 2,
        to: RECIPIENT,
        chain_id: 1,
        data: '0x',
      });
    });
  });

  describe('createViemAccount.signTransaction', () => {
    it('promotes implicit Tempo transactions before calling eth_signTransaction', async () => {
      const { client, signTransaction } = createMockClient();
      const account = createViemAccount(client, { walletId: 'wallet-id', address: ADDRESS });

      await expect(
        account.signTransaction({
          chainId: TEMPO_CHAIN_ID,
          calls: [{ to: RECIPIENT, data: '0x' }],
          feeToken: FEE_TOKEN,
        }),
      ).resolves.toBe('0x76abc');

      expect(signTransaction).toHaveBeenCalledWith('wallet-id', {
        params: {
          transaction: {
            type: 118,
            chain_id: TEMPO_CHAIN_ID,
            calls: [{ to: RECIPIENT, data: '0x' }],
            fee_token: FEE_TOKEN,
          },
        },
      });
    });

    it('promotes access-key prepared requests before calling eth_signTransaction', async () => {
      const { client, signTransaction } = createMockClient();
      const account = createViemAccount(client, { walletId: 'wallet-id', address: ADDRESS });

      await account.signTransaction({
        chainId: TEMPO_CHAIN_ID,
        to: RECIPIENT,
        data: '0x',
        account: { source: 'accessKey' },
      } as never);

      expect(signTransaction).toHaveBeenCalledWith('wallet-id', {
        params: {
          transaction: {
            type: 118,
            chain_id: TEMPO_CHAIN_ID,
            calls: [{ to: RECIPIENT, data: '0x' }],
          },
        },
      });
    });

    it('sends explicit Tempo transactions through eth_signTransaction with authorization context', async () => {
      const { client, signTransaction } = createMockClient();
      const account = createViemAccount(client, {
        walletId: 'wallet-id',
        address: ADDRESS,
        authorizationContext: { signatures: ['signature'] },
      });

      await account.signTransaction({
        type: 'tempo',
        chainId: TEMPO_CHAIN_ID,
        calls: [{ to: RECIPIENT, value: 1n }],
      });

      expect(signTransaction).toHaveBeenCalledWith('wallet-id', {
        params: {
          transaction: {
            type: 118,
            chain_id: TEMPO_CHAIN_ID,
            calls: [{ to: RECIPIENT, value: '0x1' }],
          },
        },
        authorization_context: { signatures: ['signature'] },
      });
    });

    it('works behind a viem Tempo walletClient sendTransaction call', async () => {
      const { createWalletClient, custom } = require('viem') as typeof import('viem');
      const { tempo } = require('viem/chains') as { tempo: any };
      const { tempoActions } = require('viem/tempo') as { tempoActions: () => any };
      const signedTransaction = `0x76${'ab'.repeat(32)}` as Hex;
      const transactionHash = `0x${'12'.repeat(32)}` as Hex;
      const zeroHash = `0x${'00'.repeat(32)}` as Hex;
      const { client, signTransaction } = createMockClient(signedTransaction);
      const account = createViemAccount(client, { walletId: 'wallet-id', address: ADDRESS });
      const rpcRequests: Array<{ method: string; params?: unknown }> = [];
      const transport = custom({
        request: async ({ method, params }: { method: string; params?: unknown }) => {
          rpcRequests.push({ method, params });

          switch (method) {
            case 'eth_chainId':
              return `0x${TEMPO_CHAIN_ID.toString(16)}`;
            case 'eth_getTransactionCount':
              return '0x0';
            case 'eth_estimateGas':
              return '0x5208';
            case 'eth_maxPriorityFeePerGas':
              return '0x1';
            case 'eth_feeHistory':
              return {
                oldestBlock: '0x1',
                baseFeePerGas: ['0x1', '0x1'],
                gasUsedRatio: [0],
                reward: [['0x1']],
              };
            case 'eth_getBlockByNumber':
              return {
                baseFeePerGas: '0x1',
                difficulty: '0x0',
                extraData: '0x',
                gasLimit: '0x1c9c380',
                gasUsed: '0x0',
                hash: zeroHash,
                logsBloom: `0x${'00'.repeat(256)}`,
                miner: ADDRESS,
                mixHash: zeroHash,
                nonce: '0x0000000000000000',
                number: '0x1',
                parentHash: zeroHash,
                receiptsRoot: zeroHash,
                sha3Uncles: zeroHash,
                size: '0x0',
                stateRoot: zeroHash,
                timestamp: '0x1',
                totalDifficulty: '0x0',
                transactions: [],
                transactionsRoot: zeroHash,
                uncles: [],
              };
            case 'eth_sendRawTransaction':
              expect(params).toEqual([signedTransaction]);
              return transactionHash;
            default:
              throw new Error(`Unexpected RPC method: ${method}`);
          }
        },
      });
      const walletClient = createWalletClient({ account, chain: tempo, transport }).extend(
        tempoActions(),
      ) as any;

      await expect(
        walletClient.sendTransaction({
          calls: [{ to: RECIPIENT, data: '0x' }],
          feeToken: FEE_TOKEN,
        }),
      ).resolves.toBe(transactionHash);

      expect(signTransaction).toHaveBeenCalledWith('wallet-id', {
        params: {
          transaction: expect.objectContaining({
            type: 118,
            chain_id: TEMPO_CHAIN_ID,
            calls: [{ to: RECIPIENT, data: '0x' }],
            fee_token: FEE_TOKEN,
          }),
        },
      });
      expect(rpcRequests.map(({ method }) => method)).toContain('eth_sendRawTransaction');
    });
  });
});
