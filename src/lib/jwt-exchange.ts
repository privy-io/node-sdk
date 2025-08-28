import { PrivyAPIError } from '../core/error';
import { Wallets } from '../resources';
import { HPKERecipient, setupHPKE } from './cryptography';

export class JwtExchangeService {
  private _hpkeRecipient: HPKERecipient | null = null;
  private walletsService: Wallets;

  constructor(walletsService: Wallets) {
    this.walletsService = walletsService;
  }

  private async getHpkeRecipient(): Promise<HPKERecipient> {
    if (!this._hpkeRecipient) {
      this._hpkeRecipient = await setupHPKE();
    }
    return this._hpkeRecipient;
  }

  /**
   * Exchanges a JWT for an authorization key.
   * @param jwt - The JWT to exchange for an authorization key.
   * @returns The (base-64 encoded PKCS8-formatted) authorization key.
   * @internal
   */
  async exchangeJwtForAuthorizationKey(jwt: string): Promise<string> {
    // FIXME: add key cache

    const { publicKeySpki, decryptPayload } = await this.getHpkeRecipient();

    // FIXME: replace with the /wallets/authenticate endpoint instead in Stainless
    const signer = await this.walletsService.authenticateWithJwt({
      user_jwt: jwt,
      encryption_type: 'HPKE',
      recipient_public_key: Buffer.from(publicKeySpki).toString('base64'),
    });
    if (
      'encrypted_authorization_key' in signer &&
      signer.encrypted_authorization_key.encryption_type === 'HPKE'
    ) {
      const encryptedAuthorizationKey = signer.encrypted_authorization_key;
      const decryptedAuthorizationKey = await decryptPayload(
        // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
        Buffer.from(encryptedAuthorizationKey.encapsulated_key, 'base64'),
        Buffer.from(encryptedAuthorizationKey.ciphertext, 'base64'),
      );
      return new TextDecoder().decode(decryptedAuthorizationKey);
    } else {
      throw new PrivyAPIError('JWT exchange failed: unsupported encryption type');
    }
  }
}
