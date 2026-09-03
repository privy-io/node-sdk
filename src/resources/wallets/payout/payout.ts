// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FiatAPI from './fiat';
import { Fiat, FiatCreateParams } from './fiat';

export class Payout extends APIResource {
  fiat: FiatAPI.Fiat = new FiatAPI.Fiat(this._client);
}

Payout.Fiat = Fiat;

export declare namespace Payout {
  export { Fiat as Fiat, type FiatCreateParams as FiatCreateParams };
}
