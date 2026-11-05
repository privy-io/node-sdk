// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TmmfAPI from './tmmf';
import {
  Tmmf,
  TmmfDepositParams,
  TmmfListPositionsParams,
  TmmfRegisterParams,
  TmmfWithdrawParams,
} from './tmmf';
import * as EthereumAPI from './ethereum/ethereum';
import {
  Ethereum,
  EthereumDepositParams,
  EthereumVaultPositionParams,
  EthereumWithdrawParams,
} from './ethereum/ethereum';

export class Earn extends APIResource {
  _ethereum: EthereumAPI.Ethereum = new EthereumAPI.Ethereum(this._client);
  tmmf: TmmfAPI.Tmmf = new TmmfAPI.Tmmf(this._client);
}

Earn.Ethereum = Ethereum;
Earn.Tmmf = Tmmf;

export declare namespace Earn {
  export {
    Ethereum as Ethereum,
    type EthereumDepositParams as EthereumDepositParams,
    type EthereumWithdrawParams as EthereumWithdrawParams,
    type EthereumVaultPositionParams as EthereumVaultPositionParams,
  };

  export {
    Tmmf as Tmmf,
    type TmmfDepositParams as TmmfDepositParams,
    type TmmfWithdrawParams as TmmfWithdrawParams,
    type TmmfListPositionsParams as TmmfListPositionsParams,
    type TmmfRegisterParams as TmmfRegisterParams,
  };
}
