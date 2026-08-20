// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations related to organizations
 */
export class Organizations extends APIResource {
  /**
   * Create an organization in an app.
   */
  create(body: OrganizationCreateParams, options?: RequestOptions): APIPromise<Organization> {
    return this._client.post('/v1/organizations', { body, ...options });
  }

  /**
   * Update an organization by ID.
   */
  update(
    organizationID: string,
    body: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Organization> {
    return this._client.patch(path`/v1/organizations/${organizationID}`, { body, ...options });
  }

  /**
   * List organizations in an app.
   */
  list(
    query: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OrganizationsCursor, Organization> {
    return this._client.getAPIList('/v1/organizations', Cursor<Organization>, { query, ...options });
  }

  /**
   * Delete an organization by ID.
   */
  delete(organizationID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/organizations/${organizationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get an organization by ID.
   */
  get(organizationID: string, options?: RequestOptions): APIPromise<Organization> {
    return this._client.get(path`/v1/organizations/${organizationID}`, options);
  }
}

export type OrganizationsCursor = Cursor<Organization>;

/**
 * Response returned when creating a new organization secret.
 */
export interface CreateOrganizationSecretResponse extends OrganizationSecretView {
  /**
   * The plaintext organization secret. Returned only at creation time.
   */
  organization_secret: string;
}

/**
 * A Privy organization object.
 */
export interface Organization {
  /**
   * Unique organization identifier
   */
  id: string;

  /**
   * Unix timestamp when the organization was created
   */
  created_at: number;

  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  /**
   * Organization display name
   */
  display_name: string;

  /**
   * Unix timestamp when the organization was last updated
   */
  updated_at: number;
}

/**
 * Request body for creating an organization.
 */
export interface OrganizationCreateRequestBody {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  display_name: string;
}

/**
 * Request body for targeting a specific organization secret.
 */
export interface OrganizationSecretIDInput {
  /**
   * The organization secret ID.
   */
  secret_id: string;
}

/**
 * View of an organization secret for list and management endpoints.
 */
export interface OrganizationSecretView {
  /**
   * Unique secret identifier
   */
  id: string;

  /**
   * ISO 8601 creation timestamp
   */
  created_at: string;

  /**
   * Last four characters of the secret
   */
  last_four: string;

  /**
   * ISO 8601 revocation timestamp, or null if active
   */
  revoked_at: string | null;

  /**
   * P-256 public key in PEM format for request signing, or null if not configured
   */
  signing_public_key: string | null;
}

/**
 * Response returned when listing organization secrets for an account.
 */
export interface OrganizationSecretsListResponse {
  data: Array<OrganizationSecretView>;
}

/**
 * Request body for updating an organization.
 */
export interface OrganizationUpdateRequestBody {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id?: SharedAPI.KeyQuorumID;

  display_name?: string;
}

/**
 * Response returned when listing organizations for an app.
 */
export interface OrganizationsListResponse {
  data: Array<Organization>;

  next_cursor: string | null;
}

/**
 * Request body for updating the signing public key on an organization secret.
 */
export interface UpdateOrganizationSecretSigningKeyInput extends OrganizationSecretIDInput {
  /**
   * P-256 public key in PEM format, or null to clear the configured signing key.
   */
  signing_public_key: string | null;
}

export interface OrganizationCreateParams {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id: SharedAPI.KeyQuorumID;

  display_name: string;
}

export interface OrganizationUpdateParams {
  /**
   * A unique identifier for a key quorum.
   */
  default_key_quorum_id?: SharedAPI.KeyQuorumID;

  display_name?: string;
}

export interface OrganizationListParams extends CursorParams {}

export declare namespace Organizations {
  export {
    type CreateOrganizationSecretResponse as CreateOrganizationSecretResponse,
    type Organization as Organization,
    type OrganizationCreateRequestBody as OrganizationCreateRequestBody,
    type OrganizationSecretIDInput as OrganizationSecretIDInput,
    type OrganizationSecretView as OrganizationSecretView,
    type OrganizationSecretsListResponse as OrganizationSecretsListResponse,
    type OrganizationUpdateRequestBody as OrganizationUpdateRequestBody,
    type OrganizationsListResponse as OrganizationsListResponse,
    type UpdateOrganizationSecretSigningKeyInput as UpdateOrganizationSecretSigningKeyInput,
    type OrganizationsCursor as OrganizationsCursor,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
  };
}
