import { PrivyAPI } from '../../client';
import { WalletRpcParams, WalletRpcResponse, Wallets } from '../../resources';
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
  ): Promise<Extract<WalletRpcResponse, { method: Params['method'] }>>;
  public async rpc(walletId: string, params: WalletRpcParams): Promise<WalletRpcResponse> {
    return await this._rpc(walletId, params);
  }
}
