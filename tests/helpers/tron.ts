import { sha256 } from '@noble/hashes/sha2';
import { secp256k1 } from '@noble/curves/secp256k1';
import { keccak256, toHex } from 'viem';
import { base58 } from '@scure/base';

/**
 * Tron uses secp256k1 keys. Given a 64-byte uncompressed public key (without 04 prefix),
 * derive the Tron hex address (41-prefixed).
 */
export function publicKeyToTronHexAddress(uncompressedPubKeyBytes: Uint8Array): string {
  // Take keccak256 of the 64 bytes (x + y, without the 04 prefix)
  const hash = keccak256(toHex(uncompressedPubKeyBytes));
  // Take last 20 bytes (40 hex chars) and prefix with 41
  return '41' + hash.slice(-40);
}

/**
 * Verifies a signed Tron transaction against the expected wallet address.
 *
 * The signed_transaction hex format from tron_signTransaction is:
 *   raw_data_hex + signature_hex (last 130 hex chars = 65 bytes)
 *
 * Verification steps:
 * 1. Extract raw_data_hex and signature_hex from the signed transaction
 * 2. Compute txID = SHA256(raw_data_bytes)
 * 3. Recover the public key from the signature using secp256k1
 * 4. Derive the Tron address from the recovered public key
 * 5. Compare against the expected address
 */
export function verifyTronSignature(signedTransactionHex: string, expectedTronHexAddress: string): boolean {
  // The last 130 hex chars (65 bytes) are the signature
  const signatureHex = signedTransactionHex.slice(-130);
  const rawDataHex = signedTransactionHex.slice(0, -130);

  const rawDataBytes = Buffer.from(rawDataHex, 'hex');
  const signatureBytes = Buffer.from(signatureHex, 'hex');

  if (signatureBytes.length !== 65) {
    return false;
  }

  // txID = SHA256(raw_data bytes)
  const txId = sha256(rawDataBytes);

  // Signature is r (32 bytes) + s (32 bytes) + v (1 byte)
  const r = signatureBytes.slice(0, 32);
  const s = signatureBytes.slice(32, 64);
  const v = signatureBytes[64]!;

  // Recovery ID: Tron uses 27/28 convention (subtract 27 to get 0/1)
  const recoveryId = v >= 27 ? v - 27 : v;

  try {
    const sig = new secp256k1.Signature(
      BigInt('0x' + Buffer.from(r).toString('hex')),
      BigInt('0x' + Buffer.from(s).toString('hex')),
    ).addRecoveryBit(recoveryId);

    // Recover the public key
    const recoveredPubKey = sig.recoverPublicKey(txId);

    // Get uncompressed public key bytes (without the 04 prefix)
    const uncompressedBytes = recoveredPubKey.toRawBytes(false).slice(1);

    // Derive Tron hex address from recovered public key
    const recoveredAddress = publicKeyToTronHexAddress(uncompressedBytes);

    return recoveredAddress.toLowerCase() === expectedTronHexAddress.toLowerCase();
  } catch {
    return false;
  }
}

/**
 * Converts a base58check Tron address (e.g. T...) to a hex address (41...).
 * Tron addresses are 25 bytes: 1 byte prefix (0x41) + 20 bytes address + 4 bytes checksum.
 */
export function tronBase58ToHex(base58Address: string): string {
  // Decode the base58 string to get all 25 bytes (prefix + address + checksum)
  const decoded = base58.decode(base58Address);
  // Take the first 21 bytes (prefix + address), discard the 4-byte checksum
  const addressBytes = decoded.slice(0, 21);
  return Buffer.from(addressBytes).toString('hex');
}

/**
 * A sample Tron TRX transfer raw_data for use in signTransaction tests.
 */
export function createTronTransferRawData(ownerAddressHex: string) {
  return {
    contract: [
      {
        type: 'TransferContract' as const,
        owner_address: ownerAddressHex,
        to_address: '410000000000000000000000000000000000000000',
        amount: 1,
      },
    ],
    ref_block_bytes: '1a2b',
    ref_block_hash: 'abc1234567890def',
    expiration: Date.now() + 60000,
    timestamp: Date.now(),
  };
}

export const TRON_NILE_CAIP2 = 'tron:0xcd8690dc';
