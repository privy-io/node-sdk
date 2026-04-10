// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PoliciesAPI from './policies';
import * as SharedAPI from './shared';

export class Aggregations extends APIResource {}

/**
 * The RPC method this aggregation applies to.
 */
export type AggregationMethod = 'eth_signTransaction' | 'eth_signUserOperation';

/**
 * The metric configuration for an aggregation, defining what field/field_source to
 * measure and the aggregation function to apply.
 */
export interface AggregationMetric {
  field: string;

  field_source: string;

  /**
   * The aggregation function to apply.
   */
  function: 'sum';

  /**
   * A Solidity ABI definition for decoding smart contract calldata.
   */
  abi?: PoliciesAPI.AbiSchema;
}

/**
 * The time window configuration for an aggregation.
 */
export interface AggregationWindow {
  /**
   * Duration of the rolling window in seconds (1-72 hours).
   */
  seconds: number;

  type: 'rolling';
}

/**
 * A grouping configuration for an aggregation. Maximum of 2 group_by fields
 * allowed.
 */
export interface AggregationGroupBy {
  field: string;

  field_source: string;

  /**
   * A Solidity ABI definition for decoding smart contract calldata.
   */
  abi?: PoliciesAPI.AbiSchema;
}

/**
 * An aggregation that measures and tracks metrics over a period of time.
 */
export interface Aggregation {
  /**
   * Unique ID of the aggregation.
   */
  id: string;

  /**
   * Unix timestamp of when the aggregation was created in milliseconds.
   */
  created_at: number;

  /**
   * The RPC method this aggregation applies to.
   */
  method: AggregationMethod;

  /**
   * The metric configuration for an aggregation, defining what field/field_source to
   * measure and the aggregation function to apply.
   */
  metric: AggregationMetric;

  /**
   * The name of the aggregation.
   */
  name: string;

  /**
   * The key quorum ID of the owner of the aggregation.
   */
  owner_id: string | null;

  /**
   * The time window configuration for an aggregation.
   */
  window: AggregationWindow;

  /**
   * Optional conditions to filter events before aggregation.
   */
  conditions?: Array<PoliciesAPI.PolicyCondition>;

  /**
   * Optional grouping configuration for bucketing metrics.
   */
  group_by?: Array<AggregationGroupBy>;
}

/**
 * Input for creating an aggregation.
 */
export interface AggregationInput {
  /**
   * The RPC method this aggregation applies to.
   */
  method: AggregationMethod;

  /**
   * The metric configuration for an aggregation, defining what field/field_source to
   * measure and the aggregation function to apply.
   */
  metric: AggregationMetric;

  /**
   * The name of the aggregation.
   */
  name: string;

  /**
   * The time window configuration for an aggregation.
   */
  window: AggregationWindow;

  /**
   * Optional conditions to filter events before aggregation.
   */
  conditions?: Array<PoliciesAPI.PolicyCondition>;

  /**
   * Optional grouping configuration for bucketing metrics.
   */
  group_by?: Array<AggregationGroupBy>;

  /**
   * The owner of the resource, specified as a Privy user ID, a P-256 public key, or
   * null to remove the current owner.
   */
  owner?: SharedAPI.OwnerInput | null;

  /**
   * The key quorum ID to set as the owner of the resource. If you provide this, do
   * not specify an owner.
   */
  owner_id?: SharedAPI.OwnerIDInput | null;
}

export declare namespace Aggregations {
  export {
    type AggregationMethod as AggregationMethod,
    type AggregationMetric as AggregationMetric,
    type AggregationWindow as AggregationWindow,
    type AggregationGroupBy as AggregationGroupBy,
    type Aggregation as Aggregation,
    type AggregationInput as AggregationInput,
  };
}
