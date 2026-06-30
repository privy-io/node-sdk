// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class KrakenEmbed extends APIResource {}

/**
 * Sorting options for the asset list endpoint.
 */
export type KrakenEmbedAssetSortOption =
  | 'trending'
  | 'market_cap_rank'
  | '-market_cap_rank'
  | 'symbol'
  | '-symbol'
  | 'name'
  | '-name'
  | 'change_percent_1h'
  | '-change_percent_1h'
  | 'change_percent_24h'
  | '-change_percent_24h'
  | 'change_percent_7d'
  | '-change_percent_7d'
  | 'change_percent_30d'
  | '-change_percent_30d'
  | 'change_percent_1y'
  | '-change_percent_1y'
  | 'listing_date'
  | '-listing_date';

/**
 * Request body for cancelling a custom order.
 */
export interface KrakenEmbedCancelCustomOrderInput {
  user_id: string;
}

/**
 * Path parameters for cancelling a custom order.
 */
export interface KrakenEmbedCancelCustomOrderPath {
  order_id: string;
}

/**
 * Response body for cancelling a custom order.
 */
export interface KrakenEmbedCancelCustomOrderResponse {
  /**
   * Result payload for cancel custom order response.
   */
  result: KrakenEmbedCancelCustomOrderResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Result payload for cancel custom order response.
 */
export interface KrakenEmbedCancelCustomOrderResult {
  /**
   * Full custom order object.
   */
  order: KrakenEmbedCustomOrder;
}

/**
 * ISO 3166-1 alpha-2 country codes supported by Kraken Embed.
 */
export type KrakenEmbedCountryCode =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW'
  | 'AC'
  | 'AN'
  | 'AP'
  | 'CP'
  | 'DG'
  | 'EA'
  | 'EU'
  | 'IC'
  | 'JX'
  | 'TA'
  | 'QO'
  | 'XK'
  | '0C';

/**
 * Request body for creating a custom order.
 */
export interface KrakenEmbedCreateCustomOrderInput {
  /**
   * Trade action for a custom order.
   */
  action: KrakenEmbedCustomOrderAction;

  name: string;

  /**
   * Price trigger for a custom order. The order executes when base_asset/quote_asset
   * rate meets the condition against target_price.
   */
  trigger: KrakenEmbedCustomOrderTrigger;

  user_id: string;
}

/**
 * Response body for creating a custom order.
 */
export interface KrakenEmbedCreateCustomOrderResponse {
  /**
   * Result payload for create custom order response.
   */
  result: KrakenEmbedCreateCustomOrderResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Result payload for create custom order response.
 */
export interface KrakenEmbedCreateCustomOrderResult {
  /**
   * Full custom order object.
   */
  order: KrakenEmbedCustomOrder;
}

/**
 * Current day profit and loss for a portfolio, calculated from the most recent
 * available balance.
 */
export interface KrakenEmbedCurrentDayPnl {
  pnl: string;

  since: string;
}

/**
 * Full custom order object.
 */
export interface KrakenEmbedCustomOrder {
  id: string;

  /**
   * Trade action for a custom order.
   */
  action: KrakenEmbedCustomOrderAction;

  created_at: string;

  name: string;

  /**
   * Custom order status with optional reason for cancelled or paused states.
   */
  status: KrakenEmbedCustomOrderStatus;

  /**
   * Price trigger for a custom order. The order executes when base_asset/quote_asset
   * rate meets the condition against target_price.
   */
  trigger: KrakenEmbedCustomOrderTrigger;

  updated_at: string;
}

/**
 * Trade action for a custom order.
 */
export interface KrakenEmbedCustomOrderAction {
  /**
   * Asset amount for custom order actions.
   */
  amount: KrakenEmbedCustomOrderAmount;

  fee_bps: string;

  /**
   * Target asset for the other side of the custom order trade.
   */
  quote: KrakenEmbedCustomOrderQuoteAsset;

  spread_bps: string;

  /**
   * Whether the quote amount refers to the asset being received or spent.
   */
  type: KrakenEmbedQuoteType;
}

/**
 * Asset amount for custom order actions.
 */
export interface KrakenEmbedCustomOrderAmount {
  amount: string;

  asset: string;

  asset_class?: 'currency';
}

/**
 * A single execution occurrence of a custom order.
 */
export interface KrakenEmbedCustomOrderOccurrence {
  id: string;

  created_at: string;

  /**
   * Outcome status of a custom order execution occurrence.
   */
  status: KrakenEmbedCustomOrderOccurrenceStatus;

  /**
   * Trigger metadata for a custom order occurrence.
   */
  trigger: KrakenEmbedCustomOrderOccurrenceTrigger;

  updated_at: string;

  /**
   * Executed action details for a custom order occurrence.
   */
  executed_action?: KrakenEmbedCustomOrderOccurrenceExecutedAction | null;

  failure_reason?: string;

  skip_reason?: string;
}

/**
 * Executed action details for a custom order occurrence.
 */
export interface KrakenEmbedCustomOrderOccurrenceExecutedAction {
  quote_id: string;
}

/**
 * Outcome status of a custom order execution occurrence.
 */
export type KrakenEmbedCustomOrderOccurrenceStatus = 'success' | 'failure' | 'skipped';

/**
 * Trigger metadata for a custom order occurrence.
 */
export interface KrakenEmbedCustomOrderOccurrenceTrigger {
  /**
   * The trigger type that caused a custom order occurrence to execute.
   */
  type: KrakenEmbedCustomOrderOccurrenceTriggerType;
}

/**
 * The trigger type that caused a custom order occurrence to execute.
 */
export type KrakenEmbedCustomOrderOccurrenceTriggerType = 'time' | 'price' | 'crypto_deposit' | 'market_open';

/**
 * Target asset for the other side of the custom order trade.
 */
export interface KrakenEmbedCustomOrderQuoteAsset {
  asset: string;
}

/**
 * Custom order status with optional reason for cancelled or paused states.
 */
export interface KrakenEmbedCustomOrderStatus {
  /**
   * The lifecycle state of a custom order.
   */
  status: KrakenEmbedCustomOrderStatusValue;

  reason?: unknown;
}

/**
 * The lifecycle state of a custom order.
 */
export type KrakenEmbedCustomOrderStatusValue = 'active' | 'completed' | 'cancelled' | 'paused';

/**
 * Price trigger for a custom order. The order executes when base_asset/quote_asset
 * rate meets the condition against target_price.
 */
export interface KrakenEmbedCustomOrderTrigger {
  base_asset: string;

  /**
   * Comparison operator for a custom order price trigger.
   */
  condition: KrakenEmbedCustomOrderTriggerCondition;

  quote_asset: string;

  target_price: string;

  type: 'price';
}

/**
 * Comparison operator for a custom order price trigger.
 */
export type KrakenEmbedCustomOrderTriggerCondition = 'gte' | 'lte';

/**
 * An earn amount with native and converted values.
 */
export interface KrakenEmbedEarnAmount {
  converted: string;

  native: string;
}

/**
 * Low and high estimate of the yield of an earn asset.
 */
export interface KrakenEmbedEarnAprEstimate {
  high: string;

  low: string;
}

/**
 * A single asset that can yield rewards.
 */
export interface KrakenEmbedEarnAsset {
  /**
   * Low and high estimate of the yield of an earn asset.
   */
  apr_estimate: KrakenEmbedEarnAprEstimate | null;

  /**
   * User allocation for an earn asset.
   */
  user_allocation?: KrakenEmbedEarnUserAllocation | null;
}

/**
 * User allocation for an earn asset.
 */
export interface KrakenEmbedEarnUserAllocation {
  /**
   * An earn amount with native and converted values.
   */
  total_allocated: KrakenEmbedEarnAmount | null;

  /**
   * An earn amount with native and converted values.
   */
  total_rewarded: KrakenEmbedEarnAmount | null;

  upcoming_reward_date?: string | null;
}

/**
 * User's full name including first, optional middle, and last name.
 */
export interface KrakenEmbedFullName {
  first_name: string;

  last_name: string;

  middle_name?: string | null;
}

/**
 * Query parameters for listing and filtering available assets.
 */
export interface KrakenEmbedGetAssetListQueryParamsSchema {
  'filter[assets]'?: Array<string>;

  'filter[platform_statuses]'?: Array<
    | 'enabled'
    | 'deposit_only'
    | 'withdrawal_only'
    | 'funding_temporarily_disabled'
    | 'disabled'
    | (string & {})
  >;

  'filter[tradable_only]'?: boolean | null;

  'filter[user]'?: string;

  lang?: string;

  'page[number]'?: number;

  'page[size]'?: number;

  quote?: string;

  /**
   * Sorting options for the asset list endpoint.
   */
  sort?: KrakenEmbedAssetSortOption;
}

/**
 * Query parameters for getting custom order history.
 */
export interface KrakenEmbedGetCustomOrderHistoryQueryParams {
  order_id: string;

  user_id: string;
}

/**
 * Response body for getting custom order execution history.
 */
export interface KrakenEmbedGetCustomOrderHistoryResponse {
  /**
   * Result payload for custom order history response.
   */
  result: KrakenEmbedGetCustomOrderHistoryResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Result payload for custom order history response.
 */
export interface KrakenEmbedGetCustomOrderHistoryResult {
  history: Array<KrakenEmbedCustomOrderOccurrence>;
}

/**
 * Query parameters for getting a single custom order.
 */
export interface KrakenEmbedGetCustomOrderQueryParams {
  order_id: string;

  user_id: string;
}

/**
 * Response body for getting a single custom order.
 */
export interface KrakenEmbedGetCustomOrderResponse {
  /**
   * Result payload for get custom order response.
   */
  result: KrakenEmbedGetCustomOrderResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Result payload for get custom order response.
 */
export interface KrakenEmbedGetCustomOrderResult {
  /**
   * Full custom order object.
   */
  order: KrakenEmbedCustomOrder;
}

/**
 * Kraken API response envelope for earn assets.
 */
export interface KrakenEmbedGetEarnAssetsKrakenResponse {
  /**
   * Result payload for earn assets response.
   */
  result: KrakenEmbedGetEarnAssetsResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Query parameters for listing earn assets.
 */
export interface KrakenEmbedGetEarnAssetsQueryParams {
  assets?: Array<string>;

  currency?: string;

  user?: string;
}

/**
 * List of earn assets with APR estimates and optional user allocations.
 */
export interface KrakenEmbedGetEarnAssetsResponse {
  /**
   * Kraken API response envelope for earn assets.
   */
  data: KrakenEmbedGetEarnAssetsKrakenResponse;
}

/**
 * Result payload for earn assets response.
 */
export interface KrakenEmbedGetEarnAssetsResult {
  assets: { [key: string]: KrakenEmbedEarnAsset };
}

/**
 * Kraken API response envelope for earn summary.
 */
export interface KrakenEmbedGetEarnSummaryKrakenResponse {
  /**
   * Result payload for earn summary response.
   */
  result: KrakenEmbedGetEarnSummaryResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Query parameters for getting an earn summary.
 */
export interface KrakenEmbedGetEarnSummaryQueryParams {
  currency: string;
}

/**
 * Earn summary for a user including Auto-Earn status, total rewards, and upcoming
 * payouts.
 */
export interface KrakenEmbedGetEarnSummaryResponse {
  /**
   * Kraken API response envelope for earn summary.
   */
  data: KrakenEmbedGetEarnSummaryKrakenResponse;
}

/**
 * Result payload for earn summary response.
 */
export interface KrakenEmbedGetEarnSummaryResult {
  auto_earn_eligible: boolean;

  auto_earn_enabled: boolean;

  num_earning_assets: number;

  payout_period: string;

  total_allocated_converted: string;

  total_rewarded_converted_current_rate: string;

  total_rewarded_converted_true_rates: string;

  upcoming_rewards: Array<KrakenEmbedUpcomingReward>;

  auto_earn_last_changed?: string | null;
}

/**
 * Query parameters for portfolio details endpoint.
 */
export interface KrakenEmbedGetPortfolioDetailsQueryParamsSchema {
  quote?: string;
}

/**
 * Query parameters for getting a portfolio summary.
 */
export interface KrakenEmbedGetPortfolioSummaryQueryParams {
  /**
   * A string-encoded boolean query parameter on including current day profit and
   * loss.
   */
  'include[current_day_pnl]'?: KrakenEmbedIncludeCurrentDayPnlQueryParam;

  quote?: string;
}

/**
 * High-level summary of a user's portfolio including total value, available
 * balance, and unrealized P&L.
 */
export interface KrakenEmbedGetPortfolioSummaryResponse {
  /**
   * Kraken API response envelope for portfolio summary, containing optional errors
   * and the result payload.
   */
  data: KrakenEmbedGetPortfolioSummaryResult;
}

/**
 * Kraken API response envelope for portfolio summary, containing optional errors
 * and the result payload.
 */
export interface KrakenEmbedGetPortfolioSummaryResult {
  /**
   * Portfolio summary payload containing balances, value, and profit/loss
   * information.
   */
  result: KrakenEmbedPortfolioSummaryPayload | null;

  error?: Array<string>;

  errors?: Array<string>;
}

/**
 * Query parameters for filtering and paginating portfolio transactions.
 */
export interface KrakenEmbedGetPortfolioTransactionsQueryParamsSchema {
  assets?: Array<string>;

  cursor?: string;

  from_time?: string;

  ids?: Array<string>;

  page_size?: number;

  quote?: string;

  ref_ids?: Array<KrakenEmbedPortfolioTransactionRefID>;

  /**
   * Sort direction for paginated transaction lists.
   */
  sorting?: KrakenEmbedSortingOrder;

  statuses?: Array<KrakenEmbedTransactionStatus>;

  types?: Array<KrakenEmbedTransactionType>;

  until_time?: string;
}

/**
 * Query parameters for getting a quote status.
 */
export interface KrakenEmbedGetQuoteQueryParams {
  /**
   * The ID of the Privy user.
   */
  user_id: string;
}

/**
 * Document types accepted for proof of identity verification.
 */
export type KrakenEmbedIdentityDocumentType =
  | 'passport'
  | 'drivers_license'
  | 'id_card'
  | 'residence_card'
  | 'special_permanent_residence_card';

/**
 * A string-encoded boolean query parameter on including current day profit and
 * loss.
 */
export type KrakenEmbedIncludeCurrentDayPnlQueryParam = 'true' | 'false';

/**
 * Query parameters for listing custom orders.
 */
export interface KrakenEmbedListCustomOrdersQueryParams {
  user_id: string;

  cursor?: string;

  statuses?: Array<KrakenEmbedCustomOrderStatusValue> | string;
}

/**
 * Response body for listing custom orders.
 */
export interface KrakenEmbedListCustomOrdersResponse {
  /**
   * Result payload for list custom orders response.
   */
  result: KrakenEmbedListCustomOrdersResult | null;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

/**
 * Result payload for list custom orders response.
 */
export interface KrakenEmbedListCustomOrdersResult {
  orders: Array<KrakenEmbedCustomOrder>;
}

/**
 * Portfolio summary payload containing balances, value, and profit/loss
 * information.
 */
export interface KrakenEmbedPortfolioSummaryPayload {
  available_balance: string;

  currency: string;

  open_orders: string;

  portfolio_value: string;

  timestamp: string;

  withheld_value: string;

  cost_basis?: string | null;

  /**
   * Current day profit and loss for a portfolio, calculated from the most recent
   * available balance.
   */
  current_day_pnl?: KrakenEmbedCurrentDayPnl | null;

  lots_upnl?: string | null;
}

/**
 * A reference ID filter for portfolio transaction queries, identifying a
 * transaction by type and reference identifier.
 */
export interface KrakenEmbedPortfolioTransactionRefID {
  ref_id: string;

  /**
   * The type of reference ID used to filter portfolio transactions by quote or
   * failed quote references.
   */
  type: KrakenEmbedPortfolioTransactionRefIDType;
}

/**
 * The type of reference ID used to filter portfolio transactions by quote or
 * failed quote references.
 */
export type KrakenEmbedPortfolioTransactionRefIDType = 'simple_order_quote' | 'simple_order_quote_failed';

/**
 * Whether the quote amount refers to the asset being received or spent.
 */
export type KrakenEmbedQuoteType = 'receive' | 'spend';

/**
 * User's residential address including street, city, postal code, and country.
 */
export interface KrakenEmbedResidence {
  city: string;

  /**
   * ISO 3166-1 alpha-2 country codes supported by Kraken Embed.
   */
  country: KrakenEmbedCountryCode;

  line1: string;

  postal_code: string;

  line2?: string | null;

  province?: string | null;
}

/**
 * Document types accepted for proof of address verification.
 */
export type KrakenEmbedResidenceDocumentType =
  | 'bank_statement'
  | 'credit_card_statement'
  | 'employer_letter_or_work_contract'
  | 'government_issued_document'
  | 'home_or_rental_insurance'
  | 'internet_or_cable_bill'
  | 'mobile_phone_bill'
  | 'mortgage_statement'
  | 'official_government_letter'
  | 'passport_address_page'
  | 'rental_or_lease_agreement'
  | 'residence_certificate'
  | 'social_insurance_payment_receipt'
  | 'tax_receipt'
  | 'tax_return'
  | 'utility_bill'
  | 'other';

/**
 * Sort direction for paginated transaction lists.
 */
export type KrakenEmbedSortingOrder = 'descending' | 'ascending';

/**
 * Optional best-effort metadata hints for proof of address verification.
 */
export interface KrakenEmbedStartAddressMetadata {
  /**
   * User's residential address including street, city, postal code, and country.
   */
  address?: KrakenEmbedResidence | null;

  document_number?: string | null;

  /**
   * Document types accepted for proof of address verification.
   */
  document_type?: KrakenEmbedResidenceDocumentType | null;

  expiration_date?: string | null;
}

/**
 * Input payload for starting proof of address verification via URL.
 */
export interface KrakenEmbedStartAddressVerificationURLInput {
  document_url: string;

  type: 'proof_of_address';

  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  debug?: KrakenEmbedStartVerificationDebug | null;

  /**
   * Optional best-effort metadata hints for proof of address verification.
   */
  metadata?: KrakenEmbedStartAddressMetadata | null;
}

/**
 * Identity information hints including full name and date of birth for proof of
 * identity verification.
 */
export interface KrakenEmbedStartIdentityInfo {
  date_of_birth?: string | null;

  /**
   * User's full name including first, optional middle, and last name.
   */
  full_name?: KrakenEmbedFullName | null;
}

/**
 * Optional best-effort metadata hints for proof of identity verification.
 */
export interface KrakenEmbedStartIdentityMetadata {
  document_number?: string | null;

  /**
   * Document types accepted for proof of identity verification.
   */
  document_type?: KrakenEmbedIdentityDocumentType | null;

  expiration_date?: string | null;

  /**
   * Identity information hints including full name and date of birth for proof of
   * identity verification.
   */
  identity?: KrakenEmbedStartIdentityInfo | null;

  /**
   * ISO 3166-1 alpha-2 country codes supported by Kraken Embed.
   */
  issuing_country?: KrakenEmbedCountryCode | null;

  /**
   * ISO 3166-1 alpha-2 country codes supported by Kraken Embed.
   */
  nationality?: KrakenEmbedCountryCode | null;
}

/**
 * Input payload for starting proof of identity verification via URLs.
 */
export interface KrakenEmbedStartIdentityVerificationURLInput {
  front_url: string;

  type: 'proof_of_identity';

  back_url?: string | null;

  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  debug?: KrakenEmbedStartVerificationDebug | null;

  /**
   * Optional best-effort metadata hints for proof of identity verification.
   */
  metadata?: KrakenEmbedStartIdentityMetadata | null;
}

/**
 * Input payload for starting proof of liveness verification via URLs.
 */
export interface KrakenEmbedStartLivenessVerificationURLInput {
  center_url: string;

  left_url: string;

  right_url: string;

  type: 'proof_of_liveness';

  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  debug?: KrakenEmbedStartVerificationDebug | null;
}

/**
 * Debug options for start verification. Only works in non-production environments.
 */
export interface KrakenEmbedStartVerificationDebug {
  outcome?: 'failed' | null;
}

/**
 * Discriminated union of all start verification URL input types.
 */
export type KrakenEmbedStartVerificationURLInput =
  | KrakenEmbedStartIdentityVerificationURLInput
  | KrakenEmbedStartAddressVerificationURLInput
  | KrakenEmbedStartLivenessVerificationURLInput;

/**
 * Response body for starting verification via URL.
 */
export interface KrakenEmbedStartVerificationURLResponse {
  /**
   * Result payload for start verification URL response.
   */
  result: KrakenEmbedStartVerificationURLResult | null;
}

/**
 * Result payload for start verification URL response.
 */
export interface KrakenEmbedStartVerificationURLResult {
  verification_id: string;
}

/**
 * Kraken API response envelope for toggle auto-earn. Result is null on success.
 */
export interface KrakenEmbedToggleAutoEarnKrakenResponse {
  error?: Array<unknown>;

  errors?: Array<unknown>;

  result?: null;
}

/**
 * Query parameters for toggling Auto-Earn.
 */
export interface KrakenEmbedToggleAutoEarnQueryParams {
  want_enabled: boolean;
}

/**
 * Response from toggling Auto-Earn. The response body is empty on success.
 */
export interface KrakenEmbedToggleAutoEarnResponse {
  /**
   * Kraken API response envelope for toggle auto-earn. Result is null on success.
   */
  data: KrakenEmbedToggleAutoEarnKrakenResponse;
}

/**
 * Lifecycle status of a portfolio transaction.
 */
export type KrakenEmbedTransactionStatus = 'unspecified' | 'in_progress' | 'successful' | 'failed';

/**
 * Type of portfolio transaction in the transaction history.
 */
export type KrakenEmbedTransactionType = 'simple_order' | 'simple_order_failed' | 'earn_reward';

/**
 * An upcoming earn reward for a specific asset.
 */
export interface KrakenEmbedUpcomingReward {
  /**
   * An earn amount with native and converted values.
   */
  accumulated_amount: KrakenEmbedEarnAmount;

  asset: string;

  date: string;

  /**
   * An earn amount with native and converted values.
   */
  estimated_pending_amount: KrakenEmbedEarnAmount | null;
}

export declare namespace KrakenEmbed {
  export {
    type KrakenEmbedAssetSortOption as KrakenEmbedAssetSortOption,
    type KrakenEmbedCancelCustomOrderInput as KrakenEmbedCancelCustomOrderInput,
    type KrakenEmbedCancelCustomOrderPath as KrakenEmbedCancelCustomOrderPath,
    type KrakenEmbedCancelCustomOrderResponse as KrakenEmbedCancelCustomOrderResponse,
    type KrakenEmbedCancelCustomOrderResult as KrakenEmbedCancelCustomOrderResult,
    type KrakenEmbedCountryCode as KrakenEmbedCountryCode,
    type KrakenEmbedCreateCustomOrderInput as KrakenEmbedCreateCustomOrderInput,
    type KrakenEmbedCreateCustomOrderResponse as KrakenEmbedCreateCustomOrderResponse,
    type KrakenEmbedCreateCustomOrderResult as KrakenEmbedCreateCustomOrderResult,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedCustomOrder as KrakenEmbedCustomOrder,
    type KrakenEmbedCustomOrderAction as KrakenEmbedCustomOrderAction,
    type KrakenEmbedCustomOrderAmount as KrakenEmbedCustomOrderAmount,
    type KrakenEmbedCustomOrderOccurrence as KrakenEmbedCustomOrderOccurrence,
    type KrakenEmbedCustomOrderOccurrenceExecutedAction as KrakenEmbedCustomOrderOccurrenceExecutedAction,
    type KrakenEmbedCustomOrderOccurrenceStatus as KrakenEmbedCustomOrderOccurrenceStatus,
    type KrakenEmbedCustomOrderOccurrenceTrigger as KrakenEmbedCustomOrderOccurrenceTrigger,
    type KrakenEmbedCustomOrderOccurrenceTriggerType as KrakenEmbedCustomOrderOccurrenceTriggerType,
    type KrakenEmbedCustomOrderQuoteAsset as KrakenEmbedCustomOrderQuoteAsset,
    type KrakenEmbedCustomOrderStatus as KrakenEmbedCustomOrderStatus,
    type KrakenEmbedCustomOrderStatusValue as KrakenEmbedCustomOrderStatusValue,
    type KrakenEmbedCustomOrderTrigger as KrakenEmbedCustomOrderTrigger,
    type KrakenEmbedCustomOrderTriggerCondition as KrakenEmbedCustomOrderTriggerCondition,
    type KrakenEmbedEarnAmount as KrakenEmbedEarnAmount,
    type KrakenEmbedEarnAprEstimate as KrakenEmbedEarnAprEstimate,
    type KrakenEmbedEarnAsset as KrakenEmbedEarnAsset,
    type KrakenEmbedEarnUserAllocation as KrakenEmbedEarnUserAllocation,
    type KrakenEmbedFullName as KrakenEmbedFullName,
    type KrakenEmbedGetAssetListQueryParamsSchema as KrakenEmbedGetAssetListQueryParamsSchema,
    type KrakenEmbedGetCustomOrderHistoryQueryParams as KrakenEmbedGetCustomOrderHistoryQueryParams,
    type KrakenEmbedGetCustomOrderHistoryResponse as KrakenEmbedGetCustomOrderHistoryResponse,
    type KrakenEmbedGetCustomOrderHistoryResult as KrakenEmbedGetCustomOrderHistoryResult,
    type KrakenEmbedGetCustomOrderQueryParams as KrakenEmbedGetCustomOrderQueryParams,
    type KrakenEmbedGetCustomOrderResponse as KrakenEmbedGetCustomOrderResponse,
    type KrakenEmbedGetCustomOrderResult as KrakenEmbedGetCustomOrderResult,
    type KrakenEmbedGetEarnAssetsKrakenResponse as KrakenEmbedGetEarnAssetsKrakenResponse,
    type KrakenEmbedGetEarnAssetsQueryParams as KrakenEmbedGetEarnAssetsQueryParams,
    type KrakenEmbedGetEarnAssetsResponse as KrakenEmbedGetEarnAssetsResponse,
    type KrakenEmbedGetEarnAssetsResult as KrakenEmbedGetEarnAssetsResult,
    type KrakenEmbedGetEarnSummaryKrakenResponse as KrakenEmbedGetEarnSummaryKrakenResponse,
    type KrakenEmbedGetEarnSummaryQueryParams as KrakenEmbedGetEarnSummaryQueryParams,
    type KrakenEmbedGetEarnSummaryResponse as KrakenEmbedGetEarnSummaryResponse,
    type KrakenEmbedGetEarnSummaryResult as KrakenEmbedGetEarnSummaryResult,
    type KrakenEmbedGetPortfolioDetailsQueryParamsSchema as KrakenEmbedGetPortfolioDetailsQueryParamsSchema,
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
    type KrakenEmbedGetPortfolioSummaryResult as KrakenEmbedGetPortfolioSummaryResult,
    type KrakenEmbedGetPortfolioTransactionsQueryParamsSchema as KrakenEmbedGetPortfolioTransactionsQueryParamsSchema,
    type KrakenEmbedGetQuoteQueryParams as KrakenEmbedGetQuoteQueryParams,
    type KrakenEmbedIdentityDocumentType as KrakenEmbedIdentityDocumentType,
    type KrakenEmbedIncludeCurrentDayPnlQueryParam as KrakenEmbedIncludeCurrentDayPnlQueryParam,
    type KrakenEmbedListCustomOrdersQueryParams as KrakenEmbedListCustomOrdersQueryParams,
    type KrakenEmbedListCustomOrdersResponse as KrakenEmbedListCustomOrdersResponse,
    type KrakenEmbedListCustomOrdersResult as KrakenEmbedListCustomOrdersResult,
    type KrakenEmbedPortfolioSummaryPayload as KrakenEmbedPortfolioSummaryPayload,
    type KrakenEmbedPortfolioTransactionRefID as KrakenEmbedPortfolioTransactionRefID,
    type KrakenEmbedPortfolioTransactionRefIDType as KrakenEmbedPortfolioTransactionRefIDType,
    type KrakenEmbedQuoteType as KrakenEmbedQuoteType,
    type KrakenEmbedResidence as KrakenEmbedResidence,
    type KrakenEmbedResidenceDocumentType as KrakenEmbedResidenceDocumentType,
    type KrakenEmbedSortingOrder as KrakenEmbedSortingOrder,
    type KrakenEmbedStartAddressMetadata as KrakenEmbedStartAddressMetadata,
    type KrakenEmbedStartAddressVerificationURLInput as KrakenEmbedStartAddressVerificationURLInput,
    type KrakenEmbedStartIdentityInfo as KrakenEmbedStartIdentityInfo,
    type KrakenEmbedStartIdentityMetadata as KrakenEmbedStartIdentityMetadata,
    type KrakenEmbedStartIdentityVerificationURLInput as KrakenEmbedStartIdentityVerificationURLInput,
    type KrakenEmbedStartLivenessVerificationURLInput as KrakenEmbedStartLivenessVerificationURLInput,
    type KrakenEmbedStartVerificationDebug as KrakenEmbedStartVerificationDebug,
    type KrakenEmbedStartVerificationURLInput as KrakenEmbedStartVerificationURLInput,
    type KrakenEmbedStartVerificationURLResponse as KrakenEmbedStartVerificationURLResponse,
    type KrakenEmbedStartVerificationURLResult as KrakenEmbedStartVerificationURLResult,
    type KrakenEmbedToggleAutoEarnKrakenResponse as KrakenEmbedToggleAutoEarnKrakenResponse,
    type KrakenEmbedToggleAutoEarnQueryParams as KrakenEmbedToggleAutoEarnQueryParams,
    type KrakenEmbedToggleAutoEarnResponse as KrakenEmbedToggleAutoEarnResponse,
    type KrakenEmbedTransactionStatus as KrakenEmbedTransactionStatus,
    type KrakenEmbedTransactionType as KrakenEmbedTransactionType,
    type KrakenEmbedUpcomingReward as KrakenEmbedUpcomingReward,
  };
}
