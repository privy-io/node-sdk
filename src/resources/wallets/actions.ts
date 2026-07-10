// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   * Annual percentage yield earned by the app from fee wrapper fees, in basis
   * points.
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
   * CAIP-2 chain identifier (e.g. "eip155:8453").
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
   * Amount charged in USD for gas sponsorship on this step.
   */
  gas_credits_charged_usd?: string;
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
   * Amount in smallest unit to deposit (e.g. "1500000" for 1.5 USDC with 6
   * decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;
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
   * EVM chain name (e.g. "base", "ethereum").
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
   * include: 'ethereum', 'base', 'arbitrum', 'polygon', 'solana', and more, along
   * with their respective testnets.
   */
  chain: string;
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
   * Chain name to fetch rewards for (e.g. "base", "ethereum").
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
   * Amount in smallest unit to withdraw (e.g. "1500000" for 1.5 USDC with 6
   * decimals). Exactly one of `amount` or `raw_amount` must be provided.
   */
  raw_amount?: string;
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
}

/**
 * Supported earn provider protocols.
 */
export type EthereumEarnProvider = 'morpho' | 'aave' | 'veda';

/**
 * Detailed vault information including current APY, liquidity, and asset metadata.
 * Discriminated on provider.
 */
export type EthereumEarnVaultDetailsResponse = AaveVaultDetails | MorphoVaultDetails | VedaVaultDetails;

/**
 * A wallet action step representing a cross-chain/cross-asset fill by an external
 * provider.
 */
export interface ExternalTransactionWalletActionStep {
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
  cursor?: string;

  limit?: number | null;

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
   * Annual percentage yield earned by the app from fee wrapper fees, in basis
   * points.
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
   * CAIP-2 chain identifier (e.g. "eip155:8453").
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
   * Amount charged in USD for gas sponsorship on this step.
   */
  gas_credits_charged_usd?: string;
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
   * Recipient address on the destination chain. Present for cross-chain swaps. May
   * differ from the source wallet address when swapping between chain types (e.g.
   * EVM to Solana).
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
   * Chain name (e.g. "base", "ethereum").
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
   * Annual percentage yield earned by the app from fee wrapper fees, in basis
   * points.
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
   * CAIP-2 chain identifier (e.g. "eip155:8453").
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
  | EarnFeeCollectActionResponse;

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
  | CustodianTransactionWalletActionStep;

/**
 * Type of a wallet action step.
 */
export type WalletActionStepType =
  | 'evm_transaction'
  | 'evm_user_operation'
  | 'svm_transaction'
  | 'tvm_transaction'
  | 'external_transaction'
  | 'custodian_transaction';

/**
 * Type of wallet action
 */
export type WalletActionType =
  | 'swap'
  | 'transfer'
  | 'earn_deposit'
  | 'earn_withdraw'
  | 'earn_incentive_claim'
  | 'earn_fee_collect';

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
}
