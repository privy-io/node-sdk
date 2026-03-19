// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class CrossApp extends APIResource {}

/**
 * A cross-app connection definition
 */
export interface CrossAppConnection {
  provider_app_custom_api_url: string | null;

  provider_app_custom_auth_authorize_url: string | null;

  provider_app_custom_auth_transact_url: string | null;

  provider_app_icon_url: string | null;

  provider_app_id: string;

  provider_app_name: string;

  read_only: boolean;
}

/**
 * The response for getting the list of cross-app connections.
 */
export interface CrossAppConnectionsResponse {
  connections: Array<CrossAppConnection>;
}

export declare namespace CrossApp {
  export {
    type CrossAppConnection as CrossAppConnection,
    type CrossAppConnectionsResponse as CrossAppConnectionsResponse,
  };
}
