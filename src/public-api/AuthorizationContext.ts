import canonicalize from 'canonicalize';
import crypto from 'node:crypto';

export interface AuthorizationContextOptions {
  userJwts?: readonly string[];
  /**
   * The private keys to use for authorization.
   * These should be base64-encoded PKCS8-formatted private keys, with no PEM headers.
   */
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

  /** @internal */
  public generateAuthorizationSignatures(input: WalletApiRequestSignatureInput): string[] {
    const payload = Buffer.from(canonicalize(input) ?? '');

    return this.authorizationPrivateKeys.map((privateKey) => {
      const privateKeyObj = crypto.createPrivateKey({
        key: Buffer.from(privateKey, 'base64'),
        format: 'der',
        type: 'pkcs8',
      });
      const signatureBuffer = crypto.sign('sha256', payload, privateKeyObj);
      return signatureBuffer.toString('base64');
    });
  }
}

export type WalletApiRequestSignatureInput = {
  /** Signature version. 1 is currently the only valid version. */
  version: 1;
  /** Request method. Signatures are not required on 'GET' requests. */
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** URL for the request. Should not contain a trailing slash. */
  url: string;
  /** Request body. */
  body: any;
  /** Privy-specific headers. */
  headers: {
    'privy-app-id': string;
    'privy-idempotency-key'?: string;
  };
};
