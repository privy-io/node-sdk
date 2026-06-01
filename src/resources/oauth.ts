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

export declare namespace OAuth {
  export { type DeviceAuthorizationResponse as DeviceAuthorizationResponse };
}
