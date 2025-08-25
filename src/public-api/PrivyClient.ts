import { ClientOptions, PrivyAPI } from '../client';
import { PrivyWalletsService } from './services/wallets';

export interface PrivyClientOptions {
  appId: string;
  appSecret: string;
  apiUrl?: string;
  logLevel?: ClientOptions['logLevel'];
  fetch?: ClientOptions['fetch'];
}

export class PrivyClient {
  private privyApiClient: PrivyAPI;
  private walletsService: PrivyWalletsService;

  public constructor({ appId, appSecret, apiUrl, ...clientOptions }: PrivyClientOptions) {
    this.privyApiClient = new PrivyAPI({
      appID: appId,
      appSecret: appSecret,
      baseURL: apiUrl,
      ...clientOptions,
    });
    this.walletsService = new PrivyWalletsService(this.privyApiClient);
  }

  public wallets(): PrivyWalletsService {
    return this.walletsService;
  }
}
