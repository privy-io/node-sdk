import { WalletRpcParams, WalletRpcResponse, Wallets } from '../../resources';
import { AuthorizationContext } from '../AuthorizationContext';

export class PrivyEthereumService {
  private wallets: Wallets;

  constructor(wallets: Wallets) {
    this.wallets = wallets;
  }

  public async signMessage(
    walletId: string,
    message: string | Uint8Array,
    authorizationContext: AuthorizationContext,
  ): Promise<WalletRpcResponse.EthereumPersonalSignRpcResponse.Data> {
    let params: WalletRpcParams.EthereumPersonalSignRpcInput.Params;
    if (message instanceof Uint8Array) {
      params = { message: Buffer.from(message).toString('hex'), encoding: 'hex' };
    } else if (message.startsWith('0x')) {
      // The 0x prefix is removed as `encoding: hex` is sufficient
      params = { message: message.slice(2), encoding: 'hex' };
    } else {
      params = { message, encoding: 'utf-8' };
    }

    const rpcResponse = await this.wallets.rpc(walletId, {
      method: 'personal_sign',
      params,
    });

    return (rpcResponse as WalletRpcResponse.EthereumPersonalSignRpcResponse).data;
  }
}
