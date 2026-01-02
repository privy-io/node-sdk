import {
  address as solanaAddress,
  getBase64EncodedWireTransaction,
  getTransactionDecoder,
  type Address,
  type SignatureBytes,
} from '@solana/kit';
import { base58, base64 } from '@scure/base';
import type {
  MessagePartialSigner,
  TransactionPartialSigner,
  TransactionSendingSigner,
} from '@solana/signers';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';
import type { LinkedAccountEmbeddedWallet } from './resources/users';
import type { Wallet } from './resources/wallets/wallets';

export interface CreatePrivySignerInput {
  /** Wallet to use for signing. */
  wallet: LinkedAccountEmbeddedWallet | Wallet;
  /** Authorization context for the wallet. */
  authorizationContext?: AuthorizationContext;
  /**
   * CAIP-2 for the Solana network.
   * @optional This field is only required for sending transactions.
   */
  caip2?: string;
}

/**
 * Defines a signer that uses a {@link PrivyClient} to sign messages and transactions.
 *
 * It implements the {@link MessagePartialSigner}, {@link TransactionPartialSigner},
 * and {@link TransactionSendingSigner} interfaces and keeps track of the ID of the
 * wallet used to sign them.
 */
export type PrivySigner = MessagePartialSigner &
  TransactionPartialSigner &
  TransactionSendingSigner &
  Readonly<{ walletId: string; address: Address }>;

/**
 * Creates a {@link PrivySigner} from a provided Privy wallet ID and authorization context.
 *
 * The returned signer implements:
 * - {@link MessagePartialSigner} - for signing messages via `signMessages`
 * - {@link TransactionPartialSigner} - for signing transactions via `signTransactions`
 * - {@link TransactionSendingSigner} - for signing and sending transactions via `signAndSendTransactions`
 *
 * And it keeps track of the `walletId` used to sign them.
 *
 * @example
 * ```ts
 * import { PrivyClient } from '@privy-io/node';
 * import { createPrivySigner } from '@privy-io/node/solana-kit';
 *
 * const client = new PrivyClient({ appId: '...', appSecret: '...' });
 * const wallet = await client.wallets.create({ chain_type: 'solana' });
 * const signer = createPrivySigner(client, { wallet });
 * ```
 */
export function createPrivySigner(
  client: PrivyClient,
  { wallet, authorizationContext, caip2 }: CreatePrivySignerInput,
): PrivySigner {
  const walletId = wallet.id;
  if (!walletId) {
    throw new Error('Wallet must have an ID to be used as a signer.');
  }
  if (wallet.chain_type !== 'solana') {
    throw new Error(`Wallet must be a Solana wallet. Received chain_type: '${wallet.chain_type}'.`);
  }
  const address = solanaAddress(wallet.address);
  const authCtxOptions = authorizationContext ? { authorization_context: authorizationContext } : {};
  return {
    address,
    walletId,

    async signMessages(messages) {
      return await Promise.all(
        messages.map(async (message) => {
          const response = await client
            .wallets()
            .solana()
            .signMessage(walletId, {
              message: message.content,
              ...authCtxOptions,
            });

          // We assert the signature is valid by casting to `SignatureBytes`
          const signatureBytes = base64.decode(response.signature) as SignatureBytes;
          return {
            [address]: signatureBytes,
          };
        }),
      );
    },

    async signTransactions(transactions) {
      return await Promise.all(
        transactions.map(async (transaction) => {
          // Convert compiled transaction to wire format base64
          const transactionBase64 = getBase64EncodedWireTransaction(transaction);

          const response = await client
            .wallets()
            .solana()
            .signTransaction(walletId, {
              transaction: transactionBase64,
              ...authCtxOptions,
            });

          const signedTransactionBytes = base64.decode(response.signed_transaction);
          const decoder = getTransactionDecoder();
          const signedTransaction = decoder.decode(signedTransactionBytes);

          return {
            // We assert the signature exists by asserting as non-null
            [address]: signedTransaction.signatures[address]!,
          };
        }),
      );
    },

    async signAndSendTransactions(transactions) {
      if (!caip2) {
        throw new Error(
          'CAIP-2 is required for sending transactions. Please provide one in the createPrivySigner input.',
        );
      }

      return await Promise.all(
        transactions.map(async (transaction) => {
          // Convert compiled transaction to wire format base64
          const transactionBase64 = getBase64EncodedWireTransaction(transaction);

          const response = await client
            .wallets()
            .solana()
            .signAndSendTransaction(walletId, {
              transaction: transactionBase64,
              caip2,
              ...authCtxOptions,
            });

          // The hash returned is base58-encoded, convert to bytes
          // and cast as a SignatureBytes, asserting it is a valid signature.
          return base58.decode(response.hash) as SignatureBytes;
        }),
      );
    },
  };
}
