// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AppsAPI from './apps';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations related to app settings and allowlist management
 */
export class Allowlist extends APIResource {
  /**
   * Add a new entry to the allowlist for an app. The allowlist must be enabled.
   *
   * @example
   * ```ts
   * const allowlistEntry = await client.apps.allowlist.create(
   *   'app_id',
   *   { type: 'email', value: 'batman@privy.io' },
   * );
   * ```
   */
  create(
    appID: string,
    body: AllowlistCreateParams,
    options?: RequestOptions,
  ): APIPromise<AppsAPI.AllowlistEntry> {
    return this._client.post(path`/v1/apps/${appID}/allowlist`, { body, ...options });
  }

  /**
   * Get all allowlist entries for an app. Returns the list of users allowed to
   * access the app when the allowlist is enabled.
   *
   * @example
   * ```ts
   * const allowlistEntries = await client.apps.allowlist.list(
   *   'app_id',
   * );
   * ```
   */
  list(appID: string, options?: RequestOptions): APIPromise<AllowlistListResponse> {
    return this._client.get(path`/v1/apps/${appID}/allowlist`, options);
  }

  /**
   * Remove an entry from the allowlist for an app. The allowlist must be enabled.
   *
   * @example
   * ```ts
   * const allowlistDeletionResponse =
   *   await client.apps.allowlist.delete('app_id', {
   *     type: 'email',
   *     value: 'batman@privy.io',
   *   });
   * ```
   */
  delete(
    appID: string,
    body: AllowlistDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AppsAPI.AllowlistDeletionResponse> {
    return this._client.delete(path`/v1/apps/${appID}/allowlist`, { body, ...options });
  }
}

export type AllowlistListResponse = Array<AppsAPI.AllowlistEntry>;

export type AllowlistCreateParams =
  | AllowlistCreateParams.EmailInviteInput
  | AllowlistCreateParams.WalletInviteInput
  | AllowlistCreateParams.PhoneInviteInput;

export declare namespace AllowlistCreateParams {
  export interface EmailInviteInput {
    type: 'email';

    value: string;
  }

  export interface WalletInviteInput {
    type: 'wallet';

    value: string;
  }

  export interface PhoneInviteInput {
    type: 'phone';

    value: string;
  }
}

export type AllowlistDeleteParams =
  | AllowlistDeleteParams.EmailInviteInput
  | AllowlistDeleteParams.WalletInviteInput
  | AllowlistDeleteParams.PhoneInviteInput;

export declare namespace AllowlistDeleteParams {
  export interface EmailInviteInput {
    type: 'email';

    value: string;
  }

  export interface WalletInviteInput {
    type: 'wallet';

    value: string;
  }

  export interface PhoneInviteInput {
    type: 'phone';

    value: string;
  }
}

export declare namespace Allowlist {
  export {
    type AllowlistListResponse as AllowlistListResponse,
    type AllowlistCreateParams as AllowlistCreateParams,
    type AllowlistDeleteParams as AllowlistDeleteParams,
  };
}
