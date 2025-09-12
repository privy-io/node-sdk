import { ClientOptions, PrivyAPI } from '../client';
import { PrivyWalletsService } from './services/wallets';
import { PrivyPoliciesService } from './services/policies';
import { PrivyTransactionsService } from './services/transactions';
import { PrivyKeyQuorumsService } from './services/key-quorums';
import { PrivyUsersService } from './services/users';
import { PrivyUtils } from './services/utils';
import { JwtExchangeService } from '../lib/jwt-exchange';
import { VERSION } from '../version';
import { createPrivyAppJWKS } from '../lib/auth';

type InternalClientOptions = Omit<ClientOptions, 'appID' | 'appSecret' | 'baseUrl'>;

export interface PrivyClientOptions extends InternalClientOptions {
  appId: string;
  appSecret: string;
  apiUrl?: string;
  authorizationKeyCacheMaxCapacity?: number;
  jwtVerificationKey?: string;
}

const DEFAULT_AUTHORIZATION_KEY_CACHE_MAX_CAPACITY = 1000;

export class PrivyClient {
  private privyApiClient: PrivyAPI;
  private walletsService: PrivyWalletsService;
  private policiesService: PrivyPoliciesService;
  private transactionsService: PrivyTransactionsService;
  private keyQuorumsService: PrivyKeyQuorumsService;
  private usersService: PrivyUsersService;
  private utilsService: PrivyUtils;
  private jwtExchangeService: JwtExchangeService;

  /** @internal */
  _jwtExchange(): JwtExchangeService {
    return this.jwtExchangeService;
  }

  public constructor({
    appId,
    appSecret,
    apiUrl,
    authorizationKeyCacheMaxCapacity = DEFAULT_AUTHORIZATION_KEY_CACHE_MAX_CAPACITY,
    defaultHeaders,
    jwtVerificationKey,
    ...clientOptions
  }: PrivyClientOptions) {
    this.privyApiClient = new PrivyAPI({
      ...clientOptions,
      appID: appId,
      appSecret: appSecret,
      baseURL: apiUrl,
      defaultHeaders: {
        ...defaultHeaders,
        // Convention is: <client_name>:<semantic_version>
        'privy-client': `node:${VERSION}`,
      },
    });
    const appJwks = createPrivyAppJWKS({
      appId: this.privyApiClient.appID,
      apiUrl: this.privyApiClient.baseURL,
      headers: { 'privy-client': `node:${VERSION}` },
      verificationKeyOverride: jwtVerificationKey,
    });

    this.jwtExchangeService = new JwtExchangeService(
      this.privyApiClient.wallets,
      authorizationKeyCacheMaxCapacity,
    );
    this.walletsService = new PrivyWalletsService(this.privyApiClient, this);
    this.policiesService = new PrivyPoliciesService(this.privyApiClient, this);
    this.transactionsService = new PrivyTransactionsService(this.privyApiClient);
    this.keyQuorumsService = new PrivyKeyQuorumsService(this.privyApiClient, this);
    this.usersService = new PrivyUsersService(this.privyApiClient, appJwks);
    this.utilsService = new PrivyUtils(this.privyApiClient, this, appJwks);
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
