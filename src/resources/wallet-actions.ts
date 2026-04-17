// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class WalletActions extends APIResource {}

/**
 * Type of wallet action
 */
export type WalletActionType =
  | 'swap'
  | 'transfer'
  | 'earn_deposit'
  | 'earn_withdraw'
  | 'earn_incentive_claim';

/**
 * Status of a wallet action.
 */
export type WalletActionStatus = 'pending' | 'succeeded' | 'rejected' | 'failed';

/**
 * Type of a wallet action step.
 */
export type WalletActionStepType = 'evm_transaction' | 'evm_user_operation' | 'svm_transaction';

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
}

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
   * The entrypoint version of the user operation.
   */
  entrypoint_version: '0.6' | '0.7' | '0.8' | '0.9';

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
}

/**
 * Status of an SVM step in a wallet action.
 */
export type SvmWalletActionStepStatus =
  | 'preparing'
  | 'queued'
  | 'pending'
  | 'confirmed'
  | 'finalized'
  | 'rejected'
  | 'reverted'
  | 'failed';

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
}

/**
 * A step within a wallet action, representing a single onchain action.
 */
export type WalletActionStep =
  | EvmTransactionWalletActionStep
  | EvmUserOperationWalletActionStep
  | SvmTransactionWalletActionStep;

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
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
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
   * Decimal amount as the user provided (e.g. "1.5").
   */
  source_amount: string;

  /**
   * Asset identifier (e.g. "usdc", "eth").
   */
  source_asset: string;

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
   * A description of why a wallet action (or a step within a wallet action) failed.
   */
  failure_reason?: FailureReason;

  /**
   * The steps of the wallet action. Only returned if `?include=steps` is provided.
   */
  steps?: Array<WalletActionStep>;
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
 * Response for a wallet action, discriminated on type.
 */
export type WalletActionResponse =
  | SwapActionResponse
  | TransferActionResponse
  | EarnDepositActionResponse
  | EarnWithdrawActionResponse
  | EarnIncentiveClaimActionResponse;

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

export declare namespace WalletActions {
  export {
    type WalletActionType as WalletActionType,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStepType as WalletActionStepType,
    type EvmWalletActionStepStatus as EvmWalletActionStepStatus,
    type FailureReason as FailureReason,
    type EvmTransactionWalletActionStep as EvmTransactionWalletActionStep,
    type EvmUserOperationWalletActionStep as EvmUserOperationWalletActionStep,
    type SvmWalletActionStepStatus as SvmWalletActionStepStatus,
    type SvmTransactionWalletActionStep as SvmTransactionWalletActionStep,
    type WalletActionStep as WalletActionStep,
    type SwapActionResponse as SwapActionResponse,
    type TransferActionResponse as TransferActionResponse,
    type EarnIncetiveClaimRewardEntry as EarnIncetiveClaimRewardEntry,
    type EarnDepositActionResponse as EarnDepositActionResponse,
    type EarnWithdrawActionResponse as EarnWithdrawActionResponse,
    type EarnIncentiveClaimActionResponse as EarnIncentiveClaimActionResponse,
    type WalletActionResponse as WalletActionResponse,
    type EarnDepositRequestBody as EarnDepositRequestBody,
    type EarnWithdrawRequestBody as EarnWithdrawRequestBody,
    type EarnIncentiveClaimRequestBody as EarnIncentiveClaimRequestBody,
  };
}
