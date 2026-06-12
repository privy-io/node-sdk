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
  AccountWalletIDs,
  AccountWalletsConfiguration,
  Accounts,
  AccountsDashboardListResponse,
  AccountsListResponse,
  AssetAccountWithBalance,
  BalanceAsset,
  BalanceAssetByChain,
  BalanceResponse,
  CreateAccountFromWalletIDsInput,
  CreateAccountFromWalletsConfigurationInput,
  CreateAccountInput,
  UpdateAccountFromWalletIDsInput,
  UpdateAccountFromWalletsConfigurationInput,
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
  RollingAggregationWindow,
} from './resources/aggregations';
import { Analytics, AnalyticsEventInput } from './resources/analytics';
import {
  AuthenticateJwtInput,
  AuthenticateMode,
  AuthenticateModeOption,
  AuthenticateSiweInput,
  AuthenticateSiwsInput,
  BridgeBrlFiatVirtualAccountDepositInstructions,
  BridgeDestinationAsset,
  BridgeEurFiatVirtualAccountDepositInstructions,
  BridgeFiatVirtualAccountDepositInstructions,
  BridgeFiatVirtualAccountDestination,
  BridgeFiatVirtualAccountRequest,
  BridgeFiatVirtualAccountResponse,
  BridgeFiatVirtualAccountSource,
  BridgeGbpFiatVirtualAccountDepositInstructions,
  BridgeMxnFiatVirtualAccountDepositInstructions,
  BridgeOnrampProvider,
  BridgeSandboxFiatVirtualAccountRequest,
  BridgeSandboxFiatVirtualAccountResponse,
  BridgeSourceAsset,
  BridgeUsdFiatVirtualAccountDepositInstructions,
  ClientAuth,
  CustomJwtAuthenticateRequestBody,
  CustomJwtLinkRequestBody,
  CustomOAuthProviderID,
  DeviceVerifyAction,
  DeviceVerifyRequestBody,
  DeviceVerifyResponse,
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
  FiatVirtualAccountRequest,
  FiatVirtualAccountResponse,
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
  OAuthTokenAuthorizationCodeRequestBody,
  OAuthTokenDeviceCodePendingError,
  OAuthTokenDeviceCodeRequestBody,
  OAuthTokenGrantType,
  OAuthTokenRefreshTokenRequestBody,
  OAuthTokenRequestBody,
  OAuthTokenSuccessResponse,
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
  BaseIntentResponse,
  IntentAuthorization,
  IntentAuthorizationKeyMember,
  IntentAuthorizationKeyQuorum,
  IntentAuthorizationKeyQuorumMember,
  IntentAuthorizationMember,
  IntentAuthorizationUserMember,
  IntentAuthorizeInput,
  IntentCreatePolicyRuleParams,
  IntentCreationHeaders,
  IntentDeletePolicyRuleParams,
  IntentListParams,
  IntentResponse,
  IntentResponsesCursor,
  IntentRpcParams,
  IntentStatus,
  IntentTransferParams,
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
  RuleDeleteIntentResponse,
  RuleIntentCreateRequestDetails,
  RuleIntentDeleteRequestBody,
  RuleIntentDeleteRequestDetails,
  RuleIntentRequestDetails,
  RuleIntentResponse,
  RuleIntentUpdateRequestDetails,
  RuleMutateIntentResponse,
  TransferIntentRequestDetails,
  TransferIntentResponse,
  WalletIntentResponse,
} from './resources/intents';
import {
  AuthorizationKey,
  KeyQuorum,
  KeyQuorumAuthorizationHeaders,
  KeyQuorumCreateParams,
  KeyQuorumCreateRequestBody,
  KeyQuorumDeleteParams,
  KeyQuorumUpdateParams,
  KeyQuorumUpdateRequestBody,
  KeyQuorums,
} from './resources/key-quorums';
import {
  KrakenEmbed,
  KrakenEmbedCancelCustomOrderInput,
  KrakenEmbedCancelCustomOrderPath,
  KrakenEmbedCancelCustomOrderResponse,
  KrakenEmbedCancelCustomOrderResult,
  KrakenEmbedCreateCustomOrderInput,
  KrakenEmbedCreateCustomOrderResponse,
  KrakenEmbedCreateCustomOrderResult,
  KrakenEmbedCurrentDayPnl,
  KrakenEmbedCustomOrder,
  KrakenEmbedCustomOrderAction,
  KrakenEmbedCustomOrderAmount,
  KrakenEmbedCustomOrderOccurrence,
  KrakenEmbedCustomOrderOccurrenceExecutedAction,
  KrakenEmbedCustomOrderOccurrenceTrigger,
  KrakenEmbedCustomOrderQuoteAsset,
  KrakenEmbedCustomOrderStatus,
  KrakenEmbedCustomOrderTrigger,
  KrakenEmbedEarnAmount,
  KrakenEmbedEarnAprEstimate,
  KrakenEmbedEarnAsset,
  KrakenEmbedEarnUserAllocation,
  KrakenEmbedFullName,
  KrakenEmbedGetAssetListQueryParamsSchema,
  KrakenEmbedGetCustomOrderHistoryQueryParams,
  KrakenEmbedGetCustomOrderHistoryResponse,
  KrakenEmbedGetCustomOrderHistoryResult,
  KrakenEmbedGetCustomOrderQueryParams,
  KrakenEmbedGetCustomOrderResponse,
  KrakenEmbedGetCustomOrderResult,
  KrakenEmbedGetEarnAssetsKrakenResponse,
  KrakenEmbedGetEarnAssetsQueryParams,
  KrakenEmbedGetEarnAssetsResponse,
  KrakenEmbedGetEarnAssetsResult,
  KrakenEmbedGetEarnSummaryKrakenResponse,
  KrakenEmbedGetEarnSummaryQueryParams,
  KrakenEmbedGetEarnSummaryResponse,
  KrakenEmbedGetEarnSummaryResult,
  KrakenEmbedGetPortfolioDetailsQueryParamsSchema,
  KrakenEmbedGetPortfolioSummaryQueryParams,
  KrakenEmbedGetPortfolioSummaryResponse,
  KrakenEmbedGetPortfolioSummaryResult,
  KrakenEmbedGetPortfolioTransactionsQueryParamsSchema,
  KrakenEmbedGetQuoteQueryParams,
  KrakenEmbedListCustomOrdersQueryParams,
  KrakenEmbedListCustomOrdersResponse,
  KrakenEmbedListCustomOrdersResult,
  KrakenEmbedPortfolioSummaryPayload,
  KrakenEmbedPortfolioTransactionRefID,
  KrakenEmbedPortfolioTransactionRefIDType,
  KrakenEmbedResidence,
  KrakenEmbedStartAddressMetadata,
  KrakenEmbedStartAddressVerificationURLInput,
  KrakenEmbedStartIdentityInfo,
  KrakenEmbedStartIdentityMetadata,
  KrakenEmbedStartIdentityVerificationURLInput,
  KrakenEmbedStartLivenessVerificationURLInput,
  KrakenEmbedStartVerificationDebug,
  KrakenEmbedStartVerificationURLInput,
  KrakenEmbedStartVerificationURLResponse,
  KrakenEmbedStartVerificationURLResult,
  KrakenEmbedToggleAutoEarnKrakenResponse,
  KrakenEmbedToggleAutoEarnQueryParams,
  KrakenEmbedToggleAutoEarnResponse,
  KrakenEmbedUpcomingReward,
} from './resources/kraken-embed';
import {
  DeviceAuthorizationResponse,
  OAuth,
  OAuthGrant,
  OAuthGrantListResponse,
  OAuthGrantRevokeResponse,
} from './resources/oauth';
import {
  BridgeFiatCustomerResponse,
  BridgeFiatRejectionReason,
  BridgeSandboxFiatCustomerResponse,
  Caip2ChainID,
  CreateLinkAuthIntentInput,
  CreateLinkAuthIntentResponse,
  CreateOrUpdateFiatCustomerRequestInput,
  CreateStripeOnrampSessionInput,
  CreateStripeOnrampSessionResponse,
  CryptoCurrencyCode,
  ExchangeStripeTokensInput,
  ExchangeStripeTokensResponse,
  FiatAmount,
  FiatCurrencyCode,
  FiatCustomerResponse,
  FiatOnrampDestination,
  FiatOnrampEnvironment,
  FiatOnrampProvider,
  FiatOnrampProviderError,
  FiatOnrampQuote,
  FiatOnrampSource,
  FiatOnrampStripeSDKSessionResponse,
  FiatOnrampTransactionStatus,
  FiatOnrampURLSessionResponse,
  GetFiatCustomerRequestInput,
  GetFiatOnrampQuotesInput,
  GetFiatOnrampQuotesResponse,
  GetFiatOnrampTransactionStatusInput,
  GetFiatOnrampTransactionStatusResponse,
  GetFiatOnrampURLInput,
  GetFiatOnrampURLResponse,
  GetStripeCryptoCustomerResponse,
  LinkAuthIntentCreated,
  LinkAuthIntentNoAccount,
  ListStripeConsumerWalletsResponse,
  ListStripePaymentTokensResponse,
  OnrampSessionParams,
  OnrampSessionTransactionDetails,
  Onramps,
  RefreshStripeQuoteResponse,
  StripeConsumerWallet,
  StripeCryptoCustomerActive,
  StripeCryptoCustomerExpired,
  StripeCryptoCustomerNone,
  StripeKYCTier,
  StripeOnrampCheckoutResponse,
  StripeOnrampSessionStatus,
  StripePaymentToken,
  StripeTransactionDetails,
  StripeVerification,
} from './resources/onramps';
import {
  CreateOrganizationSecretResponse,
  OrganizationSecretIDInput,
  OrganizationSecretView,
  OrganizationSecretsListResponse,
  Organizations,
  UpdateOrganizationSecretSigningKeyInput,
} from './resources/organizations';
import {
  AbiParameter,
  AbiSchema,
  ActionRequestBodyCondition,
  AggregationCondition,
  ConditionOperator,
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
  ConditionValue,
  Ethereum7702AuthorizationCondition,
  EthereumCalldataCondition,
  EthereumTransactionCondition,
  EthereumTypedDataDomainCondition,
  EthereumTypedDataMessageCondition,
  Policies,
  Policy,
  PolicyAction,
  PolicyAuthorizationHeaders,
  PolicyCondition,
  PolicyCreateParams,
  PolicyCreateRuleParams,
  PolicyDeleteParams,
  PolicyDeleteRuleParams,
  PolicyGetRuleParams,
  PolicyMethod,
  PolicyRequestBody,
  PolicyRuleRequestBody,
  PolicyRuleRequestParams,
  PolicyRuleResponse,
  PolicyUpdateParams,
  PolicyUpdateRuleParams,
  SolanaProgramInstructionCondition,
  SolanaSystemProgramInstructionCondition,
  SolanaTokenProgramInstructionCondition,
  SuiTransactionCommandCondition,
  SuiTransactionCommandOperator,
  SuiTransferObjectsCommandCondition,
  SuiTransferObjectsCommandField,
  SystemCondition,
  TempoTransactionCondition,
  TempoTransactionConditionField,
  TronCalldataCondition,
  TronTransactionCondition,
  TypedDataInput,
  UpdateConditionSetRequestBody,
} from './resources/policies';
import {
  BitcoinAddress,
  CurrencyAmount,
  EvmAddress,
  EvmChecksumAddress,
  HyperliquidTokenAddress,
  KeyQuorumID,
  OwnerIDInput,
  OwnerInput,
  OwnerInputPublicKey,
  OwnerInputUser,
  P256PublicKey,
  Shared,
  SolanaAddress,
  SuccessResponse,
  TronAddress,
} from './resources/shared';
import {
  SwapDestination,
  SwapQuoteDestination,
  SwapQuoteRequestBody,
  SwapQuoteResponse,
  SwapRequestBody,
  SwapSource,
  Swaps,
} from './resources/swaps';
import {
  Transaction,
  TransactionList,
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
  PatchUsersCustomMetadata,
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
  CustodianTransactionWalletActionStep,
  CustodianTransactionWalletActionStepStatus,
  EarnAsset,
  EarnDepositActionResponse,
  EarnDepositRequestBody,
  EarnIncentiveClaimActionResponse,
  EarnIncentiveClaimRequestBody,
  EarnIncentiveRewardEntry,
  EarnIncentiveRewardsQuery,
  EarnIncentiveRewardsResponse,
  EarnIncetiveClaimRewardEntry,
  EarnWithdrawActionResponse,
  EarnWithdrawRequestBody,
  EthereumEarnPositionQuery,
  EthereumEarnPositionResponse,
  EthereumEarnProvider,
  EthereumEarnVaultDetailsResponse,
  EvmTransactionWalletActionStep,
  EvmUserOperationWalletActionStep,
  EvmWalletActionStepStatus,
  ExternalTransactionWalletActionStep,
  ExternalTransactionWalletActionStepStatus,
  FailureReason,
  ListWalletActionsQuery,
  ListWalletActionsResponse,
  SvmTransactionWalletActionStep,
  SvmWalletActionStepStatus,
  SwapActionResponse,
  TransferActionResponse,
  WalletActionInclude,
  WalletActionResponse,
  WalletActionStatus,
  WalletActionStep,
  WalletActionStepType,
  WalletActionType,
  WalletActions,
} from './resources/wallet-actions';
import {
  BlockInfo,
  BridgeCryptoDepositMetadata,
  BridgeCryptoTransferMetadata,
  BridgeFiatDepositMetadata,
  BridgeFiatTransferMetadata,
  BridgeMetadata,
  BridgeRefundMetadata,
  BridgeStaticMemoDepositMetadata,
  BridgeTransferRefundMetadata,
  FundsDepositedWebhookPayload,
  FundsWithdrawnWebhookPayload,
  IntentAuthorizedWebhookPayload,
  IntentCreatedWebhookPayload,
  IntentExecutedWebhookPayload,
  IntentFailedWebhookPayload,
  IntentRejectedWebhookPayload,
  KrakenEmbedCustomOrderCancelledWebhookPayload,
  KrakenEmbedCustomOrderExecutedWebhookPayload,
  KrakenEmbedCustomOrderExecutionFailedWebhookPayload,
  KrakenEmbedQuoteCancelledWebhookPayload,
  KrakenEmbedQuoteExecutedWebhookPayload,
  KrakenEmbedQuoteExecutionFailedWebhookPayload,
  KrakenEmbedUserClosedWebhookPayload,
  KrakenEmbedUserDisabledWebhookPayload,
  KrakenEmbedUserVerifiedWebhookPayload,
  MfaDisabledWebhookPayload,
  MfaEnabledWebhookPayload,
  PrivateKeyExportWebhookPayload,
  SeedPhraseExportWebhookPayload,
  TransactionBroadcastedWebhookPayload,
  TransactionConfirmedWebhookPayload,
  TransactionExecutionRevertedWebhookPayload,
  TransactionFailedWebhookPayload,
  TransactionProviderErrorWebhookPayload,
  TransactionReplacedWebhookPayload,
  TransactionStillPendingWebhookPayload,
  UnsafeUnwrapWebhookEvent,
  UserAuthenticatedWebhookPayload,
  UserCreatedWebhookPayload,
  UserLinkedAccountWebhookPayload,
  UserOperationCompletedWebhookPayload,
  UserReference,
  UserTransferredAccountWebhookPayload,
  UserUnlinkedAccountWebhookPayload,
  UserUpdatedAccountWebhookPayload,
  UserWalletCreatedWebhookPayload,
  WalletActionEarnDepositCreatedWebhookPayload,
  WalletActionEarnDepositFailedWebhookPayload,
  WalletActionEarnDepositRejectedWebhookPayload,
  WalletActionEarnDepositSucceededWebhookPayload,
  WalletActionEarnIncentiveClaimCreatedWebhookPayload,
  WalletActionEarnIncentiveClaimFailedWebhookPayload,
  WalletActionEarnIncentiveClaimRejectedWebhookPayload,
  WalletActionEarnIncentiveClaimSucceededWebhookPayload,
  WalletActionEarnWithdrawCreatedWebhookPayload,
  WalletActionEarnWithdrawFailedWebhookPayload,
  WalletActionEarnWithdrawRejectedWebhookPayload,
  WalletActionEarnWithdrawSucceededWebhookPayload,
  WalletActionSwapCreatedWebhookPayload,
  WalletActionSwapFailedWebhookPayload,
  WalletActionSwapRejectedWebhookPayload,
  WalletActionSwapSucceededWebhookPayload,
  WalletActionTransferCreatedWebhookPayload,
  WalletActionTransferFailedWebhookPayload,
  WalletActionTransferRejectedWebhookPayload,
  WalletActionTransferSucceededWebhookPayload,
  WalletArchivedWebhookPayload,
  WalletFundsAsset,
  WalletFundsErc20Asset,
  WalletFundsNativeTokenAsset,
  WalletFundsSacAsset,
  WalletFundsSplAsset,
  WalletRecoveredWebhookPayload,
  WalletRecoverySetupWebhookPayload,
  WebhookPayload,
  Webhooks,
  YieldClaimConfirmedWebhookPayload,
  YieldClaimReward,
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
  VaultAsset,
  Yield,
  YieldAuthorizationHeaders,
} from './resources/yield';
import {
  AllowlistDeletionResponse,
  AllowlistEntry,
  AppAllowlistConfig,
  AppCustomOAuthProvider,
  AppGetGasSpendParams,
  AppResponse,
  Apps,
  Caip2,
  Currency,
  CurrencyAsset,
  EmailDomain,
  EmailDomainInviteInput,
  EmailInviteInput,
  EmbeddedWalletChainConfig,
  EmbeddedWalletConfigSchema,
  EmbeddedWalletCreateOnLogin,
  EmbeddedWalletInputSchema,
  EmbeddedWalletMode,
  FundingConfigResponseSchema,
  FundingMethodEnum,
  FundingOption,
  GasSpendCurrency,
  GasSpendRequestBody,
  GasSpendResponseBody,
  PhoneInviteInput,
  TelegramAuthConfigSchema,
  TestAccount,
  TestAccountsResponse,
  UserInviteInput,
  UserOwnedRecoveryOption,
  WalletInviteInput,
} from './resources/apps/apps';
import {
  AccessListEntry,
  AdditionalSignerInput,
  AdditionalSignerItemInput,
  Address,
  AmountType,
  AuthorizationKeyDashboardResponse,
  AuthorizationKeyResponse,
  AuthorizationKeyRole,
  CurveSigningChainType,
  CurveType,
  CustodialWallet,
  CustodialWalletChainType,
  CustodialWalletCreateInput,
  CustodialWalletProvider,
  CustomTokenTransferSource,
  DeveloperFee,
  EncryptedAuthorizationKey,
  EncryptedBoundAuthenticateResponse,
  EncryptedWalletAuthenticateResponse,
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
  EthereumSendCallsCall,
  EthereumSendCallsRpcInput,
  EthereumSendCallsRpcInputParams,
  EthereumSendCallsRpcResponse,
  EthereumSendCallsRpcResponseData,
  EthereumSendTransactionRpcInput,
  EthereumSendTransactionRpcInputParams,
  EthereumSendTransactionRpcResponse,
  EthereumSendTransactionRpcResponseData,
  EthereumSign7702Authorization,
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
  ExportSeedPhraseRpcInput,
  ExportSeedPhraseRpcResponse,
  ExportType,
  ExtendedChainType,
  FeeConfiguration,
  FeeLineItem,
  FirstClassChainType,
  Gas,
  GetByWalletAddressRequestBody,
  HDInitInput,
  HDPath,
  HDSubmitInput,
  Hex,
  HpkeAeadAlgorithm,
  HpkeEncryption,
  HpkeImportConfig,
  IntentBinding,
  NamedTokenTransferSource,
  OutputWithPreviousTransactionData,
  PolicyInput,
  PrivateKeyExportInput,
  PrivateKeyExportResponse,
  PrivateKeyInitInput,
  PrivateKeySubmitInput,
  PrivyFee,
  Quantity,
  RawBoundAuthenticateResponse,
  RawSignBytesEncoding,
  RawSignBytesHashFunction,
  RawSignBytesParams,
  RawSignHashParams,
  RawSignInput,
  RawSignInputParams,
  RawSignResponse,
  RawSignResponseData,
  RawWalletAuthenticateResponse,
  RecipientPublicKey,
  RelayerFee,
  SeedPhraseExportInput,
  SeedPhraseExportResponse,
  SignatureOptions,
  SignatureType,
  SigningAlgorithm,
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
  SolanaWalletDerivationStrategy,
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
  TempoAaAuthorization,
  TempoCall,
  TempoFeePayerSignature,
  TokenOutput,
  TokenTransferDestination,
  TokenTransferSource,
  TotalFeeConfigurationBps,
  TransactionDetail,
  TransactionTokenAddressInput,
  TransferQuoteRequestBody,
  TransferQuoteResponse,
  TransferReceivedTransactionDetail,
  TransferRequestBody,
  TransferSentTransactionDetail,
  TypedDataDomainInputParams,
  TypedDataTypeFieldInput,
  TypedDataTypesInputParams,
  UnsignedEthereumTransaction,
  UnsignedStandardEthereumTransaction,
  UnsignedTempoTransaction,
  UserOperationInput,
  UserSigningKeyBinding,
  Wallet,
  WalletAPIRegisterAuthorizationKeyInput,
  WalletAPIRevokeAuthorizationKeyInput,
  WalletAdditionalSigner,
  WalletAdditionalSignerItem,
  WalletAsset,
  WalletAuthenticateBoundEncryptedRequestBody,
  WalletAuthenticateBoundRequestBody,
  WalletAuthenticateBoundUnencryptedRequestBody,
  WalletAuthenticateIntentsResponse,
  WalletAuthenticateRequestBody,
  WalletAuthenticateWithJwtParams,
  WalletAuthenticateWithJwtResponse,
  WalletAuthorizationHeaders,
  WalletBatchCreateInput,
  WalletBatchCreateResponse,
  WalletBatchCreateResult,
  WalletBatchItemInput,
  WalletChainType,
  WalletCreateBatchParams,
  WalletCreateParams,
  WalletCreateWalletsWithRecoveryParams,
  WalletCreateWalletsWithRecoveryResponse,
  WalletCustodian,
  WalletEntropyType,
  WalletEthereumAsset,
  WalletExportParams,
  WalletExportRequestBody,
  WalletExportResponseBody,
  WalletGetParams,
  WalletGetWalletByAddressParams,
  WalletImportInitResponse,
  WalletImportSupportedChains,
  WalletImportSupportedEntropyTypes,
  WalletInitImportParams,
  WalletInitImportResponse,
  WalletListParams,
  WalletRawSignParams,
  WalletRevokeResponse,
  WalletRpcParams,
  WalletRpcRequestBody,
  WalletRpcResponse,
  WalletSolanaAsset,
  WalletSubmitImportParams,
  WalletTransferParams,
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

    const customHeadersEnv = readEnv('PRIVY_API_CUSTOM_HEADERS');
    if (customHeadersEnv) {
      const parsed: Record<string, string> = {};
      for (const line of customHeadersEnv.split('\n')) {
        const colon = line.indexOf(':');
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }

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
  /**
   * Operations related to authorization intents for wallet actions
   */
  intents: API.Intents = new API.Intents(this);
  /**
   * Operations related to app settings and allowlist management
   */
  apps: API.Apps = new API.Apps(this);
  webhooks: API.Webhooks = new API.Webhooks(this);
  accounts: API.Accounts = new API.Accounts(this);
  aggregations: API.Aggregations = new API.Aggregations(this);
  embeddedWallets: API.EmbeddedWallets = new API.EmbeddedWallets(this);
  analytics: API.Analytics = new API.Analytics(this);
  clientAuth: API.ClientAuth = new API.ClientAuth(this);
  shared: API.Shared = new API.Shared(this);
  onramps: API.Onramps = new API.Onramps(this);
  funding: API.Funding = new API.Funding(this);
  organizations: API.Organizations = new API.Organizations(this);
  crossApp: API.CrossApp = new API.CrossApp(this);
  walletActions: API.WalletActions = new API.WalletActions(this);
  oAuth: API.OAuth = new API.OAuth(this);
  yield: API.Yield = new API.Yield(this);
  krakenEmbed: API.KrakenEmbed = new API.KrakenEmbed(this);
  swaps: API.Swaps = new API.Swaps(this);
}

PrivyAPI.Wallets = Wallets;
PrivyAPI.Users = Users;
PrivyAPI.Policies = Policies;
PrivyAPI.Transactions = Transactions;
PrivyAPI.KeyQuorums = KeyQuorums;
PrivyAPI.Intents = Intents;
PrivyAPI.Apps = Apps;
PrivyAPI.Webhooks = Webhooks;
PrivyAPI.Accounts = Accounts;
PrivyAPI.Aggregations = Aggregations;
PrivyAPI.EmbeddedWallets = EmbeddedWallets;
PrivyAPI.Analytics = Analytics;
PrivyAPI.ClientAuth = ClientAuth;
PrivyAPI.Shared = Shared;
PrivyAPI.Onramps = Onramps;
PrivyAPI.Funding = Funding;
PrivyAPI.Organizations = Organizations;
PrivyAPI.CrossApp = CrossApp;
PrivyAPI.WalletActions = WalletActions;
PrivyAPI.OAuth = OAuth;
PrivyAPI.Yield = Yield;
PrivyAPI.KrakenEmbed = KrakenEmbed;
PrivyAPI.Swaps = Swaps;

export declare namespace PrivyAPI {
  export type RequestOptions = Opts.RequestOptions;

  export import Cursor = Pagination.Cursor;
  export { type CursorParams as CursorParams, type CursorResponse as CursorResponse };

  export {
    Wallets as Wallets,
    type AccessListEntry as AccessListEntry,
    type AdditionalSignerInput as AdditionalSignerInput,
    type AdditionalSignerItemInput as AdditionalSignerItemInput,
    type Address as Address,
    type AmountType as AmountType,
    type AuthorizationKeyDashboardResponse as AuthorizationKeyDashboardResponse,
    type AuthorizationKeyResponse as AuthorizationKeyResponse,
    type AuthorizationKeyRole as AuthorizationKeyRole,
    type CurveSigningChainType as CurveSigningChainType,
    type CurveType as CurveType,
    type CustodialWallet as CustodialWallet,
    type CustodialWalletChainType as CustodialWalletChainType,
    type CustodialWalletCreateInput as CustodialWalletCreateInput,
    type CustodialWalletProvider as CustodialWalletProvider,
    type CustomTokenTransferSource as CustomTokenTransferSource,
    type DeveloperFee as DeveloperFee,
    type EncryptedAuthorizationKey as EncryptedAuthorizationKey,
    type EncryptedBoundAuthenticateResponse as EncryptedBoundAuthenticateResponse,
    type EncryptedWalletAuthenticateResponse as EncryptedWalletAuthenticateResponse,
    type EthereumPersonalSignRpcInput as EthereumPersonalSignRpcInput,
    type EthereumPersonalSignRpcInputParams as EthereumPersonalSignRpcInputParams,
    type EthereumPersonalSignRpcResponse as EthereumPersonalSignRpcResponse,
    type EthereumPersonalSignRpcResponseData as EthereumPersonalSignRpcResponseData,
    type EthereumRpcInput as EthereumRpcInput,
    type EthereumRpcResponse as EthereumRpcResponse,
    type EthereumSecp256k1SignRpcInput as EthereumSecp256k1SignRpcInput,
    type EthereumSecp256k1SignRpcInputParams as EthereumSecp256k1SignRpcInputParams,
    type EthereumSecp256k1SignRpcResponse as EthereumSecp256k1SignRpcResponse,
    type EthereumSecp256k1SignRpcResponseData as EthereumSecp256k1SignRpcResponseData,
    type EthereumSendCallsCall as EthereumSendCallsCall,
    type EthereumSendCallsRpcInput as EthereumSendCallsRpcInput,
    type EthereumSendCallsRpcInputParams as EthereumSendCallsRpcInputParams,
    type EthereumSendCallsRpcResponse as EthereumSendCallsRpcResponse,
    type EthereumSendCallsRpcResponseData as EthereumSendCallsRpcResponseData,
    type EthereumSendTransactionRpcInput as EthereumSendTransactionRpcInput,
    type EthereumSendTransactionRpcInputParams as EthereumSendTransactionRpcInputParams,
    type EthereumSendTransactionRpcResponse as EthereumSendTransactionRpcResponse,
    type EthereumSendTransactionRpcResponseData as EthereumSendTransactionRpcResponseData,
    type EthereumSign7702Authorization as EthereumSign7702Authorization,
    type EthereumSign7702AuthorizationRpcInput as EthereumSign7702AuthorizationRpcInput,
    type EthereumSign7702AuthorizationRpcInputParams as EthereumSign7702AuthorizationRpcInputParams,
    type EthereumSign7702AuthorizationRpcResponse as EthereumSign7702AuthorizationRpcResponse,
    type EthereumSign7702AuthorizationRpcResponseData as EthereumSign7702AuthorizationRpcResponseData,
    type EthereumSignTransactionRpcInput as EthereumSignTransactionRpcInput,
    type EthereumSignTransactionRpcInputParams as EthereumSignTransactionRpcInputParams,
    type EthereumSignTransactionRpcResponse as EthereumSignTransactionRpcResponse,
    type EthereumSignTransactionRpcResponseData as EthereumSignTransactionRpcResponseData,
    type EthereumSignTypedDataRpcInput as EthereumSignTypedDataRpcInput,
    type EthereumSignTypedDataRpcInputParams as EthereumSignTypedDataRpcInputParams,
    type EthereumSignTypedDataRpcResponse as EthereumSignTypedDataRpcResponse,
    type EthereumSignTypedDataRpcResponseData as EthereumSignTypedDataRpcResponseData,
    type EthereumSignUserOperationRpcInput as EthereumSignUserOperationRpcInput,
    type EthereumSignUserOperationRpcInputParams as EthereumSignUserOperationRpcInputParams,
    type EthereumSignUserOperationRpcResponse as EthereumSignUserOperationRpcResponse,
    type EthereumSignUserOperationRpcResponseData as EthereumSignUserOperationRpcResponseData,
    type EthereumTypedDataInput as EthereumTypedDataInput,
    type ExportPrivateKeyRpcInput as ExportPrivateKeyRpcInput,
    type ExportPrivateKeyRpcResponse as ExportPrivateKeyRpcResponse,
    type ExportSeedPhraseRpcInput as ExportSeedPhraseRpcInput,
    type ExportSeedPhraseRpcResponse as ExportSeedPhraseRpcResponse,
    type ExportType as ExportType,
    type ExtendedChainType as ExtendedChainType,
    type FeeConfiguration as FeeConfiguration,
    type FeeLineItem as FeeLineItem,
    type FirstClassChainType as FirstClassChainType,
    type Gas as Gas,
    type GetByWalletAddressRequestBody as GetByWalletAddressRequestBody,
    type HDInitInput as HDInitInput,
    type HDPath as HDPath,
    type HDSubmitInput as HDSubmitInput,
    type HpkeAeadAlgorithm as HpkeAeadAlgorithm,
    type HpkeEncryption as HpkeEncryption,
    type HpkeImportConfig as HpkeImportConfig,
    type Hex as Hex,
    type IntentBinding as IntentBinding,
    type NamedTokenTransferSource as NamedTokenTransferSource,
    type OutputWithPreviousTransactionData as OutputWithPreviousTransactionData,
    type PolicyInput as PolicyInput,
    type PrivateKeyExportInput as PrivateKeyExportInput,
    type PrivateKeyExportResponse as PrivateKeyExportResponse,
    type PrivateKeyInitInput as PrivateKeyInitInput,
    type PrivateKeySubmitInput as PrivateKeySubmitInput,
    type PrivyFee as PrivyFee,
    type Quantity as Quantity,
    type RawBoundAuthenticateResponse as RawBoundAuthenticateResponse,
    type RawSignBytesEncoding as RawSignBytesEncoding,
    type RawSignBytesHashFunction as RawSignBytesHashFunction,
    type RawSignBytesParams as RawSignBytesParams,
    type RawSignHashParams as RawSignHashParams,
    type RawSignInput as RawSignInput,
    type RawSignInputParams as RawSignInputParams,
    type RawSignResponse as RawSignResponse,
    type RawSignResponseData as RawSignResponseData,
    type RawWalletAuthenticateResponse as RawWalletAuthenticateResponse,
    type RecipientPublicKey as RecipientPublicKey,
    type RelayerFee as RelayerFee,
    type SeedPhraseExportInput as SeedPhraseExportInput,
    type SeedPhraseExportResponse as SeedPhraseExportResponse,
    type SignatureOptions as SignatureOptions,
    type SignatureType as SignatureType,
    type SigningAlgorithm as SigningAlgorithm,
    type SolanaRpcInput as SolanaRpcInput,
    type SolanaRpcResponse as SolanaRpcResponse,
    type SolanaSignAndSendTransactionRpcInput as SolanaSignAndSendTransactionRpcInput,
    type SolanaSignAndSendTransactionRpcInputParams as SolanaSignAndSendTransactionRpcInputParams,
    type SolanaSignAndSendTransactionRpcResponse as SolanaSignAndSendTransactionRpcResponse,
    type SolanaSignAndSendTransactionRpcResponseData as SolanaSignAndSendTransactionRpcResponseData,
    type SolanaSignMessageRpcInput as SolanaSignMessageRpcInput,
    type SolanaSignMessageRpcInputParams as SolanaSignMessageRpcInputParams,
    type SolanaSignMessageRpcResponse as SolanaSignMessageRpcResponse,
    type SolanaSignMessageRpcResponseData as SolanaSignMessageRpcResponseData,
    type SolanaSignTransactionRpcInput as SolanaSignTransactionRpcInput,
    type SolanaSignTransactionRpcInputParams as SolanaSignTransactionRpcInputParams,
    type SolanaSignTransactionRpcResponse as SolanaSignTransactionRpcResponse,
    type SolanaSignTransactionRpcResponseData as SolanaSignTransactionRpcResponseData,
    type SolanaWalletDerivationStrategy as SolanaWalletDerivationStrategy,
    type SparkBalance as SparkBalance,
    type SparkClaimStaticDepositRpcInput as SparkClaimStaticDepositRpcInput,
    type SparkClaimStaticDepositRpcInputParams as SparkClaimStaticDepositRpcInputParams,
    type SparkClaimStaticDepositRpcResponse as SparkClaimStaticDepositRpcResponse,
    type SparkClaimStaticDepositRpcResponseData as SparkClaimStaticDepositRpcResponseData,
    type SparkCreateLightningInvoiceRpcInput as SparkCreateLightningInvoiceRpcInput,
    type SparkCreateLightningInvoiceRpcInputParams as SparkCreateLightningInvoiceRpcInputParams,
    type SparkCreateLightningInvoiceRpcResponse as SparkCreateLightningInvoiceRpcResponse,
    type SparkGetBalanceRpcInput as SparkGetBalanceRpcInput,
    type SparkGetBalanceRpcResponse as SparkGetBalanceRpcResponse,
    type SparkGetClaimStaticDepositQuoteRpcInput as SparkGetClaimStaticDepositQuoteRpcInput,
    type SparkGetClaimStaticDepositQuoteRpcInputParams as SparkGetClaimStaticDepositQuoteRpcInputParams,
    type SparkGetClaimStaticDepositQuoteRpcResponse as SparkGetClaimStaticDepositQuoteRpcResponse,
    type SparkGetClaimStaticDepositQuoteRpcResponseData as SparkGetClaimStaticDepositQuoteRpcResponseData,
    type SparkGetStaticDepositAddressRpcInput as SparkGetStaticDepositAddressRpcInput,
    type SparkGetStaticDepositAddressRpcResponse as SparkGetStaticDepositAddressRpcResponse,
    type SparkGetStaticDepositAddressRpcResponseData as SparkGetStaticDepositAddressRpcResponseData,
    type SparkLightningFee as SparkLightningFee,
    type SparkLightningReceiveRequest as SparkLightningReceiveRequest,
    type SparkLightningSendRequest as SparkLightningSendRequest,
    type SparkNetwork as SparkNetwork,
    type SparkOutputSelectionStrategy as SparkOutputSelectionStrategy,
    type SparkPayLightningInvoiceRpcInput as SparkPayLightningInvoiceRpcInput,
    type SparkPayLightningInvoiceRpcInputParams as SparkPayLightningInvoiceRpcInputParams,
    type SparkPayLightningInvoiceRpcResponse as SparkPayLightningInvoiceRpcResponse,
    type SparkRpcInput as SparkRpcInput,
    type SparkRpcResponse as SparkRpcResponse,
    type SparkSignMessageWithIdentityKeyRpcInput as SparkSignMessageWithIdentityKeyRpcInput,
    type SparkSignMessageWithIdentityKeyRpcInputParams as SparkSignMessageWithIdentityKeyRpcInputParams,
    type SparkSignMessageWithIdentityKeyRpcResponse as SparkSignMessageWithIdentityKeyRpcResponse,
    type SparkSignMessageWithIdentityKeyRpcResponseData as SparkSignMessageWithIdentityKeyRpcResponseData,
    type SparkSigningKeyshare as SparkSigningKeyshare,
    type SparkTokenBalance as SparkTokenBalance,
    type SparkTransfer as SparkTransfer,
    type SparkTransferLeaf as SparkTransferLeaf,
    type SparkTransferRpcInput as SparkTransferRpcInput,
    type SparkTransferRpcInputParams as SparkTransferRpcInputParams,
    type SparkTransferRpcResponse as SparkTransferRpcResponse,
    type SparkTransferTokensRpcInput as SparkTransferTokensRpcInput,
    type SparkTransferTokensRpcInputParams as SparkTransferTokensRpcInputParams,
    type SparkTransferTokensRpcResponse as SparkTransferTokensRpcResponse,
    type SparkTransferTokensRpcResponseData as SparkTransferTokensRpcResponseData,
    type SparkUserTokenMetadata as SparkUserTokenMetadata,
    type SparkWalletLeaf as SparkWalletLeaf,
    type SuiCommandName as SuiCommandName,
    type TempoAaAuthorization as TempoAaAuthorization,
    type TempoCall as TempoCall,
    type TempoFeePayerSignature as TempoFeePayerSignature,
    type TokenOutput as TokenOutput,
    type TokenTransferDestination as TokenTransferDestination,
    type TokenTransferSource as TokenTransferSource,
    type TotalFeeConfigurationBps as TotalFeeConfigurationBps,
    type TransactionDetail as TransactionDetail,
    type TransactionTokenAddressInput as TransactionTokenAddressInput,
    type TransferQuoteRequestBody as TransferQuoteRequestBody,
    type TransferQuoteResponse as TransferQuoteResponse,
    type TransferReceivedTransactionDetail as TransferReceivedTransactionDetail,
    type TransferRequestBody as TransferRequestBody,
    type TransferSentTransactionDetail as TransferSentTransactionDetail,
    type TypedDataDomainInputParams as TypedDataDomainInputParams,
    type TypedDataTypeFieldInput as TypedDataTypeFieldInput,
    type TypedDataTypesInputParams as TypedDataTypesInputParams,
    type UnsignedEthereumTransaction as UnsignedEthereumTransaction,
    type UnsignedStandardEthereumTransaction as UnsignedStandardEthereumTransaction,
    type UnsignedTempoTransaction as UnsignedTempoTransaction,
    type UserOperationInput as UserOperationInput,
    type UserSigningKeyBinding as UserSigningKeyBinding,
    type Wallet as Wallet,
    type WalletAdditionalSigner as WalletAdditionalSigner,
    type WalletAdditionalSignerItem as WalletAdditionalSignerItem,
    type WalletAPIRegisterAuthorizationKeyInput as WalletAPIRegisterAuthorizationKeyInput,
    type WalletAPIRevokeAuthorizationKeyInput as WalletAPIRevokeAuthorizationKeyInput,
    type WalletAsset as WalletAsset,
    type WalletAuthenticateBoundEncryptedRequestBody as WalletAuthenticateBoundEncryptedRequestBody,
    type WalletAuthenticateBoundRequestBody as WalletAuthenticateBoundRequestBody,
    type WalletAuthenticateBoundUnencryptedRequestBody as WalletAuthenticateBoundUnencryptedRequestBody,
    type WalletAuthenticateIntentsResponse as WalletAuthenticateIntentsResponse,
    type WalletAuthenticateRequestBody as WalletAuthenticateRequestBody,
    type WalletAuthenticateWithJwtResponse as WalletAuthenticateWithJwtResponse,
    type WalletAuthorizationHeaders as WalletAuthorizationHeaders,
    type WalletBatchCreateInput as WalletBatchCreateInput,
    type WalletBatchCreateResponse as WalletBatchCreateResponse,
    type WalletBatchCreateResult as WalletBatchCreateResult,
    type WalletBatchItemInput as WalletBatchItemInput,
    type WalletChainType as WalletChainType,
    type WalletCreateWalletsWithRecoveryResponse as WalletCreateWalletsWithRecoveryResponse,
    type WalletCustodian as WalletCustodian,
    type WalletEntropyType as WalletEntropyType,
    type WalletEthereumAsset as WalletEthereumAsset,
    type WalletExportRequestBody as WalletExportRequestBody,
    type WalletExportResponseBody as WalletExportResponseBody,
    type WalletImportInitResponse as WalletImportInitResponse,
    type WalletImportSupportedChains as WalletImportSupportedChains,
    type WalletImportSupportedEntropyTypes as WalletImportSupportedEntropyTypes,
    type WalletRevokeResponse as WalletRevokeResponse,
    type WalletRpcRequestBody as WalletRpcRequestBody,
    type WalletRpcResponse as WalletRpcResponse,
    type WalletSolanaAsset as WalletSolanaAsset,
    type WalletUpdateRequestBody as WalletUpdateRequestBody,
    type WalletInitImportResponse as WalletInitImportResponse,
    type WalletsCursor as WalletsCursor,
    type WalletCreateParams as WalletCreateParams,
    type WalletListParams as WalletListParams,
    type WalletExportParams as WalletExportParams,
    type WalletInitImportParams as WalletInitImportParams,
    type WalletRawSignParams as WalletRawSignParams,
    type WalletRpcParams as WalletRpcParams,
    type WalletSubmitImportParams as WalletSubmitImportParams,
    type WalletTransferParams as WalletTransferParams,
    type WalletUpdateParams as WalletUpdateParams,
    type WalletAuthenticateWithJwtParams as WalletAuthenticateWithJwtParams,
    type WalletCreateBatchParams as WalletCreateBatchParams,
    type WalletCreateWalletsWithRecoveryParams as WalletCreateWalletsWithRecoveryParams,
    type WalletGetParams as WalletGetParams,
    type WalletGetWalletByAddressParams as WalletGetWalletByAddressParams,
  };

  export {
    Users as Users,
    type AuthenticatedUser as AuthenticatedUser,
    type CrossAppEmbeddedWallet as CrossAppEmbeddedWallet,
    type CrossAppSmartWallet as CrossAppSmartWallet,
    type CustomMetadata as CustomMetadata,
    type EmbeddedWalletRecoveryMethod as EmbeddedWalletRecoveryMethod,
    type LinkedAccount as LinkedAccount,
    type LinkedAccountAppleInput as LinkedAccountAppleInput,
    type LinkedAccountAppleOAuth as LinkedAccountAppleOAuth,
    type LinkedAccountAuthorizationKey as LinkedAccountAuthorizationKey,
    type LinkedAccountBaseWallet as LinkedAccountBaseWallet,
    type LinkedAccountBitcoinSegwitEmbeddedWallet as LinkedAccountBitcoinSegwitEmbeddedWallet,
    type LinkedAccountBitcoinTaprootEmbeddedWallet as LinkedAccountBitcoinTaprootEmbeddedWallet,
    type LinkedAccountCrossApp as LinkedAccountCrossApp,
    type LinkedAccountCurveSigningEmbeddedWallet as LinkedAccountCurveSigningEmbeddedWallet,
    type LinkedAccountCustomJwtInput as LinkedAccountCustomJwtInput,
    type LinkedAccountCustomJwt as LinkedAccountCustomJwt,
    type LinkedAccountCustomOAuth as LinkedAccountCustomOAuth,
    type LinkedAccountDiscordInput as LinkedAccountDiscordInput,
    type LinkedAccountDiscordOAuth as LinkedAccountDiscordOAuth,
    type LinkedAccountEmail as LinkedAccountEmail,
    type LinkedAccountEmailInput as LinkedAccountEmailInput,
    type LinkedAccountEmbeddedWallet as LinkedAccountEmbeddedWallet,
    type LinkedAccountEmbeddedWalletWithID as LinkedAccountEmbeddedWalletWithID,
    type LinkedAccountEthereum as LinkedAccountEthereum,
    type LinkedAccountEthereumEmbeddedWallet as LinkedAccountEthereumEmbeddedWallet,
    type LinkedAccountFarcaster as LinkedAccountFarcaster,
    type LinkedAccountFarcasterInput as LinkedAccountFarcasterInput,
    type LinkedAccountGitHubInput as LinkedAccountGitHubInput,
    type LinkedAccountGitHubOAuth as LinkedAccountGitHubOAuth,
    type LinkedAccountGoogleInput as LinkedAccountGoogleInput,
    type LinkedAccountGoogleOAuth as LinkedAccountGoogleOAuth,
    type LinkedAccountInput as LinkedAccountInput,
    type LinkedAccountInstagramInput as LinkedAccountInstagramInput,
    type LinkedAccountInstagramOAuth as LinkedAccountInstagramOAuth,
    type LinkedAccountLineInput as LinkedAccountLineInput,
    type LinkedAccountLineOAuth as LinkedAccountLineOAuth,
    type LinkedAccountLinkedInInput as LinkedAccountLinkedInInput,
    type LinkedAccountLinkedInOAuth as LinkedAccountLinkedInOAuth,
    type LinkedAccountPasskey as LinkedAccountPasskey,
    type LinkedAccountPasskeyInput as LinkedAccountPasskeyInput,
    type LinkedAccountPhone as LinkedAccountPhone,
    type LinkedAccountPhoneInput as LinkedAccountPhoneInput,
    type LinkedAccountSmartWallet as LinkedAccountSmartWallet,
    type LinkedAccountSolana as LinkedAccountSolana,
    type LinkedAccountSolanaEmbeddedWallet as LinkedAccountSolanaEmbeddedWallet,
    type LinkedAccountSpotifyInput as LinkedAccountSpotifyInput,
    type LinkedAccountSpotifyOAuth as LinkedAccountSpotifyOAuth,
    type LinkedAccountTelegram as LinkedAccountTelegram,
    type LinkedAccountTelegramInput as LinkedAccountTelegramInput,
    type LinkedAccountTiktokInput as LinkedAccountTiktokInput,
    type LinkedAccountTiktokOAuth as LinkedAccountTiktokOAuth,
    type LinkedAccountTwitchInput as LinkedAccountTwitchInput,
    type LinkedAccountTwitchOAuth as LinkedAccountTwitchOAuth,
    type LinkedAccountTwitterInput as LinkedAccountTwitterInput,
    type LinkedAccountTwitterOAuth as LinkedAccountTwitterOAuth,
    type LinkedAccountType as LinkedAccountType,
    type LinkedAccountWalletInput as LinkedAccountWalletInput,
    type LinkedMfaMethod as LinkedMfaMethod,
    type OAuthTokens as OAuthTokens,
    type PasskeyMfaMethod as PasskeyMfaMethod,
    type PatchUsersCustomMetadata as PatchUsersCustomMetadata,
    type SMSMfaMethod as SMSMfaMethod,
    type TotpMfaMethod as TotpMfaMethod,
    type User as User,
    type UserBatchCreateInput as UserBatchCreateInput,
    type UserWithIdentityToken as UserWithIdentityToken,
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
    type AbiParameter as AbiParameter,
    type AbiSchema as AbiSchema,
    type ActionRequestBodyCondition as ActionRequestBodyCondition,
    type AggregationCondition as AggregationCondition,
    type ConditionOperator as ConditionOperator,
    type ConditionSet as ConditionSet,
    type ConditionSetAuthorizationHeaders as ConditionSetAuthorizationHeaders,
    type ConditionSetItem as ConditionSetItem,
    type ConditionSetItemRequestParams as ConditionSetItemRequestParams,
    type ConditionSetItemValueInput as ConditionSetItemValueInput,
    type ConditionSetItems as ConditionSetItems,
    type ConditionSetItemsRequestBody as ConditionSetItemsRequestBody,
    type ConditionSetItemsResponse as ConditionSetItemsResponse,
    type ConditionSetRequestBody as ConditionSetRequestBody,
    type ConditionSetRequestParams as ConditionSetRequestParams,
    type ConditionValue as ConditionValue,
    type Ethereum7702AuthorizationCondition as Ethereum7702AuthorizationCondition,
    type EthereumCalldataCondition as EthereumCalldataCondition,
    type EthereumTransactionCondition as EthereumTransactionCondition,
    type EthereumTypedDataDomainCondition as EthereumTypedDataDomainCondition,
    type EthereumTypedDataMessageCondition as EthereumTypedDataMessageCondition,
    type Policy as Policy,
    type PolicyAction as PolicyAction,
    type PolicyAuthorizationHeaders as PolicyAuthorizationHeaders,
    type PolicyCondition as PolicyCondition,
    type PolicyMethod as PolicyMethod,
    type PolicyRequestBody as PolicyRequestBody,
    type PolicyRuleRequestBody as PolicyRuleRequestBody,
    type PolicyRuleRequestParams as PolicyRuleRequestParams,
    type PolicyRuleResponse as PolicyRuleResponse,
    type SolanaProgramInstructionCondition as SolanaProgramInstructionCondition,
    type SolanaSystemProgramInstructionCondition as SolanaSystemProgramInstructionCondition,
    type SolanaTokenProgramInstructionCondition as SolanaTokenProgramInstructionCondition,
    type SuiTransactionCommandCondition as SuiTransactionCommandCondition,
    type SuiTransactionCommandOperator as SuiTransactionCommandOperator,
    type SuiTransferObjectsCommandCondition as SuiTransferObjectsCommandCondition,
    type SuiTransferObjectsCommandField as SuiTransferObjectsCommandField,
    type SystemCondition as SystemCondition,
    type TempoTransactionCondition as TempoTransactionCondition,
    type TempoTransactionConditionField as TempoTransactionConditionField,
    type TronCalldataCondition as TronCalldataCondition,
    type TronTransactionCondition as TronTransactionCondition,
    type TypedDataInput as TypedDataInput,
    type UpdateConditionSetRequestBody as UpdateConditionSetRequestBody,
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
    type Transaction as Transaction,
    type TransactionList as TransactionList,
    type TransactionScanningAssetDiff as TransactionScanningAssetDiff,
    type TransactionScanningAssetInfo as TransactionScanningAssetInfo,
    type TransactionScanningAssetValue as TransactionScanningAssetValue,
    type TransactionScanningCalldata as TransactionScanningCalldata,
    type TransactionScanningExposure as TransactionScanningExposure,
    type TransactionScanningMetadata as TransactionScanningMetadata,
    type TransactionScanningParams as TransactionScanningParams,
    type TransactionScanningRequestBody as TransactionScanningRequestBody,
    type TransactionScanningResponseBody as TransactionScanningResponseBody,
    type TransactionScanningRpcRequest as TransactionScanningRpcRequest,
    type TransactionScanningSimulationErrorResult as TransactionScanningSimulationErrorResult,
    type TransactionScanningSimulationResult as TransactionScanningSimulationResult,
    type TransactionScanningSimulationSuccessResult as TransactionScanningSimulationSuccessResult,
    type TransactionScanningValidationErrorResult as TransactionScanningValidationErrorResult,
    type TransactionScanningValidationResult as TransactionScanningValidationResult,
    type TransactionScanningValidationSuccessResult as TransactionScanningValidationSuccessResult,
  };

  export {
    KeyQuorums as KeyQuorums,
    type AuthorizationKey as AuthorizationKey,
    type KeyQuorum as KeyQuorum,
    type KeyQuorumAuthorizationHeaders as KeyQuorumAuthorizationHeaders,
    type KeyQuorumCreateRequestBody as KeyQuorumCreateRequestBody,
    type KeyQuorumUpdateRequestBody as KeyQuorumUpdateRequestBody,
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
  };

  export {
    Intents as Intents,
    type BaseActionResult as BaseActionResult,
    type BaseIntentResponse as BaseIntentResponse,
    type IntentAuthorization as IntentAuthorization,
    type IntentAuthorizationKeyMember as IntentAuthorizationKeyMember,
    type IntentAuthorizationKeyQuorum as IntentAuthorizationKeyQuorum,
    type IntentAuthorizationKeyQuorumMember as IntentAuthorizationKeyQuorumMember,
    type IntentAuthorizationMember as IntentAuthorizationMember,
    type IntentAuthorizationUserMember as IntentAuthorizationUserMember,
    type IntentAuthorizeInput as IntentAuthorizeInput,
    type IntentCreationHeaders as IntentCreationHeaders,
    type IntentResponse as IntentResponse,
    type IntentStatus as IntentStatus,
    type IntentType as IntentType,
    type KeyQuorumIntentResponse as KeyQuorumIntentResponse,
    type PolicyIntentRequestDetails as PolicyIntentRequestDetails,
    type PolicyIntentResponse as PolicyIntentResponse,
    type RpcIntentRequestDetails as RpcIntentRequestDetails,
    type RpcIntentResponse as RpcIntentResponse,
    type RuleDeleteIntentResponse as RuleDeleteIntentResponse,
    type RuleIntentCreateRequestDetails as RuleIntentCreateRequestDetails,
    type RuleIntentDeleteRequestBody as RuleIntentDeleteRequestBody,
    type RuleIntentDeleteRequestDetails as RuleIntentDeleteRequestDetails,
    type RuleIntentRequestDetails as RuleIntentRequestDetails,
    type RuleIntentResponse as RuleIntentResponse,
    type RuleIntentUpdateRequestDetails as RuleIntentUpdateRequestDetails,
    type RuleMutateIntentResponse as RuleMutateIntentResponse,
    type TransferIntentRequestDetails as TransferIntentRequestDetails,
    type TransferIntentResponse as TransferIntentResponse,
    type WalletIntentResponse as WalletIntentResponse,
    type IntentResponsesCursor as IntentResponsesCursor,
    type IntentListParams as IntentListParams,
    type IntentCreatePolicyRuleParams as IntentCreatePolicyRuleParams,
    type IntentDeletePolicyRuleParams as IntentDeletePolicyRuleParams,
    type IntentRpcParams as IntentRpcParams,
    type IntentTransferParams as IntentTransferParams,
    type IntentUpdateKeyQuorumParams as IntentUpdateKeyQuorumParams,
    type IntentUpdatePolicyParams as IntentUpdatePolicyParams,
    type IntentUpdatePolicyRuleParams as IntentUpdatePolicyRuleParams,
    type IntentUpdateWalletParams as IntentUpdateWalletParams,
  };

  export {
    Apps as Apps,
    type AllowlistDeletionResponse as AllowlistDeletionResponse,
    type AllowlistEntry as AllowlistEntry,
    type AppAllowlistConfig as AppAllowlistConfig,
    type AppCustomOAuthProvider as AppCustomOAuthProvider,
    type AppResponse as AppResponse,
    type Caip2 as Caip2,
    type Currency as Currency,
    type CurrencyAsset as CurrencyAsset,
    type EmailDomain as EmailDomain,
    type EmailDomainInviteInput as EmailDomainInviteInput,
    type EmailInviteInput as EmailInviteInput,
    type EmbeddedWalletChainConfig as EmbeddedWalletChainConfig,
    type EmbeddedWalletConfigSchema as EmbeddedWalletConfigSchema,
    type EmbeddedWalletCreateOnLogin as EmbeddedWalletCreateOnLogin,
    type EmbeddedWalletInputSchema as EmbeddedWalletInputSchema,
    type EmbeddedWalletMode as EmbeddedWalletMode,
    type FundingConfigResponseSchema as FundingConfigResponseSchema,
    type FundingMethodEnum as FundingMethodEnum,
    type FundingOption as FundingOption,
    type GasSpendCurrency as GasSpendCurrency,
    type GasSpendRequestBody as GasSpendRequestBody,
    type GasSpendResponseBody as GasSpendResponseBody,
    type PhoneInviteInput as PhoneInviteInput,
    type TelegramAuthConfigSchema as TelegramAuthConfigSchema,
    type TestAccount as TestAccount,
    type TestAccountsResponse as TestAccountsResponse,
    type UserInviteInput as UserInviteInput,
    type UserOwnedRecoveryOption as UserOwnedRecoveryOption,
    type WalletInviteInput as WalletInviteInput,
    type AppGetGasSpendParams as AppGetGasSpendParams,
  };

  export {
    Webhooks as Webhooks,
    type BlockInfo as BlockInfo,
    type BridgeCryptoDepositMetadata as BridgeCryptoDepositMetadata,
    type BridgeCryptoTransferMetadata as BridgeCryptoTransferMetadata,
    type BridgeFiatDepositMetadata as BridgeFiatDepositMetadata,
    type BridgeFiatTransferMetadata as BridgeFiatTransferMetadata,
    type BridgeMetadata as BridgeMetadata,
    type BridgeRefundMetadata as BridgeRefundMetadata,
    type BridgeStaticMemoDepositMetadata as BridgeStaticMemoDepositMetadata,
    type BridgeTransferRefundMetadata as BridgeTransferRefundMetadata,
    type FundsDepositedWebhookPayload as FundsDepositedWebhookPayload,
    type FundsWithdrawnWebhookPayload as FundsWithdrawnWebhookPayload,
    type IntentAuthorizedWebhookPayload as IntentAuthorizedWebhookPayload,
    type IntentCreatedWebhookPayload as IntentCreatedWebhookPayload,
    type IntentExecutedWebhookPayload as IntentExecutedWebhookPayload,
    type IntentFailedWebhookPayload as IntentFailedWebhookPayload,
    type IntentRejectedWebhookPayload as IntentRejectedWebhookPayload,
    type KrakenEmbedCustomOrderCancelledWebhookPayload as KrakenEmbedCustomOrderCancelledWebhookPayload,
    type KrakenEmbedCustomOrderExecutedWebhookPayload as KrakenEmbedCustomOrderExecutedWebhookPayload,
    type KrakenEmbedCustomOrderExecutionFailedWebhookPayload as KrakenEmbedCustomOrderExecutionFailedWebhookPayload,
    type KrakenEmbedQuoteCancelledWebhookPayload as KrakenEmbedQuoteCancelledWebhookPayload,
    type KrakenEmbedQuoteExecutedWebhookPayload as KrakenEmbedQuoteExecutedWebhookPayload,
    type KrakenEmbedQuoteExecutionFailedWebhookPayload as KrakenEmbedQuoteExecutionFailedWebhookPayload,
    type KrakenEmbedUserClosedWebhookPayload as KrakenEmbedUserClosedWebhookPayload,
    type KrakenEmbedUserDisabledWebhookPayload as KrakenEmbedUserDisabledWebhookPayload,
    type KrakenEmbedUserVerifiedWebhookPayload as KrakenEmbedUserVerifiedWebhookPayload,
    type MfaDisabledWebhookPayload as MfaDisabledWebhookPayload,
    type MfaEnabledWebhookPayload as MfaEnabledWebhookPayload,
    type PrivateKeyExportWebhookPayload as PrivateKeyExportWebhookPayload,
    type SeedPhraseExportWebhookPayload as SeedPhraseExportWebhookPayload,
    type TransactionBroadcastedWebhookPayload as TransactionBroadcastedWebhookPayload,
    type TransactionConfirmedWebhookPayload as TransactionConfirmedWebhookPayload,
    type TransactionExecutionRevertedWebhookPayload as TransactionExecutionRevertedWebhookPayload,
    type TransactionFailedWebhookPayload as TransactionFailedWebhookPayload,
    type TransactionProviderErrorWebhookPayload as TransactionProviderErrorWebhookPayload,
    type TransactionReplacedWebhookPayload as TransactionReplacedWebhookPayload,
    type TransactionStillPendingWebhookPayload as TransactionStillPendingWebhookPayload,
    type UserAuthenticatedWebhookPayload as UserAuthenticatedWebhookPayload,
    type UserCreatedWebhookPayload as UserCreatedWebhookPayload,
    type UserLinkedAccountWebhookPayload as UserLinkedAccountWebhookPayload,
    type UserOperationCompletedWebhookPayload as UserOperationCompletedWebhookPayload,
    type UserReference as UserReference,
    type UserTransferredAccountWebhookPayload as UserTransferredAccountWebhookPayload,
    type UserUnlinkedAccountWebhookPayload as UserUnlinkedAccountWebhookPayload,
    type UserUpdatedAccountWebhookPayload as UserUpdatedAccountWebhookPayload,
    type UserWalletCreatedWebhookPayload as UserWalletCreatedWebhookPayload,
    type WalletActionEarnDepositCreatedWebhookPayload as WalletActionEarnDepositCreatedWebhookPayload,
    type WalletActionEarnDepositFailedWebhookPayload as WalletActionEarnDepositFailedWebhookPayload,
    type WalletActionEarnDepositRejectedWebhookPayload as WalletActionEarnDepositRejectedWebhookPayload,
    type WalletActionEarnDepositSucceededWebhookPayload as WalletActionEarnDepositSucceededWebhookPayload,
    type WalletActionEarnIncentiveClaimCreatedWebhookPayload as WalletActionEarnIncentiveClaimCreatedWebhookPayload,
    type WalletActionEarnIncentiveClaimFailedWebhookPayload as WalletActionEarnIncentiveClaimFailedWebhookPayload,
    type WalletActionEarnIncentiveClaimRejectedWebhookPayload as WalletActionEarnIncentiveClaimRejectedWebhookPayload,
    type WalletActionEarnIncentiveClaimSucceededWebhookPayload as WalletActionEarnIncentiveClaimSucceededWebhookPayload,
    type WalletActionEarnWithdrawCreatedWebhookPayload as WalletActionEarnWithdrawCreatedWebhookPayload,
    type WalletActionEarnWithdrawFailedWebhookPayload as WalletActionEarnWithdrawFailedWebhookPayload,
    type WalletActionEarnWithdrawRejectedWebhookPayload as WalletActionEarnWithdrawRejectedWebhookPayload,
    type WalletActionEarnWithdrawSucceededWebhookPayload as WalletActionEarnWithdrawSucceededWebhookPayload,
    type WalletActionSwapCreatedWebhookPayload as WalletActionSwapCreatedWebhookPayload,
    type WalletActionSwapFailedWebhookPayload as WalletActionSwapFailedWebhookPayload,
    type WalletActionSwapRejectedWebhookPayload as WalletActionSwapRejectedWebhookPayload,
    type WalletActionSwapSucceededWebhookPayload as WalletActionSwapSucceededWebhookPayload,
    type WalletActionTransferCreatedWebhookPayload as WalletActionTransferCreatedWebhookPayload,
    type WalletActionTransferFailedWebhookPayload as WalletActionTransferFailedWebhookPayload,
    type WalletActionTransferRejectedWebhookPayload as WalletActionTransferRejectedWebhookPayload,
    type WalletActionTransferSucceededWebhookPayload as WalletActionTransferSucceededWebhookPayload,
    type WalletArchivedWebhookPayload as WalletArchivedWebhookPayload,
    type WalletFundsAsset as WalletFundsAsset,
    type WalletFundsErc20Asset as WalletFundsErc20Asset,
    type WalletFundsNativeTokenAsset as WalletFundsNativeTokenAsset,
    type WalletFundsSacAsset as WalletFundsSacAsset,
    type WalletFundsSplAsset as WalletFundsSplAsset,
    type WalletRecoveredWebhookPayload as WalletRecoveredWebhookPayload,
    type WalletRecoverySetupWebhookPayload as WalletRecoverySetupWebhookPayload,
    type WebhookPayload as WebhookPayload,
    type YieldClaimConfirmedWebhookPayload as YieldClaimConfirmedWebhookPayload,
    type YieldClaimReward as YieldClaimReward,
    type YieldDepositConfirmedWebhookPayload as YieldDepositConfirmedWebhookPayload,
    type YieldWithdrawConfirmedWebhookPayload as YieldWithdrawConfirmedWebhookPayload,
    type UnsafeUnwrapWebhookEvent as UnsafeUnwrapWebhookEvent,
  };

  export {
    Accounts as Accounts,
    type AccountBalanceParams as AccountBalanceParams,
    type AccountBalanceResponse as AccountBalanceResponse,
    type AccountDisplayName as AccountDisplayName,
    type AccountResponse as AccountResponse,
    type AccountWallet as AccountWallet,
    type AccountWalletConfigurationItem as AccountWalletConfigurationItem,
    type AccountWalletIDs as AccountWalletIDs,
    type AccountWalletsConfiguration as AccountWalletsConfiguration,
    type AccountsDashboardListResponse as AccountsDashboardListResponse,
    type AccountsListResponse as AccountsListResponse,
    type AssetAccountWithBalance as AssetAccountWithBalance,
    type BalanceAsset as BalanceAsset,
    type BalanceAssetByChain as BalanceAssetByChain,
    type BalanceResponse as BalanceResponse,
    type CreateAccountFromWalletIDsInput as CreateAccountFromWalletIDsInput,
    type CreateAccountFromWalletsConfigurationInput as CreateAccountFromWalletsConfigurationInput,
    type CreateAccountInput as CreateAccountInput,
    type UpdateAccountFromWalletIDsInput as UpdateAccountFromWalletIDsInput,
    type UpdateAccountFromWalletsConfigurationInput as UpdateAccountFromWalletsConfigurationInput,
    type UpdateAccountInput as UpdateAccountInput,
  };

  export {
    Aggregations as Aggregations,
    type Aggregation as Aggregation,
    type AggregationGroupBy as AggregationGroupBy,
    type AggregationInput as AggregationInput,
    type AggregationMethod as AggregationMethod,
    type AggregationMetric as AggregationMetric,
    type AggregationWindow as AggregationWindow,
    type RollingAggregationWindow as RollingAggregationWindow,
  };

  export {
    EmbeddedWallets as EmbeddedWallets,
    type AlchemyPaymasterContext as AlchemyPaymasterContext,
    type EmbeddedWalletCreationInput as EmbeddedWalletCreationInput,
    type ICloudClientType as ICloudClientType,
    type OAuthAuthenticateRecoveryResponse as OAuthAuthenticateRecoveryResponse,
    type OAuthCallbackICloudExpoInput as OAuthCallbackICloudExpoInput,
    type OAuthInitICloudRecoveryInput as OAuthInitICloudRecoveryInput,
    type OAuthInitRecoveryInput as OAuthInitRecoveryInput,
    type RecoveryConfigurationICloudInput as RecoveryConfigurationICloudInput,
    type RecoveryConfigurationICloudResponse as RecoveryConfigurationICloudResponse,
    type RecoveryKeyMaterialInput as RecoveryKeyMaterialInput,
    type RecoveryKeyMaterialResponse as RecoveryKeyMaterialResponse,
    type RecoveryType as RecoveryType,
    type SmartWalletConfiguration as SmartWalletConfiguration,
    type SmartWalletConfigurationDisabled as SmartWalletConfigurationDisabled,
    type SmartWalletConfigurationEnabled as SmartWalletConfigurationEnabled,
    type SmartWalletConfigurationInput as SmartWalletConfigurationInput,
    type SmartWalletConfigurationInputEnabled as SmartWalletConfigurationInputEnabled,
    type SmartWalletNetworkConfiguration as SmartWalletNetworkConfiguration,
    type SmartWalletNetworkConfigurationInput as SmartWalletNetworkConfigurationInput,
    type SmartWalletType as SmartWalletType,
    type WalletCreationAdditionalSignerItem as WalletCreationAdditionalSignerItem,
    type WalletCreationInput as WalletCreationInput,
  };

  export { Analytics as Analytics, type AnalyticsEventInput as AnalyticsEventInput };

  export {
    ClientAuth as ClientAuth,
    type AuthenticateJwtInput as AuthenticateJwtInput,
    type AuthenticateMode as AuthenticateMode,
    type AuthenticateModeOption as AuthenticateModeOption,
    type AuthenticateSiweInput as AuthenticateSiweInput,
    type AuthenticateSiwsInput as AuthenticateSiwsInput,
    type BridgeBrlFiatVirtualAccountDepositInstructions as BridgeBrlFiatVirtualAccountDepositInstructions,
    type BridgeDestinationAsset as BridgeDestinationAsset,
    type BridgeEurFiatVirtualAccountDepositInstructions as BridgeEurFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDepositInstructions as BridgeFiatVirtualAccountDepositInstructions,
    type BridgeFiatVirtualAccountDestination as BridgeFiatVirtualAccountDestination,
    type BridgeFiatVirtualAccountRequest as BridgeFiatVirtualAccountRequest,
    type BridgeFiatVirtualAccountResponse as BridgeFiatVirtualAccountResponse,
    type BridgeFiatVirtualAccountSource as BridgeFiatVirtualAccountSource,
    type BridgeGbpFiatVirtualAccountDepositInstructions as BridgeGbpFiatVirtualAccountDepositInstructions,
    type BridgeMxnFiatVirtualAccountDepositInstructions as BridgeMxnFiatVirtualAccountDepositInstructions,
    type BridgeOnrampProvider as BridgeOnrampProvider,
    type BridgeSandboxFiatVirtualAccountRequest as BridgeSandboxFiatVirtualAccountRequest,
    type BridgeSandboxFiatVirtualAccountResponse as BridgeSandboxFiatVirtualAccountResponse,
    type BridgeSourceAsset as BridgeSourceAsset,
    type BridgeUsdFiatVirtualAccountDepositInstructions as BridgeUsdFiatVirtualAccountDepositInstructions,
    type CustomJwtAuthenticateRequestBody as CustomJwtAuthenticateRequestBody,
    type CustomJwtLinkRequestBody as CustomJwtLinkRequestBody,
    type CustomOAuthProviderID as CustomOAuthProviderID,
    type DeviceVerifyAction as DeviceVerifyAction,
    type DeviceVerifyRequestBody as DeviceVerifyRequestBody,
    type DeviceVerifyResponse as DeviceVerifyResponse,
    type ExternalOAuthProviderID as ExternalOAuthProviderID,
    type FarcasterAuthenticateInput as FarcasterAuthenticateInput,
    type FarcasterAuthenticateRequestBody as FarcasterAuthenticateRequestBody,
    type FarcasterConnectInitResponse as FarcasterConnectInitResponse,
    type FarcasterConnectInitResponseBody as FarcasterConnectInitResponseBody,
    type FarcasterConnectStatusCompletedResponse as FarcasterConnectStatusCompletedResponse,
    type FarcasterConnectStatusCompletedResponseBody as FarcasterConnectStatusCompletedResponseBody,
    type FarcasterConnectStatusPendingResponse as FarcasterConnectStatusPendingResponse,
    type FarcasterConnectStatusPendingResponseBody as FarcasterConnectStatusPendingResponseBody,
    type FarcasterInitInput as FarcasterInitInput,
    type FarcasterInitRequestBody as FarcasterInitRequestBody,
    type FarcasterLinkInput as FarcasterLinkInput,
    type FarcasterLinkRequestBody as FarcasterLinkRequestBody,
    type FarcasterSignerApproved as FarcasterSignerApproved,
    type FarcasterSignerInitPendingApproval as FarcasterSignerInitPendingApproval,
    type FarcasterSignerInitRequestBody as FarcasterSignerInitRequestBody,
    type FarcasterSignerInitResponseBody as FarcasterSignerInitResponseBody,
    type FarcasterSignerRevoked as FarcasterSignerRevoked,
    type FarcasterSignerStatusPendingApproval as FarcasterSignerStatusPendingApproval,
    type FarcasterSignerStatusResponseBody as FarcasterSignerStatusResponseBody,
    type FarcasterUnlinkInput as FarcasterUnlinkInput,
    type FarcasterUnlinkRequestBody as FarcasterUnlinkRequestBody,
    type FarcasterV2AuthenticateInput as FarcasterV2AuthenticateInput,
    type FarcasterV2AuthenticateRequestBody as FarcasterV2AuthenticateRequestBody,
    type FarcasterV2InitInput as FarcasterV2InitInput,
    type FarcasterV2InitRequestBody as FarcasterV2InitRequestBody,
    type FarcasterV2InitResponse as FarcasterV2InitResponse,
    type FarcasterV2InitResponseBody as FarcasterV2InitResponseBody,
    type FiatVirtualAccountRequest as FiatVirtualAccountRequest,
    type FiatVirtualAccountResponse as FiatVirtualAccountResponse,
    type GuestAuthenticateRequestBody as GuestAuthenticateRequestBody,
    type LinkJwtInput as LinkJwtInput,
    type MfaPasskeyEnrollmentRequestBody as MfaPasskeyEnrollmentRequestBody,
    type MfaPasskeyInitRequestBody as MfaPasskeyInitRequestBody,
    type MfaPasskeyInitResponseBody as MfaPasskeyInitResponseBody,
    type MfaPasskeyVerifyRequestBody as MfaPasskeyVerifyRequestBody,
    type MfaSMSEnrollRequestBody as MfaSMSEnrollRequestBody,
    type MfaSMSInitEnrollInput as MfaSMSInitEnrollInput,
    type MfaSMSInitRequestBody as MfaSMSInitRequestBody,
    type MfaSMSInitVerifyInput as MfaSMSInitVerifyInput,
    type MfaSMSVerifyRequestBody as MfaSMSVerifyRequestBody,
    type MfaTotpInitResponseBody as MfaTotpInitResponseBody,
    type MfaTotpInput as MfaTotpInput,
    type MfaVerifyResponseBody as MfaVerifyResponseBody,
    type OAuthAuthenticateRequestBody as OAuthAuthenticateRequestBody,
    type OAuthAuthorizationCodeRequestBody as OAuthAuthorizationCodeRequestBody,
    type OAuthCodeType as OAuthCodeType,
    type OAuthInitRequestBody as OAuthInitRequestBody,
    type OAuthInitResponseBody as OAuthInitResponseBody,
    type OAuthLinkRequestBody as OAuthLinkRequestBody,
    type OAuthLinkResponseBody as OAuthLinkResponseBody,
    type OAuthProviderID as OAuthProviderID,
    type OAuthTokenAuthorizationCodeRequestBody as OAuthTokenAuthorizationCodeRequestBody,
    type OAuthTokenDeviceCodePendingError as OAuthTokenDeviceCodePendingError,
    type OAuthTokenDeviceCodeRequestBody as OAuthTokenDeviceCodeRequestBody,
    type OAuthTokenGrantType as OAuthTokenGrantType,
    type OAuthTokenRefreshTokenRequestBody as OAuthTokenRefreshTokenRequestBody,
    type OAuthTokenRequestBody as OAuthTokenRequestBody,
    type OAuthTokenSuccessResponse as OAuthTokenSuccessResponse,
    type OAuthTransferRequestBody as OAuthTransferRequestBody,
    type OAuthTransferUserInfo as OAuthTransferUserInfo,
    type OAuthTransferUserInfoMeta as OAuthTransferUserInfoMeta,
    type OAuthUnlinkRequestBody as OAuthUnlinkRequestBody,
    type OAuthVerifyRequestBody as OAuthVerifyRequestBody,
    type OAuthVerifyResponseBody as OAuthVerifyResponseBody,
    type OnrampProvider as OnrampProvider,
    type OptionalRefreshTokenInput as OptionalRefreshTokenInput,
    type PasskeyAssertionResponse as PasskeyAssertionResponse,
    type PasskeyAttestationResponse as PasskeyAttestationResponse,
    type PasskeyAuthenticateInput as PasskeyAuthenticateInput,
    type PasskeyAuthenticatorEnrollmentOptions as PasskeyAuthenticatorEnrollmentOptions,
    type PasskeyAuthenticatorEnrollmentResponse as PasskeyAuthenticatorEnrollmentResponse,
    type PasskeyAuthenticatorSelection as PasskeyAuthenticatorSelection,
    type PasskeyAuthenticatorVerifyOptions as PasskeyAuthenticatorVerifyOptions,
    type PasskeyAuthenticatorVerifyResponse as PasskeyAuthenticatorVerifyResponse,
    type PasskeyClientExtensionResults as PasskeyClientExtensionResults,
    type PasskeyCredPropsResult as PasskeyCredPropsResult,
    type PasskeyCredentialDescriptor as PasskeyCredentialDescriptor,
    type PasskeyEnrollmentExtensions as PasskeyEnrollmentExtensions,
    type PasskeyInitInput as PasskeyInitInput,
    type PasskeyLinkInput as PasskeyLinkInput,
    type PasskeyPubKeyCredParam as PasskeyPubKeyCredParam,
    type PasskeyRegisterInput as PasskeyRegisterInput,
    type PasskeyRelyingParty as PasskeyRelyingParty,
    type PasskeyUser as PasskeyUser,
    type PasskeyVerifyExtensions as PasskeyVerifyExtensions,
    type PasswordlessAuthenticateRequestBody as PasswordlessAuthenticateRequestBody,
    type PasswordlessInitRequestBody as PasswordlessInitRequestBody,
    type PasswordlessLinkRequestBody as PasswordlessLinkRequestBody,
    type PasswordlessSMSAuthenticateRequestBody as PasswordlessSMSAuthenticateRequestBody,
    type PasswordlessSMSInitRequestBody as PasswordlessSMSInitRequestBody,
    type PasswordlessSMSLinkRequestBody as PasswordlessSMSLinkRequestBody,
    type PasswordlessSMSTransferRequestBody as PasswordlessSMSTransferRequestBody,
    type PasswordlessSMSUnlinkRequestBody as PasswordlessSMSUnlinkRequestBody,
    type PasswordlessSMSUpdateRequestBody as PasswordlessSMSUpdateRequestBody,
    type PasswordlessTransferRequestBody as PasswordlessTransferRequestBody,
    type PasswordlessUnlinkRequestBody as PasswordlessUnlinkRequestBody,
    type PasswordlessUpdateRequestBody as PasswordlessUpdateRequestBody,
    type PrivyOAuthProviderID as PrivyOAuthProviderID,
    type ResponsePasskeyInitAuthenticate as ResponsePasskeyInitAuthenticate,
    type ResponsePasskeyInitLink as ResponsePasskeyInitLink,
    type ResponsePasskeyInitRegister as ResponsePasskeyInitRegister,
    type SiweAddressInput as SiweAddressInput,
    type SiweAuthenticateRequestBody as SiweAuthenticateRequestBody,
    type SiweInitInput as SiweInitInput,
    type SiweInitRequestBody as SiweInitRequestBody,
    type SiweInitResponseBody as SiweInitResponseBody,
    type SiweInput as SiweInput,
    type SiweLinkRequestBody as SiweLinkRequestBody,
    type SiweLinkSmartWalletRequestBody as SiweLinkSmartWalletRequestBody,
    type SiweNonce as SiweNonce,
    type SiweUnlinkRequestBody as SiweUnlinkRequestBody,
    type SiwsAddressInput as SiwsAddressInput,
    type SiwsAuthenticateRequestBody as SiwsAuthenticateRequestBody,
    type SiwsInitInput as SiwsInitInput,
    type SiwsInitRequestBody as SiwsInitRequestBody,
    type SiwsInitResponseBody as SiwsInitResponseBody,
    type SiwsInput as SiwsInput,
    type SiwsLinkRequestBody as SiwsLinkRequestBody,
    type SiwsNonce as SiwsNonce,
    type SiwsUnlinkRequestBody as SiwsUnlinkRequestBody,
    type SmartWalletSiweInput as SmartWalletSiweInput,
    type TelegramAuthResult as TelegramAuthResult,
    type TelegramAuthenticateInput as TelegramAuthenticateInput,
    type TelegramAuthenticateRequestBody as TelegramAuthenticateRequestBody,
    type TelegramLinkRequestBody as TelegramLinkRequestBody,
    type TelegramUnlinkInput as TelegramUnlinkInput,
    type TelegramUnlinkRequestBody as TelegramUnlinkRequestBody,
    type TelegramWebAppData as TelegramWebAppData,
    type TransferFarcasterInput as TransferFarcasterInput,
    type TransferSiweInput as TransferSiweInput,
    type TransferSiwsInput as TransferSiwsInput,
    type TransferTelegramInput as TransferTelegramInput,
    type UnlinkPasskeyInput as UnlinkPasskeyInput,
  };

  export {
    Shared as Shared,
    type BitcoinAddress as BitcoinAddress,
    type CurrencyAmount as CurrencyAmount,
    type EvmAddress as EvmAddress,
    type EvmChecksumAddress as EvmChecksumAddress,
    type HyperliquidTokenAddress as HyperliquidTokenAddress,
    type KeyQuorumID as KeyQuorumID,
    type OwnerIDInput as OwnerIDInput,
    type OwnerInput as OwnerInput,
    type OwnerInputPublicKey as OwnerInputPublicKey,
    type OwnerInputUser as OwnerInputUser,
    type P256PublicKey as P256PublicKey,
    type SolanaAddress as SolanaAddress,
    type SuccessResponse as SuccessResponse,
    type TronAddress as TronAddress,
  };

  export {
    Onramps as Onramps,
    type BridgeFiatCustomerResponse as BridgeFiatCustomerResponse,
    type BridgeFiatRejectionReason as BridgeFiatRejectionReason,
    type BridgeSandboxFiatCustomerResponse as BridgeSandboxFiatCustomerResponse,
    type Caip2ChainID as Caip2ChainID,
    type CreateLinkAuthIntentInput as CreateLinkAuthIntentInput,
    type CreateLinkAuthIntentResponse as CreateLinkAuthIntentResponse,
    type CreateOrUpdateFiatCustomerRequestInput as CreateOrUpdateFiatCustomerRequestInput,
    type CreateStripeOnrampSessionInput as CreateStripeOnrampSessionInput,
    type CreateStripeOnrampSessionResponse as CreateStripeOnrampSessionResponse,
    type CryptoCurrencyCode as CryptoCurrencyCode,
    type ExchangeStripeTokensInput as ExchangeStripeTokensInput,
    type ExchangeStripeTokensResponse as ExchangeStripeTokensResponse,
    type FiatAmount as FiatAmount,
    type FiatCurrencyCode as FiatCurrencyCode,
    type FiatCustomerResponse as FiatCustomerResponse,
    type FiatOnrampDestination as FiatOnrampDestination,
    type FiatOnrampEnvironment as FiatOnrampEnvironment,
    type FiatOnrampProvider as FiatOnrampProvider,
    type FiatOnrampProviderError as FiatOnrampProviderError,
    type FiatOnrampQuote as FiatOnrampQuote,
    type FiatOnrampSource as FiatOnrampSource,
    type FiatOnrampStripeSDKSessionResponse as FiatOnrampStripeSDKSessionResponse,
    type FiatOnrampTransactionStatus as FiatOnrampTransactionStatus,
    type FiatOnrampURLSessionResponse as FiatOnrampURLSessionResponse,
    type GetFiatCustomerRequestInput as GetFiatCustomerRequestInput,
    type GetFiatOnrampQuotesInput as GetFiatOnrampQuotesInput,
    type GetFiatOnrampQuotesResponse as GetFiatOnrampQuotesResponse,
    type GetFiatOnrampTransactionStatusInput as GetFiatOnrampTransactionStatusInput,
    type GetFiatOnrampTransactionStatusResponse as GetFiatOnrampTransactionStatusResponse,
    type GetFiatOnrampURLInput as GetFiatOnrampURLInput,
    type GetFiatOnrampURLResponse as GetFiatOnrampURLResponse,
    type GetStripeCryptoCustomerResponse as GetStripeCryptoCustomerResponse,
    type LinkAuthIntentCreated as LinkAuthIntentCreated,
    type LinkAuthIntentNoAccount as LinkAuthIntentNoAccount,
    type ListStripeConsumerWalletsResponse as ListStripeConsumerWalletsResponse,
    type ListStripePaymentTokensResponse as ListStripePaymentTokensResponse,
    type OnrampSessionParams as OnrampSessionParams,
    type OnrampSessionTransactionDetails as OnrampSessionTransactionDetails,
    type RefreshStripeQuoteResponse as RefreshStripeQuoteResponse,
    type StripeConsumerWallet as StripeConsumerWallet,
    type StripeCryptoCustomerActive as StripeCryptoCustomerActive,
    type StripeCryptoCustomerExpired as StripeCryptoCustomerExpired,
    type StripeCryptoCustomerNone as StripeCryptoCustomerNone,
    type StripeKYCTier as StripeKYCTier,
    type StripeOnrampCheckoutResponse as StripeOnrampCheckoutResponse,
    type StripeOnrampSessionStatus as StripeOnrampSessionStatus,
    type StripePaymentToken as StripePaymentToken,
    type StripeTransactionDetails as StripeTransactionDetails,
    type StripeVerification as StripeVerification,
  };

  export {
    Funding as Funding,
    type CoinbaseBlockchain as CoinbaseBlockchain,
    type CoinbaseEthereumAsset as CoinbaseEthereumAsset,
    type CoinbaseOnRampEthereumAddress as CoinbaseOnRampEthereumAddress,
    type CoinbaseOnRampInitEthereumInput as CoinbaseOnRampInitEthereumInput,
    type CoinbaseOnRampInitInput as CoinbaseOnRampInitInput,
    type CoinbaseOnRampInitResponse as CoinbaseOnRampInitResponse,
    type CoinbaseOnRampInitSolanaInput as CoinbaseOnRampInitSolanaInput,
    type CoinbaseOnRampSolanaAddress as CoinbaseOnRampSolanaAddress,
    type CoinbaseOnRampStatus as CoinbaseOnRampStatus,
    type CoinbaseOnRampStatusResponse as CoinbaseOnRampStatusResponse,
    type CoinbaseSolanaAsset as CoinbaseSolanaAsset,
    type MoonpayCurrencyCode as MoonpayCurrencyCode,
    type MoonpayFiatOnRampEthereumConfig as MoonpayFiatOnRampEthereumConfig,
    type MoonpayFiatOnRampEthereumInput as MoonpayFiatOnRampEthereumInput,
    type MoonpayFiatOnRampSolanaConfig as MoonpayFiatOnRampSolanaConfig,
    type MoonpayFiatOnRampSolanaInput as MoonpayFiatOnRampSolanaInput,
    type MoonpayOnRampSandboxConfig as MoonpayOnRampSandboxConfig,
    type MoonpayOnRampSignInput as MoonpayOnRampSignInput,
    type MoonpayOnRampSignResponse as MoonpayOnRampSignResponse,
    type MoonpayPaymentMethod as MoonpayPaymentMethod,
    type MoonpaySolanaCurrencyCode as MoonpaySolanaCurrencyCode,
    type MoonpayUiConfig as MoonpayUiConfig,
    type MoonpayUiTheme as MoonpayUiTheme,
  };

  export {
    Organizations as Organizations,
    type CreateOrganizationSecretResponse as CreateOrganizationSecretResponse,
    type OrganizationSecretIDInput as OrganizationSecretIDInput,
    type OrganizationSecretView as OrganizationSecretView,
    type OrganizationSecretsListResponse as OrganizationSecretsListResponse,
    type UpdateOrganizationSecretSigningKeyInput as UpdateOrganizationSecretSigningKeyInput,
  };

  export {
    CrossApp as CrossApp,
    type CrossAppConnection as CrossAppConnection,
    type CrossAppConnectionsResponse as CrossAppConnectionsResponse,
  };

  export {
    WalletActions as WalletActions,
    type CustodianTransactionWalletActionStep as CustodianTransactionWalletActionStep,
    type CustodianTransactionWalletActionStepStatus as CustodianTransactionWalletActionStepStatus,
    type EvmTransactionWalletActionStep as EvmTransactionWalletActionStep,
    type EvmUserOperationWalletActionStep as EvmUserOperationWalletActionStep,
    type EvmWalletActionStepStatus as EvmWalletActionStepStatus,
    type EarnAsset as EarnAsset,
    type EarnDepositActionResponse as EarnDepositActionResponse,
    type EarnDepositRequestBody as EarnDepositRequestBody,
    type EarnIncentiveClaimActionResponse as EarnIncentiveClaimActionResponse,
    type EarnIncentiveClaimRequestBody as EarnIncentiveClaimRequestBody,
    type EarnIncentiveRewardEntry as EarnIncentiveRewardEntry,
    type EarnIncentiveRewardsQuery as EarnIncentiveRewardsQuery,
    type EarnIncentiveRewardsResponse as EarnIncentiveRewardsResponse,
    type EarnIncetiveClaimRewardEntry as EarnIncetiveClaimRewardEntry,
    type EarnWithdrawActionResponse as EarnWithdrawActionResponse,
    type EarnWithdrawRequestBody as EarnWithdrawRequestBody,
    type EthereumEarnPositionQuery as EthereumEarnPositionQuery,
    type EthereumEarnPositionResponse as EthereumEarnPositionResponse,
    type EthereumEarnProvider as EthereumEarnProvider,
    type EthereumEarnVaultDetailsResponse as EthereumEarnVaultDetailsResponse,
    type ExternalTransactionWalletActionStep as ExternalTransactionWalletActionStep,
    type ExternalTransactionWalletActionStepStatus as ExternalTransactionWalletActionStepStatus,
    type FailureReason as FailureReason,
    type ListWalletActionsQuery as ListWalletActionsQuery,
    type ListWalletActionsResponse as ListWalletActionsResponse,
    type SvmTransactionWalletActionStep as SvmTransactionWalletActionStep,
    type SvmWalletActionStepStatus as SvmWalletActionStepStatus,
    type SwapActionResponse as SwapActionResponse,
    type TransferActionResponse as TransferActionResponse,
    type WalletActionInclude as WalletActionInclude,
    type WalletActionResponse as WalletActionResponse,
    type WalletActionStatus as WalletActionStatus,
    type WalletActionStep as WalletActionStep,
    type WalletActionStepType as WalletActionStepType,
    type WalletActionType as WalletActionType,
  };

  export {
    OAuth as OAuth,
    type DeviceAuthorizationResponse as DeviceAuthorizationResponse,
    type OAuthGrant as OAuthGrant,
    type OAuthGrantListResponse as OAuthGrantListResponse,
    type OAuthGrantRevokeResponse as OAuthGrantRevokeResponse,
  };

  export {
    Yield as Yield,
    type EthereumVaultDetailsInput as EthereumVaultDetailsInput,
    type EthereumVaultDetailsResponse as EthereumVaultDetailsResponse,
    type EthereumVaultPosition as EthereumVaultPosition,
    type EthereumVaultResponse as EthereumVaultResponse,
    type EthereumYieldClaimIDInput as EthereumYieldClaimIDInput,
    type EthereumYieldClaimInput as EthereumYieldClaimInput,
    type EthereumYieldClaimResponse as EthereumYieldClaimResponse,
    type EthereumYieldClaimReward as EthereumYieldClaimReward,
    type EthereumYieldDepositInput as EthereumYieldDepositInput,
    type EthereumYieldPositionResponse as EthereumYieldPositionResponse,
    type EthereumYieldPositionsInput as EthereumYieldPositionsInput,
    type EthereumYieldProvider as EthereumYieldProvider,
    type EthereumYieldSweepIDInput as EthereumYieldSweepIDInput,
    type EthereumYieldSweepResponse as EthereumYieldSweepResponse,
    type EthereumYieldSweepStatus as EthereumYieldSweepStatus,
    type EthereumYieldSweepType as EthereumYieldSweepType,
    type EthereumYieldWithdrawInput as EthereumYieldWithdrawInput,
    type EvmCaip2ChainID as EvmCaip2ChainID,
    type VaultAsset as VaultAsset,
    type YieldAuthorizationHeaders as YieldAuthorizationHeaders,
  };

  export {
    KrakenEmbed as KrakenEmbed,
    type KrakenEmbedCancelCustomOrderInput as KrakenEmbedCancelCustomOrderInput,
    type KrakenEmbedCancelCustomOrderPath as KrakenEmbedCancelCustomOrderPath,
    type KrakenEmbedCancelCustomOrderResponse as KrakenEmbedCancelCustomOrderResponse,
    type KrakenEmbedCancelCustomOrderResult as KrakenEmbedCancelCustomOrderResult,
    type KrakenEmbedCreateCustomOrderInput as KrakenEmbedCreateCustomOrderInput,
    type KrakenEmbedCreateCustomOrderResponse as KrakenEmbedCreateCustomOrderResponse,
    type KrakenEmbedCreateCustomOrderResult as KrakenEmbedCreateCustomOrderResult,
    type KrakenEmbedCurrentDayPnl as KrakenEmbedCurrentDayPnl,
    type KrakenEmbedCustomOrder as KrakenEmbedCustomOrder,
    type KrakenEmbedCustomOrderAction as KrakenEmbedCustomOrderAction,
    type KrakenEmbedCustomOrderAmount as KrakenEmbedCustomOrderAmount,
    type KrakenEmbedCustomOrderOccurrence as KrakenEmbedCustomOrderOccurrence,
    type KrakenEmbedCustomOrderOccurrenceExecutedAction as KrakenEmbedCustomOrderOccurrenceExecutedAction,
    type KrakenEmbedCustomOrderOccurrenceTrigger as KrakenEmbedCustomOrderOccurrenceTrigger,
    type KrakenEmbedCustomOrderQuoteAsset as KrakenEmbedCustomOrderQuoteAsset,
    type KrakenEmbedCustomOrderStatus as KrakenEmbedCustomOrderStatus,
    type KrakenEmbedCustomOrderTrigger as KrakenEmbedCustomOrderTrigger,
    type KrakenEmbedEarnAmount as KrakenEmbedEarnAmount,
    type KrakenEmbedEarnAprEstimate as KrakenEmbedEarnAprEstimate,
    type KrakenEmbedEarnAsset as KrakenEmbedEarnAsset,
    type KrakenEmbedEarnUserAllocation as KrakenEmbedEarnUserAllocation,
    type KrakenEmbedFullName as KrakenEmbedFullName,
    type KrakenEmbedGetAssetListQueryParamsSchema as KrakenEmbedGetAssetListQueryParamsSchema,
    type KrakenEmbedGetCustomOrderHistoryQueryParams as KrakenEmbedGetCustomOrderHistoryQueryParams,
    type KrakenEmbedGetCustomOrderHistoryResponse as KrakenEmbedGetCustomOrderHistoryResponse,
    type KrakenEmbedGetCustomOrderHistoryResult as KrakenEmbedGetCustomOrderHistoryResult,
    type KrakenEmbedGetCustomOrderQueryParams as KrakenEmbedGetCustomOrderQueryParams,
    type KrakenEmbedGetCustomOrderResponse as KrakenEmbedGetCustomOrderResponse,
    type KrakenEmbedGetCustomOrderResult as KrakenEmbedGetCustomOrderResult,
    type KrakenEmbedGetEarnAssetsKrakenResponse as KrakenEmbedGetEarnAssetsKrakenResponse,
    type KrakenEmbedGetEarnAssetsQueryParams as KrakenEmbedGetEarnAssetsQueryParams,
    type KrakenEmbedGetEarnAssetsResponse as KrakenEmbedGetEarnAssetsResponse,
    type KrakenEmbedGetEarnAssetsResult as KrakenEmbedGetEarnAssetsResult,
    type KrakenEmbedGetEarnSummaryKrakenResponse as KrakenEmbedGetEarnSummaryKrakenResponse,
    type KrakenEmbedGetEarnSummaryQueryParams as KrakenEmbedGetEarnSummaryQueryParams,
    type KrakenEmbedGetEarnSummaryResponse as KrakenEmbedGetEarnSummaryResponse,
    type KrakenEmbedGetEarnSummaryResult as KrakenEmbedGetEarnSummaryResult,
    type KrakenEmbedGetPortfolioDetailsQueryParamsSchema as KrakenEmbedGetPortfolioDetailsQueryParamsSchema,
    type KrakenEmbedGetPortfolioSummaryQueryParams as KrakenEmbedGetPortfolioSummaryQueryParams,
    type KrakenEmbedGetPortfolioSummaryResponse as KrakenEmbedGetPortfolioSummaryResponse,
    type KrakenEmbedGetPortfolioSummaryResult as KrakenEmbedGetPortfolioSummaryResult,
    type KrakenEmbedGetPortfolioTransactionsQueryParamsSchema as KrakenEmbedGetPortfolioTransactionsQueryParamsSchema,
    type KrakenEmbedGetQuoteQueryParams as KrakenEmbedGetQuoteQueryParams,
    type KrakenEmbedListCustomOrdersQueryParams as KrakenEmbedListCustomOrdersQueryParams,
    type KrakenEmbedListCustomOrdersResponse as KrakenEmbedListCustomOrdersResponse,
    type KrakenEmbedListCustomOrdersResult as KrakenEmbedListCustomOrdersResult,
    type KrakenEmbedPortfolioSummaryPayload as KrakenEmbedPortfolioSummaryPayload,
    type KrakenEmbedPortfolioTransactionRefID as KrakenEmbedPortfolioTransactionRefID,
    type KrakenEmbedPortfolioTransactionRefIDType as KrakenEmbedPortfolioTransactionRefIDType,
    type KrakenEmbedResidence as KrakenEmbedResidence,
    type KrakenEmbedStartAddressMetadata as KrakenEmbedStartAddressMetadata,
    type KrakenEmbedStartAddressVerificationURLInput as KrakenEmbedStartAddressVerificationURLInput,
    type KrakenEmbedStartIdentityInfo as KrakenEmbedStartIdentityInfo,
    type KrakenEmbedStartIdentityMetadata as KrakenEmbedStartIdentityMetadata,
    type KrakenEmbedStartIdentityVerificationURLInput as KrakenEmbedStartIdentityVerificationURLInput,
    type KrakenEmbedStartLivenessVerificationURLInput as KrakenEmbedStartLivenessVerificationURLInput,
    type KrakenEmbedStartVerificationDebug as KrakenEmbedStartVerificationDebug,
    type KrakenEmbedStartVerificationURLInput as KrakenEmbedStartVerificationURLInput,
    type KrakenEmbedStartVerificationURLResponse as KrakenEmbedStartVerificationURLResponse,
    type KrakenEmbedStartVerificationURLResult as KrakenEmbedStartVerificationURLResult,
    type KrakenEmbedToggleAutoEarnKrakenResponse as KrakenEmbedToggleAutoEarnKrakenResponse,
    type KrakenEmbedToggleAutoEarnQueryParams as KrakenEmbedToggleAutoEarnQueryParams,
    type KrakenEmbedToggleAutoEarnResponse as KrakenEmbedToggleAutoEarnResponse,
    type KrakenEmbedUpcomingReward as KrakenEmbedUpcomingReward,
  };

  export {
    Swaps as Swaps,
    type SwapDestination as SwapDestination,
    type SwapQuoteDestination as SwapQuoteDestination,
    type SwapQuoteRequestBody as SwapQuoteRequestBody,
    type SwapQuoteResponse as SwapQuoteResponse,
    type SwapRequestBody as SwapRequestBody,
    type SwapSource as SwapSource,
  };
}
