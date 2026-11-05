// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TmmfAPI from './tmmf';
import { Tmmf, TmmfGetParams } from './tmmf';

export class Earn extends APIResource {
  tmmf: TmmfAPI.Tmmf = new TmmfAPI.Tmmf(this._client);
}

Earn.Tmmf = Tmmf;

export declare namespace Earn {
  export { Tmmf as Tmmf, type TmmfGetParams as TmmfGetParams };
}
