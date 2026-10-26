import { LRUCache } from 'lru-cache';
import { PrivyAPIError } from '../core/error';
import { Wallets } from '../resources';
import { HPKERecipient, setupHPKERecipient } from './cryptography';

export class JwtExchangeService {
  private _hpkeRecipient: HPKERecipient | null = null;
  private walletsService: Wallets;
  private jwtCache: LRUCache<string, string>;

  constructor(walletsService: Wallets, authorizationKeyCacheMaxCapacity: number) {
    this.walletsService = walletsService;
    this.jwtCache = new LRUCache({ max: authorizationKeyCacheMaxCapacity });
  }

  private async getHpkeRecipient(): Promise<HPKERecipient> {
    if (!this._hpkeRecipient) {
      this._hpkeRecipient = await setupHPKERecipient();
    }
    return this._hpkeRecipient;
  }

  /**
   * Exchanges a JWT for an authorization key. Keys are cached per JWT and MFA token.
   * @param jwt - The JWT to exchange for an authorization key.
   * @param mfaToken - An MFA token from the user's completed MFA verification, sent as the
   *   `privy-mfa-token` header.
   * @returns The (base-64 encoded PKCS8-formatted) authorization key.
   * @internal
   */
  async exchangeJwtForAuthorizationKey(jwt: string, mfaToken?: string): Promise<string> {
    const cacheKey = mfaToken ? `${jwt}:${mfaToken}` : jwt;
    const cachedAuthorizationKey = this.jwtCache.get(cacheKey);
    if (cachedAuthorizationKey) {
      return cachedAuthorizationKey;
    }

    const { publicKeySpki, decryptPayload } = await this.getHpkeRecipient();

    const signer = await this.walletsService.authenticateWithJwt(
      {
        user_jwt: jwt,
        encryption_type: 'HPKE',
        // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
        recipient_public_key: Buffer.from(publicKeySpki).toString('base64'),
      },
      mfaToken ? { headers: { 'privy-mfa-token': mfaToken } } : undefined,
    );
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
      const authorizationKey = new TextDecoder().decode(decryptedAuthorizationKey);
      this.jwtCache.set(
        cacheKey,
        authorizationKey,
        // Setting the TTL here makes the LRU cache check and prune on `.get`.
        { ttl: signer.expires_at - Date.now() },
      );
      return authorizationKey;
    } else {
      throw new PrivyAPIError('JWT exchange failed: unsupported encryption type');
    }
  }
}
