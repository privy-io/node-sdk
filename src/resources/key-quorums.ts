// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
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
   * const response = await client.keyQuorums._delete(
   *   'key_quorum_id',
   * );
   * ```
   */
  _delete(
    keyQuorumID: string,
    params: KeyQuorumDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<KeyQuorumDeleteResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature } = params ?? {};
    return this._client.delete(path`/v1/key_quorums/${keyQuorumID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
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
   *   'key_quorum_id',
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
    keyQuorumID: string,
    params: KeyQuorumUpdateParams,
    options?: RequestOptions,
  ): APIPromise<KeyQuorum> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/key_quorums/${keyQuorumID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
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
   * const keyQuorum = await client.keyQuorums.get(
   *   'key_quorum_id',
   * );
   * ```
   */
  get(keyQuorumID: string, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.get(path`/v1/key_quorums/${keyQuorumID}`, options);
  }
}

/**
 * Request input for creating or updating a key quorum.
 */
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

/**
 * A key quorum for authorizing wallet operations.
 */
export interface KeyQuorum {
  id: string;

  authorization_keys: Array<KeyQuorum.AuthorizationKey>;

  authorization_threshold?: number;

  display_name?: string;

  /**
   * List of nested key quorum IDs that are members of this key quorum.
   */
  key_quorum_ids?: Array<string>;

  user_ids?: Array<string>;
}

export namespace KeyQuorum {
  export interface AuthorizationKey {
    display_name: string | null;

    public_key: string;
  }
}

export interface KeyQuorumDeleteResponse {
  /**
   * Whether the key quorum was deleted successfully.
   */
  success: boolean;
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
}

export declare namespace KeyQuorums {
  export {
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorum as KeyQuorum,
    type KeyQuorumDeleteResponse as KeyQuorumDeleteResponse,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
  };
}
