import { AuthorizationContext } from '../../lib/authorization';

/**
 * Configuration object that can be set by the caller and is used to generate the right value for
 * the `privy-authorization-signature` HTTP header.
 */
export type AuthorizationConfig = { authorization_context?: AuthorizationContext };
type AuthParams = { 'privy-authorization-signature'?: any };
// prettier-ignore
/**
 * Helper type that takes a parameters object (body & headers of an API request) and replaces the
 * `privy-authorization-signature` HTTP header with the authorization config object.
 *
 * This is used to turn Params objects that accept the raw header value into ones that accept the
 * more ergonomic config object instead.
 */
export type WithAuthorization<Params extends AuthParams> =
  TheOmit<Params, keyof AuthParams> & AuthorizationConfig;

/**
 * Configuration object that can be set by the caller and is used to generate the right value for
 * the `privy-idempotency-key` HTTP header.
 */
export type IdempotencyConfig = { idempotency_key?: string };
type IdempotencyParams = { 'privy-idempotency-key'?: any };
// prettier-ignore
/**
 * Helper type that takes a parameters object (body & headers of an API request) and replaces
 * the `privy-idempotency-key` HTTP header with the idempotency config object.
 *
 * This is used to turn Params objects that accept the raw header value into ones that accept the
 * more ergonomic config object instead.
 */
export type WithIdempotency<Params extends IdempotencyParams> =
  TheOmit<Params, keyof IdempotencyParams> & IdempotencyConfig;

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
