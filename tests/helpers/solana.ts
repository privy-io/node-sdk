import { getTransferSolInstruction } from '@solana-program/system';
import {
  address,
  appendTransactionMessageInstruction,
  Blockhash,
  compileTransaction,
  createNoopSigner,
  createSolanaRpc,
  createTransactionMessage,
  devnet,
  pipe,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
} from '@solana/kit';

export const SOL_DEVNET_CAIP2 = 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1';
const SOL_TARGET_ADDRESS = '9NvE68JVWHHHGLp5NNELtM5fiBw6SXHrzqQJjUqaykC1';

const rpc = createSolanaRpc(devnet('https://api.devnet.solana.com'));

export async function createTransferTransaction(from: string, lamports: number) {
  const fromAddress = address(from);
  const toAddress = address(SOL_TARGET_ADDRESS);

  // Create a noop signer for the source address since Privy will sign it
  const sourceSigner = createNoopSigner(fromAddress);

  const latestBlockhash = {
    // This value ensures Privy will fill in the blockhash for the transaction
    // when the transaction is signed
    blockhash: '11111111111111111111111111111111' as Blockhash,
    lastValidBlockHeight: 418177020n,
  };

  const instruction = getTransferSolInstruction({
    source: sourceSigner,
    destination: toAddress,
    amount: lamports,
  });

  const transactionMessage = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayer(fromAddress, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) => appendTransactionMessageInstruction(instruction, m),
  );

  return compileTransaction(transactionMessage);
}
