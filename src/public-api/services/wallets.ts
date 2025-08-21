import { PrivyAPI } from '../../client';
import { WalletRawSignParams, WalletRawSignResponse, Wallets } from '../../resources';
import { AuthorizationContext } from '../AuthorizationContext';
import { PrivyEthereumService } from './ethereum';

export class PrivyWalletsService {
  private ethereumService: PrivyEthereumService;
  private wallets: Wallets;
  private apiClient: PrivyAPI;

  constructor(privyApiClient: PrivyAPI) {
    this.apiClient = privyApiClient;
    this.wallets = new Wallets(privyApiClient);
    this.ethereumService = new PrivyEthereumService(this.wallets);
  }

  // Pass-through methods
  public get create() {
    return this.wallets.create.bind(this.wallets);
  }

  public ethereum(): PrivyEthereumService {
    return this.ethereumService;
  }

  public async rawSign(
    walletId: string,
    rawSignParams: WalletRawSignParams.Params,
    authorizationContext: AuthorizationContext,
  ): Promise<WalletRawSignResponse.Data> {
    const authorizationSignaturesHeader = await authorizationContext.generateAuthorizationSignatures({
      version: 1,
      method: 'POST',
      url: `https://api.staging.privy.io/v1/wallets/${walletId}/raw_sign`,
      body: { params: rawSignParams },
      headers: {
        'privy-app-id': this.apiClient.appID,
      },
    });

    const response = await this.wallets.rawSign(walletId, {
      params: rawSignParams,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    if ('data' in response) {
      return response.data;
    }

    throw response.error;
  }
}
