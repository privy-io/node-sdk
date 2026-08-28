// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class WalletAutomations extends APIResource {}

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
 * An asset identified by contract address, scoped to a chain via CAIP-2.
 */
export interface AutomationAssetSpec {
  asset_address: string;

  caip2: string;
}

/**
 * An asset spec accepting either raw identifiers (asset_address, caip2) or
 * human-readable aliases (asset, chain). Exactly one of asset_address or asset
 * must be provided; at most one of caip2 or chain may be provided.
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
    type WalletAutomationResponse as WalletAutomationResponse,
    type WalletAutomationStatus as WalletAutomationStatus,
    type WalletAutomationSuccessResponse as WalletAutomationSuccessResponse,
  };
}
