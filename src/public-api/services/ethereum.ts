import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { PrivyWalletsService } from './wallets';
import { AuthParams, IdempotencyParams, Prettify, WithAuthorization, WithIdempotency } from './types';

export class PrivyEthereumService {
  private privyWalletsService: PrivyWalletsService;

  constructor(privyWalletsService: PrivyWalletsService) {
    this.privyWalletsService = privyWalletsService;
  }

  public async signMessage(
    walletId: string,
    { message, ...input }: PrivyEthereumService.SignMessageInput,
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

    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      params,
      method: 'personal_sign',
      chain_type: 'ethereum',
    });

    return response.data;
  }

  public async signSecp256k1(
    walletId: string,
    input: PrivyEthereumService.SignSecp256k1Input,
  ): Promise<WalletRpcResponse.EthereumSecp256k1SignRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'secp256k1_sign',
      chain_type: 'ethereum',
    });

    return response.data;
  }

  public async sign7702Authorization(
    walletId: string,
    input: PrivyEthereumService.Sign7702AuthorizationInput,
  ): Promise<WalletRpcResponse.EthereumSign7702AuthorizationRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'eth_sign7702Authorization',
      chain_type: 'ethereum',
    });

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }

  public async signTransaction(
    walletId: string,
    input: PrivyEthereumService.SignTransactionInput,
  ): Promise<WalletRpcResponse.EthereumSignTransactionRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'eth_signTransaction',
      chain_type: 'ethereum',
    });

    return response.data;
  }

  public async signTypedData(
    walletId: string,
    input: PrivyEthereumService.SignTypedDataInput,
  ): Promise<WalletRpcResponse.EthereumSignTypedDataRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'eth_signTypedData_v4',
      chain_type: 'ethereum',
    });

    return response.data;
  }

  public async sendTransaction(
    walletId: string,
    input: PrivyEthereumService.SendTransactionInput,
  ): Promise<WalletRpcResponse.EthereumSendTransactionRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(walletId, {
      ...input,
      method: 'eth_sendTransaction',
      chain_type: 'ethereum',
    });

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }
}

export namespace PrivyEthereumService {
  // prettier-ignore
  export type SignMessageInput = Prettify<Omit<PrivyWalletsRpcInput<WalletRpcParams.EthereumPersonalSignRpcInput>, 'params'> & {message: string | Uint8Array}>;
  // prettier-ignore
  export type SignSecp256k1Input = PrivyWalletsRpcInput<WalletRpcParams.EthereumSecp256k1SignRpcInput>;
  // prettier-ignore
  export type Sign7702AuthorizationInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSign7702AuthorizationRpcInput>;
  // prettier-ignore
  export type SignTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSignTransactionRpcInput>;
  // prettier-ignore
  export type SignTypedDataInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSignTypedDataRpcInput>;
  export type SendTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSendTransactionRpcInput>;
}

// prettier-ignore
export type PrivyWalletsRpcInput<P extends (WalletRpcParams & IdempotencyParams & AuthParams)> =
  Prettify<WithIdempotency<WithAuthorization<Omit<P, 'chain_type'|'method'>>>>;
