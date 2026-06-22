import type { Hex } from 'viem';
import {
  type LocalAccount,
  type SignMessageParameters,
  type SignTransactionParameters as ViemSignTransactionParameters,
  toAccount,
} from 'viem/accounts';
import type { Account as ViemTempoAccount } from 'viem/tempo';
import { toHex } from 'viem/utils';
import { PrivyAPIError } from './core/error';
import { formatTempoTransaction, isTempoTransaction, type TempoTransaction } from './internal/viem-tempo';
import { formatViemQuantity } from './internal/utils/viem';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';
import type { EthereumSignTransactionRpcInputParams } from './resources';

// Runtime formatting accepts normal viem transactions plus viem/tempo transactions.
type StandardViemTransaction = ViemSignTransactionParameters['transaction'];
type StandardViemTransactionType = StandardViemTransaction['type'];
type SupportedViemTransaction = StandardViemTransaction | TempoTransaction;
type SupportedViemTransactionType = SupportedViemTransaction['type'];

// Keep LocalAccount compatibility and add viem's Tempo-capable signTransaction signature.
type PrivySignTransaction = LocalAccount['signTransaction'] &
  ViemTempoAccount.Account_base['signTransaction'];

// Privy accounts are viem LocalAccounts with a wider signer for Tempo wallet clients.
export type PrivyViemAccount = Omit<LocalAccount, 'signTransaction'> & {
  signTransaction: PrivySignTransaction;
};

export interface CreateViemAccountInput {
  /** ID for the wallet. */
  walletId: string;
  /** Ethereum address for the wallet. */
  address: Hex;
  /** Authorization context for the wallet. */
  authorizationContext?: AuthorizationContext;
  /** When true, produces ERC-1271 signatures for EIP-7702 gas-sponsored wallets. */
  useErc1271?: boolean;
}

/**
 * Creates a viem `Account` instance for a Privy wallet given its ID, which can be used to sign
 * messages and send transactions with the wallet.
 *
 * @param client instance of the Privy client.
 * @param input an object specifying the details of the wallet to create the viem account for.
 * @returns viem `Account` instance for the wallet.
 */
export function createViemAccount(
  client: PrivyClient,
  { walletId, address, authorizationContext, useErc1271 }: CreateViemAccountInput,
): PrivyViemAccount {
  return toAccount({
    address: address as Hex,
    sign: async ({ hash }) => {
      const response = await client
        .wallets()
        .ethereum()
        .signSecp256k1(walletId, {
          params: { hash },
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });
      return response.signature as `0x${string}`;
    },
    signMessage: async ({ message }) => {
      const response = await client
        .wallets()
        .ethereum()
        .signMessage(walletId, {
          message: formatViemPersonalSignMessage(message),
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });
      return response.signature as `0x${string}`;
    },
    signTypedData: async (typedData) => {
      const { message, domain, types, primaryType } = replaceBigInts(typedData, toHex);
      // Viem accepts undefined `domain`, `message`, and `types` in this method
      // though those are required per the EIP712 spec.
      if (!domain) throw new PrivyAPIError('typedData.domain must be defined');
      if (!message) throw new PrivyAPIError('typedData.message must be defined');
      if (!types) throw new PrivyAPIError('typedData.message must be defined');
      const chainId = (domain as Record<string, unknown>)['chainId'];
      const caip2 = useErc1271 && chainId ? `eip155:${chainId}` : undefined;
      const { signature } = await client
        .wallets()
        .ethereum()
        .signTypedData(walletId, {
          params: {
            typed_data: { domain, message, primary_type: primaryType as string, types: types as any },
          },
          ...(useErc1271 ? { signature_options: { type: 'erc1271' } } : {}),
          ...(caip2 ? { caip2 } : {}),
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });
      return signature as Hex;
    },
    signTransaction: async (transaction) => {
      const { signed_transaction: signedTransaction } = await client
        .wallets()
        .ethereum()
        .signTransaction(walletId, {
          params: { transaction: formatViemTransaction(transaction as SupportedViemTransaction) },
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });

      return signedTransaction as Hex;
    },
    signAuthorization: async (parameters) => {
      const { authorization } = await client
        .wallets()
        .ethereum()
        .sign7702Authorization(walletId, {
          params: {
            contract: (parameters.contractAddress ?? parameters.address) as Hex,
            chain_id: parameters.chainId,
            nonce: parameters.nonce,
          },
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });
      return {
        address: authorization.contract as Hex,
        nonce: Number(authorization.nonce),
        chainId: Number(authorization.chain_id),
        yParity: authorization.y_parity,
        r: authorization.r as Hex,
        s: authorization.s as Hex,
      };
    },
  }) as PrivyViemAccount;
}

/**
 * Formats a viem transaction type to the JSON-RPC transaction type:
 * - 'legacy' -> 0
 * - 'eip2930' -> 1
 * - 'eip1559' or undefined -> 2. This is the default EVM transaction type.
 * - 'tempo' -> 118
 * - Other transaction types, including EIP-4844 and EIP-7702, are not supported yet.
 * @param type viem transaction type
 * @returns 0 | 1 | 2 | 118
 */
export function formatViemTransactionType(type: 'tempo'): 118;
export function formatViemTransactionType(type: StandardViemTransactionType): 0 | 1 | 2;
export function formatViemTransactionType(type: SupportedViemTransactionType): 0 | 1 | 2 | 118;
export function formatViemTransactionType(type: SupportedViemTransactionType) {
  if (type === 'legacy') {
    return 0 as const;
  } else if (type === 'eip2930') {
    return 1 as const;
  } else if (type == 'eip1559' || typeof type === 'undefined') {
    // Type 2 (EIP-1559) is the default transaction type
    return 2 as const;
  } else if (type === 'tempo') {
    return 118 as const;
  } else {
    throw new PrivyAPIError('EIP4844 and EIP7702 transaction types are not yet supported.');
  }
}

/**
 * Formats a `message` input to viem's `signMessage` function to the format needed for our wallet API.
 *
 * If the `message` is a string, we use it directly.
 *
 * If the `message` is an object containing a `raw` field, it indicates that the use case is signing raw bytes,
 * in which case we convert `message.raw` into a `Uint8Array` before passing it to our own `signMessage`
 * @param message input to viem's `signMessage` function
 * @returns message as a utf-8 `string` or `Uint8Array`
 */
const formatViemPersonalSignMessage = (message: SignMessageParameters['message']): string | Uint8Array => {
  if (typeof message === 'string') return message;

  if (typeof message.raw === 'string') {
    // We `.slice(2)` to remove the `0x` prefix
    return Uint8Array.from(Buffer.from(message.raw.slice(2), 'hex'));
  } else {
    return message.raw;
  }
};

/**
 * Formats a viem transaction into our internal transaction type. For the most part, this converts
 * bigints to hexstrings so they can be passed over the wire.
 *
 * @param tx input to viem's `sendTransaction` function
 * @returns transaction {EthereumSignTransactionInputType} as our own type
 */
export const formatViemTransaction = (
  tx: SupportedViemTransaction,
): EthereumSignTransactionRpcInputParams['transaction'] => {
  if (isTempoTransaction(tx)) {
    return formatTempoTransaction(tx);
  }

  const standardTx: StandardViemTransaction = tx;

  return {
    type: formatViemTransactionType(standardTx.type),
    ...(standardTx.to ? { to: standardTx.to } : {}),
    ...(standardTx.nonce ? { nonce: standardTx.nonce } : {}),
    ...(standardTx.chainId ? { chain_id: standardTx.chainId } : {}),
    ...(standardTx.data ? { data: standardTx.data } : {}),
    ...(standardTx.value ? { value: formatViemQuantity(standardTx.value) } : {}),
    ...(standardTx.gas ? { gas_limit: formatViemQuantity(standardTx.gas) } : {}),
    ...(standardTx.gasPrice ? { gas_price: formatViemQuantity(standardTx.gasPrice) } : {}),
    ...(standardTx.maxFeePerGas ? { max_fee_per_gas: formatViemQuantity(standardTx.maxFeePerGas) } : {}),
    ...(standardTx.maxPriorityFeePerGas ?
      { max_priority_fee_per_gas: formatViemQuantity(standardTx.maxPriorityFeePerGas) }
    : {}),
  };
};

// replaceBigInts courtesy of ponder.sh:
// https://github.com/ponder-sh/ponder/blob/bc65b865898b6145e87031314192c59f9e8b621f/packages/utils/src/replaceBigInts.ts
type _ReplaceBigInts<
  arr extends readonly unknown[],
  type,
  result extends readonly unknown[] = [],
> = arr extends [infer first, ...infer rest] ?
  _ReplaceBigInts<rest, type, readonly [...result, first extends bigint ? type : first]>
: result;

type ReplaceBigInts<obj, type> =
  obj extends bigint ? type
  : obj extends unknown[] ? _ReplaceBigInts<Readonly<obj>, type>
  : obj extends readonly [] ? _ReplaceBigInts<obj, type>
  : obj extends object ? { [key in keyof obj]: ReplaceBigInts<obj[key], type> }
  : obj;

const replaceBigInts = <const T, const type>(
  obj: T,
  replacer: (x: bigint) => type,
): ReplaceBigInts<T, type> => {
  if (typeof obj === 'bigint') return replacer(obj) as ReplaceBigInts<T, type>;
  if (Array.isArray(obj)) {
    return obj.map((x) => replaceBigInts(x, replacer)) as ReplaceBigInts<T, type>;
  }
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, replaceBigInts(v, replacer)]),
    ) as ReplaceBigInts<T, type>;
  }
  return obj as ReplaceBigInts<T, type>;
};
