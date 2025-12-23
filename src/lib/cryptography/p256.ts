import crypto from 'node:crypto';

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
 * const keypair = generateP256KeyPair();
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
export function generateP256KeyPair(): P256KeyPair {
  const keyPair = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256',
    publicKeyEncoding: {
      type: 'spki',
      format: 'der',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der',
    },
  });

  return {
    publicKey: keyPair.publicKey.toString('base64'),
    privateKey: keyPair.privateKey.toString('base64'),
  };
}
