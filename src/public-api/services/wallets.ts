import { PrivyAPI } from '../../client';
import { WalletRpcParams, WalletRpcResponse, Wallets } from '../../resources';
import { AuthorizationContext } from '../AuthorizationContext';
import { PrivyEthereumService } from './ethereum';

export class PrivyWalletsService extends Wallets {
  private ethereumService: PrivyEthereumService;

  constructor(privyApiClient: PrivyAPI) {
    super(privyApiClient);
    this.ethereumService = new PrivyEthereumService(this);
  }

  public ethereum(): PrivyEthereumService {
    return this.ethereumService;
  }

  public async rpc<Params extends WalletRpcParams>(
    walletId: string,
    params: Params,
    authorizationContext: AuthorizationContext,
  ): Promise<Extract<WalletRpcResponse, { method: Params['method'] }>>;
  public async rpc(
    walletId: string,
    params: WalletRpcParams,
    authorizationContext: AuthorizationContext,
  ): Promise<WalletRpcResponse> {
    const authorizationSignaturesHeader = authorizationContext.generateAuthorizationSignatures({
      version: 1,
      method: 'POST',
      url: `${this._client.baseURL}/v1/wallets/${walletId}/rpc`,
      body: params,
      headers: { 'privy-app-id': this._client.appID },
    });

    return await this._rpc(walletId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });
  }
}
