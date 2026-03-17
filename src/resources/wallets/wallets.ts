// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WalletsAPI from './wallets';
import * as BalanceAPI from './balance';
import { Balance, BalanceGetParams, BalanceGetResponse } from './balance';
import * as TransactionsAPI from './transactions';
import { TransactionGetParams, TransactionGetResponse, Transactions } from './transactions';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Wallets extends APIResource {
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  balance: BalanceAPI.Balance = new BalanceAPI.Balance(this._client);

  /**
   * Creates a new wallet on the requested chain and for the requested owner.
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
   * Export a wallet's private key
   *
   * @example
   * ```ts
   * const response = await client.wallets._export('wallet_id', {
   *   encryption_type: 'HPKE',
   *   recipient_public_key:
   *     'BDAZLOIdTaPycEYkgG0MvCzbIKJLli/yWkAV5yCa9yOsZ4JsrLweA5MnP8YIiY4k/RRzC+APhhO+P+Hoz/rt7Go=',
   * });
   * ```
   */
  _export(
    walletID: string,
    params: WalletExportParams,
    options?: RequestOptions,
  ): APIPromise<WalletExportResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/export`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Initialize a wallet import. Complete by submitting the import.
   *
   * @example
   * ```ts
   * const response = await client.wallets._initImport({
   *   address: 'address',
   *   chain_type: 'ethereum',
   *   encryption_type: 'HPKE',
   *   entropy_type: 'hd',
   *   index: 0,
   * });
   * ```
   */
  _initImport(body: WalletInitImportParams, options?: RequestOptions): APIPromise<WalletInitImportResponse> {
    return this._client.post('/v1/wallets/import/init', { body, ...options });
  }

  /**
   * Sign a message with a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const response = await client.wallets._rawSign(
   *   'wallet_id',
   *   {
   *     params: {
   *       hash: '0x0775aeed9c9ce6e0fbc4db25c5e4e6368029651c905c286f813126a09025a21e',
   *     },
   *   },
   * );
   * ```
   */
  _rawSign(
    walletID: string,
    params: WalletRawSignParams,
    options?: RequestOptions,
  ): APIPromise<WalletRawSignResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/raw_sign`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Sign a message or transaction with a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const walletRpcResponse = await client.wallets._rpc(
   *   'wallet_id',
   *   {
   *     method: 'eth_sendTransaction',
   *     params: {},
   *     chain_type: 'ethereum',
   *   },
   * );
   * ```
   */
  _rpc(walletID: string, params: WalletRpcParams, options?: RequestOptions): APIPromise<WalletRpcResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
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
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Submit a wallet import request.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets._submitImport({
   *   wallet: {
   *     address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
   *     chain_type: 'ethereum',
   *     ciphertext:
   *       'PRoRXygG+YYSDBXjCopNYZmx8Z6nvdl1D0lpePTYZdZI2VGfK+LkFt+GlEJqdoi9',
   *     encapsulated_key:
   *       'BOhR6xITDt5THJawHHJKrKdI9CBr2M/SDWzZZAaOW4gCMsSpC65U007WyKiwuuOVAo1BNm4YgcBBROuMmyIZXZk=',
   *     encryption_type: 'HPKE',
   *     entropy_type: 'private-key',
   *   },
   * });
   * ```
   */
  _submitImport(body: WalletSubmitImportParams, options?: RequestOptions): APIPromise<Wallet> {
    return this._client.post('/v1/wallets/import/submit', { body, ...options });
  }

  /**
   * Update a wallet's policies or authorization key configuration.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets._update('wallet_id', {
   *   policy_ids: ['tb54eps4z44ed0jepousxi4n'],
   * });
   * ```
   */
  _update(walletID: string, params: WalletUpdateParams, options?: RequestOptions): APIPromise<Wallet> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.patch(path`/v1/wallets/${walletID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Obtain a session key to enable wallet access.
   *
   * @example
   * ```ts
   * const response = await client.wallets.authenticateWithJwt({
   *   user_jwt:
   *     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
   * });
   * ```
   */
  authenticateWithJwt(
    body: WalletAuthenticateWithJwtParams,
    options?: RequestOptions,
  ): APIPromise<WalletAuthenticateWithJwtResponse> {
    return this._client.post('/v1/wallets/authenticate', { body, ...options });
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

/**
 * The wallet chain types that support curve-based signing.
 */
export type CurveSigningChainType =
  | 'cosmos'
  | 'stellar'
  | 'sui'
  | 'aptos'
  | 'movement'
  | 'tron'
  | 'bitcoin-segwit'
  | 'near'
  | 'ton'
  | 'starknet';

/**
 * The wallet chain types that are not first class chains.
 */
export type ExtendedChainType =
  | 'cosmos'
  | 'stellar'
  | 'sui'
  | 'aptos'
  | 'movement'
  | 'tron'
  | 'bitcoin-segwit'
  | 'near'
  | 'ton'
  | 'starknet'
  | 'spark';

/**
 * The wallet chain types that offer first class support.
 */
export type FirstClassChainType = 'ethereum' | 'solana';

/**
 * The wallet chain types.
 */
export type WalletChainType =
  | 'ethereum'
  | 'solana'
  | 'cosmos'
  | 'stellar'
  | 'sui'
  | 'aptos'
  | 'movement'
  | 'tron'
  | 'bitcoin-segwit'
  | 'near'
  | 'ton'
  | 'starknet'
  | 'spark';

/**
 * Information about the custodian managing this wallet.
 */
export interface WalletCustodian {
  /**
   * The custodian responsible for the wallet.
   */
  provider: string;

  /**
   * The resource ID of the beneficiary of the custodial wallet.
   */
  provider_user_id: string;
}

/**
 * The provider of the custodial wallet.
 */
export type CustodialWalletProvider = 'bridge';

/**
 * The chain type of the custodial wallet.
 */
export type CustodialWalletChainType = 'ethereum' | 'solana';

/**
 * The input for creating a custodial wallet.
 */
export interface CustodialWalletCreateInput {
  /**
   * The chain type of the custodial wallet.
   */
  chain_type: CustodialWalletChainType;

  /**
   * The provider of the custodial wallet.
   */
  provider: CustodialWalletProvider;

  /**
   * The resource ID of the beneficiary of the custodial wallet, given by the
   * licensing provider.
   */
  provider_user_id: string;

  additional_signers?: Array<CustodialWalletCreateInput.AdditionalSigner>;

  owner?: CustodialWalletCreateInput.UserID | CustodialWalletCreateInput.PublicKey | null;

  policy_ids?: Array<string>;
}

export namespace CustodialWalletCreateInput {
  export interface AdditionalSigner {
    signer_id: string;

    override_policy_ids?: Array<string>;
  }

  export interface UserID {
    user_id: string;
  }

  export interface PublicKey {
    public_key: string;
  }
}

/**
 * Information about a custodial wallet.
 */
export interface CustodialWallet {
  id: string;

  address: string;

  /**
   * The chain type of the custodial wallet.
   */
  chain_type: CustodialWalletChainType;

  /**
   * Information about the custodian managing this wallet.
   */
  custody: WalletCustodian;

  owner_id: string | null;

  additional_signers?: Array<CustodialWallet.AdditionalSigner>;

  policy_ids?: Array<string>;
}

export namespace CustodialWallet {
  export interface AdditionalSigner {
    signer_id: string;

    override_policy_ids?: Array<string>;
  }
}

/**
 * Optional HPKE configuration for wallet import decryption. These parameters allow
 * importing wallets encrypted by external providers that use different HPKE
 * configurations.
 */
export interface HpkeImportConfig {
  /**
   * Additional Authenticated Data (AAD) used during encryption. Should be
   * base64-encoded bytes.
   */
  aad?: string;

  /**
   * The AEAD algorithm used for encryption. Defaults to CHACHA20_POLY1305 if not
   * specified.
   */
  aead_algorithm?: 'CHACHA20_POLY1305' | 'AES_GCM256';

  /**
   * Application-specific context information (INFO) used during HPKE encryption.
   * Should be base64-encoded bytes.
   */
  info?: string;
}

/**
 * Request body for initiating a sponsored token transfer from an embedded wallet.
 */
export interface CreateTokenTransferRequest {
  destination: CreateTokenTransferRequest.Destination;

  source: CreateTokenTransferRequest.Source;
}

export namespace CreateTokenTransferRequest {
  export interface Destination {
    /**
     * Recipient address (hex for EVM, base58 for Solana)
     */
    address: string;
  }

  export interface Source {
    /**
     * Amount as a decimal string in the token's standard unit (e.g. "1.5" for 1.5
     * USDC, "0.01" for 0.01 ETH). Not in the smallest on-chain unit (wei, lamports,
     * etc.).
     */
    amount: string;

    /**
     * The asset to transfer. Supported: 'usdc', 'usdb', 'usdt' (stablecoins), 'eth'
     * (native Ethereum), 'sol' (native Solana).
     */
    asset: string;

    /**
     * The blockchain network on which to perform the transfer. Supported chains
     * include: 'ethereum', 'base', 'arbitrum', 'polygon', 'solana', and their
     * respective testnets.
     */
    chain: string;
  }
}

/**
 * Response for a created transfer action. The transfer is processed
 * asynchronously; this returns a pending action.
 */
export interface CreateTokenTransferResponse {
  /**
   * Unique identifier for this wallet action.
   */
  id: string;

  /**
   * Balance changes from the transfer. Empty at creation, populated later.
   */
  balance_changes: Array<unknown>;

  destination: CreateTokenTransferResponse.Destination;

  source: CreateTokenTransferResponse.Source;

  /**
   * The status of the wallet action. Always "pending" at creation; updated
   * asynchronously.
   */
  status: 'pending';

  /**
   * The transaction steps for this transfer. Typically contains one step.
   */
  steps: Array<CreateTokenTransferResponse.Step>;

  /**
   * The type of wallet action. Always "transfer" for this endpoint.
   */
  type: 'transfer';

  /**
   * The ID of the wallet initiating the transfer.
   */
  wallet_id: string;
}

export namespace CreateTokenTransferResponse {
  export interface Destination {
    /**
     * The recipient address as provided in the request.
     */
    address: string;
  }

  export interface Source {
    /**
     * The transfer amount as provided in the request.
     */
    amount: string;

    asset: string;

    chain: string;
  }

  export interface Step {
    chain: string;

    /**
     * The status of this step. Always "pending" at creation time.
     */
    status: 'pending';

    /**
     * The on-chain transaction hash. Null until the transaction is broadcast,
     * populated asynchronously.
     */
    transaction_hash: string | null;

    /**
     * The type of blockchain transaction for this step.
     */
    type: 'evm_transaction' | 'svm_transaction';
  }
}

/**
 * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
 */
export type SuiCommandName = 'TransferObjects' | 'SplitCoins' | 'MergeCoins';

/**
 * A wallet managed by Privy's wallet infrastructure.
 */
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
   * The wallet chain types.
   */
  chain_type: WalletChainType;

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
   * The key quorum ID of the owner of the wallet.
   */
  owner_id: string | null;

  /**
   * List of policy IDs for policies that are enforced on the wallet.
   */
  policy_ids: Array<string>;

  /**
   * The compressed, raw public key for the wallet along the chain cryptographic
   * curve.
   */
  public_key?: string;
}

export namespace Wallet {
  export interface AdditionalSigner {
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }
}

/**
 * Request body for updating a wallet.
 */
export interface WalletUpdateRequestBody {
  /**
   * Additional signers for the wallet.
   */
  additional_signers?: Array<WalletUpdateRequestBody.AdditionalSigner>;

  /**
   * The owner of the resource. If you provide this, do not specify an owner_id as it
   * will be generated automatically. When updating a wallet, you can set the owner
   * to null to remove the owner.
   */
  owner?: WalletUpdateRequestBody.PublicKeyOwner | WalletUpdateRequestBody.UserOwner | null;

  owner_id?: string | null;

  /**
   * New policy IDs to enforce on the wallet. Currently, only one policy is supported
   * per wallet.
   */
  policy_ids?: Array<string>;
}

export namespace WalletUpdateRequestBody {
  export interface AdditionalSigner {
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }

  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
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

/**
 * Input for a single wallet in a batch creation request.
 */
export interface WalletBatchItemInput {
  /**
   * The wallet chain types.
   */
  chain_type: WalletChainType;

  /**
   * Additional signers for the wallet.
   */
  additional_signers?: Array<WalletBatchItemInput.AdditionalSigner>;

  /**
   * The owner of the resource. If you provide this, do not specify an owner_id as it
   * will be generated automatically. When updating a wallet, you can set the owner
   * to null to remove the owner.
   */
  owner?: WalletBatchItemInput.PublicKeyOwner | WalletBatchItemInput.UserOwner | null;

  /**
   * The key quorum ID to set as the owner of the resource. If you provide this, do
   * not specify an owner.
   */
  owner_id?: string;

  /**
   * List of policy IDs for policies that should be enforced on the wallet.
   * Currently, only one policy is supported per wallet.
   */
  policy_ids?: Array<string>;
}

export namespace WalletBatchItemInput {
  export interface AdditionalSigner {
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }

  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
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

/**
 * Request body for batch wallet creation.
 */
export interface WalletBatchCreateInput {
  /**
   * Array of wallet creation requests. Minimum 1, maximum 100.
   */
  wallets: Array<WalletBatchItemInput>;
}

/**
 * A single result from a batch wallet creation operation.
 */
export type WalletBatchCreateResult =
  | WalletBatchCreateResult.WalletBatchCreateSuccess
  | WalletBatchCreateResult.WalletBatchCreateFailure;

export namespace WalletBatchCreateResult {
  /**
   * A successful wallet creation result within a batch operation.
   */
  export interface WalletBatchCreateSuccess {
    /**
     * The index of the wallet in the original request array.
     */
    index: number;

    success: true;

    /**
     * A wallet managed by Privy's wallet infrastructure.
     */
    wallet: WalletsAPI.Wallet;
  }

  /**
   * A failed wallet creation result within a batch operation.
   */
  export interface WalletBatchCreateFailure {
    /**
     * A PrivyErrorCode string identifying the error type (e.g., "invalid_data",
     * "resource_conflict").
     */
    code: string;

    /**
     * A human-readable error message with details about what went wrong.
     */
    error: string;

    /**
     * The index of the wallet in the original request array.
     */
    index: number;

    success: false;
  }
}

/**
 * Response for a batch wallet creation request.
 */
export interface WalletBatchCreateResponse {
  /**
   * Array of results for each wallet creation request, in the same order as input.
   */
  results: Array<WalletBatchCreateResult>;
}

/**
 * Executes the EVM `personal_sign` RPC (EIP-191) to sign a message.
 */
export interface EthereumPersonalSignRpcInput {
  method: 'personal_sign';

  params: EthereumPersonalSignRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
}

export namespace EthereumPersonalSignRpcInput {
  export interface Params {
    encoding: 'utf-8' | 'hex';

    message: string;
  }
}

/**
 * Executes the EVM `eth_signTransaction` RPC to sign a transaction.
 */
export interface EthereumSignTransactionRpcInput {
  method: 'eth_signTransaction';

  params: EthereumSignTransactionRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
}

export namespace EthereumSignTransactionRpcInput {
  export interface Params {
    transaction: Params.Transaction;
  }

  export namespace Params {
    export interface Transaction {
      authorization_list?: Array<Transaction.AuthorizationList>;

      chain_id?: string | number;

      data?: string;

      from?: string;

      gas_limit?: string | number;

      gas_price?: string | number;

      max_fee_per_gas?: string | number;

      max_priority_fee_per_gas?: string | number;

      nonce?: string | number;

      to?: string;

      type?: 0 | 1 | 2 | 4;

      value?: string | number;
    }

    export namespace Transaction {
      export interface AuthorizationList {
        chain_id: string | number;

        contract: string;

        nonce: string | number;

        r: string;

        s: string;

        y_parity: number;
      }
    }
  }
}

/**
 * Executes the EVM `eth_sendTransaction` RPC to sign and broadcast a transaction.
 */
export interface EthereumSendTransactionRpcInput {
  caip2: string;

  method: 'eth_sendTransaction';

  params: EthereumSendTransactionRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';

  sponsor?: boolean;
}

export namespace EthereumSendTransactionRpcInput {
  export interface Params {
    transaction: Params.Transaction;
  }

  export namespace Params {
    export interface Transaction {
      authorization_list?: Array<Transaction.AuthorizationList>;

      chain_id?: string | number;

      data?: string;

      from?: string;

      gas_limit?: string | number;

      gas_price?: string | number;

      max_fee_per_gas?: string | number;

      max_priority_fee_per_gas?: string | number;

      nonce?: string | number;

      to?: string;

      type?: 0 | 1 | 2 | 4;

      value?: string | number;
    }

    export namespace Transaction {
      export interface AuthorizationList {
        chain_id: string | number;

        contract: string;

        nonce: string | number;

        r: string;

        s: string;

        y_parity: number;
      }
    }
  }
}

/**
 * Executes the EVM `eth_signTypedData_v4` RPC (EIP-712) to sign a typed data
 * object.
 */
export interface EthereumSignTypedDataRpcInput {
  method: 'eth_signTypedData_v4';

  params: EthereumSignTypedDataRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
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

/**
 * Executes an RPC method to hash and sign a UserOperation.
 */
export interface EthereumSignUserOperationRpcInput {
  method: 'eth_signUserOperation';

  params: EthereumSignUserOperationRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
}

export namespace EthereumSignUserOperationRpcInput {
  export interface Params {
    chain_id: string | number;

    contract: string;

    user_operation: Params.UserOperation;
  }

  export namespace Params {
    export interface UserOperation {
      call_data: string;

      call_gas_limit: string;

      max_fee_per_gas: string;

      max_priority_fee_per_gas: string;

      nonce: string;

      paymaster: string;

      paymaster_data: string;

      paymaster_post_op_gas_limit: string;

      paymaster_verification_gas_limit: string;

      pre_verification_gas: string;

      sender: string;

      verification_gas_limit: string;
    }
  }
}

/**
 * Signs an EIP-7702 authorization.
 */
export interface EthereumSign7702AuthorizationRpcInput {
  method: 'eth_sign7702Authorization';

  params: EthereumSign7702AuthorizationRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
}

export namespace EthereumSign7702AuthorizationRpcInput {
  export interface Params {
    chain_id: string | number;

    contract: string;

    nonce?: string | number;
  }
}

/**
 * Signs a raw hash on the secp256k1 curve.
 */
export interface EthereumSecp256k1SignRpcInput {
  method: 'secp256k1_sign';

  params: EthereumSecp256k1SignRpcInput.Params;

  address?: string;

  chain_type?: 'ethereum';
}

export namespace EthereumSecp256k1SignRpcInput {
  export interface Params {
    hash: string;
  }
}

/**
 * Executes the SVM `signTransaction` RPC to sign a transaction.
 */
export interface SolanaSignTransactionRpcInput {
  method: 'signTransaction';

  params: SolanaSignTransactionRpcInput.Params;

  address?: string;

  chain_type?: 'solana';
}

export namespace SolanaSignTransactionRpcInput {
  export interface Params {
    encoding: 'base64';

    transaction: string;
  }
}

/**
 * Executes the SVM `signAndSendTransaction` RPC to sign and broadcast a
 * transaction.
 */
export interface SolanaSignAndSendTransactionRpcInput {
  caip2: string;

  method: 'signAndSendTransaction';

  params: SolanaSignAndSendTransactionRpcInput.Params;

  address?: string;

  chain_type?: 'solana';

  sponsor?: boolean;
}

export namespace SolanaSignAndSendTransactionRpcInput {
  export interface Params {
    encoding: 'base64';

    transaction: string;
  }
}

/**
 * Executes the SVM `signMessage` RPC to sign a message.
 */
export interface SolanaSignMessageRpcInput {
  method: 'signMessage';

  params: SolanaSignMessageRpcInput.Params;

  address?: string;

  chain_type?: 'solana';
}

export namespace SolanaSignMessageRpcInput {
  export interface Params {
    encoding: 'base64';

    message: string;
  }
}

/**
 * Response to the EVM `eth_signTransaction` RPC.
 */
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

/**
 * Response to the EVM `eth_sendTransaction` RPC.
 */
export interface EthereumSendTransactionRpcResponse {
  data: EthereumSendTransactionRpcResponse.Data;

  method: 'eth_sendTransaction';
}

export namespace EthereumSendTransactionRpcResponse {
  export interface Data {
    caip2: string;

    hash: string;

    transaction_id?: string;

    transaction_request?: Data.TransactionRequest;

    user_operation_hash?: string;
  }

  export namespace Data {
    export interface TransactionRequest {
      authorization_list?: Array<TransactionRequest.AuthorizationList>;

      chain_id?: string | number;

      data?: string;

      from?: string;

      gas_limit?: string | number;

      gas_price?: string | number;

      max_fee_per_gas?: string | number;

      max_priority_fee_per_gas?: string | number;

      nonce?: string | number;

      to?: string;

      type?: 0 | 1 | 2 | 4;

      value?: string | number;
    }

    export namespace TransactionRequest {
      export interface AuthorizationList {
        chain_id: string | number;

        contract: string;

        nonce: string | number;

        r: string;

        s: string;

        y_parity: number;
      }
    }
  }
}

/**
 * Response to the EVM `personal_sign` RPC.
 */
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

/**
 * Response to the EVM `eth_signTypedData_v4` RPC.
 */
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

/**
 * Response to the EVM `eth_signUserOperation` RPC.
 */
export interface EthereumSignUserOperationRpcResponse {
  data: EthereumSignUserOperationRpcResponse.Data;

  method: 'eth_signUserOperation';
}

export namespace EthereumSignUserOperationRpcResponse {
  export interface Data {
    encoding: 'hex';

    signature: string;
  }
}

/**
 * Response to the EVM `eth_sign7702Authorization` RPC.
 */
export interface EthereumSign7702AuthorizationRpcResponse {
  data: EthereumSign7702AuthorizationRpcResponse.Data;

  method: 'eth_sign7702Authorization';
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
}

/**
 * Response to the EVM `secp256k1_sign` RPC.
 */
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

/**
 * Response to the SVM `signTransaction` RPC.
 */
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

/**
 * Response to the SVM `signAndSendTransaction` RPC.
 */
export interface SolanaSignAndSendTransactionRpcResponse {
  data: SolanaSignAndSendTransactionRpcResponse.Data;

  method: 'signAndSendTransaction';
}

export namespace SolanaSignAndSendTransactionRpcResponse {
  export interface Data {
    caip2: string;

    hash: string;

    transaction_id?: string;
  }
}

/**
 * Response to the SVM `signMessage` RPC.
 */
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

/**
 * Request body for wallet RPC operations, discriminated by method.
 */
export type WalletRpcRequestBody =
  | EthereumPersonalSignRpcInput
  | EthereumSignTypedDataRpcInput
  | EthereumSignTransactionRpcInput
  | EthereumSignUserOperationRpcInput
  | EthereumSendTransactionRpcInput
  | EthereumSign7702AuthorizationRpcInput
  | EthereumSecp256k1SignRpcInput
  | SolanaSignMessageRpcInput
  | SolanaSignTransactionRpcInput
  | SolanaSignAndSendTransactionRpcInput;

/**
 * Response body for wallet RPC operations, discriminated by method.
 */
export type WalletRpcResponse =
  | EthereumPersonalSignRpcResponse
  | EthereumSignTypedDataRpcResponse
  | EthereumSignTransactionRpcResponse
  | EthereumSendTransactionRpcResponse
  | EthereumSignUserOperationRpcResponse
  | EthereumSign7702AuthorizationRpcResponse
  | EthereumSecp256k1SignRpcResponse
  | SolanaSignMessageRpcResponse
  | SolanaSignTransactionRpcResponse
  | SolanaSignAndSendTransactionRpcResponse;

/**
 * Headers required to authorize wallet operations.
 */
export interface WalletAuthorizationHeaders {
  /**
   * ID of your Privy app.
   */
  'privy-app-id': string;

  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Request expiry. Value is a Unix timestamp in milliseconds representing the
   * deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export interface WalletExportResponse {
  /**
   * The encrypted private key.
   */
  ciphertext: string;

  /**
   * The base64-encoded encapsulated key that was generated during encryption, for
   * use during decryption.
   */
  encapsulated_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: 'HPKE';
}

export interface WalletInitImportResponse {
  /**
   * The base64-encoded encryption public key to encrypt the wallet entropy with.
   */
  encryption_public_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: 'HPKE';
}

export interface WalletRawSignResponse {
  data: WalletRawSignResponse.Data;

  method: 'raw_sign';
}

export namespace WalletRawSignResponse {
  export interface Data {
    encoding: 'hex';

    signature: string;
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
   * Body param: The wallet chain types.
   */
  chain_type: WalletChainType;

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
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }

  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
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
  /**
   * Filter wallets by authorization public key. Returns wallets owned by key quorums
   * that include the specified P-256 public key (base64-encoded DER format). Cannot
   * be used together with user_id.
   */
  authorization_key?: string;

  /**
   * The wallet chain types.
   */
  chain_type?: WalletChainType;

  /**
   * Filter wallets by user ID. Cannot be used together with authorization_key.
   */
  user_id?: string;
}

export interface WalletExportParams {
  /**
   * Body param: The encryption type of the wallet to import. Currently only supports
   * `HPKE`.
   */
  encryption_type: 'HPKE';

  /**
   * Body param: The base64-encoded encryption public key to encrypt the wallet
   * private key with.
   */
  recipient_public_key: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export type WalletInitImportParams =
  | WalletInitImportParams.HDInitInput
  | WalletInitImportParams.PrivateKeyInitInput;

export declare namespace WalletInitImportParams {
  export interface HDInitInput {
    /**
     * The address of the wallet to import.
     */
    address: string;

    /**
     * The chain type of the wallet to import. Currently supports `ethereum` and
     * `solana`.
     */
    chain_type: 'ethereum' | 'solana';

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: 'HPKE';

    /**
     * The entropy type of the wallet to import.
     */
    entropy_type: 'hd';

    /**
     * The index of the wallet to import.
     */
    index: number;
  }

  export interface PrivateKeyInitInput {
    /**
     * The address of the wallet to import.
     */
    address: string;

    /**
     * The chain type of the wallet to import. Currently supports `ethereum` and
     * `solana`.
     */
    chain_type: 'ethereum' | 'solana';

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: 'HPKE';

    entropy_type: 'private-key';
  }
}

export interface WalletRawSignParams {
  /**
   * Body param: Sign a pre-computed hash
   */
  params: WalletRawSignParams.Hash | WalletRawSignParams.Bytes;

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

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export namespace WalletRawSignParams {
  /**
   * Sign a pre-computed hash
   */
  export interface Hash {
    /**
     * The hash to sign. Must start with `0x`.
     */
    hash: string;
  }

  /**
   * Hash and sign bytes using the specified encoding and hash function.
   */
  export interface Bytes {
    /**
     * The bytes to hash and sign.
     */
    bytes: string;

    /**
     * The encoding scheme for the bytes.
     */
    encoding: 'utf-8' | 'hex' | 'base64';

    /**
     * The hash function to hash the bytes.
     */
    hash_function: 'keccak256' | 'sha256' | 'blake2b256';
  }
}

export type WalletRpcParams =
  | WalletRpcParams.EthereumPersonalSignRpcInput
  | WalletRpcParams.EthereumSignTypedDataRpcInput
  | WalletRpcParams.EthereumSignTransactionRpcInput
  | WalletRpcParams.EthereumSignUserOperationRpcInput
  | WalletRpcParams.EthereumSendTransactionRpcInput
  | WalletRpcParams.EthereumSign7702AuthorizationRpcInput
  | WalletRpcParams.EthereumSecp256k1SignRpcInput
  | WalletRpcParams.SolanaSignMessageRpcInput
  | WalletRpcParams.SolanaSignTransactionRpcInput
  | WalletRpcParams.SolanaSignAndSendTransactionRpcInput;

export declare namespace WalletRpcParams {
  export interface EthereumPersonalSignRpcInput {
    /**
     * Body param
     */
    method: 'personal_sign';

    /**
     * Body param
     */
    params: EthereumPersonalSignRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace EthereumPersonalSignRpcInput {
    export interface Params {
      encoding: 'utf-8' | 'hex';

      message: string;
    }
  }

  export interface EthereumSignTypedDataRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTypedData_v4';

    /**
     * Body param
     */
    params: EthereumSignTypedDataRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
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

  export interface EthereumSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTransaction';

    /**
     * Body param
     */
    params: EthereumSignTransactionRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace EthereumSignTransactionRpcInput {
    export interface Params {
      transaction: Params.Transaction;
    }

    export namespace Params {
      export interface Transaction {
        authorization_list?: Array<Transaction.AuthorizationList>;

        chain_id?: string | number;

        data?: string;

        from?: string;

        gas_limit?: string | number;

        gas_price?: string | number;

        max_fee_per_gas?: string | number;

        max_priority_fee_per_gas?: string | number;

        nonce?: string | number;

        to?: string;

        type?: 0 | 1 | 2 | 4;

        value?: string | number;
      }

      export namespace Transaction {
        export interface AuthorizationList {
          chain_id: string | number;

          contract: string;

          nonce: string | number;

          r: string;

          s: string;

          y_parity: number;
        }
      }
    }
  }

  export interface EthereumSignUserOperationRpcInput {
    /**
     * Body param
     */
    method: 'eth_signUserOperation';

    /**
     * Body param
     */
    params: EthereumSignUserOperationRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace EthereumSignUserOperationRpcInput {
    export interface Params {
      chain_id: string | number;

      contract: string;

      user_operation: Params.UserOperation;
    }

    export namespace Params {
      export interface UserOperation {
        call_data: string;

        call_gas_limit: string;

        max_fee_per_gas: string;

        max_priority_fee_per_gas: string;

        nonce: string;

        paymaster: string;

        paymaster_data: string;

        paymaster_post_op_gas_limit: string;

        paymaster_verification_gas_limit: string;

        pre_verification_gas: string;

        sender: string;

        verification_gas_limit: string;
      }
    }
  }

  export interface EthereumSendTransactionRpcInput {
    /**
     * Body param
     */
    caip2: string;

    /**
     * Body param
     */
    method: 'eth_sendTransaction';

    /**
     * Body param
     */
    params: EthereumSendTransactionRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param
     */
    sponsor?: boolean;

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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace EthereumSendTransactionRpcInput {
    export interface Params {
      transaction: Params.Transaction;
    }

    export namespace Params {
      export interface Transaction {
        authorization_list?: Array<Transaction.AuthorizationList>;

        chain_id?: string | number;

        data?: string;

        from?: string;

        gas_limit?: string | number;

        gas_price?: string | number;

        max_fee_per_gas?: string | number;

        max_priority_fee_per_gas?: string | number;

        nonce?: string | number;

        to?: string;

        type?: 0 | 1 | 2 | 4;

        value?: string | number;
      }

      export namespace Transaction {
        export interface AuthorizationList {
          chain_id: string | number;

          contract: string;

          nonce: string | number;

          r: string;

          s: string;

          y_parity: number;
        }
      }
    }
  }

  export interface EthereumSign7702AuthorizationRpcInput {
    /**
     * Body param
     */
    method: 'eth_sign7702Authorization';

    /**
     * Body param
     */
    params: EthereumSign7702AuthorizationRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
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
     * Body param
     */
    method: 'secp256k1_sign';

    /**
     * Body param
     */
    params: EthereumSecp256k1SignRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace EthereumSecp256k1SignRpcInput {
    export interface Params {
      hash: string;
    }
  }

  export interface SolanaSignMessageRpcInput {
    /**
     * Body param
     */
    method: 'signMessage';

    /**
     * Body param
     */
    params: SolanaSignMessageRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace SolanaSignMessageRpcInput {
    export interface Params {
      encoding: 'base64';

      message: string;
    }
  }

  export interface SolanaSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'signTransaction';

    /**
     * Body param
     */
    params: SolanaSignTransactionRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace SolanaSignTransactionRpcInput {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }

  export interface SolanaSignAndSendTransactionRpcInput {
    /**
     * Body param
     */
    caip2: string;

    /**
     * Body param
     */
    method: 'signAndSendTransaction';

    /**
     * Body param
     */
    params: SolanaSignAndSendTransactionRpcInput.Params;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'solana';

    /**
     * Body param
     */
    sponsor?: boolean;

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

    /**
     * Header param: Request expiry. Value is a Unix timestamp in milliseconds
     * representing the deadline by which the request must be processed.
     */
    'privy-request-expiry'?: string;
  }

  export namespace SolanaSignAndSendTransactionRpcInput {
    export interface Params {
      encoding: 'base64';

      transaction: string;
    }
  }
}

export interface WalletSubmitImportParams {
  wallet: WalletSubmitImportParams.HDSubmitInput | WalletSubmitImportParams.PrivateKeySubmitInput;

  additional_signers?: Array<WalletSubmitImportParams.AdditionalSigner>;

  owner?: WalletSubmitImportParams.UserID | WalletSubmitImportParams.PublicKey | null;

  owner_id?: string | null;

  policy_ids?: Array<string>;
}

export namespace WalletSubmitImportParams {
  export interface HDSubmitInput {
    /**
     * The address of the wallet to import.
     */
    address: string;

    /**
     * The chain type of the wallet to import. Currently supports `ethereum` and
     * `solana`.
     */
    chain_type: 'ethereum' | 'solana';

    /**
     * The encrypted entropy of the wallet to import.
     */
    ciphertext: string;

    /**
     * The base64-encoded encapsulated key that was generated during encryption, for
     * use during decryption inside the TEE.
     */
    encapsulated_key: string;

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: 'HPKE';

    /**
     * The entropy type of the wallet to import.
     */
    entropy_type: 'hd';

    /**
     * The index of the wallet to import.
     */
    index: number;

    /**
     * Optional HPKE configuration for wallet import decryption. These parameters allow
     * importing wallets encrypted by external providers that use different HPKE
     * configurations.
     */
    hpke_config?: WalletsAPI.HpkeImportConfig;
  }

  export interface PrivateKeySubmitInput {
    /**
     * The address of the wallet to import.
     */
    address: string;

    /**
     * The chain type of the wallet to import. Currently supports `ethereum` and
     * `solana`.
     */
    chain_type: 'ethereum' | 'solana';

    /**
     * The encrypted entropy of the wallet to import.
     */
    ciphertext: string;

    /**
     * The base64-encoded encapsulated key that was generated during encryption, for
     * use during decryption inside the TEE.
     */
    encapsulated_key: string;

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: 'HPKE';

    entropy_type: 'private-key';

    /**
     * Optional HPKE configuration for wallet import decryption. These parameters allow
     * importing wallets encrypted by external providers that use different HPKE
     * configurations.
     */
    hpke_config?: WalletsAPI.HpkeImportConfig;
  }

  export interface AdditionalSigner {
    signer_id: string;

    override_policy_ids?: Array<string>;
  }

  export interface UserID {
    user_id: string;
  }

  export interface PublicKey {
    public_key: string;
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
   * Body param
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

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export namespace WalletUpdateParams {
  export interface AdditionalSigner {
    signer_id: string;

    /**
     * The array of policy IDs that will be applied to wallet requests. If specified,
     * this will override the base policy IDs set on the wallet.
     */
    override_policy_ids?: Array<string>;
  }

  /**
   * The P-256 public key of the owner of the resource, in base64-encoded DER format.
   * If you provide this, do not specify an owner_id as it will be generated
   * automatically.
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
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    /**
     * List of policy IDs for policies that should be enforced on the wallet.
     * Currently, only one policy is supported per wallet.
     */
    policy_ids?: Array<string>;
  }
}

Wallets.Transactions = Transactions;
Wallets.Balance = Balance;

export declare namespace Wallets {
  export {
    type CurveSigningChainType as CurveSigningChainType,
    type ExtendedChainType as ExtendedChainType,
    type FirstClassChainType as FirstClassChainType,
    type WalletChainType as WalletChainType,
    type WalletCustodian as WalletCustodian,
    type CustodialWalletProvider as CustodialWalletProvider,
    type CustodialWalletChainType as CustodialWalletChainType,
    type CustodialWalletCreateInput as CustodialWalletCreateInput,
    type CustodialWallet as CustodialWallet,
    type HpkeImportConfig as HpkeImportConfig,
    type CreateTokenTransferRequest as CreateTokenTransferRequest,
    type CreateTokenTransferResponse as CreateTokenTransferResponse,
    type SuiCommandName as SuiCommandName,
    type Wallet as Wallet,
    type WalletUpdateRequestBody as WalletUpdateRequestBody,
    type WalletBatchItemInput as WalletBatchItemInput,
    type WalletBatchCreateInput as WalletBatchCreateInput,
    type WalletBatchCreateResult as WalletBatchCreateResult,
    type WalletBatchCreateResponse as WalletBatchCreateResponse,
    type EthereumPersonalSignRpcInput as EthereumPersonalSignRpcInput,
    type EthereumSignTransactionRpcInput as EthereumSignTransactionRpcInput,
    type EthereumSendTransactionRpcInput as EthereumSendTransactionRpcInput,
    type EthereumSignTypedDataRpcInput as EthereumSignTypedDataRpcInput,
    type EthereumSignUserOperationRpcInput as EthereumSignUserOperationRpcInput,
    type EthereumSign7702AuthorizationRpcInput as EthereumSign7702AuthorizationRpcInput,
    type EthereumSecp256k1SignRpcInput as EthereumSecp256k1SignRpcInput,
    type SolanaSignTransactionRpcInput as SolanaSignTransactionRpcInput,
    type SolanaSignAndSendTransactionRpcInput as SolanaSignAndSendTransactionRpcInput,
    type SolanaSignMessageRpcInput as SolanaSignMessageRpcInput,
    type EthereumSignTransactionRpcResponse as EthereumSignTransactionRpcResponse,
    type EthereumSendTransactionRpcResponse as EthereumSendTransactionRpcResponse,
    type EthereumPersonalSignRpcResponse as EthereumPersonalSignRpcResponse,
    type EthereumSignTypedDataRpcResponse as EthereumSignTypedDataRpcResponse,
    type EthereumSignUserOperationRpcResponse as EthereumSignUserOperationRpcResponse,
    type EthereumSign7702AuthorizationRpcResponse as EthereumSign7702AuthorizationRpcResponse,
    type EthereumSecp256k1SignRpcResponse as EthereumSecp256k1SignRpcResponse,
    type SolanaSignTransactionRpcResponse as SolanaSignTransactionRpcResponse,
    type SolanaSignAndSendTransactionRpcResponse as SolanaSignAndSendTransactionRpcResponse,
    type SolanaSignMessageRpcResponse as SolanaSignMessageRpcResponse,
    type WalletRpcRequestBody as WalletRpcRequestBody,
    type WalletRpcResponse as WalletRpcResponse,
    type WalletAuthorizationHeaders as WalletAuthorizationHeaders,
    type WalletExportResponse as WalletExportResponse,
    type WalletInitImportResponse as WalletInitImportResponse,
    type WalletRawSignResponse as WalletRawSignResponse,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletListParams as WalletListParams,
    type WalletExportParams as WalletExportParams,
    type WalletInitImportParams as WalletInitImportParams,
    type WalletRawSignParams as WalletRawSignParams,
    type WalletRpcParams as WalletRpcParams,
    type WalletSubmitImportParams as WalletSubmitImportParams,
    type WalletUpdateParams as WalletUpdateParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
  };

  export {
    Transactions as Transactions,
    type TransactionGetResponse as TransactionGetResponse,
    type TransactionGetParams as TransactionGetParams,
  };

  export {
    Balance as Balance,
    type BalanceGetResponse as BalanceGetResponse,
    type BalanceGetParams as BalanceGetParams,
  };
}
