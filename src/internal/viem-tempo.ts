import type { Hex, Signature } from 'viem';
import { Transaction as ViemTempoTransaction } from 'viem/tempo';
import { PrivyAPIError } from '../core/error';
import type { EthereumSignTransactionRpcInputParams } from '../resources';

export type TempoTransactionRequest = ViemTempoTransaction.TransactionRequestTempo;
export type TempoTransactionSerializable = ViemTempoTransaction.TransactionSerializableTempo;
export type TempoTransaction = (TempoTransactionRequest | TempoTransactionSerializable) & {
  chainId?: TempoTransactionSerializable['chainId'];
  feePayerSignature?: TempoTransactionSerializable['feePayerSignature'];
  from?: Hex;
};

type PrivyTempoTransaction = Extract<EthereumSignTransactionRpcInputParams['transaction'], { type: 118 }>;

type TempoAccountFingerprint = { keyType?: string; source?: string };

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

/** Delegates Tempo transaction detection to viem's Tempo transaction helpers. */
export function isTempoTransaction(tx: object, account?: TempoAccountFingerprint): tx is TempoTransaction {
  const embeddedAccount = (tx as { account?: TempoAccountFingerprint }).account;
  const effectiveAccount = account ?? embeddedAccount;

  // viem@2.45 detects non-secp256k1 Tempo accounts via `keyType`, but not access-key
  // accounts via `source`. Keep this narrow SDK-specific extension until viem covers it.
  if (effectiveAccount?.source === 'accessKey') return true;

  return ViemTempoTransaction.isTempo({
    ...(tx as Record<string, unknown>),
    ...(effectiveAccount ? { account: effectiveAccount } : {}),
  });
}

export function formatTempoTransaction(tempoTx: TempoTransaction): PrivyTempoTransaction {
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

  const formattedTransaction: PrivyTempoTransaction = {
    type: 118,
    calls,
  };

  if (isDefined(tempoTx.chainId)) formattedTransaction.chain_id = tempoTx.chainId;
  if (isDefined(tempoTx.nonce)) formattedTransaction.nonce = tempoTx.nonce;
  if (isDefined(tempoTx.nonceKey) && tempoTx.nonceKey !== 'random')
    formattedTransaction.nonce_key = formatViemQuantityLike(tempoTx.nonceKey);
  if (isDefined(tempoTx.validAfter))
    formattedTransaction.valid_after = formatViemQuantityLike(tempoTx.validAfter);
  if (isDefined(tempoTx.validBefore))
    formattedTransaction.valid_before = formatViemQuantityLike(tempoTx.validBefore);
  if (isDefined(tempoTx.feeToken)) formattedTransaction.fee_token = formatTempoFeeToken(tempoTx.feeToken);
  if (isDefined(tempoTx.from)) formattedTransaction.from = tempoTx.from;
  if (isDefined(tempoTx.gas)) formattedTransaction.gas_limit = formatViemQuantityLike(tempoTx.gas);
  if (isDefined(tempoTx.maxFeePerGas))
    formattedTransaction.max_fee_per_gas = formatViemQuantityLike(tempoTx.maxFeePerGas);
  if (isDefined(tempoTx.maxPriorityFeePerGas))
    formattedTransaction.max_priority_fee_per_gas = formatViemQuantityLike(tempoTx.maxPriorityFeePerGas);
  if (tempoTx.accessList)
    formattedTransaction.access_list = tempoTx.accessList.map((entry) => ({
      address: entry.address,
      storage_keys: [...entry.storageKeys],
    }));
  if (tempoTx.feePayerSignature)
    formattedTransaction.fee_payer_signature = formatTempoSignature(tempoTx.feePayerSignature);

  return formattedTransaction;
}

const formatTempoFeeToken = (feeToken: Hex | bigint): Hex => {
  if (typeof feeToken === 'string') return feeToken;

  return `0x20c0${feeToken.toString(16).padStart(36, '0')}` as Hex;
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
