// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

/**
 * Bitcoin address: bech32 (bc1), P2SH (3), or P2PKH (1).
 */
export type BitcoinAddress = string;

/**
 * Bitcoin CAIP-2 chain identifier (e.g.
 * "bip122:000000000019d6689c085ae165831e93").
 */
export type BitcoinCaip2 = 'bip122:mainnet' | (string & {});

/**
 * A monetary value with its currency denomination.
 */
export interface CurrencyAmount {
  /**
   * Currency code
   */
  currency: 'usd';

  /**
   * The monetary value as a string.
   */
  value: string;
}

/**
 * The Privy API environment.
 */
export type IntegrationEnvironment = 'sandbox' | 'production';

/**
 * EVM address: 0x followed by 40 hex characters. Preserves input case.
 */
export type EvmAddress = string;

/**
 * EVM CAIP-2 chain identifier (e.g. "eip155:4217" for Tempo, "eip155:1" for
 * Ethereum).
 */
export type EvmCaip2 = string;

/**
 * EVM address normalized to EIP-55 checksum case.
 */
export type EvmChecksumAddress = string;

/**
 * Hyperliquid L1 token identifier: 0x followed by either 32 hex characters
 * (16-byte spot/perps token IDs) or 40 hex characters (20-byte HIP-3 DEX token
 * IDs), normalized to lowercase.
 */
export type HyperliquidTokenAddress = string;

/**
 * A unique identifier for a key quorum.
 */
export type KeyQuorumID = string;

/**
 * Supported fiat orchestration providers.
 */
export type OrchestrationProvider = 'bridge';

/**
 * The key quorum ID to set as the owner of the resource. If you provide this, do
 * not specify an owner.
 */
export type OwnerIDInput = string | null;

/**
 * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
 * null to remove the current owner.
 */
export type OwnerInput = OwnerInputUser | OwnerInputPublicKey;

/**
 * Owner input specifying a P-256 public key.
 */
export interface OwnerInputPublicKey {
  /**
   * A P-256 (secp256r1) public key.
   */
  public_key: P256PublicKey;
}

/**
 * Owner input specifying a Privy user ID.
 */
export interface OwnerInputUser {
  user_id: string;
}

/**
 * A P-256 (secp256r1) public key.
 */
export type P256PublicKey = string;

/**
 * Solana address: base58-encoded public key (32 bytes).
 */
export type SolanaAddress = string;

/**
 * Solana CAIP-2 chain identifier (e.g. "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp").
 */
export type SolanaCaip2 = string;

/**
 * A simple success response.
 */
export interface SuccessResponse {
  success: boolean;
}

/**
 * Token identifier string. EVM-shaped 40-hex token addresses normalize to checksum
 * case, 16-byte Hyperliquid token IDs normalize to lowercase, and all other
 * identifiers pass through unchanged.
 */
export type TokenIdentifier = string;

/**
 * Tron address: base58check-encoded, starting with T, 34 characters.
 */
export type TronAddress = string;

/**
 * Tron CAIP-2 chain identifier. Supported values: "tron:mainnet", "tron:nile".
 */
export type TronCaip2 = 'tron:mainnet' | 'tron:nile';

/**
 * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
 * prefix.
 */
export type TronHexAddress = string;

export declare namespace Shared {
  export {
    type BitcoinAddress as BitcoinAddress,
    type BitcoinCaip2 as BitcoinCaip2,
    type CurrencyAmount as CurrencyAmount,
    type IntegrationEnvironment as IntegrationEnvironment,
    type EvmAddress as EvmAddress,
    type EvmCaip2 as EvmCaip2,
    type EvmChecksumAddress as EvmChecksumAddress,
    type HyperliquidTokenAddress as HyperliquidTokenAddress,
    type KeyQuorumID as KeyQuorumID,
    type OrchestrationProvider as OrchestrationProvider,
    type OwnerIDInput as OwnerIDInput,
    type OwnerInput as OwnerInput,
    type OwnerInputPublicKey as OwnerInputPublicKey,
    type OwnerInputUser as OwnerInputUser,
    type P256PublicKey as P256PublicKey,
    type SolanaAddress as SolanaAddress,
    type SolanaCaip2 as SolanaCaip2,
    type SuccessResponse as SuccessResponse,
    type TokenIdentifier as TokenIdentifier,
    type TronAddress as TronAddress,
    type TronCaip2 as TronCaip2,
    type TronHexAddress as TronHexAddress,
  };
}
