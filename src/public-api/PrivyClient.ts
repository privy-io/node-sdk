import { ClientOptions, PrivyAPI } from '../client';
import { PrivyWebhooksService } from './services/webhooks';
import { PrivyWalletsService } from './services/wallets';
import { PrivyPoliciesService } from './services/policies';
import { PrivyTransactionsService } from './services/transactions';
import { PrivyKeyQuorumsService } from './services/key-quorums';
import { PrivyUsersService } from './services/users';
import { PrivyUtils } from './services/utils';
import { PrivyAnalyticsService } from './services/analytics';
import { PrivyAppsService } from './services/apps';
import { PrivyAggregationsService } from './services/aggregations';
import { PrivyAccountsService } from './services/accounts';
import { PrivyYieldService } from './services/yield';
import { PrivyClientAuthService } from './services/client-auth';
import { PrivyIntentsService } from './services/intents';
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
  webhookSigningSecret?: string;
}

const DEFAULT_AUTHORIZATION_KEY_CACHE_MAX_CAPACITY = 1000;

export class PrivyClient {
  private privyApiClient: PrivyAPI;
  private webhooksService: PrivyWebhooksService;
  private walletsService: PrivyWalletsService;
  private policiesService: PrivyPoliciesService;
  private transactionsService: PrivyTransactionsService;
  private keyQuorumsService: PrivyKeyQuorumsService;
  private usersService: PrivyUsersService;
  private utilsService: PrivyUtils;
  private analyticsService: PrivyAnalyticsService;
  private appsService: PrivyAppsService;
  private aggregationsService: PrivyAggregationsService;
  private accountsService: PrivyAccountsService;
  private yieldService: PrivyYieldService;
  private clientAuthService: PrivyClientAuthService;
  private intentsService: PrivyIntentsService;
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
    webhookSigningSecret,
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
    this.webhooksService = new PrivyWebhooksService(webhookSigningSecret);
    this.analyticsService = new PrivyAnalyticsService(this.privyApiClient);
    this.appsService = new PrivyAppsService(this.privyApiClient);
    this.aggregationsService = new PrivyAggregationsService(this.privyApiClient);
    this.accountsService = new PrivyAccountsService(this.privyApiClient);
    this.yieldService = new PrivyYieldService(this.privyApiClient);
    this.clientAuthService = new PrivyClientAuthService(this.privyApiClient);
    this.intentsService = new PrivyIntentsService(this.privyApiClient);
  }

  public webhooks(): PrivyWebhooksService {
    return this.webhooksService;
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

  public analytics(): PrivyAnalyticsService {
    return this.analyticsService;
  }

  public apps(): PrivyAppsService {
    return this.appsService;
  }

  public aggregations(): PrivyAggregationsService {
    return this.aggregationsService;
  }

  public accounts(): PrivyAccountsService {
    return this.accountsService;
  }

  public yield(): PrivyYieldService {
    return this.yieldService;
  }

  public clientAuth(): PrivyClientAuthService {
    return this.clientAuthService;
  }

  public intents(): PrivyIntentsService {
    return this.intentsService;
  }
}
