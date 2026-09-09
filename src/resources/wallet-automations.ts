// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations related to wallet automations
 */
export class WalletAutomations extends APIResource {
  /**
   * Re-checks a wallet (identified by wallet_id or deposit_address) for funds
   * matching its wallet automation configs and triggers an automation run if a match
   * is found. Use this to recover a deposit whose automation trigger was missed or
   * failed.
   */
  reindex(
    body: WalletAutomationReindexParams,
    options?: RequestOptions,
  ): APIPromise<WalletAutomationReindexResponse> {
    return this._client.post('/v1/wallet_automations/reindex', { body, ...options });
  }
}

/**
 * Configuration for an automation action.
 */
export type AutomationActionConfig = AutomationSwapActionConfig | AutomationEarnDepositActionConfig;

/**
 * Configuration for an automation action (input form with alias support).
 */
export type AutomationActionConfigInput =
  | AutomationSwapActionConfigInput
  | AutomationEarnDepositActionConfigInput;

/**
 * Which assets to include/exclude for an automation trigger.
 */
export type AutomationAssetFilter =
  | AutomationAssetFilterAll
  | AutomationAssetFilterInclude
  | AutomationAssetFilterExclude;

/**
 * Match all assets.
 */
export interface AutomationAssetFilterAll {
  mode: 'all';
}

/**
 * Match all assets except the specified ones.
 */
export interface AutomationAssetFilterExclude {
  mode: 'exclude';

  values: Array<AutomationAssetSpec>;
}

/**
 * Match only the specified assets.
 */
export interface AutomationAssetFilterInclude {
  mode: 'include';

  values: Array<AutomationAssetSpec>;
}

/**
 * Which assets to include/exclude for an automation trigger (input form with alias
 * support).
 */
export type AutomationAssetFilterInput =
  | AutomationAssetFilterAll
  | AutomationAssetFilterInputInclude
  | AutomationAssetFilterInputExclude;

/**
 * Match all assets except the specified ones (input form with alias support).
 */
export interface AutomationAssetFilterInputExclude {
  mode: 'exclude';

  values: Array<AutomationAssetSpecInput>;
}

/**
 * Match only the specified assets (input form with alias support).
 */
export interface AutomationAssetFilterInputInclude {
  mode: 'include';

  values: Array<AutomationAssetSpecInput>;
}

/**
 * An asset identified by contract address on a specific chain (CAIP-2). Either
 * field may be "_": asset_address: "_" matches any asset on the chain; caip2: "\*"
 * matches the asset on any chain (in this case asset_address holds the asset
 * symbol id, e.g. "usdc" or "eth", not a contract address).
 */
export interface AutomationAssetSpec {
  asset_address: string;

  caip2: string;
}

/**
 * An asset spec accepting either raw identifiers (asset_address, caip2) or
 * human-readable aliases (asset, chain). Exactly one of asset_address or asset
 * must be provided; at most one of caip2 or chain may be provided. Use "_" for
 * asset_address or asset to match any asset on a given chain (chain is then
 * required). Omitting chain/caip2 (or passing "_" for either) matches the
 * specified asset on any chain.
 */
export interface AutomationAssetSpecInput extends AutomationAssetSpec {
  asset?: string;

  chain?: string;
}

/**
 * Full configuration for a wallet automation (trigger + action).
 */
export interface AutomationConfig {
  /**
   * Configuration for an automation action.
   */
  action: AutomationActionConfig;

  /**
   * Trigger configuration for deposit events.
   */
  trigger: AutomationTriggerConfig;
}

/**
 * Full configuration for a wallet automation (trigger + action) accepting
 * human-readable aliases.
 */
export interface AutomationConfigInput {
  /**
   * Configuration for an automation action (input form with alias support).
   */
  action: AutomationActionConfigInput;

  /**
   * Trigger configuration for deposit events (input form with alias support).
   */
  trigger: AutomationTriggerConfigInput;
}

/**
 * Trigger configuration for deposit events.
 */
export interface AutomationDepositTriggerConfig {
  /**
   * Which assets to include/exclude for an automation trigger.
   */
  assets: AutomationAssetFilter;

  type: 'deposit';
}

/**
 * Trigger configuration for deposit events (input form with alias support).
 */
export interface AutomationDepositTriggerConfigInput {
  /**
   * Which assets to include/exclude for an automation trigger (input form with alias
   * support).
   */
  assets: AutomationAssetFilterInput;

  type: 'deposit';
}

/**
 * Destination asset identified by contract address on a specific chain (CAIP-2).
 */
export interface AutomationDestinationAsset {
  asset_address: string;

  caip2: string;
}

/**
 * A destination asset spec accepting either raw identifiers (asset_address, caip2)
 * or human-readable aliases (asset, chain). Exactly one of asset_address or asset
 * must be provided; exactly one of caip2 or chain must be provided.
 */
export interface AutomationDestinationAssetInput extends AutomationDestinationAsset {
  asset?: string;

  chain?: string;
}

/**
 * Action configuration for depositing into an Earn vault.
 */
export interface AutomationEarnDepositActionConfig {
  type: 'earn_deposit';

  vault_id: string;
}

/**
 * Action configuration for depositing into an Earn vault (input form).
 */
export interface AutomationEarnDepositActionConfigInput {
  type: 'earn_deposit';

  vault_id: string;
}

/**
 * Action configuration for swap operations.
 */
export interface AutomationSwapActionConfig {
  /**
   * Destination asset identified by contract address on a specific chain (CAIP-2).
   */
  destination_chain_asset: AutomationDestinationAsset;

  type: 'swap';
}

/**
 * Action configuration for swap operations (input form with alias support).
 */
export interface AutomationSwapActionConfigInput {
  /**
   * A destination asset spec accepting either raw identifiers (asset_address, caip2)
   * or human-readable aliases (asset, chain). Exactly one of asset_address or asset
   * must be provided; exactly one of caip2 or chain must be provided.
   */
  destination_chain_asset: AutomationDestinationAssetInput;

  type: 'swap';
}

/**
 * Trigger configuration for deposit events.
 */
export interface AutomationTriggerConfig {
  /**
   * Which assets to include/exclude for an automation trigger.
   */
  assets: AutomationAssetFilter;

  type: 'deposit';
}

/**
 * Trigger configuration for deposit events (input form with alias support).
 */
export interface AutomationTriggerConfigInput {
  /**
   * Which assets to include/exclude for an automation trigger (input form with alias
   * support).
   */
  assets: AutomationAssetFilterInput;

  type: 'deposit';
}

/**
 * Request body for creating a wallet automation.
 */
export interface CreateAutomationRequestBody {
  /**
   * Full configuration for a wallet automation (trigger + action) accepting
   * human-readable aliases.
   */
  config: AutomationConfigInput;

  owner_id: string | null;

  name?: string;
}

/**
 * Per-attachment parameters for swap automations.
 */
export interface SwapAttachmentParams {
  destination_address: string;
}

/**
 * Request body for updating a wallet automation.
 */
export interface UpdateAutomationRequestBody {
  /**
   * Full configuration for a wallet automation (trigger + action) accepting
   * human-readable aliases.
   */
  config?: AutomationConfigInput;

  enabled?: boolean;

  name?: string | null;

  /**
   * A unique identifier for a key quorum.
   */
  owner_id?: SharedAPI.KeyQuorumID | null;
}

/**
 * Paginated list of wallet automation executions.
 */
export interface WalletAutomationExecutionListResponse {
  data: Array<WalletAutomationExecutionResponse>;

  next_cursor: string | null;
}

/**
 * A record of a single automation execution triggered by a deposit.
 */
export interface WalletAutomationExecutionResponse {
  id: string;

  automation_attachment_id: string | null;

  completed_at: string | null;

  created_at: string;

  failed_at: string | null;

  failure_reason: string | null;

  /**
   * Execution lifecycle status.
   */
  status: WalletAutomationExecutionStatus;

  trigger_asset_address: string;

  trigger_block_number: string;

  trigger_caip2: string;

  trigger_tx_hash: string;

  triggered_at: string | null;

  updated_at: string;

  wallet_action_id: string | null;

  wallet_id: string;
}

/**
 * Execution lifecycle status.
 */
export type WalletAutomationExecutionStatus = 'pending' | 'triggered' | 'completed' | 'failed' | 'skipped';

/**
 * Paginated list of wallet automations.
 */
export interface WalletAutomationListResponse {
  data: Array<WalletAutomationResponse>;

  next_cursor: string | null;
}

/**
 * The outcome of checking one asset on the requested chain during a reindex.
 */
export interface WalletAutomationReindexAssetResult {
  /**
   * Asset contract address; the native asset uses `native`.
   */
  asset_address: string;

  /**
   * EVM CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:1" for
   * Ethereum).
   */
  caip2: WalletAutomationReindexCaip2;

  /**
   * ID of the in-flight execution blocking a re-trigger. Populated only when
   * `status` is `skipped_existing_execution`; `null` otherwise.
   */
  existing_execution_id: string | null;

  /**
   * On-chain balance in base units. Populated when `status` is `triggered` or
   * `skipped_zero_balance`; `null` otherwise. For example, 1 USDC is `1000000`.
   */
  raw_balance: string | null;

  /**
   * Outcome of checking a single asset during a wallet automation reindex. One of
   * `triggered`, `skipped_zero_balance`, `skipped_no_match`,
   * `skipped_existing_execution`, or `failed`.
   */
  status: WalletAutomationReindexAssetStatus;
}

/**
 * Outcome of checking a single asset during a wallet automation reindex. One of
 * `triggered`, `skipped_zero_balance`, `skipped_no_match`,
 * `skipped_existing_execution`, or `failed`.
 */
export type WalletAutomationReindexAssetStatus = string;

/**
 * EVM CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:1" for
 * Ethereum).
 */
export type WalletAutomationReindexCaip2 = string;

/**
 * Request body for re-checking a wallet against its wallet automations. Identify
 * the wallet by wallet_id or deposit_address (at least one is required). If both
 * are provided, wallet_id takes precedence and deposit_address must match that
 * wallet's address. Specify exactly one of caip2 or chain, and the asset_address
 * to check. Useful for recovering a deposit that was missed or failed to trigger
 * its automation.
 */
export interface WalletAutomationReindexRequestBody {
  /**
   * Asset contract address to check; the native asset uses `native`.
   */
  asset_address: string;

  /**
   * EVM CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:1" for
   * Ethereum).
   */
  caip2?: WalletAutomationReindexCaip2;

  /**
   * Human-readable chain name to check. Specify exactly one of `caip2` or `chain`.
   */
  chain?: string;

  /**
   * On-chain deposit address of the wallet to reindex. Must match the resolved
   * wallet's address if `wallet_id` is also provided.
   */
  deposit_address?: string;

  /**
   * Privy wallet ID to reindex. Takes precedence over `deposit_address` when both
   * are supplied.
   */
  wallet_id?: string;
}

/**
 * Result of re-checking a wallet against its wallet automations.
 */
export interface WalletAutomationReindexResponse {
  results: Array<WalletAutomationReindexAssetResult>;

  wallet_id: string;
}

/**
 * A wallet automation.
 */
export interface WalletAutomationResponse {
  id: string;

  app_id: string;

  /**
   * Full configuration for a wallet automation (trigger + action).
   */
  config: AutomationConfig;

  created_at: string;

  name: string | null;

  owner_id: string | null;

  /**
   * Automation lifecycle state: 'enabled' = running, 'disabled' = not running.
   */
  status: WalletAutomationStatus;

  updated_at: string;
}

/**
 * Automation lifecycle state: 'enabled' = running, 'disabled' = not running.
 */
export type WalletAutomationStatus = 'enabled' | 'disabled';

/**
 * Confirmation of a successful automation operation.
 */
export interface WalletAutomationSuccessResponse {
  success: true;
}

export interface WalletAutomationReindexParams {
  /**
   * Asset contract address to check; the native asset uses `native`.
   */
  asset_address: string;

  /**
   * EVM CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:1" for
   * Ethereum).
   */
  caip2?: WalletAutomationReindexCaip2;

  /**
   * Human-readable chain name to check. Specify exactly one of `caip2` or `chain`.
   */
  chain?: string;

  /**
   * On-chain deposit address of the wallet to reindex. Must match the resolved
   * wallet's address if `wallet_id` is also provided.
   */
  deposit_address?: string;

  /**
   * Privy wallet ID to reindex. Takes precedence over `deposit_address` when both
   * are supplied.
   */
  wallet_id?: string;
}

export declare namespace WalletAutomations {
  export {
    type AutomationActionConfig as AutomationActionConfig,
    type AutomationActionConfigInput as AutomationActionConfigInput,
    type AutomationAssetFilter as AutomationAssetFilter,
    type AutomationAssetFilterAll as AutomationAssetFilterAll,
    type AutomationAssetFilterExclude as AutomationAssetFilterExclude,
    type AutomationAssetFilterInclude as AutomationAssetFilterInclude,
    type AutomationAssetFilterInput as AutomationAssetFilterInput,
    type AutomationAssetFilterInputExclude as AutomationAssetFilterInputExclude,
    type AutomationAssetFilterInputInclude as AutomationAssetFilterInputInclude,
    type AutomationAssetSpec as AutomationAssetSpec,
    type AutomationAssetSpecInput as AutomationAssetSpecInput,
    type AutomationConfig as AutomationConfig,
    type AutomationConfigInput as AutomationConfigInput,
    type AutomationDepositTriggerConfig as AutomationDepositTriggerConfig,
    type AutomationDepositTriggerConfigInput as AutomationDepositTriggerConfigInput,
    type AutomationDestinationAsset as AutomationDestinationAsset,
    type AutomationDestinationAssetInput as AutomationDestinationAssetInput,
    type AutomationEarnDepositActionConfig as AutomationEarnDepositActionConfig,
    type AutomationEarnDepositActionConfigInput as AutomationEarnDepositActionConfigInput,
    type AutomationSwapActionConfig as AutomationSwapActionConfig,
    type AutomationSwapActionConfigInput as AutomationSwapActionConfigInput,
    type AutomationTriggerConfig as AutomationTriggerConfig,
    type AutomationTriggerConfigInput as AutomationTriggerConfigInput,
    type CreateAutomationRequestBody as CreateAutomationRequestBody,
    type SwapAttachmentParams as SwapAttachmentParams,
    type UpdateAutomationRequestBody as UpdateAutomationRequestBody,
    type WalletAutomationExecutionListResponse as WalletAutomationExecutionListResponse,
    type WalletAutomationExecutionResponse as WalletAutomationExecutionResponse,
    type WalletAutomationExecutionStatus as WalletAutomationExecutionStatus,
    type WalletAutomationListResponse as WalletAutomationListResponse,
    type WalletAutomationReindexAssetResult as WalletAutomationReindexAssetResult,
    type WalletAutomationReindexAssetStatus as WalletAutomationReindexAssetStatus,
    type WalletAutomationReindexCaip2 as WalletAutomationReindexCaip2,
    type WalletAutomationReindexRequestBody as WalletAutomationReindexRequestBody,
    type WalletAutomationReindexResponse as WalletAutomationReindexResponse,
    type WalletAutomationResponse as WalletAutomationResponse,
    type WalletAutomationStatus as WalletAutomationStatus,
    type WalletAutomationSuccessResponse as WalletAutomationSuccessResponse,
    type WalletAutomationReindexParams as WalletAutomationReindexParams,
  };
}
