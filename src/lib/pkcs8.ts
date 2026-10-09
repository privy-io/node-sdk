import { DER } from '@noble/curves/abstract/weierstrass';
import { p256 } from '@noble/curves/nist';
import { equalBytes, hexToBytes } from '@noble/curves/utils';
import { base64 } from '@scure/base';
import { PrivyAPIError } from '../core/error';

/** DER contents of OID 1.2.840.10045.2.1 (id-ecPublicKey). */
const OID_EC_PUBLIC_KEY = hexToBytes('2a8648ce3d0201');
/** DER encoding of OID 1.2.840.10045.3.1.7 (prime256v1 / P-256). */
const OID_PRIME256V1 = hexToBytes('06082a8648ce3d030107');

/**
 * Strictly parses a base64-encoded DER PKCS#8 P-256 private key and returns its raw 32-byte scalar.
 *
 * The key must be canonical, padded base64 (standard alphabet, no whitespace or PEM framing) encoding
 * a DER PKCS#8 `PrivateKeyInfo` (RFC 5208) whose algorithm is `id-ecPublicKey` on the P-256
 * (`prime256v1`) curve, wrapping an `ECPrivateKey` (RFC 5915) with a 32-byte scalar in `[1, n-1]`.
 *
 * @param privateKey - A base64-encoded PKCS#8 private key, with no PEM headers or legacy prefixes.
 * @returns The raw 32-byte P-256 private key scalar.
 * @throws {PrivyAPIError} If the key is not a valid P-256 PKCS#8 private key.
 * @internal
 */
export function parseP256PKCS8PrivateKey(privateKey: string): Uint8Array {
  let der: Uint8Array;
  try {
    der = base64.decode(privateKey);
  } catch {
    throw invalidPrivateKeyError('not valid base64');
  }

  const [version, afterVersion] = read(0x02, readLast(0x30, der));
  if (!equalBytes(version, Uint8Array.of(0))) {
    throw invalidPrivateKeyError('unsupported PKCS#8 version');
  }
  const [algorithm, afterAlgorithm] = read(0x30, afterVersion);
  const [algorithmOID, curveOID] = read(0x06, algorithm);
  if (!equalBytes(algorithmOID, OID_EC_PUBLIC_KEY)) {
    throw invalidPrivateKeyError('key algorithm must be EC (id-ecPublicKey)');
  }
  if (!equalBytes(curveOID, OID_PRIME256V1)) {
    throw invalidPrivateKeyError('key curve must be P-256 (prime256v1)');
  }

  const [ecVersion, afterECVersion] = read(0x02, readLast(0x30, readLast(0x04, afterAlgorithm)));
  if (!equalBytes(ecVersion, Uint8Array.of(1))) {
    throw invalidPrivateKeyError('unsupported ECPrivateKey version');
  }
  const [scalar, afterScalar] = read(0x04, afterECVersion);
  if (scalar.length !== 32) {
    throw invalidPrivateKeyError('private key must be 32 bytes');
  }
  // Optional `parameters [0]` must agree with the algorithm's curve; optional `publicKey [1]` is ignored.
  const [parameters, afterParameters] =
    afterScalar[0] === 0xa0 ? read(0xa0, afterScalar) : [OID_PRIME256V1, afterScalar];
  if (!equalBytes(parameters, OID_PRIME256V1)) {
    throw invalidPrivateKeyError('key curve must be P-256 (prime256v1)');
  }
  if (afterParameters.length) {
    readLast(0xa1, afterParameters);
  }

  if (!p256.utils.isValidSecretKey(scalar)) {
    throw invalidPrivateKeyError('private key scalar is out of range');
  }
  return scalar;
}

function invalidPrivateKeyError(reason: string): PrivyAPIError {
  return new PrivyAPIError(`Invalid wallet authorization private key: ${reason}`);
}

/** Reads a DER TLV with the given tag, returning its value and the bytes that follow it. */
function read(tag: number, bytes: Uint8Array): [value: Uint8Array, rest: Uint8Array] {
  try {
    const { v, l } = DER._tlv.decode(tag, bytes);
    return [v, l];
  } catch {
    throw invalidPrivateKeyError('malformed PKCS#8 structure');
  }
}

/** Reads a DER TLV with the given tag that must span the rest of `bytes`. */
function readLast(tag: number, bytes: Uint8Array): Uint8Array {
  const [value, rest] = read(tag, bytes);
  if (rest.length) {
    throw invalidPrivateKeyError('malformed PKCS#8 structure');
  }
  return value;
}
