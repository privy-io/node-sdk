// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersAPI from '../users';
import * as SMSAPI from './sms/sms';
import { SMS } from './sms/sms';
import * as TotpAPI from './totp/totp';
import { Totp } from './totp/totp';

export class Mfa extends APIResource {
  sms: SMSAPI.SMS = new SMSAPI.SMS(this._client);
  totp: TotpAPI.Totp = new TotpAPI.Totp(this._client);
}

/**
 * The authenticator assertion response from a WebAuthn authentication ceremony.
 */
export interface MfaPasskeyAssertionResponse {
  authenticator_data: string;

  client_data_json: string;

  signature: string;

  user_handle?: string;
}

/**
 * The authenticator attestation response from a WebAuthn registration ceremony.
 */
export interface MfaPasskeyAttestationResponse {
  attestation_object: string;

  client_data_json: string;

  authenticator_data?: string;

  public_key?: string;

  public_key_algorithm?: number;

  transports?: Array<string>;
}

/**
 * WebAuthn registration options as defined by the Web Authentication
 * specification.
 */
export interface MfaPasskeyAuthenticatorEnrollmentOptions {
  challenge: string;

  pub_key_cred_params: Array<MfaPasskeyPubKeyCredParam>;

  /**
   * Relying party information for a WebAuthn ceremony.
   */
  rp: MfaPasskeyRelyingParty;

  /**
   * User entity for a WebAuthn registration ceremony.
   */
  user: MfaPasskeyUser;

  attestation?: string;

  /**
   * Authenticator selection criteria for a WebAuthn registration ceremony.
   */
  authenticator_selection?: MfaPasskeyAuthenticatorSelection;

  exclude_credentials?: Array<MfaPasskeyCredentialDescriptor>;

  /**
   * Extensions for a WebAuthn registration ceremony.
   */
  extensions?: MfaPasskeyEnrollmentExtensions;

  timeout?: number;
}

/**
 * WebAuthn registration response as defined by the Web Authentication
 * specification.
 */
export interface MfaPasskeyAuthenticatorEnrollmentResponse {
  id: string;

  /**
   * Client extension results returned by the WebAuthn authenticator.
   */
  client_extension_results: MfaPasskeyClientExtensionResults;

  raw_id: string;

  /**
   * The authenticator attestation response from a WebAuthn registration ceremony.
   */
  response: MfaPasskeyAttestationResponse;

  type: 'public-key';

  authenticator_attachment?: string;
}

/**
 * Authenticator selection criteria for a WebAuthn registration ceremony.
 */
export interface MfaPasskeyAuthenticatorSelection {
  authenticator_attachment?: string;

  require_resident_key?: boolean;

  resident_key?: string;

  user_verification?: string;
}

/**
 * WebAuthn authentication options as defined by the Web Authentication
 * specification.
 */
export interface MfaPasskeyAuthenticatorVerifyOptions {
  challenge: string;

  allow_credentials?: Array<MfaPasskeyCredentialDescriptor>;

  /**
   * Extensions for a WebAuthn authentication ceremony.
   */
  extensions?: MfaPasskeyVerifyExtensions;

  rp_id?: string;

  timeout?: number;

  user_verification?: string;
}

/**
 * WebAuthn authentication response as defined by the Web Authentication
 * specification.
 */
export interface MfaPasskeyAuthenticatorVerifyResponse {
  id: string;

  /**
   * Client extension results returned by the WebAuthn authenticator.
   */
  client_extension_results: MfaPasskeyClientExtensionResults;

  raw_id: string;

  /**
   * The authenticator assertion response from a WebAuthn authentication ceremony.
   */
  response: MfaPasskeyAssertionResponse;

  type: 'public-key';

  authenticator_attachment?: string;
}

/**
 * Client extension results returned by the WebAuthn authenticator.
 */
export interface MfaPasskeyClientExtensionResults {
  app_id?: boolean;

  /**
   * The result of the WebAuthn credProps extension.
   */
  cred_props?: MfaPasskeyCredPropsResult;

  hmac_create_secret?: boolean;
}

/**
 * The result of the WebAuthn credProps extension.
 */
export interface MfaPasskeyCredPropsResult {
  rk?: boolean;
}

/**
 * A WebAuthn credential descriptor identifying a specific public key credential.
 */
export interface MfaPasskeyCredentialDescriptor {
  id: string;

  type: string;

  transports?: Array<string>;
}

/**
 * Extensions for a WebAuthn registration ceremony.
 */
export interface MfaPasskeyEnrollmentExtensions {
  app_id?: string;

  /**
   * The result of the WebAuthn credProps extension.
   */
  cred_props?: MfaPasskeyCredPropsResult;

  hmac_create_secret?: boolean;
}

/**
 * A public key credential parameter specifying the algorithm and credential type.
 */
export interface MfaPasskeyPubKeyCredParam {
  alg: number;

  type: 'public-key';
}

/**
 * Relying party information for a WebAuthn ceremony.
 */
export interface MfaPasskeyRelyingParty {
  name: string;

  id?: string;
}

/**
 * User entity for a WebAuthn registration ceremony.
 */
export interface MfaPasskeyUser {
  id: string;

  display_name: string;

  name: string;
}

/**
 * Extensions for a WebAuthn authentication ceremony.
 */
export interface MfaPasskeyVerifyExtensions {
  app_id?: string;

  cred_props?: boolean;

  hmac_create_secret?: boolean;
}

/**
 * An MFA token and the current user after completing an MFA ceremony.
 */
export interface MfaVerificationResponse {
  /**
   * JWT proving the user completed MFA.
   */
  token: string;

  /**
   * Unix timestamp in seconds when the MFA token expires.
   */
  expires_at: number;

  /**
   * A Privy user object.
   */
  user: UsersAPI.User;
}

/**
 * Starts SMS MFA enrollment by sending a code to the phone number.
 */
export interface SMSMfaEnrollmentInitRequestBody {
  phone_number: string;
}

/**
 * Completes an SMS MFA ceremony with the code sent at init.
 */
export interface SMSMfaVerifyRequestBody {
  code: string;
}

/**
 * Authenticator setup information for the started TOTP MFA enrollment.
 */
export interface TotpMfaEnrollmentInitResponse {
  /**
   * Authenticator setup information for TOTP MFA enrollment.
   */
  options: TotpMfaEnrollmentOptions;
}

/**
 * Authenticator setup information for TOTP MFA enrollment.
 */
export interface TotpMfaEnrollmentOptions {
  /**
   * Base32-encoded TOTP secret.
   */
  secret: string;

  /**
   * Authenticator setup URI using the otpauth scheme.
   */
  uri: string;
}

/**
 * Completes a TOTP MFA ceremony with a code from the authenticator.
 */
export interface TotpMfaVerifyRequestBody {
  code: string;
}

Mfa.SMS = SMS;
Mfa.Totp = Totp;

export declare namespace Mfa {
  export {
    type MfaPasskeyAssertionResponse as MfaPasskeyAssertionResponse,
    type MfaPasskeyAttestationResponse as MfaPasskeyAttestationResponse,
    type MfaPasskeyAuthenticatorEnrollmentOptions as MfaPasskeyAuthenticatorEnrollmentOptions,
    type MfaPasskeyAuthenticatorEnrollmentResponse as MfaPasskeyAuthenticatorEnrollmentResponse,
    type MfaPasskeyAuthenticatorSelection as MfaPasskeyAuthenticatorSelection,
    type MfaPasskeyAuthenticatorVerifyOptions as MfaPasskeyAuthenticatorVerifyOptions,
    type MfaPasskeyAuthenticatorVerifyResponse as MfaPasskeyAuthenticatorVerifyResponse,
    type MfaPasskeyClientExtensionResults as MfaPasskeyClientExtensionResults,
    type MfaPasskeyCredPropsResult as MfaPasskeyCredPropsResult,
    type MfaPasskeyCredentialDescriptor as MfaPasskeyCredentialDescriptor,
    type MfaPasskeyEnrollmentExtensions as MfaPasskeyEnrollmentExtensions,
    type MfaPasskeyPubKeyCredParam as MfaPasskeyPubKeyCredParam,
    type MfaPasskeyRelyingParty as MfaPasskeyRelyingParty,
    type MfaPasskeyUser as MfaPasskeyUser,
    type MfaPasskeyVerifyExtensions as MfaPasskeyVerifyExtensions,
    type MfaVerificationResponse as MfaVerificationResponse,
    type SMSMfaEnrollmentInitRequestBody as SMSMfaEnrollmentInitRequestBody,
    type SMSMfaVerifyRequestBody as SMSMfaVerifyRequestBody,
    type TotpMfaEnrollmentInitResponse as TotpMfaEnrollmentInitResponse,
    type TotpMfaEnrollmentOptions as TotpMfaEnrollmentOptions,
    type TotpMfaVerifyRequestBody as TotpMfaVerifyRequestBody,
  };

  export { SMS as SMS };

  export { Totp as Totp };
}
