import { AuthorizationContext } from '../AuthorizationContext';

export interface AuthorizationConfig {
  authorization_context?: AuthorizationContext;
}
type AuthorizationKeys = 'privy-authorization-signature';
export type WithAuthorization<Params> = Omit<Params, AuthorizationKeys> & AuthorizationConfig;

export interface IdempotencyConfig {
  idempotency_key?: string;
}
type IdempotencyKeys = 'privy-idempotency-key';
export type WithIdempotency<Params> = Omit<Params, IdempotencyKeys> & IdempotencyConfig;

export type PrivyWalletsRpcConfig = AuthorizationConfig & IdempotencyConfig;
