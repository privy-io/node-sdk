// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class EmbeddedWallets extends APIResource {}

/**
 * The type of recovery mechanism used for wallet recovery.
 */
export type RecoveryType =
  | 'user_passcode_derived_recovery_key'
  | 'privy_passcode_derived_recovery_key'
  | 'privy_generated_recovery_key'
  | 'google_drive_recovery_secret'
  | 'icloud_recovery_secret';

/**
 * The client type for iCloud recovery operations.
 */
export type ICloudClientType = 'web' | 'expo-ios';

/**
 * The input for getting the recovery key material.
 */
export interface RecoveryKeyMaterialInput {
  chain_type?: string;
}

/**
 * The response containing the recovery key material.
 */
export interface RecoveryKeyMaterialResponse {
  file_id: string;

  icloud_record_name: string;

  recovery_code: string;

  recovery_key: string;

  recovery_key_derivation_salt: string;

  /**
   * The type of recovery mechanism used for wallet recovery.
   */
  recovery_type: RecoveryType;
}

/**
 * The input for initiating an OAuth recovery flow.
 */
export interface OAuthInitRecoveryInput {
  redirect_to: string;

  token?: string;

  code_challenge?: string;

  state_code?: string;
}

/**
 * The response from authenticating with OAuth for recovery.
 */
export interface OAuthAuthenticateRecoveryResponse {
  access_token: string;
}

/**
 * The input for initiating an iCloud OAuth recovery flow.
 */
export interface OAuthInitICloudRecoveryInput {
  /**
   * The client type for iCloud recovery operations.
   */
  client_type: ICloudClientType;
}

/**
 * The input for the iCloud Expo OAuth callback.
 */
export interface OAuthCallbackICloudExpoInput {
  ckWebAuthToken: string;
}

/**
 * The input for getting the iCloud recovery configuration.
 */
export interface RecoveryConfigurationICloudInput {
  /**
   * The client type for iCloud recovery operations.
   */
  client_type: ICloudClientType;
}

/**
 * The response containing the iCloud recovery configuration.
 */
export interface RecoveryConfigurationICloudResponse {
  api_token: string;

  container_identifier: string;

  environment: string;
}

export declare namespace EmbeddedWallets {
  export {
    type RecoveryType as RecoveryType,
    type ICloudClientType as ICloudClientType,
    type RecoveryKeyMaterialInput as RecoveryKeyMaterialInput,
    type RecoveryKeyMaterialResponse as RecoveryKeyMaterialResponse,
    type OAuthInitRecoveryInput as OAuthInitRecoveryInput,
    type OAuthAuthenticateRecoveryResponse as OAuthAuthenticateRecoveryResponse,
    type OAuthInitICloudRecoveryInput as OAuthInitICloudRecoveryInput,
    type OAuthCallbackICloudExpoInput as OAuthCallbackICloudExpoInput,
    type RecoveryConfigurationICloudInput as RecoveryConfigurationICloudInput,
    type RecoveryConfigurationICloudResponse as RecoveryConfigurationICloudResponse,
  };
}
