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
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
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
      idempotencyKey,
    );

    return response.data;
  }

  public async signSecp256k1(
    walletId: string,
    hash: string,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.EthereumSecp256k1SignRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'secp256k1_sign', params: { hash } },
      authorizationContext,
      idempotencyKey,
    );

    return response.data;
  }

  public async sign7702Authorization(
    walletId: string,
    params: WalletRpcParams.EthereumSign7702AuthorizationRpcInput.Params,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.EthereumSign7702AuthorizationRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'eth_sign7702Authorization', params },
      authorizationContext,
      idempotencyKey,
    );

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }

  public async signTransaction(
    walletId: string,
    transaction: WalletRpcParams.EthereumSignTransactionRpcInput.Params.Transaction,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.EthereumSignTransactionRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'eth_signTransaction', params: { transaction } },
      authorizationContext,
      idempotencyKey,
    );

    return response.data;
  }

  public async signTypedData(
    walletId: string,
    typedData: WalletRpcParams.EthereumSignTypedDataRpcInput.Params.TypedData,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.EthereumSignTypedDataRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(
      walletId,
      { method: 'eth_signTypedData_v4', params: { typed_data: typedData } },
      authorizationContext,
      idempotencyKey,
    );

    return response.data;
  }

  public async sendTransaction(
    walletId: string,
    // Need to remember to 'pick' things we want to be a part of the input
    input: Pick<WalletRpcParams.EthereumSendTransactionRpcInput, 'caip2' | 'params' | 'sponsor'>,
    authorizationContext?: AuthorizationContext,
    idempotencyKey?: string,
  ): Promise<WalletRpcResponse.EthereumSendTransactionRpcResponse.Data> {
    const response = await this.privyWalletsService.rpc(
      walletId,
      { ...input, method: 'eth_sendTransaction', chain_type: 'ethereum' },
      authorizationContext,
      idempotencyKey,
    );

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }
}

// Need to remember to 'omit' things we don't want to be a part of the input
type SendTransactionInputAlternative = Omit<
  WalletRpcParams.EthereumSendTransactionRpcInput,
  'privy-authorization-signature' | 'privy-idempotency-key' | 'chain_type' | 'method' | 'address'
>;
