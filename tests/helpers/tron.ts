import { sha256 } from '@noble/hashes/sha2';
import { secp256k1 } from '@noble/curves/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';

/**
 * Tron uses base58check encoding (with the 0x41 prefix for mainnet addresses).
 * Given a 65-byte uncompressed public key (without 04 prefix), derive the Tron hex address.
 */
export function publicKeyToTronHexAddress(uncompressedPubKeyBytes: Uint8Array): string {
  // Take keccak256 of the 64 bytes (x + y without 04 prefix)
  const hash = keccak_256(uncompressedPubKeyBytes);
  // Take last 20 bytes and prefix with 41
  const addressBytes = hash.slice(-20);
  return '41' + Buffer.from(addressBytes).toString('hex');
}

/**
 * Parses a protobuf-encoded signed Tron transaction to extract
 * the raw_data bytes and signature(s).
 *
 * Tron Transaction protobuf structure:
 *   field 1 (raw_data): length-delimited (wire type 2) - the raw_data message
 *   field 2 (signature): repeated bytes (wire type 2) - 65-byte signatures
 *
 * This is a minimal protobuf parser that handles only this specific structure.
 */
export function parseSignedTronTransaction(hexTransaction: string): {
  rawDataBytes: Uint8Array;
  signatures: Uint8Array[];
} {
  const bytes = Buffer.from(hexTransaction, 'hex');
  let offset = 0;
  let rawDataBytes: Uint8Array | undefined;
  const signatures: Uint8Array[] = [];

  while (offset < bytes.length) {
    // Read tag
    const tag = bytes[offset]!;
    offset++;

    const fieldNumber = tag >> 3;
    const wireType = tag & 0x07;

    if (wireType !== 2) {
      // We only expect length-delimited fields in a Tron Transaction
      throw new Error(`Unexpected wire type ${wireType} at offset ${offset - 1}`);
    }

    // Read varint length
    let length = 0;
    let shift = 0;
    while (true) {
      const b = bytes[offset]!;
      offset++;
      length |= (b & 0x7f) << shift;
      if ((b & 0x80) === 0) break;
      shift += 7;
    }

    const data = bytes.subarray(offset, offset + length);
    offset += length;

    if (fieldNumber === 1) {
      rawDataBytes = new Uint8Array(data);
    } else if (fieldNumber === 2) {
      signatures.push(new Uint8Array(data));
    }
  }

  if (!rawDataBytes) {
    throw new Error('No raw_data found in signed transaction');
  }

  return { rawDataBytes, signatures };
}

/**
 * Verifies a signed Tron transaction against the expected wallet address.
 *
 * 1. Parses the signed transaction protobuf to extract raw_data and signature
 * 2. Computes txID = SHA256(raw_data_bytes)
 * 3. Recovers the public key from the signature using secp256k1
 * 4. Derives the Tron address from the recovered public key
 * 5. Compares against the expected address
 */
export function verifyTronSignature(signedTransactionHex: string, expectedTronHexAddress: string): boolean {
  const { rawDataBytes, signatures } = parseSignedTronTransaction(signedTransactionHex);

  if (signatures.length === 0) {
    return false;
  }

  const signature = signatures[0]!;
  if (signature.length !== 65) {
    return false;
  }

  // txID = SHA256(raw_data protobuf bytes)
  const txId = sha256(rawDataBytes);

  // Signature is r (32 bytes) + s (32 bytes) + v (1 byte)
  const r = signature.slice(0, 32);
  const s = signature.slice(32, 64);
  const v = signature[64]!;

  // Recovery ID: Tron uses 27/28 convention (subtract 27 to get 0/1)
  const recoveryId = v >= 27 ? v - 27 : v;

  try {
    // Create signature object for noble-curves
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
 */
export function tronBase58ToHex(base58Address: string): string {
  // Tron base58check: base58(address_bytes + checksum)
  // address_bytes = 0x41 + 20-byte address
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  let num = BigInt(0);
  for (const char of base58Address) {
    const index = ALPHABET.indexOf(char);
    if (index === -1) throw new Error(`Invalid base58 character: ${char}`);
    num = num * BigInt(58) + BigInt(index);
  }

  // Convert to hex string, pad to 50 hex chars (25 bytes: 1 prefix + 20 address + 4 checksum)
  let hex = num.toString(16);
  // Add leading zeros for any leading '1' characters in base58
  for (const char of base58Address) {
    if (char === '1') {
      hex = '00' + hex;
    } else {
      break;
    }
  }
  // Pad to 50 hex characters (25 bytes)
  while (hex.length < 50) {
    hex = '0' + hex;
  }

  // Return just the 21-byte address part (42 hex chars), stripping the 4-byte checksum
  return hex.slice(0, 42);
}

/**
 * A sample Tron TRX transfer raw_data for use in signTransaction tests.
 * Uses the Nile testnet block reference values.
 */
export function createTronTransferRawData(ownerAddressHex: string) {
  return {
    contract: [
      {
        type: 'TransferContract' as const,
        owner_address: ownerAddressHex,
        // Send to a known test address (Tron burn address in hex)
        to_address: '410000000000000000000000000000000000000000',
        amount: 1, // 1 sun (smallest unit)
      },
    ],
    // Required block reference fields for tron_signTransaction
    ref_block_bytes: '0000',
    ref_block_hash: '0000000000000000',
    expiration: Date.now() + 60000, // 1 minute from now
    timestamp: Date.now(),
  };
}

export const TRON_NILE_CAIP2 = 'tron:0xcd8690dc';
