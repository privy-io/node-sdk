import { isAddress as isEvmAddress, type Hex } from 'viem';
import { isAddress as isSolanaAddress, type Address } from '@solana/kit';
import { x402Client } from '@x402/fetch';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { registerExactSvmScheme } from '@x402/svm/exact/client';

import { createViemAccount } from './viem';
import { createSolanaKitSigner } from './solana-kit';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';

export interface CreateX402ClientInput {
  /** ID for the wallet. */
  walletId: string;
  /** Address for the wallet. */
  address: string;
  /** Authorization context for the wallet. */
  authorizationContext?: AuthorizationContext;
}

/**
 * Creates an x402 client configured with a Privy wallet for automatic payment handling.
 *
 * The returned client can be used with x402's `wrapFetchWithPayment` or `wrapAxiosWithPayment`
 * to automatically handle HTTP 402 Payment Required responses.
 *
 * @experimental This API is experimental and may change in future versions.
 *
 * @param client - The Privy client instance
 * @param input - Configuration for the x402 client
 * @param input.walletId - ID of the Privy wallet to use for payments
 * @param input.address - Address of the wallet
 * @param input.authorizationContext - Authorization context for the wallet
 * @returns A configured x402Client instance
 *
 * @example
 * ```typescript
 * import { PrivyClient } from '@privy-io/node';
 * import { createX402Client } from '@privy-io/node/x402';
 * import { wrapFetchWithPayment } from '@x402/fetch';
 *
 * const privyClient = new PrivyClient({ appId, appSecret });
 *
 * // Get wallet details
 * const wallet = await privyClient.wallets().get('walletId');
 *
 * // Create x402 client
 * const x402client = createX402Client(privyClient, {
 *   walletId: wallet.id,
 *   address: wallet.address,
 * });
 *
 * // Use with fetch
 * const fetchWithPayment = wrapFetchWithPayment(fetch, x402client);
 * const response = await fetchWithPayment('https://api.example.com/premium');
 *
 * // Or use with axios
 * // import { wrapAxiosWithPayment } from '@x402/axios';
 * // const axiosWithPayment = wrapAxiosWithPayment(axios, x402client);
 * ```
 */
export function createX402Client(
  client: PrivyClient,
  { walletId, address, authorizationContext }: CreateX402ClientInput,
): x402Client {
  const x402client = new x402Client();

  if (isEvmAddress(address)) {
    const evmSigner = createViemAccount(client, {
      walletId,
      address: address as Hex,
      ...(authorizationContext ? { authorizationContext } : {}),
    });
    registerExactEvmScheme(x402client, { signer: evmSigner });
  } else if (isSolanaAddress(address)) {
    const solanaSigner = createSolanaKitSigner(client, {
      walletId,
      address: address as Address,
      ...(authorizationContext ? { authorizationContext } : {}),
    });
    registerExactSvmScheme(x402client, { signer: solanaSigner });
  } else {
    throw new Error(`Invalid wallet address: ${address}. Address must be a valid EVM or Solana address.`);
  }

  return x402client;
}
