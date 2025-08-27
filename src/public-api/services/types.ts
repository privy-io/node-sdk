import { AuthorizationContext } from '../AuthorizationContext';

export interface AuthorizationConfig {
  authorizationContext?: AuthorizationContext;
}

export interface IdempotencyConfig {
  idempotencyKey?: string;
}

export type PrivyWalletsRpcConfig = AuthorizationConfig & IdempotencyConfig;
