// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

/**
 * Bitcoin address: bech32 (bc1), P2SH (3), or P2PKH (1).
 */
export type BitcoinAddress = string;

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
 * EVM address: 0x followed by 40 hex characters. Preserves input case.
 */
export type EvmAddress = string;

/**
 * EVM address normalized to EIP-55 checksum case.
 */
export type EvmChecksumAddress = string;

/**
 * Hyperliquid L1 spot token identifier: 0x followed by 32–40 hex characters,
 * normalized to lowercase.
 */
export type HyperliquidTokenAddress = string;

/**
 * A unique identifier for a key quorum.
 */
export type KeyQuorumID = string;

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
 * A simple success response.
 */
export interface SuccessResponse {
  success: boolean;
}

/**
 * Tron address: base58check-encoded, starting with T, 34 characters.
 */
export type TronAddress = string;

/**
 * Tron address in hex format: 41-prefixed, 42 hex characters (21 bytes), no 0x
 * prefix.
 */
export type TronHexAddress = string;

export declare namespace Shared {
  export {
    type BitcoinAddress as BitcoinAddress,
    type CurrencyAmount as CurrencyAmount,
    type EvmAddress as EvmAddress,
    type EvmChecksumAddress as EvmChecksumAddress,
    type HyperliquidTokenAddress as HyperliquidTokenAddress,
    type KeyQuorumID as KeyQuorumID,
    type OwnerIDInput as OwnerIDInput,
    type OwnerInput as OwnerInput,
    type OwnerInputPublicKey as OwnerInputPublicKey,
    type OwnerInputUser as OwnerInputUser,
    type P256PublicKey as P256PublicKey,
    type SolanaAddress as SolanaAddress,
    type SuccessResponse as SuccessResponse,
    type TronAddress as TronAddress,
    type TronHexAddress as TronHexAddress,
  };
}
