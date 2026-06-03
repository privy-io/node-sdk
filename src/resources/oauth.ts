// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class OAuth extends APIResource {}

/**
 * Response from the device authorization endpoint per RFC 8628. Contains codes and
 * URIs for the device flow.
 */
export interface DeviceAuthorizationResponse {
  /**
   * A long-lived code used by the device to poll for authorization status.
   */
  device_code: string;

  /**
   * The lifetime in seconds of the device_code and user_code.
   */
  expires_in: number;

  /**
   * The minimum number of seconds the device should wait between polling requests.
   */
  interval: number;

  /**
   * A short code displayed to the user, who enters it at the verification URI to
   * authorize the device.
   */
  user_code: string;

  /**
   * The URI where the user navigates to enter the user_code.
   */
  verification_uri: string;

  /**
   * The verification URI with the user_code pre-filled as a query parameter.
   */
  verification_uri_complete: string;
}

/**
 * An active OAuth grant representing an authorized session.
 */
export interface OAuthGrant {
  /**
   * The grant identifier.
   */
  id: string;

  /**
   * When the grant was first created.
   */
  created_at: string;

  /**
   * The OAuth grant type that created this grant.
   */
  grant_type: 'device_code';

  /**
   * When the grant was last used (e.g. token refreshed).
   */
  last_used_at: string;
}

/**
 * List of active OAuth grants for the authenticated user.
 */
export interface OAuthGrantListResponse {
  /**
   * Active grants.
   */
  data: Array<OAuthGrant>;
}

/**
 * Response from revoking an OAuth grant.
 */
export interface OAuthGrantRevokeResponse {
  /**
   * Whether the revocation was processed.
   */
  success: true;
}

export declare namespace OAuth {
  export {
    type DeviceAuthorizationResponse as DeviceAuthorizationResponse,
    type OAuthGrant as OAuthGrant,
    type OAuthGrantListResponse as OAuthGrantListResponse,
    type OAuthGrantRevokeResponse as OAuthGrantRevokeResponse,
  };
}
