import type { Hex, Signature } from 'viem';
import { Transaction as ViemTempoTransaction } from 'viem/tempo';
import { PrivyAPIError } from '../core/error';
import type { EthereumSignTransactionRpcInputParams } from '../resources';
import { formatViemQuantityLike } from './utils/viem';

export type TempoTransaction = (
  | ViemTempoTransaction.TransactionRequestTempo
  | ViemTempoTransaction.TransactionSerializableTempo
) & {
  chainId?: ViemTempoTransaction.TransactionSerializableTempo['chainId'];
  feePayerSignature?: ViemTempoTransaction.TransactionSerializableTempo['feePayerSignature'];
  from?: Hex;
};

type PrivyTempoTransaction = Extract<EthereumSignTransactionRpcInputParams['transaction'], { type: 118 }>;

type TempoAccountFingerprint = { keyType?: string; source?: string };

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
      ...(typeof call.data !== 'undefined' ? { data: call.data } : {}),
      ...(typeof call.value !== 'undefined' ? { value: formatViemQuantityLike(call.value) } : {}),
    };
  });

  const formattedTransaction: PrivyTempoTransaction = {
    type: 118,
    calls,
  };

  if (typeof tempoTx.chainId !== 'undefined') formattedTransaction.chain_id = tempoTx.chainId;
  if (typeof tempoTx.nonce !== 'undefined') formattedTransaction.nonce = tempoTx.nonce;
  if (typeof tempoTx.nonceKey !== 'undefined' && tempoTx.nonceKey !== 'random')
    formattedTransaction.nonce_key = formatViemQuantityLike(tempoTx.nonceKey);
  if (typeof tempoTx.validAfter !== 'undefined')
    formattedTransaction.valid_after = formatViemQuantityLike(tempoTx.validAfter);
  if (typeof tempoTx.validBefore !== 'undefined')
    formattedTransaction.valid_before = formatViemQuantityLike(tempoTx.validBefore);
  if (typeof tempoTx.feeToken !== 'undefined')
    formattedTransaction.fee_token = formatTempoFeeToken(tempoTx.feeToken);
  if (typeof tempoTx.from !== 'undefined') formattedTransaction.from = tempoTx.from;
  if (typeof tempoTx.gas !== 'undefined')
    formattedTransaction.gas_limit = formatViemQuantityLike(tempoTx.gas);
  if (typeof tempoTx.maxFeePerGas !== 'undefined')
    formattedTransaction.max_fee_per_gas = formatViemQuantityLike(tempoTx.maxFeePerGas);
  if (typeof tempoTx.maxPriorityFeePerGas !== 'undefined')
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
