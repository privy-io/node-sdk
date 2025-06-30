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
   * Chain type of the wallet. 'Ethereum' supports any EVM-compatible network.
   */
  chain_type: 'solana' | 'ethereum' | 'cosmos' | 'stellar' | 'sui' | 'tron';

  /**
   * Unix timestamp of when the wallet was created in milliseconds.
   */
  created_at: number;

  /**
   * List of policy IDs for policies that are enforced on the wallet.
   */
  policy_ids: Array<string>;

  /**
   * Unix timestamp of when the wallet was exported in milliseconds, if the wallet
   * was exported.
   */
  exported_at?: number;

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

    /**
     * The wallets that the signer has access to.
     */
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

    /**
     * The wallets that the signer has access to.
     */
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
  | WalletRpcResponse.SignTransaction
  | WalletRpcResponse.SignAndSendTransaction
  | WalletRpcResponse.SignMessage
  | WalletRpcResponse.EthSignTransaction
  | WalletRpcResponse.EthSendTransaction
  | WalletRpcResponse.PersonalSign
  | WalletRpcResponse.EthSignTypedDataV4
  | WalletRpcResponse.EthSign7702Authorization
  | WalletRpcResponse.Secp256k1Sign;

export namespace WalletRpcResponse {
  export interface SignTransaction {
    data: SignTransaction.Data;

    method: 'signTransaction';
  }

  export namespace SignTransaction {
    export interface Data {
      encoding: 'base64';

      signed_transaction: string;
    }
  }

  export interface SignAndSendTransaction {
    method: 'signAndSendTransaction';

    data?: SignAndSendTransaction.Data;

    error?: SignAndSendTransaction.Error;
  }

  export namespace SignAndSendTransaction {
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

  export interface SignMessage {
    data: SignMessage.Data;

    method: 'signMessage';
  }

  export namespace SignMessage {
    export interface Data {
      encoding: 'base64';

      signature: string;
    }
  }

  export interface EthSignTransaction {
    data: EthSignTransaction.Data;

    method: 'eth_signTransaction';
  }

  export namespace EthSignTransaction {
    export interface Data {
      encoding: 'rlp';

      signed_transaction: string;
    }
  }

  export interface EthSendTransaction {
    method: 'eth_sendTransaction';

    data?: EthSendTransaction.Data;

    error?: EthSendTransaction.Error;
  }

  export namespace EthSendTransaction {
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

  export interface PersonalSign {
    data: PersonalSign.Data;

    method: 'personal_sign';
  }

  export namespace PersonalSign {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }

  export interface EthSignTypedDataV4 {
    data: EthSignTypedDataV4.Data;

    method: 'eth_signTypedData_v4';
  }

  export namespace EthSignTypedDataV4 {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }

  export interface EthSign7702Authorization {
    method: 'eth_sign7702Authorization';

    data?: EthSign7702Authorization.Data;

    error?: EthSign7702Authorization.Error;
  }

  export namespace EthSign7702Authorization {
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

  export interface Secp256k1Sign {
    data: Secp256k1Sign.Data;

    method: 'secp256k1_sign';
  }

  export namespace Secp256k1Sign {
    export interface Data {
      encoding: 'hex';

      signature: string;
    }
  }
}

export interface WalletCreateParams {
  /**
   * Body param: Chain type of the wallet. "ethereum" supports any EVM-compatible
   * network.
   */
  chain_type: 'solana' | 'ethereum' | 'cosmos' | 'stellar' | 'sui' | 'tron';

  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: Array<WalletCreateParams.AdditionalSigner>;

  /**
   * Body param: The P-256 public key of the owner of the wallet. If you provide
   * this, do not specify an owner_id as it will be generated automatically.
   */
  owner?: WalletCreateParams.PublicKey | WalletCreateParams.UserID | null;

  /**
   * Body param: The key quorum ID to set as the owner of the wallet. If you provide
   * this, do not specify an owner.
   */
  owner_id?: string | null;

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
   * The P-256 public key of the owner of the wallet. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
   */
  export interface PublicKey {
    public_key: string;
  }

  /**
   * The user ID of the owner of the wallet. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserID {
    user_id: string;
  }
}

export interface WalletUpdateParams {
  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: Array<WalletUpdateParams.AdditionalSigner>;

  /**
   * Body param: The P-256 public key of the owner of the wallet. If you provide
   * this, do not specify an owner_id as it will be generated automatically.
   */
  owner?: WalletUpdateParams.Owner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the wallet. If you provide
   * this, do not specify an owner.
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
   * The P-256 public key of the owner of the wallet. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
   */
  export interface Owner {
    public_key: string;
  }
}

export interface WalletListParams extends CursorParams {
  /**
   * Chain type of the wallet. 'Ethereum' supports any EVM-compatible network.
   */
  chain_type?: 'solana' | 'ethereum' | 'cosmos' | 'stellar' | 'sui' | 'tron';
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
     * Chain type of the wallet. "ethereum" supports any EVM-compatible network.
     */
    chain_type: 'solana' | 'ethereum' | 'cosmos' | 'stellar' | 'sui' | 'tron';

    /**
     * List of policy IDs for policies that should be enforced on the wallet.
     * Currently, only one policy is supported per wallet.
     */
    policy_ids?: Array<string>;
  }
}

export type WalletRpcParams =
  | WalletRpcParams.EthSignTransaction
  | WalletRpcParams.EthSendTransaction
  | WalletRpcParams.PersonalSign
  | WalletRpcParams.EthSignTypedDataV4
  | WalletRpcParams.EthSign7702Authorization
  | WalletRpcParams.Secp256k1Sign
  | WalletRpcParams.SignTransaction
  | WalletRpcParams.SignAndSendTransaction
  | WalletRpcParams.SignMessage;

export declare namespace WalletRpcParams {
  export interface EthSignTransaction {
    /**
     * Body param:
     */
    method: 'eth_signTransaction';

    /**
     * Body param:
     */
    params: EthSignTransaction.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace EthSignTransaction {
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

  export interface EthSendTransaction {
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
    params: EthSendTransaction.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace EthSendTransaction {
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

  export interface PersonalSign {
    /**
     * Body param:
     */
    method: 'personal_sign';

    /**
     * Body param:
     */
    params: PersonalSign.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace PersonalSign {
    export interface Params {
      encoding: 'utf-8' | 'hex';

      message: string;
    }
  }

  export interface EthSignTypedDataV4 {
    /**
     * Body param:
     */
    method: 'eth_signTypedData_v4';

    /**
     * Body param:
     */
    params: EthSignTypedDataV4.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace EthSignTypedDataV4 {
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

  export interface EthSign7702Authorization {
    /**
     * Body param:
     */
    method: 'eth_sign7702Authorization';

    /**
     * Body param:
     */
    params: EthSign7702Authorization.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace EthSign7702Authorization {
    export interface Params {
      chain_id: string | number;

      contract: string;

      nonce?: string | number;
    }
  }

  export interface Secp256k1Sign {
    /**
     * Body param:
     */
    method: 'secp256k1_sign';

    /**
     * Body param:
     */
    params: Secp256k1Sign.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'ethereum';

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

  export namespace Secp256k1Sign {
    export interface Params {
      hash: string;
    }
  }

  export interface SignTransaction {
    /**
     * Body param:
     */
    method: 'signTransaction';

    /**
     * Body param:
     */
    params: SignTransaction.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

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

  export namespace SignTransaction {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }

  export interface SignAndSendTransaction {
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
    params: SignAndSendTransaction.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

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

  export namespace SignAndSendTransaction {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }

  export interface SignMessage {
    /**
     * Body param:
     */
    method: 'signMessage';

    /**
     * Body param:
     */
    params: SignMessage.Params;

    /**
     * Body param:
     */
    address?: string;

    /**
     * Body param:
     */
    chain_type?: 'solana';

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

  export namespace SignMessage {
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
