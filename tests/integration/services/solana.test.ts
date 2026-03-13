import { getBase64EncodedWireTransaction } from '@solana/kit';
import { base58 } from '@scure/base';
import nacl from 'tweetnacl';
import { PrivyClient } from '@privy-io/node';
import { createTransferTransaction, SOL_DEVNET_CAIP2 } from '../../helpers/solana';
import {
  setupTestWalletResources,
  createTestWallets,
  TestWalletResources,
  TestWallet,
  WALLET_CASES,
} from '../test-setup';

describe('PrivySolanaService', () => {
  let resources: TestWalletResources;
  let wallets: TestWallet[];
  let privyClient: PrivyClient;

  beforeAll(async () => {
    resources = await setupTestWalletResources();
    wallets = await createTestWallets(resources, 'solana');
    privyClient = resources.client;
  });

  describe.each(WALLET_CASES)('$ownership', ({ index }) => {
    let wallet: TestWallet;

    beforeEach(() => {
      wallet = wallets[index]!;
    });

    describe('signMessage', () => {
      it('should be able to sign a base64-encoded message', async () => {
        const base64Message = Buffer.from('Hello, world!', 'utf8').toString('base64');
        const response = await privyClient
          .wallets()
          .solana()
          .signMessage(wallet.id, {
            message: base64Message,
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.signature).toBeDefined();

        const verified = nacl.sign.detached.verify(
          Buffer.from(base64Message, 'base64'),
          Buffer.from(response.signature, 'base64'),
          base58.decode(wallet.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a byte array message', async () => {
        const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const response = await privyClient
          .wallets()
          .solana()
          .signMessage(wallet.id, {
            message,
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.signature).toBeDefined();
        const verified = nacl.sign.detached.verify(
          message,
          Buffer.from(response.signature, 'base64'),
          base58.decode(wallet.address),
        );
        expect(verified).toBe(true);
      });
    });

    describe('signTransaction', () => {
      it('should be able to sign a base64-encoded transaction', async () => {
        const transaction = await createTransferTransaction(wallet.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signTransaction(wallet.id, {
            transaction: getBase64EncodedWireTransaction(transaction),
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.signed_transaction).toBeDefined();

        const signedTxBytes = Buffer.from(response.signed_transaction, 'base64');
        const signature = signedTxBytes.subarray(1, 65);

        const verified = nacl.sign.detached.verify(
          new Uint8Array(transaction.messageBytes),
          signature,
          base58.decode(wallet.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a binary encoded transaction', async () => {
        const transaction = await createTransferTransaction(wallet.address, 100);
        const base64Encoded = getBase64EncodedWireTransaction(transaction);
        const binaryTransaction = Buffer.from(base64Encoded, 'base64');

        const response = await privyClient
          .wallets()
          .solana()
          .signTransaction(wallet.id, {
            transaction: binaryTransaction,
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.signed_transaction).toBeDefined();

        const signedTxBytes = Buffer.from(response.signed_transaction, 'base64');
        const signature = signedTxBytes.subarray(1, 65);

        const verified = nacl.sign.detached.verify(
          new Uint8Array(transaction.messageBytes),
          signature,
          base58.decode(wallet.address),
        );
        expect(verified).toBe(true);
      });
    });

    // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
    describe.skip('signAndSendTransaction', () => {
      it('should be able to sign and send a transaction', async () => {
        const transaction = await createTransferTransaction(wallet.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signAndSendTransaction(wallet.id, {
            caip2: SOL_DEVNET_CAIP2,
            transaction: getBase64EncodedWireTransaction(transaction),
            ...(wallet.authorizationContext && { authorization_context: wallet.authorizationContext }),
          });

        expect(response.caip2).toBeDefined();
        expect(response.hash).toBeDefined();
      });
    });
  });
});
