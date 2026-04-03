// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to key quorums
 */
export class KeyQuorums extends APIResource {
  /**
   * Create a new key quorum.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums.create({
   *   authorization_threshold: 1,
   *   display_name: 'Prod key quorum',
   *   public_keys: [
   *     'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEx4aoeD72yykviK+f/ckqE2CItVIG\n1rCnvC3/XZ1HgpOcMEMialRmTrqIK4oZlYd1RfxU3za/C9yjhboIuoPD3g==',
   *     'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErzZtQr/bMIh3Y8f9ZqseB9i/AfjQ\nhu+agbNqXcJy/TfoNqvc/Y3Mh7gIZ8ZLXQEykycx4mYSpqrxp1lBKqsZDQ==',
   *   ],
   * });
   * ```
   */
  create(body: KeyQuorumCreateParams, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.post('/v1/key_quorums', { body, ...options });
  }

  /**
   * Delete a key quorum by key quorum ID.
   *
   * @example
   * ```ts
   * const successResponse = await client.keyQuorums._delete(
   *   'string',
   * );
   * ```
   */
  _delete(
    keyQuorumID: SharedAPI.KeyQuorumID,
    params: KeyQuorumDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SharedAPI.SuccessResponse> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
    } = params ?? {};
    return this._client.delete(path`/v1/key_quorums/${keyQuorumID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a key quorum by key quorum ID.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums._update(
   *   'string',
   *   {
   *     authorization_threshold: 1,
   *     display_name: 'Prod key quorum',
   *     public_keys: [
   *       'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEx4aoeD72yykviK+f/ckqE2CItVIG\n1rCnvC3/XZ1HgpOcMEMialRmTrqIK4oZlYd1RfxU3za/C9yjhboIuoPD3g==',
   *     ],
   *   },
   * );
   * ```
   */
  _update(
    keyQuorumID: SharedAPI.KeyQuorumID,
    params: KeyQuorumUpdateParams,
    options?: RequestOptions,
  ): APIPromise<KeyQuorum> {
    const {
      'privy-authorization-signature': privyAuthorizationSignature,
      'privy-request-expiry': privyRequestExpiry,
      ...body
    } = params;
    return this._client.patch(path`/v1/key_quorums/${keyQuorumID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
          ...(privyRequestExpiry != null ? { 'privy-request-expiry': privyRequestExpiry } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a key quorum by ID.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums.get('string');
   * ```
   */
  get(keyQuorumID: SharedAPI.KeyQuorumID, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.get(path`/v1/key_quorums/${keyQuorumID}`, options);
  }
}

/**
 * A key quorum for authorizing wallet operations.
 */
export interface KeyQuorum {
  id: string;

  authorization_keys: Array<KeyQuorum.AuthorizationKey>;

  authorization_threshold: number | null;

  display_name: string | null;

  user_ids: Array<string> | null;

  /**
   * List of nested key quorum IDs that are members of this key quorum.
   */
  key_quorum_ids?: Array<string>;
}

export namespace KeyQuorum {
  export interface AuthorizationKey {
    display_name: string | null;

    public_key: string;
  }
}

/**
 * Request input for creating a key quorum.
 */
export interface KeyQuorumCreateRequestBody {
  /**
   * The number of keys that must sign for an action to be valid. Must be less than
   * or equal to total number of key quorum members.
   */
  authorization_threshold?: number;

  display_name?: string;

  /**
   * List of key quorum IDs that should be members of this key quorum. Key quorums
   * can only be nested 1 level deep.
   */
  key_quorum_ids?: Array<string>;

  /**
   * List of P-256 public keys of the keys that should be authorized to sign on the
   * key quorum, in base64-encoded DER format.
   */
  public_keys?: Array<string>;

  /**
   * List of user IDs of the users that should be authorized to sign on the key
   * quorum.
   */
  user_ids?: Array<string>;
}

/**
 * Request input for updating an existing key quorum.
 */
export interface KeyQuorumUpdateRequestBody {
  /**
   * The number of keys that must sign for an action to be valid. Must be less than
   * or equal to total number of key quorum members.
   */
  authorization_threshold?: number;

  display_name?: string;

  /**
   * List of key quorum IDs that should be members of this key quorum. Key quorums
   * can only be nested 1 level deep.
   */
  key_quorum_ids?: Array<string>;

  /**
   * List of P-256 public keys of the keys that should be authorized to sign on the
   * key quorum, in base64-encoded DER format.
   */
  public_keys?: Array<string>;

  /**
   * List of user IDs of the users that should be authorized to sign on the key
   * quorum.
   */
  user_ids?: Array<string>;
}

/**
 * Headers required to authorize modifications to key quorums.
 */
export interface KeyQuorumAuthorizationHeaders {
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

export interface KeyQuorumCreateParams {
  /**
   * The number of keys that must sign for an action to be valid. Must be less than
   * or equal to total number of key quorum members.
   */
  authorization_threshold?: number;

  display_name?: string;

  /**
   * List of key quorum IDs that should be members of this key quorum. Key quorums
   * can only be nested 1 level deep.
   */
  key_quorum_ids?: Array<string>;

  /**
   * List of P-256 public keys of the keys that should be authorized to sign on the
   * key quorum, in base64-encoded DER format.
   */
  public_keys?: Array<string>;

  /**
   * List of user IDs of the users that should be authorized to sign on the key
   * quorum.
   */
  user_ids?: Array<string>;
}

export interface KeyQuorumDeleteParams {
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

export interface KeyQuorumUpdateParams {
  /**
   * Body param: The number of keys that must sign for an action to be valid. Must be
   * less than or equal to total number of key quorum members.
   */
  authorization_threshold?: number;

  /**
   * Body param
   */
  display_name?: string;

  /**
   * Body param: List of key quorum IDs that should be members of this key quorum.
   * Key quorums can only be nested 1 level deep.
   */
  key_quorum_ids?: Array<string>;

  /**
   * Body param: List of P-256 public keys of the keys that should be authorized to
   * sign on the key quorum, in base64-encoded DER format.
   */
  public_keys?: Array<string>;

  /**
   * Body param: List of user IDs of the users that should be authorized to sign on
   * the key quorum.
   */
  user_ids?: Array<string>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;

  /**
   * Header param: Request expiry. Value is a Unix timestamp in milliseconds
   * representing the deadline by which the request must be processed.
   */
  'privy-request-expiry'?: string;
}

export declare namespace KeyQuorums {
  export {
    type KeyQuorum as KeyQuorum,
    type KeyQuorumCreateRequestBody as KeyQuorumCreateRequestBody,
    type KeyQuorumUpdateRequestBody as KeyQuorumUpdateRequestBody,
    type KeyQuorumAuthorizationHeaders as KeyQuorumAuthorizationHeaders,
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
  };
}
