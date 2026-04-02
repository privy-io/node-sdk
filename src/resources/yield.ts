// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Yield extends APIResource {}

/**
 * An EVM CAIP-2 chain identifier (e.g., "eip155:8453" for Base).
 */
export type EvmCaip2ChainID = string;

/**
 * Supported yield/lending protocol providers.
 */
export type EthereumYieldProvider = 'morpho' | 'aave';

/**
 * Type of yield sweep.
 */
export type EthereumYieldSweepType = 'deposit' | 'withdraw';

/**
 * Status of a yield sweep.
 */
export type EthereumYieldSweepStatus = 'pending' | 'confirmed' | 'failed';

/**
 * Input for depositing assets into an ERC-4626 vault.
 */
export interface EthereumYieldDepositInput {
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
export interface EthereumYieldWithdrawInput {
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
export interface EthereumYieldSweepResponse {
  /**
   * Unique identifier for the yield sweep.
   */
  id: string;

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
  status: EthereumYieldSweepStatus;

  /**
   * Type of yield sweep.
   */
  type: EthereumYieldSweepType;

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
 * Input for fetching vault details.
 */
export interface EthereumVaultDetailsInput {
  /**
   * The Privy vault ID.
   */
  vault_id: string;
}

/**
 * Input for fetching a yield sweep by ID.
 */
export interface EthereumYieldSweepIDInput {
  /**
   * The yield sweep ID.
   */
  id: string;
}

/**
 * A vault configuration for yield features.
 */
export interface EthereumVaultResponse {
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
  provider: EthereumYieldProvider;

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

/**
 * Detailed vault information including current APY and liquidity.
 */
export interface EthereumVaultDetailsResponse {
  /**
   * Vault identifier.
   */
  id: string;

  /**
   * Annual percentage yield earned by the app from fee wrapper fees, in basis
   * points. Null when APY data is unavailable.
   */
  app_apy: number | null;

  /**
   * Underlying asset token address.
   */
  asset_address: string;

  /**
   * Assets available for instant withdrawal in USD.
   */
  available_liquidity_usd: number | null;

  /**
   * Chain identifier (e.g., eip155:8453).
   */
  caip2: string;

  /**
   * Human-readable vault name from the yield provider.
   */
  name: string;

  /**
   * Supported yield/lending protocol providers.
   */
  provider: EthereumYieldProvider;

  /**
   * Total value locked in USD.
   */
  tvl_usd: number | null;

  /**
   * Current annual percentage yield in basis points (e.g., 500 for 5%). 1 basis
   * point = 0.01%.
   */
  user_apy: number | null;

  /**
   * On-chain vault contract address.
   */
  vault_address: string;
}

/**
 * Input for fetching yield positions.
 */
export interface EthereumYieldPositionsInput {
  /**
   * The vault ID to get position for.
   */
  vault_id: string;
}

/**
 * A user's position in a DeFi vault.
 */
export interface EthereumVaultPosition {
  asset: EthereumVaultPosition.Asset;

  /**
   * Current asset value in the vault (realtime from ERC4626), in smallest unit.
   */
  assets_in_vault: string;

  /**
   * Current vault shares held (realtime from ERC4626).
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

export namespace EthereumVaultPosition {
  export interface Asset {
    /**
     * Token contract address.
     */
    address: string;

    /**
     * Token symbol (e.g., "USDC").
     */
    symbol: string;
  }
}

/**
 * A user's position in a yield vault.
 */
export interface EthereumYieldPositionResponse {
  asset: EthereumYieldPositionResponse.Asset;

  /**
   * Current asset value in the vault (realtime from ERC4626), in smallest unit.
   */
  assets_in_vault: string;

  /**
   * Current vault shares held (realtime from ERC4626).
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

export namespace EthereumYieldPositionResponse {
  export interface Asset {
    /**
     * Token contract address.
     */
    address: string;

    /**
     * Token symbol (e.g., "USDC").
     */
    symbol: string;
  }
}

/**
 * Input for claiming incentive rewards from vault participation.
 */
export interface EthereumYieldClaimInput {
  /**
   * An EVM CAIP-2 chain identifier (e.g., "eip155:8453" for Base).
   */
  caip2: EvmCaip2ChainID;
}

/**
 * A single reward token claimed from vault participation.
 */
export interface EthereumYieldClaimReward {
  /**
   * Amount claimed in the smallest unit.
   */
  amount: string;

  /**
   * Reward token contract address.
   */
  token_address: string;

  /**
   * Reward token symbol (e.g., "MORPHO").
   */
  token_symbol: string;
}

/**
 * Response from a yield reward claim operation.
 */
export interface EthereumYieldClaimResponse {
  /**
   * Privy transaction record ID for the claim operation.
   */
  id: string;

  /**
   * An EVM CAIP-2 chain identifier (e.g., "eip155:8453" for Base).
   */
  caip2: EvmCaip2ChainID;

  /**
   * Unix timestamp of when the claim was created, in milliseconds.
   */
  created_at: number;

  /**
   * List of reward tokens claimed.
   */
  rewards: Array<EthereumYieldClaimReward>;

  /**
   * The current status of the claim transaction.
   */
  status:
    | 'broadcasted'
    | 'confirmed'
    | 'execution_reverted'
    | 'failed'
    | 'replaced'
    | 'finalized'
    | 'provider_error'
    | 'pending';

  /**
   * Unix timestamp of when the claim was last updated, in milliseconds.
   */
  updated_at: number;
}

/**
 * Input for fetching a yield reward claim by ID.
 */
export interface EthereumYieldClaimIDInput {
  /**
   * The yield claim transaction ID.
   */
  id: string;
}

/**
 * Headers required to authorize yield operations.
 */
export interface YieldAuthorizationHeaders {
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

export declare namespace Yield {
  export {
    type EvmCaip2ChainID as EvmCaip2ChainID,
    type EthereumYieldProvider as EthereumYieldProvider,
    type EthereumYieldSweepType as EthereumYieldSweepType,
    type EthereumYieldSweepStatus as EthereumYieldSweepStatus,
    type EthereumYieldDepositInput as EthereumYieldDepositInput,
    type EthereumYieldWithdrawInput as EthereumYieldWithdrawInput,
    type EthereumYieldSweepResponse as EthereumYieldSweepResponse,
    type EthereumVaultDetailsInput as EthereumVaultDetailsInput,
    type EthereumYieldSweepIDInput as EthereumYieldSweepIDInput,
    type EthereumVaultResponse as EthereumVaultResponse,
    type EthereumVaultDetailsResponse as EthereumVaultDetailsResponse,
    type EthereumYieldPositionsInput as EthereumYieldPositionsInput,
    type EthereumVaultPosition as EthereumVaultPosition,
    type EthereumYieldPositionResponse as EthereumYieldPositionResponse,
    type EthereumYieldClaimInput as EthereumYieldClaimInput,
    type EthereumYieldClaimReward as EthereumYieldClaimReward,
    type EthereumYieldClaimResponse as EthereumYieldClaimResponse,
    type EthereumYieldClaimIDInput as EthereumYieldClaimIDInput,
    type YieldAuthorizationHeaders as YieldAuthorizationHeaders,
  };
}
