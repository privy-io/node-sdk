import type {
  Hex,
  SerializeTransactionFn,
  Signature,
  TransactionSerialized,
  TransactionSerializable,
} from 'viem';
import type {
  z_TransactionRequestTempo as TransactionRequestTempo,
  z_TransactionSerializableTempo as TransactionSerializableTempo,
} from 'viem/tempo';
import {
  type LocalAccount,
  type SignMessageParameters,
  type SignTransactionParameters as ViemSignTransactionParameters,
  toAccount,
} from 'viem/accounts';
import { toHex } from 'viem/utils';
import { PrivyAPIError } from './core/error';
import type { AuthorizationContext } from './lib/authorization';
import type { PrivyClient } from './public-api/PrivyClient';
import type { EthereumSignTransactionRpcInputParams } from './resources';

type StandardViemTransaction = ViemSignTransactionParameters['transaction'];
type TempoTransaction = (TransactionRequestTempo | TransactionSerializableTempo) & {
  chainId?: TransactionSerializableTempo['chainId'];
  feePayer?: TransactionRequestTempo['feePayer'];
  feePayerSignature?: TransactionSerializableTempo['feePayerSignature'];
  from?: Hex;
  keyAuthorization?: TransactionRequestTempo['keyAuthorization'];
  signature?: TransactionSerializableTempo['signature'];
};
type SupportedViemTransaction = StandardViemTransaction | TempoTransaction;
type SupportedViemTransactionType = SupportedViemTransaction['type'];
type SupportedSerializeTransactionFn = SerializeTransactionFn<
  TransactionSerializable | TransactionSerializableTempo
>;

export type PrivyViemAccount = Omit<LocalAccount, 'signTransaction'> & {
  signTransaction: LocalAccount['signTransaction'] &
    (<
      serializer extends SupportedSerializeTransactionFn = SupportedSerializeTransactionFn,
      transaction extends SupportedViemTransaction = Parameters<serializer>[0] & SupportedViemTransaction,
    >(
      transaction: transaction,
      options?: { serializer?: serializer | undefined },
    ) => Promise<TransactionSerialized | `0x76${string}`>);
};

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
      const normalizedTransaction = normalizeTempoType(transaction as SupportedViemTransaction);
      const { signed_transaction: signedTransaction } = await client
        .wallets()
        .ethereum()
        .signTransaction(walletId, {
          params: { transaction: formatViemTransaction(normalizedTransaction) },
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
export const formatViemTransactionType = (type: SupportedViemTransactionType) => {
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
    throw new PrivyAPIError(`Transaction type '${String(type)}' is not supported.`);
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

const formatViemQuantityLike = (input: bigint | number): Hex | number => {
  if (typeof input === 'bigint') return formatViemQuantity(input);
  return input;
};

const isDefined = <T>(input: T | undefined | null): input is T => {
  return typeof input !== 'undefined' && input !== null;
};

const TEMPO_FIELDS = [
  'calls',
  'feePayer',
  'feeToken',
  'keyAuthorization',
  'nonceKey',
  'signature',
  'validBefore',
  'validAfter',
] as const;

/** Mirrors viem `src/tempo/Transaction.ts` getType() field fingerprint. */
export function isTempoTransaction(
  tx: SupportedViemTransaction,
  account?: { keyType?: string; source?: string },
): boolean {
  if (account?.keyType && account.keyType !== 'secp256k1') return true;
  if (account?.source === 'accessKey') return true;
  return TEMPO_FIELDS.some((field) => typeof (tx as Record<string, unknown>)[field] !== 'undefined');
}

/** Returns the input with `type` promoted to 'tempo' when its fingerprint matches. */
export function normalizeTempoType<T extends SupportedViemTransaction>(tx: T): T {
  const account = (tx as T & { account?: { keyType?: string; source?: string } }).account;
  if (tx.type !== 'tempo' && isTempoTransaction(tx, account)) {
    return { ...tx, type: 'tempo' as const };
  }

  return tx;
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
  if (tx.type === 'tempo') {
    const tempoTx = tx as TempoTransaction;
    const calls = (
      tempoTx.calls?.length ?
        tempoTx.calls
      : [
          {
            to: tempoTx.to,
            data: tempoTx.data,
            value: tempoTx.value,
          },
        ]).map((call) => {
      if (!call.to) throw new PrivyAPIError('Tempo transaction calls require a `to` address.');

      return {
        to: call.to,
        ...(isDefined(call.data) ? { data: call.data } : {}),
        ...(isDefined(call.value) ? { value: formatViemQuantityLike(call.value) } : {}),
      };
    });

    const formattedTransaction = {
      type: 118,
      calls,
      ...(isDefined(tempoTx.chainId) ? { chain_id: tempoTx.chainId } : {}),
      ...(isDefined(tempoTx.nonce) ? { nonce: tempoTx.nonce } : {}),
      ...(isDefined(tempoTx.nonceKey) && tempoTx.nonceKey !== 'random' ?
        { nonce_key: formatViemQuantityLike(tempoTx.nonceKey) }
      : {}),
      ...(isDefined(tempoTx.validAfter) ? { valid_after: formatViemQuantityLike(tempoTx.validAfter) } : {}),
      ...(isDefined(tempoTx.validBefore) ?
        { valid_before: formatViemQuantityLike(tempoTx.validBefore) }
      : {}),
      ...(isDefined(tempoTx.feeToken) ? { fee_token: formatTempoFeeToken(tempoTx.feeToken) } : {}),
      ...(isDefined(tempoTx.feePayer) ?
        { fee_payer: formatTempoPayloadValue(formatTempoFeePayer(tempoTx.feePayer)) }
      : {}),
      ...(isDefined(tempoTx.from) ? { from: tempoTx.from } : {}),
      ...(isDefined(tempoTx.gas) ? { gas_limit: formatViemQuantityLike(tempoTx.gas) } : {}),
      ...(isDefined(tempoTx.maxFeePerGas) ?
        { max_fee_per_gas: formatViemQuantityLike(tempoTx.maxFeePerGas) }
      : {}),
      ...(isDefined(tempoTx.maxPriorityFeePerGas) ?
        { max_priority_fee_per_gas: formatViemQuantityLike(tempoTx.maxPriorityFeePerGas) }
      : {}),
      ...(tempoTx.accessList ?
        {
          access_list: tempoTx.accessList.map((entry) => ({
            address: entry.address,
            storage_keys: [...entry.storageKeys],
          })),
        }
      : {}),
      ...(tempoTx.feePayerSignature ?
        {
          fee_payer_signature: formatTempoSignature(tempoTx.feePayerSignature),
        }
      : {}),
      ...(isDefined(tempoTx.keyAuthorization) ?
        { key_authorization: formatTempoPayloadValue(tempoTx.keyAuthorization) }
      : {}),
      ...(isDefined(tempoTx.signature) ? { signature: formatTempoPayloadValue(tempoTx.signature) } : {}),
    };

    return formattedTransaction as EthereumSignTransactionRpcInputParams['transaction'];
  }

  const standardTx = tx as StandardViemTransaction;
  const type = formatViemTransactionType(standardTx.type);
  if (type === 118)
    throw new PrivyAPIError('Tempo transactions must be formatted by the Tempo transaction path.');

  return {
    type,
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

const formatTempoFeeToken = (feeToken: Hex | bigint): Hex => {
  if (typeof feeToken === 'string') return feeToken;

  return `0x20c0${feeToken.toString(16).padStart(36, '0')}` as Hex;
};

const formatTempoFeePayer = (feePayer: TempoTransaction['feePayer']): unknown => {
  if (feePayer && typeof feePayer === 'object' && 'address' in feePayer) return feePayer.address;
  return feePayer;
};

const formatTempoPayloadValue = (value: unknown): unknown => {
  return replaceBigInts(value, formatViemQuantity);
};

const formatTempoSignature = (signature: Signature): { r: Hex; s: Hex; y_parity: 0 | 1 } => {
  const yParity =
    typeof signature.yParity !== 'undefined' ? signature.yParity
    : typeof signature.v !== 'undefined' ? Number(signature.v) - 27
    : undefined;

  if (yParity !== 0 && yParity !== 1) {
    throw new PrivyAPIError('Tempo signatures require a valid yParity value.');
  }

  return {
    r: signature.r,
    s: signature.s,
    y_parity: yParity as 0 | 1,
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
