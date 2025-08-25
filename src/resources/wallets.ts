// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Wallets extends APIResource {
  /**
   * Create a new wallet.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets.create({
   *   chain_type: 'ethereum',
   * });
   * ```
   */
  create(params: WalletCreateParams, options?: RequestOptions): APIPromise<Wallet> {
    const { 'privy-idempotency-key': privyIdempotencyKey, ...body } = params;
    return this._client.post('/v1/wallets', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get all wallets in your app.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const wallet of client.wallets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: WalletListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WalletsCursor, Wallet> {
    return this._client.getAPIList('/v1/wallets', Cursor<Wallet>, { query, ...options });
  }

  /**
   * Obtain a user session signer to enable wallet access.
   *
   * @deprecated
   */
  authenticateWithJwt(
    body: WalletAuthenticateWithJwtParams,
    options?: RequestOptions,
  ): APIPromise<WalletAuthenticateWithJwtResponse> {
    return this._client.post('/v1/user_signers/authenticate', { body, ...options });
  }

  /**
   * Create wallets with an associated recovery user.
   *
   * @deprecated
   */
  createWalletsWithRecovery(
    body: WalletCreateWalletsWithRecoveryParams,
    options?: RequestOptions,
  ): APIPromise<WalletCreateWalletsWithRecoveryResponse> {
    return this._client.post('/v1/wallets_with_recovery', { body, ...options });
  }

  /**
   * Get a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets.get('wallet_id');
   * ```
   */
  get(walletID: string, options?: RequestOptions): APIPromise<Wallet> {
    return this._client.get(path`/v1/wallets/${walletID}`, options);
  }
}

export type WalletsCursor = Cursor<Wallet>;

export interface Wallet {
  /**
   * Unique ID of the wallet. This will be the primary identifier when using the
   * wallet in the future.
   */
  id: string;

  /**
   * Additional signers for the wallet.
   */
  additional_signers: Array<Wallet.AdditionalSigner>;

  /**
   * Address of the wallet.
   */
  address: string;

  /**
   * Chain type of the wallet
   */
  chain_type:
    | 'solana'
    | 'ethereum'
    | 'cosmos'
    | 'stellar'
    | 'sui'
    | 'tron'
    | 'bitcoin-segwit'
    | 'near'
    | 'spark'
    | 'ton'
    | 'starknet';

  /**
   * Unix timestamp of when the wallet was created in milliseconds.
   */
  created_at: number;

  /**
   * Unix timestamp of when the wallet was exported in milliseconds, if the wallet
   * was exported.
   */
  exported_at: number | null;

  /**
   * Unix timestamp of when the wallet was imported in milliseconds, if the wallet
   * was imported.
   */
  imported_at: number | null;

  /**
   * List of policy IDs for policies that are enforced on the wallet.
   */
  policy_ids: Array<string>;

  /**
   * The key quorum ID of the owner of the wallet.
   */
  owner_id?: string;

  /**
   * The compressed, raw public key for the wallet along the chain cryptographic
   * curve.
   */
  public_key?: string;
}

export namespace Wallet {
  export interface AdditionalSigner {
    override_policy_ids: Array<string>;

    signer_id: string;
  }
}

export type WalletAuthenticateWithJwtResponse =
  | WalletAuthenticateWithJwtResponse.WithEncryption
  | WalletAuthenticateWithJwtResponse.WithoutEncryption;

export namespace WalletAuthenticateWithJwtResponse {
  export interface WithEncryption {
    /**
     * The encrypted authorization key data.
     */
    encrypted_authorization_key: WithEncryption.EncryptedAuthorizationKey;

    /**
     * The expiration time of the authorization key in seconds since the epoch.
     */
    expires_at: number;

    wallets: Array<WalletsAPI.Wallet>;
  }

  export namespace WithEncryption {
    /**
     * The encrypted authorization key data.
     */
    export interface EncryptedAuthorizationKey {
      /**
       * The encrypted authorization key corresponding to the user's current
       * authentication session.
       */
      ciphertext: string;

      /**
       * Base64-encoded ephemeral public key used in the HPKE encryption process.
       * Required for decryption.
       */
      encapsulated_key: string;

      /**
       * The encryption type used. Currently only supports HPKE.
       */
      encryption_type: 'HPKE';
    }
  }

  export interface WithoutEncryption {
    /**
     * The raw authorization key data.
     */
    authorization_key: string;

    /**
     * The expiration time of the authorization key in seconds since the epoch.
     */
    expires_at: number;

    wallets: Array<WalletsAPI.Wallet>;
  }
}

export interface WalletCreateWalletsWithRecoveryResponse {
  /**
   * The ID of the created user.
   */
  recovery_user_id: string;

  /**
   * The wallets that were created.
   */
  wallets: Array<Wallet>;
}

export interface WalletCreateParams {
  /**
   * Body param: Chain type of the wallet
   */
  chain_type:
    | 'solana'
    | 'ethereum'
    | 'cosmos'
    | 'stellar'
    | 'sui'
    | 'tron'
    | 'bitcoin-segwit'
    | 'near'
    | 'spark'
    | 'ton'
    | 'starknet';

  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: Array<WalletCreateParams.AdditionalSigner>;

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: WalletCreateParams.PublicKeyOwner | WalletCreateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string;

  /**
   * Body param: List of policy IDs for policies that should be enforced on the
   * wallet. Currently, only one policy is supported per wallet.
   */
  policy_ids?: Array<string>;

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;
}

export namespace WalletCreateParams {
  export interface AdditionalSigner {
    override_policy_ids: Array<string>;

    signer_id: string;
  }

  /**
   * The P-256 public key of the owner of the resource. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
   */
  export interface PublicKeyOwner {
    public_key: string;
  }

  /**
   * The user ID of the owner of the resource. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserOwner {
    user_id: string;
  }
}

export interface WalletListParams extends CursorParams {
  chain_type?:
    | 'cosmos'
    | 'stellar'
    | 'sui'
    | 'tron'
    | 'bitcoin-segwit'
    | 'near'
    | 'ton'
    | 'starknet'
    | 'spark'
    | 'solana'
    | 'ethereum';

  user_id?: string;
}

export interface WalletAuthenticateWithJwtParams {
  /**
   * The user's JWT, to be used to authenticate the user.
   */
  user_jwt: string;

  /**
   * The encryption type for the authentication response. Currently only supports
   * HPKE.
   */
  encryption_type?: 'HPKE';

  /**
   * The public key of your ECDH keypair, in base64-encoded, SPKI-format, whose
   * private key will be able to decrypt the session key.
   */
  recipient_public_key?: string;
}

export interface WalletCreateWalletsWithRecoveryParams {
  primary_signer: WalletCreateWalletsWithRecoveryParams.PrimarySigner;

  recovery_user: WalletCreateWalletsWithRecoveryParams.RecoveryUser;

  wallets: Array<WalletCreateWalletsWithRecoveryParams.Wallet>;
}

export namespace WalletCreateWalletsWithRecoveryParams {
  export interface PrimarySigner {
    /**
     * The JWT subject ID of the user.
     */
    subject_id: string;
  }

  export interface RecoveryUser {
    linked_accounts: Array<RecoveryUser.UnionMember0 | RecoveryUser.UnionMember1>;
  }

  export namespace RecoveryUser {
    export interface UnionMember0 {
      /**
       * The email address of the user.
       */
      address: string;

      type: 'email';
    }

    export interface UnionMember1 {
      /**
       * The JWT subject ID of the user.
       */
      custom_user_id: string;

      type: 'custom_auth';
    }
  }

  export interface Wallet {
    /**
     * Chain type of the wallet
     */
    chain_type:
      | 'solana'
      | 'ethereum'
      | 'cosmos'
      | 'stellar'
      | 'sui'
      | 'tron'
      | 'bitcoin-segwit'
      | 'near'
      | 'spark'
      | 'ton'
      | 'starknet';

    /**
     * List of policy IDs for policies that should be enforced on the wallet.
     * Currently, only one policy is supported per wallet.
     */
    policy_ids?: Array<string>;
  }
}

export declare namespace Wallets {
  export {
    type Wallet as Wallet,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletListParams as WalletListParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
  };
}
