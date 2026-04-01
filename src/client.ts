// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { stringifyQuery } from './internal/utils/query';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import { AbstractPage, type CursorParams, CursorResponse } from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  AccountBalanceParams,
  AccountBalanceResponse,
  AccountDisplayName,
  AccountResponse,
  AccountWallet,
  AccountWalletConfigurationItem,
  AccountWalletsConfiguration,
  Accounts,
  AccountsDashboardListResponse,
  AccountsListResponse,
  AssetAccountWithBalance,
  CreateAccountInput,
  UpdateAccountInput,
} from './resources/accounts';
import {
  Aggregation,
  AggregationGroupBy,
  AggregationInput,
  AggregationMethod,
  AggregationMetric,
  AggregationWindow,
  Aggregations,
} from './resources/aggregations';
import { Analytics, AnalyticsEventInput } from './resources/analytics';
import {
  AuthenticateJwtInput,
  AuthenticateSiweInput,
  AuthenticateSiwsInput,
  BridgeBrlFiatVirtualAccountDepositInstructions,
  BridgeDestinationAsset,
  BridgeEurFiatVirtualAccountDepositInstructions,
  BridgeFiatCustomerResponse,
  BridgeFiatRejectionReason,
  BridgeFiatVirtualAccountDepositInstructions,
  BridgeFiatVirtualAccountDestination,
  BridgeFiatVirtualAccountRequest,
  BridgeFiatVirtualAccountResponse,
  BridgeFiatVirtualAccountSource,
  BridgeGbpFiatVirtualAccountDepositInstructions,
  BridgeMxnFiatVirtualAccountDepositInstructions,
  BridgeOnrampProvider,
  BridgeSandboxFiatCustomerResponse,
  BridgeSandboxFiatVirtualAccountRequest,
  BridgeSandboxFiatVirtualAccountResponse,
  BridgeSourceAsset,
  BridgeUsdFiatVirtualAccountDepositInstructions,
  Caip2ChainID,
  ClientAuth,
  CreateOrUpdateFiatCustomerRequestInput,
  CryptoCurrencyCode,
  CustomJwtAuthenticateRequestBody,
  CustomJwtLinkRequestBody,
  CustomOAuthProviderID,
  ExternalOAuthProviderID,
  FarcasterAuthenticateInput,
  FarcasterAuthenticateRequestBody,
  FarcasterConnectInitResponse,
  FarcasterConnectInitResponseBody,
  FarcasterConnectStatusCompletedResponse,
  FarcasterConnectStatusCompletedResponseBody,
  FarcasterConnectStatusPendingResponse,
  FarcasterConnectStatusPendingResponseBody,
  FarcasterInitInput,
  FarcasterInitRequestBody,
  FarcasterLinkInput,
  FarcasterLinkRequestBody,
  FarcasterSignerApproved,
  FarcasterSignerInitPendingApproval,
  FarcasterSignerInitRequestBody,
  FarcasterSignerInitResponseBody,
  FarcasterSignerRevoked,
  FarcasterSignerStatusPendingApproval,
  FarcasterSignerStatusResponseBody,
  FarcasterUnlinkInput,
  FarcasterUnlinkRequestBody,
  FarcasterV2AuthenticateInput,
  FarcasterV2AuthenticateRequestBody,
  FarcasterV2InitInput,
  FarcasterV2InitRequestBody,
  FarcasterV2InitResponse,
  FarcasterV2InitResponseBody,
  FiatAmount,
  FiatCurrencyCode,
  FiatCustomerResponse,
  FiatOnrampDestination,
  FiatOnrampEnvironment,
  FiatOnrampProvider,
  FiatOnrampProviderError,
  FiatOnrampQuote,
  FiatOnrampSource,
  FiatOnrampTransactionStatus,
  FiatVirtualAccountRequest,
  FiatVirtualAccountResponse,
  GetFiatCustomerRequestInput,
  GetFiatOnrampQuotesInput,
  GetFiatOnrampQuotesResponse,
  GetFiatOnrampTransactionStatusInput,
  GetFiatOnrampTransactionStatusResponse,
  GetFiatOnrampURLInput,
  GetFiatOnrampURLResponse,
  GuestAuthenticateRequestBody,
  LinkJwtInput,
  MfaPasskeyEnrollmentRequestBody,
  MfaPasskeyInitRequestBody,
  MfaPasskeyInitResponseBody,
  MfaPasskeyVerifyRequestBody,
  MfaSMSEnrollRequestBody,
  MfaSMSInitEnrollInput,
  MfaSMSInitRequestBody,
  MfaSMSInitVerifyInput,
  MfaSMSVerifyRequestBody,
  MfaTotpInitResponseBody,
  MfaTotpInput,
  MfaVerifyResponseBody,
  OAuthAuthenticateRequestBody,
  OAuthAuthorizationCodeRequestBody,
  OAuthCodeType,
  OAuthInitRequestBody,
  OAuthInitResponseBody,
  OAuthLinkRequestBody,
  OAuthLinkResponseBody,
  OAuthProviderID,
  OAuthTransferRequestBody,
  OAuthTransferUserInfo,
  OAuthTransferUserInfoMeta,
  OAuthUnlinkRequestBody,
  OAuthVerifyRequestBody,
  OAuthVerifyResponseBody,
  OnrampProvider,
  OptionalRefreshTokenInput,
  PasskeyAssertionResponse,
  PasskeyAttestationResponse,
  PasskeyAuthenticateInput,
  PasskeyAuthenticatorEnrollmentOptions,
  PasskeyAuthenticatorEnrollmentResponse,
  PasskeyAuthenticatorSelection,
  PasskeyAuthenticatorVerifyOptions,
  PasskeyAuthenticatorVerifyResponse,
  PasskeyClientExtensionResults,
  PasskeyCredPropsResult,
  PasskeyCredentialDescriptor,
  PasskeyEnrollmentExtensions,
  PasskeyInitInput,
  PasskeyLinkInput,
  PasskeyPubKeyCredParam,
  PasskeyRegisterInput,
  PasskeyRelyingParty,
  PasskeyUser,
  PasskeyVerifyExtensions,
  PasswordlessAuthenticateRequestBody,
  PasswordlessInitRequestBody,
  PasswordlessLinkRequestBody,
  PasswordlessSMSAuthenticateRequestBody,
  PasswordlessSMSInitRequestBody,
  PasswordlessSMSLinkRequestBody,
  PasswordlessSMSTransferRequestBody,
  PasswordlessSMSUnlinkRequestBody,
  PasswordlessSMSUpdateRequestBody,
  PasswordlessTransferRequestBody,
  PasswordlessUnlinkRequestBody,
  PasswordlessUpdateRequestBody,
  PrivyOAuthProviderID,
  ResponsePasskeyInitAuthenticate,
  ResponsePasskeyInitLink,
  ResponsePasskeyInitRegister,
  SiweAddressInput,
  SiweAuthenticateRequestBody,
  SiweInitInput,
  SiweInitRequestBody,
  SiweInitResponseBody,
  SiweInput,
  SiweLinkRequestBody,
  SiweLinkSmartWalletRequestBody,
  SiweNonce,
  SiweUnlinkRequestBody,
  SiwsAddressInput,
  SiwsAuthenticateRequestBody,
  SiwsInitInput,
  SiwsInitRequestBody,
  SiwsInitResponseBody,
  SiwsInput,
  SiwsLinkRequestBody,
  SiwsNonce,
  SiwsUnlinkRequestBody,
  SmartWalletSiweInput,
  TelegramAuthResult,
  TelegramAuthenticateInput,
  TelegramAuthenticateRequestBody,
  TelegramLinkRequestBody,
  TelegramUnlinkInput,
  TelegramUnlinkRequestBody,
  TelegramWebAppData,
  TransferFarcasterInput,
  TransferSiweInput,
  TransferSiwsInput,
  TransferTelegramInput,
  UnlinkPasskeyInput,
} from './resources/client-auth';
import { CrossApp, CrossAppConnection, CrossAppConnectionsResponse } from './resources/cross-app';
import {
  AlchemyPaymasterContext,
  EmbeddedWalletCreationInput,
  EmbeddedWallets,
  ICloudClientType,
  OAuthAuthenticateRecoveryResponse,
  OAuthCallbackICloudExpoInput,
  OAuthInitICloudRecoveryInput,
  OAuthInitRecoveryInput,
  RecoveryConfigurationICloudInput,
  RecoveryConfigurationICloudResponse,
  RecoveryKeyMaterialInput,
  RecoveryKeyMaterialResponse,
  RecoveryType,
  SmartWalletConfiguration,
  SmartWalletConfigurationDisabled,
  SmartWalletConfigurationEnabled,
  SmartWalletConfigurationInput,
  SmartWalletConfigurationInputEnabled,
  SmartWalletNetworkConfiguration,
  SmartWalletNetworkConfigurationInput,
  SmartWalletType,
  WalletCreationAdditionalSignerItem,
  WalletCreationInput,
} from './resources/embedded-wallets';
import {
  CoinbaseBlockchain,
  CoinbaseEthereumAsset,
  CoinbaseOnRampEthereumAddress,
  CoinbaseOnRampInitEthereumInput,
  CoinbaseOnRampInitInput,
  CoinbaseOnRampInitResponse,
  CoinbaseOnRampInitSolanaInput,
  CoinbaseOnRampSolanaAddress,
  CoinbaseOnRampStatus,
  CoinbaseOnRampStatusResponse,
  CoinbaseSolanaAsset,
  Funding,
  MoonpayCurrencyCode,
  MoonpayFiatOnRampEthereumConfig,
  MoonpayFiatOnRampEthereumInput,
  MoonpayFiatOnRampSolanaConfig,
  MoonpayFiatOnRampSolanaInput,
  MoonpayOnRampSandboxConfig,
  MoonpayOnRampSignInput,
  MoonpayOnRampSignResponse,
  MoonpayPaymentMethod,
  MoonpaySolanaCurrencyCode,
  MoonpayUiConfig,
  MoonpayUiTheme,
} from './resources/funding';
import {
  BaseActionResult,
  IntentAuthorization,
  IntentAuthorizationKeyQuorumMember,
  IntentAuthorizationMember,
  IntentCreatePolicyRuleParams,
  IntentCreationHeaders,
  IntentDeletePolicyRuleParams,
  IntentListParams,
  IntentResponse,
  IntentResponsesCursor,
  IntentRpcParams,
  IntentStatus,
  IntentType,
  IntentUpdateKeyQuorumParams,
  IntentUpdatePolicyParams,
  IntentUpdatePolicyRuleParams,
  IntentUpdateWalletParams,
  Intents,
  KeyQuorumIntentResponse,
  PolicyIntentRequestDetails,
  PolicyIntentResponse,
  RpcIntentRequestDetails,
  RpcIntentResponse,
  RuleIntentCreateRequestDetails,
  RuleIntentDeleteRequestDetails,
  RuleIntentRequestDetails,
  RuleIntentResponse,
  RuleIntentUpdateRequestDetails,
  WalletIntentResponse,
} from './resources/intents';
import {
  KeyQuorum,
  KeyQuorumAuthorizationHeaders,
  KeyQuorumCreateParams,
  KeyQuorumDeleteParams,
  KeyQuorumUpdateParams,
  KeyQuorums,
} from './resources/key-quorums';
import {
  KrakenEmbed,
  KrakenEmbedCurrentDayPnl,
  KrakenEmbedGetPortfolioSummaryQueryParams,
  KrakenEmbedGetPortfolioSummaryResponse,
} from './resources/kraken-embed';
import {
  ConditionSet,
  ConditionSetAuthorizationHeaders,
  ConditionSetItem,
  ConditionSetItemRequestParams,
  ConditionSetItemValueInput,
  ConditionSetItems,
  ConditionSetItemsRequestBody,
  ConditionSetItemsResponse,
  ConditionSetRequestBody,
  ConditionSetRequestParams,
  Policies,
  Policy,
  PolicyAuthorizationHeaders,
  PolicyCreateParams,
  PolicyCreateRuleParams,
  PolicyCreateRuleResponse,
  PolicyDeleteParams,
  PolicyDeleteRuleParams,
  PolicyGetRuleParams,
  PolicyGetRuleResponse,
  PolicyUpdateParams,
  PolicyUpdateRuleParams,
  PolicyUpdateRuleResponse,
  SuiTransactionCommandCondition,
  SuiTransactionCommandOperator,
  SuiTransferObjectsCommandCondition,
  SuiTransferObjectsCommandField,
  TronTransactionCondition,
  UpdateConditionSetRequestBody,
} from './resources/policies';
import { Shared, SuccessResponse } from './resources/shared';
import { SwapAmountType, SwapQuoteRequest, SwapQuoteResponse, SwapRequest, Swaps } from './resources/swaps';
import {
  TransactionGetResponse,
  TransactionScanningAssetDiff,
  TransactionScanningAssetInfo,
  TransactionScanningAssetValue,
  TransactionScanningCalldata,
  TransactionScanningExposure,
  TransactionScanningMetadata,
  TransactionScanningParams,
  TransactionScanningRequestBody,
  TransactionScanningResponseBody,
  TransactionScanningRpcRequest,
  TransactionScanningSimulationErrorResult,
  TransactionScanningSimulationResult,
  TransactionScanningSimulationSuccessResult,
  TransactionScanningValidationErrorResult,
  TransactionScanningValidationResult,
  TransactionScanningValidationSuccessResult,
  Transactions,
} from './resources/transactions';
import {
  AuthenticatedUser,
  CrossAppEmbeddedWallet,
  CrossAppSmartWallet,
  CustomMetadata,
  EmbeddedWalletRecoveryMethod,
  LinkedAccount,
  LinkedAccountAppleInput,
  LinkedAccountAppleOAuth,
  LinkedAccountAuthorizationKey,
  LinkedAccountBaseWallet,
  LinkedAccountBitcoinSegwitEmbeddedWallet,
  LinkedAccountBitcoinTaprootEmbeddedWallet,
  LinkedAccountCrossApp,
  LinkedAccountCurveSigningEmbeddedWallet,
  LinkedAccountCustomJwt,
  LinkedAccountCustomJwtInput,
  LinkedAccountCustomOAuth,
  LinkedAccountDiscordInput,
  LinkedAccountDiscordOAuth,
  LinkedAccountEmail,
  LinkedAccountEmailInput,
  LinkedAccountEmbeddedWallet,
  LinkedAccountEmbeddedWalletWithID,
  LinkedAccountEthereum,
  LinkedAccountEthereumEmbeddedWallet,
  LinkedAccountFarcaster,
  LinkedAccountFarcasterInput,
  LinkedAccountGitHubInput,
  LinkedAccountGitHubOAuth,
  LinkedAccountGoogleInput,
  LinkedAccountGoogleOAuth,
  LinkedAccountInput,
  LinkedAccountInstagramInput,
  LinkedAccountInstagramOAuth,
  LinkedAccountLineInput,
  LinkedAccountLineOAuth,
  LinkedAccountLinkedInInput,
  LinkedAccountLinkedInOAuth,
  LinkedAccountPasskey,
  LinkedAccountPasskeyInput,
  LinkedAccountPhone,
  LinkedAccountPhoneInput,
  LinkedAccountSmartWallet,
  LinkedAccountSolana,
  LinkedAccountSolanaEmbeddedWallet,
  LinkedAccountSpotifyInput,
  LinkedAccountSpotifyOAuth,
  LinkedAccountTelegram,
  LinkedAccountTelegramInput,
  LinkedAccountTiktokInput,
  LinkedAccountTiktokOAuth,
  LinkedAccountTwitchInput,
  LinkedAccountTwitchOAuth,
  LinkedAccountTwitterInput,
  LinkedAccountTwitterOAuth,
  LinkedAccountType,
  LinkedAccountWalletInput,
  LinkedMfaMethod,
  OAuthTokens,
  PasskeyMfaMethod,
  SMSMfaMethod,
  TotpMfaMethod,
  User,
  UserBatchCreateInput,
  UserCreateParams,
  UserGetByCustomAuthIDParams,
  UserGetByDiscordUsernameParams,
  UserGetByEmailAddressParams,
  UserGetByFarcasterIDParams,
  UserGetByGitHubUsernameParams,
  UserGetByPhoneNumberParams,
  UserGetBySmartWalletAddressParams,
  UserGetByTelegramUserIDParams,
  UserGetByTelegramUsernameParams,
  UserGetByTwitterSubjectParams,
  UserGetByTwitterUsernameParams,
  UserGetByWalletAddressParams,
  UserListParams,
  UserPregenerateWalletsParams,
  UserSearchParams,
  UserSetCustomMetadataParams,
  UserUnlinkLinkedAccountParams,
  UserWithIdentityToken,
  Users,
  UsersCursor,
} from './resources/users';
import {
  EvmTransactionWalletActionStep,
  EvmUserOperationWalletActionStep,
  EvmWalletActionStepStatus,
  FailureReason,
  SwapActionResponse,
  TransferActionResponse,
  WalletActionResponse,
  WalletActionStatus,
  WalletActionStep,
  WalletActionStepType,
  WalletActionType,
  WalletActions,
} from './resources/wallet-actions';
import {
  FundsDepositedWebhookPayload,
  FundsWithdrawnWebhookPayload,
  IntentAuthorizedWebhookPayload,
  IntentCreatedWebhookPayload,
  IntentExecutedWebhookPayload,
  IntentFailedWebhookPayload,
  KrakenEmbedQuoteCancelledWebhookPayload,
  KrakenEmbedQuoteExecutedWebhookPayload,
  KrakenEmbedQuoteExecutionFailedWebhookPayload,
  KrakenEmbedUserClosedWebhookPayload,
  KrakenEmbedUserDisabledWebhookPayload,
  KrakenEmbedUserVerifiedWebhookPayload,
  MfaDisabledWebhookPayload,
  MfaEnabledWebhookPayload,
  PrivateKeyExportWebhookPayload,
  TransactionBroadcastedWebhookPayload,
  TransactionConfirmedWebhookPayload,
  TransactionExecutionRevertedWebhookPayload,
  TransactionFailedWebhookPayload,
  TransactionProviderErrorWebhookPayload,
  TransactionReplacedWebhookPayload,
  TransactionStillPendingWebhookPayload,
  UserAuthenticatedWebhookPayload,
  UserCreatedWebhookPayload,
  UserLinkedAccountWebhookPayload,
  UserOperationCompletedWebhookPayload,
  UserTransferredAccountWebhookPayload,
  UserUnlinkedAccountWebhookPayload,
  UserUpdatedAccountWebhookPayload,
  UserWalletCreatedWebhookPayload,
  WalletActionSwapCreatedWebhookPayload,
  WalletActionSwapFailedWebhookPayload,
  WalletActionSwapRejectedWebhookPayload,
  WalletActionSwapSucceededWebhookPayload,
  WalletActionTransferCreatedWebhookPayload,
  WalletActionTransferFailedWebhookPayload,
  WalletActionTransferRejectedWebhookPayload,
  WalletActionTransferSucceededWebhookPayload,
  WalletRecoveredWebhookPayload,
  WalletRecoverySetupWebhookPayload,
  WebhookPayload,
  Webhooks,
  YieldClaimConfirmedWebhookPayload,
  YieldDepositConfirmedWebhookPayload,
  YieldWithdrawConfirmedWebhookPayload,
} from './resources/webhooks';
import {
  EthereumVaultDetailsInput,
  EthereumVaultDetailsResponse,
  EthereumVaultPosition,
  EthereumVaultResponse,
  EthereumYieldClaimIDInput,
  EthereumYieldClaimInput,
  EthereumYieldClaimResponse,
  EthereumYieldClaimReward,
  EthereumYieldDepositInput,
  EthereumYieldPositionResponse,
  EthereumYieldPositionsInput,
  EthereumYieldProvider,
  EthereumYieldSweepIDInput,
  EthereumYieldSweepResponse,
  EthereumYieldSweepStatus,
  EthereumYieldSweepType,
  EthereumYieldWithdrawInput,
  EvmCaip2ChainID,
  Yield,
  YieldAuthorizationHeaders,
} from './resources/yield';
import {
  AllowlistDeletionResponse,
  AllowlistEntry,
  AppResponse,
  Apps,
  Caip2,
  Currency,
  CurrencyAsset,
  EmailInviteInput,
  EmbeddedWalletChainConfig,
  EmbeddedWalletConfigSchema,
  EmbeddedWalletCreateOnLogin,
  EmbeddedWalletInputSchema,
  EmbeddedWalletMode,
  FundingConfigResponseSchema,
  FundingMethodEnum,
  FundingOption,
  GasSponsorshipConfiguration,
  GasSponsorshipConfigurationInput,
  PhoneInviteInput,
  TelegramAuthConfigSchema,
  TestAccount,
  TestAccountsResponse,
  UserInviteInput,
  UserOwnedRecoveryOption,
  WalletInviteInput,
} from './resources/apps/apps';
import {
  CreateTokenTransferRequest,
  CurveSigningChainType,
  CustodialWallet,
  CustodialWalletChainType,
  CustodialWalletCreateInput,
  CustodialWalletProvider,
  EthereumPersonalSignRpcInput,
  EthereumPersonalSignRpcInputParams,
  EthereumPersonalSignRpcResponse,
  EthereumPersonalSignRpcResponseData,
  EthereumRpcInput,
  EthereumRpcResponse,
  EthereumSecp256k1SignRpcInput,
  EthereumSecp256k1SignRpcInputParams,
  EthereumSecp256k1SignRpcResponse,
  EthereumSecp256k1SignRpcResponseData,
  EthereumSendTransactionRpcInput,
  EthereumSendTransactionRpcInputParams,
  EthereumSendTransactionRpcResponse,
  EthereumSendTransactionRpcResponseData,
  EthereumSign7702AuthorizationRpcInput,
  EthereumSign7702AuthorizationRpcInputParams,
  EthereumSign7702AuthorizationRpcResponse,
  EthereumSign7702AuthorizationRpcResponseData,
  EthereumSignTransactionRpcInput,
  EthereumSignTransactionRpcInputParams,
  EthereumSignTransactionRpcResponse,
  EthereumSignTransactionRpcResponseData,
  EthereumSignTypedDataRpcInput,
  EthereumSignTypedDataRpcInputParams,
  EthereumSignTypedDataRpcResponse,
  EthereumSignTypedDataRpcResponseData,
  EthereumSignUserOperationRpcInput,
  EthereumSignUserOperationRpcInputParams,
  EthereumSignUserOperationRpcResponse,
  EthereumSignUserOperationRpcResponseData,
  EthereumTypedDataInput,
  ExportPrivateKeyRpcInput,
  ExportPrivateKeyRpcResponse,
  ExportType,
  ExtendedChainType,
  FirstClassChainType,
  GetByWalletAddressRequestBody,
  HpkeAeadAlgorithm,
  HpkeEncryption,
  HpkeImportConfig,
  OutputWithPreviousTransactionData,
  PrivateKeyExportInput,
  PrivateKeyExportResponse,
  RawSignBytesEncoding,
  RawSignBytesHashFunction,
  RawSignBytesParams,
  RawSignHashParams,
  RawSignInput,
  RawSignInputParams,
  RawSignResponse,
  RawSignResponseData,
  RecipientPublicKey,
  SolanaRpcInput,
  SolanaRpcResponse,
  SolanaSignAndSendTransactionRpcInput,
  SolanaSignAndSendTransactionRpcInputParams,
  SolanaSignAndSendTransactionRpcResponse,
  SolanaSignAndSendTransactionRpcResponseData,
  SolanaSignMessageRpcInput,
  SolanaSignMessageRpcInputParams,
  SolanaSignMessageRpcResponse,
  SolanaSignMessageRpcResponseData,
  SolanaSignTransactionRpcInput,
  SolanaSignTransactionRpcInputParams,
  SolanaSignTransactionRpcResponse,
  SolanaSignTransactionRpcResponseData,
  SparkBalance,
  SparkClaimStaticDepositRpcInput,
  SparkClaimStaticDepositRpcInputParams,
  SparkClaimStaticDepositRpcResponse,
  SparkClaimStaticDepositRpcResponseData,
  SparkCreateLightningInvoiceRpcInput,
  SparkCreateLightningInvoiceRpcInputParams,
  SparkCreateLightningInvoiceRpcResponse,
  SparkGetBalanceRpcInput,
  SparkGetBalanceRpcResponse,
  SparkGetClaimStaticDepositQuoteRpcInput,
  SparkGetClaimStaticDepositQuoteRpcInputParams,
  SparkGetClaimStaticDepositQuoteRpcResponse,
  SparkGetClaimStaticDepositQuoteRpcResponseData,
  SparkGetStaticDepositAddressRpcInput,
  SparkGetStaticDepositAddressRpcResponse,
  SparkGetStaticDepositAddressRpcResponseData,
  SparkLightningFee,
  SparkLightningReceiveRequest,
  SparkLightningSendRequest,
  SparkNetwork,
  SparkOutputSelectionStrategy,
  SparkPayLightningInvoiceRpcInput,
  SparkPayLightningInvoiceRpcInputParams,
  SparkPayLightningInvoiceRpcResponse,
  SparkRpcInput,
  SparkRpcResponse,
  SparkSignMessageWithIdentityKeyRpcInput,
  SparkSignMessageWithIdentityKeyRpcInputParams,
  SparkSignMessageWithIdentityKeyRpcResponse,
  SparkSignMessageWithIdentityKeyRpcResponseData,
  SparkSigningKeyshare,
  SparkTokenBalance,
  SparkTransfer,
  SparkTransferLeaf,
  SparkTransferRpcInput,
  SparkTransferRpcInputParams,
  SparkTransferRpcResponse,
  SparkTransferTokensRpcInput,
  SparkTransferTokensRpcInputParams,
  SparkTransferTokensRpcResponse,
  SparkTransferTokensRpcResponseData,
  SparkUserTokenMetadata,
  SparkWalletLeaf,
  SuiCommandName,
  TokenOutput,
  TokenTransferDestination,
  TokenTransferSource,
  Wallet,
  WalletAuthenticateRequestBody,
  WalletAuthenticateWithJwtParams,
  WalletAuthenticateWithJwtResponse,
  WalletAuthorizationHeaders,
  WalletBatchCreateInput,
  WalletBatchCreateResponse,
  WalletBatchCreateResult,
  WalletBatchItemInput,
  WalletChainType,
  WalletCreateParams,
  WalletCreateWalletsWithRecoveryParams,
  WalletCreateWalletsWithRecoveryResponse,
  WalletCustodian,
  WalletExportParams,
  WalletExportResponse,
  WalletImportInitResponse,
  WalletImportSupportedChains,
  WalletImportSupportedEntropyTypes,
  WalletInitImportParams,
  WalletInitImportResponse,
  WalletListParams,
  WalletRawSignParams,
  WalletRpcParams,
  WalletRpcRequestBody,
  WalletRpcResponse,
  WalletSubmitImportParams,
  WalletUpdateParams,
  WalletUpdateRequestBody,
  Wallets,
  WalletsCursor,
} from './resources/wallets/wallets';
import { type Fetch } from './internal/builtin-types';
import { isRunningInBrowser } from './internal/detect-platform';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { toBase64 } from './internal/utils/base64';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

const environments = {
  production: 'https://api.privy.io',
  staging: 'https://api.staging.privy.io',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * App secret authentication.
   */
  appID?: string | undefined;

  /**
   * App secret authentication.
   */
  appSecret?: string | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.privy.io`
   * - `staging` corresponds to `https://api.staging.privy.io`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['PRIVY_API_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['PRIVY_API_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Privy API API.
 */
export class PrivyAPI {
  appID: string;
  appSecret: string;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Privy API API.
   *
   * @param {string | undefined} [opts.appID=process.env['PRIVY_APP_ID'] ?? undefined]
   * @param {string | undefined} [opts.appSecret=process.env['PRIVY_APP_SECRET'] ?? undefined]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['PRIVY_API_BASE_URL'] ?? https://api.privy.io] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('PRIVY_API_BASE_URL'),
    appID = readEnv('PRIVY_APP_ID'),
    appSecret = readEnv('PRIVY_APP_SECRET'),
    ...opts
  }: ClientOptions = {}) {
    if (appID === undefined) {
      throw new Errors.PrivyAPIError(
        "The PRIVY_APP_ID environment variable is missing or empty; either provide it, or instantiate the PrivyAPI client with an appID option, like new PrivyAPI({ appID: 'My App ID' }).",
      );
    }
    if (appSecret === undefined) {
      throw new Errors.PrivyAPIError(
        "The PRIVY_APP_SECRET environment variable is missing or empty; either provide it, or instantiate the PrivyAPI client with an appSecret option, like new PrivyAPI({ appSecret: 'My App Secret' }).",
      );
    }

    const options: ClientOptions = {
      appID,
      appSecret,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (isRunningInBrowser()) {
      throw new Errors.PrivyAPIError(
        "It looks like you're running in a browser-like environment, which is disabled to protect your secret API credentials from attackers. If you have a strong business need for client-side use of this API, please open a GitHub issue with your use-case and security mitigations.",
      );
    }

    if (baseURL && opts.environment) {
      throw new Errors.PrivyAPIError(
        'Ambiguous URL; The `baseURL` option (or PRIVY_API_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    this.baseURL = options.baseURL || environments[options.environment || 'production'];
    this.timeout = options.timeout ?? PrivyAPI.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('PRIVY_API_LOG'), "process.env['PRIVY_API_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.appID = appID;
    this.appSecret = appSecret;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      environment: options.environment ? options.environment : undefined,
      baseURL: options.environment ? undefined : this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      appID: this.appID,
      appSecret: this.appSecret,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    if (!this.appID) {
      return undefined;
    }

    if (!this.appSecret) {
      return undefined;
    }

    const credentials = `${this.appID}:${this.appSecret}`;
    const Authorization = `Basic ${toBase64(credentials)}`;
    return buildHeaders([{ Authorization }]);
  }

  protected stringifyQuery(query: object | Record<string, unknown>): string {
    return stringifyQuery(query);
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText) as any;
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: PromiseOrValue<RequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page,
      opts && 'then' in opts ?
        opts.then((opts) => ({ method: 'get', path, ...opts }))
      : { method: 'get', path, ...opts },
    );
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: PromiseOrValue<FinalRequestOptions>,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as PrivyAPI, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the standard retry headers aren't set, fall back to X-RateLimit-Reset
    // which is a Unix timestamp (in seconds) indicating when the rate limit resets.
    const rateLimitResetHeader = responseHeaders?.get('x-ratelimit-reset');
    if (rateLimitResetHeader && !timeoutMillis) {
      const resetEpochSeconds = parseFloat(rateLimitResetHeader);
      if (!Number.isNaN(resetEpochSeconds)) {
        timeoutMillis = resetEpochSeconds * 1000 - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time, just do what it
    // says, but otherwise calculate a default
    if (timeoutMillis === undefined) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
        'privy-app-id': this.appID,
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private _makeAbort(controller: AbortController) {
    // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
    //       would capture all request options, and cause a memory leak.
    return () => controller.abort();
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else if (
      typeof body === 'object' &&
      headers.values.get('content-type') === 'application/x-www-form-urlencoded'
    ) {
      return {
        bodyHeaders: { 'content-type': 'application/x-www-form-urlencoded' },
        body: this.stringifyQuery(body),
      };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static PrivyAPI = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static PrivyAPIError = Errors.PrivyAPIError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  wallets: API.Wallets = new API.Wallets(this);
  /**
   * Operations related to users
   */
  users: API.Users = new API.Users(this);
  /**
   * Operations related to policies
   */
  policies: API.Policies = new API.Policies(this);
  /**
   * Operations related to transactions
   */
  transactions: API.Transactions = new API.Transactions(this);
  /**
   * Operations related to key quorums
   */
  keyQuorums: API.KeyQuorums = new API.KeyQuorums(this);
  intents: API.Intents = new API.Intents(this);
  /**
   * Operations related to app settings and allowlist management
   */
  apps: API.Apps = new API.Apps(this);
  clientAuth: API.ClientAuth = new API.ClientAuth(this);
  shared: API.Shared = new API.Shared(this);
  walletActions: API.WalletActions = new API.WalletActions(this);
  analytics: API.Analytics = new API.Analytics(this);
  embeddedWallets: API.EmbeddedWallets = new API.EmbeddedWallets(this);
  funding: API.Funding = new API.Funding(this);
  aggregations: API.Aggregations = new API.Aggregations(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  accounts: API.Accounts = new API.Accounts(this);
  yield: API.Yield = new API.Yield(this);
  swaps: API.Swaps = new API.Swaps(this);
  krakenEmbed: API.KrakenEmbed = new API.KrakenEmbed(this);
  crossApp: API.CrossApp = new API.CrossApp(this);
}

PrivyAPI.Wallets = Wallets;
PrivyAPI.Users = Users;
PrivyAPI.Policies = Policies;
PrivyAPI.Transactions = Transactions;
PrivyAPI.KeyQuorums = KeyQuorums;
PrivyAPI.Intents = Intents;
PrivyAPI.Apps = Apps;
PrivyAPI.ClientAuth = ClientAuth;
PrivyAPI.Shared = Shared;
PrivyAPI.WalletActions = WalletActions;
PrivyAPI.Analytics = Analytics;
PrivyAPI.EmbeddedWallets = EmbeddedWallets;
PrivyAPI.Funding = Funding;
PrivyAPI.Aggregations = Aggregations;
PrivyAPI.Webhooks = Webhooks;
PrivyAPI.Accounts = Accounts;
PrivyAPI.Yield = Yield;
PrivyAPI.Swaps = Swaps;
PrivyAPI.KrakenEmbed = KrakenEmbed;
PrivyAPI.CrossApp = CrossApp;

export declare namespace PrivyAPI {
  export type RequestOptions = Opts.RequestOptions;

  export import Cursor = Pagination.Cursor;
  export { type CursorParams as CursorParams, type CursorResponse as CursorResponse };

  export {
    Wallets as Wallets,
    type CurveSigningChainType as CurveSigningChainType,
    type ExtendedChainType as ExtendedChainType,
    type FirstClassChainType as FirstClassChainType,
    type WalletChainType as WalletChainType,
    type WalletCustodian as WalletCustodian,
    type CustodialWalletProvider as CustodialWalletProvider,
    type CustodialWalletChainType as CustodialWalletChainType,
    type CustodialWalletCreateInput as CustodialWalletCreateInput,
    type CustodialWallet as CustodialWallet,
    type SuiCommandName as SuiCommandName,
    type HpkeEncryption as HpkeEncryption,
    type RecipientPublicKey as RecipientPublicKey,
    type ExportType as ExportType,
    type PrivateKeyExportInput as PrivateKeyExportInput,
    type PrivateKeyExportResponse as PrivateKeyExportResponse,
    type WalletImportSupportedChains as WalletImportSupportedChains,
    type WalletImportSupportedEntropyTypes as WalletImportSupportedEntropyTypes,
    type WalletImportInitResponse as WalletImportInitResponse,
    type HpkeAeadAlgorithm as HpkeAeadAlgorithm,
    type HpkeImportConfig as HpkeImportConfig,
    type ExportPrivateKeyRpcInput as ExportPrivateKeyRpcInput,
    type ExportPrivateKeyRpcResponse as ExportPrivateKeyRpcResponse,
    type RawSignHashParams as RawSignHashParams,
    type RawSignBytesEncoding as RawSignBytesEncoding,
    type RawSignBytesHashFunction as RawSignBytesHashFunction,
    type RawSignBytesParams as RawSignBytesParams,
    type RawSignInputParams as RawSignInputParams,
    type RawSignInput as RawSignInput,
    type RawSignResponseData as RawSignResponseData,
    type RawSignResponse as RawSignResponse,
    type EthereumPersonalSignRpcInputParams as EthereumPersonalSignRpcInputParams,
    type EthereumPersonalSignRpcInput as EthereumPersonalSignRpcInput,
    type EthereumSignTransactionRpcInputParams as EthereumSignTransactionRpcInputParams,
    type EthereumSignTransactionRpcInput as EthereumSignTransactionRpcInput,
    type EthereumSendTransactionRpcInputParams as EthereumSendTransactionRpcInputParams,
    type EthereumSendTransactionRpcInput as EthereumSendTransactionRpcInput,
    type EthereumTypedDataInput as EthereumTypedDataInput,
    type EthereumSignTypedDataRpcInputParams as EthereumSignTypedDataRpcInputParams,
    type EthereumSignTypedDataRpcInput as EthereumSignTypedDataRpcInput,
    type EthereumSecp256k1SignRpcInputParams as EthereumSecp256k1SignRpcInputParams,
    type EthereumSecp256k1SignRpcInput as EthereumSecp256k1SignRpcInput,
    type EthereumSign7702AuthorizationRpcInputParams as EthereumSign7702AuthorizationRpcInputParams,
    type EthereumSign7702AuthorizationRpcInput as EthereumSign7702AuthorizationRpcInput,
    type EthereumSignUserOperationRpcInputParams as EthereumSignUserOperationRpcInputParams,
    type EthereumSignUserOperationRpcInput as EthereumSignUserOperationRpcInput,
    type EthereumRpcInput as EthereumRpcInput,
    type EthereumPersonalSignRpcResponseData as EthereumPersonalSignRpcResponseData,
    type EthereumPersonalSignRpcResponse as EthereumPersonalSignRpcResponse,
    type EthereumSignTransactionRpcResponseData as EthereumSignTransactionRpcResponseData,
    type EthereumSignTransactionRpcResponse as EthereumSignTransactionRpcResponse,
    type EthereumSendTransactionRpcResponseData as EthereumSendTransactionRpcResponseData,
    type EthereumSendTransactionRpcResponse as EthereumSendTransactionRpcResponse,
    type EthereumSignTypedDataRpcResponseData as EthereumSignTypedDataRpcResponseData,
    type EthereumSignTypedDataRpcResponse as EthereumSignTypedDataRpcResponse,
    type EthereumSecp256k1SignRpcResponseData as EthereumSecp256k1SignRpcResponseData,
    type EthereumSecp256k1SignRpcResponse as EthereumSecp256k1SignRpcResponse,
    type EthereumSign7702AuthorizationRpcResponseData as EthereumSign7702AuthorizationRpcResponseData,
    type EthereumSign7702AuthorizationRpcResponse as EthereumSign7702AuthorizationRpcResponse,
    type EthereumSignUserOperationRpcResponseData as EthereumSignUserOperationRpcResponseData,
    type EthereumSignUserOperationRpcResponse as EthereumSignUserOperationRpcResponse,
    type EthereumRpcResponse as EthereumRpcResponse,
    type SolanaSignTransactionRpcInputParams as SolanaSignTransactionRpcInputParams,
    type SolanaSignTransactionRpcInput as SolanaSignTransactionRpcInput,
    type SolanaSignAndSendTransactionRpcInputParams as SolanaSignAndSendTransactionRpcInputParams,
    type SolanaSignAndSendTransactionRpcInput as SolanaSignAndSendTransactionRpcInput,
    type SolanaSignMessageRpcInputParams as SolanaSignMessageRpcInputParams,
    type SolanaSignMessageRpcInput as SolanaSignMessageRpcInput,
    type SolanaRpcInput as SolanaRpcInput,
    type SolanaSignTransactionRpcResponseData as SolanaSignTransactionRpcResponseData,
    type SolanaSignTransactionRpcResponse as SolanaSignTransactionRpcResponse,
    type SolanaSignAndSendTransactionRpcResponseData as SolanaSignAndSendTransactionRpcResponseData,
    type SolanaSignAndSendTransactionRpcResponse as SolanaSignAndSendTransactionRpcResponse,
    type SolanaSignMessageRpcResponseData as SolanaSignMessageRpcResponseData,
    type SolanaSignMessageRpcResponse as SolanaSignMessageRpcResponse,
    type SolanaRpcResponse as SolanaRpcResponse,
    type SparkNetwork as SparkNetwork,
    type SparkSigningKeyshare as SparkSigningKeyshare,
    type SparkWalletLeaf as SparkWalletLeaf,
    type SparkTransferLeaf as SparkTransferLeaf,
    type SparkTransfer as SparkTransfer,
    type SparkUserTokenMetadata as SparkUserTokenMetadata,
    type SparkTokenBalance as SparkTokenBalance,
    type SparkBalance as SparkBalance,
    type TokenOutput as TokenOutput,
    type OutputWithPreviousTransactionData as OutputWithPreviousTransactionData,
    type SparkLightningFee as SparkLightningFee,
    type SparkLightningReceiveRequest as SparkLightningReceiveRequest,
    type SparkLightningSendRequest as SparkLightningSendRequest,
    type SparkTransferRpcInputParams as SparkTransferRpcInputParams,
    type SparkTransferRpcInput as SparkTransferRpcInput,
    type SparkGetBalanceRpcInput as SparkGetBalanceRpcInput,
    type SparkOutputSelectionStrategy as SparkOutputSelectionStrategy,
    type SparkTransferTokensRpcInputParams as SparkTransferTokensRpcInputParams,
    type SparkTransferTokensRpcInput as SparkTransferTokensRpcInput,
    type SparkGetStaticDepositAddressRpcInput as SparkGetStaticDepositAddressRpcInput,
    type SparkGetClaimStaticDepositQuoteRpcInputParams as SparkGetClaimStaticDepositQuoteRpcInputParams,
    type SparkGetClaimStaticDepositQuoteRpcInput as SparkGetClaimStaticDepositQuoteRpcInput,
    type SparkClaimStaticDepositRpcInputParams as SparkClaimStaticDepositRpcInputParams,
    type SparkClaimStaticDepositRpcInput as SparkClaimStaticDepositRpcInput,
    type SparkCreateLightningInvoiceRpcInputParams as SparkCreateLightningInvoiceRpcInputParams,
    type SparkCreateLightningInvoiceRpcInput as SparkCreateLightningInvoiceRpcInput,
    type SparkPayLightningInvoiceRpcInputParams as SparkPayLightningInvoiceRpcInputParams,
    type SparkPayLightningInvoiceRpcInput as SparkPayLightningInvoiceRpcInput,
    type SparkSignMessageWithIdentityKeyRpcInputParams as SparkSignMessageWithIdentityKeyRpcInputParams,
    type SparkSignMessageWithIdentityKeyRpcInput as SparkSignMessageWithIdentityKeyRpcInput,
    type SparkRpcInput as SparkRpcInput,
    type SparkTransferRpcResponse as SparkTransferRpcResponse,
    type SparkGetBalanceRpcResponse as SparkGetBalanceRpcResponse,
    type SparkTransferTokensRpcResponseData as SparkTransferTokensRpcResponseData,
    type SparkTransferTokensRpcResponse as SparkTransferTokensRpcResponse,
    type SparkGetStaticDepositAddressRpcResponseData as SparkGetStaticDepositAddressRpcResponseData,
    type SparkGetStaticDepositAddressRpcResponse as SparkGetStaticDepositAddressRpcResponse,
    type SparkGetClaimStaticDepositQuoteRpcResponseData as SparkGetClaimStaticDepositQuoteRpcResponseData,
    type SparkGetClaimStaticDepositQuoteRpcResponse as SparkGetClaimStaticDepositQuoteRpcResponse,
    type SparkClaimStaticDepositRpcResponseData as SparkClaimStaticDepositRpcResponseData,
    type SparkClaimStaticDepositRpcResponse as SparkClaimStaticDepositRpcResponse,
    type SparkCreateLightningInvoiceRpcResponse as SparkCreateLightningInvoiceRpcResponse,
    type SparkPayLightningInvoiceRpcResponse as SparkPayLightningInvoiceRpcResponse,
    type SparkSignMessageWithIdentityKeyRpcResponseData as SparkSignMessageWithIdentityKeyRpcResponseData,
    type SparkSignMessageWithIdentityKeyRpcResponse as SparkSignMessageWithIdentityKeyRpcResponse,
    type SparkRpcResponse as SparkRpcResponse,
    type Wallet as Wallet,
    type GetByWalletAddressRequestBody as GetByWalletAddressRequestBody,
    type WalletUpdateRequestBody as WalletUpdateRequestBody,
    type WalletBatchItemInput as WalletBatchItemInput,
    type WalletBatchCreateInput as WalletBatchCreateInput,
    type WalletBatchCreateResult as WalletBatchCreateResult,
    type WalletBatchCreateResponse as WalletBatchCreateResponse,
    type WalletRpcRequestBody as WalletRpcRequestBody,
    type WalletRpcResponse as WalletRpcResponse,
    type WalletAuthenticateRequestBody as WalletAuthenticateRequestBody,
    type TokenTransferSource as TokenTransferSource,
    type TokenTransferDestination as TokenTransferDestination,
    type CreateTokenTransferRequest as CreateTokenTransferRequest,
    type WalletAuthorizationHeaders as WalletAuthorizationHeaders,
    type WalletExportResponse as WalletExportResponse,
    type WalletInitImportResponse as WalletInitImportResponse,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletListParams as WalletListParams,
    type WalletExportParams as WalletExportParams,
    type WalletInitImportParams as WalletInitImportParams,
    type WalletRawSignParams as WalletRawSignParams,
    type WalletRpcParams as WalletRpcParams,
    type WalletSubmitImportParams as WalletSubmitImportParams,
    type WalletUpdateParams as WalletUpdateParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
  };

  export {
    Users as Users,
    type LinkedAccountEmail as LinkedAccountEmail,
    type LinkedAccountPhone as LinkedAccountPhone,
    type LinkedAccountBaseWallet as LinkedAccountBaseWallet,
    type LinkedAccountEthereum as LinkedAccountEthereum,
    type LinkedAccountSmartWallet as LinkedAccountSmartWallet,
    type LinkedAccountSolana as LinkedAccountSolana,
    type LinkedAccountFarcaster as LinkedAccountFarcaster,
    type LinkedAccountPasskey as LinkedAccountPasskey,
    type LinkedAccountTelegram as LinkedAccountTelegram,
    type EmbeddedWalletRecoveryMethod as EmbeddedWalletRecoveryMethod,
    type LinkedAccountEthereumEmbeddedWallet as LinkedAccountEthereumEmbeddedWallet,
    type LinkedAccountSolanaEmbeddedWallet as LinkedAccountSolanaEmbeddedWallet,
    type LinkedAccountBitcoinSegwitEmbeddedWallet as LinkedAccountBitcoinSegwitEmbeddedWallet,
    type LinkedAccountBitcoinTaprootEmbeddedWallet as LinkedAccountBitcoinTaprootEmbeddedWallet,
    type LinkedAccountCurveSigningEmbeddedWallet as LinkedAccountCurveSigningEmbeddedWallet,
    type LinkedAccountEmbeddedWallet as LinkedAccountEmbeddedWallet,
    type LinkedAccountEmbeddedWalletWithID as LinkedAccountEmbeddedWalletWithID,
    type LinkedAccountGoogleOAuth as LinkedAccountGoogleOAuth,
    type LinkedAccountTwitterOAuth as LinkedAccountTwitterOAuth,
    type LinkedAccountDiscordOAuth as LinkedAccountDiscordOAuth,
    type LinkedAccountGitHubOAuth as LinkedAccountGitHubOAuth,
    type LinkedAccountLinkedInOAuth as LinkedAccountLinkedInOAuth,
    type LinkedAccountSpotifyOAuth as LinkedAccountSpotifyOAuth,
    type LinkedAccountInstagramOAuth as LinkedAccountInstagramOAuth,
    type LinkedAccountTiktokOAuth as LinkedAccountTiktokOAuth,
    type LinkedAccountLineOAuth as LinkedAccountLineOAuth,
    type LinkedAccountTwitchOAuth as LinkedAccountTwitchOAuth,
    type LinkedAccountAppleOAuth as LinkedAccountAppleOAuth,
    type LinkedAccountCustomOAuth as LinkedAccountCustomOAuth,
    type LinkedAccountCustomJwt as LinkedAccountCustomJwt,
    type CrossAppEmbeddedWallet as CrossAppEmbeddedWallet,
    type CrossAppSmartWallet as CrossAppSmartWallet,
    type LinkedAccountCrossApp as LinkedAccountCrossApp,
    type LinkedAccountAuthorizationKey as LinkedAccountAuthorizationKey,
    type LinkedAccount as LinkedAccount,
    type LinkedAccountType as LinkedAccountType,
    type SMSMfaMethod as SMSMfaMethod,
    type TotpMfaMethod as TotpMfaMethod,
    type PasskeyMfaMethod as PasskeyMfaMethod,
    type LinkedMfaMethod as LinkedMfaMethod,
    type CustomMetadata as CustomMetadata,
    type User as User,
    type LinkedAccountWalletInput as LinkedAccountWalletInput,
    type LinkedAccountEmailInput as LinkedAccountEmailInput,
    type LinkedAccountPhoneInput as LinkedAccountPhoneInput,
    type LinkedAccountGoogleInput as LinkedAccountGoogleInput,
    type LinkedAccountTwitterInput as LinkedAccountTwitterInput,
    type LinkedAccountDiscordInput as LinkedAccountDiscordInput,
    type LinkedAccountGitHubInput as LinkedAccountGitHubInput,
    type LinkedAccountSpotifyInput as LinkedAccountSpotifyInput,
    type LinkedAccountInstagramInput as LinkedAccountInstagramInput,
    type LinkedAccountTiktokInput as LinkedAccountTiktokInput,
    type LinkedAccountLineInput as LinkedAccountLineInput,
    type LinkedAccountTwitchInput as LinkedAccountTwitchInput,
    type LinkedAccountAppleInput as LinkedAccountAppleInput,
    type LinkedAccountLinkedInInput as LinkedAccountLinkedInInput,
    type LinkedAccountFarcasterInput as LinkedAccountFarcasterInput,
    type LinkedAccountTelegramInput as LinkedAccountTelegramInput,
    type LinkedAccountCustomJwtInput as LinkedAccountCustomJwtInput,
    type LinkedAccountPasskeyInput as LinkedAccountPasskeyInput,
    type LinkedAccountInput as LinkedAccountInput,
    type UserBatchCreateInput as UserBatchCreateInput,
    type OAuthTokens as OAuthTokens,
    type UserWithIdentityToken as UserWithIdentityToken,
    type AuthenticatedUser as AuthenticatedUser,
    type UsersCursor as UsersCursor,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
    type UserGetByCustomAuthIDParams as UserGetByCustomAuthIDParams,
    type UserGetByDiscordUsernameParams as UserGetByDiscordUsernameParams,
    type UserGetByEmailAddressParams as UserGetByEmailAddressParams,
    type UserGetByFarcasterIDParams as UserGetByFarcasterIDParams,
    type UserGetByGitHubUsernameParams as UserGetByGitHubUsernameParams,
    type UserGetByPhoneNumberParams as UserGetByPhoneNumberParams,
    type UserGetBySmartWalletAddressParams as UserGetBySmartWalletAddressParams,
    type UserGetByTelegramUserIDParams as UserGetByTelegramUserIDParams,
    type UserGetByTelegramUsernameParams as UserGetByTelegramUsernameParams,
    type UserGetByTwitterSubjectParams as UserGetByTwitterSubjectParams,
    type UserGetByTwitterUsernameParams as UserGetByTwitterUsernameParams,
    type UserGetByWalletAddressParams as UserGetByWalletAddressParams,
    type UserPregenerateWalletsParams as UserPregenerateWalletsParams,
    type UserSearchParams as UserSearchParams,
    type UserSetCustomMetadataParams as UserSetCustomMetadataParams,
    type UserUnlinkLinkedAccountParams as UserUnlinkLinkedAccountParams,
  };

  export {
    Policies as Policies,
    type ConditionSetRequestParams as ConditionSetRequestParams,
    type ConditionSetItemRequestParams as ConditionSetItemRequestParams,
    type ConditionSetRequestBody as ConditionSetRequestBody,
    type ConditionSet as ConditionSet,
    type UpdateConditionSetRequestBody as UpdateConditionSetRequestBody,
    type ConditionSetItemValueInput as ConditionSetItemValueInput,
    type ConditionSetItemsRequestBody as ConditionSetItemsRequestBody,
    type ConditionSetItem as ConditionSetItem,
    type ConditionSetItems as ConditionSetItems,
    type ConditionSetItemsResponse as ConditionSetItemsResponse,
    type SuiTransactionCommandOperator as SuiTransactionCommandOperator,
    type SuiTransferObjectsCommandField as SuiTransferObjectsCommandField,
    type TronTransactionCondition as TronTransactionCondition,
    type SuiTransactionCommandCondition as SuiTransactionCommandCondition,
    type SuiTransferObjectsCommandCondition as SuiTransferObjectsCommandCondition,
    type Policy as Policy,
    type PolicyAuthorizationHeaders as PolicyAuthorizationHeaders,
    type ConditionSetAuthorizationHeaders as ConditionSetAuthorizationHeaders,
    type PolicyCreateRuleResponse as PolicyCreateRuleResponse,
    type PolicyUpdateRuleResponse as PolicyUpdateRuleResponse,
    type PolicyGetRuleResponse as PolicyGetRuleResponse,
    type PolicyCreateParams as PolicyCreateParams,
    type PolicyCreateRuleParams as PolicyCreateRuleParams,
    type PolicyDeleteParams as PolicyDeleteParams,
    type PolicyDeleteRuleParams as PolicyDeleteRuleParams,
    type PolicyUpdateParams as PolicyUpdateParams,
    type PolicyUpdateRuleParams as PolicyUpdateRuleParams,
    type PolicyGetRuleParams as PolicyGetRuleParams,
  };

  export {
    Transactions as Transactions,
    type TransactionScanningMetadata as TransactionScanningMetadata,
    type TransactionScanningRpcRequest as TransactionScanningRpcRequest,
    type TransactionScanningRequestBody as TransactionScanningRequestBody,
    type TransactionScanningValidationErrorResult as TransactionScanningValidationErrorResult,
    type TransactionScanningValidationSuccessResult as TransactionScanningValidationSuccessResult,
    type TransactionScanningValidationResult as TransactionScanningValidationResult,
    type TransactionScanningAssetInfo as TransactionScanningAssetInfo,
    type TransactionScanningAssetValue as TransactionScanningAssetValue,
    type TransactionScanningAssetDiff as TransactionScanningAssetDiff,
    type TransactionScanningExposure as TransactionScanningExposure,
    type TransactionScanningCalldata as TransactionScanningCalldata,
    type TransactionScanningParams as TransactionScanningParams,
    type TransactionScanningSimulationErrorResult as TransactionScanningSimulationErrorResult,
    type TransactionScanningSimulationSuccessResult as TransactionScanningSimulationSuccessResult,
    type TransactionScanningSimulationResult as TransactionScanningSimulationResult,
    type TransactionScanningResponseBody as TransactionScanningResponseBody,
    type TransactionGetResponse as TransactionGetResponse,
  };

  export {
    KeyQuorums as KeyQuorums,
    type KeyQuorum as KeyQuorum,
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
    type KeyQuorumAuthorizationHeaders as KeyQuorumAuthorizationHeaders,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
  };

  export {
    Intents as Intents,
    type IntentType as IntentType,
    type IntentStatus as IntentStatus,
    type RpcIntentRequestDetails as RpcIntentRequestDetails,
    type PolicyIntentRequestDetails as PolicyIntentRequestDetails,
    type RuleIntentCreateRequestDetails as RuleIntentCreateRequestDetails,
    type RuleIntentUpdateRequestDetails as RuleIntentUpdateRequestDetails,
    type RuleIntentDeleteRequestDetails as RuleIntentDeleteRequestDetails,
    type RuleIntentRequestDetails as RuleIntentRequestDetails,
    type IntentAuthorizationKeyQuorumMember as IntentAuthorizationKeyQuorumMember,
    type IntentAuthorizationMember as IntentAuthorizationMember,
    type IntentAuthorization as IntentAuthorization,
    type BaseActionResult as BaseActionResult,
    type RpcIntentResponse as RpcIntentResponse,
    type WalletIntentResponse as WalletIntentResponse,
    type PolicyIntentResponse as PolicyIntentResponse,
    type KeyQuorumIntentResponse as KeyQuorumIntentResponse,
    type RuleIntentResponse as RuleIntentResponse,
    type IntentResponse as IntentResponse,
    type IntentCreationHeaders as IntentCreationHeaders,
    type IntentResponsesCursor as IntentResponsesCursor,
    type IntentListParams as IntentListParams,
    type IntentCreatePolicyRuleParams as IntentCreatePolicyRuleParams,
    type IntentDeletePolicyRuleParams as IntentDeletePolicyRuleParams,
    type IntentRpcParams as IntentRpcParams,
    type IntentUpdateKeyQuorumParams as IntentUpdateKeyQuorumParams,
    type IntentUpdatePolicyParams as IntentUpdatePolicyParams,
    type IntentUpdatePolicyRuleParams as IntentUpdatePolicyRuleParams,
    type IntentUpdateWalletParams as IntentUpdateWalletParams,
  };

  export {
    Apps as Apps,
    type Caip2 as Caip2,
    type CurrencyAsset as CurrencyAsset,
    type Currency as Currency,
    type EmbeddedWalletCreateOnLogin as EmbeddedWalletCreateOnLogin,
    type EmbeddedWalletChainConfig as EmbeddedWalletChainConfig,
    type UserOwnedRecoveryOption as UserOwnedRecoveryOption,
    type EmbeddedWalletInputSchema as EmbeddedWalletInputSchema,
    type EmbeddedWalletMode as EmbeddedWalletMode,
    type EmbeddedWalletConfigSchema as EmbeddedWalletConfigSchema,
    type TelegramAuthConfigSchema as TelegramAuthConfigSchema,
    type FundingMethodEnum as FundingMethodEnum,
    type FundingOption as FundingOption,
    type FundingConfigResponseSchema as FundingConfigResponseSchema,
    type AppResponse as AppResponse,
    type EmailInviteInput as EmailInviteInput,
    type WalletInviteInput as WalletInviteInput,
    type PhoneInviteInput as PhoneInviteInput,
    type UserInviteInput as UserInviteInput,
    type AllowlistEntry as AllowlistEntry,
    type AllowlistDeletionResponse as AllowlistDeletionResponse,
    type TestAccount as TestAccount,
    type TestAccountsResponse as TestAccountsResponse,
    type GasSponsorshipConfigurationInput as GasSponsorshipConfigurationInput,
    type GasSponsorshipConfiguration as GasSponsorshipConfiguration,
  };

  export {
    ClientAuth as ClientAuth,
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type OAuthProviderID as OAuthProviderID,
    type BridgeOnrampProvider as BridgeOnrampProvider,
    type OnrampProvider as OnrampProvider,
    type PasskeyCredPropsResult as PasskeyCredPropsResult,
    type PasskeyClientExtensionResults as PasskeyClientExtensionResults,
    type PasskeyCredentialDescriptor as PasskeyCredentialDescriptor,
    type PasskeyRelyingParty as PasskeyRelyingParty,
    type PasskeyUser as PasskeyUser,
    type PasskeyPubKeyCredParam as PasskeyPubKeyCredParam,
    type PasskeyAuthenticatorSelection as PasskeyAuthenticatorSelection,
    type PasskeyEnrollmentExtensions as PasskeyEnrollmentExtensions,
    type PasskeyAttestationResponse as PasskeyAttestationResponse,
    type PasskeyAuthenticatorEnrollmentOptions as PasskeyAuthenticatorEnrollmentOptions,
    type PasskeyAuthenticatorEnrollmentResponse as PasskeyAuthenticatorEnrollmentResponse,
    type ResponsePasskeyInitLink as ResponsePasskeyInitLink,
    type ResponsePasskeyInitRegister as ResponsePasskeyInitRegister,
    type PasskeyLinkInput as PasskeyLinkInput,
    type PasskeyRegisterInput as PasskeyRegisterInput,
    type PasskeyInitInput as PasskeyInitInput,
    type UnlinkPasskeyInput as UnlinkPasskeyInput,
    type PasskeyVerifyExtensions as PasskeyVerifyExtensions,
    type PasskeyAssertionResponse as PasskeyAssertionResponse,
    type PasskeyAuthenticatorVerifyOptions as PasskeyAuthenticatorVerifyOptions,
    type PasskeyAuthenticatorVerifyResponse as PasskeyAuthenticatorVerifyResponse,
    type ResponsePasskeyInitAuthenticate as ResponsePasskeyInitAuthenticate,
    type PasskeyAuthenticateInput as PasskeyAuthenticateInput,
    type PasswordlessLinkRequestBody as PasswordlessLinkRequestBody,
    type PasswordlessInitRequestBody as PasswordlessInitRequestBody,
    type PasswordlessUnlinkRequestBody as PasswordlessUnlinkRequestBody,
    type PasswordlessUpdateRequestBody as PasswordlessUpdateRequestBody,
    type PasswordlessAuthenticateRequestBody as PasswordlessAuthenticateRequestBody,
    type PasswordlessTransferRequestBody as PasswordlessTransferRequestBody,
    type PasswordlessSMSLinkRequestBody as PasswordlessSMSLinkRequestBody,
    type PasswordlessSMSInitRequestBody as PasswordlessSMSInitRequestBody,
    type PasswordlessSMSUnlinkRequestBody as PasswordlessSMSUnlinkRequestBody,
    type PasswordlessSMSUpdateRequestBody as PasswordlessSMSUpdateRequestBody,
    type PasswordlessSMSAuthenticateRequestBody as PasswordlessSMSAuthenticateRequestBody,
    type PasswordlessSMSTransferRequestBody as PasswordlessSMSTransferRequestBody,
    type AuthenticateJwtInput as AuthenticateJwtInput,
    type LinkJwtInput as LinkJwtInput,
    type CustomJwtAuthenticateRequestBody as CustomJwtAuthenticateRequestBody,
    type CustomJwtLinkRequestBody as CustomJwtLinkRequestBody,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type BridgeFiatRejectionReason as BridgeFiatRejectionReason,
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type FiatCustomerResponse as FiatCustomerResponse,
    type FiatCurrencyCode as FiatCurrencyCode,
    type CryptoCurrencyCode as CryptoCurrencyCode,
    type Caip2ChainID as Caip2ChainID,
    type FiatAmount as FiatAmount,
    type FiatOnrampSource as FiatOnrampSource,
    type FiatOnrampDestination as FiatOnrampDestination,
    type FiatOnrampEnvironment as FiatOnrampEnvironment,
    type FiatOnrampProvider as FiatOnrampProvider,
    type GetFiatOnrampQuotesInput as GetFiatOnrampQuotesInput,
    type FiatOnrampQuote as FiatOnrampQuote,
    type FiatOnrampProviderError as FiatOnrampProviderError,
    type GetFiatOnrampQuotesResponse as GetFiatOnrampQuotesResponse,
    type GetFiatOnrampURLInput as GetFiatOnrampURLInput,
    type GetFiatOnrampURLResponse as GetFiatOnrampURLResponse,
    type FiatOnrampTransactionStatus as FiatOnrampTransactionStatus,
    type GetFiatOnrampTransactionStatusInput as GetFiatOnrampTransactionStatusInput,
    type GetFiatOnrampTransactionStatusResponse as GetFiatOnrampTransactionStatusResponse,
    type BridgeDestinationAsset as BridgeDestinationAsset,
    type BridgeSourceAsset as BridgeSourceAsset,
    type BridgeFiatVirtualAccountSource as BridgeFiatVirtualAccountSource,
    type BridgeFiatVirtualAccountDestination as BridgeFiatVirtualAccountDestination,
    type BridgeFiatVirtualAccountRequest as BridgeFiatVirtualAccountRequest,
    type BridgeSandboxFiatVirtualAccountRequest as BridgeSandboxFiatVirtualAccountRequest,
    type FiatVirtualAccountRequest as FiatVirtualAccountRequest,
    type BridgeUsdFiatVirtualAccountDepositInstructions as BridgeUsdFiatVirtualAccountDepositInstructions,
    type BridgeEurFiatVirtualAccountDepositInstructions as BridgeEurFiatVirtualAccountDepositInstructions,
    type BridgeMxnFiatVirtualAccountDepositInstructions as BridgeMxnFiatVirtualAccountDepositInstructions,
    type BridgeBrlFiatVirtualAccountDepositInstructions as BridgeBrlFiatVirtualAccountDepositInstructions,
    type BridgeGbpFiatVirtualAccountDepositInstructions as BridgeGbpFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDepositInstructions as BridgeFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountResponse as BridgeFiatVirtualAccountResponse,
    type BridgeSandboxFiatVirtualAccountResponse as BridgeSandboxFiatVirtualAccountResponse,
    type FiatVirtualAccountResponse as FiatVirtualAccountResponse,
    type GuestAuthenticateRequestBody as GuestAuthenticateRequestBody,
    type OAuthCodeType as OAuthCodeType,
    type OAuthInitRequestBody as OAuthInitRequestBody,
    type OAuthInitResponseBody as OAuthInitResponseBody,
    type OAuthAuthenticateRequestBody as OAuthAuthenticateRequestBody,
    type OAuthLinkRequestBody as OAuthLinkRequestBody,
    type OAuthUnlinkRequestBody as OAuthUnlinkRequestBody,
    type OAuthLinkResponseBody as OAuthLinkResponseBody,
    type OAuthTransferUserInfoMeta as OAuthTransferUserInfoMeta,
    type OAuthTransferUserInfo as OAuthTransferUserInfo,
    type OAuthTransferRequestBody as OAuthTransferRequestBody,
    type OAuthAuthorizationCodeRequestBody as OAuthAuthorizationCodeRequestBody,
    type OAuthVerifyRequestBody as OAuthVerifyRequestBody,
    type OAuthVerifyResponseBody as OAuthVerifyResponseBody,
    type SiweInput as SiweInput,
    type SmartWalletSiweInput as SmartWalletSiweInput,
    type AuthenticateSiweInput as AuthenticateSiweInput,
    type SiweAddressInput as SiweAddressInput,
    type SiweInitInput as SiweInitInput,
    type SiweNonce as SiweNonce,
    type TransferSiweInput as TransferSiweInput,
    type SiweInitRequestBody as SiweInitRequestBody,
    type SiweInitResponseBody as SiweInitResponseBody,
    type SiweAuthenticateRequestBody as SiweAuthenticateRequestBody,
    type SiweLinkRequestBody as SiweLinkRequestBody,
    type SiweLinkSmartWalletRequestBody as SiweLinkSmartWalletRequestBody,
    type SiweUnlinkRequestBody as SiweUnlinkRequestBody,
    type SiwsInput as SiwsInput,
    type AuthenticateSiwsInput as AuthenticateSiwsInput,
    type SiwsAddressInput as SiwsAddressInput,
    type SiwsInitInput as SiwsInitInput,
    type SiwsNonce as SiwsNonce,
    type TransferSiwsInput as TransferSiwsInput,
    type SiwsInitRequestBody as SiwsInitRequestBody,
    type SiwsInitResponseBody as SiwsInitResponseBody,
    type SiwsAuthenticateRequestBody as SiwsAuthenticateRequestBody,
    type SiwsLinkRequestBody as SiwsLinkRequestBody,
    type SiwsUnlinkRequestBody as SiwsUnlinkRequestBody,
    type TelegramAuthResult as TelegramAuthResult,
    type TelegramWebAppData as TelegramWebAppData,
    type TelegramAuthenticateInput as TelegramAuthenticateInput,
    type TelegramUnlinkInput as TelegramUnlinkInput,
    type TransferTelegramInput as TransferTelegramInput,
    type TelegramAuthenticateRequestBody as TelegramAuthenticateRequestBody,
    type TelegramLinkRequestBody as TelegramLinkRequestBody,
    type TelegramUnlinkRequestBody as TelegramUnlinkRequestBody,
    type FarcasterConnectInitResponse as FarcasterConnectInitResponse,
    type FarcasterConnectStatusCompletedResponse as FarcasterConnectStatusCompletedResponse,
    type FarcasterConnectStatusPendingResponse as FarcasterConnectStatusPendingResponse,
    type FarcasterAuthenticateInput as FarcasterAuthenticateInput,
    type FarcasterLinkInput as FarcasterLinkInput,
    type FarcasterInitInput as FarcasterInitInput,
    type FarcasterUnlinkInput as FarcasterUnlinkInput,
    type TransferFarcasterInput as TransferFarcasterInput,
    type FarcasterV2InitInput as FarcasterV2InitInput,
    type FarcasterV2InitResponse as FarcasterV2InitResponse,
    type FarcasterV2AuthenticateInput as FarcasterV2AuthenticateInput,
    type FarcasterAuthenticateRequestBody as FarcasterAuthenticateRequestBody,
    type FarcasterConnectStatusCompletedResponseBody as FarcasterConnectStatusCompletedResponseBody,
    type FarcasterConnectStatusPendingResponseBody as FarcasterConnectStatusPendingResponseBody,
    type FarcasterUnlinkRequestBody as FarcasterUnlinkRequestBody,
    type FarcasterInitRequestBody as FarcasterInitRequestBody,
    type FarcasterConnectInitResponseBody as FarcasterConnectInitResponseBody,
    type FarcasterLinkRequestBody as FarcasterLinkRequestBody,
    type FarcasterV2InitRequestBody as FarcasterV2InitRequestBody,
    type FarcasterV2InitResponseBody as FarcasterV2InitResponseBody,
    type FarcasterV2AuthenticateRequestBody as FarcasterV2AuthenticateRequestBody,
    type FarcasterSignerInitRequestBody as FarcasterSignerInitRequestBody,
    type FarcasterSignerInitPendingApproval as FarcasterSignerInitPendingApproval,
    type FarcasterSignerApproved as FarcasterSignerApproved,
    type FarcasterSignerRevoked as FarcasterSignerRevoked,
    type FarcasterSignerStatusPendingApproval as FarcasterSignerStatusPendingApproval,
    type FarcasterSignerInitResponseBody as FarcasterSignerInitResponseBody,
    type FarcasterSignerStatusResponseBody as FarcasterSignerStatusResponseBody,
    type OptionalRefreshTokenInput as OptionalRefreshTokenInput,
    type MfaVerifyResponseBody as MfaVerifyResponseBody,
    type MfaSMSInitVerifyInput as MfaSMSInitVerifyInput,
    type MfaSMSInitEnrollInput as MfaSMSInitEnrollInput,
    type MfaSMSInitRequestBody as MfaSMSInitRequestBody,
    type MfaSMSEnrollRequestBody as MfaSMSEnrollRequestBody,
    type MfaSMSVerifyRequestBody as MfaSMSVerifyRequestBody,
    type MfaTotpInput as MfaTotpInput,
    type MfaTotpInitResponseBody as MfaTotpInitResponseBody,
    type MfaPasskeyInitRequestBody as MfaPasskeyInitRequestBody,
    type MfaPasskeyInitResponseBody as MfaPasskeyInitResponseBody,
    type MfaPasskeyVerifyRequestBody as MfaPasskeyVerifyRequestBody,
    type MfaPasskeyEnrollmentRequestBody as MfaPasskeyEnrollmentRequestBody,
  };

  export { Shared as Shared, type SuccessResponse as SuccessResponse };

  export {
    WalletActions as WalletActions,
    type WalletActionType as WalletActionType,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStepType as WalletActionStepType,
    type EvmWalletActionStepStatus as EvmWalletActionStepStatus,
    type FailureReason as FailureReason,
    type EvmTransactionWalletActionStep as EvmTransactionWalletActionStep,
    type EvmUserOperationWalletActionStep as EvmUserOperationWalletActionStep,
    type WalletActionStep as WalletActionStep,
    type SwapActionResponse as SwapActionResponse,
    type TransferActionResponse as TransferActionResponse,
    type WalletActionResponse as WalletActionResponse,
  };

  export { Analytics as Analytics, type AnalyticsEventInput as AnalyticsEventInput };

  export {
    EmbeddedWallets as EmbeddedWallets,
    type SmartWalletType as SmartWalletType,
    type AlchemyPaymasterContext as AlchemyPaymasterContext,
    type SmartWalletNetworkConfiguration as SmartWalletNetworkConfiguration,
    type SmartWalletNetworkConfigurationInput as SmartWalletNetworkConfigurationInput,
    type SmartWalletConfigurationDisabled as SmartWalletConfigurationDisabled,
    type SmartWalletConfigurationEnabled as SmartWalletConfigurationEnabled,
    type SmartWalletConfigurationInputEnabled as SmartWalletConfigurationInputEnabled,
    type SmartWalletConfiguration as SmartWalletConfiguration,
    type SmartWalletConfigurationInput as SmartWalletConfigurationInput,
    type RecoveryType as RecoveryType,
    type ICloudClientType as ICloudClientType,
    type RecoveryKeyMaterialInput as RecoveryKeyMaterialInput,
    type RecoveryKeyMaterialResponse as RecoveryKeyMaterialResponse,
    type OAuthInitRecoveryInput as OAuthInitRecoveryInput,
    type OAuthAuthenticateRecoveryResponse as OAuthAuthenticateRecoveryResponse,
    type OAuthInitICloudRecoveryInput as OAuthInitICloudRecoveryInput,
    type OAuthCallbackICloudExpoInput as OAuthCallbackICloudExpoInput,
    type RecoveryConfigurationICloudInput as RecoveryConfigurationICloudInput,
    type RecoveryConfigurationICloudResponse as RecoveryConfigurationICloudResponse,
    type WalletCreationAdditionalSignerItem as WalletCreationAdditionalSignerItem,
    type WalletCreationInput as WalletCreationInput,
    type EmbeddedWalletCreationInput as EmbeddedWalletCreationInput,
  };

  export {
    Funding as Funding,
    type CoinbaseBlockchain as CoinbaseBlockchain,
    type CoinbaseEthereumAsset as CoinbaseEthereumAsset,
    type CoinbaseSolanaAsset as CoinbaseSolanaAsset,
    type CoinbaseOnRampEthereumAddress as CoinbaseOnRampEthereumAddress,
    type CoinbaseOnRampSolanaAddress as CoinbaseOnRampSolanaAddress,
    type CoinbaseOnRampInitEthereumInput as CoinbaseOnRampInitEthereumInput,
    type CoinbaseOnRampInitSolanaInput as CoinbaseOnRampInitSolanaInput,
    type CoinbaseOnRampInitInput as CoinbaseOnRampInitInput,
    type CoinbaseOnRampInitResponse as CoinbaseOnRampInitResponse,
    type CoinbaseOnRampStatus as CoinbaseOnRampStatus,
    type CoinbaseOnRampStatusResponse as CoinbaseOnRampStatusResponse,
    type MoonpayPaymentMethod as MoonpayPaymentMethod,
    type MoonpayCurrencyCode as MoonpayCurrencyCode,
    type MoonpayUiTheme as MoonpayUiTheme,
    type MoonpayUiConfig as MoonpayUiConfig,
    type MoonpaySolanaCurrencyCode as MoonpaySolanaCurrencyCode,
    type MoonpayFiatOnRampEthereumConfig as MoonpayFiatOnRampEthereumConfig,
    type MoonpayFiatOnRampSolanaConfig as MoonpayFiatOnRampSolanaConfig,
    type MoonpayFiatOnRampEthereumInput as MoonpayFiatOnRampEthereumInput,
    type MoonpayFiatOnRampSolanaInput as MoonpayFiatOnRampSolanaInput,
    type MoonpayOnRampSandboxConfig as MoonpayOnRampSandboxConfig,
    type MoonpayOnRampSignInput as MoonpayOnRampSignInput,
    type MoonpayOnRampSignResponse as MoonpayOnRampSignResponse,
  };

  export {
    Aggregations as Aggregations,
    type AggregationMethod as AggregationMethod,
    type AggregationMetric as AggregationMetric,
    type AggregationWindow as AggregationWindow,
    type AggregationGroupBy as AggregationGroupBy,
    type Aggregation as Aggregation,
    type AggregationInput as AggregationInput,
  };

  export {
    Webhooks as Webhooks,
    type IntentCreatedWebhookPayload as IntentCreatedWebhookPayload,
    type IntentAuthorizedWebhookPayload as IntentAuthorizedWebhookPayload,
    type IntentExecutedWebhookPayload as IntentExecutedWebhookPayload,
    type IntentFailedWebhookPayload as IntentFailedWebhookPayload,
    type MfaEnabledWebhookPayload as MfaEnabledWebhookPayload,
    type MfaDisabledWebhookPayload as MfaDisabledWebhookPayload,
    type TransactionBroadcastedWebhookPayload as TransactionBroadcastedWebhookPayload,
    type TransactionConfirmedWebhookPayload as TransactionConfirmedWebhookPayload,
    type TransactionExecutionRevertedWebhookPayload as TransactionExecutionRevertedWebhookPayload,
    type TransactionStillPendingWebhookPayload as TransactionStillPendingWebhookPayload,
    type TransactionFailedWebhookPayload as TransactionFailedWebhookPayload,
    type TransactionReplacedWebhookPayload as TransactionReplacedWebhookPayload,
    type TransactionProviderErrorWebhookPayload as TransactionProviderErrorWebhookPayload,
    type UserOperationCompletedWebhookPayload as UserOperationCompletedWebhookPayload,
    type UserCreatedWebhookPayload as UserCreatedWebhookPayload,
    type UserAuthenticatedWebhookPayload as UserAuthenticatedWebhookPayload,
    type UserLinkedAccountWebhookPayload as UserLinkedAccountWebhookPayload,
    type UserUnlinkedAccountWebhookPayload as UserUnlinkedAccountWebhookPayload,
    type UserUpdatedAccountWebhookPayload as UserUpdatedAccountWebhookPayload,
    type UserTransferredAccountWebhookPayload as UserTransferredAccountWebhookPayload,
    type UserWalletCreatedWebhookPayload as UserWalletCreatedWebhookPayload,
    type WalletActionSwapCreatedWebhookPayload as WalletActionSwapCreatedWebhookPayload,
    type WalletActionSwapSucceededWebhookPayload as WalletActionSwapSucceededWebhookPayload,
    type WalletActionSwapRejectedWebhookPayload as WalletActionSwapRejectedWebhookPayload,
    type WalletActionSwapFailedWebhookPayload as WalletActionSwapFailedWebhookPayload,
    type WalletActionTransferCreatedWebhookPayload as WalletActionTransferCreatedWebhookPayload,
    type WalletActionTransferSucceededWebhookPayload as WalletActionTransferSucceededWebhookPayload,
    type WalletActionTransferRejectedWebhookPayload as WalletActionTransferRejectedWebhookPayload,
    type WalletActionTransferFailedWebhookPayload as WalletActionTransferFailedWebhookPayload,
    type FundsDepositedWebhookPayload as FundsDepositedWebhookPayload,
    type FundsWithdrawnWebhookPayload as FundsWithdrawnWebhookPayload,
    type PrivateKeyExportWebhookPayload as PrivateKeyExportWebhookPayload,
    type WalletRecoverySetupWebhookPayload as WalletRecoverySetupWebhookPayload,
    type WalletRecoveredWebhookPayload as WalletRecoveredWebhookPayload,
    type YieldDepositConfirmedWebhookPayload as YieldDepositConfirmedWebhookPayload,
    type YieldWithdrawConfirmedWebhookPayload as YieldWithdrawConfirmedWebhookPayload,
    type YieldClaimConfirmedWebhookPayload as YieldClaimConfirmedWebhookPayload,
    type WebhookPayload as WebhookPayload,
    type KrakenEmbedQuoteExecutedWebhookPayload as KrakenEmbedQuoteExecutedWebhookPayload,
    type KrakenEmbedQuoteExecutionFailedWebhookPayload as KrakenEmbedQuoteExecutionFailedWebhookPayload,
    type KrakenEmbedQuoteCancelledWebhookPayload as KrakenEmbedQuoteCancelledWebhookPayload,
    type KrakenEmbedUserVerifiedWebhookPayload as KrakenEmbedUserVerifiedWebhookPayload,
    type KrakenEmbedUserDisabledWebhookPayload as KrakenEmbedUserDisabledWebhookPayload,
    type KrakenEmbedUserClosedWebhookPayload as KrakenEmbedUserClosedWebhookPayload,
  };

  export {
    Accounts as Accounts,
    type AccountWallet as AccountWallet,
    type AccountResponse as AccountResponse,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type AccountDisplayName as AccountDisplayName,
    type AccountWalletsConfiguration as AccountWalletsConfiguration,
    type CreateAccountInput as CreateAccountInput,
    type UpdateAccountInput as UpdateAccountInput,
    type AccountsListResponse as AccountsListResponse,
    type AssetAccountWithBalance as AssetAccountWithBalance,
    type AccountsDashboardListResponse as AccountsDashboardListResponse,
    type AccountBalanceResponse as AccountBalanceResponse,
    type AccountBalanceParams as AccountBalanceParams,
  };

  export {
    Yield as Yield,
    type EvmCaip2ChainID as EvmCaip2ChainID,
    type EthereumYieldProvider as EthereumYieldProvider,
    type EthereumYieldSweepType as EthereumYieldSweepType,
    type EthereumYieldSweepStatus as EthereumYieldSweepStatus,
    type EthereumYieldDepositInput as EthereumYieldDepositInput,
    type EthereumYieldWithdrawInput as EthereumYieldWithdrawInput,
    type EthereumYieldSweepResponse as EthereumYieldSweepResponse,
    type EthereumVaultDetailsInput as EthereumVaultDetailsInput,
    type EthereumYieldSweepIDInput as EthereumYieldSweepIDInput,
    type EthereumVaultResponse as EthereumVaultResponse,
    type EthereumVaultDetailsResponse as EthereumVaultDetailsResponse,
    type EthereumYieldPositionsInput as EthereumYieldPositionsInput,
    type EthereumVaultPosition as EthereumVaultPosition,
    type EthereumYieldPositionResponse as EthereumYieldPositionResponse,
    type EthereumYieldClaimInput as EthereumYieldClaimInput,
    type EthereumYieldClaimReward as EthereumYieldClaimReward,
    type EthereumYieldClaimResponse as EthereumYieldClaimResponse,
    type EthereumYieldClaimIDInput as EthereumYieldClaimIDInput,
    type YieldAuthorizationHeaders as YieldAuthorizationHeaders,
  };

  export {
    Swaps as Swaps,
    type SwapAmountType as SwapAmountType,
    type SwapQuoteRequest as SwapQuoteRequest,
    type SwapQuoteResponse as SwapQuoteResponse,
    type SwapRequest as SwapRequest,
  };

  export {
    KrakenEmbed as KrakenEmbed,
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
  };

  export {
    CrossApp as CrossApp,
    type CrossAppConnection as CrossAppConnection,
    type CrossAppConnectionsResponse as CrossAppConnectionsResponse,
  };
}
