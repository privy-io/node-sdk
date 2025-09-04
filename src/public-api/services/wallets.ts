import { PrivyAPI } from '../../client';
import { generateAuthorizationSignatures } from '../../lib/authorization';
import { setupHPKE } from '../../lib/cryptography';
import {
  Wallet,
  WalletExportParams,
  WalletRawSignParams,
  WalletRawSignResponse,
  WalletRpcParams,
  WalletRpcResponse,
  Wallets,
  WalletUpdateParams,
} from '../../resources';
import { PrivyClient } from '../PrivyClient';
import { PrivyEthereumService } from './ethereum';
import { PrivySolanaService } from './solana';
import { Prettify, WithAuthorization, WithIdempotency } from './types';

export class PrivyWalletsService extends Wallets {
  private ethereumService: PrivyEthereumService;
  private solanaService: PrivySolanaService;
  private privyClient: PrivyClient;

  constructor(privyApiClient: PrivyAPI, privyClient: PrivyClient) {
    super(privyApiClient);
    this.privyClient = privyClient;
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
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
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
    }: PrivyWalletsService.RawSignInput,
  ): Promise<WalletRawSignResponse.Data> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
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

    return response.data;
  }

  public async update(
    walletId: string,
    { authorization_context: authorizationContext = {}, ...params }: PrivyWalletsService.UpdateInput,
  ): Promise<Wallet> {
    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'PATCH',
        url: `${this._client.baseURL}/v1/wallets/${walletId}`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._update(walletId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });

    return response;
  }

  public async export(
    walletId: string,
    { authorization_context: authorizationContext = {}, ...outerParams }: PrivyWalletsService.ExportInput,
  ): Promise<PrivyWalletsService.ExportResponse> {
    const { publicKeySpki, decryptPayload } = await setupHPKE();

    const params: WalletExportParams = {
      ...outerParams,
      encryption_type: 'HPKE',
      // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
      recipient_public_key: Buffer.from(publicKeySpki).toString('base64'),
    };

    const authorizationSignaturesHeader = await generateAuthorizationSignatures(this.privyClient, {
      authorizationContext,
      input: {
        version: 1,
        method: 'POST',
        url: `${this._client.baseURL}/v1/wallets/${walletId}/export`,
        body: params,
        headers: {
          'privy-app-id': this._client.appID,
        },
      },
    });

    const response = await this._export(walletId, {
      ...params,
      'privy-authorization-signature': authorizationSignaturesHeader.join(','),
    });
    const decryptedPrivateKey = await decryptPayload(
      // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
      Buffer.from(response.encapsulated_key, 'base64'),
      Buffer.from(response.ciphertext, 'base64'),
    );
    const privateKey = new TextDecoder().decode(decryptedPrivateKey);

    return { private_key: privateKey };
  }
}

// prettier-ignore
/**
 * The namespace for types related to the Wallets service class.
 * @see {@link PrivyWalletsService} class.
 */
export namespace PrivyWalletsService {
  /** The input type for the {@link PrivyWalletsService.rpc} method. */
  export type RpcInput = Prettify<WithIdempotency<WithAuthorization<WalletRpcParams>>>;
  /** The input type for the {@link PrivyWalletsService.rawSign} method. */
  export type RawSignInput = Prettify<WithIdempotency<WithAuthorization<WalletRawSignParams>>>;
  /** The input type for the {@link PrivyWalletsService.update} method. */
  export type UpdateInput = Prettify<WithAuthorization<WalletUpdateParams>>;
  /** The input type for the {@link PrivyWalletsService.export} method. */
  export type ExportInput = Prettify<WithAuthorization<Omit<WalletExportParams, 'encryption_type' | 'recipient_public_key'>>>;
  /** The response type for the {@link PrivyWalletsService.export} method. */
  export type ExportResponse = { private_key: string };
}

// prettier-ignore
/**
 * Helper type for the input to the RPC utility methods, such as `ethereum().signMessage()`.
 * It modifies the raw input to the RPC method ({@link WalletRpcParams}) to:
 * - Include the idempotency key string in place of the idempotency HTTP header via {@link WithIdempotency}
 * - Include the authorization context over the authorization signature HTTP header via {@link WithAuthorization}
 *
 * Finally, it omits the `chain_type` and `method` properties from the input, as these will be
 * internally set by the RPC utility method used.
 * e.g. `ethereum().signMessage()` will set `chain_type=ethereum` and `method=personal_sign`.
 */
export type PrivyWalletsRpcInput<Params extends WalletRpcParams> =
  Prettify<WithIdempotency<WithAuthorization<Omit<Params, 'chain_type'|'method'>>>>;

// prettier-ignore
/**
 * Helper type that takes a parameters object and an extension object and returns a new parameters
 * object with the extension object merged in, and the `params` property omitted.
 *
 * This is used to turn Params objects that accept the raw `params` object into ones that accept a
 * more ergonomic extension object instead that can be used internally by Privy's service methods to
 * turn into the right value for `params`.
 *
 * e.g. `ethereum().signMessage()` will accept a `message` string or `Uint8Array` that is
 * automatically converted to the right `{ message: '...', encoding: '...' }` object.
 */
export type ReplaceParams<Params, Extension> =
  Prettify<Omit<Params, 'params'> & Extension>;
