import { PrivyAPI } from '../../../client';
import { EarnDepositActionResponse, EarnWithdrawActionResponse } from '../../../resources';
import {
  Ethereum,
  EthereumDepositParams,
  EthereumWithdrawParams,
} from '../../../resources/wallets/earn/ethereum/ethereum';
import { prepareRequest } from '../../../lib/authorization';
import { PrivyClient } from '../../PrivyClient';
import { PrivyEarnEthereumIncentiveService } from './ethereum-incentive';
import { AuthorizationConfig, IdempotencyConfig, Prettify } from '../types';

export class PrivyEarnEthereumService extends Ethereum {
  private incentiveService: PrivyEarnEthereumIncentiveService;
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
    this.incentiveService = new PrivyEarnEthereumIncentiveService(privyApiClient, privyClient);
  }

  public incentive(): PrivyEarnEthereumIncentiveService {
    return this.incentiveService;
  }

  public async deposit(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivyEarnEthereumService.DepositInput,
  ): Promise<EarnDepositActionResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/earn/ethereum/deposit`,
      body: params,
    });

    return await this._deposit(walletId, { ...params, ...headers });
  }

  public async withdraw(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivyEarnEthereumService.WithdrawInput,
  ): Promise<EarnWithdrawActionResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/earn/ethereum/withdraw`,
      body: params,
    });

    return await this._withdraw(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace PrivyEarnEthereumService {
  /** The input type for the {@link PrivyEarnEthereumService.deposit} method. */
  export type DepositInput = Prettify<
    Omit<EthereumDepositParams, 'privy-authorization-signature'> & AuthorizationConfig & IdempotencyConfig
  >;
  /** The input type for the {@link PrivyEarnEthereumService.withdraw} method. */
  export type WithdrawInput = Prettify<
    Omit<EthereumWithdrawParams, 'privy-authorization-signature'> & AuthorizationConfig & IdempotencyConfig
  >;
}
