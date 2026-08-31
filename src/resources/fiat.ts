// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SharedAPI from './shared';

export class Fiat extends APIResource {}

/**
 * Request body for creating a Bridge external fiat account.
 */
export interface BridgeCreateExternalFiatAccountRequestBody {
  /**
   * Bank account details. The `type` field discriminates which shape applies.
   */
  account: ExternalFiatAccountData;

  account_owner_name: string;

  currency: string;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * Physical address associated with an external fiat account.
   */
  address?: ExternalFiatAccountAddress;

  bank_name?: string;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

/**
 * Request body for creating a Bridge fiat deposit account linked to a wallet.
 */
export interface BridgeCreateFiatDepositAccountRequestBody {
  /**
   * The destination crypto asset and chain for a fiat deposit account.
   */
  destination: FiatDepositAccountDestination;

  /**
   * Discriminator: the fiat deposit account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * The source fiat currency for a fiat deposit account.
   */
  source: CreateFiatDepositAccountSource;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

/**
 * A Bridge external fiat account linked to a user.
 */
export interface BridgeExternalFiatAccount {
  id: string;

  account_owner_name: string;

  account_type: string;

  created_at: string;

  currency: string;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  user_id: string;

  bank_name?: string;

  last_4?: string;
}

/**
 * A Bridge fiat deposit account linked to a wallet.
 */
export interface BridgeFiatDepositAccount {
  id: string;

  created_at: string;

  /**
   * Bank or payment deposit instructions for a fiat deposit account. Shape varies by
   * source currency.
   */
  deposit_instructions: FiatDepositInstructions | null;

  /**
   * The destination crypto asset and chain for a fiat deposit account.
   */
  destination: FiatDepositAccountDestination;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Discriminator: the fiat deposit account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * The source fiat currency and available payment rails for a fiat deposit account.
   */
  source: FiatDepositAccountSource;

  /**
   * Activation status of a fiat deposit account.
   */
  status: FiatDepositAccountStatus;

  wallet_id: string;
}

/**
 * A Bridge external fiat account linked to an organization.
 */
export interface BridgeOrganizationExternalFiatAccount {
  id: string;

  account_owner_name: string;

  account_type: string;

  created_at: string;

  currency: string;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  organization_id: string;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  bank_name?: string;

  last_4?: string;
}

/**
 * Request body for creating a Bridge external fiat account.
 */
export interface CreateExternalFiatAccountRequestBody {
  /**
   * Bank account details. The `type` field discriminates which shape applies.
   */
  account: ExternalFiatAccountData;

  account_owner_name: string;

  currency: string;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * Physical address associated with an external fiat account.
   */
  address?: ExternalFiatAccountAddress;

  bank_name?: string;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

/**
 * Request body for creating a Bridge fiat deposit account linked to a wallet.
 */
export interface CreateFiatDepositAccountRequestBody {
  /**
   * The destination crypto asset and chain for a fiat deposit account.
   */
  destination: FiatDepositAccountDestination;

  /**
   * Discriminator: the fiat deposit account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * The source fiat currency for a fiat deposit account.
   */
  source: CreateFiatDepositAccountSource;

  /**
   * The Privy API environment.
   */
  environment?: SharedAPI.IntegrationEnvironment;
}

/**
 * The source fiat currency for a fiat deposit account.
 */
export interface CreateFiatDepositAccountSource {
  currency: string;
}

/**
 * Request body for initiating a payout (crypto to fiat offramp) from a wallet.
 */
export interface CreatePayoutRequestBody {
  /**
   * The destination bank account for a payout.
   */
  destination: PayoutDestination;

  /**
   * The source crypto asset, chain, and amount for a payout.
   */
  source: PayoutSource;
}

/**
 * A Bridge external fiat account linked to a user.
 */
export interface ExternalFiatAccount {
  id: string;

  account_owner_name: string;

  account_type: string;

  created_at: string;

  currency: string;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  user_id: string;

  bank_name?: string;

  last_4?: string;
}

/**
 * Physical address associated with an external fiat account.
 */
export interface ExternalFiatAccountAddress {
  city: string;

  country: string;

  street_line_1: string;

  postal_code?: string;

  state?: string;

  street_line_2?: string;
}

/**
 * Bank account details. The `type` field discriminates which shape applies.
 */
export type ExternalFiatAccountData =
  | ExternalFiatAccountUsData
  | ExternalFiatAccountGBData
  | ExternalFiatAccountPixData
  | ExternalFiatAccountIbanData
  | ExternalFiatAccountSwiftData;

/**
 * UK bank account data for an external fiat account. Pays out over Faster
 * Payments.
 */
export interface ExternalFiatAccountGBData {
  /**
   * The 8-digit UK bank account number.
   */
  account_number: string;

  /**
   * The 6-digit sort code, without hyphens.
   */
  sort_code: string;

  type: 'gb';
}

/**
 * IBAN bank account data for an external fiat account. Pays out over SEPA.
 */
export interface ExternalFiatAccountIbanData {
  /**
   * The IBAN. Up to 34 characters, per ISO 13616.
   */
  account_number: string;

  /**
   * The BIC/SWIFT code of the beneficiary bank.
   */
  bic: string;

  /**
   * Country the account is held in, as an ISO 3166-1 alpha-3 code.
   */
  country: string;

  type: 'iban';
}

/**
 * Brazilian Pix account data for an external fiat account. Provide exactly one of
 * `pix_key` or `br_code`.
 */
export interface ExternalFiatAccountPixData {
  type: 'pix';

  /**
   * The Pix "copia e cola" (copy and paste) BR Code.
   */
  br_code?: string;

  /**
   * Optional CPF/CNPJ associated with the account, digits only.
   */
  document_number?: string;

  /**
   * The Pix key: an EVP (UUID), CPF, CNPJ, Brazilian phone number (+55…), or email
   * address.
   */
  pix_key?: string;
}

/**
 * Response containing a single external fiat account.
 */
export interface ExternalFiatAccountResponse {
  /**
   * A Bridge external fiat account linked to a user.
   */
  external_fiat_account: ExternalFiatAccount;
}

/**
 * Business relationship between the payer and the SWIFT account owner.
 */
export type ExternalFiatAccountSwiftCategory = 'client' | 'parent_company' | 'subsidiary' | 'supplier';

/**
 * SWIFT bank account data for an external fiat account. Pays out over wire. The
 * beneficiary address is required for SWIFT and is supplied as the request's
 * top-level `address`.
 */
export interface ExternalFiatAccountSwiftData {
  account_number: string;

  /**
   * The BIC/SWIFT code of the beneficiary bank.
   */
  bic: string;

  /**
   * Business relationship between the payer and the SWIFT account owner.
   */
  category: ExternalFiatAccountSwiftCategory;

  purpose_of_funds: Array<ExternalFiatAccountSwiftPurposeOfFunds>;

  short_business_description: string;

  type: 'swift';

  /**
   * Country the account is held in, as an ISO 3166-1 alpha-3 code.
   */
  country?: string;
}

/**
 * Reason funds are sent to a SWIFT account, required for cross-border compliance.
 */
export type ExternalFiatAccountSwiftPurposeOfFunds =
  | 'intra_group_transfer'
  | 'invoice_for_goods_and_services';

/**
 * US bank account data for an external fiat account.
 */
export interface ExternalFiatAccountUsData {
  account_number: string;

  routing_number: string;

  type: 'us';

  checking_or_savings?: string;
}

/**
 * Supported fiat currencies.
 */
export type FiatCurrency = 'usd' | 'eur';

/**
 * A Bridge fiat deposit account linked to a wallet.
 */
export interface FiatDepositAccount {
  id: string;

  created_at: string;

  /**
   * Bank or payment deposit instructions for a fiat deposit account. Shape varies by
   * source currency.
   */
  deposit_instructions: FiatDepositInstructions | null;

  /**
   * The destination crypto asset and chain for a fiat deposit account.
   */
  destination: FiatDepositAccountDestination;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  /**
   * Discriminator: the fiat deposit account is orchestrated via Bridge.
   */
  provider: 'bridge';

  /**
   * The source fiat currency and available payment rails for a fiat deposit account.
   */
  source: FiatDepositAccountSource;

  /**
   * Activation status of a fiat deposit account.
   */
  status: FiatDepositAccountStatus;

  wallet_id: string;
}

/**
 * The destination crypto asset and chain for a fiat deposit account.
 */
export interface FiatDepositAccountDestination {
  /**
   * Destination crypto asset (e.g. "usdc").
   */
  asset: string;

  /**
   * Destination chain (e.g. "base", "tempo").
   */
  chain: string;
}

/**
 * Response containing a single fiat deposit account.
 */
export interface FiatDepositAccountResponse {
  /**
   * A Bridge fiat deposit account linked to a wallet.
   */
  fiat_deposit_account: FiatDepositAccount;
}

/**
 * The source fiat currency and available payment rails for a fiat deposit account.
 */
export interface FiatDepositAccountSource {
  currency: string;

  payment_rails: Array<string>;
}

/**
 * Activation status of a fiat deposit account.
 */
export type FiatDepositAccountStatus = 'activated' | 'deactivated';

/**
 * Bank or payment deposit instructions for a fiat deposit account. Shape varies by
 * source currency.
 */
export interface FiatDepositInstructions {
  account_holder_name?: string;

  account_number?: string;

  bank_account_number?: string;

  bank_address?: string;

  bank_beneficiary_address?: string;

  bank_beneficiary_name?: string;

  bank_name?: string;

  bank_routing_number?: string;

  bic?: string;

  br_code?: string;

  bre_b_key?: string;

  clabe?: string;

  deposit_message?: string;

  iban?: string;

  payment_rails?: Array<string>;

  sort_code?: string;
}

/**
 * Supported fiat payment rails.
 */
export type FiatPaymentRail = 'sepa' | 'ach_push' | 'wire' | 'fednow' | 'faster_payments';

/**
 * Request body for initiating a hosted KYB flow for an organization.
 */
export interface KYBLinksRequestBody {
  /**
   * Email address for the organization.
   */
  email: string;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Legal name of the business.
   */
  business_name?: string;

  /**
   * Client-side agreement ID for ToS acceptance.
   */
  client_agreement_id?: string;

  /**
   * Endorsements to request during KYB.
   */
  endorsements?: Array<KyxEndorsementName>;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: KyxEnvironment;

  /**
   * URI to redirect after completing KYB.
   */
  redirect_uri?: string;
}

/**
 * List of KYB status snapshots, one per configured provider/environment.
 */
export interface KYBStatusListResponse {
  kyb_statuses: Array<KYBStatusResponse>;

  next_cursor: string | null;
}

/**
 * Full KYB status for an organization with a given provider.
 */
export interface KYBStatusResponse {
  /**
   * Capability statuses for the customer.
   */
  capabilities: KyxCapabilities;

  endorsements: Array<KyxEndorsement>;

  /**
   * Provider environment (production or sandbox).
   */
  environment: KyxEnvironment;

  /**
   * Items that will be required in the future.
   */
  future_requirements_due: Array<string>;

  /**
   * Verification status detail for a KYC or KYB check.
   */
  kyb: KyxVerificationStatusDetail;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Top-level items still needed (e.g. link a bank account).
   */
  requirements_due: Array<string>;

  /**
   * KYC/KYB status for the user.
   */
  status: KyxProviderStatus;

  /**
   * Terms of Service acceptance status for a KYC or KYB flow.
   */
  tos: KyxTosStatusDetail;
}

/**
 * Request body for initiating Terms of Service acceptance for an organization.
 */
export interface KYBTosRequestBody {
  /**
   * Email address for the organization.
   */
  email: string;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Legal name of the business.
   */
  business_name?: string;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: KyxEnvironment;
}

/**
 * An identity document for KYC verification.
 */
export interface KYCIdentifyingDocument {
  /**
   * ISO 3166-1 alpha-3 issuing country code.
   */
  issuing_country: string;

  /**
   * Document type identifier.
   */
  type: string;

  /**
   * Document description.
   */
  description?: string;

  /**
   * Document expiration date.
   */
  expiration?: string;

  /**
   * Base64-encoded back image.
   */
  image_back?: string;

  /**
   * Base64-encoded front image.
   */
  image_front?: string;

  /**
   * Document number.
   */
  number?: string;
}

/**
 * Request body for initiating a hosted KYC flow.
 */
export interface KYCLinksRequestBody {
  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Client-side agreement ID for ToS acceptance.
   */
  client_agreement_id?: string;

  /**
   * Email address for the KYC session.
   */
  email?: string;

  /**
   * Endorsements to request during KYC.
   */
  endorsements?: Array<KyxEndorsementName>;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: KyxEnvironment;

  /**
   * URI to redirect the user after completing KYC.
   */
  redirect_uri?: string;
}

/**
 * Residential address for KYC data submission.
 */
export interface KYCResidentialAddress {
  /**
   * City.
   */
  city: string;

  /**
   * ISO 3166-1 alpha-3 country code.
   */
  country: string;

  /**
   * Street address line 1.
   */
  street_line_1: string;

  /**
   * State or province code.
   */
  subdivision: string;

  /**
   * Postal code.
   */
  postal_code?: string;

  /**
   * Street address line 2.
   */
  street_line_2?: string;
}

/**
 * List of KYC status snapshots, one per configured provider/environment.
 */
export interface KYCStatusListResponse {
  kyc_statuses: Array<KYCStatusResponse>;

  next_cursor: string | null;
}

/**
 * Full KYC status for a user with a given provider.
 */
export interface KYCStatusResponse {
  /**
   * Capability statuses for the customer.
   */
  capabilities: KyxCapabilities;

  endorsements: Array<KyxEndorsement>;

  /**
   * Provider environment (production or sandbox).
   */
  environment: KyxEnvironment;

  /**
   * Items that will be required in the future.
   */
  future_requirements_due: Array<string>;

  /**
   * Verification status detail for a KYC or KYB check.
   */
  kyc: KyxVerificationStatusDetail;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Top-level items still needed (e.g. link a bank account).
   */
  requirements_due: Array<string>;

  /**
   * KYC/KYB status for the user.
   */
  status: KyxProviderStatus;

  /**
   * Terms of Service acceptance status for a KYC or KYB flow.
   */
  tos: KyxTosStatusDetail;
}

/**
 * KYC verification data for headless submission.
 */
export interface KYCSubmitData {
  /**
   * Date of birth in YYYY-MM-DD format.
   */
  date_of_birth: string;

  /**
   * Legal first name.
   */
  first_name: string;

  /**
   * Identifying documents.
   */
  identifying_information: Array<KYCIdentifyingDocument>;

  /**
   * Legal last name.
   */
  last_name: string;

  /**
   * Residential address for KYC data submission.
   */
  residential_address: KYCResidentialAddress;

  /**
   * Email address.
   */
  email?: string;

  /**
   * Phone number in E.164 format.
   */
  phone?: string;
}

/**
 * Request body for headless KYC data submission.
 */
export interface KYCSubmitRequestBody {
  /**
   * KYC verification data for headless submission.
   */
  data: KYCSubmitData;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Client-side agreement ID for ToS acceptance.
   */
  client_agreement_id?: string;

  /**
   * Endorsements to request during KYC.
   */
  endorsements?: Array<KyxEndorsementName>;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: KyxEnvironment;
}

/**
 * Capability statuses for the customer.
 */
export interface KyxCapabilities {
  /**
   * Status of a capability. Passthrough from the provider.
   */
  payin_crypto: KyxCapabilityStatus;

  /**
   * Status of a capability. Passthrough from the provider.
   */
  payin_fiat: KyxCapabilityStatus;

  /**
   * Status of a capability. Passthrough from the provider.
   */
  payout_crypto: KyxCapabilityStatus;

  /**
   * Status of a capability. Passthrough from the provider.
   */
  payout_fiat: KyxCapabilityStatus;
}

/**
 * Status of a capability. Passthrough from the provider.
 */
export type KyxCapabilityStatus = string;

/**
 * An endorsement with its approval status and missing requirements.
 */
export interface KyxEndorsement {
  /**
   * Missing requirements, or null if complete.
   */
  missing: Array<string> | null;

  /**
   * Endorsement identifier.
   */
  name: KyxEndorsementName;

  /**
   * Status of an endorsement. Passthrough from the provider.
   */
  status: KyxEndorsementStatus;
}

/**
 * Endorsement identifier.
 */
export type KyxEndorsementName = string;

/**
 * Status of an endorsement. Passthrough from the provider.
 */
export type KyxEndorsementStatus = string;

/**
 * Provider environment (production or sandbox).
 */
export type KyxEnvironment = 'production' | 'sandbox';

/**
 * KYC/KYB provider identifier.
 */
export type KyxProvider = 'bridge';

/**
 * KYC/KYB status for the user.
 */
export type KyxProviderStatus = string;

/**
 * Request body for initiating Terms of Service acceptance.
 */
export interface KyxTosRequestBody {
  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Email for the user. If not provided, falls back to the user's linked email.
   */
  email?: string;

  /**
   * Provider environment (production or sandbox).
   */
  environment?: KyxEnvironment;
}

/**
 * Response containing a Terms of Service link.
 */
export interface KyxTosResponse {
  /**
   * Provider environment (production or sandbox).
   */
  environment: KyxEnvironment;

  /**
   * URL for the Terms of Service acceptance page.
   */
  link: string;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

  /**
   * Status of Terms of Service acceptance. Passthrough from the provider.
   */
  status: KyxTosStatus;
}

/**
 * Status of Terms of Service acceptance. Passthrough from the provider.
 */
export type KyxTosStatus = string;

/**
 * Terms of Service acceptance status for a KYC or KYB flow.
 */
export interface KyxTosStatusDetail {
  /**
   * Status of Terms of Service acceptance. Passthrough from the provider.
   */
  status: KyxTosStatus;

  /**
   * ToS acceptance link, if pending.
   */
  link?: string;
}

/**
 * Status of KYC/KYB verification. Passthrough from the provider.
 */
export type KyxVerificationStatus = string;

/**
 * Verification status detail for a KYC or KYB check.
 */
export interface KyxVerificationStatusDetail {
  /**
   * Status of KYC/KYB verification. Passthrough from the provider.
   */
  status: KyxVerificationStatus;

  /**
   * Verification link, if applicable.
   */
  link?: string;

  /**
   * Reasons for rejection, if status is closed or action_required.
   */
  rejection_reasons?: Array<string>;
}

/**
 * A list of external fiat accounts linked to a user.
 */
export interface ListExternalFiatAccountsResponse {
  external_fiat_accounts: Array<ExternalFiatAccount>;

  next_cursor: string | null;
}

/**
 * A list of fiat deposit accounts linked to a wallet.
 */
export interface ListFiatDepositAccountsResponse {
  fiat_deposit_accounts: Array<FiatDepositAccount>;

  next_cursor: string | null;
}

/**
 * A list of external fiat accounts linked to an organization.
 */
export interface ListOrganizationExternalFiatAccountsResponse {
  external_fiat_accounts: Array<OrganizationExternalFiatAccount>;

  next_cursor: string | null;
}

/**
 * Deposit instructions for an offramp transfer.
 */
export interface OfframpDepositInstructions {
  amount: string;

  /**
   * Supported blockchain chains for onramp and offramp.
   */
  chain: OnrampChain;

  /**
   * Supported crypto assets for onramp and offramp.
   */
  currency: OnrampAsset;

  from_address: string;

  to_address: string;
}

/**
 * Response for an offramp transfer initiation.
 */
export interface OfframpResponse {
  id: string;

  /**
   * Deposit instructions for an offramp transfer.
   */
  deposit_instructions: OfframpDepositInstructions;

  /**
   * Status of an onramp or offramp transfer.
   */
  status: OnrampTransferStatus;
}

/**
 * Supported crypto assets for onramp and offramp.
 */
export type OnrampAsset = 'usdc';

/**
 * Supported blockchain chains for onramp and offramp.
 */
export type OnrampChain = 'ethereum' | 'base' | 'arbitrum' | 'polygon' | 'optimism';

/**
 * Bank deposit instructions for an onramp transfer.
 */
export interface OnrampDepositInstructions {
  amount: string;

  /**
   * Supported fiat currencies.
   */
  currency: FiatCurrency;

  /**
   * Supported fiat payment rails.
   */
  payment_rail: FiatPaymentRail;

  account_holder_name?: string;

  bank_account_number?: string;

  bank_address?: string;

  bank_beneficiary_address?: string;

  bank_beneficiary_name?: string;

  bank_name?: string;

  bank_routing_number?: string;

  bic?: string;

  deposit_message?: string;

  iban?: string;
}

/**
 * Response for an onramp KYC verification.
 */
export interface OnrampKYCResponse {
  /**
   * Status of the KYC verification process.
   */
  status: OnrampKYCStatus;

  user_id: string;

  provider_user_id?: string;
}

/**
 * Status of the KYC verification process.
 */
export type OnrampKYCStatus =
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

/**
 * Response for an onramp transfer initiation.
 */
export interface OnrampResponse {
  id: string;

  /**
   * Bank deposit instructions for an onramp transfer.
   */
  deposit_instructions: OnrampDepositInstructions;

  /**
   * Status of an onramp or offramp transfer.
   */
  status: OnrampTransferStatus;
}

/**
 * Status of an onramp or offramp transfer.
 */
export type OnrampTransferStatus =
  | 'awaiting_funds'
  | 'in_review'
  | 'funds_received'
  | 'payment_submitted'
  | 'payment_processed'
  | 'canceled'
  | 'error'
  | 'undeliverable'
  | 'returned'
  | 'refunded';

/**
 * A Bridge external fiat account linked to an organization.
 */
export interface OrganizationExternalFiatAccount {
  id: string;

  account_owner_name: string;

  account_type: string;

  created_at: string;

  currency: string;

  /**
   * The Privy API environment.
   */
  environment: SharedAPI.IntegrationEnvironment;

  organization_id: string;

  /**
   * Discriminator: the external fiat account is orchestrated via Bridge.
   */
  provider: 'bridge';

  bank_name?: string;

  last_4?: string;
}

/**
 * Response containing a single organization external fiat account.
 */
export interface OrganizationExternalFiatAccountResponse {
  /**
   * A Bridge external fiat account linked to an organization.
   */
  external_fiat_account: OrganizationExternalFiatAccount;
}

/**
 * The destination bank account for a payout.
 */
export interface PayoutDestination {
  /**
   * The ID of a previously registered external fiat account to pay out to.
   */
  fiat_account_id: string;
}

/**
 * The source crypto asset, chain, and amount for a payout.
 */
export interface PayoutSource {
  /**
   * Amount to offramp, in the asset's standard units (e.g. "100.00").
   */
  amount: string;

  /**
   * Source crypto asset (e.g. "usdc").
   */
  asset: string;

  /**
   * Source chain (e.g. "base").
   */
  chain: string;
}

export declare namespace Fiat {
  export {
    type BridgeCreateExternalFiatAccountRequestBody as BridgeCreateExternalFiatAccountRequestBody,
    type BridgeCreateFiatDepositAccountRequestBody as BridgeCreateFiatDepositAccountRequestBody,
    type BridgeExternalFiatAccount as BridgeExternalFiatAccount,
    type BridgeFiatDepositAccount as BridgeFiatDepositAccount,
    type BridgeOrganizationExternalFiatAccount as BridgeOrganizationExternalFiatAccount,
    type CreateExternalFiatAccountRequestBody as CreateExternalFiatAccountRequestBody,
    type CreateFiatDepositAccountRequestBody as CreateFiatDepositAccountRequestBody,
    type CreateFiatDepositAccountSource as CreateFiatDepositAccountSource,
    type CreatePayoutRequestBody as CreatePayoutRequestBody,
    type ExternalFiatAccount as ExternalFiatAccount,
    type ExternalFiatAccountAddress as ExternalFiatAccountAddress,
    type ExternalFiatAccountData as ExternalFiatAccountData,
    type ExternalFiatAccountGBData as ExternalFiatAccountGBData,
    type ExternalFiatAccountIbanData as ExternalFiatAccountIbanData,
    type ExternalFiatAccountPixData as ExternalFiatAccountPixData,
    type ExternalFiatAccountResponse as ExternalFiatAccountResponse,
    type ExternalFiatAccountSwiftCategory as ExternalFiatAccountSwiftCategory,
    type ExternalFiatAccountSwiftData as ExternalFiatAccountSwiftData,
    type ExternalFiatAccountSwiftPurposeOfFunds as ExternalFiatAccountSwiftPurposeOfFunds,
    type ExternalFiatAccountUsData as ExternalFiatAccountUsData,
    type FiatCurrency as FiatCurrency,
    type FiatDepositAccount as FiatDepositAccount,
    type FiatDepositAccountDestination as FiatDepositAccountDestination,
    type FiatDepositAccountResponse as FiatDepositAccountResponse,
    type FiatDepositAccountSource as FiatDepositAccountSource,
    type FiatDepositAccountStatus as FiatDepositAccountStatus,
    type FiatDepositInstructions as FiatDepositInstructions,
    type FiatPaymentRail as FiatPaymentRail,
    type KYBLinksRequestBody as KYBLinksRequestBody,
    type KYBStatusListResponse as KYBStatusListResponse,
    type KYBStatusResponse as KYBStatusResponse,
    type KYBTosRequestBody as KYBTosRequestBody,
    type KYCIdentifyingDocument as KYCIdentifyingDocument,
    type KYCLinksRequestBody as KYCLinksRequestBody,
    type KYCResidentialAddress as KYCResidentialAddress,
    type KYCStatusListResponse as KYCStatusListResponse,
    type KYCStatusResponse as KYCStatusResponse,
    type KYCSubmitData as KYCSubmitData,
    type KYCSubmitRequestBody as KYCSubmitRequestBody,
    type KyxCapabilities as KyxCapabilities,
    type KyxCapabilityStatus as KyxCapabilityStatus,
    type KyxEndorsement as KyxEndorsement,
    type KyxEndorsementName as KyxEndorsementName,
    type KyxEndorsementStatus as KyxEndorsementStatus,
    type KyxEnvironment as KyxEnvironment,
    type KyxProvider as KyxProvider,
    type KyxProviderStatus as KyxProviderStatus,
    type KyxTosRequestBody as KyxTosRequestBody,
    type KyxTosResponse as KyxTosResponse,
    type KyxTosStatus as KyxTosStatus,
    type KyxTosStatusDetail as KyxTosStatusDetail,
    type KyxVerificationStatus as KyxVerificationStatus,
    type KyxVerificationStatusDetail as KyxVerificationStatusDetail,
    type ListExternalFiatAccountsResponse as ListExternalFiatAccountsResponse,
    type ListFiatDepositAccountsResponse as ListFiatDepositAccountsResponse,
    type ListOrganizationExternalFiatAccountsResponse as ListOrganizationExternalFiatAccountsResponse,
    type OfframpDepositInstructions as OfframpDepositInstructions,
    type OfframpResponse as OfframpResponse,
    type OnrampAsset as OnrampAsset,
    type OnrampChain as OnrampChain,
    type OnrampDepositInstructions as OnrampDepositInstructions,
    type OnrampKYCResponse as OnrampKYCResponse,
    type OnrampKYCStatus as OnrampKYCStatus,
    type OnrampResponse as OnrampResponse,
    type OnrampTransferStatus as OnrampTransferStatus,
    type OrganizationExternalFiatAccount as OrganizationExternalFiatAccount,
    type OrganizationExternalFiatAccountResponse as OrganizationExternalFiatAccountResponse,
    type PayoutDestination as PayoutDestination,
    type PayoutSource as PayoutSource,
  };
}
