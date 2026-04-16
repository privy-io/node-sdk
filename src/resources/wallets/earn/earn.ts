// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EthereumAPI from './ethereum/ethereum';
import { Ethereum, EthereumDepositParams, EthereumWithdrawParams } from './ethereum/ethereum';

export class Earn extends APIResource {
  ethereum: EthereumAPI.Ethereum = new EthereumAPI.Ethereum(this._client);
}

Earn.Ethereum = Ethereum;

export declare namespace Earn {
  export {
    Ethereum as Ethereum,
    type EthereumDepositParams as EthereumDepositParams,
    type EthereumWithdrawParams as EthereumWithdrawParams,
  };
}
