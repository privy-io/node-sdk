// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FundingAPI from './funding';

export class Funding extends APIResource {}

/**
 * A blockchain supported by Coinbase on-ramp.
 */
export type CoinbaseBlockchain =
  | 'ethereum'
  | 'bitcoin'
  | 'base'
  | 'avacchain'
  | 'optimism'
  | 'solana'
  | 'polygon'
  | 'arbitrum'
  | 'stellar'
  | 'monad';

/**
 * An Ethereum asset supported by Coinbase on-ramp.
 */
export type CoinbaseEthereumAsset = 'eth' | 'ETH' | 'USDC' | 'POL' | 'MON';

/**
 * A Solana asset supported by Coinbase on-ramp.
 */
export type CoinbaseSolanaAsset = 'SOL' | 'USDC';

/**
 * An Ethereum address with supported blockchains for Coinbase on-ramp.
 */
export interface CoinbaseOnRampEthereumAddress {
  address: string;

  blockchains: Array<CoinbaseBlockchain>;
}

/**
 * A Solana address with supported blockchains for Coinbase on-ramp.
 */
export interface CoinbaseOnRampSolanaAddress {
  address: string;

  blockchains: Array<CoinbaseBlockchain>;
}

/**
 * Input for initializing a Coinbase on-ramp session for Ethereum.
 */
export interface CoinbaseOnRampInitEthereumInput {
  addresses: Array<CoinbaseOnRampEthereumAddress>;

  assets?: Array<CoinbaseEthereumAsset>;
}

/**
 * Input for initializing a Coinbase on-ramp session for Solana.
 */
export interface CoinbaseOnRampInitSolanaInput {
  addresses: Array<CoinbaseOnRampSolanaAddress>;

  assets?: Array<CoinbaseSolanaAsset>;
}

/**
 * The input for initializing a Coinbase on-ramp session.
 */
export type CoinbaseOnRampInitInput = CoinbaseOnRampInitEthereumInput | CoinbaseOnRampInitSolanaInput;

/**
 * The response from initializing a Coinbase on-ramp session.
 */
export interface CoinbaseOnRampInitResponse {
  app_id: string;

  channel_id: string;

  partner_user_id: string;

  session_token: string;
}

/**
 * Status of a Coinbase on-ramp session.
 */
export type CoinbaseOnRampStatus = 'pending' | 'success' | 'failure';

/**
 * The response for getting the status of a Coinbase on-ramp session.
 */
export interface CoinbaseOnRampStatusResponse {
  /**
   * Status of a Coinbase on-ramp session.
   */
  status: CoinbaseOnRampStatus;
}

/**
 * A payment method supported by Moonpay on-ramp.
 */
export type MoonpayPaymentMethod =
  | 'ach_bank_transfer'
  | 'credit_debit_card'
  | 'gbp_bank_transfer'
  | 'gbp_open_banking_payment'
  | 'mobile_wallet'
  | 'sepa_bank_transfer'
  | 'sepa_open_banking_payment'
  | 'pix_instant_payment'
  | 'yellow_card_bank_transfer';

/**
 * A Moonpay currency code for an Ethereum-compatible chain asset.
 */
export type MoonpayCurrencyCode =
  | 'AVAX_CCHAIN'
  | 'CELO_CELO'
  | 'CUSD_CELO'
  | 'DAI_ETHEREUM'
  | 'ETH_ETHEREUM'
  | 'ETH_ARBITRUM'
  | 'ETH_OPTIMISM'
  | 'ETH_POLYGON'
  | 'ETH_BASE'
  | 'FIL_FVM'
  | 'MATIC_ETHEREUM'
  | 'MATIC_POLYGON'
  | 'POL_POLYGON'
  | 'POL_ETHEREUM'
  | 'USDC_ETHEREUM'
  | 'USDC_ARBITRUM'
  | 'USDC_OPTIMISM'
  | 'USDC_POLYGON'
  | 'USDC_BASE'
  | 'USDC_CCHAIN'
  | 'USDC_SOL'
  | 'USDT_ETHEREUM'
  | 'USDT_POLYGON'
  | 'WETH_POLYGON'
  | 'WBTC_ETHEREUM'
  | 'BNB_BNB'
  | 'BNB_BSC'
  | 'MON_MON'
  | 'CELO'
  | 'CUSD'
  | 'DAI'
  | 'ETH'
  | 'FIL'
  | 'MATIC'
  | 'USDC'
  | 'USDT'
  | 'WETH'
  | 'WBTC';

/**
 * The theme for the Moonpay on-ramp widget.
 */
export type MoonpayUiTheme = 'light' | 'dark';

/**
 * UI configuration for the Moonpay on-ramp widget.
 */
export interface MoonpayUiConfig {
  accentColor?: string;

  /**
   * The theme for the Moonpay on-ramp widget.
   */
  theme?: MoonpayUiTheme;
}

/**
 * A Moonpay currency code for a Solana asset.
 */
export type MoonpaySolanaCurrencyCode = 'SOL' | 'USDC_SOL';

/**
 * Configuration for a Moonpay fiat on-ramp for an Ethereum-compatible chain.
 */
export interface MoonpayFiatOnRampEthereumConfig {
  /**
   * A Moonpay currency code for an Ethereum-compatible chain asset.
   */
  currencyCode?: MoonpayCurrencyCode;

  email?: string;

  /**
   * A payment method supported by Moonpay on-ramp.
   */
  paymentMethod?: MoonpayPaymentMethod;

  quoteCurrencyAmount?: number;

  /**
   * UI configuration for the Moonpay on-ramp widget.
   */
  uiConfig?: MoonpayUiConfig;
}

/**
 * Configuration for a Moonpay fiat on-ramp for Solana.
 */
export interface MoonpayFiatOnRampSolanaConfig {
  /**
   * A Moonpay currency code for a Solana asset.
   */
  currencyCode?: MoonpaySolanaCurrencyCode;

  email?: string;

  /**
   * A payment method supported by Moonpay on-ramp.
   */
  paymentMethod?: MoonpayPaymentMethod;

  quoteCurrencyAmount?: number;

  /**
   * UI configuration for the Moonpay on-ramp widget.
   */
  uiConfig?: MoonpayUiConfig;
}

/**
 * Input for a Moonpay fiat on-ramp for an Ethereum-compatible chain.
 */
export interface MoonpayFiatOnRampEthereumInput {
  address: string;

  /**
   * Configuration for a Moonpay fiat on-ramp for an Ethereum-compatible chain.
   */
  config: MoonpayFiatOnRampEthereumConfig;
}

/**
 * Input for a Moonpay fiat on-ramp for Solana.
 */
export interface MoonpayFiatOnRampSolanaInput {
  address: string;

  /**
   * Configuration for a Moonpay fiat on-ramp for Solana.
   */
  config: MoonpayFiatOnRampSolanaConfig;
}

/**
 * Sandbox configuration for a Moonpay on-ramp.
 */
export interface MoonpayOnRampSandboxConfig {
  useSandbox?: boolean;
}

/**
 * The input for signing a Moonpay on-ramp.
 */
export type MoonpayOnRampSignInput =
  | MoonpayOnRampSignInput.MoonpayFiatOnRampEthereumInput
  | MoonpayOnRampSignInput.MoonpayFiatOnRampSolanaInput;

export namespace MoonpayOnRampSignInput {
  /**
   * Sandbox configuration for a Moonpay on-ramp.
   */
  export interface MoonpayFiatOnRampEthereumInput
    extends FundingAPI.MoonpayOnRampSandboxConfig,
      FundingAPI.MoonpayFiatOnRampEthereumInput {}

  /**
   * Sandbox configuration for a Moonpay on-ramp.
   */
  export interface MoonpayFiatOnRampSolanaInput
    extends FundingAPI.MoonpayOnRampSandboxConfig,
      FundingAPI.MoonpayFiatOnRampSolanaInput {}
}

/**
 * The response from signing a Moonpay on-ramp.
 */
export interface MoonpayOnRampSignResponse {
  externalTransactionId: string;

  signedUrl: string;
}

export declare namespace Funding {
  export {
    type CoinbaseBlockchain as CoinbaseBlockchain,
    type CoinbaseEthereumAsset as CoinbaseEthereumAsset,
    type CoinbaseSolanaAsset as CoinbaseSolanaAsset,
    type CoinbaseOnRampEthereumAddress as CoinbaseOnRampEthereumAddress,
    type CoinbaseOnRampSolanaAddress as CoinbaseOnRampSolanaAddress,
    type CoinbaseOnRampInitEthereumInput as CoinbaseOnRampInitEthereumInput,
    type CoinbaseOnRampInitSolanaInput as CoinbaseOnRampInitSolanaInput,
    type CoinbaseOnRampInitInput as CoinbaseOnRampInitInput,
    type CoinbaseOnRampInitResponse as CoinbaseOnRampInitResponse,
    type CoinbaseOnRampStatus as CoinbaseOnRampStatus,
    type CoinbaseOnRampStatusResponse as CoinbaseOnRampStatusResponse,
    type MoonpayPaymentMethod as MoonpayPaymentMethod,
    type MoonpayCurrencyCode as MoonpayCurrencyCode,
    type MoonpayUiTheme as MoonpayUiTheme,
    type MoonpayUiConfig as MoonpayUiConfig,
    type MoonpaySolanaCurrencyCode as MoonpaySolanaCurrencyCode,
    type MoonpayFiatOnRampEthereumConfig as MoonpayFiatOnRampEthereumConfig,
    type MoonpayFiatOnRampSolanaConfig as MoonpayFiatOnRampSolanaConfig,
    type MoonpayFiatOnRampEthereumInput as MoonpayFiatOnRampEthereumInput,
    type MoonpayFiatOnRampSolanaInput as MoonpayFiatOnRampSolanaInput,
    type MoonpayOnRampSandboxConfig as MoonpayOnRampSandboxConfig,
    type MoonpayOnRampSignInput as MoonpayOnRampSignInput,
    type MoonpayOnRampSignResponse as MoonpayOnRampSignResponse,
  };
}
