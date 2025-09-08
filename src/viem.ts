import type { Hex } from 'viem';
import {
  type LocalAccount,
  type SignMessageParameters,
  type SignTransactionParameters,
  toAccount,
} from 'viem/accounts';
import { toHex } from 'viem/utils';
import { PrivyAPIError } from './core/error';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';
import type { WalletRpcParams } from './resources';

export interface CreateViemAccountInput {
  /** ID for the wallet. */
  walletId: string;
  /** Ethereum address for the wallet. */
  address: Hex;
  /** Authorization context for the wallet. */
  authorizationContext?: AuthorizationContext;
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
  { walletId, address, authorizationContext }: CreateViemAccountInput,
): LocalAccount {
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
      const { signature } = await client
        .wallets()
        .ethereum()
        .signTypedData(walletId, {
          params: {
            typed_data: { domain, message, primary_type: primaryType as string, types: types as any },
          },
          ...(authorizationContext ? { authorization_context: authorizationContext } : {}),
        });
      return signature as Hex;
    },
    signTransaction: async (transaction) => {
      const { signed_transaction: signedTransaction } = await client
        .wallets()
        .ethereum()
        .signTransaction(walletId, {
          params: { transaction: formatViemTransaction(transaction) },
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
  });
}

/**
 * Formats a viem transaction type to the JSON-RPC transaction type:
 * - 'legacy' -> 0
 * - 'eip2930' -> 1
 * - 'eip1559' or undefined -> 2. This is the default EVM transaction type.
 * - 'eip4844' -> 3 in theory, but will throw an error as we do not support this yet.
 * - 'eip7702' -> 4 in theory, but will throw an error as we do not support this yet
 * @param type viem transaction type
 * @returns 0 | 1 | 2
 */
const formatViemTransactionType = (type: SignTransactionParameters['transaction']['type']) => {
  if (type === 'legacy') {
    return 0 as const;
  } else if (type === 'eip2930') {
    return 1 as const;
  } else if (type == 'eip1559' || typeof type === 'undefined') {
    // Type 2 (EIP-1559) is the default transaction type
    return 2 as const;
  } else {
    // We do not yet support EIP4844 (type 3) and EIP7702 (type 4) transaction types
    throw new PrivyAPIError('EIP4844 and EIP7702 transaction types are not yet supported.');
  }
};

/**
 * Formats viem quantities, which are represented as `bigint | undefined` to our internal
 * `Quantity` type. This is done by converting bigints into a hexstring.
 *
 * @param input {bigint | undefined} bigint quantity to format
 * @returns input as hex string
 */
const formatViemQuantity = (input: bigint): Hex => {
  return `0x${input.toString(16)}` as Hex;
};

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
const formatViemTransaction = (
  tx: SignTransactionParameters['transaction'],
): WalletRpcParams.EthereumSignTransactionRpcInput.Params.Transaction => {
  return {
    type: formatViemTransactionType(tx.type),
    ...(tx.to ? { to: tx.to } : {}),
    ...(tx.nonce ? { nonce: tx.nonce } : {}),
    ...(tx.chainId ? { chain_id: tx.chainId } : {}),
    ...(tx.data ? { data: tx.data } : {}),
    ...(tx.value ? { value: formatViemQuantity(tx.value) } : {}),
    ...(tx.gas ? { gas_limit: formatViemQuantity(tx.gas) } : {}),
    ...(tx.gasPrice ? { gas_price: formatViemQuantity(tx.gasPrice) } : {}),
    ...(tx.maxFeePerGas ? { max_fee_per_gas: formatViemQuantity(tx.maxFeePerGas) } : {}),
    ...(tx.maxPriorityFeePerGas ?
      { max_priority_fee_per_gas: formatViemQuantity(tx.maxPriorityFeePerGas) }
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
