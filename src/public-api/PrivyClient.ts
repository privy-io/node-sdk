import { ClientOptions, PrivyAPI } from '../client';
import { PrivyWalletsService } from './services/wallets';
import { PrivyPoliciesService } from './services/policies';
import { PrivyTransactionsService } from './services/transactions';
import { PrivyKeyQuorumsService } from './services/key-quorums';
import { PrivyUsersService } from './services/users';
import { PrivyUtils } from './services/utils/PrivyUtils';
import { PrivyRequestSigner } from './services/utils/PrivyRequestSigner';

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
  private policiesService: PrivyPoliciesService;
  private transactionsService: PrivyTransactionsService;
  private keyQuorumsService: PrivyKeyQuorumsService;
  private usersService: PrivyUsersService;
  private requestSigner: PrivyRequestSigner;
  private utilsService: PrivyUtils;

  public constructor({ appId, appSecret, apiUrl, ...clientOptions }: PrivyClientOptions) {
    this.privyApiClient = new PrivyAPI({
      appID: appId,
      appSecret: appSecret,
      baseURL: apiUrl,
      ...clientOptions,
    });
    this.requestSigner = new PrivyRequestSigner();
    this.walletsService = new PrivyWalletsService(this.privyApiClient, this.requestSigner);
    this.policiesService = new PrivyPoliciesService(this.privyApiClient);
    this.transactionsService = new PrivyTransactionsService(this.privyApiClient);
    this.keyQuorumsService = new PrivyKeyQuorumsService(this.privyApiClient);
    this.usersService = new PrivyUsersService(this.privyApiClient);
    this.utilsService = new PrivyUtils(this.requestSigner);
  }

  public wallets(): PrivyWalletsService {
    return this.walletsService;
  }

  public policies(): PrivyPoliciesService {
    return this.policiesService;
  }

  public transactions(): PrivyTransactionsService {
    return this.transactionsService;
  }

  public keyQuorums(): PrivyKeyQuorumsService {
    return this.keyQuorumsService;
  }

  public users(): PrivyUsersService {
    return this.usersService;
  }

  public utils(): PrivyUtils {
    return this.utilsService;
  }
}
