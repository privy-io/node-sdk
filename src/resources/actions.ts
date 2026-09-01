// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ActionsAPI from './wallets/actions';

export class Actions extends APIResource {}

/**
 * A list of wallet actions.
 */
export interface ListActions {
  actions: Array<ActionsAPI.WalletActionResponse>;
}

export declare namespace Actions {
  export { type ListActions as ListActions };
}
