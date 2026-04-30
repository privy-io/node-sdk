// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Organizations extends APIResource {}

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
 * Response returned when creating a new organization secret.
 */
export interface CreateOrganizationSecretResponse extends OrganizationSecretView {
  /**
   * The plaintext organization secret. Returned only at creation time.
   */
  organization_secret: string;
}

/**
 * Response returned when listing organization secrets for an account.
 */
export interface OrganizationSecretsListResponse {
  data: Array<OrganizationSecretView>;
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
 * Request body for updating the signing public key on an organization secret.
 */
export interface UpdateOrganizationSecretSigningKeyInput extends OrganizationSecretIDInput {
  /**
   * P-256 public key in PEM format, or null to clear the configured signing key.
   */
  signing_public_key: string | null;
}

export declare namespace Organizations {
  export {
    type OrganizationSecretView as OrganizationSecretView,
    type CreateOrganizationSecretResponse as CreateOrganizationSecretResponse,
    type OrganizationSecretsListResponse as OrganizationSecretsListResponse,
    type OrganizationSecretIDInput as OrganizationSecretIDInput,
    type UpdateOrganizationSecretSigningKeyInput as UpdateOrganizationSecretSigningKeyInput,
  };
}
