import { getBase64EncodedWireTransaction } from '@solana/kit';
import { base58 } from '@scure/base';
import nacl from 'tweetnacl';
import { AuthorizationContext } from '@privy-io/node';
import { PrivyClient } from '@privy-io/node';
import { TEST_APP, P256_KEYPAIR, OWNERLESS_SOLANA_WALLET, P256_OWNED_SOLANA_WALLET } from '../test-config';
import { createTransferTransaction, SOL_DEVNET_CAIP2 } from '../../helpers/solana';

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
    it('should be able to sign a base64-encoded transaction', async () => {
      const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
      const response = await privyClient
        .wallets()
        .solana()
        .signTransaction(OWNERLESS_SOLANA_WALLET.id, {
          transaction: getBase64EncodedWireTransaction(transaction),
        });

      expect(response.signed_transaction).toBeDefined();

      // Decode the signed transaction to verify signature
      const signedTxBytes = Buffer.from(response.signed_transaction, 'base64');
      // In Solana wire format, signatures come first
      // The first byte is the number of signatures, followed by 64-byte signatures
      const signature = signedTxBytes.subarray(1, 65);

      const verified = nacl.sign.detached.verify(
        new Uint8Array(transaction.messageBytes),
        signature,
        base58.decode(OWNERLESS_SOLANA_WALLET.address),
      );
      expect(verified).toBe(true);
    });

    it('should be able to sign a binary encoded transaction', async () => {
      const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
      const base64Encoded = getBase64EncodedWireTransaction(transaction);
      const binaryTransaction = Buffer.from(base64Encoded, 'base64');

      const response = await privyClient.wallets().solana().signTransaction(OWNERLESS_SOLANA_WALLET.id, {
        transaction: binaryTransaction,
      });

      expect(response.signed_transaction).toBeDefined();

      // Decode the signed transaction to verify signature
      const signedTxBytes = Buffer.from(response.signed_transaction, 'base64');
      const signature = signedTxBytes.subarray(1, 65);

      const verified = nacl.sign.detached.verify(
        new Uint8Array(transaction.messageBytes),
        signature,
        base58.decode(OWNERLESS_SOLANA_WALLET.address),
      );
      expect(verified).toBe(true);
    });

    it('should be able to sign a transaction with an authorization context', async () => {
      const transaction = await createTransferTransaction(P256_OWNED_SOLANA_WALLET.address, 100);
      const base64Encoded = getBase64EncodedWireTransaction(transaction);
      const binaryTransaction = Buffer.from(base64Encoded, 'base64');

      const response = await privyClient.wallets().solana().signTransaction(P256_OWNED_SOLANA_WALLET.id, {
        transaction: binaryTransaction,
        authorization_context: p256AuthorizationContext,
      });

      expect(response.signed_transaction).toBeDefined();

      // Decode the signed transaction to verify signature
      const signedTxBytes = Buffer.from(response.signed_transaction, 'base64');
      const signature = signedTxBytes.subarray(1, 65);

      const verified = nacl.sign.detached.verify(
        new Uint8Array(transaction.messageBytes),
        signature,
        base58.decode(P256_OWNED_SOLANA_WALLET.address),
      );
      expect(verified).toBe(true);
    });
  });
  // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
  describe.skip('signAndSendTransaction', () => {
    it('should be able to sign a base64-encoded transaction', async () => {
      const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
      const response = await privyClient
        .wallets()
        .solana()
        .signAndSendTransaction(OWNERLESS_SOLANA_WALLET.id, {
          caip2: SOL_DEVNET_CAIP2,
          transaction: getBase64EncodedWireTransaction(transaction),
        });

      expect(response.caip2).toBeDefined();
      expect(response.hash).toBeDefined();
    });

    it('should be able to sign a binary encoded transaction', async () => {
      const transaction = await createTransferTransaction(OWNERLESS_SOLANA_WALLET.address, 100);
      const base64Encoded = getBase64EncodedWireTransaction(transaction);
      const binaryTransaction = Buffer.from(base64Encoded, 'base64');

      const response = await privyClient
        .wallets()
        .solana()
        .signAndSendTransaction(OWNERLESS_SOLANA_WALLET.id, {
          caip2: SOL_DEVNET_CAIP2,
          transaction: binaryTransaction,
        });

      expect(response.caip2).toBeDefined();
      expect(response.hash).toBeDefined();
    });

    it('should be able to sign a transaction with an authorization context', async () => {
      const transaction = await createTransferTransaction(P256_OWNED_SOLANA_WALLET.address, 100);
      const base64Encoded = getBase64EncodedWireTransaction(transaction);
      const binaryTransaction = Buffer.from(base64Encoded, 'base64');

      const response = await privyClient
        .wallets()
        .solana()
        .signAndSendTransaction(P256_OWNED_SOLANA_WALLET.id, {
          caip2: SOL_DEVNET_CAIP2,
          transaction: binaryTransaction,
          authorization_context: p256AuthorizationContext,
        });

      expect(response.caip2).toBeDefined();
      expect(response.hash).toBeDefined();
    });
  });
});
