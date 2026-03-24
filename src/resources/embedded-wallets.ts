// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WalletsAPI from './wallets/wallets';

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

/**
 * An additional signer configuration for a wallet.
 */
export interface WalletCreationAdditionalSignerItem {
  /**
   * The key quorum ID for the signer.
   */
  signer_id: string;

  /**
   * The array of policy IDs that will be applied to wallet requests. If specified,
   * this will override the base policy IDs set on the wallet. Currently, only one
   * policy is supported per signer.
   */
  override_policy_ids?: Array<string>;
}

/**
 * The fields on wallet creation that can be specified when creating a
 * user-controlled embedded server wallet.
 */
export interface WalletCreationInput {
  /**
   * The wallet chain types.
   */
  chain_type: WalletsAPI.WalletChainType;

  /**
   * Additional signers for the wallet.
   */
  additional_signers?: Array<WalletCreationAdditionalSignerItem>;

  /**
   * Create a smart wallet with this wallet as the signer. Only supported for wallets
   * with `chain_type: "ethereum"`.
   */
  create_smart_wallet?: boolean;

  /**
   * Policy IDs to enforce on the wallet. Currently, only one policy is supported per
   * wallet.
   */
  policy_ids?: Array<string>;
}

/**
 * The fields describing embedded wallet creation, used for user import and
 * embedded wallet generation.
 */
export interface EmbeddedWalletCreationInput {
  /**
   * Wallets to create.
   */
  wallets?: Array<WalletCreationInput>;
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
    type WalletCreationAdditionalSignerItem as WalletCreationAdditionalSignerItem,
    type WalletCreationInput as WalletCreationInput,
    type EmbeddedWalletCreationInput as EmbeddedWalletCreationInput,
  };
}
