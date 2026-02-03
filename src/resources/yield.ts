// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Yield extends APIResource {}

/**
 * Supported yield/lending protocol providers.
 */
export type YieldProvider = 'morpho' | 'aave';

/**
 * Type of yield sweep.
 */
export type YieldSweepType = 'deposit' | 'withdraw';

/**
 * Status of a yield sweep.
 */
export type YieldSweepStatus = 'pending' | 'confirmed' | 'failed';

/**
 * Input for depositing assets into an ERC-4626 vault.
 */
export interface YieldDepositInput {
  /**
   * The amount of the underlying asset to deposit, in the smallest unit (e.g., wei
   * for ETH, 6 decimals for USDC). Must be a non-negative integer string.
   */
  asset_amount: string;

  /**
   * The ID of the vault to deposit into.
   */
  vault_id: string;
}

/**
 * Input for withdrawing assets from an ERC-4626 vault.
 */
export interface YieldWithdrawInput {
  /**
   * The amount of the underlying asset to withdraw, in the smallest unit (e.g., wei
   * for ETH, 6 decimals for USDC). Must be a non-negative integer string.
   */
  asset_amount: string;

  /**
   * The ID of the vault to withdraw from.
   */
  vault_id: string;
}

/**
 * A yield sweep record representing a deposit or withdrawal.
 */
export interface YieldSweepResponse {
  /**
   * Unique identifier for the yield sweep.
   */
  id: string;

  /**
   * The ID of the ERC-20 approval transaction (for deposits).
   */
  approval_transaction_id: string | null;

  /**
   * The amount of underlying assets involved. Set after the sweep is confirmed
   * on-chain.
   */
  asset_amount: string | null;

  /**
   * Unix timestamp of when the sweep was created, in milliseconds.
   */
  created_at: number;

  /**
   * The amount of vault shares involved. Set after the sweep is confirmed on-chain.
   */
  share_amount: string | null;

  /**
   * Status of a yield sweep.
   */
  status: YieldSweepStatus;

  /**
   * The ID of the underlying blockchain transaction (deposit/withdraw).
   */
  transaction_id: string | null;

  /**
   * Type of yield sweep.
   */
  type: YieldSweepType;

  /**
   * Unix timestamp of when the sweep was last updated, in milliseconds.
   */
  updated_at: number;

  /**
   * The ID of the vault involved in the sweep.
   */
  vault_id: string;

  /**
   * The ID of the wallet involved in the sweep.
   */
  wallet_id: string;
}

/**
 * A vault configuration for yield features.
 */
export interface VaultResponse {
  /**
   * Unique identifier for the vault.
   */
  id: string;

  /**
   * The address of the underlying asset token (e.g., USDC).
   */
  asset_address: string;

  /**
   * The CAIP-2 chain identifier.
   */
  caip2: string;

  /**
   * Unix timestamp of when the vault was created, in milliseconds.
   */
  created_at: number;

  /**
   * Supported yield/lending protocol providers.
   */
  provider: YieldProvider;

  /**
   * The address of the underlying vault that the fee vault wraps. If this is not a
   * fee vault, this equals vault_address.
   */
  underlying_vault_address: string;

  /**
   * The on-chain address of the ERC-4626 vault contract.
   */
  vault_address: string;
}

export declare namespace Yield {
  export {
    type YieldProvider as YieldProvider,
    type YieldSweepType as YieldSweepType,
    type YieldSweepStatus as YieldSweepStatus,
    type YieldDepositInput as YieldDepositInput,
    type YieldWithdrawInput as YieldWithdrawInput,
    type YieldSweepResponse as YieldSweepResponse,
    type VaultResponse as VaultResponse,
  };
}
