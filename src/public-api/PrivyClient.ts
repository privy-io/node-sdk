import { ClientOptions, PrivyAPI } from '../client';
import { PrivyWebhooksService } from './services/webhooks';
import { PrivyWalletsService } from './services/wallets';
import { PrivyPoliciesService } from './services/policies';
import { PrivyTransactionsService } from './services/transactions';
import { PrivyKeyQuorumsService } from './services/key-quorums';
import { PrivyUsersService } from './services/users';
import { PrivyAppsService } from './services/apps';
import { PrivyIntentsService } from './services/intents';
import { PrivyUtils } from './services/utils';
import { JwtExchangeService } from '../lib/jwt-exchange';
import { VERSION } from '../version';
import { createPrivyAppJWKS } from '../lib/auth';
type InternalClientOptions = Omit<ClientOptions, 'appID' | 'appSecret' | 'baseUrl'>;

export type PrivyRequestExpiryOptions =
  | {
      /**
       * When true, the `privy-request-expiry` header is never sent on any call
       * unless explicitly provided per-request.
       */
      disabled: true;
      defaultMs?: never;
      defaultIntentMs?: never;
    }
  | {
      /**
       * Explicit `false` to opt out of disabling; omitting `disabled` is
       * equivalent and more idiomatic.
       */
      disabled?: false;
      /**
       * Default request expiry duration (ms from now) for non-intents endpoints.
       * Defaults to 15 minutes.
       */
      defaultMs?: number;
      /**
       * Default request expiry duration (ms from now) for intents-endpoint calls.
       * Defaults to 72 hours.
       */
      defaultIntentMs?: number;
    };

export interface PrivyClientOptions extends InternalClientOptions {
  appId: string;
  appSecret: string;
  apiUrl?: string;
  authorizationKeyCacheMaxCapacity?: number;
  /**
   * Default request expiry duration in milliseconds from now. Defaults to 15 minutes.
   * @deprecated Use `requestExpiry.defaultMs` instead.
   */
  defaultRequestExpiryMs?: number;
  /**
   * Set to `true` to disable automatically setting the `privy-request-expiry` header
   * on requests. When disabled, no expiry header will be sent unless explicitly
   * provided per-request. Defaults to `false`.
   * @deprecated Use `requestExpiry.disabled` instead.
   */
  disableRequestExpiry?: boolean;
  /**
   * Recommended way to configure request-expiry behaviour. Groups the general
   * default, the intents-specific default, and the disable toggle into a single
   * object. When both this and a deprecated top-level alias are provided, the
   * nested field wins per-field.
   */
  requestExpiry?: PrivyRequestExpiryOptions;
  jwtVerificationKey?: string;
  webhookSigningSecret?: string;
}

const DEFAULT_AUTHORIZATION_KEY_CACHE_MAX_CAPACITY = 1000;
// 15 minutes
const DEFAULT_REQUEST_EXPIRY_MS = 15 * 60 * 1000;
// 72 hours
const DEFAULT_INTENT_REQUEST_EXPIRY_MS = 72 * 60 * 60 * 1000;

export class PrivyClient {
  private privyApiClient: PrivyAPI;
  private webhooksService: PrivyWebhooksService;
  private walletsService: PrivyWalletsService;
  private policiesService: PrivyPoliciesService;
  private transactionsService: PrivyTransactionsService;
  private keyQuorumsService: PrivyKeyQuorumsService;
  private usersService: PrivyUsersService;
  private intentsService: PrivyIntentsService;
  private appsService: PrivyAppsService;
  private utilsService: PrivyUtils;
  private jwtExchangeService: JwtExchangeService;
  private _defaultRequestExpiryMs: number;
  private _defaultIntentRequestExpiryMs: number;
  private _disableRequestExpiry: boolean;

  /** @internal */
  _jwtExchange(): JwtExchangeService {
    return this.jwtExchangeService;
  }

  public constructor({
    appId,
    appSecret,
    apiUrl,
    authorizationKeyCacheMaxCapacity = DEFAULT_AUTHORIZATION_KEY_CACHE_MAX_CAPACITY,
    defaultRequestExpiryMs,
    disableRequestExpiry,
    requestExpiry,
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

    this._disableRequestExpiry = requestExpiry?.disabled ?? disableRequestExpiry ?? false;
    this._defaultRequestExpiryMs =
      requestExpiry?.defaultMs ?? defaultRequestExpiryMs ?? DEFAULT_REQUEST_EXPIRY_MS;
    this._defaultIntentRequestExpiryMs = requestExpiry?.defaultIntentMs ?? DEFAULT_INTENT_REQUEST_EXPIRY_MS;
    this.jwtExchangeService = new JwtExchangeService(
      this.privyApiClient.wallets,
      authorizationKeyCacheMaxCapacity,
    );
    this.walletsService = new PrivyWalletsService(this.privyApiClient, this);
    this.policiesService = new PrivyPoliciesService(this.privyApiClient, this);
    this.transactionsService = new PrivyTransactionsService(this.privyApiClient);
    this.keyQuorumsService = new PrivyKeyQuorumsService(this.privyApiClient, this);
    this.intentsService = new PrivyIntentsService(this.privyApiClient, this);
    this.usersService = new PrivyUsersService(this.privyApiClient, appJwks);
    this.appsService = new PrivyAppsService(this.privyApiClient);
    this.utilsService = new PrivyUtils(this.privyApiClient, this, appJwks);
    this.webhooksService = new PrivyWebhooksService(this.privyApiClient.webhooks, webhookSigningSecret);
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

  public intents(): PrivyIntentsService {
    return this.intentsService;
  }

  public users(): PrivyUsersService {
    return this.usersService;
  }

  public apps(): PrivyAppsService {
    return this.appsService;
  }

  public utils(): PrivyUtils {
    return this.utilsService;
  }

  /**
   * Returns a request expiry timestamp as a Unix timestamp in milliseconds,
   * or `undefined` if request expiry is disabled on this client.
   *
   * If `expiryMsFromNow` is provided, uses that duration. Otherwise falls back to the
   * `defaultRequestExpiryMs` configured on the client (defaults to 15 minutes).
   * Returns `undefined` when `disableRequestExpiry` is `true`.
   */
  public getRequestExpiry(expiryMsFromNow?: number): number | undefined {
    if (this._disableRequestExpiry) {
      return undefined;
    }
    return Date.now() + (expiryMsFromNow ?? this._defaultRequestExpiryMs);
  }

  /**
   * Returns a request expiry timestamp (Unix ms) for intents-endpoint calls,
   * or `undefined` if request expiry is disabled on this client.
   *
   * If `expiryMsFromNow` is provided, uses that duration. Otherwise falls back to
   * the `defaultIntentRequestExpiryMs` configured on the client (defaults to 72
   * hours). Returns `undefined` when `disableRequestExpiry` is `true`.
   *
   * @internal
   */
  public getIntentRequestExpiry(expiryMsFromNow?: number): number | undefined {
    if (this._disableRequestExpiry) {
      return undefined;
    }
    return Date.now() + (expiryMsFromNow ?? this._defaultIntentRequestExpiryMs);
  }
}
