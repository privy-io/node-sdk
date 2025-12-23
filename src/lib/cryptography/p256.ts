import { getSubtleCrypto } from './webcrypto';
import { toBase64 } from '../../internal/utils/base64';

export interface P256KeyPair {
  /**
   * The base64-encoded SPKI-formatted public key, with no PEM headers.
   *
   * This is the format accepted by Privy when specifying a P-256 public key owner.
   */
  publicKey: string;
  /**
   * The base64-encoded PKCS8-formatted private key, with no PEM headers.
   *
   * This is the format accepted by {@link AuthorizationContext.authorization_private_keys} and
   * {@link generateAuthorizationSignature}.
   */
  privateKey: string;
}

/**
 * Generates a P-256 key pair suitable for Privy resource ownership and request
 * authorization signing.
 *
 * @returns A P-256 key pair, in base64-encoded DER format.
 *
 * @example
 * const keypair = await generateP256KeyPair();
 * const wallet = await privy.wallets().create({
 *   chain_type: '...',
 *   owner: { public_key: keypair.publicKey },
 * });
 * const response = await privy.wallets().rawSign(wallet.id, {
 *   params: { hash: '...' },
 *   authorization_context: {
 *     authorization_private_keys: [keypair.privateKey]
 *   },
 * });
 */
export async function generateP256KeyPair(): Promise<P256KeyPair> {
  const subtle = getSubtleCrypto();
  const keyPair = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);

  const [publicKeyDer, privateKeyDer] = await Promise.all([
    subtle.exportKey('spki', keyPair.publicKey),
    subtle.exportKey('pkcs8', keyPair.privateKey),
  ]);

  return {
    publicKey: toBase64(new Uint8Array(publicKeyDer)),
    privateKey: toBase64(new Uint8Array(privateKeyDer)),
  };
}
