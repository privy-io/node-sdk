// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class KeyQuorums extends APIResource {
  /**
   * Create a new key quorum.
   */
  create(body: KeyQuorumCreateParams, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.post('/v1/key_quorums', { body, ...options });
  }

  /**
   * Get a key quorum by ID.
   */
  retrieve(keyQuorumID: string, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.get(path`/v1/key_quorums/${keyQuorumID}`, options);
  }

  /**
   * Update a key quorum by key quorum ID.
   */
  update(
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
   * Delete a key quorum by key quorum ID.
   */
  delete(
    keyQuorumID: string,
    params: KeyQuorumDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<KeyQuorum> {
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
}

export interface KeyQuorum {
  id: string;

  authorization_keys: Array<KeyQuorum.AuthorizationKey>;

  authorization_threshold?: number;

  display_name?: string;
}

export namespace KeyQuorum {
  export interface AuthorizationKey {
    display_name: string | null;

    public_key: string;
  }
}

export interface KeyQuorumCreateParams {
  public_keys: Array<string>;

  authorization_threshold?: number;

  display_name?: string;
}

export interface KeyQuorumUpdateParams {
  /**
   * Body param:
   */
  public_keys: Array<string>;

  /**
   * Body param:
   */
  authorization_threshold?: number;

  /**
   * Body param:
   */
  display_name?: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface KeyQuorumDeleteParams {
  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace KeyQuorums {
  export {
    type KeyQuorum as KeyQuorum,
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
  };
}
