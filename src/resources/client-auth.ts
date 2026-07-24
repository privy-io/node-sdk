// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as EmbeddedWalletsAPI from './embedded-wallets';
import * as UsersAPI from './users';

export class ClientAuth extends APIResource {}

/**
 * Input for authenticating with a custom JWT.
 */
export interface AuthenticateJwtInput {
  token?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The authentication mode settings for the ceremony.
 */
export interface AuthenticateMode {
  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * Whether to allow sign-up during authentication.
 */
export type AuthenticateModeOption = 'no-signup' | 'login-or-sign-up';

/**
 * Input for authenticating a SIWE ceremony.
 */
export interface AuthenticateSiweInput {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  walletClientType?: string | null;
}

/**
 * Input for authenticating a SIWS ceremony.
 */
export interface AuthenticateSiwsInput {
  message: string;

  signature: string;

  connectorType?: string | null;

  /**
   * The type of SIWS message being signed.
   */
  message_type?: SiwsMessageType;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  walletClientType?: string | null;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeBrlFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'brl';

  bank_address: string;

  bank_name: string;

  br_code: string;

  payment_rails: Array<'pix'>;
}

/**
 * Supported destination stablecoin assets for fiat-to-crypto transfers.
 */
export type BridgeDestinationAsset = 'usdb' | 'usdc' | 'usdt' | 'dai' | 'pyusd' | 'eurc';

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeEurFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'eur';

  bank_address: string;

  bank_name: string;

  bic: string;

  iban: string;

  payment_rails: Array<'sepa'>;
}

/**
 * The deposit instructions for a virtual account.
 */
export type BridgeFiatVirtualAccountDepositInstructions =
  | BridgeUsdFiatVirtualAccountDepositInstructions
  | BridgeEurFiatVirtualAccountDepositInstructions
  | BridgeMxnFiatVirtualAccountDepositInstructions
  | BridgeBrlFiatVirtualAccountDepositInstructions
  | BridgeGbpFiatVirtualAccountDepositInstructions;

/**
 * The destination chain, asset, and address for a virtual account transfer.
 */
export interface BridgeFiatVirtualAccountDestination {
  address: string;

  /**
   * Supported destination stablecoin assets for fiat-to-crypto transfers.
   */
  asset: BridgeDestinationAsset;

  chain: string;
}

/**
 * The request input for creating virtual account.
 */
export interface BridgeFiatVirtualAccountRequest {
  /**
   * The destination chain, asset, and address for a virtual account transfer.
   */
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  /**
   * The source fiat currency configuration for a virtual account.
   */
  source: BridgeFiatVirtualAccountSource;
}

/**
 * The response for creating virtual account.
 */
export interface BridgeFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  /**
   * The destination chain, asset, and address for a virtual account transfer.
   */
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  status: string;
}

/**
 * The source fiat currency configuration for a virtual account.
 */
export interface BridgeFiatVirtualAccountSource {
  /**
   * Supported source fiat currencies for virtual account deposits.
   */
  asset: BridgeSourceAsset;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeGbpFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  account_number: string;

  asset: 'gbp';

  bank_address: string;

  bank_name: string;

  payment_rails: Array<'faster_payments'>;

  sort_code: string;
}

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeMxnFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'mxn';

  bank_address: string;

  bank_name: string;

  clabe: string;

  payment_rails: Array<'spei'>;
}

/**
 * Bridge provider variant — production or sandbox.
 */
export type BridgeOnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * The request input for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountRequest {
  /**
   * The destination chain, asset, and address for a virtual account transfer.
   */
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  /**
   * The source fiat currency configuration for a virtual account.
   */
  source: BridgeFiatVirtualAccountSource;
}

/**
 * The response for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  /**
   * The destination chain, asset, and address for a virtual account transfer.
   */
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  status: string;
}

/**
 * Supported source fiat currencies for virtual account deposits.
 */
export type BridgeSourceAsset = 'usd' | 'eur' | 'mxn' | 'brl' | 'gbp';

/**
 * The deposit instructions for a virtual account.
 */
export interface BridgeUsdFiatVirtualAccountDepositInstructions {
  asset: 'usd';

  bank_account_number: string;

  bank_address: string;

  bank_beneficiary_address: string;

  bank_beneficiary_name: string;

  bank_name: string;

  bank_routing_number: string;

  payment_rails: Array<BridgeUsdFiatVirtualAccountDepositPaymentRail>;
}

/**
 * Payment rails supported for USD virtual account deposits.
 */
export type BridgeUsdFiatVirtualAccountDepositPaymentRail = 'ach_push' | 'wire';

/**
 * The request body for authenticating with a custom JWT.
 */
export interface CustomJwtAuthenticateRequestBody {
  token?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for linking a custom JWT account.
 */
export interface CustomJwtLinkRequestBody {
  token?: string;
}

/**
 * The ID of a custom OAuth provider, set up for this app. Must start with
 * "custom:".
 */
export type CustomOAuthProviderID = string;

/**
 * The action to take on the device authorization request.
 */
export type DeviceVerifyAction = 'approve' | 'deny';

/**
 * Request body for approving or denying a device authorization request. The user
 * must be authenticated and belong to the target app.
 */
export interface DeviceVerifyRequestBody {
  /**
   * The action to take on the device authorization request.
   */
  action: DeviceVerifyAction;

  /**
   * The user code displayed on the CLI device.
   */
  user_code: string;
}

/**
 * Response indicating the device authorization action was processed.
 */
export interface DeviceVerifyResponse {
  /**
   * Whether the action was processed successfully.
   */
  success: boolean;
}

/**
 * The ID of an external OAuth provider.
 */
export type ExternalOAuthProviderID =
  | 'google'
  | 'discord'
  | 'twitter'
  | 'github'
  | 'spotify'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'apple'
  | 'line'
  | 'twitch'
  | 'telegram';

/**
 * Input for authenticating with Farcaster.
 */
export interface FarcasterAuthenticateInput {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for authenticating with Farcaster.
 */
export interface FarcasterAuthenticateRequestBody {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * Proxy for the Farcaster Connect init response as defined in FIP-11.
 */
export interface FarcasterConnectInitResponse {
  channel_token: string;

  connect_uri: string;
}

/**
 * The response body for initiating a Farcaster connection.
 */
export interface FarcasterConnectInitResponseBody {
  channel_token: string;

  connect_uri: string;
}

/**
 * Proxy for the Farcaster Connect completed status response as defined in FIP-11.
 */
export interface FarcasterConnectStatusCompletedResponse {
  bio: string;

  display_name: string;

  fid: number;

  message: string;

  nonce: string;

  pfp_url: string;

  signature: string;

  state: 'completed';

  username: string;
}

/**
 * The response body for completing a Farcaster connection.
 */
export interface FarcasterConnectStatusCompletedResponseBody {
  bio: string;

  display_name: string;

  fid: number;

  message: string;

  nonce: string;

  pfp_url: string;

  signature: string;

  state: 'completed';

  username: string;
}

/**
 * Proxy for the Farcaster Connect pending status response as defined in FIP-11.
 */
export interface FarcasterConnectStatusPendingResponse {
  nonce: string;

  state: 'pending';
}

/**
 * The response body for pending a Farcaster connection.
 */
export interface FarcasterConnectStatusPendingResponseBody {
  nonce: string;

  state: 'pending';
}

/**
 * Input for initiating a Farcaster connection.
 */
export interface FarcasterInitInput {
  token?: string;

  redirect_url?: string;

  relying_party?: string;
}

/**
 * The request body for initiating a Farcaster connection.
 */
export interface FarcasterInitRequestBody {
  token?: string;

  redirect_url?: string;

  relying_party?: string;
}

/**
 * Input for linking a Farcaster account.
 */
export interface FarcasterLinkInput {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;
}

/**
 * The request body for linking a Farcaster account.
 */
export interface FarcasterLinkRequestBody {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;
}

/**
 * A Farcaster signer response when the signer has been approved.
 */
export interface FarcasterSignerApproved {
  fid: string;

  public_key: string;

  status: 'approved';
}

/**
 * A Farcaster signer init response when the signer is pending approval.
 */
export interface FarcasterSignerInitPendingApproval {
  public_key: string;

  signer_approval_url: string;

  status: 'pending_approval';
}

/**
 * The request body for initiating a Farcaster signer connection.
 */
export interface FarcasterSignerInitRequestBody {
  ed25519_public_key: string;

  deadline?: string;
}

/**
 * The response body from initiating a Farcaster signer connection.
 */
export type FarcasterSignerInitResponseBody =
  | FarcasterSignerInitPendingApproval
  | FarcasterSignerApproved
  | FarcasterSignerRevoked;

/**
 * A Farcaster signer response when the signer has been revoked.
 */
export interface FarcasterSignerRevoked {
  fid: string;

  public_key: string;

  status: 'revoked';
}

/**
 * A Farcaster signer status response when the signer is pending approval.
 */
export interface FarcasterSignerStatusPendingApproval {
  public_key: string;

  status: 'pending_approval';
}

/**
 * The response body from checking the status of a Farcaster signer connection.
 */
export type FarcasterSignerStatusResponseBody =
  | FarcasterSignerStatusPendingApproval
  | FarcasterSignerApproved
  | FarcasterSignerRevoked;

/**
 * Input for unlinking a Farcaster account.
 */
export interface FarcasterUnlinkInput {
  fid: number;
}

/**
 * The request body for unlinking a Farcaster account.
 */
export interface FarcasterUnlinkRequestBody {
  fid: number;
}

/**
 * Input for authenticating a Farcaster V2 account.
 */
export interface FarcasterV2AuthenticateInput {
  fid: number;

  message: string;

  signature: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for authenticating a Farcaster V2 account.
 */
export interface FarcasterV2AuthenticateRequestBody {
  fid: number;

  message: string;

  signature: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * Input for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitInput {}

/**
 * The request body for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitRequestBody {}

/**
 * Response for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitResponse {
  expires_at: string;

  nonce: string;
}

/**
 * The response body for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitResponseBody {
  expires_at: string;

  nonce: string;
}

/**
 * The request input for creating virtual account.
 */
export type FiatVirtualAccountRequest =
  | BridgeFiatVirtualAccountRequest
  | BridgeSandboxFiatVirtualAccountRequest;

/**
 * The response for creating virtual account.
 */
export type FiatVirtualAccountResponse =
  | BridgeFiatVirtualAccountResponse
  | BridgeSandboxFiatVirtualAccountResponse;

/**
 * The request body for authenticating a guest.
 */
export interface GuestAuthenticateRequestBody {
  guest_credential: string;
}

/**
 * Input for linking a custom JWT account.
 */
export interface LinkJwtInput {
  token?: string;
}

/**
 * The request body for enrolling an email MFA code.
 */
export interface MfaEmailEnrollRequestBody {
  code: string;

  email_address: string;
}

/**
 * Input for enrolling email MFA.
 */
export interface MfaEmailInitEnrollInput {
  action: 'enroll';

  email_address: string;
}

/**
 * The request body for initiating an email MFA flow.
 */
export type MfaEmailInitRequestBody = MfaEmailInitVerifyInput | MfaEmailInitEnrollInput;

/**
 * Input for verifying email MFA.
 */
export interface MfaEmailInitVerifyInput {
  action: 'verify';
}

/**
 * The request body for verifying an email MFA code.
 */
export interface MfaEmailVerifyRequestBody {
  code: string;
}

/**
 * The request body for enrolling a passkey MFA flow.
 */
export interface MfaPasskeyEnrollmentRequestBody {
  credential_ids: Array<string>;

  remove_for_login?: boolean;
}

/**
 * The request body for initiating a passkey MFA flow.
 */
export interface MfaPasskeyInitRequestBody {
  relying_party?: string;
}

/**
 * The response body for initializing a passkey MFA flow.
 */
export interface MfaPasskeyInitResponseBody {
  /**
   * WebAuthn authentication options as defined by the Web Authentication
   * specification.
   */
  options: PasskeyAuthenticatorVerifyOptions;

  relying_party?: string;
}

/**
 * The request body for verifying a passkey MFA flow.
 */
export interface MfaPasskeyVerifyRequestBody {
  /**
   * WebAuthn authentication response as defined by the Web Authentication
   * specification.
   */
  authenticator_response: PasskeyAuthenticatorVerifyResponse;

  relying_party?: string;
}

/**
 * The request body for enrolling a SMS MFA code.
 */
export interface MfaSMSEnrollRequestBody {
  code: string;

  phoneNumber: string;
}

/**
 * Input for enrolling SMS MFA.
 */
export interface MfaSMSInitEnrollInput {
  action: 'enroll';

  phoneNumber: string;
}

/**
 * The request body for initiating a SMS MFA flow.
 */
export type MfaSMSInitRequestBody = MfaSMSInitVerifyInput | MfaSMSInitEnrollInput;

/**
 * Input for verifying SMS MFA.
 */
export interface MfaSMSInitVerifyInput {
  action: 'verify';
}

/**
 * The request body for verifying a SMS MFA code.
 */
export interface MfaSMSVerifyRequestBody {
  code: string;
}

/**
 * The response body for initializing a TOTP MFA code.
 */
export interface MfaTotpInitResponseBody {
  totpAuthUrl: string;

  totpSecret: string;
}

/**
 * The input for verifying a TOTP MFA code.
 */
export interface MfaTotpInput {
  code: string;
}

/**
 * The response body for verifying a MFA code.
 */
export interface MfaVerifyResponseBody {
  token: string;
}

/**
 * The request body for authenticating an OAuth account.
 */
export interface OAuthAuthenticateRequestBody {
  authorization_code: string;

  state_code: string;

  /**
   * The type of OAuth authorization code.
   */
  code_type?: OAuthCodeType;

  code_verifier?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for getting an OAuth authorization code.
 */
export interface OAuthAuthorizationCodeRequestBody {
  code_challenge: string;

  redirect_to: string;

  state: string;
}

/**
 * The type of OAuth authorization code.
 */
export type OAuthCodeType = 'raw';

/**
 * The request body for initiating an OAuth ceremony.
 */
export interface OAuthInitRequestBody {
  /**
   * The ID of an OAuth provider.
   */
  provider: OAuthProviderID;

  redirect_to: string;

  token?: string;

  code_challenge?: string;

  state_code?: string;
}

/**
 * The response for initiating an OAuth ceremony.
 */
export interface OAuthInitResponseBody {
  url: string;
}

/**
 * The request body for linking an OAuth account.
 */
export interface OAuthLinkRequestBody {
  authorization_code: string;

  state_code: string;

  /**
   * The type of OAuth authorization code.
   */
  code_type?: OAuthCodeType;

  code_verifier?: string;
}

/**
 * The response for linking an OAuth account.
 */
export interface OAuthLinkResponseBody extends UsersAPI.User {
  /**
   * OAuth tokens associated with the user.
   */
  oauth_tokens?: UsersAPI.OAuthTokens;
}

/**
 * The ID of an OAuth provider.
 */
export type OAuthProviderID = ExternalOAuthProviderID | PrivyOAuthProviderID;

/**
 * Request body for the authorization_code grant type.
 */
export interface OAuthTokenAuthorizationCodeRequestBody {
  /**
   * The authorization code received from the authorization endpoint.
   */
  code: string;

  grant_type: 'authorization_code';

  /**
   * The client ID. Alternative to Basic auth header.
   */
  client_id?: string;

  /**
   * The client secret. Alternative to Basic auth header.
   */
  client_secret?: string;

  /**
   * The redirect URI used in the authorization request.
   */
  redirect_uri?: string;
}

/**
 * Error response returned while the device authorization is still pending (RFC
 * 8628 Section 3.5).
 */
export interface OAuthTokenDeviceCodePendingError {
  /**
   * Error codes for the device authorization pending response per RFC 8628.
   */
  error: OAuthTokenDeviceCodePendingErrorCode;

  /**
   * Human-readable description of the error.
   */
  error_description?: string;

  /**
   * The minimum polling interval in seconds.
   */
  interval?: number;
}

/**
 * Error codes for the device authorization pending response per RFC 8628.
 */
export type OAuthTokenDeviceCodePendingErrorCode =
  | 'authorization_pending'
  | 'slow_down'
  | 'access_denied'
  | 'expired_token';

/**
 * Request body for the urn:ietf:params:oauth:grant-type:device_code grant type
 * (RFC 8628). Used by CLI clients to poll for authorization.
 */
export interface OAuthTokenDeviceCodeRequestBody {
  /**
   * The device code received from the device authorization endpoint.
   */
  device_code: string;

  grant_type: 'urn:ietf:params:oauth:grant-type:device_code';
}

/**
 * The OAuth grant type for the token request.
 */
export type OAuthTokenGrantType =
  | 'authorization_code'
  | 'urn:ietf:params:oauth:grant-type:device_code'
  | 'refresh_token';

/**
 * Request body for the refresh_token grant type. Rotates the refresh token and
 * issues a new access token.
 */
export interface OAuthTokenRefreshTokenRequestBody {
  grant_type: 'refresh_token';

  /**
   * The refresh token to exchange for a new access token.
   */
  refresh_token: string;
}

/**
 * Request body for the OAuth token endpoint, discriminated by grant_type.
 */
export type OAuthTokenRequestBody =
  | OAuthTokenAuthorizationCodeRequestBody
  | OAuthTokenDeviceCodeRequestBody
  | OAuthTokenRefreshTokenRequestBody;

/**
 * Successful token response per RFC 6749 Section 5.1.
 */
export interface OAuthTokenSuccessResponse {
  /**
   * The issued access token.
   */
  access_token: string;

  /**
   * The type of token issued.
   */
  token_type: 'Bearer';

  /**
   * The lifetime in seconds of the access token.
   */
  expires_in?: number;

  /**
   * A refresh token for obtaining new access tokens. Issued for device_code and
   * refresh_token grants.
   */
  refresh_token?: string;
}

/**
 * The request body for transferring an OAuth account.
 */
export interface OAuthTransferRequestBody {
  nonce: string;

  /**
   * User info for an OAuth transfer.
   */
  userInfo: OAuthTransferUserInfo;
}

/**
 * User info for an OAuth transfer.
 */
export interface OAuthTransferUserInfo {
  subject: string;

  email?: string | null;

  embeddedWalletAddresses?: Array<string>;

  /**
   * Metadata for an OAuth transfer user info.
   */
  meta?: OAuthTransferUserInfoMeta;

  name?: string;

  profilePictureUrl?: string;

  smartWalletAddresses?: Array<string>;

  username?: string;

  vanityName?: string;
}

/**
 * Metadata for an OAuth transfer user info.
 */
export interface OAuthTransferUserInfoMeta {
  providerAppId?: string;
}

/**
 * The request body for unlinking an OAuth account.
 */
export interface OAuthUnlinkRequestBody {
  /**
   * The ID of an OAuth provider.
   */
  provider: OAuthProviderID;

  subject: string;
}

/**
 * The request body for verifying a PRAT.
 */
export interface OAuthVerifyRequestBody {
  prat: string;
}

/**
 * The response body when verifying a PRAT.
 */
export interface OAuthVerifyResponseBody {
  verified: boolean;
}

/**
 * Valid set of onramp providers
 */
export type OnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * The input for refreshing a session or logging out.
 */
export interface OptionalRefreshTokenInput {
  refresh_token?: string;
}

/**
 * The authenticator assertion response from a WebAuthn authentication ceremony.
 */
export interface PasskeyAssertionResponse {
  authenticator_data: string;

  client_data_json: string;

  signature: string;

  user_handle?: string;
}

/**
 * The authenticator attestation response from a WebAuthn registration ceremony.
 */
export interface PasskeyAttestationResponse {
  attestation_object: string;

  client_data_json: string;

  authenticator_data?: string;

  public_key?: string;

  public_key_algorithm?: number;

  transports?: Array<string>;
}

/**
 * Input for authenticating with a passkey.
 */
export interface PasskeyAuthenticateInput {
  /**
   * WebAuthn authentication response as defined by the Web Authentication
   * specification.
   */
  authenticator_response: PasskeyAuthenticatorVerifyResponse;

  challenge: string;

  relying_party?: string;
}

/**
 * WebAuthn registration options as defined by the Web Authentication
 * specification.
 */
export interface PasskeyAuthenticatorEnrollmentOptions {
  challenge: string;

  pub_key_cred_params: Array<PasskeyPubKeyCredParam>;

  /**
   * Relying party information for a WebAuthn ceremony.
   */
  rp: PasskeyRelyingParty;

  /**
   * User entity for a WebAuthn registration ceremony.
   */
  user: PasskeyUser;

  attestation?: string;

  /**
   * Authenticator selection criteria for a WebAuthn registration ceremony.
   */
  authenticator_selection?: PasskeyAuthenticatorSelection;

  exclude_credentials?: Array<PasskeyCredentialDescriptor>;

  /**
   * Extensions for a WebAuthn registration ceremony.
   */
  extensions?: PasskeyEnrollmentExtensions;

  timeout?: number;
}

/**
 * WebAuthn registration response as defined by the Web Authentication
 * specification.
 */
export interface PasskeyAuthenticatorEnrollmentResponse {
  id: string;

  /**
   * Client extension results returned by the WebAuthn authenticator.
   */
  client_extension_results: PasskeyClientExtensionResults;

  raw_id: string;

  /**
   * The authenticator attestation response from a WebAuthn registration ceremony.
   */
  response: PasskeyAttestationResponse;

  type: 'public-key';

  authenticator_attachment?: string;
}

/**
 * Authenticator selection criteria for a WebAuthn registration ceremony.
 */
export interface PasskeyAuthenticatorSelection {
  authenticator_attachment?: string;

  require_resident_key?: boolean;

  resident_key?: string;

  user_verification?: string;
}

/**
 * WebAuthn authentication options as defined by the Web Authentication
 * specification.
 */
export interface PasskeyAuthenticatorVerifyOptions {
  challenge: string;

  allow_credentials?: Array<PasskeyCredentialDescriptor>;

  /**
   * Extensions for a WebAuthn authentication ceremony.
   */
  extensions?: PasskeyVerifyExtensions;

  rp_id?: string;

  timeout?: number;

  user_verification?: string;
}

/**
 * WebAuthn authentication response as defined by the Web Authentication
 * specification.
 */
export interface PasskeyAuthenticatorVerifyResponse {
  id: string;

  /**
   * Client extension results returned by the WebAuthn authenticator.
   */
  client_extension_results: PasskeyClientExtensionResults;

  raw_id: string;

  /**
   * The authenticator assertion response from a WebAuthn authentication ceremony.
   */
  response: PasskeyAssertionResponse;

  type: 'public-key';

  authenticator_attachment?: string;
}

/**
 * Client extension results returned by the WebAuthn authenticator.
 */
export interface PasskeyClientExtensionResults {
  app_id?: boolean;

  /**
   * The result of the WebAuthn credProps extension.
   */
  cred_props?: PasskeyCredPropsResult;

  hmac_create_secret?: boolean;
}

/**
 * The result of the WebAuthn credProps extension.
 */
export interface PasskeyCredPropsResult {
  rk?: boolean;
}

/**
 * A WebAuthn credential descriptor identifying a specific public key credential.
 */
export interface PasskeyCredentialDescriptor {
  id: string;

  type: string;

  transports?: Array<string>;
}

/**
 * Extensions for a WebAuthn registration ceremony.
 */
export interface PasskeyEnrollmentExtensions {
  app_id?: string;

  /**
   * The result of the WebAuthn credProps extension.
   */
  cred_props?: PasskeyCredPropsResult;

  hmac_create_secret?: boolean;
}

/**
 * Input for initiating a passkey ceremony.
 */
export interface PasskeyInitInput {
  token?: string;

  relying_party?: string;
}

/**
 * Input for linking a passkey credential.
 */
export interface PasskeyLinkInput {
  /**
   * WebAuthn registration response as defined by the Web Authentication
   * specification.
   */
  authenticator_response: PasskeyAuthenticatorEnrollmentResponse;

  relying_party?: string;
}

/**
 * A public key credential parameter specifying the algorithm and credential type.
 */
export interface PasskeyPubKeyCredParam {
  alg: number;

  type: 'public-key';
}

/**
 * Input for registering a passkey credential.
 */
export interface PasskeyRegisterInput {
  /**
   * WebAuthn registration response as defined by the Web Authentication
   * specification.
   */
  authenticator_response: PasskeyAuthenticatorEnrollmentResponse;

  relying_party?: string;
}

/**
 * Relying party information for a WebAuthn ceremony.
 */
export interface PasskeyRelyingParty {
  name: string;

  id?: string;
}

/**
 * User entity for a WebAuthn registration ceremony.
 */
export interface PasskeyUser {
  id: string;

  display_name: string;

  name: string;
}

/**
 * Extensions for a WebAuthn authentication ceremony.
 */
export interface PasskeyVerifyExtensions {
  app_id?: string;

  cred_props?: boolean;

  hmac_create_secret?: boolean;
}

/**
 * The request body for authenticating a passwordless account.
 */
export interface PasswordlessAuthenticateRequestBody {
  code: string;

  email: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for initiating a passwordless ceremony.
 */
export interface PasswordlessInitRequestBody {
  email: string;

  token?: string;
}

/**
 * The request body for linking a passwordless account.
 */
export interface PasswordlessLinkRequestBody {
  code: string;

  email: string;
}

/**
 * The request body for authenticating a passwordless sms account.
 */
export interface PasswordlessSMSAuthenticateRequestBody {
  code: string;

  phoneNumber: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;
}

/**
 * The request body for initiating a passwordless sms ceremony.
 */
export interface PasswordlessSMSInitRequestBody {
  phoneNumber: string;

  token?: string;
}

/**
 * The request body for linking a passwordless sms account.
 */
export interface PasswordlessSMSLinkRequestBody {
  code: string;

  phoneNumber: string;
}

/**
 * The request body for transferring a passwordless sms account.
 */
export interface PasswordlessSMSTransferRequestBody {
  nonce: string;

  phoneNumber: string;
}

/**
 * The request body for unlinking a passwordless sms account.
 */
export interface PasswordlessSMSUnlinkRequestBody {
  phoneNumber: string;
}

/**
 * The request body for updating a passwordless sms account.
 */
export interface PasswordlessSMSUpdateRequestBody {
  code: string;

  new_phone_number: string;

  old_phone_number: string;
}

/**
 * The request body for transferring a passwordless account.
 */
export interface PasswordlessTransferRequestBody {
  email: string;

  nonce: string;
}

/**
 * The request body for unlinking a passwordless account.
 */
export interface PasswordlessUnlinkRequestBody {
  address: string;
}

/**
 * The request body for updating a passwordless account.
 */
export interface PasswordlessUpdateRequestBody {
  code: string;

  newAddress: string;

  oldAddress: string;
}

/**
 * The ID of a Privy app as an OAuth provider. Must start with "privy:".
 */
export type PrivyOAuthProviderID = string;

/**
 * Response for initiating a passkey authentication ceremony.
 */
export interface ResponsePasskeyInitAuthenticate {
  /**
   * WebAuthn authentication options as defined by the Web Authentication
   * specification.
   */
  options: PasskeyAuthenticatorVerifyOptions;

  relying_party?: string;
}

/**
 * Response for initiating a passkey link ceremony.
 */
export interface ResponsePasskeyInitLink {
  /**
   * WebAuthn registration options as defined by the Web Authentication
   * specification.
   */
  options: PasskeyAuthenticatorEnrollmentOptions;

  relying_party?: string;
}

/**
 * Response for initiating a passkey registration ceremony.
 */
export interface ResponsePasskeyInitRegister {
  /**
   * WebAuthn registration options as defined by the Web Authentication
   * specification.
   */
  options: PasskeyAuthenticatorEnrollmentOptions;

  relying_party?: string;
}

/**
 * Input containing a SIWE wallet address.
 */
export interface SiweAddressInput {
  address: string;
}

/**
 * The request body for authenticating a SIWE ceremony.
 */
export interface SiweAuthenticateRequestBody {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  walletClientType?: string | null;
}

/**
 * Input for initiating a SIWE ceremony.
 */
export interface SiweInitInput {
  token?: string;

  address?: string;
}

/**
 * The request body for initiating a SIWE ceremony.
 */
export interface SiweInitRequestBody {
  address: string;
}

/**
 * The response body for initiating a SIWE ceremony.
 */
export interface SiweInitResponseBody {
  address: string;

  expires_at: string;

  nonce: string;
}

/**
 * Input for a SIWE signing ceremony.
 */
export interface SiweInput {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  walletClientType?: string | null;
}

/**
 * The request body for linking a SIWE ceremony.
 */
export interface SiweLinkRequestBody {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  walletClientType?: string | null;
}

/**
 * The request body for linking a SIWE ceremony to a smart wallet.
 */
export interface SiweLinkSmartWalletRequestBody {
  message: string;

  signature: string;

  /**
   * The supported smart wallet providers.
   */
  smart_wallet_type: EmbeddedWalletsAPI.SmartWalletType;

  smart_wallet_version?: string;
}

/**
 * A SIWE nonce response.
 */
export interface SiweNonce {
  address: string;

  expires_at: string;

  nonce: string;
}

/**
 * The request body for unlinking a SIWE ceremony.
 */
export interface SiweUnlinkRequestBody {
  address: string;
}

/**
 * Input containing a SIWS wallet address.
 */
export interface SiwsAddressInput {
  address: string;
}

/**
 * The request body for authenticating a SIWS ceremony.
 */
export interface SiwsAuthenticateRequestBody {
  message: string;

  signature: string;

  connectorType?: string | null;

  /**
   * The type of SIWS message being signed.
   */
  message_type?: SiwsMessageType;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  walletClientType?: string | null;
}

/**
 * Input for initiating a SIWS ceremony.
 */
export interface SiwsInitInput {
  address: string;

  token?: string;
}

/**
 * The request body for initiating a SIWS ceremony.
 */
export interface SiwsInitRequestBody {
  address: string;
}

/**
 * The response body for initiating a SIWS ceremony.
 */
export interface SiwsInitResponseBody {
  address: string;

  expires_at: string;

  nonce: string;
}

/**
 * Input for a SIWS signing ceremony.
 */
export interface SiwsInput {
  message: string;

  signature: string;

  connectorType?: string | null;

  /**
   * The type of SIWS message being signed.
   */
  message_type?: SiwsMessageType;

  walletClientType?: string | null;
}

/**
 * The request body for linking a SIWS ceremony.
 */
export interface SiwsLinkRequestBody {
  message: string;

  signature: string;

  connectorType?: string | null;

  /**
   * The type of SIWS message being signed.
   */
  message_type?: SiwsMessageType;

  walletClientType?: string | null;
}

/**
 * The type of SIWS message being signed.
 */
export type SiwsMessageType = 'transaction' | 'plain' | 'offchain-message';

/**
 * A SIWS nonce response.
 */
export interface SiwsNonce {
  address: string;

  expires_at: string;

  nonce: string;
}

/**
 * The request body for unlinking a SIWS ceremony.
 */
export interface SiwsUnlinkRequestBody {
  address: string;
}

/**
 * Input for a smart wallet SIWE signing ceremony.
 */
export interface SmartWalletSiweInput {
  message: string;

  signature: string;

  /**
   * The supported smart wallet providers.
   */
  smart_wallet_type: EmbeddedWalletsAPI.SmartWalletType;

  smart_wallet_version?: string;
}

/**
 * Auth result object returned by Telegram when a user authenticates using the
 * login widget.
 */
export interface TelegramAuthResult {
  id: number | null;

  auth_date: number | null;

  first_name: string;

  hash: string;

  last_name?: string;

  photo_url?: string;

  username?: string;
}

/**
 * Input for authenticating with Telegram.
 */
export interface TelegramAuthenticateInput {
  captcha_token?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  /**
   * Auth result object returned by Telegram when a user authenticates using the
   * login widget.
   */
  telegram_auth_result?: TelegramAuthResult;

  /**
   * Auth result object returned by Telegram when a user authenticates using a mini
   * app.
   */
  telegram_web_app_data?: TelegramWebAppData;
}

/**
 * The request body for authenticating with Telegram.
 */
export interface TelegramAuthenticateRequestBody {
  captcha_token?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  /**
   * Auth result object returned by Telegram when a user authenticates using the
   * login widget.
   */
  telegram_auth_result?: TelegramAuthResult;

  /**
   * Auth result object returned by Telegram when a user authenticates using a mini
   * app.
   */
  telegram_web_app_data?: TelegramWebAppData;
}

/**
 * The request body for linking a Telegram account.
 */
export interface TelegramLinkRequestBody {
  captcha_token?: string;

  /**
   * Whether to allow sign-up during authentication.
   */
  mode?: AuthenticateModeOption;

  /**
   * Auth result object returned by Telegram when a user authenticates using the
   * login widget.
   */
  telegram_auth_result?: TelegramAuthResult;

  /**
   * Auth result object returned by Telegram when a user authenticates using a mini
   * app.
   */
  telegram_web_app_data?: TelegramWebAppData;
}

/**
 * Input for unlinking a Telegram account.
 */
export interface TelegramUnlinkInput {
  telegram_user_id: string;
}

/**
 * The request body for unlinking a Telegram account.
 */
export interface TelegramUnlinkRequestBody {
  telegram_user_id: string;
}

/**
 * Auth result object returned by Telegram when a user authenticates using a mini
 * app.
 */
export interface TelegramWebAppData {
  auth_date: number | null;

  hash: string;

  user: string;

  chat_instance?: string;

  chat_type?: string;

  query_id?: string;

  signature?: string;

  start_param?: string;
}

/**
 * Input for transferring a Farcaster account.
 */
export interface TransferFarcasterInput {
  farcaster_embedded_address: string;

  farcaster_id: string;

  nonce: string;
}

/**
 * Input for transferring a SIWE account.
 */
export interface TransferSiweInput {
  address: string;

  nonce: string;

  chainId?: string | null;

  connectorType?: string | null;

  walletClientType?: string | null;
}

/**
 * Input for transferring a SIWS account.
 */
export interface TransferSiwsInput {
  address: string;

  nonce: string;

  connectorType?: string | null;

  walletClientType?: string | null;
}

/**
 * Input for transferring a Telegram account.
 */
export interface TransferTelegramInput {
  nonce: string;

  /**
   * Auth result object returned by Telegram when a user authenticates using the
   * login widget.
   */
  telegram_auth_result?: TelegramAuthResult;

  /**
   * Auth result object returned by Telegram when a user authenticates using a mini
   * app.
   */
  telegram_web_app_data?: TelegramWebAppData;
}

/**
 * Input for unlinking a passkey credential.
 */
export interface UnlinkPasskeyInput {
  credential_id: string;

  remove_as_mfa?: boolean;
}

export declare namespace ClientAuth {
  export {
    type AuthenticateJwtInput as AuthenticateJwtInput,
    type AuthenticateMode as AuthenticateMode,
    type AuthenticateModeOption as AuthenticateModeOption,
    type AuthenticateSiweInput as AuthenticateSiweInput,
    type AuthenticateSiwsInput as AuthenticateSiwsInput,
    type BridgeBrlFiatVirtualAccountDepositInstructions as BridgeBrlFiatVirtualAccountDepositInstructions,
    type BridgeDestinationAsset as BridgeDestinationAsset,
    type BridgeEurFiatVirtualAccountDepositInstructions as BridgeEurFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDepositInstructions as BridgeFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDestination as BridgeFiatVirtualAccountDestination,
    type BridgeFiatVirtualAccountRequest as BridgeFiatVirtualAccountRequest,
    type BridgeFiatVirtualAccountResponse as BridgeFiatVirtualAccountResponse,
    type BridgeFiatVirtualAccountSource as BridgeFiatVirtualAccountSource,
    type BridgeGbpFiatVirtualAccountDepositInstructions as BridgeGbpFiatVirtualAccountDepositInstructions,
    type BridgeMxnFiatVirtualAccountDepositInstructions as BridgeMxnFiatVirtualAccountDepositInstructions,
    type BridgeOnrampProvider as BridgeOnrampProvider,
    type BridgeSandboxFiatVirtualAccountRequest as BridgeSandboxFiatVirtualAccountRequest,
    type BridgeSandboxFiatVirtualAccountResponse as BridgeSandboxFiatVirtualAccountResponse,
    type BridgeSourceAsset as BridgeSourceAsset,
    type BridgeUsdFiatVirtualAccountDepositInstructions as BridgeUsdFiatVirtualAccountDepositInstructions,
    type BridgeUsdFiatVirtualAccountDepositPaymentRail as BridgeUsdFiatVirtualAccountDepositPaymentRail,
    type CustomJwtAuthenticateRequestBody as CustomJwtAuthenticateRequestBody,
    type CustomJwtLinkRequestBody as CustomJwtLinkRequestBody,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type DeviceVerifyAction as DeviceVerifyAction,
    type DeviceVerifyRequestBody as DeviceVerifyRequestBody,
    type DeviceVerifyResponse as DeviceVerifyResponse,
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type FarcasterAuthenticateInput as FarcasterAuthenticateInput,
    type FarcasterAuthenticateRequestBody as FarcasterAuthenticateRequestBody,
    type FarcasterConnectInitResponse as FarcasterConnectInitResponse,
    type FarcasterConnectInitResponseBody as FarcasterConnectInitResponseBody,
    type FarcasterConnectStatusCompletedResponse as FarcasterConnectStatusCompletedResponse,
    type FarcasterConnectStatusCompletedResponseBody as FarcasterConnectStatusCompletedResponseBody,
    type FarcasterConnectStatusPendingResponse as FarcasterConnectStatusPendingResponse,
    type FarcasterConnectStatusPendingResponseBody as FarcasterConnectStatusPendingResponseBody,
    type FarcasterInitInput as FarcasterInitInput,
    type FarcasterInitRequestBody as FarcasterInitRequestBody,
    type FarcasterLinkInput as FarcasterLinkInput,
    type FarcasterLinkRequestBody as FarcasterLinkRequestBody,
    type FarcasterSignerApproved as FarcasterSignerApproved,
    type FarcasterSignerInitPendingApproval as FarcasterSignerInitPendingApproval,
    type FarcasterSignerInitRequestBody as FarcasterSignerInitRequestBody,
    type FarcasterSignerInitResponseBody as FarcasterSignerInitResponseBody,
    type FarcasterSignerRevoked as FarcasterSignerRevoked,
    type FarcasterSignerStatusPendingApproval as FarcasterSignerStatusPendingApproval,
    type FarcasterSignerStatusResponseBody as FarcasterSignerStatusResponseBody,
    type FarcasterUnlinkInput as FarcasterUnlinkInput,
    type FarcasterUnlinkRequestBody as FarcasterUnlinkRequestBody,
    type FarcasterV2AuthenticateInput as FarcasterV2AuthenticateInput,
    type FarcasterV2AuthenticateRequestBody as FarcasterV2AuthenticateRequestBody,
    type FarcasterV2InitInput as FarcasterV2InitInput,
    type FarcasterV2InitRequestBody as FarcasterV2InitRequestBody,
    type FarcasterV2InitResponse as FarcasterV2InitResponse,
    type FarcasterV2InitResponseBody as FarcasterV2InitResponseBody,
    type FiatVirtualAccountRequest as FiatVirtualAccountRequest,
    type FiatVirtualAccountResponse as FiatVirtualAccountResponse,
    type GuestAuthenticateRequestBody as GuestAuthenticateRequestBody,
    type LinkJwtInput as LinkJwtInput,
    type MfaEmailEnrollRequestBody as MfaEmailEnrollRequestBody,
    type MfaEmailInitEnrollInput as MfaEmailInitEnrollInput,
    type MfaEmailInitRequestBody as MfaEmailInitRequestBody,
    type MfaEmailInitVerifyInput as MfaEmailInitVerifyInput,
    type MfaEmailVerifyRequestBody as MfaEmailVerifyRequestBody,
    type MfaPasskeyEnrollmentRequestBody as MfaPasskeyEnrollmentRequestBody,
    type MfaPasskeyInitRequestBody as MfaPasskeyInitRequestBody,
    type MfaPasskeyInitResponseBody as MfaPasskeyInitResponseBody,
    type MfaPasskeyVerifyRequestBody as MfaPasskeyVerifyRequestBody,
    type MfaSMSEnrollRequestBody as MfaSMSEnrollRequestBody,
    type MfaSMSInitEnrollInput as MfaSMSInitEnrollInput,
    type MfaSMSInitRequestBody as MfaSMSInitRequestBody,
    type MfaSMSInitVerifyInput as MfaSMSInitVerifyInput,
    type MfaSMSVerifyRequestBody as MfaSMSVerifyRequestBody,
    type MfaTotpInitResponseBody as MfaTotpInitResponseBody,
    type MfaTotpInput as MfaTotpInput,
    type MfaVerifyResponseBody as MfaVerifyResponseBody,
    type OAuthAuthenticateRequestBody as OAuthAuthenticateRequestBody,
    type OAuthAuthorizationCodeRequestBody as OAuthAuthorizationCodeRequestBody,
    type OAuthCodeType as OAuthCodeType,
    type OAuthInitRequestBody as OAuthInitRequestBody,
    type OAuthInitResponseBody as OAuthInitResponseBody,
    type OAuthLinkRequestBody as OAuthLinkRequestBody,
    type OAuthLinkResponseBody as OAuthLinkResponseBody,
    type OAuthProviderID as OAuthProviderID,
    type OAuthTokenAuthorizationCodeRequestBody as OAuthTokenAuthorizationCodeRequestBody,
    type OAuthTokenDeviceCodePendingError as OAuthTokenDeviceCodePendingError,
    type OAuthTokenDeviceCodePendingErrorCode as OAuthTokenDeviceCodePendingErrorCode,
    type OAuthTokenDeviceCodeRequestBody as OAuthTokenDeviceCodeRequestBody,
    type OAuthTokenGrantType as OAuthTokenGrantType,
    type OAuthTokenRefreshTokenRequestBody as OAuthTokenRefreshTokenRequestBody,
    type OAuthTokenRequestBody as OAuthTokenRequestBody,
    type OAuthTokenSuccessResponse as OAuthTokenSuccessResponse,
    type OAuthTransferRequestBody as OAuthTransferRequestBody,
    type OAuthTransferUserInfo as OAuthTransferUserInfo,
    type OAuthTransferUserInfoMeta as OAuthTransferUserInfoMeta,
    type OAuthUnlinkRequestBody as OAuthUnlinkRequestBody,
    type OAuthVerifyRequestBody as OAuthVerifyRequestBody,
    type OAuthVerifyResponseBody as OAuthVerifyResponseBody,
    type OnrampProvider as OnrampProvider,
    type OptionalRefreshTokenInput as OptionalRefreshTokenInput,
    type PasskeyAssertionResponse as PasskeyAssertionResponse,
    type PasskeyAttestationResponse as PasskeyAttestationResponse,
    type PasskeyAuthenticateInput as PasskeyAuthenticateInput,
    type PasskeyAuthenticatorEnrollmentOptions as PasskeyAuthenticatorEnrollmentOptions,
    type PasskeyAuthenticatorEnrollmentResponse as PasskeyAuthenticatorEnrollmentResponse,
    type PasskeyAuthenticatorSelection as PasskeyAuthenticatorSelection,
    type PasskeyAuthenticatorVerifyOptions as PasskeyAuthenticatorVerifyOptions,
    type PasskeyAuthenticatorVerifyResponse as PasskeyAuthenticatorVerifyResponse,
    type PasskeyClientExtensionResults as PasskeyClientExtensionResults,
    type PasskeyCredPropsResult as PasskeyCredPropsResult,
    type PasskeyCredentialDescriptor as PasskeyCredentialDescriptor,
    type PasskeyEnrollmentExtensions as PasskeyEnrollmentExtensions,
    type PasskeyInitInput as PasskeyInitInput,
    type PasskeyLinkInput as PasskeyLinkInput,
    type PasskeyPubKeyCredParam as PasskeyPubKeyCredParam,
    type PasskeyRegisterInput as PasskeyRegisterInput,
    type PasskeyRelyingParty as PasskeyRelyingParty,
    type PasskeyUser as PasskeyUser,
    type PasskeyVerifyExtensions as PasskeyVerifyExtensions,
    type PasswordlessAuthenticateRequestBody as PasswordlessAuthenticateRequestBody,
    type PasswordlessInitRequestBody as PasswordlessInitRequestBody,
    type PasswordlessLinkRequestBody as PasswordlessLinkRequestBody,
    type PasswordlessSMSAuthenticateRequestBody as PasswordlessSMSAuthenticateRequestBody,
    type PasswordlessSMSInitRequestBody as PasswordlessSMSInitRequestBody,
    type PasswordlessSMSLinkRequestBody as PasswordlessSMSLinkRequestBody,
    type PasswordlessSMSTransferRequestBody as PasswordlessSMSTransferRequestBody,
    type PasswordlessSMSUnlinkRequestBody as PasswordlessSMSUnlinkRequestBody,
    type PasswordlessSMSUpdateRequestBody as PasswordlessSMSUpdateRequestBody,
    type PasswordlessTransferRequestBody as PasswordlessTransferRequestBody,
    type PasswordlessUnlinkRequestBody as PasswordlessUnlinkRequestBody,
    type PasswordlessUpdateRequestBody as PasswordlessUpdateRequestBody,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type ResponsePasskeyInitAuthenticate as ResponsePasskeyInitAuthenticate,
    type ResponsePasskeyInitLink as ResponsePasskeyInitLink,
    type ResponsePasskeyInitRegister as ResponsePasskeyInitRegister,
    type SiweAddressInput as SiweAddressInput,
    type SiweAuthenticateRequestBody as SiweAuthenticateRequestBody,
    type SiweInitInput as SiweInitInput,
    type SiweInitRequestBody as SiweInitRequestBody,
    type SiweInitResponseBody as SiweInitResponseBody,
    type SiweInput as SiweInput,
    type SiweLinkRequestBody as SiweLinkRequestBody,
    type SiweLinkSmartWalletRequestBody as SiweLinkSmartWalletRequestBody,
    type SiweNonce as SiweNonce,
    type SiweUnlinkRequestBody as SiweUnlinkRequestBody,
    type SiwsAddressInput as SiwsAddressInput,
    type SiwsAuthenticateRequestBody as SiwsAuthenticateRequestBody,
    type SiwsInitInput as SiwsInitInput,
    type SiwsInitRequestBody as SiwsInitRequestBody,
    type SiwsInitResponseBody as SiwsInitResponseBody,
    type SiwsInput as SiwsInput,
    type SiwsLinkRequestBody as SiwsLinkRequestBody,
    type SiwsMessageType as SiwsMessageType,
    type SiwsNonce as SiwsNonce,
    type SiwsUnlinkRequestBody as SiwsUnlinkRequestBody,
    type SmartWalletSiweInput as SmartWalletSiweInput,
    type TelegramAuthResult as TelegramAuthResult,
    type TelegramAuthenticateInput as TelegramAuthenticateInput,
    type TelegramAuthenticateRequestBody as TelegramAuthenticateRequestBody,
    type TelegramLinkRequestBody as TelegramLinkRequestBody,
    type TelegramUnlinkInput as TelegramUnlinkInput,
    type TelegramUnlinkRequestBody as TelegramUnlinkRequestBody,
    type TelegramWebAppData as TelegramWebAppData,
    type TransferFarcasterInput as TransferFarcasterInput,
    type TransferSiweInput as TransferSiweInput,
    type TransferSiwsInput as TransferSiwsInput,
    type TransferTelegramInput as TransferTelegramInput,
    type UnlinkPasskeyInput as UnlinkPasskeyInput,
  };
}
