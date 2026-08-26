import { PrivyAPI } from '../../client';
import { prepareRequest } from '../../lib/authorization';
import { Crypto, CryptoCreateParams } from '../../resources/wallets/deposit-accounts/crypto';
import { DepositAccounts } from '../../resources/wallets/deposit-accounts/deposit-accounts';
import { CreateCryptoDepositAccountResponse } from '../../resources/wallets/wallets';
import { PrivyClient } from '../PrivyClient';
import { Prettify, WithAuthorization, WithIdempotency } from './types';

export class PrivyDepositAccountsCryptoService extends Crypto {
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
  }

  public async create(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivyDepositAccountsCryptoService.CreateInput,
  ): Promise<CreateCryptoDepositAccountResponse> {
    const { headers } = await prepareRequest(this.privyClient, this._client.appID, {
      authorizationContext,
      idempotencyKey,
      requestExpiry: this.privyClient.getRequestExpiry(),
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/deposit_accounts/crypto`,
      body: params,
    });

    return await this._create(walletId, { ...params, ...headers });
  }
}

// prettier-ignore
export namespace PrivyDepositAccountsCryptoService {
  /** The input type for the {@link PrivyDepositAccountsCryptoService.create} method. */
  export type CreateInput = Prettify<WithIdempotency<WithAuthorization<CryptoCreateParams>>>;
}

export class PrivyDepositAccountsService extends DepositAccounts {
  override crypto: PrivyDepositAccountsCryptoService;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.crypto = new PrivyDepositAccountsCryptoService(privyApiClient, privyClient);
  }
}
