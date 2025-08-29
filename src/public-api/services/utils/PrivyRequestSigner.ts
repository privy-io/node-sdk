import {
  AuthorizationContext,
  formatRequestForAuthorizationSignature,
  generateAuthorizationSignature,
  WalletApiRequestSignatureInput,
} from '../../../lib/authorization';

export class PrivyRequestSigner {
  /**
   * Generates authorization signatures from the given authorization context and signable request.
   * This method handles JWT exchange and private key signing.
   *
   * Manual signing of requests is intended for advanced use cases.
   *
   * @param authorizationContext The authorization context containing JWTs, private keys, and signatures.
   * @param input The request payload to sign.
   * @returns An array of authorization signatures.
   */
  public generateAuthorizationSignatures({
    authorizationContext,
    input,
  }: {
    authorizationContext: AuthorizationContext;
    input: WalletApiRequestSignatureInput;
  }): string[] {
    const payload = formatRequestForAuthorizationSignature(input);

    // TODO: add support for user JWTs
    // TODO: add support for passed in signatures
    const privateKeys = authorizationContext.authorizationPrivateKeys ?? [];

    return privateKeys.map((sk) =>
      generateAuthorizationSignature({ authorizationPrivateKey: sk, input: payload }),
    );
  }
}
