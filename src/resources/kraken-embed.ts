// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as KrakenEmbedAPI from './kraken-embed';

export class KrakenEmbed extends APIResource {}

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
 * Current day profit and loss for a portfolio, calculated from the most recent
 * available balance.
 */
export interface KrakenEmbedCurrentDayPnl {
  pnl: string;

  since: string;
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

export declare namespace KrakenEmbed {
  export {
    type KrakenEmbedGetAssetListQueryParamsSchema as KrakenEmbedGetAssetListQueryParamsSchema,
    type KrakenEmbedGetPortfolioDetailsQueryParamsSchema as KrakenEmbedGetPortfolioDetailsQueryParamsSchema,
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
    type KrakenEmbedGetPortfolioTransactionsQueryParamsSchema as KrakenEmbedGetPortfolioTransactionsQueryParamsSchema,
    type KrakenEmbedGetQuoteQueryParams as KrakenEmbedGetQuoteQueryParams,
  };
}
