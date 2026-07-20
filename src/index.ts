export {
  PrivyClient,
  type PrivyClientOptions,
  type PrivyRequestExpiryOptions,
} from './public-api/PrivyClient';
export { type PrivyWalletsService } from './public-api/services/wallets';
export { type PrivyEthereumService } from './public-api/services/ethereum';
export { type PrivySolanaService } from './public-api/services/solana';
export { type PrivyTronService } from './public-api/services/tron';
export { type PrivyPoliciesService } from './public-api/services/policies';
export { type PrivyTransactionsService } from './public-api/services/transactions';
export { type PrivyKeyQuorumsService } from './public-api/services/key-quorums';
export { type PrivyUsersService } from './public-api/services/users';
export { type PrivyIntentsService } from './public-api/services/intents';
export { type PrivyAppsService } from './public-api/services/apps';
export { type PrivySwapsService } from './public-api/services/swaps';
export { type PrivyUtils } from './public-api/services/utils';
export {
  InvalidAuthTokenError,
  verifyAccessToken,
  type VerifyAccessTokenResponse,
  type VerifyAccessTokenInput,
  verifyAuthToken,
  type VerifyAuthTokenResponse,
  type VerifyAuthTokenInput,
  verifyIdentityToken,
  type VerifyIdentityTokenInput,
} from './lib/auth';

export {
  /** @deprecated Import `User` from `@privy-io/node/resources` instead. */
  type User,
  /** @deprecated Import `LinkedAccountEmbeddedWallet` from `@privy-io/node/resources` instead. */
  type LinkedAccountEmbeddedWallet,
  /** @deprecated Import `LinkedAccount` from `@privy-io/node/resources` instead. */
  type LinkedAccount,
} from './resources/users';
export {
  /** @deprecated Import `AppResponse` from `@privy-io/node/resources` instead. */
  type AppResponse,
  /** @deprecated Import `AllowlistEntry` from `@privy-io/node/resources` instead. */
  type AllowlistEntry,
  /** @deprecated Import `AllowlistDeletionResponse` from `@privy-io/node/resources` instead. */
  type AllowlistDeletionResponse,
  /** @deprecated Import `UserInviteInput` from `@privy-io/node/resources` instead. */
  type UserInviteInput,
  /** @deprecated Import `EmailInviteInput` from `@privy-io/node/resources` instead. */
  type EmailInviteInput,
  /** @deprecated Import `WalletInviteInput` from `@privy-io/node/resources` instead. */
  type WalletInviteInput,
  /** @deprecated Import `PhoneInviteInput` from `@privy-io/node/resources` instead. */
  type PhoneInviteInput,
} from './resources/apps/apps';
export {
  /** @deprecated Import `Wallet` from `@privy-io/node/resources` instead. */
  type Wallet,
} from './resources/wallets';
export {
  /** @deprecated Import `Policy` from `@privy-io/node/resources` instead. */
  type Policy,
} from './resources/policies';
export {
  /** @deprecated Import `KeyQuorum` from `@privy-io/node/resources` instead. */
  type KeyQuorum,
} from './resources/key-quorums';
export {
  /** @deprecated Import `IntentResponse` from `@privy-io/node/resources` instead. */
  type IntentResponse,
  /** @deprecated Import `RpcIntentResponse` from `@privy-io/node/resources` instead. */
  type RpcIntentResponse,
  /** @deprecated Import `WalletIntentResponse` from `@privy-io/node/resources` instead. */
  type WalletIntentResponse,
  /** @deprecated Import `PolicyIntentResponse` from `@privy-io/node/resources` instead. */
  type PolicyIntentResponse,
  /** @deprecated Import `RuleIntentResponse` from `@privy-io/node/resources` instead. */
  type RuleIntentResponse,
  /** @deprecated Import `KeyQuorumIntentResponse` from `@privy-io/node/resources` instead. */
  type KeyQuorumIntentResponse,
  /** @deprecated Import `IntentListParams` from `@privy-io/node/resources` instead. */
  type IntentListParams,
} from './resources/intents';

export {
  type AuthorizationContext,
  type WalletApiRequestSignatureInput,
  formatRequestForAuthorizationSignature,
  generateAuthorizationSignature,
  generateAuthorizationSignatures,
} from './lib/authorization';

export { generateP256KeyPair, type P256KeyPair } from './lib/cryptography';

export { type EmbeddedWalletLinkedAccount, isEmbeddedWalletLinkedAccount } from './lib/user-utils';

export { APIPromise } from './core/api-promise';
export {
  PrivyAPIError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './core/error';
