import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { PrivyWalletsService } from './wallets';
import { AuthorizationContext } from '../AuthorizationContext';

export class PrivySolanaService {
  private privyWalletsService: PrivyWalletsService;

  constructor(privyWalletsService: PrivyWalletsService) {
    this.privyWalletsService = privyWalletsService;
  }

  public async signMessage(
    walletId: string,
    message: string | Uint8Array,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.SolanaSignMessageRpcResponse.Data> {
    let params: WalletRpcParams.SolanaSignMessageRpcInput.Params;
    if (message instanceof Uint8Array) {
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      params = { message: Buffer.from(message).toString('base64'), encoding: 'base64' };
    } else {
      // Strings are assumed to be base64 encoded
      params = { message, encoding: 'base64' };
    }

    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'signMessage', params },
      authorizationContext,
      idempotencyKey,
    );

    return response.data;
  }
}
