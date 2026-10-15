// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AppsAPI from './apps';
import { DenylistEntriesCursor } from './apps';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to app settings and allowlist management
 */
export class Denylist extends APIResource {
  /**
   * Add a new entry to the denylist for an app. Adding an entry that already exists
   * returns the existing entry.
   *
   * @example
   * ```ts
   * const denylistEntry = await client.apps.denylist.create(
   *   'app_id',
   *   { type: 'email', value: 'user@example.com' },
   * );
   * ```
   */
  create(
    appID: string,
    body: DenylistCreateParams,
    options?: RequestOptions,
  ): APIPromise<AppsAPI.DenylistEntry> {
    return this._client.post(path`/v1/apps/${appID}/denylist`, { body, ...options });
  }

  /**
   * Get a page of denylist entries for an app, which block matching users from
   * logging in or linking the account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const denylistEntry of client.apps.denylist.list(
   *   'app_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    appID: string,
    query: DenylistListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DenylistEntriesCursor, AppsAPI.DenylistEntry> {
    return this._client.getAPIList(path`/v1/apps/${appID}/denylist`, Cursor<AppsAPI.DenylistEntry>, {
      query,
      ...options,
    });
  }

  /**
   * Remove an entry from the denylist for an app by its ID. Get entry IDs from the
   * list denylist entries endpoint.
   *
   * @example
   * ```ts
   * await client.apps.denylist.delete('app_id', {
   *   id: 'clpa828s4001hl90f6dxoksrg',
   * });
   * ```
   */
  delete(appID: string, body: DenylistDeleteParams, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/apps/${appID}/denylist`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type DenylistCreateParams =
  | DenylistCreateParams.DenylistEmailInput
  | DenylistCreateParams.DenylistEmailDomainInput
  | DenylistCreateParams.DenylistPhoneInput
  | DenylistCreateParams.DenylistEthereumAddressInput
  | DenylistCreateParams.DenylistSolanaAddressInput;

export declare namespace DenylistCreateParams {
  export interface DenylistEmailInput {
    type: 'email';

    value: string;
  }

  export interface DenylistEmailDomainInput {
    type: 'emailDomain';

    /**
     * An email domain.
     */
    value: AppsAPI.EmailDomain;
  }

  export interface DenylistPhoneInput {
    type: 'phone';

    value: string;
  }

  export interface DenylistEthereumAddressInput {
    type: 'ethereumAddress';

    value: string;
  }

  export interface DenylistSolanaAddressInput {
    type: 'solanaAddress';

    value: string;
  }
}

export interface DenylistListParams extends CursorParams {}

export interface DenylistDeleteParams {
  /**
   * The ID of the denylist entry to remove.
   */
  id: string;
}

export declare namespace Denylist {
  export {
    type DenylistCreateParams as DenylistCreateParams,
    type DenylistListParams as DenylistListParams,
    type DenylistDeleteParams as DenylistDeleteParams,
  };
}

export { type DenylistEntriesCursor };
