import { PrivyAPI } from '../../client';
import {
  WalletRawSignParams,
  WalletRawSignResponse,
  WalletRpcParams,
  WalletRpcResponse,
  Wallets,
} from '../../resources';
import { generateAuthorizationSignatures } from '../AuthorizationContext';
import { PrivyEthereumService } from './ethereum';
import { PrivySolanaService } from './solana';
import { Prettify, WithAuthorization, WithIdempotency } from './types';

export class PrivyWalletsService extends Wallets {
  private ethereumService: PrivyEthereumService;
  private solanaService: PrivySolanaService;

  constructor(privyApiClient: PrivyAPI) {
    super(privyApiClient);
    this.ethereumService = new PrivyEthereumService(this);
    this.solanaService = new PrivySolanaService(this);
  }

  public ethereum(): PrivyEthereumService {
    return this.ethereumService;
  }

  public solana(): PrivySolanaService {
    return this.solanaService;
  }

  public async rpc<Params extends PrivyWalletsService.RpcInput>(
    walletId: string,
    params: Params,
  ): Promise<Extract<WalletRpcResponse, { method: Params['method'] }>>;
  public async rpc(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: PrivyWalletsService.RpcInput,
  ): Promise<WalletRpcResponse> {
    const authorizationSignaturesHeader = generateAuthorizationSignatures({
      authorizationContext,
      input: {
        version: 1,
        method: 'POST',
        url: `${this._client.baseURL}/v1/wallets/${walletId}/rpc`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
          ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
        },
      },
    });

    return await this._rpc(walletId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
      ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
    });
  }

  public async rawSign(
    walletId: string,
    {
      authorization_context: authorizationContext = {},
      idempotency_key: idempotencyKey,
      ...params
    }: WithIdempotency<WithAuthorization<WalletRawSignParams>>,
  ): Promise<WalletRawSignResponse.Data> {
    const authorizationSignaturesHeader = generateAuthorizationSignatures({
      authorizationContext,
      input: {
        version: 1,
        method: 'POST',
        url: `${this._client.baseURL}/v1/wallets/${walletId}/raw_sign`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
          ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
        },
      },
    });

    const response = await this._rawSign(walletId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
      ...(idempotencyKey && { 'privy-idempotency-key': idempotencyKey }),
    });

    if (!response.data) {
      throw new Error(response.error?.message ?? 'Unexpected response from Privy API');
    }

    return response.data;
  }
}

export namespace PrivyWalletsService {
  export type RpcInput = Prettify<WithIdempotency<WithAuthorization<WalletRpcParams>>>;
  export type RawSignInput = Prettify<WithIdempotency<WithAuthorization<WalletRawSignParams>>>;
}

// prettier-ignore
export type PrivyWalletsRpcInput<P extends WalletRpcParams> =
  Prettify<WithIdempotency<WithAuthorization<Omit<P, 'chain_type'|'method'>>>>;
