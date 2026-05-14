// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as KrakenEmbedAPI from './kraken-embed';

export class KrakenEmbed extends APIResource {}

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
  result: KrakenEmbedCancelCustomOrderResponse.Result;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

export namespace KrakenEmbedCancelCustomOrderResponse {
  /**
   * Result payload for cancel custom order response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedCancelCustomOrderResult {}
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
  result: KrakenEmbedCreateCustomOrderResponse.Result;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

export namespace KrakenEmbedCreateCustomOrderResponse {
  /**
   * Result payload for create custom order response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedCreateCustomOrderResult {}
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

  type: 'receive' | 'spend';
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

  status: 'success' | 'failure' | 'skipped';

  /**
   * Trigger metadata for a custom order occurrence.
   */
  trigger: KrakenEmbedCustomOrderOccurrenceTrigger;

  updated_at: string;

  /**
   * Executed action details for a custom order occurrence.
   */
  executed_action?: KrakenEmbedCustomOrderOccurrence.ExecutedAction;

  failure_reason?: string;

  skip_reason?: string;
}

export namespace KrakenEmbedCustomOrderOccurrence {
  /**
   * Executed action details for a custom order occurrence.
   */
  export interface ExecutedAction extends KrakenEmbedAPI.KrakenEmbedCustomOrderOccurrenceExecutedAction {}
}

/**
 * Executed action details for a custom order occurrence.
 */
export interface KrakenEmbedCustomOrderOccurrenceExecutedAction {
  quote_id: string;
}

/**
 * Trigger metadata for a custom order occurrence.
 */
export interface KrakenEmbedCustomOrderOccurrenceTrigger {
  type: 'time' | 'price' | 'crypto_deposit' | 'market_open';
}

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
  status: 'active' | 'completed' | 'cancelled' | 'paused';

  reason?: unknown;
}

/**
 * Price trigger for a custom order. The order executes when base_asset/quote_asset
 * rate meets the condition against target_price.
 */
export interface KrakenEmbedCustomOrderTrigger {
  base_asset: string;

  condition: 'gte' | 'lte';

  quote_asset: string;

  target_price: string;

  type: 'price';
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

  sort?:
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
  result: KrakenEmbedGetCustomOrderHistoryResponse.Result;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

export namespace KrakenEmbedGetCustomOrderHistoryResponse {
  /**
   * Result payload for custom order history response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedGetCustomOrderHistoryResult {}
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
  result: KrakenEmbedGetCustomOrderResponse.Result;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

export namespace KrakenEmbedGetCustomOrderResponse {
  /**
   * Result payload for get custom order response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedGetCustomOrderResult {}
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
 * Query parameters for portfolio details endpoint.
 */
export interface KrakenEmbedGetPortfolioDetailsQueryParamsSchema {
  quote?: string;
}

/**
 * Query parameters for getting a portfolio summary.
 */
export interface KrakenEmbedGetPortfolioSummaryQueryParams {
  'include[current_day_pnl]'?: 'true' | 'false';

  quote?: string;
}

/**
 * High-level summary of a user's portfolio including total value, available
 * balance, and unrealized P&L.
 */
export interface KrakenEmbedGetPortfolioSummaryResponse {
  data: KrakenEmbedGetPortfolioSummaryResponse.Data;
}

export namespace KrakenEmbedGetPortfolioSummaryResponse {
  export interface Data {
    result: Data.Result | null;

    error?: Array<string>;

    errors?: Array<string>;
  }

  export namespace Data {
    export interface Result {
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
      current_day_pnl?: KrakenEmbedAPI.KrakenEmbedCurrentDayPnl | null;

      lots_upnl?: string | null;
    }
  }
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

  ref_ids?: Array<KrakenEmbedGetPortfolioTransactionsQueryParamsSchema.RefID>;

  sorting?: 'descending' | 'ascending';

  statuses?: Array<'unspecified' | 'in_progress' | 'successful' | 'failed'>;

  types?: Array<'simple_order' | 'simple_order_failed' | 'earn_reward'>;

  until_time?: string;
}

export namespace KrakenEmbedGetPortfolioTransactionsQueryParamsSchema {
  export interface RefID {
    ref_id: string;

    type: 'simple_order_quote' | 'simple_order_quote_failed';
  }
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
 * Query parameters for listing custom orders.
 */
export interface KrakenEmbedListCustomOrdersQueryParams {
  user_id: string;

  cursor?: string;

  statuses?: Array<'active' | 'paused' | 'cancelled' | 'completed'> | string;
}

/**
 * Response body for listing custom orders.
 */
export interface KrakenEmbedListCustomOrdersResponse {
  /**
   * Result payload for list custom orders response.
   */
  result: KrakenEmbedListCustomOrdersResponse.Result;

  error?: Array<unknown>;

  errors?: Array<unknown>;
}

export namespace KrakenEmbedListCustomOrdersResponse {
  /**
   * Result payload for list custom orders response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedListCustomOrdersResult {}
}

/**
 * Result payload for list custom orders response.
 */
export interface KrakenEmbedListCustomOrdersResult {
  orders: Array<KrakenEmbedCustomOrder>;
}

/**
 * Optional best-effort metadata hints for proof of address verification.
 */
export interface KrakenEmbedStartAddressMetadata {
  address?: KrakenEmbedStartAddressMetadata.Address | null;

  document_number?: string | null;

  document_type?:
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
    | 'other'
    | null;

  expiration_date?: string | null;
}

export namespace KrakenEmbedStartAddressMetadata {
  export interface Address {
    city: string;

    country:
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

    line1: string;

    postal_code: string;

    line2?: string | null;

    province?: string | null;
  }
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
  debug?: KrakenEmbedStartAddressVerificationURLInput.Debug;

  /**
   * Optional best-effort metadata hints for proof of address verification.
   */
  metadata?: KrakenEmbedStartAddressVerificationURLInput.Metadata;
}

export namespace KrakenEmbedStartAddressVerificationURLInput {
  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  export interface Debug extends KrakenEmbedAPI.KrakenEmbedStartVerificationDebug {}

  /**
   * Optional best-effort metadata hints for proof of address verification.
   */
  export interface Metadata extends KrakenEmbedAPI.KrakenEmbedStartAddressMetadata {}
}

/**
 * Identity information hints including full name and date of birth for proof of
 * identity verification.
 */
export interface KrakenEmbedStartIdentityInfo {
  date_of_birth?: string | null;

  full_name?: KrakenEmbedStartIdentityInfo.FullName | null;
}

export namespace KrakenEmbedStartIdentityInfo {
  export interface FullName {
    first_name: string;

    last_name: string;

    middle_name?: string | null;
  }
}

/**
 * Optional best-effort metadata hints for proof of identity verification.
 */
export interface KrakenEmbedStartIdentityMetadata {
  document_number?: string | null;

  document_type?:
    | 'passport'
    | 'drivers_license'
    | 'id_card'
    | 'residence_card'
    | 'special_permanent_residence_card'
    | null;

  expiration_date?: string | null;

  /**
   * Identity information hints including full name and date of birth for proof of
   * identity verification.
   */
  identity?: KrakenEmbedStartIdentityMetadata.Identity;

  issuing_country?:
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
    | '0C'
    | null;

  nationality?:
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
    | '0C'
    | null;
}

export namespace KrakenEmbedStartIdentityMetadata {
  /**
   * Identity information hints including full name and date of birth for proof of
   * identity verification.
   */
  export interface Identity extends KrakenEmbedAPI.KrakenEmbedStartIdentityInfo {}
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
  debug?: KrakenEmbedStartIdentityVerificationURLInput.Debug;

  /**
   * Optional best-effort metadata hints for proof of identity verification.
   */
  metadata?: KrakenEmbedStartIdentityVerificationURLInput.Metadata;
}

export namespace KrakenEmbedStartIdentityVerificationURLInput {
  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  export interface Debug extends KrakenEmbedAPI.KrakenEmbedStartVerificationDebug {}

  /**
   * Optional best-effort metadata hints for proof of identity verification.
   */
  export interface Metadata extends KrakenEmbedAPI.KrakenEmbedStartIdentityMetadata {}
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
  debug?: KrakenEmbedStartLivenessVerificationURLInput.Debug;
}

export namespace KrakenEmbedStartLivenessVerificationURLInput {
  /**
   * Debug options for start verification. Only works in non-production environments.
   */
  export interface Debug extends KrakenEmbedAPI.KrakenEmbedStartVerificationDebug {}
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
  result: KrakenEmbedStartVerificationURLResponse.Result;
}

export namespace KrakenEmbedStartVerificationURLResponse {
  /**
   * Result payload for start verification URL response.
   */
  export interface Result extends KrakenEmbedAPI.KrakenEmbedStartVerificationURLResult {}
}

/**
 * Result payload for start verification URL response.
 */
export interface KrakenEmbedStartVerificationURLResult {
  verification_id: string;
}

export declare namespace KrakenEmbed {
  export {
    type KrakenEmbedCancelCustomOrderInput as KrakenEmbedCancelCustomOrderInput,
    type KrakenEmbedCancelCustomOrderPath as KrakenEmbedCancelCustomOrderPath,
    type KrakenEmbedCancelCustomOrderResponse as KrakenEmbedCancelCustomOrderResponse,
    type KrakenEmbedCancelCustomOrderResult as KrakenEmbedCancelCustomOrderResult,
    type KrakenEmbedCreateCustomOrderInput as KrakenEmbedCreateCustomOrderInput,
    type KrakenEmbedCreateCustomOrderResponse as KrakenEmbedCreateCustomOrderResponse,
    type KrakenEmbedCreateCustomOrderResult as KrakenEmbedCreateCustomOrderResult,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedCustomOrder as KrakenEmbedCustomOrder,
    type KrakenEmbedCustomOrderAction as KrakenEmbedCustomOrderAction,
    type KrakenEmbedCustomOrderAmount as KrakenEmbedCustomOrderAmount,
    type KrakenEmbedCustomOrderOccurrence as KrakenEmbedCustomOrderOccurrence,
    type KrakenEmbedCustomOrderOccurrenceExecutedAction as KrakenEmbedCustomOrderOccurrenceExecutedAction,
    type KrakenEmbedCustomOrderOccurrenceTrigger as KrakenEmbedCustomOrderOccurrenceTrigger,
    type KrakenEmbedCustomOrderQuoteAsset as KrakenEmbedCustomOrderQuoteAsset,
    type KrakenEmbedCustomOrderStatus as KrakenEmbedCustomOrderStatus,
    type KrakenEmbedCustomOrderTrigger as KrakenEmbedCustomOrderTrigger,
    type KrakenEmbedGetAssetListQueryParamsSchema as KrakenEmbedGetAssetListQueryParamsSchema,
    type KrakenEmbedGetCustomOrderHistoryQueryParams as KrakenEmbedGetCustomOrderHistoryQueryParams,
    type KrakenEmbedGetCustomOrderHistoryResponse as KrakenEmbedGetCustomOrderHistoryResponse,
    type KrakenEmbedGetCustomOrderHistoryResult as KrakenEmbedGetCustomOrderHistoryResult,
    type KrakenEmbedGetCustomOrderQueryParams as KrakenEmbedGetCustomOrderQueryParams,
    type KrakenEmbedGetCustomOrderResponse as KrakenEmbedGetCustomOrderResponse,
    type KrakenEmbedGetCustomOrderResult as KrakenEmbedGetCustomOrderResult,
    type KrakenEmbedGetPortfolioDetailsQueryParamsSchema as KrakenEmbedGetPortfolioDetailsQueryParamsSchema,
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
    type KrakenEmbedGetPortfolioTransactionsQueryParamsSchema as KrakenEmbedGetPortfolioTransactionsQueryParamsSchema,
    type KrakenEmbedGetQuoteQueryParams as KrakenEmbedGetQuoteQueryParams,
    type KrakenEmbedListCustomOrdersQueryParams as KrakenEmbedListCustomOrdersQueryParams,
    type KrakenEmbedListCustomOrdersResponse as KrakenEmbedListCustomOrdersResponse,
    type KrakenEmbedListCustomOrdersResult as KrakenEmbedListCustomOrdersResult,
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
  };
}
