import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { PrivyWalletsService, ReplaceParams } from './wallets';
import { PrivyWalletsRpcInput } from './wallets';

export class PrivySolanaService {
  private privyWalletsService: PrivyWalletsService;

  constructor(privyWalletsService: PrivyWalletsService) {
    this.privyWalletsService = privyWalletsService;
  }

  public async signMessage(
    walletId: string,
    { message, ...input }: PrivySolanaService.SignMessageInput,
  ): Promise<WalletRpcResponse.SolanaSignMessageRpcResponse.Data> {
    let params: WalletRpcParams.SolanaSignMessageRpcInput.Params;
    if (message instanceof Uint8Array) {
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      params = { message: Buffer.from(message).toString('base64'), encoding: 'base64' };
    } else {
      // Strings are assumed to be base64 encoded
      params = { message, encoding: 'base64' };
    }

    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'signMessage',
      chain_type: 'solana',
      params,
    });

    return response.data;
  }

  public async signTransaction(
    walletId: string,
    { transaction, ...input }: PrivySolanaService.SignTransactionInput,
  ): Promise<WalletRpcResponse.SolanaSignTransactionRpcResponse.Data> {
    let params: WalletRpcParams.SolanaSignTransactionRpcInput.Params;
    if (transaction instanceof Uint8Array) {
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      params = { transaction: Buffer.from(transaction).toString('base64'), encoding: 'base64' };
    } else {
      // Strings are assumed to be base64 encoded
      params = { transaction, encoding: 'base64' };
    }

    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'signTransaction',
      chain_type: 'solana',
      params,
    });

    return response.data;
  }

  public async signAndSendTransaction(
    walletId: string,
    { transaction, ...input }: PrivySolanaService.SignAndSendTransactionInput,
  ): Promise<WalletRpcResponse.SolanaSignAndSendTransactionRpcResponse.Data> {
    let params: WalletRpcParams.SolanaSignAndSendTransactionRpcInput.Params;
    if (transaction instanceof Uint8Array) {
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      params = { transaction: Buffer.from(transaction).toString('base64'), encoding: 'base64' };
    } else {
      // Strings are assumed to be base64 encoded
      params = { transaction, encoding: 'base64' };
    }

    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'signAndSendTransaction',
      chain_type: 'solana',
      params,
    });

    return response.data;
  }
}

// prettier-ignore
/**
 * The namespace for types related to the Solana service class.
 * @see {@link PrivySolanaService} class.
 * @see {@link PrivyWalletsRpcInput} type.
 */
export namespace PrivySolanaService {
  /**
   * The input type for the {@link PrivySolanaService.signMessage} method.
   * Instead of accepting the raw `params` object, it accepts a message `string` or `Uint8Array`
   * that is automatically converted to the right `params` object.
   */
  export type SignMessageInput = ReplaceParams<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignMessageRpcInput>, {message: string | Uint8Array}>;
  /**
   * The input type for the {@link PrivySolanaService.signTransaction} method.
   * Instead of accepting the raw `params` object, it accepts a transaction `string` or `Uint8Array`
   * that is automatically converted to the right `params` object.
   */
  export type SignTransactionInput = ReplaceParams<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignTransactionRpcInput>, {transaction: string | Uint8Array}>;
  /**
   * The input type for the {@link PrivySolanaService.signAndSendTransaction} method.
   * Instead of accepting the raw `params` object, it accepts a transaction `string` or `Uint8Array`
   * that is automatically converted to the right `params` object.
   */
  export type SignAndSendTransactionInput = ReplaceParams<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignAndSendTransactionRpcInput>, {transaction: string | Uint8Array}>;
}
