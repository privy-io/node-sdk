import { AuthorizationContext } from '../AuthorizationContext';

export type AuthorizationConfig = { authorization_context?: AuthorizationContext };
type AuthParams = { 'privy-authorization-signature'?: any };
// prettier-ignore
export type WithAuthorization<P extends AuthParams> =
  TheOmit<P, keyof AuthParams> & AuthorizationConfig;

export type IdempotencyConfig = { idempotency_key?: string };
type IdempotencyParams = { 'privy-idempotency-key'?: any };
// prettier-ignore
export type WithIdempotency<P extends IdempotencyParams> =
  TheOmit<P, keyof IdempotencyParams> & IdempotencyConfig;

/**
 * `Omit` loses type info in unions like the `WalletRpcParams` type.
 * @see https://github.com/microsoft/TypeScript/issues/54525
 */
type TheOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

/**
 * Utility type that takes an object type and makes the hover overlay more readable.
 *
 * [Learn more](https://www.totaltypescript.com/concepts/the-prettify-helper)
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
