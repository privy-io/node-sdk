import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { PrivyWalletsService } from './wallets';
import { Prettify } from './types';
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

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }
}

export namespace PrivySolanaService {
  // prettier-ignore
  export type SignMessageInput = Prettify<Omit<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignMessageRpcInput>, 'params'> & {message: string | Uint8Array}>;
  // prettier-ignore
  export type SignTransactionInput = Prettify<Omit<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignTransactionRpcInput>, 'params'> & {transaction: string | Uint8Array}>;
  // prettier-ignore
  export type SignAndSendTransactionInput = Prettify<Omit<PrivyWalletsRpcInput<WalletRpcParams.SolanaSignAndSendTransactionRpcInput>, 'params'> & {transaction: string | Uint8Array}>;
}
