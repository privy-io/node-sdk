import { WalletRpcParams, WalletRpcResponse } from '../../resources';
import { ReplaceParams, PrivyWalletsService } from './wallets';
import { PrivyWalletsRpcInput } from './wallets';

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

    return response.data;
  }
}

// prettier-ignore
/**
 * The namespace for types related to the Ethereum service class.
 * @see {@link PrivyEthereumService} class.
 * @see {@link PrivyWalletsRpcInput} type.
 */
export namespace PrivyEthereumService {
  /**
   * The input type for the {@link PrivyEthereumService.signMessage} method.
   * Instead of accepting the raw `params` object, it accepts a message `string` or `Uint8Array`
   * that is automatically converted to the right `params` object.
   */
  export type SignMessageInput = ReplaceParams<PrivyWalletsRpcInput<WalletRpcParams.EthereumPersonalSignRpcInput>, {message: string | Uint8Array}>;
  /** The input type for the {@link PrivyEthereumService.signSecp256k1} method. */
  export type SignSecp256k1Input = PrivyWalletsRpcInput<WalletRpcParams.EthereumSecp256k1SignRpcInput>;
  /** The input type for the {@link PrivyEthereumService.sign7702Authorization} method. */
  export type Sign7702AuthorizationInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSign7702AuthorizationRpcInput>;
  /** The input type for the {@link PrivyEthereumService.signTransaction} method. */
  export type SignTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSignTransactionRpcInput>;
  /** The input type for the {@link PrivyEthereumService.signTypedData} method. */
  export type SignTypedDataInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSignTypedDataRpcInput>;
  /** The input type for the {@link PrivyEthereumService.sendTransaction} method. */
  export type SendTransactionInput = PrivyWalletsRpcInput<WalletRpcParams.EthereumSendTransactionRpcInput>;
}
