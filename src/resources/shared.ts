// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Shared extends APIResource {}

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
 * A simple success response.
 */
export interface SuccessResponse {
  success: boolean;
}

export declare namespace Shared {
  export {
    type CurrencyAmount as CurrencyAmount,
    type KeyQuorumID as KeyQuorumID,
    type OwnerIDInput as OwnerIDInput,
    type OwnerInput as OwnerInput,
    type OwnerInputPublicKey as OwnerInputPublicKey,
    type OwnerInputUser as OwnerInputUser,
    type P256PublicKey as P256PublicKey,
    type SuccessResponse as SuccessResponse,
  };
}
