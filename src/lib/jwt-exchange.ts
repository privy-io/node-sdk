import { sha256 } from '@noble/hashes/sha2';
import { utf8ToBytes } from '@noble/hashes/utils';
import { LRUCache } from 'lru-cache';
import { PrivyAPIError } from '../core/error';
import { toBase64 } from '../internal/utils/base64';
import { Wallets } from '../resources';
import { HPKERecipient, setupHPKERecipient } from './cryptography';

interface CachedSigningKey {
  signingKey: string;
  /** SHA-256 hash of the MFA token the key was issued with, or `null` if it was issued without one. */
  mfaTokenHash: string | null;
}

export class JwtExchangeService {
  private _hpkeRecipient: HPKERecipient | null = null;
  private walletsService: Wallets;
  private jwtCache: LRUCache<string, CachedSigningKey>;

  constructor(walletsService: Wallets, authorizationKeyCacheMaxCapacity: number) {
    if (!Number.isInteger(authorizationKeyCacheMaxCapacity) || authorizationKeyCacheMaxCapacity <= 0) {
      throw new PrivyAPIError(
        `authorizationKeyCacheMaxCapacity must be a positive integer, got ${authorizationKeyCacheMaxCapacity}`,
      );
    }
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
   * Exchanges a JWT for a signing key. Each JWT has one cached key, stored under a SHA-256
   * hash of the JWT so the cache holds no raw credentials.
   *
   * A request without an MFA token reuses the JWT's cached key, including one issued with an MFA
   * token. A request with an MFA token reuses the cached key only if it was issued with that same
   * token; otherwise it exchanges with the token and replaces the cached key. A key issued without
   * an MFA token never replaces an unexpired one issued with one.
   * @param jwt - The JWT to exchange for a signing key.
   * @param mfaToken - An MFA token from the user's completed MFA verification, sent as the
   *   `privy-mfa-token` header. `null` is the same as omitting it.
   * @returns The (base-64 encoded PKCS8-formatted) signing key.
   * @internal
   */
  async exchangeJwtForAuthorizationKey(jwt: string, mfaToken?: string | null): Promise<string> {
    const cacheKey = toBase64(sha256(utf8ToBytes(jwt)));
    const mfaTokenHash = mfaToken ? toBase64(sha256(utf8ToBytes(mfaToken))) : null;
    const cached = this.jwtCache.get(cacheKey);
    if (cached && (!mfaTokenHash || cached.mfaTokenHash === mfaTokenHash)) {
      return cached.signingKey;
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
      const encryptedSigningKey = signer.encrypted_authorization_key;
      const decryptedSigningKey = await decryptPayload(
        // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
        Buffer.from(encryptedSigningKey.encapsulated_key, 'base64'),
        Buffer.from(encryptedSigningKey.ciphertext, 'base64'),
      );
      const signingKey = new TextDecoder().decode(decryptedSigningKey);
      // Keep an elevated key over a plain one. A key issued with an MFA token always replaces the
      // cached key. A key issued without one does not replace an unexpired cached key issued with an
      // MFA token, which can only be there if a request with a token for this JWT finished while
      // this exchange was in flight.
      const cachedMfaTokenHash = this.jwtCache.peek(cacheKey)?.mfaTokenHash;
      if (mfaTokenHash || !cachedMfaTokenHash) {
        this.jwtCache.set(
          cacheKey,
          { signingKey, mfaTokenHash },
          // Setting the TTL here makes the LRU cache check and prune on `.get`.
          { ttl: signer.expires_at - Date.now() },
        );
      }
      return signingKey;
    } else {
      throw new PrivyAPIError('JWT exchange failed: unsupported encryption type');
    }
  }
}
