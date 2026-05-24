import { PrivyClient } from '@privy-io/node';
import { createViemAccount } from '@privy-io/node/viem';
import type { AuthorizationRequest, Hex, SignableMessage, TypedData, TypedDataDefinition } from 'viem';
import type { SignTransactionParameters } from 'viem/accounts';
import {
  keccak256,
  parseTransaction,
  serializeTransaction,
  verifyAuthorization,
  verifyHash,
  verifyMessage,
  verifyTypedData,
} from 'viem/utils';
import {
  setupTestWalletResources,
  createTestWallets,
  TestWalletResources,
  TestWallet,
  WALLET_CASES,
} from './test-setup';

describe('viem utils', () => {
  const tempoFeeToken = '0x20c0000000000000000000000000000000000000' as const;
  const tempoModeratoChainId = 42431;

  let resources: TestWalletResources;
  let wallets: TestWallet[];
  let privyClient: PrivyClient;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    wallets = await createTestWallets(resources, 'ethereum');
    privyClient = resources.client;
  });

  describe('createViemAccount', () => {
    describe.each(WALLET_CASES)('$ownership', ({ index }) => {
      let wallet: TestWallet;
      let address: Hex;
      let account: ReturnType<typeof createViemAccount>;

      beforeEach(() => {
        wallet = wallets[index]!;
        address = wallet.address as Hex;
        account = createViemAccount(privyClient, {
          walletId: wallet.id,
          address,
          authorizationContext: wallet.authorizationContext ?? {},
        });
      });
      it('should be able to sign a hash', async () => {
        const hash: Hex = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
        const signature = await account.sign?.({ hash });
        expect(signature).toBeDefined();
        const verified = await verifyHash({ hash, signature: signature!, address });
        expect(verified).toBe(true);
      });
      it.each<[string, SignableMessage]>([
        ['utf-8 message', 'Hello, world!'],
        ['hex-encoded message', { raw: '0x1234567890' }],
        ['byte array', { raw: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) }],
      ])('should be able to sign over a %s', async (_, message) => {
        const signature = await account.signMessage({ message });
        expect(signature).toBeDefined();
        const verified = await verifyMessage({
          address,
          message,
          signature,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign typed data', async () => {
        const typedData: TypedDataDefinition<TypedData, keyof TypedData> = {
          domain: {
            name: 'Test',
            version: '1',
            chainId: 1,
            verifyingContract: '0x1234567890123456789012345678901234567890',
          },
          primaryType: 'Message' as const,
          types: { Message: [{ name: 'content', type: 'string' }] },
          message: { content: 'Hello world' },
        };

        const signature = await account.signTypedData(typedData);
        expect(signature).toBeDefined();
        const verified = await verifyTypedData({
          ...typedData,
          address,
          signature,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign 7702 authorization', async () => {
        const authorization: AuthorizationRequest = {
          contractAddress: '0x1234567890123456789012345678901234567890',
          chainId: 1,
          nonce: 1,
        };

        const signedAuthorization = await account.signAuthorization?.(authorization);
        expect(signedAuthorization).toBeDefined();
        const verified = await verifyAuthorization({
          address,
          authorization: signedAuthorization!,
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a transaction', async () => {
        const unsignedTx: SignTransactionParameters['transaction'] = {
          type: 'eip1559',
          chainId: 1,
          to: '0x742D35Cc6634C0532925A3b844BC9e7095F49e22',
          value: 1n,
          gas: 21000n,
          data: '0x',
        };

        const signedTx = await account.signTransaction(unsignedTx);
        expect(signedTx).toBeDefined();

        const parsedTx = parseTransaction(signedTx);

        const verified = await verifyHash({
          hash: keccak256(serializeTransaction(unsignedTx)),
          address,
          signature: {
            r: parsedTx.r!,
            s: parsedTx.s!,
            yParity: parsedTx.yParity!,
          },
        });
        expect(verified).toBe(true);
      });
      it('should be able to sign a Tempo transaction', async () => {
        const { Transaction } = require('viem/tempo') as typeof import('viem/tempo');

        const signedTx = await account.signTransaction({
          type: 'tempo',
          chainId: tempoModeratoChainId,
          calls: [{ to: '0x742D35Cc6634C0532925A3b844BC9e7095F49e22', data: '0x', value: 0n }],
          feeToken: tempoFeeToken,
          gas: 21000n,
          maxFeePerGas: 1n,
          maxPriorityFeePerGas: 1n,
          nonce: 0,
          nonceKey: 0n,
          validBefore: 2_000_000_000,
        });

        expect(signedTx).toMatch(/^0x76[0-9a-fA-F]+$/);

        const parsedTx = Transaction.deserialize(signedTx as `0x76${string}`);
        expect(parsedTx.type).toBe('tempo');
        expect(parsedTx.chainId).toBe(tempoModeratoChainId);
        expect(parsedTx.calls).toHaveLength(1);
        expect(parsedTx.calls[0]?.to?.toLowerCase()).toBe('0x742d35cc6634c0532925a3b844bc9e7095f49e22');
        const parsedFeeToken =
          typeof parsedTx.feeToken === 'bigint' ?
            `0x20c0${parsedTx.feeToken.toString(16).padStart(36, '0')}`
          : parsedTx.feeToken?.toLowerCase();
        expect(parsedFeeToken).toBe(tempoFeeToken);
        expect(parsedTx.signature).toBeDefined();
      });
    });
  });
});
