import {
  TronSendTransactionRpcResponseData,
  TronSignTransactionRpcResponseData,
  WalletRpcParams,
} from '../../resources';
import { PrivyWalletsService } from './wallets';
import { PrivyWalletsRpcInput } from './wallets';

export class PrivyTronService {
  private privyWalletsService: PrivyWalletsService;

  constructor(privyWalletsService: PrivyWalletsService) {
    this.privyWalletsService = privyWalletsService;
  }

  public async signTransaction(
    walletId: string,
    input: PrivyTronService.SignTransactionInput,
  ): Promise<TronSignTransactionRpcResponseData> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'tron_signTransaction',
    });

    return response.data;
  }

  public async sendTransaction(
    walletId: string,
    input: PrivyTronService.SendTransactionInput,
  ): Promise<TronSendTransactionRpcResponseData> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'tron_sendTransaction',
    });

    return response.data;
  }
}

// prettier-ignore
/**
 * The namespace for types related to the Tron service class.
 * @see {@link PrivyTronService} class.
 * @see {@link PrivyWalletsRpcInput} type.
 */
export namespace PrivyTronService {
  /** The input type for the {@link PrivyTronService.signTransaction} method. */
  export type SignTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.TronSignTransactionRpcInput>;
  /** The input type for the {@link PrivyTronService.sendTransaction} method. */
  export type SendTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.TronSendTransactionRpcInput>;
}
