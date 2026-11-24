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

export interface X402DacsGuardrail {
  /** Optional DACS mandate identifier. */
  dacsMandate?: string;
  /** Optional DACS session identifier. */
  dacsSessionId?: string;
  /**
   * Deterministic pre-flight spend ceiling in base units (bigint or integer string).
   * Enforced whenever supplied, even when `dacsMandate` / `dacsSessionId` are omitted.
   */
  dacsMaxAmount?: bigint | string;
  /** Optional synchronous or async DACS attestation hook invoked before payment creation. */
  onAttest?: (context: {
    amount: bigint;
    asset: string;
    network: string;
    dacsMandate?: string;
    dacsSessionId?: string;
  }) => void | Promise<void>;
}

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
  /**
   * Optional DACS (Distributed Attestation & Consensus System) pre-flight guardrail
   * enforced before payment creation.
   */
  dacsGuardrail?: X402DacsGuardrail;
}

function parseDacsMaxAmountBaseUnits(maxAmount: bigint | string): bigint {
  if (typeof maxAmount === 'bigint') {
    if (maxAmount < 0n) {
      throw new Error(`Invalid negative DACS ceiling: ${maxAmount.toString()}`);
    }
    return maxAmount;
  }

  const normalized = maxAmount.trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`Invalid DACS ceiling base units: "${maxAmount}"`);
  }
  return BigInt(normalized);
}

function deepFreeze<T>(value: T, visited = new WeakSet<object>()): T {
  if (!value || typeof value !== 'object' || visited.has(value)) {
    return value;
  }

  visited.add(value);
  for (const nestedValue of Object.values(value)) {
    deepFreeze(nestedValue, visited);
  }
  if (!Object.isFrozen(value)) {
    Object.freeze(value);
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
 * @param input.dacsGuardrail - Optional DACS pre-flight spend ceiling and attestation hook
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
 * const response = await fetchWithPayment('[https://api.example.com/premium](https://api.example.com/premium)');
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
    dacsGuardrail,
  }: CreateX402ClientInput,
): x402Client {
  let approvedRequirements = new WeakMap<object, string>();
  const x402client = new x402Client()
    .registerPolicy((_x402Version, requirements) => {
      const currentApprovals = new WeakMap<object, string>();
      for (const requirement of requirements) {
        deepFreeze(requirement);
        currentApprovals.set(requirement, JSON.stringify(requirement));
      }
      approvedRequirements = currentApprovals;
      return requirements;
    })
    .onBeforePaymentCreation(async ({ paymentRequired, selectedRequirements }) => {
      const { asset, network } = selectedRequirements;
      const amount =
        paymentRequired.x402Version === 1 ? selectedRequirements.maxAmountRequired
        : paymentRequired.x402Version === 2 ? selectedRequirements.amount
        : undefined;
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

      if (dacsGuardrail) {
        const requestedAmount = BigInt(amount);
        if (dacsGuardrail.dacsMaxAmount !== undefined) {
          const ceilingBaseUnits = parseDacsMaxAmountBaseUnits(dacsGuardrail.dacsMaxAmount);
          if (requestedAmount > ceilingBaseUnits) {
            throw new Error(
              `[DACS Guardrail] x402 payment amount (${requestedAmount.toString()}) exceeds ceiling (${ceilingBaseUnits.toString()}).`,
            );
          }
        }

        if (dacsGuardrail.onAttest) {
          await dacsGuardrail.onAttest({
            amount: requestedAmount,
            asset,
            network,
            ...(dacsGuardrail.dacsMandate ? { dacsMandate: dacsGuardrail.dacsMandate } : {}),
            ...(dacsGuardrail.dacsSessionId ? { dacsSessionId: dacsGuardrail.dacsSessionId } : {}),
          });
        }
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
