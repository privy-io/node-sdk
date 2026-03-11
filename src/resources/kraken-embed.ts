// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as KrakenEmbedAPI from './kraken-embed';

export class KrakenEmbed extends APIResource {}

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

    error?: Array<unknown>;

    errors?: Array<unknown>;
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
      current_day_pnl?: Result.CurrentDayPnl;

      lots_upnl?: string | null;
    }

    export namespace Result {
      /**
       * Current day profit and loss for a portfolio, calculated from the most recent
       * available balance.
       */
      export interface CurrentDayPnl extends KrakenEmbedAPI.KrakenEmbedCurrentDayPnl {}
    }
  }
}

export declare namespace KrakenEmbed {
  export {
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
  };
}
