// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as EmbeddedWalletsAPI from './embedded-wallets';
import * as UsersAPI from './users';

export class ClientAuth extends APIResource {}

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
  | 'twitch';

/**
 * The ID of a Privy app as an OAuth provider. Must start with "privy:".
 */
export type PrivyOAuthProviderID = `privy:${string}`;

/**
 * The ID of a custom OAuth provider, set up for this app. Must start with
 * "custom:".
 */
export type CustomOAuthProviderID = `custom:${string}`;

/**
 * The ID of an OAuth provider.
 */
export type OAuthProviderID = ExternalOAuthProviderID | PrivyOAuthProviderID;

/**
 * Bridge provider variant — production or sandbox.
 */
export type BridgeOnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * Valid set of onramp providers
 */
export type OnrampProvider = 'bridge' | 'bridge-sandbox';

/**
 * The result of the WebAuthn credProps extension.
 */
export interface PasskeyCredPropsResult {
  rk?: boolean;
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
 * A WebAuthn credential descriptor identifying a specific public key credential.
 */
export interface PasskeyCredentialDescriptor {
  id: string;

  type: string;

  transports?: Array<string>;
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
 * A public key credential parameter specifying the algorithm and credential type.
 */
export interface PasskeyPubKeyCredParam {
  alg: number;

  type: 'public-key';
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
 * The authenticator attestation response from a WebAuthn registration ceremony.
 */
export interface PasskeyAttestationResponse {
  attestation_object: string;

  client_data_json: string;

  authenticator_data?: string;

  public_key?: string;

  public_key_algorithm?: number;

  transports?: Array<unknown>;
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
 * Input for initiating a passkey ceremony.
 */
export interface PasskeyInitInput {
  token?: string;

  relying_party?: string;
}

/**
 * Input for unlinking a passkey credential.
 */
export interface UnlinkPasskeyInput {
  credential_id: string;

  remove_as_mfa?: boolean;
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
 * The authenticator assertion response from a WebAuthn authentication ceremony.
 */
export interface PasskeyAssertionResponse {
  authenticator_data: string;

  client_data_json: string;

  signature: string;

  user_handle?: string;
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
 * The request body for linking a passwordless account.
 */
export interface PasswordlessLinkRequestBody {
  code: string;

  email: string;
}

/**
 * The request body for initiating a passwordless ceremony.
 */
export interface PasswordlessInitRequestBody {
  email: string;

  token?: string;
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
 * The request body for authenticating a passwordless account.
 */
export interface PasswordlessAuthenticateRequestBody {
  code: string;

  email: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for transferring a passwordless account.
 */
export interface PasswordlessTransferRequestBody {
  email: string;

  nonce: string;
}

/**
 * The request body for linking a passwordless sms account.
 */
export interface PasswordlessSMSLinkRequestBody {
  code: string;

  phoneNumber: string;
}

/**
 * The request body for initiating a passwordless sms ceremony.
 */
export interface PasswordlessSMSInitRequestBody {
  phoneNumber: string;

  token?: string;
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
 * The request body for authenticating a passwordless sms account.
 */
export interface PasswordlessSMSAuthenticateRequestBody {
  code: string;

  phoneNumber: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for transferring a passwordless sms account.
 */
export interface PasswordlessSMSTransferRequestBody {
  nonce: string;

  phoneNumber: string;
}

/**
 * Input for authenticating with a custom JWT.
 */
export interface AuthenticateJwtInput {
  token?: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * Input for linking a custom JWT account.
 */
export interface LinkJwtInput {
  token?: string;
}

/**
 * The request body for authenticating with a custom JWT.
 */
export interface CustomJwtAuthenticateRequestBody {
  token?: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for linking a custom JWT account.
 */
export interface CustomJwtLinkRequestBody {
  token?: string;
}

/**
 * The request input for getting a native onramp provider customer.
 */
export interface GetFiatCustomerRequestInput {
  /**
   * Valid set of onramp providers
   */
  provider: OnrampProvider;

  kyc_redirect_url?: string;
}

/**
 * The request input for creating (or updating) a native onramp provider customer.
 */
export interface CreateOrUpdateFiatCustomerRequestInput {
  has_accepted_terms: boolean;

  /**
   * Valid set of onramp providers
   */
  provider: OnrampProvider;

  kyc_redirect_url?: string;
}

/**
 * A rejection reason for a customer KYC verification.
 */
export interface BridgeFiatRejectionReason {
  reason: string;
}

/**
 * The response for getting a native onramp provider customer.
 */
export interface BridgeFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge';

  /**
   * Status of the KYC verification process.
   */
  status:
    | 'not_found'
    | 'active'
    | 'awaiting_questionnaire'
    | 'awaiting_ubo'
    | 'incomplete'
    | 'not_started'
    | 'offboarded'
    | 'paused'
    | 'rejected'
    | 'under_review';

  kyc_url?: string;

  rejection_reasons?: Array<BridgeFiatRejectionReason>;
}

/**
 * The response for getting a native onramp provider customer.
 */
export interface BridgeSandboxFiatCustomerResponse {
  has_accepted_terms: boolean;

  provider: 'bridge-sandbox';

  /**
   * Status of the KYC verification process.
   */
  status:
    | 'not_found'
    | 'active'
    | 'awaiting_questionnaire'
    | 'awaiting_ubo'
    | 'incomplete'
    | 'not_started'
    | 'offboarded'
    | 'paused'
    | 'rejected'
    | 'under_review';

  kyc_url?: string;

  rejection_reasons?: Array<BridgeFiatRejectionReason>;
}

/**
 * The response for getting a native onramp provider customer.
 */
export type FiatCustomerResponse = BridgeFiatCustomerResponse | BridgeSandboxFiatCustomerResponse;

/**
 * ISO 4217 fiat currency code. Three uppercase ASCII letters.
 */
export type FiatCurrencyCode = string;

/**
 * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
 */
export type CryptoCurrencyCode = string;

/**
 * A CAIP-2 chain identifier in namespace:reference format (e.g. "eip155:1" for
 * Ethereum mainnet, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" for Solana mainnet).
 */
export type Caip2ChainID = string;

/**
 * A positive decimal amount as a string (e.g. "100", "50.25", "0.001").
 */
export type FiatAmount = string;

/**
 * Source currency details for a fiat onramp quote request.
 */
export interface FiatOnrampSource {
  /**
   * A positive decimal amount as a string (e.g. "100", "50.25", "0.001").
   */
  amount: FiatAmount;

  /**
   * ISO 4217 fiat currency code. Three uppercase ASCII letters.
   */
  asset: FiatCurrencyCode;
}

/**
 * Destination cryptocurrency details for a fiat onramp quote request.
 */
export interface FiatOnrampDestination {
  address: string;

  /**
   * Cryptocurrency symbol. Uppercase alphanumeric, 2-10 characters.
   */
  asset: CryptoCurrencyCode;

  /**
   * A CAIP-2 chain identifier in namespace:reference format (e.g. "eip155:1" for
   * Ethereum mainnet, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" for Solana mainnet).
   */
  chain: Caip2ChainID;
}

/**
 * Whether to use the sandbox or production environment for fiat onramp.
 */
export type FiatOnrampEnvironment = 'sandbox' | 'production';

/**
 * The fiat onramp provider to use.
 */
export type FiatOnrampProvider =
  | 'meld'
  | 'meld-sandbox'
  | 'moonpay'
  | 'moonpay-sandbox'
  | 'coinbase'
  | 'coinbase-sandbox';

/**
 * The request input for getting fiat onramp quotes.
 */
export interface GetFiatOnrampQuotesInput {
  /**
   * Destination cryptocurrency details for a fiat onramp quote request.
   */
  destination: FiatOnrampDestination;

  /**
   * Whether to use the sandbox or production environment for fiat onramp.
   */
  environment: FiatOnrampEnvironment;

  /**
   * Source currency details for a fiat onramp quote request.
   */
  source: FiatOnrampSource;
}

/**
 * A single fiat onramp quote from a provider.
 */
export interface FiatOnrampQuote {
  payment_method: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  destination_currency_code?: string | null;

  source_amount?: number | null;

  source_currency_code?: string | null;

  sub_provider?: string | null;
}

/**
 * An error from a specific fiat onramp provider when fetching quotes.
 */
export interface FiatOnrampProviderError {
  error: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;
}

/**
 * The response containing fiat onramp quotes.
 */
export interface GetFiatOnrampQuotesResponse {
  quotes: Array<FiatOnrampQuote>;

  provider_errors?: Array<FiatOnrampProviderError>;
}

/**
 * The request input for getting a fiat onramp provider session URL.
 */
export interface GetFiatOnrampURLInput {
  /**
   * Destination cryptocurrency details for a fiat onramp quote request.
   */
  destination: FiatOnrampDestination;

  payment_method: string;

  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  /**
   * Source currency details for a fiat onramp quote request.
   */
  source: FiatOnrampSource;

  redirect_url?: string;

  sub_provider?: string;
}

/**
 * The response containing a fiat onramp provider session URL.
 */
export interface GetFiatOnrampURLResponse {
  session_id: string;

  url: string;
}

/**
 * Normalized fiat onramp transaction status.
 */
export type FiatOnrampTransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'unknown';

/**
 * The request input for checking a fiat onramp session status.
 */
export interface GetFiatOnrampTransactionStatusInput {
  /**
   * The fiat onramp provider to use.
   */
  provider: FiatOnrampProvider;

  session_id: string;
}

/**
 * The response containing the fiat onramp session status.
 */
export interface GetFiatOnrampTransactionStatusResponse {
  raw_status: string;

  session_id: string;

  /**
   * Normalized fiat onramp transaction status.
   */
  status: FiatOnrampTransactionStatus;

  transaction_id?: string;
}

export type BridgeDestinationAsset = 'usdb' | 'usdc' | 'usdt' | 'dai' | 'pyusd' | 'eurc';

export type BridgeSourceAsset = 'usd' | 'eur' | 'mxn' | 'brl' | 'gbp';

export interface BridgeFiatVirtualAccountSource {
  asset: BridgeSourceAsset;
}

export interface BridgeFiatVirtualAccountDestination {
  address: string;

  asset: BridgeDestinationAsset;

  chain: string;
}

/**
 * The request input for creating virtual account.
 */
export interface BridgeFiatVirtualAccountRequest {
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  source: BridgeFiatVirtualAccountSource;
}

/**
 * The request input for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountRequest {
  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  source: BridgeFiatVirtualAccountSource;
}

/**
 * The request input for creating virtual account.
 */
export type FiatVirtualAccountRequest =
  | BridgeFiatVirtualAccountRequest
  | BridgeSandboxFiatVirtualAccountRequest;

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

  payment_rails: Array<'ach_push' | 'wire'>;
}

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
export interface BridgeMxnFiatVirtualAccountDepositInstructions {
  account_holder_name: string;

  asset: 'mxn';

  bank_address: string;

  bank_name: string;

  clabe: string;

  payment_rails: Array<'spei'>;
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
export type BridgeFiatVirtualAccountDepositInstructions =
  | BridgeUsdFiatVirtualAccountDepositInstructions
  | BridgeEurFiatVirtualAccountDepositInstructions
  | BridgeMxnFiatVirtualAccountDepositInstructions
  | BridgeBrlFiatVirtualAccountDepositInstructions
  | BridgeGbpFiatVirtualAccountDepositInstructions;

/**
 * The response for creating virtual account.
 */
export interface BridgeFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge';

  status: string;
}

/**
 * The response for creating virtual account.
 */
export interface BridgeSandboxFiatVirtualAccountResponse {
  /**
   * The deposit instructions for a virtual account.
   */
  deposit_instructions: BridgeFiatVirtualAccountDepositInstructions;

  destination: BridgeFiatVirtualAccountDestination;

  provider: 'bridge-sandbox';

  status: string;
}

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

  mode?: 'no-signup' | 'login-or-sign-up';
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
 * The response for linking an OAuth account.
 */
export interface OAuthLinkResponseBody extends UsersAPI.User {
  /**
   * OAuth tokens associated with the user.
   */
  oauth_tokens?: UsersAPI.OAuthTokens;
}

/**
 * Metadata for an OAuth transfer user info.
 */
export interface OAuthTransferUserInfoMeta {
  providerAppId?: string;
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
 * The request body for getting an OAuth authorization code.
 */
export interface OAuthAuthorizationCodeRequestBody {
  code_challenge: string;

  redirect_to: string;

  state: string;
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
 * Input for authenticating a SIWE ceremony.
 */
export interface AuthenticateSiweInput {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  mode?: 'no-signup' | 'login-or-sign-up';

  walletClientType?: string | null;
}

/**
 * Input containing a SIWE wallet address.
 */
export interface SiweAddressInput {
  address: string;
}

/**
 * Input for initiating a SIWE ceremony.
 */
export interface SiweInitInput {
  token?: string;

  address?: string;
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
 * The request body for authenticating a SIWE ceremony.
 */
export interface SiweAuthenticateRequestBody {
  message: string;

  signature: string;

  chainId?: string | null;

  connectorType?: string | null;

  mode?: 'no-signup' | 'login-or-sign-up';

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
 * The request body for unlinking a SIWE ceremony.
 */
export interface SiweUnlinkRequestBody {
  address: string;
}

/**
 * Input for a SIWS signing ceremony.
 */
export interface SiwsInput {
  message: string;

  signature: string;

  connectorType?: string | null;

  message_type?: 'transaction' | 'plain';

  walletClientType?: string | null;
}

/**
 * Input for authenticating a SIWS ceremony.
 */
export interface AuthenticateSiwsInput {
  message: string;

  signature: string;

  connectorType?: string | null;

  message_type?: 'transaction' | 'plain';

  mode?: 'no-signup' | 'login-or-sign-up';

  walletClientType?: string | null;
}

/**
 * Input containing a SIWS wallet address.
 */
export interface SiwsAddressInput {
  address: string;
}

/**
 * Input for initiating a SIWS ceremony.
 */
export interface SiwsInitInput {
  address: string;

  token?: string;
}

/**
 * A SIWS nonce response.
 */
export interface SiwsNonce {
  address: string;

  expires_at: string;

  nonce: string;
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
 * The request body for authenticating a SIWS ceremony.
 */
export interface SiwsAuthenticateRequestBody {
  message: string;

  signature: string;

  connectorType?: string | null;

  message_type?: 'transaction' | 'plain';

  mode?: 'no-signup' | 'login-or-sign-up';

  walletClientType?: string | null;
}

/**
 * The request body for linking a SIWS ceremony.
 */
export interface SiwsLinkRequestBody {
  message: string;

  signature: string;

  connectorType?: string | null;

  message_type?: 'transaction' | 'plain';

  walletClientType?: string | null;
}

/**
 * The request body for unlinking a SIWS ceremony.
 */
export interface SiwsUnlinkRequestBody {
  address: string;
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
 * Input for authenticating with Telegram.
 */
export interface TelegramAuthenticateInput {
  captcha_token?: string;

  mode?: 'no-signup' | 'login-or-sign-up';

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
 * The request body for authenticating with Telegram.
 */
export interface TelegramAuthenticateRequestBody {
  captcha_token?: string;

  mode?: 'no-signup' | 'login-or-sign-up';

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

  mode?: 'no-signup' | 'login-or-sign-up';

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
 * The request body for unlinking a Telegram account.
 */
export interface TelegramUnlinkRequestBody {
  telegram_user_id: string;
}

/**
 * Proxy for the Farcaster Connect init response as defined in FIP-11.
 */
export interface FarcasterConnectInitResponse {
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
 * Proxy for the Farcaster Connect pending status response as defined in FIP-11.
 */
export interface FarcasterConnectStatusPendingResponse {
  nonce: string;

  state: 'pending';
}

/**
 * Input for authenticating with Farcaster.
 */
export interface FarcasterAuthenticateInput {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;

  mode?: 'no-signup' | 'login-or-sign-up';
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
 * Input for initiating a Farcaster connection.
 */
export interface FarcasterInitInput {
  token?: string;

  redirect_url?: string;

  relying_party?: string;
}

/**
 * Input for unlinking a Farcaster account.
 */
export interface FarcasterUnlinkInput {
  fid: number;
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
 * Input for initiating a Farcaster V2 connection.
 */
export type FarcasterV2InitInput = unknown;

/**
 * Response for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitResponse {
  expires_at: string;

  nonce: string;
}

/**
 * Input for authenticating a Farcaster V2 account.
 */
export interface FarcasterV2AuthenticateInput {
  fid: number;

  message: string;

  signature: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for authenticating with Farcaster.
 */
export interface FarcasterAuthenticateRequestBody {
  channel_token: string;

  fid: number;

  message: string;

  signature: string;

  mode?: 'no-signup' | 'login-or-sign-up';
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
 * The response body for pending a Farcaster connection.
 */
export interface FarcasterConnectStatusPendingResponseBody {
  nonce: string;

  state: 'pending';
}

/**
 * The request body for unlinking a Farcaster account.
 */
export interface FarcasterUnlinkRequestBody {
  fid: number;
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
 * The response body for initiating a Farcaster connection.
 */
export interface FarcasterConnectInitResponseBody {
  channel_token: string;

  connect_uri: string;
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
 * The request body for initiating a Farcaster V2 connection.
 */
export type FarcasterV2InitRequestBody = unknown;

/**
 * The response body for initiating a Farcaster V2 connection.
 */
export interface FarcasterV2InitResponseBody {
  expires_at: string;

  nonce: string;
}

/**
 * The request body for authenticating a Farcaster V2 account.
 */
export interface FarcasterV2AuthenticateRequestBody {
  fid: number;

  message: string;

  signature: string;

  mode?: 'no-signup' | 'login-or-sign-up';
}

/**
 * The request body for initiating a Farcaster signer connection.
 */
export interface FarcasterSignerInitRequestBody {
  ed25519_public_key: string;

  deadline?: string;
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
 * A Farcaster signer response when the signer has been approved.
 */
export interface FarcasterSignerApproved {
  fid: string;

  public_key: string;

  status: 'approved';
}

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
 * The response body from initiating a Farcaster signer connection.
 */
export type FarcasterSignerInitResponseBody =
  | FarcasterSignerInitPendingApproval
  | FarcasterSignerApproved
  | FarcasterSignerRevoked;

/**
 * The response body from checking the status of a Farcaster signer connection.
 */
export type FarcasterSignerStatusResponseBody =
  | FarcasterSignerStatusPendingApproval
  | FarcasterSignerApproved
  | FarcasterSignerRevoked;

/**
 * The input for refreshing a session or logging out.
 */
export interface OptionalRefreshTokenInput {
  refresh_token?: string;
}

/**
 * The response body for verifying a MFA code.
 */
export interface MfaVerifyResponseBody {
  token: string;
}

/**
 * Input for verifying SMS MFA.
 */
export interface MfaSMSInitVerifyInput {
  action: 'verify';
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
 * The request body for enrolling a SMS MFA code.
 */
export interface MfaSMSEnrollRequestBody {
  code: string;

  phoneNumber: string;
}

/**
 * The request body for verifying a SMS MFA code.
 */
export interface MfaSMSVerifyRequestBody {
  code: string;
}

/**
 * The input for verifying a TOTP MFA code.
 */
export interface MfaTotpInput {
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
 * The request body for enrolling a passkey MFA flow.
 */
export interface MfaPasskeyEnrollmentRequestBody {
  credential_ids: Array<string>;

  remove_for_login?: boolean;
}

export declare namespace ClientAuth {
  export {
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type OAuthProviderID as OAuthProviderID,
    type BridgeOnrampProvider as BridgeOnrampProvider,
    type OnrampProvider as OnrampProvider,
    type PasskeyCredPropsResult as PasskeyCredPropsResult,
    type PasskeyClientExtensionResults as PasskeyClientExtensionResults,
    type PasskeyCredentialDescriptor as PasskeyCredentialDescriptor,
    type PasskeyRelyingParty as PasskeyRelyingParty,
    type PasskeyUser as PasskeyUser,
    type PasskeyPubKeyCredParam as PasskeyPubKeyCredParam,
    type PasskeyAuthenticatorSelection as PasskeyAuthenticatorSelection,
    type PasskeyEnrollmentExtensions as PasskeyEnrollmentExtensions,
    type PasskeyAttestationResponse as PasskeyAttestationResponse,
    type PasskeyAuthenticatorEnrollmentOptions as PasskeyAuthenticatorEnrollmentOptions,
    type PasskeyAuthenticatorEnrollmentResponse as PasskeyAuthenticatorEnrollmentResponse,
    type ResponsePasskeyInitLink as ResponsePasskeyInitLink,
    type ResponsePasskeyInitRegister as ResponsePasskeyInitRegister,
    type PasskeyLinkInput as PasskeyLinkInput,
    type PasskeyRegisterInput as PasskeyRegisterInput,
    type PasskeyInitInput as PasskeyInitInput,
    type UnlinkPasskeyInput as UnlinkPasskeyInput,
    type PasskeyVerifyExtensions as PasskeyVerifyExtensions,
    type PasskeyAssertionResponse as PasskeyAssertionResponse,
    type PasskeyAuthenticatorVerifyOptions as PasskeyAuthenticatorVerifyOptions,
    type PasskeyAuthenticatorVerifyResponse as PasskeyAuthenticatorVerifyResponse,
    type ResponsePasskeyInitAuthenticate as ResponsePasskeyInitAuthenticate,
    type PasskeyAuthenticateInput as PasskeyAuthenticateInput,
    type PasswordlessLinkRequestBody as PasswordlessLinkRequestBody,
    type PasswordlessInitRequestBody as PasswordlessInitRequestBody,
    type PasswordlessUnlinkRequestBody as PasswordlessUnlinkRequestBody,
    type PasswordlessUpdateRequestBody as PasswordlessUpdateRequestBody,
    type PasswordlessAuthenticateRequestBody as PasswordlessAuthenticateRequestBody,
    type PasswordlessTransferRequestBody as PasswordlessTransferRequestBody,
    type PasswordlessSMSLinkRequestBody as PasswordlessSMSLinkRequestBody,
    type PasswordlessSMSInitRequestBody as PasswordlessSMSInitRequestBody,
    type PasswordlessSMSUnlinkRequestBody as PasswordlessSMSUnlinkRequestBody,
    type PasswordlessSMSUpdateRequestBody as PasswordlessSMSUpdateRequestBody,
    type PasswordlessSMSAuthenticateRequestBody as PasswordlessSMSAuthenticateRequestBody,
    type PasswordlessSMSTransferRequestBody as PasswordlessSMSTransferRequestBody,
    type AuthenticateJwtInput as AuthenticateJwtInput,
    type LinkJwtInput as LinkJwtInput,
    type CustomJwtAuthenticateRequestBody as CustomJwtAuthenticateRequestBody,
    type CustomJwtLinkRequestBody as CustomJwtLinkRequestBody,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type BridgeFiatRejectionReason as BridgeFiatRejectionReason,
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type FiatCustomerResponse as FiatCustomerResponse,
    type FiatCurrencyCode as FiatCurrencyCode,
    type CryptoCurrencyCode as CryptoCurrencyCode,
    type Caip2ChainID as Caip2ChainID,
    type FiatAmount as FiatAmount,
    type FiatOnrampSource as FiatOnrampSource,
    type FiatOnrampDestination as FiatOnrampDestination,
    type FiatOnrampEnvironment as FiatOnrampEnvironment,
    type FiatOnrampProvider as FiatOnrampProvider,
    type GetFiatOnrampQuotesInput as GetFiatOnrampQuotesInput,
    type FiatOnrampQuote as FiatOnrampQuote,
    type FiatOnrampProviderError as FiatOnrampProviderError,
    type GetFiatOnrampQuotesResponse as GetFiatOnrampQuotesResponse,
    type GetFiatOnrampURLInput as GetFiatOnrampURLInput,
    type GetFiatOnrampURLResponse as GetFiatOnrampURLResponse,
    type FiatOnrampTransactionStatus as FiatOnrampTransactionStatus,
    type GetFiatOnrampTransactionStatusInput as GetFiatOnrampTransactionStatusInput,
    type GetFiatOnrampTransactionStatusResponse as GetFiatOnrampTransactionStatusResponse,
    type BridgeDestinationAsset as BridgeDestinationAsset,
    type BridgeSourceAsset as BridgeSourceAsset,
    type BridgeFiatVirtualAccountSource as BridgeFiatVirtualAccountSource,
    type BridgeFiatVirtualAccountDestination as BridgeFiatVirtualAccountDestination,
    type BridgeFiatVirtualAccountRequest as BridgeFiatVirtualAccountRequest,
    type BridgeSandboxFiatVirtualAccountRequest as BridgeSandboxFiatVirtualAccountRequest,
    type FiatVirtualAccountRequest as FiatVirtualAccountRequest,
    type BridgeUsdFiatVirtualAccountDepositInstructions as BridgeUsdFiatVirtualAccountDepositInstructions,
    type BridgeEurFiatVirtualAccountDepositInstructions as BridgeEurFiatVirtualAccountDepositInstructions,
    type BridgeMxnFiatVirtualAccountDepositInstructions as BridgeMxnFiatVirtualAccountDepositInstructions,
    type BridgeBrlFiatVirtualAccountDepositInstructions as BridgeBrlFiatVirtualAccountDepositInstructions,
    type BridgeGbpFiatVirtualAccountDepositInstructions as BridgeGbpFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDepositInstructions as BridgeFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountResponse as BridgeFiatVirtualAccountResponse,
    type BridgeSandboxFiatVirtualAccountResponse as BridgeSandboxFiatVirtualAccountResponse,
    type FiatVirtualAccountResponse as FiatVirtualAccountResponse,
    type GuestAuthenticateRequestBody as GuestAuthenticateRequestBody,
    type OAuthCodeType as OAuthCodeType,
    type OAuthInitRequestBody as OAuthInitRequestBody,
    type OAuthInitResponseBody as OAuthInitResponseBody,
    type OAuthAuthenticateRequestBody as OAuthAuthenticateRequestBody,
    type OAuthLinkRequestBody as OAuthLinkRequestBody,
    type OAuthUnlinkRequestBody as OAuthUnlinkRequestBody,
    type OAuthLinkResponseBody as OAuthLinkResponseBody,
    type OAuthTransferUserInfoMeta as OAuthTransferUserInfoMeta,
    type OAuthTransferUserInfo as OAuthTransferUserInfo,
    type OAuthTransferRequestBody as OAuthTransferRequestBody,
    type OAuthAuthorizationCodeRequestBody as OAuthAuthorizationCodeRequestBody,
    type OAuthVerifyRequestBody as OAuthVerifyRequestBody,
    type OAuthVerifyResponseBody as OAuthVerifyResponseBody,
    type SiweInput as SiweInput,
    type SmartWalletSiweInput as SmartWalletSiweInput,
    type AuthenticateSiweInput as AuthenticateSiweInput,
    type SiweAddressInput as SiweAddressInput,
    type SiweInitInput as SiweInitInput,
    type SiweNonce as SiweNonce,
    type TransferSiweInput as TransferSiweInput,
    type SiweInitRequestBody as SiweInitRequestBody,
    type SiweInitResponseBody as SiweInitResponseBody,
    type SiweAuthenticateRequestBody as SiweAuthenticateRequestBody,
    type SiweLinkRequestBody as SiweLinkRequestBody,
    type SiweLinkSmartWalletRequestBody as SiweLinkSmartWalletRequestBody,
    type SiweUnlinkRequestBody as SiweUnlinkRequestBody,
    type SiwsInput as SiwsInput,
    type AuthenticateSiwsInput as AuthenticateSiwsInput,
    type SiwsAddressInput as SiwsAddressInput,
    type SiwsInitInput as SiwsInitInput,
    type SiwsNonce as SiwsNonce,
    type TransferSiwsInput as TransferSiwsInput,
    type SiwsInitRequestBody as SiwsInitRequestBody,
    type SiwsInitResponseBody as SiwsInitResponseBody,
    type SiwsAuthenticateRequestBody as SiwsAuthenticateRequestBody,
    type SiwsLinkRequestBody as SiwsLinkRequestBody,
    type SiwsUnlinkRequestBody as SiwsUnlinkRequestBody,
    type TelegramAuthResult as TelegramAuthResult,
    type TelegramWebAppData as TelegramWebAppData,
    type TelegramAuthenticateInput as TelegramAuthenticateInput,
    type TelegramUnlinkInput as TelegramUnlinkInput,
    type TransferTelegramInput as TransferTelegramInput,
    type TelegramAuthenticateRequestBody as TelegramAuthenticateRequestBody,
    type TelegramLinkRequestBody as TelegramLinkRequestBody,
    type TelegramUnlinkRequestBody as TelegramUnlinkRequestBody,
    type FarcasterConnectInitResponse as FarcasterConnectInitResponse,
    type FarcasterConnectStatusCompletedResponse as FarcasterConnectStatusCompletedResponse,
    type FarcasterConnectStatusPendingResponse as FarcasterConnectStatusPendingResponse,
    type FarcasterAuthenticateInput as FarcasterAuthenticateInput,
    type FarcasterLinkInput as FarcasterLinkInput,
    type FarcasterInitInput as FarcasterInitInput,
    type FarcasterUnlinkInput as FarcasterUnlinkInput,
    type TransferFarcasterInput as TransferFarcasterInput,
    type FarcasterV2InitInput as FarcasterV2InitInput,
    type FarcasterV2InitResponse as FarcasterV2InitResponse,
    type FarcasterV2AuthenticateInput as FarcasterV2AuthenticateInput,
    type FarcasterAuthenticateRequestBody as FarcasterAuthenticateRequestBody,
    type FarcasterConnectStatusCompletedResponseBody as FarcasterConnectStatusCompletedResponseBody,
    type FarcasterConnectStatusPendingResponseBody as FarcasterConnectStatusPendingResponseBody,
    type FarcasterUnlinkRequestBody as FarcasterUnlinkRequestBody,
    type FarcasterInitRequestBody as FarcasterInitRequestBody,
    type FarcasterConnectInitResponseBody as FarcasterConnectInitResponseBody,
    type FarcasterLinkRequestBody as FarcasterLinkRequestBody,
    type FarcasterV2InitRequestBody as FarcasterV2InitRequestBody,
    type FarcasterV2InitResponseBody as FarcasterV2InitResponseBody,
    type FarcasterV2AuthenticateRequestBody as FarcasterV2AuthenticateRequestBody,
    type FarcasterSignerInitRequestBody as FarcasterSignerInitRequestBody,
    type FarcasterSignerInitPendingApproval as FarcasterSignerInitPendingApproval,
    type FarcasterSignerApproved as FarcasterSignerApproved,
    type FarcasterSignerRevoked as FarcasterSignerRevoked,
    type FarcasterSignerStatusPendingApproval as FarcasterSignerStatusPendingApproval,
    type FarcasterSignerInitResponseBody as FarcasterSignerInitResponseBody,
    type FarcasterSignerStatusResponseBody as FarcasterSignerStatusResponseBody,
    type OptionalRefreshTokenInput as OptionalRefreshTokenInput,
    type MfaVerifyResponseBody as MfaVerifyResponseBody,
    type MfaSMSInitVerifyInput as MfaSMSInitVerifyInput,
    type MfaSMSInitEnrollInput as MfaSMSInitEnrollInput,
    type MfaSMSInitRequestBody as MfaSMSInitRequestBody,
    type MfaSMSEnrollRequestBody as MfaSMSEnrollRequestBody,
    type MfaSMSVerifyRequestBody as MfaSMSVerifyRequestBody,
    type MfaTotpInput as MfaTotpInput,
    type MfaTotpInitResponseBody as MfaTotpInitResponseBody,
    type MfaPasskeyInitRequestBody as MfaPasskeyInitRequestBody,
    type MfaPasskeyInitResponseBody as MfaPasskeyInitResponseBody,
    type MfaPasskeyVerifyRequestBody as MfaPasskeyVerifyRequestBody,
    type MfaPasskeyEnrollmentRequestBody as MfaPasskeyEnrollmentRequestBody,
  };
}
