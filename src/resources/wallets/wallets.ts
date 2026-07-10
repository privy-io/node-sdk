// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WalletsAPI from './wallets';
import * as SharedAPI from '../shared';
import * as UsersAPI from '../users';
import * as AppsAPI from '../apps/apps';
import * as ActionsAPI from './actions';
import {
  AaveVaultDetails,
  ActionGetParams,
  Actions,
  CustodianTransactionWalletActionStep,
  CustodianTransactionWalletActionStepStatus,
  EarnAsset,
  EarnDepositActionResponse,
  EarnDepositRequestBody,
  EarnFeeCollectActionResponse,
  EarnFeeCollectRequestBody,
  EarnIncentiveClaimActionResponse,
  EarnIncentiveClaimRequestBody,
  EarnIncentiveRewardEntry,
  EarnIncentiveRewardsQuery,
  EarnIncentiveRewardsResponse,
  EarnIncetiveClaimRewardEntry,
  EarnWithdrawActionResponse,
  EarnWithdrawRequestBody,
  EthereumEarnPositionQuery,
  EthereumEarnPositionResponse,
  EthereumEarnProvider,
  EthereumEarnVaultDetailsResponse,
  EvmTransactionWalletActionStep,
  EvmUserOperationEntrypointVersion,
  EvmUserOperationWalletActionStep,
  EvmWalletActionStepStatus,
  ExternalTransactionWalletActionStep,
  ExternalTransactionWalletActionStepStatus,
  FailureReason,
  ListWalletActionsQuery,
  ListWalletActionsResponse,
  MorphoVaultDetails,
  SvmTransactionWalletActionStep,
  SvmWalletActionStepStatus,
  SwapActionResponse,
  TransferActionResponse,
  TvmTransactionWalletActionStep,
  TvmWalletActionStepStatus,
  VedaVaultDetails,
  WalletActionInclude,
  WalletActionResponse,
  WalletActionStatus,
  WalletActionStep,
  WalletActionStepType,
  WalletActionType,
} from './actions';
import * as BalanceAPI from './balance';
import { Balance, BalanceGetParams, BalanceGetResponse } from './balance';
import * as SwapAPI from './swap';
import { Swap, SwapExecuteParams, SwapQuoteParams } from './swap';
import * as TransactionsAPI from './transactions';
import { TransactionGetParams, TransactionGetResponse, Transactions } from './transactions';
import * as EarnAPI from './earn/earn';
import { Earn } from './earn/earn';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Wallets extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  _earn: EarnAPI.Earn = new EarnAPI.Earn(this._client);
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  balance: BalanceAPI.Balance = new BalanceAPI.Balance(this._client);
  swap: SwapAPI.Swap = new SwapAPI.Swap(this._client);

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
   * const walletExportResponseBody =
   *   await client.wallets._export('wallet_id', {
   *     encryption_type: 'HPKE',
   *     recipient_public_key:
   *       'BDAZLOIdTaPycEYkgG0MvCzbIKJLli/yWkAV5yCa9yOsZ4JsrLweA5MnP8YIiY4k/RRzC+APhhO+P+Hoz/rt7Go=',
   *   });
   * ```
   */
  _export(
    walletID: string,
    params: WalletExportParams,
    options?: RequestOptions,
  ): APIPromise<WalletExportResponseBody> {
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
   * const rawSignResponse = await client.wallets._rawSign(
   *   'wallet_id',
   *   {
   *     params: {
   *       bytes:
   *         '0a0234ea220809701d7a17a77e04408093e981a6335a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15417009bf59e27d2031a23a61e1590289fc3d21b3cd121541132b98ed6fb80a2d45f177cdef091ae2d9dc115418e80770a0bee581a633',
   *       encoding: 'hex',
   *       hash_function: 'sha256',
   *     },
   *   },
   * );
   * ```
   */
  _rawSign(
    walletID: string,
    params: WalletRawSignParams,
    options?: RequestOptions,
  ): APIPromise<RawSignResponse> {
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
   *     params: {
   *       transaction: {
   *         to: '0x0000000000000000000000000000000000000000',
   *         value: 1,
   *       },
   *     },
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
   * Transfer tokens from a wallet to a destination address.
   *
   * @example
   * ```ts
   * const transferActionResponse =
   *   await client.wallets._transfer('wallet_id', {
   *     destination: {
   *       address: '0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2',
   *       asset: 'usdc',
   *       chain: 'base',
   *     },
   *     source: {
   *       amount: '10.5',
   *       asset: 'usdc',
   *       chain: 'base',
   *     },
   *     amount_type: 'exact_input',
   *     slippage_bps: 100,
   *   });
   * ```
   */
  _transfer(
    walletID: string,
    params: WalletTransferParams,
    options?: RequestOptions,
  ): APIPromise<ActionsAPI.TransferActionResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-idempotency-key': privyIdempotencyKey,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.post(path`/v1/wallets/${walletID}/transfer`, {
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
   * Archives a wallet, preventing it from being used in any write or signing
   * operations. Archived wallets are hidden from list endpoints by default. Returns
   * 404 if the wallet does not exist or is already archived.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets.archive('wallet_id');
   * ```
   */
  archive(walletID: string, options?: RequestOptions): APIPromise<Wallet> {
    return this._client.post(path`/v1/wallets/${walletID}/archive`, options);
  }

  /**
   * Exchange a user JWT for a session key authorized to act on the user's wallets.
   * Returns the encrypted authorization key and the list of wallets it can access.
   *
   * @example
   * ```ts
   * const walletAuthenticateWithJwtResponse =
   *   await client.wallets.authenticateWithJwt({
   *     encryption_type: 'HPKE',
   *     recipient_public_key:
   *       'DAQcDQgAEx4aoeD72yykviK+fckqE2CItVIGn1rCnvCXZ1HgpOcMEMialRmTrqIK4oZlYd1',
   *     user_jwt:
   *       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
   *   });
   * ```
   */
  authenticateWithJwt(
    body: WalletAuthenticateWithJwtParams,
    options?: RequestOptions,
  ): APIPromise<WalletAuthenticateWithJwtResponse> {
    return this._client.post('/v1/wallets/authenticate', { body, ...options });
  }

  /**
   * Creates multiple wallets in a single request. Each wallet creation is
   * independent; failures for one wallet do not affect others. Maximum batch size is
   * 100 wallets.
   *
   * @example
   * ```ts
   * const walletBatchCreateResponse =
   *   await client.wallets.createBatch({
   *     wallets: [
   *       { chain_type: 'ethereum' },
   *       { chain_type: 'solana' },
   *     ],
   *   });
   * ```
   */
  createBatch(
    body: WalletCreateBatchParams,
    options?: RequestOptions,
  ): APIPromise<WalletBatchCreateResponse> {
    return this._client.post('/v1/wallets/batch', { body, ...options });
  }

  /**
   * Create one or more wallets associated with a recovery user, so the user can
   * later regain wallet access via the linked accounts. Deprecated; prefer the
   * standard wallet creation flow combined with a separate recovery setup.
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
  get(
    walletID: string,
    query: WalletGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Wallet> {
    if (walletID === '') {
      throw new Error('walletID must not be an empty string');
    }
    return this._client.get(path`/v1/wallets/${walletID}`, { query, ...options });
  }

  /**
   * Look up a wallet by its blockchain address. Returns the wallet object if found.
   *
   * @example
   * ```ts
   * const wallet = await client.wallets.getWalletByAddress({
   *   address: '0xF1DBff66C993EE895C8cb176c30b07A559d76496',
   * });
   * ```
   */
  getWalletByAddress(body: WalletGetWalletByAddressParams, options?: RequestOptions): APIPromise<Wallet> {
    return this._client.post('/v1/wallets/address', { body, ...options });
  }
}

export type WalletsCursor = Cursor<Wallet>;

/**
 * An entry in an EIP-2930 access list, specifying an address and its storage keys.
 */
export interface AccessListEntry {
  address: string;

  storage_keys: Array<Hex>;
}

/**
 * Additional signers for the wallet.
 */
export type AdditionalSignerInput = Array<AdditionalSignerItemInput>;

/**
 * A single additional signer for a wallet, with an optional policy override.
 */
export interface AdditionalSignerItemInput {
  /**
   * A unique identifier for a key quorum.
   */
  signer_id: SharedAPI.KeyQuorumID;

  /**
   * An optional list of up to one policy ID to enforce on the wallet.
   */
  override_policy_ids?: PolicyInput;
}

/**
 * A blockchain wallet address. Ethereum addresses are normalized to EIP-55
 * checksum format. Solana addresses are validated as base58. All other chain
 * addresses (Stellar, Tron, Sui, Aptos, etc.) are accepted as-is.
 */
export type Address = string;

/**
 * Platform fee collected on a swap.
 */
export interface AdvancedSwapPlatformFee {
  /**
   * Token the fee was taken from (output token in v1).
   */
  token: string;

  /**
   * Fee amount in the smallest unit of the fee token.
   */
  amount: string;

  /**
   * Fee in basis points.
   */
  bps: number;
}

/**
 * Request body for initiating a synchronous Solana token swap through an embedded
 * wallet.
 */
export interface AdvancedSwapRequestBody {
  /**
   * Amount in the smallest unit of the input token (e.g. lamports for SOL).
   */
  amount: string;

  /**
   * Input token address (base58 mint address).
   */
  input_token: string;

  /**
   * Output token address (base58 mint address).
   */
  output_token: string;

  /**
   * CAIP-2 chain identifier. Defaults to Solana mainnet.
   */
  caip2?: string;

  /**
   * When true, skip transaction submission (quote + sign only). The signed
   * transaction is still returned.
   */
  dry_run?: boolean;

  /**
   * Token account (base58) to receive the platform fee. Must exist on-chain for the
   * output token.
   */
  fee_recipient?: string;

  /**
   * Platform fee in basis points, taken from the output token. Requires
   * fee_recipient when > 0.
   */
  platform_fee_bps?: number;

  /**
   * Max slippage tolerance in basis points (0-10000), or "auto" for
   * provider-determined. Defaults to "auto".
   */
  slippage_bps?: number | 'auto';
}

/**
 * Response from the synchronous Solana swap endpoint.
 */
export interface AdvancedSwapResponse {
  /**
   * Input amount consumed (smallest unit).
   */
  in_amount: string;

  /**
   * Input token address (base58).
   */
  input_token: string;

  /**
   * Minimum output amount guaranteed by slippage tolerance (smallest unit).
   */
  min_out_amount: string;

  /**
   * Expected output amount before slippage (smallest unit).
   */
  out_amount: string;

  /**
   * Output token address (base58).
   */
  output_token: string;

  /**
   * Which aggregator fulfilled the swap (e.g. "dflow").
   */
  provider: string;

  /**
   * Fully signed transaction (base64). Callers can re-submit to any Solana RPC for
   * redundancy.
   */
  signed_transaction: string;

  /**
   * Slippage applied in basis points. Reflects the resolved value if "auto" was
   * requested.
   */
  slippage_bps: number;

  /**
   * "accepted" if the network has acknowledged the transaction, "rejected" if the
   * network refused it, "skipped" if dry_run was set. Not an onchain confirmation.
   */
  submission_status: SwapSubmissionStatus;

  /**
   * Solana transaction signature (base58).
   */
  transaction_hash: string;

  /**
   * Platform fee collected on a swap.
   */
  platform_fee?: AdvancedSwapPlatformFee;
}

/**
 * Whether the amount refers to the input token or output token.
 */
export type AmountType = 'exact_input' | 'exact_output';

/**
 * Dashboard response for a wallet authorization key (includes role, which is an
 * internal-only concept).
 */
export interface AuthorizationKeyDashboardResponse {
  id: string;

  created_at: number;

  display_name: string | null;

  public_key: string;

  /**
   * The role of an authorization key, controlling what actions it can authorize on a
   * wallet.
   */
  role: AuthorizationKeyRole | null;
}

/**
 * Public-facing response for a wallet authorization key.
 */
export interface AuthorizationKeyResponse {
  id: string;

  created_at: number;

  display_name: string | null;

  public_key: string;
}

/**
 * The role of an authorization key, controlling what actions it can authorize on a
 * wallet.
 */
export type AuthorizationKeyRole = 'root' | 'manager' | 'delegated-actions' | null;

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
  | 'bitcoin-taproot'
  | 'pearl'
  | 'near'
  | 'ton'
  | 'starknet';

/**
 * The cryptographic curve type used by the wallet.
 */
export type CurveType = 'secp256k1' | 'ed25519' | 'starknet';

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

  /**
   * A unique identifier for a key quorum.
   */
  owner_id: SharedAPI.KeyQuorumID | null;

  /**
   * Additional signers for the wallet.
   */
  additional_signers?: WalletAdditionalSigner;

  policy_ids?: Array<string>;
}

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

  /**
   * Additional signers for the wallet.
   */
  additional_signers?: AdditionalSignerInput;

  /**
   * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
   * null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * An optional list of up to one policy ID to enforce on the wallet.
   */
  policy_ids?: PolicyInput;
}

/**
 * The provider of the custodial wallet.
 */
export type CustodialWalletProvider = 'bridge';

/**
 * Source for a transfer identified by a token contract address (EVM) or mint
 * address (Solana). Use this variant for tokens that are not first-class assets.
 */
export interface CustomTokenTransferSource {
  /**
   * The token contract address (EVM) or mint address (Solana) of the asset to
   * transfer.
   */
  asset_address: string;

  /**
   * The blockchain network on which to perform the transfer. Supported chains
   * include: 'ethereum', 'base', 'arbitrum', 'polygon', 'solana', and their
   * respective testnets.
   */
  chain: string;

  /**
   * @deprecated Amount as a decimal string in the token's standard unit (e.g. "1.5"
   * for 1.5 USDC, "0.01" for 0.01 ETH). For exact_input, specifies the amount to
   * send. Not in the smallest on-chain unit (wei, lamports, etc.). Maximum 100
   * characters. Deprecated: use the top-level `amount` field instead.
   */
  amount?: string;
}

/**
 * Estimated fee paid to the developer.
 */
export interface DeveloperFee {
  /**
   * Amount in USD (in decimals).
   */
  amount: string;

  type: 'developer';

  recipient?: string;
}

/**
 * HPKE-encrypted authorization key with encapsulated key and ciphertext.
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

/**
 * Encrypted response from bound wallet authentication, with bindings.
 */
export interface EncryptedBoundAuthenticateResponse {
  bindings: Array<UserSigningKeyBinding>;

  /**
   * HPKE-encrypted authorization key with encapsulated key and ciphertext.
   */
  encrypted_authorization_key: EncryptedAuthorizationKey;

  expires_at: number;

  wallets: Array<Wallet>;
}

/**
 * The response from authenticating a wallet with HPKE encryption, containing an
 * encrypted authorization key and wallet data.
 */
export interface EncryptedWalletAuthenticateResponse {
  /**
   * HPKE-encrypted authorization key with encapsulated key and ciphertext.
   */
  encrypted_authorization_key: EncryptedAuthorizationKey;

  /**
   * The expiration time of the authorization key in milliseconds since the epoch.
   */
  expires_at: number;

  wallets: Array<Wallet>;
}

/**
 * Executes the EVM `personal_sign` RPC (EIP-191) to sign a message.
 */
export interface EthereumPersonalSignRpcInput {
  method: 'personal_sign';

  /**
   * Parameters for the EVM `personal_sign` RPC.
   */
  params: EthereumPersonalSignRpcInputParams;

  address?: string;

  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2?: AppsAPI.Caip2;

  chain_type?: 'ethereum';

  /**
   * Options controlling signature production for personal_sign and
   * eth_signTypedData_v4.
   */
  signature_options?: SignatureOptions;

  wallet_id?: string;
}

/**
 * Parameters for the EVM `personal_sign` RPC.
 */
export interface EthereumPersonalSignRpcInputParams {
  encoding: 'utf-8' | 'hex';

  message: string;
}

/**
 * Response to the EVM `personal_sign` RPC.
 */
export interface EthereumPersonalSignRpcResponse {
  /**
   * Data returned by the EVM `personal_sign` RPC.
   */
  data: EthereumPersonalSignRpcResponseData;

  method: 'personal_sign';
}

/**
 * Data returned by the EVM `personal_sign` RPC.
 */
export interface EthereumPersonalSignRpcResponseData {
  encoding: 'hex';

  signature: string;
}

/**
 * Request body for Ethereum wallet RPC operations, discriminated by method.
 */
export type EthereumRpcInput =
  | EthereumSignTransactionRpcInput
  | EthereumSendTransactionRpcInput
  | EthereumPersonalSignRpcInput
  | EthereumSignTypedDataRpcInput
  | EthereumSecp256k1SignRpcInput
  | EthereumSign7702AuthorizationRpcInput
  | EthereumSignUserOperationRpcInput
  | EthereumSendCallsRpcInput;

/**
 * Response body for Ethereum wallet RPC operations, discriminated by method.
 */
export type EthereumRpcResponse =
  | EthereumPersonalSignRpcResponse
  | EthereumSignTypedDataRpcResponse
  | EthereumSignTransactionRpcResponse
  | EthereumSendTransactionRpcResponse
  | EthereumSignUserOperationRpcResponse
  | EthereumSign7702AuthorizationRpcResponse
  | EthereumSecp256k1SignRpcResponse
  | EthereumSendCallsRpcResponse;

/**
 * Signs a raw hash on the secp256k1 curve.
 */
export interface EthereumSecp256k1SignRpcInput {
  method: 'secp256k1_sign';

  /**
   * Parameters for the EVM `secp256k1_sign` RPC.
   */
  params: EthereumSecp256k1SignRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  wallet_id?: string;
}

/**
 * Parameters for the EVM `secp256k1_sign` RPC.
 */
export interface EthereumSecp256k1SignRpcInputParams {
  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  hash: Hex;
}

/**
 * Response to the EVM `secp256k1_sign` RPC.
 */
export interface EthereumSecp256k1SignRpcResponse {
  /**
   * Data returned by the EVM `secp256k1_sign` RPC.
   */
  data: EthereumSecp256k1SignRpcResponseData;

  method: 'secp256k1_sign';
}

/**
 * Data returned by the EVM `secp256k1_sign` RPC.
 */
export interface EthereumSecp256k1SignRpcResponseData {
  encoding: 'hex';

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  signature: Hex;
}

/**
 * A single call within a batched wallet_sendCalls request.
 */
export interface EthereumSendCallsCall {
  to: string;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  data?: Hex;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  value?: Quantity;
}

/**
 * Executes the `wallet_sendCalls` RPC (EIP-5792) to batch multiple calls into a
 * single atomic transaction.
 */
export interface EthereumSendCallsRpcInput {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  method: 'wallet_sendCalls';

  /**
   * Parameters for the `wallet_sendCalls` RPC.
   */
  params: EthereumSendCallsRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  experimental_data_suffix?: Hex;

  sponsor?: boolean;

  wallet_id?: string;
}

/**
 * Parameters for the `wallet_sendCalls` RPC.
 */
export interface EthereumSendCallsRpcInputParams {
  calls: Array<EthereumSendCallsCall>;
}

/**
 * Response to the `wallet_sendCalls` RPC.
 */
export interface EthereumSendCallsRpcResponse {
  /**
   * Data returned by the `wallet_sendCalls` RPC.
   */
  data: EthereumSendCallsRpcResponseData;

  method: 'wallet_sendCalls';
}

/**
 * Data returned by the `wallet_sendCalls` RPC.
 */
export interface EthereumSendCallsRpcResponseData {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  transaction_id: string;
}

/**
 * Executes the EVM `eth_sendTransaction` RPC to sign and broadcast a transaction.
 */
export interface EthereumSendTransactionRpcInput {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  method: 'eth_sendTransaction';

  /**
   * Parameters for the EVM `eth_sendTransaction` RPC.
   */
  params: EthereumSendTransactionRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  experimental_data_suffix?: Hex;

  reference_id?: string;

  sponsor?: boolean;

  wallet_id?: string;
}

/**
 * Parameters for the EVM `eth_sendTransaction` RPC.
 */
export interface EthereumSendTransactionRpcInputParams {
  /**
   * An unsigned Ethereum transaction object. Supports standard EVM transaction types
   * (0, 1, 2, 4) and Tempo transactions (type 118).
   */
  transaction: UnsignedEthereumTransaction;
}

/**
 * Response to the EVM `eth_sendTransaction` RPC.
 */
export interface EthereumSendTransactionRpcResponse {
  /**
   * Data returned by the EVM `eth_sendTransaction` RPC.
   */
  data: EthereumSendTransactionRpcResponseData;

  method: 'eth_sendTransaction';
}

/**
 * Data returned by the EVM `eth_sendTransaction` RPC.
 */
export interface EthereumSendTransactionRpcResponseData {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  hash: string;

  reference_id?: string | null;

  transaction_id?: string;

  /**
   * An unsigned Ethereum transaction object. Supports standard EVM transaction types
   * (0, 1, 2, 4) and Tempo transactions (type 118).
   */
  transaction_request?: UnsignedEthereumTransaction;

  user_operation_hash?: string;
}

/**
 * A signed EIP-7702 authorization that delegates code execution to a contract
 * address.
 */
export interface EthereumSign7702Authorization {
  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id: Quantity;

  contract: string;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce: Quantity;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  r: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  s: Hex;

  y_parity: number;
}

/**
 * Signs an EIP-7702 authorization.
 */
export interface EthereumSign7702AuthorizationRpcInput {
  method: 'eth_sign7702Authorization';

  /**
   * Parameters for the EVM `eth_sign7702Authorization` RPC.
   */
  params: EthereumSign7702AuthorizationRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  wallet_id?: string;
}

/**
 * Parameters for the EVM `eth_sign7702Authorization` RPC.
 */
export interface EthereumSign7702AuthorizationRpcInputParams {
  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id: Quantity;

  contract: string;

  executor?: 'self';

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce?: Quantity;
}

/**
 * Response to the EVM `eth_sign7702Authorization` RPC.
 */
export interface EthereumSign7702AuthorizationRpcResponse {
  /**
   * Data returned by the EVM `eth_sign7702Authorization` RPC.
   */
  data: EthereumSign7702AuthorizationRpcResponseData;

  method: 'eth_sign7702Authorization';
}

/**
 * Data returned by the EVM `eth_sign7702Authorization` RPC.
 */
export interface EthereumSign7702AuthorizationRpcResponseData {
  /**
   * A signed EIP-7702 authorization that delegates code execution to a contract
   * address.
   */
  authorization: EthereumSign7702Authorization;
}

/**
 * Executes the EVM `eth_signTransaction` RPC to sign a transaction.
 */
export interface EthereumSignTransactionRpcInput {
  method: 'eth_signTransaction';

  /**
   * Parameters for the EVM `eth_signTransaction` RPC.
   */
  params: EthereumSignTransactionRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  wallet_id?: string;
}

/**
 * Parameters for the EVM `eth_signTransaction` RPC.
 */
export interface EthereumSignTransactionRpcInputParams {
  /**
   * An unsigned Ethereum transaction object. Supports standard EVM transaction types
   * (0, 1, 2, 4) and Tempo transactions (type 118).
   */
  transaction: UnsignedEthereumTransaction;
}

/**
 * Response to the EVM `eth_signTransaction` RPC.
 */
export interface EthereumSignTransactionRpcResponse {
  /**
   * Data returned by the EVM `eth_signTransaction` RPC.
   */
  data: EthereumSignTransactionRpcResponseData;

  method: 'eth_signTransaction';
}

/**
 * Data returned by the EVM `eth_signTransaction` RPC.
 */
export interface EthereumSignTransactionRpcResponseData {
  encoding: 'rlp';

  signed_transaction: string;
}

/**
 * Executes the EVM `eth_signTypedData_v4` RPC (EIP-712) to sign a typed data
 * object.
 */
export interface EthereumSignTypedDataRpcInput {
  method: 'eth_signTypedData_v4';

  /**
   * Parameters for the EVM `eth_signTypedData_v4` RPC.
   */
  params: EthereumSignTypedDataRpcInputParams;

  address?: string;

  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2?: AppsAPI.Caip2;

  chain_type?: 'ethereum';

  /**
   * Options controlling signature production for personal_sign and
   * eth_signTypedData_v4.
   */
  signature_options?: SignatureOptions;

  wallet_id?: string;
}

/**
 * Parameters for the EVM `eth_signTypedData_v4` RPC.
 */
export interface EthereumSignTypedDataRpcInputParams {
  /**
   * EIP-712 typed data object.
   */
  typed_data: EthereumTypedDataInput;
}

/**
 * Response to the EVM `eth_signTypedData_v4` RPC.
 */
export interface EthereumSignTypedDataRpcResponse {
  /**
   * Data returned by the EVM `eth_signTypedData_v4` RPC.
   */
  data: EthereumSignTypedDataRpcResponseData;

  method: 'eth_signTypedData_v4';
}

/**
 * Data returned by the EVM `eth_signTypedData_v4` RPC.
 */
export interface EthereumSignTypedDataRpcResponseData {
  encoding: 'hex';

  signature: string;
}

/**
 * Executes an RPC method to hash and sign a UserOperation.
 */
export interface EthereumSignUserOperationRpcInput {
  method: 'eth_signUserOperation';

  /**
   * Parameters for the EVM `eth_signUserOperation` RPC.
   */
  params: EthereumSignUserOperationRpcInputParams;

  address?: string;

  chain_type?: 'ethereum';

  wallet_id?: string;
}

/**
 * Parameters for the EVM `eth_signUserOperation` RPC.
 */
export interface EthereumSignUserOperationRpcInputParams {
  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id: Quantity;

  contract: string;

  /**
   * An ERC-4337 user operation.
   */
  user_operation: UserOperationInput;
}

/**
 * Response to the EVM `eth_signUserOperation` RPC.
 */
export interface EthereumSignUserOperationRpcResponse {
  /**
   * Data returned by the EVM `eth_signUserOperation` RPC.
   */
  data: EthereumSignUserOperationRpcResponseData;

  method: 'eth_signUserOperation';
}

/**
 * Data returned by the EVM `eth_signUserOperation` RPC.
 */
export interface EthereumSignUserOperationRpcResponseData {
  encoding: 'hex';

  signature: string;
}

/**
 * EIP-712 typed data object.
 */
export interface EthereumTypedDataInput {
  /**
   * The domain parameters for EIP-712 typed data signing.
   */
  domain: TypedDataDomainInputParams;

  message: { [key: string]: unknown };

  primary_type: string;

  /**
   * The type definitions for EIP-712 typed data signing.
   */
  types: TypedDataTypesInputParams;
}

/**
 * Exports the private key of the wallet.
 */
export interface ExportPrivateKeyRpcInput {
  address: string;

  method: 'exportPrivateKey';

  /**
   * Input for exporting a wallet (private key or seed phrase) with HPKE encryption.
   */
  params: PrivateKeyExportInput;
}

/**
 * Response to the `exportPrivateKey` RPC.
 */
export interface ExportPrivateKeyRpcResponse {
  /**
   * Input for exporting a wallet (private key or seed phrase) with HPKE encryption.
   */
  data: PrivateKeyExportInput;

  method: 'exportPrivateKey';
}

/**
 * Exports the seed phrase of the wallet.
 */
export interface ExportSeedPhraseRpcInput {
  address: string;

  method: 'exportSeedPhrase';

  /**
   * Input for exporting a wallet (private key or seed phrase) with HPKE encryption.
   */
  params: SeedPhraseExportInput;
}

/**
 * Response to the `exportSeedPhrase` RPC.
 */
export interface ExportSeedPhraseRpcResponse {
  /**
   * Response containing HPKE-encrypted wallet data (private key or seed phrase).
   */
  data: SeedPhraseExportResponse;

  method: 'exportSeedPhrase';
}

/**
 * The export type. 'display' is for showing the key to the user in the UI,
 * 'client' is for exporting to the client application.
 */
export type ExportType = 'display' | 'client';

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
  | 'bitcoin-taproot'
  | 'pearl'
  | 'near'
  | 'ton'
  | 'starknet'
  | 'spark';

/**
 * Total fees assessed on a transfer, in BPS
 */
export interface FeeConfiguration {
  /**
   * Discriminator: total fee specified in BPS.
   */
  type: 'total_fee_bps';

  /**
   * Total fee in basis points (1 bps = 0.01%).
   */
  value: number;
}

/**
 * An individual fee assessed on a transfer.
 */
export type FeeLineItem = RelayerFee | PrivyFee | DeveloperFee;

/**
 * The wallet chain types that offer first class support.
 */
export type FirstClassChainType = 'ethereum' | 'solana';

/**
 * Gas cost for a blockchain action. Includes both raw base-unit amount and a
 * human-readable decimal string, plus the gas token symbol.
 */
export interface Gas {
  /**
   * Gas cost in the gas token as a human-readable decimal string (e.g. "0.0001").
   */
  amount: string;

  /**
   * Gas cost in the gas token's base units (e.g. wei).
   */
  base_amount: string;

  /**
   * Gas token symbol (e.g. "ETH", "USDC").
   */
  gas_asset: string;
}

/**
 * Request body for looking up a wallet by its blockchain address.
 */
export interface GetByWalletAddressRequestBody {
  /**
   * A blockchain wallet address. Ethereum addresses are normalized to EIP-55
   * checksum format. Solana addresses are validated as base58. All other chain
   * addresses (Stellar, Tron, Sui, Aptos, etc.) are accepted as-is.
   */
  address: Address;

  /**
   * Include archived wallets in lookup. Defaults to false (archived wallets return
   * 404).
   */
  include_archived?: boolean;
}

/**
 * The input for HD wallets.
 */
export interface HDInitInput {
  /**
   * The address of the wallet to import.
   */
  address: string;

  /**
   * The chain type of the wallet to import. Supports `ethereum`, `solana`,
   * `stellar`, `tron`, `sui`, and `aptos`.
   */
  chain_type: WalletImportSupportedChains;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  /**
   * The entropy type of the wallet to import.
   */
  entropy_type: 'hd';

  /**
   * The index of the wallet to import.
   */
  index: number;
}

/**
 * A BIP-32 hierarchical deterministic wallet derivation path.
 */
export type HDPath = string;

/**
 * The submission input for importing an HD wallet.
 */
export interface HDSubmitInput {
  /**
   * The address of the wallet to import.
   */
  address: string;

  /**
   * The chain type of the wallet to import. Supports `ethereum`, `solana`,
   * `stellar`, `tron`, `sui`, and `aptos`.
   */
  chain_type: WalletImportSupportedChains;

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
  encryption_type: HpkeEncryption;

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
  hpke_config?: HpkeImportConfig;
}

/**
 * The AEAD algorithm used for HPKE encryption.
 */
export type HpkeAeadAlgorithm = 'CHACHA20_POLY1305' | 'AES_GCM256';

/**
 * The encryption type of the wallet to import. Currently only supports `HPKE`.
 */
export type HpkeEncryption = 'HPKE';

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
   * The AEAD algorithm used for HPKE encryption.
   */
  aead_algorithm?: HpkeAeadAlgorithm;

  /**
   * Application-specific context information (INFO) used during HPKE encryption.
   * Should be base64-encoded bytes.
   */
  info?: string;
}

/**
 * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
 * bytes).
 */
export type Hex = string;

/**
 * A binding that scopes a user signing key to a specific intent.
 */
export interface IntentBinding {
  intentId: string;

  type: 'intent';
}

/**
 * Source for a transfer identified by a named asset (e.g. "usdc", "eth"). Use this
 * variant for first-class assets maintained by Privy.
 */
export interface NamedTokenTransferSource {
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

  /**
   * @deprecated Amount as a decimal string in the token's standard unit (e.g. "1.5"
   * for 1.5 USDC, "0.01" for 0.01 ETH). For exact_input, specifies the amount to
   * send. Not in the smallest on-chain unit (wei, lamports, etc.). Maximum 100
   * characters. Deprecated: use the top-level `amount` field instead.
   */
  amount?: string;
}

/**
 * A Spark token output with its previous transaction data.
 */
export interface OutputWithPreviousTransactionData {
  previous_transaction_hash: string;

  previous_transaction_vout: number;

  /**
   * A Spark token output.
   */
  output?: TokenOutput;
}

/**
 * An optional list of up to one policy ID to enforce on the wallet.
 */
export type PolicyInput = Array<string>;

/**
 * Input for exporting a wallet (private key or seed phrase) with HPKE encryption.
 */
export interface PrivateKeyExportInput {
  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  /**
   * The recipient public key for HPKE encryption, in PEM or DER (base64-encoded)
   * format.
   */
  recipient_public_key: RecipientPublicKey;

  export_seed_phrase?: boolean;

  /**
   * The export type. 'display' is for showing the key to the user in the UI,
   * 'client' is for exporting to the client application.
   */
  export_type?: ExportType;
}

/**
 * Response containing HPKE-encrypted wallet data (private key or seed phrase).
 */
export interface PrivateKeyExportResponse {
  ciphertext: string;

  encapsulated_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;
}

/**
 * The input for private key wallets.
 */
export interface PrivateKeyInitInput {
  /**
   * The address of the wallet to import.
   */
  address: string;

  /**
   * The chain type of the wallet to import. Supports `ethereum`, `solana`,
   * `stellar`, `tron`, `sui`, and `aptos`.
   */
  chain_type: WalletImportSupportedChains;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  entropy_type: 'private-key';
}

/**
 * The submission input for importing a private key wallet.
 */
export interface PrivateKeySubmitInput {
  /**
   * The address of the wallet to import.
   */
  address: string;

  /**
   * The chain type of the wallet to import. Supports `ethereum`, `solana`,
   * `stellar`, `tron`, `sui`, and `aptos`.
   */
  chain_type: WalletImportSupportedChains;

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
  encryption_type: HpkeEncryption;

  entropy_type: 'private-key';

  /**
   * Optional HPKE configuration for wallet import decryption. These parameters allow
   * importing wallets encrypted by external providers that use different HPKE
   * configurations.
   */
  hpke_config?: HpkeImportConfig;
}

/**
 * Estimated fee paid to Privy.
 */
export interface PrivyFee {
  /**
   * Amount in USD (in decimals).
   */
  amount: string;

  type: 'privy';

  recipient?: string;
}

/**
 * A quantity value that can be either a hex string starting with '0x' or a
 * non-negative integer.
 */
export type Quantity = Hex | number;

/**
 * Unencrypted response from bound wallet authentication, with bindings.
 */
export interface RawBoundAuthenticateResponse {
  authorization_key: string;

  bindings: Array<UserSigningKeyBinding>;

  expires_at: number;

  wallets: Array<Wallet>;
}

/**
 * Encoding scheme for bytes in the `raw_sign` RPC.
 */
export type RawSignBytesEncoding = 'utf-8' | 'hex' | 'base64';

/**
 * Hash function for bytes in the `raw_sign` RPC.
 */
export type RawSignBytesHashFunction = 'keccak256' | 'sha256' | 'blake2b256';

/**
 * Parameters for hashing and signing bytes with the `raw_sign` RPC.
 */
export interface RawSignBytesParams {
  /**
   * The bytes to hash and sign.
   */
  bytes: string;

  /**
   * Encoding scheme for bytes in the `raw_sign` RPC.
   */
  encoding: RawSignBytesEncoding;

  /**
   * Hash function for bytes in the `raw_sign` RPC.
   */
  hash_function: RawSignBytesHashFunction;
}

/**
 * Parameters for signing a pre-computed hash with the `raw_sign` RPC.
 */
export interface RawSignHashParams {
  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  hash: Hex;
}

/**
 * Provide either `hash` (to sign a pre-computed hash) OR `bytes`, `encoding`, and
 * `hash_function` (to hash and then sign). These options are mutually exclusive.
 */
export interface RawSignInput {
  /**
   * Parameters for the `raw_sign` RPC.
   */
  params: RawSignInputParams;
}

/**
 * Parameters for the `raw_sign` RPC.
 */
export type RawSignInputParams = RawSignHashParams | RawSignBytesParams;

/**
 * Response to the `raw_sign` RPC.
 */
export interface RawSignResponse {
  /**
   * Data returned by the `raw_sign` RPC.
   */
  data: RawSignResponseData;

  method: 'raw_sign';
}

/**
 * Data returned by the `raw_sign` RPC.
 */
export interface RawSignResponseData {
  encoding: 'hex';

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  signature: Hex;
}

/**
 * The response from authenticating a wallet without encryption, containing a raw
 * authorization key and wallet data.
 */
export interface RawWalletAuthenticateResponse {
  /**
   * The raw authorization key data.
   */
  authorization_key: string;

  /**
   * The expiration time of the authorization key in milliseconds since the epoch.
   */
  expires_at: number;

  wallets: Array<Wallet>;
}

/**
 * The recipient public key for HPKE encryption, in PEM or DER (base64-encoded)
 * format.
 */
export type RecipientPublicKey = string;

/**
 * Estimated fee paid to the relayer.
 */
export interface RelayerFee {
  /**
   * Amount in USD (in decimals).
   */
  amount: string;

  type: 'relayer';

  recipient?: string;
}

/**
 * Input for exporting a wallet (private key or seed phrase) with HPKE encryption.
 */
export interface SeedPhraseExportInput {
  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  /**
   * The recipient public key for HPKE encryption, in PEM or DER (base64-encoded)
   * format.
   */
  recipient_public_key: RecipientPublicKey;

  export_seed_phrase?: boolean;

  /**
   * The export type. 'display' is for showing the key to the user in the UI,
   * 'client' is for exporting to the client application.
   */
  export_type?: ExportType;
}

/**
 * Response containing HPKE-encrypted wallet data (private key or seed phrase).
 */
export interface SeedPhraseExportResponse {
  ciphertext: string;

  encapsulated_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;
}

/**
 * Options controlling signature production for personal_sign and
 * eth_signTypedData_v4.
 */
export interface SignatureOptions {
  /**
   * The type of cryptographic signature to produce. Use "ecdsa" for standard ECDSA
   * signatures, or "erc1271" for ERC-1271 compliant signatures for smart account
   * wallets.
   */
  type: SignatureType;
}

/**
 * The type of cryptographic signature to produce. Use "ecdsa" for standard ECDSA
 * signatures, or "erc1271" for ERC-1271 compliant signatures for smart account
 * wallets.
 */
export type SignatureType = 'ecdsa' | 'erc1271';

/**
 * The signing algorithm used by the wallet.
 */
export type SigningAlgorithm = 'ECDSA' | 'EdDSA' | 'Schnorr';

/**
 * Request body for Solana wallet RPC operations, discriminated by method.
 */
export type SolanaRpcInput =
  | SolanaSignTransactionRpcInput
  | SolanaSignAndSendTransactionRpcInput
  | SolanaSignMessageRpcInput;

/**
 * Response body for Solana wallet RPC operations, discriminated by method.
 */
export type SolanaRpcResponse =
  | SolanaSignMessageRpcResponse
  | SolanaSignTransactionRpcResponse
  | SolanaSignAndSendTransactionRpcResponse;

/**
 * Executes the SVM `signAndSendTransaction` RPC to sign and broadcast a
 * transaction.
 */
export interface SolanaSignAndSendTransactionRpcInput {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  method: 'signAndSendTransaction';

  /**
   * Parameters for the SVM `signAndSendTransaction` RPC.
   */
  params: SolanaSignAndSendTransactionRpcInputParams;

  address?: string;

  chain_type?: 'solana';

  optimistic_broadcast?: boolean;

  reference_id?: string;

  sponsor?: boolean;

  wallet_id?: string;
}

/**
 * Parameters for the SVM `signAndSendTransaction` RPC.
 */
export interface SolanaSignAndSendTransactionRpcInputParams {
  encoding: 'base64';

  transaction: string;
}

/**
 * Response to the SVM `signAndSendTransaction` RPC.
 */
export interface SolanaSignAndSendTransactionRpcResponse {
  /**
   * Data returned by the SVM `signAndSendTransaction` RPC.
   */
  data: SolanaSignAndSendTransactionRpcResponseData;

  method: 'signAndSendTransaction';
}

/**
 * Data returned by the SVM `signAndSendTransaction` RPC.
 */
export interface SolanaSignAndSendTransactionRpcResponseData {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  hash: string;

  reference_id?: string | null;

  signed_transaction?: string;

  transaction_id?: string;
}

/**
 * Executes the SVM `signMessage` RPC to sign a message.
 */
export interface SolanaSignMessageRpcInput {
  method: 'signMessage';

  /**
   * Parameters for the SVM `signMessage` RPC.
   */
  params: SolanaSignMessageRpcInputParams;

  address?: string;

  chain_type?: 'solana';

  wallet_id?: string;
}

/**
 * Parameters for the SVM `signMessage` RPC.
 */
export interface SolanaSignMessageRpcInputParams {
  encoding: 'base64';

  message: string;
}

/**
 * Response to the SVM `signMessage` RPC.
 */
export interface SolanaSignMessageRpcResponse {
  /**
   * Data returned by the SVM `signMessage` RPC.
   */
  data: SolanaSignMessageRpcResponseData;

  method: 'signMessage';
}

/**
 * Data returned by the SVM `signMessage` RPC.
 */
export interface SolanaSignMessageRpcResponseData {
  encoding: 'base64';

  signature: string;
}

/**
 * Executes the SVM `signTransaction` RPC to sign a transaction.
 */
export interface SolanaSignTransactionRpcInput {
  method: 'signTransaction';

  /**
   * Parameters for the SVM `signTransaction` RPC.
   */
  params: SolanaSignTransactionRpcInputParams;

  address?: string;

  chain_type?: 'solana';

  wallet_id?: string;
}

/**
 * Parameters for the SVM `signTransaction` RPC.
 */
export interface SolanaSignTransactionRpcInputParams {
  encoding: 'base64';

  transaction: string;
}

/**
 * Response to the SVM `signTransaction` RPC.
 */
export interface SolanaSignTransactionRpcResponse {
  /**
   * Data returned by the SVM `signTransaction` RPC.
   */
  data: SolanaSignTransactionRpcResponseData;

  method: 'signTransaction';
}

/**
 * Data returned by the SVM `signTransaction` RPC.
 */
export interface SolanaSignTransactionRpcResponseData {
  encoding: 'base64';

  signed_transaction: string;
}

/**
 * The derivation strategy used for Solana wallets.
 */
export type SolanaWalletDerivationStrategy = 'ENTROPY_TO_SEED' | 'ENTROPY_TO_MNEMONIC_TO_SEED';

/**
 * The balance of a Spark wallet.
 */
export interface SparkBalance {
  balance: string;

  token_balances: { [key: string]: SparkTokenBalance };
}

/**
 * Claims a static deposit into the Spark wallet.
 */
export interface SparkClaimStaticDepositRpcInput {
  method: 'claimStaticDeposit';

  /**
   * Parameters for the Spark `claimStaticDeposit` RPC.
   */
  params: SparkClaimStaticDepositRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `claimStaticDeposit` RPC.
 */
export interface SparkClaimStaticDepositRpcInputParams {
  credit_amount_sats: number;

  signature: string;

  transaction_id: string;

  output_index?: number;
}

/**
 * Response to the Spark `claimStaticDeposit` RPC.
 */
export interface SparkClaimStaticDepositRpcResponse {
  method: 'claimStaticDeposit';

  /**
   * Data returned by the Spark `claimStaticDeposit` RPC.
   */
  data?: SparkClaimStaticDepositRpcResponseData;
}

/**
 * Data returned by the Spark `claimStaticDeposit` RPC.
 */
export interface SparkClaimStaticDepositRpcResponseData {
  transfer_id: string;
}

/**
 * A fee quote for a cooperative exit from Spark to Bitcoin L1.
 */
export interface SparkCoopExitFeeQuote {
  id: string;

  created_at: string;

  expires_at: string;

  /**
   * A currency amount with its original value and unit.
   */
  l1_broadcast_fee_fast: SparkCurrencyAmount;

  /**
   * A currency amount with its original value and unit.
   */
  l1_broadcast_fee_medium: SparkCurrencyAmount;

  /**
   * A currency amount with its original value and unit.
   */
  l1_broadcast_fee_slow: SparkCurrencyAmount;

  network: string;

  /**
   * A currency amount with its original value and unit.
   */
  total_amount: SparkCurrencyAmount;

  updated_at: string;

  /**
   * A currency amount with its original value and unit.
   */
  user_fee_fast: SparkCurrencyAmount;

  /**
   * A currency amount with its original value and unit.
   */
  user_fee_medium: SparkCurrencyAmount;

  /**
   * A currency amount with its original value and unit.
   */
  user_fee_slow: SparkCurrencyAmount;
}

/**
 * A cooperative exit request from Spark to Bitcoin L1.
 */
export interface SparkCoopExitRequest {
  id: string;

  coop_exit_txid: string;

  created_at: string;

  expires_at: string;

  /**
   * A currency amount with its original value and unit.
   */
  fee: SparkCurrencyAmount;

  /**
   * A currency amount with its original value and unit.
   */
  l1_broadcast_fee: SparkCurrencyAmount;

  network: string;

  status: string;

  updated_at: string;

  /**
   * The exit speed for a cooperative withdrawal from Spark to L1.
   */
  exit_speed?: SparkExitSpeed;

  fee_quote_id?: string;
}

/**
 * Creates a Lightning invoice for the Spark wallet.
 */
export interface SparkCreateLightningInvoiceRpcInput {
  method: 'createLightningInvoice';

  /**
   * Parameters for the Spark `createLightningInvoice` RPC.
   */
  params: SparkCreateLightningInvoiceRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `createLightningInvoice` RPC.
 */
export interface SparkCreateLightningInvoiceRpcInputParams {
  amount_sats: number;

  description_hash?: string;

  expiry_seconds?: number;

  include_spark_address?: boolean;

  memo?: string;

  receiver_identity_pubkey?: string;
}

/**
 * Response to the Spark `createLightningInvoice` RPC.
 */
export interface SparkCreateLightningInvoiceRpcResponse {
  method: 'createLightningInvoice';

  /**
   * A Spark Lightning receive request.
   */
  data?: SparkLightningReceiveRequest;
}

/**
 * A currency amount with its original value and unit.
 */
export interface SparkCurrencyAmount {
  original_unit: string;

  original_value: number;
}

/**
 * The exit speed for a cooperative withdrawal from Spark to L1.
 */
export type SparkExitSpeed = 'FAST' | 'MEDIUM' | 'SLOW';

/**
 * Gets the balance of the Spark wallet.
 */
export interface SparkGetBalanceRpcInput {
  method: 'getBalance';

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Response to the Spark `getBalance` RPC.
 */
export interface SparkGetBalanceRpcResponse {
  method: 'getBalance';

  /**
   * The balance of a Spark wallet.
   */
  data?: SparkBalance;
}

/**
 * Gets a quote for claiming a static deposit.
 */
export interface SparkGetClaimStaticDepositQuoteRpcInput {
  method: 'getClaimStaticDepositQuote';

  /**
   * Parameters for the Spark `getClaimStaticDepositQuote` RPC.
   */
  params: SparkGetClaimStaticDepositQuoteRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `getClaimStaticDepositQuote` RPC.
 */
export interface SparkGetClaimStaticDepositQuoteRpcInputParams {
  transaction_id: string;

  output_index?: number;
}

/**
 * Response to the Spark `getClaimStaticDepositQuote` RPC.
 */
export interface SparkGetClaimStaticDepositQuoteRpcResponse {
  method: 'getClaimStaticDepositQuote';

  /**
   * Data returned by the Spark `getClaimStaticDepositQuote` RPC.
   */
  data?: SparkGetClaimStaticDepositQuoteRpcResponseData;
}

/**
 * Data returned by the Spark `getClaimStaticDepositQuote` RPC.
 */
export interface SparkGetClaimStaticDepositQuoteRpcResponseData {
  credit_amount_sats: number;

  network: string;

  output_index: number;

  signature: string;

  transaction_id: string;
}

/**
 * Gets a static deposit address for the Spark wallet.
 */
export interface SparkGetStaticDepositAddressRpcInput {
  method: 'getStaticDepositAddress';

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Response to the Spark `getStaticDepositAddress` RPC.
 */
export interface SparkGetStaticDepositAddressRpcResponse {
  method: 'getStaticDepositAddress';

  /**
   * Data returned by the Spark `getStaticDepositAddress` RPC.
   */
  data?: SparkGetStaticDepositAddressRpcResponseData;
}

/**
 * Data returned by the Spark `getStaticDepositAddress` RPC.
 */
export interface SparkGetStaticDepositAddressRpcResponseData {
  address: string;
}

/**
 * Gets a fee quote for withdrawing from Spark to a Bitcoin L1 address.
 */
export interface SparkGetWithdrawalFeeQuoteRpcInput {
  method: 'getWithdrawalFeeQuote';

  /**
   * Parameters for the Spark `getWithdrawalFeeQuote` RPC.
   */
  params: SparkGetWithdrawalFeeQuoteRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `getWithdrawalFeeQuote` RPC.
 */
export interface SparkGetWithdrawalFeeQuoteRpcInputParams {
  amount_sats: number;

  onchain_address: string;
}

/**
 * Response to the Spark `getWithdrawalFeeQuote` RPC.
 */
export interface SparkGetWithdrawalFeeQuoteRpcResponse {
  method: 'getWithdrawalFeeQuote';

  /**
   * A fee quote for a cooperative exit from Spark to Bitcoin L1.
   */
  data?: SparkCoopExitFeeQuote;
}

/**
 * The fee for a Spark Lightning payment.
 */
export interface SparkLightningFee {
  original_unit: string;

  original_value: number;
}

/**
 * A Spark Lightning receive request.
 */
export interface SparkLightningReceiveRequest {
  id: string;

  created_at: string;

  network: string;

  status: string;

  typename: string;

  updated_at: string;

  invoice?: unknown;

  payment_preimage?: string;

  receiver_identity_public_key?: string;

  transfer?: unknown;
}

/**
 * A Spark Lightning send request.
 */
export interface SparkLightningSendRequest {
  id: string;

  created_at: string;

  encoded_invoice: string;

  /**
   * The fee for a Spark Lightning payment.
   */
  fee: SparkLightningFee;

  idempotency_key: string;

  network: string;

  status: string;

  typename: string;

  updated_at: string;

  payment_preimage?: string;

  transfer?: unknown;
}

/**
 * The Spark network.
 */
export type SparkNetwork = 'MAINNET' | 'REGTEST';

/**
 * Strategy for selecting outputs in a Spark token transfer.
 */
export type SparkOutputSelectionStrategy = 'SMALL_FIRST' | 'LARGE_FIRST';

/**
 * Pays a Lightning invoice from the Spark wallet.
 */
export interface SparkPayLightningInvoiceRpcInput {
  method: 'payLightningInvoice';

  /**
   * Parameters for the Spark `payLightningInvoice` RPC.
   */
  params: SparkPayLightningInvoiceRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `payLightningInvoice` RPC.
 */
export interface SparkPayLightningInvoiceRpcInputParams {
  invoice: string;

  max_fee_sats: number;

  amount_sats_to_send?: number;

  prefer_spark?: boolean;
}

/**
 * Response to the Spark `payLightningInvoice` RPC.
 */
export interface SparkPayLightningInvoiceRpcResponse {
  method: 'payLightningInvoice';

  /**
   * A Spark transfer.
   */
  data?: SparkTransfer | SparkLightningSendRequest;
}

/**
 * Request body for Spark wallet RPC operations, discriminated by method.
 */
export type SparkRpcInput =
  | SparkTransferRpcInput
  | SparkGetBalanceRpcInput
  | SparkTransferTokensRpcInput
  | SparkGetStaticDepositAddressRpcInput
  | SparkGetClaimStaticDepositQuoteRpcInput
  | SparkClaimStaticDepositRpcInput
  | SparkCreateLightningInvoiceRpcInput
  | SparkPayLightningInvoiceRpcInput
  | SparkSignMessageWithIdentityKeyRpcInput
  | SparkWithdrawRpcInput
  | SparkGetWithdrawalFeeQuoteRpcInput;

/**
 * Response body for Spark wallet RPC operations, discriminated by method.
 */
export type SparkRpcResponse =
  | SparkTransferRpcResponse
  | SparkGetBalanceRpcResponse
  | SparkTransferTokensRpcResponse
  | SparkGetStaticDepositAddressRpcResponse
  | SparkGetClaimStaticDepositQuoteRpcResponse
  | SparkClaimStaticDepositRpcResponse
  | SparkCreateLightningInvoiceRpcResponse
  | SparkPayLightningInvoiceRpcResponse
  | SparkSignMessageWithIdentityKeyRpcResponse
  | SparkWithdrawRpcResponse
  | SparkGetWithdrawalFeeQuoteRpcResponse;

/**
 * Signs a message with the Spark identity key.
 */
export interface SparkSignMessageWithIdentityKeyRpcInput {
  method: 'signMessageWithIdentityKey';

  /**
   * Parameters for the Spark `signMessageWithIdentityKey` RPC.
   */
  params: SparkSignMessageWithIdentityKeyRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `signMessageWithIdentityKey` RPC.
 */
export interface SparkSignMessageWithIdentityKeyRpcInputParams {
  message: string;

  compact?: boolean;
}

/**
 * Response to the Spark `signMessageWithIdentityKey` RPC.
 */
export interface SparkSignMessageWithIdentityKeyRpcResponse {
  method: 'signMessageWithIdentityKey';

  /**
   * Data returned by the Spark `signMessageWithIdentityKey` RPC.
   */
  data?: SparkSignMessageWithIdentityKeyRpcResponseData;
}

/**
 * Data returned by the Spark `signMessageWithIdentityKey` RPC.
 */
export interface SparkSignMessageWithIdentityKeyRpcResponseData {
  signature: string;
}

/**
 * A Spark signing keyshare.
 */
export interface SparkSigningKeyshare {
  owner_identifiers: Array<string>;

  public_key: string;

  public_shares: { [key: string]: string };

  threshold: number;

  updated_time: string;
}

/**
 * Balance of a Spark token.
 */
export interface SparkTokenBalance {
  balance: string;

  /**
   * Metadata for a Spark user token.
   */
  token_metadata: SparkUserTokenMetadata;
}

/**
 * A Spark transfer.
 */
export interface SparkTransfer {
  id: string;

  leaves: Array<SparkTransferLeaf>;

  receiver_identity_public_key: string;

  sender_identity_public_key: string;

  status: string;

  total_value: number;

  transfer_direction: string;

  type: string;

  created_time?: string;

  expiry_time?: string;

  updated_time?: string;
}

/**
 * A Spark transfer leaf.
 */
export interface SparkTransferLeaf {
  intermediate_refund_tx: string;

  secret_cipher: string;

  signature: string;

  /**
   * A Spark wallet leaf node.
   */
  leaf?: SparkWalletLeaf;
}

/**
 * Transfers satoshis to a Spark address.
 */
export interface SparkTransferRpcInput {
  method: 'transfer';

  /**
   * Parameters for the Spark `transfer` RPC.
   */
  params: SparkTransferRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `transfer` RPC.
 */
export interface SparkTransferRpcInputParams {
  amount_sats: number;

  receiver_spark_address: string;
}

/**
 * Response to the Spark `transfer` RPC.
 */
export interface SparkTransferRpcResponse {
  method: 'transfer';

  /**
   * A Spark transfer.
   */
  data?: SparkTransfer;
}

/**
 * Transfers tokens to a Spark address.
 */
export interface SparkTransferTokensRpcInput {
  method: 'transferTokens';

  /**
   * Parameters for the Spark `transferTokens` RPC.
   */
  params: SparkTransferTokensRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `transferTokens` RPC.
 */
export interface SparkTransferTokensRpcInputParams {
  receiver_spark_address: string;

  token_amount: number;

  token_identifier: string;

  /**
   * Strategy for selecting outputs in a Spark token transfer.
   */
  output_selection_strategy?: SparkOutputSelectionStrategy;

  selected_outputs?: Array<OutputWithPreviousTransactionData>;
}

/**
 * Response to the Spark `transferTokens` RPC.
 */
export interface SparkTransferTokensRpcResponse {
  method: 'transferTokens';

  /**
   * Data returned by the Spark `transferTokens` RPC.
   */
  data?: SparkTransferTokensRpcResponseData;
}

/**
 * Data returned by the Spark `transferTokens` RPC.
 */
export interface SparkTransferTokensRpcResponseData {
  id: string;
}

/**
 * Metadata for a Spark user token.
 */
export interface SparkUserTokenMetadata {
  decimals: number;

  max_supply: string;

  raw_token_identifier: string;

  token_name: string;

  token_public_key: string;

  token_ticker: string;
}

/**
 * A Spark wallet leaf node.
 */
export interface SparkWalletLeaf {
  id: string;

  /**
   * The Spark network.
   */
  network: SparkNetwork;

  node_tx: string;

  owner_identity_public_key: string;

  refund_tx: string;

  status: string;

  tree_id: string;

  value: number;

  verifying_public_key: string;

  vout: number;

  parent_node_id?: string;

  /**
   * A Spark signing keyshare.
   */
  signing_keyshare?: SparkSigningKeyshare;
}

/**
 * Withdraws from Spark to a Bitcoin L1 address (cooperative exit).
 */
export interface SparkWithdrawRpcInput {
  method: 'withdraw';

  /**
   * Parameters for the Spark `withdraw` RPC.
   */
  params: SparkWithdrawRpcInputParams;

  /**
   * The Spark network.
   */
  network?: SparkNetwork;
}

/**
 * Parameters for the Spark `withdraw` RPC.
 */
export interface SparkWithdrawRpcInputParams {
  /**
   * The exit speed for a cooperative withdrawal from Spark to L1.
   */
  exit_speed: SparkExitSpeed;

  onchain_address: string;

  amount_sats?: number;

  deduct_fee_from_withdrawal_amount?: boolean;

  fee_amount_sats?: number;

  fee_quote_id?: string;
}

/**
 * Response to the Spark `withdraw` RPC.
 */
export interface SparkWithdrawRpcResponse {
  method: 'withdraw';

  /**
   * A cooperative exit request from Spark to Bitcoin L1.
   */
  data?: SparkCoopExitRequest;
}

/**
 * SUI transaction commands allowlist for raw_sign endpoint policy evaluation
 */
export type SuiCommandName = 'TransferObjects' | 'SplitCoins' | 'MergeCoins';

/**
 * "accepted" if the network has acknowledged the transaction, "rejected" if the
 * network refused it, "skipped" if dry_run was set. Not an onchain confirmation.
 */
export type SwapSubmissionStatus = 'accepted' | 'rejected' | 'skipped';

/**
 * An AA authorization for Tempo transactions with P256/WebAuthn signatures.
 */
export interface TempoAaAuthorization {
  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id: Quantity;

  contract: string;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce: Quantity;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  signature: Hex;
}

/**
 * A single call within a Tempo batched transaction.
 */
export interface TempoCall {
  to: string;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  data?: Hex;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  value?: Quantity;
}

/**
 * A fee payer signature for sponsored Tempo transactions (secp256k1 only).
 */
export interface TempoFeePayerSignature {
  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  r: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  s: Hex;

  y_parity: 0 | 1;
}

/**
 * A Spark token output.
 */
export interface TokenOutput {
  owner_public_key: string;

  token_amount: string;

  id?: string;

  revocation_commitment?: string;

  token_identifier?: string;

  token_public_key?: string;

  withdraw_bond_sats?: number;

  withdraw_relative_block_locktime?: number;
}

/**
 * The destination address for a token transfer. Optionally specify a different
 * asset or chain for cross-asset or cross-chain transfers.
 */
export interface TokenTransferDestination {
  /**
   * Recipient address (hex for EVM, base58 for Solana, base58check for Tron)
   */
  address: string;

  /**
   * The destination asset. Required for cross-asset transfers (e.g., source 'usdt'
   * to destination 'usdc').
   */
  asset?: string;

  /**
   * The destination blockchain network. Required for cross-chain transfers (e.g.,
   * source 'base' to destination 'arbitrum').
   */
  chain?: string;
}

/**
 * The source asset, amount, and chain for a token transfer. Specify either `asset`
 * (named) or `asset_address` (custom), not both.
 */
export type TokenTransferSource = NamedTokenTransferSource | CustomTokenTransferSource;

/**
 * Total fees assessed on a transfer, in BPS
 */
export interface TotalFeeConfigurationBps {
  /**
   * Discriminator: total fee specified in BPS.
   */
  type: 'total_fee_bps';

  /**
   * Total fee in basis points (1 bps = 0.01%).
   */
  value: number;
}

/**
 * Chains supported for transaction history queries.
 */
export type TransactionChainNameInput =
  | 'ethereum'
  | 'arbitrum'
  | 'avalanche'
  | 'base'
  | 'bsc'
  | 'tempo'
  | 'linea'
  | 'optimism'
  | 'polygon'
  | 'solana'
  | 'sepolia';

/**
 * Details of a wallet transaction, varying by transaction type.
 */
export type TransactionDetail = TransferSentTransactionDetail | TransferReceivedTransactionDetail;

/**
 * Token contract address (EVM: 0x-prefixed hex) or mint address (Solana: base58),
 * used to filter wallet transactions.
 */
export type TransactionTokenAddressInput = string;

/**
 * Request body for requesting a quote for a cross-asset or cross-chain (DADC)
 * transfer.
 */
export interface TransferQuoteRequestBody {
  /**
   * The destination address for a token transfer. Optionally specify a different
   * asset or chain for cross-asset or cross-chain transfers.
   */
  destination: TokenTransferDestination;

  /**
   * The source asset, amount, and chain for a token transfer. Specify either `asset`
   * (named) or `asset_address` (custom), not both.
   */
  source: TokenTransferSource;

  /**
   * Amount as a decimal string in the token's standard unit (e.g. "1.5" for 1.5
   * USDC). For exact_input, the amount to send. For exact_output, the exact amount
   * to receive. Takes precedence over source.amount when both are provided.
   */
  amount?: string;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: AmountType;

  /**
   * Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: FeeConfiguration;

  /**
   * Maximum allowed slippage in basis points (1 bps = 0.01%). Only applicable for
   * cross-chain or cross-asset transfers; omit to use the provider default.
   */
  slippage_bps?: number;
}

/**
 * Response containing a quote for a cross-asset or cross-chain (DADC) transfer.
 */
export interface TransferQuoteResponse {
  /**
   * The destination address for a token transfer. Optionally specify a different
   * asset or chain for cross-asset or cross-chain transfers.
   */
  destination: TokenTransferDestination;

  /**
   * Estimated fees in USD for the transfer. Only present for cross-chain transfers.
   */
  estimated_fees: Array<FeeLineItem>;

  /**
   * Estimated input amount in decimals. For exact_input, this equals source.amount.
   * For exact_output, this is the estimated amount the sender needs to provide.
   */
  estimated_input_amount: string;

  /**
   * Estimated output amount in decimals. For exact_input, this is an estimate
   * subject to slippage. For exact_output, this is the guaranteed exact amount to be
   * received.
   */
  estimated_output_amount: string;

  /**
   * Quote expiry as Unix timestamp (seconds).
   */
  expires_at: number;

  /**
   * The source asset, amount, and chain for a token transfer. Specify either `asset`
   * (named) or `asset_address` (custom), not both.
   */
  source: TokenTransferSource;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: AmountType;

  /**
   * Gas cost for a blockchain action. Includes both raw base-unit amount and a
   * human-readable decimal string, plus the gas token symbol.
   */
  estimated_gas?: Gas;
}

/**
 * Details for a received transfer transaction.
 */
export interface TransferReceivedTransactionDetail {
  asset:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'avax'
    | 'pol'
    | 'bnb'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'sol'
    | 'trx'
    | (string & {});

  /**
   * Supported blockchain network names for wallet balance and transaction queries.
   */
  chain: WalletAssetChainNameInput;

  display_values: { [key: string]: string };

  raw_value: string;

  raw_value_decimals: number;

  recipient: string;

  recipient_privy_user_id: string | null;

  sender: string;

  sender_privy_user_id: string | null;

  type: 'transfer_received';
}

/**
 * Request body for initiating a sponsored token transfer from an embedded wallet.
 */
export interface TransferRequestBody {
  /**
   * The destination address for a token transfer. Optionally specify a different
   * asset or chain for cross-asset or cross-chain transfers.
   */
  destination: TokenTransferDestination;

  /**
   * The source asset, amount, and chain for a token transfer. Specify either `asset`
   * (named) or `asset_address` (custom), not both.
   */
  source: TokenTransferSource;

  /**
   * Amount as a decimal string in the token's standard unit (e.g. "1.5" for 1.5
   * USDC). For exact_input, the amount to send. For exact_output, the exact amount
   * to receive. Takes precedence over source.amount when both are provided.
   */
  amount?: string;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: AmountType;

  /**
   * Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: FeeConfiguration;

  /**
   * Maximum allowed slippage in basis points (1 bps = 0.01%). Only applicable for
   * cross-chain or cross-asset transfers; omit to use the provider default.
   */
  slippage_bps?: number;
}

/**
 * Details for a sent transfer transaction.
 */
export interface TransferSentTransactionDetail {
  asset:
    | 'usdc'
    | 'usdc.e'
    | 'eth'
    | 'avax'
    | 'pol'
    | 'bnb'
    | 'usdt'
    | 'eurc'
    | 'usdb'
    | 'sol'
    | 'trx'
    | (string & {});

  /**
   * Supported blockchain network names for wallet balance and transaction queries.
   */
  chain: WalletAssetChainNameInput;

  display_values: { [key: string]: string };

  raw_value: string;

  raw_value_decimals: number;

  recipient: string;

  recipient_privy_user_id: string | null;

  sender: string;

  sender_privy_user_id: string | null;

  type: 'transfer_sent';
}

/**
 * A Tron contract, discriminated by type. Supported types: TransferContract,
 * TriggerSmartContract.
 */
export type TronContract = TronTransferContract | TronTriggerSmartContract;

/**
 * Tron raw_data for tron_sendTransaction. Block reference fields are optional;
 * Privy fetches fresh values if omitted.
 */
export interface TronRawDataForSend {
  contract: Array<TronContract>;

  data?: string;

  expiration?: number;

  fee_limit?: number;

  ref_block_bytes?: string;

  ref_block_hash?: string;

  timestamp?: number;
}

/**
 * Tron raw_data for tron_signTransaction. Block reference fields are required;
 * caller is responsible for fetching them.
 */
export interface TronRawDataForSign {
  contract: Array<TronContract>;

  expiration: number;

  ref_block_bytes: string;

  ref_block_hash: string;

  data?: string;

  fee_limit?: number;

  timestamp?: number;
}

/**
 * Request body for Tron wallet RPC operations, discriminated by method.
 */
export type TronRpcInput = TronSignTransactionRpcInput | TronSendTransactionRpcInput;

/**
 * Response body for Tron wallet RPC operations, discriminated by method.
 */
export type TronRpcResponse = TronSignTransactionRpcResponse | TronSendTransactionRpcResponse;

/**
 * Executes the Tron `tron_sendTransaction` RPC to sign and broadcast a
 * transaction.
 */
export interface TronSendTransactionRpcInput {
  method: 'tron_sendTransaction';

  /**
   * Parameters for the Tron `tron_sendTransaction` RPC.
   */
  params: TronSendTransactionRpcInputParams;

  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2?: AppsAPI.Caip2;
}

/**
 * Parameters for the Tron `tron_sendTransaction` RPC.
 */
export interface TronSendTransactionRpcInputParams {
  /**
   * Tron raw_data for tron_sendTransaction. Block reference fields are optional;
   * Privy fetches fresh values if omitted.
   */
  raw_data: TronRawDataForSend;

  reference_id?: string;
}

/**
 * Response to the Tron `tron_sendTransaction` RPC.
 */
export interface TronSendTransactionRpcResponse {
  /**
   * Data returned by the Tron `tron_sendTransaction` RPC.
   */
  data: TronSendTransactionRpcResponseData;

  method: 'tron_sendTransaction';
}

/**
 * Data returned by the Tron `tron_sendTransaction` RPC.
 */
export interface TronSendTransactionRpcResponseData {
  /**
   * A valid CAIP-2 chain ID (e.g. 'eip155:1').
   */
  caip2: AppsAPI.Caip2;

  hash: string;

  transaction_id: string;

  reference_id?: string;
}

/**
 * Executes the Tron `tron_signTransaction` RPC to sign a transaction. The caller
 * is responsible for broadcasting.
 */
export interface TronSignTransactionRpcInput {
  method: 'tron_signTransaction';

  /**
   * Parameters for the Tron `tron_signTransaction` RPC.
   */
  params: TronSignTransactionRpcInputParams;
}

/**
 * Parameters for the Tron `tron_signTransaction` RPC.
 */
export interface TronSignTransactionRpcInputParams {
  /**
   * Tron raw_data for tron_signTransaction. Block reference fields are required;
   * caller is responsible for fetching them.
   */
  raw_data: TronRawDataForSign;
}

/**
 * Response to the Tron `tron_signTransaction` RPC.
 */
export interface TronSignTransactionRpcResponse {
  /**
   * Data returned by the Tron `tron_signTransaction` RPC.
   */
  data: TronSignTransactionRpcResponseData;

  method: 'tron_signTransaction';
}

/**
 * Data returned by the Tron `tron_signTransaction` RPC.
 */
export interface TronSignTransactionRpcResponseData {
  encoding: 'hex';

  signed_transaction: string;
}

/**
 * Tron native TRX transfer contract.
 */
export interface TronTransferContract {
  amount: number;

  /**
   * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
   * prefix.
   */
  owner_address: SharedAPI.TronHexAddress;

  /**
   * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
   * prefix.
   */
  to_address: SharedAPI.TronHexAddress;

  type: 'TransferContract';
}

/**
 * Tron smart contract call (TRC-20 transfers and general contract interactions).
 */
export interface TronTriggerSmartContract {
  /**
   * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
   * prefix.
   */
  contract_address: SharedAPI.TronHexAddress;

  /**
   * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
   * prefix.
   */
  owner_address: SharedAPI.TronHexAddress;

  type: 'TriggerSmartContract';

  call_token_value?: number;

  call_value?: number;

  data?: string;

  token_id?: number;
}

/**
 * The domain parameters for EIP-712 typed data signing.
 */
export type TypedDataDomainInputParams = { [key: string]: unknown };

/**
 * A single field definition in an EIP-712 typed data type.
 */
export interface TypedDataTypeFieldInput {
  name: string;

  type: string;
}

/**
 * The type definitions for EIP-712 typed data signing.
 */
export type TypedDataTypesInputParams = { [key: string]: Array<TypedDataTypeFieldInput> };

/**
 * An unsigned Ethereum transaction object. Supports standard EVM transaction types
 * (0, 1, 2, 4) and Tempo transactions (type 118).
 */
export type UnsignedEthereumTransaction = UnsignedStandardEthereumTransaction | UnsignedTempoTransaction;

/**
 * An unsigned standard Ethereum transaction object. Supports EVM transaction types
 * 0, 1, 2, and 4.
 */
export interface UnsignedStandardEthereumTransaction {
  authorization_list?: Array<EthereumSign7702Authorization>;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id?: Quantity;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  data?: Hex;

  from?: string;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  gas_limit?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  gas_price?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  max_fee_per_gas?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  max_priority_fee_per_gas?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce?: Quantity;

  to?: string;

  type?: 0 | 1 | 2 | 4;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  value?: Quantity;
}

/**
 * An unsigned Tempo transaction (type 118) with batched calls.
 */
export interface UnsignedTempoTransaction {
  calls: Array<TempoCall>;

  type: 118;

  aa_authorization_list?: Array<TempoAaAuthorization>;

  access_list?: Array<AccessListEntry>;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  chain_id?: Quantity;

  /**
   * A fee payer signature for sponsored Tempo transactions (secp256k1 only).
   */
  fee_payer_signature?: TempoFeePayerSignature;

  fee_token?: string;

  from?: string;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  gas_limit?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  max_fee_per_gas?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  max_priority_fee_per_gas?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  nonce_key?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  valid_after?: Quantity;

  /**
   * A quantity value that can be either a hex string starting with '0x' or a
   * non-negative integer.
   */
  valid_before?: Quantity;
}

/**
 * An ERC-4337 user operation.
 */
export interface UserOperationInput {
  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  call_data: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  call_gas_limit: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  max_fee_per_gas: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  max_priority_fee_per_gas: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  nonce: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  pre_verification_gas: Hex;

  sender: string;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  verification_gas_limit: Hex;

  paymaster?: string;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  paymaster_data?: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  paymaster_post_op_gas_limit?: Hex;

  /**
   * A hex-encoded string prefixed with '0x', capped at 100002 characters (50,000
   * bytes).
   */
  paymaster_verification_gas_limit?: Hex;
}

/**
 * A binding that scopes a user signing key to a specific intent.
 */
export interface UserSigningKeyBinding {
  intentId: string;

  type: 'intent';
}

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
  additional_signers: WalletAdditionalSigner;

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
   * Unix timestamp of when the wallet was archived in milliseconds, or null if the
   * wallet is active.
   */
  archived_at?: number | null;

  /**
   * The number of keys that must sign for an action to be valid.
   */
  authorization_threshold?: number;

  /**
   * Information about the custodian managing this wallet.
   */
  custody?: WalletCustodian;

  /**
   * A human-readable label for the wallet.
   */
  display_name?: string;

  /**
   * A customer-provided identifier for mapping to external systems. Write-once, set
   * only at creation.
   */
  external_id?: string;

  /**
   * The compressed, raw public key for the wallet along the chain cryptographic
   * curve.
   */
  public_key?: string;
}

/**
 * Additional signers for the wallet.
 */
export type WalletAdditionalSigner = Array<WalletAdditionalSignerItem>;

/**
 * A single additional signer on a wallet, with an optional policy override.
 */
export interface WalletAdditionalSignerItem {
  /**
   * A unique identifier for a key quorum.
   */
  signer_id: SharedAPI.KeyQuorumID;

  /**
   * An optional list of up to one policy ID to enforce on the wallet.
   */
  override_policy_ids?: PolicyInput;
}

/**
 * Input for registering or updating an application public signing key for
 * API-based wallet actions.
 */
export interface WalletAPIRegisterAuthorizationKeyInput {
  public_key: string;

  display_name?: string;

  /**
   * The role of an authorization key, controlling what actions it can authorize on a
   * wallet.
   */
  role?: AuthorizationKeyRole | null;
}

/**
 * Input for revoking an application authorization key.
 */
export interface WalletAPIRevokeAuthorizationKeyInput {
  id: string;
}

/**
 * A named asset supported across all chains.
 */
export type WalletAsset =
  | 'usdc'
  | 'usdc.e'
  | 'eth'
  | 'avax'
  | 'pol'
  | 'bnb'
  | 'usdt'
  | 'eurc'
  | 'usdb'
  | 'sol'
  | 'trx';

/**
 * Supported blockchain network names for wallet balance and transaction queries.
 */
export type WalletAssetChainNameInput =
  | 'ethereum'
  | 'arbitrum'
  | 'avalanche'
  | 'base'
  | 'tempo'
  | 'linea'
  | 'optimism'
  | 'polygon'
  | 'bsc'
  | 'solana'
  | 'tron'
  | 'zksync_era'
  | 'sepolia'
  | 'arbitrum_sepolia'
  | 'avalanche_fuji'
  | 'base_sepolia'
  | 'linea_testnet'
  | 'optimism_sepolia'
  | 'polygon_amoy'
  | 'solana_devnet'
  | 'solana_testnet'
  | 'tron_nile';

/**
 * Request body for creating an encrypted, bound user signing key.
 */
export interface WalletAuthenticateBoundEncryptedRequestBody {
  /**
   * Bindings that scope the USK. The key can only authorize the bound values.
   */
  bindings: Array<UserSigningKeyBinding>;

  encryption_type: 'HPKE';

  recipient_public_key: string;

  user_jwt: string;
}

/**
 * Request body for creating a user signing key scoped to specific bindings. The
 * returned USK can only authorize the bound values and cannot sign other RPC
 * requests.
 */
export type WalletAuthenticateBoundRequestBody =
  | WalletAuthenticateBoundEncryptedRequestBody
  | WalletAuthenticateBoundUnencryptedRequestBody;

/**
 * Request body for creating an unencrypted, bound user signing key.
 */
export interface WalletAuthenticateBoundUnencryptedRequestBody {
  /**
   * Bindings that scope the USK. The key can only authorize the bound values.
   */
  bindings: Array<UserSigningKeyBinding>;

  user_jwt: string;
}

/**
 * The response from authenticating a wallet with intent bindings, containing an
 * authorization key, wallet data, and the bindings the key is scoped to.
 */
export type WalletAuthenticateIntentsResponse =
  | EncryptedBoundAuthenticateResponse
  | RawBoundAuthenticateResponse;

/**
 * Request body for wallet authentication with HPKE-encrypted response.
 */
export interface WalletAuthenticateRequestBody {
  /**
   * The encryption type for the authentication response. Currently only supports
   * HPKE.
   */
  encryption_type: 'HPKE';

  /**
   * The public key of your ECDH keypair, in base64-encoded, SPKI-format, whose
   * private key will be able to decrypt the session key.
   */
  recipient_public_key: string;

  /**
   * The user's JWT, to be used to authenticate the user.
   */
  user_jwt: string;
}

/**
 * The response from authenticating a wallet, containing an authorization key and
 * wallet data.
 */
export type WalletAuthenticateWithJwtResponse =
  | EncryptedWalletAuthenticateResponse
  | RawWalletAuthenticateResponse;

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
 * Response for a batch wallet creation request.
 */
export interface WalletBatchCreateResponse {
  /**
   * Array of results for each wallet creation request, in the same order as input.
   */
  results: Array<WalletBatchCreateResult>;
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
  additional_signers?: AdditionalSignerInput;

  /**
   * A human-readable label for the wallet.
   */
  display_name?: string;

  /**
   * A customer-provided identifier for mapping to external systems. URL-safe
   * characters only ([a-zA-Z0-9_-]), max 64 chars. Write-once: cannot be changed
   * after creation.
   */
  external_id?: string;

  /**
   * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
   * null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * The key quorum ID to set as the owner of the resource. If you provide this, do
   * not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * List of policy IDs for policies that should be enforced on the wallet.
   * Currently, only one policy is supported per wallet.
   */
  policy_ids?: Array<string>;
}

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
  | 'bitcoin-taproot'
  | 'pearl'
  | 'near'
  | 'ton'
  | 'starknet'
  | 'spark';

/**
 * The response from creating wallets with an associated recovery user.
 */
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
 * The entropy type of the wallet.
 */
export type WalletEntropyType = 'hd' | 'private-key';

/**
 * A named asset on Ethereum-compatible chains.
 */
export type WalletEthereumAsset =
  | 'usdc'
  | 'usdc.e'
  | 'eth'
  | 'avax'
  | 'pol'
  | 'bnb'
  | 'usdt'
  | 'eurc'
  | 'usdb';

/**
 * Request body for exporting a wallet private key.
 */
export interface WalletExportRequestBody {
  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  /**
   * The base64-encoded encryption public key to encrypt the wallet private key with.
   */
  recipient_public_key: string;

  export_seed_phrase?: boolean;
}

/**
 * Response body containing the encrypted wallet private key.
 */
export interface WalletExportResponseBody {
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
  encryption_type: HpkeEncryption;
}

/**
 * Response from initializing a wallet import, containing the encryption public
 * key.
 */
export interface WalletImportInitResponse {
  encryption_public_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;

  import_id?: string;
}

/**
 * The chain type of the wallet to import. Supports `ethereum`, `solana`,
 * `stellar`, `tron`, `sui`, and `aptos`.
 */
export type WalletImportSupportedChains = 'ethereum' | 'solana' | 'stellar' | 'tron' | 'sui' | 'aptos';

/**
 * The entropy type of the wallet to import. Supports `private-key` for raw private
 * keys and `hd` for HD wallet seed phrases.
 */
export type WalletImportSupportedEntropyTypes = 'private-key' | 'hd';

/**
 * The response body from revoking a wallet delegation.
 */
export interface WalletRevokeResponse {
  message: string;
}

/**
 * Request body for wallet RPC operations, discriminated by method.
 */
export type WalletRpcRequestBody =
  | EthereumSignTransactionRpcInput
  | EthereumSendTransactionRpcInput
  | EthereumPersonalSignRpcInput
  | EthereumSignTypedDataRpcInput
  | EthereumSecp256k1SignRpcInput
  | EthereumSign7702AuthorizationRpcInput
  | EthereumSignUserOperationRpcInput
  | EthereumSendCallsRpcInput
  | SolanaSignTransactionRpcInput
  | SolanaSignAndSendTransactionRpcInput
  | SolanaSignMessageRpcInput
  | SparkTransferRpcInput
  | SparkGetBalanceRpcInput
  | SparkTransferTokensRpcInput
  | SparkGetStaticDepositAddressRpcInput
  | SparkGetClaimStaticDepositQuoteRpcInput
  | SparkClaimStaticDepositRpcInput
  | SparkCreateLightningInvoiceRpcInput
  | SparkPayLightningInvoiceRpcInput
  | SparkSignMessageWithIdentityKeyRpcInput
  | SparkWithdrawRpcInput
  | SparkGetWithdrawalFeeQuoteRpcInput
  | TronSignTransactionRpcInput
  | TronSendTransactionRpcInput
  | ExportPrivateKeyRpcInput
  | ExportSeedPhraseRpcInput;

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
  | EthereumSendCallsRpcResponse
  | SolanaSignMessageRpcResponse
  | SolanaSignTransactionRpcResponse
  | SolanaSignAndSendTransactionRpcResponse
  | SparkTransferRpcResponse
  | SparkGetBalanceRpcResponse
  | SparkTransferTokensRpcResponse
  | SparkGetStaticDepositAddressRpcResponse
  | SparkGetClaimStaticDepositQuoteRpcResponse
  | SparkClaimStaticDepositRpcResponse
  | SparkCreateLightningInvoiceRpcResponse
  | SparkPayLightningInvoiceRpcResponse
  | SparkSignMessageWithIdentityKeyRpcResponse
  | SparkWithdrawRpcResponse
  | SparkGetWithdrawalFeeQuoteRpcResponse
  | TronSignTransactionRpcResponse
  | TronSendTransactionRpcResponse
  | ExportPrivateKeyRpcResponse
  | ExportSeedPhraseRpcResponse;

/**
 * A named asset on Solana.
 */
export type WalletSolanaAsset = 'sol' | 'usdc' | 'eurc' | 'usdb';

/**
 * A named asset on Tron.
 */
export type WalletTronAsset = 'trx' | 'usdt' | 'usdc';

/**
 * Request body for updating a wallet. `owner` and `owner_id` are mutually
 * exclusive.
 */
export interface WalletUpdateRequestBody {
  /**
   * Additional signers for the wallet.
   */
  additional_signers?: AdditionalSignerInput;

  /**
   * A human-readable label for the wallet. Set to null to clear.
   */
  display_name?: string | null;

  /**
   * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
   * null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * The key quorum ID to set as the owner of the resource. If you provide this, do
   * not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * New policy IDs to enforce on the wallet. Currently, only one policy is supported
   * per wallet.
   */
  policy_ids?: Array<string>;
}

export interface WalletInitImportResponse {
  /**
   * The base64-encoded encryption public key to encrypt the wallet entropy with.
   */
  encryption_public_key: string;

  /**
   * The encryption type of the wallet to import. Currently only supports `HPKE`.
   */
  encryption_type: HpkeEncryption;
}

export interface WalletCreateParams {
  /**
   * Body param: The wallet chain types.
   */
  chain_type: WalletChainType;

  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: AdditionalSignerInput;

  /**
   * Body param: A human-readable label for the wallet.
   */
  display_name?: string;

  /**
   * Body param: A customer-provided identifier for mapping to external systems.
   * URL-safe characters only ([a-zA-Z0-9_-]), max 64 chars. Write-once: cannot be
   * changed after creation.
   */
  external_id?: string;

  /**
   * Body param: The owner of the resource, specified as a Privy user ID, a P-256
   * public key, or null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * Body param: An optional list of up to one policy ID to enforce on the wallet.
   */
  policy_ids?: PolicyInput;

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;
}

export interface WalletListParams extends CursorParams {
  /**
   * A blockchain wallet address. Ethereum addresses are normalized to EIP-55
   * checksum format. Solana addresses are validated as base58. All other chain
   * addresses (Stellar, Tron, Sui, Aptos, etc.) are accepted as-is.
   */
  address?: Address;

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
   * Filter wallets by external ID.
   */
  external_id?: string;

  /**
   * Include archived wallets in lookup. Defaults to false.
   */
  include_archived?: boolean;

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
  encryption_type: HpkeEncryption;

  /**
   * Body param: The base64-encoded encryption public key to encrypt the wallet
   * private key with.
   */
  recipient_public_key: string;

  /**
   * Body param
   */
  export_seed_phrase?: boolean;

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
     * The chain type of the wallet to import. Supports `ethereum`, `solana`,
     * `stellar`, `tron`, `sui`, and `aptos`.
     */
    chain_type: WalletImportSupportedChains;

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: HpkeEncryption;

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
     * The chain type of the wallet to import. Supports `ethereum`, `solana`,
     * `stellar`, `tron`, `sui`, and `aptos`.
     */
    chain_type: WalletImportSupportedChains;

    /**
     * The encryption type of the wallet to import. Currently only supports `HPKE`.
     */
    encryption_type: HpkeEncryption;

    entropy_type: 'private-key';
  }
}

export interface WalletRawSignParams {
  /**
   * Body param: Parameters for the `raw_sign` RPC.
   */
  params: RawSignInputParams;

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

export type WalletRpcParams =
  | WalletRpcParams.EthereumSignTransactionRpcInput
  | WalletRpcParams.EthereumSendTransactionRpcInput
  | WalletRpcParams.EthereumPersonalSignRpcInput
  | WalletRpcParams.EthereumSignTypedDataRpcInput
  | WalletRpcParams.EthereumSecp256k1SignRpcInput
  | WalletRpcParams.EthereumSign7702AuthorizationRpcInput
  | WalletRpcParams.EthereumSignUserOperationRpcInput
  | WalletRpcParams.EthereumSendCallsRpcInput
  | WalletRpcParams.SolanaSignTransactionRpcInput
  | WalletRpcParams.SolanaSignAndSendTransactionRpcInput
  | WalletRpcParams.SolanaSignMessageRpcInput
  | WalletRpcParams.SparkTransferRpcInput
  | WalletRpcParams.SparkGetBalanceRpcInput
  | WalletRpcParams.SparkTransferTokensRpcInput
  | WalletRpcParams.SparkGetStaticDepositAddressRpcInput
  | WalletRpcParams.SparkGetClaimStaticDepositQuoteRpcInput
  | WalletRpcParams.SparkClaimStaticDepositRpcInput
  | WalletRpcParams.SparkCreateLightningInvoiceRpcInput
  | WalletRpcParams.SparkPayLightningInvoiceRpcInput
  | WalletRpcParams.SparkSignMessageWithIdentityKeyRpcInput
  | WalletRpcParams.SparkWithdrawRpcInput
  | WalletRpcParams.SparkGetWithdrawalFeeQuoteRpcInput
  | WalletRpcParams.TronSignTransactionRpcInput
  | WalletRpcParams.TronSendTransactionRpcInput
  | WalletRpcParams.ExportPrivateKeyRpcInput
  | WalletRpcParams.ExportSeedPhraseRpcInput;

export declare namespace WalletRpcParams {
  export interface EthereumSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTransaction';

    /**
     * Body param: Parameters for the EVM `eth_signTransaction` RPC.
     */
    params: EthereumSignTransactionRpcInputParams;

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
    wallet_id?: string;

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

  export interface EthereumSendTransactionRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'eth_sendTransaction';

    /**
     * Body param: Parameters for the EVM `eth_sendTransaction` RPC.
     */
    params: EthereumSendTransactionRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: A hex-encoded string prefixed with '0x', capped at 100002 characters
     * (50,000 bytes).
     */
    experimental_data_suffix?: Hex;

    /**
     * Body param
     */
    reference_id?: string;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

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

  export interface EthereumPersonalSignRpcInput {
    /**
     * Body param
     */
    method: 'personal_sign';

    /**
     * Body param: Parameters for the EVM `personal_sign` RPC.
     */
    params: EthereumPersonalSignRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2?: AppsAPI.Caip2;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: Options controlling signature production for personal_sign and
     * eth_signTypedData_v4.
     */
    signature_options?: SignatureOptions;

    /**
     * Body param
     */
    wallet_id?: string;

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

  export interface EthereumSignTypedDataRpcInput {
    /**
     * Body param
     */
    method: 'eth_signTypedData_v4';

    /**
     * Body param: Parameters for the EVM `eth_signTypedData_v4` RPC.
     */
    params: EthereumSignTypedDataRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2?: AppsAPI.Caip2;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: Options controlling signature production for personal_sign and
     * eth_signTypedData_v4.
     */
    signature_options?: SignatureOptions;

    /**
     * Body param
     */
    wallet_id?: string;

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

  export interface EthereumSecp256k1SignRpcInput {
    /**
     * Body param
     */
    method: 'secp256k1_sign';

    /**
     * Body param: Parameters for the EVM `secp256k1_sign` RPC.
     */
    params: EthereumSecp256k1SignRpcInputParams;

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
    wallet_id?: string;

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

  export interface EthereumSign7702AuthorizationRpcInput {
    /**
     * Body param
     */
    method: 'eth_sign7702Authorization';

    /**
     * Body param: Parameters for the EVM `eth_sign7702Authorization` RPC.
     */
    params: EthereumSign7702AuthorizationRpcInputParams;

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
    wallet_id?: string;

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

  export interface EthereumSignUserOperationRpcInput {
    /**
     * Body param
     */
    method: 'eth_signUserOperation';

    /**
     * Body param: Parameters for the EVM `eth_signUserOperation` RPC.
     */
    params: EthereumSignUserOperationRpcInputParams;

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
    wallet_id?: string;

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

  export interface EthereumSendCallsRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'wallet_sendCalls';

    /**
     * Body param: Parameters for the `wallet_sendCalls` RPC.
     */
    params: EthereumSendCallsRpcInputParams;

    /**
     * Body param
     */
    address?: string;

    /**
     * Body param
     */
    chain_type?: 'ethereum';

    /**
     * Body param: A hex-encoded string prefixed with '0x', capped at 100002 characters
     * (50,000 bytes).
     */
    experimental_data_suffix?: Hex;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

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

  export interface SolanaSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'signTransaction';

    /**
     * Body param: Parameters for the SVM `signTransaction` RPC.
     */
    params: SolanaSignTransactionRpcInputParams;

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
    wallet_id?: string;

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

  export interface SolanaSignAndSendTransactionRpcInput {
    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2: AppsAPI.Caip2;

    /**
     * Body param
     */
    method: 'signAndSendTransaction';

    /**
     * Body param: Parameters for the SVM `signAndSendTransaction` RPC.
     */
    params: SolanaSignAndSendTransactionRpcInputParams;

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
    optimistic_broadcast?: boolean;

    /**
     * Body param
     */
    reference_id?: string;

    /**
     * Body param
     */
    sponsor?: boolean;

    /**
     * Body param
     */
    wallet_id?: string;

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

  export interface SolanaSignMessageRpcInput {
    /**
     * Body param
     */
    method: 'signMessage';

    /**
     * Body param: Parameters for the SVM `signMessage` RPC.
     */
    params: SolanaSignMessageRpcInputParams;

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
    wallet_id?: string;

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

  export interface SparkTransferRpcInput {
    /**
     * Body param
     */
    method: 'transfer';

    /**
     * Body param: Parameters for the Spark `transfer` RPC.
     */
    params: SparkTransferRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkGetBalanceRpcInput {
    /**
     * Body param
     */
    method: 'getBalance';

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkTransferTokensRpcInput {
    /**
     * Body param
     */
    method: 'transferTokens';

    /**
     * Body param: Parameters for the Spark `transferTokens` RPC.
     */
    params: SparkTransferTokensRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkGetStaticDepositAddressRpcInput {
    /**
     * Body param
     */
    method: 'getStaticDepositAddress';

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkGetClaimStaticDepositQuoteRpcInput {
    /**
     * Body param
     */
    method: 'getClaimStaticDepositQuote';

    /**
     * Body param: Parameters for the Spark `getClaimStaticDepositQuote` RPC.
     */
    params: SparkGetClaimStaticDepositQuoteRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkClaimStaticDepositRpcInput {
    /**
     * Body param
     */
    method: 'claimStaticDeposit';

    /**
     * Body param: Parameters for the Spark `claimStaticDeposit` RPC.
     */
    params: SparkClaimStaticDepositRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkCreateLightningInvoiceRpcInput {
    /**
     * Body param
     */
    method: 'createLightningInvoice';

    /**
     * Body param: Parameters for the Spark `createLightningInvoice` RPC.
     */
    params: SparkCreateLightningInvoiceRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkPayLightningInvoiceRpcInput {
    /**
     * Body param
     */
    method: 'payLightningInvoice';

    /**
     * Body param: Parameters for the Spark `payLightningInvoice` RPC.
     */
    params: SparkPayLightningInvoiceRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkSignMessageWithIdentityKeyRpcInput {
    /**
     * Body param
     */
    method: 'signMessageWithIdentityKey';

    /**
     * Body param: Parameters for the Spark `signMessageWithIdentityKey` RPC.
     */
    params: SparkSignMessageWithIdentityKeyRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkWithdrawRpcInput {
    /**
     * Body param
     */
    method: 'withdraw';

    /**
     * Body param: Parameters for the Spark `withdraw` RPC.
     */
    params: SparkWithdrawRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface SparkGetWithdrawalFeeQuoteRpcInput {
    /**
     * Body param
     */
    method: 'getWithdrawalFeeQuote';

    /**
     * Body param: Parameters for the Spark `getWithdrawalFeeQuote` RPC.
     */
    params: SparkGetWithdrawalFeeQuoteRpcInputParams;

    /**
     * Body param: The Spark network.
     */
    network?: SparkNetwork;

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

  export interface TronSignTransactionRpcInput {
    /**
     * Body param
     */
    method: 'tron_signTransaction';

    /**
     * Body param: Parameters for the Tron `tron_signTransaction` RPC.
     */
    params: TronSignTransactionRpcInputParams;

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

  export interface TronSendTransactionRpcInput {
    /**
     * Body param
     */
    method: 'tron_sendTransaction';

    /**
     * Body param: Parameters for the Tron `tron_sendTransaction` RPC.
     */
    params: TronSendTransactionRpcInputParams;

    /**
     * Body param: A valid CAIP-2 chain ID (e.g. 'eip155:1').
     */
    caip2?: AppsAPI.Caip2;

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

  export interface ExportPrivateKeyRpcInput {
    /**
     * Body param
     */
    address: string;

    /**
     * Body param
     */
    method: 'exportPrivateKey';

    /**
     * Body param: Input for exporting a wallet (private key or seed phrase) with HPKE
     * encryption.
     */
    params: PrivateKeyExportInput;

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

  export interface ExportSeedPhraseRpcInput {
    /**
     * Body param
     */
    address: string;

    /**
     * Body param
     */
    method: 'exportSeedPhrase';

    /**
     * Body param: Input for exporting a wallet (private key or seed phrase) with HPKE
     * encryption.
     */
    params: SeedPhraseExportInput;

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
}

export interface WalletSubmitImportParams {
  /**
   * The submission input for importing an HD wallet.
   */
  wallet: HDSubmitInput | PrivateKeySubmitInput;

  /**
   * Additional signers for the wallet.
   */
  additional_signers?: AdditionalSignerInput;

  /**
   * A human-readable label for the wallet.
   */
  display_name?: string;

  /**
   * A customer-provided identifier for mapping to external systems. URL-safe
   * characters only ([a-zA-Z0-9_-]), max 64 chars. Write-once: cannot be changed
   * after creation.
   */
  external_id?: string;

  /**
   * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
   * null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * The key quorum ID to set as the owner of the resource. If you provide this, do
   * not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

  /**
   * An optional list of up to one policy ID to enforce on the wallet.
   */
  policy_ids?: PolicyInput;
}

export interface WalletTransferParams {
  /**
   * Body param: The destination address for a token transfer. Optionally specify a
   * different asset or chain for cross-asset or cross-chain transfers.
   */
  destination: TokenTransferDestination;

  /**
   * Body param: The source asset, amount, and chain for a token transfer. Specify
   * either `asset` (named) or `asset_address` (custom), not both.
   */
  source: TokenTransferSource;

  /**
   * Body param: Amount as a decimal string in the token's standard unit (e.g. "1.5"
   * for 1.5 USDC). For exact_input, the amount to send. For exact_output, the exact
   * amount to receive. Takes precedence over source.amount when both are provided.
   */
  amount?: string;

  /**
   * Body param: Whether the amount refers to the input token or output token.
   */
  amount_type?: AmountType;

  /**
   * Body param: Total fees assessed on a transfer, in BPS
   */
  fee_configuration?: FeeConfiguration;

  /**
   * Body param: Maximum allowed slippage in basis points (1 bps = 0.01%). Only
   * applicable for cross-chain or cross-asset transfers; omit to use the provider
   * default.
   */
  slippage_bps?: number;

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

export interface WalletUpdateParams {
  /**
   * Body param: Additional signers for the wallet.
   */
  additional_signers?: AdditionalSignerInput;

  /**
   * Body param: A human-readable label for the wallet. Set to null to clear.
   */
  display_name?: string | null;

  /**
   * Body param: The owner of the resource, specified as a Privy user ID, a P-256
   * public key, or null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;

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

export interface WalletAuthenticateWithJwtParams {
  /**
   * The encryption type for the authentication response. Currently only supports
   * HPKE.
   */
  encryption_type: 'HPKE';

  /**
   * The public key of your ECDH keypair, in base64-encoded, SPKI-format, whose
   * private key will be able to decrypt the session key.
   */
  recipient_public_key: string;

  /**
   * The user's JWT, to be used to authenticate the user.
   */
  user_jwt: string;
}

export interface WalletCreateBatchParams {
  /**
   * Array of wallet creation requests. Minimum 1, maximum 100.
   */
  wallets: Array<WalletBatchItemInput>;
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
    linked_accounts: Array<UsersAPI.LinkedAccountEmailInput | UsersAPI.LinkedAccountCustomJwtInput>;
  }

  export interface Wallet {
    /**
     * The wallet chain types.
     */
    chain_type: WalletsAPI.WalletChainType;

    /**
     * A human-readable label for the wallet.
     */
    display_name?: string;

    /**
     * A customer-provided identifier for mapping to external systems. URL-safe
     * characters only ([a-zA-Z0-9_-]), max 64 chars. Write-once: cannot be changed
     * after creation.
     */
    external_id?: string;

    /**
     * An optional list of up to one policy ID to enforce on the wallet.
     */
    policy_ids?: WalletsAPI.PolicyInput;
  }
}

export interface WalletGetParams {
  /**
   * Include archived wallets in lookup. Defaults to false.
   */
  include_archived?: boolean;
}

export interface WalletGetWalletByAddressParams {
  /**
   * A blockchain wallet address. Ethereum addresses are normalized to EIP-55
   * checksum format. Solana addresses are validated as base58. All other chain
   * addresses (Stellar, Tron, Sui, Aptos, etc.) are accepted as-is.
   */
  address: Address;

  /**
   * Include archived wallets in lookup. Defaults to false (archived wallets return
   * 404).
   */
  include_archived?: boolean;
}

Wallets.Actions = Actions;
Wallets.Earn = Earn;
Wallets.Transactions = Transactions;
Wallets.Balance = Balance;
Wallets.Swap = Swap;

export declare namespace Wallets {
  export {
    type AccessListEntry as AccessListEntry,
    type AdditionalSignerInput as AdditionalSignerInput,
    type AdditionalSignerItemInput as AdditionalSignerItemInput,
    type Address as Address,
    type AdvancedSwapPlatformFee as AdvancedSwapPlatformFee,
    type AdvancedSwapRequestBody as AdvancedSwapRequestBody,
    type AdvancedSwapResponse as AdvancedSwapResponse,
    type AmountType as AmountType,
    type AuthorizationKeyDashboardResponse as AuthorizationKeyDashboardResponse,
    type AuthorizationKeyResponse as AuthorizationKeyResponse,
    type AuthorizationKeyRole as AuthorizationKeyRole,
    type CurveSigningChainType as CurveSigningChainType,
    type CurveType as CurveType,
    type CustodialWallet as CustodialWallet,
    type CustodialWalletChainType as CustodialWalletChainType,
    type CustodialWalletCreateInput as CustodialWalletCreateInput,
    type CustodialWalletProvider as CustodialWalletProvider,
    type CustomTokenTransferSource as CustomTokenTransferSource,
    type DeveloperFee as DeveloperFee,
    type EncryptedAuthorizationKey as EncryptedAuthorizationKey,
    type EncryptedBoundAuthenticateResponse as EncryptedBoundAuthenticateResponse,
    type EncryptedWalletAuthenticateResponse as EncryptedWalletAuthenticateResponse,
    type EthereumPersonalSignRpcInput as EthereumPersonalSignRpcInput,
    type EthereumPersonalSignRpcInputParams as EthereumPersonalSignRpcInputParams,
    type EthereumPersonalSignRpcResponse as EthereumPersonalSignRpcResponse,
    type EthereumPersonalSignRpcResponseData as EthereumPersonalSignRpcResponseData,
    type EthereumRpcInput as EthereumRpcInput,
    type EthereumRpcResponse as EthereumRpcResponse,
    type EthereumSecp256k1SignRpcInput as EthereumSecp256k1SignRpcInput,
    type EthereumSecp256k1SignRpcInputParams as EthereumSecp256k1SignRpcInputParams,
    type EthereumSecp256k1SignRpcResponse as EthereumSecp256k1SignRpcResponse,
    type EthereumSecp256k1SignRpcResponseData as EthereumSecp256k1SignRpcResponseData,
    type EthereumSendCallsCall as EthereumSendCallsCall,
    type EthereumSendCallsRpcInput as EthereumSendCallsRpcInput,
    type EthereumSendCallsRpcInputParams as EthereumSendCallsRpcInputParams,
    type EthereumSendCallsRpcResponse as EthereumSendCallsRpcResponse,
    type EthereumSendCallsRpcResponseData as EthereumSendCallsRpcResponseData,
    type EthereumSendTransactionRpcInput as EthereumSendTransactionRpcInput,
    type EthereumSendTransactionRpcInputParams as EthereumSendTransactionRpcInputParams,
    type EthereumSendTransactionRpcResponse as EthereumSendTransactionRpcResponse,
    type EthereumSendTransactionRpcResponseData as EthereumSendTransactionRpcResponseData,
    type EthereumSign7702Authorization as EthereumSign7702Authorization,
    type EthereumSign7702AuthorizationRpcInput as EthereumSign7702AuthorizationRpcInput,
    type EthereumSign7702AuthorizationRpcInputParams as EthereumSign7702AuthorizationRpcInputParams,
    type EthereumSign7702AuthorizationRpcResponse as EthereumSign7702AuthorizationRpcResponse,
    type EthereumSign7702AuthorizationRpcResponseData as EthereumSign7702AuthorizationRpcResponseData,
    type EthereumSignTransactionRpcInput as EthereumSignTransactionRpcInput,
    type EthereumSignTransactionRpcInputParams as EthereumSignTransactionRpcInputParams,
    type EthereumSignTransactionRpcResponse as EthereumSignTransactionRpcResponse,
    type EthereumSignTransactionRpcResponseData as EthereumSignTransactionRpcResponseData,
    type EthereumSignTypedDataRpcInput as EthereumSignTypedDataRpcInput,
    type EthereumSignTypedDataRpcInputParams as EthereumSignTypedDataRpcInputParams,
    type EthereumSignTypedDataRpcResponse as EthereumSignTypedDataRpcResponse,
    type EthereumSignTypedDataRpcResponseData as EthereumSignTypedDataRpcResponseData,
    type EthereumSignUserOperationRpcInput as EthereumSignUserOperationRpcInput,
    type EthereumSignUserOperationRpcInputParams as EthereumSignUserOperationRpcInputParams,
    type EthereumSignUserOperationRpcResponse as EthereumSignUserOperationRpcResponse,
    type EthereumSignUserOperationRpcResponseData as EthereumSignUserOperationRpcResponseData,
    type EthereumTypedDataInput as EthereumTypedDataInput,
    type ExportPrivateKeyRpcInput as ExportPrivateKeyRpcInput,
    type ExportPrivateKeyRpcResponse as ExportPrivateKeyRpcResponse,
    type ExportSeedPhraseRpcInput as ExportSeedPhraseRpcInput,
    type ExportSeedPhraseRpcResponse as ExportSeedPhraseRpcResponse,
    type ExportType as ExportType,
    type ExtendedChainType as ExtendedChainType,
    type FeeConfiguration as FeeConfiguration,
    type FeeLineItem as FeeLineItem,
    type FirstClassChainType as FirstClassChainType,
    type Gas as Gas,
    type GetByWalletAddressRequestBody as GetByWalletAddressRequestBody,
    type HDInitInput as HDInitInput,
    type HDPath as HDPath,
    type HDSubmitInput as HDSubmitInput,
    type HpkeAeadAlgorithm as HpkeAeadAlgorithm,
    type HpkeEncryption as HpkeEncryption,
    type HpkeImportConfig as HpkeImportConfig,
    type Hex as Hex,
    type IntentBinding as IntentBinding,
    type NamedTokenTransferSource as NamedTokenTransferSource,
    type OutputWithPreviousTransactionData as OutputWithPreviousTransactionData,
    type PolicyInput as PolicyInput,
    type PrivateKeyExportInput as PrivateKeyExportInput,
    type PrivateKeyExportResponse as PrivateKeyExportResponse,
    type PrivateKeyInitInput as PrivateKeyInitInput,
    type PrivateKeySubmitInput as PrivateKeySubmitInput,
    type PrivyFee as PrivyFee,
    type Quantity as Quantity,
    type RawBoundAuthenticateResponse as RawBoundAuthenticateResponse,
    type RawSignBytesEncoding as RawSignBytesEncoding,
    type RawSignBytesHashFunction as RawSignBytesHashFunction,
    type RawSignBytesParams as RawSignBytesParams,
    type RawSignHashParams as RawSignHashParams,
    type RawSignInput as RawSignInput,
    type RawSignInputParams as RawSignInputParams,
    type RawSignResponse as RawSignResponse,
    type RawSignResponseData as RawSignResponseData,
    type RawWalletAuthenticateResponse as RawWalletAuthenticateResponse,
    type RecipientPublicKey as RecipientPublicKey,
    type RelayerFee as RelayerFee,
    type SeedPhraseExportInput as SeedPhraseExportInput,
    type SeedPhraseExportResponse as SeedPhraseExportResponse,
    type SignatureOptions as SignatureOptions,
    type SignatureType as SignatureType,
    type SigningAlgorithm as SigningAlgorithm,
    type SolanaRpcInput as SolanaRpcInput,
    type SolanaRpcResponse as SolanaRpcResponse,
    type SolanaSignAndSendTransactionRpcInput as SolanaSignAndSendTransactionRpcInput,
    type SolanaSignAndSendTransactionRpcInputParams as SolanaSignAndSendTransactionRpcInputParams,
    type SolanaSignAndSendTransactionRpcResponse as SolanaSignAndSendTransactionRpcResponse,
    type SolanaSignAndSendTransactionRpcResponseData as SolanaSignAndSendTransactionRpcResponseData,
    type SolanaSignMessageRpcInput as SolanaSignMessageRpcInput,
    type SolanaSignMessageRpcInputParams as SolanaSignMessageRpcInputParams,
    type SolanaSignMessageRpcResponse as SolanaSignMessageRpcResponse,
    type SolanaSignMessageRpcResponseData as SolanaSignMessageRpcResponseData,
    type SolanaSignTransactionRpcInput as SolanaSignTransactionRpcInput,
    type SolanaSignTransactionRpcInputParams as SolanaSignTransactionRpcInputParams,
    type SolanaSignTransactionRpcResponse as SolanaSignTransactionRpcResponse,
    type SolanaSignTransactionRpcResponseData as SolanaSignTransactionRpcResponseData,
    type SolanaWalletDerivationStrategy as SolanaWalletDerivationStrategy,
    type SparkBalance as SparkBalance,
    type SparkClaimStaticDepositRpcInput as SparkClaimStaticDepositRpcInput,
    type SparkClaimStaticDepositRpcInputParams as SparkClaimStaticDepositRpcInputParams,
    type SparkClaimStaticDepositRpcResponse as SparkClaimStaticDepositRpcResponse,
    type SparkClaimStaticDepositRpcResponseData as SparkClaimStaticDepositRpcResponseData,
    type SparkCoopExitFeeQuote as SparkCoopExitFeeQuote,
    type SparkCoopExitRequest as SparkCoopExitRequest,
    type SparkCreateLightningInvoiceRpcInput as SparkCreateLightningInvoiceRpcInput,
    type SparkCreateLightningInvoiceRpcInputParams as SparkCreateLightningInvoiceRpcInputParams,
    type SparkCreateLightningInvoiceRpcResponse as SparkCreateLightningInvoiceRpcResponse,
    type SparkCurrencyAmount as SparkCurrencyAmount,
    type SparkExitSpeed as SparkExitSpeed,
    type SparkGetBalanceRpcInput as SparkGetBalanceRpcInput,
    type SparkGetBalanceRpcResponse as SparkGetBalanceRpcResponse,
    type SparkGetClaimStaticDepositQuoteRpcInput as SparkGetClaimStaticDepositQuoteRpcInput,
    type SparkGetClaimStaticDepositQuoteRpcInputParams as SparkGetClaimStaticDepositQuoteRpcInputParams,
    type SparkGetClaimStaticDepositQuoteRpcResponse as SparkGetClaimStaticDepositQuoteRpcResponse,
    type SparkGetClaimStaticDepositQuoteRpcResponseData as SparkGetClaimStaticDepositQuoteRpcResponseData,
    type SparkGetStaticDepositAddressRpcInput as SparkGetStaticDepositAddressRpcInput,
    type SparkGetStaticDepositAddressRpcResponse as SparkGetStaticDepositAddressRpcResponse,
    type SparkGetStaticDepositAddressRpcResponseData as SparkGetStaticDepositAddressRpcResponseData,
    type SparkGetWithdrawalFeeQuoteRpcInput as SparkGetWithdrawalFeeQuoteRpcInput,
    type SparkGetWithdrawalFeeQuoteRpcInputParams as SparkGetWithdrawalFeeQuoteRpcInputParams,
    type SparkGetWithdrawalFeeQuoteRpcResponse as SparkGetWithdrawalFeeQuoteRpcResponse,
    type SparkLightningFee as SparkLightningFee,
    type SparkLightningReceiveRequest as SparkLightningReceiveRequest,
    type SparkLightningSendRequest as SparkLightningSendRequest,
    type SparkNetwork as SparkNetwork,
    type SparkOutputSelectionStrategy as SparkOutputSelectionStrategy,
    type SparkPayLightningInvoiceRpcInput as SparkPayLightningInvoiceRpcInput,
    type SparkPayLightningInvoiceRpcInputParams as SparkPayLightningInvoiceRpcInputParams,
    type SparkPayLightningInvoiceRpcResponse as SparkPayLightningInvoiceRpcResponse,
    type SparkRpcInput as SparkRpcInput,
    type SparkRpcResponse as SparkRpcResponse,
    type SparkSignMessageWithIdentityKeyRpcInput as SparkSignMessageWithIdentityKeyRpcInput,
    type SparkSignMessageWithIdentityKeyRpcInputParams as SparkSignMessageWithIdentityKeyRpcInputParams,
    type SparkSignMessageWithIdentityKeyRpcResponse as SparkSignMessageWithIdentityKeyRpcResponse,
    type SparkSignMessageWithIdentityKeyRpcResponseData as SparkSignMessageWithIdentityKeyRpcResponseData,
    type SparkSigningKeyshare as SparkSigningKeyshare,
    type SparkTokenBalance as SparkTokenBalance,
    type SparkTransfer as SparkTransfer,
    type SparkTransferLeaf as SparkTransferLeaf,
    type SparkTransferRpcInput as SparkTransferRpcInput,
    type SparkTransferRpcInputParams as SparkTransferRpcInputParams,
    type SparkTransferRpcResponse as SparkTransferRpcResponse,
    type SparkTransferTokensRpcInput as SparkTransferTokensRpcInput,
    type SparkTransferTokensRpcInputParams as SparkTransferTokensRpcInputParams,
    type SparkTransferTokensRpcResponse as SparkTransferTokensRpcResponse,
    type SparkTransferTokensRpcResponseData as SparkTransferTokensRpcResponseData,
    type SparkUserTokenMetadata as SparkUserTokenMetadata,
    type SparkWalletLeaf as SparkWalletLeaf,
    type SparkWithdrawRpcInput as SparkWithdrawRpcInput,
    type SparkWithdrawRpcInputParams as SparkWithdrawRpcInputParams,
    type SparkWithdrawRpcResponse as SparkWithdrawRpcResponse,
    type SuiCommandName as SuiCommandName,
    type SwapSubmissionStatus as SwapSubmissionStatus,
    type TempoAaAuthorization as TempoAaAuthorization,
    type TempoCall as TempoCall,
    type TempoFeePayerSignature as TempoFeePayerSignature,
    type TokenOutput as TokenOutput,
    type TokenTransferDestination as TokenTransferDestination,
    type TokenTransferSource as TokenTransferSource,
    type TotalFeeConfigurationBps as TotalFeeConfigurationBps,
    type TransactionChainNameInput as TransactionChainNameInput,
    type TransactionDetail as TransactionDetail,
    type TransactionTokenAddressInput as TransactionTokenAddressInput,
    type TransferQuoteRequestBody as TransferQuoteRequestBody,
    type TransferQuoteResponse as TransferQuoteResponse,
    type TransferReceivedTransactionDetail as TransferReceivedTransactionDetail,
    type TransferRequestBody as TransferRequestBody,
    type TransferSentTransactionDetail as TransferSentTransactionDetail,
    type TronContract as TronContract,
    type TronRawDataForSend as TronRawDataForSend,
    type TronRawDataForSign as TronRawDataForSign,
    type TronRpcInput as TronRpcInput,
    type TronRpcResponse as TronRpcResponse,
    type TronSendTransactionRpcInput as TronSendTransactionRpcInput,
    type TronSendTransactionRpcInputParams as TronSendTransactionRpcInputParams,
    type TronSendTransactionRpcResponse as TronSendTransactionRpcResponse,
    type TronSendTransactionRpcResponseData as TronSendTransactionRpcResponseData,
    type TronSignTransactionRpcInput as TronSignTransactionRpcInput,
    type TronSignTransactionRpcInputParams as TronSignTransactionRpcInputParams,
    type TronSignTransactionRpcResponse as TronSignTransactionRpcResponse,
    type TronSignTransactionRpcResponseData as TronSignTransactionRpcResponseData,
    type TronTransferContract as TronTransferContract,
    type TronTriggerSmartContract as TronTriggerSmartContract,
    type TypedDataDomainInputParams as TypedDataDomainInputParams,
    type TypedDataTypeFieldInput as TypedDataTypeFieldInput,
    type TypedDataTypesInputParams as TypedDataTypesInputParams,
    type UnsignedEthereumTransaction as UnsignedEthereumTransaction,
    type UnsignedStandardEthereumTransaction as UnsignedStandardEthereumTransaction,
    type UnsignedTempoTransaction as UnsignedTempoTransaction,
    type UserOperationInput as UserOperationInput,
    type UserSigningKeyBinding as UserSigningKeyBinding,
    type Wallet as Wallet,
    type WalletAdditionalSigner as WalletAdditionalSigner,
    type WalletAdditionalSignerItem as WalletAdditionalSignerItem,
    type WalletAPIRegisterAuthorizationKeyInput as WalletAPIRegisterAuthorizationKeyInput,
    type WalletAPIRevokeAuthorizationKeyInput as WalletAPIRevokeAuthorizationKeyInput,
    type WalletAsset as WalletAsset,
    type WalletAssetChainNameInput as WalletAssetChainNameInput,
    type WalletAuthenticateBoundEncryptedRequestBody as WalletAuthenticateBoundEncryptedRequestBody,
    type WalletAuthenticateBoundRequestBody as WalletAuthenticateBoundRequestBody,
    type WalletAuthenticateBoundUnencryptedRequestBody as WalletAuthenticateBoundUnencryptedRequestBody,
    type WalletAuthenticateIntentsResponse as WalletAuthenticateIntentsResponse,
    type WalletAuthenticateRequestBody as WalletAuthenticateRequestBody,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletAuthorizationHeaders as WalletAuthorizationHeaders,
    type WalletBatchCreateInput as WalletBatchCreateInput,
    type WalletBatchCreateResponse as WalletBatchCreateResponse,
    type WalletBatchCreateResult as WalletBatchCreateResult,
    type WalletBatchItemInput as WalletBatchItemInput,
    type WalletChainType as WalletChainType,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletCustodian as WalletCustodian,
    type WalletEntropyType as WalletEntropyType,
    type WalletEthereumAsset as WalletEthereumAsset,
    type WalletExportRequestBody as WalletExportRequestBody,
    type WalletExportResponseBody as WalletExportResponseBody,
    type WalletImportInitResponse as WalletImportInitResponse,
    type WalletImportSupportedChains as WalletImportSupportedChains,
    type WalletImportSupportedEntropyTypes as WalletImportSupportedEntropyTypes,
    type WalletRevokeResponse as WalletRevokeResponse,
    type WalletRpcRequestBody as WalletRpcRequestBody,
    type WalletRpcResponse as WalletRpcResponse,
    type WalletSolanaAsset as WalletSolanaAsset,
    type WalletTronAsset as WalletTronAsset,
    type WalletUpdateRequestBody as WalletUpdateRequestBody,
    type WalletInitImportResponse as WalletInitImportResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletListParams as WalletListParams,
    type WalletExportParams as WalletExportParams,
    type WalletInitImportParams as WalletInitImportParams,
    type WalletRawSignParams as WalletRawSignParams,
    type WalletRpcParams as WalletRpcParams,
    type WalletSubmitImportParams as WalletSubmitImportParams,
    type WalletTransferParams as WalletTransferParams,
    type WalletUpdateParams as WalletUpdateParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateBatchParams as WalletCreateBatchParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
    type WalletGetParams as WalletGetParams,
    type WalletGetWalletByAddressParams as WalletGetWalletByAddressParams,
  };

  export {
    Actions as Actions,
    type AaveVaultDetails as AaveVaultDetails,
    type CustodianTransactionWalletActionStep as CustodianTransactionWalletActionStep,
    type CustodianTransactionWalletActionStepStatus as CustodianTransactionWalletActionStepStatus,
    type EvmTransactionWalletActionStep as EvmTransactionWalletActionStep,
    type EvmUserOperationEntrypointVersion as EvmUserOperationEntrypointVersion,
    type EvmUserOperationWalletActionStep as EvmUserOperationWalletActionStep,
    type EvmWalletActionStepStatus as EvmWalletActionStepStatus,
    type EarnAsset as EarnAsset,
    type EarnDepositActionResponse as EarnDepositActionResponse,
    type EarnDepositRequestBody as EarnDepositRequestBody,
    type EarnFeeCollectActionResponse as EarnFeeCollectActionResponse,
    type EarnFeeCollectRequestBody as EarnFeeCollectRequestBody,
    type EarnIncentiveClaimActionResponse as EarnIncentiveClaimActionResponse,
    type EarnIncentiveClaimRequestBody as EarnIncentiveClaimRequestBody,
    type EarnIncentiveRewardEntry as EarnIncentiveRewardEntry,
    type EarnIncentiveRewardsQuery as EarnIncentiveRewardsQuery,
    type EarnIncentiveRewardsResponse as EarnIncentiveRewardsResponse,
    type EarnIncetiveClaimRewardEntry as EarnIncetiveClaimRewardEntry,
    type EarnWithdrawActionResponse as EarnWithdrawActionResponse,
    type EarnWithdrawRequestBody as EarnWithdrawRequestBody,
    type EthereumEarnPositionQuery as EthereumEarnPositionQuery,
    type EthereumEarnPositionResponse as EthereumEarnPositionResponse,
    type EthereumEarnProvider as EthereumEarnProvider,
    type EthereumEarnVaultDetailsResponse as EthereumEarnVaultDetailsResponse,
    type ExternalTransactionWalletActionStep as ExternalTransactionWalletActionStep,
    type ExternalTransactionWalletActionStepStatus as ExternalTransactionWalletActionStepStatus,
    type FailureReason as FailureReason,
    type ListWalletActionsQuery as ListWalletActionsQuery,
    type ListWalletActionsResponse as ListWalletActionsResponse,
    type MorphoVaultDetails as MorphoVaultDetails,
    type SvmTransactionWalletActionStep as SvmTransactionWalletActionStep,
    type SvmWalletActionStepStatus as SvmWalletActionStepStatus,
    type SwapActionResponse as SwapActionResponse,
    type TvmTransactionWalletActionStep as TvmTransactionWalletActionStep,
    type TvmWalletActionStepStatus as TvmWalletActionStepStatus,
    type TransferActionResponse as TransferActionResponse,
    type VedaVaultDetails as VedaVaultDetails,
    type WalletActionInclude as WalletActionInclude,
    type WalletActionResponse as WalletActionResponse,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStep as WalletActionStep,
    type WalletActionStepType as WalletActionStepType,
    type WalletActionType as WalletActionType,
    type ActionGetParams as ActionGetParams,
  };

  export { Earn as Earn };

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

  export {
    Swap as Swap,
    type SwapExecuteParams as SwapExecuteParams,
    type SwapQuoteParams as SwapQuoteParams,
  };
}
