// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ActionsAPI from './actions';
import * as FiatAPI from '../fiat';
import * as SharedAPI from '../shared';
import * as WalletsAPI from './wallets';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to wallet actions
 */
export class Actions extends APIResource {
  /**
   * Get the current status of a wallet action by its ID. Use `?include=steps` to
   * include step-level details.
   *
   * @example
   * ```ts
   * const walletActionResponse =
   *   await client.wallets.actions.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { wallet_id: 'wallet_id' },
   *   );
   * ```
   */
  get(actionID: string, params: ActionGetParams, options?: RequestOptions): APIPromise<WalletActionResponse> {
    const { wallet_id, 'privy-authorization-signature': privyAuthorizationSignature, ...query } = params;
    return this._client.get(path`/v1/wallets/${wallet_id}/actions/${actionID}`, {
      query,
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
}

/**
 * Vault details for an Aave earn vault, including fee visibility.
 */
export interface AaveVaultDetails {
  /**
   * Vault identifier.
   */
  id: string;

  /**
   * EVM address of the vault admin wallet.
   */
  admin_wallet_address: string;

  /**
   * Privy wallet ID of the vault admin.
   */
  admin_wallet_id: string;

  /**
   * Annual percentage yield earned by the app from vault fees, in basis points.
   */
  app_apy: number | null;

  /**
   * Asset metadata for an earn vault position.
   */
  asset: EarnAsset;

  /**
   * Fees available to collect, in smallest unit of the underlying asset.
   */
  available_fees: string;

  /**
   * Available liquidity in USD.
   */
  available_liquidity_usd: number | null;

  /**
   * CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:8453" for Base).
   */
  caip2: string;

  /**
   * Human-readable vault name from the yield provider.
   */
  name: string;

  provider: 'aave';

  /**
   * Total value locked in USD.
   */
  tvl_usd: number | null;

  /**
   * Annual percentage yield available to the user, after fees and excluding rewards,
   * in basis points (e.g. 500 for 5%). 1 basis point = 0.01%.
   */
  user_apy: number | null;

  /**
   * Onchain vault contract address.
   */
  vault_address: string;
}

/**
 * A wallet action step representing a transaction executed by a custodian (e.g.
 * Bridge).
 */
export interface CustodianTransactionWalletActionStep {
  /**
   * Identifier of the custodian executing this transaction (e.g. "bridge").
   */
  custodian: string;

  /**
   * Status of a custodian transaction step in a wallet action.
   */
  status: CustodianTransactionWalletActionStepStatus;

  /**
   * Identifier of the transaction the custodian last reported on the destination
   * chain. Set on a settled transfer, and also on a failed one when the custodian
   * had already broadcast a payout that was later returned. Null until the custodian
   * reports one.
   */
  transaction_hash: string | null;

  type: 'custodian_transaction';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;
}

/**
 * Status of a custodian transaction step in a wallet action.
 */
export type CustodianTransactionWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'custodian_reviewing'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'failed';

/**
 * A wallet action step consisting of an EVM transaction.
 */
export interface EvmTransactionWalletActionStep {
  /**
   * CAIP-2 chain identifier of the transaction, containing the chain ID.
   */
  caip2: string;

  /**
   * Status of an EVM step in a wallet action.
   */
  status: EvmWalletActionStepStatus;

  /**
   * The transaction hash for this step. May change while the step status is
   * non-terminal.
   */
  transaction_hash: string | null;

  type: 'evm_transaction';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Whether this step has reached on-chain finality. Absent until finality is
   * confirmed.
   */
  finalized?: boolean;

  /**
   * A monetary value with its currency denomination.
   */
  gas_credits_charged?: SharedAPI.CurrencyAmount | null;

  /**
   * @deprecated Deprecated, use `gas_credits_charged` instead; gas credits charged
   * in USD for this step, if sponsored, as a decimal string.
   */
  gas_credits_charged_usd?: string | null;
}

/**
 * The ERC-4337 entrypoint contract version used by the user operation.
 */
export type EvmUserOperationEntrypointVersion = '0.6' | '0.7' | '0.8' | '0.9';

/**
 * A wallet action step consisting of an EVM user operation.
 */
export interface EvmUserOperationWalletActionStep {
  /**
   * Transaction hash of the bundle in which this user operation was included. Null
   * until included by a bundler.
   */
  bundle_transaction_hash: string | null;

  /**
   * CAIP-2 network identifier, containing the chain ID of the user operation.
   */
  caip2: string;

  /**
   * The ERC-4337 entrypoint contract version used by the user operation.
   */
  entrypoint_version: EvmUserOperationEntrypointVersion;

  /**
   * Status of an EVM step in a wallet action.
   */
  status: EvmWalletActionStepStatus;

  type: 'evm_user_operation';

  /**
   * The user operation hash for this step. May change while the step status is
   * non-terminal.
   */
  user_operation_hash: string | null;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Whether this step has reached on-chain finality. Absent until finality is
   * confirmed.
   */
  finalized?: boolean;

  /**
   * A monetary value with its currency denomination.
   */
  gas_credits_charged?: SharedAPI.CurrencyAmount | null;

  /**
   * @deprecated Deprecated, use `gas_credits_charged` instead; gas credits charged
   * in USD for this step, if sponsored, as a decimal string.
   */
  gas_credits_charged_usd?: string | null;
}

/**
 * Status of an EVM step in a wallet action.
 */
export type EvmWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'retrying'
  | 'confirmed'
  | 'rejected'
  | 'reverted'
  | 'replaced'
  | 'abandoned';

/**
 * Asset metadata for an earn vault position.
 */
export interface EarnAsset {
  /**
   * Token contract address.
   */
  address: string;

  /**
   * Number of decimals for the asset (e.g. 6 for USDC).
   */
  decimals: number;

  /**
   * Lowercase token symbol (e.g. "usdc").
   */
  symbol: string;
}

/**
 * Response for an earn deposit action.
 */
export interface EarnDepositActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset deposited (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * Vault shares received in base units. Populated after on-chain confirmation.
   */
  share_amount: string | null;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'earn_deposit';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset deposited (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Input for depositing assets into an ERC-4626 vault. Exactly one of `amount` or
 * `raw_amount` must be provided.
 */
export interface EarnDepositRequestBody {
  /**
   * The ID of the vault to deposit into.
   */
  vault_id: string;

  /**
   * Human-readable decimal amount to deposit (e.g. "1.5" for 1.5 USDC). Exactly one
   * of `amount` or `raw_amount` must be provided.
   */
  amount?: string;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Amount in smallest unit to deposit (e.g. "1500000" for 1.5 USDC with 6
   * decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * Response for an earn fee collect action.
 */
export interface EarnFeeCollectActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of fees collected (e.g. "1500000"). Populated after on-chain
   * confirmation.
   */
  raw_amount: string | null;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'earn_fee_collect';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of fees collected (e.g. "1.5"). Omitted when the
   * token is not in the asset registry. Null while the action is pending; populated
   * after on-chain confirmation.
   */
  amount?: string | null;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Input for collecting accumulated fees from an Aave vault.
 */
export interface EarnFeeCollectRequestBody {
  /**
   * The ID of the vault to collect fees from.
   */
  vault_id: string;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * Response for an earn incentive claim action.
 */
export interface EarnIncentiveClaimActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * EVM chain name (e.g. "tempo", "base").
   */
  chain: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Claimed reward tokens. Populated after the preparation step fetches from Merkl.
   */
  rewards: Array<EarnIncetiveClaimRewardEntry> | null;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'earn_incentive_claim';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Input for claiming incentive rewards.
 */
export interface EarnIncentiveClaimRequestBody {
  /**
   * The blockchain network on which to perform the incentive claim. Supported chains
   * include: 'tempo', 'ethereum', 'base', 'arbitrum', 'polygon', 'solana', and more,
   * along with their respective testnets.
   */
  chain: string;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * A reward token with claimed and unclaimed amounts.
 */
export interface EarnIncentiveRewardEntry {
  /**
   * Total amount already claimed, in smallest unit.
   */
  amount_claimed: string;

  /**
   * Amount available to claim on-chain but not yet claimed, in smallest unit.
   */
  amount_unclaimed: string;

  /**
   * Address of the reward token.
   */
  token_address: string;

  /**
   * Symbol of the reward token (e.g. "MORPHO").
   */
  token_symbol: string;

  /**
   * Number of decimals for the reward token.
   */
  token_decimals?: number;
}

/**
 * Query parameters for fetching incentive rewards.
 */
export interface EarnIncentiveRewardsQuery {
  /**
   * Chain name to fetch rewards for (e.g. "tempo", "base").
   */
  chain: string;
}

/**
 * All incentive rewards for a wallet, with claimed and unclaimed amounts per
 * token.
 */
export interface EarnIncentiveRewardsResponse {
  /**
   * Reward tokens with their claimed and unclaimed amounts.
   */
  rewards: Array<EarnIncentiveRewardEntry>;
}

/**
 * A specific reward token and amount associated with an earn incentive claim.
 */
export interface EarnIncetiveClaimRewardEntry {
  /**
   * Claimable amount in base units.
   */
  amount: string;

  /**
   * Address of the reward token.
   */
  token_address: string;

  /**
   * Symbol of the reward token (e.g. "MORPHO").
   */
  token_symbol: string;

  /**
   * Number of decimal places for the reward token.
   */
  token_decimals?: number;
}

/**
 * An APY allocation within a vault position.
 */
export interface EarnPositionApyAllocation {
  /**
   * Net APY in basis points, rounded to the nearest integer.
   */
  apy_bps: number;

  /**
   * Allocated assets in the smallest unit of the underlying asset.
   */
  assets_in_vault: string;

  /**
   * Whether an APY allocation earns the base or boosted rate.
   */
  type: EarnPositionApyType;
}

/**
 * Whether an APY allocation earns the base or boosted rate.
 */
export type EarnPositionApyType = 'boost' | 'base';

/**
 * Response for an earn withdraw action.
 */
export interface EarnWithdrawActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Base-unit amount of asset withdrawn (e.g. "1500000").
   */
  raw_amount: string;

  /**
   * Vault shares burned in base units. Populated after on-chain confirmation.
   */
  share_amount: string | null;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'earn_withdraw';

  /**
   * ERC-4626 vault contract address.
   */
  vault_address: string;

  /**
   * The vault ID.
   */
  vault_id: string;

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Human-readable decimal amount of asset withdrawn (e.g. "1.5"). Only present when
   * the token is known in the asset registry.
   */
  amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Only present when the token is known in
   * the asset registry.
   */
  asset?: string;

  /**
   * Number of decimals for the underlying asset (e.g. 6 for USDC, 18 for ETH). Only
   * present when the token is known in the asset registry.
   */
  decimals?: number;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Input for withdrawing assets from an ERC-4626 vault. Exactly one of `amount` or
 * `raw_amount` must be provided.
 */
export interface EarnWithdrawRequestBody {
  /**
   * The ID of the vault to withdraw from.
   */
  vault_id: string;

  /**
   * Human-readable decimal amount to withdraw (e.g. "1.5" for 1.5 USDC). Exactly one
   * of `amount` or `raw_amount` must be provided.
   */
  amount?: string;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Amount in smallest unit to withdraw (e.g. "1500000" for 1.5 USDC with 6
   * decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * Query parameters for fetching an earn vault position.
 */
export interface EthereumEarnPositionQuery {
  /**
   * The vault ID to get position for.
   */
  vault_id: string;

  /**
   * Include archived wallets in lookup. Defaults to false.
   */
  include_archived?: boolean;
}

/**
 * A wallet's position in an earn vault.
 */
export interface EthereumEarnPositionResponse {
  /**
   * Asset metadata for an earn vault position.
   */
  asset: EarnAsset;

  /**
   * Current asset value in the vault (realtime from ERC-4626), in smallest unit.
   */
  assets_in_vault: string;

  /**
   * Current vault shares held (realtime from ERC-4626).
   */
  shares_in_vault: string;

  /**
   * Total amount deposited into the vault, in smallest unit.
   */
  total_deposited: string;

  /**
   * Total amount withdrawn from the vault, in smallest unit.
   */
  total_withdrawn: string;

  /**
   * Vault APY allocations by origin, returned together with apy_bps when available.
   */
  apy_allocation?: Array<EarnPositionApyAllocation>;

  /**
   * Wallet-specific net APY in basis points, rounded to the nearest integer.
   * Returned together with apy_allocation when available.
   */
  apy_bps?: number;
}

/**
 * Supported earn provider protocols.
 */
export type EthereumEarnProvider = 'morpho' | 'aave' | 'veda' | 'tempo';

/**
 * Detailed vault information including current APY, liquidity, and asset metadata.
 * Discriminated on provider.
 */
export type EthereumEarnVaultDetailsResponse =
  | AaveVaultDetails
  | MorphoVaultDetails
  | TempoVaultDetails
  | VedaVaultDetails;

/**
 * External provider that fills an external transaction step.
 */
export type ExternalTransactionStepProvider = 'relay' | 'tempo_routes' | 'bridge' | (string & {});

/**
 * A wallet action step representing a cross-chain/cross-asset fill by an external
 * provider.
 */
export interface ExternalTransactionWalletActionStep {
  /**
   * External provider that fills an external transaction step.
   */
  provider: ExternalTransactionStepProvider | null;

  /**
   * Status of an external transaction step in a wallet action.
   */
  status: ExternalTransactionWalletActionStepStatus;

  type: 'external_transaction';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;
}

/**
 * Status of an external transaction step in a wallet action.
 */
export type ExternalTransactionWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'failed';

/**
 * A description of why a wallet action (or a step within a wallet action) failed.
 */
export interface FailureReason {
  /**
   * Human-readable failure message.
   */
  message: string;

  /**
   * Additional error details, if available.
   */
  details?: unknown;
}

/**
 * Query parameters for listing wallet actions.
 */
export interface ListWalletActionsQuery {
  /**
   * Cursor returned by the previous page.
   */
  cursor?: string;

  limit?: number;

  /**
   * Type of wallet action
   */
  type?: WalletActionType;
}

/**
 * Paginated list of wallet actions.
 */
export interface ListWalletActionsResponse {
  data: Array<WalletActionResponse>;

  next_cursor: string | null;
}

/**
 * Vault details for a Morpho earn vault.
 */
export interface MorphoVaultDetails {
  /**
   * Vault identifier.
   */
  id: string;

  /**
   * EVM address of the vault admin wallet.
   */
  admin_wallet_address: string;

  /**
   * Privy wallet ID of the vault admin.
   */
  admin_wallet_id: string;

  /**
   * Annual percentage yield earned by the app from vault fees, in basis points.
   */
  app_apy: number | null;

  /**
   * Asset metadata for an earn vault position.
   */
  asset: EarnAsset;

  /**
   * Available liquidity in USD.
   */
  available_liquidity_usd: number | null;

  /**
   * CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:8453" for Base).
   */
  caip2: string;

  /**
   * Human-readable vault name from the yield provider.
   */
  name: string;

  provider: 'morpho';

  /**
   * Total rewards annual percentage rate in basis points.
   */
  total_rewards_apr: number;

  /**
   * Total value locked in USD.
   */
  tvl_usd: number | null;

  /**
   * Annual percentage yield available to the user, after fees and excluding rewards,
   * in basis points (e.g. 500 for 5%). 1 basis point = 0.01%.
   */
  user_apy: number | null;

  /**
   * Onchain vault contract address.
   */
  vault_address: string;
}

/**
 * A payout wallet action. Crypto is sent on-chain to a liquidation address that
 * offramps to the destination bank account.
 */
export interface PayoutResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * The destination bank account for a payout.
   */
  destination: FiatAPI.PayoutDestination;

  /**
   * A developer fee as a percentage string from 0 up to (not including) 100, e.g.
   * "1.5" for 1.5%.
   */
  developer_fee_percent: FiatAPI.DeveloperFeePercent;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Supported fiat orchestration providers.
   */
  provider: SharedAPI.OrchestrationProvider;

  /**
   * The source crypto asset, chain, and amount for a payout.
   */
  source: FiatAPI.PayoutSource;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'payout';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * A wallet action step consisting of an SVM (Solana) transaction.
 */
export interface SvmTransactionWalletActionStep {
  /**
   * CAIP-2 chain identifier for the Solana network.
   */
  caip2: string;

  /**
   * Status of an SVM step in a wallet action.
   */
  status: SvmWalletActionStepStatus;

  /**
   * The Solana transaction signature (base58-encoded). Null until broadcast.
   */
  transaction_signature: string | null;

  type: 'svm_transaction';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Whether this step has reached on-chain finality. Absent until finality is
   * confirmed.
   */
  finalized?: boolean;

  /**
   * A monetary value with its currency denomination.
   */
  gas_credits_charged?: SharedAPI.CurrencyAmount | null;

  /**
   * @deprecated Deprecated, use `gas_credits_charged` instead; gas credits charged
   * in USD for this step, if sponsored, as a decimal string.
   */
  gas_credits_charged_usd?: string | null;
}

/**
 * Status of an SVM step in a wallet action.
 */
export type SvmWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'reverted'
  | 'failed';

/**
 * Response for a swap action.
 */
export interface SwapActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * CAIP-2 chain identifier for the swap.
   */
  caip2: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Exact base-unit amount of input token. Populated after on-chain confirmation.
   */
  input_amount: string | null;

  /**
   * Token address or "native" for the token being sold.
   */
  input_token: string;

  /**
   * Exact base-unit amount of output token. Populated after on-chain confirmation.
   */
  output_amount: string | null;

  /**
   * Token address or "native" for the token being bought.
   */
  output_token: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'swap';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Recipient address for the swap. Present for newly created swaps; may be absent
   * for older swap actions.
   */
  destination_address?: string;

  /**
   * Destination chain CAIP-2 identifier. Present for cross-chain swaps.
   */
  destination_caip2?: string;

  /**
   * Estimated fee breakdown from the provider quote. Only present for cross-chain
   * swaps. Populated after on-chain confirmation.
   */
  estimated_fees?: Array<WalletsAPI.FeeLineItem> | null;

  /**
   * Gas cost for a blockchain action. Includes both raw base-unit amount and a
   * human-readable decimal string, plus the gas token symbol.
   */
  estimated_gas?: WalletsAPI.Gas | null;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Actual fees paid for the swap. Populated after on-chain confirmation. Only
   * present for cross-chain swaps.
   */
  fees?: Array<WalletsAPI.FeeLineItem> | null;

  /**
   * Gas cost for a blockchain action. Includes both raw base-unit amount and a
   * human-readable decimal string, plus the gas token symbol.
   */
  gas?: WalletsAPI.Gas | null;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * A wallet action step consisting of a TVM (Tron) transaction.
 */
export interface TvmTransactionWalletActionStep {
  /**
   * CAIP-2 chain identifier for the Tron network.
   */
  caip2: string;

  /**
   * Status of a TVM (Tron) step in a wallet action.
   */
  status: TvmWalletActionStepStatus;

  /**
   * The Tron transaction ID. Null until broadcast.
   */
  transaction_id: string | null;

  type: 'tvm_transaction';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * A monetary value with its currency denomination.
   */
  gas_credits_charged?: SharedAPI.CurrencyAmount | null;

  /**
   * @deprecated Deprecated, use `gas_credits_charged` instead; gas credits charged
   * in USD for this step, if sponsored, as a decimal string.
   */
  gas_credits_charged_usd?: string | null;
}

/**
 * Status of a TVM (Tron) step in a wallet action.
 */
export type TvmWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'reverted'
  | 'failed';

/**
 * Vault details for a Tempo earn vault.
 */
export interface TempoVaultDetails {
  /**
   * Vault identifier.
   */
  id: string;

  /**
   * EVM address of the vault admin wallet.
   */
  admin_wallet_address: string;

  /**
   * Privy wallet ID of the vault admin, or null when the Tempo vault admin is not
   * Privy-managed.
   */
  admin_wallet_id: string | null;

  /**
   * Annual percentage yield earned by the app from vault fees, in basis points.
   */
  app_apy: number | null;

  /**
   * Asset metadata for an earn vault position.
   */
  asset: EarnAsset;

  /**
   * Available liquidity in USD.
   */
  available_liquidity_usd: number | null;

  /**
   * CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:8453" for Base).
   */
  caip2: string;

  /**
   * Human-readable vault name from the yield provider.
   */
  name: string;

  provider: 'tempo';

  /**
   * Total value locked in USD.
   */
  tvl_usd: number | null;

  /**
   * Annual percentage yield available to the user, after fees and excluding rewards,
   * in basis points (e.g. 500 for 5%). 1 basis point = 0.01%.
   */
  user_apy: number | null;

  /**
   * Onchain vault contract address.
   */
  vault_address: string;
}

/**
 * A wallet action step representing a Tempo Zone settlement on its parent chain.
 */
export interface TempoZoneSettlementWalletActionStep {
  /**
   * CAIP-2 identifier of the Tempo parent chain, or null when unavailable.
   */
  caip2: string | null;

  /**
   * Status of an external transaction step in a wallet action.
   */
  status: ExternalTransactionWalletActionStepStatus;

  /**
   * A hex-encoded string prefixed with '0x', capped at 300002 characters (150,000
   * bytes).
   */
  transaction_hash: WalletsAPI.Hex | null;

  type: 'tempo_zone_settlement';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;
}

/**
 * Chain the fund is held on, e.g. "ethereum_sepolia".
 */
export type TmmfChain = string;

/**
 * Currency symbol, e.g. "USDC". Case-insensitive.
 */
export type TmmfCurrency = string;

/**
 * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
 */
export type TmmfDecimalAmount = string;

/**
 * A tokenized money market fund (tMMF) deposit.
 */
export interface TmmfDepositActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'tmmf_deposit';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Request body for buying tMMF shares with a currency the wallet holds.
 */
export interface TmmfDepositRequestBody {
  /**
   * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
   */
  amount: TmmfDecimalAmount;

  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * Currency symbol, e.g. "USDC". Case-insensitive.
   */
  deposit_asset: TmmfCurrency;

  /**
   * Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: TmmfFund;

  /**
   * How a tMMF order fills: `secondary` from the provider pool in minutes, or
   * `primary` at the next NAV strike.
   */
  order_type: TmmfOrderType;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * Fund ticker, e.g. "WTGXX". Case-insensitive.
 */
export type TmmfFund = string;

/**
 * A tMMF purchase or redemption wallet action, discriminated on type.
 */
export type TmmfOrderActionResponse = TmmfDepositActionResponse | TmmfWithdrawActionResponse;

/**
 * How a tMMF order fills: `secondary` from the provider pool in minutes, or
 * `primary` at the next NAV strike.
 */
export type TmmfOrderType = 'primary' | 'secondary';

/**
 * A wallet's position in one fund on one chain. Fields read from the provider are
 * null when that call fails.
 */
export interface TmmfPosition {
  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: TmmfFund;

  /**
   * Publication date of the NAV, e.g. "2026-09-25", or null without one or when the
   * provider call fails.
   */
  nav_date: string | null;

  /**
   * Latest published NAV per share in USD, or null when the provider call fails.
   */
  nav_usd: string | null;

  /**
   * Accrued, undistributed income in USD that is not yet spendable, or null when the
   * provider call fails.
   */
  pending_dividends_usd: string | null;

  /**
   * Wallet actions for purchases and redemptions that are still pending.
   */
  pending_orders: Array<TmmfOrderActionResponse>;

  /**
   * Start date of the open accrual period, e.g. "2026-09-01", or null without one or
   * when the provider call fails.
   */
  pending_since: string | null;

  /**
   * The fund provider.
   */
  provider: TmmfProvider;

  /**
   * `shares` valued at `nav_usd`, or null when the provider call fails.
   */
  share_value_usd: string | null;

  /**
   * Fund shares held on-chain by the wallet.
   */
  shares: string;

  /**
   * Estimated share value plus available pending dividends, excluding settlement
   * currency and in-transit assets; null without NAV.
   */
  total_position_value_usd: string | null;
}

/**
 * A page of a wallet's tMMF positions for all providers: one per fund and chain
 * the wallet is registered for.
 */
export interface TmmfPositionResponse {
  /**
   * Cursor of the next page of positions, or null on the last page.
   */
  next_cursor: string | null;

  /**
   * A page of the wallet's positions, one per registered fund and chain.
   */
  positions: Array<TmmfPosition>;

  /**
   * ID of the Privy wallet holding the positions.
   */
  wallet_id: string;
}

/**
 * The fund provider.
 */
export type TmmfProvider = 'wisdomtree' | (string & {});

/**
 * A registered wallet's status with its tMMF provider, read live from the
 * provider.
 */
export type TmmfProviderWalletStatus = 'created' | 'approved' | 'rejected' | (string & {});

/**
 * Request body for registering a wallet with a tMMF provider for the wallet's
 * user, e.g. an organization.
 */
export interface TmmfRegisterRequestBody {
  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * The fund provider.
   */
  provider: TmmfProvider;
}

/**
 * A user's registration status with a tMMF provider, read live from the provider.
 */
export type TmmfRegistrationStatus =
  | 'pending'
  | 'action_required'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | (string & {});

/**
 * A user's registration with one tMMF provider.
 */
export interface TmmfUserRegistration {
  /**
   * The fund provider.
   */
  provider: TmmfProvider;

  /**
   * A user's registration status with a tMMF provider, read live from the provider.
   */
  status: TmmfRegistrationStatus;
}

/**
 * A user's registration with each tMMF provider, and the wallets registered for
 * each.
 */
export interface TmmfUserResponse {
  /**
   * ID of the Privy user, which can be an organization.
   */
  user_id: string;

  /**
   * The user's registrations with tMMF providers.
   */
  user_registrations: Array<TmmfUserRegistration>;

  /**
   * A page of wallets registered for the user with tMMF providers.
   */
  wallet_registrations: Array<TmmfUserWalletResponse>;

  /**
   * Cursor of the next page of wallet registrations, or null on the last page.
   */
  wallets_next_cursor: string | null;
}

/**
 * A wallet registered for a user with a provider on one chain.
 */
export interface TmmfUserWalletResponse {
  /**
   * Blockchain address of the registered wallet.
   */
  address: string;

  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * The fund provider.
   */
  provider: TmmfProvider;

  /**
   * A registered wallet's status with its tMMF provider, read live from the
   * provider.
   */
  status: TmmfProviderWalletStatus | null;

  /**
   * ID of the registered Privy wallet.
   */
  wallet_id: string;
}

/**
 * A Privy wallet registered for a user with one tMMF provider on one chain.
 */
export interface TmmfWalletResponse {
  /**
   * Blockchain address of the registered wallet.
   */
  address: string;

  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * Unix timestamp in milliseconds when the wallet registration was created.
   */
  created_at: number;

  /**
   * The fund provider.
   */
  provider: TmmfProvider;

  /**
   * A registered wallet's status with its tMMF provider, read live from the
   * provider.
   */
  status: TmmfProviderWalletStatus | null;

  /**
   * Unix timestamp in milliseconds when the wallet registration was last updated.
   */
  updated_at: number;

  /**
   * ID of the Privy user the wallet is registered for.
   */
  user_id: string;

  /**
   * ID of the Privy wallet registered to trade and hold fund shares.
   */
  wallet_id: string;
}

/**
 * A tokenized money market fund (tMMF) withdrawal.
 */
export interface TmmfWithdrawActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'tmmf_withdraw';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Request body for redeeming tMMF shares the wallet holds.
 */
export interface TmmfWithdrawRequestBody {
  /**
   * Chain the fund is held on, e.g. "ethereum_sepolia".
   */
  chain: TmmfChain;

  /**
   * Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: TmmfFund;

  /**
   * How a tMMF order fills: `secondary` from the provider pool in minutes, or
   * `primary` at the next NAV strike.
   */
  order_type: TmmfOrderType;

  /**
   * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
   */
  shares: TmmfDecimalAmount;

  /**
   * Currency symbol, e.g. "USDC". Case-insensitive.
   */
  withdraw_asset: TmmfCurrency;

  /**
   * Unique caller-generated nonce used to prevent replaying a signed wallet action
   * request. Must be at least 24 characters (e.g. a cuid2 or UUID).
   */
  nonce?: WalletsAPI.WalletActionNonce;

  /**
   * Developer-provided identifier for this request. Must be unique per app.
   */
  reference_id?: string;
}

/**
 * Response for a transfer action.
 */
export interface TransferActionResponse {
  /**
   * The ID of the wallet action.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the wallet action was created.
   */
  created_at: string;

  /**
   * Recipient address.
   */
  destination_address: string;

  /**
   * Amount received on the destination chain. For exact_output cross-chain
   * transfers, set at creation (the guaranteed exact amount). For exact_input
   * cross-chain transfers, null until fill confirmation.
   */
  destination_amount: string | null;

  /**
   * Chain name (e.g. "tempo", "base").
   */
  source_chain: string;

  /**
   * Status of a wallet action.
   */
  status: WalletActionStatus;

  type: 'transfer';

  /**
   * The ID of the wallet involved in the action.
   */
  wallet_id: string;

  /**
   * Whether the amount refers to the input token or output token.
   */
  amount_type?: WalletsAPI.AmountType;

  /**
   * Destination asset for cross-asset transfers. Omitted for same-asset transfers.
   */
  destination_asset?: string;

  /**
   * Destination chain for cross-chain transfers. Omitted for same-chain transfers.
   */
  destination_chain?: string;

  /**
   * Estimated fee breakdown from the provider quote. Only present for cross-chain or
   * cross-asset transfers. Populated after on-chain confirmation.
   */
  estimated_fees?: Array<WalletsAPI.FeeLineItem> | null;

  /**
   * Gas cost for a blockchain action. Includes both raw base-unit amount and a
   * human-readable decimal string, plus the gas token symbol.
   */
  estimated_gas?: WalletsAPI.Gas | null;

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * Actual fees paid for the transfer. Populated after on-chain confirmation. Only
   * present for cross-chain transfers.
   */
  fees?: Array<WalletsAPI.FeeLineItem> | null;

  /**
   * Gas cost for a blockchain action. Includes both raw base-unit amount and a
   * human-readable decimal string, plus the gas token symbol.
   */
  gas?: WalletsAPI.Gas | null;

  /**
   * Developer-provided reference ID, if one was included in the request.
   */
  reference_id?: string | null;

  /**
   * Decimal amount sent on the source chain (e.g. "1.5"). For exact_output
   * cross-chain transfers, null until fill confirmation.
   */
  source_amount?: string;

  /**
   * Asset identifier (e.g. "usdc", "eth"). Present when the transfer was initiated
   * with a named asset; omitted for custom-token transfers.
   */
  source_asset?: string;

  /**
   * Token contract address (EVM) or mint address (Solana). Present when the transfer
   * was initiated with `asset_address`.
   */
  source_asset_address?: string;

  /**
   * Number of decimals for the transferred token. Present when the transfer was
   * initiated with `asset_address` and the decimals were resolved on-chain.
   */
  source_asset_decimals?: number;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
}

/**
 * Vault details for a Veda (BoringVault) earn vault.
 */
export interface VedaVaultDetails {
  /**
   * Vault identifier.
   */
  id: string;

  /**
   * EVM address of the vault admin wallet.
   */
  admin_wallet_address: string;

  /**
   * Privy wallet ID of the vault admin.
   */
  admin_wallet_id: string;

  /**
   * Annual percentage yield earned by the app from vault fees, in basis points.
   */
  app_apy: number | null;

  /**
   * Asset metadata for an earn vault position.
   */
  asset: EarnAsset;

  /**
   * Available liquidity in USD.
   */
  available_liquidity_usd: number | null;

  /**
   * CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:8453" for Base).
   */
  caip2: string;

  /**
   * Human-readable vault name from the yield provider.
   */
  name: string;

  provider: 'veda';

  /**
   * Total value locked in USD.
   */
  tvl_usd: number | null;

  /**
   * Annual percentage yield available to the user, after fees and excluding rewards,
   * in basis points (e.g. 500 for 5%). 1 basis point = 0.01%.
   */
  user_apy: number | null;

  /**
   * Onchain vault contract address.
   */
  vault_address: string;
}

/**
 * Expandable relations to include on a wallet action response.
 */
export type WalletActionInclude = 'steps';

/**
 * Response for a wallet action, discriminated on type.
 */
export type WalletActionResponse =
  | SwapActionResponse
  | TransferActionResponse
  | EarnDepositActionResponse
  | EarnWithdrawActionResponse
  | EarnIncentiveClaimActionResponse
  | EarnFeeCollectActionResponse
  | PayoutResponse
  | TmmfDepositActionResponse
  | TmmfWithdrawActionResponse;

/**
 * Status of a wallet action.
 */
export type WalletActionStatus = 'pending' | 'succeeded' | 'rejected' | 'failed';

/**
 * A step within a wallet action, representing a single onchain action.
 */
export type WalletActionStep =
  | EvmTransactionWalletActionStep
  | EvmUserOperationWalletActionStep
  | SvmTransactionWalletActionStep
  | TvmTransactionWalletActionStep
  | ExternalTransactionWalletActionStep
  | CustodianTransactionWalletActionStep
  | TempoZoneSettlementWalletActionStep
  | WisdomTreeSettlementWalletActionStep;

/**
 * Type of a wallet action step.
 */
export type WalletActionStepType =
  | 'evm_transaction'
  | 'evm_user_operation'
  | 'svm_transaction'
  | 'tvm_transaction'
  | 'external_transaction'
  | 'custodian_transaction'
  | 'tempo_zone_settlement'
  | 'wisdomtree_settlement'
  | (string & {});

/**
 * Type of wallet action
 */
export type WalletActionType =
  | 'swap'
  | 'transfer'
  | 'earn_deposit'
  | 'earn_withdraw'
  | 'earn_incentive_claim'
  | 'earn_fee_collect'
  | 'payout'
  | 'tmmf_deposit'
  | 'tmmf_withdraw'
  | (string & {});

/**
 * An amount of the currency a tMMF deposit sends.
 */
export interface WisdomTreeSettlementDepositAssetAmount {
  /**
   * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
   */
  amount: TmmfDecimalAmount;

  /**
   * Currency symbol, e.g. "USDC". Case-insensitive.
   */
  deposit_asset: TmmfCurrency;
}

/**
 * An amount of fund shares a tMMF order sends or receives.
 */
export interface WisdomTreeSettlementFundAmount {
  /**
   * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
   */
  amount: TmmfDecimalAmount;

  /**
   * Fund ticker, e.g. "WTGXX". Case-insensitive.
   */
  fund: TmmfFund;
}

/**
 * What a tMMF order receives: fund shares for a deposit, the withdraw asset for a
 * withdrawal.
 */
export type WisdomTreeSettlementReceivedAmount =
  | WisdomTreeSettlementFundAmount
  | WisdomTreeSettlementWithdrawAssetAmount;

/**
 * What a tMMF order sends: the deposit asset for a deposit, fund shares for a
 * withdrawal.
 */
export type WisdomTreeSettlementRequestedAmount =
  | WisdomTreeSettlementDepositAssetAmount
  | WisdomTreeSettlementFundAmount;

/**
 * A wallet action step representing the settlement of a tokenized money market
 * fund (tMMF) order by WisdomTree.
 */
export interface WisdomTreeSettlementWalletActionStep {
  /**
   * CAIP-2 identifier of the chain the order trades on.
   */
  caip2: string | null;

  /**
   * How a tMMF order fills: `secondary` from the provider pool in minutes, or
   * `primary` at the next NAV strike.
   */
  order_type: TmmfOrderType | null;

  /**
   * What a tMMF order receives: fund shares for a deposit, the withdraw asset for a
   * withdrawal.
   */
  received: WisdomTreeSettlementWalletActionStep.Received;

  /**
   * What a tMMF order sends: the deposit asset for a deposit, fund shares for a
   * withdrawal.
   */
  requested: WisdomTreeSettlementWalletActionStep.Requested;

  /**
   * The transaction that delivered the received asset. Null until Privy verifies the
   * settlement.
   */
  settlement_transaction_hash: string | null;

  /**
   * Status of a WisdomTree settlement step in a wallet action.
   */
  status: WisdomTreeSettlementWalletActionStepStatus;

  type: 'wisdomtree_settlement';

  /**
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;
}

export namespace WisdomTreeSettlementWalletActionStep {
  /**
   * What a tMMF order receives: fund shares for a deposit, the withdraw asset for a
   * withdrawal.
   */
  export type Received = ActionsAPI.WisdomTreeSettlementReceivedAmount & {};

  /**
   * What a tMMF order sends: the deposit asset for a deposit, fund shares for a
   * withdrawal.
   */
  export type Requested = ActionsAPI.WisdomTreeSettlementRequestedAmount & {};
}

/**
 * Status of a WisdomTree settlement step in a wallet action.
 */
export type WisdomTreeSettlementWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'failed'
  | (string & {});

/**
 * An amount of the currency a tMMF withdrawal receives.
 */
export interface WisdomTreeSettlementWithdrawAssetAmount {
  /**
   * A positive decimal amount in the asset's standard unit, e.g. "1000.00".
   */
  amount: TmmfDecimalAmount;

  /**
   * Currency symbol, e.g. "USDC". Case-insensitive.
   */
  withdraw_asset: TmmfCurrency;
}

export interface ActionGetParams {
  /**
   * Path param: ID of the wallet.
   */
  wallet_id: string;

  /**
   * Query param: Expandable relations to include on a wallet action response.
   */
  include?: WalletActionInclude;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace Actions {
  export {
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
    type EarnPositionApyAllocation as EarnPositionApyAllocation,
    type EarnPositionApyType as EarnPositionApyType,
    type EarnWithdrawActionResponse as EarnWithdrawActionResponse,
    type EarnWithdrawRequestBody as EarnWithdrawRequestBody,
    type EthereumEarnPositionQuery as EthereumEarnPositionQuery,
    type EthereumEarnPositionResponse as EthereumEarnPositionResponse,
    type EthereumEarnProvider as EthereumEarnProvider,
    type EthereumEarnVaultDetailsResponse as EthereumEarnVaultDetailsResponse,
    type ExternalTransactionStepProvider as ExternalTransactionStepProvider,
    type ExternalTransactionWalletActionStep as ExternalTransactionWalletActionStep,
    type ExternalTransactionWalletActionStepStatus as ExternalTransactionWalletActionStepStatus,
    type FailureReason as FailureReason,
    type ListWalletActionsQuery as ListWalletActionsQuery,
    type ListWalletActionsResponse as ListWalletActionsResponse,
    type MorphoVaultDetails as MorphoVaultDetails,
    type PayoutResponse as PayoutResponse,
    type SvmTransactionWalletActionStep as SvmTransactionWalletActionStep,
    type SvmWalletActionStepStatus as SvmWalletActionStepStatus,
    type SwapActionResponse as SwapActionResponse,
    type TvmTransactionWalletActionStep as TvmTransactionWalletActionStep,
    type TvmWalletActionStepStatus as TvmWalletActionStepStatus,
    type TempoVaultDetails as TempoVaultDetails,
    type TempoZoneSettlementWalletActionStep as TempoZoneSettlementWalletActionStep,
    type TmmfChain as TmmfChain,
    type TmmfCurrency as TmmfCurrency,
    type TmmfDecimalAmount as TmmfDecimalAmount,
    type TmmfDepositActionResponse as TmmfDepositActionResponse,
    type TmmfDepositRequestBody as TmmfDepositRequestBody,
    type TmmfFund as TmmfFund,
    type TmmfOrderActionResponse as TmmfOrderActionResponse,
    type TmmfOrderType as TmmfOrderType,
    type TmmfPosition as TmmfPosition,
    type TmmfPositionResponse as TmmfPositionResponse,
    type TmmfProvider as TmmfProvider,
    type TmmfProviderWalletStatus as TmmfProviderWalletStatus,
    type TmmfRegisterRequestBody as TmmfRegisterRequestBody,
    type TmmfRegistrationStatus as TmmfRegistrationStatus,
    type TmmfUserRegistration as TmmfUserRegistration,
    type TmmfUserResponse as TmmfUserResponse,
    type TmmfUserWalletResponse as TmmfUserWalletResponse,
    type TmmfWalletResponse as TmmfWalletResponse,
    type TmmfWithdrawActionResponse as TmmfWithdrawActionResponse,
    type TmmfWithdrawRequestBody as TmmfWithdrawRequestBody,
    type TransferActionResponse as TransferActionResponse,
    type VedaVaultDetails as VedaVaultDetails,
    type WalletActionInclude as WalletActionInclude,
    type WalletActionResponse as WalletActionResponse,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStep as WalletActionStep,
    type WalletActionStepType as WalletActionStepType,
    type WalletActionType as WalletActionType,
    type WisdomTreeSettlementDepositAssetAmount as WisdomTreeSettlementDepositAssetAmount,
    type WisdomTreeSettlementFundAmount as WisdomTreeSettlementFundAmount,
    type WisdomTreeSettlementReceivedAmount as WisdomTreeSettlementReceivedAmount,
    type WisdomTreeSettlementRequestedAmount as WisdomTreeSettlementRequestedAmount,
    type WisdomTreeSettlementWalletActionStep as WisdomTreeSettlementWalletActionStep,
    type WisdomTreeSettlementWalletActionStepStatus as WisdomTreeSettlementWalletActionStepStatus,
    type WisdomTreeSettlementWithdrawAssetAmount as WisdomTreeSettlementWithdrawAssetAmount,
    type ActionGetParams as ActionGetParams,
  };
}
