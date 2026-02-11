import type { Hex } from 'viem';
import type { Address } from '@solana/kit';
import { wrapFetchWithPayment as x402WrapFetch, x402Client } from '@x402/fetch';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { registerExactSvmScheme } from '@x402/svm/exact/client';

import { createViemAccount } from './viem';
import { createSolanaKitSigner } from './solana-kit';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';

/**
 * Wallet configuration for x402 payments.
 */
export interface WalletConfig {
  /** ID for the wallet */
  walletId: string;
  /** Authorization context for the wallet (for policy-protected wallets) */
  authorizationContext?: AuthorizationContext;
}

/**
 * Options for wrapping a fetch function with x402 payment handling.
 */
export interface WrapFetchWithPaymentOptions {
  /** The Privy client instance */
  client: PrivyClient;
  /**
   * Wallet configuration for x402 payments.
   * The wallet's chain type (EVM or Solana) is automatically detected.
   */
  wallet: WalletConfig;
}

/**
 * Return type for wrapFetchWithPayment - returns a Promise that resolves to a fetch function
 */
export type WrapFetchWithPayment = (options: WrapFetchWithPaymentOptions) => Promise<typeof globalThis.fetch>;

/**
 * Wraps a fetch function to automatically handle x402 (HTTP 402) payments.
 *
 * When the wrapped fetch encounters a 402 Payment Required response, it will:
 * 1. Parse the payment requirements from the response
 * 2. Sign and create a payment header using the specified Privy wallet
 * 3. Retry the request with the X-PAYMENT header
 *
 * This uses the latest x402 v2 protocol with support for both EVM and Solana networks.
 * The wallet's chain type is automatically detected from its metadata.
 *
 * @param options - Configuration options for the wrapped fetch
 * @param options.client - The Privy client instance
 * @param options.wallet - Wallet config. Chain type (ethereum/solana) is auto-detected.
 * @returns A Promise that resolves to a wrapped fetch function that handles 402 responses automatically
 *
 * @example
 * ```typescript
 * import { PrivyClient, wrapFetchWithPayment } from '@privy-io/node';
 *
 * const client = new PrivyClient({ appId, appSecret });
 *
 * const fetchWithPayment = await wrapFetchWithPayment({
 *   client,
 *   wallet: { walletId: 'wallet-abc123' },
 * });
 *
 * const response = await fetchWithPayment('https://api.example.com/premium');
 * ```
 */
export const wrapFetchWithPayment: WrapFetchWithPayment = async ({ client, wallet }) => {
  const x402client = new x402Client();

  // Fetch wallet details to determine chain type
  const walletDetails = await client.wallets().get(wallet.walletId);
  const chainType = walletDetails.chain_type;
  const { authorizationContext } = wallet;

  if (chainType === 'ethereum') {
    const evmSigner = createViemAccount(client, {
      walletId: wallet.walletId,
      address: walletDetails.address as Hex,
      ...(authorizationContext ? { authorizationContext } : {}),
    });
    registerExactEvmScheme(x402client, { signer: evmSigner });
  } else if (chainType === 'solana') {
    const solanaSigner = createSolanaKitSigner(client, {
      walletId: wallet.walletId,
      address: walletDetails.address as Address,
      ...(authorizationContext ? { authorizationContext } : {}),
    });
    registerExactSvmScheme(x402client, { signer: solanaSigner });
  } else {
    throw new Error(
      `Unsupported chain type: ${chainType}. Only 'ethereum' and 'solana' are supported for x402.`,
    );
  }

  // Return wrapped fetch that handles 402 payments automatically
  return x402WrapFetch(globalThis.fetch, x402client);
};
