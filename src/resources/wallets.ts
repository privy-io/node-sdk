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
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      ...body
    } = params;
    return this._client.post('/v1/wallets', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a wallet's policies or authorization key configuration.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets.update('wallet_id');
   * ```
   */
  update(walletID: string, params: WalletUpdateParams, options?: RequestOptions): APIPromise<Wallet> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/wallets/${walletID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
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
   * Sign a message or transaction with a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const response = await client.wallets.rpc('wallet_id', {
   *   method: 'eth_signTransaction',
   *   params: { transaction: {} },
   * });
   * ```
   */
  rpc(walletID: string, params: WalletRpcParams, options?: RequestOptions): APIPromise<WalletRpcResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/rpc`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
        },
        options?.headers,
      ]),
    });
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
    | 'ton';

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

export type WalletRpcResponse =
  | WalletRpcResponse.SolanaSignTransactionRpcResponse
  | WalletRpcResponse.SolanaSignAndSendTransactionRpcResponse
  | WalletRpcResponse.SolanaSignMessageRpcResponse
  | WalletRpcResponse.EthereumSignTransactionRpcResponse
  | WalletRpcResponse.EthereumSendTransactionRpcResponse
  | WalletRpcResponse.EthereumPersonalSignRpcResponse
  | WalletRpcResponse.EthereumSignTypedDataRpcResponse
  | WalletRpcResponse.EthereumSign7702AuthorizationRpcResponse
  | WalletRpcResponse.EthereumSecp256k1SignRpcResponse;

export namespace WalletRpcResponse {
  export interface SolanaSignTransactionRpcResponse {
    data: SolanaSignTransactionRpcResponse.Data;

    method: 'signTransaction';
  }

  export namespace SolanaSignTransactionRpcResponse {
    export interface Data {
      encoding: 'base64';

      signed_transaction: string;
    }
  }

  export interface SolanaSignAndSendTransactionRpcResponse {
    method: 'signAndSendTransaction';

    data?: SolanaSignAndSendTransactionRpcResponse.Data;

    error?: SolanaSignAndSendTransactionRpcResponse.Error;
  }

  export namespace SolanaSignAndSendTransactionRpcResponse {
    export interface Data {
      caip2: string;

      hash: string;

      transaction_id?: string;
    }

    export interface Error {
      code: string;

      message: string;
    }
  }

  export interface SolanaSignMessageRpcResponse {
    data: SolanaSignMessageRpcResponse.Data;

    method: 'signMessage';
  }

  export namespace SolanaSignMessageRpcResponse {
    export interface Data {
      encoding: 'base64';

      signature: string;
    }
  }

  export interface EthereumSignTransactionRpcResponse {
    data: EthereumSignTransactionRpcResponse.Data;

    method: 'eth_signTransaction';
  }

  export namespace EthereumSignTransactionRpcResponse {
    export interface Data {
      encoding: 'rlp';

      signed_transaction: string;
    }
  }

  export interface EthereumSendTransactionRpcResponse {
    method: 'eth_sendTransaction';

    data?: EthereumSendTransactionRpcResponse.Data;

    error?: EthereumSendTransactionRpcResponse.Error;
  }

  export namespace EthereumSendTransactionRpcResponse {
    export interface Data {
      caip2: string;

      hash: string;

      transaction_id?: string;

      transaction_request?: Data.TransactionRequest;
    }

    export namespace Data {
      export interface TransactionRequest {
        chain_id?: string | number;

        data?: string;

        from?: string;

        gas_limit?: string | number;

        gas_price?: string | number;

        max_fee_per_gas?: string | number;

        max_priority_fee_per_gas?: string | number;

        nonce?: string | number;

        to?: string;

        type?: 0 | 1 | 2;

        value?: string | number;
      }
    }

    export interface Error {
      code: string;

      message: string;
    }
  }

  export interface EthereumPersonalSignRpcResponse {
    data: EthereumPersonalSignRpcResponse.Data;

    method: 'personal_sign';
  }

  export namespace EthereumPersonalSignRpcResponse {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }

  export interface EthereumSignTypedDataRpcResponse {
    data: EthereumSignTypedDataRpcResponse.Data;

    method: 'eth_signTypedData_v4';
  }

  export namespace EthereumSignTypedDataRpcResponse {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }

  export interface EthereumSign7702AuthorizationRpcResponse {
    method: 'eth_sign7702Authorization';

    data?: EthereumSign7702AuthorizationRpcResponse.Data;

    error?: EthereumSign7702AuthorizationRpcResponse.Error;
  }

  export namespace EthereumSign7702AuthorizationRpcResponse {
    export interface Data {
      authorization: Data.Authorization;
    }

    export namespace Data {
      export interface Authorization {
        chain_id: string | number;

        contract: string;

        nonce: string | number;

        r: string;

        s: string;

        y_parity: number;
      }
    }

    export interface Error {
      code: string;

      message: string;
    }
  }

  export interface EthereumSecp256k1SignRpcResponse {
    data: EthereumSecp256k1SignRpcResponse.Data;

    method: 'secp256k1_sign';
  }

  export namespace EthereumSecp256k1SignRpcResponse {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }
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
    | 'ton';

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
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

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

export interface WalletUpdateParams {
  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: Array<WalletUpdateParams.AdditionalSigner>;

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: WalletUpdateParams.PublicKeyOwner | WalletUpdateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string | null;

  /**
   * Body param: New policy IDs to enforce on the wallet. Currently, only one policy
   * is supported per wallet.
   */
  policy_ids?: Array<string>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace WalletUpdateParams {
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
      | 'ton';

    /**
     * List of policy IDs for policies that should be enforced on the wallet.
     * Currently, only one policy is supported per wallet.
     */
    policy_ids?: Array<string>;
  }
}

export type WalletRpcParams =
  | WalletRpcParams.EthereumSignTransactionRpcInput
  | WalletRpcParams.EthereumSendTransactionRpcInput
  | WalletRpcParams.EthereumPersonalSignRpcInput
  | WalletRpcParams.EthereumSignTypedDataRpcInput
  | WalletRpcParams.EthereumSign7702AuthorizationRpcInput
  | WalletRpcParams.EthereumSecp256k1SignRpcInput
  | WalletRpcParams.SolanaSignTransactionRpcInput
  | WalletRpcParams.SolanaSignAndSendTransactionRpcInput
  | WalletRpcParams.SolanaSignMessageRpcInput;

export declare namespace WalletRpcParams {
  export interface EthereumSignTransactionRpcInput {
    /**
     * Body param:
     */
    method: 'eth_signTransaction';

    /**
     * Body param:
     */
    params: EthereumSignTransactionRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumSignTransactionRpcInput {
    export interface Params {
      transaction: Params.Transaction;
    }

    export namespace Params {
      export interface Transaction {
        chain_id?: string | number;

        data?: string;

        from?: string;

        gas_limit?: string | number;

        gas_price?: string | number;

        max_fee_per_gas?: string | number;

        max_priority_fee_per_gas?: string | number;

        nonce?: string | number;

        to?: string;

        type?: 0 | 1 | 2;

        value?: string | number;
      }
    }
  }

  export interface EthereumSendTransactionRpcInput {
    /**
     * Body param:
     */
    caip2: string;

    /**
     * Body param:
     */
    method: 'eth_sendTransaction';

    /**
     * Body param:
     */
    params: EthereumSendTransactionRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumSendTransactionRpcInput {
    export interface Params {
      transaction: Params.Transaction;
    }

    export namespace Params {
      export interface Transaction {
        chain_id?: string | number;

        data?: string;

        from?: string;

        gas_limit?: string | number;

        gas_price?: string | number;

        max_fee_per_gas?: string | number;

        max_priority_fee_per_gas?: string | number;

        nonce?: string | number;

        to?: string;

        type?: 0 | 1 | 2;

        value?: string | number;
      }
    }
  }

  export interface EthereumPersonalSignRpcInput {
    /**
     * Body param:
     */
    method: 'personal_sign';

    /**
     * Body param:
     */
    params: EthereumPersonalSignRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumPersonalSignRpcInput {
    export interface Params {
      encoding: 'utf-8' | 'hex';

      message: string;
    }
  }

  export interface EthereumSignTypedDataRpcInput {
    /**
     * Body param:
     */
    method: 'eth_signTypedData_v4';

    /**
     * Body param:
     */
    params: EthereumSignTypedDataRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumSignTypedDataRpcInput {
    export interface Params {
      typed_data: Params.TypedData;
    }

    export namespace Params {
      export interface TypedData {
        domain: { [key: string]: unknown };

        message: { [key: string]: unknown };

        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }
  }

  export interface EthereumSign7702AuthorizationRpcInput {
    /**
     * Body param:
     */
    method: 'eth_sign7702Authorization';

    /**
     * Body param:
     */
    params: EthereumSign7702AuthorizationRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumSign7702AuthorizationRpcInput {
    export interface Params {
      chain_id: string | number;

      contract: string;

      nonce?: string | number;
    }
  }

  export interface EthereumSecp256k1SignRpcInput {
    /**
     * Body param:
     */
    method: 'secp256k1_sign';

    /**
     * Body param:
     */
    params: EthereumSecp256k1SignRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace EthereumSecp256k1SignRpcInput {
    export interface Params {
      hash: string;
    }
  }

  export interface SolanaSignTransactionRpcInput {
    /**
     * Body param:
     */
    method: 'signTransaction';

    /**
     * Body param:
     */
    params: SolanaSignTransactionRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace SolanaSignTransactionRpcInput {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }

  export interface SolanaSignAndSendTransactionRpcInput {
    /**
     * Body param:
     */
    caip2: string;

    /**
     * Body param:
     */
    method: 'signAndSendTransaction';

    /**
     * Body param:
     */
    params: SolanaSignAndSendTransactionRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace SolanaSignAndSendTransactionRpcInput {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }

  export interface SolanaSignMessageRpcInput {
    /**
     * Body param:
     */
    method: 'signMessage';

    /**
     * Body param:
     */
    params: SolanaSignMessageRpcInput.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

    /**
     * Body param:
     */
    body_wallet_id?: string;

    /**
     * Header param: Request authorization signature. If multiple signatures are
     * required, they should be comma separated.
     */
    'privy-authorization-signature'?: string;

    /**
     * Header param: Idempotency keys ensure API requests are executed only once within
     * a 24-hour window.
     */
    'privy-idempotency-key'?: string;
  }

  export namespace SolanaSignMessageRpcInput {
    export interface Params {
      encoding: 'base64';

      message: string;
    }
  }
}

export declare namespace Wallets {
  export {
    type Wallet as Wallet,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletRpcResponse as WalletRpcResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletUpdateParams as WalletUpdateParams,
    type WalletListParams as WalletListParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
    type WalletRpcParams as WalletRpcParams,
  };
}
