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
 * Primary purpose the business will use the account for. Passthrough to the
 * provider. See the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBAccountPurpose = string;

/**
 * A beneficial owner, control person, or signer associated with the business. At
 * least one of has_ownership, has_control, or is_signer must be true, and the
 * business must have at least one control person and one signer.
 */
export interface KYBAssociatedPerson {
  /**
   * Date of birth in YYYY-MM-DD format. Must be 18 years or older.
   */
  date_of_birth: string;

  /**
   * Email address.
   */
  email: string;

  /**
   * Legal first name.
   */
  first_name: string;

  /**
   * Whether this person is a control person.
   */
  has_control: boolean;

  /**
   * Whether this person owns 25% or more of the business.
   */
  has_ownership: boolean;

  /**
   * Identifying documents for this person.
   */
  identifying_information: Array<VerificationDocument>;

  /**
   * Whether this person is a signer for the business.
   */
  is_signer: boolean;

  /**
   * Legal last name.
   */
  last_name: string;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  residential_address: VerificationAddress;

  /**
   * Supporting documents for this person, such as proof of address.
   */
  documents?: Array<KYBIndividualDocument>;

  /**
   * Whether this person is a director.
   */
  is_director?: boolean;

  /**
   * Legal middle name.
   */
  middle_name?: string;

  /**
   * ISO 3166-1 alpha-3 codes for all nationalities held.
   */
  nationalities?: Array<string>;

  /**
   * Percentage of the business this person owns.
   */
  ownership_percentage?: number;

  /**
   * Phone number in E.164 format.
   */
  phone?: string;

  /**
   * Place of birth for an associated person.
   */
  place_of_birth?: KYBPlaceOfBirth;

  /**
   * Date the relationship with the business was established, in YYYY-MM-DD format.
   */
  relationship_established_at?: string;

  /**
   * Job title. Required when has_control is true.
   */
  title?: string;

  /**
   * Latin-1 transliteration of the first name. Required for non-Latin-1 names.
   */
  transliterated_first_name?: string;

  /**
   * Latin-1 transliteration of the last name. Required for non-Latin-1 names.
   */
  transliterated_last_name?: string;

  /**
   * Latin-1 transliteration of the middle name. Required for non-Latin-1 names.
   */
  transliterated_middle_name?: string;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  transliterated_residential_address?: VerificationAddress;
}

/**
 * A supporting document for business verification.
 */
export interface KYBBusinessDocument {
  /**
   * Base64-encoded data URI of the document.
   */
  file: string;

  /**
   * What this document evidences. Supports multiple purposes per file.
   */
  purposes: Array<KYBDocumentPurpose>;

  /**
   * Document description. Required when "other" is one of the purposes.
   */
  description?: string;
}

/**
 * Legal structure of the business. Passthrough to the provider. See the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBBusinessType = string;

/**
 * What a supporting business document evidences. Passthrough to the provider. See
 * the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBDocumentPurpose = string;

/**
 * Estimated annual revenue of the business, in USD buckets. Passthrough to the
 * provider. See the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBEstimatedAnnualRevenue = string;

/**
 * A high-risk activity the business engages in. Passthrough to the provider. See
 * the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBHighRiskActivity = string;

/**
 * A supporting document for an associated person.
 */
export interface KYBIndividualDocument {
  /**
   * Base64-encoded data URI of the document.
   */
  file: string;

  /**
   * What this document evidences. Supports multiple purposes per file.
   */
  purposes: Array<KYBIndividualDocumentPurpose>;

  /**
   * Document description. Required when "other" is one of the purposes.
   */
  description?: string;
}

/**
 * What a supporting document for an associated person evidences. Passthrough to
 * the provider. See the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBIndividualDocumentPurpose = string;

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
 * Place of birth for an associated person.
 */
export interface KYBPlaceOfBirth {
  /**
   * ISO 3166-1 alpha-3 country code.
   */
  country: string;

  /**
   * City of birth.
   */
  city?: string;
}

/**
 * A public exchange listing for the business.
 */
export interface KYBPubliclyTradedListing {
  /**
   * ISO 10383 market identifier code of the listing venue.
   */
  market_identifier_code: string;

  /**
   * ISIN with dashes removed.
   */
  stock_number: string;

  /**
   * Exchange ticker symbol.
   */
  ticker: string;
}

/**
 * Details of the regulated activity a business is licensed to perform.
 */
export interface KYBRegulatedActivity {
  /**
   * License number issued by the regulator.
   */
  license_number: string;

  /**
   * ISO 3166-1 alpha-3 country code of the primary regulator.
   */
  primary_regulatory_authority_country: string;

  /**
   * Name of the primary regulator.
   */
  primary_regulatory_authority_name: string;

  /**
   * Description of the regulated activities performed.
   */
  regulated_activities_description: string;
}

/**
 * Primary source of the funds the business will transact with. Passthrough to the
 * provider. See the
 * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
 * for accepted values.
 */
export type KYBSourceOfFunds = string;

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
 * KYB verification data for headless submission. Fields are individually optional
 * because the provider accepts partial submissions and grants endorsements once
 * enough data has arrived; a partial submission can be completed by calling the
 * endpoint again.
 */
export interface KYBSubmitData {
  /**
   * Primary purpose the business will use the account for. Passthrough to the
   * provider. See the
   * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
   * for accepted values.
   */
  account_purpose?: KYBAccountPurpose;

  /**
   * Free-text purpose. Required when account_purpose is "other".
   */
  account_purpose_other?: string;

  /**
   * Whether the business moves funds on behalf of third parties.
   */
  acting_as_intermediary?: boolean;

  /**
   * Beneficial owners, control persons, and signers.
   */
  associated_persons?: Array<KYBAssociatedPerson>;

  /**
   * Short summary of what the business does.
   */
  business_description?: string;

  /**
   * 2022 NAICS codes describing the industries the business operates in.
   */
  business_industry?: Array<string>;

  /**
   * Registered legal name as filed with government authorities.
   */
  business_legal_name?: string;

  /**
   * Public trading name (DBA), if different from the legal name.
   */
  business_trade_name?: string;

  /**
   * Legal structure of the business. Passthrough to the provider. See the
   * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
   * for accepted values.
   */
  business_type?: KYBBusinessType;

  /**
   * Description of the AML and sanctions screening controls in place.
   */
  compliance_screening_explanation?: string;

  /**
   * Whether the business conducts money services.
   */
  conducts_money_services?: boolean;

  /**
   * Description of the money services conducted.
   */
  conducts_money_services_description?: string;

  /**
   * Whether money services are conducted through the provider. Requires a
   * flow_of_funds document when true.
   */
  conducts_money_services_using_bridge?: boolean;

  /**
   * Supporting documents for verification.
   */
  documents?: Array<KYBBusinessDocument>;

  /**
   * Primary business email address.
   */
  email?: string;

  /**
   * Estimated annual revenue of the business, in USD buckets. Passthrough to the
   * provider. See the
   * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
   * for accepted values.
   */
  estimated_annual_revenue_usd?: KYBEstimatedAnnualRevenue;

  /**
   * Expected monthly payment volume in USD. Required for high-risk businesses.
   */
  expected_monthly_payments_usd?: number;

  /**
   * Whether the business is tax-registered outside its country of incorporation.
   */
  has_foreign_tax_registration?: boolean;

  /**
   * Whether an intermediate entity owner holds 25% or more of the business.
   */
  has_material_intermediary_ownership?: boolean;

  /**
   * High-risk activities the business engages in.
   */
  high_risk_activities?: Array<KYBHighRiskActivity>;

  /**
   * Explanation of the high-risk activities. Required unless the only value is
   * "none_of_the_above".
   */
  high_risk_activities_explanation?: string;

  /**
   * Business tax and registration identifiers.
   */
  identifying_information?: Array<VerificationDocument>;

  /**
   * Date of incorporation in YYYY-MM-DD format.
   */
  incorporation_date?: string;

  /**
   * Whether the business is a decentralized autonomous organization.
   */
  is_dao?: boolean;

  /**
   * Whether the business operates in prohibited jurisdictions.
   */
  operates_in_prohibited_countries?: boolean;

  /**
   * Additional websites and social handles.
   */
  other_websites?: Array<string>;

  /**
   * Ownership percentage at which a person is treated as a beneficial owner.
   */
  ownership_threshold?: number;

  /**
   * Business phone number in E.164 format.
   */
  phone?: string;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  physical_address?: VerificationAddress;

  /**
   * Primary website. If omitted, a proof_of_nature_of_business document is required.
   */
  primary_website?: string;

  /**
   * Public exchange listings for the business.
   */
  publicly_traded_listings?: Array<KYBPubliclyTradedListing>;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  registered_address?: VerificationAddress;

  /**
   * Details of the regulated activity a business is licensed to perform.
   */
  regulated_activity?: KYBRegulatedActivity;

  /**
   * Primary source of the funds the business will transact with. Passthrough to the
   * provider. See the
   * [Bridge customer API reference](https://apidocs.bridge.xyz/platform/customers/customers/api)
   * for accepted values.
   */
  source_of_funds?: KYBSourceOfFunds;

  /**
   * Free-text detail on the source of funds. Required for high-risk businesses.
   */
  source_of_funds_description?: string;

  /**
   * Latin-1 transliteration of the legal name. Required for non-Latin-1 names.
   */
  transliterated_business_legal_name?: string;

  /**
   * Latin-1 transliteration of the trade name. Required for non-Latin-1 names.
   */
  transliterated_business_trade_name?: string;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  transliterated_physical_address?: VerificationAddress;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  transliterated_registered_address?: VerificationAddress;
}

/**
 * Request body for headless KYB data submission.
 */
export interface KYBSubmitRequestBody {
  /**
   * KYB verification data for headless submission. Fields are individually optional
   * because the provider accepts partial submissions and grants endorsements once
   * enough data has arrived; a partial submission can be completed by calling the
   * endpoint again.
   */
  data: KYBSubmitData;

  /**
   * KYC/KYB provider identifier.
   */
  provider: KyxProvider;

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
  date_of_birth?: string;

  /**
   * Email address.
   */
  email?: string;

  /**
   * Legal first name.
   */
  first_name?: string;

  /**
   * Identifying documents.
   */
  identifying_information?: Array<VerificationDocument>;

  /**
   * Legal last name.
   */
  last_name?: string;

  /**
   * Phone number in E.164 format.
   */
  phone?: string;

  /**
   * A postal address used in KYC and KYB data submission.
   */
  residential_address?: VerificationAddress;
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

/**
 * A postal address used in KYC and KYB data submission.
 */
export interface VerificationAddress {
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
   * Postal code. Required for countries that use them.
   */
  postal_code?: string;

  /**
   * Street address line 2.
   */
  street_line_2?: string;

  /**
   * ISO 3166-2 state or province code. Required for US addresses.
   */
  subdivision?: string;
}

/**
 * An identifying document for KYC or KYB verification. Also used for business
 * identifiers such as tax and registration numbers, for which the image and
 * expiration fields do not apply.
 */
export interface VerificationDocument {
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
    type KYBAccountPurpose as KYBAccountPurpose,
    type KYBAssociatedPerson as KYBAssociatedPerson,
    type KYBBusinessDocument as KYBBusinessDocument,
    type KYBBusinessType as KYBBusinessType,
    type KYBDocumentPurpose as KYBDocumentPurpose,
    type KYBEstimatedAnnualRevenue as KYBEstimatedAnnualRevenue,
    type KYBHighRiskActivity as KYBHighRiskActivity,
    type KYBIndividualDocument as KYBIndividualDocument,
    type KYBIndividualDocumentPurpose as KYBIndividualDocumentPurpose,
    type KYBLinksRequestBody as KYBLinksRequestBody,
    type KYBPlaceOfBirth as KYBPlaceOfBirth,
    type KYBPubliclyTradedListing as KYBPubliclyTradedListing,
    type KYBRegulatedActivity as KYBRegulatedActivity,
    type KYBSourceOfFunds as KYBSourceOfFunds,
    type KYBStatusListResponse as KYBStatusListResponse,
    type KYBStatusResponse as KYBStatusResponse,
    type KYBSubmitData as KYBSubmitData,
    type KYBSubmitRequestBody as KYBSubmitRequestBody,
    type KYBTosRequestBody as KYBTosRequestBody,
    type KYCLinksRequestBody as KYCLinksRequestBody,
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
    type VerificationAddress as VerificationAddress,
    type VerificationDocument as VerificationDocument,
  };
}
