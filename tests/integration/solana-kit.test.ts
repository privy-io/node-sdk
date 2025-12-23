import { PrivyClient } from '@privy-io/node';
import { createPrivySigner, PrivySigner } from '@privy-io/node/solana-kit';
import {
  address,
  assertIsTransactionWithinSizeLimit,
  createSignableMessage,
  type Address,
  type SignatureBytes,
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  signTransactionMessageWithSigners,
  verifySignature,
  getPublicKeyFromAddress,
  signOffchainMessageWithSigners,
  OffchainMessage,
  verifyOffchainMessageEnvelope,
} from '@solana/kit';
import { base58 } from '@scure/base';
import nacl from 'tweetnacl';
import { generateTestJWT } from '../helpers/jwt-auth';
import { createTransferTransaction, SOL_DEVNET_CAIP2 } from '../helpers/solana';
import {
  TEST_APP,
  P256_KEYPAIR,
  OWNERLESS_SOLANA_WALLET,
  P256_OWNED_SOLANA_WALLET,
  USER_OWNED_SOLANA_WALLET,
} from './test-config';

describe('@solana/kit interop', () => {
  let privyClient: PrivyClient;
  beforeEach(() => {
    privyClient = new PrivyClient({
      appId: TEST_APP.id,
      appSecret: TEST_APP.secret,
      apiUrl: TEST_APP.apiUrl,
    });
  });

  describe('using a Privy wallet as a signer', () => {
    describe.each([
      // Case 1. Ownerless wallet
      { owner: null, walletId: OWNERLESS_SOLANA_WALLET.id, walletAddress: OWNERLESS_SOLANA_WALLET.address },
      // Case 2. P256-owned wallet
      {
        owner: 'p256',
        walletId: P256_OWNED_SOLANA_WALLET.id,
        walletAddress: P256_OWNED_SOLANA_WALLET.address,
      },
      // Case 3. User-owned wallet
      {
        owner: 'user',
        walletId: USER_OWNED_SOLANA_WALLET.id,
        walletAddress: USER_OWNED_SOLANA_WALLET.address,
      },
    ] as const)('for a wallet with owner:$owner', ({ owner, walletId, walletAddress }) => {
      let privySigner: PrivySigner;
      beforeEach(async () => {
        privySigner = createPrivySigner(privyClient, {
          walletId,
          address: address(walletAddress),
          caip2: SOL_DEVNET_CAIP2,
          authorizationContext: {
            ...(owner === 'p256' ? { authorization_private_keys: [P256_KEYPAIR.privateKey] } : {}),
            ...(owner === 'user' ? { user_jwts: [await generateTestJWT()] } : {}),
          },
        });
      });

      describe('signMessages', () => {
        it('should be able to sign a text message', async () => {
          const message = createSignableMessage('Hello, world!');
          const allSignatures = await privySigner.signMessages([message]);
          const signatures = allSignatures[0]!;

          expect(signatures).toBeDefined();
          expect(signatures[privySigner.address as Address]).toBeDefined();

          // Verify the signature
          const signatureBytes = signatures[privySigner.address as Address] as SignatureBytes;
          const verified = nacl.sign.detached.verify(
            message.content,
            signatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified).toBe(true);
        });

        it('should be able to sign a binary message', async () => {
          const content = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          const message = createSignableMessage(content);
          const allSignatures = await privySigner.signMessages([message]);
          const signatures = allSignatures[0]!;

          expect(signatures).toBeDefined();
          expect(signatures[privySigner.address as Address]).toBeDefined();

          // Verify the signature
          const signatureBytes = signatures[privySigner.address as Address] as SignatureBytes;
          const verified = nacl.sign.detached.verify(content, signatureBytes, base58.decode(walletAddress));
          expect(verified).toBe(true);
        });

        it('should be able to sign multiple messages', async () => {
          const message1 = createSignableMessage('First message');
          const message2 = createSignableMessage('Second message');
          const allSignatures = await privySigner.signMessages([message1, message2]);

          expect(allSignatures).toHaveLength(2);

          // Verify first signature
          const verified1 = nacl.sign.detached.verify(
            message1.content,
            allSignatures[0]![privySigner.address as Address] as SignatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified1).toBe(true);

          // Verify second signature
          const verified2 = nacl.sign.detached.verify(
            message2.content,
            allSignatures[1]![privySigner.address as Address] as SignatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified2).toBe(true);
        });
      });

      describe('signTransactions', () => {
        it('should be able to sign a transaction', async () => {
          const transaction = await createTransferTransaction(walletAddress, 100);
          assertIsTransactionWithinSizeLimit(transaction);
          const allSignatures = await privySigner.signTransactions([transaction]);
          const signatures = allSignatures[0]!;

          expect(signatures).toBeDefined();
          expect(signatures[privySigner.address as Address]).toBeDefined();

          // Verify the signature
          const signatureBytes = signatures[privySigner.address as Address] as SignatureBytes;
          const verified = nacl.sign.detached.verify(
            new Uint8Array(transaction.messageBytes),
            signatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified).toBe(true);
        });

        it('should be able to sign multiple transactions', async () => {
          const transaction1 = await createTransferTransaction(walletAddress, 100);
          assertIsTransactionWithinSizeLimit(transaction1);
          const transaction2 = await createTransferTransaction(walletAddress, 200);
          assertIsTransactionWithinSizeLimit(transaction2);
          const allSignatures = await privySigner.signTransactions([transaction1, transaction2]);

          expect(allSignatures).toHaveLength(2);

          // Verify first signature
          const verified1 = nacl.sign.detached.verify(
            new Uint8Array(transaction1.messageBytes),
            allSignatures[0]![privySigner.address as Address] as SignatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified1).toBe(true);

          // Verify second signature
          const verified2 = nacl.sign.detached.verify(
            new Uint8Array(transaction2.messageBytes),
            allSignatures[1]![privySigner.address as Address] as SignatureBytes,
            base58.decode(walletAddress),
          );
          expect(verified2).toBe(true);
        });
      });

      // Skipped to not waste funds. Logic is shared with signing transactions so safe to not frequently test.
      describe.skip('signAndSendTransactions', () => {
        it('should be able to sign and send a transaction', async () => {
          const transaction = await createTransferTransaction(walletAddress, 100);
          const [signature] = await privySigner.signAndSendTransactions([transaction]);

          expect(signature).toBeDefined();
          // Solana signatures are 64 bytes
          expect(signature).toHaveLength(64);
        });
      });

      describe('using the signer through @solana/kit', () => {
        it('should be able to sign a transaction', async () => {
          const transactionMessage = pipe(
            createTransactionMessage({ version: 0 }),
            (m) => setTransactionMessageFeePayerSigner(privySigner, m),
            // Add instructions, lifetime, etc.
          );
          const signedTransaction = await signTransactionMessageWithSigners(transactionMessage);

          expect(
            await verifySignature(
              await getPublicKeyFromAddress(transactionMessage.feePayer.address),
              signedTransaction.signatures[transactionMessage.feePayer.address]!,
              signedTransaction.messageBytes,
            ),
          ).toBe(true);
        });
        it('should sign offchain messages', async () => {
          const offchainMessage: OffchainMessage = {
            version: 1,
            content: 'Privy works when used as a @solana/kit signer.',
            requiredSignatories: [privySigner],
          };
          const signedMessageEnvelope = await signOffchainMessageWithSigners(offchainMessage);
          expect(signedMessageEnvelope.signatures[privySigner.address as Address]).toBeDefined();
          expect(verifyOffchainMessageEnvelope(signedMessageEnvelope)).resolves.toBe(undefined);
        });
      });
    });
  });
});
