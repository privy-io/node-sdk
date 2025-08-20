export interface AuthorizationContextOptions {
  userJwts?: readonly string[];
  authorizationPrivateKeys?: readonly string[];
  signatures?: readonly string[];
}

export class AuthorizationContext {
  private readonly userJwts: readonly string[];
  private readonly authorizationPrivateKeys: readonly string[];
  private readonly signatures: readonly string[];

  public constructor({
    userJwts = [],
    authorizationPrivateKeys = [],
    signatures = [],
  }: AuthorizationContextOptions) {
    this.userJwts = userJwts;
    this.authorizationPrivateKeys = authorizationPrivateKeys;
    this.signatures = signatures;
  }
}
