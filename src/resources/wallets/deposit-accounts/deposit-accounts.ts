// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FiatAPI from './fiat';
import { Fiat, FiatCreateParams, FiatGetParams, FiatListParams } from './fiat';
import * as CryptoAPI from './crypto/crypto';
import { Crypto, CryptoCreateParams, CryptoListParams } from './crypto/crypto';

export class DepositAccounts extends APIResource {
  crypto: CryptoAPI.Crypto = new CryptoAPI.Crypto(this._client);
  fiat: FiatAPI.Fiat = new FiatAPI.Fiat(this._client);
}

DepositAccounts.Crypto = Crypto;
DepositAccounts.Fiat = Fiat;

export declare namespace DepositAccounts {
  export {
    Crypto as Crypto,
    type CryptoListParams as CryptoListParams,
    type CryptoCreateParams as CryptoCreateParams,
  };

  export {
    Fiat as Fiat,
    type FiatCreateParams as FiatCreateParams,
    type FiatListParams as FiatListParams,
    type FiatGetParams as FiatGetParams,
  };
}
