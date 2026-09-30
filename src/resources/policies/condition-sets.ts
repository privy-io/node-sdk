// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PoliciesAPI from './policies';
import { ConditionSetsCursor } from './policies';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

/**
 * Operations related to policies
 */
export class ConditionSets extends APIResource {
  /**
   * List condition sets in an app.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const conditionSet of client.policies.conditionSets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ConditionSetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConditionSetsCursor, PoliciesAPI.ConditionSet> {
    return this._client.getAPIList('/v1/condition_sets', Cursor<PoliciesAPI.ConditionSet>, {
      query,
      ...options,
    });
  }
}

/**
 * Paginated list of condition sets in an app.
 */
export interface ConditionSetsResponse {
  /**
   * Condition sets in this page.
   */
  data: Array<PoliciesAPI.ConditionSet>;

  /**
   * Cursor for the next page. Null when there are no further pages.
   */
  next_cursor: string | null;
}

export interface ConditionSetListParams extends CursorParams {}

export declare namespace ConditionSets {
  export {
    type ConditionSetsResponse as ConditionSetsResponse,
    type ConditionSetListParams as ConditionSetListParams,
  };
}

export { type ConditionSetsCursor };
