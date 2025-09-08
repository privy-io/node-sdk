export { PrivyClient, type PrivyClientOptions } from './public-api/PrivyClient';
export { type PrivyWalletsService } from './public-api/services/wallets';
export { type PrivyEthereumService } from './public-api/services/ethereum';
export { type PrivySolanaService } from './public-api/services/solana';
export { type PrivyPoliciesService } from './public-api/services/policies';
export { type PrivyTransactionsService } from './public-api/services/transactions';
export { type PrivyKeyQuorumsService } from './public-api/services/key-quorums';
export { type PrivyUsersService } from './public-api/services/users';
export { type PrivyUtils } from './public-api/services/utils';
export { InvalidAuthTokenError } from './public-api/services/utils/auth';

export {
  type AuthorizationContext,
  type WalletApiRequestSignatureInput,
  formatRequestForAuthorizationSignature,
  generateAuthorizationSignature,
  generateAuthorizationSignatures,
} from './lib/authorization';

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
