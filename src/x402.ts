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
 * EVM wallet configuration for x402 payments.
 */
export interface EvmWalletConfig {
  /** ID for the EVM wallet */
  walletId: string;
  /**
   * Ethereum address for the wallet.
   * Optional - if not provided, it will be fetched from the Privy API using the walletId.
   */
  address?: Hex;
  /** Authorization context for the wallet */
  authorizationContext?: AuthorizationContext;
}

/**
 * Solana wallet configuration for x402 payments.
 */
export interface SolanaWalletConfig {
  /** ID for the Solana wallet */
  walletId: string;
  /**
   * Solana address for the wallet.
   * Optional - if not provided, it will be fetched from the Privy API using the walletId.
   */
  address?: Address;
  /** Authorization context for the wallet */
  authorizationContext?: AuthorizationContext;
}

/**
 * Options for wrapping a fetch function with x402 payment handling.
 * At least one of `evm` or `solana` must be provided. Both can be configured for multi-network support.
 */
export interface WrapFetchWithPaymentOptions {
  /** The Privy client instance */
  client: PrivyClient;
  /** EVM wallet configuration (for Ethereum, Base, etc.) */
  evm?: EvmWalletConfig;
  /** Solana wallet configuration */
  solana?: SolanaWalletConfig;
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
 *
 * @param options - Configuration options for the wrapped fetch
 * @param options.client - The Privy client instance
 * @param options.evm - EVM wallet configuration (walletId required, address optional - fetched if not provided)
 * @param options.solana - Solana wallet configuration (walletId required, address optional - fetched if not provided)
 * @returns A Promise that resolves to a wrapped fetch function that handles 402 responses automatically
 *
 * @example
 * ```typescript
 * // EVM only - address is optional, will be fetched if not provided
 * import { PrivyClient, wrapFetchWithPayment } from '@privy-io/node';
 *
 * const client = new PrivyClient({ appId, appSecret });
 *
 * // Simple: just provide walletId, address will be fetched automatically
 * const fetchWithPayment = await wrapFetchWithPayment({
 *   client,
 *   evm: {
 *     walletId: 'wallet-abc123',
 *   },
 * });
 *
 * // Or provide address explicitly to skip the API call
 * const fetchWithPayment2 = await wrapFetchWithPayment({
 *   client,
 *   evm: {
 *     walletId: 'wallet-abc123',
 *     address: '0x1234...' as `0x${string}`,
 *   },
 * });
 *
 * const response = await fetchWithPayment('https://api.example.com/premium');
 * ```
 *
 * @example
 * ```typescript
 * // Multi-network (EVM + Solana)
 * import { PrivyClient, wrapFetchWithPayment } from '@privy-io/node';
 *
 * const client = new PrivyClient({ appId, appSecret });
 *
 * const fetchWithPayment = await wrapFetchWithPayment({
 *   client,
 *   evm: { walletId: 'evm-wallet-id' },
 *   solana: { walletId: 'solana-wallet-id' },
 * });
 *
 * // Handles both EVM and Solana 402 responses automatically
 * const response = await fetchWithPayment('https://api.example.com/premium');
 * ```
 *
 * @experimental This API is experimental and may change in future versions
 */
export const wrapFetchWithPayment: WrapFetchWithPayment = async ({ client, evm, solana }) => {
  if (!evm && !solana) {
    throw new Error('At least one wallet configuration (evm or solana) must be provided');
  }

  const x402client = new x402Client();

  // Register EVM scheme if EVM wallet is configured
  if (evm) {
    // Fetch address from API if not provided
    let evmAddress = evm.address;
    if (!evmAddress) {
      const wallet = await client.wallets().get(evm.walletId);
      evmAddress = wallet.address as Hex;
    }

    const evmSigner = createViemAccount(client, {
      walletId: evm.walletId,
      address: evmAddress,
      ...(evm.authorizationContext ? { authorizationContext: evm.authorizationContext } : {}),
    });
    registerExactEvmScheme(x402client, { signer: evmSigner });
  }

  // Register Solana scheme if Solana wallet is configured
  if (solana) {
    // Fetch address from API if not provided
    let solanaAddress = solana.address;
    if (!solanaAddress) {
      const wallet = await client.wallets().get(solana.walletId);
      solanaAddress = wallet.address as Address;
    }

    const solanaSigner = createSolanaKitSigner(client, {
      walletId: solana.walletId,
      address: solanaAddress,
      ...(solana.authorizationContext ? { authorizationContext: solana.authorizationContext } : {}),
    });
    registerExactSvmScheme(x402client, { signer: solanaSigner });
  }

  // Return wrapped fetch that handles 402 payments automatically
  return x402WrapFetch(globalThis.fetch, x402client);
};
