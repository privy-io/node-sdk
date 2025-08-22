import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { PrivyWalletsService } from './wallets';
import { AuthorizationContext } from '../AuthorizationContext';

export class PrivyEthereumService {
  private privyWalletsService: PrivyWalletsService;

  constructor(privyWalletsService: PrivyWalletsService) {
    this.privyWalletsService = privyWalletsService;
  }

  public async signMessage(
    walletId: string,
    message: string | Uint8Array,
    authorizationContext: AuthorizationContext,
  ): Promise<WalletRpcResponse.EthereumPersonalSignRpcResponse.Data> {
    let params: WalletRpcParams.EthereumPersonalSignRpcInput.Params;
    if (message instanceof Uint8Array) {
      // We fall back to `Buffer` here as Uint8Array.toHex is not widely supported yet
      params = { message: Buffer.from(message).toString('hex'), encoding: 'hex' };
    } else if (message.startsWith('0x')) {
      // The 0x prefix is removed as `encoding: hex` is sufficient
      params = { message: message.slice(2), encoding: 'hex' };
    } else {
      params = { message, encoding: 'utf-8' };
    }

    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'personal_sign', params },
      authorizationContext,
    );

    return response.data;
  }
}
