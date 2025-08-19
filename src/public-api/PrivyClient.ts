import { PrivyAPI } from '../client';
import { Fetch } from '../internal/builtin-types';
import { WalletsService } from './services/wallets';

interface PrivyClientOptions {
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
    this.walletsService = new WalletsService(privyApiClient);
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

  private walletsService: WalletsService;

  public wallets(): WalletsService {
    return this.walletsService;
  }
}
