import { PrivyAPI } from '../client';
import { Fetch } from '../internal/builtin-types';
import { PrivyWalletsService } from './services/wallets';

export interface PrivyClientOptions {
  appId: string;
  appSecret: string;
  serverUrl?: string;
  isDebuggingEnabled?: boolean;
  customHttpClient?: Fetch;
}

export class PrivyClient {
  private privyApiClient: PrivyAPI;

  private constructor(privyApiClient: PrivyAPI) {
    this.privyApiClient = privyApiClient;
    this.walletsService = new PrivyWalletsService(privyApiClient);
  }

  public static create({
    appId,
    appSecret,
    serverUrl,
    isDebuggingEnabled,
    customHttpClient,
  }: PrivyClientOptions) {
    const privyApiClient = new PrivyAPI({
      appID: appId,
      appSecret: appSecret,
      baseURL: serverUrl,
      logLevel: isDebuggingEnabled ? 'debug' : undefined,
      fetch: customHttpClient,
    });
    return new PrivyClient(privyApiClient);
  }

  private walletsService: PrivyWalletsService;

  public wallets(): PrivyWalletsService {
    return this.walletsService;
  }
}
