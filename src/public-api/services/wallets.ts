import { PrivyAPI } from '../../client';
import { PrivyAPIError } from '../../core/error';
import { generateAuthorizationSignatures } from '../../lib/authorization';
import { setupHPKERecipient, setupHPKESender } from '../../lib/cryptography';
import { entropyToBytes } from '../../lib/wallet-entropy';
import {
  Wallet,
  WalletExportParams,
  WalletRawSignParams,
  WalletRawSignResponse,
  WalletRpcParams,
  WalletRpcResponse,
  Wallets,
  WalletSubmitImportParams,
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
    const { publicKeySpki, decryptPayload } = await setupHPKERecipient();

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

  public async import({
    wallet: { private_key, ...wallet },
    ...params
  }: PrivyWalletsService.ImportInput): Promise<Wallet> {
    const hpkeSender = await setupHPKESender();

    const privateKeyBytes = entropyToBytes({
      entropy: private_key,
      entropyType: wallet.entropy_type,
      chainType: wallet.chain_type,
    });

    const initResponse = await this._initImport({
      ...wallet,
      encryption_type: 'HPKE',
    });

    if (initResponse.encryption_type !== 'HPKE') {
      throw new PrivyAPIError(`Invalid encryption type: ${initResponse.encryption_type}`);
    }

    // We fall back to `Buffer` here as Uint8Array.fromBase64 is not widely supported yet
    const encryptionPublicKey = Buffer.from(initResponse.encryption_public_key, 'base64');

    const { encapsulatedKey, ciphertext } = await hpkeSender.encryptPayload(
      encryptionPublicKey,
      privateKeyBytes,
    );

    const submitResponse = await this._submitImport({
      ...params,
      wallet: {
        ...wallet,
        encryption_type: 'HPKE',
        // We fall back to `Buffer` here as Uint8Array.toBase64 is not widely supported yet
        encapsulated_key: Buffer.from(encapsulatedKey).toString('base64'),
        ciphertext: Buffer.from(ciphertext).toString('base64'),
      },
    });

    return submitResponse;
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
  export type ImportInputWallet = Prettify<
    (
      | Omit<WalletSubmitImportParams.HDSubmitInput, 'encapsulated_key' | 'ciphertext' | 'encryption_type'>
      | Omit<WalletSubmitImportParams.PrivateKeySubmitInput, 'encapsulated_key' | 'ciphertext' | 'encryption_type'>
    ) & { private_key: Uint8Array | string }
  >;
  /** The input type for the {@link PrivyWalletsService.import} method. */
  export type ImportInput = Prettify<
    Omit<WalletSubmitImportParams, 'wallet'> &  {wallet: ImportInputWallet; }
  >;
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
