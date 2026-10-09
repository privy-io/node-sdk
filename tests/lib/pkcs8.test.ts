import { PrivyAPIError } from '@privy-io/node';
import { parseP256PKCS8PrivateKey } from '@privy-io/node/lib/pkcs8';
import { concatBytes, hexToBytes } from '@noble/curves/utils';
import { base64, base64urlnopad } from '@scure/base';
import crypto from 'node:crypto';

/** Order of the P-256 group. */
const P256_ORDER = hexToBytes('ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551');
/** DER `AlgorithmIdentifier` for id-ecPublicKey on prime256v1. */
const P256_ALGORITHM = hexToBytes('301306072a8648ce3d020106082a8648ce3d030107');
/** DER `AlgorithmIdentifier` for id-ecPublicKey on secp256k1. */
const SECP256K1_ALGORITHM = hexToBytes('301006072a8648ce3d020106052b8104000a');
/** DER `[0]` wrapping the secp256k1 OID. */
const SECP256K1_PARAMETERS = hexToBytes('a00706052b8104000a');

const ecKey = (namedCurve: string) => crypto.generateKeyPairSync('ec', { namedCurve }).privateKey;
const pkcs8 = (key: crypto.KeyObject) => key.export({ format: 'der', type: 'pkcs8' });
const scalarOf = (key: crypto.KeyObject) => base64urlnopad.decode(key.export({ format: 'jwk' }).d!);

/** Encodes a DER TLV whose contents are under 256 bytes. */
function tlv(tag: number, ...contents: Uint8Array[]): Uint8Array {
  const body = concatBytes(...contents);
  const header = body.length < 0x80 ? [tag, body.length] : [tag, 0x81, body.length];
  return concatBytes(Uint8Array.from(header), body);
}

/** Builds a PKCS#8 `PrivateKeyInfo` around an `ECPrivateKey` with the given pieces. */
function buildPKCS8({
  scalar = new Uint8Array(32).fill(0x11),
  pkcs8Version = 0x00,
  ecVersion = 0x01,
  algorithm = P256_ALGORITHM,
  ecExtras = [],
}: {
  scalar?: Uint8Array;
  pkcs8Version?: number;
  ecVersion?: number;
  algorithm?: Uint8Array;
  ecExtras?: Uint8Array[];
} = {}) {
  const ecPrivateKey = tlv(0x30, tlv(0x02, Uint8Array.of(ecVersion)), tlv(0x04, scalar), ...ecExtras);
  return tlv(0x30, tlv(0x02, Uint8Array.of(pkcs8Version)), algorithm, tlv(0x04, ecPrivateKey));
}

describe('parseP256PKCS8PrivateKey', () => {
  const key = ecKey('prime256v1');
  const der = pkcs8(key);
  const encoded = base64.encode(der);
  // A 67-byte PKCS#8 encoding, whose base64 ends in `==`.
  const padded = base64.encode(buildPKCS8());

  describe('valid P-256 keys', () => {
    it('returns the 32-byte scalar of a node:crypto P-256 key', () => {
      expect(parseP256PKCS8PrivateKey(encoded)).toEqual(scalarOf(key));
    });

    it('accepts an ECPrivateKey carrying matching parameters and a public key', () => {
      // The SEC1 `ECPrivateKey` includes `parameters [0]` and `publicKey [1]`.
      const sec1 = key.export({ format: 'der', type: 'sec1' });
      const wrapped = tlv(0x30, tlv(0x02, Uint8Array.of(0x00)), P256_ALGORITHM, tlv(0x04, sec1));
      expect(parseP256PKCS8PrivateKey(base64.encode(wrapped))).toEqual(scalarOf(key));
    });

    const one = new Uint8Array(32);
    one[31] = 1;
    const nMinusOne = P256_ORDER.slice();
    nMinusOne[31]! -= 1;
    it.each([
      ['1', one],
      ['n-1', nMinusOne],
    ])('accepts the scalar %s', (_, scalar) => {
      expect(parseP256PKCS8PrivateKey(base64.encode(buildPKCS8({ scalar })))).toEqual(scalar);
    });
  });

  const outerBody = buildPKCS8().subarray(2);
  it.each([
    // Callers strip whitespace and the legacy prefixes before parsing.
    ['the legacy wallet-auth: prefix', `wallet-auth:${encoded}`, 'not valid base64'],
    ['the legacy wallet-api: prefix', `wallet-api:${encoded}`, 'not valid base64'],
    // Wrong algorithm or curve.
    ['a secp256k1 key', pkcs8(ecKey('secp256k1')), 'key curve must be P-256'],
    ['a P-384 key', pkcs8(ecKey('secp384r1')), 'key curve must be P-256'],
    ['an Ed25519 key', pkcs8(crypto.generateKeyPairSync('ed25519').privateKey), 'key algorithm must be EC'],
    [
      'a P-256 scalar labelled as secp256k1',
      buildPKCS8({ algorithm: SECP256K1_ALGORITHM }),
      'key curve must be P-256',
    ],
    [
      'ECPrivateKey parameters that disagree with the algorithm',
      buildPKCS8({ ecExtras: [SECP256K1_PARAMETERS] }),
      'key curve must be P-256',
    ],
    // Malformed DER.
    ['truncated DER', der.subarray(0, der.length - 10), 'malformed PKCS#8 structure'],
    [
      'trailing bytes after the DER structure',
      concatBytes(der, Uint8Array.of(0x00)),
      'malformed PKCS#8 structure',
    ],
    [
      'arbitrary bytes that merely contain an 04 20 sequence',
      concatBytes(Uint8Array.of(0x04, 0x20), crypto.getRandomValues(new Uint8Array(32))),
      'malformed PKCS#8 structure',
    ],
    [
      'a non-minimal long-form length',
      concatBytes(Uint8Array.of(0x30, 0x81, outerBody.length), outerBody),
      'malformed PKCS#8 structure',
    ],
    ['an unsupported PKCS#8 version', buildPKCS8({ pkcs8Version: 0x01 }), 'unsupported PKCS#8 version'],
    [
      'an unsupported ECPrivateKey version',
      buildPKCS8({ ecVersion: 0x00 }),
      'unsupported ECPrivateKey version',
    ],
    [
      'a 31-byte scalar',
      buildPKCS8({ scalar: new Uint8Array(31).fill(0x11) }),
      'private key must be 32 bytes',
    ],
    [
      'a 33-byte scalar',
      buildPKCS8({ scalar: new Uint8Array(33).fill(0x11) }),
      'private key must be 32 bytes',
    ],
    // Scalar range.
    ['an all-zero scalar', buildPKCS8({ scalar: new Uint8Array(32) }), 'private key scalar is out of range'],
    ['a scalar equal to n', buildPKCS8({ scalar: P256_ORDER }), 'private key scalar is out of range'],
    [
      'a scalar greater than n',
      buildPKCS8({ scalar: new Uint8Array(32).fill(0xff) }),
      'private key scalar is out of range',
    ],
    // Invalid base64. The empty string is valid base64, but decodes to zero bytes.
    ['an empty string', '', 'malformed PKCS#8 structure'],
    ['a character outside the alphabet', `${encoded.slice(0, 10)}!${encoded.slice(11)}`, 'not valid base64'],
    ['the URL-safe alphabet', encoded.replace(/\+/g, '-').replace(/\//g, '_') + '-_', 'not valid base64'],
    ['missing padding', padded.replace(/=+$/, ''), 'not valid base64'],
    ['non-zero padding bits', 'AB==', 'not valid base64'],
    ['a truncated final quantum', `${encoded}A`, 'not valid base64'],
    ['padding in the middle', `AA==${encoded}`, 'not valid base64'],
    ['embedded whitespace', `${encoded.slice(0, 20)}\n${encoded.slice(20)}`, 'not valid base64'],
    ['leading or trailing whitespace', ` ${encoded} `, 'not valid base64'],
    ['PEM framing', `-----BEGIN PRIVATE KEY-----\n${encoded}\n-----END PRIVATE KEY-----`, 'not valid base64'],
  ])('rejects %s', (_, input, reason) => {
    const privateKey = typeof input === 'string' ? input : base64.encode(input);
    expect(() => parseP256PKCS8PrivateKey(privateKey)).toThrow(PrivyAPIError);
    expect(() => parseP256PKCS8PrivateKey(privateKey)).toThrow(
      `Invalid wallet authorization private key: ${reason}`,
    );
  });
});
