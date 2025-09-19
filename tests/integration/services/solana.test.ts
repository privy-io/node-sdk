import {
  VersionedTransaction,
  SystemProgram,
  PublicKey,
  TransactionMessage,
  clusterApiUrl,
  Connection,
} from '@solana/web3.js';
import { base58 } from '@scure/base';
import nacl from 'tweetnacl';
import { AuthorizationContext } from '@privy-io/node';
import { PrivyClient } from '@privy-io/node';
import { TEST_APP, P256_KEYPAIR, OWNERLESS_SOLANA_WALLET, P256_OWNED_SOLANA_WALLET } from '../test-config';

describe('PrivySolanaService', () => {
  const p256AuthorizationContext: AuthorizationContext = {
    authorization_private_keys: [P256_KEYPAIR.privateKey],
  };

  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });
  describe('PrivySolanaService', () => {
    describe('signMessage', () => {
      it('should be able to sign a base64-encoded message', async () => {
        const base64Message = Buffer.from('Hello, world!', 'utf8').toString('base64');
        const response = await privyClient
          .wallets()
          .solana()
          .signMessage(OWNERLESS_SOLANA_WALLET.id, { message: base64Message });

        expect(response.signature).toBeDefined();

        const verified = nacl.sign.detached.verify(
          Buffer.from(base64Message, 'base64'),
          Buffer.from(response.signature, 'base64'),
          base58.decode(OWNERLESS_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a byte array message', async () => {
        const message = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const response = await privyClient
          .wallets()
          .solana()
          .signMessage(OWNERLESS_SOLANA_WALLET.id, { message });

        expect(response.signature).toBeDefined();
        const verified = nacl.sign.detached.verify(
          message,
          Buffer.from(response.signature, 'base64'),
          base58.decode(OWNERLESS_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a message with an authorization context', async () => {
        const base64Message = Buffer.from('Hello, world!', 'utf8').toString('base64');
        const response = await privyClient.wallets().solana().signMessage(P256_OWNED_SOLANA_WALLET.id, {
          message: base64Message,
          authorization_context: p256AuthorizationContext,
        });

        expect(response.signature).toBeDefined();

        const verified = nacl.sign.detached.verify(
          Buffer.from(base64Message, 'base64'),
          Buffer.from(response.signature, 'base64'),
          base58.decode(P256_OWNED_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
    });
    describe('signTransaction', () => {
      const connection = new Connection(clusterApiUrl('devnet'));
      async function createTransferTransaction(from: string, lamports: number) {
        const fromPubkey = new PublicKey(base58.decode(from));
        const toPubkey = new PublicKey(base58.decode('9NvE68JVWHHHGLp5NNELtM5fiBw6SXHrzqQJjUqaykC1'));

        const { blockhash: recentBlockhash } = await connection.getLatestBlockhash();

        const instruction = SystemProgram.transfer({ fromPubkey, toPubkey, lamports });
        const message = new TransactionMessage({
          payerKey: fromPubkey,
          instructions: [instruction],
          recentBlockhash,
        });

        return new VersionedTransaction(message.compileToV0Message());
      }
      it('should be able to sign a base64-encoded transaction', async () => {
        const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signTransaction(OWNERLESS_SOLANA_WALLET.id, {
            transaction: Buffer.from(transaction.serialize()).toString('base64'),
          });

        expect(response.signed_transaction).toBeDefined();
        const signedTransaction = VersionedTransaction.deserialize(
          Buffer.from(response.signed_transaction, 'base64'),
        );

        const verified = nacl.sign.detached.verify(
          transaction.message.serialize(),
          signedTransaction.signatures[0]!,
          base58.decode(OWNERLESS_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a binary encoded transaction', async () => {
        const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
        const response = await privyClient.wallets().solana().signTransaction(OWNERLESS_SOLANA_WALLET.id, {
          transaction: transaction.serialize(),
        });

        expect(response.signed_transaction).toBeDefined();
        const signedTransaction = VersionedTransaction.deserialize(
          Buffer.from(response.signed_transaction, 'base64'),
        );

        const verified = nacl.sign.detached.verify(
          transaction.message.serialize(),
          signedTransaction.signatures[0]!,
          base58.decode(OWNERLESS_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
      it('should be able to sign a transaction with an authorization context', async () => {
        const transaction = await createTransferTransaction(P256_OWNED_SOLANA_WALLET.address, 100);
        const response = await privyClient.wallets().solana().signTransaction(P256_OWNED_SOLANA_WALLET.id, {
          transaction: transaction.serialize(),
          authorization_context: p256AuthorizationContext,
        });

        expect(response.signed_transaction).toBeDefined();
        const signedTransaction = VersionedTransaction.deserialize(
          Buffer.from(response.signed_transaction, 'base64'),
        );

        const verified = nacl.sign.detached.verify(
          transaction.message.serialize(),
          signedTransaction.signatures[0]!,
          base58.decode(P256_OWNED_SOLANA_WALLET.address),
        );
        expect(verified).toBe(true);
      });
    });
    // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
    describe.skip('signAndSendTransaction', () => {
      const connection = new Connection(clusterApiUrl('devnet'));
      const devnetCaip2 = 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1';
      async function createTransferTransaction(from: string, lamports: number) {
        const fromPubkey = new PublicKey(base58.decode(from));
        const toPubkey = new PublicKey(base58.decode('9NvE68JVWHHHGLp5NNELtM5fiBw6SXHrzqQJjUqaykC1'));

        const { blockhash: recentBlockhash } = await connection.getLatestBlockhash();

        const instruction = SystemProgram.transfer({ fromPubkey, toPubkey, lamports });
        const message = new TransactionMessage({
          payerKey: fromPubkey,
          instructions: [instruction],
          recentBlockhash,
        });

        return new VersionedTransaction(message.compileToV0Message());
      }
      it('should be able to sign a base64-encoded transaction', async () => {
        const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signAndSendTransaction(OWNERLESS_SOLANA_WALLET.id, {
            caip2: devnetCaip2,
            transaction: Buffer.from(transaction.serialize()).toString('base64'),
          });

        expect(response.caip2).toBeDefined();
        expect(response.hash).toBeDefined();
      });
      it('should be able to sign a binary encoded transaction', async () => {
        const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signAndSendTransaction(OWNERLESS_SOLANA_WALLET.id, {
            caip2: devnetCaip2,
            transaction: transaction.serialize(),
          });

        expect(response.caip2).toBeDefined();
        expect(response.hash).toBeDefined();
      });
      it('should be able to sign a transaction with an authorization context', async () => {
        const transaction = await createTransferTransaction(P256_OWNED_SOLANA_WALLET.address, 100);
        const response = await privyClient
          .wallets()
          .solana()
          .signAndSendTransaction(P256_OWNED_SOLANA_WALLET.id, {
            caip2: devnetCaip2,
            transaction: transaction.serialize(),
            authorization_context: p256AuthorizationContext,
          });

        expect(response.caip2).toBeDefined();
        expect(response.hash).toBeDefined();
      });
    });
  });
});
