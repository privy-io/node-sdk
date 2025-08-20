import { PrivyAPI } from '../../client';
import { WalletRawSignParams, WalletRawSignResponse, Wallets } from '../../resources';
import { AuthorizationContext } from '../AuthorizationContext';
import { PrivyEthereumService } from './ethereum';

export class PrivyWalletsService {
  private ethereumService: PrivyEthereumService;
  private wallets: Wallets;

  constructor(privyApiClient: PrivyAPI) {
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
    const response = await this.wallets.rawSign(walletId, { params: rawSignParams });

    if ('data' in response) {
      return response.data;
    }

    throw response.error;
  }
}
