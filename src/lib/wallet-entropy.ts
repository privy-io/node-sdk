import { base58 } from '@scure/base';
import { PrivyAPIError } from '../error';

export interface EntropyToBytesInput {
  entropy: string | Uint8Array;
  entropyType: 'hd' | 'private-key';
  chainType: 'ethereum' | 'solana';
}

export function entropyToBytes(wallet: EntropyToBytesInput): Uint8Array {
  const { entropy, entropyType, chainType } = wallet;
  if (typeof entropy !== 'string') {
    // If a straight entropy byte array is provided, return it
    return entropy;
  }

  switch (entropyType) {
    case 'hd':
      // HD entropy is a BIP39 mnemonic that can be encoded as utf-8
      return new TextEncoder().encode(entropy);
    case 'private-key':
      if (chainType === 'ethereum') {
        try {
          // Private key strings are hex encoded for Ethereum
          const entropyWithout0x = entropy.startsWith('0x') ? entropy.slice(2) : entropy;
          // We fall back to `Buffer` here as Uint8Array.fromHex is not widely supported yet
          return new Uint8Array(Buffer.from(entropyWithout0x, 'hex'));
        } catch (error) {
          throw new PrivyAPIError(`Invalid private key: Ethereum entropy must be hex encoded`);
        }
      }

      if (chainType === 'solana') {
        try {
          // Private key strings are base58 encoded for Solana
          return base58.decode(entropy);
        } catch (error) {
          throw new PrivyAPIError(`Invalid private key: Solana entropy must be base58 encoded`);
        }
      }

      // This should be unreachable, so we check with `satisfies never`
      throw new PrivyAPIError(`Invalid chain type for imports: ${chainType satisfies never}`);
    default:
      // This should be unreachable, so we check with `satisfies never`
      throw new PrivyAPIError(`Invalid entropy type: ${entropyType satisfies never}`);
  }
}
