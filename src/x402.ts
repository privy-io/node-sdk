import { isAddress as isEvmAddress, type Hex } from 'viem';
import { isAddress as isSolanaAddress, type Address } from '@solana/kit';
import type { PaymentPolicy, SpendControls } from '@x402/core/client';
import { x402Client } from '@x402/fetch';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { registerExactSvmScheme } from '@x402/svm/exact/client';

import { createViemAccount } from './viem';
import { createSolanaKitSigner } from './solana-kit';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';
import type { SignatureOptions } from './resources';

export type X402SpendControls = SpendControls | false;
export type X402PaymentPolicy = PaymentPolicy;

export interface CreateX402ClientInput {
  /** ID for the wallet. */
  walletId: string;
  /** Address for the wallet. */
  address: string;
  /** Authorization context for the wallet. */
  authorizationContext?: AuthorizationContext;
  /** Signature options for the wallet. Use `{ type: 'erc1271' }` for EIP-7702 gas-sponsored wallets. */
  signatureOptions?: SignatureOptions;
  /**
   * Per-payment spending limits and asset controls.
   * Defaults to x402's $1 cap on recognized default assets.
   */
  spendControls?: X402SpendControls;
  /**
   * Additional policy for filtering or ordering payment requirements before selection.
   * Returning transformed requirements is rejected before signing.
   */
  paymentPolicy?: X402PaymentPolicy;
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
  }
  return value;
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
 * @param input.spendControls - Per-payment spending limits and asset controls
 * @param input.paymentPolicy - Additional payment policy
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
  {
    walletId,
    address,
    authorizationContext,
    signatureOptions,
    spendControls,
    paymentPolicy,
  }: CreateX402ClientInput,
): x402Client {
  const approvedRequirements = new WeakMap<object, string>();
  const x402client = new x402Client()
    .registerPolicy((_x402Version, requirements) => {
      for (const requirement of requirements) {
        deepFreeze(requirement);
        approvedRequirements.set(requirement, JSON.stringify(requirement));
      }
      return requirements;
    })
    .onBeforePaymentCreation(async ({ selectedRequirements }) => {
      const { amount, asset, network } = selectedRequirements;
      if (
        typeof amount !== 'string' ||
        !/^\d+$/.test(amount) ||
        typeof asset !== 'string' ||
        asset.length === 0 ||
        typeof network !== 'string' ||
        network.length === 0 ||
        approvedRequirements.get(selectedRequirements) !== JSON.stringify(selectedRequirements)
      ) {
        throw new Error('Invalid x402 payment requirements.');
      }
    });
  if (spendControls !== undefined) {
    x402client.setSpendControls(spendControls);
  }
  if (paymentPolicy) {
    x402client.registerPolicy(paymentPolicy);
  }

  if (isEvmAddress(address)) {
    const evmSigner = createViemAccount(client, {
      walletId,
      address: address as Hex,
      ...(authorizationContext ? { authorizationContext } : {}),
      ...(signatureOptions ? { signatureOptions } : {}),
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
